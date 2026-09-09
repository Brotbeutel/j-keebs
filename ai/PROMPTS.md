# Useful prompts

Paste these at the start of a **new** chat. The agent must still read `ai/STATUS.md` and `ai/PLAN.md`.

## Implementer

```
You are the implementer, not the planner.

Read ai/README.md, ai/STATUS.md, ai/PLAN.md (current work package), and ai/CONVENTIONS.md.

Execute only what PLAN.md's "Current work package" section specifies. If it says nothing is queued, stop and tell me — do not invent scope.

For the current P1-B package, implement only the guide information architecture described in PLAN.md:

- Add a Keycaps category to guides.html, including its jump-navigation entry, section anchor, category copy, status count, and a truthful initial card state. Do not imply a finished guide unless a real guide exists.
- Make the primary “Guides & Tutorials” navigation control navigate to guides.html while retaining the existing dropdown behavior for category links.
- Preserve keyboard access, mobile accordion behavior, current-page indication, outside-click closing, and the existing DE/EN i18n pattern across every page containing the shared navigation.
- Update footer or secondary navigation where it presents the category structure so it remains consistent with the new Keycaps category.

Preserve the existing vanilla HTML/CSS/JS architecture and page structure.

Out of scope unless PLAN.md explicitly changes: homepage redesign, map behavior, fullscreen viewer, branding/assets, About-page content, SSG/layout migration, translating visible page copy to English, README changes, unrelated refactors, and committing.

If you discover a new issue, record it in ai/BACKLOG.md under the appropriate priority and continue the current package. Do not pull the new issue into the current implementation.

When done: verify against PLAN.md's "Done when" criteria. Confirm that guides.html exposes Switches, Plates, Mods, and Keycaps consistently; the parent nav label reaches guides.html; the dropdown still opens and exposes category links; mobile and keyboard interaction remain usable; both language dictionaries contain the required keys; and internal-link, anchor, and markup checks pass. Update ai/STATUS.md and ai/BACKLOG.md, and list files you changed.
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
