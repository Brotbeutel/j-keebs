# Status

- **Site:** J-Keebs, static GitHub Pages portfolio. Built with Eleventy 3 (Nunjucks templates) + vanilla CSS/JS.
- **Live:** https://brotbeutel.github.io/j-keebs/
- **Repo:** https://github.com/Brotbeutel/j-keebs
- **Owner:** Jannik Schlüter
- **Planner:** dedicated planning chat; implementers use a **new** chat per work package
- **Updated:** 2026-10-06 (implementation batch reconciliation)

## Snapshot

The site is **live and deployed** via GitHub Actions (`.github/workflows/deploy.yml`: `npm ci` → `npm run build` → upload `_site/` → GitHub Pages; no `paths-ignore`, so every push builds and deploys). The source commit is `66ff9e0` (`Reconcile README and project handoff`), which is also `origin/main`; the implementation batch is currently uncommitted.

**Owner live check (2026-10-06):** `https://brotbeutel.github.io/j-keebs/sitemap.xml` returned HTTP 200. The deployed homepage contains the expected `og:site_name`, `twitter:description`, `og:image`, canonical project URL, `/j-keebs/` asset paths, and `nav.contact`; the corrected PowerShell `Select-String` check confirmed all three social metadata tags.

**Everything through P2-E2 is in git. Live Pages was still pre-P2-E2 at this planner review (2026-10-05, fresh fetch of `index.html`, `faq.html` and `keyboards.html`): all three still have `og:image: Werkbank_Hero.jpg` and no `og:site_name` / `twitter:description` meta tags.** Since the workflow has no path filter, the push that landed `fe9c140` should already have deployed it — this review could not check the Actions run log (GitHub API rate-limited from the sandbox, no browser available). **Owner: open https://github.com/Brotbeutel/j-keebs/actions and confirm the latest run is green before re-checking** (`ai/CONVENTIONS.md` has the PowerShell commands). If it is green and the site is still old, it is a Pages cache delay — wait a few minutes and retry.

**P2-F1 is committed and pushed in `0211d43` (2026-10-06).** The local acceptance checks pass. The live deployment of P2-F1, and the earlier P2-E2 metadata changes, still need an owner check in GitHub Actions and on Pages; do not infer live state from the local build.

**P2-F2 is committed and pushed in `4cc9980` (2026-10-06).** Page-local dictionaries now live in 17 modules under `src/_data/i18n/` and are selected by `src/pages/pages.11tydata.js`; legal pages remain dictionary-free. The shared navigation key is `nav.contact` everywhere. Local verification: `npm run build` writes 21 HTML pages plus `sitemap.xml`; `python scripts/check_links.py _site` reports 1195 references and 0 errors; `python scripts/tag_balance.py _site` reports 0 problems; URL hygiene and `diff readme.md ai/README.md` pass. Live deployment remains unverified.

**P2-F3 is committed and pushed in `5237912` (2026-10-06).** The seven blog records now live in `src/_data/blog.js` in the existing display order. `blog.njk` renders the featured card and six teasers from that data, and the seven article pages use collection-derived previous/next values through `article-nav.njk`. Local verification: `npm run build` writes 21 HTML pages plus `sitemap.xml`; link/tag checks remain at 1195 references and 0 problems; the image report shows 94.2% reduction; the blog index preserves all seven URLs and order; article boundary navigation and no-stale-URL checks pass. Live deployment remains unverified.

**P2-remaining gallery control accessibility is committed and pushed in `e0a807f` (2026-10-06).** The cheat-sheet action is now activated only by its explicit `.cheat-toggle` button; the polaroid frame no longer has a competing click handler. Fullscreen remains bound to gallery images with click, Enter and Space activation, focus restoration, and carousel behavior unchanged. Verification: `node --check main.js`, `npm run build`, link/tag checks, image report, URL hygiene, README parity, and gallery-specific hook assertions pass. Live deployment remains unverified.

**P3 documentation and handoff honesty is committed and pushed in `66ff9e0` (2026-10-06).** `readme.md`, `README.md`, and `ai/README.md` describe the actual Eleventy data, i18n, blog-navigation, Node, image-pipeline, and language conventions. The later implementation batch is uncommitted; all handoff Markdown files are now normalized to LF and `git diff --check` passes.

**Implementation batch is complete locally (2026-10-06; uncommitted).** The index gallery now identifies Cherry G80-3000 and YMDK68, uses Kailh Box Jade for the YMDK68, and keeps “Der Garagenfund” for future blog content. The mobile contact map persists saturation for the active touch card and clears it on outside touch. The J80 article now distinguishes its historical failure from the current fully functional VIA state. CI now runs link/tag checks, `sharp` is a direct dev dependency, and all `ai/*.md` files use LF line endings. Local build, link, tag, and JavaScript checks pass.

