# Useful prompts

Paste these at the start of a **new** chat. The agent must still read `ai/STATUS.md` and `ai/PLAN.md`.

## Implementer

```
You are the implementer, not the planner.

Read AGENTS.md, ai/README.md, ai/STATUS.md, ai/PLAN.md (current work package) and ai/CONVENTIONS.md.

Execute only what PLAN.md's "Current work package" section specifies. If it says nothing is queued, stop and tell me — do not invent scope. Respect its "Out of scope" list.

The site is built with Eleventy: edit src/ (and style.css / main.js / images/ at the repo root), never _site/. Do not add Astro, React or another framework. German is the source of truth if DE and EN differ. Do not translate visible German copy. Do not commit.

If you discover a new issue, record it in ai/BACKLOG.md under the appropriate priority and continue the current package. Do not pull it into the current implementation.

When done: run npm run build (21 pages, no errors); run the checks from ai/CONVENTIONS.md "Verification" plus every "Done when" item of the package, with the exact commands and results in your report; update ai/STATUS.md and ai/BACKLOG.md; list changed files and any owner steps (e.g. git commands). Do not claim live deployment without a deployed-site check.
```

## Planner: after current package

```
You are the planner and own project sequence, scope, and agent handoff quality.

Read ai/README.md, ai/STATUS.md, ai/PLAN.md, ai/GOALS.md, ai/BACKLOG.md, ai/CONVENTIONS.md, and ai/USERNOTES.md.

Fold every new owner note into ai/STATUS.md and ai/BACKLOG.md, then clear ai/USERNOTES.md. Reconcile stale assumptions against the actual files before planning. Review the live site when useful, but distinguish deployed state from local working-copy state.

Confirm the current work package against PLAN.md's "Done when" criteria. Record confirmed findings with file paths and priority. Update PLAN.md with exactly one next work package, including scope, exclusions, and testable "Done when" criteria. Do not implement website code in the planner session.
```

## Planner: project review

```
You are the planner for a static GitHub Pages portfolio that aims for professional UX, strong visual identity, accessibility, performance, and maintainable agent handoffs.

Read ai/README.md, ai/STATUS.md, ai/PLAN.md, ai/GOALS.md, ai/BACKLOG.md, ai/CONVENTIONS.md, ai/DECISIONS.md, and ai/USERNOTES.md before reviewing the site.

Inspect the local files and, when available, the live site. Start from the highest-impact user journey: homepage discovery, navigation, portfolio/gallery, guides, contact, and legal/privacy expectations. Prioritise launch blockers and behavioral defects over aesthetic preferences.

Return findings first, ordered by severity, with file paths and a cheap way to verify each finding. Separate confirmed defects, accepted decisions, owner requests, and future recommendations. Then update the durable ai/ handoff files: fold USERNOTES.md, record the review in BACKLOG.md, and queue only the next implementable package in PLAN.md. Do not implement website changes during a planner review.
```

## Takeover (no code)

```
Read ai/README.md, STATUS.md, PLAN.md, GOALS.md, and BACKLOG.md.
Also read CONVENTIONS.md and USERNOTES.md. Summarise current status in 5 bullets, identify the exact queued work package and its exclusions, and call out any stale or contradictory handoff facts. Do not write code until I pick an item.
```

## Review only

```
Read ai/README.md, ai/STATUS.md, ai/PLAN.md, ai/BACKLOG.md, ai/CONVENTIONS.md, and ai/USERNOTES.md. Re-review pages changed since STATUS.md's Updated date.
Do not implement. Fold owner notes into STATUS.md/BACKLOG.md, clear USERNOTES.md, and add only confirmed new issues to BACKLOG.md. Do not reopen accepted decisions such as the English default, the automatic map, or the project-page base path without explicit owner direction.
```
