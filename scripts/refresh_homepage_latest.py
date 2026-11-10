#!/usr/bin/env python3
"""Refresh 4DK homepage links from verified published files, never overwrite archives."""
import json
import re
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FEED = ROOT / "homepage-latest.json"
SAFE = re.compile(r"^[a-z0-9][a-z0-9-]*\.html$")
NIGHTCAP = re.compile(r"^nba-nightcap-(\d{4}-\d{2}-\d{2})\.html$")
NFL = re.compile(r"^nfl-sunday-recap-week(\d+)-2026\.html$")

def latest_nfl():
    matches = [(int(m.group(1)), p.name) for p in ROOT.glob("nfl-sunday-recap-week*-2026.html") if (m := NFL.fullmatch(p.name))]
    return max(matches, default=None)

def main():
    data = json.loads(FEED.read_text(encoding="utf-8"))
    sections = data.get("sections", [])
    if not isinstance(sections, list):
        raise ValueError("Invalid homepage feed")
    week = latest_nfl()
    for item in sections:
        if item.get("id") == "nfl" and week:
            item["url"] = week[1]
            item["title"] = f"Week {week[0]} — What We Learned Sunday"
        for field in ("url", "hub"):
            path = item.get(field, "")
            if not SAFE.fullmatch(path) or not (ROOT / path).is_file():
                raise ValueError(f"Missing or invalid {field}: {path}")
    previous = json.loads(FEED.read_text(encoding="utf-8"))
    if data["sections"] != previous["sections"]:
        data["updated"] = datetime.now(timezone.utc).date().isoformat()
    FEED.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Homepage feed validated and refreshed")

if __name__ == "__main__":
    main()
