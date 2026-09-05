# Plan

## Roles

| Role | Who | Does | Does not |
| --- | --- | --- | --- |
| **Planner** | This project's planning chat | Priority, scope, architecture calls, updating this file | Implement site changes in the same session unless the owner asks |
| **Implementer** | A **new** chat | Execute the current work package only | Re-plan, add SSG, "while I'm here" refactors |
| **Owner** | Jannik | Approves scope changes, commits, deploy | — |

If an implementer finds a new issue: add it to `BACKLOG.md` under the right priority and keep going on the current package. Do not start a later package in an earlier session.

## Sequence

1. ~~**P0 / P0-B / P0-C**~~ ✅ done (base-URL fixed, English slugs, deployed).
2. **P1 — structure** — layout/SSG (Eleventy preferred) & contact form (CORS/captcha). (current, see package below)
3. **P2 — performance / a11y** — includes the fullscreen-viewer centering bug.
4. **P3 — content / README honesty**

Do not skip ahead.

## Current work package: P1

**Goal:** Extract shared page structure (head, header, footer, theme script) into a centralized layout to prevent drift, and fix the contact form submission.

**In scope**

1. Setup a basic SSG (Eleventy is recommended as it keeps things close to vanilla HTML).
2. Create a base layout template that contains the shared `<head>`, `<header>` (nav), and `<footer>`, as well as the theme-boot logic.
3. Migrate all `.html` pages to use this layout. Ensure the nav drift (e.g. `blog.html` sun-icon SVG vs `index.html`) is resolved by using one single source of truth for the nav.
4. Contact form (`contact.html`): Fix the FormSubmit setup. Since JS `fetch` might fail CORS, implement a working no-JS `POST` fallback or fix the form configuration. Handle captcha (`_captcha` is currently `false`).

**Out of scope**

- Rewriting visible copy into English.
- Fullscreen viewer centering (P2).
- Adding complex image processing pipelines or bundlers (keep it simple HTML/CSS/JS).
- Committing, unless the owner asks.

**Recommendation:** Make sure the output folder of Eleventy matches what GitHub pages expects (or configure the action accordingly). Since this is currently a static repo without an SSG, introduce Eleventy minimalistically (e.g., just `_includes/layout.njk` or `.liquid`). The output needs to preserve the `/j-keebs/` base paths that were established in P0.

**Done when**

- Building the site via Eleventy outputs the same visual result and links for all pages.
- There is only one copy of the nav/header/footer code.
- Contact form submits successfully without CORS errors.
- `ai/STATUS.md` and `ai/BACKLOG.md` updated.
- This section replaced with P2 as current.

## After P1

Come back to the planner chat. Next package is P2 (Performance and a11y), which will address the fullscreen viewer centering bug and clean up unused assets.
