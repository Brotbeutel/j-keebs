# Backlog

Check items when done. Move completed items into a short "Done" note at the bottom with the date. Do not delete context that a later agent still needs.

## P0-B and P0-C — done, see "Done" log below

Both work packages are complete (2026-09-03). Full detail in the Done section at the bottom of this file and in `STATUS.md`. One follow-up remains, moved to P1 below: GitHub Pages branch/folder settings still need the owner to confirm manually (not something an implementer session can check from file contents alone).

## P1 — structure

- [ ] Extract header/footer/font/theme-boot into a layout (Eleventy or a small include script). Nav already drifted (`blog.html` sun-icon SVG vs `index.html`).
- [x] Contact form CORS/captcha fix — done at the code level 2026-09-05, see Done log. Not yet live-verified (no browser tool available to an implementer session — see `STATUS.md`).
- [x] Language default: English confirmed as the site's default (2026-09-03) — see `DECISIONS.md`. Visible copy stays German; that remainder is an accepted trade-off, not open work unless the owner later asks for a full English rewrite.
- [ ] Owner to confirm GitHub Pages settings (branch/folder) still publish correctly post-rename — this needs the actual repo settings UI, not just file review, so it couldn't be verified from a file-only implementer session during P0-B.
- [ ] Owner to copy the P0-B/P0-C/P1 output files into the actual repo and push/deploy — this work was done in a sandbox working copy, not committed (see `STATUS.md`). Live check 2026-09-05 confirms the repo is not yet fully re-deployed (homepage still shows the old canonical + old blog filename).
- [ ] Once deployed: actually submit the contact form (with JS on, then with JS disabled) and confirm both paths deliver the email / show a success state. This is the P1 "Done when" criterion and still needs a real browser, not a file review.

## P2 — performance and a11y

- [ ] Fullscreen image viewer: prev/next arrows and the close (×) button aren't centered. (Reported 2026-09-03, owner note.)
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
- [ ] Consider dropping AGB if nothing is sold; keep Impressum. Phone on the marketing contact page is optional; address belongs on Impressum.
- [ ] Add a link checker in CI later. Do not restore `main-original.js`.

## Done

- 2026-09-01 — Critical review captured in Cursor canvas `j-keebs-critical-review.canvas.tsx` (local IDE artifact, not in this repo).
- 2026-09-01 — `ai/` handoff folder added.
- 2026-09-01 — P0 URLs: J80 hrefs → `blog-j80-3000-zweites-leben.html` + stub; German filenames intended as redirect stubs (existence unconfirmed, see P0-B); canonical/`og:url`/`_next` use English names; `sitemap.xml` lists canonical pages only (stubs omitted).
- 2026-09-03 — Repo renamed `Brotbeutel.github.io` → `j-keebs`; live site moved from domain root to `/j-keebs/` project-page path. Confirmed live via fetch that nav/CSS/JS/images still work (relative paths); absolute URLs (canonical/og:*/sitemap/robots/_next) do not yet reflect the new base path — tracked as P0-B.
- 2026-09-03 — Language-default decision made: English is the confirmed default; visible copy stays German for now (see `DECISIONS.md`).
- 2026-09-03 — Blog rename to English slugs approved by owner (see P0-C, `PLAN.md`).
- 2026-09-03 — **P0-B done:** every absolute URL site-wide (`canonical`, `og:url`, `og:image`, `twitter:image`, JSON-LD `url` in index.html, FormSubmit `_next` in contact.html, `sitemap.xml`, `robots.txt` `Sitemap:` line, and all of `404.html`'s root-absolute paths) now uses the `/j-keebs/` base path. Repo-wide grep confirms zero remaining unprefixed `brotbeutel.github.io/` URLs. The four legacy-stub filenames (`kontakt.html`, `ueber-uns.html`, `datenschutz.html`, `agb.html`) were confirmed **not present** in the repo and have been added as redirect stubs to `contact.html`/`about.html`/`privacy.html`/`terms.html` respectively (not listed in `sitemap.xml`, matching the existing stub-omission convention).
- 2026-09-03 — **P0-C done:** the 5 blog files renamed to English slugs per the `PLAN.md` table (`blog-getting-started.html`, `blog-old-keyboards.html`, `blog-keyboards-for-others.html`, `blog-j80-3000-second-life.html`, `blog-10-euro-ps2-connector.html`); redirect stubs left at all 5 old filenames; prev/next chain fixed and verified end-to-end across all 7 `blog-*.html` posts (including the two unchanged filenames, `blog-tofu65-v2.html` and `blog-corsair-k70.html`, whose neighboring `href`s needed updating); `blog.html` and `index.html` updated to the new filenames; `sitemap.xml` rebuilt with the renamed slugs; `article-j80-3000-second-life.html` stub's meta-refresh and canonical repointed at `blog-j80-3000-second-life.html`. Verified: no internal `href` anywhere still targets an old blog filename, and no internal `.html` link is broken.
- 2026-09-05 — Live check via fetch (no browser tool available): `https://brotbeutel.github.io/j-keebs/` still shows the pre-P0-B canonical/og:url (missing `/j-keebs/`) and still links to the old `blog-j80-3000-zweites-leben.html` — the P0-B/P0-C output has not been deployed yet. `contact.html`'s live canonical/og:url oddly already show `/j-keebs/`, suggesting a partial/manual patch happened separately. Owner should push the full P0-B/P0-C output before relying on any of it being live.
- 2026-09-05 — **P1 contact-form CORS fix done (code level):** read FormSubmit's own docs (`formsubmit.co/documentation`, `formsubmit.co/ajax-documentation`) and found the root cause — cross-origin `fetch()` must target `https://formsubmit.co/ajax/{email}` with a JSON body and `Content-Type`+`Accept: application/json` headers; the site's JS was instead sending `FormData` to the plain `action` URL shared with the no-JS fallback, which FormSubmit doesn't document as CORS-enabled. Matches a documented public failure mode (`SyntaxError: Unexpected token '<'`) for this exact pattern elsewhere. Fixed in `main.js` only: the JS path now derives and POSTs JSON to the `/ajax/{email}` endpoint; the native `<form action="...">` used by the no-JS fallback is untouched. Syntax-checked with `node -c`. **Not live-verified** — this implementer session has no browser/DevTools tool, so nobody has actually clicked "Send" on the deployed page yet. That real-world check is still open (see P1 list above).
