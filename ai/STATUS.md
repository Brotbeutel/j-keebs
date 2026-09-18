# Status

- **Site:** J-Keebs, static GitHub Pages, vanilla HTML/CSS/JS
- **Live:** https://brotbeutel.github.io/j-keebs/
- **Repo:** https://github.com/Brotbeutel/j-keebs
- **Owner:** Jannik Schlüter
- **Planner:** dedicated planning chat; implementers use a **new** chat per work package
- **Updated:** 2026-09-18

## Snapshot

The site is **live and deployed** at https://brotbeutel.github.io/j-keebs/. All P0 through P2-A work has been pushed and is live. P2-C (Eleventy full migration) is complete locally: all 21 canonical pages have been migrated to Eleventy templates in `src/pages/`, legacy root `.html` files have been deleted, and `npm run build` produces the full 21-page site in `_site/`. The repository source of truth is now `src/pages/` with `src/_includes/base.njk`.

**What's done:**
- P0/P0-B/P0-C (URL fixes, English blog slugs) — all done and deployed.
- P1 contact-form CORS fix — code-level fix shipped and deployed. Live browser confirmation of the form still outstanding.
- P1-A (brand assets, about page, OWA LABS partner card) — done and deployed.
- P1-B (guide navigation/taxonomy, Keycaps category) — done and deployed.
- P2-A (map auto-load, fullscreen controls, homepage visual polish) — done and deployed.
- P2-B (Eleventy migration preparation) — done.
- P2-C (Eleventy full migration) — all 21 pages migrated to `src/pages/` using `base.njk`, parity spot-checked, legacy root HTML deleted.
- Contact map: auto-loads on page visit (owner decision, see `DECISIONS.md`). Privacy/cookies pages updated. Legal basis (Art. 6 Abs. 1 lit. f DSGVO) not lawyer-reviewed.

**Current state of redirect stubs:** The owner has **deleted** all redirect stubs from the repo:
- Legacy German page stubs (`kontakt.html`, `ueber-uns.html`, `datenschutz.html`, `agb.html`) — deleted.
- Old German blog slugs (`blog-anfang.html`, `blog-alte-tastaturen.html`, `blog-tastaturen-fuer-andere.html`, `blog-j80-3000-zweites-leben.html`, `blog-10-euro-ps2-stecker.html`) — deleted.
- `article-j80-3000-second-life.html` — deleted.

This means old inbound links to these URLs will now 404. This is an accepted owner decision unless explicitly reversed.

**Eleventy status:** `@11ty/eleventy@3.1.6` is installed as a devDependency. Node.js v24.19.0 is available. `eleventy.config.js` uses `src/` input, `_site/` output, `/j-keebs/` pathPrefix, and passthrough copies for root `images/`, `style.css`, `main.js`, `robots.txt`, and `sitemap.xml`. `src/_includes/base.njk`, `src/_data/site.js`, and all 21 page templates in `src/pages/` exist. All 21 legacy root `.html` files have been deleted.

**P2-C verification:** `npm run build` runs cleanly and writes 21 pages to `_site/` plus 35 copied assets in ~0.5s. Spot checks on `index.html`, `cookies.html`, `contact.html`, `blog-getting-started.html`, `keyboards.html`, `404.html`, and `switches.html` confirmed exact parity for title, description, canonical, `og:url`, `active_nav`, FormSubmit form, OSM map iframe, JSON-LD schema, in-page styles, fullscreen modal overlay, and i18n dictionaries.

## In flight

- [x] P0 / P0-B / P0-C — all done and deployed
- [x] P1 contact-form CORS fix (code level)
- [ ] Live browser test of the contact form (submit with JS on + JS off)
- [x] P1-A owner-input reconciliation (brand, about, OWA LABS)
- [x] P1-B guide information architecture
- [x] P2-A interaction/visual polish
- [ ] Owner (optional): lawyer review of Art. 6 Abs. 1 lit. f DSGVO for auto-loading map
- [x] P2-B — Eleventy migration preparation — done locally (2026-09-11)
- [x] **P2-C — Eleventy full migration** — done (2026-09-18)
- [ ] P2-remaining — performance/a11y items (fonts, images, theme boot, gallery a11y)

## Do not assume

- **Node.js and Eleventy are available.** Node v24.19.0, Eleventy 3.1.6 installed as devDep.
- **P2-C is complete.** All 21 canonical pages exist as Eleventy templates in `src/pages/*.njk`. The 21 legacy root `.html` files have been deleted.
- **The Eleventy templates in `src/pages/` and `src/_includes/base.njk` are now the single source of truth.**
- **GitHub Pages deployment requirement:** Since root `.html` files no longer exist in git, GitHub Pages must be configured to deploy from the `_site/` build artifact (via GitHub Actions workflow using `actions/deploy-pages` or a `gh-pages` branch).
- **Redirect stubs have been deleted.** Do not reference them as if they still exist.
- **The site is hosted as a GitHub Pages *project* page under `/j-keebs/`.** Every absolute URL must include the `/j-keebs/` segment.
- English is the confirmed default (`lang="en"`, `DEFAULT_LANG = "en"`). Visible copy stays German. This is intentional.
- `content/` is gitignored. Do not publish it.
- `node_modules/` and `_site/` are gitignored.
- The contact map **auto-loads** by explicit owner decision. Do not revert to click-to-load.

## Stack (actual)

| Piece | File / place |
| --- | --- |
| Templates | `src/pages/*.njk` (21 pages), `src/_includes/base.njk`, `src/_data/site.js` |
| Output | `_site/` (21 generated HTML pages + copied assets) |
| Hosting | GitHub Pages, project site, base path `/j-keebs/` (requires build step to deploy `_site/`) |
| CSS | `style.css` (passthrough copied to `_site/style.css`) |
| JS | `main.js` (passthrough copied to `_site/main.js`) |
| i18n common | `J_KEEBS_I18N_COMMON` in `main.js` |
| i18n page | `J_KEEBS_I18N` in `page_script` front-matter of each template |
| Contact | FormSubmit (AJAX endpoint) |
| Map | OpenStreetMap, static auto-loading iframe, desaturated until hover/focus |
| Fonts | Google Fonts in `src/_includes/base.njk` `<head>` |
| Images | `images/` (passthrough copied to `_site/images/`) |
| Build tool | Eleventy 3.1.6 (`npm run build` -> `_site/`) |

## Target architecture

| Piece | Direction |
| --- | --- |
| Generator | Eleventy, incremental and URL-preserving |
| Templates | Shared layouts/includes plus page data/content |
| Output | Static files compatible with GitHub Pages project path `/j-keebs/` |
| Later option | Astro only if the finished site needs richer component islands or image tooling |
