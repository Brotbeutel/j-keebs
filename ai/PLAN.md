# Plan

## Roles

| Role | Who | Does | Does not |
| --- | --- | --- | --- |
| **Planner** | This project's planning chat | Priority, scope, architecture calls, updating this file | Implement site changes, write final copy or legal wording, give legal verdicts |
| **Implementer** | A **new** chat | Execute the current work package only; run `ai/TOOLS.md` checks | Re-plan, add frameworks, "while I'm here" refactors, invent copy, change legal wording |
| **Writer** | A **new** chat (`PROMPTS.md`) | Texts, translations, meta/alt text as a text package in `ai/drafts/` (`ai/CONTENT.md`) | Edit code, write legal pages, invent facts |
| **Designer** | A **new** chat (`PROMPTS.md`) | Design spec in `ai/drafts/` + prototype in `design/` (`ai/DESIGN.md`) | Edit production code, write final copy or legal wording, use external fonts/requests |
| **Lawyer** | A **new** chat with web search (`PROMPTS.md`) | Legal memos and legal-page drafts in `ai/drafts/` (`ai/LEGAL.md`) | Edit code, promise "watertight", rely on memory instead of current sources |
| **Owner** | Jannik | Approves scope changes and drafts (`status: owner-approved`), commits, deploys | — |

Every work package states its **text/design/legal impact** (none | Writer | Designer | Lawyer) and any **`Due:`** date. Drafts from Writer, Designer and Lawyer are integrated only after owner approval. Those three roles change no site code, so their chats can run **in parallel** with an implementer chat.

If an implementer finds a new issue: add it to `BACKLOG.md` under the right priority and keep going on the current package. Do not start a later package in an earlier session.

## Sequence

1. ~~P0 / P0-B / P0-C~~ ✅ done and deployed
2. ~~P1 / P1-A / P1-B~~ ✅ done and deployed
3. ~~P2-A interaction/visual polish~~ ✅ done and deployed
4. ~~P2-B / P2-C Eleventy migration~~ ✅ done and deployed
5. ~~P2-D repo hygiene, fonts, fixes~~ ✅ done and deployed
6. ~~P2-E image pipeline~~ ✅ done and deployed (`1a9325f`)
7. ~~P2-E2 icons and social previews~~ ✅ deployed (owner-confirmed 2026-10-06; re-seen live 2026-10-14)
8. ~~P2-F1 / F2 / F3 computed URLs, i18n data, blog data~~ ✅ done and pushed
9. ~~P2-remaining gallery control accessibility~~ ✅ done and pushed (`e0a807f`)
10. ~~P3 content / README honesty~~ ✅ done and pushed (`66ff9e0`)
11. ~~P3 index gallery corrections, mobile map, contact panel redesign~~ ✅ committed (`a864192`…`3da476a`) and live (2026-10-14 planner fetch)
12. **P3-M — Mechanicon announcement post (deadline: live by Fri 2026-10-16)** ← current package (below)
13. **D-1 — Designer: contact page redesign (parallel to P3-M, no site code)** — brief in `ai/DESIGN.md`; owner priority 2026-10-15
14. P3-C — contact page migration of the approved design (`BACKLOG.md` → "Ready"; starts when the owner has approved the D-1 spec)
15. P3-H — launch hygiene, reduced (`BACKLOG.md` → "Ready")

Everything else (Tools & Ressourcen, Win2k contact migration, contrast pass, About rewrite, footer line, further articles) is parked in `BACKLOG.md` → "Next candidates" with its blocker. Do not skip ahead.

## Current work package: P3-M — Mechanicon announcement post

**Due: 2026-10-16.** **Why now:** Mechanicon 2026 is **Saturday 2026-10-17** in Frankfurt am Main (Saalbau Bornheim, Arnsburger Str. 24, 60385; free admission with a free ticket from mechanicon.io; ten-year anniversary; community keyboard exhibition). An announcement is worthless after the event. Owner request (2026-10-14): create an article image from the Mechanicon logo already in the repo (`images/mechanicon_logo.png`) and write a short post saying the owner will be there and will present a keyboard or two.

**Goal:** one new, complete blog article (DE + EN) with its own hero image, listed first on the blog index, passing all checks.

**In scope**

