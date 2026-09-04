# Useful prompts

Paste these at the start of a **new** chat. The agent must still read `ai/STATUS.md` and `ai/PLAN.md`.

## Implementer: P0-B + P0-C (use this next)

```
You are the implementer, not the planner.

Read ai/README.md, ai/STATUS.md, ai/PLAN.md (current work package: P0-B, then queued P0-C), and ai/CONVENTIONS.md.

Execute P0-B first: fix canonical/og:url/og:image/twitter:image/JSON-LD url/FormSubmit _next/sitemap.xml/robots.txt/404.html so every absolute URL uses the /j-keebs/ base path. Then execute P0-C: rename the 5 blog files per the table in PLAN.md, fix the prev/next chain across all 7 posts, update blog.html/index.html, rebuild sitemap.xml, add redirect stubs.

Out of scope: SSG, translating visible page copy to English, CSS/JS refactors beyond what's needed, README, new features, committing unless I ask.

When done: grep for leftover old base URLs and old blog filenames, update ai/STATUS.md and ai/BACKLOG.md, list files you changed.
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
