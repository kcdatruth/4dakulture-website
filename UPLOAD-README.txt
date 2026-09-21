4DK RELATED STORIES + FRANCHISE NAV + HOMEPAGE LIBRARY
========================================================

UPLOAD ALL 4 FILES TO THE REPO ROOT.

NEW
- 4dk-site-enhance.js

REPLACE
- pwa-install.js
- service-worker.js

NOTES
- UPLOAD-README.txt does not affect the site.

WHAT THIS ADDS
1. A permanent "48 Stories" Story Library doorway on the homepage.
2. "Don't Stop Here" related-story cards at the bottom of recognized article pages.
3. Previous / Next navigation for recurring franchises:
   - Mamba Files
   - The Answer Files
   - Classic Albums Revisited
   - Sunday NFL Recaps
   - NBA Division Previews
   - Regional Rapper Rankings
   - AFC/NFC season previews
4. "Story Library" inside the installed-app More menu.
5. "All Stories" added to standard footer link groups when the enhancement is active.

WHAT THIS DOES NOT REMOVE OR REPLACE
- No article body text
- No homepage feature
- No NBA/NFL/Music content
- No scoreboard / Red Zone / picks
- No playlists
- No existing archive/franchise pages
- No worker.js / API logic

The service-worker cache name is bumped from v9 to v10 so the installed app
does not stay stuck on an older cached version of the site shell.

Suggested commit message:
Enhance related stories and site navigation
