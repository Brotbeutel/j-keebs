# Backlog

Check items when done. Move completed items into a short "Done" note at the bottom with the date. Do not delete context that a later agent still needs.

## Review 2026-09-20 — confirmed defects (commit `6f478fa`)

Ordered by severity. "Verify" is a cheap check anyone can repeat. Package = where it is planned.

| ID | Sev. | Finding | Where | Verify | Package |
| --- | --- | --- | --- | --- | --- |
| R1 | High | Google Fonts are requested from `fonts.googleapis.com` / `fonts.gstatic.com` on all 21 pages. `privacy.njk` and `cookies.njk` never mention it. Loading Google Fonts remotely transmits the visitor IP to Google; German courts have ruled on this (LG München I, 20.01.2022, 3 O 17493/20). Not legal advice. Fix: self-host, then no disclosure is needed. | `src/_includes/base.njk` (fonts block), `src/pages/privacy.njk`, `cookies.njk` | `grep -n -i "google" src/pages/privacy.njk src/pages/cookies.njk` (empty); DevTools → Network | P2-D — **done in working copy 2026-09-21** (fonts self-hosted, no Google `<link>`; deploy pending) |
| R2 | High | `node_modules/` (1,681 files, ~24 MB; `.git` is ~102 MB) and `.cursor/` are tracked although `.gitignore` lists them. Windows shims (`.cmd`, `.ps1`) are in the repo and `node_modules/.bin/eleventy` has no exec bit on Linux (`Permission denied`). CI is not affected (`npm ci` replaces it). Earlier STATUS claimed it was ignored. | repo root | `git ls-files node_modules \| wc -l` | P2-D (owner step, **still open**: `git rm -r --cached node_modules .cursor`) |
| R3 | High | Image weight: `images/` is 47 MB (typical photo 1.5–2.5 MB at 1920×1080). `keyboards.html` loads 12 images eagerly (~20 MB), `index.html` ~4.9 MB eager, `blog.html` ~3.1 MB eager. `J-Keebs-Logo.png` is 557 KB / 1742 px but shown at 2.8 rem height, on every page. `J80-3000_open_with_printed_plate.jpg` is 7.8 MB (3746×2107) and is the `og:image` of its blog post. Measured: 1280 px WebP q78 gives 55–200 KB per photo; logo at 360 px WebP ≈ 10 KB. | `images/`, all `*.njk` `<img>` tags | `du -sh images`; DevTools → Network → Img | P2-E |
| R4 | Med | Logo `width="1742" height="980"` in header and footer (all 21 pages) but the file is 1742×733. CSS is `height:2.8rem; width:auto`, so the box is reserved with the wrong ratio and the header shifts when the logo loads. `Werkbank_Hero.jpg` has 526×1052 in the attributes, file is 526×1113. | `src/_includes/base.njk` (2×), `src/pages/index.njk` | `grep -o 'width="1742" height="[0-9]*"' _site/index.html` | P2-D — logo **done in working copy 2026-09-21** (733). **Still open:** `Werkbank_Hero.jpg` attributes in `index.njk` (526×1052, real 526×1113); not in the P2-D scope text, natural fit for P2-E |
| R5 | Med | `404.njk` injects `<base href="/j-keebs/">` via `extra_head`, which `base.njk` renders **after** `<link rel="stylesheet" href="./style.css">`. `<base>` must come before URL-bearing elements, so at depth ≥ 2 (`/j-keebs/foo/bar`) the stylesheet URL is likely wrong. With `<base>` the skip link `#main` resolves to the homepage. | `src/pages/404.njk`, `base.njk` | open `/j-keebs/foo/bar` on the live site | P2-D — **done in working copy 2026-09-21** (`root_paths: true`, no `<base>`; deploy pending) |
| R6 | Med | Homepage gallery: German HTML default is "Der Garagenfund" / "Holz-Case", but the **DE** dictionary says "Cherry G80-3000" / "Holz-Gehäuse", "Fundfoto 1/2", "Holz-Case Foto 1–3" — clicking DE changes the German text. EN dictionary photo titles are wrong: "J80-3000" for `G80-3000.jpg`, "YMDK75 Walnut" for a YMDK68 photo. Placeholder "Switches: – ergänzen" / "– to add" is visible live. **Needs an owner decision which German wording is final**, then EN follows DE. | `src/pages/index.njk` lines ~139–153 (DE), ~207–221 (EN), ~374–406 (HTML) | `node` compare, or toggle DE/EN on the homepage | owner decision → P3 |
| R7 | Med | Blog post J80-3000 (dated 22 April 2026) says the G80 "does not want to type yet" and firmware is "the next step"; the homepage says "Voll funktionsfähig. Programmierbar mit Via." Content is stale in one of them. | `src/pages/blog-j80-3000-second-life.njk` (`post4.p3`, `post4.p4`), `index.njk` (`timeline*`) | read both | owner (content) |
| R8 | Low | PCBWay is a compensated partner (barter). The text link has `rel="sponsored"`; the logo link on the same card does not. | `src/pages/partner.njk` line ~58 | `grep -n "pcbway.com" _site/partner.html` | P2-D — **done in working copy 2026-09-21** (deploy pending) |
| R9 | Low | Meta gaps: `og:image` missing on 10 pages (about, contact, faq, guides, partner, switches, cookies, impressum, privacy, terms); `og:image` of index and keyboards is the portrait hero (526×1113) — poor link preview (target 1200×630); no `twitter:description`, no `og:site_name`; `apple-touch-icon` points at a 238 KB 512×512 `.ico` (Apple expects PNG, 180×180); very short meta descriptions on legal/contact pages (32–62 chars). | `base.njk`, page front matter | view-source / social preview debugger | P2-E |
| R10 | Low | File hygiene: `images/mechanicon_logo.png` is unused; `Keychron Q3_1.JPG`, `Keychron Q3_2.JPG`, `Monsgeek M1.jpg` contain spaces / upper-case extensions (works today via `%20`, fragile between Windows and Linux CI). Renaming needs matching template edits. | `images/`, `keyboards.njk` | `ls images \| grep -E " \|\.JPG"` | owner / P2-E |
| R11 | Low | Typos in German copy: "3D-Gedruckte Plate" (`gp1.title` in `guides.njk`), "Voll Funktionsfähig" (index). Missing comma in the To-Do line of the J80 card (index). | `guides.njk`, `index.njk` | read | owner (content) |

