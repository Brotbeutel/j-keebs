# Conventions

## Editing pages (Eleventy)

- **Source of truth:** `src/pages/*.njk`, `src/_includes/base.njk`, `src/_data/site.js`. `_site/` is generated and gitignored — never edit it. Build with `npm run build`, preview with `npm run dev` (served under `/j-keebs/`).
- **Shared chrome** (head, theme boot script, header, language/theme toggles, footer, fullscreen overlay) lives in `base.njk`; nav items live in `site.js`. Change it there, once. If a change seems to require touching many page files, stop and check whether it belongs in the layout or in data.
- **Front matter per page:** `layout`, `permalink` (must equal the public filename), `title`, `description`, `og_url`, `canonical`, `active_nav`; optional `og_image`, `extra_head`, `page_script`, `page_class`, `root_paths`.
- **Relative URLs and depth:** chrome and page URLs are relative (`index.html`, `images/…`, `./style.css`), which only works for pages served at their own filename. `404.html` is the one page GitHub Pages serves at any depth (`/j-keebs/foo/bar`): it sets `root_paths: true`, and `base.njk` then prefixes every chrome URL with `site.basePath`. **Do not use a `<base>` element** (it must precede URL-bearing elements and turns `#main` into a link to the homepage). Other pages must not set `root_paths`.
- The page dictionary `window.J_KEEBS_I18N` goes into `page_script`. Shared UI strings live in `J_KEEBS_I18N_COMMON` (`main.js`); do not duplicate footer/nav keys in a page dictionary unless the page must override them.
- Keep German visible text in the template as the no-JS source. Keep matching keys in the dictionary.
- **German is the source of truth.** If DE and EN differ, DE is right (owner, 2026-09-20); fix EN, not DE. If the German HTML default and the German dictionary differ, ask the owner which wording is final.
- `id="guidesSubmenu"` and `id="siteNav"` must stay unique per document.
- Legal pages stay German-only by design.
- Do not recreate the old copy/paste pattern inside templates: repeated values belong in data files (see P2-F in `BACKLOG.md`).
- Bulk changes across many templates: script with `assert` guards, then diff.

## Verification (before you say "done")

- `npm run build` must finish without errors (21 pages).
- Unprefixed absolute URLs: `grep -rn "brotbeutel.github.io/" _site --include="*.html" --include="*.xml" --include="*.txt" | grep -v "brotbeutel.github.io/j-keebs"` must be empty.
- Broken internal links / assets: check every `href`/`src` in `_site/*.html` against `_site/` (URL-decode `%20`), and every `#anchor` against the target page's IDs.
- Scripts (Python 3, standard library only): `python scripts/check_links.py _site` checks every `href`/`src`/`srcset`, URL-decoded, against `_site/`, every `#anchor` against the target page's IDs, CSS `url()` references, and re-resolves `404.html` at deep paths; `python scripts/tag_balance.py _site` reports unbalanced tags. Both must report no problems. `python scripts/img_report.py` prints a before/after bytes-per-page table for the image pipeline (static file-size approximation, not a network trace — see its docstring).
- Do not claim a live result without checking the deployed site after the push.

## Commands for the owner

The owner works in **Windows PowerShell**. Every owner step and every check the owner is supposed to run must be given as a PowerShell command. No `curl` (in PowerShell it is an alias of `Invoke-WebRequest` and behaves differently; use `Invoke-WebRequest` or `Select-String`, or a browser). No `grep`, `wc`, `head`, `&&`. Typical equivalents:

| Task | PowerShell |
| --- | --- |
| Search text in built pages | `Select-String -Path _site\*.html -Pattern 'text' -SimpleMatch` |
| Count matches | `(Select-String -Path _site\*.html -Pattern 'text' -SimpleMatch).Count` |
| Size of a folder | `"{0:N1} MB" -f ((Get-ChildItem _site\img -File -Recurse \| Measure-Object Length -Sum).Sum / 1MB)` |
| Largest files | `Get-ChildItem _site\img -File \| Sort-Object Length -Descending \| Select-Object -First 5 Name, Length` |
| Files tracked by git | `(git ls-files node_modules).Count` |
| Chain commands | separate lines, or `;` (not `&&`) |

Implementers may use their own (bash) tooling for their own checks, but the handoff must give the owner the PowerShell version.

## Images

