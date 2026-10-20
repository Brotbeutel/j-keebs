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

1. ~~P0 … P2-remaining~~ ✅ done and deployed (details in git history and `STATUS.md`)
2. ~~P3 content / README honesty, index gallery, mobile map, contact panel redesign~~ ✅ done (`66ff9e0`, `a864192`…`3da476a`)
3. ~~P3-M Mechanicon announcement post + R12~~ ✅ done (`d033410`; R12 live-confirmed 2026-10-19; post and image approved by the owner)
4. ~~Win2k contact-form window (owner-scoped slice of D-1/P3-C)~~ ✅ committed and live (`76edb45`)
5. **P3-C2 — contact form polish, map activation, CSS cleanup** ← current package (below)
6. D-2 — Designer: Win2k dropdown + validation message (parallel to P3-C2, no site code) → P3-C3 (implement the approved spec)
7. P3-H — launch hygiene, reduced, now including the footer credit "Powered by PCBWay, run on GitHub Pages" (`BACKLOG.md` → "Ready")

Everything else (Lawyer audit, Tools & Ressourcen, contrast pass, About rewrite, footer line, further articles) is parked in `BACKLOG.md` → "Next candidates" with its blocker. Do not skip ahead.

## Current work package: P3-C2 — contact form polish, map activation, CSS cleanup

**Goal:** finish the Win2k contact window with the owner's concrete corrections, make the map turn coloured when it is touched itself, and remove the dead code the Win2k migration left behind.

**Why now:** owner priority 2026-10-19/20, from a test on a real phone. The migration of 2026-10-17 only moved the form window, so the map is unchanged (R24). The Designer prototype `design/contact-v1.html` has a map activation layer (`.map-activate`, `#mapActivate`, key `c.map.activate`), but the owner did **not** take it over because it was faulty — treat it as a sketch, not as a spec.

**Text/design/legal impact:** none new — all strings exist in the prototype or are named below; the iframe keeps loading with the page (no legal change). The only data change is the checkbox default (item 1).

**In scope**

1. **ISO-DE checkbox (R27).** The global reset `button, input, textarea, select { appearance: none }` (`style.css` ~line 235) removes native checkbox rendering, and `.retro-contact-form__checkbox-group input` only sets size and `accent-color` — so the box shows no state and looks unlike the fields. Draw it in CSS: **inset exactly like the text fields** (same `--retro-input` background and the same 3 px border: dark top/left, light bottom/right as `.retro-contact-form__input`), a pixel-style check mark in `--retro-accent` when checked; hover, `:focus-visible` (same outline as the inputs), checked and disabled states; clicking the label **or** the box toggles it visibly, Space toggles from the keyboard; the label row is at least 44 px tall; light and dark theme. Keep `name="iso_de_layout" value="yes"` and the label `for`/`id`. **Default: checked, as today** (owner decision 2026-10-20; keep `checked` in `contact.njk`) — so `iso_de_layout=yes` is sent unless the visitor unticks it. Reset returns it to checked.
2. **Send button border (R28).** `.retro-contact-form__button--primary` only changes the fill, so the bevel stays grey. Give it a bevel from its own accent: lighter tint top/left, darker tint bottom/right, inverted on `:active` (as the other buttons do), defined as `--retro-accent-light` / `--retro-accent-dark` next to `--retro-accent` for **both** themes; hover and focus unchanged; label contrast stays ≥ 4.5:1. Show the owner a before/after.
3. **Window float (R29).** `.retro-form-window` lifts like `.card:hover` (`style.css` ~1055: `translateY(-4px)`, larger shadow, `transition 0.2s ease`) on hover **and on `:focus-within`** (clicking into the form), **only inside `@media (hover: hover)`** like the cards; no float on touch devices; none under `prefers-reduced-motion: reduce`. The pixel bevel borders stay (do not swap to the accent border); the hard pixel shadow grows proportionally; use `transform` only, so nothing around it shifts.
4. **Map (R24) — build it again from the requirements below.** Do not copy the prototype's layer; it was faulty (the owner has not said how). Pointer events inside the cross-origin OSM iframe never reach the page, so the approach needs something **above** the iframe: a transparent activation layer (a `<button type="button">`) with the hint `c.map.activate` ("Tippen, um die Karte zu benutzen" / "Tap to use the map") — or another mechanism you can justify.
   Required behaviour: a first touch or click **on the map itself** activates it — `.map-embed` gets `.is-active`, the map fades from grey to colour over **650 ms, `cubic-bezier(0.22, 0.61, 0.36, 1)`** (today `0.25s ease`), the layer goes away and the map can be panned and zoomed; a `pointerdown` **outside** `.map-embed` deactivates it (grey again, layer back); it can be activated again afterwards; keyboard: the layer is focusable, Enter/Space activates, and focus is never trapped; hover-capable devices keep today's hover colouring; `prefers-reduced-motion`: no transition; the hint follows the DE/EN switch; no layout shift.
   **Failure modes to design against (test each, list the results in the report):** (a) the layer must not block vertical page scrolling when the finger starts on the map while it is inactive; (b) while active, touching outside must reliably release the map so the page scrolls again (the classic map scroll trap); (c) the hint must not cover the marker permanently; (d) no double activation, no stuck colour after deactivating; (e) it works on iOS Safari and Chrome on Android — if only one can be tested, say which; (f) the old `initMapTouchActivation()` / `.card.is-map-active` mechanism is removed, not stacked.
   `#mapEmbed` loses `tabindex="0"` (a focusable generic `div`) and gets `role="group"` with `aria-label` from the dictionary (`c.map.regionLabel`) — this also clears the `a11y_audit.py` warning.
