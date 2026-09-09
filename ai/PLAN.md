# Plan

## Roles

| Role | Who | Does | Does not |
| --- | --- | --- | --- |
| **Planner** | This project's planning chat | Priority, scope, architecture calls, updating this file | Implement site changes in the same session unless the owner asks |
| **Implementer** | A **new** chat | Execute the current work package only | Re-plan, add SSG, "while I'm here" refactors |
| **Owner** | Jannik | Approves scope changes, commits, deploy | — |

If an implementer finds a new issue: add it to `BACKLOG.md` under the right priority and keep going on the current package. Do not start a later package in an earlier session.

## Sequence

1. ~~P0 — URLs work~~ ✅ done
2. ~~P0-B — Base-URL after repo rename~~ ✅ done, pushed, verified live
3. ~~P0-C — Blog files → English slugs~~ ✅ done, pushed, verified live
4. **P1 — owner-input reconciliation** — next package below. Apply the new brand/content assets and correct known metadata before visual expansion.
5. **P1 — guide information architecture** — add the requested Keycaps category and make the Guides & Tutorials parent a real destination while preserving the dropdown.
6. **P2 — interaction / visual polish** — map touch/active behavior, homepage CTA spacing and hero direction, then fullscreen viewer centering.
7. **P2 — structure** — layout/SSG remains a planner discussion after the user-facing fixes; do not start an Eleventy migration opportunistically.
8. **P3 — content / README honesty**

Do not skip ahead.

## Current work package

**P1-A — owner-input reconciliation**

Implement only this package in the next implementer chat:

- Roll out `images/J-Keebs-Logo.png` as the visible site brand in the shared header/footer treatment, preserving readable responsive dimensions.
- Use `images/J-Keebs-Icon.ico` as the favicon and remove the placeholder data-URI favicon/apple-touch icon where appropriate.
- Replace the stale OWA LABS logo metadata in `partner.html` (`alt="PCBWay Logo"`) with accurate accessible text and verify the new asset renders.
- Use `images/J80-3000_open_with_printed_plate.jpg` in the G80-Plate article surface after identifying the correct article/page target; do not change unrelated blog imagery.
- Rewrite `about.html` from the owner-supplied `content/Über J-Keebs.md`, keeping the existing page structure and i18n conventions; do not invent missing content.

Done when: all pages have the correct favicon, the visible brand is legible at desktop and mobile widths, OWA LABS has correct alt text, the G80 image is linked from the intended article, the about page reflects the supplied draft, and targeted HTML/link/image checks pass. Do not redesign the homepage, change guide taxonomy, or refactor the layout in this package.

The next package after P1-A is P1-B (guide taxonomy/navigation), then P2 interaction polish. The owner still needs to push/deploy the working-copy changes before live status can be trusted.

## Redirect stub pattern

GitHub Pages has no real 301, so a rename leaves a stub at the old filename:

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

Canonical must include the `/j-keebs/` base path.

## After the current backlog clears

Come back to the planner chat. The deferred proposal-only Eleventy/layout discussion is still there whenever it's worth having — none of P0-B/P0-C/P1 needed it, but chrome duplication across ~24 pages (like the sun-icon drift that just got fixed) is still the standing maintenance cost of not having one.
