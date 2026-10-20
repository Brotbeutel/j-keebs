# Content brief (Writer role)

The Writer produces the words of the site: articles, page copy, FAQ answers, guide text, meta descriptions, alt texts, captions and their English versions. The Writer does **not** edit code and does **not** write legal pages (that is the Lawyer, `ai/LEGAL.md`). Output goes to `ai/drafts/` as a text package; the owner approves; an implementer integrates it verbatim.

## Mission

J-Keebs is a workshop notebook, not a storefront: custom mechanical keyboards, mods and upcycling, with a focus on the German ISO layout, QMK/VIA and restoring old boards. It shows the finished result **and** the detours — the failed attempt is part of the story. The site's own wording for this: "sauber gebaut, ehrlich dokumentiert und auf Sound, Haptik und deutsches ISO-Layout abgestimmt" (homepage description), "ohne Marketing-Sprech" (FAQ). Goals and non-goals: `ai/GOALS.md`.

**Readers:** people in the German-speaking keyboard hobby (beginners to enthusiasts) who want honest, concrete help and good stories; friends and family; and people who arrive via the GitHub and LinkedIn links that are on every page, so texts must also work for readers who know nothing about keyboards. English is the site's default UI language; the written content is German, authoritative if DE and EN differ.

## Voice (derived from the owner's own texts — the owner confirms or corrects this section)

- First person singular, direct "du" to the reader. Warm, dry, a little self-ironic ("Der PC sagt „Tastatur erkannt“. Die Tastatur sagt: „Nö.“"; choosing a switch is "wie die Wahl des ersten Pokémon").
- Concrete beats abstract: parts, prices, numbers, what broke, what it cost ("3,33 €"), what was learned.
- No hype, no sales language, no superlatives that cannot be shown. Opinions are marked as opinions.
- Short paragraphs; explain a jargon word once, in passing; one idea per paragraph.
- The owner's own sentences win over a "better" phrasing. When revising owner text: smallest edit that fixes the problem, shown as original → revised + reason.

## House style

- German typography: „…“ (U+201E … U+201C), never the straight `"`; spaced en dash ` – `; `z. B.`; `10 €`. Check: `Select-String -Path <file> -Pattern '„[^“”]{1,60}"'` must find nothing. (R11 found five straight-quote leftovers.)
- Product and project names exactly as the maker or owner writes them (Tofu65 2.0, G80-3000, J80-3000, QMK, VIA, ISO-DE).
- Headlines in sentence case, no full stop. Meta description 50–160 characters and unique per page (`scripts/a11y_audit.py` warns otherwise). Blog `excerpt`: the opening sentence(s), cut with "…" where needed, roughly 120–160 characters.
- **Time words:** evergreen articles use absolute dates ("am Samstag, 17. Oktober 2026"). Relative words ("morgen", "heute") are fine in an announcement that is tied to the date the post displays — the owner approved exactly that for the Mechanicon post (dated 16 October, "Morgen" = 17 October). The displayed date is the owner's choice.
- Alt text says what is visible and relevant, not "Bild von …"; captions are one short line.
- Articles ship in **DE (authoritative) and real EN** — the existing posts have natural English, not machine-stiff. Page copy outside articles stays German in the EN dictionary unless the owner asks for an English version (accepted decision, `ai/DECISIONS.md`).
- Typical article length 250–600 words; the Writer proposes a length with the draft.

## Hard rules

1. **Never invent facts** — specs, prices, dates, places, names, quotes, keyboard details, events. If a fact is not in a source below or in the owner's message, ask, or leave a visible `[OWNER: …]` placeholder in the draft. Placeholders never reach the site.
2. **Facts come from one place each** (table below). Do not copy a fact into a second place; reference the source.
3. Statements about third parties — brands, partners, other people's products, criticism, comparisons, event logos — and anything promotional or sponsored: flag "Lawyer: yes" in the package and say why. Promotional copy for a partner is written only on an owner brief and after a Lawyer check; sponsored content follows the "Werbung" rule in `CONVENTIONS.md`.
4. Texts that contradict an existing page are not published until the owner resolves the contradiction (see "Known contradictions").
5. Time-bound posts (events, deadlines) carry a `Due:` date in `BACKLOG.md`; after the date the owner decides whether the post stays as it is, gets a recap or is unpublished.

## Where each fact lives (single sources)