5. **Cleanup (R31).** First prove nothing uses the old classes: `grep -rn "win2k-" src main.js` must be empty. Then delete the dead `.win2k-*` CSS (`style.css` from the comment "J-Keebs — Win2K Window UI" ≈ line 2648 up to the `.retro-form-window` block ≈ line 3436 — four generations of the same rules, ~790 lines). Silkscreen is only used inside those dead rules (one `font-family` at ~3381): remove its two `@font-face` blocks, `fonts/silkscreen-latin-*.woff2`, its `LICENSE-silkscreen*` file and its row in `fonts/README.md`, the Silkscreen mentions in `ai/CONVENTIONS.md` and `ai/STATUS.md`, and the `@fontsource/silkscreen` dev dependency (`npm uninstall @fontsource/silkscreen`, keep the lock file consistent). Keep every `retro-*` rule.
6. **Handoff.** Update `ai/STATUS.md`, `ai/BACKLOG.md` (mark R24, R27–R29, R31 done in the source) and the baseline in `ai/TOOLS.md`. The report contains a **parity table**: every item of the Designer spec's component inventory (`ai/drafts/2026-10-15-contact-designer.md`) → implemented yes/no/partial → file:line. Set that spec's status line to `integrated` with a note on what is still partial.

**Out of scope:** the dropdown popup and the validation message (D-2 → P3-C3, the owner wants them designed first), the rest of the contact layout redesign, the title-bar ✕ (owner decided: it may reset the form), the footer credit (P3-H), font provenance (R25, Lawyer), every P3-H item, legal pages, any other page, new dependencies, committing.

**Done when**

- `npm run build` writes **22** HTML pages + `sitemap.xml`, no errors.
- `python scripts/check_links.py _site` → 0 errors (baseline 1252 references; report the new count); `python scripts/tag_balance.py _site` → 0 problems; `node scripts/i18n_audit.js` → 0 errors; `python scripts/de_default_audit.py` → only the three baseline findings (about, faq, switches) and none for `contact`; `python scripts/a11y_audit.py` → 0 errors and **no warning for `contact.html`** (10 heading-skip warnings remain until P3-H); `node --check main.js` ok.
- `grep -rn "win2k-" style.css src main.js` finds nothing, `style.css` is at least 700 lines shorter, and `Select-String -Path style.css,package.json,fonts\README.md -Pattern 'ilkscreen'` finds nothing.
- `git status --short` in the report shows exactly the intended files; **no unexpected deletions** (`git ls-files --deleted` is empty).
- Owner steps, each as a plain instruction with a PowerShell command where one helps: (phone) tap **the map itself** → it turns coloured and fades in smoothly, panning and zooming work, tapping elsewhere turns it grey again; (desktop) hovering the window lifts it like the other tiles and clicking into a field keeps it lifted; the ISO-DE box looks inset like the fields, shows a check mark and toggles on click; the send button has a gold-toned border in both themes; the message still arrives (FormSubmit).
- Live deployment is **not** claimed until the owner has checked it on a real phone (bypass caches with `?v=<random>`) and confirmed the Actions run is green.

## After P3-C2

Return to the planner chat. P3-C3 (dropdown + validation) starts when the owner has approved the D-2 spec; P3-H is independent. Candidate packages and their blockers: `BACKLOG.md` → "Next candidates".
