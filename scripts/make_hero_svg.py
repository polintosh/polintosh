"""The hero: a lite spiral galaxy drawn from small squares, under the pixel wordmark.

Stars are scattered along two logarithmic arms plus a bulge and some haze, then
flattened and slanted into a disc and baked into a handful of static paths. On
load one square appears, a field of squares follows, and the arms wind into
place ring by ring; after that only a few glints keep twinkling.
"""
import math
import random
from collections import defaultdict

from deck import DARK, LIGHT, PAD, WIDTH, Theme, corners, frame, label, pixel_text, save

HEIGHT = 470
CORE_X, CORE_Y = 612, 300
RADIUS = 340  # pixels per disc unit; the arms fade out a little past 1
INCLINATION, TILT, PITCH = 62, 21, 9  # degrees
ARMS = 2
ARM_ROOT = 0.07  # radius where the arms leave the bulge
REACH = 1.3
SEED = 1977
STARS = 15000
FIELD_STARS = 240
GLINTS = 28
RINGS = 8

# Star tones per theme, core outward: three warm steps, then two cool ones. On paper the
# galaxy prints as ink, so its core is the darkest point instead of the brightest.
WARM = {DARK.name: ["#fff6dd", "#f3d898", "#e2c383"], LIGHT.name: ["#5c2003", "#a83e08", "#c2611c"]}
COOL = {DARK.name: ["#cfd3dc", "#aeb6cc"], LIGHT.name: ["#4a4c52", "#6b6e74"]}
# Core glow as (colour, opacity) stops, centre to rim
GLOW = {DARK.name: [("#fffaf0", .95), ("#f6dfa6", .4), ("#e2c383", 0)],
        LIGHT.name: [("#ff7a1a", .55), ("#ff7a1a", .22), ("#ff7a1a", 0)]}
LEVELS = [0.3, 0.5, 0.75, 1.0]

TAU = math.tau
COS_T, SIN_T = math.cos(math.radians(TILT)), math.sin(math.radians(TILT))
COS_I = math.cos(math.radians(INCLINATION))
WINDING = 1 / math.tan(math.radians(PITCH))

STYLE = f"""
.seed {{ transform-box: fill-box; transform-origin: center; animation: pop .5s cubic-bezier(.34,1.56,.64,1) both; }}
.field {{ animation: fade 1.4s .3s ease-out both; }}
.glow {{ animation: fade 2s .9s ease-out both; }}
.ring {{ transform-origin: {CORE_X}px {CORE_Y}px; animation: wind 2.6s cubic-bezier(.2,.8,.2,1) both; }}
.glints {{ animation: fade 1.2s 3s ease-out both; }}
.glint {{ animation: twinkle 4s ease-in-out infinite alternate; }}
@keyframes pop {{ from {{ transform: scale(0); }} to {{ transform: none; }} }}
@keyframes fade {{ from {{ opacity: 0; }} to {{ opacity: 1; }} }}
@keyframes wind {{ from {{ opacity: 0; transform: rotate(75deg) scale(1.4); }} to {{ opacity: 1; transform: none; }} }}
@keyframes twinkle {{ from {{ opacity: .15; }} to {{ opacity: 1; }} }}
"""


def star(rng: random.Random):
    """One star on the disc as (radius, angle, brightness)."""
    roll = rng.random()
    if roll < 0.2:  # bulge
        return abs(rng.gauss(0, 0.075)), rng.uniform(0, TAU), rng.uniform(0.6, 1)
    if roll < 0.32:  # haze between the arms
        return math.sqrt(rng.random()) * REACH, rng.uniform(0, TAU), rng.uniform(0.1, 0.4)
    radius = ARM_ROOT + rng.random() ** 1.1 * (REACH - ARM_ROOT)
    arm = rng.randrange(ARMS) * TAU / ARMS
    spread = 0.014 + 0.06 * radius  # arms loosen as they wind out
    angle = arm + math.log(radius / ARM_ROOT) * WINDING + rng.gauss(0, spread) / radius
    radius += rng.gauss(0, 0.012)
    # Clumps along the arm, and a fade toward the rim
    clump = 0.75 + 0.25 * math.sin(angle * 5 + arm)
    brightness = max(0.12, 1.1 - 0.7 * radius) * clump * rng.uniform(0.45, 1)
    return radius, angle, brightness


