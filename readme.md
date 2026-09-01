# J-Keebs - Custom Mechanical Keyboards Portfolio

A professional, modern portfolio website showcasing custom mechanical keyboards, modding projects, and restoration work with a focus on German ISO layouts.

## 🎯 Project Overview

J-Keebs is a fully responsive, hand-crafted website built with semantic HTML5, modern CSS3, and vanilla JavaScript. The site features:

- **Comprehensive Portfolio Gallery** - Interactive image galleries with carousels, fullscreen viewer, and detailed project descriptions
- **Blog System** - Personal projects and technical write-ups
- **Guides & Tutorials** - In-depth documentation on keyboard building, switch selection, and modifications
- **Responsive Design** - Works flawlessly on desktop, tablet, and mobile devices
- **Accessibility First** - WCAG 2.1 AA compliance with keyboard navigation and screen reader support
- **Dark/Light Theme** - User-selectable theme with localStorage persistence
- **Internationalization** - Full i18n system supporting English (default) and German
- **Modern Performance** - Lazy loading, minimal dependencies, optimized for Core Web Vitals

## 🌐 Website

Visit the live site: https://brotbeutel.github.io/

## 📁 Project Structure

```
/
├── index.html              # Homepage
├── blog.html              # Blog listing
├── keyboards.html         # Portfolio gallery
├── guides.html            # Guides & tutorials
├── switches.html          # Switches guide
├── faq.html               # Frequently asked questions
├── partner.html           # Partners page
├── about.html             # About me (formerly ueber-uns.html)
├── contact.html           # Contact form (formerly kontakt.html)
├── privacy.html           # Privacy policy (formerly datenschutz.html)
├── terms.html             # Terms of service (formerly agb.html)
├── impressum.html         # Legal notice
├── cookies.html           # Cookie policy
├── 404.html               # Error page
├── blog-*.html            # Individual blog posts
├── main.js                # Core application logic (fully documented)
├── style.css              # All styles (variables, responsive, accessible)
├── images/                # Product photography and assets
├── content/               # Auxiliary content files
└── README.md              # This file
```

## 🛠️ Technology Stack

- **HTML5** - Semantic markup with ARIA labels for accessibility
- **CSS3** - Custom properties (variables), modern layout techniques, responsive design
- **Vanilla JavaScript** - No frameworks; all interactions built from scratch
- **Internationalization** - Custom attribute-based i18n system (data-i18n, data-i18n-html, data-i18n-attr)
- **localStorage** - Persists user preferences (theme, language)
- **No External Dependencies** - Everything is self-contained for maximum performance and reliability

## ✨ Key Features

### Image Gallery & Carousel System
- Click/keyboard navigation between multiple images per gallery
- Synchronized cheat sheets with project details
- Fullscreen viewer with keyboard and touch support
- Focus management for accessibility
- Lazy loading for performance

### Responsive Navigation
- Mobile hamburger menu with smooth animations
- Desktop dropdown panels for guides
- Keyboard accessible (Tab, Enter, Escape, Arrow keys)
- Automatically adapts to viewport changes

### Theme System
- Light and dark modes with smooth transitions
- User preference saved to localStorage
- Respects system color scheme preference (prefers-color-scheme)
- All colors defined as CSS custom properties

### Internationalization (i18n)
- English (default) and German language support
- Dynamic language switching without page reload
- Carousel labels and guide status update on language change
- All UI text externalized as translation keys

### Accessibility
- WCAG 2.1 AA compliance target
- Semantic HTML with proper heading hierarchy
- ARIA labels and roles throughout
- Keyboard navigation for all interactive elements
- Focus management and keyboard traps in modals
- Color contrast ratios meet accessibility standards
- Screen reader optimized

## 📝 Translation Keys

The i18n system uses dot-notation keys organized hierarchically:
- `nav.home`, `nav.blog` - Navigation items
- `utility.*` - Utility text (skiplink, aria labels, etc.)
- `footer.*` - Footer content
- `legal.*` - Legal page links
- Page-specific keys provided via `window.J_KEEBS_I18N`

## 🚀 Performance Optimizations

- **Inline critical CSS** - Theme script prevents FOUC (Flash of Unstyled Content)
- **Lazy loading** - Images load on-demand with `loading="lazy"`
- **Minimal JavaScript** - Vanilla JS with efficient DOM queries
- **CSS variables** - Enables theme switching without full redraws
- **Responsive images** - Proper aspect ratios and picture elements
- **Preconnect hints** - Google Fonts connections are preconnected
- **No unused CSS** - All styles actively used in the design

## 🔧 Development

### Making Changes

1. **HTML Files** - Update semantic structure; use data-i18n attributes for translatable text
2. **CSS** - Modify style.css; CSS custom properties enable theme switching
3. **JavaScript** - Edit main.js; well-commented functions with JSDoc
4. **Translations** - Update i18n dictionaries in main.js for UI text

### Testing

- Test in modern browsers (Chrome, Firefox, Safari, Edge)
- Verify responsive design at breakpoints: 480px, 640px, 768px, 1024px, 1280px
- Check keyboard navigation (Tab, Enter, Escape, Arrow keys)
- Validate accessibility with axe or WAVE
- Test with screen readers (NVDA, JAWS, VoiceOver)

### Browser Support

- Modern browsers with ES5+ JavaScript support
- CSS Grid and Flexbox support required
- CSS custom properties (CSS variables) required
- localStorage recommended (graceful fallback if unavailable)

## 📄 License

This project is proprietary. All content and code are the intellectual property of J-Keebs.

## 👤 Author

**Jannik Schlüter**
- GitHub: https://github.com/Brotbeutel
- LinkedIn: https://www.linkedin.com/in/jannik-schlüter-103270423/
- Email: jannik_schlueter@hotmail.de

---

**Status**: This website is actively maintained and enhanced. New guides, projects, and features are added regularly.
