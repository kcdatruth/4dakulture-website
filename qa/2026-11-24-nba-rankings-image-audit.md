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


## Structural HTML checks — November 24, 2026

Static source inspection of `nba-weekly-boards-2026-11-24.html` on the reconciled staging branch confirms:

- 50 ranking-card sections with 50 unique `aria-labelledby` targets.
- 50 featured images; all 50 have nonempty `alt` text.
- No duplicate HTML `id` values found.
- All 7 in-page `href="#..."` anchors resolve to existing IDs.
- All 6 NBA-hosted headshot image references include the previously added load-error handlers.

**Scope limitation:** These checks inspect markup, not rendered pages, network loading, visual player identities, content accuracy, or licenses. A passing static check is not permission to merge or publish. The NBA's official Terms of Use state that Basketball Content, including photos and images, may not be reused or publicly displayed outside permitted uses without written permission: https://www.nba.com/termsofuse .


## Rights confirmation from publisher — November 24, 2026

The 4 Da Kulture publisher explicitly answered **yes** when asked whether they have permission or a license to republish the NBA-hosted player headshots and other featured basketball photographs on 4 Da Kulture. Record this as **publisher-attested permission**, not independently inspected license documentation. Scope, term, sublicensing conditions and attribution obligations were not supplied and have not been independently verified.

Remaining technical release gates: browser image loading, responsive layout inspection, visual identity review, and final page/navigation QA. Keep the PR in draft until these are checked. Do not replace original photographs or alter any of the 50 approved editorial analyses.


## Movement-indicator audit — November 24, 2026

Verified the ranking line on every one of the 50 cards. **48 cards** have numeric current and previous positions; their movement classes and displayed movement counts agree with the arithmetic (`previous rank - current rank`). **2 cards** (MVP #10 and Rookie #10) correctly show `★ NEW` with previous position `Outside 10`, rather than an invented numeric movement. No movement corrections were required. This check does not independently validate the underlying November 17 published ranks.

A separate external fetch of the production November 24 URL did not yield an accessible page in the available web tool, so live browser and image-load QA remain **unverified**. Do not treat the static checks as a completed browser test.


## Rookie Watch individual-photo restoration — November 24, 2026

Visual review showed that some original November 17 **team** images reused in Rookie Watch were not player-specific (e.g. Washington Wizards team photo, Utah Jazz No. 22). Five Rookie Watch cards now use the exact player-specific headshot URLs from the November 17 Rankings HQ, as restored in commit `dcc57c60c22d4287af9ef844416b766da8ee01ae`:

- Cameron Boozer — `1643409.png`
- Darius Acuff Jr. — `1643411.png`
- AJ Dybantsa — `1643407.png`
- Darryn Peterson — `1643408.png`
- Caleb Wilson — `1643410.png`

All five original Power 30 team images remain unchanged in their respective team cards. There are now **11 NBA-hosted player headshot references**, each with a graceful load-error fallback. This corrects the earlier audit's count of six headshot dependencies. **Actual URL response/loading and headshot identity have not been verified in a browser**, and the publisher's permission attestation is recorded above. No editorial text or ranking positions were changed.


## Original MVP photo visual inspection — November 24, 2026

Visually opened the original staging JPEGs used by eight MVP Watch cards and checked the depicted uniforms/visible names/numbers against the captioned MVP candidate:

- Wembanyama — `4dk-power-03-spurs.jpeg`: Spurs No. 1, matches
- Luka Dončić — `4dk-power-11-lakers.jpeg`: Lakers No. 77, matches
- Giannis Antetokounmpo — `4dk-power-06-heat.jpeg`: Heat No. 7, matches
- Nikola Jokić — `4dk-power-09-nuggets.jpeg`: Denver No. 15, matches
- Shai Gilgeous-Alexander — `4dk-power-01-okc.jpeg`: Oklahoma City No. 2, matches
- Alperen Şengün — `4dk-power-07-rockets.jpeg`: Houston No. 28, back of jersey reads SENGUN, matches; Kevin Durant also visible in the same photograph
- Cade Cunningham — `4dk-power-10-pistons.jpeg`: Detroit No. 2, matches; another Detroit player also visible
- Jayson Tatum — `4dk-power-13-celtics.jpeg`: Boston No. 0, matches; another Boston player also visible

The other two MVP photos are Tyrese Maxey's external NBA headshot and the locally stored Towns image; they were **not included** in this visual batch. These checks establish visible subject/team alignment for eight cards, not photo provenance, licensing or browser loading. No image substitutions or changes to the approved editorial analyses were made.


## Karl-Anthony Towns local photo visual check — November 24, 2026

Opened `assets/rankings/2026-11-24/towns-knicks-finals.webp` from the reconciled staging branch and visually inspected the image. The photograph depicts a Knicks player wearing No. 32 in a Finals-branded arena scene, matching the Karl-Anthony Towns MVP Watch caption. The photo shows an opposing defender and does not establish the game date or image rights by itself. The separate Tyrese Maxey NBA-hosted headshot remains **unverified by direct visual inspection**, although its URL was recovered from the November 17 edition. This is a visual-content check, not a live-browser image-load test.


## Additional Power 30 photo visual audit — November 24, 2026

Opened and visually inspected these **eight original November 17 team JPEGs** on the reconciled staging branch: `4dk-power-05-timberwolves.jpeg` (two players in Wolves jerseys); `4dk-power-04-sixers.jpeg` (Philadelphia group portrait); `4dk-power-02-knicks.jpeg` (Knicks No. 11 action photo); `4dk-power-18-blazers.jpeg` (Portland three-player team portrait); `4dk-power-16-hawks.jpeg` (Atlanta No. 1 action); `4dk-power-20-suns.jpeg` (Phoenix No. 15 portrait); `4dk-power-19-mavericks.jpeg` (Dallas No. 32 dunk); and `4dk-power-08-cavaliers.jpeg` (Cleveland No. 45 action). **All eight show the intended team's uniform** and are suitable as team-level features; these observations do not prove player identity for other cards or browser loading. The files were preserved without substitution.

Attempted to fetch the NBA-hosted Maxey headshot (`https://cdn.nba.com/headshots/nba/latest/1040x760/1630178.png`) for direct visual verification, but the available external retrieval methods failed. **Maxey's direct visual check remains unverified**; do not mark it as passed merely because the URL is present in HTML. No editorial copy or rankings were changed.


## Final eight original team-photo inspections — November 24, 2026

Opened and visually inspected eight additional original November 17 Power 30 JPEGs on reconciled staging: `4dk-power-14-magic.jpeg` (Orlando two-player portrait), `4dk-power-12-raptors.jpeg` (Toronto two-player portrait), `4dk-power-15-pacers.jpeg` (Indiana action), `4dk-power-26-pelicans.jpeg` (New Orleans two-player action), `4dk-power-24-clippers.jpeg` (Clippers No. 1 action), `4dk-power-25-hornets.jpeg` (Charlotte two-player conversation), `4dk-power-30-nets.jpeg` (Brooklyn No. 17 dunk), `4dk-power-29-bucks.jpeg` (Milwaukee No. 13 driving against Golden State). All eight visually depict the intended team. The Clippers image includes an apparent in-frame `Connect partner` overlay, which may detract from the premium presentation; the original is preserved pending publisher preference. The Bucks image does not depict Giannis, as previously noted, and must not be captioned as Giannis.

Together with previous visual batches, all 30 original Power 30 team JPEGs have been inspected for **team-level match**. This is not verification of every individual player, original image provenance, image loading in browsers, or mobile layout. No image substitutions or approved editorial changes were made.