**Confirmed OK in the same review:** 21/21 pages build; no broken internal links, anchors or image refs; no duplicate IDs; all `<img>` have `alt`; one `<h1>` per page; sitemap = 20 canonical pages; canonicals correct; DE/EN key parity complete; keyboards page DE/EN spec fields consistent; PCBWay disclosure badge present.

## Found during P2-D (2026-09-21, not fixed — out of scope)

- [ ] **Low — optional font preload.** After self-hosting, text still uses `font-display: swap`. If a visible swap jump shows up in a real browser, add `<link rel="preload" as="font" type="font/woff2" crossorigin>` for IBM Plex Sans 400 and Libre Caslon Text 700 in `base.njk` (the URLs need the `rp` prefix like the other chrome URLs). Measure first; not needed by any current requirement.
- [ ] **Low — `font-weight` values without a matching face.** `style.css` uses `font-weight: 200` (`label`, ~line 2036), `800` (`.cheat-sheet ul`, ~line 1240) and `1000` (~line 2105). They resolve to the nearest declared face (400 / 700), so there is no visible bug; tidy up in a CSS refactor. Playwrite DE Grund (`--font-hand`) is a variable font limited to `wght` 100–400: `h2`/`h3` in the cheat sheet request bold and the browser synthesises it (same as with Google Fonts).
- [ ] **Low — glyphs outside the Latin subset** (`← → ↗ ✓ ✕`) fall back to system fonts (unchanged from the Google Fonts setup, which never served them either). If a consistent look is wanted, use an inline SVG or a symbol font.
- [ ] **Low — `_site/fonts/README.md` is published** because `fonts/` is copied as a whole directory (same pattern as `images/`). Harmless; narrow the passthrough glob if unwanted.

## Eleventy structure debt (P2-F)

The migration is a faithful "lift and shift": Eleventy currently acts as an include mechanism. `CONVENTIONS.md` says not to recreate the 21-file copy/paste pattern inside templates; parts of it survived.

- [ ] **Computed URLs.** `og_url` and `canonical` are identical hard-coded strings on every page (54 absolute URLs in front matter); `pathPrefix` is configured but the `url` filter is never used. Derive `canonical`/`og_url` from `site.url` + `page.url` via `eleventyComputed`.
- [ ] **Directory data.** `layout: base.njk` and `permalink: <name>.html` are repeated in 21 files; `active_nav` is derivable from the permalink. Use `src/pages/pages.11tydata.js`.
- [ ] **i18n as data.** ~35 % of template bytes (93 of 266 KB) are `window.J_KEEBS_I18N` blocks stored as raw `<script>` strings in YAML front matter; 82 key/value pairs are duplicated across templates (blog titles and prev/next titles in 4+ files). Move dictionaries to `src/_data/i18n/*.js(on)` and render the script from data.
- [ ] **Blog as collection.** 7 article templates + a 240-line `blog.njk` hard-code order, dates, teasers and prev/next chains. One front-matter block per post → generated listing, prev/next and dictionary.
- [ ] **Generate `sitemap.xml` and `robots.txt`** from the page collection instead of maintaining them by hand (currently correct, but only by discipline).
- [ ] **Asset layout.** Pages live in `src/`, assets in the repo root (`style.css`, `main.js`, `images/`). Consider `src/assets/`. The comment "while the legacy site remains live" in `eleventy.config.js` is stale.
- [ ] Nav key naming is inconsistent (`nav.kontakt` for `contact.html`); nav labels in `site.js` are German while the `lang` default is `en`.
- [ ] CI: add a link/asset check step; `deploy.yml` has CRLF line endings; it also rebuilds on pure `ai/*.md` changes (`paths-ignore`). Optional cache-busting for `style.css` (81 KB) / `main.js` (45 KB), both unminified.

