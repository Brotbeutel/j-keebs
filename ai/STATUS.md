# Status

- **Site:** J-Keebs, static GitHub Pages, vanilla HTML/CSS/JS
- **Live:** https://brotbeutel.github.io/j-keebs/
- **Repo:** https://github.com/Brotbeutel/j-keebs
- **Owner:** Jannik Schlüter
- **Planner:** dedicated planning chat; implementers use a **new** chat per work package
- **Updated:** 2026-09-04

## Snapshot

The visual system is in place; the site is pre-launch. **P0, P0-B, P0-C, and P1 (contact form) are all done and confirmed live.**

- P0-B (base URL after the repo rename to `/j-keebs/`) — pushed and verified live: canonical/og:url/JSON-LD/sitemap.xml/robots.txt/404.html/FormSubmit `_next` all use the correct base path. The four legacy German redirect stubs (`kontakt.html`, `ueber-uns.html`, `datenschutz.html`, `agb.html`) were confirmed to exist and be correct.
- P0-C (blog files renamed to English slugs) — pushed and verified live: prev/next chain, `blog.html`, `index.html`, sitemap all point at the new names; old names are correct redirect stubs.
- P1 contact form — tested live by the owner, FormSubmit works. The CORS/captcha risk noted in the backlog never materialized in practice. No code change was needed.
- Small fix, pushed: the light-mode sun icon on `blog.html` and all 7 `blog-*.html` posts was missing one of its 8 rays (top-right diagonal). Restored across all 8 files, diff-checked to confirm nothing else changed.

**Nothing is currently queued for an implementer.** See `PLAN.md` — the next step is a planner decision on which P2 item(s) to scope, or picking the deferred layout/SSG discussion back up.

## In flight

- [x] Critical review
- [x] `ai/` handoff folder
- [x] P0 — implementer
- [x] Planner: after P0 (live deploy check)
- [x] Language-default decision (English default, German copy stays for now)
- [x] P0-B — implementer, pushed, verified live
- [x] P0-C — implementer, pushed, verified live
- [x] P1 — contact form tested live, no fix needed
- [x] Sun-icon ray fix — pushed
- [ ] Planner: scope the next package (P2 slice, or resume the layout/SSG discussion)

## Do not assume

- There is **no** SSG, test suite, or CI link checker. Do not add one unless a later package says so.
- The site is hosted as a GitHub Pages **project** page under `/j-keebs/`. This is now correctly reflected everywhere — don't reintroduce bare `https://brotbeutel.github.io/...` URLs.
- English is the confirmed default (JS + `lang` attribute) — settled, not a bug. Visible copy stays German; translating it is still a separate, unapproved content task.
- `content/` is gitignored. Do not restore `main-original.js`.
- The four legacy German redirect stubs and all 5 renamed blog stubs exist and are correct — verified directly, not assumed.

## Stack (actual)

| Piece | File / place |
| --- | --- |
| Pages | Root `*.html` (no templates) |
| Hosting | GitHub Pages, project site, base path `/j-keebs/` |
| CSS | `style.css` |
| JS | `main.js` |
| i18n common | `J_KEEBS_I18N_COMMON` in `main.js` |
| i18n page | `J_KEEBS_I18N` inline in each HTML file |
| Contact | FormSubmit (confirmed working) |
| Fonts | Google Fonts in every `<head>` |
| Images | `images/` |
