"""Three principles, set like an Apple keynote slide: one word, one line."""
from terminal import BAR_HEIGHT, BORDER, MUTED, TEXT, prompt, save, window

WIDTH, HEIGHT = 860, 196
PAD = 24
WORD_Y = BAR_HEIGHT + 86

PRINCIPLES = [
    ("Simple.", "Great software shouldn't", "need an instruction manual."),
    ("Meaningful.", "The best products make", "hard things look easy."),
    ("Human.", "The technology disappears.", "Only the magic remains."),
]

STYLE = """
.p { opacity: 0; animation: fade .8s ease-out forwards; }
@keyframes fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
"""


def main():
    parts = [prompt(PAD, BAR_HEIGHT + 24, "cat principles.md")]
    column = (WIDTH - 2 * PAD) / len(PRINCIPLES)
    for i, (word, first, second) in enumerate(PRINCIPLES):
        x = PAD + i * column
        if i:
            parts.append(f'<line x1="{x - 16}" y1="{WORD_Y - 30}" x2="{x - 16}" y2="{WORD_Y + 50}" stroke="{BORDER}"/>')
        parts.append(
            f'<g class="p" style="animation-delay:{i * 0.25:.2f}s">'
            f'<text class="sans" x="{x}" y="{WORD_Y}" fill="{TEXT}" font-size="28" font-weight="600" '
            f'letter-spacing="-0.5">{word}</text>'
            f'<text class="sans" x="{x}" y="{WORD_Y + 28}" fill="{MUTED}" font-size="13">{first}</text>'
            f'<text class="sans" x="{x}" y="{WORD_Y + 46}" fill="{MUTED}" font-size="13">{second}</text></g>')

    save("principles.svg", window(WIDTH, HEIGHT, "polintosh — principles", "\n".join(parts), STYLE))


if __name__ == "__main__":
    main()
