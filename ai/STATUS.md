# Status

- **Site:** J-Keebs, static GitHub Pages portfolio. Built with Eleventy 3 (Nunjucks templates) + vanilla CSS/JS.
- **Live:** https://brotbeutel.github.io/j-keebs/
- **Repo:** https://github.com/Brotbeutel/j-keebs
- **Owner:** Jannik Schlüter
- **Planner:** dedicated planning chat; implementers use a **new** chat per work package
- **Updated:** 2026-10-17 (owner-requested hover/focus float, styled validation feedback, dropdown and ISO-DE checkbox for the Win2k contact form; `main` and `origin/main` at `76edb45`; last planner review: source `4e04a3e`, 2026-10-14)

## Snapshot

The site is **live and deployed** via GitHub Actions (`.github/workflows/deploy.yml`: `npm ci` → `npm run build` → `check_links.py` → `tag_balance.py` → upload `_site/` → GitHub Pages; no `paths-ignore`, so every push builds and deploys). `HEAD` and `origin/main` are `76edb45` ("Win2k redesign update", 2026-10-17). The hover/focus and validation-feedback updates below are uncommitted in the working tree; their deployment and live rendering have not been checked. The earlier "batch" (index gallery correction, mobile map, J80 wording, CI checks, `sharp`, LF handoff files, caption i18n fix) landed in `a864192`, `ecc9bd8` and `a549b70`.

**Live state (planner fetch 2026-10-14, cache-busted):** the homepage shows the corrected gallery (Cherry G80-3000, YMDK68 with "Kailh Box Jade"), the J80 card with "Voll Funktionsfähig. Programmierbar mit Via.", the Keycaps entry in the Guides dropdown, and `og:image` / `og:site_name` / `twitter:description` meta tags. The contact page shows the redesigned pixel-UI panel and the auto-loading OSM iframe. The legal pages, `sitemap.xml` and the Actions run log could not be fetched in this review, so their live state is inferred only from the unchanged templates (`0211d43`, 2026-10-06 was their last change). A single un-busted `web_fetch` of `contact.html` returned a stale pre-migration copy — use a cache-busting query string when checking live (`CONVENTIONS.md`). The owner clarified that the earlier screenshot showed the form before its upload; the hover/focus lift, Win2k validation message, dropdown and custom checkbox below remain local and have not been checked live.

**Local verification, planner review 2026-10-14 (fresh clone of `4e04a3e`, Node 22.22.2):** `npm ci && npm run build` → Copied 56, wrote 22 files (21 HTML + `sitemap.xml`), no errors; `python scripts/check_links.py _site` → 21 pages, **1197** references, 0 errors; `python scripts/tag_balance.py _site` → 0 problems; unprefixed-URL grep empty; no `@@`/`{{` left in `_site`; `diff readme.md ai/README.md` empty; `node --check main.js` ok; DE/EN dictionary key sets identical; German HTML defaults equal the German dictionaries except `about` `story.body` (R13) and two straight-quote differences (R11). Sitemap has 20 URLs (404 excluded). Details and all findings: `BACKLOG.md` → "Planner review 2026-10-14".

**Workflow (2026-10-15):** six roles — Planner, Implementer, Writer, Designer, Lawyer, Owner (`AGENTS.md`, `ai/PROMPTS.md`); Writer/Designer/Lawyer deliverables go to `ai/drafts/` (prototypes to `design/`) and are integrated only after owner approval; tool catalog and baselines in `ai/TOOLS.md`; briefs in `ai/CONTENT.md`, `ai/DESIGN.md`, `ai/LEGAL.md`. These files and the three audit scripts in `scripts/` are in the repo (verified 2026-10-16). `ai/README.md` is not (deleted in `6d8aa10`, still referenced — `BACKLOG.md` → "Found during P3-M").

**Owner priority update (2026-10-17):** the current highest-priority request is the Win2k form element from `design/contact-v1.html`, and only that element. The wider contact redesign (D-1/P3-C) remains separate. The 2026-10-15 priorities were the Mechanicon post (P3-M, Due 2026-10-16) and contact redesign; the owner device test of the map found that tapping the map itself does not colour it (R24).

**P3-M state:** commit `d033410` remains in history; `HEAD` and `origin/main` are now `76edb45` ("Win2k redesign update"). The Actions run and cache-busted live page have not been checked in this task; the event date is today, 2026-10-17, while the article copy says "Morgen" and needs owner review. The Designer image v2 remains a separate unapproved draft.

