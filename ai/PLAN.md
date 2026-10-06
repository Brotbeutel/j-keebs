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
9. **P2-F2 — i18n as data files, nav key naming** ← current package (below)
10. P2-F3 — blog as a collection
11. P2-remaining — a11y items
12. P3 — content / README honesty

Do not skip ahead.

## Current work package: P2-F2 — i18n as data files, nav key naming

**Goal:** Move page-local i18n dictionaries out of front matter into maintainable data files and make navigation key names describe their actual pages. Preserve the rendered strings and the current client-side language behavior.

**In scope**

1. **Externalize page dictionaries.** Move the per-page `J_KEEBS_I18N` dictionaries currently stored in page front matter into source-controlled data files under the existing Eleventy data/template structure. Keep the rendered `window.J_KEEBS_I18N` contract and the German no-JS source text unchanged; use the existing shared `J_KEEBS_I18N_COMMON` for common strings rather than duplicating it.
2. **Normalize navigation keys.** Rename the inconsistent contact navigation key (`nav.kontakt`) to a page-accurate key (`nav.contact`) everywhere it is defined or consumed, while preserving the visible German and English labels and the current navigation behavior.
3. **Keep page boundaries explicit.** Each page must continue to receive only its own dictionary plus the shared common dictionary; legal-page German-only behavior and existing `data-i18n` / `data-i18n-attr` selectors remain unchanged.
4. **Document the data convention.** Update `CONVENTIONS.md` with the chosen data-file naming/location and the rule for adding or overriding page-local i18n keys.

**Out of scope**

- Visible copy changes or a full English rewrite
- Static `/en/` output, language-routing changes, or changing the confirmed English default
- Blog-as-collection, article metadata, prev/next generation (P2-F3)
- `src/assets/` reorg (unscheduled, see `BACKLOG.md`)
- CI changes (`paths-ignore`, a link-check step) — separate, unscheduled
- R6/R7/R11 content fixes (owner decisions)
- Renaming `images/Monsgeek M1.jpg` / the two `Keychron Q3_*.JPG` files, or deleting `mechanicon_logo.png` (R10 — owner decision, unscheduled)
- Astro, React, new pages
- Committing

**Done when**

- `npm run build` succeeds with 21 HTML pages and no errors.
- `python scripts/check_links.py _site` and `python scripts/tag_balance.py _site` report no problems; the baseline remains 1195 references and 0 tag-balance problems unless a deliberate source-only change explains a difference.
- A source search shows no page front matter still contains a `J_KEEBS_I18N` dictionary, and the new data files cover every page that previously supplied one.
- The built HTML preserves the existing `data-i18n` keys, visible German defaults, navigation labels, and legal-page language behavior; only the dictionary source location and the intentional `nav.contact` key rename differ.
- `nav.kontakt` has no remaining definitions or consumers; `nav.contact` is used consistently.
- `diff readme.md ai/README.md` remains empty, and `STATUS.md` / `BACKLOG.md` record the package result and any owner live-check step.

## After P2-F2

Return to the planner chat. Next is P2-F3 (blog as a collection).
