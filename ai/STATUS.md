# Status

- **Site:** J-Keebs, static GitHub Pages portfolio. Built with Eleventy 3 (Nunjucks templates) + vanilla CSS/JS.
- **Live:** https://brotbeutel.github.io/j-keebs/
- **Repo:** https://github.com/Brotbeutel/j-keebs
- **Owner:** Jannik Schlüter
- **Planner:** dedicated planning chat; implementers use a **new** chat per work package
- **Updated:** 2026-10-20 (planner review of source `76edb45`; owner answers of 2026-10-20 folded)

## Snapshot

The site is **live and deployed** via GitHub Actions (`.github/workflows/deploy.yml`: `npm ci` → `npm run build` → `check_links.py` → `tag_balance.py` → upload `_site/` → GitHub Pages; no `paths-ignore`, so every push builds and deploys). `HEAD` and `origin/main` are `76edb45` ("Win2k redesign update", 2026-10-17 11:38). Since the review of `4e04a3e`: planner handoff files and tools committed (`e848d72`), `ai/README.md` deleted by the owner (`6d8aa10`), P3-M (Mechanicon post + R12) in `8460d4f`/`d033410`, the Win2k contact-form window in `76edb45`. The Actions runs 29–30 between `e848d72` and `05dc9dc` failed (see "Incident" below).

**Live state (planner fetch 2026-10-19):** the contact page shows the new Win2k form window (`J-Keebs_Contact.exe`, topic dropdown, "ISO-DE Layout bevorzugt", status bar) and the unchanged OSM map; the Impressum no longer contains the owner-addressed note (R12 confirmed live). The owner confirmed the Mechanicon post is published (its date is 16 October on purpose, so "Morgen" is correct; text and image are approved) and tested the page on a phone (see findings). The Actions run log and `sitemap.xml` could not be fetched. Fetch tools can serve stale copies of a single URL — bypass caches with `?v=<random>`.

**Local verification, planner review 2026-10-19 (fresh clone of `76edb45`, Node 22):** `npm ci && npm run build` → 22 HTML pages + `sitemap.xml`, no errors; `check_links.py` → 22 pages, 1252 references, 0 errors; `tag_balance.py` → 0 problems; `i18n_audit.js` → 0 errors (13 INFO); `de_default_audit.py` → 3 findings, all baseline (R13 about, R11 quotes in faq/switches); `a11y_audit.py` → 0 errors, 11 warnings (10 pages h1→h3 R16, focusable `#mapEmbed` div); `node --check main.js` ok. Details and all findings: `BACKLOG.md` → "Planner review 2026-10-19".

**Workflow (2026-10-19):** six roles — Planner, Implementer, Writer, Designer, Lawyer, Owner (`AGENTS.md`, `ai/PROMPTS.md`); Writer/Designer/Lawyer deliverables go to `ai/drafts/` (prototypes to `design/`) and are integrated after owner approval (a "fast lane" is allowed when the owner says "build now" — `CONVENTIONS.md`); tool catalog and baselines in `ai/TOOLS.md`; briefs in `ai/CONTENT.md`, `ai/DESIGN.md`, `ai/LEGAL.md`. The project overview is `readme.md`; `ai/README.md` (deleted in `6d8aa10` as a duplicate) returns on 2026-10-20 as a short **folder index**, not a copy (`DECISIONS.md`).

**Owner priorities (2026-10-19):** the Win2k contact form must be finished — checkbox, send button, hover float, dropdown, validation message, map colouring on touch (all recorded as R24, R27–R30; P3-C2 now, D-2 → P3-C3 next). The owner built the Win2k work ahead of the plan because it had the highest priority; the cleanup that left behind is R31.

**Note (owner, 2026-10-20):** the Designer misunderstood or missed the map part of brief D-1; the prototype layer is not a usable reference, P3-C2 builds the behaviour from requirements.

