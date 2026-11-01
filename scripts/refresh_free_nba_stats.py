#!/usr/bin/env python3
"""Fetch free BoxScore Lab season totals; publish only when schema and player matches verify."""
import csv, io, json, re, urllib.request, datetime, unicodedata, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
URL = 'https://www.boxscorelab.com/downloads/2026-27-player-season-totals.csv'
PLAYERS = json.loads((ROOT / 'data/4dk-player-directory-map.json').read_text())

def norm(s):
    s = unicodedata.normalize('NFKD', str(s or '')).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]', '', s)

def choose(row, aliases):
    keys = {norm(k): k for k in row}
    for alias in aliases:
        if norm(alias) in keys:
            return row[keys[norm(alias)]]
    return None

def num(row, aliases, required=False):
    raw = choose(row, aliases)
    if raw is None or raw == '':
        if required:
            raise ValueError('Missing required numeric column: ' + str(aliases))
        return None
    return float(str(raw).replace(',', ''))

def main():
    req = urllib.request.Request(URL, headers={'User-Agent': '4DK-Public-Stats/1.0'})
    with urllib.request.urlopen(req, timeout=35) as resp:
        content = resp.read(3_000_000).decode('utf-8-sig')
    rows = list(csv.DictReader(io.StringIO(content)))
    if len(rows) < 50:
        raise ValueError('Unexpectedly short CSV; refusing to publish')
    print('Source columns:', list(rows[0]))
    player_names = ['player_name', 'player', 'name', 'full_name', 'player_full_name']
    games_names = ['games', 'gp', 'g', 'games_played']
    pts_names = ['pts', 'points', 'total_points', 'points_total']
    reb_names = ['reb', 'trb', 'rebounds', 'total_rebounds']
    ast_names = ['ast', 'assists', 'total_assists']
    stl_names = ['stl', 'steals']
    blk_names = ['blk', 'blocks']
    fgm_names = ['fgm', 'field_goals_made']
    fga_names = ['fga', 'field_goals_attempted', 'field_goal_attempts']
    tpm_names = ['fg3m', '3pm', 'three_pointers_made', 'three_point_makes']
    tpa_names = ['fg3a', '3pa', 'three_pointers_attempted', 'three_point_attempts']
    ftm_names = ['ftm', 'free_throws_made']
    fta_names = ['fta', 'free_throws_attempted', 'free_throw_attempts']
    if choose(rows[0], player_names) is None:
        raise ValueError('Player-name column missing')
    if choose(rows[0], games_names) is None:
        raise ValueError('Games column missing')
    for col in (pts_names, reb_names, ast_names):
        if choose(rows[0], col) is None:
            raise ValueError('Counting-stat column missing: ' + str(col))
    indexed = {}
    for row in rows:
        key = norm(choose(row, player_names))
        if key:
            indexed.setdefault(key, []).append(row)
    result, unmatched = {}, []
    for player in PLAYERS:
        name = player['name']
        matches = indexed.get(norm(name), [])
        if len(matches) != 1:
            unmatched.append(name)
            continue
        row = matches[0]
        try:
            games = int(num(row, games_names, True))
            if games < 1:
                unmatched.append(name)
                continue
            def avg(names):
                value = num(row, names)
                return round(value / games, 1) if value is not None else None
            def pct(made, attempted):
                m, a = num(row, made), num(row, attempted)
                return round(100 * m / a, 1) if m is not None and a and a > 0 else None
            pts, reb, ast = avg(pts_names), avg(reb_names), avg(ast_names)
            if any(v is None or v < 0 or v > 100 for v in (pts, reb, ast)):
                raise ValueError('Invalid averages')
            result[name] = {
                'games': games, 'ppg': pts, 'rpg': reb, 'apg': ast,
                'spg': avg(stl_names), 'bpg': avg(blk_names),
                'fg_pct': pct(fgm_names, fga_names),
                'fg3_pct': pct(tpm_names, tpa_names),
                'ft_pct': pct(ftm_names, fta_names)
            }
        except (ValueError, TypeError) as exc:
            unmatched.append(name)
            print('Skipped', name, exc)
    if len(result) != len(PLAYERS) or unmatched:
        raise ValueError(
            f'Incomplete player coverage ({len(result)}/{len(PLAYERS)}); '
            f'preserving existing stats. Unmatched: {unmatched}'
        )
    path = ROOT / 'data/4dk-player-stats-2026-27.json'
    if path.exists():
        previous = json.loads(path.read_text())
        for name, current in result.items():
            old = previous.get('players', {}).get(name)
            if old and current['games'] < old['games']:
                raise ValueError(
                    f'Stale feed: {name} fell from {old["games"]} to '
                    f'{current["games"]} games; preserving existing stats'
                )
        if previous.get('players') == result:
            print('No changed player averages; preserving existing dataset timestamp')
            return
    now = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M UTC')
    payload = {
        'season': '2026-27', 'checked_utc': now, 'source': URL,
        'status': 'verified', 'matched': len(result),
        'unmatched': unmatched, 'players': result
    }
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + '\n')
    print('Published', len(result), 'player averages; unmatched:', unmatched)

if __name__ == '__main__':
    main()
