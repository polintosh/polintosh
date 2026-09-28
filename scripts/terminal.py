"""Shared macOS-style terminal window chrome for the profile SVGs."""
from pathlib import Path

ASSETS = Path(__file__).resolve().parent.parent / "assets"

BG = "#0d1117"
BORDER = "#30363d"
TEXT = "#e6edf3"
MUTED = "#8b949e"
FONT = "ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, monospace"
BAR_HEIGHT = 32


def window(width: int, height: int, title: str, body: str, style: str = "") -> str:
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-label="{title}">
<style>text {{ font-family: {FONT}; }}{style}</style>
<rect x="0.5" y="0.5" width="{width - 1}" height="{height - 1}" rx="10" fill="{BG}" stroke="{BORDER}"/>
<circle cx="18" cy="16" r="5.5" fill="#ff5f57"/>
<circle cx="36" cy="16" r="5.5" fill="#febc2e"/>
<circle cx="54" cy="16" r="5.5" fill="#28c840"/>
<text x="{width / 2}" y="20" fill="{MUTED}" font-size="11" text-anchor="middle">{title}</text>
<line x1="1" y1="{BAR_HEIGHT}" x2="{width - 1}" y2="{BAR_HEIGHT}" stroke="{BORDER}"/>
{body}
</svg>
"""


def save(name: str, svg: str) -> None:
    ASSETS.mkdir(exist_ok=True)
    (ASSETS / name).write_text(svg)
    print(f"wrote assets/{name}")
