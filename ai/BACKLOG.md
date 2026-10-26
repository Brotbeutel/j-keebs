# Backlog

Check items when done. Move completed items into a short "Done" note at the bottom with the date. Do not delete context that a later agent still needs.

## Planner review 2026-10-19 (source `76edb45`, live fetch same day)

Method: fresh clone of `origin/main`, `npm ci && npm run build` (22 pages), all six tools of `ai/TOOLS.md` against their baselines, diff of the files since `4e04a3e`, the Designer spec and prototype against the production contact page, a cache-bypassed fetch of the live contact page and the live Impressum, and the owner's phone test. **Not possible here:** a browser (no rendering, no touch), the Actions run log, the live Mechanicon article and `sitemap.xml`.

**What changed since the last review:** planner handoff files, tools and prompts are in the repo; `ai/README.md` was deleted by the owner; the Mechanicon post (P3-M) and R12 are done; the Win2k form window replaced the old contact panel (the owner scoped it to the form only, ahead of the plan because it had top priority). Baselines moved as expected: 22 pages, 1252 references, i18n 0 errors, de_default 3 baseline findings, a11y 0 errors / 11 warnings.

**New confirmed findings (ID — severity — where — cheap check).** R24 (the map) stays in the 2026-10-14 table below, with its status updated.

| ID | Sev. | Finding | Where | Check |
| --- | --- | --- | --- | --- |
| R27 | Done in source (P3-C2) | The ISO-DE checkbox is inset like the text fields (3 px bevel) with a crisp pixel check mark in `--retro-accent`, min-height 44px label row, toggles visibly on box/label click and keyboard Space, defaults to checked. | `style.css`, `src/pages/contact.njk` | Phone/desktop: click box or label; Space on focus |
| R28 | Done in source (P3-C2) | Send button: bevel borders use accent tints (`--retro-accent-light` / `--retro-accent-dark`) inverted on `:active`. | `style.css` | Look at button in dark & light themes; active press |
| R29 | Done in source (P3-C2) | Win2k window floats (`translateY(-4px)`, proportional hard shadow) on hover and `:focus-within`, only inside `@media (hover: hover)`; disabled under `prefers-reduced-motion: reduce`. | `style.css` | Desktop hover / focus field; touch device static |
| R30 | Medium (design, owner report) | **Dropdown:** the reset removes the caret and the open list is the unstyled OS popup. **Validation:** the browser's own "Bitte füllen Sie dieses Feld aus" bubble (language follows the browser, not the site's DE/EN switch) cannot be styled. Both need a design decision → Designer D-2, then P3-C3. | `src/pages/contact.njk` (`<select>`, `required` fields) | Submit the empty form |
| R31 | Done in source (P3-C2) | Deleted ~786 lines of dead `.win2k-*` CSS; uninstalled `@fontsource/silkscreen`, removed Silkscreen font files, licence and references. | `style.css`, `fonts/`, `package.json` | `Select-String -Path style.css -Pattern 'win2k-'` (0 hits) |
| R26 | Closed (owner decision 2026-10-20) | **Withdrawn — planner error.** The Mechanicon post is dated 16 October by the owner's choice, so "Morgen, am Samstag, dem 17. Oktober" is correct relative to the date it shows; the owner approved the text, and the current image `images/Mechanicon_2026.jpg` stays. No Writer package (W-2 withdrawn); `design/Mechanicon_2026-v2.jpg` is not adopted. | — | — |
| R25 | Low-Medium (legal/provenance → Lawyer L11) | Font provenance is thin: `fonts/LICENSE-gohufont.txt` is a four-line notice ("Guillaume Litaudon", "WTFPL / SIL OFL / MIT", "FontPixel web package") without licence text and its authorship/licence is unverified; `LICENSE-vt323.txt` is a three-line summary, not the OFL text that has to accompany the font; Press Start 2P has the full text. | `fonts/LICENSE-gohufont.txt`, `fonts/LICENSE-vt323.txt` | `Get-Content fonts\LICENSE-gohufont.txt` |

**Process findings (no action by the owner unless noted)**

- **P-1 (incident):** `e848d72` deleted `style.css` (3545 lines) while adding the planner files; restored by `05dc9dc` a day later. `check_links.py` aborts without `_site/style.css`. **Confirmed 2026-10-20 on the public Actions page:** runs 29 (`e848d72`) and 30 (`6d8aa10`) **failed**, so Pages kept the previous site in between; runs 31–34 (`05dc9dc` … `76edb45`) are green and the workflow badge reads "passing". Nothing is left for the owner to do. Safeguards: `CONVENTIONS.md` ("Delivering files to the owner"), the Planner prompt (check deletions since the last review).
- **P-2:** the contact design spec was built while `status: draft`; the owner's explicit scope ("only the form") is recorded in `STATUS.md`. The map activation layer was lost because nothing compared the prototype with the page → the implementer report now needs a parity table (`CONVENTIONS.md`, "Fast lane" and "Parity table"; P3-C2 asks for one).
- **P-3 (withdrawn 2026-10-20):** I read "Morgen" in the Mechanicon post as stale; the owner dates the post 16 October on purpose, so the text is right relative to its displayed date. The related house-style rule in `ai/CONTENT.md` was softened.
- **P-4:** inline links in translated text: `main.js` applies `textContent` only (the `data-i18n-html` mentioned in its header comment does not exist). **Decision (planner, 2026-10-19):** keep the text-only-fragment pattern (`<span data-i18n>` around the `<a>`); implementing `data-i18n-html` would be an i18n architecture change and its own package. The misleading comment in `main.js` can be corrected in any package that touches `main.js`.

**Resolved since the last review:** R12 (live-confirmed), P3-M (post and image `images/Mechanicon_2026.jpg` 1920 × 1080; the Writer package was `integrated` and then deleted by the owner on 2026-10-20 because the post is final), `ai/README.md` references (docs updated, the file stays deleted), fonts for the D-1 prototype (now used, provenance in `fonts/README.md`), the "Found during P3-M" items below.

**Ready (after D-2 approval) — P3-C3: dropdown + validation message.** Input: `ai/drafts/…-contact-designer.md` (D-2) with `status: owner-approved` and `design/contact-v2.html`. Scope: the select as the spec defines it (closed state + open list); custom validation as the spec defines it (JS sets `form.noValidate = true` so the no-JS fallback keeps native validation; inline errors with `aria-invalid` / `aria-describedby`; focus moves to the first invalid field; status-bar text; DE/EN keys). Done when: build 22 pages, link check 0 errors, `i18n_audit.js` 0 errors, `de_default_audit.py` no finding for `contact`, `a11y_audit.py` no warning for `contact.html`, a parity table against the spec, owner steps on a phone and a desktop (empty submit, invalid e-mail, valid submit, language switch while an error is shown).

