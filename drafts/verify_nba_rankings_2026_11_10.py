#!/usr/bin/env python3
"""Fail-closed release QA for 4DK Nov 10 NBA Rankings HQ draft.
Usage: python3 drafts/verify_nba_rankings_2026_11_10.py
This validates data completeness and consistency, NOT factual truth of external sources.
"""
import json
import pathlib
import sys
from datetime import date

BASE = pathlib.Path(__file__).resolve().parent
power = json.loads((BASE / "nba-power30-2026-11-10.json").read_text())
awards = json.loads((BASE / "nba-awards-watch-2026-11-10.json").read_text())
scores = json.loads((BASE / "nba-2026-11-09-verified-results.json").read_text())
failures = []
def check(ok, msg):
    if not ok:
        failures.append(msg)

teams = power["teams"]
check(len(teams) == 30, "Expected 30 teams")
check(sorted(t["rank"] for t in teams) == list(range(1, 31)), "Power 30 ranks must be 1..30")
check(len({t["alias"] for t in teams}) == 30, "Power 30 team aliases not unique")
check(len(scores["games"]) == 8, "Nov 9 scoreboard must contain eight games")
game_map = {}
for game in scores["games"]:
    for alias in (game["away"], game["home"]):
        check(alias not in game_map, f"Duplicate Nov 9 team {alias}")
        game_map[alias] = game
for t in teams:
    alias = t["alias"]
    check(t["previous_rank"] - t["rank"] == t["movement"], f"{alias}: rank movement")
    check(len(t.get("analysis_nov10", "")) >= 250, f"{alias}: missing substantial Nov 10 analysis")
    check(t.get("record_verified") == t.get("record_provisional"), f"{alias}: record mismatch or unverified")
    check(bool(t.get("record_source")), f"{alias}: missing record source")
    games = t.get("last_five", [])
    check(len(games) == 5, f"{alias}: last five incomplete ({len(games)})")
    check(t.get("last_five_status", "").startswith("VERIFIED"), f"{alias}: last five not verified")
    if len(games) == 5:
        check(len({x.get("date") for x in games}) == 5, f"{alias}: duplicate game dates")
        check(all(x.get("date", "") <= "2026-11-09" for x in games), f"{alias}: post-cutoff game")
        check(all(x.get("result") in ("W", "L") and x.get("opponent") and x.get("score") for x in games), f"{alias}: incomplete game entry")
        check(all(games[i]["date"] >= games[i+1]["date"] for i in range(4)), f"{alias}: games out of order")
        check(bool(t.get("last_five_source")), f"{alias}: no last-five source")
        if alias in game_map:
            g = game_map[alias]
            check(games[0]["date"] == "2026-11-09" and games[0]["opponent"] == (g["home"] if alias == g["away"] else g["away"]), f"{alias}: last-five head disagrees with Nov 9 scoreboard")
    if alias in game_map:
        g = game_map[alias]
        expected = "W" if g["winner"] == alias else "L"
        check(t.get("nov9_game", {}).get("result") == expected, f"{alias}: Nov 9 result mismatch")
        check(t.get("nov9_game", {}).get("score") == f"{g['away_points']}-{g['home_points']}" if alias == g["away"] else t.get("nov9_game", {}).get("score") == f"{g['home_points']}-{g['away_points']}", f"{alias}: Nov 9 score mismatch")
    check(t.get("injury_status") not in (None, "PENDING_CURRENT_OFFICIAL_REPORT"), f"{alias}: injury verification outstanding")
    check(len(t.get("last_five_candidate", [])) == 5, f"{alias}: candidate game log incomplete")
    check(all(isinstance(g.get("home"), bool) for g in t.get("last_five_candidate", [])), f"{alias}: candidate home/away field unresolved")
# Cross-team consistency: when both sides have a game on the same date,
# they must agree on opponent, result, score and home/away.
team_by_alias = {t["alias"]: t for t in teams}
for team in teams:
    alias = team["alias"]
    for game in team.get("last_five", []):
        opponent = team_by_alias.get(game.get("opponent"))
        if opponent is None:
            failures.append(f"{alias}: unknown opponent {game.get('opponent')}")
            continue
        other = next((g for g in opponent.get("last_five", []) if g.get("date") == game.get("date") and g.get("opponent") == alias), None)
        if other:
            check(other.get("result") != game.get("result"), f"{alias}: same result as {opponent['alias']} on {game['date']}")
            if isinstance(other.get("home"), bool) and isinstance(game.get("home"), bool):
                check(other["home"] != game["home"], f"{alias}: both teams have same home flag on {game['date']}")
            try:
                a,b = [int(v) for v in game["score"].split("-")]
                c,d = [int(v) for v in other["score"].split("-")]
                check((a,b) == (d,c), f"{alias}: reversed score disagrees with {opponent['alias']} on {game['date']}")
            except (ValueError, KeyError):
                failures.append(f"{alias}: invalid score format on {game.get('date')}")

