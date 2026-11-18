#!/usr/bin/env python3
"""Publish a complete, dated NBA roster snapshot from ESPN's roster endpoint."""
import datetime as dt
import json
import pathlib
import time
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / "data/4dk-nba-rosters-verified.json"
TEAMS = {
"1":"Atlanta Hawks","2":"Boston Celtics","17":"Brooklyn Nets","30":"Charlotte Hornets",
"4":"Chicago Bulls","5":"Cleveland Cavaliers","6":"Dallas Mavericks","7":"Denver Nuggets",
"8":"Detroit Pistons","9":"Golden State Warriors","10":"Houston Rockets","11":"Indiana Pacers",
"12":"LA Clippers","13":"Los Angeles Lakers","29":"Memphis Grizzlies","14":"Miami Heat",
"15":"Milwaukee Bucks","16":"Minnesota Timberwolves","3":"New Orleans Pelicans",
"18":"New York Knicks","25":"Oklahoma City Thunder","19":"Orlando Magic",
"20":"Philadelphia 76ers","21":"Phoenix Suns","22":"Portland Trail Blazers",
"23":"Sacramento Kings","24":"San Antonio Spurs","28":"Toronto Raptors",
"26":"Utah Jazz","27":"Washington Wizards"}
def flatten(data):
    for group in data.get("athletes", []):
        if isinstance(group.get("items"), list):
            yield from group["items"]
        else:
            yield group

def main():
    players = {}
    team_counts = {}
    for tid, team in TEAMS.items():
        url = f"https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/{tid}/roster"
        req = urllib.request.Request(url, headers={"User-Agent":"4DaKultureRosterVerifier/1.0","Accept":"application/json"})
        for attempt in range(3):
            try:
                with urllib.request.urlopen(req, timeout=25) as response:
                    data = json.load(response)
                break
            except Exception:
                if attempt == 2: raise
                time.sleep(2 * (attempt + 1))
        athletes = list(flatten(data))
        if len(athletes) < 5:
            raise ValueError(f"Suspiciously short roster: {team} ({len(athletes)})")
        team_counts[tid] = len(athletes)
        for athlete in athletes:
            pid = str(athlete.get("id") or "").strip()
            name = athlete.get("displayName") or athlete.get("fullName") or ""
            if not pid.isdigit() or not name:
                raise ValueError(f"Missing stable player identity: {team}")
            if pid in players and players[pid]["teamId"] != tid:
                raise ValueError(f"Conflicting roster assignment for ESPN athlete {pid}")
            players[pid] = {"id":pid,"name":name,"teamId":tid,"team":team}
    if len(team_counts) != 30 or len(players) < 300:
        raise ValueError("Incomplete leaguewide roster snapshot")
    payload = {
        "schemaVersion":1,"source":"ESPN team roster endpoints",
        "checked_utc":dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%d %H:%M UTC"),
        "teamCount":len(team_counts),"playerCount":len(players),
        "teamCounts":team_counts,"players":players
    }
    OUT.parent.mkdir(parents=True,exist_ok=True)
    OUT.write_text(json.dumps(payload,ensure_ascii=False,indent=2)+"\n")
    print(f"Verified {len(players)} unique player IDs across {len(team_counts)} teams")

if __name__ == "__main__":
    main()
