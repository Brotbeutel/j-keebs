# Tools

Everything in `scripts/` is repo tooling. It reads files and prints a report; none of it is part of the built site. Run everything from the **repository root**, after `npm run build` (the checks read `_site/`). Python scripts use the standard library only; the Node script uses no packages.

## Catalog

| Tool | Answers | Command | Fails (exit 1) on | In CI |
| --- | --- | --- | --- | --- |
| `check_links.py` | Does every `href`/`src`/`srcset`/`#anchor`/CSS `url()` resolve inside `_site/`? | `python scripts/check_links.py _site` | any broken reference | yes |
| `tag_balance.py` | Are HTML tags balanced? | `python scripts/tag_balance.py _site` | any imbalance | yes |
| `i18n_audit.js` | Do DE and EN have the same keys, and does every `data-i18n` / `data-i18n-attr` key used in the built HTML exist in both languages? | `node scripts/i18n_audit.js` | key only in one language; key missing in DE or EN; dictionary not emitted by its page | no |
| `de_default_audit.py` | Is the German text in each template identical to the German dictionary value? (JS visitors only ever see the dictionary text.) | `python scripts/de_default_audit.py` | any template default that differs from its German dictionary value | no |
| `a11y_audit.py` | Static markup hygiene: duplicate ids, `<img>` without `alt`, `target=_blank` without `noopener`, unnamed links/buttons, unlabeled form controls (a wrapping `<label>`, a `<label for=id>`, `aria-label` or a hidden honeypot all count as labelled), exactly one `<h1>`, unique titles/descriptions; warnings for heading skips, inline handlers, focusable `div`s without role, description length. `--hosts` lists every external host per page. | `python scripts/a11y_audit.py` (add `--hosts`) | any ERROR (warnings never fail) | no |
| `img_report.py` | Before/after bytes per page of the image pipeline (static estimate) | `python scripts/img_report.py` | never | no |
| `generate_social_assets.js` | Regenerates the social preview/touch icon (needs `sharp`, a dev dependency). **Writes files.** | `node scripts/generate_social_assets.js` | — | no |

PowerShell runs all of these unchanged (separate lines, no `&&`). If `python` is not found, try `py`.

## Before you say "done" (all roles that touch the repo)

```
npm run build
python scripts/check_links.py _site
python scripts/tag_balance.py _site
node scripts/i18n_audit.js
python scripts/de_default_audit.py
python scripts/a11y_audit.py
```

Compare every result with the baseline below and report the exact output. A result that differs from the baseline is either a regression (fix it) or an intended change (update the baseline here in the same package).

## Baseline at source `76edb45` + owner-requested Win2k form, interaction and validation updates (working tree, 2026-10-17)

| Tool | Expected output today |
| --- | --- |
| `npm run build` | 22 HTML pages + `sitemap.xml` (21 URLs), no errors |
| `check_links.py` | 22 pages, 1252 references, 0 errors |
| `tag_balance.py` | 22 pages, 0 problems |
| `i18n_audit.js` | 0 errors, 13 INFO lines (page keys the page's own HTML does not reference — some are created by JS, including the form's validation messages; not defects) |
| `de_default_audit.py` | **3 findings, exit 1:** `about.html` `story.body` (R13), `faq.html` `q4.a3` and `switches.html` `t3.desc` (straight closing quote, R11). Target after P3-H: **0 findings**. |
| `a11y_audit.py` | 0 errors, 11 warnings: heading skip h1→h3 on 10 pages (R16: 404, faq, 8 blog articles incl. `blog-mechanicon-2026`) plus focusable `contact.html` `#mapEmbed` without role (R24). The contact title now uses an h2 and the reset button has no inline `onclick`; R14's reset behavior remains. Target after P3-H: 0 warnings. |

## What these tools cannot see

Rendering and layout; touch and keyboard behaviour; screen-reader output; colour contrast (R18 was computed by hand from the CSS tokens; use DevTools/Lighthouse); requests made at runtime (`--hosts` only sees hosts written into the HTML); keys that `main.js` builds dynamically; the live deployment; legal correctness. Those stay with browser checks by the owner (`CONVENTIONS.md`, "Commands for the owner") and with the Lawyer role.

## Who runs what

- **Implementer:** the full list above before reporting done; updates the baseline when a package intentionally changes a result.
- **Planner:** the full list at every review; compares with the baseline; records regressions in `BACKLOG.md`.
- **Writer:** after the owner has approved a text, the Writer's typography check (`ai/CONTENT.md`); the implementer then runs `de_default_audit.py` when integrating.
- **Designer:** `python scripts/a11y_audit.py design` on the folder with the prototype (it scans every HTML file in the given folder) as a sanity check before handing over.
- **Lawyer:** `python scripts/a11y_audit.py --hosts` as the starting point for the data-flow inventory in `ai/LEGAL.md`.

## Adding a tool

Standard library or plain Node only; a header comment with purpose, usage, exit code and limits; exit 1 only on real errors; read-only unless it is an asset generator; add it to the catalog and, if it has a stable result, to the baseline. Wiring checks into CI is a separate, owner-approved package (`BACKLOG.md` → "Workflow proposals").
