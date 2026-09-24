# Status

- **Site:** J-Keebs, static GitHub Pages portfolio. Built with Eleventy 3 (Nunjucks templates) + vanilla CSS/JS.
- **Live:** https://brotbeutel.github.io/j-keebs/
- **Repo:** https://github.com/Brotbeutel/j-keebs
- **Owner:** Jannik Schlüter
- **Planner:** dedicated planning chat; implementers use a **new** chat per work package
- **Updated:** 2026-09-23 (implementer: P2-E built in the sandbox, delivered as a file list — see below; not yet copied into the repo or deployed)

## Snapshot

The site is **live** and deployed automatically: `.github/workflows/deploy.yml` runs `npm ci` → `npm run build` → uploads `_site/` → GitHub Pages. P0 through P2-D are done and deployed. The source of truth is `src/pages/*.njk` (21 pages), `src/_includes/base.njk` (all shared chrome) and `src/_data/site.js` (nav). The root files `main.js`, `style.css`, `robots.txt`, `sitemap.xml`, `images/` and `fonts/` are passthrough-copied into `_site/`.

**Review 2026-09-20 (file-level, from a fresh clone + local build):**
- `npm run build` writes 21 pages + 35 assets in ~0.3 s, no errors.
- No broken internal links, anchors or image references; no duplicate IDs; every `<img>` has `alt`; every page has exactly one `<h1>`.
- `sitemap.xml` lists exactly the 20 canonical pages (all pages except `404.html`); canonicals match.
- DE/EN dictionaries have full key parity (1146 entries, 0 missing keys). Two content drifts found (see BACKLOG R6, R7).

**Planner re-check 2026-09-21 (fresh clone of `2749621`, `npm ci`, `npm run build`):** 21 pages, 50 assets copied, no error. `python scripts/check_links.py` → 21 pages, 969 references, 0 errors. P2-D confirmed at file level: no Google font reference in `_site` or `style.css`, 10 woff2 files in `_site/fonts`, logo attributes `1742×733` (header + footer), `404.html` uses root-absolute chrome URLs and no `<base>`, both PCBWay links carry `rel="noopener noreferrer sponsored"`, 0 files tracked under `node_modules/` and `.cursor/` (`.git` is still ~103 MB because history keeps the old blobs; not worth rewriting).

**Known problems (details, severity and verify commands: `BACKLOG.md` → "Review 2026-09-20"):**
- ~~Image weight: 47 MB in `images/`, `keyboards.html` loads ~20 MB eagerly, logo PNG is 557 KB on every page (R3).~~ Fixed by P2-E (see below) — pending owner copy-in + deploy.
- ~~`Werkbank_Hero.jpg` has `width="526" height="1052"` in `index.njk`, the file is 526×1113 (rest of R4; the logo part is fixed in P2-D).~~ Fixed by P2-E.
- ~~Remaining `width`/`height` attribute mismatches: `Werkbank_Hero.jpg` 526×1052 (file 526×1113), `G80-3000.jpg` 2000×1126 on the homepage (file 1920×1080), `Monsgeek M1.jpg` and `Monsgeek_M1_V5_EVA.jpg` on `keyboards.html`, `TOFU65_Mixed_Keycaps.jpg` 1920×1080 (file 1600×900), the J80 blog image 1920×1080 (file 3746×2107); solved by the pipeline in P2-E.~~ Fixed by P2-E — every processed `<img>` now gets `width`/`height` from the actual generated file, never the hand-typed value.
- Homepage gallery DE dictionary contradicts the German HTML default; a placeholder "– ergänzen" is visible live (R6). **Still waiting for the owner's decision** which German title is final.
- Repo hygiene: a stray curl cookie file `i` in the repo root and a byte-identical `ai/AGENTS.md` next to the root `AGENTS.md` (BACKLOG, unrelated to P2-E, not touched).

**P2-E (implemented 2026-09-23, sandbox only — not in `main` yet):** Build-time image pipeline. Every `<img src="images/….jpg|.png">` across all 21 pages (base.njk logos included) is rewritten at build time to WebP `srcset`/`sizes`/`width`/`height` + a `data-full` attribute; **templates are untouched** — they still write plain `<img src="images/…">` HTML, see `ai/CONVENTIONS.md` "Images" for the full spec.