**Lawyer additions:** L11 (font licences, R25) and the new form fields (`topic`, `iso_de_layout`) under L4 in `ai/LEGAL.md`; L8 now covers the Mechanicon logo being live on the blog.

## Planner review 2026-10-14 (source `4e04a3e`, live fetch same day)

Method: fresh clone, `npm ci && npm run build` (Node 22.22.2: 21 HTML pages + `sitemap.xml`, 0 link errors over 1197 references, 0 tag-balance problems, no unprefixed absolute URLs, `diff readme.md ai/README.md` empty, `node --check main.js` ok), plus read-only scripts over `_site/` (DE-default-vs-dictionary comparison, DE/EN key parity, static a11y scan, WCAG contrast from the CSS tokens). Live homepage and contact page fetched. **Not possible here:** a browser (no rendering, no touch/real-device test, no Lighthouse), the Actions run log, the live legal pages and `sitemap.xml` (fetch tool refused URLs not seen in earlier results). Note: a first `web_fetch` of `contact.html` returned a stale pre-migration copy; a cache-busted fetch returned the current page — treat a single un-busted fetch as unreliable.

**Healthy (checked, no finding):** DE/EN dictionaries have identical key sets on every page and in `J_KEEBS_I18N_COMMON`; every `data-i18n` key used in the built HTML exists in both languages; no images without `alt`; no duplicate IDs; no unnamed links/buttons; every `target=_blank` has `rel=noopener`; titles and meta descriptions unique and 50–160 chars; PCBWay links carry `rel=sponsored` and the partner page shows "Werbung"; JSON-LD valid; privacy/cookie text matches what the site actually loads (GitHub Pages, FormSubmit, OSM, localStorage; fonts self-hosted).

**Confirmed defects (ID — severity — where — cheap check)**

