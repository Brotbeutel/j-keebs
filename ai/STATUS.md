# Status

- **Site:** J-Keebs, static GitHub Pages portfolio. Built with Eleventy 3 (Nunjucks templates) + vanilla CSS/JS.
- **Live:** https://brotbeutel.github.io/j-keebs/
- **Repo:** https://github.com/Brotbeutel/j-keebs
- **Owner:** Jannik Schlüter
- **Planner:** dedicated planning chat; implementers use a **new** chat per work package
- **Updated:** 2026-10-05 (planner review)

## Snapshot

The site is **live and deployed** via GitHub Actions (`.github/workflows/deploy.yml`: `npm ci` → `npm run build` → upload `_site/` → GitHub Pages; no `paths-ignore`, so every push builds and deploys). `origin/main` is now at `c1ae790` (code unchanged since `fe9c140`; `111dae2`/`e11d90c`/`2749621` moved the verification scripts to `scripts/` and tidied the repo; `c1ae790` re-saved the `ai/` handoff docs).

**Everything through P2-E2 is in git. Live Pages was still pre-P2-E2 at this planner review (2026-10-05, fresh fetch of `index.html`, `faq.html` and `keyboards.html`): all three still have `og:image: Werkbank_Hero.jpg` and no `og:site_name` / `twitter:description` meta tags.** Since the workflow has no path filter, the push that landed `fe9c140` should already have deployed it — this review could not check the Actions run log (GitHub API rate-limited from the sandbox, no browser available). **Owner: open https://github.com/Brotbeutel/j-keebs/actions and confirm the latest run is green before re-checking** (`ai/CONVENTIONS.md` has the PowerShell commands). If it is green and the site is still old, it is a Pages cache delay — wait a few minutes and retry.

**Done in source through P2-E2:**
- P0/P0-B/P0-C — URL fixes, English slugs, base path
- P1/P1-A/P1-B — contact form, brand assets, about page, OWA LABS, guide taxonomy
- P2-A — interaction/visual polish (map, fullscreen controls, homepage)
- P2-B/P2-C — Eleventy migration (21 pages on `base.njk`, GitHub Actions CI/CD)
- P2-D — self-hosted fonts, logo fix, 404 layout, PCBWay `rel=sponsored`
- P2-E — build-time image pipeline (WebP srcset/sizes, eager/lazy policy)
- P2-E2 — default 1200×630 `images/og-preview.jpg`, 180×180 `images/apple-touch-icon.png`, `og:site_name`, `twitter:description`, longer legal/contact meta descriptions (`fe9c140`)

**Verified 2026-10-05 (P2-E2 implementer, local `_site/`):**
- `npm run build` → Copied 54, Wrote 21 files, 0.61s (warm). No errors. Node v24.19.0.
- `python scripts/check_links.py _site` → pages 21, references 1195, errors 0.
- `python scripts/tag_balance.py _site` → pages 21, problems 0.
- Unprefixed `brotbeutel.github.io/` (missing `/j-keebs/`) in `_site` HTML/XML/TXT → empty.
- Default social image `images/og-preview.jpg` is 1200×630 JPEG (59 KB).
- `images/apple-touch-icon.png` is 180×180 PNG (18 KB).
- All 21 built pages have `og:image` (absolute JPEG/PNG under `/j-keebs/images/…`, not `_site/img/` WebP), `og:site_name` (J-Keebs), and `twitter:description`.
- Legal/contact `description` lengths: contact 152, cookies 146, impressum 156, privacy 151, terms 156 (all 50–160).
- Blog/article `og:image` files are landscape (~16:9); homepage/keyboards no longer use portrait `Werkbank_Hero.jpg` for OG.
- Live check: homepage 200 but still old chrome; `https://brotbeutel.github.io/j-keebs/images/og-preview.jpg` 404.