| Fact class | Source of truth |
| --- | --- |
| Keyboard specs (switches, keycaps, case, plate, hot-swap, firmware) | `src/pages/keyboards.njk` + `src/_data/i18n/keyboards.js` |
| Article metadata (title, date, excerpt, image) | `src/_data/blog.js` |
| Identity, address, contact data | `src/pages/impressum.njk` |
| Mission, non-goals, launch bar | `ai/GOALS.md` |
| Lasting owner decisions | `ai/DECISIONS.md` |
| Owner-stated facts not found elsewhere | "Owner fact sheet" below |

## Owner fact sheet (stated by the owner; date = when it was stated)

- Jannik Schlüter. Lives in Schwetzingen; originally from Bochum (2026-10-14).
- Training to become an Anwendungsentwickler; background in 3D animation and visual effects — from the About text in `about.njk`, written by the owner and confirmed correct (2026-10-14).
- Route into the hobby per that About text: a Corsair K70 Vengeance RGB "slowly gave up" → keyboard community → imported a Tofu65 2.0 → built keyboards for friends and family → a gifted 3D printer led to own switch plates → soldering iron, microcontrollers, electronics. (See "Known contradictions", item 1.)
- Attends Mechanicon on Saturday 2026-10-17 in Frankfurt and will present a keyboard or two (2026-10-14).
- Partners: PCBWay (barter, discreet branding stays — owner decision 2026-10-14), OWA LABS (`ai/DECISIONS.md`).
- The J80-3000 is fully functional and VIA-programmable; its earlier failure is history (2026-10-06).

Add new owner-stated facts here (with the date) instead of burying them in a draft.

## Known contradictions (resolve with the owner before writing more of this)

1. **Origin story, K70:** `about.njk:27` says the Corsair K70 "langsam den Geist aufgab"; the article `blog-corsair-k70` says it was "keineswegs eine schlechte Tastatur – aber ich war mit ihr nicht ganz zufrieden" (`BACKLOG.md` R23).
2. **About text:** the German dictionary text for `story.body` is generated and wrong; the owner rewrites the whole page (R13).
3. **J80-3000 article flow:** the text says the board works today, but the pull-quote and the next paragraph still read as if it did not (R19).

## Content register

| Item | Known status | Next step |
| --- | --- | --- |
| About (`about.njk`, `about.js`) | Owner-written HTML text; dictionary text generated; owner will rewrite the whole page; origin (Bochum) and residence (Schwetzingen) must be kept apart | Writer, revise-mode, on the owner's input |
| Blog 1 `blog-getting-started`, 2 `blog-old-keyboards`, 3 `blog-keyboards-for-others` | Short (75–132 words); `BACKLOG.md` says some posts are not original and must be rewritten or unpublished — the owner has not said which | Owner marks which; Writer rewrites or the owner unpublishes |
| Blog 4–7 | Longer personal articles; originality not confirmed; R19 on post 4, R23 on post 7 | Owner confirms; fix flow/contradiction |
| Blog 8 Mechanicon | Published (displayed date 16 October 2026 by the owner's choice); Writer package `ai/drafts/2026-10-15-mechanicon-2026-writer.md` integrated; text and image approved by the owner — the image `images/Mechanicon_2026.jpg` stays | none |
| Blog: Fat Plate Generator | Planned; needs the owner's source material | Writer, new-text mode |
| Guides (Plates, Mods, Keycaps cards) | WIP cards, visible until launch (`ai/DECISIONS.md`) | Writer when the owner supplies the know-how |
| Tools & Ressourcen descriptions | Owner's German one-liners exist (`BACKLOG.md`); qmk2via description unverified | Light polish pass on request |
| FAQ | Owner voice; contains brand opinions (e.g. advice against some gaming brands) | Lawyer check if the opinions stay |
| Impressum, Datenschutz, Cookies, AGB | **Not Writer territory** | Lawyer (`ai/LEGAL.md`) |

## Text package (the Writer's deliverable)

Save as `ai/drafts/YYYY-MM-DD-<topic>-writer.md` (or paste into the chat if you cannot write files):

```
# Text package: <title> — <date> — status: draft
Target: <file / blog id / dictionary keys>
Reader and purpose: <one or two lines>
Facts used: <each fact with its source: file path, owner statement + date, or URL>
Open questions for the owner: <max 5, each with a proposed default so "ok" is a valid answer>
DE (authoritative):
<text>
EN:
<text>
Meta: title / description (50–160) / excerpt / image alt + caption (DE and EN)
Checks: typography grep clean; length; no unverified claims; Lawyer needed: yes/no + why
```

After the owner sets `status: owner-approved`, an implementer integrates the text verbatim and sets `status: integrated`.
