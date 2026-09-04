# Conventions

## Editing HTML

- There is no shared layout. If you change nav, footer, font `<link>`s, or the theme boot script, change **every** page or you will create more drift. Prefer introducing a layout over editing 24 copies "just this once" if the change is structural.
- Keep German visible text in the HTML as the no-JS source. Keep matching keys in `window.J_KEEBS_I18N`.
- Shared UI strings live in `J_KEEBS_I18N_COMMON` (`main.js`). Do not duplicate footer/nav keys in the page dictionary unless the page must override them.
- `id="guidesSubmenu"` and `id="siteNav"` must stay unique **per document**.
- Legal pages stay German-only by design.

## CSS / JS

- Tokens live in `:root` and `[data-theme="light"]` in `style.css`. Do not hardcode one-off hex in new components if a token exists.
- Theme key: `localStorage["jkeebs-theme"]`. Language key: `localStorage["jkeebs-lang"]`.
- Default language in JS is `"en"`; `<html lang="en">` matches it. This is now a **confirmed, intentional decision (2026-09-03)** — English is the site's default language, not a bug. The visible body copy in the raw HTML stays German for now; that is a separate, still-open content decision. Do not translate page copy to English without an explicit go-ahead, and do not "fix" the `lang`/copy mismatch by changing the `lang` attribute back — it's correct as-is.
- Gallery logic expects `.polaroid-frame`, `[data-slide]`, `.carousel-dots`. Fullscreen expects `#fullscreenOverlay`.

## URLs

- The site is a GitHub Pages **project page** hosted at `https://brotbeutel.github.io/j-keebs/` — not a user-page root site. Every absolute URL (`canonical`, `og:url`, `og:image`, `twitter:image`, JSON-LD `url`, `sitemap.xml`, `robots.txt`, FormSubmit `_next`) must include the `/j-keebs/` segment. Never write a bare `https://brotbeutel.github.io/...` URL without it.
- After a rename, leave a redirect page (meta refresh + canonical) at the old filename. GitHub Pages has no real 301.
- Update `sitemap.xml` and every internal `href` in the same change.

## What not to do

- Do not add a framework unless the owner asks.
- Do not commit secrets, FormSubmit extras that leak email beyond what is already public, or large uncompressed photo dumps without asking.
- Do not claim accessibility or performance wins in README without a check.
- Do not expand the guides listing with more empty cards.
