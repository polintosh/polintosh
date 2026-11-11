"""Shared Flight Deck chrome for the profile SVGs: themes, panel frame and pixel type.

Every panel is rendered once per theme and the README picks between the two with
<picture>, so the deck follows the reader's light or dark setting.

GitHub strips web fonts from SVGs shown in a README, so display type is drawn
here as squares (or dots) from a small bitmap alphabet instead of being set in
a font.
"""
from dataclasses import dataclass
from pathlib import Path

ASSETS = Path(__file__).resolve().parent.parent / "assets"



@dataclass(frozen=True)
class Theme:
    name: str
    ground: str
    hairline: str
    line_strong: str
    dim: str
    muted: str
    body: str
    ink: str
    accent: str  # the one accent as a fill: a single lit square
    accent_ink: str  # the accent as type: section numbers, the motto
    grid_dot: str
    grid_opacity: float
    ramp: tuple  # contribution levels, ground to ink


DARK = Theme("dark", ground="#0b0c0f", hairline="#24272d", line_strong="#33373f", dim="#85878e", muted="#9a9ca3",
             body="#d6d4cc", ink="#ece9e0", accent="#ffb224", accent_ink="#ffb224", grid_dot="#fff", grid_opacity=0.05,
             ramp=("#1b1e23", "#33373f", "#5c6068", "#9a9ca3", "#ece9e0"))
# The same deck printed on paper. The fill orange can't carry small type there, so type gets a darker ink.
LIGHT = Theme("light", ground="#f2f2f0", hairline="#d4d4d0", line_strong="#a8a9a4", dim="#5c5f66", muted="#5c5f66",
              body="#3a3c42", ink="#111214", accent="#ff7a1a", accent_ink="#a83e08", grid_dot="#111214",
              grid_opacity=0.07, ramp=("#e6e6e2", "#c4c4bf", "#8a8c90", "#4a4c52", "#111214"))
THEMES = (DARK, LIGHT)

MONO = "ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, monospace"
SANS = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Inter, Arial, sans-serif"

WIDTH = 860
PAD = 22
HEAD = 52  # height of the label row; panel content starts below it
GRID = 24

# Motion is opt-in, so a reader who asks for reduced motion gets the settled frame.
ENTER = """
@media (prefers-reduced-motion: no-preference) {
.enter { opacity: 0; animation: enter .7s cubic-bezier(.2,.8,.2,1) forwards; }
@keyframes enter { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
%s
}
"""

GLYPHS = {
    "A": "01110 10001 10001 11111 10001 10001 10001",
    "B": "11110 10001 10001 11110 10001 10001 11110",
    "C": "01110 10001 10000 10000 10000 10001 01110",
    "D": "11110 10001 10001 10001 10001 10001 11110",
    "E": "11111 10000 10000 11110 10000 10000 11111",
    "F": "11111 10000 10000 11110 10000 10000 10000",
    "G": "01110 10001 10000 10111 10001 10001 01110",
    "H": "10001 10001 10001 11111 10001 10001 10001",
    "I": "111 010 010 010 010 010 111",
    "J": "00111 00010 00010 00010 00010 10010 01100",
    "K": "10001 10010 10100 11000 10100 10010 10001",
    "L": "10000 10000 10000 10000 10000 10000 11111",
    "M": "10001 11011 10101 10101 10001 10001 10001",
    "N": "10001 11001 10101 10011 10001 10001 10001",
    "O": "01110 10001 10001 10001 10001 10001 01110",
    "P": "11110 10001 10001 11110 10000 10000 10000",
    "Q": "01110 10001 10001 10001 10101 10010 01101",
    "R": "11110 10001 10001 11110 10100 10010 10001",
    "S": "01111 10000 10000 01110 00001 00001 11110",
    "T": "11111 00100 00100 00100 00100 00100 00100",
    "U": "10001 10001 10001 10001 10001 10001 01110",
    "V": "10001 10001 10001 10001 10001 01010 00100",
    "W": "10001 10001 10001 10101 10101 11011 10001",
    "X": "10001 10001 01010 00100 01010 10001 10001",
    "Y": "10001 10001 01010 00100 00100 00100 00100",
    "Z": "11111 00001 00010 00100 01000 10000 11111",
    "0": "01110 10001 10011 10101 11001 10001 01110",
    "1": "00100 01100 00100 00100 00100 00100 01110",
    "2": "01110 10001 00001 00010 00100 01000 11111",
    "3": "11110 00001 00001 01110 00001 00001 11110",
    "4": "00010 00110 01010 10010 11111 00010 00010",
    "5": "11111 10000 11110 00001 00001 10001 01110",
    "6": "00110 01000 10000 11110 10001 10001 01110",
    "7": "11111 00001 00010 00100 01000 01000 01000",
    "8": "01110 10001 10001 01110 10001 10001 01110",
    "9": "01110 10001 10001 01111 00001 00010 01100",
    ".": "0 0 0 0 0 0 1",
    ",": "00 00 00 00 00 01 10",
    " ": "000 000 000 000 000 000 000",
}
GLYPH_ROWS = 7