**Owner-requested Win2k form element (2026-10-17):** migrated only the form window from `design/contact-v1.html` into `contact.html`; the surrounding contact layout, address/social cards and map were not changed. The window uses the existing local Gohufont, VT323 and Press Start 2P assets, now registered in production CSS. It keeps FormSubmit AJAX and the no-JS POST fallback, and adds the mockup's topic and optional ISO-DE fields to the existing payload. **Legal impact: yes** — the Lawyer should confirm the existing notice covers these additional fields. The title-bar ✕ now has a localized "reset inputs" label and no inline handler, but it still resets the form as the mockup specifies; the data-loss concern in R14 remains for owner review. Local verification on Node 24.19.0: `npm ci` succeeded; build wrote 22 HTML pages + `sitemap.xml`; link check 22 pages / 1252 references / 0 errors; tag balance 0; i18n 0 errors / 13 INFO; DE-default audit 3 existing findings; accessibility 0 errors / 11 warnings. Python checks used the bundled runtime because neither `python` nor `py` is on PATH. The owner clarified that the earlier screenshot showed the form before it was uploaded. Hover/focus lift and localized Win2k validation feedback were added in later follow-ups; FormSubmit activation, real-device behavior and live deployment remain unchecked. **Dropdown and ISO-DE follow-up (2026-10-17):** the subject select now has a beveled arrow control; the ISO-DE checkbox is custom-drawn with a gold checked state and visible keyboard focus. Both were visually checked in the local dark-theme browser preview. Light-theme and real-device rendering, FormSubmit activation and live deployment remain unchecked. `PLAN.md` still lists P3-M as current; the Implementer did not change package sequence.

**Open launch-relevant findings:** R12 (owner-addressed notes on Impressum and Datenschutz — **High**, removed in source and pushed in `d033410`, deployment unchecked), R24 (tapping the map itself does not colour it — untouched by the form-element request), R13 (About dictionary text wrong, owner rewrites the page; interim sync in P3-H), R14 (the title-bar ✕ still resets the form per the mockup; its accessible label and handler are fixed, but accidental data loss remains possible), R16 (h1→h3 skip, in P3-H), R17 (Keychron keycaps → Glorious Aura V2, in P3-H), R18 (light-theme gold text contrast 2.24:1, needs owner visual OK), R19 (J80 article flow, owner content), R22 (cookies page omits a `sessionStorage` key — Lawyer), R23 (K70 origin-story contradiction — owner/Writer). Decided/resolved: R15 (credit stays; legal via separate bot), R20, R21.

**Done in source (committed):**
- P0/P0-B/P0-C — URL fixes, English slugs, base path
- P1/P1-A/P1-B — contact form, brand assets, about page, OWA LABS, guide taxonomy
- P2-A — interaction/visual polish
- P2-B/P2-C — Eleventy migration (21 pages on `base.njk`, GitHub Actions CI/CD)
- P2-D — self-hosted fonts, logo fix, 404 layout, PCBWay `rel=sponsored`
- P2-E — build-time image pipeline (WebP srcset/sizes, eager/lazy policy)
- P2-E2 — social preview image, touch icon, `og:site_name`, `twitter:description` (`fe9c140`)
- P2-F1 — computed URLs, directory data, generated sitemap (`0211d43`)
- P2-F2 — i18n data files, `nav.contact` (`4cc9980`)
- P2-F3 — blog data and computed article navigation (`5237912`)
- P2-remaining — separate gallery cheat-sheet and fullscreen controls (`e0a807f`)
- P3 — README and handoff honesty (`66ff9e0`)
- P3 batch — index gallery correction, mobile map touch persistence, J80 wording, CI link/tag checks, direct `sharp`, LF handoff files, homepage i18n loading fix, gallery caption refresh (`a864192`, `ecc9bd8`, `a549b70`)
- Contact panel redesign — self-hosted Silkscreen, pixel-art header, neutral title bar, beveled controls; form behaviour unchanged (`eb10aec`…`3da476a`)

**Earlier per-package verification (condensed; full logs are in git history):** P2-E2/F1/F2/F3/remaining/P3 each ended with build 21 pages + `sitemap.xml`, link check 1195 references (1197 since the Silkscreen font files), tag balance 0, image report 94–95 % byte reduction, README parity. P2-F1 additionally proved byte-identical rendered HTML for all 21 pages before/after.

**Owner decisions on record (2026-10-06):** index gallery features Cherry G80-3000 and YMDK68 (`Kailh Box Jade`); "Der Garagenfund" reserved for a future article; separate light/dark logos cancelled; J80-3000 is fully functional and VIA-programmable (earlier failure is history); guide WIP cards stay visible until launch; client-side DE/EN stays.

**Still open (owner or later packages):**
- Live contact-form test (done for the map on 2026-10-15, see R24; still open for the form: submit with JS on and off; FormSubmit needs the first-time activation mail confirmed).
- Owner questions still open: whether the title-bar ✕ should continue resetting the form (current mockup behavior, with an accurate accessible label); the cut-off wording of the "Mit GitHub Pages betrieben" footer note; nav position and category order of "Tools & Ressourcen" (planner proposal in `BACKLOG.md`); delete or keep the unused `card_v1.jpg` / `card_v2.jpg`. Answered 2026-10-14: R13 (About text in `about.njk` is correct, owner rewrites it), R15 (PCBWay credit stays; legal questions go to a separate bot), R17 (Glorious Aura V2), R20 (OWA LABS link correct).
- Optional: lawyer review of Art. 6 Abs. 1 lit. f DSGVO for the auto-loading map.
- Unused draft cards `images/card_v1.jpg` / `images/card_v2.jpg`; `images/mechanicon_logo.png` (kept for the Mechanicon article); three image files with spaces/uppercase extensions that `keyboards.njk` references (`Monsgeek M1.jpg`, `Keychron Q3_1.JPG`, `Keychron Q3_2.JPG`) — rename only together with the template.
- `win2k-design/` holds the owner's wider Win2k redesign draft (tracked, unpublished). Only the form window from `design/contact-v1.html` was migrated in the 2026-10-17 owner-requested slice; full-page layout and map changes remain pending.

