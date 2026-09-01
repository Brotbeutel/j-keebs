# Status

- **Site:** J-Keebs, static GitHub Pages, vanilla HTML/CSS/JS
- **Live:** https://brotbeutel.github.io/
- **Repo:** https://github.com/Brotbeutel/Brotbeutel.github.io
- **Owner:** Jannik Schlüter
- **Planner:** dedicated planning chat; implementers use a **new** chat per work package
- **Updated:** 2026-09-01

## Snapshot

The visual system is in place; the site is pre-launch. **P0 is done** (J80 links, one canonical URL per page, German names are redirect stubs, sitemap rebuilt). Live Pages deploy is not verified until the owner commits and deploys. Next: planner after P0 (see `PLAN.md`).

## In flight

- [x] Critical review
- [x] `ai/` handoff folder
- [x] Planner role + P0 brief (`PLAN.md`)
- [x] **P0 — implementer** (see `PLAN.md`)
- [ ] Planner: after P0 (live deploy check, then proposal-only Eleventy discussion)

## Do not assume

- There is **no** SSG, test suite, or CI link checker. Do not add one unless a later package says so.
- English is **not** a separate URL set. Language is client-side JS.
- README accessibility/performance claims are targets, not verified.
- `content/` is gitignored. Do not restore `main-original.js`.
- P0 is local only until the owner commits.

## Stack (actual)

| Piece | File / place |
| --- | --- |
| Pages | Root `*.html` (no templates) |
| CSS | `style.css` |
| JS | `main.js` |
| i18n common | `J_KEEBS_I18N_COMMON` in `main.js` |
| i18n page | `J_KEEBS_I18N` inline in each HTML file |
| Contact | FormSubmit |
| Fonts | Google Fonts in every `<head>` |
| Images | `images/` |
