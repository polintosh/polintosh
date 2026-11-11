"""Render data/contributions.json as an animated contribution heatmap of squares."""
import json
from datetime import date, timedelta
from pathlib import Path

from deck import AMBER, DIM, HEAD, INK, MUTED, WIDTH, label, panel, save

DATA = Path(__file__).resolve().parent.parent / "data" / "contributions.json"

# Ground to ink; the best day alone is lit in the accent
PALETTE = ["#1b1e23", "#33373f", "#5c6068", "#9a9ca3", INK]
HEIGHT = 218
CELL, STEP = 11, 14
LABEL_WIDTH = 28
GRID_TOP = HEAD + 20
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
    last = date.fromisoformat(days[-1]["date"])
    start = first - timedelta(days=(first.weekday() + 1) % 7)  # back to Sunday
    weeks = (last - start).days // 7 + 1

    grid_width = weeks * STEP - (STEP - CELL)
    left = (WIDTH - LABEL_WIDTH - grid_width) // 2 + LABEL_WIDTH

    parts = []
    for row, name in ((1, "Mon"), (3, "Wed"), (5, "Fri")):
        parts.append(label(left - 8, GRID_TOP + row * STEP + CELL - 2, name, "end", DIM, 9))

    last_month, last_label_week = None, -MIN_LABEL_GAP
    for day in days:
        d = date.fromisoformat(day["date"])
        week, weekday = (d - start).days // 7, (d.weekday() + 1) % 7
        x, y = left + week * STEP, GRID_TOP + weekday * STEP
        if weekday == 0 and d.month != last_month:
            # Skip a label that would crowd the previous one (e.g. a partial first month)
            if week - last_label_week >= MIN_LABEL_GAP and week < weeks - 1:
                parts.append(label(x, GRID_TOP - 7, d.strftime("%b"), fill=DIM, size=9))
                last_label_week = week
            last_month = d.month
        delay = (week + weekday) * DIAGONAL_DELAY
        best = day["date"] == data["best_day"]["date"] and day["count"]
        parts.append(f'<rect class="c" style="animation-delay:{delay:.2f}s" x="{x}" y="{y}" '
                     f'width="{CELL}" height="{CELL}" fill="{AMBER if best else PALETTE[day["level"]]}">'
                     f'<title>{day["count"]} on {day["date"]}</title></rect>')

    footer_y = GRID_TOP + 7 * STEP + 26
    stats = (f'{data["total"]:,} contributions · longest streak {data["longest_streak"]}d · '
             f'current {data["current_streak"]}d')
    parts.append(label(left, footer_y, stats))

    legend_right = left + grid_width
    legend_x = legend_right - len(PALETTE) * STEP - 42
    parts.append(label(legend_x - 8, footer_y, "Less", "end", DIM, 9))
    for i, color in enumerate(PALETTE):
        parts.append(f'<rect x="{legend_x + i * STEP}" y="{footer_y - 10}" width="{CELL}" height="{CELL}" fill="{color}"/>')
    parts.append(label(legend_right, footer_y, "More", "end", DIM, 9))

    readout = f'{first.strftime("%b %Y")} — {last.strftime("%b %Y")}'
    save("contrib-heatmap.svg", panel(HEIGHT, 4, "Contributions", "\n".join(parts), STYLE, readout))


if __name__ == "__main__":
    main()
