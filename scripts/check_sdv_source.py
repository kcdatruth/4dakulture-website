"""Read-only 4DK check of SportsDataverse 2026-27 ESPN NBA player box scores."""
import io, json, pathlib, re, sys, unicodedata
import pandas as pd
import requests

ROOT = pathlib.Path(__file__).resolve().parents[1]
current = json.loads((ROOT / 'data/4dk-player-stats-2026-27.json').read_text())['players']
url = ('https://github.com/sportsdataverse/sportsdataverse-data/releases/'
       'download/espn_nba_player_boxscores/player_box_2027.parquet')

def norm(value):
    value = unicodedata.normalize('NFKD', str(value)).encode('ascii','ignore').decode().lower()
    return re.sub('[^a-z0-9]', '', value)

try:
    response = requests.get(url, timeout=45, headers={'User-Agent':'4DK-source-validator/1.0'})
    response.raise_for_status()
    df = pd.read_parquet(io.BytesIO(response.content))
except Exception as exc:
    print(f'::error title=SportsDataverse source unavailable::{type(exc).__name__}: {exc}')
    sys.exit(1)

needed = {'athlete_display_name','game_id','season_type','did_not_play','points','rebounds','assists','steals','blocks','field_goals_made','field_goals_attempted','three_point_field_goals_made','three_point_field_goals_attempted','free_throws_made','free_throws_attempted'}
missing = needed - set(df.columns)
if missing:
    print(f'::error title=Schema mismatch::Missing fields: {sorted(missing)}')
    sys.exit(1)

df = df[(df['season_type'].astype(str).isin(['2','regular','Regular Season'])) & (df['did_not_play'] != True)].copy()
df = df.drop_duplicates(subset=['game_id','athlete_display_name'])
df['key'] = df['athlete_display_name'].map(norm)
print(f'Source rows (regular season, played): {len(df)}; latest game date: {df.game_date.max() if "game_date" in df else "not supplied"}')
matched = ahead = behind = same = 0
for name, previous in current.items():
    rows = df[df.key == norm(name)]
    if rows.empty:
        print(f'MISSING: {name}')
        continue
    matched += 1
    gp = len(rows)
    prior = int(previous['games'])
    status = 'AHEAD' if gp > prior else 'BEHIND' if gp < prior else 'SAME'
    ahead += gp > prior
    behind += gp < prior
    same += gp == prior
    pts = pd.to_numeric(rows['points'], errors='coerce').sum() / gp
    print(f'{status}: {name} | published GP {prior} | candidate GP {gp} | candidate PPG {pts:.1f}')
print(f'Coverage {matched}/{len(current)}; ahead {ahead}; same {same}; behind {behind}.')
print('READ ONLY: No files, rankings, or profiles were changed.')
if matched < len(current):
    print('::error title=Insufficient coverage::Source did not match every published player.')
    sys.exit(1)
if behind:
    print('::warning title=Source behind::Candidate is behind published stats for some players.')