## Decision to revisit (owner)

- [ ] **Client-side-only DE/EN.** `DECISIONS.md` 2026-09-01 said "revisit when adding a layout/SSG". Consequences today: `<html lang="en">` and `og:locale en_US` on German text; meta descriptions and link previews are German; crawlers and no-JS see German only; the EN dictionary is identical to DE for many keys (about 21/23, guides 21/48, keyboards 63/191, index 14/91). Option: static `/` (DE) and `/en/` output from Eleventy. Not a defect while the English-default decision stands; needs an explicit owner call.

## Pending owner requests (not yet scoped into a package)

- [ ] **Dual-theme brand logos:** separate logo/icon assets for light and dark mode (from `USERNOTES.md`, 2026-09-11). Needs scoping — asset swap in header via `[data-theme]` selectors or JS, plus favicon handling.

## P2 — performance and a11y (remaining items)

- [x] ~~Drop unused Google Fonts~~ — the four linked families are all used now. Superseded by R1 (self-hosting).
- [ ] Image `srcset` / WebP → R3 / P2-E. (`index.html` `og:image` exists now; format problem → R9.)
- [x] ~~Theme boot honours `prefers-color-scheme`~~ — done in `base.njk` boot script and `main.js`. (`:root` is the dark token set, `[data-theme="light"]` overrides; without JS the site is dark.)
- [ ] Gallery: cheat-sheet toggle vs fullscreen both bind to the polaroid; one control per action. Not re-verified in the 2026-09-20 review.
- [x] ~~Replace `data-i18n-html` innerHTML~~ — obsolete: `main.js` contains no `innerHTML` handling; `data-i18n-html` is only mentioned in a comment. Remove the mention from `readme.md`.

## P3 — content and hygiene

- [ ] Fill or remove incomplete gallery fields ("Switches: – ergänzen"). Align DE gallery title keys with HTML → R6.
- [ ] Guides: most cards are `guide-card--pending`. Finish a few or hide the rest.
- [ ] Rewrite or unpublish blog text that is not original (homepage already warns).
- [ ] Root `readme.md`: structure and claims were corrected 2026-09-20; re-check whenever the structure changes. Do not add accessibility/performance claims without a check.
- [ ] Consider dropping AGB if nothing is sold; keep Impressum.
- [ ] Link checker in CI (see P2-F).

## Launch bar blockers

- [x] Featured project links work.
- [ ] Blog posts that are not original are rewritten or unpublished.
- [ ] Guides page has at least one finished guide per advertised category, or pending cards are removed from the main view.
- [ ] Visible placeholders removed (R6).
- [ ] No undisclosed third-party requests (R1) — fixed in the working copy 2026-09-21; tick once P2-D is deployed and the live site has been checked.

## Done

- 2026-09-21 — P2-D implemented in the working copy (not committed, not deployed): self-hosted fonts (`fonts/`, 10 woff2 + 4 OFL licences, `@font-face` in `style.css`, Google `<link>` tags removed from `base.njk`); logo `width/height` 1742×733 (header + footer); 404 without `<base>` (`root_paths` in `base.njk`, set in `404.njk`); PCBWay logo link `target`/`rel`. Owner steps open: commit, `git rm -r --cached node_modules .cursor`, deploy, live check.
- 2026-09-20 — Planner review of `6f478fa`: findings R1–R11 recorded, structure debt listed, `ai/` files, `AGENTS.md`, `.cursor` rule and root `readme.md` brought in line with the Eleventy setup, `USERNOTES.md` folded, P2-D queued.
- 2026-09-18/19 — P2-C Eleventy full migration: all 21 pages in `src/pages/` on `base.njk`, legacy root HTML deleted, GitHub Actions deploy (`deploy.yml`) live.
- 2026-09-11 — P2-B Eleventy migration preparation: `eleventy.config.js`, `base.njk`, `site.js`, `about.njk` proof page; inventory in `ai/ELEVENTY-INVENTORY.md`.
- 2026-09-11 — Owner deleted all redirect stubs (German pages, old blog slugs, article stub). Old URLs now 404.
- 2026-09-11 — All work pushed and deployed to live site. Node.js + Eleventy available locally.
- 2026-09-11 — Planner review: STATUS, PLAN, BACKLOG corrected; dual-theme brand request folded in.
- 2026-09-09 — P1-A brand logo/icon, OWA metadata, G80-Plate image, about page rewritten. P1-B guide IA (Keycaps category, navigable Guides parent, footer links). P2-A map touch feedback, fullscreen control centering, homepage spacing and workbench placeholder. About page and header refinement.
- 2026-09-05 — P1 contact-form CORS fix (JSON POST to `/ajax/{email}`); contact-page OSM map (auto-loading, desaturated until hover); OWA LABS card on `partner`.
- 2026-09-03 — P0-B absolute URLs use `/j-keebs/`; P0-C blog slugs renamed to English; language decision: English default.
- 2026-09-01 — Critical review, `ai/` handoff folder added; P0 URL fixes (J80 hrefs, canonical/og:url/_next, sitemap lists canonical pages only).
