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
7. ~~P2-E2 — icons and social previews~~ ✅ in git (`fe9c140`); live Pages not confirmed 2026-10-05
8. P2-F — Eleventy data model (computed URLs, i18n data, blog collection, generated sitemap)
9. P2-remaining — a11y items
10. P3 — content / README honesty

Do not skip ahead.

## Current work package

**Nothing queued for an implementer.** P2-E2 is implemented in git (`fe9c140`). Return to the planner chat. Next sequence item is P2-F.

Do not start P2-F from an implementer session unless the planner scopes it.

## After P2-E2

Return to the planner chat. Next is P2-F (Eleventy data model: computed URLs, i18n as data files, blog collection, generated sitemap/robots).
