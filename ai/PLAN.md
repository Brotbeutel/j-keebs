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
4. ~~P2-B — Eleventy migration preparation~~ ✅ done (parallel proof verified)
5. **P2-C — Eleventy full migration** ← current package (see below)
6. P2-remaining — performance/a11y items (fonts, images, theme boot, gallery a11y)
7. P3 — content / README honesty

Do not skip ahead.

## Current work package: P2-C — Eleventy full migration

**Goal:** Migrate all 21 canonical pages from legacy root HTML to Eleventy templates, then switch the deployment source from the legacy root to `_site/`. After this package, `npm run build` produces the complete deployable site.

**Prerequisites (all met):**
- ✅ Eleventy config, base layout, site data, and passthrough copies established in P2-B
- ✅ `about.html` migrated and verified as the representative proof page
- ✅ Migration inventory at `ai/ELEVENTY-INVENTORY.md` documents all 21 pages
- ✅ `npm run build` runs cleanly

**In scope**

Migrate pages in family order per the inventory. For each page, create `src/pages/<name>.njk` with the base layout. Move page-specific content (the `<main>` body) into the template. Preserve the page's i18n dictionary, metadata, and any page-specific `<style>` or `<script>` blocks via front-matter variables (`extra_head`, `page_script`).

**Migration order:**

1. **Legal/static pages (no i18n dict, simplest):** `cookies.html`, `impressum.html`, `privacy.html`, `terms.html`
2. **Simple content pages:** `faq.html`, `switches.html`, `partner.html`
3. **Contact page (has FormSubmit + map iframe):** `contact.html`
4. **Listing pages:** `blog.html`, `guides.html`, `keyboards.html`
5. **Blog articles (7 posts, shared pattern):** `blog-getting-started.html`, `blog-old-keyboards.html`, `blog-keyboards-for-others.html`, `blog-j80-3000-second-life.html`, `blog-10-euro-ps2-connector.html`, `blog-tofu65-v2.html`, `blog-corsair-k70.html`
6. **Homepage (most complex, has JSON-LD + inline style):** `index.html`
7. **404 page (uses root-absolute paths):** `404.html`

**For each migrated page:**
- Output filename must match the legacy filename exactly (set `permalink:` in front-matter)
- Canonical URL, `og:url`, `og:image`, `twitter:*` must match the legacy page
- Active nav state (`active_nav`) must be correct per the inventory
- Page-specific i18n dictionary goes in `page_script` front-matter
- Any page-specific `<style>` blocks go in `extra_head` front-matter
- The fullscreen overlay is in the base layout — pages that don't use it still get it (harmless); confirm this doesn't break anything

**Special cases to handle:**
- `index.html`: has an inline `<style>` block AND a JSON-LD `<script>`. Use `extra_head` for the style, and include the JSON-LD in the content or `page_script`.
- `404.html`: currently uses `/j-keebs/...` root-absolute paths for assets. The Eleventy `pathPrefix` should handle this, but verify the output carefully.
- `contact.html`: contains the FormSubmit `<form>` and the auto-loading OpenStreetMap `<iframe>`. Preserve both exactly.
- Blog articles: the prev/next navigation links are page-specific content — keep them in each template's body, not in the layout.

**After all pages are migrated:**
- Run `npm run build` — all 21 pages should appear in `_site/`
- Spot-check at least 5 pages: verify title, canonical, og:url, nav active state, footer, i18n dictionary
- Run `npm run dev` and visually confirm the homepage and at least one blog post in the browser
- Delete the 21 legacy root `.html` files (they are now generated into `_site/`)
- Update `.gitignore` if needed
- Confirm GitHub Pages can be pointed at `_site/` output (or document the deployment change needed)

**Out of scope**

- Translating or rewriting any content
- Adding new pages or features
- The dual-theme brand logo request (separate backlog item)
- Performance/a11y fixes (P2-remaining)
- Introducing Astro or React

**Done when**

- `npm run build` produces all 21 pages in `_site/` without errors
- Every generated page matches its legacy counterpart in URL, metadata, nav, footer, and visual output
- Legacy root `.html` files are deleted (the Eleventy source in `src/` is now the single source of truth)
- Deployment path is documented (GitHub Pages → `_site/` or GitHub Actions build step)
- `ai/STATUS.md` and `ai/BACKLOG.md` updated

## Redirect stub pattern

GitHub Pages has no real 301, so a rename leaves a stub at the old filename. **Note:** the owner deleted all existing redirect stubs as of 2026-09-11. If redirects are needed in the future, use:

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

## After P2-C

Return to the planner chat. Next is P2-remaining (performance/a11y: unused fonts, image optimization, theme boot, gallery a11y) and then P3 (content/hygiene).
