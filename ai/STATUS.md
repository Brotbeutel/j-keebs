# Status

- **Site:** J-Keebs, static GitHub Pages, vanilla HTML/CSS/JS
- **Live:** https://brotbeutel.github.io/j-keebs/
- **Repo:** https://github.com/Brotbeutel/j-keebs (renamed from `Brotbeutel.github.io` — this moved Pages from a user-page root site to a **project-page site under `/j-keebs/`**, see "Do not assume" below)
- **Owner:** Jannik Schlüter
- **Planner:** dedicated planning chat; implementers use a **new** chat per work package
- **Updated:** 2026-09-09

## Snapshot

**P1-A complete:** owner-supplied assets and draft text were reconciled locally: `images/J-Keebs-Logo.png`, `images/J-Keebs-Icon.ico`, `images/OWA_Labs_Logo.png`, `images/J80-3000_open_with_printed_plate.jpg`, and `content/Über J-Keebs.md`. The supplied brand is now in the shared chrome, OWA metadata is accurate, the G80-Plate image is attached to the intended article, and `about.html` reflects the supplied draft. The about page was refined on 2026-09-09 into a concise intro, personal story, and three content pillars, with both i18n dictionaries aligned to that structure.

**Header refinement:** on 2026-09-09 the supplied wide logo was enlarged in the shared header and the desktop brand-to-navigation spacing was tightened; mobile menu alignment remains unchanged.

**P1-B guide information architecture:** completed locally on 2026-09-09. `guides.html` now exposes Switches, Plates, Mods, and a truthful pending Keycaps category with matching jump links, status count, metadata, and DE/EN page keys. Across all 21 pages, the navigation label is now simply Guides and links to `guides.html`; the category panel appears beneath the full-width mobile row and on desktop hover/focus. Footer guide navigation includes the Keycaps destination. Static coverage and workspace diagnostics passed; Node-based syntax validation was unavailable because Node.js is not installed in the session shell.

**P1-B behavior correction:** clicking the primary Guides label now carries a one-use navigation state through the page load. `main.js` restores the open dropdown, and on mobile restores the expanded site navigation as well; ordinary visits and category-link clicks are unaffected.