def project(radius: float, angle: float):
    x, y = radius * math.cos(angle), radius * math.sin(angle) * COS_I
    return round(CORE_X + RADIUS * (x * COS_T - y * SIN_T)), round(CORE_Y + RADIUS * (x * SIN_T + y * COS_T))


def tone(t: Theme, radius: float, rng: random.Random) -> str:
    warm, cool = WARM[t.name], COOL[t.name]
    r = radius + rng.gauss(0, 0.07)
    if r < 0.1:
        return warm[0]
    if r < 0.26:
        return warm[1]
    if r < 0.42:
        return rng.choice([warm[2], t.ink])
    if r < 0.8:
        return rng.choice([t.ink, cool[0]])
    return cool[1]


def squares(points, size: int) -> str:
    """Path data for same-sized squares, each drawn as a short stroke of that thickness."""
    points = sorted(points, key=lambda p: (p[1], p[0]))
    x, y = points[0]
    d = [f"M{x} {y + size / 2:g}h{size}"]
    for nx, ny in points[1:]:
        d.append(f"m{nx - x - size} {ny - y}h{size}")
        x, y = nx, ny
    return "".join(d)


def paths(buckets) -> str:
    return "".join(f'<path stroke="{color}" stroke-width="{size}" opacity="{opacity}" d="{squares(points, size)}"/>'
                   for (color, opacity, size), points in sorted(buckets.items()))


def galaxy(t: Theme, rng: random.Random):
    rings = [defaultdict(list) for _ in range(RINGS)]
    taken, bright = set(), []
    for _ in range(STARS):
        radius, angle, brightness = star(rng)
        x, y = project(radius, angle)
        if not (1 <= x < WIDTH - 3 and 1 <= y < HEIGHT - 3) or (x, y) in taken:
            continue
        taken.add((x, y))
        size = 3 if rng.random() < 0.012 else 2 if rng.random() < 0.1 + 0.15 * brightness else 1
        opacity = LEVELS[min(len(LEVELS) - 1, int(brightness * len(LEVELS)))]
        ring = min(RINGS - 1, int(radius / REACH * RINGS))
        rings[ring][(tone(t, radius, rng), opacity, size)].append((x, y))
        if 0.25 < radius < 1 and brightness > 0.45:
            bright.append((x, y))
    return rings, bright


def field(t: Theme, rng: random.Random):
    buckets = defaultdict(list)
    for _ in range(FIELD_STARS):
        point = rng.randrange(2, WIDTH - 4), rng.randrange(2, HEIGHT - 4)
        buckets[(rng.choice(COOL[t.name]), rng.choice(LEVELS[:2]), 2 if rng.random() < 0.08 else 1)].append(point)
    return buckets


def glints(t: Theme, points, rng: random.Random) -> str:
    """A few plus-shaped stars that keep twinkling, each on its own beat."""
    parts = []
    for x, y in rng.sample(points, GLINTS):
        parts.append(f'<path class="glint" style="animation-duration:{rng.uniform(2.5, 6):.1f}s;'
                     f'animation-delay:-{rng.uniform(0, 6):.1f}s" d="M{x - 2} {y + .5}h5M{x + .5} {y - 2}v5"/>')
    return f'<g class="glints" stroke="{t.ink}" fill="none">{"".join(parts)}</g>'


