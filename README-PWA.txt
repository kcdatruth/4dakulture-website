4 DA KULTURE — INSTALLABLE APP (PWA) TEST PACKAGE

UPLOAD TO YOUR GITHUB REPO ROOT:
- index.html (replace existing homepage)
- app.webmanifest
- service-worker.js
- pwa-install.js
- offline.html
- icons/ folder and all files inside it

WHAT THIS DOES
- Makes 4 Da Kulture installable from supported browsers.
- Opens in a standalone app-style window after installation.
- Uses your 4DK logo as the home-screen icon.
- Adds quick app shortcuts for NBA, NFL, Music and Podcast.
- Provides a basic offline fallback.
- Does NOT cache /api/ requests, so live score/data endpoints stay fresh.

TEST ON ANDROID / CHROME
1. Upload/commit all files to the main branch.
2. Wait for the site deployment to finish.
3. Open https://4dakulturemedia.com/ in Chrome.
4. Refresh once.
5. If Chrome fires the install event, an INSTALL 4DK APP button appears near the bottom-right.
6. If it does not appear immediately, use Chrome menu > Add to Home screen / Install app.
7. Launch 4DK from the new home-screen icon.

NOTE
The first visit must be online so the service worker and app shell can install.
