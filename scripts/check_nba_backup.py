import json,pathlib,re,unicodedata
from nba_api.stats.endpoints import leaguedashplayerstats
root=pathlib.Path(__file__).resolve().parents[1]
old=json.loads((root/"data/4dk-player-stats-2026-27.json").read_text())["players"]
directory=json.loads((root/"data/4dk-player-directory-map.json").read_text())
def norm(s):
 return re.sub("[^a-z0-9]","",unicodedata.normalize("NFKD",s).encode("ascii","ignore").decode().lower())
try:
 rows=leaguedashplayerstats.LeagueDashPlayerStats(season="2026-27",per_mode_detailed="PerGame",timeout=25).league_dash_player_stats.get_data_frame().to_dict("records")
except Exception as e:
 print("::warning title=NBA backup unavailable::"+str(e));raise SystemExit(0)
lookup={}
for row in rows:lookup.setdefault(norm(row["PLAYER_NAME"]),[]).append(row)
matched=0;ahead=0
for player in directory:
 name=player["name"];hits=lookup.get(norm(name),[])
 if len(hits)!=1 or name not in old:
  print("MISSING:",name);continue
 matched+=1;gp=int(hits[0]["GP"]);prior=int(old[name]["games"])
 if gp>prior:
  ahead+=1;print("BACKUP AHEAD:",name,"4DK",prior,"backup",gp)
 elif gp<prior:print("BACKUP BEHIND:",name,"4DK",prior,"backup",gp)
print(f"Coverage {matched}/{len(directory)}; backup ahead for {ahead} players.")
print("READ ONLY: Published 4DK data and rankings unchanged.")
