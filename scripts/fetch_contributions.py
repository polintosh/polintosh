"""Scrape the public contribution calendar into data/contributions.json.

Uses the same HTML fragment the profile page renders, so no token is needed.
"""
import json
import re
import sys
from datetime import date
from pathlib import Path

import requests
from bs4 import BeautifulSoup

USER = "polintosh"
URL = f"https://github.com/users/{USER}/contributions"
OUT = Path(__file__).resolve().parent.parent / "data" / "contributions.json"


def parse_count(tooltip: str) -> int:
    # Tooltips read "No contributions on …" or "3 contributions on …"
    match = re.match(r"(\d+) contributions?", tooltip)
    return int(match.group(1)) if match else 0


def streaks(days):
    longest = run = 0
    for day in days:
        run = run + 1 if day["count"] else 0
        longest = max(longest, run)
    current = 0
    # Today may not have contributions yet; don't let that break the streak.
    tail = days[:-1] if days and days[-1]["count"] == 0 else days
    for day in reversed(tail):
        if not day["count"]:
            break
        current += 1
    return current, longest


def main():
    response = requests.get(URL, timeout=30)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")

    tooltips = {tip["for"]: tip.get_text(strip=True) for tip in soup.select("tool-tip[for]")}
    days = []
    for cell in soup.select("td.ContributionCalendar-day[data-date]"):
        days.append({
            "date": cell["data-date"],
            "level": int(cell.get("data-level", 0)),
            "count": parse_count(tooltips.get(cell.get("id"), "")),
        })
    if not days:
        sys.exit(f"No contribution cells found at {URL}; GitHub markup may have changed.")
    days.sort(key=lambda d: d["date"])

    current, longest = streaks(days)
    best = max(days, key=lambda d: d["count"])
    data = {
        "user": USER,
        "generated": date.today().isoformat(),
        "total": sum(d["count"] for d in days),
        "current_streak": current,
        "longest_streak": longest,
        "best_day": {"date": best["date"], "count": best["count"]},
        "days": days,
    }
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps(data, indent=1) + "\n")
    print(f"{len(days)} days, {data['total']} contributions -> {OUT.name}")


if __name__ == "__main__":
    main()
