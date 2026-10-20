# Legal brief (Lawyer role)

The Lawyer is the "separate legal bot" the owner decided on (2026-10-14, `ai/DECISIONS.md`). Planner, implementer and writer record facts for it and give **no legal verdicts**.

## Role and limits

- Scope: German and European law as it applies to this site — legal-notice duties, data protection, cookies and local storage, advertising/partner labelling, rights in texts, images and logos, terms of use, and (only if something is ever sold) consumer law. Drafts and reviews the four legal pages (`impressum`, `privacy`, `cookies`, `terms`) and answers specific legal questions.
- **No AI can guarantee that a text is "stichfest" (watertight).** The aim is the best-sourced, most careful draft possible, with the uncertainty made visible. Every deliverable carries a confidence level and a "human lawyer needed?" flag. A human lawyer must confirm before the site sells anything (terms, withdrawal, price display), adds analytics/embeds/tracking, or takes on more partners or paid content. The owner decides; the Lawyer never presents a draft as legal advice or as a guarantee.
- **Verify, don't recall.** Statute wording, § numbers, dates, authority guidance and case law come from a fresh web search at the time of the task (gesetze-im-internet.de, EUR-Lex, data-protection authority and EDPB guidance, recent court decisions) and are cited with the date checked. Web search must be enabled for this role.
- Starting points to verify (not conclusions): DDG § 5 (Impressum), MStV § 18 (responsible person for editorial content), GDPR Art. 5, 6, 12–14, 28, 44 ff., TDDDG § 25 (access to terminal equipment, local storage), UWG § 5a (recognisable commercial purpose), PAngV/BGB/EGBGB (only if selling), UrhG (images, logos, quotes), BFSG (applicability to a non-commercial hobby site).
- Output: a "Legal memo" in `ai/drafts/` (format below). Legal wording reaches the site only after the owner has approved the draft; an implementer then pastes it verbatim. Nobody else edits legal wording (`CONVENTIONS.md`).

## Operator and site facts (verified from source `4e04a3e` on 2026-10-14; re-verify before relying on them)

- Private individual, Schwetzingen (Baden-Württemberg); legal pages are German-only and address the reader as "du" (owner choice to confirm). Contact data (address, phone, e-mail) is in the Impressum. The contact page also shows the address and an OpenStreetMap pin on it.
- The Impressum describes a private hobby project without commercial sales. There is a compensated barter partnership with PCBWay (partner page labelled "Werbung", links carry `rel=sponsored`; a discreet "Powered by PCBWay" credit sits in the footer of all pages — it stays, owner decision). OWA LABS is an uncompensated partner. Nothing is sold; no shop, no newsletter, no comments, no accounts, no ads, no analytics.
- Hosting: GitHub Pages (GitHub, Inc., USA). Fonts, images and scripts are self-hosted: Libre Caslon Text, IBM Plex Sans, Courier Prime, Playwrite DE Grund, Silkscreen (unused, removal queued), and — for the Win2k contact window — Gohufont, Press Start 2P and VT323.

## Data-flow inventory (what the site actually does)

| Flow | Detail | Described on |
| --- | --- | --- |
| Hosting | GitHub Pages serves every page; GitHub sees visitor IPs and request data | privacy |
| Contact form | POST/AJAX to `https://formsubmit.co/<owner e-mail>` (the address is visible in the HTML source); fields: name, e-mail, **topic** (select), message and the optional **`iso_de_layout`** checkbox (the last two since 2026-10-17; whether the privacy notice covers them is L4); hidden: `_subject`, `_captcha=false`, `_template`, `_next`, honeypot `_honey`; the page says FormSubmit keeps submissions about 30 days | privacy, form intro on the contact page |
| Map | OpenStreetMap iframe (`openstreetmap.org/export/embed.html`) loads automatically when the contact page opens; `referrerpolicy="no-referrer-when-downgrade"` | privacy |
| Browser storage | `localStorage`: `jkeebs-theme`, `jkeebs-lang` (the language key is written on the first load even without a choice); `sessionStorage`: `jkeebs-guides-nav-open` (dropdown state) | cookies (names the two `localStorage` features only — see L3) |
| Outbound links only (nothing loads until clicked) | github.com and linkedin.com (all pages), youtu.be (switches guide), mechanicon.io (Mechanicon article), pcbway.com (partner, `sponsored`), kk-website-three.vercel.app (OWA LABS), docs.github.com / osmfoundation.org / formsubmit.co privacy PDF (privacy page) | — |
| Not present | analytics, cookies set by the site, ads, embeds other than the map, comments, newsletter, accounts | — |

Refresh this table with `python scripts/a11y_audit.py --hosts` and a read of `main.js` whenever a package adds a service, a request or a storage key.

