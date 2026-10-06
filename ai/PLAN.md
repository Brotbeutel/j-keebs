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
8. **P2-F1 — computed URLs, directory data, generated sitemap** ← current package (below)
9. P2-F2 — i18n as data files, nav key naming
10. P2-F3 — blog as a collection
11. P2-remaining — a11y items
12. P3 — content / README honesty

Do not skip ahead.

## Current work package: P2-F1 — computed URLs, directory data, generated sitemap

**Goal:** Stop hand-duplicating the site's own base URL and the `layout`/`permalink` boilerplate across templates, and stop hand-editing `sitemap.xml` on every page rename. No visual change, no content change, no i18n/blog refactor (those are P2-F2/F3).

**In scope**

1. **Computed `canonical`/`og_url` (BACKLOG P2-F1).** Add `eleventyComputed` (in a new `src/pages/pages.11tydata.js` directory-data file, or in `eleventy.config.js` — implementer's choice, document which in `CONVENTIONS.md`) so that, unless a page's front matter already sets `og_url`, it computes to `data.site.url + data.page.url`; `canonical` keeps its existing fallback to `og_url` in `base.njk` (`{{ canonical or og_url }}` already does this — do not duplicate the fallback in two places). Delete the now-redundant `og_url:`/`canonical:` lines from all 21 pages' front matter. Verified 2026-10-05: `data.site.url + data.page.url` reproduces every current `canonical`/`og_url` value exactly, including `index.njk` (`page.url` is `/`, not `/index.html`) and `404.njk` (`page.url` is `/404.html`) — confirmed via `npx @11ty/eleventy --to=json`. No page needs a manual override.
2. **Computed `og_image`.** The 8 pages that set `og_image` (`blog.njk` + 7 `blog-*.njk`) currently hardcode the full `https://brotbeutel.github.io/j-keebs/images/....jpg` URL. Change their front matter to a **relative** path (`images/....jpg`, i.e. just strip the current domain+base-path prefix) and change `base.njk`'s `{%- set social_image = og_image or (site.url ~ "/images/og-preview.jpg") %}` to build the absolute URL the same way in both cases, e.g. `{%- set social_image = site.url ~ "/" ~ (og_image or "images/og-preview.jpg") %}`. Verify all 8 resulting URLs are byte-identical to today's.
3. **JSON-LD and FormSubmit.** `index.njk` line ~76 (`"url": "https://brotbeutel.github.io/j-keebs/"` inside the JSON-LD block) and `contact.njk` line ~125 (FormSubmit's hidden `_next` field) both hardcode the same absolute URL. Replace with `{{ canonical }}` (JSON-LD) and `{{ canonical }}?sent=1` (FormSubmit) respectively — verify the rendered values are unchanged.
4. **Directory data for `layout`.** Create `src/pages/pages.11tydata.js` exporting `{ layout: "base.njk" }` (this can be the same file as item 1's `eleventyComputed`, if that's where you put it). Remove `layout: base.njk` from all 21 pages. Do **not** touch `permalink` — it's genuinely per-page and must stay explicit.
5. **Generated `sitemap.xml`.** Replace the static root `sitemap.xml` with a generated template (e.g. `src/pages/sitemap.njk` with `permalink: sitemap.xml`, looping `collections.all` — or however fits Eleventy's conventions) that lists every page **except** `404.html`, output identical in content to today's 20 `<url>` entries (same URLs, same order is not required, but no page may be missing or duplicated). `robots.txt` stays a static passthrough file — do not template it (planner call, see `DECISIONS.md`).
6. **Doc sync.** `ai/README.md` has drifted 2 lines from root `readme.md` (the `images/` comment doesn't mention the WebP pipeline; Node version says 18 instead of 22). Make `ai/README.md` match root `readme.md` exactly for those two lines (copy root `readme.md`'s wording, don't invent new wording). If you touch either file for a structural reason anyway (e.g. documenting the new `pages.11tydata.js` / generated sitemap in the project-structure tree), keep both files identical afterward, as they've always been meant to be.
7. **Document the convention.** Add a short note to `CONVENTIONS.md` (URLs section) describing the computed `og_url`/`og_image`/sitemap pattern, so a future page author knows NOT to hand-set `og_url`/`canonical` and knows `og_image` is relative, not absolute.

**Out of scope**

- i18n restructuring, nav key renaming (P2-F2)
- Blog-as-collection, prev/next generation (P2-F3)
- `src/assets/` reorg (unscheduled, see `BACKLOG.md`)
- CI changes (`paths-ignore`, a link-check step) — separate, unscheduled
- Any visible copy, DE/EN text alignment, R6/R7/R11 content fixes (owner decisions)
- Renaming `images/Monsgeek M1.jpg` / the two `Keychron Q3_*.JPG` files, or deleting `mechanicon_logo.png` (R10 — owner decision, unscheduled)
- Astro, React, new pages
- Committing

**Done when**

- `npm run build` succeeds, 21 pages, no errors.
- `grep -rn "https://brotbeutel.github.io/j-keebs" src/` (PowerShell: `Select-String -Path src\**\*.njk,src\**\*.js -Pattern "https://brotbeutel.github.io/j-keebs"`) returns **nothing** except inside `src/_data/site.js` (the single source of truth) — i.e. zero hardcoded occurrences left in any `.njk` template.
- `python scripts/check_links.py _site` and `python scripts/tag_balance.py _site` report no problems (same as the pre-change baseline: 21 pages, 1195 references, 0 errors / 0 tag-balance problems — re-baseline if the reference count changed for a legitimate reason and say why).
- `diff` every `_site/*.html` file before vs. after this change: the **only** differences across all 21 pages should be whichever lines you intentionally changed (and, on the 8 blog pages, no change at all to the final `og:image`/`twitter:image` URLs — same string, different source). No page's canonical/og:url/og:image silently changed value.
- New `_site/sitemap.xml` lists exactly the same 20 URLs as today's (every page except `404.html`); `_site/robots.txt` is unchanged.
- `diff readme.md ai/README.md` is empty.
- `STATUS.md` and `BACKLOG.md` updated; owner steps listed (there are none beyond the usual copy-and-commit, unless you touched `eleventy.config.js`, in which case say so).

## After P2-F1

Return to the planner chat. Next is P2-F2 (i18n as data files, nav key naming).