def pixel_width(text: str, cell: float) -> float:
    columns = sum(len(GLYPHS[ch].split()[0]) for ch in text) + len(text) - 1
    return columns * cell


def pixel_text(text: str, x: float, y: float, cell: float, fill: str, dots: bool = False, attrs: str = "") -> str:
    """Draw text from the bitmap alphabet with its top-left corner at (x, y), as squares or dots."""
    marks = []
    cursor = x
    for ch in text:
        rows = GLYPHS[ch].split()
        for r, row in enumerate(rows):
            c = 0
            while c < len(row):
                if row[c] == "0":
                    c += 1
                    continue
                if dots:
                    marks.append(f'<circle cx="{cursor + (c + .5) * cell:g}" cy="{y + (r + .5) * cell:g}" r="{cell * .42:g}"/>')
                    c += 1
                    continue
                # Merge a run of lit cells into one rectangle so no seams show between them
                run = len(row[c:]) - len(row[c:].lstrip("1"))
                marks.append(f'M{cursor + c * cell:g} {y + r * cell:g}h{run * cell:g}v{cell:g}h{-run * cell:g}z')
                c += run
        cursor += (len(rows[0]) + 1) * cell
    if dots:
        return f'<g fill="{fill}" {attrs}>{"".join(marks)}</g>'
    return f'<path fill="{fill}" shape-rendering="crispEdges" {attrs} d="{"".join(marks)}"/>'


def label(t: Theme, x: float, y: float, text: str, anchor: str = "start", fill: str = "", size: float = 11,
          attrs: str = "") -> str:
    return (f'<text x="{x}" y="{y}" fill="{fill or t.muted}" font-size="{size}" letter-spacing="{size * .14:.2f}" '
            f'text-anchor="{anchor}" {attrs}>{text.upper()}</text>')


def corners(t: Theme, x: float, y: float, width: float, height: float, arm: float = 10) -> str:
    """Viewfinder brackets on the four corners of a box."""
    right, bottom = x + width, y + height
    d = (f"M{x} {y + arm}V{y}h{arm}M{right - arm} {y}h{arm}v{arm}"
         f"M{right} {bottom - arm}v{arm}h{-arm}M{x + arm} {bottom}h{-arm}v{-arm}")
    return f'<path d="{d}" fill="none" stroke="{t.dim}" shape-rendering="crispEdges"/>'


def frame(t: Theme, height: int, title: str, body: str, style: str = "", defs: str = "") -> str:
    """The bare deck: ground, dot grid and hairline edge."""
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{WIDTH}" height="{height}" viewBox="0 0 {WIDTH} {height}" role="img" aria-label="{title}">
<style>text {{ font-family: {MONO}; }} .sans {{ font-family: {SANS}; }}{ENTER % style}</style>
<defs><pattern id="grid" width="{GRID}" height="{GRID}" patternUnits="userSpaceOnUse"><rect x="{GRID // 2}" y="{GRID // 2}" width="1" height="1" fill="{t.grid_dot}" opacity="{t.grid_opacity}"/></pattern>{defs}</defs>
<rect width="{WIDTH}" height="{height}" fill="{t.ground}"/>
<rect width="{WIDTH}" height="{height}" fill="url(#grid)"/>
{body}
<rect x=".5" y=".5" width="{WIDTH - 1}" height="{height - 1}" fill="none" stroke="{t.hairline}"/>
</svg>
"""


def panel(t: Theme, height: int, index: int, name: str, body: str, style: str = "", readout: str = "") -> str:
    """A numbered section: "01 · About" on the left, an optional readout on the right."""
    head = (f'<text x="{PAD}" y="31" fill="{t.muted}" font-size="11" letter-spacing="1.54">'
            f'<tspan fill="{t.accent_ink}">{index:02d}</tspan> · {name.upper()}</text>')
    if readout:
        head += label(t, WIDTH - PAD, 31, readout, "end", t.dim)
    return frame(t, height, f"polintosh — {name}", f"{head}\n{body}", style)


def save(name: str, render) -> None:
    """Write one SVG per theme, as assets/<name>-dark.svg and assets/<name>-light.svg."""
    ASSETS.mkdir(exist_ok=True)
    for theme in THEMES:
        path = ASSETS / f"{name}-{theme.name}.svg"
        path.write_text(render(theme))
        print(f"wrote assets/{path.name}")
