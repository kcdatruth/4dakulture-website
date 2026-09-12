4 DA KULTURE — NBA + NFL WEEKLY POWER RANKINGS

SAFE UPDATE: This does NOT replace nba.html, nfl.html, index.html, your articles, bottom navigation, or push setup.

UPLOAD TO THE ROOT OF YOUR GITHUB REPO:
1. power-rankings.js       (NEW)
2. service-worker.js       (REPLACE existing file)

COMMIT MESSAGE:
Add 4DK NBA and NFL power rankings

WHAT YOU GET
- NBA power rankings on the NBA section.
- NFL power rankings on the NFL section.
- Top 10 shown first with a Show All button for all 30/32 teams.
- Preseason baseline based on Kcdatruth's existing 2026–27 predictions.
- NFL projected records pulled from the 4DK AFC/NFC preview picks.
- NBA hierarchy built from the latest 4DK preview: OKC over Philly in the Finals, Knicks defending champs, Minnesota/San Antonio/Miami among the major risers.
- A Power Rankings navigation link is added automatically to each league section.

WEEKLY UPDATES
After this first install, DO NOT re-upload service-worker.js every week.
Just ask ChatGPT: "Update my Week 1 power rankings" (or Week 2, Week 3, etc.).
You will only need to replace power-rankings.js.

The rankings file is network-first, so weekly changes are designed to show after a normal refresh instead of staying stuck in the app cache.

FIRST INSTALL
After committing, wait for the site deploy, then close/reopen the 4DK app or refresh the browser page once or twice so the new service worker activates.
