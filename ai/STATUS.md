# Status

- **Site:** J-Keebs, static GitHub Pages, vanilla HTML/CSS/JS
- **Live:** https://brotbeutel.github.io/j-keebs/
- **Repo:** https://github.com/Brotbeutel/j-keebs
- **Owner:** Jannik Schlüter
- **Planner:** dedicated planning chat; implementers use a **new** chat per work package
- **Updated:** 2026-09-11

## Snapshot

The site is **live and deployed** at https://brotbeutel.github.io/j-keebs/. All P0 through P2-A work has been pushed and is live. P2-B is complete locally as a parallel Eleventy proof; the live deployment source remains the legacy root HTML files.

**What's done:**
- P0/P0-B/P0-C (URL fixes, English blog slugs) — all done and deployed.
- P1 contact-form CORS fix — code-level fix shipped and deployed. Live browser confirmation of the form still outstanding.
- P1-A (brand assets, about page, OWA LABS partner card) — done and deployed.
- P1-B (guide navigation/taxonomy, Keycaps category) — done and deployed.
- P2-A (map auto-load, fullscreen controls, homepage visual polish) — done and deployed.
- P2-B (Eleventy migration preparation) — done locally, not deployed/cut over.
- Contact map: auto-loads on page visit (owner decision, see `DECISIONS.md`). Privacy/cookies pages updated. Legal basis (Art. 6 Abs. 1 lit. f DSGVO) not lawyer-reviewed.

**Current state of redirect stubs:** The owner has **deleted** all redirect stubs from the repo:
- Legacy German page stubs (`kontakt.html`, `ueber-uns.html`, `datenschutz.html`, `agb.html`) — deleted.
- Old German blog slugs (`blog-anfang.html`, `blog-alte-tastaturen.html`, `blog-tastaturen-fuer-andere.html`, `blog-j80-3000-zweites-leben.html`, `blog-10-euro-ps2-stecker.html`) — deleted.
- `article-j80-3000-second-life.html` — deleted.

This means old inbound links to these URLs will now 404. This is an accepted owner decision unless explicitly reversed.

**Eleventy status:** `@11ty/eleventy@3.1.6` is installed as a devDependency. Node.js v24.19.0 is available. `eleventy.config.js` now uses `src/` input, `_site/` output, `/j-keebs/` pathPrefix, and passthrough copies for root `images/`, `style.css`, `main.js`, `robots.txt`, and `sitemap.xml`. `src/_includes/base.njk`, `src/_data/site.js`, and `src/pages/about.njk` exist. `about.html` is the only migrated representative page, output as `_site/about.html`; legacy root `about.html` is untouched.

**P2-B verification:** `npm run build` passes and writes `_site/about.html` plus 35 copied assets. Static comparison against legacy `about.html` passed for title, description, canonical URL, `og:url`, `twitter:title`, header, main content, footer, anchor sequence, image sources, external script sequence, and page i18n object. Browser checks through local `http://127.0.0.1:8080` passed at desktop/default viewport and 390×844 mobile viewport: same visible text, nav/footer links, active nav, section geometry, loaded stylesheet/images, no generated-page console warnings/errors, and no horizontal overflow. Migration inventory exists at `ai/ELEVENTY-INVENTORY.md`.

## In flight

- [x] P0 / P0-B / P0-C — all done and deployed
- [x] P1 contact-form CORS fix (code level)
- [ ] Live browser test of the contact form (submit with JS on + JS off)
- [x] P1-A owner-input reconciliation (brand, about, OWA LABS)
- [x] P1-B guide information architecture
- [x] P2-A interaction/visual polish
- [ ] Owner (optional): lawyer review of Art. 6 Abs. 1 lit. f DSGVO for auto-loading map
- [x] **P2-B — Eleventy migration preparation** — done locally; return to planner for P2-C scope/review

## Do not assume

- **Node.js and Eleventy are now available.** Node v24.19.0, Eleventy 3.1.6 installed as devDep. The earlier "Node unavailable" blocker is resolved.
- **P2-B is a parallel proof only.** Do not delete or replace legacy root HTML, change GitHub Pages deployment source, or migrate additional pages until the planner scopes P2-C.
- **Redirect stubs have been deleted.** Do not reference them as if they still exist. The 21 root `.html` files are the canonical pages only.
- **The site is hosted as a GitHub Pages *project* page under `/j-keebs/`.** Every absolute URL must include the `/j-keebs/` segment.
- English is the confirmed default (`lang="en"`, `DEFAULT_LANG = "en"`). Visible copy stays German. This is intentional.
- `content/` is gitignored. Do not publish it.
- `node_modules/` and `_site/` are gitignored.
- The contact map **auto-loads** by explicit owner decision. Do not revert to click-to-load.

## Stack (actual)

| Piece | File / place |
| --- | --- |
| Pages | Root `*.html` (live legacy source, 21 files); Eleventy proof in `src/pages/about.njk` |
| Hosting | GitHub Pages, project site, base path `/j-keebs/` |
| CSS | `style.css` |
| JS | `main.js` |
| i18n common | `J_KEEBS_I18N_COMMON` in `main.js` |
| i18n page | `J_KEEBS_I18N` inline in each HTML file |
| Contact | FormSubmit (AJAX endpoint) |
| Map | OpenStreetMap, static auto-loading iframe, desaturated until hover/focus |
| Fonts | Google Fonts in every `<head>` |
| Images | `images/` |
| Build tool | Eleventy 3.1.6 configured for `src/` → `_site/` proof builds |

## Target architecture

| Piece | Direction |
| --- | --- |
| Generator | Eleventy, incremental and URL-preserving |
| Templates | Shared layouts/includes plus page data/content |
| Output | Static files compatible with GitHub Pages project path `/j-keebs/` |
| Later option | Astro only if the finished site needs richer component islands or image tooling |
