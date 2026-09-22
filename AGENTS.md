# Agent entry

Before changing this site, read **`ai/README.md`**, then **`ai/STATUS.md`** and **`ai/PLAN.md`**. Check **`ai/USERNOTES.md`** too — quick owner notes land there between sessions.

- **Planner** owns sequence and the current work package (`PLAN.md`).
- **Implementer** (new chat) executes only that package.
- The site is built with **Eleventy**: edit `src/` (plus `style.css`, `main.js`, `images/` at the repo root), never `_site/`. `npm ci && npm run build` must pass.
- **German is the source of truth** if DE and EN differ.
- The owner works in **Windows PowerShell** (no `curl`, `grep`, `&&`): give owner steps and owner checks as PowerShell commands (`ai/CONVENTIONS.md`, "Commands for the owner").

Keep the handoff files current: update `ai/STATUS.md` and `ai/BACKLOG.md` when you finish work (and `ai/CONVENTIONS.md` / `ai/DECISIONS.md` when a rule or lasting decision changes). Fold anything from `ai/USERNOTES.md` into those files, then clear it. Chat history is not the source of truth.