1. **Page.** New `src/pages/blog-mechanicon-2026.njk` modelled on `blog-corsair-k70.njk` (breadcrumb, header with meta/date, single polaroid figure, article body, article navigation). `permalink: blog-mechanicon-2026.html`, `og_type: "article"`, `og_image` = the new image, `article:published_time` = publication day.
2. **Data.** New record in `src/_data/blog.js`: `id: 8`, `navOrder: 8`, slug/url, `image`, `meta` (planner proposal: "Unterwegs · Mechanicon 2026"), `date`/`datetime` = the day it goes live (owner confirms), `title`, `excerpt`, `imageAlt`, `imageTitle`. **Insert it directly after the featured J80 record** so it is the first teaser. Do **not** set `featured` and do not touch other records.
3. **i18n.** New `src/_data/i18n/blog-mechanicon-2026.js` with `de` and `en` (real English, like the other posts) and identical key sets, following the `post7` pattern exactly: grep for `post7` across `src/` and add the matching `post8` keys everywhere a post needs them (article page, `src/_data/i18n/blog.js` index teaser, and the navigation title keys that neighbouring articles use for prev/next links). Template defaults must equal the German dictionary values.
4. **Text (German, owner's voice, about 120–200 words, 2–3 short paragraphs).** Source: preferably an owner-approved Writer package in `ai/drafts/` (`PROMPTS.md` → Writer; the Writer must check the facts below). If none exists when the implementer starts and the deadline is near, the implementer drafts the text under these rules and records "draft — Writer pass open" in `BACKLOG.md`; the owner reads it before pushing. May state: Mechanicon 2026 is on Saturday, 17 October 2026, in Frankfurt am Main (Saalbau Bornheim); admission is free (ticket via mechanicon.io); it is the tenth anniversary; the owner will be there and will present one or two of his keyboards; he is happy to chat. **Must not state:** opening hours (unconfirmed for 2026), a stand/booth, talks, sponsor or exhibitor status, attendance numbers, or specific keyboards unless the owner names them in the prompt. One plain external link to `https://mechanicon.io/` (`target="_blank" rel="noopener noreferrer"`, no embed, no tracking); optional internal link to `keyboards.html`. Keep the tone of the existing posts. The report lists every factual claim so the owner can check it.
5. **Image.** New `images/Mechanicon_2026.jpg`, 1920 × 1080 (same size as the other article photos so the existing pipeline output works), composed from `images/mechanicon_logo.png`. **The logo is only 225 × 225 px: place it at no more than about 1.5× (≤ 340 px), never as a stretched hero.** Flat brand-palette background (cream `#f4f0e1` or charcoal `#3a3736`) with simple composition; no baked-in text apart from the logo itself (text lives in the HTML and dictionaries); do not modify `mechanicon_logo.png`. Create it with a one-off `sharp` command (dev dependency) and report the exact command; commit a script only if it is general enough to keep. If the owner supplies a larger or vector logo in the prompt, use that instead. Alt/caption via dictionary keys (alt describes the image, e.g. "Mechanicon-Logo auf cremefarbenem Hintergrund"; caption "Mechanicon 2026 · Frankfurt am Main · 17. Oktober").
6. **Rider — R12 (planner's call; tiny and independent, keep it a separate, easily reviewable change).** Delete the owner-addressed note paragraphs `src/pages/impressum.njk:26` ("… basiert auf deiner eigenen Vorlage … ergänze bitte …") and `src/pages/privacy.njk:26` ("… Solltest du künftig … ergänze diese Seite entsprechend …"). Touch nothing else on the legal pages — no wording, no "Stand" dates, not the provider `.note` paragraphs (`privacy.njk:63, 74, 86`); the reminders those notes held are now in `CONVENTIONS.md` and `ai/LEGAL.md`. Reason: visitors who come via Mechanicon will see these pages first.
7. **Handoff.** Update `ai/STATUS.md` and `ai/BACKLOG.md` (mark the Mechanicon request and R12 done in the source, deployment pending until the owner has seen it live).

**Text/legal impact:** Writer (text; fallback above) and Lawyer item L8 (Mechanicon logo use) — the owner may ask the Lawyer chat to check the finished text and image before Friday; this does not block the package.

**Out of scope:** all P3-H items except the R12 rider, the Tools page, the Win2k migration, footer changes, nav changes, legal pages, the `featured` flag, a Mechanicon logo anywhere else on the site, QR codes, editing other articles beyond the `post8` navigation keys they need, any change to `lang` or i18n architecture.

**Done when**

- `npm run build` writes **22** HTML pages and a `sitemap.xml` with **21** URLs (20 + the new article), no errors.
- `python scripts/check_links.py _site` → 0 errors (report the new reference count); `python scripts/tag_balance.py _site` → 0 problems; `diff readme.md ai/README.md` empty; `node --check main.js` ok.
- If the audit scripts from `ai/TOOLS.md` are in `scripts/`: `node scripts/i18n_audit.js` → 0 errors; `python scripts/a11y_audit.py` → 0 errors and no warning for the new page; `python scripts/de_default_audit.py` → only the three baseline findings (about `story.body`, faq `q4.a3`, switches `t3.desc`) and **none** for the new article. Update the page counts in `ai/TOOLS.md` baseline (22 pages) in the same package.
- DE and EN key sets are identical for `blog-mechanicon-2026.js` and for the `post8` additions elsewhere; German template defaults equal the German dictionary values for every new key (state the check used).
- The blog index lists the new article first among the teasers; the new article's "previous" link is the Corsair K70 post and the Corsair post gets a "next" link to the new article.
- `images/Mechanicon_2026.jpg` is 1920 × 1080 and the built page references the generated WebP variants like the other articles.
- No opening hours, booth, talk or sponsor claims appear in the text; all stated facts are listed in the report.
- Rider: `Select-String -Path _site\impressum.html,_site\privacy.html -Pattern 'ergänze' -SimpleMatch` returns nothing, and the diff of the two templates shows only the two deleted paragraphs.
- Owner steps (PowerShell, in the report): read the text and confirm date, venue and the "I will present" wording; name any keyboards to mention; commit and push **by Friday 2026-10-16**; after the Actions run check `(Invoke-WebRequest "https://brotbeutel.github.io/j-keebs/blog-mechanicon-2026.html?v=$(Get-Random)" -UseBasicParsing).StatusCode` → 200 and that `blog.html` shows the teaser.
- Live deployment is **not** claimed until the owner confirms it.

## After P3-M

Run P3-C once the owner has approved the D-1 design spec, then P3-H (`BACKLOG.md` → "Ready"), then return to the planner chat. Candidate packages and their blockers are in `BACKLOG.md` → "Next candidates".
