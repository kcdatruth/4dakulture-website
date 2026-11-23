# 4DK 2.0 — Production Integration Gate (November 23, 2026)

**Status: staging-only. No production merge authorized.**

## Verified live homepage baseline
- `main:index.html` currently has 114,902 characters and is substantially larger than the 12,568-character standalone staging concept.
- Existing production homepage loads `styles.css`, `scores.css`, `home-frontpage-v2.css`, `4dk-magazine-identity.css`.
- Existing scripts include `/pwa-install.js`, `home-frontpage-v2.js`, `/homepage-discovery.js`, `/homepage-connected.js`, `script.js`, `scores.js`, `nightcap-latest.js`.
- These represent potential navigation, score, discovery, and progressive-web-app dependencies. Their behavior has **not** yet been independently tested.
- The new design is `staging/phase1-homepage-concept.html`, **not** a drop-in replacement for the production homepage.

## Branch safety
- GitHub comparison on November 23: staging **19 ahead / 11 behind** `main` (may change as new editorial commits land).
- `nba-nightcap-2026-11-22.html` already exists on live `main`; staging contains a copy. Do not re-add it to production.
- `nightcap-latest.json` on `main` already points to November 22; avoid reverting it on merge.
- Keep the November 21 previous edition and all historical articles untouched.

## Integration approach
1. Refresh against the **current** production `main` before any proposed deployment.
2. Inventory the existing live homepage modules and preserve functioning navigation, ticker, scoreboard, discovery, PWA hooks, SEO metadata, and footer.
3. Port the approved magazine layout **into a separate integration candidate** built from the current production homepage, rather than replacing `index.html` with the short standalone concept.
4. Add an automated regression check for existing asset references, key homepage links, and latest/previous/archive Nightcap targets.
5. Test phone and desktop widths, keyboard navigation, responsive overflow, actual network-loaded feeds, and media rights. Screenshots alone are insufficient.
6. Produce a production diff showing every proposed change and verify no editorial articles/archives were deleted or overwritten.
7. Obtain explicit user approval for deployment. Only then merge or replace `index.html`.

## Phase 1 current evidence
- Latest staging QA run #13: https://github.com/kcdatruth/4dakulture-website/actions/runs/45231881967 — success.
- PR #75: https://github.com/kcdatruth/4dakulture-website/pull/75 — draft, unmerged.
- Image inventory documents file existence only, **not** rights clearance.
