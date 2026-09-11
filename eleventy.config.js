module.exports = function (eleventyConfig) {
  // --- Passthrough copy --------------------------------------------------
  // Static assets stay at the repo root while the legacy site remains live.
  eleventyConfig.addPassthroughCopy({ images: "images" });
  eleventyConfig.addPassthroughCopy({ "style.css": "style.css" });
  eleventyConfig.addPassthroughCopy({ "main.js": "main.js" });
  eleventyConfig.addPassthroughCopy({ "robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "sitemap.xml": "sitemap.xml" });

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
