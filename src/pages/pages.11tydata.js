// Directory data for every template in src/pages/ (P2-F1).
// - layout: shared chrome lives in src/_includes/base.njk.
// - og_url: computed from site.url + page.url, so no page hand-writes its own
//   absolute URL. page.url is "/" for index and "/404.html" for the 404 page,
//   which reproduces the historic canonical values exactly. base.njk falls back
//   from `canonical` to `og_url`; do not duplicate that fallback here.
module.exports = {
  layout: "base.njk",
  eleventyComputed: {
    og_url: (data) => data.site.url + data.page.url,
    page_i18n: (data) => data.i18n[data.page.fileSlug],
    blogArticles: (data) => data.blog,
    blogFeatured: (data) => data.blog.find((article) => article.featured),
    blogTeasers: (data) => data.blog.filter((article) => !article.featured),
    blogArticle: (data) => data.blog.find((article) => article.slug === data.page.fileSlug),
    blogPrevious: (data) => {
      const article = data.blog.find((item) => item.slug === data.page.fileSlug);
      return article && data.blog.find((item) => item.navOrder === article.navOrder - 1);
    },
    blogNext: (data) => {
      const article = data.blog.find((item) => item.slug === data.page.fileSlug);
      return article && data.blog.find((item) => item.navOrder === article.navOrder + 1);
    },
  },
};