- Gallery and blog photos are 16:9, mostly 1920×1080 (owner, 2026-09-20). Known non-16:9 files: `Werkbank_Hero.jpg` (526×1113), `J-Keebs-Logo.png` (1742×733), `Retro-PC_pixelart_generated.png` (64×64), `J-Keebs-Icon.ico`, `mechanicon_logo.png`.
- No large uncompressed photo dumps without asking. New photos: ≤ 1920 px wide.
- **Requires Node ≥ 22** (`@11ty/eleventy-img`'s requirement; `node -v` to check).

### Build-time image pipeline (P2-E, since 2026-09-23)

Every `<img src="images/….jpg|.jpeg|.png">` in `src/pages/*.njk` / `src/_includes/base.njk` is rewritten at build time by the `imagePipeline` transform in `eleventy.config.js` — **write plain HTML in templates, nothing else to do:**

```html
<img src="images/My-New-Photo.jpg" alt="…" title="…">
```

The transform (not the ready-made `eleventyImageTransformPlugin` — it can't resolve `images/…` at the repo root; not a Nunjucks shortcode either, to keep templates plain HTML) generates WebP with `@11ty/eleventy-img`, writes them to `_site/img/` (hashed filenames, never committed), and replaces the tag's `src`/`width`/`height` with a `srcset`, a `sizes`, and a `data-full` attribute (widest candidate, used by `main.js` for a sharp fullscreen image). Every other attribute (`class`, `alt`, `title`, `data-slide`, `data-i18n-attr`, …) is kept as-is.

- **Widths:** photos 640/1280/1920px; the three logos (`J-Keebs-Logo.png`, `OWA_Labs_Logo.png`, `PCBWay_Logo.png`) 240/480px. Never enlarged — eleventy-img drops any requested width above the source's real width.
- **Quality:** WebP q78 (logos q75 — `OWA_Labs_Logo.png`'s 480px file was ~1KB over the 25KB cap at q78; a few quality points cost nothing and are invisible on flat logo art. Do **not** reach for `effort: 6` for this kind of saving — it costs ~4.6s *per file*, not milliseconds).
- **Excluded** (untouched, no `data-no-optimize` needed): `Retro-PC_pixelart_generated.png`, `mechanicon_logo.png`. To exclude any other single image, add `data-no-optimize` to its `<img>` tag (stripped from the output, tag left otherwise unchanged).
- **`sizes`:** looked up by usage context in `eleventy.config.js`'s `SIZES_BY_CONTEXT` (gallery / single-polaroid / blog-featured / blog-teaser / partner-logo / header-logo / footer-logo / the one-off `Werkbank_Hero.jpg` hero). Context is detected from the `<img>`'s own attributes (`data-slide`, `class`) where possible, otherwise from the nearest preceding `<figure class="…">` in the rendered HTML. **A new reusable image component needs a new context**: add its class to `detectContext()` and a matching entry to `SIZES_BY_CONTEXT` — don't let it fall through to the `"100vw"` default. The current values were computed from `style.css` at 375/768/1280/1920px (no browser available in the sandbox that built P2-E); see `ai/STATUS.md` for the derivation and get a real DevTools measurement before trusting them for a very different layout.
- **Loading policy:** the transform picks it automatically — the first non-logo processed `<img>` in a page's rendered document order gets `loading="eager" fetchpriority="high"`, every later one `loading="lazy" decoding="async"`. Logos are excluded from this and keep whatever the template already says (header logo: no attribute = implicit eager; footer/partner logos: `loading="lazy"`). So: **don't hand-set `loading`/`fetchpriority` on a processed `<img>`** — reordering content on the page changes which image "wins" automatically. If a page ever needs a *different* image to be the eager one than "the first one in the HTML", reorder the markup rather than fighting the transform.
- `images/` itself stays a passthrough copy (`eleventy.config.js`) — old absolute URLs (`og:image`, external hotlinks) keep working unchanged.

## Fonts

- Fonts are **self-hosted**: woff2 files and their OFL licence texts in `fonts/` (provenance in `fonts/README.md`), `@font-face` blocks with `font-display: swap` at the top of `style.css`, copied to `_site/fonts/` by `eleventy.config.js`. Families: Libre Caslon Text (400, 400 italic, 700), IBM Plex Sans (400–700), Courier Prime (400, 700), Playwrite DE Grund (variable, 100–400).
- Keep the `--font-*` tokens and their fallback stacks. To add a weight: add the woff2 (Latin subset) to `fonts/`, add an `@font-face`, keep the licence file next to it.
- Never link Google Fonts or any other font CDN (see "What not to do").

## CSS / JS

- Tokens live in `:root` (dark set) and `[data-theme="light"]` in `style.css`. Do not hardcode one-off hex in new components if a token exists.
- Theme key: `localStorage["jkeebs-theme"]`. Language key: `localStorage["jkeebs-lang"]`.
- Default language in JS is `"en"`; `<html lang="en">` matches it. This is a **confirmed, intentional decision (2026-09-03)**. The visible body copy stays German. Do not translate page copy without an explicit go-ahead and do not "fix" the `lang`/copy mismatch by changing `lang`.
- Gallery logic expects `.polaroid-frame`, `[data-slide]`, `.carousel-dots`. Fullscreen expects `#fullscreenOverlay`.

## URLs

- The site is a GitHub Pages **project page** at `https://brotbeutel.github.io/j-keebs/`. Every absolute URL (`canonical`, `og:url`, `og:image`, `twitter:image`, JSON-LD `url`, `sitemap.xml`, `robots.txt`, FormSubmit `_next`) must include `/j-keebs/`.
- Renaming a page = new `permalink`. The owner deleted all redirect stubs (2026-09-11): old URLs 404. If a redirect is wanted, add a redirect template (see `PLAN.md`) and say so explicitly.
- Update `sitemap.xml` and every internal `href` in the same change.

## What not to do

- No Astro, React or other framework. Eleventy is the approved and installed generator.
- Never commit `node_modules/`, `_site/`, `.cursor/`, `content/` or secrets (all listed in `.gitignore`; `node_modules/` and `.cursor/` were untracked in P2-D).
- No new third-party requests (fonts, CDNs, embeds, analytics) without a privacy check and an update of the privacy/cookie pages by the owner. Fonts in particular are served from this site only.
- Do not claim accessibility or performance wins in the README without a check.
- Do not expand the guides listing with more empty cards.
- Do not restore `main-original.js`.
- Do not add a `<base>` element (see "Editing pages", relative URLs and depth).
