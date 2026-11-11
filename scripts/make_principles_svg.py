"""Three principles: one pixel word, one line each."""
from deck import HAIRLINE, HEAD, INK, MUTED, PAD, WIDTH, panel, pixel_text, save

HEIGHT = 166
CELL = 4
WORD_Y = HEAD + 6
GUTTER = 22

PRINCIPLES = [
    ("SIMPLE.", "Great software shouldn't", "need an instruction manual."),
    ("MEANINGFUL.", "The best products make", "hard things look easy."),
    ("HUMAN.", "The technology disappears.", "Only the magic remains."),
]


def main():
    parts = []
    column = (WIDTH - 2 * PAD + GUTTER) / len(PRINCIPLES)
    for i, (word, first, second) in enumerate(PRINCIPLES):
        x = PAD + i * column
        if i:
            rule = x - GUTTER + .5
            parts.append(f'<line x1="{rule:.1f}" y1="{HEAD}" x2="{rule:.1f}" y2="{HEIGHT - PAD}" stroke="{HAIRLINE}"/>')
        parts.append(
            f'<g class="enter" style="animation-delay:{i * 0.2:.2f}s">{pixel_text(word, round(x), WORD_Y, CELL, INK)}'
            f'<text class="sans" x="{x:.0f}" y="{WORD_Y + 56}" fill="{MUTED}" font-size="13.5">{first}</text>'
            f'<text class="sans" x="{x:.0f}" y="{WORD_Y + 75}" fill="{MUTED}" font-size="13.5">{second}</text></g>')

    save("principles.svg", panel(HEIGHT, 2, "Principles", "\n".join(parts)))


if __name__ == "__main__":
    main()
