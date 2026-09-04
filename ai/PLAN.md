# Plan

## Roles

| Role | Who | Does | Does not |
| --- | --- | --- | --- |
| **Planner** | This project's planning chat | Priority, scope, architecture calls, updating this file | Implement site changes in the same session unless the owner asks |
| **Implementer** | A **new** chat | Execute the current work package only | Re-plan, add SSG, "while I'm here" refactors |
| **Owner** | Jannik | Approves scope changes, commits, deploy | — |

If an implementer finds a new issue: add it to `BACKLOG.md` under the right priority and keep going on the current package. Do not start a later package in an earlier session.

## Sequence

1. ~~**P0 — URLs work**~~ ✅ done (see `BACKLOG.md` → Done). One residual check carried forward into P0-B.
2. **P0-B — Base-URL after repo rename** (current, see package below)
3. **P0-C — Blog files → English slugs** (queued next, same implementer session as P0-B is fine)
4. **P1 — structure** — layout/SSG decision, contact form (CORS/captcha). Language story is now **partly resolved**: English is the confirmed default (see `DECISIONS.md`/`CONVENTIONS.md`); the remaining piece — `lang="en"` vs. German visible copy — is an accepted trade-off, not open work, unless the owner later greenlights a full English content rewrite.
   SSG is **deferred**. Prefer Eleventy later if chrome drift still hurts. Not Jekyll. Not Astro unless we later commit to i18n routes + image pipeline. Not React.
5. **P2 — performance / a11y** — includes the fullscreen-viewer centering bug (see `BACKLOG.md`)
6. **P3 — content / README honesty**

Do not skip ahead.

## Current work package: P0-B

**Goal:** Every absolute URL in the project points at the real live path, `https://brotbeutel.github.io/j-keebs/…`, not the old root URL.

**In scope**

1. `canonical` + `og:url` on every HTML page (index, about, blog, blog-*.html ×7, keyboards, guides, switches, faq, partner, contact, impressum, privacy, terms, cookies, 404, `article-j80-3000-second-life.html` stub) — add the `/j-keebs/` segment.
2. `og:image` / `twitter:image` on `blog.html` and all 7 `blog-*.html` posts — add the `/j-keebs/` segment.
3. JSON-LD `"url"` in `index.html` — add the `/j-keebs/` segment.
4. `contact.html`: FormSubmit `_next` → `https://brotbeutel.github.io/j-keebs/contact.html?sent=1`.
5. Rebuild `sitemap.xml`: every `<loc>`, including the homepage entry, gets the `/j-keebs/` segment.
6. `robots.txt`: `Sitemap:` line gets the `/j-keebs/` segment.
7. `404.html`: convert its root-absolute paths (stylesheet, script, nav, footer, hero buttons — currently `/index.html`, `/style.css`, `/main.js`, etc.) to `/j-keebs/`-prefixed absolute paths. **Do not** make them relative — a 404 page can be hit from any URL depth, relative paths would break there.
8. Sanity check: confirm the renamed repo's GitHub Pages settings still publish from the right branch/folder.
9. Verify whether `kontakt.html`, `ueber-uns.html`, `datenschutz.html`, `agb.html` actually exist as redirect stubs in the repo (flagged as unconfirmed in the last P0 review). If missing, either add them or strike the claim from `BACKLOG.md`'s Done note.

**Out of scope**

- SSG/Eleventy, layout consolidation
- Contact-form CORS/captcha (existing P1 item)
- i18n / visible-text language rewrite
- Fullscreen-viewer centering (own `BACKLOG.md` item, P2)
- Committing, unless the owner asks

**Recommendation:** this is exactly the kind of sitewide mechanical change the project's Python generator script exists for. Extend it with an assert guard: no HTML file, `sitemap.xml`, or `robots.txt` may contain `brotbeutel.github.io/` **not** followed by `j-keebs/`.

**Done when**

- Repo-wide search finds no absolute URL pointing at `brotbeutel.github.io/` without `/j-keebs/` (the sitemap.xml XML namespace URI is exempt — it's a schema string, not this domain)
- `sitemap.xml` and `robots.txt` match the live base path
- Contact form manually tested: the post-submit redirect lands on a real page
- `404.html` loads its styles/scripts and all links work, including when hit at a deep/nonexistent nested path
- `ai/STATUS.md`, `ai/BACKLOG.md` updated; this section replaced with P0-C as current

## Next queued package: P0-C

**Goal:** The 5 blog files below live under their new English slugs; every old URL redirects; nothing links to an old filename.

**Rename table (owner-approved 2026-09-03):**

| Old | New |
| --- | --- |
| `blog-anfang.html` | `blog-getting-started.html` |
| `blog-alte-tastaturen.html` | `blog-old-keyboards.html` |
| `blog-tastaturen-fuer-andere.html` | `blog-keyboards-for-others.html` |
| `blog-j80-3000-zweites-leben.html` | `blog-j80-3000-second-life.html` |
| `blog-10-euro-ps2-stecker.html` | `blog-10-euro-ps2-connector.html` |
| `blog-tofu65-v2.html` | *unchanged* (product name, already language-neutral) |
| `blog-corsair-k70.html` | *unchanged* (product name, already language-neutral) |

**In scope**

1. Rename the 5 files per the table.
2. Old filenames become redirect stubs (meta refresh + canonical), same pattern as below.
3. Fix the prev/next chain across all 7 `blog-*.html` files — including the two unchanged files, since their neighbors' names changed.
4. Update `blog.html` (featured card + teaser grid) and `index.html` (J80-3000 project link).
5. Update `sitemap.xml`.
6. Set `canonical` / `og:url` / `og:image` / `twitter:image` on the renamed files directly with the final `/j-keebs/`-prefixed URL — don't set it once for P0-B and again for the rename.
7. Point the existing `article-j80-3000-second-life.html` stub at the new `blog-j80-3000-second-life.html` (the two names are now very similar — `article-` vs. `blog-` — that's fine, just make sure the redirect target is right).

**Out of scope**

- Post content itself (stays German, see language decision)
- Any slug not in the table above
- P1 items (layout, contact-form CORS, SSG)

**Done when**

- Grep finds none of the 5 old filenames as a live `href` (stub targets only)
- prev/next works end-to-end from post 1 through post 7
- `sitemap.xml` and every renamed post's `og:*` tags match the final `/j-keebs/` URLs
- `ai/STATUS.md`, `ai/BACKLOG.md` updated

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

Use the matching target for each stub. Canonical must include the `/j-keebs/` base path now — old P0-era stubs predate the rename and may not have it yet (see P0-B item 9).

## After P0-B / P0-C

Come back to the planner chat. Next likely package is still not an SSG — it's the deferred proposal-only Eleventy discussion, now slightly more motivated since a subpath change like this one is exactly the kind of drift a real templating layer would have absorbed automatically.
