# Design prototypes

Reference prototypes made by the **Designer** role (`ai/DESIGN.md`). One self-contained HTML file per iteration: `<topic>-vN.html`, using the site's tokens and the font files in `../fonts/`, switchable light/dark, no external requests.

- Not part of the site: Eleventy copies only its passthrough list, so this folder is never published.
- Each prototype belongs to a design spec in `ai/drafts/` (`…-designer.md`). An implementer rebuilds it in `src/`, `style.css` and `main.js`; the prototype is never copied into the site.
- Open one locally (PowerShell): `Start-Process design\<topic>-vN.html`
