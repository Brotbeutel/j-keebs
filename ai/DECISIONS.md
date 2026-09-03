# Decisions

Record only choices that a later agent would otherwise reverse by accident.

| Date | Decision | Why |
| --- | --- | --- |
| 2026-09-01 | Vanilla HTML/CSS/JS on GitHub Pages | No build step, easy to host, owner can edit files directly. |
| 2026-09-01 | Client-side DE/EN i18n (`data-i18n`) | Fast to add without a generator. Trade-off: crawlers and no-JS see one language. Revisit when adding a layout/SSG. |
| 2026-09-01 | English as JS default (`DEFAULT_LANG = "en"`) | Intentional in `main.js` comment; conflicts with German HTML. Resolve as part of the language-story backlog item, not as a drive-by. |
| 2026-09-01 | Legal pages German-only | Binding text; do not machine-translate Impressum/Datenschutz/AGB. |
| 2026-09-01 | FormSubmit for contact | No backend. Privacy page already discloses it. Do not add a second form vendor. |
| 2026-09-01 | `ai/` folder is the agent memory | Chats are not durable. Status and backlog live here. |
| 2026-09-01 | No React rewrite for now | Chrome duplication is the pain; an SSG is not the next step. |
| 2026-09-01 | SSG deferred until after P0 | Jekyll is a poor fit on Windows. Astro is for later i18n routes + images. If we add a generator, prefer Eleventy. P0 stays vanilla. |
| 2026-09-01 | Planner vs implementer chats | Planner owns `PLAN.md`. Implementer executes one work package in a new chat and does not re-plan. |
