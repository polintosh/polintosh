"""The sign-off strip: the motto, where it is hosted, and a barcode."""
import random

from deck import AMBER, DIM, MUTED, PAD, WIDTH, frame, label, pixel_text, save

HEIGHT = 56
BARCODE_WIDTH, BAR_HEIGHT = 96, 20
SEED = 1977


def barcode(right: float, top: float) -> str:
    rng = random.Random(SEED)
    bars, x = [], right - BARCODE_WIDTH
    while x < right - 3:
        width = rng.choice([1, 1, 2, 3])
        bars.append(f"M{x} {top}h{width}v{BAR_HEIGHT}h{-width}z")
        x += width + rng.choice([1, 2, 2, 3])
    return f'<path fill="{MUTED}" shape-rendering="crispEdges" d="{"".join(bars)}"/>'


def main():
    top = (HEIGHT - BAR_HEIGHT) // 2
    parts = [
        pixel_text("KEEP EXPLORING.", PAD, HEIGHT // 2 - 7, 2, AMBER),
        label(WIDTH - PAD - BARCODE_WIDTH - 18, HEIGHT / 2 + 4, "Hosted in Europe", "end", DIM),
        barcode(WIDTH - PAD, top),
    ]
    save("footer.svg", frame(HEIGHT, "Keep Exploring. Hosted in Europe.", "\n".join(parts)))


if __name__ == "__main__":
    main()
