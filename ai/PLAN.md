# Plan

## Roles

| Role | Who | Does | Does not |
| --- | --- | --- | --- |
| **Planner** | This project's planning chat | Priority, scope, architecture calls, updating this file | Implement site changes in the same session unless the owner asks |
| **Implementer** | A **new** chat | Execute the current work package only | Re-plan, add frameworks, "while I'm here" refactors |
| **Owner** | Jannik | Approves scope changes, commits, deploy | — |

If an implementer finds a new issue: add it to `BACKLOG.md` under the right priority and keep going on the current package. Do not start a later package in an earlier session.

## Sequence

1. ~~P0 / P0-B / P0-C~~ ✅ done and deployed
2. ~~P1 / P1-A / P1-B~~ ✅ done and deployed
3. ~~P2-A interaction/visual polish~~ ✅ done and deployed
4. ~~P2-B / P2-C Eleventy migration~~ ✅ done and deployed
5. ~~P2-D repo hygiene, fonts, fixes~~ ✅ done and deployed
6. ~~P2-E image pipeline~~ ✅ done and deployed (`1a9325f`)
7. ~~P2-E2 — icons and social previews~~ ✅ in git (`fe9c140`); live Pages still not confirmed at the 2026-10-05 planner review — check the Actions tab, see `STATUS.md`
8. ~~P2-F1 — computed URLs, directory data, generated sitemap~~ ✅ done and pushed (`0211d43`); live still needs confirmation
9. ~~P2-F2 — i18n as data files, nav key naming~~ ✅ done and pushed (`4cc9980`); live still needs confirmation
10. ~~P2-F3 — blog as a collection~~ ✅ done and pushed (`5237912`); live still needs confirmation
11. ~~P2-remaining — gallery control accessibility~~ ✅ done and pushed (`e0a807f`); live still needs confirmation
12. ~~P3 — content / README honesty~~ ✅ done and pushed (`66ff9e0`); live still needs confirmation
13. ~~Owner gate — launch content and deployment decisions~~ ✅ decisions recorded 2026-10-06
14. ~~P3 — index gallery corrections~~ ✅ complete locally; deployment pending
15. **P3 — future content and launch validation** ← current package (below)

Do not skip ahead.

## Current work package: P3 — future content and launch validation

**Goal:** Finish the remaining owner-approved content and deployment validation without removing visible WIP guide cards before the official launch.

**In scope**

1. **Future articles.** Create the separately scoped “Der Garagenfund” and Mechanicon blog articles when their source material is ready.
2. **Launch validation.** Verify the deployed mobile map interaction and run the contact form with JavaScript enabled and disabled.
3. **Content cleanup.** Apply approved German typo corrections and historical context to remaining blog content; keep guide cards visible as WIP until official launch.

**Out of scope**

- Full English rewrite or unrelated visible copy changes
- Static `/en/` output, language-routing changes, or changing the confirmed English default
- i18n restructuring or navigation-key changes (P2-F2 is complete)
- Blog collection/data work (P2-F3 is complete)
- Gallery interaction changes (P2-remaining is complete)
- README or handoff documentation changes (P3 is complete)
- `src/assets/` reorg (unscheduled, see `BACKLOG.md`)
- CI changes (`paths-ignore`, a link-check step) — separate, unscheduled
- R7/R11 content fixes (owner decisions)
- Removing or hiding WIP guide cards before official launch
- Renaming `images/Monsgeek M1.jpg` / the two `Keychron Q3_*.JPG` files, or deleting `mechanicon_logo.png` (R10 — owner decision, unscheduled)
- Astro, React, new pages
- Committing

**Done when**

- `npm run build` succeeds with 21 HTML pages and no errors.
- `python scripts/check_links.py _site` and `python scripts/tag_balance.py _site` report no problems; the baseline remains 1195 references and 0 tag-balance problems unless a deliberate source-only change explains a difference.
- The latest Actions result and live Pages checks are recorded in `STATUS.md`.
- Future article scope and source material are recorded before article implementation.
- Deployed mobile map and contact form JS/no-JS behavior are verified by the owner.
- Approved German content corrections are applied without changing the intentional client-side language architecture.
- `npm run build`, both Python checks, README parity, and focused content assertions pass.

## After P3 — future content and launch validation

Return to the planner chat. Next is the smallest owner-approved future article or launch-bar package.
