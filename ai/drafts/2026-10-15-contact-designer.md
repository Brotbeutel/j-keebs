---
title: "D-1 — Contact page redesign (1:1 Win2k-Vorlage)"
date: 2026-10-16
role: Designer
status: integrated
integration_note: "Integrated across 2026-10-17 migration and 2026-10-20 P3-C2 (form window, ISO-DE checkbox inset & pixel checkmark, send button accent bevel, window float, map activation layer with 650 ms transition, dead CSS & Silkscreen removal). The dropdown popup and custom validation UI are scheduled for D-2 / P3-C3. See BACKLOG.md R30 and PLAN.md P3-C3."
---

# D-1 — Contact page redesign (1:1 Win2k-Vorlage)

## Goal and user journey

**Goal:** Turn the owner's design draft `win2k-design/win2k-redesign.html` 1:1 into the production design for `contact.html`, preserving the authentic Windows 2000 retro window aesthetic, fonts, bevels, components, and layout while integrating site chrome, FormSubmit data requirements, self-hosted fonts without external requests, and the map touch activation fix from finding R24.

**Journey:** A visitor arrives from the site navigation with a question or project idea; sees the intro and the authentic Win2k window (`J-Keebs_Contact.exe`); fills in Name, Email, Topic, Message, and the optional ISO-DE checkbox; sends the message or chooses direct contact methods (email/phone/address/OSM map/GitHub/LinkedIn). The page works consistently across touch, mouse, keyboard, dark theme, light theme, German and English.

## Decisions

1. **1:1 Takeover of Win2k Window:** Adopt the exact markup, CSS bevels, colors, and layout from `win2k-design/win2k-redesign.html` for `.retro-window`.
2. **Self-Hosted Retro Fonts:** Use the original fonts from the template (`Gohufont`, `Press Start 2P`, `VT323`) fully self-hosted from local `.woff2` files in `fonts/` with accompanying OFL/permissive licenses, eliminating external `@import` requests to Google Fonts or fontpixel.com.
3. **Dialog Header & Pixel Art:** Retain the gold `[ Sende eine Nachricht ]` header, the friendly intro copy, and the 80×80 px beveled `.pixelart-container` with `Retro-PC_pixelart_generated.png`.
4. **Form Controls & Inputs:** Retain the deep 3D inset styling (`border-top/left: 3px solid var(--border-dark); border-bottom/right: 3px solid var(--border-light)`), dark input background, `User / Name:`, `E-Mail Adresse:`, the category dropdown (`name="topic"`), and the `[x] ISO-DE Layout bevorzugt` checkbox (`name="iso_de_layout"`, value `"yes"`).
5. **Action Buttons:** Keep the prominent gold `[ SENDEN ]` button and the beveled `Zurücksetzen` button (`type="reset"`). The close button `✕` in the title bar also triggers a clean form reset without closing the page structure.
6. **Status Bar:** Retain the sunken 3D status bar with `COM1: 9600 BAUD` and make the left status field dynamic (shows `Status: Verbindung hergestellt`, `Status: Wird gesendet …`, `Status: Danke! Nachricht gesendet.` or `Status: Fehler beim Senden.`).
7. **Finding R24 (Map Activation):** Keep the OSM iframe auto-loaded in the sidebar. Place a transparent activation button overlay above it with the hint „Tippen, um die Karte zu benutzen“; the first tap removes the overlay and smoothly transitions map saturation (650 ms cubic-bezier); clicking or tapping outside restores the overlay.
8. **Dual-Theme Support:** Dark mode uses the exact colors from `win2k-redesign.html` (`--win-bg: #3c3836; --win-title-bg: #60513e;`). Light mode adapts to warm retro beige Windows 2000 dialogs (`--win-bg: #dcd3be; --win-title-bg: #745b40; --input-bg: #f9f5ea;`).

## Layout

