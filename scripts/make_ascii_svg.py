"""Turn a grayscale image into monochrome ASCII art that types itself in, row by row.

    python scripts/make_ascii_svg.py [image]   # defaults to data/telescope.png
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

from terminal import BAR_HEIGHT, TEXT, save, window

ROOT = Path(__file__).resolve().parent.parent
RAMP = " .`:-=+*cs#%@"  # bright (sparse) -> dark (dense); leading space clears the background
COLS = 44
WIDTH, HEIGHT = 370, 408  # height matches the info card beside it
PAD_X = 24
LINE_HEIGHT = 11.5
CHAR_ASPECT = 0.5  # monospace glyphs are about twice as tall as wide
BACKGROUND_CUTOFF = 0.8  # anything this bright is background noise
ROW_DURATION, ROW_STAGGER = 0.22, 0.07


def to_rows(path: Path):
    image = Image.open(path).convert("L")
    rows = max(1, round(COLS * image.height / image.width * CHAR_ASPECT))
    pixels = np.asarray(image.resize((COLS, rows), Image.LANCZOS), dtype=float) / 255
    pixels[pixels > BACKGROUND_CUTOFF] = 1.0
    index = ((1 - pixels) * (len(RAMP) - 1)).round().astype(int)
    lines = ["".join(RAMP[i] for i in row) for row in index]
    # Drop fully blank rows at the edges so the art sits tight in the window
    while lines and not lines[0].strip():
        lines.pop(0)
    while lines and not lines[-1].strip():
        lines.pop()
    return lines


def escape(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def main():
    source = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "data" / "telescope.png"
    lines = to_rows(source)
    text_width = WIDTH - 2 * PAD_X
    top = BAR_HEIGHT + (HEIGHT - BAR_HEIGHT - len(lines) * LINE_HEIGHT) / 2

    defs, rows = [], []
    for i, line in enumerate(lines):
        y = top + i * LINE_HEIGHT
        begin = f"{i * ROW_STAGGER:.2f}s"
        # A clip that wipes left to right, with a block cursor riding its edge
        defs.append(f'<clipPath id="r{i}"><rect x="{PAD_X}" y="{y - 1}" width="0" height="{LINE_HEIGHT}">'
                    f'<animate attributeName="width" from="0" to="{text_width}" begin="{begin}" '
                    f'dur="{ROW_DURATION}s" fill="freeze"/></rect></clipPath>')
        rows.append(f'<text clip-path="url(#r{i})" x="{PAD_X}" y="{y + LINE_HEIGHT - 3}" fill="{TEXT}" '
                    f'font-size="10" textLength="{text_width}" lengthAdjust="spacing" '
                    f'xml:space="preserve">{escape(line)}</text>')
        rows.append(f'<rect x="{PAD_X}" y="{y}" width="6" height="{LINE_HEIGHT - 2}" fill="{TEXT}" opacity="0">'
                    f'<set attributeName="opacity" to="0.8" begin="{begin}"/>'
                    f'<animate attributeName="x" from="{PAD_X}" to="{PAD_X + text_width}" begin="{begin}" '
                    f'dur="{ROW_DURATION}s" fill="freeze"/>'
                    f'<set attributeName="opacity" to="0" begin="{i * ROW_STAGGER + ROW_DURATION:.2f}s"/></rect>')

    body = "<defs>" + "".join(defs) + "</defs>\n" + "\n".join(rows)
    save("ascii-art.svg", window(WIDTH, HEIGHT, "polintosh — keep exploring", body))


if __name__ == "__main__":
    main()