**Owner test 2026-10-19 (real phone):** the map still stays grey when it is used without touching the card around it (R24 — the Designer's activation layer was never ported); the ISO-DE box does not react to a click and is not inset like the text fields (R27); the send button has a grey border around a gold fill (R28); the form window does not float on hover/click like the other tiles (R29); the dropdown and the browser's "Bitte füllen Sie dieses Feld aus" bubble do not match the design (R30).

**Open launch-relevant findings:** R24, R27–R31 (contact form, above and in `BACKLOG.md`), R25 (font licence provenance for Gohufont/VT323 — Lawyer), R13 (About dictionary text wrong; owner rewrites the page; interim sync in P3-H), R16 (h1→h3 skip, P3-H), R17 (Keychron keycaps → Glorious Aura V2, P3-H), R18 (light-theme gold text contrast 2.24:1, needs owner visual OK), R19 (J80 article flow, owner content), R22 (cookies page omits a `sessionStorage` key — Lawyer), R23 (K70 origin-story contradiction — owner/Writer). **Done:** R12 (live), P3-M. **Decided/resolved:** R15 (credit stays; legal via the Lawyer role), R20, R21. **Legal impact:** the form now also sends `topic` and `iso_de_layout` — the Lawyer confirms the notice covers them (`ai/LEGAL.md` L4).

**Incident (2026-10-15):** commit `e848d72` ("Planner session update") deleted `style.css` (3545 lines) together with adding the planner files; `05dc9dc` restored it on 2026-10-16. `check_links.py` aborts when `_site/style.css` is missing, so the Actions runs in between most likely failed before deploying and Pages kept the previous version. Cause unknown (the delivered ZIP did not contain `style.css`). **Confirmed 2026-10-20 on the public Actions page:** runs 29 and 30 failed, runs 31–34 are green, the badge reads "passing". Safeguards are in `CONVENTIONS.md` ("Delivering files to the owner").

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
- Contact panel redesign — self-hosted Silkscreen, pixel-art header, neutral title bar, beveled controls; form behaviour unchanged (`eb10aec`…`3da476a`); **replaced** on 2026-10-17 by the Win2k form window (below)
- P3-M — Mechanicon announcement post (`blog-mechanicon-2026`, image `images/Mechanicon_2026.jpg`) and R12 (owner notes removed from Impressum/Datenschutz) (`8460d4f`, `d033410`)
- Win2k contact-form window from `design/contact-v1.html` (owner-scoped slice of D-1/P3-C): self-hosted Gohufont, Press Start 2P, VT323; topic select; ISO-DE checkbox; status bar; DE/EN strings; FormSubmit AJAX + no-JS fallback kept (`76edb45`)

**Earlier per-package verification (condensed; full logs are in git history):** P2-E2/F1/F2/F3/remaining/P3 each ended with build 21 pages + `sitemap.xml`, link check 1195 references (1197 since the Silkscreen font files), tag balance 0, image report 94–95 % byte reduction, README parity. P2-F1 additionally proved byte-identical rendered HTML for all 21 pages before/after.

**Owner decisions on record (2026-10-06):** index gallery features Cherry G80-3000 and YMDK68 (`Kailh Box Jade`); "Der Garagenfund" reserved for a future article; separate light/dark logos cancelled; J80-3000 is fully functional and VIA-programmable (earlier failure is history); guide WIP cards stay visible until launch; client-side DE/EN stays.

**Still open (owner or later packages):**
- Live contact-form test (done for the map on 2026-10-15, see R24; still open for the form: submit with JS on and off; FormSubmit needs the first-time activation mail confirmed).
- Owner questions still open: nav position and category order of "Tools & Ressourcen" (planner proposal in `BACKLOG.md`); delete or keep the unused `card_v1.jpg` / `card_v2.jpg`. Answered: the title-bar ✕ may reset the form; the ISO-DE box stays checked by default; the Mechanicon image stays and the post is approved; footer credit "Powered by PCBWay, run on GitHub Pages"; R13 (About text in `about.njk` is correct, owner rewrites it), R15 (PCBWay credit stays; legal questions go to the Lawyer role), R17 (Glorious Aura V2), R20 (OWA LABS link correct).
- Optional: lawyer review of Art. 6 Abs. 1 lit. f DSGVO for the auto-loading map.
- Unused draft cards `images/card_v1.jpg` / `images/card_v2.jpg`; `images/mechanicon_logo.png` (kept for the Mechanicon article); three image files with spaces/uppercase extensions that `keyboards.njk` references (`Monsgeek M1.jpg`, `Keychron Q3_1.JPG`, `Keychron Q3_2.JPG`) — rename only together with the template.
- `win2k-design/` holds the owner's wider Win2k redesign draft (tracked, unpublished). Only the form window from `design/contact-v1.html` was migrated in the 2026-10-17 owner-requested slice; full-page layout and map changes remain pending.

## In flight

- [x] P3-M — Mechanicon post + R12 — done (`d033410`); R12 confirmed live 2026-10-19; post and image approved by the owner
- [x] Win2k contact-form window — done and live (`76edb45`)
- [ ] **P3-C2 — contact form polish, map activation, CSS cleanup** (R24, R27–R29, R31) ← current package, see `PLAN.md`
- [ ] **D-2 — Designer: Win2k dropdown + validation message** (parallel, no code; brief in `ai/DESIGN.md`) → P3-C3 (implement)
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
| Fonts | Self-hosted woff2 in `fonts/` (Libre Caslon Text, IBM Plex Sans, Courier Prime, Playwrite DE Grund, Gohufont, Press Start 2P, VT323; Silkscreen is now unused — removal queued in P3-C2) |
| Images | `images/` (originals, passthrough) + `_site/img/` (generated WebP, build-time). Social default: `images/og-preview.jpg`. Touch icon: `images/apple-touch-icon.png`. |
| Scripts | `scripts/check_links.py`, `scripts/tag_balance.py`, `scripts/img_report.py` (Python 3); `scripts/generate_social_assets.js` (needs `sharp`, now a direct dev dependency) |
