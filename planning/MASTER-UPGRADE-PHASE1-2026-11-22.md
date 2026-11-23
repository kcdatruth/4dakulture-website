# 4DK Master Upgrade — Phase 1 Audit and Staging Plan
Date: 2026-11-22
Branch: 4dk-master-upgrade-phase1-2026-11-22
Baseline main commit: b125f99bac34195ff2f26be0d35ec4383508dd8b

## Confirmed repository observations
- index.html includes styles.css, scores.css, home-frontpage-v2.css, 4dk-magazine-identity.css, inline homepage CSS, and home-frontpage-v2.js.
- PWA assets referenced from index.html include app.webmanifest and pwa-install.js; verify installation and caching behavior before changing.
- nightcap-latest.json currently points to nba-nightcap-2026-11-21.html and previous November 20; nightcap-latest.js reads the authoritative feed.
- data/4dk-player-scouting.json has a 2026-27 reports object and editorial policy requiring human-reviewed original analysis. Do not infer approved report counts from the first entries.
- rankings.html, nba-rankings-hq.html, power-rankings.js and legacy rankings loaders coexist. Do not delete without a reference audit.
- No package.json at repository root (404); do not assume a Node build pipeline.
- Recent main commits include b125f99 (NFL standings), 5ee6129 (Nightcap feed), a25847c (mobile menu).
- GitHub code search is not a complete recursive inventory. A full tree and page dependency audit remains necessary.

## Phase 1 implementation order
1. Enumerate full tracked file tree and classify pages, styles, scripts, images, data, archives, workflows.
2. Map index.html sections and their runtime dependencies. Flag duplicate visible blocks; preserve all article URLs and archive links.
3. Audit NBA/NFL hub navigation, scoreboard and rankings feeds, mobile menu, article header clearance, and search.
4. Validate JSON feeds, relative links, image URLs, accessibility and mobile performance; record baseline metrics.
5. Build an isolated staging homepage prototype, using existing black/cream/gold/red identity and real current-content feeds.
6. Review staging against mobile and desktop acceptance criteria before any main-branch merge.

## Guardrails
- No destructive changes to existing pages, articles, photos, rankings, Player Files, or archives.
- Keep official November 2026 NBA Top 50 locked unless owner approves edits.
- Never promote unverified scores, player assignments, statistics or image rights.
- Preserve existing published URLs; use redirects if paths ever change.
- Changes on staging only until explicit approval.
- Report exact commit SHA and test evidence for each implementation batch.

## Proposed homepage information hierarchy
1. One masthead and primary navigation
2. One current lead story and two cross-category secondary features
3. Latest NBA/NFL desks linked to authoritative feeds
4. Rankings / Player Files / Film Room gateway
5. Music / Album Files / culture feature area
6. 4DK Originals and podcast
7. Newsletter and concise archives gateway

## Acceptance criteria
- No duplicate visible homepage feature or navigation sections.
- Current Nightcap and NFL HQ point to verified latest editions.
- All original archives remain accessible.
- Mobile layout and keyboard navigation tested.
- No new unlicensed imagery.
- Lighthouse and link checks recorded, not guessed.
