#!/usr/bin/env python3
"""Download candidate 4DK MVP headshots for manual current-team visual QA.

Run from the repository root in an environment with NBA CDN access:
  python3 scripts/stage_mvp_portraits_2026_11_24.py

This intentionally DOES NOT rewrite the Rankings HQ or claim the portraits
show the correct 2026-27 team. Inspect each image before promoting it.
"""
from pathlib import Path
from urllib.request import Request, urlopen
import struct

PLAYERS = [
    ("01-wembanyama", "1641705", "San Antonio Spurs"),
    ("02-doncic", "1629029", "Los Angeles Lakers"),
    ("03-antetokounmpo", "203507", "Miami Heat"),
    ("04-jokic", "203999", "Denver Nuggets"),
    ("05-gilgeous-alexander", "1628983", "Oklahoma City Thunder"),
    ("06-sengun", "1630578", "Houston Rockets"),
    ("07-cunningham", "1630595", "Detroit Pistons"),
    ("08-maxey", "1630178", "Philadelphia 76ers"),
    ("09-tatum", "1628369", "Boston Celtics"),
    ("10-towns", "1626157", "New York Knicks"),
]
DEST = Path("assets/rankings/2026-11-24/mvp-portrait-candidates")
DEST.mkdir(parents=True, exist_ok=True)
failures = []
for slug, player_id, team in PLAYERS:
    url = f"https://cdn.nba.com/headshots/nba/latest/1040x760/{player_id}.png"
    dest = DEST / f"{slug}.png"
    try:
        with urlopen(Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=20) as response:
            data = response.read(5_000_001)
        if len(data) > 5_000_000 or len(data) < 24 or data[:8] != b"\x89PNG\r\n\x1a\n":
            raise ValueError("Invalid or oversized PNG")
        width, height = struct.unpack(">II", data[16:24])
        if not 200 <= width <= 4000 or not 150 <= height <= 4000:
            raise ValueError(f"Unexpected image dimensions {width}x{height}")
        dest.write_bytes(data)
        print(f"STAGED {slug} / {team}: {dest} ({width}x{height})")
    except Exception as exc:
        failures.append((slug, str(exc)))
        print(f"FAILED {slug}: {exc}")
print("\nVisual QA required: player identity, CURRENT team jersey, rights, and actual rendered image.")
print("Do not replace any MVP card with these files before completing visual QA.")
if failures:
    raise SystemExit(f"{len(failures)} of {len(PLAYERS)} candidate images could not be staged")