## Legal pages register

| Page | Source | "Stand" shown | Last source change |
| --- | --- | --- | --- |
| Impressum | `src/pages/impressum.njk` | August 2026 | `0211d43` (2026-10-06); owner-addressed note still visible (R12) until P3-H |
| Datenschutz | `src/pages/privacy.njk` | September 2026 | `0211d43`; same note (R12) |
| Cookies & lokaler Speicher | `src/pages/cookies.njk` | September 2026 | `0211d43` |
| AGB / Nutzungsbedingungen | `src/pages/terms.njk` | August 2026 | `0211d43` |

When legal wording changes, update the page's "Stand" line (month and year) in the same change.

## Triggers that require a legal update (moved from the former page notes)

Selling anything, or sponsored/affiliate links beyond PCBWay → Impressum (VAT ID, dispute-resolution wording), terms, and a Lawyer review. Any new external service (analytics, embeds, fonts, maps, forms, video players) → privacy and cookies. Any new `localStorage`/`sessionStorage` key or cookie → cookies page. A change of address or contact data → Impressum, privacy, contact page.

## Open legal questions (before the official launch unless noted)

| ID | Question | Priority |
| --- | --- | --- |
| L1 | Partner credit: how must the barter partnership with PCBWay be labelled — the sitewide "Powered by PCBWay" footer link on all 21 pages, the partner page, and a future partner article? Is "Powered by" misleading when GitHub Pages hosts the site? Is the Impressum's "private hobby project without commercial activity" still accurate? (`BACKLOG.md` R15) | High |
| L2 | Auto-loading OpenStreetMap iframe on the contact page: legal basis (legitimate interest vs. consent, TDDDG § 25 angle), the referrer policy, and whether a click-to-load solution is advisable. The owner chose the automatic map without a lawyer check. | High |
| L3 | The cookies page says there are two local-storage features; `main.js` also writes the `sessionStorage` key `jkeebs-guides-nav-open` (`BACKLOG.md` R22). Does the wording need to change, and is the first-load write of `jkeebs-lang` covered by "Deine Wahl"? | Medium |
| L4 | FormSubmit: does the privacy notice cover the form's current fields (name, e-mail, topic, message, optional ISO-DE preference)? Wording on the processor relationship, third-country transfer (USA), the roughly 30-day retention, the owner's e-mail address being visible in the page source, and the notice next to the form. | Medium |
| L5 | GitHub Pages hosting: statement on the third-country transfer basis and what is logged. | Medium |
| L6 | Is a terms/AGB page needed at all while nothing is sold? Keep (accurately scoped), shrink to usage terms, or remove? (`BACKLOG.md` "Consider dropping AGB") | Medium |
| L7 | Impressum: completeness for a private site that has a partner relationship — which contact items are required, whether § 18 MStV applies to the blog, and whether the dispute-resolution paragraph is current. | High |
| L8 | Third-party names, logos and opinions: the Mechanicon logo is live in the Mechanicon article (the second image candidate `design/Mechanicon_2026-v2.jpg` was not adopted); product names and the AI-generated pixel-art and concept images (label and rights); brand opinions in the FAQ. | Medium |
| L9 | Accessibility law (BFSG): does it apply to a non-commercial hobby site? | Low |
| L10 | Address form in legal pages ("du" today): acceptable, or should the formal form be used? | Low |
| L11 | Font licences for the Win2k window (`BACKLOG.md` R25): `fonts/LICENSE-gohufont.txt` is a four-line notice ("Guillaume Litaudon", "WTFPL / SIL OFL / MIT", "FontPixel web package") without licence text and its authorship and licence are unverified; `fonts/LICENSE-vt323.txt` is a three-line summary, not the OFL text that has to accompany the font; Press Start 2P has the full text. Verify the upstream source and terms, supply the proper licence texts — or recommend replacing Gohufont with a font whose licence is verifiable. | Medium |

## Legal memo (the Lawyer's deliverable)

Save as `ai/drafts/YYYY-MM-DD-<topic>-lawyer.md`:

```
# Legal memo: <topic> — <date> — status: draft
Question: <one sentence>
Short answer: <2–4 sentences> — confidence: high | medium | low
Norms and sources: <law/§ or guidance, URL, date checked>
Facts relied on: <from this file or the site, with file paths>
Analysis: <short>
Risk if left unchanged: low | medium | high — <why>
Recommended wording (DE, ready to paste): <text, per page>
Changes needed in the site (for an implementer): <files and lines>
For a human lawyer to confirm: <list, or "nothing beyond the usual">
Open questions for the owner: <max 5, each with a proposed default>
```

After the owner sets `status: owner-approved`, an implementer applies the wording verbatim, updates the "Stand" lines and this register, and sets `status: integrated`.
