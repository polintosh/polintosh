"""Hand-authored neofetch-style card that prints itself line by line."""
from terminal import BAR_HEIGHT, MUTED, TEXT, prompt, save, window

WIDTH = 490
LINE_HEIGHT = 22
KEY_X, VALUE_X = 24, 120
STAGGER = 0.12

INFO = [
    ("Role", "Apple Developer"),
    ("", "Computer Engineer"),
    ("", "AI Tinkerer"),
    ("Driven", "by curiosity"),
    ("Studies", "Computer Engineering · La Salle"),
    ("Based", "Barcelona, Europe"),
    ("Stack", "Swift · SwiftUI · Python"),
    ("Focus", "Apple platforms · on-device AI"),
    ("Believes", "Simple on the surface."),
    ("", "Thoughtful underneath."),
    ("Motto", "Keep Exploring."),
]
SWATCHES = ["#161b22", "#30363d", "#5c636c", "#9ba3ad", "#c9d1d9", "#f0f3f6"]

STYLE = """
.l { opacity: 0; animation: print .4s ease-out forwards; }
@keyframes print { from { opacity: 0; transform: translateX(-6px); }
                   to   { opacity: 1; transform: none; } }
"""


def line(index: int, content: str) -> str:
    return f'<g class="l" style="animation-delay:{index * STAGGER:.2f}s">{content}</g>'


def main():
    y = BAR_HEIGHT + 30
    parts = [
        line(0, prompt(KEY_X, y, "whoami")),
        line(1, f'<text x="{KEY_X}" y="{y + 30}" fill="{TEXT}" font-size="15" font-weight="700">polintosh</text>'),
        line(1, f'<line x1="{KEY_X}" y1="{y + 42}" x2="{WIDTH - KEY_X}" y2="{y + 42}" stroke="#30363d"/>'),
    ]
    y += 66
    for i, (key, value) in enumerate(INFO, start=2):
        parts.append(line(i, f'<text x="{KEY_X}" y="{y}" font-size="12.5">'
                             f'<tspan fill="{TEXT}" font-weight="700">{key}</tspan>'
                             f'<tspan x="{VALUE_X}" fill="{MUTED}">{value}</tspan></text>'))
        y += LINE_HEIGHT

    y += 4
    swatches = "".join(f'<rect x="{KEY_X + i * 26}" y="{y}" width="22" height="12" rx="2" fill="{c}"/>'
                       for i, c in enumerate(SWATCHES))
    parts.append(line(len(INFO) + 2, swatches))

    save("info-card.svg", window(WIDTH, int(y + 34), "polintosh — zsh", "\n".join(parts), STYLE))


if __name__ == "__main__":
    main()