### 375 px (Mobile)
- Page gutters: 16–20 px. Site header and hero (`Kontakt`, `Sag Hallo.`, intro) sit above the content.
- The `.retro-window` takes full content width.
- Inside the window: `.dialog-header` stacks or scales the 80 px pixel-art frame (64 px on narrow screens) beside the text.
- `User / Name:` and `E-Mail Adresse:` stack vertically in single columns.
- Topic dropdown, message textarea, checkbox, and action buttons (`[ SENDEN ]` and `Zurücksetzen`) fit comfortably without horizontal overflow (`scrollWidth = 375px`).
- The contact information cards (Anschrift, Map, Direkt, Online) follow below the form. The map has an aspect ratio of 16:9 with the activation layer overlay.

### 768 px (Tablet)
- Form and sidebar stack or form takes full width; `User / Name:` and `E-Mail Adresse:` share a two-column row (`.form-row-2col`).
- Dialog header shows the 80 px pixel-art frame with ample space beside the header copy.
- Contact cards form a clean secondary grid below the window.

### 1280 px (Desktop)
- Centered grid with max-width 1180 px:
  - Form column (span 8): hosts `.retro-window` as the primary workspace.
  - Details column (span 4): hosts Anschrift with the OSM map embed, Direkt contact (email, phone), and Online profiles (GitHub, LinkedIn).
- Title bar: 38 px height, 20 px pixel art icon, `J-Keebs_Contact.exe`, and beveled `✕` button.

## Component inventory and states

| Component | Default | Hover | Focus | Active / Pressed | Disabled / Loading | Error | Success |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Retro Window (`.retro-window`) | 3D bevel frame (`border-top/left: 3px solid var(--border-light); border-bottom/right: 3px solid var(--border-dark)`), shadow `4px 4px 0 rgba(0,0,0,0.5)` | Static | N/A | N/A | N/A | N/A | N/A |
| Window Titlebar | Warm gradient (`linear-gradient(90deg, var(--win-title-bg), #3a3124)`), pixel art icon, `J-Keebs_Contact.exe` in Gohufont/Press Start 2P | Static | N/A | N/A | N/A | N/A | N/A |
| Close Button (`✕`) | 24×24 px square beveled button | Highlight top/left | 3 px theme outline | Inverted 3D bevel (`border-top/left: var(--border-dark)`) | N/A | N/A | Resets form fields |
| Pixel Art Box (`.pixelart-container`) | Inset bevel box holding 80×80 px `Retro-PC_pixelart_generated.png` (`image-rendering: pixelated`) | Static | N/A | N/A | N/A | N/A | N/A |
| Inset Inputs (`.retro-input`, `.retro-textarea`, `.retro-select`) | Deep sunken 3D border, dark background (`#2b2826` dark, `#f9f5ea` light), white/contrast text in Gohufont | Border top/left retains inset depth | Background shifts to `#24211f`, border-top color highlights in gold `--accent-gold` | Native input behavior | Editable during request | Native validation tooltip, status bar shows error | Cleared upon success |
| ISO-DE Checkbox | Accent-color gold checkbox with Gohufont label | Pointer cursor | Visible focus outline | Toggled state | N/A | N/A | Retains state |
| Submit Button (`[ SENDEN ]`) | Solid gold background (`#c29b62`), dark text, Press Start 2P font, 3D raised bevel | Gold brightens (`#d8b278`) | 3 px theme outline, 2 px offset | Inverted bevel (pressed down into surface) | Text changes to sending status, disabled | Re-enabled | Re-enabled |
| Reset Button (`Zurücksetzen`) | Retro grey/win-bg raised bevel, Press Start 2P font | Lightens slightly | 3 px theme outline | Inverted bevel | N/A | N/A | N/A |
| Status Bar | Sunken 2D/3D groove, Gohufont/VT323 text, shows connection status and `COM1: 9600 BAUD` | Static | N/A | N/A | Shows `Status: Wird gesendet …` | Shows `Status: Fehler beim Senden.` | Shows `Status: Danke! Nachricht gesendet.` |
| Map Activation Layer | Desaturated grayscale map with button overlay „Tippen, um die Karte zu benutzen“ | Hint button brightens | 3 px theme outline; Enter/Space activates | Removes overlay, transitions to full color in 650 ms | N/A | N/A | N/A |

