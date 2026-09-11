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
2. ~~P1 contact-form + P1-A brand + P1-B guides~~ ✅ done and deployed
3. ~~P2-A — interaction/visual polish~~ ✅ done and deployed
4. **P2-B — Eleventy migration preparation** ← current package (see below)
5. P2-C — Eleventy full migration (after P2-B is reviewed)
6. P2-remaining — performance/a11y items (fonts, images, theme boot, gallery a11y)
7. P3 — content / README honesty

Do not skip ahead.

## Current work package: P2-B — Eleventy migration preparation

**Goal:** Bootstrap the Eleventy toolchain, establish the source/output boundary, build the shared layout, and migrate one representative page — without changing the live site deployment.

**Prerequisites (now met):**
- ✅ Node.js v24.19.0 available
- ✅ Eleventy 3.1.6 installed as devDependency

**In scope**

1. Read `ai/ELEVENTY-MIGRATION.md` before editing — it documents the migration guardrails, inventory, and proposed directory structure.
2. Create an Eleventy config file (`.eleventy.js` or `eleventy.config.js`) with:
   - Source directory: `src/`
   - Output directory: `_site/`
   - Passthrough copy for `images/`, `style.css`, `main.js`, `robots.txt`, `sitemap.xml`
3. Add `node_modules/` and `_site/` to `.gitignore`.
4. Add `"build": "npx @11ty/eleventy"` and `"dev": "npx @11ty/eleventy --serve"` to `package.json` scripts.
5. Create the `src/` directory structure:
   - `src/_includes/` — shared layout(s)
   - `src/_data/` — site-level data (base URL, site name, nav items)
   - `src/pages/` — page content files
6. Build a base layout template (`src/_includes/layout.njk` or `.liquid`) containing the shared `<head>`, `<header>` (nav with guides dropdown), `<footer>`, theme boot script, and Google Fonts links. Extract this from the **current `about.html`** as the canonical source, resolving any drift from other pages.
7. Migrate `about.html` as the representative page:
   - Create `src/pages/about.njk` (or `.html`) using the base layout
   - Move page-specific content and i18n dictionary into the template
   - Preserve the output URL as `about.html` at the root
8. Compare generated `_site/about.html` against the legacy root `about.html`:
   - URL and canonical/og:url metadata match
   - Navigation links and dropdown work
   - Assets (CSS, JS, images, fonts) load correctly
   - Responsive layout matches at desktop and mobile widths
9. Create a migration inventory document listing all 21 canonical pages with their shared chrome elements, page-specific i18n keys, and any page-specific `<style>` or `<script>` blocks.
10. Do **not** delete or replace the legacy root `about.html`. The Eleventy output is a parallel proof, not a deployment replacement.

**Out of scope**

- Migrating more than one page
- Deleting or replacing any legacy root HTML files
- Changing the GitHub Pages deployment source
- Adding Astro, React, or any other framework
- Content translation or rewriting
- The dual-theme brand logo request (separate backlog item)

**Done when**

- `npx @11ty/eleventy` runs without errors and produces `_site/` with the about page and all passthrough assets
- `_site/about.html` matches the legacy page in URL, metadata, nav, footer, and visual output
- `.gitignore` includes `node_modules/` and `_site/`
- A migration inventory exists (in `ai/ELEVENTY-MIGRATION.md` or a new doc)
- `ai/STATUS.md` and `ai/BACKLOG.md` are updated
- Legacy root files remain untouched

## Redirect stub pattern

GitHub Pages has no real 301, so a rename leaves a stub at the old filename. **Note:** the owner has deleted all existing redirect stubs from the repo as of 2026-09-11. Old URLs for German page names and old blog slugs will 404.

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

## After P2-B

Return to the planner chat. The planner will review the generated representative page, then scope P2-C (full migration of remaining pages) if the proof passes.
