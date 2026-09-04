# AI handoff

This folder is the memory for anyone (human or model) picking up J-Keebs without the previous chat.

**Read in this order at the start of a session:**

1. [STATUS.md](STATUS.md) — what is true right now
2. [PLAN.md](PLAN.md) — roles, sequence, **current work package** (implementers: this is the spec)
3. [GOALS.md](GOALS.md) — what we are building and what we are not
4. [BACKLOG.md](BACKLOG.md) — full issue list (do not pull extra items into the current package)
5. [CONVENTIONS.md](CONVENTIONS.md) — how to change this site without making it worse
6. [PROMPTS.md](PROMPTS.md) — session starters
7. [USERNOTES.md](USERNOTES.md) — quick owner notes since the last update, if any

**Roles:** planning happens in a planner chat (`PLAN.md`). Implementation happens in a **new** chat that executes only the current package. See `PLAN.md`.

**After finishing work:** update `STATUS.md` and check off / move items in `BACKLOG.md`. Fold anything in `USERNOTES.md` into those files, then clear it — it's a scratchpad, not a record. If you made a lasting product or architecture choice, add it to [DECISIONS.md](DECISIONS.md). Do not leave the only record of the work in the chat.

Keep these files short and factual. Prefer "done / not done / blocked" over narrative. Do not duplicate the full site README here.
