# Eleventy migration

## Decision

Eleventy is the approved next architecture for J-Keebs. Astro remains deferred until the static migration has been evaluated against the finished site.

## Migration guardrails

- Keep the published root HTML site intact until generated output is verified.
- Preserve the GitHub Pages project base path: `/j-keebs/`.
- Preserve every canonical URL, Open Graph URL, sitemap URL, robots URL, FormSubmit redirect, and redirect stub.
- Preserve visible design, responsive behavior, current assets, legal-page language, and the DE/EN client-side behavior during the first migration slices.
- Do not introduce React, Astro, a client-side router, or a deployment cutover in the preparation package.

## Current source inventory

- Shared shell: duplicated headers, footers, font links, theme boot, and navigation across root `*.html` pages.
- Shared runtime: `main.js`.
- Shared styles: `style.css`.
- Page content: root HTML pages plus blog article HTML pages.
- Page dictionaries: inline `window.J_KEEBS_I18N` objects in individual pages.
- Shared dictionary: `J_KEEBS_I18N_COMMON` in `main.js`.
- Media: `images/`.
- Owner source drafts: `content/` (gitignored; do not publish the folder automatically).
- URL contract: canonical root pages, English blog slugs, and legacy redirect stubs.

## Proposed target boundary

```text
src/
  _includes/
    layouts/
    components/
  _data/
    site.js
    i18n.js
  pages/
  blog/
  assets/
  styles/
  scripts/
_site/
.eleventy.js
package.json
```

The exact directory names are provisional until the first build bootstrap. The legacy root remains the deployment source during preparation.

## First executable slice

1. Ensure Node.js and npm are available.
2. Add Eleventy as a development dependency and create a reproducible local build command.
3. Configure passthrough for images, styles, scripts, and required static files.
4. Migrate one representative non-legal page, preferably `about.html` or `guides.html`, beside its legacy source.
5. Compare generated and legacy output for URL, metadata, navigation, asset, and responsive contracts.
6. Do not delete or replace root HTML files until the comparison is recorded and repeatable.

## Cutover gate

No GitHub Pages source-folder change or root-file deletion is allowed until:

- the full canonical-page inventory is generated;
- internal links and asset references pass;
- redirect stubs are preserved;
- metadata and `/j-keebs/` URLs pass checks;
- representative desktop/mobile browser checks pass;
- the owner approves the deployment path and rollback plan.
