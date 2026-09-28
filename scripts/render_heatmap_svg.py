"""Render data/contributions.json as an animated, monochrome contribution heatmap."""
import json
from datetime import date, timedelta
from pathlib import Path

from terminal import BAR_HEIGHT, MUTED, TEXT, save, window

DATA = Path(__file__).resolve().parent.parent / "data" / "contributions.json"

# Monochrome to match the banner: empty -> brightest
PALETTE = ["#161b22", "#30363d", "#5c636c", "#9ba3ad", "#f0f3f6"]
WIDTH, HEIGHT = 860, 224
CELL, STEP = 11, 14
LABEL_WIDTH = 28
GRID_TOP = BAR_HEIGHT + 44
MIN_LABEL_GAP = 3  # weeks between month labels
DIAGONAL_DELAY = 0.02  # seconds between each diagonal of the reveal

STYLE = """
.c { opacity: 0; transform-box: fill-box; transform-origin: center;
     animation: drop .45s cubic-bezier(.2,.8,.2,1) forwards; }
@keyframes drop { from { opacity: 0; transform: translateY(-8px) scale(.5); }
                  to   { opacity: 1; transform: none; } }
"""


def main():
    data = json.loads(DATA.read_text())
    days = data["days"]
    first = date.fromisoformat(days[0]["date"])
    start = first - timedelta(days=(first.weekday() + 1) % 7)  # back to Sunday
    weeks = (date.fromisoformat(days[-1]["date"]) - start).days // 7 + 1

    grid_width = weeks * STEP - (STEP - CELL)
    left = (WIDTH - LABEL_WIDTH - grid_width) // 2 + LABEL_WIDTH

    parts = [f'<text x="24" y="{BAR_HEIGHT + 24}" fill="{TEXT}" font-size="13">'
             f'<tspan fill="{MUTED}">polintosh@github ~ $</tspan> ./contributions.sh</text>']

    for row, label in ((1, "Mon"), (3, "Wed"), (5, "Fri")):
        y = GRID_TOP + row * STEP + CELL - 2
        parts.append(f'<text x="{left - 8}" y="{y}" fill="{MUTED}" font-size="9" text-anchor="end">{label}</text>')

    last_month, last_label_week = None, -MIN_LABEL_GAP
    for day in days:
        d = date.fromisoformat(day["date"])
        week, weekday = (d - start).days // 7, (d.weekday() + 1) % 7
        x, y = left + week * STEP, GRID_TOP + weekday * STEP
        if weekday == 0 and d.month != last_month:
            # Skip a label that would crowd the previous one (e.g. a partial first month)
            if week - last_label_week >= MIN_LABEL_GAP and week < weeks - 1:
                parts.append(f'<text x="{x}" y="{GRID_TOP - 6}" fill="{MUTED}" font-size="9">{d.strftime("%b")}</text>')
                last_label_week = week
            last_month = d.month
        delay = (week + weekday) * DIAGONAL_DELAY
        parts.append(f'<rect class="c" style="animation-delay:{delay:.2f}s" x="{x}" y="{y}" '
                     f'width="{CELL}" height="{CELL}" rx="2.5" fill="{PALETTE[day["level"]]}">'
                     f'<title>{day["count"]} on {day["date"]}</title></rect>')

    footer_y = GRID_TOP + 7 * STEP + 26
    stats = (f'{data["total"]:,} contributions in the last year  ·  '
             f'longest streak {data["longest_streak"]}d  ·  current {data["current_streak"]}d')
    parts.append(f'<text x="{left}" y="{footer_y}" fill="{MUTED}" font-size="11">{stats}</text>')

    legend_right = left + grid_width
    legend_x = legend_right - len(PALETTE) * STEP - 30
    parts.append(f'<text x="{legend_x - 6}" y="{footer_y}" fill="{MUTED}" font-size="10" text-anchor="end">Less</text>')
    for i, color in enumerate(PALETTE):
        parts.append(f'<rect x="{legend_x + i * STEP}" y="{footer_y - 10}" width="{CELL}" height="{CELL}" rx="2.5" fill="{color}"/>')
    parts.append(f'<text x="{legend_right}" y="{footer_y}" fill="{MUTED}" font-size="10" text-anchor="end">More</text>')

    save("contrib-heatmap.svg", window(WIDTH, HEIGHT, "polintosh — contributions", "\n".join(parts), STYLE))


if __name__ == "__main__":
    main()
