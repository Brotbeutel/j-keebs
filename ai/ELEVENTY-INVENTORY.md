# Eleventy migration inventory

Generated for P2-B on 2026-09-11. Scope is the 21 canonical root HTML files currently in the repo; redirect stubs are not present and should not be restored during this package.

## Shared chrome

Use the current `about.html` as the canonical chrome source for the first layout. Every root page has the shared Google Fonts links, theme boot script, header, utility language/theme controls, Guides dropdown with Switches/Plates/Mods/Keycaps, footer, Keycaps footer link, and `main.js`. The fullscreen overlay appears in `about.html`, `index.html`, and `keyboards.html`; the P2-B base layout keeps it because the representative `about.html` uses it.

Root-link style differs by page family: `404.html` uses `/j-keebs/...` root paths, while the rest mostly use relative `./style.css`, `./main.js`, and `images/...`. Canonical and Open Graph URLs preserve the `/j-keebs/` project path.

## Page inventory

| Page | Canonical URL | Active nav | Page-specific i18n dictionary | Page-specific style/script and asset notes |
| --- | --- | --- | --- | --- |
| `404.html` | `https://brotbeutel.github.io/j-keebs/404.html` | none | `nf.*` (5 keys) | No page style. Theme boot, page dictionary, `/j-keebs/main.js`. Uses root-path logo only. |
| `about.html` | `https://brotbeutel.github.io/j-keebs/about.html` | `about.html` | `hero.*`, `focus.*`, `story.*`, `pillars.*`, `pillar1.*`-`pillar3.*` (23 keys) | No page style. Theme boot, page dictionary, `./main.js`. Uses logo and `YMDK68_Wood_workbench.jpg`. Source for P2-B generated page. |
| `blog.html` | `https://brotbeutel.github.io/j-keebs/blog.html` | `blog.html` | `hero.*`, `post1.*`-`post7.*` (46 keys) | No page style. Theme boot, page dictionary, `./main.js`. Uses article teaser images. |
| `blog-getting-started.html` | `https://brotbeutel.github.io/j-keebs/blog-getting-started.html` | `blog.html` | `post1.*`, `post2.*` (10 keys) | No page style. Theme boot, page dictionary, `./main.js`. Uses `Cherry_J80-3000_I2C.jpg`. |
| `blog-old-keyboards.html` | `https://brotbeutel.github.io/j-keebs/blog-old-keyboards.html` | `blog.html` | `post2.*`, `post1.*`, `post3.*` (12 keys) | No page style. Theme boot, page dictionary, `./main.js`. Uses `Cherry_G80-1000_2.jpg`. |
| `blog-keyboards-for-others.html` | `https://brotbeutel.github.io/j-keebs/blog-keyboards-for-others.html` | `blog.html` | `post3.*`, `post2.*`, `post4.*` (12 keys) | No page style. Theme boot, page dictionary, `./main.js`. Uses `Lucky65_Red.jpg`. |
| `blog-j80-3000-second-life.html` | `https://brotbeutel.github.io/j-keebs/blog-j80-3000-second-life.html` | `blog.html` | `post4.*`, `post3.*`, `post5.*` (15 keys) | No page style. Theme boot, page dictionary, `./main.js`. Uses `J80-3000_open_with_printed_plate.jpg`. |
| `blog-10-euro-ps2-connector.html` | `https://brotbeutel.github.io/j-keebs/blog-10-euro-ps2-connector.html` | `blog.html` | `post5.*`, `post4.*`, `post6.*` (13 keys) | No page style. Theme boot, page dictionary, `./main.js`. Uses `10Euro_PS2.jpg`. |
| `blog-tofu65-v2.html` | `https://brotbeutel.github.io/j-keebs/blog-tofu65-v2.html` | `blog.html` | `post6.*`, `post5.*`, `post7.*` (12 keys) | No page style. Theme boot, page dictionary, `./main.js`. Uses `Tofu65_Brutalis-Keycaps.jpg`. |
| `blog-corsair-k70.html` | `https://brotbeutel.github.io/j-keebs/blog-corsair-k70.html` | `blog.html` | `post7.*`, `post6.*` (12 keys) | No page style. Theme boot, page dictionary, `./main.js`. Uses `Werkbankfoto_1.jpg`. |
| `contact.html` | `https://brotbeutel.github.io/j-keebs/contact.html` | `contact.html` | `hero.*`, `c.*` (21 keys) | No page style. Theme boot, page dictionary, `./main.js`. Has FormSubmit action and auto-loading OpenStreetMap iframe. Uses `Retro-PC_pixelart_generated.png`. |
| `cookies.html` | `https://brotbeutel.github.io/j-keebs/cookies.html` | none | none; relies on common/legal keys | No page style. Theme boot and `./main.js` only. Uses logo. |
| `faq.html` | `https://brotbeutel.github.io/j-keebs/faq.html` | `faq.html` | `hero.*`, `q1.*`-`q4.*` (17 keys) | No page style. Theme boot, page dictionary, `./main.js`. Uses logo. |
| `guides.html` | `https://brotbeutel.github.io/j-keebs/guides.html` | `guides.html` | `hero.*`, `jumpnav.*`, `cta.*`, `status.*`, `cat.*`, `gs*`, `gp*`, `gm*`, `gk1.*` (48 keys) | No page style. Theme boot, page dictionary, `./main.js`. Uses logo. |
| `impressum.html` | `https://brotbeutel.github.io/j-keebs/impressum.html` | none | none; relies on common/legal keys | No page style. Theme boot and `./main.js` only. Uses logo. |
| `index.html` | `https://brotbeutel.github.io/j-keebs/` | `index.html` | `meta.*`, `status.*`, `hero.*`, `section1.*`-`section3.*`, `card*`, `timeline*`, `gallery*`, `footer.*`, `legal.*` (89 keys) | Has one page `<style>` block and JSON-LD script. Theme boot, page dictionary, `./main.js`. Uses homepage/workbench/gallery images. |
| `keyboards.html` | `https://brotbeutel.github.io/j-keebs/keyboards.html` | `keyboards.html` | `hero.*`, `cheat.*`, `b1.*`-`b11.*` (191 keys) | No page style. Theme boot, page dictionary, `./main.js`. Uses full keyboard gallery image set. |
| `partner.html` | `https://brotbeutel.github.io/j-keebs/partner.html` | `partner.html` | `hero.*`, `p1.*`, `p2.*` (14 keys) | No page style. Theme boot, page dictionary, `./main.js`. Uses `PCBWay_Logo.png` and `OWA_Labs_Logo.png`. |
| `privacy.html` | `https://brotbeutel.github.io/j-keebs/privacy.html` | none | none; relies on common/legal keys | No page style. Theme boot and `./main.js` only. Uses logo. |
| `switches.html` | `https://brotbeutel.github.io/j-keebs/switches.html` | `switches.html` | `hero.*`, `table.*`, `t1.*`-`t4.*`, `listen.*`, `v1.*`-`v4.*` (31 keys) | No page style. Theme boot, page dictionary, `./main.js`. Uses logo. |
| `terms.html` | `https://brotbeutel.github.io/j-keebs/terms.html` | none | none; relies on common/legal keys | No page style. Theme boot and `./main.js` only. Uses logo. |

## P2-C notes

- Migrate body content one page family at a time: legal/static pages, listing pages, then blog article pages.
- Keep the URL contract exact: root `*.html` outputs, `/j-keebs/` canonical and Open Graph URLs, existing FormSubmit redirect metadata, and current sitemap/robots values.
- Treat page dictionaries as page data during migration; do not translate or rewrite visible copy in the migration slice.
