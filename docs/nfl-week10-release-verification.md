# Week 10 publication verification — November 10, 2026

Statistical cutoff: all Week 9 games completed November 9. Editorial rank order is preserved from PR #41's integrated review. The canonical pages and dated edition use `data/nfl-rankings-2026-week10.json`; `data/nfl-rankings-current.json` is identical for the active edition.

## Closed statistical gaps

- 32 team cards now contain four individual categories: passing yards, rushing yards, receiving yards and defensive sacks. These are club production leaders, not four claims about the current starting lineup. Tied sack leaders are both named.
- All 31 accessible official club team-stat pages were checked on November 10. Tennessee uses the NFL passing/rushing tables, its official Week 8 postgame notes (6.5 Jacob Martin sacks; Week 9 bye), and the receiving audit. Per-team source URLs are retained in the JSON.
- Passing totals agree with the NFL 2026 season table, including Josh Allen's post-Monday 2,027/12/6. Buffalo's team table confirms his 285 rushing yards and nine rushing touchdowns; Cook is 814 rushing yards and eight touchdowns. All ten MVP profiles have verified displayed season lines.
- Rookie combined tackles reconciled against current club tables: David Bailey 44 (26 solo + 18 assisted), Sonny Styles 67 (32 + 35), Jacob Rodriguez 79 (35 + 44), Mansoor Delane 27 (17 + 10), Caleb Downs 55 (32 + 23). Arvell Reese's eight official game entries total 68, with 4.5 sacks. Earlier conflicting widgets are retained only in the historical research files.
- Four rookie receiving lines preserve the previously completed NFL receiving-table audit: Boston 32/507/3, Tate 34/413/1, Bernard 32/284/1, Concepcion 37/437/1. Concepcion's 37 rushing yards match Cleveland's team table.
- Passing leaders Cousins (Las Vegas) and Brissett (Arizona), and receiving leader Downs (Indianapolis), explicitly retain pre-trade attribution. New acquisitions' former-club production is not added to their new team's leaders.
- Team records, PF, PA, differential and conference rank were rechecked against https://www.nfl.com/standings/conference/2026/REG. Division order follows https://www.nfl.com/standings/division/2026/REG. Pittsburgh precedes Cincinnati; Carolina occupies the fourth NFC position as division leader. Positions 1–4 and 5–7 are labeled separately.
- Last-five records and streaks retain the 32-row official audit. Movement uses the previous published Week 8 board and is explicitly labeled as that comparison, never a one-week change.

## Publication scope

The release contains the 32 saved team analyses and 20 saved player profiles, corrected statistics, next games/byes, official standings and conference positioning. It creates four dated Week 10 pages, updates their four current aliases, features the edition on Home/NFL, and advances the weekly HQ to Week 10 while preserving all 37 prior article-index entries.

The detailed trade-research supplements remain noindex historical working files. Announced deals that were reported pending physicals retain that qualification in the team analyses; this release does not claim that every physical has cleared. The canceled Ebiketie deal is not counted as an acquisition.

Final injury designations are deferred under the editor's instruction to publish confirmed coverage now. The final pages link to the already-published dated Giants–Commanders report. They do not infer full availability for the other clubs.

## Validation

`scripts/qa_week10_release.mjs` checks the 32/10/10 counts, rank sequences, four stat categories per team, point differentials, dated/current data equality, Week 9 archive preservation, linked files, and rendering at 360/390/768/1280px. It writes screenshots and results to the workflow artifact. Publication remains contingent on this workflow and rendered review.

The old Week 8 dated articles are unchanged. The previous rankings HQ is also preserved as `nfl-rankings-hq-week8-2026.html`, pinned to the dated Week 8 JSON rather than the new current dataset. No NBA, music, photo, Nightcap, or recap article is modified.
