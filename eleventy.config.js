const path = require("path");
const site = require("./src/_data/site.js");

// @11ty/eleventy-img v7 ships ESM-only; require() on Node >= 20.19 returns
// the module namespace, so the classic default export lives at `.default`.
const eleventyImg = require("@11ty/eleventy-img");
const Image = eleventyImg.default;

// --- Image pipeline configuration ----------------------------------------
// See ai/CONVENTIONS.md "Images" for how to add a new image, and
// ai/STATUS.md (P2-E) for the measurement behind the `sizes` values below.
const BASE_PATH = site.basePath; // "/j-keebs/"
const IMG_OUTPUT_DIR = path.join(__dirname, "_site", "img");
const IMG_URL_PATH = BASE_PATH + "img/";

// Filenames handled with the smaller "logo" width set instead of "photo".
const LOGO_FILES = new Set(["J-Keebs-Logo.png", "OWA_Labs_Logo.png", "PCBWay_Logo.png"]);
// Never run through the pipeline (P2-E planner decision #4).
const EXCLUDED_FILES = new Set(["Retro-PC_pixelart_generated.png", "mechanicon_logo.png"]);

const PHOTO_WIDTHS = [640, 1280, 1920]; // eleventy-img drops widths larger than the source (never enlarges)
const LOGO_WIDTHS = [240, 480];

// `sizes` per usage context, computed analytically from style.css at
// 375/768/1280/1920px viewports (no headless browser is available in the
// implementer sandbox) — see ai/STATUS.md for the full derivation and the
// request to re-check with real DevTools.
const SIZES_BY_CONTEXT = {
  gallery: "(max-width: 480px) 90vw, (max-width: 768px) 500px, 350px",
  "single-polaroid": "(max-width: 480px) 90vw, (max-width: 980px) 520px, 510px",
  "blog-featured": "(max-width: 768px) 90vw, 620px",
  "blog-teaser": "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px",
  "partner-logo": "200px",
  "header-logo": "107px",
  "footer-logo": "176px",
  "hero-werkbank": "(max-width: 480px) 90vw, 526px",
  default: "100vw",
};

function hasClass(attrs, name) {
  if (!attrs.class) return false;
  return attrs.class.split(/\s+/).includes(name);
}

// Parses a raw "<img ...>" string into an attribute map (null value = boolean
// attribute like `data-slide`) plus the original attribute order.
function parseImgAttrs(tagStr) {
  const inner = tagStr.replace(/^<img/i, "").replace(/\/?>$/, "");
  const attrs = {};
  const order = [];
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*"([^"]*)")?/g;
  let m;
  while ((m = re.exec(inner))) {
    order.push(m[1]);
    attrs[m[1]] = m[2] !== undefined ? m[2] : null;
  }
  return { attrs, order };
}

// Figures out which `sizes` bucket an <img> belongs to. Some contexts are
// identifiable from the tag's own attributes (gallery via data-slide, logos
// via their class); others (single-polaroid, blog featured/teaser) only
// carry a class on their wrapping <figure>, so we look backward in the
// already-rendered HTML for the nearest one.
function detectContext(fullHtml, tagStart, attrs, basename) {
  if (attrs["data-slide"] !== undefined) return "gallery";
  if (hasClass(attrs, "partner-card__logo")) return "partner-logo";
  if (hasClass(attrs, "brand__logo")) return "header-logo";
  if (hasClass(attrs, "footer-logo")) return "footer-logo";
  if (basename === "Werkbank_Hero.jpg") return "hero-werkbank";

  const before = fullHtml.slice(Math.max(0, tagStart - 2000), tagStart);
  const figMatches = [...before.matchAll(/<figure\s+class="([^"]*)"/g)];
  if (figMatches.length) {
    const fc = figMatches[figMatches.length - 1][1];
    const classes = fc.split(/\s+/);
    if (classes.includes("blog-featured__media")) return "blog-featured";
    if (classes.includes("blog-teaser-card__media")) return "blog-teaser";
    if (classes.includes("single-polaroid")) return "single-polaroid";
  }
  return "default";
}