**Done in source through P3 documentation (committed):**
- P0/P0-B/P0-C — URL fixes, English slugs, base path
- P1/P1-A/P1-B — contact form, brand assets, about page, OWA LABS, guide taxonomy
- P2-A — interaction/visual polish (map, fullscreen controls, homepage)
- P2-B/P2-C — Eleventy migration (21 pages on `base.njk`, GitHub Actions CI/CD)
- P2-D — self-hosted fonts, logo fix, 404 layout, PCBWay `rel=sponsored`
- P2-E — build-time image pipeline (WebP srcset/sizes, eager/lazy policy)
- P2-E2 — default 1200×630 `images/og-preview.jpg`, 180×180 `images/apple-touch-icon.png`, `og:site_name`, `twitter:description`, longer legal/contact meta descriptions (`fe9c140`)
- P2-F1 — computed URLs, directory data, generated sitemap (`0211d43`)
- P2-F2 — i18n data files and navigation key normalization (`4cc9980`)
- P2-F3 — blog data, index rendering, and computed article navigation (`5237912`)
- P2-remaining — separate gallery cheat-sheet and fullscreen controls (`e0a807f`)
- P3 — README and handoff honesty (`66ff9e0`)

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
- `diff readme.md ai/README.md` → 2 stale lines in `ai/README.md` (fixed in P2-F1, see below).

**P2-F1 verification (planner reconciliation, 2026-10-06, local; Node v22.22.2):**
- New `src/pages/pages.11tydata.js`: `layout: "base.njk"` + `eleventyComputed.og_url = site.url + page.url`. `layout`, `og_url`, `canonical` removed from all 21 pages (scripted, with asserts); the 8 `og_image` values are relative (`images/….jpg`), `base.njk` builds `site.url + "/" + (og_image or "images/og-preview.jpg")`.
- `index.njk` JSON-LD `url` → token `@@OG_URL@@` (replaced in `base.njk`; front-matter strings are not rendered by Nunjucks). `contact.njk` FormSubmit `_next` → `{{ og_url }}?sent=1`. Deviation from the `PLAN.md` wording (`{{ canonical }}`) and why: `DECISIONS.md` 2026-10-06.
- New `src/pages/sitemap.njk` (`layout: false`, `eleventyExcludeFromCollections: true`) generates `sitemap.xml` from `collections.all`, skipping `/404.html`. Root `sitemap.xml` deleted; its passthrough line removed from `eleventy.config.js`. `robots.txt` untouched.
- `ai/README.md` := `readme.md`, then both got the same two additions (structure tree, data-file note). `diff readme.md ai/README.md` → empty.
- `rm -rf _site && npm run build` → Copied 53, Wrote 22 files (21 HTML + `sitemap.xml`), no errors.
- `cmp` of every `_site/*.html` against a snapshot of the build made before any change → all 21 identical; `sitemap.xml` and `robots.txt` identical too (so canonical/og:url/og:image/twitter:image on all pages, incl. the 8 blog `og:image`, are unchanged).
- `python scripts/check_links.py _site` → pages 21, references 1195, errors 0 (baseline unchanged). `python scripts/tag_balance.py _site` → pages 21, problems 0.
- `grep -rn "https://brotbeutel.github.io/j-keebs" src/` → only `src/_data/site.js:3`. Unprefixed-URL grep over `_site` HTML/XML/TXT → empty. No `@@OG_URL@@` or `{{` left in `_site`.
- **Owner step:** `0211d43` is already on `origin/main`. Check the Actions run and the live `sitemap.xml`; live deployment is **not** verified.

**P2-F2 verification (planner reconciliation, 2026-10-06, local; commit `4cc9980`):**

- 17 page-local dictionaries are in `src/_data/i18n/`; legal pages remain dictionary-free; `base.njk` emits only the selected page dictionary.
- `nav.kontakt` has no remaining source definition or consumer; `nav.contact` is used in `src/_data/site.js`, `main.js`, and the shared dictionaries.
- `npm run build` writes 21 HTML pages plus `sitemap.xml`; `python scripts/check_links.py _site` reports 1195 references and 0 errors; `python scripts/tag_balance.py _site` reports 0 problems.
- `diff readme.md ai/README.md` is empty. Live deployment remains unverified.

**P2-F3 verification (planner reconciliation, 2026-10-06, local; commit `5237912`):**

- `src/_data/blog.js` contains the seven ordered article records; `src/pages/blog.njk` consumes them; `src/_includes/article-nav.njk` renders computed previous/next links for all seven article pages.
- `npm run build` writes 21 HTML pages plus `sitemap.xml`; link checks report 1195 references and 0 errors; tag balance reports 0 problems; `scripts/img_report.py` reports 94.2% reduction; `diff readme.md ai/README.md` is empty.
- Blog index URL/order and article navigation boundary assertions pass. Live deployment remains unverified.

