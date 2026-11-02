#!/usr/bin/env python3
"""4DK SportsDataverse season averages: dry run by default; --publish writes only season stats JSON."""
import argparse, datetime, io, json, pathlib, re, sys, unicodedata
import pandas as pd
import requests

ROOT = pathlib.Path(__file__).resolve().parents[1]
PATH = ROOT / 'data/4dk-player-stats-2026-27.json'
URL = 'https://github.com/sportsdataverse/sportsdataverse-data/releases/download/espn_nba_player_boxscores/player_box_2027.parquet'
FIELDS = ['points','rebounds','assists','steals','blocks','field_goals_made','field_goals_attempted','three_point_field_goals_made','three_point_field_goals_attempted','free_throws_made','free_throws_attempted']

def norm(v):
    v = unicodedata.normalize('NFKD', str(v)).encode('ascii','ignore').decode().lower()
    return re.sub('[^a-z0-9]', '', v)

def fail(message):
    raise ValueError(message + '; existing published data preserved')

def main(publish):
    previous = json.loads(PATH.read_text())
    names = [p['name'] for p in json.loads((ROOT/'data/4dk-player-directory-map.json').read_text())]
    response = requests.get(URL, timeout=60, headers={'User-Agent':'4DK-Stats-Validator/1.0'})
    response.raise_for_status()
    if len(response.content) < 1000 or len(response.content) > 100_000_000:
        fail('Unexpected source download size')
    df = pd.read_parquet(io.BytesIO(response.content))
    needed = set(FIELDS) | {'athlete_display_name','game_id','season_type','did_not_play'}
    if needed - set(df.columns):
        fail('Missing source columns: '+str(sorted(needed-set(df.columns))))
    if 'season' in df.columns:
        season = pd.to_numeric(df['season'], errors='coerce')
        df = df[season == 2027].copy()
    df = df[df['season_type'].astype(str).isin(['2','regular','Regular Season']) & (~df['did_not_play'].fillna(False).astype(bool))].copy()
    if df.empty:
        fail('No regular-season rows')
    df['key'] = df['athlete_display_name'].map(norm)
    if df.duplicated(subset=['game_id','key']).any():
        # Some providers repeat identical player-game rows. Reject conflicting repeats.
        duplicates = df[df.duplicated(subset=['game_id','key'], keep=False)]
        for _, group in duplicates.groupby(['game_id','key']):
            if group[FIELDS].astype(str).drop_duplicates().shape[0] != 1:
                fail('Conflicting duplicate player-game rows')
        df = df.drop_duplicates(subset=['game_id','key'])
    result = {}
    for name in names:
        rows = df[df['key']==norm(name)].copy()
        if rows.empty:
            fail('Player missing: '+name)
        gp = len(rows)
        prior = previous.get('players',{}).get(name,{}).get('games',0)
        if gp < prior:
            fail(f'Stale source for {name}: {gp} < {prior} games')
        if gp > 82 or gp < 1:
            fail('Implausible games played for '+name)
        for field in FIELDS:
            rows[field] = pd.to_numeric(rows[field], errors='coerce')
            if rows[field].isna().any() or (rows[field] < 0).any():
                fail(f'Invalid {field} for {name}')
        totals = rows[FIELDS].sum()
        for made, attempted in [('field_goals_made','field_goals_attempted'),('three_point_field_goals_made','three_point_field_goals_attempted'),('free_throws_made','free_throws_attempted')]:
            if (rows[made] > rows[attempted]).any():
                fail(f'Made exceeds attempted for {name}')
        if (rows['points'] > 100).any() or (rows['rebounds'] > 60).any() or (rows['assists'] > 40).any():
            fail('Implausible single-game stats for '+name)
        def avg(key): return round(float(totals[key])/gp,1)
        def pct(made,attempted):
            attempts = float(totals[attempted]); return round(float(totals[made])*100/attempts,1) if attempts else None
        result[name] = dict(games=gp,ppg=avg('points'),rpg=avg('rebounds'),apg=avg('assists'),spg=avg('steals'),bpg=avg('blocks'),fg_pct=pct('field_goals_made','field_goals_attempted'),fg3_pct=pct('three_point_field_goals_made','three_point_field_goals_attempted'),ft_pct=pct('free_throws_made','free_throws_attempted'))
        print(f'{name}: {prior} -> {gp} GP, {result[name]["ppg"]} PPG')
    if len(result) != 50 or set(result) != set(previous['players']):
        fail('50-player coverage mismatch')
    changed = result != previous['players']
    print(f'VALIDATED: {len(result)}/50; changed={changed}; publish={publish}')
    if not publish:
        print('DRY RUN: No files changed')
        return
    if not changed:
        print('No changes; original timestamp preserved')
        return
    payload = dict(season='2026-27',checked_utc=datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M UTC'),source=URL,status='verified',matched=50,unmatched=[],players=result)
    PATH.write_text(json.dumps(payload,indent=2,ensure_ascii=False)+'\n')
    print('WROTE ONLY:',PATH.relative_to(ROOT))

if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--publish',action='store_true',help='Write only current-season stats after all validation')
    args=parser.parse_args()
    try: main(args.publish)
    except Exception as exc:
        print(f'::error title=4DK source validation failed::{type(exc).__name__}: {exc}')
        sys.exit(1)
