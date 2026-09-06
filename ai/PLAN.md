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
4. **P1 — structure** — contact form is ✅ done (tested live, no fix needed). Remaining: layout/SSG decision — still a **planner discussion**, not yet a work package. Language story is resolved (English default, German copy stays; see `DECISIONS.md`).
5. **P2 — performance / a11y** (see `BACKLOG.md`) — the sun-icon fix is done; nothing else is scoped into a concrete package yet. Next planner session should pick one slice (the fullscreen-viewer centering bug is small and standalone — obvious first pick) rather than handing over the whole list at once.
6. **P3 — content / README honesty**

Do not skip ahead.

## Current work package

**None queued.** Everything through P0-C and the P1 contact-form check is done and live. Before starting an implementer session again, come back to the planner chat to scope the next slice — likely a small P2 package (fullscreen-viewer centering is the obvious first pick) or the deferred layout/SSG conversation.

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
