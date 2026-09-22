# Plan

## Roles

| Role | Who | Does | Does not |
| --- | --- | --- | --- |
| **Planner** | This project's planning chat | Priority, scope, architecture calls, updating this file | Implement site changes in the same session unless the owner asks |
| **Implementer** | A **new** chat | Execute the current work package only | Re-plan, add frameworks, "while I'm here" refactors |
| **Owner** | Jannik | Approves scope changes, commits, deploy | — |

If an implementer finds a new issue: add it to `BACKLOG.md` under the right priority and keep going on the current package. Do not start a later package in an earlier session.

## Sequence

1. ~~P0 / P0-B / P0-C~~ ✅ done and deployed
2. ~~P1 contact form + P1-A brand + P1-B guides~~ ✅ done and deployed
3. ~~P2-A interaction/visual polish~~ ✅ done and deployed
4. ~~P2-B / P2-C Eleventy migration~~ ✅ done and deployed (2026-09-18/19)
5. ~~P2-D repo hygiene, self-hosted fonts, base-layout fixes~~ ✅ done and deployed (`38efe4f`, checked by the owner 2026-09-21; re-verified by the planner on `2749621`)
6. **P2-E — image pipeline** ← current package (below)
7. P2-E2 — icons and social previews (favicon, apple-touch-icon, default 1200×630 `og:image`, complete OG/Twitter meta) — BACKLOG R9
8. P2-F — Eleventy data model (computed canonical/og URLs, i18n as data files, blog collection, generated sitemap/robots)
9. P2-remaining — a11y items from `BACKLOG.md`
10. P3 — content / README honesty (R6, R7, R11 need owner decisions first)

Do not skip ahead. Findings behind each package: `BACKLOG.md`.

## Current work package: P2-E — image pipeline

**Goal:** Cut image transfer by more than 90 % without changing how any page looks or how the gallery behaves. Today `images/` is 47 MB; `keyboards.html` references ~35 MB of photos, the logo is a 557 KB PNG on every page (BACKLOG R3, remaining part of R4).

### Planner findings (spike on a scratch copy of `2749621`, nothing changed in the repo)

- `@11ty/eleventy-img` **7.0.0** (current) needs **Node ≥ 22**. CI already uses Node 22. The owner's local Node must be ≥ 22 too (`node -v`).
- Measured with the `Image()` API, WebP q78, all 28 photos/logos in `images/` (without the pixel-art PNG and `mechanicon_logo.png`): photos at 640 / 1280 / 1920 px, logos at 240 / 480 px → **78 files, 7.4 MB in total** (instead of 47 MB), largest single file 383 KB, logo 9 KB / 19 KB. Cold run ~16 s, warm run instant. File names with spaces / `.JPG` (`Keychron Q3_1.JPG`) work; output names are hashed.
- **The ready-made `eleventyImageTransformPlugin` does not work as a drop-in**: it resolves `src` relative to the template folder or the input folder, so `images/…` (repo root) fails with `ENOENT src/j-keebs/images/…`. Options: (a) a Nunjucks shortcode used in the templates, (b) a small custom Eleventy transform in `eleventy.config.js` that keeps the templates as plain `<img src="images/…">` and rewrites them at build time using the `Image()` API, (c) moving `images/` into `src/` plus template edits. Planner preference: **(b)**, because it keeps the templates readable HTML and avoids touching ~40 `<img>` tags; (a) is acceptable. The implementer decides and explains why in `STATUS.md`.
- **Gallery slides load together.** In every carousel the slides are stacked (`position:absolute; opacity:0`), and `loading="lazy"` reacts to the viewport, not to opacity. So all slides of a card start loading when the card comes near the screen. That is fine once files are 40–200 KB. Do **not** build a JS slide loader in this package.
- Gallery/CSS/JS depend on the `<img>` being a direct child of `.polaroid-frame__viewport` (`.polaroid-frame__viewport img`, `img.is-active`, `[data-slide]`). Therefore **no `<picture>` wrapper** and no CSS selector changes.
- Fullscreen (`main.js`, `fullscreenImg.src = active.src`) must keep showing a sharp image. After the change `src` will be the mid-size file, so fullscreen needs the largest generated width.

### Planner decisions (owner may veto before the package starts)

1. Build-time generation with `@11ty/eleventy-img` (devDependency). Originals in `images/` stay untouched (no deletion, no overwrite). Generated files go to `_site/img/` and are **never committed**; the disk cache `.cache/` is added to `.gitignore`.
2. **WebP only**, quality ≈ 78, no AVIF (slow to encode), no JPEG fallback (WebP is supported by every current browser). Widths: photos 640 / 1280 / 1920 (never enlarge), logos 240 / 480 (alpha stays). One format means the output is a plain `<img srcset>`, no `<picture>`.
3. `images/` stays a passthrough copy for now. Old absolute URLs (`og:image`, shared links, external hotlinks) keep working. Slimming the deploy is a later decision.
4. Not touched: `Retro-PC_pixelart_generated.png` (64×64 pixel art), `J-Keebs-Icon.ico` (P2-E2), `mechanicon_logo.png` (unused, owner decides).

### In scope

