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
12. **P3 — content / README honesty** ← current package (below)

Do not skip ahead.

## Current work package: P3 — content / README honesty

**Goal:** Keep the public README and launch-bar records honest about the current source architecture, verification status, and unfinished content. Resolve documentation drift without inventing completion claims.

**In scope**

1. **Reconcile README structure.** Review `readme.md` and `ai/README.md` against the actual Eleventy/data layout, generated sitemap, image pipeline, scripts, supported Node version, and current language behavior. Keep both README files identical.
2. **Audit launch-bar claims.** Make `ai/STATUS.md` and `ai/BACKLOG.md` distinguish verified facts from owner decisions and unfinished content, including the blog originality, guide placeholders, R6 gallery placeholder, and live-deployment uncertainty.
3. **Preserve source behavior.** This package is documentation and handoff work; do not change visible website copy, templates, assets, URLs, or runtime behavior without an explicit follow-up package.

**Out of scope**

- Visible copy changes or a full English rewrite
- Static `/en/` output, language-routing changes, or changing the confirmed English default
- i18n restructuring or navigation-key changes (P2-F2 is complete)
- Blog collection/data work (P2-F3 is complete)
- Gallery interaction changes (P2-remaining is complete)
- `src/assets/` reorg (unscheduled, see `BACKLOG.md`)
- CI changes (`paths-ignore`, a link-check step) — separate, unscheduled
- R6/R7/R11 content fixes (owner decisions)
- Renaming `images/Monsgeek M1.jpg` / the two `Keychron Q3_*.JPG` files, or deleting `mechanicon_logo.png` (R10 — owner decision, unscheduled)
- Astro, React, new pages
- Committing

**Done when**

- `npm run build` succeeds with 21 HTML pages and no errors.
- `python scripts/check_links.py _site` and `python scripts/tag_balance.py _site` report no problems; the baseline remains 1195 references and 0 tag-balance problems unless a deliberate source-only change explains a difference.
- `readme.md` and `ai/README.md` are byte-identical and accurately describe the current source layout and verification constraints.
- No README claims WCAG compliance, a full English rewrite, finished guides, or completed launch-bar content that has not been verified.
- `STATUS.md` and `BACKLOG.md` identify remaining launch blockers and owner decisions with concrete paths and priorities; live deployment is not claimed without a live check.
- `git diff --check` passes, and no website source, generated output, or runtime behavior changes are introduced by this package.

## After P3

Return to the planner chat. Next is owner-scoped content work or a new planner package based on the remaining launch blockers.