module.exports = function (eleventyConfig) {
  // --- Passthrough copy --------------------------------------------------
  // Static assets stay at the repo root while the legacy site remains live.
  eleventyConfig.addPassthroughCopy({ images: "images" });
  eleventyConfig.addPassthroughCopy({ fonts: "fonts" });
  eleventyConfig.addPassthroughCopy({ "style.css": "style.css" });
  eleventyConfig.addPassthroughCopy({ "main.js": "main.js" });
  eleventyConfig.addPassthroughCopy({ "robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "sitemap.xml": "sitemap.xml" });

  // --- Image pipeline (P2-E) ----------------------------------------------
  // Rewrites every <img src="images/…jpg|png"> (rendered output, so this also
  // covers the {{ rp }}-prefixed form used on 404.html) into a WebP
  // srcset/sizes/width/height set, generated at build time with
  // @11ty/eleventy-img. Kept as a transform (not the ready-made
  // eleventyImageTransformPlugin, and not a Nunjucks shortcode) so templates
  // stay plain HTML with `images/…` sources — see ai/STATUS.md for why.
  eleventyConfig.addTransform("imagePipeline", async function (content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) return content;

    const imgTagRe = /<img\b[^>]*>/gis;
    const matches = [...content.matchAll(imgTagRe)];
    if (!matches.length) return content;

    let result = "";
    let lastIndex = 0;
    let eagerAssigned = false; // exactly one eager+fetchpriority photo per page

    for (const match of matches) {
      const tagStr = match[0];
      const tagStart = match.index;
      result += content.slice(lastIndex, tagStart);
      lastIndex = tagStart + tagStr.length;

      const { attrs, order } = parseImgAttrs(tagStr);

      if (attrs["data-no-optimize"] !== undefined) {
        // Opt-out escape hatch (P2-E "in scope" item 1): strip the marker,
        // leave the rest of the tag exactly as authored.
        result += tagStr.replace(/\s+data-no-optimize(?:="[^"]*")?/i, "");
        continue;
      }

      const rawSrc = attrs.src;
      if (!rawSrc) {
        // e.g. #fullscreenImage in base.njk, whose src is set by main.js
        result += tagStr;
        continue;
      }

      let decodedSrc;
      try {
        decodedSrc = decodeURIComponent(rawSrc);
      } catch {
        decodedSrc = rawSrc;
      }
      let normalizedSrc = decodedSrc;
      if (normalizedSrc.startsWith(BASE_PATH)) {
        normalizedSrc = normalizedSrc.slice(BASE_PATH.length);
      }
      const srcMatch = normalizedSrc.match(/^images\/(.+\.(jpe?g|png))$/i);
      if (!srcMatch) {
        result += tagStr;
        continue;
      }

      const basename = path.basename(normalizedSrc);
      if (EXCLUDED_FILES.has(basename)) {
        result += tagStr;
        continue;
      }

      const isLogo = LOGO_FILES.has(basename);
      const widths = isLogo ? LOGO_WIDTHS : PHOTO_WIDTHS;
      const inputPath = path.join(__dirname, normalizedSrc);

      let metadata;
      try {
        metadata = await Image(inputPath, {
          widths,
          formats: ["webp"],
          outputDir: IMG_OUTPUT_DIR,
          urlPath: IMG_URL_PATH,
          // Logos at quality 75 (photos stay at 78): at 78, OWA_Labs_Logo.png's
          // 480w file lands at ~25.9 KB, just over the 25 KB cap. Tried
          // effort:6 first (libwebp's max-effort search) — it only saved ~1.3 KB
          // on that file but cost ~4.6s *per file* (vs ~80ms at default effort),
          // which would add ~28s to every cold build for a marginal, rarely-
          // loaded (high-DPR-only) candidate. Dropping quality 3 points instead
          // brings every logo comfortably under the cap at no build-time cost and
          // no visible difference on flat logo artwork.
          sharpWebpOptions: isLogo ? { quality: 75 } : { quality: 78 },
        });
      } catch (err) {
        console.warn(`[imagePipeline] Skipping ${normalizedSrc}: ${err.message}`);
        result += tagStr;
        continue;
      }

      const variants = metadata.webp; // ascending by width
      const largest = variants[variants.length - 1];
      const mid = variants[Math.floor((variants.length - 1) / 2)];
      const srcset = variants.map((v) => `${v.url} ${v.width}w`).join(", ");
      const context = detectContext(content, tagStart, attrs, basename);
      const sizes = SIZES_BY_CONTEXT[context] || SIZES_BY_CONTEXT.default;

      let isEager = false;
      if (!isLogo && !eagerAssigned) {
        isEager = true;
        eagerAssigned = true;
      }

      const HANDLED = new Set(["src", "width", "height", "loading", "fetchpriority", "decoding", "srcset", "sizes"]);
      let out = "<img";
      for (const name of order) {
        if (HANDLED.has(name)) continue;
        const val = attrs[name];
        out += val === null ? ` ${name}` : ` ${name}="${val}"`;
      }
      out += ` src="${mid.url}"`;
      out += ` srcset="${srcset}"`;
      out += ` sizes="${sizes}"`;
      out += ` width="${largest.width}"`;
      out += ` height="${largest.height}"`;
      if (isLogo) {
        // Logos are excluded from the eager/lazy competition; keep whatever
        // the template already said (header logo: no attribute = implicit
        // eager; footer/partner logos: loading="lazy").
        if (attrs.loading !== undefined) out += ` loading="${attrs.loading}"`;
      } else if (isEager) {
        out += ` loading="eager" fetchpriority="high"`;
      } else {
        out += ` loading="lazy"`;
      }
      out += ` decoding="async"`;
      out += ` data-full="${largest.url}"`; // used by main.js for a sharp fullscreen image
      out += `>`;

      result += out;
    }
    result += content.slice(lastIndex);
    return result;
  });

  // --- Directory config ---------------------------------------------------
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    pathPrefix: "/j-keebs/",
    // Use Nunjucks for .njk and .html template files
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
