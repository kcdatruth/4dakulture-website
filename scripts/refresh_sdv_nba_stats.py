#!/usr/bin/env python3
"""4DK verified NBA averages: published rankings are the authoritative roster."""
import argparse, datetime, io, json, pathlib, re, sys, unicodedata
import pandas as pd
import requests

ROOT = pathlib.Path(__file__).resolve().parents[1]
PATH = ROOT / 'data/4dk-player-stats-2026-27.json'
URL = 'https://github.com/sportsdataverse/sportsdataverse-data/releases/download/espn_nba_player_boxscores/player_box_2027.parquet'
FIELDS = ['points','rebounds','assists','steals','blocks','field_goals_made','field_goals_attempted','three_point_field_goals_made','three_point_field_goals_attempted','free_throws_made','free_throws_attempted']

def norm(v):
    v = str(v).replace('’', "'").replace('‘', "'")
    return re.sub('[^a-z0-9]', '', unicodedata.normalize('NFKD', v).encode('ascii','ignore').decode().lower())

def fail(message):
    raise ValueError(message + '; existing published data preserved')

def main(publish):
    previous = json.loads(PATH.read_text())
    page = (ROOT/'top-50-nba-players-2026-27.html').read_text()
    blocks = re.findall(r'<section\b([^>]*\bclass="[^"]*\brank-entry\b[^"]*"[^>]*)>(.*?)(?=<section\b[^>]*\bclass="[^"]*\brank-entry\b|<section\b[^>]*\bclass="[^"]*hm|$)', page, re.S)
    ranked_by_number = {}
    for attrs, body in blocks:
        rank_match = re.search(r'\bid="rank-(\d+)"', attrs)
        name_match = re.search(r'<h2[^>]*>([^<]+)</h2>', body)
        if rank_match and name_match:
            number = int(rank_match.group(1))
            if number in ranked_by_number: fail('Duplicate rank '+str(number))
            ranked_by_number[number] = name_match.group(1).strip()
    if set(ranked_by_number) != set(range(1,51)):
        fail('Published Top 50 must have exactly ranks 1 through 50; found '+str(sorted(ranked_by_number)))
    ranked = [ranked_by_number[n] for n in range(1,51)]
    if len({norm(n) for n in ranked}) != 50: fail('Duplicate ranked player names')
    mentions = re.findall(r'<article\s+class="hm-profile"[^>]*>[\s\S]*?<h3>([^<]+)</h3>', page)
    if not mentions: fail('No honorable mentions found')
    names = list(dict.fromkeys(ranked + mentions))
    required = {norm(n) for n in ranked}
    response = requests.get(URL, timeout=60, headers={'User-Agent':'4DK-Stats-Validator/1.1'})
    response.raise_for_status()
    if not 1000 <= len(response.content) <= 100_000_000: fail('Unexpected source download size')
    df = pd.read_parquet(io.BytesIO(response.content))
    needed = set(FIELDS) | {'athlete_display_name','game_id','season_type','did_not_play'}
    if needed - set(df.columns): fail('Missing source columns: '+str(sorted(needed-set(df.columns))))
    if 'season' in df.columns:
        df = df[pd.to_numeric(df['season'], errors='coerce') == 2027].copy()
    df = df[df['season_type'].astype(str).isin(['2','regular','Regular Season']) & (~df['did_not_play'].fillna(False).astype(bool))].copy()
    if df.empty: fail('No regular-season rows')
    df['key'] = df['athlete_display_name'].map(norm)
    if df.duplicated(subset=['game_id','key']).any():
        duplicates = df[df.duplicated(subset=['game_id','key'], keep=False)]
        for _, group in duplicates.groupby(['game_id','key']):
            if group[FIELDS].astype(str).drop_duplicates().shape[0] != 1: fail('Conflicting duplicate player-game rows')
        df = df.drop_duplicates(subset=['game_id','key'])
    result, missing_mentions = {}, []
    for name in names:
        rows = df[df['key']==norm(name)].copy()
        if rows.empty:
            if norm(name) in required: fail('Ranked player missing from source: '+name)
            missing_mentions.append(name)
            continue
        gp = len(rows)
        prior = next((v.get('games',0) for n,v in previous.get('players',{}).items() if norm(n)==norm(name)),0)
        if gp < prior: fail(f'Stale source for {name}: {gp} < {prior} games')
        if not 1 <= gp <= 82: fail('Implausible games played for '+name)
        for field in FIELDS:
            rows[field] = pd.to_numeric(rows[field], errors='coerce')
            if rows[field].isna().any() or (rows[field] < 0).any(): fail(f'Invalid {field} for {name}')
        totals = rows[FIELDS].sum()
        for made, attempted in [('field_goals_made','field_goals_attempted'),('three_point_field_goals_made','three_point_field_goals_attempted'),('free_throws_made','free_throws_attempted')]:
            if (rows[made] > rows[attempted]).any(): fail(f'Made exceeds attempted for {name}')
        if (rows['points'] > 100).any() or (rows['rebounds'] > 60).any() or (rows['assists'] > 40).any(): fail('Implausible single-game stats for '+name)
        def avg(key): return round(float(totals[key])/gp,1)
        def pct(made,attempted):
            attempts = float(totals[attempted])
            return round(float(totals[made])*100/attempts,1) if attempts else None
        result[name] = dict(games=gp,ppg=avg('points'),rpg=avg('rebounds'),apg=avg('assists'),spg=avg('steals'),bpg=avg('blocks'),fg_pct=pct('field_goals_made','field_goals_attempted'),fg3_pct=pct('three_point_field_goals_made','three_point_field_goals_attempted'),ft_pct=pct('free_throws_made','free_throws_attempted'))
        print(f'{name}: {prior} -> {gp} GP, {result[name]["ppg"]} PPG')
    if not required.issubset({norm(n) for n in result}): fail('Ranked coverage mismatch')
    for name, value in previous.get('players',{}).items():
        if norm(name) in {norm(n) for n in names} and norm(name) not in {norm(n) for n in result}:
            result[name] = value
    changed = result != previous.get('players',{}) or previous.get('matched') != len(result)
    print(f'VALIDATED: all 50 ranked + {len(result)-50} others; unmatched mentions={missing_mentions}; changed={changed}; publish={publish}')
    if not publish:
        print('DRY RUN: No files changed'); return
    if not changed:
        print('No changes; original timestamp preserved'); return
    payload = dict(season='2026-27',checked_utc=datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M UTC'),source=URL,status='verified',matched=len(result),unmatched=missing_mentions,players=result)
    PATH.write_text(json.dumps(payload,indent=2,ensure_ascii=False)+'\n')
    print('WROTE ONLY:',PATH.relative_to(ROOT))

if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--publish',action='store_true')
    args=parser.parse_args()
    try: main(args.publish)
    except Exception as exc:
        print(f'::error title=4DK source validation failed::{type(exc).__name__}: {exc}')
        sys.exit(1)
