# Useful prompts

Paste these at the start of a **new** chat. The agent must still read `ai/STATUS.md` and `ai/PLAN.md`.

## Implementer

```
You are the implementer, not the planner.

Read ai/README.md, ai/STATUS.md, ai/PLAN.md (current work package), and ai/CONVENTIONS.md.

Execute only what PLAN.md's "Current work package" section specifies. If it says nothing is queued, stop and tell me — do not invent scope.

Out of scope: anything not explicitly listed in the current package, SSG, translating visible page copy to English, README, new features, committing unless I ask.

When done: verify against the package's "Done when" criteria, update ai/STATUS.md and ai/BACKLOG.md, list files you changed.
```

## Planner: after current package

```
You are the planner. Read ai/STATUS.md, PLAN.md, and BACKLOG.md.
Confirm the current work package against PLAN.md "Done when". Propose the next work package only — do not implement.
```

## Takeover (no code)

```
Read ai/README.md, STATUS.md, PLAN.md, GOALS.md, and BACKLOG.md.
Summarise current status in 5 bullets. Do not write code until I pick an item.
```

## Review only

```
Read ai/STATUS.md. Re-review pages changed since that file's Updated date.
Do not implement. Add new issues to BACKLOG.md only.
```
