# Backlog

Check items when done. Move completed items into a short "Done" note at the bottom with the date. Do not delete context that a later agent still needs.

## P2-C — Eleventy full migration (done)

- [x] Migrate legal/static pages: `cookies.html`, `impressum.html`, `privacy.html`, `terms.html`
- [x] Migrate simple content pages: `faq.html`, `switches.html`, `partner.html`
- [x] Migrate `contact.html` (FormSubmit + map iframe)
- [x] Migrate listing pages: `blog.html`, `guides.html`, `keyboards.html`
- [x] Migrate 7 blog articles
- [x] Migrate `index.html` (JSON-LD + inline style)
- [x] Migrate `404.html` (root-absolute paths)
- [x] Verify all 21 pages build and match legacy output
- [x] Delete legacy root `.html` files
- [x] Document deployment path (GitHub Pages → `_site/`)

## Pending owner requests (not yet scoped into a package)

- [ ] **Dual-theme brand logos:** Owner wants separate logo/icon assets for light mode and dark mode (from `USERNOTES.md`, 2026-09-11). Needs scoping — asset swap in header via `[data-theme]` selectors or JS, plus favicon handling.

## P2 — performance and a11y (remaining items)

- [ ] Drop unused Google Fonts (Libre Caslon Display, IBM Plex Mono are linked; CSS uses Libre Caslon Text + Courier Prime).
- [ ] Image `srcset` / WebP; homepage `og:image` (currently missing entirely on index.html).
- [ ] Theme boot: honour `prefers-color-scheme` when localStorage is empty. Align `:root` tokens with the default theme.
- [ ] Gallery: cheat-sheet toggle vs fullscreen both bind to the polaroid; images use `role="button"`. One control per action.
- [ ] Replace `data-i18n-html` innerHTML with safer interpolation if possible.

## P3 — content and hygiene

- [ ] Fill or remove incomplete gallery fields ("Switches: to add"). Align DE gallery title keys with HTML (Garagenfund vs Cherry G80-3000).
- [ ] Guides: most cards are `guide-card--pending`. Finish a few or hide the rest.
- [ ] Rewrite or unpublish blog text that is not original (homepage already warns).
- [ ] Tone down README claims that the code does not meet.
- [ ] Consider dropping AGB if nothing is sold; keep Impressum.
- [ ] Add a link checker in CI later.

## Launch bar blockers

- [ ] Featured project links work (done).
- [ ] Blog posts that are not original are rewritten or unpublished.
- [ ] Guides page has at least one finished guide per advertised category, or pending cards are removed from the main view.

## Done

- 2026-09-18 — P2-C Eleventy full migration: Migrated all 20 remaining pages to Eleventy templates in `src/pages/` using `base.njk`. Verified all 21 pages build into `_site/` with 0 errors (title, canonical, og_url, active_nav, i18n dictionaries, custom head styles, JSON-LD schema, OSM map, FormSubmit form, fullscreen overlay all preserved). Deleted the 21 legacy root `.html` files. Documented GitHub Pages deployment path (`_site/` output build step).
- 2026-09-11 — P2-B Eleventy migration preparation: `eleventy.config.js`, `src/_includes/base.njk`, `src/_data/site.js`, and `src/pages/about.njk` establish the parallel `src/` → `_site/` proof. `about.html` is the only migrated page and legacy root `about.html` remains untouched. `npm run build` passes; generated `_site/about.html` matches legacy metadata, nav/dropdown, footer, assets, content, i18n object, and desktop/mobile browser metrics. Inventory added at `ai/ELEVENTY-INVENTORY.md`.

- 2026-09-01 — Critical review, `ai/` handoff folder added.
- 2026-09-01 — P0 URLs: fixed J80 hrefs, set canonical/og:url/_next to English names, sitemap lists canonical pages only.
- 2026-09-03 — P0-B: all absolute URLs site-wide now use `/j-keebs/` base path. Added redirect stubs for `kontakt.html`, `ueber-uns.html`, `datenschutz.html`, `agb.html`.
- 2026-09-03 — P0-C: 5 blog files renamed to English slugs with redirect stubs and prev/next chain fixed.
- 2026-09-03 — Language decision: English confirmed as default.
- 2026-09-05 — P1 contact-form CORS fix: JS now POSTs JSON to `/ajax/{email}` endpoint per FormSubmit docs.
- 2026-09-05 — Contact-page map: auto-loading OpenStreetMap embed with desaturated-until-hover styling. Privacy/cookies pages updated.
- 2026-09-05 — partner.html: OWA LABS card added.
- 2026-09-09 — P1-A: brand logo/icon rolled out, OWA metadata corrected, G80-Plate image attached, about.html rewritten.
- 2026-09-09 — P1-B: guide info architecture — Keycaps category, navigable Guides parent, footer links, all 21 pages.
- 2026-09-09 — P2-A: map touch feedback, fullscreen control centering, homepage portfolio spacing and workbench placeholder.
- 2026-09-09 — About page and header refinement (logo size, brand-to-nav spacing).
- 2026-09-11 — Owner deleted all redirect stubs from repo (German pages, old blog slugs, article stub). Old URLs now 404.
- 2026-09-11 — All work pushed and deployed to live site. Node.js + Eleventy now available locally.
- 2026-09-11 — Planner review: STATUS.md, PLAN.md, BACKLOG.md corrected and updated. USERNOTES dual-theme brand request folded in.