## Fonts and self-hosting

All retro fonts are committed locally to `fonts/` with zero external dependencies:
1. **`fonts/gohufont-bold-14px-square.woff2`** (FontPixel, Guillaume Litaudon, OFL/MIT license in `fonts/LICENSE-gohufont.txt`).
2. **`fonts/press-start-2p-latin-400-normal.woff2`** (CodeMan38, OFL 1.1 license in `fonts/LICENSE-press-start-2p.txt`).
3. **`fonts/vt323-latin-400-normal.woff2`** (Peter Hull, OFL 1.1 license in `fonts/LICENSE-vt323.txt`).
4. **Site chrome fonts:** `Libre Caslon Text`, `IBM Plex Sans`, `Courier Prime` remain for header and sidebar cards.

## Tokens and contrast

| Element | Dark theme | Ratio | Light theme | Ratio |
| --- | --- | ---: | --- | ---: |
| Window title text | `#f0e6d2` on `#60513e` | 7.39:1 | `#fff8e8` on `#745b40` | 7.82:1 |
| Header text `[ Sende eine Nachricht ]` | `#c29b62` on `#3c3836` | 4.88:1 | `#b38b4d` on `#dcd3be` | 3.25:1 (large text) |
| Intro copy on window background | `#a3998e` on `#3c3836` | 4.58:1 | `#6b6055` on `#dcd3be` | 4.62:1 |
| Field labels on window background | `#e8e0d5` on `#3c3836` | 8.84:1 | `#2b2622` on `#dcd3be` | 8.52:1 |
| Input field text | `#ffffff` on `#2b2826` | 14.82:1 | `#1a1816` on `#f9f5ea` | 13.91:1 |
| `[ SENDEN ]` button text | `#1a1816` on `#c29b62` | 7.42:1 | `#1a1816` on `#b38b4d` | 6.28:1 |
| `Zurücksetzen` button text | `#e8e0d5` on `#3c3836` | 8.84:1 | `#2b2622` on `#dcd3be` | 8.52:1 |
| Status bar text | `#a3998e` on `#3c3836` | 4.58:1 | `#6b6055` on `#dcd3be` | 4.62:1 |

## Motion

- **Map desaturation transition:** `filter`, 650 ms, `cubic-bezier(0.22, 0.61, 0.36, 1)`.
- **Button presses:** Instantaneous bevel toggle (no float/slide).
- **Reduced motion:** `prefers-reduced-motion: reduce` removes the map transition and executes state changes instantly.

## Accessibility and interaction order

1. Exactly one `h1` per page (`Sag Hallo.`). Window heading is `h2` (`[ Sende eine Nachricht ]`).
2. Tab order: Skip link → Site navigation/tools → User / Name → E-Mail Adresse → Betreff / Kategorie → Nachricht → ISO-DE Checkbox → [ SENDEN ] → Zurücksetzen → Map Activation Button → Direct email/phone → Social links.
3. Form fields have explicit `<label for="...">` associations, `required`, `autocomplete`, and honeypot with `style="display:none"` (`aria-hidden="true"`).
4. Accessibility audit: `python scripts/a11y_audit.py design` passes with **0 errors and 0 warnings**.

## i18n key table

