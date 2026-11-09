#!/usr/bin/env python3
"""Refresh 2026 NBA Cup group standings from completed ESPN scoreboards.
Only games explicitly listed in the official Cup schedule are eligible.
Fail closed on incomplete data; never overwrite the last verified snapshot.
"""
import datetime as dt
import json
import pathlib
import requests
from collections import Counter
from itertools import combinations

ROOT=pathlib.Path(__file__).resolve().parents[1]
DEST=ROOT/"data/4dk-nba-cup-2026.json"
GROUPS={
"East A":"DET ORL TOR MIL BKN","East B":"CLE MIA PHI NYK IND","East C":"BOS ATL WSH CHI CHA",
"West A":"DAL DEN HOU PHX UTA","West B":"MIN OKC NOP LAC MEM","West C":"GSW SAS LAL POR SAC"}
# NBA Cup matchups by official group-play night; order does not matter.
FIXTURES={
"20261030":"WSH CHA;BOS CHI;DET BKN;PHI NYK;ORL TOR;MIA IND;DAL HOU;MIN LAC;GSW LAL;DEN PHX",
"20261106":"ATL WSH;BOS CHA;CLE PHI;DAL UTA;OKC MEM;TOR MIL;MIN NOP;SAS SAC;LAL POR",
"20261113":"NYK IND;MIL ORL;CLE MIA;ATL CHI;MEM NOP;UTA HOU;GSW SAS;POR SAC;OKC LAC",
"20261120":"CHA ATL;ORL BKN;IND CLE;TOR DET;WSH CHI;NOP OKC;PHX UTA;HOU DEN;SAC LAL",
"20261124":"DET ORL;BOS WSH;DAL DEN",
"20261125":"MIA PHI;CHI CHA;CLE NYK;MIN OKC;LAC MEM;BKN MIL;PHX HOU;SAC GSW;SAS POR",
"20261127":"MIA NYK;MIL DET;PHI IND;BKN TOR;ATL BOS;MEM MIN;DAL PHX;LAL SAS;DEN UTA;NOP LAC;GSW POR"}
ALIASES={"NY":"NYK","GS":"GSW","NO":"NOP","SA":"SAS","WSH":"WSH","UTAH":"UTA"}
def norm(x):return ALIASES.get(x,x)
def validate_schedule():
    if len(GROUPS)!=6 or any(len(v.split())!=5 for v in GROUPS.values()):
        raise ValueError("Expected six groups of five teams")
    teams=[t for names in GROUPS.values() for t in names.split()]
    if len(set(teams))!=30:raise ValueError("Expected 30 unique teams")
    expected={};pairs_seen=set();counts=Counter()
    for date,pairs in FIXTURES.items():
        dt.datetime.strptime(date,"%Y%m%d")
        for value in pairs.split(";"):
            pair=frozenset(value.split())
            if len(pair)!=2 or not pair.issubset(set(teams)):raise ValueError("Invalid Cup pairing")
            if pair in pairs_seen:raise ValueError("Duplicate Cup pairing")
            if sum(pair.issubset(set(names.split())) for names in GROUPS.values())!=1:
                raise ValueError("Cup opponents must share a group")
            pairs_seen.add(pair);counts.update(pair);expected[(date,pair)]=False
    if len(expected)!=60 or any(counts[t]!=4 for t in teams):raise ValueError("Expected 60 unique games and four per team")
    for names in GROUPS.values():
        if not all(frozenset(pair) in pairs_seen for pair in combinations(names.split(),2)):
            raise ValueError("Incomplete group round robin")
    return expected

def main():
    today=dt.datetime.now(dt.timezone.utc).date()
    teams={code:{"team":code,"wins":0,"losses":0,"diff":0,"points":0} for names in GROUPS.values() for code in names.split()}
    expected=validate_schedule();completed=0
    for date,pairs in FIXTURES.items():
        if dt.datetime.strptime(date,"%Y%m%d").date()>today:continue
        url="https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard"
        response=requests.get(url,params={"dates":date,"limit":100},timeout=25)
        response.raise_for_status()
        events=response.json().get("events",[])
        if not isinstance(events,list):raise ValueError("Invalid ESPN events")
        for event in events:
            comps=event.get("competitions",[])
            if len(comps)!=1:continue
            comp=comps[0];sides=comp.get("competitors",[])
            if len(sides)!=2:continue
            names=[norm(x.get("team",{}).get("abbreviation","")) for x in sides]
            key=(date,frozenset(names))
            if key not in expected:continue
            if expected[key]:raise ValueError("Duplicate Cup event "+str(key))
            if not event.get("status",{}).get("type",{}).get("completed"):continue
            # Overtime scoring cannot be used as group differential; fail closed until verified.
            if int(event.get("status",{}).get("period",4))>4:raise ValueError("Cup OT requires regulation-only differential: "+str(key))
            scores=[int(x["score"]) for x in sides]
            if scores[0]==scores[1]:raise ValueError("Tied completed score")
            for i,code in enumerate(names):
                row=teams[code];row["wins"]+=int(scores[i]>scores[1-i]);row["losses"]+=int(scores[i]<scores[1-i])
                row["diff"]+=scores[i]-scores[1-i];row["points"]+=scores[i]
            expected[key]=True;completed+=1
    # A past Cup date must have all games final before publishing.
    for (date,pair),ok in expected.items():
        if dt.datetime.strptime(date,"%Y%m%d").date()<today and not ok:
            raise ValueError("Missing completed Cup matchup on past date: "+date+" "+str(sorted(pair)))
    if sum(x["wins"]+x["losses"] for x in teams.values())!=completed*2:raise ValueError("Games mismatch")
    if sum(x["wins"] for x in teams.values())!=completed or sum(x["losses"] for x in teams.values())!=completed:raise ValueError("Wins/losses mismatch")
    if sum(x["diff"] for x in teams.values())!=0:raise ValueError("Differential mismatch")
    for names in GROUPS.values():
        rows=[teams[n] for n in names.split()]
        if sum(r["wins"] for r in rows)!=sum(r["losses"] for r in rows) or sum(r["diff"] for r in rows)!=0:
            raise ValueError("Group totals mismatch")
        if any(not 0<=r["wins"]+r["losses"]<=4 for r in rows):raise ValueError("Team games out of range")
    grouped={}
    for group,names in GROUPS.items():
        grouped[group]=sorted([teams[n] for n in names.split()],key=lambda t:(-t["wins"]/(t["wins"]+t["losses"]) if t["wins"]+t["losses"] else 0,-t["diff"],-t["points"],t["team"]))
    previous=json.loads(DEST.read_text()) if DEST.exists() else {}
    if completed<previous.get("completed_games",0):raise ValueError("Source regression")
    if completed==previous.get("completed_games") and grouped==previous.get("groups"):print("No new Cup results");return
    payload={"season":"2026","status":"verified","source":"ESPN completed scoreboard; official NBA Cup schedule whitelist","updated_utc":dt.datetime.now(dt.timezone.utc).isoformat(),"completed_games":completed,"groups":grouped}
    DEST.parent.mkdir(exist_ok=True);DEST.write_text(json.dumps(payload,indent=2)+"\n")
    print("Verified NBA Cup games:",completed)
if __name__=="__main__":main()
