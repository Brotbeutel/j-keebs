# Conventions

## Editing HTML

- There is no shared layout. If you change nav, footer, font `<link>`s, or the theme boot script, change **every** page or you will create more drift. Prefer introducing a layout over editing 24 copies “just this once” if the change is structural.
- Keep German visible text in the HTML as the no-JS source. Keep matching keys in `window.J_KEEBS_I18N`.
- Shared UI strings live in `J_KEEBS_I18N_COMMON` (`main.js`). Do not duplicate footer/nav keys in the page dictionary unless the page must override them.
- `id="guidesSubmenu"` and `id="siteNav"` must stay unique **per document**.
- Legal pages stay German-only by design.

## CSS / JS

- Tokens live in `:root` and `[data-theme="light"]` in `style.css`. Do not hardcode one-off hex in new components if a token exists.
- Theme key: `localStorage["jkeebs-theme"]`. Language key: `localStorage["jkeebs-lang"]`.
- Default language in JS is currently `"en"`; HTML language attribute is `"en"` while body copy is German. Do not “fix” this casually — it is a product decision (see BACKLOG P1).
- Gallery logic expects `.polaroid-frame`, `[data-slide]`, `.carousel-dots`. Fullscreen expects `#fullscreenOverlay`.

## URLs

- After a rename, leave a redirect page (meta refresh + canonical) at the old filename. GitHub Pages has no real 301.
- Update `sitemap.xml` and every internal `href` in the same change.

## What not to do

- Do not add a framework unless the owner asks.
- Do not commit secrets, FormSubmit extras that leak email beyond what is already public, or large uncompressed photo dumps without asking.
- Do not claim accessibility or performance wins in README without a check.
- Do not expand the guides listing with more empty cards.
