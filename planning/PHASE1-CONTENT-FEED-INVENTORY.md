# 4DK Phase 1 — Verified Content Feed and Dependency Inventory
Date: 2026-11-22
Scope: sampled GitHub code search and file inspection; NOT a complete repository tree audit.
Branch: 4dk-master-upgrade-phase1-2026-11-22

## Confirmed feed files
| File | Verified observation | Risk / next test |
| --- | --- | --- |
| nightcap-latest.json | date NOVEMBER 21, 2026; url nba-nightcap-2026-11-21.html; previousUrl November 20 | Confirm homepage and NBA hub use this feed consistently |
| nightcap-latest.js | Fetches nightcap-latest.json; static HTML fallback | Check load and fallback behavior |
| nfl-weekly-index.json | current_week 11, updated 2026-11-20; includes Week 11 TNF and rankings | Validate all Week 11 links and archive indexing |
| 4dk-frontdesk-feed.json | inspected first entries date October 21 and October 19 | Determine whether stale entries are intended archives or mistakenly selected as current homepage features |
| nba-nightcap-index.json | inspected first entries November 15, 14, 13 | Compare against later published Nightcaps and determine archive completeness; do not overwrite |
| app.webmanifest | standalone PWA, 192/512 and maskable icons | Validate referenced icons, service worker, and install UX |

## Confirmed page and code dependencies
- index.html: styles.css, scores.css, home-frontpage-v2.css, 4dk-magazine-identity.css, home-frontpage-v2.js, pwa-install.js, app.webmanifest and inline CSS.
- nfl-weekly-hq.html reads nfl-weekly-index.json.
- scripts/update_nfl_weekly_index.py exists.
- scripts/import_nightcap_zip.py exists.
- scripts/qa_week10_release.mjs exists.
- rankings.html, nba-rankings-hq.html, power-rankings.js and older week-specific loaders exist.
- album-files.html and 4dk-album-files-library.html coexist; cover-specific CSS themes exist for multiple album reviews.
- data/4dk-player-scouting.json has an editorial policy requiring original human-reviewed scouting reports.

## Non-destructive implementation tasks
1. Build a full tracked-file manifest (paths, sizes, hashes, file categories) from an authenticated repository export/tree when available.
2. Inventory all homepage sections and script/CSS dependencies, checking which are visible and which are fallback-only.
3. Create a source-of-truth matrix for latest content and archives; define feed owners and date freshness rules.
4. Validate all feed href targets, image references and article archive links.
5. Design a staging homepage using existing live content and preserved article paths; avoid replacing approved editorial text.
6. Test mobile menu, navigation, accessibility, PWA cache, and performance.
7. Require a before/after URL inventory and zero missing preserved URLs before merging.

## Preservation checkpoint
- Baseline commit: b125f99bac34195ff2f26be0d35ec4383508dd8b
- Immutable-by-policy reference branch: 4dk-preservation-snapshot-2026-11-22
- Development branch: 4dk-master-upgrade-phase1-2026-11-22
- A branch is not an offsite backup. Export a separate repository archive and verify it before any high-risk changes.

## Current status
Verified sampled inventory only. No live homepage or data feed files modified. No content removed.


## Editorial image inventory — GitHub Actions run #7 (2026-11-23)

The staging workflow enumerated **504 image files**: 323 .jpg, 59 .jpeg, 60 .png, and 62 .webp. This is an existence-only inventory and includes staging screenshot assets; it does **not** establish image ownership, licensing, accessibility, or editorial suitability.

Candidate existing asset groups for manual review:
- NBA Nightcaps: `assets/nightcaps/2026-11-19/`, `assets/nightcaps/2026-11-18/`, earlier dated Nightcap folders, and `4dk-nba-2026-opening-five-cover.webp`.
- NFL: `assets/images/nfl/week11-tnf-cj-stroud.webp`, `assets/images/nfl/week11-tnf-texans-defense.webp`, and existing week-specific assets.
- Music: `4dk-album-files-vol3-collection.png`, `album-files-volume-iv-cover.jpg`, `4dk-album-files-volume-one-cover.png`.
- Film Room: `assets/film-room/knicks-2026/`, `assets/film-room/dallas-2026/`, and `assets/film-room/portland-2026/`.

**Rights gate:** do not add a photographic image or album artwork to the new homepage solely because it exists in the repository. Confirm ownership, permission, or a defensible licensing basis, and attribution requirements, before any new placement. Reuse of already-published images also requires this review. Prefer original 4DK-designed typographic treatments until cleared.

**Freshness gate:** the observed `nightcap-latest.json` still references November 21 at the time of this audit; confirm the latest published Nightcap before deployment. Avoid presenting stale static NFL or NBA labels as current.

**Preservation:** this inventory is advisory and staging-only. No image assets or existing articles were changed.