*Approach chosen (PLAN.md option b, not (a) or the ready-made plugin) and why:* a custom Eleventy `addTransform` in `eleventy.config.js` that rewrites `<img>` tags in the already-rendered HTML, rather than a Nunjucks shortcode. This means none of the ~47 `<img>` tags across 14 template files had to be touched (`git diff` on `src/**/*.njk` is empty), new images need no special syntax (`<img src="images/x.jpg">` is enough), and the header/footer logo — which lives once in `base.njk` but renders on all 21 pages — is handled by the same single code path instead of needing a second mechanism. The ready-made `eleventyImageTransformPlugin` wasn't used because it expects the shortcode-call flow, not `src="images/…"` literals at the repo root.

*Numbers (measured on this build, `python scripts/img_report.py`):*

| | before | after (src, "typical" 1 file/img) | after (worst case, every srcset candidate) |
| --- | --- | --- | --- |
| **Total, 21 pages summed** | 87.8 MB | 4.4 MB | 13.7 MB |
| index.html | 11.9 MB | 719 KB | 2.0 MB |
| keyboards.html | 33.0 MB | 1.9 MB | 5.9 MB |
| blog.html | 12.8 MB | 792 KB | 2.5 MB |

95.0% reduction on the "after (src)" column (the closest static analogue to a single real page load; a real browser picks exactly one `srcset` candidate per `<img>`, so real transfer sits between the two "after" columns, generally much closer to the left one — see the script's docstring). `_site/img/`: 78 files, 7.2 MB total, largest file 383 KB, every logo file ≤ 24.8 KB (caps: 10 MB / 400 KB / 25 KB — all met). Cold build (`.cache/`-equivalent absent) ~15–18 s; if `_site/img/` already has last build's output (e.g. local `npm run dev`), a rebuild is ~1.2 s. No `.cache/` directory is actually created — `@11ty/eleventy-img`'s disk cache is for *remote* fetches; local files are cached by "does the hashed output file already exist", i.e. by `_site/img/` itself. Since CI always starts from a clean checkout, **every CI build takes the ~15–18 s cold path** — comfortably under the 90 s threshold in `PLAN.md`, so no `actions/cache` step was added to `deploy.yml`. `.cache/` was still added to `.gitignore` defensively.

*`sizes` values (PLAN.md "In scope" #3) — computed analytically from `style.css` (`min()`/`clamp()`/grid-track math) at 375/768/1280/1920px, since **no browser is available in the implementer sandbox** (the container's network allowlist has no browser-binary host, so Playwright/Puppeteer can't be installed). Live in `SIZES_BY_CONTEXT` in `eleventy.config.js`:*

| Context | `sizes` | ≈375px | ≈768px | ≈1280–1920px |
| --- | --- | --- | --- | --- |
| gallery (`.polaroid-frame__viewport`) | `(max-width:480px) 90vw, (max-width:768px) 500px, 350px` | 335px | 502–520px | 348px (capped once `.section__inner` hits `--max:1180px`, i.e. ≥ ~1244px viewport) |
| single-polaroid (homepage §2, about hero, blog articles) | `(max-width:480px) 90vw, (max-width:980px) 520px, 510px` | 335px | 520px | 513px |
| blog-featured (`blog.html` lead card) | `(max-width:768px) 90vw, 620px` | 343px | ~706px | 619px |
| blog-teaser (`blog.html` grid cards) | `(max-width:640px) 90vw, (max-width:1024px) 45vw, 380px` | 343px | ~344px | 380px |
| partner logo | `200px` (fixed — `.partner-card__logo{max-width:200px}` always wins) | | | |
| header logo (`.brand__logo`) | `107px` (fixed — `height:2.8rem`, `width:auto`, real ratio 2.377) | | | |
| footer logo (`.footer-logo`) | `176px` (fixed — `width:min(11rem,100%)`) | | | |
| `Werkbank_Hero.jpg` (one-off homepage hero) | `(max-width:480px) 90vw, 526px` | 335px | 526px | 526px |

**Please spot-check gallery and single-polaroid with real DevTools** (`PLAN.md` "Done when" already asks for this) and flag it to the next planner session if a value is meaningfully off — they're a single line each to adjust.

*Eager/lazy policy:* implemented as one generic rule instead of per-page special-casing — **the first non-logo processed `<img>` in a page's rendered document order gets `loading="eager" fetchpriority="high"`; every later one gets `loading="lazy" decoding="async"`.** Logos are excluded from this competition and keep the template's existing behaviour (header logo: no `loading` attribute at all = implicit eager, unchanged; footer/partner logos: `loading="lazy"`, unchanged). This rule reproduces every case correctly without hardcoding filenames: `Werkbank_Hero.jpg` wins on `index.html` (it's above the gallery sections in the markup), the first gallery card's first slide wins on `keyboards.html` (fixing "first slide of all 11 cards is eager" → now only 1 of ~26 gallery `<img>`s is eager), the featured post wins on `blog.html`, the sole photo wins on `about.html` and each blog article (this also fixes `about.html`, which was `loading="lazy"` on its only, above-the-fold image before P2-E). `partner.html` ends up with **zero** eager pipeline images, because both its images are logos — a deliberate reading of "exactly one eager image per page", since neither logo is a plausible LCP candidate; documented here rather than silently deviating from the literal spec wording.

*Other decisions:* WebP quality 78 for photos; **75 for the 3 logos** (at 78, `OWA_Labs_Logo.png`'s 480px file was ~25.9 KB, over the 25 KB cap — `effort:6` was tried first and technically fixed it too, but costs **~4.6 s per file** vs ~80 ms at default effort, i.e. ~28 s added to every cold build for ~1.3 KB saved on one rarely-loaded, high-DPR-only file; dropping quality 3 points instead is free and invisible on flat logo art). `data-no-optimize` opt-out attribute implemented but unused so far (no current image needs it). `main.js` changed on exactly one line: the fullscreen viewer now reads `active.dataset.full` (the widest generated candidate) instead of `active.src` (now the mid-size file). `style.css` is untouched (`git diff --stat style.css` is empty) and no `<picture>` element exists anywhere in the output.

*Verification run (this session, fresh `_site`):* `npm run build` → 21 pages, no errors. `python scripts/check_links.py _site` → 1195 references, 0 errors (covers every `srcset` candidate). `python scripts/tag_balance.py _site` → 0 problems. `grep -rn "brotbeutel.github.io/" _site … | grep -v "brotbeutel.github.io/j-keebs"` → empty. A dedicated pass over every processed `<img>` confirmed: `srcset`/`sizes`/`width`/`height` present on all of them, no `srcset` candidate wider than 1920px, and exactly one `loading="eager" fetchpriority="high"` per page that has a content photo (zero on pages with none). Not independently re-checked: the owner's live-browser "Done when" items (Network tab bytes at each breakpoint/DPR, visual sharpness/no-jank, Lighthouse-style LCP eyeballing) — those need a real browser, which this sandbox does not have.
**P2-D (done 2026-09-21, commit `38efe4f`):** R1 fonts self-hosted in `fonts/` (no Google request from any page), R2 `node_modules/` and `.cursor/` untracked (0 files tracked on `origin/main`), R4 logo part (`height="733"` in `base.njk`, header + footer), R5 404 without `<base>` (`root_paths: true` → root-absolute chrome URLs; works at `/j-keebs/foo/bar`), R8 PCBWay logo link `target="_blank" rel="noopener noreferrer sponsored"`. Implementer checks were file-level (build, `_site` diff, link/anchor check, dev-server 404 at a deep path, font embedding via a WeasyPrint render); the owner then ran the browser and live checks from `PLAN.md` "Done when" and reported all positive. The implementer did not independently re-check the live site (GitHub API rate-limited, `web_fetch` does not show `<head>`); `origin/main` was compared byte for byte with the delivered files.

**Redirect stubs:** deleted by the owner (2026-09-11): `kontakt.html`, `ueber-uns.html`, `datenschutz.html`, `agb.html`, the five old German blog slugs and `article-j80-3000-second-life.html`. Old inbound links 404. This is an accepted owner decision unless explicitly reversed.

## In flight

- [x] P0 / P0-B / P0-C — done and deployed
- [x] P1 / P1-A / P1-B — done and deployed (live browser test of contact form, JS on + JS off, still outstanding)
- [x] P2-A — polish, done and deployed
- [x] P2-B / P2-C — Eleventy migration, done and deployed (2026-09-18/19)
- [x] P2-D — repo hygiene, self-hosted fonts, base-layout fixes — done and deployed (`38efe4f`, owner-checked 2026-09-21)
- [ ] **P2-E — image pipeline** — implemented in the sandbox 2026-09-23, not yet copied into the repo/deployed (see "Known problems" → P2-E above for the full report)
- [ ] P2-E2 — icons and social previews (BACKLOG R9)
- [ ] P2-F — Eleventy data model (computed URLs, i18n data, blog collection, generated sitemap)
- [ ] P2-remaining — a11y items
- [ ] Owner (optional): lawyer review of Art. 6 Abs. 1 lit. f DSGVO for the auto-loading map

## Do not assume

- **Build is required.** Edit `src/`, never `_site/` (generated, gitignored). CI uses Node 22. **Local Node must be ≥ 22 too** since P2-E (`@11ty/eleventy-img`'s hard requirement; `npm run build` fails on older Node with a clear engine error).
- **Fonts are self-hosted** (`fonts/` → `_site/fonts/`, `@font-face` in `style.css`, provenance in `fonts/README.md`). Never add Google Fonts or another font CDN back; a new weight = new woff2 + `@font-face`.
- **The 404 page uses `root_paths: true`** (root-absolute chrome URLs from `site.basePath`), not `<base>`. Do not reintroduce `<base>` (it turns the skip link `#main` into a link to the homepage).
- **`node_modules/` and `.cursor/` are no longer tracked** (removed in `38efe4f`; `.gitignore` covers both). CI runs `npm ci`. Locally run `npm ci` after a fresh clone before `npm run build`.
- **German is the source of truth.** If DE and EN differ, DE is right (owner, 2026-09-20).
- **Photos are 16:9**, 21 of 31 files in `images/` are exactly 1920×1080. Exceptions: `Werkbank_Hero.jpg` (526×1113 portrait), `J-Keebs-Logo.png` (1742×733), `Retro-PC_pixelart_generated.png` (64×64), `J-Keebs-Icon.ico`, `mechanicon_logo.png` (unused). Larger 16:9: `J80-3000_open_with_printed_plate.jpg` (3746×2107, 7.8 MB); smaller: `TOFU65_Mixed_Keycaps.jpg` (1600×900), `Stars75.jpg` (1753×986).
- **Since P2-E, `images/` originals are never served directly by a processed `<img>`** — the build derives resized WebP into `_site/img/` (gitignored, hashed filenames). `images/` itself stays passthrough-copied (unchanged URLs for anything that hotlinks the original, `og:image` etc.). See `ai/CONVENTIONS.md` "Images" before touching any `<img>`-related code.
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
| Images | `images/` (root, passthrough, originals) + `_site/img/` (generated WebP, gitignored, built by the `imagePipeline` transform — implemented P2-E, sandbox-only until copied into the repo) |
| Scripts | `scripts/check_links.py [dir]` (links, anchors, assets, srcset, 404 at depth), `scripts/tag_balance.py <dir>` (tag balance), `scripts/img_report.py` (before/after image bytes per page); Python 3 |

## Target architecture

| Piece | Direction |
| --- | --- |
| Generator | Eleventy; next: use it for data (computed canonical/og URLs, i18n data files, blog collection, sitemap) |
| Images | Build-time resize/WebP/srcset (`@11ty/eleventy-img` 7.x, needs Node ≥ 22) — **implemented in P2-E** (sandbox, 2026-09-23; not yet in `main`); icons and social images still open — P2-E2 |
| Fonts | Self-hosted woff2, no third-party font requests — done in P2-D |
| Later option | Static DE/EN output instead of client-side-only i18n (decision needed, see `DECISIONS.md` 2026-09-01 "revisit with SSG"); Astro only if richer islands are needed |
