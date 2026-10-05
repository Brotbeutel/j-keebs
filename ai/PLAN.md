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
2. ~~P1 / P1-A / P1-B~~ ✅ done and deployed
3. ~~P2-A interaction/visual polish~~ ✅ done and deployed
4. ~~P2-B / P2-C Eleventy migration~~ ✅ done and deployed
5. ~~P2-D repo hygiene, fonts, fixes~~ ✅ done and deployed
6. ~~P2-E image pipeline~~ ✅ done and deployed (`1a9325f`)
7. **P2-E2 — icons and social previews** ← current package (below)
8. P2-F — Eleventy data model (computed URLs, i18n data, blog collection, generated sitemap)
9. P2-remaining — a11y items
10. P3 — content / README honesty

Do not skip ahead.

## Current work package: P2-E2 — Icons and social previews

**Goal:** Fix the meta/icon gaps identified in BACKLOG R9 so every page has a proper social preview image, a correct favicon, and complete OG/Twitter metadata.

**Background (from R9):**
- `og:image` is missing on 10 pages (about, contact, faq, guides, partner, switches, cookies, impressum, privacy, terms)
- The homepage and keyboards `og:image` is the portrait `Werkbank_Hero.jpg` (526×1113) — poor link preview (target: 1200×630 landscape)
- No `twitter:description` on any page
- No `og:site_name` on any page
- `apple-touch-icon` points at a 238 KB 512×512 `.ico` — Apple expects PNG, 180×180
- Very short meta descriptions on legal/contact pages (32–62 chars)

**In scope**

1. Create a default social preview image (1200×630, landscape) for the site. This can be a designed card with the J-Keebs logo and brand colors, or a well-cropped keyboard photo. Place the source in `images/` and let the image pipeline handle WebP conversion. Set it as the default `og:image` in `base.njk` so every page gets one automatically.
2. For pages that already have a specific `og:image` (blog posts with article photos), keep the per-page image — just make sure it's a reasonable aspect ratio for social previews. If any are portrait-oriented, crop/replace or use the default instead.
3. Generate a proper `apple-touch-icon` (180×180 PNG) from the existing icon/logo. Place it in the repo root or `images/`. Update `base.njk` to reference it.
4. Add `og:site_name` ("J-Keebs") to `base.njk`.
5. Add `twitter:description` to `base.njk` (use the page's `description`).
6. Review and improve meta descriptions on legal/contact pages — aim for 50–160 characters, accurate and useful.
7. Ensure `og:image` URLs are absolute (`https://brotbeutel.github.io/j-keebs/images/...`). Note: `og:image` should reference the *original* file in `images/` (not the generated WebP in `img/`), since social crawlers expect JPEG/PNG and may not support WebP.

**Out of scope**

- Content changes beyond meta descriptions
- Translating or rewriting visible page copy
- The dual-theme brand logo request
- Gallery a11y fixes
- Data model refactors (P2-F)
- CSS or layout changes

**Done when**

- Every page has an `og:image`, `og:site_name`, and `twitter:description`
- The default social image is 1200×630 landscape
- `apple-touch-icon` is a 180×180 PNG
- `npm run build` passes; `python scripts/check_links.py _site` → 0 errors
- Meta descriptions on legal/contact pages are 50–160 chars
- `ai/STATUS.md` and `ai/BACKLOG.md` updated

## After P2-E2

Return to the planner chat. Next is P2-F (Eleventy data model: computed URLs, i18n as data files, blog collection, generated sitemap/robots).