**Update (same day, owner instruction): the contact-page map now loads automatically, not click-to-load.** The owner explicitly asked for auto-load plus a desaturated-until-hover look, and supplied the precise coordinate (49°23'20.0"N 8°34'33.4"E → 49.388889, 8.575944), replacing the earlier street-level approximation. contact.html now embeds a static `<iframe>` directly in the HTML (no JS involved at all — `initMapEmbed()` was removed from `main.js` since there's nothing left for it to do). The iframe is grayscale by default (`filter: grayscale(1)`) and returns to full color on hover/focus (`.map-embed__frame:hover`, `:focus-within`).

**This changes the privacy story, and I flagged that to the owner:** every visit to contact.html now sends the visitor's IP to OpenStreetMap automatically, with no user action gating it. `cookies.html` was updated to stop implying "nothing embeds automatically" — the map now has its own ✓ card there. `privacy.html#kartendienst` was updated to describe automatic loading and its legal basis was changed from Art. 6 Abs. 1 lit. a (consent-via-click, no longer applicable) to Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse). **This legal-basis judgment call has not been reviewed by a lawyer** — flagged to the owner in chat, and recorded in `DECISIONS.md` (2026-09-05 entry) so a later agent doesn't "fix" the auto-load back to click-to-load thinking it's a regression.

The visual system is in place; the site is pre-launch. **P0, P0-B and P0-C are all done** (file-level; see previous entry below for detail) — but a live check this session (fetched `https://brotbeutel.github.io/j-keebs/` and `.../contact.html`) shows the **repo has not been fully re-deployed yet**: the live homepage still shows the old canonical (`https://brotbeutel.github.io/` without `/j-keebs/`) and still links to the old blog filename `blog-j80-3000-zweites-leben.html`. Oddly, `contact.html`'s live canonical/og:url *already* show `/j-keebs/` — so some files may have been hand-patched already, inconsistently. **The owner still needs to copy the P0-B/P0-C output into the repo and push** before any of this is actually live.

**P1 (contact form) is done at the code level, but not live-verified — see "Do not assume."** Root cause found by reading FormSubmit's own docs (`https://formsubmit.co/documentation`, `.../ajax-documentation`): cross-origin `fetch()`/AJAX submissions must POST to a dedicated `https://formsubmit.co/ajax/{email}` endpoint with a JSON body and both `Content-Type: application/json` and `Accept: application/json` headers — "this even works cross-origin" per FormSubmit's own wording. The site's JS was instead POSTing `FormData` to the *same* plain `action` URL used for the native no-JS fallback (`https://formsubmit.co/{email}`), which FormSubmit does not document as CORS-enabled for fetch. This exact setup (fetch → plain endpoint) has a documented public failure mode elsewhere (`SyntaxError: Unexpected token '<' ... is not valid JSON`), which matches "unreliable" JS-fetch behavior.

Fix applied in `main.js` only (no HTML changes): the JS path now derives `.../ajax/{email}` from the existing form `action` and sends a JSON body with the correct headers; the native `<form action="...">` (used by the no-JS path) is untouched. Syntax-checked with `node -c`.

**This was not confirmed by an actual live browser test** — this chat has no browser/DevTools tool, so nobody actually clicked "Send" on the deployed page and watched the Network/Console tabs. The fix is grounded in FormSubmit's own documentation and a matching root-cause read of the code, not empirical observation. Once the owner deploys, a real submit-and-watch test (by the owner, or via a connected browser tool like Claude for Chrome) is still needed to close out the "Done when" criterion in `PLAN.md`/the P1 brief.

The previously-unverified detail from P0 is now resolved: `kontakt.html`, `ueber-uns.html`, `datenschutz.html`, and `agb.html` did **not** exist anywhere in the repo. They have been added as plain redirect stubs (meta-refresh + canonical, same pattern as `article-j80-3000-second-life.html`) pointing at `contact.html`, `about.html`, `privacy.html`, and `terms.html` respectively, so any old inbound links/bookmarks from before the English-filename migration still resolve. They are intentionally **not** listed in `sitemap.xml` (stubs are omitted there, matching the existing convention).

Verification performed before handoff (P0-B/P0-C): repo-wide grep found zero remaining `brotbeutel.github.io/` URLs missing `/j-keebs/`; zero remaining `href`s pointing at any of the 5 old blog filenames; every internal `.html` link resolves to a file that exists; line counts of every edited file match the pre-edit original exactly (no accidental truncation/duplication from the bulk regex passes).

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
- [x] **P1 contact-form fix — implementer** (root cause found + `main.js` patched; live browser confirmation still outstanding, see Snapshot)
- [ ] Owner (or a browser-capable session): actually click "Send" on the deployed contact form once pushed, with and without JS, and confirm the outcome
- [x] **Contact-page location map — implementer** (auto-loading OpenStreetMap embed, desaturated until hover/focus, precise owner-supplied coordinate; cookies.html + privacy.html updated to describe automatic loading; see Snapshot)
- [ ] Owner (optional): have a lawyer sanity-check the Art. 6 Abs. 1 lit. f DSGVO framing for the auto-loading map now that there's no click-based consent gate (see Snapshot)
- [x] **partner.html: OWA LABS card — implementer** (second partner card, no disclosure badge; supplied logo and accurate alt text now present)
- [x] `USERNOTES.md` folded into `BACKLOG.md` and cleared; later owner notes were reconciled again on 2026-09-09
- [x] Owner supplied the about-page draft and OWA LABS/G80-Plate/brand assets locally; planner review verified them 2026-09-09
- [x] **P1-A — owner-input reconciliation** (brand, favicon, OWA metadata, G80 image, about draft; completed 2026-09-09)
- [x] Planner: after P1-A, scope P1-B guide taxonomy/navigation, then P2 interaction and homepage visual polish
- [x] **P1-B — implementer** (Keycaps category and navigable Guides parent; completed 2026-09-09)

## Do not assume

- There is **no** SSG, test suite, or CI link checker. Do not add one unless a later package says so.
- **The site is hosted as a GitHub Pages *project* page under `/j-keebs/`, not a user-page root site.** Every absolute URL (canonical, og:*, sitemap.xml, robots.txt, JSON-LD, FormSubmit `_next`) must include the `/j-keebs/` segment. This is now consistently true across the whole site as of P0-B — do not copy old patterns from git history (pre-2026-09-03) without checking the base path.
- English is the confirmed default (JS + `lang` attribute) — that part is **settled, not a bug**. The mismatch between `lang="en"` and German visible copy is a known, accepted trade-off, not scheduled for a fix.
- `content/` is gitignored. Do not restore `main-original.js`.
- Blog filenames are now English slugs (`blog-getting-started.html`, `blog-old-keyboards.html`, `blog-keyboards-for-others.html`, `blog-j80-3000-second-life.html`, `blog-10-euro-ps2-connector.html`, plus unchanged `blog-tofu65-v2.html` and `blog-corsair-k70.html`). The old German slugs now exist only as redirect stubs — do not link to them from new content.
- These P0-B/P0-C changes were made in a working copy, not committed to the repo. The owner still needs to review, copy the changed files in, and push/deploy. **Live check this session found the repo is not yet fully re-deployed** (see Snapshot) — don't assume `/j-keebs/` fixes are live everywhere just because they're done in the working copy.
- Contact form: the JS-fetch path now POSTs to `https://formsubmit.co/ajax/{email}` (JSON body, `Content-Type`+`Accept` headers), not the plain `action` URL. This is per FormSubmit's own docs, not an empirical live test — an implementer session has no browser tool to click-test the deployed form. Don't mark the P1 "Done when" (form provably works with/without JS) as satisfied until someone actually tries it live.
- The contact-page map **auto-loads on page visit by explicit owner instruction** (2026-09-05, see `DECISIONS.md`) — it is *not* click-to-load anymore, despite what an earlier version of this file said. Do not "fix" it back to click-to-load without checking with the owner first. There is no `#mapEmbedLoad` button and no `initMapEmbed()` function anymore — both were removed. The coordinate (49.388889, 8.575944) came directly from the owner (DMS: 49°23'20.0"N 8°34'33.4"E), not from geocoding — treat it as authoritative.
- The second partner on partner.html is called **OWA LABS**, not "Lighthouse" — "Lighthouse" was a stale internal codename from an earlier planning round. It deliberately has **no** "Werbung" badge and **no** `rel="sponsored"` (confirmed no compensation) — don't add either without the owner first confirming a paid/reciprocal arrangement exists. The real OWA logo asset exists locally and its accessible label is now correct.

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
| Map | OpenStreetMap, static auto-loading iframe, desaturated until hover/focus (`#mapEmbed` in contact.html, `.map-embed*` in style.css) |
| Fonts | Google Fonts in every `<head>` |
| Images | `images/` |
