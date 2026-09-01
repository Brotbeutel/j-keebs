# Useful prompts

Paste these at the start of a **new** chat. The agent must still read `ai/STATUS.md` and `ai/PLAN.md`.

## Implementer: P0 (use this next)

```
You are the implementer, not the planner.

Read ai/README.md, ai/STATUS.md, ai/PLAN.md (current work package: P0), and ai/CONVENTIONS.md.

Execute only the P0 package in PLAN.md: fix J80 links, collapse duplicate URLs into redirect stubs, fix canonical/og:url/FormSubmit _next, rebuild sitemap.xml.

Out of scope: SSG, i18n rewrite, CSS/JS refactors, README, new features, committing unless I ask.

When done: grep for leftover old hrefs, update ai/STATUS.md and ai/BACKLOG.md, list files you changed.
```

## Planner: after P0

```
You are the planner. Read ai/STATUS.md, PLAN.md, and BACKLOG.md.
P0 should be done. Confirm against PLAN.md “Done when”. Propose the next work package only — do not implement.
```

## Takeover (no code)

```
Read ai/README.md, STATUS.md, PLAN.md, GOALS.md, and BACKLOG.md.
Summarise current status in 5 bullets. Do not write code until I pick an item.
```

## Review only

```
Read ai/STATUS.md. Re-review pages changed since that file’s Updated date.
Do not implement. Add new issues to BACKLOG.md only.
```
