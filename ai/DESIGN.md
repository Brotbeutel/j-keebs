# Design brief (Designer role)

The Designer shapes how the site looks and feels: layout, visual hierarchy, components and their states, motion, interaction patterns and the user journeys through them — professional, appealing, intuitive, and interesting without being loud. The Designer does **not** write production code (`src/`, `style.css`, `main.js`), final copy (Writer) or legal wording (Lawyer). Output: a design spec in `ai/drafts/` plus a clickable prototype in `design/`; the owner approves; an implementer rebuilds it in the site.

## Identity — what already exists (verified in `style.css`, source `4e04a3e`)

- **Character:** a workshop notebook, not a storefront (`ai/GOALS.md`). Calm, earthy, warm; the keyboard photos are the stars and the chrome stays quiet. Sharp edges everywhere (`--radius: 0`); polaroid-style framed photos in the galleries.
- **Palette** (swatches): mocha `#8c7e74`, greige `#c3b8ad`, offwhite `#e9e3d3`, cream `#f4f0e1`, charcoal `#4c4b4e`, steel `#030a0c`, slate `#5c5654`, camel `#b2977e`, olive `#5a5c58`, terracotta `#b37563`. Accent: warm gold `--accent #b3a078` (bright `#cfbc96`, shade `#6e644e`); light-theme secondary accent `--accent-2 #61482c`.
- **Two themes:** the dark tokens are the CSS base (`:root`, `--bg #3a3736`); light via `[data-theme="light"]` (`--bg` cream). The initial theme is the visitor's stored choice, else the OS preference, else `DEFAULT_THEME` ("light"). Both themes are mandatory in every design.
- **Type roles:** `--font-display` Libre Caslon Text (headlines), `--font-body` IBM Plex Sans (text), `--font-mono` Courier Prime (specs, labels), `--font-hand` Playwrite DE Grund (personal accents), Silkscreen (pixel UI of the contact panel only). All self-hosted in `fonts/`.
- **Retro tone is reserved for the contact page** (owner decision: Win2k-style window). It must not leak into other pages.

## Principles for this site

1. **One clear action per screen.** Home: explore the builds. Contact: send a message.
2. **Content first.** Photography and the stories lead; navigation and chrome support quietly.
3. **One signature moment per page**, not decoration everywhere. Delight with restraint; motion explains, it does not show off.
4. **Mobile first.** Design 375 px first, then verify 768 px and 1280 px. Touch has no hover: every hover affordance needs a touch and a keyboard equivalent.
5. **Design for the longest German string first.** German is authoritative and longer than English.
6. **Accessibility is part of the design, not a pass at the end:** text contrast ≥ 4.5:1 (≥ 3:1 for large text and UI boundaries), computed for **both** themes — note that gold `--accent` on the light background is only 2.24:1, so gold is for borders and decoration there, not for small text (`BACKLOG.md` R18); visible focus; touch targets ≥ 44 × 44 px; `prefers-reduced-motion` honoured; every state reachable by keyboard; nothing conveyed by colour alone.
7. **Fast.** CSS-only effects where possible, no new libraries, images through the existing WebP pipeline.

## Hard constraints

- Static site (Eleventy, Nunjucks), vanilla CSS/JS only. No frameworks, no build-time CSS tools.
- **No external requests:** fonts, icons and images are self-hosted; a new font needs its licence checked and a provenance + licence file like Silkscreen's. The only third-party content is the OpenStreetMap iframe.
- Every visible string is a `data-i18n` key with DE and EN text (the Designer proposes the key table; the Writer owns final wording). Existing page IDs and hooks used by `main.js` (e.g. `contactForm`, `mapEmbed`) stay, or the spec maps old to new.
- FormSubmit fields and behaviour stay as they are unless the owner changes them (`BACKLOG.md`, `ai/LEGAL.md` data-flow inventory). Consent/privacy wording is legal copy — keep the existing text and link, or ask the Lawyer.
- Exactly one `<h1>` per page; legal pages are not a design topic.

## Deliverables

1. **Design spec** — `ai/drafts/YYYY-MM-DD-<topic>-designer.md`:
   - Goal and the user journey it serves (who arrives, from where, what they want).
   - Layout at 375 / 768 / 1280 px, described precisely enough to build without guessing.
   - Component inventory with **every state**: default, hover, focus, active, disabled, loading, error, success.
   - Tokens: reuse existing ones; every proposed new token named and justified; computed contrast ratios for each text/background pair in both themes.
   - Motion: duration, easing, trigger, reduced-motion behaviour.
   - Accessibility notes: roles, labels, focus order, keyboard use.
   - i18n key table: key → DE → EN (functional microcopy as a proposal).
   - **Acceptance criteria** the owner can check on a real device (3–8 bullets, observable, no jargon).
   - What the implementer must not change; open questions (max 5, each with a proposed default).
