"""Render a year-in-review panel from data/contributions.json: headline numbers, months and weekday rhythm."""
import json
from collections import defaultdict
from datetime import date
from pathlib import Path

from terminal import BAR_HEIGHT, BORDER, MUTED, TEXT, prompt, save, window

DATA = Path(__file__).resolve().parent.parent / "data" / "contributions.json"

WIDTH, HEIGHT = 860, 330
PAD = 24
METRIC_Y = BAR_HEIGHT + 82
CHART_TOP, CHART_BOTTOM = BAR_HEIGHT + 168, BAR_HEIGHT + 258
MONTHS_RIGHT, WEEKDAYS_LEFT = 540, 596
PEAK, BAR = "#f0f3f6", "#484f58"  # only the strongest bar is lit, the rest recede

STYLE = """
.m { opacity: 0; animation: fade .6s ease-out forwards; }
.b { transform-box: fill-box; transform-origin: bottom; transform: scaleY(0);
     animation: grow .9s cubic-bezier(.2,.8,.2,1) forwards; }
@keyframes fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@keyframes grow { to { transform: scaleY(1); } }
"""


def caption(x: float, y: float, text: str, anchor: str = "start") -> str:
    return (f'<text class="sans" x="{x}" y="{y}" fill="{MUTED}" font-size="10" letter-spacing="1.2" '
            f'text-anchor="{anchor}">{text.upper()}</text>')


def bars(values, labels, left: float, right: float, delay_start: float):
    slot = (right - left) / len(values)
    width = slot * 0.56
    peak = max(values) or 1
    parts = []
    for i, (value, label) in enumerate(zip(values, labels)):
        x = left + i * slot + (slot - width) / 2
        # Leave headroom so the peak's value label clears the section caption
        height = max(2, (CHART_BOTTOM - CHART_TOP - 16) * value / peak)
        color = PEAK if value == peak else BAR
        parts.append(f'<rect class="b" style="animation-delay:{delay_start + i * 0.05:.2f}s" x="{x:.1f}" '
                     f'y="{CHART_BOTTOM - height:.1f}" width="{width:.1f}" height="{height:.1f}" rx="3" fill="{color}">'
                     f'<title>{label}: {value}</title></rect>')
        parts.append(f'<text class="sans" x="{x + width / 2:.1f}" y="{CHART_BOTTOM + 16}" fill="{MUTED}" '
                     f'font-size="10" text-anchor="middle">{label[0]}</text>')
        if value == peak:
            parts.append(f'<text class="sans m" style="animation-delay:{delay_start + 0.6:.2f}s" x="{x + width / 2:.1f}" '
                         f'y="{CHART_BOTTOM - height - 6:.1f}" fill="{TEXT}" font-size="10" '
                         f'text-anchor="middle">{value}</text>')
    return parts


def main():
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
        (f'{data["longest_streak"]}d', "longest streak"),
        (str(data["best_day"]["count"]), f'best day · {best.strftime("%b")} {best.day}'),
    ]

    parts = [prompt(PAD, BAR_HEIGHT + 24, "./year-in-review.sh")]
    column = (WIDTH - 2 * PAD) / len(metrics)
    for i, (value, label) in enumerate(metrics):
        x = PAD + i * column
        parts.append(f'<g class="m" style="animation-delay:{i * 0.1:.1f}s">'
                     f'<text class="sans" x="{x}" y="{METRIC_Y}" fill="{TEXT}" font-size="34" font-weight="600" '
                     f'letter-spacing="-0.5">{value}</text>{caption(x, METRIC_Y + 22, label)}</g>')

    parts.append(f'<line x1="{PAD}" y1="{METRIC_Y + 46}" x2="{WIDTH - PAD}" y2="{METRIC_Y + 46}" stroke="{BORDER}"/>')
    parts.append(caption(PAD, CHART_TOP - 16, "per month"))
    parts.append(caption(WEEKDAYS_LEFT, CHART_TOP - 16, "weekly rhythm"))
    parts += bars([monthly[m] for m in last_twelve], [date(y, m, 1).strftime("%b") for y, m in last_twelve],
                  PAD, MONTHS_RIGHT, 0.4)
    parts += bars(weekdays, ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], WEEKDAYS_LEFT, WIDTH - PAD, 0.7)

    save("year-in-review.svg", window(WIDTH, HEIGHT, "polintosh — year in review", "\n".join(parts), STYLE))


if __name__ == "__main__":
    main()
