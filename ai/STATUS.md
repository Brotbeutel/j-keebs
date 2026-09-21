# Status

- **Site:** J-Keebs, static GitHub Pages portfolio. Built with Eleventy 3 (Nunjucks templates) + vanilla CSS/JS.
- **Live:** https://brotbeutel.github.io/j-keebs/
- **Repo:** https://github.com/Brotbeutel/j-keebs
- **Owner:** Jannik Schlüter
- **Planner:** dedicated planning chat; implementers use a **new** chat per work package
- **Updated:** 2026-09-21 (implementer: P2-D done in the working copy — not committed, not deployed; baseline is still the planner review of commit `6f478fa`)

## Snapshot

The site is **live** and deployed automatically: `.github/workflows/deploy.yml` runs `npm ci` → `npm run build` → uploads `_site/` → GitHub Pages. P0 through P2-C are done and deployed. The source of truth is `src/pages/*.njk` (21 pages), `src/_includes/base.njk` (all shared chrome) and `src/_data/site.js` (nav). The root files `main.js`, `style.css`, `robots.txt`, `sitemap.xml`, `images/` and `fonts/` are passthrough-copied into `_site/`.

**Review 2026-09-20 (file-level, from a fresh clone + local build):**
- `npm run build` writes 21 pages + 35 assets in ~0.3 s, no errors.
- No broken internal links, anchors or image references; no duplicate IDs; every `<img>` has `alt`; every page has exactly one `<h1>`.
- `sitemap.xml` lists exactly the 20 canonical pages (all pages except `404.html`); canonicals match.
- DE/EN dictionaries have full key parity (1146 entries, 0 missing keys). Two content drifts found (see BACKLOG R6, R7).

**Known problems (details, severity and verify commands: `BACKLOG.md` → "Review 2026-09-20"):**
- `node_modules/` (1,681 files) and `.cursor/` are **tracked in git** despite `.gitignore` (R2).
- Image weight: 47 MB in `images/`, `keyboards.html` loads ~20 MB eagerly, logo PNG is 557 KB on every page (R3).
- `Werkbank_Hero.jpg` has `width="526" height="1052"` in `index.njk`, the file is 526×1113 (rest of R4; the logo part is fixed in P2-D).
- Homepage gallery DE dictionary contradicts the German HTML default; a placeholder "– ergänzen" is visible live (R6).

**P2-D (implemented 2026-09-21 in the working copy, awaiting owner commit + deploy):** R1 (fonts self-hosted in `fonts/`, all Google `<link>` tags removed), R4 logo part (`height="733"` in `base.njk`, header + footer), R5 (404 without `<base>`: `root_paths: true` → root-absolute chrome URLs), R8 (PCBWay logo link `target="_blank" rel="noopener noreferrer sponsored"`). Checked at file level (build, `_site` diff, link/anchor check incl. `404.html` at `/j-keebs/foo/bar`, dev server responses, font embedding via a WeasyPrint render). **Not checked here (no browser in the sandbox):** DevTools Network for Google requests and a visual font/layout check in a real browser; **the deployed site is unchanged until the owner pushes** — re-check after the deploy (see `PLAN.md` "Done when").

**Redirect stubs:** deleted by the owner (2026-09-11): `kontakt.html`, `ueber-uns.html`, `datenschutz.html`, `agb.html`, the five old German blog slugs and `article-j80-3000-second-life.html`. Old inbound links 404. This is an accepted owner decision unless explicitly reversed.

## In flight

- [x] P0 / P0-B / P0-C — done and deployed
- [x] P1 / P1-A / P1-B — done and deployed (live browser test of contact form, JS on + JS off, still outstanding)
- [x] P2-A — polish, done and deployed
- [x] P2-B / P2-C — Eleventy migration, done and deployed (2026-09-18/19)
- [ ] **P2-D — repo hygiene, self-hosted fonts, base-layout fixes** ← implemented in the working copy 2026-09-21; stays open until the owner has committed, run `git rm -r --cached node_modules .cursor`, deployed and re-checked the live site (see `PLAN.md`); planner confirms and queues P2-E
- [ ] P2-E — image pipeline
- [ ] P2-F — Eleventy data model (computed URLs, i18n data, blog collection, generated sitemap)
- [ ] P2-remaining — a11y items
- [ ] Owner (optional): lawyer review of Art. 6 Abs. 1 lit. f DSGVO for the auto-loading map

