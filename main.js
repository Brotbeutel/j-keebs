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

(function () {
    "use strict";

    var root = document.documentElement;
    var THEME_KEY = "jkeebs-theme";
    var LANG_KEY = "jkeebs-lang";

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
        document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
            btn.setAttribute("aria-pressed", btn.getAttribute("data-theme-toggle") === theme ? "true" : "false");
        });
    }

    function applyLang(lang) {
        root.setAttribute("lang", lang);
        try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
        var common = (window.J_KEEBS_I18N_COMMON && window.J_KEEBS_I18N_COMMON[lang]) || {};
        var page = (window.J_KEEBS_I18N && window.J_KEEBS_I18N[lang]) || {};
        var dict = Object.assign({}, common, page);
        if (Object.keys(dict).length) {
            document.querySelectorAll("[data-i18n]").forEach(function (el) {
                var key = el.getAttribute("data-i18n");
                if (dict[key] !== undefined) el.textContent = dict[key];
            });
            document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
                el.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
                    var parts = pair.split(":");
                    var attr = parts[0], key = parts[1];
                    if (dict[key] !== undefined) el.setAttribute(attr, dict[key]);
                });
            });
        }
        document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
            btn.setAttribute("aria-pressed", btn.getAttribute("data-lang-toggle") === lang ? "true" : "false");
        });
        relabelCarousels(dict);
        updateGuideCategoryStatus(dict);
    }

    // Karussell-Dots und Vor/Zurück-Buttons sind positionsbasiert ("Foto 2 von 4") statt
    // Inhalt-basiert, deshalb werden sie hier dynamisch aus dem aktuellen Wörterbuch befüllt,
    // statt für jedes Foto in jeder Galerie einen eigenen data-i18n-Key zu brauchen.
    function relabelCarousels(dict) {
        var dotTemplate = dict["utility.carousel.dot"] || "Foto {n} von {total}";
        var prevLabel = dict["utility.carousel.prev"] || "Vorheriges Foto";
        var nextLabel = dict["utility.carousel.next"] || "Nächstes Foto";
        document.querySelectorAll(".polaroid-frame").forEach(function (frame) {
            var dots = frame.querySelectorAll(".carousel-dots button");
            var total = dots.length;
            dots.forEach(function (dot, idx) {
                dot.setAttribute("aria-label", dotTemplate.replace("{n}", idx + 1).replace("{total}", total));
            });
            var prev = frame.querySelector(".carousel-btn--prev");
            var next = frame.querySelector(".carousel-btn--next");
            if (prev) prev.setAttribute("aria-label", prevLabel);
            if (next) next.setAttribute("aria-label", nextLabel);
        });
    }

    // guides.html: zählt pro Kategorie automatisch, wie viele .guide-card
    // schon verfügbar sind (echter Link) vs. noch als .guide-card--pending
    // ("Folgt") markiert sind. So muss die Zusammenfassung nicht von Hand
    // gepflegt werden, sobald neue Guides live gehen - no-op auf allen
    // anderen Seiten ohne [data-guide-status].
    function updateGuideCategoryStatus(dict) {
        var statusEls = document.querySelectorAll("[data-guide-status]");
        if (!statusEls.length) return;
        var template = dict["status.summary"] || "{available}/{total}";
        statusEls.forEach(function (el) {
            var section = document.getElementById(el.getAttribute("data-guide-status"));
            if (!section) return;
            var total = section.querySelectorAll(".guide-card").length;
            var pending = section.querySelectorAll(".guide-card--pending").length;
            el.textContent = template.replace("{available}", total - pending).replace("{total}", total);
        });
    }

    function initGallery(frame) {
        var imgs = frame.querySelectorAll(".polaroid-frame__viewport [data-slide]");
        var dots = frame.querySelectorAll(".carousel-dots button");
        var index = 0;
        var foot = frame.querySelector(".polaroid-frame__foot");
        var caption = frame.querySelector(".polaroid-frame__caption");

        // Jedes Foto im Karussell hat sein eigenes Spickzettel-Kärtchen (siehe
        // .cheat-sheet-stack im HTML, ein Sibling von .polaroid-frame). Die
        // Kärtchen werden hier synchron zum aktiven Foto umgeschaltet.
        var stage = frame.closest(".gallery-item__stage");
        var cheatSlides = stage ? stage.querySelectorAll(".cheat-sheet-stack > .cheat-sheet") : [];

        if (!caption && foot) {
            caption = document.createElement("span");
            caption.className = "polaroid-frame__caption";
            if (foot.firstChild) {
                foot.insertBefore(caption, foot.firstChild);
            } else {
                foot.appendChild(caption);
            }
        }

        function show(i) {
            index = (i + imgs.length) % imgs.length;
            imgs.forEach(function (el, idx) { el.classList.toggle("is-active", idx === index); });
            dots.forEach(function (dot, idx) { dot.setAttribute("aria-current", idx === index ? "true" : "false"); });
            cheatSlides.forEach(function (el, idx) { el.classList.toggle("is-active", idx === index); });
            if (caption) {
                var active = imgs[index];
                var text = active && (active.getAttribute("title") || active.getAttribute("alt") || "");
                caption.textContent = text;
            }
        }

        var prev = frame.querySelector(".carousel-btn--prev");
        var next = frame.querySelector(".carousel-btn--next");
        if (prev) prev.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); show(index - 1); });
        if (next) next.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); show(index + 1); });
        dots.forEach(function (dot, idx) {
            dot.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); show(idx); });
        });
        show(0);
    }

    // Spickzettel: per Hover (Maus) ODER per Tap/Enter (Touch, Tastatur) ausfahren.
    function initCheatSheetToggle(stage) {
        var frame = stage.querySelector(".polaroid-frame");
        if (!frame) return;
        var toggleBtn = stage.querySelector(".cheat-toggle");

        function toggle() {
            var open = stage.classList.toggle("is-open");
            frame.setAttribute("aria-expanded", open ? "true" : "false");
            if (toggleBtn) toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
        }

        frame.setAttribute("aria-expanded", "false");
        if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
        frame.addEventListener("click", function (e) {
            if (e.target.closest(".carousel-btn") || e.target.closest(".carousel-dots")) return;
            toggle();
        });
        frame.addEventListener("keydown", function (e) {
            if (e.target !== frame) return; // Buttons im Inneren regeln ihre eigene Enter/Space-Bedienung.
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle();
            }
        });
    }

    var savedTheme = "light";
    try { savedTheme = localStorage.getItem(THEME_KEY) || "light"; } catch (e) {}
    applyTheme(savedTheme);

    document.addEventListener("DOMContentLoaded", function () {
        var savedLang = "de";
        try { savedLang = localStorage.getItem(LANG_KEY) || "de"; } catch (e) {}
        applyLang(savedLang);

        document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
            btn.addEventListener("click", function () {
                applyTheme(btn.getAttribute("data-theme-toggle"));
            });
        });

        document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
            btn.addEventListener("click", function () {
                applyLang(btn.getAttribute("data-lang-toggle"));
            });
        });

        document.querySelectorAll(".polaroid-frame").forEach(initGallery);
        document.querySelectorAll(".gallery-item__stage").forEach(initCheatSheetToggle);
        
        // Initialize fullscreen image viewer
        initFullscreenViewer();

        // Initialize contact form (kontakt.html only, no-op elsewhere)
        initContactForm();

        // Initialize mobile hamburger navigation
        initMobileNav();

        // Initialize "Guides & Tutorials" nav dropdown (desktop hover panel / mobile accordion)
        initNavDropdowns();

        // guides.html: markiert in der Jumpnav, welche Kategorie gerade im Viewport ist
        initGuideJumpnav();
    });
    
    function initFullscreenViewer() {
        var overlay = document.getElementById("fullscreenOverlay");
        var closeBtn = document.getElementById("fullscreenClose");
        var prevBtn = document.getElementById("fullscreenPrev");
        var nextBtn = document.getElementById("fullscreenNext");
        var fullscreenImg = document.getElementById("fullscreenImage");
        var infoText = document.getElementById("fullscreenInfo");

        if (!overlay || !closeBtn || !fullscreenImg) return;

        var currentGallery = [];
        var currentIndex = 0;

        function getGalleryFor(img) {
            var frame = img.closest(".polaroid-frame");
            if (frame) {
                var frames = Array.from(frame.querySelectorAll("[data-slide]"));
                if (frames.length) return frames;
            }

            var single = img.closest(".single-polaroid");
            return single ? [img] : [img];
        }

        function updateFullscreenImage() {
            if (!currentGallery.length) return;

            var active = currentGallery[currentIndex] || currentGallery[0];
            if (!active) return;

            if (active.closest(".polaroid-frame")) {
                currentGallery.forEach(function (img, idx) {
                    img.classList.toggle("is-active", idx === currentIndex);
                });
                var frame = active.closest(".polaroid-frame");
                var dots = frame.querySelectorAll(".carousel-dots button");
                dots.forEach(function (dot, idx) {
                    dot.setAttribute("aria-current", idx === currentIndex ? "true" : "false");
                });
            }

            fullscreenImg.src = active.src;
            fullscreenImg.alt = active.alt || "";

            var parent = active.closest(".polaroid-frame") || active.closest(".single-polaroid");
            var figcaption = parent ? parent.querySelector("figcaption") : null;
            infoText.textContent = figcaption ? figcaption.textContent : (active.alt || "Image");

            var hasMultipleImages = currentGallery.length > 1;
            if (prevBtn) {
                if (hasMultipleImages) {
                    prevBtn.removeAttribute("hidden");
                    prevBtn.style.display = "";
                } else {
                    prevBtn.setAttribute("hidden", "hidden");
                    prevBtn.style.display = "";
                }
            }
            if (nextBtn) {
                if (hasMultipleImages) {
                    nextBtn.removeAttribute("hidden");
                    nextBtn.style.display = "";
                } else {
                    nextBtn.setAttribute("hidden", "hidden");
                    nextBtn.style.display = "";
                }
            }
        }

        function openFullscreen(img) {
            if (!img || !img.src) return;

            var frame = img.closest(".polaroid-frame");
            currentGallery = getGalleryFor(img);

            if (frame) {
                var activeSlide = frame.querySelector(".polaroid-frame__viewport img.is-active") || currentGallery[0];
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
        }

        function closeFullscreen() {
            if (currentGallery.length && currentGallery[currentIndex]) {
                currentGallery.forEach(function (img, idx) {
                    img.classList.toggle("is-active", idx === currentIndex);
                });

                var frame = currentGallery[currentIndex].closest(".polaroid-frame");
                if (frame) {
                    var dots = frame.querySelectorAll(".carousel-dots button");
                    dots.forEach(function (dot, idx) {
                        dot.setAttribute("aria-current", idx === currentIndex ? "true" : "false");
                    });
                }
            }

            overlay.classList.remove("is-active");
            overlay.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
        }

        document.querySelectorAll(".single-polaroid img, .polaroid-frame__viewport img").forEach(function (img) {
            img.style.cursor = "pointer";
            img.addEventListener("click", function (e) {
                e.stopPropagation();
                openFullscreen(this);
            });
        });

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

        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) {
                closeFullscreen();
            }
        });

        fullscreenImg.addEventListener("click", function (e) {
            e.stopPropagation();
        });

        document.addEventListener("keydown", function (e) {
            if (!overlay.classList.contains("is-active")) return;

            if (e.key === "Escape") {
                closeFullscreen();
                return;
            }

            if (e.key === "ArrowRight") {
                if (nextBtn) nextBtn.click();
            }

            if (e.key === "ArrowLeft") {
                if (prevBtn) prevBtn.click();
            }
        });
    }

    // Kontaktformular: läuft ganz normal auch ohne JavaScript (echtes POST an FormSubmit,
    // Redirect zurück auf ?sent=1). Mit JavaScript läuft die Übertragung per fetch im
    // Hintergrund, ohne dass die Seite verlassen wird.
    function initContactForm() {
        var form = document.getElementById("contactForm");
        var status = document.getElementById("contactFormStatus");

        function currentDict() {
            var lang = root.getAttribute("lang") || "de";
            var common = (window.J_KEEBS_I18N_COMMON && window.J_KEEBS_I18N_COMMON[lang]) || {};
            var page = (window.J_KEEBS_I18N && window.J_KEEBS_I18N[lang]) || {};
            return Object.assign({}, common, page);
        }

        if (status && window.location.search.indexOf("sent=1") !== -1) {
            var dictOnLoad = currentDict();
            status.textContent = dictOnLoad["c.form.success"] || "Danke! Deine Nachricht ist unterwegs.";
            status.className = "form-status form-status--success";
            try {
                var cleanUrl = window.location.pathname + window.location.hash;
                window.history.replaceState({}, "", cleanUrl);
            } catch (e) {}
        }

        if (!form) return;

        form.addEventListener("submit", function (e) {
            var honey = form.querySelector('[name="_honey"]');
            if (honey && honey.value) { e.preventDefault(); return; }

            e.preventDefault();
            var dict = currentDict();
            var submitBtn = form.querySelector('button[type="submit"]');

            if (submitBtn) submitBtn.disabled = true;
            if (status) {
                status.textContent = dict["c.form.sending"] || "Wird gesendet …";
                status.className = "form-status";
            }

            fetch(form.getAttribute("action"), {
                method: "POST",
                headers: { "Accept": "application/json" },
                body: new FormData(form)
            }).then(function (res) {
                if (!res.ok) throw new Error("bad response");
                form.reset();
                if (status) {
                    status.textContent = dict["c.form.success"] || "Danke! Deine Nachricht ist unterwegs.";
                    status.className = "form-status form-status--success";
                }
            }).catch(function () {
                if (status) {
                    status.textContent = dict["c.form.error"] || "Ups, das hat nicht geklappt. Schreib mir gerne direkt per E-Mail.";
                    status.className = "form-status form-status--error";
                }
            }).finally(function () {
                if (submitBtn) submitBtn.disabled = false;
            });
        });
    }

    // Mobile-Hauptnavigation: Hamburger-Button öffnet/schließt das Dropdown-Panel.
    // Auf Desktop-Breiten (>1180px) bleibt die Navigation ohnehin sichtbar (siehe CSS),
    // hier wird nur der mobile Ein-/Ausklapp-Zustand verwaltet.
    function initMobileNav() {
        var toggle = document.getElementById("navToggle");
        var nav = document.getElementById("siteNav");
        if (!toggle || !nav) return;

        function closeNav() {
            nav.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
            // Offene "Guides & Tutorials"-Akkordeons nicht hängen lassen,
            // falls das Menü geschlossen wird, während sie aufgeklappt sind.
            nav.querySelectorAll(".nav-dropdown.is-open").forEach(function (dropdown) {
                dropdown.classList.remove("is-open");
                var trigger = dropdown.querySelector(".nav-dropdown__trigger");
                if (trigger) trigger.setAttribute("aria-expanded", "false");
            });
        }

        function openNav() {
            nav.classList.add("is-open");
            toggle.setAttribute("aria-expanded", "true");
        }

        toggle.addEventListener("click", function (e) {
            e.stopPropagation();
            if (nav.classList.contains("is-open")) {
                closeNav();
            } else {
                openNav();
            }
        });

        nav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeNav);
        });

        document.addEventListener("click", function (e) {
            if (!nav.classList.contains("is-open")) return;
            if (e.target.closest("#siteNav") || e.target.closest("#navToggle")) return;
            closeNav();
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && nav.classList.contains("is-open")) {
                closeNav();
                toggle.focus();
            }
        });

        // Falls das Fenster über den Mobile-Breakpoint hinweg vergrößert wird (Desktop-Browser),
        // hängengebliebenen "offen"-Zustand zurücksetzen.
        var desktopQuery = window.matchMedia("(min-width: 1281px)");
        function handleBreakpointChange(e) {
            if (e.matches) closeNav();
        }
        if (desktopQuery.addEventListener) {
            desktopQuery.addEventListener("change", handleBreakpointChange);
        } else if (desktopQuery.addListener) {
            desktopQuery.addListener(handleBreakpointChange);
        }
    }

    // "Guides & Tutorials"-Dropdown: Klick zum Öffnen/Schließen (funktioniert
    // auf allen Geräten inkl. Touch), auf Desktop-Breiten ergänzt reines CSS
    // (:hover/:focus-within) die Klick-Bedienung als Komfort-Layer.
    function initNavDropdowns() {
        var desktopQuery = window.matchMedia("(min-width: 1281px)");

        document.querySelectorAll(".nav-dropdown").forEach(function (dropdown) {
            var trigger = dropdown.querySelector(".nav-dropdown__trigger");
            var panel = dropdown.querySelector(".nav-dropdown__panel");
            if (!trigger || !panel) return;

            // Auf Desktop-Breiten ist .nav-dropdown__panel position:fixed (siehe
            // style.css), damit es dem overflow-Clipping von .site-nav entkommt.
            // top/left gelten dann relativ zum Viewport statt relativ zu
            // .nav-dropdown, deshalb hier per getBoundingClientRect berechnet.
            // Auf Mobil-Breiten (Akkordeon, position:static) wird nichts gesetzt.
            function positionPanel() {
                if (!desktopQuery.matches) {
                    panel.style.top = "";
                    panel.style.left = "";
                    return;
                }
                var rect = trigger.getBoundingClientRect();
                panel.style.top = Math.round(rect.bottom + 8) + "px";
                panel.style.left = Math.round(rect.left) + "px";
            }

            function closeDropdown() {
                dropdown.classList.remove("is-open");
                trigger.setAttribute("aria-expanded", "false");
            }

            function openDropdown() {
                dropdown.classList.add("is-open");
                trigger.setAttribute("aria-expanded", "true");
                positionPanel();
            }

            trigger.addEventListener("click", function (e) {
                e.stopPropagation();
                if (dropdown.classList.contains("is-open")) {
                    closeDropdown();
                } else {
                    openDropdown();
                }
            });

            // :focus-within (Tab-Taste) oeffnet das Panel rein per CSS, ohne
            // openDropdown() zu durchlaufen - Position trotzdem berechnen,
            // sonst haengt das Panel beim ersten Tab-Fokus noch bei top/left:0.
            trigger.addEventListener("focus", positionPanel);

            panel.querySelectorAll("a").forEach(function (link) {
                link.addEventListener("click", closeDropdown);
            });

            document.addEventListener("click", function (e) {
                if (!dropdown.classList.contains("is-open")) return;
                if (e.target.closest(".nav-dropdown")) return;
                closeDropdown();
            });

            document.addEventListener("keydown", function (e) {
                if (e.key === "Escape" && dropdown.classList.contains("is-open")) {
                    closeDropdown();
                    trigger.focus();
                }
            });

            window.addEventListener("resize", function () {
                if (dropdown.classList.contains("is-open")) positionPanel();
            });
        });
    }

    // guides.html: markiert per IntersectionObserver, welche Kategorie
    // (Switches/Plates/Mods) gerade im Viewport ist - reine Komfortfunktion,
    // no-op auf allen anderen Seiten ohne .guide-jumpnav.
    function initGuideJumpnav() {
        var nav = document.querySelector(".guide-jumpnav");
        if (!nav || !("IntersectionObserver" in window)) return;

        var links = Array.from(nav.querySelectorAll("a[href^='#']"));
        var sections = links
            .map(function (link) { return document.getElementById(link.getAttribute("href").slice(1)); })
            .filter(Boolean);
        if (!sections.length) return;

        function setActive(id) {
            links.forEach(function (link) {
                var isActive = link.getAttribute("href") === "#" + id;
                link.setAttribute("aria-current", isActive ? "true" : "false");
            });
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

        sections.forEach(function (section) { observer.observe(section); });
    }
})();