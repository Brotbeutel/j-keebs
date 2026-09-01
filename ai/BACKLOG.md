# Backlog

Check items when done. Move completed P0/P1 into a short “Done” note at the bottom with the date. Do not delete context that a later agent still needs.

## P0 — user-visible breakage

Implementer spec: `PLAN.md` → Current work package. Do not start P1 in the same chat.

- [x] Homepage CTA and featured blog card: `article-j80-3000-second-life.html` does not exist. Target is `blog-j80-3000-zweites-leben.html` (`index.html` ~L218, `blog.html` ~L92).
- [x] Four duplicate pairs still both live:
  - `contact.html` / `kontakt.html`
  - `about.html` / `ueber-uns.html` (canonical on `about.html` still `ueber-uns.html`)
  - `privacy.html` / `datenschutz.html` (canonical on `privacy.html` still `datenschutz.html`)
  - `terms.html` / `agb.html`
- [x] `sitemap.xml` lists old German filenames and omits `about.html`, `contact.html`, `privacy.html`, `terms.html`.

## P1 — structure

- [ ] Extract header/footer/font/theme-boot into a layout (Eleventy or a small include script). Nav already drifted (`blog.html` sun-icon SVG vs `index.html`).
- [ ] Contact form: `_captcha` is `false`; JS `fetch` to FormSubmit may fail CORS. Prefer working no-JS POST. (`_next` now points at `contact.html?sent=1`; captcha/CORS still open.)
- [ ] Pick a language story: either `lang="de"` matching the HTML, or real `/de/` `/en/` URLs. Client-only i18n is invisible to crawlers and no-JS users.

## P2 — performance and a11y

- [ ] Drop unused Google Fonts (Libre Caslon Display, IBM Plex Mono are linked; CSS uses Libre Caslon Text + Courier Prime).
- [ ] Image `srcset` / WebP; homepage `og:image`.
- [ ] Theme boot: honour `prefers-color-scheme` when localStorage is empty. Align `:root` tokens with the default theme.
- [ ] Gallery: cheat-sheet toggle vs fullscreen both bind to the polaroid; images use `role="button"`. One control per action.
- [ ] Replace `data-i18n-html` innerHTML with safer interpolation if possible.

## P3 — content and hygiene

- [ ] Fill or remove incomplete gallery fields (“Switches: to add”). Align DE gallery title keys with HTML (Garagenfund vs Cherry G80-3000).
- [ ] Guides: most cards are `guide-card--pending`. Finish a few or hide the rest.
- [ ] Rewrite or unpublish blog text that is not original (homepage already warns).
- [ ] Tone down README claims that the code does not meet.
- [ ] Consider dropping AGB if nothing is sold; keep Impressum. Phone on the marketing contact page is optional; address belongs on Impressum.
- [ ] Add a link checker in CI later. Do not restore `main-original.js`.

## Done

- 2026-09-01 — Critical review captured in Cursor canvas `j-keebs-critical-review.canvas.tsx` (local IDE artifact, not in this repo).
- 2026-09-01 — `ai/` handoff folder added.
- 2026-09-01 — P0 URLs: J80 hrefs → `blog-j80-3000-zweites-leben.html` + stub; German filenames are redirect stubs; canonical/`og:url`/`_next` use English names; `sitemap.xml` lists canonical pages only (stubs omitted).
