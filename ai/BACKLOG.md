# Backlog

Check items when done. Move completed items into a short "Done" note at the bottom with the date. Do not delete context that a later agent still needs.

## P1 — structure (remaining)

- [ ] Extract header/footer/font/theme-boot into a layout (Eleventy or a small include script). The sun-icon drift (see Done) is a direct symptom of not having one — it's fixed now, but the underlying cause isn't.
- [x] Contact form: tested live, FormSubmit works. CORS/captcha was never actually a problem in practice.
- [x] Language default: English confirmed as the site's default (2026-09-03) — see `DECISIONS.md`. Visible copy stays German; that remainder is an accepted trade-off, not open work unless the owner later asks for a full English rewrite.

## P2 — performance and a11y

- [ ] Fullscreen image viewer: prev/next arrows and the close (×) button aren't centered. (Reported 2026-09-03, owner note.) — good candidate for the next small package.
- [ ] Drop unused Google Fonts (Libre Caslon Display, IBM Plex Mono are linked; CSS uses Libre Caslon Text + Courier Prime).
- [ ] Image `srcset` / WebP; homepage `og:image` (currently missing entirely on index.html).
- [ ] Theme boot: honour `prefers-color-scheme` when localStorage is empty. Align `:root` tokens with the default theme.
- [ ] Gallery: cheat-sheet toggle vs fullscreen both bind to the polaroid; images use `role="button"`. One control per action.
- [ ] Replace `data-i18n-html` innerHTML with safer interpolation if possible.
- [x] Light-mode sun icon missing its top-right ray on all 8 blog pages (blog.html + 7 blog-*.html). Fixed and pushed, see Done.

## P3 — content and hygiene

- [ ] Fill or remove incomplete gallery fields ("Switches: to add"). Align DE gallery title keys with HTML (Garagenfund vs Cherry G80-3000).
- [ ] Guides: most cards are `guide-card--pending`. Finish a few or hide the rest.
- [ ] Rewrite or unpublish blog text that is not original (homepage already warns).
- [ ] Tone down README claims that the code does not meet.
- [ ] Consider dropping AGB if nothing is sold; keep Impressum. Phone on the marketing contact page is optional; address belongs on Impressum.
- [ ] Add a link checker in CI later. Do not restore `main-original.js`.

## Done

- 2026-09-01 — Critical review captured in Cursor canvas `j-keebs-critical-review.canvas.tsx` (local IDE artifact, not in this repo).
- 2026-09-01 — `ai/` handoff folder added.
- 2026-09-01 — P0 URLs: J80 hrefs → English slug + stub; canonical/`og:url`/`_next` use English names; `sitemap.xml` lists canonical pages only.
- 2026-09-03 — Repo renamed `Brotbeutel.github.io` → `j-keebs`; site moved to `/j-keebs/` project-page path.
- 2026-09-03 — Language-default decision: English confirmed default; visible copy stays German (see `DECISIONS.md`).
- 2026-09-03 — Blog rename to English slugs approved (P0-C scoped).
- 2026-09-04 — **P0-B implemented, pushed, verified live**: canonical/og:url/og:image/twitter:image/JSON-LD/sitemap.xml/robots.txt/404.html/FormSubmit `_next` all correctly use `/j-keebs/`. `kontakt.html`/`ueber-uns.html`/`datenschutz.html`/`agb.html` confirmed to exist and be correct.
- 2026-09-04 — **P0-C implemented, pushed, verified live**: 5 blog files renamed, prev/next chain intact across all 7 posts, `blog.html`/`index.html`/sitemap updated, all 5 old-name stubs correct, `article-j80-3000-second-life.html` stub repointed.
- 2026-09-04 — **P1 contact form**: tested live by the owner, works. No code change needed.
- 2026-09-04 — **Sun-icon fix**: restored the missing top-right ray in the light-mode icon on `blog.html` + all 7 `blog-*.html` posts. Diff-verified: exactly one line changed per file. Pushed.
