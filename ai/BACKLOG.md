# Backlog

Check items when done. Move completed items into a short "Done" note at the bottom with the date. Do not delete context that a later agent still needs.

## Proposed: G80-Plate content (blog + guide)

Source text supplied by the owner in chat (2026-09-04) — re-attach it when this becomes a real work package, chat history doesn't carry over automatically (see AGENTS.md).

**Blog post** (`blog-g80-plate.html`, proposed slug) — closer to ready:
- [ ] PCBWay barter disclosure: same treatment as the existing partner.html card — visible "Werbung" badge + `rel="sponsored"` on the PCBWay link. Not ambiguous, the source text confirms the same barter arrangement and literally ends with `[Werbung]`.
- [ ] No hero photo supplied — default: reuse an existing G80/J80-3000 photo as a placeholder, flag for a real progress photo later.
- [ ] Needs an EN i18n translation like every other post (visible German source text unaffected).
- [ ] Extends the prev/next chain to an 8th post; update blog.html teaser grid and sitemap.xml.
- [ ] Reads as a "part 1" update (order not yet delivered) — keep it framed that way, not as a finished build log.

**Guide** — not implementer-ready yet, needs decisions first:
- [ ] References download files that don't exist (`[SVG für CNC-Fertigung]`, `[STL für 3D-Druck]`) — need the real files or an explicit "folgt" placeholder.
- [ ] Cross-links two other guides: "G80-3000 Hot-Swap-Mod" (already a pending card in guides.html, could link to a "folgt" state) and "G80-3000 Switches auslöten" (doesn't exist anywhere yet, not even as a pending card).
- [ ] Doesn't fit any existing Plates sub-card (3D-Printed / Fat-Plate / Brass-Plate) — needs a 4th card, e.g. "Custom-/PCB-Plate (FR4)".
- [ ] Materials table lost its structure in the plain-text export, needs reconstructing as a real `<table>`.
- Would be the **first finished Plates guide** — meaningfully moves the GOALS.md launch bar ("at least one finished guide per advertised category").

## Proposed: Lighthouse 3D-Druck as a new partner.html card — ready to implement

Reference: https://kk-website-three.vercel.app/ — one-person 3D-printing manufaktur in Hirschhorn (FDM, prototyping, small series, replacement parts, CAD support). Contact: info@praezisionsdruck.de.

- [x] Confirmed by owner (2026-09-04): plain mention, no compensation. **No "Werbung" badge, no `rel="sponsored"`** — unlike the PCBWay card, this one is a normal `rel="noopener noreferrer"` link.
- [ ] No logo image supplied. Default: styled text/wordmark inside the existing `.partner-card__logo-band` container (site's display font) instead of an `<img>`, until a real logo file shows up. Swap-in-ready once one exists.

## P1 — structure (remaining)

- [ ] Extract header/footer/font/theme-boot into a layout (Eleventy or a small include script). The sun-icon drift (see Done) is a direct symptom of not having one — it's fixed now, but the underlying cause isn't.
- [ ] Contact page: location map. Reference site uses a plain OpenStreetMap iframe (`openstreetmap.org/export/embed.html?...`), not Google Maps — no API key, no backend, fits a static site fine. Recommend a click-to-load pattern (placeholder + "Karte laden" button) so the third-party request only fires on user action — keeps the current "no third-party embeds" claim in cookies.html honest without needing a consent banner. Needs a small privacy.html/cookies.html addendum once implemented.
- [x] Contact form: tested live, FormSubmit works. CORS/captcha was never actually a problem in practice.
- [x] Language default: English confirmed as the site's default (2026-09-03) — see `DECISIONS.md`. Visible copy stays German; that remainder is an accepted trade-off, not open work unless the owner later asks for a full English rewrite.

## P2 — performance and a11y

- [ ] Fullscreen image viewer: prev/next arrows and the close (×) button aren't centered. (Reported 2026-09-03, owner note.) — good candidate for the next small package.
- [ ] Win2k-theme: pixel font instead of the current system-font-emulation stack (no real webfont yet).
- [ ] Possible Win2k-theme / whole contact-page redesign — owner flagged as "evtl.", genuinely undecided, no action needed until there's a direction.
- [ ] Drop unused Google Fonts (Libre Caslon Display, IBM Plex Mono are linked; CSS uses Libre Caslon Text + Courier Prime).
- [ ] Image `srcset` / WebP; homepage `og:image` (currently missing entirely on index.html).
- [ ] Theme boot: honour `prefers-color-scheme` when localStorage is empty. Align `:root` tokens with the default theme.
- [ ] Gallery: cheat-sheet toggle vs fullscreen both bind to the polaroid; images use `role="button"`. One control per action.
- [ ] Replace `data-i18n-html` innerHTML with safer interpolation if possible.
- [x] Light-mode sun icon missing its top-right ray on all 8 blog pages (blog.html + 7 blog-*.html). Fixed and pushed, see Done.

## P3 — content and hygiene

- [ ] Logo design (owner-led, not an implementer task).
- [ ] Refine the color palette (owner-led, not an implementer task).
- [ ] Fill or remove incomplete gallery fields ("Switches: to add"). Align DE gallery title keys with HTML (Garagenfund vs Cherry G80-3000).
- [ ] Guides: most cards are `guide-card--pending`. Finish a few or hide the rest. (The G80-Plate guide above would be a real candidate once unblocked.)
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
