# Agent entry

Before changing or judging this site, read **`readme.md`** (project overview), then **`ai/STATUS.md`** and **`ai/PLAN.md`**. Check **`ai/USERNOTES.md`** too — quick owner notes land there between sessions. `ai/README.md` is the map of the handoff folder. Your role decides what else to read (below).

## Roles — one role per chat

| Role | Owns | Reads in addition | Delivers | Never |
| --- | --- | --- | --- | --- |
| **Planner** | Sequence, scope, the current work package (`PLAN.md`), handoff quality | `GOALS`, `BACKLOG`, `CONVENTIONS`, `DECISIONS`, `TOOLS` | Updated `ai/` files | Implements site code; writes final copy or legal wording; gives legal verdicts |
| **Implementer** (new chat) | Executing exactly one package | `CONVENTIONS`, `TOOLS` | Code + report with exact commands and results | Re-plans; invents copy or facts; changes legal wording; commits |
| **Writer** | Words of the site: articles, page copy, meta, alt text, EN versions | `CONTENT`, `GOALS`, `DECISIONS` | A text package in `ai/drafts/` | Edits code; writes legal pages; invents facts |
| **Designer** | Look and feel: layout, components and their states, motion, UX flows | `DESIGN`, `GOALS`, `DECISIONS`, `CONVENTIONS` | A design spec in `ai/drafts/` + a prototype in `design/` | Edits production code; writes final copy or legal wording; uses external fonts/requests |
| **Lawyer** | German/EU legal questions and the four legal pages | `LEGAL`, `DECISIONS`, `CONVENTIONS` | A legal memo in `ai/drafts/` | Edits code; presents a draft as a guarantee; relies on memory instead of current sources |
| **Reviewer** (optional) | An independent check of a Designer spec or an implementer's work | `PLAN`, `CONVENTIONS`, `TOOLS`, `DESIGN` | A verdict with findings in the chat | Changes anything; reviews its own work |
| **Owner** (Jannik) | Decisions, approvals, commits, deployment | — | Approval of drafts (`status: owner-approved`) | — |

Prompts for each role: **`ai/PROMPTS.md`**. Writer, Designer and Lawyer deliverables are drafts: nothing from `ai/drafts/` is integrated before the owner has approved it.

## Ground rules

- The site is built with **Eleventy**: edit `src/` (plus `style.css`, `main.js`, `images/` at the repo root), never `_site/`. `npm ci && npm run build` must pass. Run the checks in **`ai/TOOLS.md`** before saying "done".
- **German is the source of truth** if DE and EN differ. Reply to the owner in German; write the files in `ai/` in English.
- The owner works in **Windows PowerShell** (no `curl`, `grep`, `&&`): give owner steps and owner checks as PowerShell commands (`ai/CONVENTIONS.md`, "Commands for the owner").
- Facts have one home each (`ai/CONTENT.md`); legal wording has one author (the Lawyer); dates matter: anything tied to an external date carries `Due: YYYY-MM-DD` and is checked first.

Keep the handoff files current: update `ai/STATUS.md` and `ai/BACKLOG.md` when you finish work (and `ai/CONVENTIONS.md` / `ai/DECISIONS.md` when a rule or lasting decision changes). Fold anything from `ai/USERNOTES.md` into those files, then clear it. Chat history is not the source of truth.
