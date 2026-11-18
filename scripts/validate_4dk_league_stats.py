#!/usr/bin/env python3
"""4DK leaguewide NBA dataset gate: fail before publishing malformed or regressed data."""
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
league = json.loads((root / "data/4dk-nba-league-stats-2026-27.json").read_text())
ranked = json.loads((root / "data/4dk-player-stats-2026-27.json").read_text())
assert league["season"] == ranked["season"] == "2026-27"
assert league["status"] == ranked["status"] == "verified"
players = league["players"]
assert isinstance(players, dict) and len(players) >= 60
assert league["matched"] == len(players)
ids = set()
for key, p in players.items():
    assert key and p["name"] and 1 <= p["games"] <= 82, key
    for field in ("ppg", "rpg", "apg", "spg", "bpg"):
        assert isinstance(p[field], (int, float)) and p[field] >= 0, (key, field)
    for field in ("fg_pct", "fg3_pct", "ft_pct"):
        assert p[field] is None or 0 <= p[field] <= 100, (key, field)
    if p.get("athlete_id"):
        assert p["athlete_id"] not in ids, "Duplicate athlete ID"
        ids.add(p["athlete_id"])
assert len(ranked["players"]) >= 50
print(f"PASS: {len(players)} leaguewide players, {len(ids)} distinct athlete IDs; ranked snapshot preserved")
