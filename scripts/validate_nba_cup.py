#!/usr/bin/env python3
"""Independently audit every Cup fixture and all standings against NBA.com."""
import html
import json
import re
from collections import Counter
from datetime import datetime
from pathlib import Path

import requests
from refresh_nba_cup import FIXTURES, GROUPS, DEST, validate_schedule

OFFICIAL = 'https://www.nba.com/news/emirates-nba-cup-key-dates-schedule'
NAMES = dict(zip(
    ['Atlanta Hawks','Boston Celtics','Brooklyn Nets','Charlotte Hornets','Chicago Bulls','Cleveland Cavaliers','Dallas Mavericks','Denver Nuggets','Detroit Pistons','Golden State Warriors','Houston Rockets','Indiana Pacers','LA Clippers','Los Angeles Lakers','Memphis Grizzlies','Miami Heat','Milwaukee Bucks','Minnesota Timberwolves','New Orleans Pelicans','New York Knicks','Oklahoma City Thunder','Orlando Magic','Philadelphia 76ers','Phoenix Suns','Portland Trail Blazers','Sacramento Kings','San Antonio Spurs','Toronto Raptors','Utah Jazz','Washington Wizards'],
    'ATL BOS BKN CHA CHI CLE DAL DEN DET GSW HOU IND LAC LAL MEM MIA MIL MIN NOP NYK OKC ORL PHI PHX POR SAC SAS TOR UTA WSH'.split()))
SHORT = {name.split(' ', 1)[1] if name.startswith(('LA ',)) else name: code for name, code in NAMES.items()}
SHORT.update({name:code for name,code in zip(
    ['Hawks','Celtics','Nets','Hornets','Bulls','Cavaliers','Mavericks','Nuggets','Pistons','Warriors','Rockets','Pacers','Clippers','Lakers','Grizzlies','Heat','Bucks','Timberwolves','Pelicans','Knicks','Thunder','Magic','76ers','Suns','Trail Blazers','Kings','Spurs','Raptors','Jazz','Wizards'],
    'ATL BOS BKN CHA CHI CLE DAL DEN DET GSW HOU IND LAC LAL MEM MIA MIL MIN NOP NYK OKC ORL PHI PHX POR SAC SAS TOR UTA WSH'.split())})

def audit(page, dataset):
    articles = [json.loads(s) for s in re.findall(r'<script[^>]*type=[\"\x27]application/ld\+json[\"\x27][^>]*>(.*?)</script>', page, re.S)]
    bodies = [a['articleBody'] for a in articles if isinstance(a,dict) and 'articleBody' in a]
    if len(bodies) != 1: raise ValueError('NBA schedule article missing or ambiguous')
    fixtures = {}; results = {}; date = None; active = False
    for raw in html.unescape(bodies[0]).splitlines():
        line = raw.strip()
        if 'Upcoming Group Play Schedule' in line or 'Complete Group Play Schedule' in line or 'Past Group Play Games' in line:
            active = True; date = None; continue
        m = re.fullmatch(r'(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (Oct\.|Nov\.) (\d{1,2})',line)
        if m and active:
            date = datetime.strptime('2026 '+m[1]+' '+m[2],'%Y %b. %d').strftime('%Y%m%d');continue
        if not date: continue
        upcoming = re.match(r'(.+?) at (.+?) \((East|West) Group ([ABC])\)',line)
        final = re.fullmatch(r'(East|West) Group ([ABC]):\s*(.+?) (\d+), (.+?) (\d+)(?:\s*\(.*\))?',line)
        if upcoming:
            a,b=NAMES[upcoming[1]],NAMES[upcoming[2]];group=upcoming[3]+' '+upcoming[4]
        elif final:
            a,b=SHORT[final[3]],SHORT[final[5]];group=final[1]+' '+final[2]
        else: continue
        key=(date,frozenset((a,b)))
        if key in fixtures: raise ValueError('Duplicate official fixture '+str(key))
        fixtures[key]=group
        if final:results[key]={a:int(final[4]),b:int(final[6])}
    expected=validate_schedule()
    if set(fixtures)!=set(expected):raise ValueError('Official schedule mismatch: missing='+str(set(fixtures)-set(expected))+' extra='+str(set(expected)-set(fixtures)))
    for (_,pair),group in fixtures.items():
        if not pair.issubset(set(GROUPS[group].split())):raise ValueError('Official group mismatch '+group)
    if set(dataset['groups'])!=set(GROUPS):raise ValueError('Dataset must contain the six exact groups')
    totals={t:{'wins':0,'losses':0,'diff':0} for teams in GROUPS.values() for t in teams.split()}
    for scores in results.values():
        a,b=list(scores)
        if scores[a]==scores[b]:raise ValueError('Invalid official final')
        for team,opp in ((a,b),(b,a)):
            totals[team]['wins']+=int(scores[team]>scores[opp]);totals[team]['losses']+=int(scores[team]<scores[opp]);totals[team]['diff']+=scores[team]-scores[opp]
    if dataset['completed_games']!=len(results):raise ValueError('Official/ESPN completed-game counts differ')
    for group,names in GROUPS.items():
        rows=dataset['groups'][group]
        if Counter(x['team'] for x in rows)!=Counter(names.split()):raise ValueError('Incorrect group membership '+group)
        for row in rows:
            if any(row[k]!=v for k,v in totals[row['team']].items()):raise ValueError('Official/ESPN standings differ: '+str(row))
        print(group+': '+', '.join(f"{r['team']} {r['wins']}-{r['losses']} ({r['diff']:+})" for r in rows))
    print(f'PASS: all {len(fixtures)} official fixtures, six groups, 30 teams, {len(results)} completed games, every W/L/DIFF verified')

def main():
    response=requests.get(OFFICIAL,headers={"User-Agent":"Mozilla/5.0", "Accept":"text/html,application/xhtml+xml"},timeout=30);response.raise_for_status()
    audit(response.text,json.loads(DEST.read_text()))
if __name__=='__main__': main()
