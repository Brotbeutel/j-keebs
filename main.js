/**
 * J-Keebs Main Application JavaScript
 * 
 * This module handles all core application functionality:
 * - Internationalization (i18n) system with language switching
 * - Theme toggling (light/dark mode)
 * - Image gallery carousels with keyboard/touch support
 * - Fullscreen image viewer
 * - Mobile navigation management
 * - Dropdown menu handling
 * - Form submissions with progressive enhancement
 * - Accessibility features (focus management, keyboard navigation)
 * 
 * All user preferences (language, theme) are persisted to localStorage.
 * The module uses a custom attribute-based i18n system with data-i18n,
 * data-i18n-html, and data-i18n-attr attributes for translation.
 * 
 * @version 2.0.0
 * @author J-Keebs
 */

/**
 * Global i18n dictionary containing translations for all UI text.
 * Organized by language (de, en) with dot-notation keys for hierarchical organization.
 * Page-specific translations can be provided in window.J_KEEBS_I18N and will be
 * merged with these common translations.
 * 
 * @type {Object.<string, Object.<string, string>>}
 */
window.J_KEEBS_I18N_COMMON = {
    de: {
        "nav.home": "Home", "nav.blog": "Blog", "nav.keyboards": "Keyboards",
        "nav.guides": "Guides & Tutorials", "nav.switches": "Switches",
        "nav.guides.switches": "Switches", "nav.guides.plates": "Plates", "nav.guides.mods": "Mods",
        "nav.about": "Über mich", "nav.faq": "FAQ", "nav.partner": "Partner", "nav.kontakt": "Kontakt",
        "utility.lang.aria": "Sprache wählen",
        "utility.theme.aria": "Farbschema wählen",
        "utility.theme.dark": "Dunkler Modus",
        "utility.theme.light": "Heller Modus",
        "utility.carousel.prev": "Vorheriges Foto",
        "utility.carousel.next": "Nächstes Foto",
        "utility.carousel.dot": "Foto {n} von {total}",
        "utility.fullscreen.prev": "Vorheriges Bild",
        "utility.fullscreen.next": "Nächstes Bild",
        "utility.fullscreen.close": "Fullscreen schließen",
        "utility.fullscreen.closeTitle": "Esc zum Schließen",
        "utility.skiplink": "Zum Inhalt springen",
        "utility.brand.aria": "J-Keebs Startseite",
        "utility.nav.aria": "Hauptnavigation",
        "utility.social.aria": "Profile",
        "utility.legalnav.aria": "Rechtliches",
        "utility.social.github": "Besuchen Sie das GitHub-Profil",
        "utility.social.linkedin": "Besuchen Sie das LinkedIn-Profil",
        "utility.cheatToggle.aria": "Spickzettel anzeigen",
        "utility.navToggle.aria": "Menü",
        "utility.breadcrumb.aria": "Navigationspfad",
        "breadcrumb.guides": "← Guides & Tutorials",
        "footer.tagline": "Custom Mechanical Keyboards, Modding und Upcycling mit Fokus auf deutsches ISO-Layout.",
        "footer.poweredBy": "Powered by PCBWay",
        "footer.col1.heading": "Entdecken", "footer.col2.heading": "Community", "footer.col3.heading": "Kontakt",
        "footer.mail": "E-Mail schreiben", "footer.contactpage": "Kontaktseite",
        "footer.copyright": "© 2026 J-Keebs. Alle Rechte vorbehalten.",
        "legal.impressum": "Impressum", "legal.datenschutz": "Datenschutz", "legal.cookies": "Cookies", "legal.agb": "AGB",
        "breadcrumb.blog": "← Blog",
        "utility.articleNav.aria": "Weitere Artikel",
        "blog.featuredLabel": "Featured",
        "cta.readMore": "Weiterlesen →",
        "article.prevLabel": "Vorheriger Artikel",
        "article.nextLabel": "Nächster Artikel",
    },
    en: {
        "nav.home": "Home", "nav.blog": "Blog", "nav.keyboards": "Keyboards",
        "nav.guides": "Guides & Tutorials", "nav.switches": "Switches",
        "nav.guides.switches": "Switches", "nav.guides.plates": "Plates", "nav.guides.mods": "Mods",
        "nav.about": "About", "nav.faq": "FAQ", "nav.partner": "Partners", "nav.kontakt": "Contact",
        "utility.lang.aria": "Choose language",
        "utility.theme.aria": "Choose color scheme",
        "utility.theme.dark": "Dark mode",
        "utility.theme.light": "Light mode",
        "utility.carousel.prev": "Previous photo",
        "utility.carousel.next": "Next photo",
        "utility.carousel.dot": "Photo {n} of {total}",
        "utility.fullscreen.prev": "Previous image",
        "utility.fullscreen.next": "Next image",
        "utility.fullscreen.close": "Close fullscreen",
        "utility.fullscreen.closeTitle": "Esc to close",
        "utility.skiplink": "Skip to content",
        "utility.brand.aria": "J-Keebs homepage",
        "utility.nav.aria": "Main navigation",
        "utility.social.aria": "Profiles",
        "utility.legalnav.aria": "Legal",
        "utility.social.github": "Visit the GitHub profile",
        "utility.social.linkedin": "Visit the LinkedIn profile",
        "utility.cheatToggle.aria": "Show cheat sheet",
        "utility.navToggle.aria": "Menu",
        "utility.breadcrumb.aria": "Breadcrumb",
        "breadcrumb.guides": "← Guides & Tutorials",
        "footer.tagline": "Custom mechanical keyboards, modding and upcycling focused on the German ISO layout.",
        "footer.poweredBy": "Powered by PCBWay",
        "footer.col1.heading": "Explore", "footer.col2.heading": "Community", "footer.col3.heading": "Contact",
        "footer.mail": "Send an email", "footer.contactpage": "Contact page",
        "footer.copyright": "© 2026 J-Keebs. All rights reserved.",
        "legal.impressum": "Legal notice", "legal.datenschutz": "Privacy", "legal.cookies": "Cookies", "legal.agb": "Terms",
        "breadcrumb.blog": "← Blog",
        "utility.articleNav.aria": "More articles",
        "blog.featuredLabel": "Featured",
        "cta.readMore": "Read more →",
        "article.prevLabel": "Previous article",
        "article.nextLabel": "Next article",
    }
};

