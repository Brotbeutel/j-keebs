# Status

- **Site:** J-Keebs, static GitHub Pages, vanilla HTML/CSS/JS
- **Live:** https://brotbeutel.github.io/j-keebs/
- **Repo:** https://github.com/Brotbeutel/j-keebs (renamed from `Brotbeutel.github.io` — this moved Pages from a user-page root site to a **project-page site under `/j-keebs/`**, see "Do not assume" below)
- **Owner:** Jannik Schlüter
- **Planner:** dedicated planning chat; implementers use a **new** chat per work package
- **Updated:** 2026-09-03

## Snapshot

The visual system is in place; the site is pre-launch. **P0, P0-B and P0-C are all done.** Every absolute URL (`canonical`, `og:url`, `og:image`, `twitter:image`, JSON-LD `url`, `sitemap.xml`, `robots.txt`, FormSubmit `_next`, and `404.html`'s root-absolute asset/nav paths) now uses the live base path `https://brotbeutel.github.io/j-keebs/…` / `/j-keebs/…`. The 5 blog files are renamed to English slugs, the prev/next chain works end-to-end across all 7 posts, `blog.html` and `index.html` point at the new filenames, and `sitemap.xml` lists the 20 canonical pages under the renamed slugs.

The previously-unverified detail from P0 is now resolved: `kontakt.html`, `ueber-uns.html`, `datenschutz.html`, and `agb.html` did **not** exist anywhere in the repo. They have been added as plain redirect stubs (meta-refresh + canonical, same pattern as `article-j80-3000-second-life.html`) pointing at `contact.html`, `about.html`, `privacy.html`, and `terms.html` respectively, so any old inbound links/bookmarks from before the English-filename migration still resolve. They are intentionally **not** listed in `sitemap.xml` (stubs are omitted there, matching the existing convention).

Verification performed before handoff: repo-wide grep found zero remaining `brotbeutel.github.io/` URLs missing `/j-keebs/`; zero remaining `href`s pointing at any of the 5 old blog filenames; every internal `.html` link resolves to a file that exists; line counts of every edited file match the pre-edit original exactly (no accidental truncation/duplication from the bulk regex passes).

Separately: English is still the **confirmed default language** for the site (2026-09-03, unchanged by this package). `DEFAULT_LANG` in `main.js` is `"en"`, `<html lang="en">` is set on every page. The visible page copy in the raw HTML stays German for now; translating it is a separate, not-yet-approved content task. See `CONVENTIONS.md` and `GOALS.md`.

## In flight

- [x] Critical review
- [x] `ai/` handoff folder
- [x] Planner role + P0 brief (`PLAN.md`)
- [x] **P0 — implementer** (see `PLAN.md` history / `BACKLOG.md` Done)
- [x] Planner: after P0 (live deploy check) — found the repo-rename base-path issue
- [x] Language-default decision made and documented (English default, German copy stays for now)
- [x] **P0-B — implementer** (base-URL fix for `/j-keebs/`, incl. the 4 legacy-stub question resolved)
- [x] **P0-C — implementer** (blog files → English slugs, prev/next chain, sitemap rebuilt)
- [ ] Planner: review P0-B/P0-C output, decide next package (P1 structure vs. the proposal-only Eleventy discussion)

## Do not assume

- There is **no** SSG, test suite, or CI link checker. Do not add one unless a later package says so.
- **The site is hosted as a GitHub Pages *project* page under `/j-keebs/`, not a user-page root site.** Every absolute URL (canonical, og:*, sitemap.xml, robots.txt, JSON-LD, FormSubmit `_next`) must include the `/j-keebs/` segment. This is now consistently true across the whole site as of P0-B — do not copy old patterns from git history (pre-2026-09-03) without checking the base path.
- English is the confirmed default (JS + `lang` attribute) — that part is **settled, not a bug**. The mismatch between `lang="en"` and German visible copy is a known, accepted trade-off, not scheduled for a fix.
- `content/` is gitignored. Do not restore `main-original.js`.
- Blog filenames are now English slugs (`blog-getting-started.html`, `blog-old-keyboards.html`, `blog-keyboards-for-others.html`, `blog-j80-3000-second-life.html`, `blog-10-euro-ps2-connector.html`, plus unchanged `blog-tofu65-v2.html` and `blog-corsair-k70.html`). The old German slugs now exist only as redirect stubs — do not link to them from new content.
- These P0-B/P0-C changes were made in a working copy, not committed to the repo. The owner still needs to review, copy the changed files in, and push/deploy.

## Stack (actual)

| Piece | File / place |
| --- | --- |
| Pages | Root `*.html` (no templates) |
| Hosting | GitHub Pages, project site, base path `/j-keebs/` |
| CSS | `style.css` |
| JS | `main.js` |
| i18n common | `J_KEEBS_I18N_COMMON` in `main.js` |
| i18n page | `J_KEEBS_I18N` inline in each HTML file |
| Contact | FormSubmit |
| Fonts | Google Fonts in every `<head>` |
| Images | `images/` |
