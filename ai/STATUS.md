# Status

- **Site:** J-Keebs, static GitHub Pages portfolio. Built with Eleventy 3 (Nunjucks templates) + vanilla CSS/JS.
- **Live:** https://brotbeutel.github.io/j-keebs/
- **Repo:** https://github.com/Brotbeutel/j-keebs
- **Owner:** Jannik Schlüter
- **Planner:** dedicated planning chat; implementers use a **new** chat per work package
- **Updated:** 2026-10-17 (Designer image draft for Mechanicon; P3-M implementer run on source `05dc9dc`, uncommitted; last planner review: source `4e04a3e`, 2026-10-14)

## Snapshot

The site is **live and deployed** via GitHub Actions (`.github/workflows/deploy.yml`: `npm ci` → `npm run build` → `check_links.py` → `tag_balance.py` → upload `_site/` → GitHub Pages; no `paths-ignore`, so every push builds and deploys). `origin/main` is `4e04a3e` ("New To Do's", 2026-10-13, only `ai/USERNOTES.md`); the last source change is `3da476a` (contact form redesign, 2026-10-07). There is no uncommitted implementation batch any more — the earlier "batch" (index gallery correction, mobile map, J80 wording, CI checks, `sharp`, LF handoff files, caption i18n fix) landed in `a864192`, `ecc9bd8` and `a549b70`.

**Live state (planner fetch 2026-10-14, cache-busted):** the homepage shows the corrected gallery (Cherry G80-3000, YMDK68 with "Kailh Box Jade"), the J80 card with "Voll Funktionsfähig. Programmierbar mit Via.", the Keycaps entry in the Guides dropdown, and `og:image` / `og:site_name` / `twitter:description` meta tags. The contact page shows the redesigned pixel-UI panel and the auto-loading OSM iframe. The legal pages, `sitemap.xml` and the Actions run log could not be fetched in this review, so their live state is inferred only from the unchanged templates (`0211d43`, 2026-10-06 was their last change). A single un-busted `web_fetch` of `contact.html` returned a stale pre-migration copy — use a cache-busting query string when checking live (`CONVENTIONS.md`).

**Local verification, planner review 2026-10-14 (fresh clone of `4e04a3e`, Node 22.22.2):** `npm ci && npm run build` → Copied 56, wrote 22 files (21 HTML + `sitemap.xml`), no errors; `python scripts/check_links.py _site` → 21 pages, **1197** references, 0 errors; `python scripts/tag_balance.py _site` → 0 problems; unprefixed-URL grep empty; no `@@`/`{{` left in `_site`; `diff readme.md ai/README.md` empty; `node --check main.js` ok; DE/EN dictionary key sets identical; German HTML defaults equal the German dictionaries except `about` `story.body` (R13) and two straight-quote differences (R11). Sitemap has 20 URLs (404 excluded). Details and all findings: `BACKLOG.md` → "Planner review 2026-10-14".

**Workflow (2026-10-15):** six roles — Planner, Implementer, Writer, Designer, Lawyer, Owner (`AGENTS.md`, `ai/PROMPTS.md`); Writer/Designer/Lawyer deliverables go to `ai/drafts/` (prototypes to `design/`) and are integrated only after owner approval; tool catalog and baselines in `ai/TOOLS.md`; briefs in `ai/CONTENT.md`, `ai/DESIGN.md`, `ai/LEGAL.md`. These files and the three audit scripts in `scripts/` are in the repo (verified 2026-10-16). `ai/README.md` is not (deleted in `6d8aa10`, still referenced — `BACKLOG.md` → "Found during P3-M").

**Owner priorities (2026-10-15):** 1. Mechanicon post (P3-M, Due 2026-10-16, event Sat 2026-10-17), 2. contact page redesign (Designer D-1 → P3-C). Owner device test of the map: tapping the map itself does not colour it (R24).

