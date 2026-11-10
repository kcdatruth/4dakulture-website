#!/usr/bin/env python3
"""Publish ESPN NBA/NFL standings only after validating complete league coverage."""
import datetime, json, pathlib, sys
import requests

ROOT = pathlib.Path(__file__).resolve().parents[1]
LEAGUES = {"nba": ("basketball", 30), "nfl": ("football", 32)}

def groups(node):
    if isinstance(node, dict):
        if isinstance(node.get("standings"), dict):
            yield node["standings"]
        for child in node.get("children", []):
            yield from groups(child)

def extract(payload, league):
    expected = LEAGUES[league][1]
    found = {}
    for block in groups(payload):
        for entry in block.get("entries", []):
            team = entry.get("team", {})
            tid = str(team.get("id", ""))
            if not tid:
                continue
            stats = {str(s.get("name", "")).lower(): s for s in entry.get("stats", [])}
            def number(*keys):
                for key in keys:
                    obj = stats.get(key.lower())
                    if obj is not None:
                        try:
                            return int(float(obj.get("value")))
                        except (ValueError, TypeError):
                            pass
                return None
            wins = number("wins")
            losses = number("losses")
            ties = number("ties")
            if wins is None or losses is None or wins < 0 or losses < 0:
                raise ValueError("Missing/invalid win-loss record for " + str(team.get("displayName")))
            if league == "nfl" and ties is None:
                ties = 0
            row = {
                "id": tid, "name": team.get("displayName"),
                "abbreviation": team.get("abbreviation"),
                "wins": wins, "losses": losses,
                "ties": ties if league == "nfl" else None,
                "pct": round((wins + (ties or 0) * .5) / max(1, wins + losses + (ties or 0)), 3),
                "logo": next((x.get("href") for x in team.get("logos", []) if x.get("href")), None),
                "group": block.get("name") or block.get("displayName") or "",
            }
            if not row["name"] or not row["abbreviation"]:
                raise ValueError("Missing team identity")
            if tid in found and (found[tid]["wins"],found[tid]["losses"]) != (wins, losses):
                raise ValueError("Conflicting standings for " + tid)
            found[tid] = row
    if len(found) != expected:
        raise ValueError(f"{league.upper()} coverage incomplete: {len(found)}/{expected}")
    rows = sorted(found.values(), key=lambda r: (-r["pct"], -r["wins"], r["name"]))
    return rows

def main():
    selected = sys.argv[1:] or list(LEAGUES)
    if any(league not in LEAGUES for league in selected):
        raise ValueError("Choose nba or nfl")
    for league in selected:
        sport, _ = LEAGUES[league]
        url = f"https://site.api.espn.com/apis/v2/sports/{sport}/{league}/standings"
        response = requests.get(url, params={"season": 2026 if league == "nfl" else 2027}, timeout=35, headers={"User-Agent":"4DK-Standings/1.0"})
        response.raise_for_status()
        rows = extract(response.json(), league)
        path = ROOT / "data" / f"4dk-{league}-standings-2026.json"
        previous = json.loads(path.read_text()) if path.exists() else {}
        if previous.get("teams") == rows:
            print(f"{league.upper()}: no record changes; previous timestamp preserved")
            continue
        data = {
            "league": league.upper(), "season": "2026-27" if league == "nba" else "2026",
            "updated_utc": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d %H:%M UTC"),
            "source": url, "status": "verified", "teams": rows,
        }
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
        print(f"{league.upper()}: validated {len(rows)} teams; updated {path}")

if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"::error title=4DK standings validation failed::{exc}")
        sys.exit(1)
