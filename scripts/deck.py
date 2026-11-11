"""Shared Flight Deck chrome for the profile SVGs: palette, panel frame and pixel type.

GitHub strips web fonts from SVGs shown in a README, so display type is drawn
here as squares (or dots) from a small bitmap alphabet instead of being set in
a font.
"""
from pathlib import Path

ASSETS = Path(__file__).resolve().parent.parent / "assets"

GROUND = "#0b0c0f"
HAIRLINE = "#24272d"
LINE_STRONG = "#33373f"
DIM = "#85878e"
MUTED = "#9a9ca3"
BODY = "#d6d4cc"
INK = "#ece9e0"
AMBER = "#ffb224"  # the one accent: section numbers, the motto, a single lit square

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


def label(x: float, y: float, text: str, anchor: str = "start", fill: str = MUTED, size: float = 11, attrs: str = "") -> str:
    return (f'<text x="{x}" y="{y}" fill="{fill}" font-size="{size}" letter-spacing="{size * .14:.2f}" '
            f'text-anchor="{anchor}" {attrs}>{text.upper()}</text>')


def corners(x: float, y: float, width: float, height: float, arm: float = 10, stroke: str = DIM) -> str:
    """Viewfinder brackets on the four corners of a box."""
    right, bottom = x + width, y + height
    d = (f"M{x} {y + arm}V{y}h{arm}M{right - arm} {y}h{arm}v{arm}"
         f"M{right} {bottom - arm}v{arm}h{-arm}M{x + arm} {bottom}h{-arm}v{-arm}")
    return f'<path d="{d}" fill="none" stroke="{stroke}" shape-rendering="crispEdges"/>'


def frame(height: int, title: str, body: str, style: str = "", defs: str = "") -> str:
    """The bare deck: ground, dot grid and hairline edge."""
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{WIDTH}" height="{height}" viewBox="0 0 {WIDTH} {height}" role="img" aria-label="{title}">
<style>text {{ font-family: {MONO}; }} .sans {{ font-family: {SANS}; }}{ENTER % style}</style>
<defs><pattern id="grid" width="{GRID}" height="{GRID}" patternUnits="userSpaceOnUse"><rect x="{GRID // 2}" y="{GRID // 2}" width="1" height="1" fill="#fff" opacity=".05"/></pattern>{defs}</defs>
<rect width="{WIDTH}" height="{height}" fill="{GROUND}"/>
<rect width="{WIDTH}" height="{height}" fill="url(#grid)"/>
{body}
<rect x=".5" y=".5" width="{WIDTH - 1}" height="{height - 1}" fill="none" stroke="{HAIRLINE}"/>
</svg>
"""


def panel(height: int, index: int, name: str, body: str, style: str = "", readout: str = "") -> str:
    """A numbered section: "01 · About" on the left, an optional readout on the right."""
    head = (f'<text x="{PAD}" y="31" fill="{MUTED}" font-size="11" letter-spacing="1.54">'
            f'<tspan fill="{AMBER}">{index:02d}</tspan> · {name.upper()}</text>')
    if readout:
        head += label(WIDTH - PAD, 31, readout, "end", DIM)
    return frame(height, f"polintosh — {name}", f"{head}\n{body}", style)


def save(name: str, svg: str) -> None:
    ASSETS.mkdir(exist_ok=True)
    (ASSETS / name).write_text(svg)
    print(f"wrote assets/{name}")