## Do not assume

- **Build is required.** Edit `src/`, never `_site/` (generated, gitignored). CI uses Node 22.
- **Fonts are self-hosted** (`fonts/` → `_site/fonts/`, `@font-face` in `style.css`, provenance in `fonts/README.md`). Never add Google Fonts or another font CDN back; a new weight = new woff2 + `@font-face`.
- **The 404 page uses `root_paths: true`** (root-absolute chrome URLs from `site.basePath`), not `<base>`. Do not reintroduce `<base>` (it turns the skip link `#main` into a link to the homepage).
- **`node_modules/` is currently tracked in git** (it is listed in `.gitignore`, but was committed before/despite it). It is dead weight: CI runs `npm ci`. Owner step in P2-D: `git rm -r --cached node_modules .cursor`.
- **German is the source of truth.** If DE and EN differ, DE is right (owner, 2026-09-20).
- **Photos are 16:9**, 21 of 31 files in `images/` are exactly 1920×1080. Exceptions: `Werkbank_Hero.jpg` (526×1113 portrait), `J-Keebs-Logo.png` (1742×733), `Retro-PC_pixelart_generated.png` (64×64), `J-Keebs-Icon.ico`, `mechanicon_logo.png` (unused). Larger 16:9: `J80-3000_open_with_printed_plate.jpg` (3746×2107, 7.8 MB); smaller: `TOFU65_Mixed_Keycaps.jpg` (1600×900), `Stars75.jpg` (1753×986).
- The site is a GitHub Pages *project* page under `/j-keebs/`. Every absolute URL must include it. `pathPrefix` is set in `eleventy.config.js` but the templates do not use the `url` filter; URLs are hard-coded (54 absolute URLs in front matter).
- English is the confirmed default (`lang="en"`, `DEFAULT_LANG = "en"`). Visible copy stays German. Intentional.
- `content/` is gitignored. Do not publish it. `main-original.js` must never be restored.
- The contact map **auto-loads** by explicit owner decision. Do not revert to click-to-load.
- `ELEVENTY-MIGRATION.md` and `ELEVENTY-INVENTORY.md` are **historical** (P2-B/P2-C). Do not treat their guardrails ("keep legacy root HTML", "no cutover") as current.

## Stack (actual)

| Piece | File / place |
| --- | --- |
| Templates | `src/pages/*.njk` (21), `src/_includes/base.njk`, `src/_data/site.js` |
| Output | `_site/` (21 HTML pages + copied assets), gitignored |
| Build / CI | Eleventy 3.1.6 (`npm run build`), `.github/workflows/deploy.yml` (Node 22, `npm ci`) |
| Hosting | GitHub Pages project site, base path `/j-keebs/` |
| CSS | `style.css` (root, passthrough), tokens in `:root` (dark) and `[data-theme="light"]` |
| JS | `main.js` (root, passthrough) |
| i18n common | `J_KEEBS_I18N_COMMON` in `main.js` |
| i18n page | `window.J_KEEBS_I18N` inside `page_script` front matter of each template (~35 % of template bytes) |
| Contact | FormSubmit (AJAX + no-JS fallback) |
| Map | OpenStreetMap iframe, auto-loading, desaturated until hover/focus |
| Fonts | Self-hosted woff2 in `fonts/` (passthrough), `@font-face` in `style.css`; no third-party font request |
| Images | `images/` (root, passthrough) |

## Target architecture

| Piece | Direction |
| --- | --- |
| Generator | Eleventy; next: use it for data (computed canonical/og URLs, i18n data files, blog collection, sitemap) |
| Images | Build-time resize/WebP/srcset (`@11ty/eleventy-img`) — P2-E |
| Fonts | Self-hosted woff2, no third-party font requests — done in P2-D (pending deploy) |
| Later option | Static DE/EN output instead of client-side-only i18n (decision needed, see `DECISIONS.md` 2026-09-01 "revisit with SSG"); Astro only if richer islands are needed |