| ID | Sev. | Finding | Where | Check |
| --- | --- | --- | --- | --- |
| R12 | High (legal/launch) | Public Impressum and Datenschutz carry editorial notes addressed to the owner ("… basiert auf deiner eigenen Vorlage … ergänze bitte die Abschnitte …"; "Solltest du künftig … ergänze diese Seite entsprechend") | `src/pages/impressum.njk:26`, `src/pages/privacy.njk:26` | `Select-String -Path _site\impressum.html,_site\privacy.html -Pattern 'ergänze' -SimpleMatch` — **source done 2026-10-16** (notes removed in `05dc9dc`; built pages contain no "ergänze"; **live-confirmed 2026-10-19:** the Impressum no longer contains the note) |
| R13 | Medium (content) | **Owner answered 2026-10-14:** the `about.njk` text is the owner's own and correct; the `about.js` dictionary text was generated and is wrong. Owner comes from Bochum and lives in Schwetzingen. The whole About text is still to be rewritten by the owner. **Interim (queued in P3-H):** make the DE and EN dictionary `story.body` equal the HTML default so JS and no-JS visitors see the same text — no wording changes. The later rewrite must separate origin from residence ("aus Bochum" reads as residence next to Schwetzingen in Impressum, contact and the page's own meta description). | `src/pages/about.njk:27` vs `src/_data/i18n/about.js:10,27` | Open `about.html` with JS disabled and enabled |
| R14 | Medium (behavior/a11y) | Contact title-bar "X" still resets the whole form, so a mis-click can lose data; its accessible name now accurately says "Eingaben zurücksetzen" / "Clear form" and the inline `onclick` was removed in the 2026-10-17 Win2k form element. The map wrapper remains a focusable `div` (`tabindex=0`) with no role and a hard-coded German `aria-label` — **fixed together with R24 in P3-C2**. **Closed 2026-10-20 — owner decision: the ✕ may reset the form.** | `src/pages/contact.njk` (`#contactFormClose`; `#mapEmbed`) | Type into the form, activate ✕ and confirm its reset behavior; `Select-String _site\contact.html -Pattern 'onclick' -SimpleMatch` returns nothing |
| R15 | Decided by owner | **Owner decision 2026-10-14:** keep the discreet PCBWay branding in the footer ("Powered by" may fit GitHub Pages better, but PCBWay stays). Legal questions go to a separate legal bot — the planner gives no legal verdicts. Facts for that review: PCBWay is a barter partner; footer credit links to the partner page on all 21 pages; the partner page shows "Werbung" and the PCBWay links carry `rel=sponsored`; the Impressum calls the site a private hobby project. **No implementation work.** | `src/_includes/base.njk:120`, `footer.poweredBy` in `main.js:60,101` | — |
| R16 | Low (a11y) | Heading level skip h1 → h3 on 10 pages (404, contact, faq, 8 blog articles): footer column headings are `h3` and those pages have no `h2` | `src/_includes/base.njk:131,142,149`; CSS `.footer-grid h3` (`style.css` ~1701) | `Select-String -Path _site\faq.html -Pattern '<h[1-6]'` — **queued in P3-H** |
| R17 | Low (content) | **Owner answered 2026-10-14:** the keycaps are Glorious Gaming pudding keycaps, "ich glaube Aura V2". A set called Glorious Aura Keycaps V2 (pudding-style PBT) exists (web check 2026-10-14). **Queued in P3-H:** `b5.p1.keycaps` and `b5.p2.keycaps` (DE and EN) → "Glorious Aura V2 (Pudding)"; owner confirms the exact name from the box. The two identical G80-1000 captions stay as they are. | `src/pages/keyboards.njk:231,244`; `src/_data/i18n/keyboards.js` | `Select-String src\pages\keyboards.njk -Pattern 'Cloud German'` |
| R18 | Medium (a11y, needs design approval) | Light theme: gold `--accent` (#b3a078) is used as **text** colour on cream `--bg` (#f4f0e1) = **2.24 : 1** (AA needs 4.5 : 1 for this 12 px bold text) in `.eyebrow`, `.meta`, footer headings, blog/article/legal labels (24 `color: var(--accent)` rules). Dark theme: accent on card `--surface` = 3.39 : 1 (probable; confirm in DevTools). Light-theme text pair `--accent-2` (#61482c) gives 7.44 : 1 | `style.css:949,1055,1701,1985,2155,2171,2604` (+17 more) | DevTools → Lighthouse "Accessibility" in light theme on `/index.html` |
| R19 | Low (content, owner) | J80 article flow: `post4.p3` now says the board "heute voll funktionsfähig" works, but the pull-quote ("Tastatur erkannt … Nö.") and `post4.p4` ("Der nächste Schritt ist **deshalb** die Firmware") still read as if the keyboard did not work yet | `src/pages/blog-j80-3000-second-life.njk:34-38` | Read the article |
| R20 | Resolved | Owner confirmed 2026-10-14: the OWA LABS link is correct. | `src/pages/partner.njk:36,43` | — |
| R21 | Corrected | `win2k-design/` is **not** clutter: it holds the owner's new Win2k redesign draft (`win2k-redesign.html`, added in `4e04a3e`), an earlier `gemini-code-….html` dump and `Retro-PC_pixelart_generated.png`. Keep it. The handoff files were stale (source commit, "live unverified", font name, `nav.kontakt`, `page_script` i18n row, sharp) — corrected in this review. | `win2k-design/`; `ai/*.md` | `git ls-files win2k-design` |
| R22 | Low (legal wording → Lawyer L3) | The cookies page says the site uses two local-storage features, but `main.js` also writes the **`sessionStorage`** key `jkeebs-guides-nav-open` (guides dropdown state); the language key is written on the first load even without a choice. | `main.js:901-915`, `src/pages/cookies.njk` | `Select-String -Path _site\cookies.html -Pattern 'sessionStorage','Sitzung'` finds nothing → confirmed. **Legal impact: yes** — the Lawyer decides the wording. |
| R23 | Low-Medium (content, owner decision) | Origin-story contradiction: `about.njk:27` says the Corsair K70 "langsam den Geist aufgab"; the article `blog-corsair-k70` says it was "keineswegs eine schlechte Tastatur – aber ich war mit ihr nicht ganz zufrieden". Owner: which version is true? Part of the About rewrite (Writer). | `src/pages/about.njk:27`; `src/_data/i18n/blog-corsair-k70.js` (`post7.p1`) | `Select-String src\pages\about.njk -Pattern 'Geist aufgab' -SimpleMatch` |
| R24 | Done in source (P3-C2) | **Contact map activation & fade.** Transparent activation layer (`.map-activate`) with hint (`c.map.activate`), 650 ms cubic-bezier saturation fade, pointerdown outside release, keyboard focusable & Escape, touch-action pan-y, generic div tabindex removed and role="group" added. | `src/pages/contact.njk`, `main.js`, `style.css` | Phone: tap map directly → turns colour; tap outside → grey again |

**Accepted decisions — not reopened:** English default with German copy; `lang="en"` on every page (incl. German-only legal pages); automatic OSM map (Art. 6(1)(f), no lawyer check yet); client-side DE/EN; legal pages German-only; FormSubmit; project-page base path; guide WIP cards stay visible until launch; `robots.txt` static; passthrough copy of full-size `images/` (46 MB of originals ship to Pages, only `og-preview.jpg` etc. are referenced — harmless, deliberate).

**Owner requests — folded from `USERNOTES.md` (2026-10-13) and the owner's answers of 2026-10-14**

- [x] **Mechanicon announcement post — URGENT, current package P3-M (`PLAN.md`).** Mechanicon 2026 is **Saturday 2026-10-17** in Frankfurt am Main (Saalbau Bornheim, Arnsburger Str. 24, 60385), free admission with a free ticket from mechanicon.io, ten-year anniversary (organizer post on keebtalk.com and the kbd.news event entry, found 2026-10-14; 2026 opening hours not confirmed — 2025 ran 12:30–18:30, so do not print times). Owner: use `images/mechanicon_logo.png` to create a fitting article image; write a short post saying the owner will be there and will present a keyboard or two. The logo file is only **225 × 225 px** — never upscale it into a hero. **Status 2026-10-16:** implemented in the working tree (owner approved the Writer draft in chat; draft status now `integrated`) — uncommitted, not deployed, live page not checked. See "Found during P3-M". **Additional owner request 2026-10-17:** a Designer image pairing the event and J-Keebs marks with the headline `J-KEEBS IST DABEI` and date `17.10.2026` is available as an unapproved draft (`design/Mechanicon_2026-v2.jpg`); the decorative color/keycap row was removed, and the Mechanicon logo and date were enlarged as focal points. Current article asset remains unchanged until approval.
- [x] **Win2k contact-form element — OWNER PRIORITY (2026-10-17).** Per the owner's explicit scope, only the Win2k form window from `design/contact-v1.html` was implemented on 2026-10-17; the rest of that mockup and the wider `win2k-design/win2k-redesign.html` page were not migrated. It keeps the existing FormSubmit destination and AJAX/no-JS behavior, and now sends the mockup's `topic` and optional `iso_de_layout` fields. **Legal impact: yes** — Lawyer should confirm the existing privacy notice covers these extra fields. The form panel's live/device check is pending; R14's X-reset behavior remains as shown in the mockup.
- [ ] **Remaining Win2k contact redesign** — the owner has approved only the form element so far. The rest of P3-C (contact layout and R24 map activation) remains open pending its approved design/scope.
- [x] **Mechanicon post — OWNER PRIORITY (2026-10-15), Due: 2026-10-16** — package P3-M in `PLAN.md`; commit `d033410` is on `origin/main`; Actions and live check pending.
- [x] **"Mit GitHub Pages betrieben" in the footer — decided 2026-10-20:** the credit becomes "Powered by PCBWay, run on GitHub Pages" at the same place (queued as item 8 of P3-H).
- [ ] **"Tools & Ressourcen" — separate navigation item, NOT part of Guides (owner, 2026-10-14).** New page `tools.html` (21 → 22 pages), new top-level nav entry (planner proposal: after "Guides", before "Über mich"), own i18n module `tools.js`, DE/EN. The categories need a sensible order; planner proposal follows the build workflow: **1 Layout planen** (Keyboard Layout Editor, Keyboard Layout Editor NG) → **2 Plates & Gehäuse** (Plate & Case Builder, Fat Plate Generator, Plates'n'Cases) → **3 Firmware & VIA** (QMK Configurator, qmk2via, QMK Toolbox) → **4 Tippen üben** (Keybr). Entries and the owner's descriptions: Keyboard Layout Editor NG (editor.keyboard-tools.xyz) — benutzerfreundlichere KLE-Version mit mehr Features; Plate & Case Builder (builder.swillkb.com) — Switch Plates aus KLE-JSONs; qmk2via (github.com/misterkeebs/qmk2via) — owner text: "QMK-Firmware → JSON für den KLE" (**not verified; check the repo README before publishing — the name suggests a QMK-to-VIA conversion**); QMK Toolbox (qmk.fm/toolbox) — Firmware flashen; QMK Configurator (config.qmk.fm) — Firmware erstellen/bearbeiten; Keyboard Layout Editor (keyboard-layout-editor.com) — Layouts erstellen, JSON exportieren; Fat Plate Generator (github.com/Brotbeutel/Fat-Plate-Generator) — Fat-Plates zum Drucken; Plates'n'Cases (github.com/Brotbeutel/Plates-n-Cases) — eigene Plates und Gehäuse; Keybr.com (keybr.com) — "die beste App zum Tippen lernen". Owner noted further super-categories could make sense later. Only external links, no embeds, so no privacy-page change; open them like the other external links (`target="_blank" rel="noopener noreferrer"`).
- [ ] **Roles added 2026-10-14/15:** Writer (`ai/CONTENT.md`), Lawyer (`ai/LEGAL.md`) and Designer (`ai/DESIGN.md`), prompts in `ai/PROMPTS.md`, tools in `ai/TOOLS.md` — copy the delivered files into the repo (`AGENTS.md`, `ai/*.md`, `ai/drafts/README.md`, `scripts/` audit scripts) and commit. The Designer's prototypes live in a new `design/` folder (not published: Eleventy only copies the passthrough list).
- [ ] **Fat Plate Generator blog article** (`https://github.com/Brotbeutel/Fat-Plate-Generator`): not scheduled, needs the owner's source material.
- [ ] **About text rewrite (R13):** owner rewrites; not scheduled until the owner delivers text.
- [x] Answered 2026-10-14: R13 (see table), R15 (keep branding; legal via separate bot), R17 (Glorious Aura V2), R20 (link correct).

**Future recommendations (not queued)**

- ~~Ship the audit scripts~~ — delivered 2026-10-14 as `scripts/de_default_audit.py`, `scripts/i18n_audit.js`, `scripts/a11y_audit.py`, documented in `ai/TOOLS.md`; wiring them into CI is proposal 1 under "Workflow proposals".
- Owner question: legal pages are German-only but `<html lang="en">` makes screen readers read them with an English voice. A per-page `lang="de"` override **for the five legal pages only** would not touch the English default decision — needs an explicit owner OK because `CONVENTIONS.md` says not to change `lang`.
- Contact map iframe `referrerpolicy="no-referrer-when-downgrade"` sends the full page URL to OSM; `strict-origin-when-cross-origin` would send only the origin. Test in a browser first.
- Privacy page: consider naming the third-country transfer basis for GitHub (US) and FormSubmit; lawyer review is already an open optional item.
- Language persistence: `applyLang()` writes `jkeebs-lang` on every first load (even without a choice); harmless, but "Deine Wahl" on the cookies page is then slightly off.
- `terms.njk:24` ends with "Diese Seite ersetzt keine Rechtsberatung." — decide together with the open "drop AGB if nothing is sold" item.

**Superseded 2026-10-19 — the form window was migrated on 2026-10-17 (`76edb45`, owner-scoped); what is left is split into P3-C2 (`PLAN.md`, current) and P3-C3 (above). The text below is kept as the record of the D-1 contract.** **Ready (after Designer D-1 approval) — P3-C: contact page migration.** Owner priority 2026-10-15 (with the Mechanicon post). **Input:** `ai/drafts/…-contact-designer.md` with `status: owner-approved` and its prototype in `design/`; without an approved spec this package does not start.

- **Goal:** rebuild the approved design as the production `contact.html`, keeping every behaviour of today's page.
- **In scope:** `src/pages/contact.njk`, the contact CSS in `style.css` (remove the old panel rules it replaces), `initContactForm()` / `initMapTouchActivation()` in `main.js`, `src/_data/i18n/contact.js` (DE and EN, identical keys; strings as in the spec's key table), self-hosted fonts with provenance and licence files for anything new (no external requests), exactly one `<h1>`; fix R14 and R24 as the spec defines them.
- **Keep:** FormSubmit POST + AJAX path + `?sent=1` fallback, honeypot and hidden fields, success/error messages, privacy hint and link, contact methods, social links, the OSM iframe (still loaded with the page), light/dark themes, DE/EN switching.
- **Out of scope:** other pages, the legal pages, copy beyond the spec's key table, changes to FormSubmit fields not in the spec, the footer, `lang`.
- **Text/design/legal impact:** Designer (spec is the contract); Lawyer only if the form's privacy wording changes (it should not).
- **Done when:** build writes 22 pages (21 + Mechanicon); link check 0 errors; tag balance 0; `node scripts/i18n_audit.js` → 0 errors; `python scripts/de_default_audit.py` → 0 findings for `contact`; `python scripts/a11y_audit.py` → 0 errors and no warning for `contact.html`; deviations from the prototype listed in the report; the spec's acceptance criteria turned into owner steps (PowerShell where a command helps, otherwise plain steps for a phone and a desktop); live deployment not claimed until the owner has checked it on a real phone.

**Ready (fully specified, not started) — P3-H launch hygiene (reduced).** Run it after P3-C2, or earlier if the owner prefers; R12 is already handled in P3-M and R14 in P3-C.

1. ~~R12~~ — moved 2026-10-15 into the P3-M package as a rider (the owner's priority is Mechanicon; visitors arriving via the event see the legal pages).
2. R11 (part) — replace the straight closing quote with `“` in `impressum.njk:41`, `privacy.njk:106` (two pairs), `switches.njk:43`, `terms.njk:63` and the FAQ answer `q4.a3` (HTML default in `faq.njk`; the dictionary already has `“`); add the missing comma in `index.njk:194` and `src/_data/i18n/index.js:40` (DE) → "Mehr programmierbare Ebenen, mehr LED-Animationen wie in Version 2 – J80-3000 SPI."
3. R13 (interim) — set the DE and EN dictionary `story.body` in `src/_data/i18n/about.js` (lines 10 and 27) to the exact HTML default text of `about.njk:27`. No other wording change; the owner rewrites the About text later.
4. ~~R14~~ — moved 2026-10-15 to the contact redesign (D-1 → P3-C), which replaces the title bar.
5. R16 — footer column headings `h3` → `h2` in `src/_includes/base.njk:131, 142, 149`, update every `.footer-grid h3` selector in `style.css` (~line 1701) so the look is identical.
6. R17 — keycap text of the two Keychron Q3 cards → "Glorious Aura V2 (Pudding)" (DE and EN dictionary keys `b5.p1.keycaps`, `b5.p2.keycaps`, and the HTML defaults at `keyboards.njk:231, 244`).
7. Handoff files updated.

8. Footer credit text (owner decision 2026-10-20): "Powered by PCBWay, run on GitHub Pages" in the same place; "Powered by PCBWay" keeps linking to the partner page, ", run on GitHub Pages" is plain text; one DE/EN pair (`footer.poweredBy` in `main.js` and the default in `src/_includes/base.njk`). Mention the extra text in the report for the Lawyer (L1).

Out of scope for P3-H: R12 (done in P3-M), R14/R24 (contact redesign, P3-C), R15, R18, R19, any About rewrite, new pages, the footer GitHub-Pages line, `lang`, i18n architecture.
Done when: build writes **22** HTML pages if P3-M is already merged (21 otherwise); link check 0 errors; tag balance 0; `grep -nE '„[^“”"<>]{1,60}"' src/pages/*.njk src/_data/i18n/*.js` empty; no heading-level skip on any page (report the check); `node --check main.js`; `node scripts/i18n_audit.js` → 0 errors; `python scripts/de_default_audit.py` → **0 findings** (baseline 3: R13, R11 quotes); `python scripts/a11y_audit.py` → 0 errors and the 10 heading-skip warnings gone (the 2 contact warnings remain until P3-C; baseline 12); update the baseline in `ai/TOOLS.md`; owner PowerShell checks as in `PLAN.md` style.

**Workflow proposals (planner, 2026-10-14 — not scheduled, owner decides)**

1. **Tooling package (P-T):** `npm run verify` that runs build + all six checks in `ai/TOOLS.md`, and the same steps as a CI gate (`i18n_audit`, `a11y_audit` blocking on errors; `de_default_audit` blocking once its baseline is 0). Catches the defects this review found by hand.
2. **Real-browser smoke tests in CI** (Playwright inside GitHub Actions): language and theme toggle, mobile menu, gallery keyboard use, contact form states with FormSubmit mocked, Lighthouse budgets. Planner and implementer sandboxes have no browser, so this closes the biggest verification gap (contrast, touch, focus order).
3. **Build check on pull requests without deploy:** work on a branch, Actions builds and runs the checks, only a merge deploys — a broken build never reaches Pages. Direct pushes to `main` stay possible for tiny changes.
4. **Reviewer role (optional) — enabled as an optional prompt on 2026-10-20** after the D-1 prototype missed the map requirement and the implementation dropped the layer unnoticed: a fresh chat that checks a Designer spec against its brief (requirements trace) or an implementer's diff against `PLAN.md` before the owner approves or commits. Prompt in `ai/PROMPTS.md`; the owner decides when to use it.
5. **`Due:` field + a deadline check at the start of every planner session** (rule is now in `CONVENTIONS.md`; the prompts already say it).
7. **Guard against missing files in CI (from incident P-1):** a first workflow step that fails with a clear message when `style.css`, `main.js`, `src/`, `fonts/` or `images/` are missing, so the cause is obvious in the Actions log instead of a `FileNotFoundError` in `check_links.py`.
8. **Review deletions at every planner review:** `git diff --diff-filter=D --name-only <last reviewed commit>..HEAD` (now in the Planner prompt).
9. **Fast lane** and **parity table** for design-to-code work (now in `CONVENTIONS.md` and the Implementer prompt).
6. **Owner decision inbox:** planners end every report with at most five questions, each with a proposed default, so "ok" is a valid answer (now in `PROMPTS.md`).

**Next candidates (after P3-C2; each waits for the input named)**

-1. **Now, in parallel (owner priority 2026-10-19):** P3-C2 (implementer, `PLAN.md`), Designer D-2 (dropdown + validation, `ai/DESIGN.md`); then P3-C3; then P3-H.
0. **Lawyer audit (no site code)** — run the Lawyer prompt on all four legal pages and L1–L10 in `ai/LEGAL.md`; produces `ai/drafts/…-lawyer.md`; an implementer then applies the approved wording (removes R12 for good, settles R15/R22). **Launch blocker** (`GOALS.md` launch bar). Needs only the owner to open the chat.
0. **Writer packages (no site code)** — About rewrite (R13/R23, needs the owner's input), posts 1–3 rewrite-or-unpublish decision, Fat Plate Generator article, Guides texts; see the content register in `ai/CONTENT.md`.
1. **"Tools & Ressourcen" page** — inputs ready (see owner requests); only needs the owner's reaction to the nav position and category order, plus the qmk2via README check.
2. **Remaining Win2k contact migration (superseded by P3-C2/P3-C3 — kept for the record)** — the owner specified on 2026-10-17 that only the Win2k form element from `design/contact-v1.html` should be implemented. That slice is complete in the working tree. Do not migrate the surrounding mockup. Broader contact layout and the R24 map activation remain open. `topic` and optional `iso_de_layout` are now included in the existing FormSubmit payload; **Legal impact: yes**, Lawyer to verify notice coverage. The separate `win2k-design/win2k-redesign.html` draft still contains Google Fonts/fontpixel references, incomplete FormSubmit wiring, and hard-coded German text; it has not been migrated.
3. **R18 light-theme contrast** — new text token `--accent-text` (light: `--accent-2`), gold stays for borders and decoration; needs the owner's visual OK on a before/after.
4. **About rewrite** — waits for the owner's text.
5. **Footer package** — "Mit GitHub Pages betrieben" line; waits for the owner's wording.
6. **Fat Plate Generator article** — waits for source material.

## Review findings (from 2026-09-20) — still open

| ID | Finding | Status |
| --- | --- | --- |
| R6 | Homepage gallery DE dict contradicts HTML default; placeholder "– ergänzen" visible | **Done and live (planner fetch 2026-10-14: Cherry G80-3000 + YMDK68, "Kailh Box Jade")** |
| R7 | Blog J80-3000 describes the earlier failure without clearly marking it as historical, while the current state is fully functional and programmable with VIA | **Partly done (`a864192`): `post4.p3` now says the board is working today. Narrative flow still off — see R19.** |
| R9 | Meta/icon gaps: og:image, apple-touch-icon, twitter:description, og:site_name | **Done and confirmed live 2026-10-06; see `STATUS.md`** |
| R10 | `mechanicon_logo.png` unused; filenames with spaces/uppercase extensions | **Mechanicon logo retained for a future blog article (owner decision 2026-10-06).** The three oddly named image files remain referenced by `src/pages/keyboards.njk`; rename only with a matching template update. |
| R11 | Typos in German copy | **Partly queued: straight closing quotes + missing comma in P3-H (`PLAN.md`). Anything else: owner (content).** |

## Eleventy structure debt (P2-F, split 2026-10-05 planner review)

**P2-F1 — done 2026-10-06 (committed and pushed as `0211d43`; live not confirmed):**
- [x] Computed URLs: derive `canonical`/`og_url` from `site.url` + `page.url` via `eleventyComputed` (52 hard-coded absolute-URL lines measured 2026-10-05: 21×`og_url` + 21×`canonical` + 8×`og_image` on blog pages + 1 JSON-LD `url` + 1 FormSubmit `_next`, across 20 template files)
- [x] Directory data: `layout: base.njk` repeated in 21 files; use `src/pages/pages.11tydata.js`
- [x] Generate `sitemap.xml` from the page collection (currently a static root file, 20 `<url>` entries, must be hand-updated on every rename)

**P2-F2 — done 2026-10-06 (committed and pushed as `4cc9980`; live not confirmed):**
- [x] i18n as data: 17 page-local dictionaries moved from YAML front matter to `src/_data/i18n/<page-file-slug>.js`; `base.njk` emits only the current page's dictionary, while legal pages remain dictionary-free
- [x] Nav key naming: `nav.kontakt` renamed to `nav.contact` in the navigation data and both shared language dictionaries

**P2-F3 — done 2026-10-06 (committed and pushed as `5237912`; live not confirmed):**
- [x] Blog records: seven ordered records now live in `src/_data/blog.js`, including URLs, display/navigation order, dates, teasers, images and German no-JS defaults
- [x] Blog index: featured and teaser cards render from the data records with the existing seven-article order and output contract
- [x] Article navigation: previous/next links are computed from navigation order and rendered through `src/_includes/article-nav.njk`; first/last boundaries remain empty on the appropriate side

**Unscheduled (small, independent — pick up opportunistically):**
- [ ] `robots.txt`: **planner decision 2026-10-05 — not worth generating.** It's 4 static lines with one URL in it; a template would cost more than it saves. Leave it a hand-maintained passthrough file (see `DECISIONS.md`).
- [ ] Asset layout: pages in `src/`, assets in repo root — consider `src/assets/` (purely cosmetic reorg, no behavior change; do after F2/F3 so it doesn't collide with their file moves)
- [x] CI link/tag checks added; [ ] still unscheduled: `paths-ignore` for `ai/*.md`, optional cache-busting

## Pending owner decisions/requests

- [x] **Dual-theme brand logos:** owner withdrew this request 2026-10-06; do not scope separate light/dark assets
- [x] **R6 decision:** index gallery features `Cherry G80-3000` and `YMDK68`; `YMDK68` switches are `Kailh Box Jade`; `Der Garagenfund` is reserved for a future blog article
- [ ] **Client-side vs static DE/EN:** `DECISIONS.md` said "revisit when adding SSG". Option: static `/` (DE) and `/en/` output

## P2-remaining — a11y

- [x] Gallery: cheat-sheet activation is limited to `.cheat-toggle`; fullscreen activation remains on image click/keyboard handlers, so the actions have distinct event targets (`e0a807f`)

## P3 — content and hygiene

- [x] Documentation honesty: `readme.md` and `ai/README.md` now match the actual Eleventy data layout, i18n convention, blog navigation, Node requirement, image pipeline, and intentional client-side language behavior
- [x] Update index gallery title/project data and replace the YMDK68 switch placeholder with `Kailh Box Jade` (local implementation complete; deployment pending)
- [ ] Guides: keep pending cards visible as WIP until official launch; then finish or hide each remaining card
- [ ] Rewrite or unpublish non-original blog text
- [ ] R7 content pass: make the earlier J80-3000 failure clearly historical and preserve the current fully functional/VIA status
- [ ] Consider dropping AGB if nothing is sold
- [x] Link and tag checks run in CI (`.github/workflows/deploy.yml`, `a864192`)

## Launch bar blockers

- [x] Featured project links work
- [ ] Blog posts that are not original are rewritten or unpublished
- [ ] At official launch: Guides has at least one finished guide per category, or pending cards are removed
- [x] Visible placeholders removed (R6, live 2026-10-14)
- [x] No undisclosed third-party requests (R1 — fonts self-hosted)

## Found during P2-D (low priority, not blocking)

- [ ] Optional font preload (if swap jump shows up — measure first)
- [ ] `font-weight` values without matching face (200, 800, 1000 resolve to nearest)
- [ ] Glyphs outside Latin subset (`← → ↗ ✓ ✕`) fall back to system fonts
- [ ] `_site/fonts/README.md` is published (harmless)

## Found during P2-E2 (low priority, not blocking)

- [ ] Unused draft social cards `images/card_v1.jpg` and `images/card_v2.jpg` are passthrough-copied into `_site/` and not referenced by templates. Delete or keep as design archive — **owner asked 2026-10-14**: they were generated by an agent during P2-E2 (`fe9c140`, 2026-10-05), never referenced; the live social preview is `images/og-preview.jpg`. They are unrelated to the contact-page map. Owner decides: delete (recommended) or keep — owner call.
- [x] Direct `sharp` dev dependency added (`a864192`); running the generator stays optional

## Found during P2-F1 (low priority, not blocking)

- [ ] Front-matter `extra_head` is injected raw, so the JSON-LD block in `index.njk` needs the `@@OG_URL@@` token workaround (see `CONVENTIONS.md` "URLs"). Keep this as a separate future head-data cleanup; P2-F2 deliberately covered page i18n data only.
- [ ] The `sitemap.xml` has no `<lastmod>`. Optional; would need a per-page date (blog posts have one in the content, not in front matter). Keep as a future metadata cleanup.
- [ ] Comments in `eleventy.config.js` ("while the legacy site remains live") are stale since P2-C. Cosmetic; touch when the file is edited for another reason.
- [ ] `npm run build` reports `Wrote 22 files` now: 21 HTML pages + the generated `sitemap.xml`. "21 pages" in checks still refers to HTML pages.

## Found during planner review (2026-10-05, low priority, not blocking)

- [x] (done in P2-F1, 2026-10-06) `ai/README.md` has drifted from root `readme.md` by 2 lines (the `images/` project-structure comment doesn't mention the WebP pipeline; Node version says 18 instead of 22). Folded into P2-F1's "Done when" (see `PLAN.md`) since the implementer is already touching project-structure docs there.

## Found during P3 (low priority, not blocking)

- [x] Handoff Markdown files normalized to LF in the documentation-hygiene change; `git diff --check` is now reliable.

## Found during P3-M (implementer run 2026-10-16, source `05dc9dc`)

- [x] **P3-M text part integrated 2026-10-16.** The owner approved `ai/drafts/2026-10-15-mechanicon-2026-writer.md` in chat ("Ich approve den Draft"); its status line was set to `integrated`. New: `src/pages/blog-mechanicon-2026.njk`, `src/_data/i18n/blog-mechanicon-2026.js` (13 keys per language), record `id: 8` / `navOrder: 8` in `src/_data/blog.js` right after the featured J80 record, six `post8.*` teaser keys per language in `src/_data/i18n/blog.js`, `post8.navTitle` in `src/_data/i18n/blog-corsair-k70.js`. Texts were generated from the draft by a script with assert guards, so they are verbatim; the one inline link (`mechanicon.io`) needed the fragment pattern (next item). Legal impact: none (plain `target="_blank" rel="noopener noreferrer"` link, no embed, no request on load; logo use still Lawyer L8). *(The draft file was deleted by the owner on 2026-10-20.)*
- [x] **Mechanicon post is already stale at delivery — Due: 2026-10-17 (event day). Needs owner decision / Writer.** The system and sandbox date is now Saturday 2026-10-17, but the approved text says "Morgen, am Samstag, dem 17. Oktober …" (DE `post8.p1.before` and `post8.excerpt` in `src/_data/i18n/blog-mechanicon-2026.js` and `src/_data/i18n/blog.js`, and the `excerpt` in `src/_data/blog.js`) / "Tomorrow, on Saturday, 17 October …" (EN), and the date field says 16 October. Integrated verbatim as instructed; nothing was changed. Smallest fix, if the owner confirms the exact wording: "Heute" / "Today" in those five places (and the date, if wanted). Later: rewrite as a short report after the event (Writer, then owner approval). Also check the raffle ("Tombola") claim against mechanicon.io — it came from the owner's own text and is not on the PLAN's may-state list. **Closed 2026-10-20: not a defect — the owner dates the post 16 October on purpose and approved the text (R26 withdrawn).**
- [x] **`ai/README.md` is missing but still referenced.** Commit `6d8aa10` ("Deleted a redundant README.md") removed it, yet `AGENTS.md:3`, eight prompts in `ai/PROMPTS.md`, the "Done when" of the old P3-M text in `PLAN.md` (`diff readme.md ai/README.md`) and `readme.md:32` still point to it. Planner/owner: either restore it or update those references (and drop the parity check). Until then agents report the parity check as not runnable. **Resolved 2026-10-19 (planner): the file stays deleted (owner), `readme.md` is the project overview, all references and the parity check were removed.** **Update 2026-10-20: the owner noted that agents expect a README in `ai/`; it returns as a short folder index (not a copy of `readme.md`).**
- [x] **`style.css` was absent from the repo between `e848d72` ("Planner session update") and `05dc9dc`.** It is back and identical to the last earlier version (`3da476a`, compared modulo line endings). `scripts/check_links.py` aborts with `FileNotFoundError` when `_site/style.css` is missing (simulated locally 2026-10-16), so the Actions runs for the commits in between most likely failed before deploying and Pages kept the previous version — the owner should confirm in Actions that the run for `05dc9dc` is green. How the file vanished is unknown; a file set delivered by a planner chat must not delete files the package does not name. **Recorded 2026-10-19 as incident P-1 in the planner review; the owner confirms the Actions runs are green.**
- [x] **Fonts for the D-1 prototype are in `fonts/` but not used or documented.** `05dc9dc` added Gohufont (bold 14px), Press Start 2P and VT323 with licence files; `style.css` does not reference them, `fonts/README.md` does not list them, and the passthrough copy of `fonts/` ships them in `_site/fonts/`. P3-C either uses them (add provenance to `fonts/README.md` and the font list in `CONVENTIONS.md`) or removes them. Legal impact: none (self-hosted, no request to a third party). **Resolved 2026-10-17: registered in `style.css`, provenance in `fonts/README.md`; licence provenance questions are R25.**
- [x] `05dc9dc` is titled "P3-C" but contains no P3-C implementation: the Designer spec is `status: draft` and `contact.njk` is unchanged. P3-C stays queued until the spec is `owner-approved`. **Informational; superseded by the 2026-10-17 form migration.**
- [x] **Inline links in translated text need a pattern.** `main.js` sets `textContent` only (the header comment mentions `data-i18n-html`, but nothing implements it), so a link inside a `data-i18n` paragraph would be flattened on load (English is the default). P3-M uses text-only `<span data-i18n>` fragments around the `<a>` (`post8.p1.before` / `post8.p1.after`; the visible text equals the draft). Rule added to `CONVENTIONS.md`. Planner decision, low: keep the pattern or implement `data-i18n-html` (an i18n architecture change, so only as its own package; the comment in `main.js` is misleading until then). **Decision 2026-10-19: keep the text-only-fragment pattern (P-4).**
- [ ] **EN `<title>` / description of the Mechanicon draft are unused.** Blog article pages have no meta dictionary keys (same for all other articles), so only the German values from the draft are in the front matter. Low; part of the existing R-item on untranslated meta, if one is wanted.
- [ ] **`a11y_audit.py` reports the R16 warning for the new page (h1→h3).** The PLAN asked for "no warning for the new page", which only P3-H can deliver (the footer heading, same as the other seven articles); an `h2` in the article would have meant inventing structure. Baseline in `TOOLS.md` updated to 13 warnings.

## Mobile interaction

- [x] Contact map: persist saturation for the active touch card and clear it on outside touch (`main.js`, `style.css`); live since `a864192`; **real-device check done by the owner 2026-10-15: works for the card, not for the map itself → R24**; earlier note: (pointer events inside the cross-origin iframe never reach the page, so activation relies on focus-within — verify by tapping the map itself, not only the card).

## Contact page

- [x] Restyle the Windows 2K-inspired contact form to fit the site visual system without changing form behavior (`style.css`); local checks pass, deployment review pending.
- [x] Complete the contact-panel redesign with a distinct terminal palette and pixel-mono hierarchy without a 1:1 Windows clone (`style.css`); local checks pass, deployment review pending.
- [x] Add self-hosted **Silkscreen** (not Press Start 2P — corrected 2026-10-14) for the contact-panel pixel UI, with Fontsource provenance and license (`fonts/`, `package.json`); live since `3da476a`.

## i18n maintenance

- [x] Homepage dictionary loading: explicitly map the root page to `src/_data/i18n/index.js` in `src/pages/pages.11tydata.js`; generated `_site/index.html` now emits its page dictionary.
- [x] Gallery captions: refresh generated active-slide captions during language changes instead of waiting for carousel navigation (`main.js`).

## Done

- 2026-10-17 — Owner-requested **Win2k contact-form element only** migrated from `design/contact-v1.html` into `src/pages/contact.njk`, with scoped styling in `style.css`, DE/EN strings, and status/reset handling in `main.js`. Registered the three existing local Win2k fonts in production CSS and recorded their provenance/licence notes in `fonts/README.md`. Kept the existing FormSubmit AJAX + no-JS fallback; added the mockup's `topic` and optional `iso_de_layout` fields to its payload (**Legal impact: yes** — Lawyer to confirm notice coverage). No surrounding contact cards, map, page layout or other mockup section was migrated. `npm ci` and `npm run build` succeeded (22 HTML pages + `sitemap.xml`); `check_links.py` 22 pages / 1252 references / 0 errors; `tag_balance.py` 0; `i18n_audit.js` 0 errors / 13 INFO; `de_default_audit.py` 3 existing findings; `a11y_audit.py` 0 errors / 11 warnings (10 heading skips and R24 map wrapper). `node --check main.js` passed. Python checks used the bundled runtime because `python` and `py` were unavailable on PATH. Browser/device, FormSubmit activation and live deployment were not checked. `ai/TOOLS.md` baseline updated.

- 2026-10-17 — Designer refined the Mechanicon article-image candidate `design/Mechanicon_2026-v2.jpg` (1920 × 1080, 52.2 KB) from the repository's Mechanicon and J-Keebs logos. The 336 px Mechanicon mark and the date `17.10.2026` lead; Georgia and Courier New establish an editorial headline and precise date label, with aligned text rows across both panels. The decorative color/keycap row was removed on owner feedback. The spec is `ai/drafts/2026-10-17-mechanicon-blog-image-designer.md`; status remains `draft` pending owner review. Existing production image unchanged.

- 2026-10-16/17 — **P3-M (Mechanicon post + R12 rider)** was implemented on source `05dc9dc` and pushed in `d033410`; its Actions run and live page remain unchecked. The article says "Morgen" on the event date 2026-10-17, so the owner should review its copy before relying on the live announcement.

- 2026-10-19 — Planner review of `76edb45`: findings R24–R31 and process findings P-1…P-4 recorded; P3-C2 specified as the current package (checkbox, send-button border, window float, map activation layer, dead-CSS cleanup); D-2 (dropdown + validation) queued (a W-2 for the Mechanicon post was queued in error and withdrawn on 2026-10-20); "Found during P3-M" items resolved; `ai/README.md` references removed; STATUS rewritten.

- 2026-10-15 — Owner priorities: Mechanicon post (Due 2026-10-16) and contact redesign first. Designer role added (`ai/DESIGN.md`, brief D-1); R24 (map tap) recorded from the owner's device test; R14 moved into the contact redesign; R12 became a rider of P3-M; P3-C specified; P3-H reduced. `a11y_audit.py` fixed to recognise `<label for>` (false positives on the owner's draft).

- 2026-10-14 (second pass) — Owner answers folded: R13/R15/R17/R20/R21 updated; Mechanicon date found (Sat 2026-10-17) and made the current package P3-M; P3-H moved to "Ready" in this file; "Tools & Ressourcen" set as a separate page; Win2k draft constraints recorded.

- 2026-10-14 — Planner review (source `4e04a3e`): findings R12–R21 recorded, `USERNOTES.md` folded and cleared, stale handoff facts corrected (`STATUS.md`, `CONVENTIONS.md`, this file), `PLAN.md` replaced by the single package P3-H. No website code changed.

- 2026-10-07 — Contact panel redesign (Silkscreen pixel UI, pixel-art header, neutral title bar) committed as `eb10aec`…`3da476a`; live.

- 2026-10-06 — Batch `a864192`/`ecc9bd8`/`a549b70`: index gallery correction, mobile map touch persistence, J80 historical wording (`post4.p3`), CI link/tag checks, direct `sharp`, LF handoff files, gallery caption i18n refresh.

- 2026-10-06 — Owner decisions: index gallery features the Cherry G80-3000 and YMDK68; YMDK68 switches are Kailh Box Jade; Der Garagenfund moves to a future blog article; separate light/dark logos are cancelled.

- 2026-10-06 — P3 documentation and handoff honesty: synchronized `readme.md`, `README.md`, and `ai/README.md` with the current Eleventy/data architecture and recorded remaining launch blockers, owner decisions, and live-deployment uncertainty. Committed and pushed as `66ff9e0`; no website source or runtime behavior changed; live deployment is not confirmed.

- 2026-10-06 — P2-remaining gallery control accessibility: removed the competing polaroid frame click handler so cheat-sheet and fullscreen actions have distinct targets. Committed and pushed as `e0a807f`; local build and all required checks pass; live deployment is not confirmed.

- 2026-10-06 — P2-F3: moved the seven blog records into `src/_data/blog.js`, generated the blog index and article navigation from that data, and documented the convention. Committed and pushed as `5237912`; local build, link/tag checks, image report, and blog-specific output assertions pass; live deployment is not confirmed.

- 2026-10-06 — P2-F2: externalized 17 page-local i18n dictionaries, kept legal pages German-only, renamed `nav.kontakt` to `nav.contact`, and documented the data convention. Committed and pushed as `4cc9980`; local build and link/tag checks pass; live deployment is not confirmed.

- 2026-10-06 — P2-F1: computed `og_url` / relative `og_image` / `pages.11tydata.js` (`layout`) / generated `sitemap.xml`; zero hardcoded base URLs left in templates; `ai/README.md` synced with `readme.md`. Committed and pushed as `0211d43`. Local build writes 21 HTML pages plus `sitemap.xml`; link and tag checks pass. Live deployment is not confirmed.
- 2026-10-05 — Planner: re-confirmed P2-E2 in git but still not live (R9); confirmed R10 (`mechanicon_logo.png` unused, 3 odd filenames identified and in use); detailed R6 (exact conflicting values, proposed default); found `ai/README.md` drift (2 lines); split P2-F into F1/F2/F3 and queued F1 in `PLAN.md`; decided `robots.txt` is not worth generating. No code changed.
- 2026-10-05 — P2-E2: default 1200×630 `og-preview.jpg`, 180×180 `apple-touch-icon.png`, `og:site_name` + `twitter:description` in `base.njk`, legal/contact meta descriptions 50–160 chars (`fe9c140`). Local build 21 pages / 0 link errors. Live Pages still old at verification time.
- 2026-10-05 — Planner: verified P2-E committed and deployed (`1a9325f`). Build 21 pages, 0 errors, 78 WebP files / 7.0 MB. Stray files removed (`e11d90c`). AI files updated. P2-E2 scoped.
- 2026-09-23 — P2-E image pipeline: `imagePipeline` transform in `eleventy.config.js`, WebP srcset/sizes/width/height/data-full on all processed images, 95% reduction in image bytes.
- 2026-09-21 — P2-D: self-hosted fonts, logo fix 1742×733, 404 without `<base>`, PCBWay `rel=sponsored`.
- 2026-09-20 — Planner review: findings R1–R11 recorded.
- 2026-09-18/19 — P2-C: full Eleventy migration (21 pages), GitHub Actions deploy live.
- 2026-09-11 — P2-B: Eleventy bootstrap (config, base layout, about proof page, inventory).
- 2026-09-09 — P1-A/P1-B: brand assets, about page, OWA LABS, guide IA. P2-A: interaction polish.
- 2026-09-05 — P1: contact form CORS fix, OSM map, OWA LABS partner card.
- 2026-09-03 — P0-B/P0-C: base-URL fix, English blog slugs, language decision.
- 2026-09-01 — Critical review, `ai/` handoff folder, P0 URL fixes.
