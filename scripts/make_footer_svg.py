"""The sign-off strip: the motto, where it is hosted, and a barcode."""
import random

from deck import PAD, WIDTH, Theme, frame, label, pixel_text, save

HEIGHT = 56
BARCODE_WIDTH, BAR_HEIGHT = 96, 20
SEED = 1977


def barcode(t: Theme, right: float, top: float) -> str:
    rng = random.Random(SEED)
    bars, x = [], right - BARCODE_WIDTH
    while x < right - 3:
        width = rng.choice([1, 1, 2, 3])
        bars.append(f"M{x} {top}h{width}v{BAR_HEIGHT}h{-width}z")
        x += width + rng.choice([1, 2, 2, 3])
    return f'<path fill="{t.muted}" shape-rendering="crispEdges" d="{"".join(bars)}"/>'


def render(t: Theme) -> str:
    top = (HEIGHT - BAR_HEIGHT) // 2
    parts = [
        pixel_text("KEEP EXPLORING.", PAD, HEIGHT // 2 - 7, 2, t.accent_ink),
        label(t, WIDTH - PAD - BARCODE_WIDTH - 18, HEIGHT / 2 + 4, "Hosted in Europe", "end", t.dim),
        barcode(t, WIDTH - PAD, top),
    ]
    return frame(t, HEIGHT, "Keep Exploring. Hosted in Europe.", "\n".join(parts))


if __name__ == "__main__":
    save("footer", render)
