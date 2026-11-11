"""About: the telescope as a halftone of squares, beside a dossier of label/value rows.

    python scripts/make_about_svg.py [image]   # defaults to data/telescope.png
"""
import sys
from collections import defaultdict
from pathlib import Path

from PIL import Image

from deck import AMBER, DIM, HAIRLINE, HEAD, INK, LINE_STRONG, MUTED, PAD, WIDTH, corners, label, panel, save

ROOT = Path(__file__).resolve().parent.parent
COLS, CELL = 40, 6
BACKGROUND_CUTOFF = 0.3  # anything this light is paper, not telescope
FIGURE_WIDTH = 276
ROW_HEIGHT = 36
DOSSIER_X = PAD + FIGURE_WIDTH + 34
VALUE_X = DOSSIER_X + 104
DIAGONAL_DELAY = 0.018  # seconds between each diagonal of the reveal

INFO = [
    ("Role", "Apple Developer · Computer Engineer · AI Tinkerer"),
    ("Studies", "Computer Engineering · La Salle"),
    ("Based", "Barcelona, Europe"),
    ("Stack", "Swift · SwiftUI · Python"),
    ("Focus", "Apple platforms · on-device AI"),
    ("Believes", "Simple on the surface. Thoughtful underneath."),
    ("Motto", "Keep Exploring."),
]
SIGNAL = "Motto"  # the row that carries the panel's one lit square

STYLE = """
.h { opacity: 0; animation: develop .5s ease-out forwards; }
@keyframes develop { from { opacity: 0; } to { opacity: 1; } }
"""


def halftone(path: Path, left: float, top: float, height: float) -> str:
    """Each cell holds a square sized by how dark the image is there, revealed diagonal by diagonal."""
    image = Image.open(path).convert("L")
    rows = round(COLS * image.height / image.width)
    pixels = image.resize((COLS, rows), Image.LANCZOS).load()
    left += (FIGURE_WIDTH - COLS * CELL) / 2
    top += (height - rows * CELL) / 2

    diagonals = defaultdict(list)
    for row in range(rows):
        for col in range(COLS):
            darkness = 1 - pixels[col, row] / 255
            if darkness < BACKGROUND_CUTOFF:
                continue
            size = max(1, round(darkness * (CELL - 1)))
            inset = (CELL - size) // 2
            diagonals[col + row].append(f"M{left + col * CELL + inset:g} {top + row * CELL + inset:g}"
                                        f"h{size}v{size}h{-size}z")
    return "".join(f'<path class="h" style="animation-delay:{i * DIAGONAL_DELAY:.2f}s" d="{"".join(d)}"/>'
                   for i, d in sorted(diagonals.items()))


def main():
    source = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "data" / "telescope.png"
    dossier_height = len(INFO) * ROW_HEIGHT
    bottom = HEAD + dossier_height

    parts = [
        f'<g fill="{INK}" shape-rendering="crispEdges">{halftone(source, PAD, HEAD, dossier_height)}</g>',
        corners(PAD + .5, HEAD + .5, FIGURE_WIDTH, dossier_height),
        label(PAD, bottom + 22, "Fig. 02 · Refractor", fill=DIM),
        f'<line x1="{DOSSIER_X}" y1="{HEAD + .5}" x2="{WIDTH - PAD}" y2="{HEAD + .5}" stroke="{LINE_STRONG}"/>',
    ]
    for i, (key, value) in enumerate(INFO):
        y = HEAD + i * ROW_HEIGHT
        value_x = VALUE_X
        signal = ""
        if key == SIGNAL:
            signal = f'<rect x="{VALUE_X}" y="{y + 14}" width="8" height="8" fill="{AMBER}"/>'
            value_x += 18
        parts.append(
            f'<g class="enter" style="animation-delay:{i * 0.08:.2f}s">{label(DOSSIER_X, y + 22.5, key)}{signal}'
            f'<text class="sans" x="{value_x}" y="{y + 23}" fill="{INK}" font-size="14.5">{value}</text>'
            f'<line x1="{DOSSIER_X}" y1="{y + ROW_HEIGHT + .5}" x2="{WIDTH - PAD}" y2="{y + ROW_HEIGHT + .5}" '
            f'stroke="{HAIRLINE}"/></g>')

    save("about.svg", panel(bottom + 44, 1, "About", "\n".join(parts), STYLE, "Dossier"))


if __name__ == "__main__":
    main()
