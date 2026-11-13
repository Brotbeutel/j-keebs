# D-2 — Win2k contact form: dropdown & validation states

**Status:** `draft`  
**Date:** 2026-11-13  
**Role:** Designer  
**Prototype:** `design/contact-v2.html`  
**Scope:** R30 only; no production code changed.

## Goal and user journey

A visitor reaches the contact window, chooses a topic, enters their name, e-mail and message, and sends the form. The dropdown and every validation/feedback state should feel native to the existing Win2k window without sacrificing the real HTML form controls, keyboard support, mobile picker behaviour or DE/EN language switching.

## Design decisions

### 1. Topic dropdown — progressive enhancement (A)

Keep the existing real `<select id="topic" name="topic">` and all four existing option values. Style the closed control everywhere: same inset 3 px bevel, Gohufont typography, dark/light input surface, pixel caret and visible gold focus outline.

Where supported, opt into the customizable native select with `appearance: base-select` on the select and `::picker(select)`. Style the picker as a flat Win2k panel: window surface, 3 px dark frame, hard offset shadow, compact option rows, title-bar-colour highlight and light title text for hover/keyboard focus/selected row. The picker remains browser-managed; do not implement a hand-built listbox.

**Why A:** this preserves native select semantics, form submission, keyboard behaviour and the platform picker on touch. A custom ARIA combobox would duplicate behaviour already provided by the browser and create avoidable focus, type-ahead, screen-reader and mobile-picker risks.

