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
4. ~~**P1-A — owner-input reconciliation**~~ ✅ done 2026-09-09
5. ~~**P1-B — guide information architecture**~~ ✅ done 2026-09-09
6. **P2 — interaction / visual polish** — map touch/active behavior, homepage CTA spacing and hero direction, then fullscreen viewer centering.
7. **P2 — structure** — layout/SSG remains a planner discussion after the user-facing fixes; do not start an Eleventy migration opportunistically.
8. **P3 — content / README honesty**

Do not skip ahead.

## Current work package

**P2-A — interaction polish**

Implement only this package in the next implementer chat:

- Make the contact-page map become colored on touch/mobile activation as well as hover/focus, with the whole map card acting as the interaction surface where practical. Keep the automatic iframe loading and privacy disclosures unchanged.
- Fix the homepage spacing between the portfolio CTA and the polaroid gallery.
- Improve the homepage hero's visual interest while preserving the existing workshop/portfolio purpose and responsive behavior. Do not turn it into a marketing landing page.
- Fix the fullscreen viewer's prev/next and close control centering.

Done when: the map has a clear colored active state on touch, mouse, and keyboard; the homepage CTA/gallery spacing is intentional at desktop and mobile widths; the hero has a stronger first-viewport composition without losing clarity; fullscreen controls are geometrically centered and keyboard-usable; and focused CSS/markup diagnostics pass. Do not change guide taxonomy, legal/privacy behavior, language defaults, or refactor the shared layout in this package.

The owner still needs to push/deploy the working-copy changes before live status can be trusted.

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