# Check the reconstructed candidate logs independently from approved last-five logs.
# Every reciprocal game must have reversed scores, opposite results, and opposite venues.
for team in teams:
    alias = team["alias"]
    candidates = team.get("last_five_candidate", [])
    check(len({g.get("date") for g in candidates}) == len(candidates), f"{alias}: duplicate candidate dates")
    check(all(candidates[i]["date"] > candidates[i+1]["date"] for i in range(len(candidates)-1)), f"{alias}: candidate dates out of order")
    for game in candidates:
        opponent = team_by_alias.get(game.get("opponent"))
        check(opponent is not None, f"{alias}: unknown candidate opponent {game.get('opponent')}")
        check(game.get("date", "") <= "2026-11-09", f"{alias}: post-cutoff candidate game")
        if not opponent:
            continue
        other = next((g for g in opponent.get("last_five_candidate", []) if g.get("date") == game.get("date") and g.get("opponent") == alias), None)
        if other:
            check(other.get("result") != game.get("result"), f"{alias}: reciprocal candidate result conflict {game['date']}")
            try:
                a,b = [int(v) for v in game["score"].split("-")]
                c,d = [int(v) for v in other["score"].split("-")]
                check((a,b) == (d,c), f"{alias}: reciprocal candidate score conflict {game['date']}")
            except (ValueError, KeyError):
                failures.append(f"{alias}: candidate score format invalid {game.get('date')}")
            if isinstance(other.get("home"), bool) and isinstance(game.get("home"), bool):
                check(other["home"] != game["home"], f"{alias}: reciprocal candidate venue conflict {game['date']}")
    approved = team.get("last_five", [])
    if len(approved) == 5 and len(candidates) == 5:
        check([(g["date"],g["opponent"],g["score"],g["result"]) for g in approved] == [(g["date"],g["opponent"],g["score"],g["result"]) for g in candidates], f"{alias}: approved and candidate last-five disagree")

for label, key in (("MVP", "mvp_watch"), ("Rookie", "rookie_watch")):
    entries = awards[key]
    check(len(entries) == 10, f"{label}: expected ten entries")
    check(sorted(x["rank"] for x in entries) == list(range(1, 11)), f"{label}: ranks 1..10")
    check(len({x["name"] for x in entries}) == 10, f"{label}: duplicate player")
    for x in entries:
        s = x.get("season_stats") or {}
        check(all(isinstance(s.get(k), (int, float)) for k in ("ppg", "rpg", "apg")), f"{label}: {x['name']} missing complete numeric stats")
        check(bool(x.get("stat_source") or awards.get("stat_source")), f"{label}: {x['name']} missing stats provenance")
# Explicit fail-closed editorial and official-injury gates. Structural completeness
# alone must never authorize publication while these are unresolved.
check(power.get("previous_rank_movement_audit", {}).get("status") == "PASS",
      "Power 30 previous-rank movement audit has not passed")
check(all((isinstance(x.get("previous_rank"), int) and x.get("movement") == x["previous_rank"] - x["rank"]) or (x.get("previous_rank") is None and x.get("movement") is None and x.get("movement_label") == "NEW") for x in awards["mvp_watch"] + awards["rookie_watch"]),
      "Award previous ranks or NEW-entry movement fields invalid")
check(awards.get("previous_rank_movement_audit", {}).get("status") == "PASS",
      "Award movement baseline audit not approved")
check(not awards.get("stat_audit_nov10", {}).get("release_hold", True),
      "Awards data still has explicit publication hold")
check(not power.get("injury_audit_nov10", {}).get("publication_hold", True),
      "Official injury report has explicit publication hold")
check(all(("NOT_YET_SUBMITTED" not in t.get("injury_status", "") and "SECONDARY" not in t.get("injury_status", "")) or (t["alias"] == "PHX" and t.get("injury_status") == "OFFICIAL_PENDING_PUBLISHED_WITH_DISCLOSURE" and power.get("injury_audit_nov10", {}).get("followup_required") is True and bool(power.get("injury_audit_nov10", {}).get("editorial_waiver"))) for t in teams),
      "Injury status unresolved without explicit Phoenix editorial waiver and disclosure")

check("reconciliation" not in awards.get("stats_status", "").lower() and "conflict" not in awards.get("stats_status", "").lower(), "Awards stats still require reconciliation or contain conflicts")
print(f"4DK Rankings HQ November 10 QA: {len(teams)} teams, 20 award candidates, {len(failures)} blockers")
for issue in failures:
    print("BLOCK:", issue)
if failures:
    print("RELEASE HOLD: do not merge or publish")
    sys.exit(1)
print("Structural checks pass; external facts, responsive rendering and links still require human review")
sys.exit(0)
