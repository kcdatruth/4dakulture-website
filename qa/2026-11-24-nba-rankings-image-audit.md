# 4DK November 24 NBA Rankings HQ — verified image QA

Status: STAGING ONLY. Do not merge/publish until unresolved identities and rights are checked.

## Direct visual inspection of repository image files

- `assets/rankings/2026-11-24/tyresemaxey.webp`: Tyrese Maxey wearing Kentucky #3, NOT a current Philadelphia uniform. Current MVP #8 card uses this archive photo. Replace with a rights-cleared Sixers photo of Maxey.
- `assets/rankings/2026-11-24/towns-knicks-finals.webp`: Karl-Anthony Towns wearing Knicks #32, an appropriate current-team depiction. Keep unless rights/attribution fails verification.
- `assets/rankings/2026-11-24/adaymara.webp`: Aday Mara in Michigan #15, NOT an Oklahoma City Thunder uniform. Replace with a rights-cleared OKC photo of Mara.
- `assets/rankings/2026-11-24/braydenburries.webp`: Brayden Burries in Arizona #5, NOT a Milwaukee Bucks uniform. Replace with a rights-cleared Bucks photo of Burries.
- `4dk-power-04-sixers.jpeg`: group image of Philadelphia players, not an isolated verified Tyrese Maxey portrait. Do NOT automatically substitute this for Maxey's MVP card.
- `4dk-power-01-okc.jpeg`: Shai Gilgeous-Alexander wearing Oklahoma City #2, NOT Aday Mara. Do NOT substitute this for Mara's Rookie Watch card.
- `4dk-power-29-bucks.jpeg`: image features Giannis Antetokounmpo in a Milwaukee uniform. The November 24 rankings list Giannis with Miami. This is outdated featured imagery for Milwaukee and should be replaced with a current Bucks player image before publication.
- `4dk-power-17-warriors.jpeg`: restored in Rookie Watch for Yaxel Lendeborg in prior staging commit `67766e0897c0da9fa2ec54fc0b34218fc6a4f08e`. Verify identity and rights independently before release.

## Publication guardrails

1. Preserve the 30 Power, 10 MVP, 10 Rookie locked ranks, movement indicators, and all 50 approved analyses.
2. Never label an old college, overseas, or other-team image as a current-team photograph.
3. Do not swap a generic team photo into a player card without visually verifying the subject.
4. Confirm image rights and credits before production release; the presence of an image in GitHub is not proof of a license.
5. Audit all remaining 30 original Power 30 images for player identity and current-team accuracy, not just the images listed here.
6. Verify image loading and mobile rendering after any replacements.

This is a factual QA log, not a claim that all image checks or publication have been completed.


## Follow-up image-reference and repository audit — November 24, 2026

- All 50 ranking cards contain a featured image reference: Power 30 (30), MVP Watch (10), Rookie Watch (10).
- All 31 distinct locally hosted image files referenced by featured cards were fetched successfully from the staging branch (30 original Power 30 JPEGs and one Towns WEBP).
- Five distinct NBA-hosted player headshot URLs remain external dependencies: `https://cdn.nba.com/headshots/nba/latest/1040x760/1630178.png`; `https://cdn.nba.com/headshots/nba/latest/1040x760/1643509.png`; `https://cdn.nba.com/headshots/nba/latest/1040x760/1643530.png`; `https://cdn.nba.com/headshots/nba/latest/1040x760/1643415.png`; `https://cdn.nba.com/headshots/nba/latest/1040x760/1643414.png`.
- Visual identity check confirmed that `4dk-power-17-warriors.jpeg` depicts Stephen Curry, **not** Yaxel Lendeborg. The original is preserved, but the Yaxel Rookie Watch card still needs a correctly identified Yaxel photo.
- Visual identity check confirmed that `4dk-power-29-bucks.jpeg` depicts Milwaukee No. 13 driving against Golden State, **not** Giannis Antetokounmpo. The original remains preserved and the alt text has been corrected.
- NBA.com's July 13, 2026 Terms of Use prohibit reuse or public display of its photos and other basketball content outside permitted uses without written permission. Reference: https://www.nba.com/termsofuse . The existence of NBA-hosted image URLs does **not** prove republication rights.
- These are **repository/file-reference checks only**, not full browser loading tests or complete photographic rights clearance. Do not mark release-ready or merge until identity, rights, and mobile-browser checks are resolved.


## Follow-up correction — original Yaxel image restored

- Rookie Watch #2 now references the exact original November 17 Yaxel Lendeborg headshot URL `https://cdn.nba.com/headshots/nba/latest/1040x760/1642865.png`, restored in commit `81e1697e98e2409cc4395e8f48eca20d7488211e`.
- The original `4dk-power-17-warriors.jpeg` photograph (Stephen Curry) remains preserved in the Warriors Power 30 card, **not** the Yaxel Rookie Watch card.
- Previous audit wording that Yaxel's card *still* uses Curry is superseded by this correction.
- The edition now has six distinct NBA-hosted headshot dependencies, not five. Their loading and public-republication rights are **not yet verified**. NBA terms: https://www.nba.com/termsofuse
- Publication remains blocked pending a browser/mobile image-load check, remaining photo identity review, and image-rights review. This audit is not a rights grant.


## Main-versus-staging verification — November 24, 2026

Direct inspection of `nba-weekly-boards-2026-11-24.html` on both branches confirms:

| Check | `main` | staging |
|---|---:|---:|
| Ranking cards | 50 | 50 |
| Featured image references | 48 | 50 |
| Image-loading fallback handlers | 0 | 6 |
| Restored Yaxel Lendeborg headshot | No | Yes |

`main` file blob: `18f448f382eb43ba1cffdcc411c00f705598d984`. Staging file blob: `36b51cc95bf8092d92c60c3a2dd853802e40d821`.

The branch comparison reports `staging` **12 commits ahead and 1 behind** `main`. The one extra main commit is merge PR #84 (`8066b65c46bec31d957648efaa8146615e96bbf2`). The comparison from staging to main reports **no changed files** in that one main-only commit; staging nevertheless has additional edits to the Rankings HQ and this QA report.

**Safe reconciliation requirement:** preserve staging HTML and QA report, reconcile the merge ancestry without force-pushing or overwriting `main`, then recheck PR #85. Do not merge or mark ready while image rights and browser/mobile checks remain incomplete.
