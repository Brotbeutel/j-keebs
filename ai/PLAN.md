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
6. ~~**P2-A — interaction / visual polish**~~ ✅ done locally 2026-09-09; deployment remains unverified
7. **P2-B — Eleventy migration preparation** — current package below. Establish the toolchain, reversible source/output boundary, migration inventory, and one representative generated page. Do not cut over deployment.
8. **P3 — content / README honesty**

Do not skip ahead.

## Current work package

**P2-B — Eleventy migration preparation**

Implement only this package in the next implementer chat:

- Read `ai/ELEVENTY-MIGRATION.md` before editing.
- Verify the Node.js/npm toolchain. If unavailable, do not fake a build; record the blocker in `ai/STATUS.md` and stop after updating the migration notes.
- Add the minimal Eleventy project bootstrap and reproducible local build command only when the toolchain is available.
- Establish a reversible source/output boundary beside the legacy root HTML. Do not replace, delete, or move published root pages.
- Configure asset/static passthrough for `images/`, `style.css`, `main.js`, and required root metadata files without changing their public URLs.
- Create a complete migration inventory for canonical pages, redirect stubs, blog posts, shared chrome, page dictionaries, assets, and absolute `/j-keebs/` URLs.
- Migrate exactly one representative non-legal page beside its legacy source and compare its generated URL, metadata, navigation, assets, and responsive behavior.

Done when: `ai/ELEVENTY-MIGRATION.md` is current; the build command is reproducible or the missing-toolchain blocker is explicitly recorded; the legacy root remains untouched as the fallback; the inventory covers every URL/content/asset contract; one representative page has a side-by-side generated output; and focused URL, asset, metadata, and markup checks pass. Do not cut over GitHub Pages, delete legacy files, migrate legal pages, translate visible copy, start Astro/React, or redesign the site in this package.

The owner still needs to push/deploy the existing working-copy changes before live status can be trusted.

After P2-B, return to the planner to evaluate the generated representative page before expanding the migration. Astro remains deferred until Eleventy has been evaluated against the finished site.

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

Come back to the planner chat after P2-A to scope the approved Eleventy preparation package. The migration is intentionally incremental because chrome duplication across ~24 pages is the standing maintenance cost of the current vanilla structure; do not cut over deployment until the side-by-side proof and URL checks pass.
