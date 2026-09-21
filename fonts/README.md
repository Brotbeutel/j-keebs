# Self-hosted fonts

Served from `/j-keebs/fonts/` (passthrough copy, see `eleventy.config.js`). Declared in `style.css` (`@font-face`, `font-display: swap`). No request goes to Google.

| Family | Files | Notes |
| --- | --- | --- |
| Libre Caslon Text | `libre-caslon-text-latin-400-normal`, `-400-italic`, `-700-normal` | `--font-display` |
| IBM Plex Sans | `ibm-plex-sans-latin-400-normal`, `-500-`, `-600-`, `-700-` | `--font-body` |
| Courier Prime | `courier-prime-latin-400-normal`, `-700-normal` | `--font-mono` |
| Playwrite DE Grund | `playwrite-de-grund-wght-normal` (variable, `wght` 100–400) | `--font-hand`; the file is the complete font, not a subset |

- **Source:** `woff2` files taken unchanged from the npm packages `@fontsource/libre-caslon-text@5.3.0`, `@fontsource/ibm-plex-sans@5.3.0`, `@fontsource/courier-prime@5.3.0` and `@fontsource-variable/playwrite-de-grund@5.3.0` (the Playwrite file is Fontsource's `playwrite-de-grund-fallback-wght-normal.woff2`, renamed).
- **Subset:** Latin (the same range Google Fonts serves as `latin`: U+0000–00FF, general punctuation U+2000–206F, €, ™, …). This covers all German copy on the site. Characters outside it (arrows `← → ↗`, `✓`, `✕`) fall back to system fonts, exactly as before.
- **Licence:** all four families are SIL Open Font License 1.1. The licence texts (`LICENSE-*.txt`, copied from the Fontsource packages) must stay next to the font files.
- **Update / add a weight:** download the matching `latin-<weight>-<style>.woff2` from the Fontsource package, add it here, add an `@font-face` block in `style.css`. Do not link a font CDN (see `ai/CONVENTIONS.md`, "What not to do").