def render(t: Theme) -> str:
    # Reseeding per theme keeps both prints the same galaxy, star for star
    rng = random.Random(SEED)
    rings, bright = galaxy(t, rng)

    glow_x, glow_y = RADIUS * 0.2, RADIUS * 0.2 * COS_I * 1.3
    defs = (
        '<radialGradient id="core">'
        + "".join(f'<stop offset="{offset}" stop-color="{color}" stop-opacity="{opacity}"/>'
                  for offset, (color, opacity) in zip((0, .3, 1), GLOW[t.name]))
        + '</radialGradient>'
        f'<linearGradient id="top" x2="0" y2="1"><stop offset="0" stop-color="{t.ground}" stop-opacity=".85"/>'
        f'<stop offset="1" stop-color="{t.ground}" stop-opacity="0"/></linearGradient>'
        f'<radialGradient id="copy"><stop offset=".4" stop-color="{t.ground}" stop-opacity=".9"/>'
        f'<stop offset="1" stop-color="{t.ground}" stop-opacity="0"/></radialGradient>'
    )

    sky = [f'<g class="field" fill="none" shape-rendering="crispEdges">{paths(field(t, rng))}</g>']
    for i, ring in enumerate(rings):
        sky.append(f'<g class="ring" style="animation-delay:{0.7 + i * 0.16:.2f}s" fill="none" '
                   f'shape-rendering="crispEdges">{paths(ring)}</g>')
    sky.append(f'<g class="glow" transform="translate({CORE_X} {CORE_Y}) rotate({TILT})">'
               f'<ellipse rx="{glow_x * 2.6:.0f}" ry="{glow_y * 2.6:.0f}" fill="url(#core)" opacity=".35"/>'
               f'<ellipse rx="{glow_x:.0f}" ry="{glow_y:.0f}" fill="url(#core)"/></g>')
    sky.append(f'<rect class="seed" x="{CORE_X - 2}" y="{CORE_Y - 2}" width="4" height="4" fill="{WARM[t.name][0]}"/>')
    sky.append(glints(t, bright, rng))
    # Veils keep the grain quiet under the wordmark and the copy
    sky.append(f'<rect width="{WIDTH}" height="230" fill="url(#top)"/>')
    sky.append(f'<ellipse cx="170" cy="400" rx="330" ry="120" fill="url(#copy)"/>')

    box_x, box_y, box_w, box_h = CORE_X - 160, CORE_Y - 96, 320, 192
    caption_y = box_y + box_h + 22
    copy = [
        f'<g class="enter"><rect x="{PAD}" y="22" width="7" height="7" fill="{t.accent}"/>'
        f'{label(t, PAD + 16, 31, "Ground station · Barcelona")}'
        f'{label(t, WIDTH - PAD, 31, "41.3874° N · 2.1686° E · UTC+1", "end")}</g>',
        pixel_text("POLINTOSH", PAD, 56, 16, t.ink, attrs='class="enter" style="animation-delay:.1s"'),
        pixel_text("KEEP EXPLORING.", PAD, 346, 4, t.accent_ink, dots=True, attrs='class="enter" style="animation-delay:.3s"'),
        f'<g class="enter" style="animation-delay:.4s">'
        f'<text class="sans" x="{PAD}" y="404" fill="{t.body}" font-size="15">'
        f'Apple Developer · Computer Engineer · AI Tinkerer</text>'
        f'{label(t, PAD, 430, "Driven by curiosity", fill=t.dim)}</g>',
        # The caption sits on the outer arm, so each half gets a plate of ground behind it
        f'<g class="enter" style="animation-delay:3.2s">{corners(t, box_x + .5, box_y + .5, box_w, box_h)}'
        f'<rect x="{box_x - 6}" y="{caption_y - 14}" width="144" height="20" fill="{t.ground}" opacity=".85"/>'
        f'<rect x="{box_x + box_w - 82}" y="{caption_y - 14}" width="88" height="20" fill="{t.ground}" opacity=".85"/>'
        f'{label(t, box_x, caption_y, "Fig. 01 · Spiral", fill=t.muted)}'
        f'{label(t, box_x + box_w, caption_y, f"Incl. {INCLINATION}°", "end", t.muted)}</g>',
    ]

    return frame(t, HEIGHT, "polintosh — Keep Exploring.", "\n".join(sky + copy), STYLE, defs)


if __name__ == "__main__":
    save("hero", render)
