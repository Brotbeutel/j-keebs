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
10. **P2-F3 — blog as a collection** ← current package (below)
11. P2-remaining — a11y items
12. P3 — content / README honesty

Do not skip ahead.

## Current work package: P2-F3 — blog as a collection

**Goal:** Make the seven blog articles the source of truth for the blog listing, metadata, ordering, teasers, and previous/next links. Preserve the current rendered article pages, URLs, visible German copy, and client-side language behavior.

**In scope**

1. **Define article data.** Extract the seven article records currently duplicated or ordered in `src/pages/blog.njk` into a collection-compatible source under `src/_data/` or Eleventy-supported front matter/data files. Each record must retain the current article URL, title, date, teaser, image, and any data needed by the existing cards and navigation.
2. **Generate the blog index.** Make `src/pages/blog.njk` render its cards from the article collection/data rather than a hand-maintained seven-item sequence. Preserve the current order and rendered German copy unless a data move requires an equivalent source representation.
3. **Generate article navigation.** Replace hard-coded previous/next article metadata in the seven `src/pages/blog-*.njk` templates with collection-derived values, preserving the current first/last boundary behavior and URLs.
4. **Keep page contracts stable.** Preserve the existing per-page i18n data files from P2-F2, `data-i18n` selectors, social metadata, article permalinks, image pipeline inputs, and legal-page behavior. Update `CONVENTIONS.md` only if the chosen collection convention needs documenting.

**Out of scope**

- Visible copy changes or a full English rewrite
- Static `/en/` output, language-routing changes, or changing the confirmed English default
- i18n restructuring or navigation-key changes (P2-F2 is complete)
- `src/assets/` reorg (unscheduled, see `BACKLOG.md`)
- CI changes (`paths-ignore`, a link-check step) — separate, unscheduled
- R6/R7/R11 content fixes (owner decisions)
- Renaming `images/Monsgeek M1.jpg` / the two `Keychron Q3_*.JPG` files, or deleting `mechanicon_logo.png` (R10 — owner decision, unscheduled)
- Astro, React, new pages
- Committing

**Done when**

- `npm run build` succeeds with 21 HTML pages and no errors.
- `python scripts/check_links.py _site` and `python scripts/tag_balance.py _site` report no problems; the baseline remains 1195 references and 0 tag-balance problems unless a deliberate source-only change explains a difference.
- The blog index contains exactly the same seven article URLs, in the same current order, with equivalent titles, dates, teasers, images, and visible German output; no article is duplicated or missing.
- The seven article pages retain their current permalinks, rendered article content, social metadata, and image-pipeline output.
- Previous/next links are collection-derived, preserve the current order and first/last boundary behavior, and contain no stale hard-coded article URLs or metadata in the article templates.
- `diff readme.md ai/README.md` remains empty, and `STATUS.md` / `BACKLOG.md` record the package result and any owner live-check step.

## After P2-F3

Return to the planner chat. Next is P2-remaining (a11y items).
