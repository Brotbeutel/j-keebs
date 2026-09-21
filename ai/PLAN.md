# Plan

## Roles

| Role | Who | Does | Does not |
| --- | --- | --- | --- |
| **Planner** | This project's planning chat | Priority, scope, architecture calls, updating this file | Implement site changes in the same session unless the owner asks |
| **Implementer** | A **new** chat | Execute the current work package only | Re-plan, add frameworks, "while I'm here" refactors |
| **Owner** | Jannik | Approves scope changes, commits, deploy | — |

If an implementer finds a new issue: add it to `BACKLOG.md` under the right priority and keep going on the current package. Do not start a later package in an earlier session.

## Sequence

1. ~~P0 / P0-B / P0-C~~ ✅ done and deployed
2. ~~P1 contact form + P1-A brand + P1-B guides~~ ✅ done and deployed
3. ~~P2-A interaction/visual polish~~ ✅ done and deployed
4. ~~P2-B / P2-C Eleventy migration~~ ✅ done and deployed (2026-09-18/19)
5. **P2-D — repo hygiene, self-hosted fonts, base-layout fixes** ← current package (below)
6. P2-E — image pipeline (resize/WebP/srcset, lazy policy, social preview images)
7. P2-F — Eleventy data model (computed canonical/og URLs, i18n as data files, blog collection, generated sitemap/robots)
8. P2-remaining — a11y items from `BACKLOG.md`
9. P3 — content / README honesty

Do not skip ahead. Findings behind each package: `BACKLOG.md` → "Review 2026-09-20".

## Current work package: P2-D — repo hygiene, self-hosted fonts, base-layout fixes

**Implementation status (2026-09-21):** P2-D is done and committed as `38efe4f`; the owner ran the checks and reported all positive. `STATUS.md` has the details. Planner: confirm and queue P2-E; the "Current work package" below is complete and should be replaced.

**Goal:** Remove the third-party font request, fix the shared-layout defects found in the 2026-09-20 review, and give the owner an exact, safe clean-up for the repo. No visual redesign, no content changes.

**In scope**

1. **Self-host fonts (BACKLOG R1).** Serve Libre Caslon Text (400, 700, italic 400), IBM Plex Sans (400, 500, 600, 700), Courier Prime (400, 700) and Playwrite DE Grund (as used by `--font-hand`) as local `woff2` files (Latin subset is enough; e.g. `@fontsource/*` devDependencies or downloaded files with their OFL licence text). Copy them into `_site/` via passthrough, declare `@font-face` with `font-display: swap` in `style.css`, and remove the three Google `<link>` tags (two `preconnect`, one stylesheet) from `src/_includes/base.njk`. Keep the existing `--font-*` token stacks and fallbacks.
2. **Logo dimensions (R4).** In `base.njk`, header and footer logo: `width="1742" height="733"` (real file size). Verify the header does not shift when the logo loads.
3. **404 page (R5).** `404.html` must render fully styled when served at any depth (e.g. `/j-keebs/foo/bar`), and its skip link must stay an in-page jump. Do not leave a `<base>` element after other URL-bearing elements. Any approach is fine (root-absolute paths for this page only, or a `base_href` variable rendered first in `<head>`); do not change URLs on the other 20 pages.
4. **PCBWay logo link (R8).** `src/pages/partner.njk`: the logo link to `pcbway.com` gets `target="_blank" rel="noopener noreferrer sponsored"` like the text link. Do not touch the OWA LABS card.
5. **Owner steps (not for the implementer to run; list them in the handoff):**
   - `git rm -r --cached node_modules .cursor` and commit (working files stay on disk; `.gitignore` already lists both).
   - Optional: after fonts are self-hosted, re-check `privacy.njk` / `cookies.njk`. No wording change is required by this package; wording is the owner's / lawyer's call.

**Out of scope**

- Image resizing, WebP, `srcset`, lazy-loading policy, `og:image` changes (P2-E)
- Eleventy data-model refactors (P2-F), i18n restructuring, blog collection
- Any visible copy, DE/EN text alignment, blog rewrites (owner decisions, see BACKLOG R6/R7)
- Astro, React, new pages, redirect stubs, GitHub Pages settings
- Committing

**Done when**

- `npm run build` succeeds, 21 pages.
- `grep -l "fonts.googleapis\|fonts.gstatic" _site/*.html` prints nothing; DevTools Network on `index.html`, `keyboards.html` and `guides.html` shows no request to Google; the fonts still render (display, body, mono, handwritten cheat-sheet text) with no visible metric jump beyond normal `swap`.
- `grep -c 'height="733"' _site/index.html` → 2; no `height="980"` left.
- `_site/404.html` viewed at `/j-keebs/foo/bar` (via `npm run dev`) is styled and its skip link does not navigate away.
- `grep -n "pcbway.com" _site/partner.html` shows `sponsored` on both links.
- No other page's generated URLs changed (spot-check `diff` of `_site/*.html` before/after apart from fonts/logo lines).
- `STATUS.md` and `BACKLOG.md` updated; owner steps listed.

## Redirect stub pattern

GitHub Pages has no real 301. **The owner deleted all redirect stubs (2026-09-11).** If redirects are needed in future:

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=NEW-TARGET.html">
  <link rel="canonical" href="https://brotbeutel.github.io/j-keebs/NEW-TARGET.html">
  <title>Weiterleitung…</title>
</head>
<body>
  <p><a href="NEW-TARGET.html">Weiter zur Seite</a></p>
</body>
</html>
```

In Eleventy this is a template with `permalink: old-name.html`, not a file in the repo root.

## After P2-D

Return to the planner chat. Next: P2-E (images), then P2-F (data model).
