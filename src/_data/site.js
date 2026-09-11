module.exports = {
  name: "J-Keebs",
  url: "https://brotbeutel.github.io/j-keebs",
  basePath: "/j-keebs/",
  lang: "en",
  author: "Jannik Schlüter",
  nav: [
    { href: "index.html", i18n: "nav.home", label: "Home" },
    { href: "blog.html", i18n: "nav.blog", label: "Blog" },
    { href: "keyboards.html", i18n: "nav.keyboards", label: "Keyboards" },
    {
      href: "guides.html",
      i18n: "nav.guides",
      label: "Guides",
      dropdown: [
        { href: "guides.html#switches", i18n: "nav.guides.switches", label: "Switches" },
        { href: "guides.html#plates", i18n: "nav.guides.plates", label: "Plates" },
        { href: "guides.html#mods", i18n: "nav.guides.mods", label: "Mods" },
        { href: "guides.html#keycaps", i18n: "nav.guides.keycaps", label: "Keycaps" },
      ],
    },
    { href: "about.html", i18n: "nav.about", label: "Über mich" },
    { href: "faq.html", i18n: "nav.faq", label: "FAQ" },
    { href: "partner.html", i18n: "nav.partner", label: "Partner" },
    { href: "contact.html", i18n: "nav.kontakt", label: "Kontakt" },
  ],
};
