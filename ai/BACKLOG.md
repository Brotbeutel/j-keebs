# Backlog

Check items when done. Move completed items into a short "Done" note at the bottom with the date. Do not delete context that a later agent still needs.

## Review findings (from 2026-09-20) — still open

| ID | Finding | Status |
| --- | --- | --- |
| R6 | Homepage gallery DE dict contradicts HTML default; placeholder "– ergänzen" visible | Owner decision needed → P3 |
| R7 | Blog J80-3000 contradicts homepage timeline ("does not type" vs "voll funktionsfähig") | Owner (content) |
| R9 | Meta/icon gaps: og:image, apple-touch-icon, twitter:description, og:site_name | **Done in git (`fe9c140`); live Pages re-checked 2026-10-05, still not live — see `STATUS.md`** |
| R10 | `mechanicon_logo.png` unused; filenames with spaces/uppercase extensions | Confirmed 2026-10-05: `mechanicon_logo.png` has zero references anywhere in `src/`, `main.js`, `style.css`. `images/Monsgeek M1.jpg`, `images/Keychron Q3_1.JPG`, `images/Keychron Q3_2.JPG` have spaces/uppercase extensions and ARE used in `src/pages/keyboards.njk`. Owner decision → P3 |
| R11 | Typos in German copy | Owner (content) |

## Eleventy structure debt (P2-F, split 2026-10-05 planner review)

**P2-F1 — done 2026-10-06 (committed and pushed as `0211d43`; live not confirmed):**
- [x] Computed URLs: derive `canonical`/`og_url` from `site.url` + `page.url` via `eleventyComputed` (52 hard-coded absolute-URL lines measured 2026-10-05: 21×`og_url` + 21×`canonical` + 8×`og_image` on blog pages + 1 JSON-LD `url` + 1 FormSubmit `_next`, across 20 template files)
- [x] Directory data: `layout: base.njk` repeated in 21 files; use `src/pages/pages.11tydata.js`
- [x] Generate `sitemap.xml` from the page collection (currently a static root file, 20 `<url>` entries, must be hand-updated on every rename)

**P2-F2 — done 2026-10-06 (committed and pushed as `4cc9980`; live not confirmed):**
- [x] i18n as data: 17 page-local dictionaries moved from YAML front matter to `src/_data/i18n/<page-file-slug>.js`; `base.njk` emits only the current page's dictionary, while legal pages remain dictionary-free
- [x] Nav key naming: `nav.kontakt` renamed to `nav.contact` in the navigation data and both shared language dictionaries

**P2-F3 — done 2026-10-06 (committed and pushed as `5237912`; live not confirmed):**
- [x] Blog records: seven ordered records now live in `src/_data/blog.js`, including URLs, display/navigation order, dates, teasers, images and German no-JS defaults
- [x] Blog index: featured and teaser cards render from the data records with the existing seven-article order and output contract
- [x] Article navigation: previous/next links are computed from navigation order and rendered through `src/_includes/article-nav.njk`; first/last boundaries remain empty on the appropriate side

