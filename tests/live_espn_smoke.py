#!/usr/bin/env python3
"""Read-only live ESPN validation for the 4DK fallback PR."""
import datetime
import sys
import requests
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from espn_live_fallback import _get, _parse_game

def main():
    session = requests.Session()
    day = "20261108"
    board = _get(session, "/scoreboard", {"dates": day, "seasontype": 2, "limit": 30})
    events = [e for e in board.get("events", []) if e.get("status", {}).get("type", {}).get("completed")]
    if not events:
        raise ValueError("ESPN returned no completed November 8 games; cannot validate live feed")
    print(f"ESPN LIVE CHECK: {len(events)} completed events on {day}", flush=True)
    total = 0
    for event in events:
        game_id = str(event["id"])
        summary = _get(session, "/summary", {"event": game_id})
        rows = _parse_game(game_id, summary)
        print(f"VALIDATED {game_id}: {len(rows)} player rows, {event.get('name')}", flush=True)
        total += len(rows)
    if total < len(events) * 10:
        raise ValueError("Insufficient player coverage")
    print(f"ESPN LIVE VALIDATED: {len(events)} games, {total} player rows. No data files modified.", flush=True)

if __name__ == "__main__":
    main()
