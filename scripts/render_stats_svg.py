"""Render a year-in-review panel from data/contributions.json: headline numbers, months and weekday rhythm."""
import json
from collections import defaultdict
from datetime import date
from pathlib import Path

from deck import HEAD, PAD, WIDTH, Theme, label, panel, pixel_text, save

DATA = Path(__file__).resolve().parent.parent / "data" / "contributions.json"

HEIGHT = 306
NUMERAL_CELL = 5
METRIC_Y = HEAD + 4
RULE_Y = METRIC_Y + 78
CHART_TOP, CHART_BOTTOM = RULE_Y + 44, RULE_Y + 134
MONTHS_RIGHT, WEEKDAYS_LEFT = 540, 596

STYLE = """
.b { transform-box: fill-box; transform-origin: bottom; transform: scaleY(0);
     animation: grow .9s cubic-bezier(.2,.8,.2,1) forwards; }
@keyframes grow { to { transform: scaleY(1); } }
"""


def bars(t: Theme, values, labels, left: float, right: float, delay_start: float):
    slot = (right - left) / len(values)
    width = round(slot * 0.56)
    peak = max(values) or 1
    parts = []
    for i, (value, name) in enumerate(zip(values, labels)):
        x = round(left + i * slot + (slot - width) / 2)
        # Leave headroom so the peak's value label clears the section caption
        height = max(2, round((CHART_BOTTOM - CHART_TOP - 16) * value / peak))
        # Only the strongest bar is lit, the rest recede
        color = t.ink if value == peak else t.ramp[1]
        parts.append(f'<rect class="b" style="animation-delay:{delay_start + i * 0.05:.2f}s" x="{x}" '
                     f'y="{CHART_BOTTOM - height}" width="{width}" height="{height}" fill="{color}">'
                     f'<title>{name}: {value}</title></rect>')
        parts.append(label(t, x + width / 2, CHART_BOTTOM + 16, name[0], "middle", t.dim, 9))
        if value == peak:
            parts.append(label(t, x + width / 2, CHART_BOTTOM - height - 6, str(value), "middle", t.ink, 9,
                               f'class="enter" style="animation-delay:{delay_start + 0.6:.2f}s"'))
    return parts


def render(t: Theme) -> str:
    data = json.loads(DATA.read_text())
    days = data["days"]

    monthly = defaultdict(int)
    weekdays = [0] * 7
    for day in days:
        d = date.fromisoformat(day["date"])
        monthly[(d.year, d.month)] += day["count"]
        weekdays[(d.weekday() + 1) % 7] += day["count"]
    last_twelve = sorted(monthly)[-12:]
    best = date.fromisoformat(data["best_day"]["date"])

    metrics = [
        (f'{data["total"]:,}', "contributions"),
        (str(sum(1 for d in days if d["count"])), "active days"),
        (f'{data["longest_streak"]}D', "longest streak"),
        (str(data["best_day"]["count"]), f'best day · {best.strftime("%b")} {best.day}'),
    ]

    parts = []
    column = (WIDTH - 2 * PAD) / len(metrics)
    for i, (value, name) in enumerate(metrics):
        x = round(PAD + i * column)
        caption_x = x
        signal = ""
        if i == len(metrics) - 1:
            # The same lit square that marks the best day on the heatmap
            signal = f'<rect x="{x}" y="{METRIC_Y + 48}" width="7" height="7" fill="{t.accent}"/>'
            caption_x += 14
        parts.append(f'<g class="enter" style="animation-delay:{i * 0.1:.1f}s">'
                     f'{pixel_text(value, x, METRIC_Y, NUMERAL_CELL, t.ink)}{signal}'
                     f'{label(t, caption_x, METRIC_Y + 55, name)}</g>')

    parts.append(f'<line x1="{PAD}" y1="{RULE_Y + .5}" x2="{WIDTH - PAD}" y2="{RULE_Y + .5}" stroke="{t.hairline}"/>')
    parts.append(label(t, PAD, CHART_TOP - 16, "per month", fill=t.dim))
    parts.append(label(t, WEEKDAYS_LEFT, CHART_TOP - 16, "weekly rhythm", fill=t.dim))
    parts += bars(t, [monthly[m] for m in last_twelve], [date(y, m, 1).strftime("%b") for y, m in last_twelve],
                  PAD, MONTHS_RIGHT, 0.4)
    parts += bars(t, weekdays, ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], WEEKDAYS_LEFT, WIDTH - PAD, 0.7)

    return panel(t, HEIGHT, 5, "Year in review", "\n".join(parts), STYLE)


if __name__ == "__main__":
    save("year-in-review", render)
