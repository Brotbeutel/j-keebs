# Backlog

Check items when done. Move completed items into a short "Done" note at the bottom with the date. Do not delete context that a later agent still needs.

## Review findings (from 2026-09-20) — still open

| ID | Finding | Status |
| --- | --- | --- |
| R6 | Homepage gallery DE dict contradicts HTML default; placeholder "– ergänzen" visible | Owner decision needed → P3 |
| R7 | Blog J80-3000 contradicts homepage timeline ("does not type" vs "voll funktionsfähig") | Owner (content) |
| R9 | Meta/icon gaps: og:image, apple-touch-icon, twitter:description, og:site_name | **Done in git (`fe9c140`); live Pages not yet confirmed** |
| R10 | `mechanicon_logo.png` unused; filenames with spaces/uppercase extensions | Owner decision |
| R11 | Typos in German copy | Owner (content) |

## Eleventy structure debt (P2-F)

- [ ] Computed URLs: derive `canonical`/`og_url` from `site.url` + `page.url` via `eleventyComputed` (currently 54 hard-coded absolute URLs)
- [ ] Directory data: `layout: base.njk` and `permalink` repeated in 21 files; use `pages.11tydata.js`
- [ ] i18n as data: ~35% of template bytes are raw `<script>` i18n blocks in YAML front matter; 82 key/value pairs duplicated across templates
- [ ] Blog as collection: 7 articles + 240-line `blog.njk` hard-code order, dates, teasers, prev/next
- [ ] Generate `sitemap.xml` and `robots.txt` from the page collection
- [ ] Asset layout: pages in `src/`, assets in repo root — consider `src/assets/`
- [ ] Nav key naming inconsistent (`nav.kontakt` for `contact.html`)
- [ ] CI improvements: link/asset check step, `paths-ignore` for `ai/*.md`, optional cache-busting

## Pending owner decisions/requests

- [ ] **Dual-theme brand logos:** separate logo/icon assets for light and dark mode
- [ ] **R6:** Which German gallery title is final ("Der Garagenfund" vs "Cherry G80-3000")?
- [ ] **Client-side vs static DE/EN:** `DECISIONS.md` said "revisit when adding SSG". Option: static `/` (DE) and `/en/` output

## P2-remaining — a11y

- [ ] Gallery: cheat-sheet toggle vs fullscreen both bind to the polaroid; one control per action

## P3 — content and hygiene

- [ ] Fill or remove gallery placeholders (R6, after owner decision)
- [ ] Guides: finish or hide pending cards
- [ ] Rewrite or unpublish non-original blog text
- [ ] `readme.md`: re-check structure claims when architecture changes
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

## Done

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
