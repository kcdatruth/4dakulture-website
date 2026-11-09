"""Conservative ESPN fallback: append only completed, missing NBA box scores.

If ESPN's response is incomplete or its format changes, retain the verified
SportsDataverse data and emit a warning rather than publish guessed totals.
"""
import datetime
import re
import time
import pandas as pd
import requests

BASE = "https://site.api.espn.com/apis/site/v2/sports/basketball/nba"
HEADERS = {"User-Agent": "4DK-Stats-Validator/1.2"}
COLUMNS = {
    "PTS": "points", "REB": "rebounds", "AST": "assists",
    "STL": "steals", "BLK": "blocks",
    "FG": ("field_goals_made", "field_goals_attempted"),
    "3PT": ("three_point_field_goals_made", "three_point_field_goals_attempted"),
    "FT": ("free_throws_made", "free_throws_attempted"),
}

def _get(session, endpoint, params):
    response = session.get(BASE + endpoint, params=params, headers=HEADERS, timeout=25)
    response.raise_for_status()
    return response.json()

def _parse_game(game_id, summary):
    box = summary.get("boxscore", {}).get("players", [])
    if len(box) != 2:
        raise ValueError("ESPN box score missing both teams")
    rows = []
    for team in box:
        athletes = []
        for group in team.get("statistics", []):
            labels = group.get("labels", [])
            if not all(label in labels for label in COLUMNS):
                continue
            for athlete in group.get("athletes", []):
                if athlete.get("didNotPlay") or athlete.get("did_not_play"):
                    continue
                values = athlete.get("stats", [])
                if len(values) != len(labels):
                    raise ValueError("ESPN stats/labels length mismatch")
                if not values or all(str(v).strip() in ("", "--") for v in values):
                    continue
                mapped = dict(zip(labels, values))
                row = {
                    "athlete_display_name": athlete.get("athlete", {}).get("displayName"),
                    "game_id": str(game_id), "season": 2027, "season_type": 2,
                    "did_not_play": False,
                }
                if not row["athlete_display_name"]:
                    raise ValueError("ESPN player name missing")
                for label, target in COLUMNS.items():
                    raw = str(mapped[label]).strip()
                    if isinstance(target, tuple):
                        match = re.fullmatch(r"(\d+)-(\d+)", raw)
                        if not match:
                            raise ValueError("Invalid ESPN shooting line: " + raw)
                        row[target[0]], row[target[1]] = map(int, match.groups())
                    else:
                        if not re.fullmatch(r"\d+", raw):
                            raise ValueError("Invalid ESPN counting stat: " + raw)
                        row[target] = int(raw)
                if row["field_goals_made"] > row["field_goals_attempted"]:
                    raise ValueError("Invalid field goals")
                if row["three_point_field_goals_made"] > row["three_point_field_goals_attempted"]:
                    raise ValueError("Invalid threes")
                if row["free_throws_made"] > row["free_throws_attempted"]:
                    raise ValueError("Invalid free throws")
                athletes.append(row)
        if len(athletes) < 5:
            raise ValueError("ESPN team box score incomplete")
        rows.extend(athletes)
    if len({(r["game_id"], r["athlete_display_name"]) for r in rows}) != len(rows):
        raise ValueError("Duplicate ESPN player-game")
    return rows

def append_recent_missing_games(df, days=5):
    """Return source rows plus ESPN missing finals; never replace existing games."""
    session = requests.Session()
    known = {str(x) for x in df["game_id"].dropna().tolist()}
    today = datetime.datetime.now(datetime.timezone.utc).date()
    additions = []
    for delta in range(days, -1, -1):
        day = today - datetime.timedelta(days=delta)
        if not (datetime.date(2026, 10, 1) <= day <= datetime.date(2027, 6, 30)):
            continue
        try:
            scoreboard = _get(session, "/scoreboard", {"dates": day.strftime("%Y%m%d"), "seasontype": 2, "limit": 30})
            events = scoreboard.get("events", [])
        except (requests.RequestException, ValueError) as exc:
            print(f"::warning title=ESPN fallback::{day}: scoreboard unavailable: {exc}")
            continue
        for event in events:
            game_id = str(event.get("id", ""))
            if not game_id or game_id in known:
                continue
            if not event.get("status", {}).get("type", {}).get("completed", False):
                continue
            if str(event.get("season", {}).get("type", "")) != "2":
                continue
            try:
                summary = _get(session, "/summary", {"event": game_id})
                game_rows = _parse_game(game_id, summary)
                additions.extend(game_rows)
                known.add(game_id)
                print(f"ESPN FALLBACK: added verified final game {game_id}, {len(game_rows)} player rows")
            except (requests.RequestException, ValueError, KeyError, TypeError) as exc:
                print(f"::warning title=ESPN fallback::Skipped game {game_id}: {exc}")
            time.sleep(1.1)
    if not additions:
        print("ESPN FALLBACK: no complete missing games added")
        return df
    extra = pd.DataFrame(additions)
    print(f"ESPN FALLBACK: appended {len(extra)} player-game rows from {len(set(extra.game_id))} finals")
    return pd.concat([df, extra], ignore_index=True)