**Unscheduled (small, independent — pick up opportunistically):**
- [ ] `robots.txt`: **planner decision 2026-10-05 — not worth generating.** It's 4 static lines with one URL in it; a template would cost more than it saves. Leave it a hand-maintained passthrough file (see `DECISIONS.md`).
- [ ] Asset layout: pages in `src/`, assets in repo root — consider `src/assets/` (purely cosmetic reorg, no behavior change; do after F2/F3 so it doesn't collide with their file moves)
- [ ] CI improvements: link/asset check step, `paths-ignore` for `ai/*.md` (every push — including doc-only `ai/*.md` edits — currently triggers a full build+deploy), optional cache-busting

## Pending owner decisions/requests

- [ ] **Dual-theme brand logos:** separate logo/icon assets for light and dark mode
- [ ] **R6:** Which German gallery title is final ("Der Garagenfund" vs "Cherry G80-3000")? Proposed default in `STATUS.md` — confirm or correct.
- [ ] **Client-side vs static DE/EN:** `DECISIONS.md` said "revisit when adding SSG". Option: static `/` (DE) and `/en/` output

## P2-remaining — a11y

- [x] Gallery: cheat-sheet activation is limited to `.cheat-toggle`; fullscreen activation remains on image click/keyboard handlers, so the actions have distinct event targets (`e0a807f`)

## P3 — content and hygiene

- [x] Documentation honesty: `readme.md` and `ai/README.md` now match the actual Eleventy data layout, i18n convention, blog navigation, Node requirement, image pipeline, and intentional client-side language behavior
- [ ] Fill or remove gallery placeholders (R6, after owner decision)
- [ ] Guides: finish or hide pending cards
- [ ] Rewrite or unpublish non-original blog text
- [ ] Consider dropping AGB if nothing is sold
- [ ] Link checker in CI (see P2-F)

## Launch bar blockers

- [x] Featured project links work
- [ ] Blog posts that are not original are rewritten or unpublished
- [ ] Guides has at least one finished guide per category, or pending cards removed
- [ ] Visible placeholders removed (R6)
- [x] No undisclosed third-party requests (R1 — fonts self-hosted)

## Found during P2-D (low priority, not blocking)

- [ ] Optional font preload (if swap jump shows up — measure first)
- [ ] `font-weight` values without matching face (200, 800, 1000 resolve to nearest)
- [ ] Glyphs outside Latin subset (`← → ↗ ✓ ✕`) fall back to system fonts
- [ ] `_site/fonts/README.md` is published (harmless)

## Found during P2-E2 (low priority, not blocking)

- [ ] Unused draft social cards `images/card_v1.jpg` and `images/card_v2.jpg` are passthrough-copied into `_site/` and not referenced by templates. Delete or keep as design archive — owner call.
- [ ] `scripts/generate_social_assets.js` regenerates `og-preview.jpg` / `apple-touch-icon.png` but imports `sharp`, which is not in `package.json`. Do not add a dependency unless the owner wants a repeatable generator.

## Found during P2-F1 (low priority, not blocking)

- [ ] Front-matter `extra_head` is injected raw, so the JSON-LD block in `index.njk` needs the `@@OG_URL@@` token workaround (see `CONVENTIONS.md` "URLs"). Keep this as a separate future head-data cleanup; P2-F2 deliberately covered page i18n data only.
- [ ] The `sitemap.xml` has no `<lastmod>`. Optional; would need a per-page date (blog posts have one in the content, not in front matter). Keep as a future metadata cleanup.
- [ ] Comments in `eleventy.config.js` ("while the legacy site remains live") are stale since P2-C. Cosmetic; touch when the file is edited for another reason.
- [ ] `npm run build` reports `Wrote 22 files` now: 21 HTML pages + the generated `sitemap.xml`. "21 pages" in checks still refers to HTML pages.

## Found during planner review (2026-10-05, low priority, not blocking)

- [x] (done in P2-F1, 2026-10-06) `ai/README.md` has drifted from root `readme.md` by 2 lines (the `images/` project-structure comment doesn't mention the WebP pipeline; Node version says 18 instead of 22). Folded into P2-F1's "Done when" (see `PLAN.md`) since the implementer is already touching project-structure docs there.

## Found during P3 (low priority, not blocking)

- [ ] Handoff Markdown files use CRLF line endings, so `git diff --check` reports trailing-whitespace markers on changed documentation lines and existing planner changes. Normalize line endings in a dedicated documentation-hygiene change; do not mix it into website packages.

## Done

- 2026-10-06 — P3 documentation and handoff honesty: synchronized both README files with the current Eleventy/data architecture and recorded remaining launch blockers, owner decisions, and live-deployment uncertainty. No website source or runtime behavior changed; live deployment is not confirmed.

- 2026-10-06 — P2-remaining gallery control accessibility: removed the competing polaroid frame click handler so cheat-sheet and fullscreen actions have distinct targets. Committed and pushed as `e0a807f`; local build and all required checks pass; live deployment is not confirmed.

- 2026-10-06 — P2-F3: moved the seven blog records into `src/_data/blog.js`, generated the blog index and article navigation from that data, and documented the convention. Committed and pushed as `5237912`; local build, link/tag checks, image report, and blog-specific output assertions pass; live deployment is not confirmed.

- 2026-10-06 — P2-F2: externalized 17 page-local i18n dictionaries, kept legal pages German-only, renamed `nav.kontakt` to `nav.contact`, and documented the data convention. Committed and pushed as `4cc9980`; local build and link/tag checks pass; live deployment is not confirmed.

- 2026-10-06 — P2-F1: computed `og_url` / relative `og_image` / `pages.11tydata.js` (`layout`) / generated `sitemap.xml`; zero hardcoded base URLs left in templates; `ai/README.md` synced with `readme.md`. Committed and pushed as `0211d43`. Local build writes 21 HTML pages plus `sitemap.xml`; link and tag checks pass. Live deployment is not confirmed.
- 2026-10-05 — Planner: re-confirmed P2-E2 in git but still not live (R9); confirmed R10 (`mechanicon_logo.png` unused, 3 odd filenames identified and in use); detailed R6 (exact conflicting values, proposed default); found `ai/README.md` drift (2 lines); split P2-F into F1/F2/F3 and queued F1 in `PLAN.md`; decided `robots.txt` is not worth generating. No code changed.
- 2026-10-05 — P2-E2: default 1200×630 `og-preview.jpg`, 180×180 `apple-touch-icon.png`, `og:site_name` + `twitter:description` in `base.njk`, legal/contact meta descriptions 50–160 chars (`fe9c140`). Local build 21 pages / 0 link errors. Live Pages still old at verification time.
- 2026-10-05 — Planner: verified P2-E committed and deployed (`1a9325f`). Build 21 pages, 0 errors, 78 WebP files / 7.0 MB. Stray files removed (`e11d90c`). AI files updated. P2-E2 scoped.
- 2026-09-23 — P2-E image pipeline: `imagePipeline` transform in `eleventy.config.js`, WebP srcset/sizes/width/height/data-full on all processed images, 95% reduction in image bytes.
- 2026-09-21 — P2-D: self-hosted fonts, logo fix 1742×733, 404 without `<base>`, PCBWay `rel=sponsored`.
- 2026-09-20 — Planner review: findings R1–R11 recorded.
- 2026-09-18/19 — P2-C: full Eleventy migration (21 pages), GitHub Actions deploy live.
- 2026-09-11 — P2-B: Eleventy bootstrap (config, base layout, about proof page, inventory).
- 2026-09-09 — P1-A/P1-B: brand assets, about page, OWA LABS, guide IA. P2-A: interaction polish.
- 2026-09-05 — P1: contact form CORS fix, OSM map, OWA LABS partner card.
- 2026-09-03 — P0-B/P0-C: base-URL fix, English blog slugs, language decision.
- 2026-09-01 — Critical review, `ai/` handoff folder, P0 URL fixes.