1. Add `@11ty/eleventy-img`; implement the pipeline (transform or shortcode) for every `<img>` in `src/pages/*.njk` and `src/_includes/base.njk` that points to a `.jpg`/`.jpeg`/`.png` in `images/`, except the excluded files above. Add a way to opt a single image out (for example `data-no-optimize`). An `<img>` without a `src` (the fullscreen overlay image in `base.njk`, whose `src` is set by JS) stays untouched.
2. Output per image: `src` (mid-size file), `srcset` (all widths), a measured `sizes`, `width`/`height` matching the real generated ratio (this fixes the wrong attributes on `Werkbank_Hero.jpg`, `G80-3000.jpg`, `Monsgeek M1.jpg`, `Monsgeek_M1_V5_EVA.jpg`, `TOFU65_Mixed_Keycaps.jpg`, `J80-3000_open_with_printed_plate.jpg`). Keep every existing attribute (`class`, `alt`, `title`, `data-slide`, `data-i18n-attr`, `loading`, …) unchanged.
3. `sizes` must come from **measured rendered widths** (browser at 375 / 768 / 1280 / 1920 px for: gallery viewport, single polaroid, blog featured, blog teaser, about, partner cards, header logo ~107 px, footer logo ~176 px). A blanket `100vw` is not acceptable. Write the chosen values and how they were measured into `STATUS.md`.
4. Loading policy: exactly one likely-LCP image per page is eager with `fetchpriority="high"` (for example the first gallery slide or the hero); every other image `loading="lazy" decoding="async"`. Today the first slide of all 10 gallery cards on `keyboards.html` is eager.
5. `main.js`: fullscreen uses the largest generated width (a `data-full` attribute or the widest `srcset` candidate). No other JS change.
6. Logos (`J-Keebs-Logo.png`, `OWA_Labs_Logo.png`, `PCBWay_Logo.png`) go through the same pipeline with logo widths.
7. `.gitignore`: add `.cache/`. `readme.md` / `CONVENTIONS.md`: Node ≥ 22, how to add a new image (which attributes, where the `sizes` come from). If the cold CI build exceeds ~90 s, add an `actions/cache` step for `.cache/` to `deploy.yml`; otherwise leave the workflow alone.
8. **Before/after numbers** in `STATUS.md`: bytes of images referenced per page (script) before and after, cold and warm build time.

### Out of scope

- `og:image` / `twitter:image` / favicon / `apple-touch-icon` / OG meta tags (P2-E2, BACKLOG R9)
- Renaming image files, deleting `mechanicon_logo.png` (R10, owner)
- CSS changes (none expected), layout or design changes, new image content
- Slide-on-demand loading, AVIF, JPEG fallback, dropping `images/` from `_site/`
- Data-model refactors (P2-F), copy/i18n changes, R6/R7/R11 content
- Committing

### Done when

**Implementer (own tooling):**

- `npm ci && npm run build` succeeds, 21 pages; `python scripts/check_links.py` → 0 errors (it must also resolve every `srcset` candidate).
- Every processed `<img>` has `srcset`, `sizes`, `width`, `height`; the width/height ratio equals the real file ratio; no processed `<img>` still points to a file larger than 1920 px.
- No generated file larger than 400 KB; logo files ≤ 25 KB each; total `_site/img` ≤ 10 MB.
- `git diff` shows no change in `style.css`; `main.js` changed only in the fullscreen source line(s); the DOM position of every `<img>` is unchanged (no `<picture>`).
- Exactly one eager image per page; `fetchpriority="high"` only on that one.
- `STATUS.md` (before/after table, chosen approach and why, `sizes` values), `BACKLOG.md`, `CONVENTIONS.md` updated; owner steps listed.

**Owner (PowerShell and browser):**

```powershell
node -v                                   # must print v22 or newer
npm ci
npm run build
"{0:N1} MB" -f ((Get-ChildItem _site\img -File | Measure-Object Length -Sum).Sum / 1MB)
Get-ChildItem _site\img -File | Sort-Object Length -Descending | Select-Object -First 5 Name, Length
(Select-String -Path _site\*.html -Pattern 'srcset=' -SimpleMatch).Count
```

- Expected: total under 10 MB, largest file under 400 KB, `srcset=` found on all pages that have photos.
- Browser (DevTools → Network → Img, "Disable cache" on): initial load of `index.html` ≤ 1 MB of images; `keyboards.html` scrolled to the very bottom ≤ 3 MB (any viewport, any pixel density); `blog.html` ≤ 1.5 MB.
- Behaviour unchanged: carousel arrows and dots, fullscreen opens with a sharp image (Network shows the widest file), fullscreen keyboard navigation, DE/EN and theme toggles, blog cards and hero look the same, header logo crisp on a 2× display and no header shift while loading.
- No performance claims in the README without measuring them.

### Owner steps outside the package (optional, PowerShell)

```powershell
git rm i ai/AGENTS.md
git commit -m "Remove stray cookie file and duplicate AGENTS.md"
```

`i` is a leftover curl cookie-jar file; `ai/AGENTS.md` is a byte-identical copy of the root `AGENTS.md` (BACKLOG: repo hygiene).

## Redirect stub pattern

GitHub Pages has no real 301. **The owner deleted all redirect stubs (2026-09-11).** If redirects are needed in future:

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=NEW-TARGET.html">
  <link rel="canonical" href="https://brotbeutel.github.io/j-keebs/NEW-TARGET.html">
  <title>Weiterleitung…</title>
</head>
<body>
  <p><a href="NEW-TARGET.html">Weiter zur Seite</a></p>
</body>
</html>
```

In Eleventy this is a template with `permalink: old-name.html`, not a file in the repo root.

## After P2-E

Return to the planner chat. Next: P2-E2 (icons and social previews), then P2-F (data model).
