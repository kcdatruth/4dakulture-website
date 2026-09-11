4 DA KULTURE — APP BOTTOM NAV UPDATE

Upload these 4 files to the ROOT of the GitHub repo and overwrite matching files:
- service-worker.js
- pwa-install.js
- app-nav.css
- app-nav.js

Commit message:
Add 4DK app bottom navigation

After the site redeploys:
1. Close the installed 4 Da Kulture app completely.
2. Reopen it while online.
3. If the bottom nav does not show immediately, close/reopen one more time so the new service worker takes control.

Bottom tabs:
Home | NBA | NFL | Music | More

The bottom navigation only displays in the installed/standalone app. The normal website stays unchanged.
