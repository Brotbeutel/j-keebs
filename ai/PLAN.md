# Plan

## Roles

| Role | Who | Does | Does not |
| --- | --- | --- | --- |
| **Planner** | This project’s planning chat | Priority, scope, architecture calls, updating this file | Implement site changes in the same session unless the owner asks |
| **Implementer** | A **new** chat | Execute the current work package only | Re-plan, add SSG, “while I’m here” refactors |
| **Owner** | Jannik | Approves scope changes, commits, deploy | — |

If an implementer finds a new issue: add it to `BACKLOG.md` under the right priority and keep going on the current package. Do not start P1 work in a P0 session.

## Sequence

1. **P0 — URLs work** (next chat) — see package below
2. **P1 — structure** — layout/SSG decision, contact form, language story  
   SSG is **deferred**. Prefer Eleventy later if chrome drift still hurts. Not Jekyll. Not Astro unless we later commit to i18n routes + image pipeline. Not React.
3. **P2 — performance / a11y**
4. **P3 — content / README honesty**

Do not skip ahead. P0 is still undone.

## Current work package: P0

**Goal:** Every important click and every canonical URL resolves to one real page.

**In scope**

1. Replace `article-j80-3000-second-life.html` with `blog-j80-3000-zweites-leben.html` everywhere it is linked (`index.html`, `blog.html`; grep the repo for stragglers). Optional: leave a tiny redirect stub at the old name so leftover bookmarks do not 404.
2. Canonical English filenames: `about.html`, `contact.html`, `privacy.html`, `terms.html`.
3. Turn `ueber-uns.html`, `kontakt.html`, `datenschutz.html`, `agb.html` into **redirect stubs** (canonical + meta refresh + one visible link). Do not keep a second full copy of the page.
4. Fix `canonical`, `og:url`, and FormSubmit `_next` so they point at the English filenames (`contact.html`, not `kontakt.html`).
5. Rebuild `sitemap.xml`: include the canonical pages, include the homepage, **do not** list the redirect stubs as equal URLs (or list them only if you also set canonical correctly — prefer omitting stubs).

**Out of scope**

- Eleventy / Astro / Jekyll / new folders for templates
- i18n rewrite, theme, fonts, images
- Nav/footer redesign
- Contact captcha / FormSubmit vendor change (except `_next` URL)
- README marketing claims
- Committing unless the owner asks

**Done when**

- Grep finds no `article-j80-3000-second-life.html` as a live `href` (stub only, if added)
- Opening about/contact/privacy/terms works; the four German names only redirect
- `sitemap.xml` matches the canonical set
- `ai/STATUS.md` and `ai/BACKLOG.md` are updated

**Redirect stub pattern** (GitHub Pages has no real 301):

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=about.html">
  <link rel="canonical" href="https://brotbeutel.github.io/about.html">
  <title>Weiterleitung…</title>
</head>
<body>
  <p><a href="about.html">Weiter zur Seite</a></p>
</body>
</html>
```

Use the matching target for each stub (`contact.html`, `privacy.html`, `terms.html`).

## After P0

Come back to the planner chat (or paste the “Planner: after P0” prompt). Next likely package is still not an SSG — it is verifying the live Pages deploy, then a **proposal-only** Eleventy discussion.
