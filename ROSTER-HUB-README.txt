4 DA KULTURE — LIVE NBA + NFL ROSTER HUB (TEST VERSION)

This package is designed as a safe first test. It does NOT replace your NBA or NFL pages yet.

UPLOAD THESE 5 FILES TO THE ROOT OF GITHUB:

1. worker.js
   IMPORTANT: replace the current worker.js.
   This keeps your existing live scores and NFL Pick'em endpoints and adds:
   /api/teams?league=nba
   /api/teams?league=nfl
   /api/roster?league=nba&team=TEAM_ID
   /api/roster?league=nfl&team=TEAM_ID

2. nba-rosters.html
3. nfl-rosters.html
4. rosters.css
5. rosters.js

AFTER DEPLOYMENT, TEST:
https://4dakulturemedia.com/nba-rosters.html
https://4dakulturemedia.com/nfl-rosters.html

WHAT THE TEST HUB SHOWS:
- all NBA / NFL teams
- team logos
- current roster
- player photos where available
- jersey numbers
- positions
- height / weight
- age
- experience
- college
- roster status
- listed injury status where supplied
- NBA salary when supplied by the roster feed
- NFL filters for offense / defense / special teams
- NBA filters for guards / forwards / centers
- live "updated" timestamp

DATA CACHING:
- team directory: about 1 hour
- team roster: about 15 minutes
This means transactions can update without you manually editing all 62 teams.

IMPORTANT:
The roster source is the same public ESPN site API family already used by your score system.
This is an unofficial/undocumented feed, so the page includes graceful error handling if ESPN changes an endpoint.

NEXT STEP AFTER YOU CONFIRM IT WORKS:
I can wire "TEAMS & ROSTERS" buttons directly into nba.html and nfl.html.

Suggested commit:
Add live NBA and NFL roster hubs
