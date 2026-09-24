# J-Keebs – Custom Mechanical Keyboards Portfolio

Portfolio site for custom mechanical keyboards, modding and upcycling, with a focus on German ISO layouts. Hand-written HTML templates (Eleventy / Nunjucks), vanilla CSS and vanilla JavaScript. Hosted on GitHub Pages.

**Live:** https://brotbeutel.github.io/j-keebs/
**Status:** work in progress — the homepage banner says the site is not officially launched yet.

## What is on the site

- **Portfolio gallery** – photo carousels with "cheat sheet" spec panels and a fullscreen viewer
- **Blog** – project write-ups (some texts are still being rewritten)
- **Guides and switch overview** – several guide cards are still placeholders
- **Partners, FAQ, contact** – contact form via FormSubmit, OpenStreetMap embed, legal pages (Impressum, privacy, cookies, terms; German only)
- **Dark/light theme** and **DE/EN toggle** (client-side; visible page copy is German, see `ai/CONVENTIONS.md`)

## Project structure

```
/
├── src/
│   ├── pages/            # one .njk template per page (21 pages, blog posts included)
│   ├── _includes/base.njk# shared layout: head, header, nav, footer, fullscreen overlay
│   └── _data/site.js     # site data and navigation
├── images/               # original photography and logos (copied as is; build also derives resized WebP into _site/img/, see ai/CONVENTIONS.md "Images")
├── fonts/                # self-hosted woff2 fonts + OFL licences (copied as is)
├── style.css             # all styles (tokens in :root and [data-theme="light"])
├── main.js               # theme, i18n, gallery, nav, contact form
├── robots.txt, sitemap.xml
├── eleventy.config.js    # input src/, output _site/, passthrough copy of the root assets
├── .github/workflows/deploy.yml   # build with Eleventy and deploy _site/ to GitHub Pages
├── ai/                   # handoff notes for humans and agents (start with ai/README.md)
└── AGENTS.md             # entry point for agents
```

`_site/` (generated), `node_modules/` and `content/` (private drafts) are not part of the published source.

## Development

Requires Node.js 22 or newer (`@11ty/eleventy-img` needs it; CI uses 22 too — check with `node -v`).

```
npm ci            # install
npm run dev       # local server with live reload, served under /j-keebs/
npm run build     # build to _site/
```

Pushing to `main` builds and deploys automatically via GitHub Actions.

- Page content and page-specific translations: `src/pages/<page>.njk` (front matter holds metadata and the `window.J_KEEBS_I18N` dictionary)
- Header, footer, navigation markup: `src/_includes/base.njk`, navigation items in `src/_data/site.js`
- Shared UI strings: `J_KEEBS_I18N_COMMON` in `main.js`
- All absolute URLs must contain the `/j-keebs/` base path

## Internationalization

Text elements carry `data-i18n` keys (attributes: `data-i18n-attr`); dictionaries are merged per page from `J_KEEBS_I18N_COMMON` (`main.js`) and `window.J_KEEBS_I18N` (page). Language and theme choices are stored in `localStorage` (`jkeebs-lang`, `jkeebs-theme`).

## External services

- FormSubmit (contact form)
- OpenStreetMap (contact page map)

## License

This project is proprietary. All content and code are the intellectual property of J-Keebs.

## Author

**Jannik Schlüter** · [GitHub](https://github.com/Brotbeutel) · [LinkedIn](https://www.linkedin.com/in/jannik-schl%C3%BCter-103270423/) · jannik_schlueter@hotmail.de