/**
 * Core Application Module
 * Self-executing function to avoid polluting the global namespace.
 * All functionality is encapsulated within this module.
 */
(function () {
    "use strict";

    // ============================================================================
    // CONFIGURATION & CONSTANTS
    // ============================================================================

    const root = document.documentElement;
    const THEME_KEY = "jkeebs-theme";
    const LANG_KEY = "jkeebs-lang";
    const DEFAULT_THEME = "light";
    const DEFAULT_LANG = "en";  // Changed from "de" to "en"

    // ============================================================================
    // THEME MANAGEMENT
    // ============================================================================

    /**
     * Apply a theme to the document and persist to localStorage.
     * Updates the data-theme attribute on the root element and sets aria-pressed
     * states on all theme toggle buttons.
     * 
     * @param {string} theme - Theme to apply ("light" or "dark")
     */
    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (e) {
            console.warn("J-Keebs: localStorage unavailable for theme persistence.", e);
        }
        
        // Update toggle button states to reflect active theme
        document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
            const isActive = btn.getAttribute("data-theme-toggle") === theme;
            btn.setAttribute("aria-pressed", isActive ? "true" : "false");
        });
    }

    // ============================================================================
    // INTERNATIONALIZATION (i18n) SYSTEM
    // ============================================================================

    /**
     * Apply a language to the document and persist to localStorage.
     * Updates the lang attribute on the root element, applies all translations
     * from the i18n dictionaries, and updates language toggle button states.
     * 
     * Translations are applied using three mechanisms:
     * - data-i18n: Sets textContent from dictionary
     * - data-i18n-html: Sets innerHTML from dictionary (for HTML content)
     * - data-i18n-attr: Sets HTML attributes (comma-separated pairs like "attr:key")
     * 
     * @param {string} lang - Language code to apply ("en" or "de")
     */
    function applyLang(lang) {
        root.setAttribute("lang", lang);
        try {
            localStorage.setItem(LANG_KEY, lang);
        } catch (e) {
            console.warn("J-Keebs: localStorage unavailable for language persistence.", e);
        }

        // Merge common and page-specific translations
        const common = (window.J_KEEBS_I18N_COMMON && window.J_KEEBS_I18N_COMMON[lang]) || {};
        const page = (window.J_KEEBS_I18N && window.J_KEEBS_I18N[lang]) || {};
        const dict = Object.assign({}, common, page);

        if (Object.keys(dict).length) {
            // Apply text content translations
            document.querySelectorAll("[data-i18n]").forEach(function (el) {
                const key = el.getAttribute("data-i18n");
                if (dict[key] !== undefined) {
                    el.textContent = dict[key];
                }
            });

            // Apply HTML content translations (for markup with links, etc.)
            document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
                const key = el.getAttribute("data-i18n-html");
                if (dict[key] !== undefined) {
                    el.innerHTML = dict[key];
                }
            });

            // Apply attribute translations (e.g., "aria-label:key1,title:key2")
            document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
                el.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
                    const [attr, key] = pair.trim().split(":");
                    if (dict[key] !== undefined) {
                        el.setAttribute(attr, dict[key]);
                    }
                });
            });
        }

        // Update language toggle button states
        document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
            const isActive = btn.getAttribute("data-lang-toggle") === lang;
            btn.setAttribute("aria-pressed", isActive ? "true" : "false");
        });

        // Update component translations that depend on language
        relabelCarousels(dict);
        updateGuideCategoryStatus(dict);
    }

    /**
     * Dynamically update carousel button labels based on current language.
     * Carousel dots show position labels (e.g., "Photo 2 of 4") which must
     * be regenerated when language changes.
     * 
     * @param {Object.<string, string>} dict - Translation dictionary for current language
     */
    function relabelCarousels(dict) {
        const dotTemplate = dict["utility.carousel.dot"] || "Photo {n} of {total}";
        const prevLabel = dict["utility.carousel.prev"] || "Previous photo";
        const nextLabel = dict["utility.carousel.next"] || "Next photo";

        document.querySelectorAll(".polaroid-frame").forEach(function (frame) {
            const dots = frame.querySelectorAll(".carousel-dots button");
            const total = dots.length;
            
            dots.forEach(function (dot, idx) {
                const label = dotTemplate
                    .replace("{n}", idx + 1)
                    .replace("{total}", total);
                dot.setAttribute("aria-label", label);
            });

            const prev = frame.querySelector(".carousel-btn--prev");
            const next = frame.querySelector(".carousel-btn--next");
            if (prev) prev.setAttribute("aria-label", prevLabel);
            if (next) next.setAttribute("aria-label", nextLabel);
        });
    }

    /**
     * Update guide category status text on guides.html.
     * Counts available guides vs. pending guides in each category and
     * updates summary text like "2/5" to show current progress.
     * 
     * @param {Object.<string, string>} dict - Translation dictionary for current language
     */
    function updateGuideCategoryStatus(dict) {
        const statusEls = document.querySelectorAll("[data-guide-status]");
        if (!statusEls.length) return;

        const template = dict["status.summary"] || "{available}/{total}";
        statusEls.forEach(function (el) {
            const section = document.getElementById(el.getAttribute("data-guide-status"));
            if (!section) return;

            const total = section.querySelectorAll(".guide-card").length;
            const pending = section.querySelectorAll(".guide-card--pending").length;
            const available = total - pending;

            el.textContent = template
                .replace("{available}", available)
                .replace("{total}", total);
        });
    }

    // ============================================================================
    // IMAGE GALLERY & CAROUSEL FUNCTIONALITY
    // ============================================================================

    /**
     * Initialize a carousel gallery within a polaroid frame.
     * Manages keyboard/click navigation between images and synchronized caption display.
     * Also handles associated cheat sheet slides (additional info cards paired with images).
     * 
     * @param {HTMLElement} frame - The .polaroid-frame element containing the carousel
     */
    function initGallery(frame) {
        const imgs = frame.querySelectorAll(".polaroid-frame__viewport [data-slide]");
        const dots = frame.querySelectorAll(".carousel-dots button");
        let index = 0;
        const foot = frame.querySelector(".polaroid-frame__foot");
        let caption = frame.querySelector(".polaroid-frame__caption");

        // Associated cheat sheets (info cards) that appear alongside images
        const stage = frame.closest(".gallery-item__stage");
        const cheatSlides = stage ? stage.querySelectorAll(".cheat-sheet-stack > .cheat-sheet") : [];

        // Create caption element if not already present
        if (!caption && foot) {
            caption = document.createElement("span");
            caption.className = "polaroid-frame__caption";
            if (foot.firstChild) {
                foot.insertBefore(caption, foot.firstChild);
            } else {
                foot.appendChild(caption);
            }
        }

        /**
         * Show a specific slide in the carousel.
         * Handles wrapping (circular navigation) and updates active states.
         * Only visible images are included in tab order for accessibility.
         * 
         * @param {number} i - Index of slide to show (wraps around)
         */
        function show(i) {
            // Wrap index around carousel length
            index = (i + imgs.length) % imgs.length;

            // Update image visibility and tab order
            imgs.forEach(function (el, idx) {
                const active = idx === index;
                el.classList.toggle("is-active", active);
                // Only the active image is in tab order; others are -1 to skip them
                el.setAttribute("tabindex", active ? "0" : "-1");
            });

            // Update dot indicators
            dots.forEach(function (dot, idx) {
                dot.setAttribute("aria-current", idx === index ? "true" : "false");
            });

            // Sync associated cheat sheet cards
            cheatSlides.forEach(function (el, idx) {
                el.classList.toggle("is-active", idx === index);
            });

            // Update caption from image alt/title
            if (caption) {
                const activeImg = imgs[index];
                const text = activeImg && (activeImg.getAttribute("title") || activeImg.getAttribute("alt") || "");
                caption.textContent = text;
            }
        }

        // Attach navigation controls
        const prev = frame.querySelector(".carousel-btn--prev");
        const next = frame.querySelector(".carousel-btn--next");
        if (prev) {
            prev.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                show(index - 1);
            });
        }
        if (next) {
            next.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                show(index + 1);
            });
        }

        // Attach dot navigation
        dots.forEach(function (dot, idx) {
            dot.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                show(idx);
            });
        });

        // Display first slide
        show(0);
    }

    /**
     * Initialize cheat sheet toggle for a gallery stage.
     * Allows users to expand/collapse additional info cards via click or keyboard.
     * 
     * @param {HTMLElement} stage - The .gallery-item__stage element
     */
    function initCheatSheetToggle(stage) {
        const frame = stage.querySelector(".polaroid-frame");
        if (!frame) return;

        const toggleBtn = stage.querySelector(".cheat-toggle");

        /**
         * Toggle the open/closed state of the cheat sheet.
         */
        function toggle() {
            const open = stage.classList.toggle("is-open");
            frame.setAttribute("aria-expanded", open ? "true" : "false");
            if (toggleBtn) {
                toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
            }
        }

        // Initialize closed state
        frame.setAttribute("aria-expanded", "false");
        if (toggleBtn) {
            toggleBtn.setAttribute("aria-expanded", "false");
        }

        // Toggle on frame click (but not on carousel controls)
        frame.addEventListener("click", function (e) {
            if (e.target.closest(".carousel-btn") || e.target.closest(".carousel-dots")) {
                return;
            }
            toggle();
        });

        // Toggle on Enter/Space key
        frame.addEventListener("keydown", function (e) {
            if (e.target !== frame) return; // Let internal buttons handle their own input
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle();
            }
        });
    }

    // ============================================================================
    // FULLSCREEN IMAGE VIEWER
    // ============================================================================

    /**
     * Initialize the fullscreen image viewer modal.
     * Provides expanded view of gallery images with keyboard navigation,
     * focus trapping, and seamless integration with carousels.
     */
    function initFullscreenViewer() {
        const overlay = document.getElementById("fullscreenOverlay");
        const closeBtn = document.getElementById("fullscreenClose");
        const prevBtn = document.getElementById("fullscreenPrev");
        const nextBtn = document.getElementById("fullscreenNext");
        const fullscreenImg = document.getElementById("fullscreenImage");
        const infoText = document.getElementById("fullscreenInfo");

        if (!overlay || !closeBtn || !fullscreenImg) return;

        let currentGallery = [];
        let currentIndex = 0;
        let lastTrigger = null;  // Track which image opened the viewer for focus return

        /**
         * Get all focusable elements in the overlay.
         * @returns {Array<HTMLElement>}
         */
        function getFocusableInOverlay() {
            return Array.from(overlay.querySelectorAll("button"))
                .filter(el => !el.hasAttribute("hidden"));
        }

        /**
         * Trap Tab/Shift+Tab focus within the overlay.
         * Prevents focus from escaping to elements behind the modal.
         * @param {KeyboardEvent} e
         */
        function trapFocus(e) {
            if (e.key !== "Tab") return;

            const focusable = getFocusableInOverlay();
            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }

        /**
         * Get the full gallery of images for a given image.
         * Either returns all images from the parent carousel or the single image.
         * @param {HTMLImageElement} img
         * @returns {Array<HTMLImageElement>}
         */
        function getGalleryFor(img) {
            const frame = img.closest(".polaroid-frame");
            if (frame) {
                const frames = Array.from(frame.querySelectorAll("[data-slide]"));
                if (frames.length) return frames;
            }

            const single = img.closest(".single-polaroid");
            return single ? [img] : [img];
        }

        /**
         * Update the fullscreen image display and sync carousel carousel state.
         */
        function updateFullscreenImage() {
            if (!currentGallery.length) return;

            const active = currentGallery[currentIndex] || currentGallery[0];
            if (!active) return;

            // Sync carousel state if this image is from a carousel
            if (active.closest(".polaroid-frame")) {
                currentGallery.forEach((img, idx) => {
                    img.classList.toggle("is-active", idx === currentIndex);
                });

                const frame = active.closest(".polaroid-frame");
                const dots = frame.querySelectorAll(".carousel-dots button");
                dots.forEach((dot, idx) => {
                    dot.setAttribute("aria-current", idx === currentIndex ? "true" : "false");
                });
            }

            // Update fullscreen image
            fullscreenImg.src = active.src;
            fullscreenImg.alt = active.alt || "";

            // Update caption from parent polaroid
            const parent = active.closest(".polaroid-frame") || active.closest(".single-polaroid");
            const figcaption = parent ? parent.querySelector("figcaption") : null;
            infoText.textContent = figcaption ? figcaption.textContent : (active.alt || "Image");

            // Show/hide navigation buttons based on gallery size
            const hasMultipleImages = currentGallery.length > 1;
            if (prevBtn) {
                prevBtn.toggleAttribute("hidden", !hasMultipleImages);
            }
            if (nextBtn) {
                nextBtn.toggleAttribute("hidden", !hasMultipleImages);
            }
        }

        /**
         * Open the fullscreen viewer with a given image.
         * @param {HTMLImageElement} img
         */
        function openFullscreen(img) {
            if (!img || !img.src) return;

            lastTrigger = img;
            currentGallery = getGalleryFor(img);

            // Determine starting index
            const frame = img.closest(".polaroid-frame");
            if (frame) {
                const activeSlide = frame.querySelector(".polaroid-frame__viewport img.is-active") || currentGallery[0];
                currentIndex = currentGallery.indexOf(activeSlide);
                if (currentIndex < 0) currentIndex = currentGallery.indexOf(img);
            } else {
                currentIndex = currentGallery.indexOf(img);
            }

            if (currentIndex < 0) currentIndex = 0;

            updateFullscreenImage();
            overlay.classList.add("is-active");
            overlay.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";

            // Defer focus to ensure element is visible
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    closeBtn.focus();
                });
            });
        }

        /**
         * Close the fullscreen viewer and restore focus.
         */
        function closeFullscreen() {
            // Sync carousel state when closing
            if (currentGallery.length && currentGallery[currentIndex]) {
                currentGallery.forEach((img, idx) => {
                    img.classList.toggle("is-active", idx === currentIndex);
                });

                const frame = currentGallery[currentIndex].closest(".polaroid-frame");
                if (frame) {
                    const dots = frame.querySelectorAll(".carousel-dots button");
                    dots.forEach((dot, idx) => {
                        dot.setAttribute("aria-current", idx === currentIndex ? "true" : "false");
                    });
                }
            }

            overlay.classList.remove("is-active");
            overlay.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";

            // Return focus to trigger image
            if (lastTrigger) {
                lastTrigger.focus();
                lastTrigger = null;
            }
        }

        // Make all images clickable to open fullscreen
        document.querySelectorAll(".single-polaroid img, .polaroid-frame__viewport img").forEach(function (img) {
            img.style.cursor = "pointer";
            img.setAttribute("role", "button");

            // Set initial tab order: only active carousel images are tabbable
            if (!img.hasAttribute("data-slide") || img.classList.contains("is-active")) {
                img.setAttribute("tabindex", "0");
            } else {
                img.setAttribute("tabindex", "-1");
            }

            // Open on click
            img.addEventListener("click", function (e) {
                e.stopPropagation();
                openFullscreen(this);
            });

            // Open on Enter/Space
            img.addEventListener("keydown", function (e) {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    openFullscreen(this);
                }
            });
        });

        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                if (!currentGallery.length) return;
                currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
                updateFullscreenImage();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                if (!currentGallery.length) return;
                currentIndex = (currentIndex + 1) % currentGallery.length;
                updateFullscreenImage();
            });
        }

        closeBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            closeFullscreen();
        });

        // Close on background click
        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) {
                closeFullscreen();
            }
        });

        // Prevent closing when clicking the image itself
        fullscreenImg.addEventListener("click", function (e) {
            e.stopPropagation();
        });

        // Keyboard navigation
        document.addEventListener("keydown", function (e) {
            if (!overlay.classList.contains("is-active")) return;

            // Escape to close
            if (e.key === "Escape") {
                closeFullscreen();
                return;
            }

            // Tab focus trapping
            if (e.key === "Tab") {
                trapFocus(e);
                return;
            }

            // Arrow keys for navigation
            if (e.key === "ArrowRight" && nextBtn) nextBtn.click();
            if (e.key === "ArrowLeft" && prevBtn) prevBtn.click();
        });
    }

    // ============================================================================
    // CONTACT FORM HANDLING
    // ============================================================================

    /**
     * Initialize contact form with progressive enhancement.
     * Form works without JavaScript (standard POST), but with JS, submission
     * happens via fetch in the background with user-friendly feedback.
     * Includes honeypot spam protection.
     */
    function initContactForm() {
        const form = document.getElementById("contactForm");
        const status = document.getElementById("contactFormStatus");

        /**
         * Get current language's translation dictionary.
         * @returns {Object.<string, string>}
         */
        function currentDict() {
            const lang = root.getAttribute("lang") || DEFAULT_LANG;
            const common = (window.J_KEEBS_I18N_COMMON && window.J_KEEBS_I18N_COMMON[lang]) || {};
            const page = (window.J_KEEBS_I18N && window.J_KEEBS_I18N[lang]) || {};
            return Object.assign({}, common, page);
        }

        // Show success message if returning from form submission
        if (status && window.location.search.indexOf("sent=1") !== -1) {
            const dict = currentDict();
            status.textContent = dict["c.form.success"] || "Thank you! Your message is on its way.";
            status.className = "form-status form-status--success";
            try {
                const cleanUrl = window.location.pathname + window.location.hash;
                window.history.replaceState({}, "", cleanUrl);
            } catch (e) {}
        }

        if (!form) return;

        form.addEventListener("submit", function (e) {
            // Honeypot spam protection
            const honey = form.querySelector('[name="_honey"]');
            if (honey && honey.value) {
                e.preventDefault();
                return;
            }

            e.preventDefault();
            const dict = currentDict();
            const submitBtn = form.querySelector('button[type="submit"]');

            // Disable button and show sending message
            if (submitBtn) submitBtn.disabled = true;
            if (status) {
                status.textContent = dict["c.form.sending"] || "Sending…";
                status.className = "form-status";
            }

            // Submit via fetch.
            // IMPORTANT: FormSubmit's plain form-action endpoint (used below by the
            // native no-JS fallback) is not documented to return CORS headers or JSON
            // for cross-origin fetch/XHR calls. Their docs specify a dedicated
            // /ajax/{email} endpoint for that (JSON body, Content-Type + Accept
            // headers) — see https://formsubmit.co/documentation. Reusing the plain
            // action URL here was the likely cause of unreliable/CORS-blocked
            // submissions; this derives the ajax endpoint from the same action URL
            // so the two stay in sync if the destination email ever changes.
            const ajaxAction = form.getAttribute("action").replace(
                "https://formsubmit.co/",
                "https://formsubmit.co/ajax/"
            );
            const payload = {};
            new FormData(form).forEach(function (value, key) {
                if (key === "_honey") return; // already checked above, no need to send
                payload[key] = value;
            });

            fetch(ajaxAction, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            })
                .then(res => {
                    if (!res.ok) throw new Error("bad response");
                    form.reset();
                    if (status) {
                        status.textContent = dict["c.form.success"] || "Thank you! Your message is on its way.";
                        status.className = "form-status form-status--success";
                    }
                })
                .catch(() => {
                    if (status) {
                        status.textContent = dict["c.form.error"] || "Oops, that didn't work. Please email me directly.";
                        status.className = "form-status form-status--error";
                    }
                })
                .finally(() => {
                    if (submitBtn) submitBtn.disabled = false;
                });
        });
    }

    // ============================================================================
    // MOBILE NAVIGATION
    // ============================================================================

    /**
     * Initialize mobile hamburger navigation menu.
     * Manages open/close state of the navigation panel on smaller screens.
     * On desktop (>1280px), navigation is always visible per CSS.
     */
    function initMobileNav() {
        const toggle = document.getElementById("navToggle");
        const nav = document.getElementById("siteNav");
        if (!toggle || !nav) return;

        /**
         * Close the mobile navigation menu.
         */
        function closeNav() {
            nav.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");

            // Close any open dropdowns too
            nav.querySelectorAll(".nav-dropdown.is-open").forEach(dropdown => {
                dropdown.classList.remove("is-open");
                const trigger = dropdown.querySelector(".nav-dropdown__trigger");
                if (trigger) trigger.setAttribute("aria-expanded", "false");
            });
        }

        /**
         * Open the mobile navigation menu.
         */
        function openNav() {
            nav.classList.add("is-open");
            toggle.setAttribute("aria-expanded", "true");
        }

        // Toggle menu on button click
        toggle.addEventListener("click", function (e) {
            e.stopPropagation();
            if (nav.classList.contains("is-open")) {
                closeNav();
            } else {
                openNav();
            }
        });

        // Close menu when clicking a link
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeNav);
        });

        // Close menu when clicking outside
        document.addEventListener("click", function (e) {
            if (!nav.classList.contains("is-open")) return;
            if (e.target.closest("#siteNav") || e.target.closest("#navToggle")) return;
            closeNav();
        });

        // Close menu on Escape
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && nav.classList.contains("is-open")) {
                closeNav();
                toggle.focus();
            }
        });

        // Close menu when viewport expands to desktop
        const desktopQuery = window.matchMedia("(min-width: 1281px)");
        function handleBreakpointChange(e) {
            if (e.matches) closeNav();
        }
        if (desktopQuery.addEventListener) {
            desktopQuery.addEventListener("change", handleBreakpointChange);
        } else if (desktopQuery.addListener) {
            desktopQuery.addListener(handleBreakpointChange);
        }
    }

    // ============================================================================
    // DROPDOWN MENU HANDLING
    // ============================================================================

    /**
     * Initialize dropdown menus (e.g., "Guides & Tutorials").
     * Handles click-to-open on all devices, with CSS hover enhancements on desktop.
     * On desktop, panel positioning accounts for fixed positioning viewport coordinates.
     */
    function initNavDropdowns() {
        const desktopQuery = window.matchMedia("(min-width: 1281px)");

        document.querySelectorAll(".nav-dropdown").forEach(dropdown => {
            const trigger = dropdown.querySelector(".nav-dropdown__trigger");
            const panel = dropdown.querySelector(".nav-dropdown__panel");
            if (!trigger || !panel) return;

            /**
             * Position the dropdown panel on desktop (viewport coordinates).
             */
            function positionPanel() {
                if (!desktopQuery.matches) {
                    panel.style.top = "";
                    panel.style.left = "";
                    return;
                }

                const rect = trigger.getBoundingClientRect();
                panel.style.top = Math.round(rect.bottom + 8) + "px";
                panel.style.left = Math.round(rect.left) + "px";
            }

            /**
             * Close the dropdown.
             */
            function closeDropdown() {
                dropdown.classList.remove("is-open");
                trigger.setAttribute("aria-expanded", "false");
            }

            /**
             * Open the dropdown.
             */
            function openDropdown() {
                dropdown.classList.add("is-open");
                trigger.setAttribute("aria-expanded", "true");
                positionPanel();
            }

            // Click to toggle
            trigger.addEventListener("click", function (e) {
                e.stopPropagation();
                if (dropdown.classList.contains("is-open")) {
                    closeDropdown();
                } else {
                    openDropdown();
                }
            });

            // Reposition on focus (Tab key)
            trigger.addEventListener("focus", positionPanel);

            // Close when clicking a link in the panel
            panel.querySelectorAll("a").forEach(link => {
                link.addEventListener("click", closeDropdown);
            });

            // Close when clicking outside
            document.addEventListener("click", function (e) {
                if (!dropdown.classList.contains("is-open")) return;
                if (e.target.closest(".nav-dropdown")) return;
                closeDropdown();
            });

            // Close on Escape
            document.addEventListener("keydown", function (e) {
                if (e.key === "Escape" && dropdown.classList.contains("is-open")) {
                    closeDropdown();
                    trigger.focus();
                }
            });

            // Reposition on window resize
            window.addEventListener("resize", () => {
                if (dropdown.classList.contains("is-open")) positionPanel();
            });
        });
    }

    // ============================================================================
    // SCROLL SPY FOR JUMP NAVIGATION
    // ============================================================================

    /**
     * Initialize scroll spy for guides and legal pages.
     * Uses IntersectionObserver to track which section is currently in viewport
     * and update the corresponding navigation link's active state.
     * Used on guides.html and legal pages (privacy, terms, etc.).
     */
    function initGuideJumpnav() {
        const navs = document.querySelectorAll(".guide-jumpnav, .legal-jumpnav");
        if (!navs.length || !("IntersectionObserver" in window)) return;

        navs.forEach(nav => {
            const links = Array.from(nav.querySelectorAll("a[href^='#']"));
            const sections = links
                .map(link => document.getElementById(link.getAttribute("href").slice(1)))
                .filter(Boolean);

            if (!sections.length) return;

            /**
             * Mark a section as active in the navigation.
             * @param {string} id - Section ID to mark as active
             */
            function setActive(id) {
                links.forEach(link => {
                    const isActive = link.getAttribute("href") === "#" + id;
                    link.setAttribute("aria-current", isActive ? "true" : "false");
                });
            }

            // Observe sections and mark active when in viewport
            const observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setActive(entry.target.id);
                        }
                    });
                },
                {
                    rootMargin: "-45% 0px -50% 0px",
                    threshold: 0
                }
            );

            sections.forEach(section => {
                observer.observe(section);
            });
        });
    }

    // ============================================================================
    // INITIALIZATION
    // ============================================================================

    // Load saved theme before DOM renders to prevent flash
    let savedTheme = DEFAULT_THEME;
    try {
        savedTheme = localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
    } catch (e) {}
    applyTheme(savedTheme);

    // Wait for DOM to be ready before initializing all features
    document.addEventListener("DOMContentLoaded", function () {
        // Load saved language (default to "en")
        let savedLang = DEFAULT_LANG;
        try {
            savedLang = localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
        } catch (e) {}
        applyLang(savedLang);

        // Set up theme toggle buttons
        const currentTheme = root.getAttribute("data-theme") || DEFAULT_THEME;
        document.querySelectorAll("[data-theme-toggle]").forEach(btn => {
            const isActive = btn.getAttribute("data-theme-toggle") === currentTheme;
            btn.setAttribute("aria-pressed", isActive ? "true" : "false");
            btn.addEventListener("click", function () {
                applyTheme(btn.getAttribute("data-theme-toggle"));
            });
        });

        // Set up language toggle buttons
        document.querySelectorAll("[data-lang-toggle]").forEach(btn => {
            btn.addEventListener("click", function () {
                applyLang(btn.getAttribute("data-lang-toggle"));
            });
        });

        // Initialize all interactive components
        document.querySelectorAll(".polaroid-frame").forEach(initGallery);
        document.querySelectorAll(".gallery-item__stage").forEach(initCheatSheetToggle);
        initFullscreenViewer();
        initContactForm();
        initMobileNav();
        initNavDropdowns();
        initGuideJumpnav();
    });

})();
