"""The stack as a row of numbered modules.

Icons are Simple Icons 16.33.0 (CC0), stored in data/icons/.
"""
import re
from pathlib import Path

from deck import DIM, HAIRLINE, HEAD, INK, MUTED, PAD, WIDTH, label, panel, save

ICONS = Path(__file__).resolve().parent.parent / "data" / "icons"
TOOLS = ["apple", "swift", "xcode", "python", "typescript", "astro", "git", "cloudflare"]

CELL_HEIGHT = 104
ICON = 28


def icon(name: str):
    svg = (ICONS / f"{name}.svg").read_text()
    title = re.search(r"<title>(.*?)</title>", svg).group(1)
    path = re.search(r'<path d="([^"]+)"', svg).group(1)
    return title, path


def main():
    cell = (WIDTH - 2 * PAD) / len(TOOLS)
    parts = [f'<rect x="{PAD + .5}" y="{HEAD + .5}" width="{WIDTH - 2 * PAD - 1}" height="{CELL_HEIGHT}" '
             f'fill="none" stroke="{HAIRLINE}"/>']
    scale = ICON / 24
    for i, name in enumerate(TOOLS):
        title, path = icon(name)
        x = PAD + i * cell
        if i:
            parts.append(f'<line x1="{x + .5}" y1="{HEAD}" x2="{x + .5}" y2="{HEAD + CELL_HEIGHT}" stroke="{HAIRLINE}"/>')
        parts.append(
            f'<g class="enter" style="animation-delay:{i * 0.07:.2f}s"><title>{title}</title>'
            f'{label(x + 10, HEAD + 19, f"{i + 1:02d}", fill=DIM, size=9)}'
            f'<path transform="translate({x + (cell - ICON) / 2} {HEAD + 30}) scale({scale:.4f})" d="{path}" fill="{INK}"/>'
            f'{label(x + cell / 2, HEAD + 86, title, "middle", MUTED, 9.5)}</g>')

    save("stack.svg", panel(HEAD + CELL_HEIGHT + PAD, 3, "Stack", "\n".join(parts), readout=f"{len(TOOLS):02d} modules"))


if __name__ == "__main__":
    main()
