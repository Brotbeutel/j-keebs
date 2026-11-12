# Self-hosted fonts

Served from `/j-keebs/fonts/` (passthrough copy, see `eleventy.config.js`). Declared in `style.css` (`@font-face`, `font-display: swap`). No request goes to Google.

| Family | Files | Notes |
| --- | --- | --- |
| Libre Caslon Text | `libre-caslon-text-latin-400-normal`, `-400-italic`, `-700-normal` | `--font-display` |
| IBM Plex Sans | `ibm-plex-sans-latin-400-normal`, `-500-`, `-600-`, `-700-` | `--font-body` |
| Courier Prime | `courier-prime-latin-400-normal`, `-700-normal` | `--font-mono` |
| Playwrite DE Grund | `playwrite-de-grund-wght-normal` (variable, `wght` 100–400) | `--font-hand`; the file is the complete font, not a subset |
| Gohufont | `gohufont-bold-14px-square` | Win2k contact window copy |
| Press Start 2P | `press-start-2p-latin-400-normal` | Win2k contact window buttons |
| VT323 | `vt323-latin-400-normal` | Win2k contact window status text |

- **Source:** the first four families are unchanged `woff2` files from the npm packages `@fontsource/libre-caslon-text@5.3.0`, `@fontsource/ibm-plex-sans@5.3.0`, `@fontsource/courier-prime@5.3.0` and `@fontsource-variable/playwrite-de-grund@5.3.0` (the Playwrite file is Fontsource's `playwrite-de-grund-fallback-wght-normal.woff2`, renamed). The Win2k files were added with the contact redesign: Gohufont from the FontPixel web package (Guillaume Litaudon); Press Start 2P and VT323 are redistributed with their project license texts and author notices alongside the files.
- **Subset:** Latin (the same range Google Fonts serves as `latin`: U+0000–00FF, general punctuation U+2000–206F, €, ™, …). This covers all German copy on the site. Characters outside it (arrows `← → ↗`, `✓`, `✕`) fall back to system fonts, exactly as before.
- **Licence:** the bundled notices identify Libre Caslon Text, IBM Plex Sans, Courier Prime, Playwrite DE Grund, Press Start 2P and VT323 under SIL Open Font License 1.1. Gohufont is distributed under WTFPL / SIL Open Font License / MIT per its bundled notice. Keep every `LICENSE-*.txt` beside its font file.
- **Update / add a weight:** download the matching `latin-<weight>-<style>.woff2` from the Fontsource package, add it here, add an `@font-face` block in `style.css`. Do not link a font CDN (see `ai/CONVENTIONS.md`, "What not to do").