2. **Prototype** — `design/<topic>-vN.html`: one self-contained HTML file (inline CSS/JS), using the site's tokens and the repo's font files by relative path, switchable light/dark, every state demonstrable (e.g. `?state=error`), **no external requests**, at least one `<h1>`. It is a design reference, not production code: the implementer re-implements it inside `src/` and `style.css`.
3. Status line in the spec: `draft` → `owner-approved` → `integrated`. An implementer builds only from an owner-approved spec; deviations need the owner's (or Designer's) consent and are listed in the report.

**Look at it before you hand it over.** Render the prototype at the three widths in both themes if you can (screenshots in the spec); if you cannot, say so. Sanity check: `python scripts/a11y_audit.py design` (the script scans a folder of HTML files). The owner opens it with `Start-Process design\<topic>-vN.html`.

## Modes

- **Design:** create or rework a page or component → spec + prototype.
- **Design review:** audit existing pages for UX and visual quality → prioritised findings (severity, evidence, a concrete proposal each); no prototype unless asked.

## Brief D-1 — contact page redesign (first task; owner priority 2026-10-15)

**Goal:** turn the owner's draft `win2k-design/win2k-redesign.html` into a production-ready design for `contact.html`, keeping the retro Windows-2000 window concept. The owner wants the draft "reworked once more" and then migrated; they did not say what to change, so the Designer decides, explains each decision briefly, and the owner reacts to the prototype.

**Must keep from the current page (`src/pages/contact.njk`, `main.js`):**
- The form: name, e-mail, message; FormSubmit POST with the AJAX path and the `?sent=1` fallback; honeypot; the hidden `_subject`, `_captcha`, `_template`, `_next` fields; success and error messages in DE/EN; the privacy hint with its link.
- The contact methods (e-mail, address) and the GitHub/LinkedIn social links; the OpenStreetMap map (below); light and dark theme; DE/EN switching; responsive from 375 px.

**The map (finding R24 — owner test on a real phone, 2026-10-15):** saturation currently appears only when the card **around** the map was touched last; tapping **the map itself** leaves it grey while the map is still usable. Cause: the listener sits on the parent page and pointer events inside a cross-origin iframe never reach it (`main.js` `initMapTouchActivation`). Required behaviour: the map turns coloured when the visitor touches **the map itself** (touch and mouse) and also when it gets keyboard focus; a touch outside turns it grey again; the fade is **smoother and slower** than today's `filter 0.25s ease` (propose a duration and easing; reduced-motion users get no animation). Because the iframe cannot be observed directly, the design needs an activation affordance — the recommended pattern is a transparent layer above the iframe: the first tap activates (colour + layer removed, then pan/zoom works), a tap outside restores the layer; add a tiny, translatable hint ("Tippen, um die Karte zu benutzen"). The Designer may propose a different solution but must say how it detects a touch inside the iframe.

**Known issues in the draft (verified):**
- It loads fonts from Google Fonts (`@import`) and fontpixel.com — not allowed; use Silkscreen (already in `fonts/`) or a font whose licence is checked.
- It has no `<h1>` (the window title is an `h2`); the page needs exactly one.
- The ✕ button does nothing in the draft; in the live page it resets the form without asking (R14). Decide: purely decorative title-bar buttons (not focusable, `aria-hidden`) or a real, labelled, non-destructive control.
- It adds a **topic `<select>`** and an **"ISO-DE Layout bevorzugt" checkbox with no `name`** (never sent). Decide for each: keep (then specify the DE/EN strings and how it is forwarded) or drop. Proposed default: keep the select, drop the checkbox.
- The status-bar text ("COM1: 9600 BAUD") is invented decoration — fine if clearly decorative (`aria-hidden`), not as information.
- It is German-only, light-grey only (needs a dark-theme variant), and `form action="#"`.
- The retro PC pixel art appears twice (title icon and header); the owner's asset is `images/Retro-PC_pixelart_generated.png` (64 × 64, show with `image-rendering: pixelated`).

**Acceptance criteria to include in the spec (owner checks on a real phone and a desktop):** the window looks like the draft's concept in both themes; every field has a visible label and a clear error and success state; tapping the map itself turns it coloured, tapping outside turns it grey, the fade feels smooth; the form still delivers a message; nothing needs hover; keyboard-only use works; no text is cut off in German at 375 px.
