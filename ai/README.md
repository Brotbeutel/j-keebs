# The `ai/` folder — map

Shared memory of the humans and AI agents working on J-Keebs. **Start with [`../AGENTS.md`](../AGENTS.md)** (roles, ground rules), then the project overview [`../readme.md`](../readme.md). This file is only the map: which file answers which question. Chat history is not the source of truth — these files are.

| File | Answers | Who reads it |
| --- | --- | --- |
| `STATUS.md` | Where do we stand? Deployed vs. local, tool results, open findings, what is in flight | everyone, first |
| `PLAN.md` | What is the **one** current work package, its scope, out-of-scope and "Done when"? | Planner (writes), Implementer (executes) |
| `BACKLOG.md` | What was found, by whom, how severe — plus owner requests, next candidates, workflow proposals | Planner, Implementer |
| `DECISIONS.md` | Which decisions are final and must not be reopened? | everyone |
| `GOALS.md` | Mission, non-goals, the launch bar | everyone |
| `CONVENTIONS.md` | How we build and verify: Eleventy rules, i18n, images, fonts, legal pages, roles, owner commands (PowerShell) | Implementer, Planner |
| `TOOLS.md` | The check scripts in `scripts/`, how to run them, the expected baseline, what they cannot see | Implementer, Planner, Designer, Lawyer |
| `PROMPTS.md` | Copy-paste prompts for each role and the current task lines | Owner |
| `CONTENT.md` | Writer brief: mission, voice, house style, fact sources, content register | Writer |
| `DESIGN.md` | Designer brief: identity, principles, constraints, active design briefs | Designer |
| `LEGAL.md` | Lawyer brief: limits, data-flow inventory, legal-page register, open legal questions | Lawyer |
| `USERNOTES.md` | Scratchpad for quick owner notes; the planner folds it into the files above and clears it | Owner (writes), Planner |
| `drafts/` | Writer, Designer and Lawyer deliverables (`draft` → `owner-approved` → `integrated`) | the owner approves; an Implementer integrates |

Related folders outside `ai/`: `scripts/` (checks), `design/` (Designer prototypes, never published), `win2k-design/` (the owner's original Win2k drafts), `content/` (owner's private source material, git-ignored).

Keep this map short. When you add a file to `ai/`, add one row here and, if a role must read it, one mention in `AGENTS.md`.
