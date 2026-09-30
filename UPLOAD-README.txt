4DK NFL — WEEK 4 CURRENT / ARCHIVE CLEANUP

UPLOAD ALL 4 FILES TO THE ROOT OF THE GITHUB REPO ON main:

NEW
- 4dk-week4-current.js
- nfl-week4-preview-2026.html

REPLACE
- pwa-install.js
- service-worker.js

IMPORTANT
- Do NOT delete any Week 1, Week 2 or Week 3 files.
- This update stops the PWA/service worker from injecting the old Week 2 rankings and Red Zone layers.
- Week 2 remains preserved as archive content.
- Week 3 remains accessible through nfl-week3-hub-2026.html.
- Week 4 becomes the current layer.
- The service-worker cache is bumped to v21 so stale v20 NFL assets are cleared.

Suggested commit message:
Update NFL section for Week 4 and preserve Week 1-3 archives