**Browser support checked 2026-11-13:** MDN labels customizable selects “Limited availability”, not Baseline. Current support data indicates Chromium 135+ and Safari 27+, while Firefox does not ship it by default (experimental preferences only). Therefore the Win2k open list is progressive enhancement, not a universal promise. Unsupported browsers keep the native OS popup; the closed control still receives our styling. Do not add a JS polyfill. Recheck support immediately before implementation if the package is delayed. Sources: [MDN customizable select](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select) and [MDN browser compatibility data](https://github.com/mdn/browser-compat-data/blob/main/css/properties/appearance.json).

**Touch:** do not replace the native picker with a custom overlay. Keep the real select and allow the operating system/browser to provide its normal touch interaction. The prototype uses the native select in all browsers.

### 2. Validation and feedback

The browser-native validation bubble is replaced only after JavaScript initializes: set `form.noValidate = true` in the submit handler setup. Keep the HTML `required` and `type="email"` attributes so native validation remains available without JS.

On submit, validate required name, e-mail and message in document order. An empty e-mail gets the empty message; a non-empty malformed e-mail gets the format message. Show every applicable inline error at once, set `aria-invalid="true"`, associate the message through `aria-describedby`, and move focus to the first invalid field. Do not use `reportValidity()` (that would re-open the browser bubble).

When the user edits an invalid field, revalidate that field and clear its error as soon as it becomes valid. Other fields' errors remain until corrected. If the form becomes valid, clear the validation status. On a language switch, visible errors and the status line must be refreshed in the new language without losing field values or focus.

The existing live status region remains the single summary channel. Its text is also mirrored in the decorative status bar:
- Validation: “Status: Eingaben prüfen.” / “Status: Please check your entries.”
- Sending: retain existing sending text.
- Success: retain existing success text.
- Server/network failure: explain that sending failed and offer the direct e-mail route. Do not claim success unless FormSubmit actually confirms it.

### 3. Exact validation microcopy (DE source, EN translation)

| Key | German | English |
| --- | --- | --- |
| `c.error.name` | Bitte gib deinen Namen ein. | Please enter your name. |
| `c.error.emailEmpty` | Bitte gib deine E-Mail-Adresse ein. | Please enter your email address. |
| `c.error.emailInvalid` | Das sieht noch nicht nach einer E-Mail-Adresse aus. | That doesn't look like a valid email address yet. |
| `c.error.message` | Schreib mir bitte kurz, worum es geht. | Please tell me briefly what it is about. |
| `c.form.validation` | Status: Eingaben prüfen. | Status: Please check your entries. |
| `c.form.error` | Status: Serverfehler – bitte nutze alternativ die E-Mail-Adresse. | Status: Server error — please use the e-mail link instead. |

Final copy belongs to the Writer; these are functional design proposals.

## Layout and responsive behaviour

- **375 px:** single-column form fields; the select fills available width; long German option labels wrap or remain fully readable inside the native/custom picker and are never clipped by a fixed width. Error copy wraps beneath its own field without horizontal scrolling.
- **768 px:** retain the form's current layout rules; name/e-mail may sit in the existing two-column row when space permits. The picker width follows the select.
- **1280 px:** preserve the existing form/sidebar composition and the current window proportions. No new full-page redesign.
- Both themes are mandatory. Keep the current window and typography; the only visual changes are the select caret/picker and validation states.

## Component inventory and states

| Component | Default | Hover | Focus / keyboard | Active / selected | Disabled / loading | Error / success |
| --- | --- | --- | --- | --- | --- | --- |
| Topic select | Inset field, pixel caret | Subtle accent border only | 3 px gold focus outline; native arrow-key navigation | Selected row uses title-bar surface in supported picker | Not disabled in current flow | No validation error; selection remains available |
| Picker options | Flat rows | Title-bar highlight | Native keyboard focus, type-ahead, Home/End and arrows | Checked row has visible check mark | N/A | N/A |
| Name/e-mail/message | Existing inset controls | Existing treatment | Visible gold outline | Caret/text entry | Remain editable while not sending | Inline error under each invalid field; border gets error treatment |
| Inline error | Hidden | N/A | Associated with field via `aria-describedby` | N/A | N/A | Visible warning triangle + readable text; removed as field becomes valid |
| Submit button | Existing primary bevel | Existing hover | Existing visible focus | Existing pressed bevel | Disabled during sending | Enabled again after success/failure |
| Live status + status bar | Connected/idle | N/A | Live region announces status | N/A | Sending text while request runs | Validation summary, success or failure text |
| Language toggle | Existing control | Existing treatment | Existing keyboard operation | Switches all copy | N/A | Visible errors/status update language without clearing values |
| Window | Existing Win2k frame | Existing P3-C2 float | Existing focus-within float | Existing pressed controls | N/A | No layout shift |

## Contrast

The prototype's validation colours were checked against the existing window surfaces:

| Text | Background | Contrast |
| --- | --- | ---: |
| Dark error `#ffb4a9` | Dark window `#3c3836` | 6.82:1 |
| Light error `#8b1e16` | Light window `#dcd3be` | 6.15:1 |
| Dark title text `#f0e6d2` | Dark title `#745b40` | 5.12:1 |
| Light body text `#2b2622` | Light window `#dcd3be` | 10.05:1 |

All listed text pairs exceed WCAG AA 4.5:1. Gold is decorative/focus only, not the sole error signal. Error state uses icon + text + border, not colour alone. Recheck final production tokens when implemented.

## Motion

No new dropdown animation is required; native picker transitions are browser-controlled. The existing window float remains 200 ms ease on hover/focus-within-capable devices only. Under `prefers-reduced-motion: reduce`, no float/transition. Error appearance is immediate and does not move the page unexpectedly.

## Accessibility and behaviour

- Keep the native labelled `select`, `name="topic"`, existing values and options.
- Do not implement a custom listbox or intercept native select keyboard events.
- Native select supports platform keyboard behaviour; verify Tab, Space/Alt+Down as appropriate, arrows, Home/End, type-ahead and Escape on tested desktop browsers.
- Every form field has a visible label. Inline errors are linked by `aria-describedby`; invalid fields expose `aria-invalid`.
- Focus the first invalid field on submit. Do not move focus when a user edits an error away.
- Use the existing `role="status" aria-live="polite"` region for status summaries. Do not make every inline error an assertive alert; focusing the first invalid field and its description gives a predictable announcement.
- Preserve all current FormSubmit fields, honeypot, action URL, AJAX path and no-JS fallback. No new data is collected.
- No external fonts, scripts, images or requests.

## Prototype usage

Open `design/contact-v2.html`. It is self-contained except for the same local font/image paths as v1. Controls in the header switch language and theme.

Use the state links above the form:
- `?state=default` — idle form
- `?state=empty` — all required fields empty and invalid
- `?state=invalid` — malformed e-mail
- `?state=multiple` — malformed e-mail plus the other required fields empty
- `?state=sending` — sending status
- `?state=success` — success status
- `?state=server-error` — failure status

**Prototype limitation:** the submit action is simulated and never transmits a message. The production implementation must retain the existing FormSubmit AJAX/fallback behaviour and must only show success after a confirmed successful response. The map in the prototype is still a schematic preview inherited from v1, not the live OSM map.

## Acceptance criteria for owner review

1. In dark and light themes, the closed select looks like an inset part of the Win2k window and has a clear pixel caret.
2. In a supporting browser, opening the select shows a flat Win2k picker with a clearly visible selected/focused row. In Firefox or any unsupported browser, the native popup remains usable and the closed control is still styled.
3. On a phone, the select opens the platform's native picker; no custom listbox or tiny click target appears.
4. Submitting an empty form shows inline errors in the current site language; no browser validation bubble appears.
5. Submitting a malformed e-mail shows the format-specific message. With multiple errors, all appear and focus moves to the first invalid field.
6. Correcting a field clears only that field's error. Switching DE/EN while errors are visible translates them without clearing values.
7. At 375 px, no German label or error is clipped; keyboard-only use works; reduced-motion preference removes the window float.

## Requirements trace

| Requirement from D-2 brief | Prototype implementation | How to inspect |
| --- | --- | --- |
| “the closed control — inset like the text fields, a pixel-style caret, same font and focus ring” | Existing inset bevel retained; caret and focus styling added | Open default state; Tab to select |
| “the opened list — Win2k look” | `@supports (appearance: base-select)` picker styling | Open picker in supported Chromium/Safari |
| “hover, selected and keyboard-focus rows” | `:hover`, `:checked`, `:focus` option rules | Navigate picker with keyboard |
| “long German labels must not be cut off at 375 px” | Full-width select, no fixed width; options remain native text | Resize to 375 px and open picker |
| “Touch devices … keep the native picker” | Retains real native `select`; no custom component | Open on phone |
| “per-field inline error message under the field” | `.field-error` blocks for name, e-mail and message | `?state=empty` |
| “invalid field's border state” | `[aria-invalid="true"]` rules | `?state=invalid` |
| “several errors at once” | `?state=multiple` | Open URL |
| “error cleared while typing” | Input listeners revalidate invalid field | Type into an invalid field |
| “sending, success, server error” | Status state links and submit simulation | `?state=sending`, `?state=success`, `?state=server-error` |
| “messages follow the site language including a language switch while an error is visible” | DE/EN dictionaries and status refresh | `?state=empty`, then click EN |
| “JavaScript sets form.noValidate = true” | Set during prototype initialization | Inspect script |
| “aria-invalid, aria-describedby” | Invalid attributes and error IDs | Inspect DOM / accessibility tree |
| “focus moves to the first invalid field” | Submit validation focuses first invalid | Submit empty state |
| “keyboard-only use works” | Native select and semantic form controls | Tab/arrow/Enter/Escape |
| “both themes” | Existing theme switch and theme-specific error tokens | Toggle theme in every state |
| “Window float details” | 200 ms lift with reduced-motion override | Hover/focus window; toggle reduced motion |

## Not implemented / known limitations

- Real-device visual and touch testing has not been performed here. Owner must test current Chrome/Edge, Firefox and Safari/iOS.
- Browser support for customizable select is incomplete; the unsupported-browser native popup is intentional and not a failed design.
- The prototype uses the inherited schematic map and simulated send flow; neither is part of D-2's scope.
- This is a design reference only. No production templates, CSS, JavaScript, i18n dictionaries, or FormSubmit logic were changed.

## Implementer handoff — P3-C3

After owner approval:
1. Port only the dropdown closed/open styling and inline validation behaviour to `src/pages/contact.njk`, `style.css`, and `main.js`/page dictionaries as appropriate.
2. Keep the existing field IDs, select values, FormSubmit payload and AJAX/no-JS fallback.
3. Recheck the language switch while errors are present, native select fallback, 375 px layout, both themes, keyboard and reduced-motion behaviour.
4. Run the full checks in `ai/TOOLS.md`; do not change legal wording or unrelated contact/map behaviour.
5. Report any differences from this spec before merge.

## Sources checked 2026-11-13

- MDN, [Customizable select elements](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select) — feature is marked limited availability and documents progressive enhancement/fallback.
- MDN Browser Compat Data, [CSS appearance](https://github.com/mdn/browser-compat-data/blob/main/css/properties/appearance.json) — current `base-select` compatibility.