**Implementer run 2026-10-16 (source `05dc9dc`, fast-forwarded from `6d8aa10`):** `05dc9dc` (commit title "P3-C") brought the Writer draft for Mechanicon, the Designer draft D-1 (`status: draft`, with `design/contact-v1.html`), three prototype fonts, `images/Mechanicon_2026.jpg`, the removal of the two owner-addressed notes (R12) and `style.css` (absent since `e848d72`, identical to `3da476a`). **P3-M is implemented in the working tree (uncommitted):** the owner approved the Writer draft in chat, it is integrated verbatim — new page `blog-mechanicon-2026` (blog id 8, first teaser on `blog.html`, "previous" = Corsair, Corsair now has a "next" link), 22 pages, sitemap 21 URLs. Build and tools: see `TOOLS.md` baseline (22 pages, 1248 references, 0 link errors, 3 known `de_default_audit` findings, 13 a11y warnings incl. R16 on the new page). **Not done:** commit/push, deployed-site check; the approved text says "Morgen" but the event day is today, 2026-10-17 (`BACKLOG.md` → "Found during P3-M": owner decision needed before pushing). `ai/README.md` is missing but still referenced; `style.css` and fonts notes are in the same section.

**Open launch-relevant findings:** R12 (owner-addressed notes on Impressum and Datenschutz — **High**, rider of P3-M; **removed in source by `05dc9dc`, deployment unchecked**), R24 (tapping the map itself does not colour it — contact redesign), R13 (About dictionary text wrong, owner rewrites the page; interim sync in P3-H), R14 (contact "X" resets the form, in the contact redesign), R16 (h1→h3 skip, in P3-H), R17 (Keychron keycaps → Glorious Aura V2, in P3-H), R18 (light-theme gold text contrast 2.24:1, needs owner visual OK), R19 (J80 article flow, owner content), R22 (cookies page omits a `sessionStorage` key — Lawyer), R23 (K70 origin-story contradiction — owner/Writer). Decided/resolved: R15 (credit stays; legal via separate bot), R20, R21.

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
- Owner questions still open: what exactly to rework in the new Win2k draft (`win2k-design/win2k-redesign.html`); the cut-off wording of the "Mit GitHub Pages betrieben" footer note; nav position and category order of "Tools & Ressourcen" (planner proposal in `BACKLOG.md`); delete or keep the unused `card_v1.jpg` / `card_v2.jpg`. Answered 2026-10-14: R13 (About text in `about.njk` is correct, owner rewrites it), R15 (PCBWay credit stays; legal questions go to a separate bot), R17 (Glorious Aura V2), R20 (OWA LABS link correct).
- Optional: lawyer review of Art. 6 Abs. 1 lit. f DSGVO for the auto-loading map.
- Unused draft cards `images/card_v1.jpg` / `images/card_v2.jpg`; `images/mechanicon_logo.png` (kept for the Mechanicon article); three image files with spaces/uppercase extensions that `keyboards.njk` references (`Monsgeek M1.jpg`, `Keychron Q3_1.JPG`, `Keychron Q3_2.JPG`) — rename only together with the template.
- `win2k-design/` holds the owner's new Win2k redesign draft (tracked, unpublished, to be migrated later).

## In flight

- [x] Everything through the contact panel redesign — committed; the homepage and contact page are confirmed live
- [x] **P3-M — Mechanicon announcement post + R12 rider** (event Sat 2026-10-17; Due 2026-10-16) — implemented 2026-10-16 in the working tree; **waiting for the owner: commit, push, check the Actions run and the live page** (`?v=<random>`). `PLAN.md` still names it as the current package until the planner retires it.
- [ ] **P3-M image v2 — Designer draft** (Due: 2026-10-17) — review `design/Mechanicon_2026-v2.jpg` and `ai/drafts/2026-10-17-mechanicon-blog-image-designer.md`; the existing `images/Mechanicon_2026.jpg` is unchanged pending owner approval.
- [ ] **D-1 — Designer: contact page redesign** (parallel, no code; brief in `ai/DESIGN.md`)
- [ ] P3-C — contact migration of the approved design (`BACKLOG.md` → "Ready"; includes R14, R24)
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
| Fonts | Self-hosted woff2 in `fonts/` (Libre Caslon Text, IBM Plex Sans, Courier Prime, Playwrite DE Grund, Silkscreen) |
| Images | `images/` (originals, passthrough) + `_site/img/` (generated WebP, build-time). Social default: `images/og-preview.jpg`. Touch icon: `images/apple-touch-icon.png`. |
| Scripts | `scripts/check_links.py`, `scripts/tag_balance.py`, `scripts/img_report.py` (Python 3); `scripts/generate_social_assets.js` (needs `sharp`, now a direct dev dependency) |
