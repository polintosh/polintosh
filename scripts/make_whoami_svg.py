"""Place the ASCII art and info card side by side in a single SVG.

GitHub can only put two images on one row with a <table>, and it always draws
table borders, so the pair is composed here instead. Run after make_ascii_svg.py
and make_info_card.py.
"""
import re

from terminal import ASSETS, save

GAP = 12


def load(name: str):
    svg = (ASSETS / name).read_text()
    width, height = (int(v) for v in re.search(r'width="(\d+)" height="(\d+)"', svg).groups())
    return svg, width, height


def main():
    art, art_width, art_height = load("ascii-art.svg")
    card, card_width, card_height = load("info-card.svg")
    width, height = art_width + GAP + card_width, max(art_height, card_height)
    # Nested <svg> elements keep each panel's own coordinate system and styles
    art = art.replace("<svg ", '<svg x="0" y="0" ', 1)
    card = card.replace("<svg ", f'<svg x="{art_width + GAP}" y="0" ', 1)
    save("whoami.svg", f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" '
                       f'viewBox="0 0 {width} {height}" role="img" aria-label="polintosh — whoami">\n'
                       f'{art}{card}</svg>\n')


if __name__ == "__main__":
    main()
