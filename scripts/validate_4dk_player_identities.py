#!/usr/bin/env python3
"""Validate 4DK player identities without altering published rankings or articles."""
import json
import pathlib
import re
import unicodedata
from collections import defaultdict

ROOT = pathlib.Path(__file__).resolve().parents[1]
def read(path):
    return json.loads((ROOT / path).read_text(encoding="utf-8"))
def norm(value):
    value = unicodedata.normalize("NFKD", str(value or ""))
    return re.sub(r"[^a-z0-9]", "", "".join(c for c in value if not unicodedata.combining(c)).lower())
def player_id(value):
    return re.sub(r"\.0$", "", str(value or ""))
def unique(records, label, field):
    seen = {}
    for p in records:
        key = field(p)
        if not key:
            raise ValueError(f"{label}: missing identity for {p}")
        if key in seen:
            raise ValueError(f"{label}: duplicate {key}: {seen[key]} / {p.get('name')}")
        seen[key] = p.get("name")
    return seen

def main():
    index = read("data/4dk-league-player-index.json")
    stats = read("data/4dk-nba-league-stats-2026-27.json")
    rosters = read("data/4dk-nba-rosters-verified.json")
    editorial = index["players"]
    statistical = list(stats["players"].values())
    roster = list(rosters["players"].values())
    if stats.get("status") != "verified" or stats.get("season") != index.get("season"):
        raise ValueError("Statistics are not a verified matching season")
    if rosters.get("teamCount") != 30 or rosters.get("playerCount") != len(roster):
        raise ValueError("Roster snapshot is incomplete")
    editorial_names = unique(editorial, "editorial names", lambda p: norm(p["name"]))
    stat_names = unique(statistical, "stat names", lambda p: norm(p["name"]))
    stat_ids = unique(statistical, "stat IDs", lambda p: player_id(p.get("athlete_id")))
    roster_names = unique(roster, "roster names", lambda p: norm(p["name"]))
    roster_ids = unique(roster, "roster IDs", lambda p: player_id(p.get("id")))
    aliases = {}
    for p in editorial:
        for alias in p.get("aliases", []):
            key = norm(alias)
            if key in aliases and aliases[key] != p["name"]:
                raise ValueError(f"Ambiguous alias {alias}")
            if key in editorial_names and key != norm(p["name"]):
                raise ValueError(f"Alias collides with another editorial player: {alias}")
            aliases[key] = p["name"]
        name = norm(p["name"])
        eid = player_id(p.get("athleteId"))
        if eid:
            if eid not in stat_ids or eid not in roster_ids:
                raise ValueError(f"Editorial athlete ID is not in both feeds: {p['name']}")
            if name != norm(stat_ids[eid]) or name != norm(roster_ids[eid]):
                raise ValueError(f"Editorial athlete ID/name mismatch: {p['name']}")
        elif name not in stat_names or name not in roster_names:
            raise ValueError(f"Editorial identity not found in both feeds: {p['name']}")
    absent = [p["name"] for p in statistical if player_id(p["athlete_id"]) not in roster_ids]
    print(f"PASS: {len(editorial)} editorial, {len(statistical)} statistical, {len(roster)} roster identities; {len(aliases)} aliases")
    print(f"INFO: {len(absent)} statistical players absent from current roster snapshot: {', '.join(absent) or 'none'}")
if __name__ == "__main__":
    main()