## In flight

- [x] Everything through the contact panel redesign — committed; the homepage and contact page are confirmed live
- [x] **P3-M — Mechanicon announcement post + R12 rider** (event Sat 2026-10-17; Due 2026-10-16) — committed and pushed as `d033410`; Actions run and cache-busted live-page check remain unverified. `PLAN.md` still names it as the current package until the planner retires it.
- [x] **Owner-requested Win2k contact-form element** — implemented from `design/contact-v1.html`; only the form window changed. Local browser preview is complete; hover/focus lift and localized custom validation feedback were added on 2026-10-17. FormSubmit activation, real-device behavior and deployment remain pending. The broader D-1/P3-C migration is still open.
- [ ] **P3-M image v2 — Designer draft** (Due: 2026-10-17) — review `design/Mechanicon_2026-v2.jpg` and `ai/drafts/2026-10-17-mechanicon-blog-image-designer.md`; the existing `images/Mechanicon_2026.jpg` is unchanged pending owner approval.
- [ ] **D-1 — Designer: contact page redesign** (parallel, no code; brief in `ai/DESIGN.md`)
- [ ] P3-C — remaining contact redesign work (`BACKLOG.md` → "Ready"); the Win2k form window is implemented, but broader layout work and R24 map activation remain open.
- [ ] P3-H — launch hygiene, reduced (R11 part, R13 interim, R16, R17)
- [ ] Owner gates: see "Still open" above and `BACKLOG.md` → "Next candidates"

## Do not assume

- **Build is required.** Edit `src/`, never `_site/`. CI uses Node 22. **Local Node must be ≥ 22** (`@11ty/eleventy-img` hard requirement).
- **Fonts are self-hosted** (`fonts/` → `_site/fonts/`). Never add Google Fonts back.
- **The 404 page uses `root_paths: true`** (root-absolute chrome URLs). Do not reintroduce `<base>`.
- **Images go through the build-time pipeline.** Templates write plain `<img src="images/…">`, the `imagePipeline` transform in `eleventy.config.js` rewrites them to WebP `srcset`/`sizes`/`width`/`height`/`data-full`. Do not add `<picture>` wrappers. See `ai/CONVENTIONS.md` "Images".
- **`og:image` / `twitter:image` stay on JPEG/PNG originals in `images/`** (default `images/og-preview.jpg`). Do not point social tags at `_site/img/` WebP.
- **German is the source of truth.** If DE and EN differ, DE is right.
- The site is a GitHub Pages *project* page under `/j-keebs/`. Every absolute URL must include it.
- English is the confirmed default (`lang="en"`, `DEFAULT_LANG = "en"`). Visible copy stays German. Intentional.
- `content/` is gitignored. `node_modules/`, `_site/`, `.cache/` are gitignored.
- The contact map **auto-loads** by explicit owner decision. Do not revert to click-to-load.

## Stack (actual)

| Piece | File / place |
| --- | --- |
| Templates | `src/pages/*.njk` (22 pages + `sitemap.njk`), `src/pages/pages.11tydata.js` (layout, computed `og_url`, blog navigation), `src/_includes/base.njk` + `article-nav.njk`, `src/_data/site.js`, `src/_data/blog.js`, `src/_data/i18n/*.js` |
| Output | `_site/` (22 HTML + assets + `img/` WebP), gitignored |
| Build / CI | Eleventy 3.1.6, `@11ty/eleventy-img` 7.x, `.github/workflows/deploy.yml` (Node 22) |
| Hosting | GitHub Pages project site, base path `/j-keebs/` |
| CSS | `style.css` (root, passthrough) |
| JS | `main.js` (root, passthrough) |
| i18n | `J_KEEBS_I18N_COMMON` in `main.js` + page-local dictionaries in `src/_data/i18n/<page-file-slug>.js` (selected by `src/pages/pages.11tydata.js`, emitted by `base.njk`) |
| Contact | FormSubmit (AJAX + no-JS fallback) |
| Map | OpenStreetMap iframe, auto-loading, desaturated until hover/focus |
| Fonts | Self-hosted woff2 in `fonts/` (Libre Caslon Text, IBM Plex Sans, Courier Prime, Playwrite DE Grund, Silkscreen, Gohufont, Press Start 2P, VT323) |
| Images | `images/` (originals, passthrough) + `_site/img/` (generated WebP, build-time). Social default: `images/og-preview.jpg`. Touch icon: `images/apple-touch-icon.png`. |
| Scripts | `scripts/check_links.py`, `scripts/tag_balance.py`, `scripts/img_report.py` (Python 3); `scripts/generate_social_assets.js` (needs `sharp`, now a direct dev dependency) |
