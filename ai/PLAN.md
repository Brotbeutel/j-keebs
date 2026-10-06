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
11. **P2-remaining — gallery control accessibility** ← current package (below)
12. P3 — content / README honesty

Do not skip ahead.

## Current work package: P2-remaining — gallery control accessibility

**Goal:** Give the gallery's cheat-sheet and fullscreen actions distinct, predictable controls without changing gallery content, URLs, or the existing visual language.

**In scope**

1. **Separate gallery actions.** Inspect the gallery markup and handlers in `src/pages/index.njk` and `main.js`; ensure the cheat-sheet toggle and fullscreen action do not both bind to the same polaroid click target.
2. **Preserve interaction contracts.** Keep gallery keyboard access, focus behavior, carousel controls, fullscreen close behavior, existing `data-slide` hooks, and visible German/English labels working.
3. **Keep the change narrow.** Do not change gallery content, image sources, URLs, i18n architecture, or unrelated page controls. Update `CONVENTIONS.md` only if a durable accessibility convention is introduced.

**Out of scope**

- Visible copy changes or a full English rewrite
- Static `/en/` output, language-routing changes, or changing the confirmed English default
- i18n restructuring or navigation-key changes (P2-F2 is complete)
- Blog collection/data work (P2-F3 is complete)
- `src/assets/` reorg (unscheduled, see `BACKLOG.md`)
- CI changes (`paths-ignore`, a link-check step) — separate, unscheduled
- R6/R7/R11 content fixes (owner decisions)
- Renaming `images/Monsgeek M1.jpg` / the two `Keychron Q3_*.JPG` files, or deleting `mechanicon_logo.png` (R10 — owner decision, unscheduled)
- Astro, React, new pages
- Committing

**Done when**

- `npm run build` succeeds with 21 HTML pages and no errors.
- `python scripts/check_links.py _site` and `python scripts/tag_balance.py _site` report no problems; the baseline remains 1195 references and 0 tag-balance problems unless a deliberate source-only change explains a difference.
- The gallery cheat-sheet and fullscreen actions have distinct event targets and do not trigger each other when activated.
- Keyboard activation and focus behavior work for both actions; fullscreen open/close and gallery carousel behavior remain intact.
- `npm run build` succeeds with 21 HTML pages and no errors.
- `python scripts/check_links.py _site` and `python scripts/tag_balance.py _site` report no problems; the baseline remains 1195 references and 0 tag-balance problems unless a deliberate source-only change explains a difference.
- No gallery image URLs, page permalinks, or existing i18n keys change unintentionally.
- `diff readme.md ai/README.md` remains empty, and `STATUS.md` / `BACKLOG.md` record the package result and any owner live-check step.

## After P2-remaining

Return to the planner chat. Next is P3 (content / README honesty).
