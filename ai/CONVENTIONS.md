# Conventions

## Editing pages (Eleventy)

- **Source of truth:** `src/pages/*.njk`, `src/_includes/base.njk`, `src/_data/site.js`. `_site/` is generated and gitignored — never edit it. Build with `npm run build`, preview with `npm run dev` (served under `/j-keebs/`).
- **Shared chrome** (head, theme boot script, header, language/theme toggles, footer, fullscreen overlay) lives in `base.njk`; nav items live in `site.js`. Change it there, once. If a change seems to require touching many page files, stop and check whether it belongs in the layout or in data.
- **Front matter per page:** `layout`, `permalink` (must equal the public filename), `title`, `description`, `og_url`, `canonical`, `active_nav`; optional `og_image`, `extra_head`, `page_script`, `page_class`.
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
- Do not claim a live result without checking the deployed site after the push.

## Images

- Gallery and blog photos are 16:9, mostly 1920×1080 (owner, 2026-09-20). Set `width`/`height` from the **real file** anyway. Known non-16:9 files: `Werkbank_Hero.jpg` (526×1113), `J-Keebs-Logo.png` (1742×733), `Retro-PC_pixelart_generated.png` (64×64), `J-Keebs-Icon.ico`, `mechanicon_logo.png`.
- Above-the-fold image: eager; everything else `loading="lazy"` and `decoding="async"`.
- No large uncompressed photo dumps without asking. New photos: ≤ 1920 px wide.

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
- Never commit `node_modules/`, `_site/`, `.cursor/`, `content/` or secrets. (`node_modules/` and `.cursor/` are still tracked from earlier — see `BACKLOG.md` R2.)
- No new third-party requests (fonts, CDNs, embeds, analytics) without a privacy check and an update of the privacy/cookie pages by the owner.
- Do not claim accessibility or performance wins in the README without a check.
- Do not expand the guides listing with more empty cards.
- Do not restore `main-original.js`.
