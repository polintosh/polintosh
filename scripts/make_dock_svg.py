"""A monochrome macOS-style Dock of the tools I reach for.

Icons are Simple Icons 16.33.0 (CC0), stored in data/icons/.
"""
import re
from pathlib import Path

from terminal import BAR_HEIGHT, BORDER, MUTED, prompt, save, window

ICONS = Path(__file__).resolve().parent.parent / "data" / "icons"
TOOLS = ["apple", "swift", "xcode", "python", "typescript", "astro", "git", "cloudflare"]

WIDTH, HEIGHT = 860, 200
TILE, GAP, ICON = 52, 14, 28
DOCK_PAD = 12
DOCK_TOP = BAR_HEIGHT + 52

STYLE = """
.t { opacity: 0; animation: rise .6s cubic-bezier(.2,.8,.2,1) forwards; }
@keyframes rise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
"""


def icon(name: str):
    svg = (ICONS / f"{name}.svg").read_text()
    title = re.search(r"<title>(.*?)</title>", svg).group(1)
    path = re.search(r'<path d="([^"]+)"', svg).group(1)
    return title, path


def main():
    row_width = len(TOOLS) * TILE + (len(TOOLS) - 1) * GAP
    dock_left = (WIDTH - row_width) / 2 - DOCK_PAD
    parts = [
        prompt(24, BAR_HEIGHT + 24, "ls ~/toolbox"),
        f'<rect x="{dock_left}" y="{DOCK_TOP}" width="{row_width + 2 * DOCK_PAD}" height="{TILE + 2 * DOCK_PAD}" '
        f'rx="20" fill="#161b22" stroke="{BORDER}"/>',
    ]
    scale = ICON / 24
    for i, name in enumerate(TOOLS):
        title, path = icon(name)
        x = dock_left + DOCK_PAD + i * (TILE + GAP)
        y = DOCK_TOP + DOCK_PAD
        inset = (TILE - ICON) / 2
        parts.append(
            f'<g class="t" style="animation-delay:{i * 0.07:.2f}s"><title>{title}</title>'
            f'<rect x="{x}" y="{y}" width="{TILE}" height="{TILE}" rx="12" fill="#21262d"/>'
            f'<path transform="translate({x + inset} {y + inset}) scale({scale})" d="{path}" fill="#e6edf3"/>'
            f'<text class="sans" x="{x + TILE / 2}" y="{y + TILE + DOCK_PAD + 22}" fill="{MUTED}" font-size="10" '
            f'text-anchor="middle">{title}</text></g>')

    save("toolbox.svg", window(WIDTH, HEIGHT, "polintosh — toolbox", "\n".join(parts), STYLE))


if __name__ == "__main__":
    main()
