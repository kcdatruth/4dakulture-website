#!/usr/bin/env python3
"""Publish independently validated full-league NBA averages; never modify 4DK Top 50 profiles."""
import datetime, io, json, pathlib, re, sys, unicodedata
import pandas as pd
import requests
ROOT=pathlib.Path(__file__).resolve().parents[1]
DEST=ROOT/'data/4dk-nba-league-leaders-2026-27.json'
URL='https://github.com/sportsdataverse/sportsdataverse-data/releases/download/espn_nba_player_boxscores/player_box_2027.parquet'
FIELDS=['points','rebounds','assists','steals','blocks','field_goals_made','field_goals_attempted','three_point_field_goals_made','three_point_field_goals_attempted','free_throws_made','free_throws_attempted']
def norm(s):return re.sub(r'[^a-z0-9]','',unicodedata.normalize('NFKD',str(s)).encode('ascii','ignore').decode().lower())
def warn_if_unchanged(checked_utc):
    """Make successful but unchanged upstream feeds visible in GitHub Actions."""
    try:
        last = datetime.datetime.strptime(checked_utc, '%Y-%m-%d %H:%M UTC').replace(tzinfo=datetime.timezone.utc)
        age_hours = (datetime.datetime.now(datetime.timezone.utc) - last).total_seconds() / 3600
    except (TypeError, ValueError):
        print('::warning title=4DK NBA stats freshness::Upstream box scores unchanged; last refresh time unavailable')
        return
    print(f'4DK UPSTREAM FRESHNESS: last published update {checked_utc}; age {age_hours:.1f} hours')
    if age_hours >= 12:
        print(f'::warning title=4DK NBA stats source has not advanced::No new player-game records detected for {age_hours:.1f} hours. Workflow succeeded but stats did NOT refresh. Check upstream SportsDataverse/ESPN feed; existing verified averages preserved.')

def main():
    resp=requests.get(URL,timeout=90,headers={'User-Agent':'4DK-Full-League-Stats/1.0'});resp.raise_for_status()
    if not 1000<len(resp.content)<100_000_000:raise ValueError('Invalid download size')
    df=pd.read_parquet(io.BytesIO(resp.content))
    required=set(FIELDS)|{'athlete_display_name','game_id','season_type','did_not_play'}
    if required-set(df.columns):raise ValueError('Missing columns '+str(required-set(df.columns)))
    if 'season' in df:df=df[pd.to_numeric(df.season,errors='coerce')==2027]
    df=df[df.season_type.astype(str).isin(['2','regular','Regular Season']) & ~df.did_not_play.fillna(False).astype(bool)].copy()
    df['key']=df.athlete_display_name.map(norm)
    df=df[df.key.str.len()>2].copy()
    if df.empty:raise ValueError('No valid regular-season data')
    if df.duplicated(['game_id','key']).any():
        for _,grp in df[df.duplicated(['game_id','key'],keep=False)].groupby(['game_id','key']):
            if len(grp[FIELDS].astype(str).drop_duplicates())!=1:raise ValueError('Conflicting player-game duplicates')
        df=df.drop_duplicates(['game_id','key'])
    for field in FIELDS:
        df[field]=pd.to_numeric(df[field],errors='coerce')
        if df[field].isna().any() or (df[field]<0).any():raise ValueError('Invalid '+field)
    for made,att in [('field_goals_made','field_goals_attempted'),('three_point_field_goals_made','three_point_field_goals_attempted'),('free_throws_made','free_throw_attempts')]:
        if att=='free_throw_attempts':att='free_throws_attempted'
        if (df[made]>df[att]).any():raise ValueError('Made exceeds attempts')
    if (df.points>100).any() or (df.rebounds>60).any() or (df.assists>40).any():raise ValueError('Implausible game totals')
    result={}
    for key,grp in df.groupby('key'):
        gp=len(grp)
        if gp<1 or gp>82:raise ValueError('Implausible games played')
        name=str(grp.athlete_display_name.mode().iloc[0]);tot=grp[FIELDS].sum()
        def avg(field):return round(float(tot[field])/gp,1)
        def pct(made,att):return round(100*float(tot[made])/float(tot[att]),1) if tot[att] else None
        result[name]={'games':gp,'ppg':avg('points'),'rpg':avg('rebounds'),'apg':avg('assists'),'spg':avg('steals'),'bpg':avg('blocks'),'fg_pct':pct('field_goals_made','field_goals_attempted'),'fg3_pct':pct('three_point_field_goals_made','three_point_field_goals_attempted'),'ft_pct':pct('free_throws_made','free_throws_attempted'),'three_pm':avg('three_point_field_goals_made'),'fga':int(tot['field_goals_attempted']),'three_pa':int(tot['three_point_field_goals_attempted']),'fta':int(tot['free_throws_attempted'])}
    if len(result)<200 or len(result)>700:raise ValueError(f'Unexpected player coverage: {len(result)}')
    if DEST.exists():
        prev=json.loads(DEST.read_text())
        old=prev.get('players',{})
        if len(result)<len(old)*0.85:raise ValueError('Suspicious drop in player coverage')
        for name,stats in old.items():
            if name in result and result[name]['games']<stats.get('games',0):raise ValueError('Stale source for '+name)
        if result==old:
            print('No new stats; existing timestamp preserved')
            warn_if_unchanged(prev.get('checked_utc'))
            return
    DEST.parent.mkdir(parents=True,exist_ok=True)
    payload={'season':'2026-27','status':'verified','scope':'full-league','checked_utc':datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M UTC'),'source':URL,'matched':len(result),'players':result}
    DEST.write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n');print('Validated',len(result),'players; wrote',DEST)
if __name__=='__main__':
    try:main()
    except Exception as e:print('::error::'+str(e));sys.exit(1)