**Verified 2026-10-05 (planner, fresh clone of `c1ae790`):**
- `npm ci && npm run build` → Copied 54, Wrote 21 files, 0.3–20s depending on image cache. No errors.
- `python scripts/check_links.py _site` → pages 21, references 1195, errors 0.
- `python scripts/tag_balance.py _site` → pages 21, problems 0.
- `python scripts/img_report.py` → 95.0% size reduction, unchanged from the P2-E verification.
- Live re-check (see above): P2-E2 still not visible on `index.html`, `faq.html`, `keyboards.html`.
- `diff readme.md ai/README.md` → **2 stale lines in `ai/README.md`**: the `images/` comment doesn't mention the WebP pipeline, and the Node version says 18 instead of 22. Low priority, bundled into the next package's "Done when" (see `PLAN.md`).

**Still open:**
- R6: `src/pages/index.njk` — the German HTML default for the first gallery card is "Der Garagenfund" (line ~373), but the German dictionary's `gallery1.title` key says "Cherry G80-3000" (line ~138): a JS+DE visitor sees a different title than a no-JS visitor. Separately, `gallery2.li3value` is the literal placeholder "– ergänzen" (visible live on the "Holz-Case" card's "Switches" field). **Owner decision needed** — proposed default: set `gallery1.title` to match the HTML default ("Der Garagenfund") unless the keyboard should actually be labelled "Cherry G80-3000"; "– ergänzen" needs the real switch type.
- Contact form: live browser test (submit with JS on + JS off) still not done.
- Dual-theme brand logos: owner request not yet scoped.
- Gallery a11y: cheat-sheet toggle vs fullscreen both bind to the polaroid.
- Unused draft cards `images/card_v1.jpg` / `images/card_v2.jpg` (see BACKLOG).
- `scripts/generate_social_assets.js` needs `sharp`, which is not an npm dependency (it happens to resolve today because `@11ty/eleventy-img` pulls `sharp` in transitively — not a direct, guaranteed dependency).
- R10: `mechanicon_logo.png` confirmed unused (no reference anywhere in `src/`, `main.js`, `style.css`). Three files in `images/` have spaces/uppercase extensions and ARE referenced in `src/pages/keyboards.njk`: `Monsgeek M1.jpg`, `Keychron Q3_1.JPG`, `Keychron Q3_2.JPG` — renaming needs a matching template update, not just a file rename.

## In flight

- [x] P0 / P0-B / P0-C — done and deployed
- [x] P1 / P1-A / P1-B — done and deployed
- [x] P2-A — done and deployed
- [x] P2-B / P2-C — Eleventy migration, done and deployed
- [x] P2-D — fonts, logo, 404, PCBWay — done and deployed
- [x] P2-E — image pipeline — done and deployed (`1a9325f`)
- [x] **P2-E2 — icons and social previews** — in git (`fe9c140`); **not confirmed live**
- [ ] **P2-F1 — computed URLs, directory data, generated sitemap** ← queued (see `PLAN.md`)
- [ ] P2-F2 — i18n as data files, nav key naming
- [ ] P2-F3 — blog as a collection
- [ ] P2-remaining — a11y items
- [ ] Owner (optional): lawyer review of Art. 6 Abs. 1 lit. f DSGVO for auto-loading map

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
| Templates | `src/pages/*.njk` (21), `src/_includes/base.njk`, `src/_data/site.js` |
| Output | `_site/` (21 HTML + assets + `img/` WebP), gitignored |
| Build / CI | Eleventy 3.1.6, `@11ty/eleventy-img` 7.x, `.github/workflows/deploy.yml` (Node 22) |
| Hosting | GitHub Pages project site, base path `/j-keebs/` |
| CSS | `style.css` (root, passthrough) |
| JS | `main.js` (root, passthrough) |
| i18n | `J_KEEBS_I18N_COMMON` in `main.js` + per-page `J_KEEBS_I18N` in `page_script` front matter |
| Contact | FormSubmit (AJAX + no-JS fallback) |
| Map | OpenStreetMap iframe, auto-loading, desaturated until hover/focus |
| Fonts | Self-hosted woff2 in `fonts/` |
| Images | `images/` (originals, passthrough) + `_site/img/` (generated WebP, build-time). Social default: `images/og-preview.jpg`. Touch icon: `images/apple-touch-icon.png`. |
| Scripts | `scripts/check_links.py`, `scripts/tag_balance.py`, `scripts/img_report.py` (Python 3); `scripts/generate_social_assets.js` (needs `sharp`, not in `package.json`) |