**P2-remaining verification (planner reconciliation, 2026-10-06, local; commit `e0a807f`):**

- `.cheat-toggle` is the only cheat-sheet activation hook; the polaroid frame has no competing click handler. Gallery image fullscreen activation and focus restoration remain present.
- `node --check main.js`, `npm run build`, link/tag checks, image report (94.2% reduction), README parity, and gallery assertions pass. Live deployment remains unverified.

**Owner decisions (2026-10-06)**

- Index gallery: feature the Cherry G80-3000 and YMDK68.
- YMDK68 switches: `Kailh Box Jade`.
- `Der Garagenfund`: reserve for a future blog article, not the index gallery title.
- Separate light/dark logos: request cancelled; do not scope it.
- J80-3000 current state: fully functional and programmable with VIA; earlier failure text is historical and needs clearer framing in the blog.

**Planner reconciliation findings (2026-10-06)**

- **P3 / complete locally:** index gallery, mobile map, J80 historical wording, CI checks, direct `sharp`, and handoff line endings are updated; deployment and device verification remain pending.
- **P2 / verified live:** `src/_includes/base.njk`, page metadata, and `images/og-preview.jpg` are now confirmed on Pages by the owner; the deployed sitemap returned HTTP 200.
- **P3 / approved implementation:** `src/pages/index.njk` and `src/_data/i18n/index.js` still expose the old R6 title/region and `gallery2.li3value` placeholder; the next implementer may now correct them to the approved values.
- **P3 / content follow-up:** R7 is factually resolved; the future blog content pass should distinguish the earlier failure from the current working state.
- **P3 / owner decision:** `images/mechanicon_logo.png` is unused, while `images/Monsgeek M1.jpg`, `images/Keychron Q3_1.JPG`, and `images/Keychron Q3_2.JPG` are referenced by `src/pages/keyboards.njk`; no asset rename or deletion was attempted.
- **Mobile map interaction:** `main.js` and `style.css` now persist the map's saturated state while the latest touch is inside the contact card and clear it on outside touch. Local syntax, build, link, and tag checks pass; not deployed.

**Still open:**
- Mobile map and index-gallery implementation are complete locally; deploy and verify them on a real mobile device.
- Contact form: live browser test (submit with JS on + JS off) still not done.
- Mobile contact map: touch activation is implemented locally; deployment and a real-device check remain pending.
- Dual-theme brand logos: owner cancelled the request 2026-10-06; no separate assets are needed.
- Gallery a11y: cheat-sheet toggle vs fullscreen both bind to the polaroid.
- Unused draft cards `images/card_v1.jpg` / `images/card_v2.jpg` (see BACKLOG).
- `scripts/generate_social_assets.js` now has a direct `sharp` dev dependency; generator execution remains optional.
- R10: `mechanicon_logo.png` confirmed unused (no reference anywhere in `src/`, `main.js`, `style.css`). Three files in `images/` have spaces/uppercase extensions and ARE referenced in `src/pages/keyboards.njk`: `Monsgeek M1.jpg`, `Keychron Q3_1.JPG`, `Keychron Q3_2.JPG` — renaming needs a matching template update, not just a file rename.

## In flight

- [x] P0 / P0-B / P0-C — done and deployed
- [x] P1 / P1-A / P1-B — done and deployed
- [x] P2-A — done and deployed
- [x] P2-B / P2-C — Eleventy migration, done and deployed
- [x] P2-D — fonts, logo, 404, PCBWay — done and deployed
- [x] P2-E — image pipeline — done and deployed (`1a9325f`)
- [x] **P2-E2 — icons and social previews** — in git (`fe9c140`); **not confirmed live**
- [x] **P2-F1 — computed URLs, directory data, generated sitemap** — committed and pushed as `0211d43`; live not confirmed
- [x] **P2-F2 — i18n as data files, nav key naming** — committed and pushed as `4cc9980`; live not confirmed
- [x] **P2-F3 — blog as a collection** — committed and pushed as `5237912`; live not confirmed
- [x] **P2-remaining — gallery control accessibility** — committed and pushed as `e0a807f`; live not confirmed
- [x] **P3 — content / README honesty** — committed and pushed as `66ff9e0`; live not confirmed
- [x] **Owner gate — launch content and deployment decisions** — R6, switch type, future blog direction, and logo request resolved 2026-10-06
- [ ] **P3 — index gallery corrections** ← next
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
| Templates | `src/pages/*.njk` (21 pages + `sitemap.njk`), `src/pages/pages.11tydata.js` (layout, computed `og_url`), `src/_includes/base.njk`, `src/_data/site.js` |
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
