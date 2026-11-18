"""Reconcile ESPN file IDs with NBA.com current team membership and biographies."""
import datetime as dt
import json
import re
import unicodedata
import urllib.request
from collections import Counter


def page(url):
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(request, timeout=40) as response:
        html = response.read().decode()
    match = re.search(r'<script id="__NEXT_DATA__"[^>]*>(.*?)</script>', html, re.S)
    if not match:
        raise ValueError(f"NBA roster page unavailable: {url}")
    return json.loads(match[1])["props"]["pageProps"]


def key(name):
    return re.sub(r"[^a-z0-9]", "", unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode().lower())


def official_rows():
    directory = [p for p in page("https://www.nba.com/players")["players"] if p["ROSTER_STATUS"] == 1]
    teams = {p["TEAM_ID"]: p["TEAM_SLUG"] for p in directory}
    if len(teams) != 30:
        raise ValueError("Incomplete NBA directory")
    rows = []
    for team_id, slug in teams.items():
        roster = page(f"https://www.nba.com/team/{team_id}/{slug}/")["team"]["roster"]
        expected = {p["PERSON_ID"] for p in directory if p["TEAM_ID"] == team_id}
        if expected != {p["PLAYER_ID"] for p in roster}:
            raise ValueError(f"NBA team page and directory disagree: {slug}")
        rows.extend((slug, row) for row in roster)
    return rows


def reconcile(players, rows):
    by_name = {key(p["name"]): p for p in players.values()}
    if len(by_name) != len(players):
        raise ValueError("Ambiguous ESPN player names")
    result = {}
    for slug, row in rows:
        name = row["PLAYER"]
        p = by_name.get(key(name)) or (by_name.get("bobbyportis") if name == "Bobby Portis Jr." else None)
        team_suffix = {"sixers": "76ers"}.get(slug, key(slug))
        if not p or not key(p["team"]).endswith(team_suffix):
            raise ValueError(f"Unresolved athlete or team: {name} / {slug}")
        if p["id"] in result:
            raise ValueError(f"Duplicate athlete: {name}")
        birth = dt.datetime.strptime(row["BIRTH_DATE"], "%b %d, %Y").date()
        feet, inches = map(int, row["HEIGHT"].split("-"))
        result[p["id"]] = {**p, "nbaId": row["PLAYER_ID"], "dateOfBirth": birth.isoformat(),
                           "experience": 0 if row["EXP"] == "R" else int(row["EXP"]),
                           "height": 12 * feet + inches, "weight": int(row["WEIGHT"] or p["weight"])}
        if not p.get("headshot"):
            result[p["id"]]["headshot"] = f'https://cdn.nba.com/headshots/nba/latest/1040x760/{row["PLAYER_ID"]}.png'
    counts = dict(Counter(p["teamId"] for p in result.values()))
    if len(counts) != 30 or min(counts.values()) < 10:
        raise ValueError("Incomplete official rosters")
    return result, counts