| Key | DE (Source) | EN |
| --- | --- | --- |
| `hero.eyebrow` | Kontakt | Contact |
| `hero.heading` | Sag Hallo. | Say hello. |
| `hero.intro` | Fragen zu einem Build, Ideen für ein gemeinsames Projekt oder einfach Lust auf Austausch über deutsche ISO-Layouts? Meld dich gerne. | Questions about a build, ideas for a joint project, or just want to talk German ISO layouts? Get in touch. |
| `c.form.windowTitle` | J-Keebs_Contact.exe | J-Keebs_Contact.exe |
| `c.form.heading` | [ Sende eine Nachricht ] | [ Send a message ] |
| `c.form.introText` | Hast du Fragen zu Custom-Tastaturen, Switches, QMK-Firmware oder Modding-Services? Hinterlasse mir eine Zeile! | Questions about custom keyboards, switches, QMK firmware or modding services? Drop me a line! |
| `c.form.intro` | Landet direkt in meinem Postfach – keine Anmeldung, kein Newsletter, keine Weitergabe an Dritte außer dem Formular-Dienst selbst (Details dazu in der | Goes straight to my inbox – no account, no newsletter, no sharing with anyone except the form service itself (details in the |
| `c.form.privacyLink` | Datenschutzerklärung | privacy policy (German only) |
| `c.form.name` | User / Name: | User / Name: |
| `c.form.email` | E-Mail Adresse: | Email Address: |
| `c.form.topic` | Betreff / Kategorie: | Subject / Category: |
| `c.form.topic.build` | Custom Build Anfrage | Custom Build Inquiry |
| `c.form.topic.modding` | Switch & Stabilizer Modding | Switch & Stabilizer Modding |
| `c.form.topic.firmware` | QMK / VIA / Firmware Hilfe | QMK / VIA / Firmware Help |
| `c.form.topic.general` | Allgemeine Anfrage | General Inquiry |
| `c.form.message` | Nachricht: | Message: |
| `c.form.isoDe` | ISO-DE Layout bevorzugt | ISO-DE layout preferred |
| `c.form.submit` | [ SENDEN ] | [ SEND ] |
| `c.form.reset` | Zurücksetzen | Reset |
| `c.form.statusText` | Status: Verbindung hergestellt | Status: Connected |
| `c.form.sending` | Status: Wird gesendet … | Status: Sending … |
| `c.form.success` | Status: Danke! Nachricht gesendet. | Status: Thanks! Message sent. |
| `c.form.error` | Status: Fehler beim Senden. | Status: Error sending message. |
| `c.address.meta` | Anschrift | Address |
| `c.email.meta` | E-Mail | Email |
| `c.phone.meta` | Telefon | Phone |
| `c.direct.meta` | Direkt | Direct contact |
| `c.details.label` | Kontaktinformationen | Contact information |
| `c.map.regionLabel` | Karte mit dem Standort von J-Keebs | Map showing the location of J-Keebs |
| `c.map.activate` | Tippen, um die Karte zu benutzen | Tap to use the map |
| `c.online.meta` | Online | Online |
| `c.online.body` | Code, Firmware-Experimente und Projekte landen auf GitHub. Der fachliche Werdegang steht auf LinkedIn. | Code and firmware experiments live on GitHub. My professional background is on LinkedIn. |

## Acceptance criteria

1. The contact window faithfully reproduces `win2k-design/win2k-redesign.html` in layout, bevels, typography, and colors.
2. The pixel fonts (`Gohufont`, `Press Start 2P`, `VT323`) render crisply from local files without any third-party HTTP requests.
3. The 80×80 px PC pixel art appears in its beveled container beside the greeting header.
4. The form submits via FormSubmit with `name`, `email`, `topic`, `message`, and `iso_de_layout` (if checked).
5. The status bar displays `COM1: 9600 BAUD` and interactively reports the submission status.
6. The map turns coloured when the visitor touches or clicks the activation button, fading smoothly in 650 ms; tapping outside returns it to grayscale (resolving R24).
7. Fully responsive: no horizontal clipping at 375 px, clean grid layout at 768 px and 1280 px.
8. `python scripts/a11y_audit.py design` reports 0 errors and 0 warnings.
