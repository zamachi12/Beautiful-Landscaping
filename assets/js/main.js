/* =============================================================================
   main.js — templating, dynamic rendering, EN/ES language switch, GSAP motion,
   GHL form submit, structured data
   ========================================================================== */
(function () {
  "use strict";

  var SITE = window.SITE || {};
  var LANG = "en";

  /* ---------------------------------------------------------------------------
     0) LANGUAGE — merge SITE with SITE.es overrides.
        Lists (services, projects…) in SITE.es may omit `image` fields; those
        are copied over from the English entry at the same index.
  --------------------------------------------------------------------------- */
  function data() {
    if (LANG !== "es" || !SITE.es) return SITE;
    var D = {};
    Object.keys(SITE).forEach(function (k) { D[k] = SITE[k]; });
    Object.keys(SITE.es).forEach(function (k) {
      var v = SITE.es[k];
      if (Array.isArray(v) && Array.isArray(SITE[k])) {
        D[k] = v.map(function (item, i) {
          var base = SITE[k][i] || {}, out = {};
          Object.keys(base).forEach(function (f) { out[f] = base[f]; });
          Object.keys(item).forEach(function (f) { out[f] = item[f]; });
          return out;
        });
      } else if (k === "ui") {
        D.ui = {};
        Object.keys(SITE.ui || {}).forEach(function (f) { D.ui[f] = SITE.ui[f]; });
        Object.keys(v).forEach(function (f) { D.ui[f] = v[f]; });
      } else {
        D[k] = v;
      }
    });
    return D;
  }
  function ui(key) { var D = data(); return (D.ui && D.ui[key] != null) ? D.ui[key] : ((SITE.ui || {})[key] || ""); }

  function detectLang() {
    try {
      var h = (window.location.hash || "").replace("#", "");
      if (h === "es" || h === "en") return h;
      var q = new URLSearchParams(window.location.search).get("lang");
      if (q === "es" || q === "en") return q;
      var saved = window.localStorage.getItem("bl_lang");
      if (saved === "es" || saved === "en") return saved;
      if (/^es\b/i.test(navigator.language || "")) return "es";
    } catch (e) {}
    return "en";
  }

  /* ---------------------------------------------------------------------------
     1) TEMPLATING — replace {{token}} in the DOM with values from SITE.
  --------------------------------------------------------------------------- */
  function fillTokens(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var nodes = [], n;
    while ((n = walker.nextNode())) { if (n.nodeValue.indexOf("{{") !== -1) nodes.push(n); }
    nodes.forEach(function (node) {
      node.nodeValue = node.nodeValue.replace(/\{\{\s*([\w.]+)\s*\}\}/g, function (m, key) {
        return (SITE[key] != null) ? String(SITE[key]) : m;
      });
    });
    var all = root.querySelectorAll("*");
    all.forEach(function (el) {
      ["href", "src", "content", "alt"].forEach(function (attr) {
        var v = el.getAttribute && el.getAttribute(attr);
        if (v && v.indexOf("{{") !== -1) {
          el.setAttribute(attr, v.replace(/\{\{\s*([\w.]+)\s*\}\}/g, function (m, key) {
            return (SITE[key] != null) ? String(SITE[key]) : m;
          }));
        }
      });
    });
  }

  /* ---------------------------------------------------------------------------
     2) RENDER LISTS + language-dependent text
  --------------------------------------------------------------------------- */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function renderServices(D) {
    var el = document.querySelector("[data-services]");
    if (!el || !D.services) return;
    el.innerHTML = D.services.map(function (s, i) {
      var num = String(i + 1).padStart(2, "0");
      var thumb = s.image ? '<img class="service__thumb" src="' + esc(s.image) + '" alt="" loading="lazy">' : "";
      return '<li class="service" data-reveal-item>' +
        '<span class="service__num">' + num + '</span>' +
        '<div><h3 class="service__title">' + esc(s.title) + '</h3>' +
        '<p class="service__desc">' + esc(s.desc) + '</p></div>' +
        '<span class="service__arrow" aria-hidden="true">&rarr;</span>' +
        thumb + '</li>';
    }).join("");
  }

  function renderStats(D) {
    var el = document.querySelector("[data-stats]");
    if (!el || !D.about_stats) return;
    el.innerHTML = D.about_stats.map(function (s) {
      return '<div class="about__stat"><div class="value">' + esc(s.value) +
        '</div><div class="label">' + esc(s.label) + '</div></div>';
    }).join("");
  }

  function renderProjects(D) {
    var el = document.querySelector("[data-projects]");
    if (!el || !D.projects) return;
    el.innerHTML = D.projects.map(function (p) {
      return '<article class="project" data-reveal-item>' +
        '<div class="project__frame"><img src="' + esc(p.image) + '" alt="' + esc(p.name) + ' — ' + esc(p.location) + '" loading="lazy"></div>' +
        '<div class="project__caption"><div>' +
        '<div class="project__name">' + esc(p.name) + '</div>' +
        '<div class="project__loc">' + esc(p.location) + '</div></div>' +
        '<div class="project__type">' + esc(p.type) + '</div></div></article>';
    }).join("");
  }

  function renderQuotes(D) {
    var el = document.querySelector("[data-quotes]");
    if (!el || !D.testimonials) return;
    el.innerHTML = D.testimonials.map(function (t) {
      return '<blockquote class="quote" data-reveal-item>' +
        '<p class="quote__text">&ldquo;' + esc(t.quote) + '&rdquo;</p>' +
        '<div class="quote__attr">' + esc(t.author) +
        (t.meta ? ' <span class="quote__meta">· ' + esc(t.meta) + '</span>' : "") +
        '</div></blockquote>';
    }).join("");
  }

  function renderFaqs(D) {
    var el = document.querySelector("[data-faqs]");
    if (!el || !D.faqs) return;
    el.innerHTML = D.faqs.map(function (f, i) {
      return '<details class="faq__item" data-reveal-item' + (i === 0 ? " open" : "") + '>' +
        '<summary class="faq__q">' + esc(f.q) + '<span class="faq__icon" aria-hidden="true"></span></summary>' +
        '<p class="faq__a">' + esc(f.a) + '</p></details>';
    }).join("");
  }

  function renderServiceSelect(D) {
    var el = document.querySelector("[data-service-select]");
    if (!el) return;
    var opts = ['<option value="">' + esc(ui("form_select")) + '</option>'];
    (D.services || []).forEach(function (s) { opts.push('<option value="' + esc(s.title) + '">' + esc(s.title) + '</option>'); });
    opts.push('<option value="Other">' + esc(ui("form_other")) + '</option>');
    el.innerHTML = opts.join("");
  }

  function renderText(D) {
    document.querySelectorAll("[data-t]").forEach(function (el) {
      var key = el.getAttribute("data-t");
      if (D[key] != null) el.textContent = String(D[key]);
    });
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var v = ui(key);
      if (v) el.textContent = v;
    });
    document.querySelectorAll("[data-lang-toggle]").forEach(function (b) {
      b.setAttribute("aria-label", ui("lang_switch_label"));
    });
    document.querySelectorAll("[data-lang-field]").forEach(function (i) { i.value = LANG; });
    document.documentElement.setAttribute("lang", LANG);
    if (D.seo_title) document.title = D.seo_title;
    var md = document.querySelector('meta[name="description"]');
    if (md && D.seo_description) md.setAttribute("content", D.seo_description);
  }

  function renderMisc() {
    var y = document.querySelector("[data-year]");
    if (y) y.textContent = new Date().getFullYear();
    var soc = document.querySelector("[data-socials]");
    if (soc) {
      var links = [];
      if (SITE.facebook_url) links.push('<a href="' + esc(SITE.facebook_url) + '" target="_blank" rel="noopener">Facebook</a>');
      if (SITE.instagram_url) links.push('<a href="' + esc(SITE.instagram_url) + '" target="_blank" rel="noopener">Instagram</a>');
      soc.innerHTML = links.join("");
    }
  }

  /* ---------------------------------------------------------------------------
     2b) STRUCTURED DATA — LandscapingBusiness + FAQPage (JSON-LD)
  --------------------------------------------------------------------------- */
  function renderSchema(D) {
    var el = document.querySelector("[data-schema]");
    if (!el) return;
    var areas = String(D.areas_served || "").replace(/&/g, ",").split(",").map(function (a) { return a.trim(); }).filter(Boolean);
    var biz = {
      "@context": "https://schema.org",
      "@type": ["LandscapingBusiness", "LocalBusiness"],
      "@id": (D.site_url || "") + "#business",
      "name": D.company_name,
      "url": D.site_url,
      "telephone": "+1" + (D.phone_raw || ""),
      "email": D.email,
      "image": D.og_image,
      "description": D.seo_description,
      "foundingDate": "1996",
      "priceRange": "$$",
      "address": { "@type": "PostalAddress", "streetAddress": D.address_line, "addressLocality": "Round Rock", "addressRegion": "TX", "postalCode": "78664", "addressCountry": "US" },
      "geo": { "@type": "GeoCoordinates", "latitude": D.geo_lat, "longitude": D.geo_lng },
      "areaServed": areas.map(function (a) { return { "@type": "City", "name": a + ", TX" }; }),
      "openingHoursSpecification": [{ "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], "opens": "08:00", "closes": "19:00" }],
      "hasCredential": { "@type": "EducationalOccupationalCredential", "credentialCategory": "license", "name": "Texas Licensed Irrigator LI# 0016669", "recognizedBy": { "@type": "Organization", "name": "Texas Commission on Environmental Quality" } },
      "sameAs": [D.facebook_url].filter(Boolean),
      "hasOfferCatalog": { "@type": "OfferCatalog", "name": "Landscaping and irrigation services", "itemListElement": (D.services || []).map(function (s) {
        return { "@type": "Offer", "itemOffered": { "@type": "Service", "name": s.title, "description": s.desc } };
      }) }
    };
    var faq = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": (D.faqs || []).map(function (f) {
      return { "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } };
    }) };
    el.textContent = JSON.stringify([biz, faq]);
  }

  function renderAll() {
    var D = data();
    renderText(D);
    renderServices(D);
    renderStats(D);
    renderProjects(D);
    renderQuotes(D);
    renderFaqs(D);
    renderServiceSelect(D);
    renderSchema(D);
  }

  function setLang(lang) {
    LANG = lang === "es" ? "es" : "en";
    try { window.localStorage.setItem("bl_lang", LANG); } catch (e) {}
    renderAll();
  }

  function initLang() {
    document.querySelectorAll("[data-lang-toggle]").forEach(function (b) {
      b.addEventListener("click", function () { setLang(LANG === "es" ? "en" : "es"); });
    });
  }

  /* ---------------------------------------------------------------------------
     3) NAV — scrolled state + mobile menu
  --------------------------------------------------------------------------- */
  function initNav() {
    var nav = document.querySelector("[data-nav]");
    var toggle = document.querySelector("[data-menu-toggle]");
    var menu = document.querySelector("[data-menu]");

    function onScroll() { if (nav) nav.classList.toggle("is-scrolled", window.scrollY > window.innerHeight * 0.7); }
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

    function closeMenu() { if (!menu) return; menu.hidden = true; toggle.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; }
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var open = menu.hidden;
        menu.hidden = !open; toggle.setAttribute("aria-expanded", String(open));
        document.body.style.overflow = open ? "hidden" : "";
      });
      menu.querySelectorAll("[data-menu-link]").forEach(function (a) { a.addEventListener("click", closeMenu); });
    }
  }

  /* ---------------------------------------------------------------------------
     4) GHL LEAD FORM submit
  --------------------------------------------------------------------------- */
  function initForm() {
    var form = document.querySelector("[data-lead-form]");
    if (!form) return;
    var status = form.querySelector("[data-form-status]");
    var submit = form.querySelector("[data-submit]");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.classList.remove("is-error");

      var d = {};
      new FormData(form).forEach(function (v, k) { d[k] = v; });
      d.source = "Website — " + (SITE.company_name || "");
      d.page_url = window.location.href;
      d.language = LANG;

      if (!d.full_name || !d.phone) {
        status.textContent = ui("form_need");
        status.classList.add("is-error");
        return;
      }

      var url = SITE.ghl_webhook_url;
      if (!url) {
        console.log("[Lead captured — demo mode] Paste a GHL webhook URL into config.js:", d);
        status.textContent = ui("form_demo");
        form.reset();
        return;
      }

      submit.disabled = true;
      status.textContent = ui("form_sending");
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d)
      }).then(function (r) {
        if (!r.ok) throw new Error("Request failed");
        status.textContent = ui("form_thanks");
        form.reset();
      }).catch(function () {
        status.textContent = ui("form_error") + " " + (SITE.phone_display || "") + ".";
        status.classList.add("is-error");
      }).finally(function () { submit.disabled = false; });
    });
  }

  /* ---------------------------------------------------------------------------
     5) GSAP MOTION — gated behind matchMedia + reduced-motion
  --------------------------------------------------------------------------- */
  function initMotion() {
    if (!window.gsap) return;
    var navEl = document.querySelector("[data-nav]");
    if (!navEl || !navEl.hasAttribute("data-animate")) return;
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    var mm = gsap.matchMedia();

    mm.add(
      { motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)" },
      function (ctx) {
        var reduced = ctx.conditions.reduced;
        if (reduced) {
          gsap.set("[data-reveal], [data-reveal-item], .hero__title, [data-hero-title]", { clearProps: "all", opacity: 1, y: 0 });
          return;
        }

        gsap.defaults({ ease: "power3.out" });

        var heroTitle = document.querySelector("[data-hero-title]");
        var tl = gsap.timeline({ delay: 0.15 });
        if (heroTitle) {
          gsap.set(heroTitle, { opacity: 1 });
          tl.from(heroTitle, { yPercent: 30, autoAlpha: 0, duration: 1.1, ease: "expo.out" });
        }
        tl.from(".hero .eyebrow, .hero__sub, .hero__actions, .hero__trust", { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.12 }, "-=0.7");
        tl.from(".hero__cue", { autoAlpha: 0, duration: 0.8 }, "-=0.4");

        gsap.to(".hero__bg img", {
          yPercent: 12, ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
        });

        gsap.utils.toArray("[data-reveal]").forEach(function (el) {
          gsap.from(el, {
            y: 40, autoAlpha: 0, duration: 1,
            scrollTrigger: { trigger: el, start: "top 85%" }
          });
        });

        [".services", ".projects", ".quotes", ".faq__list"].forEach(function (sel) {
          var wrap = document.querySelector(sel);
          if (!wrap) return;
          var items = wrap.querySelectorAll("[data-reveal-item]");
          if (!items.length) return;
          gsap.from(items, {
            y: 48, autoAlpha: 0, duration: 0.9, stagger: 0.12,
            scrollTrigger: { trigger: wrap, start: "top 80%" }
          });
        });

        var aboutImg = document.querySelector(".about__media img");
        if (aboutImg) {
          gsap.fromTo(aboutImg, { yPercent: -6 }, {
            yPercent: 6, ease: "none",
            scrollTrigger: { trigger: ".about__media", start: "top bottom", end: "bottom top", scrub: true }
          });
        }

        return function () {};
      }
    );
  }

  /* ---------------------------------------------------------------------------
     BOOT
  --------------------------------------------------------------------------- */
  function resolveImages() {
    document.querySelectorAll("[data-img]").forEach(function (el) {
      var key = el.getAttribute("data-img");
      if (SITE[key]) el.src = SITE[key];
    });
  }

  function boot() {
    LANG = detectLang();
    fillTokens(document.documentElement);
    resolveImages();
    renderAll();
    renderMisc();
    initLang();
    initNav();
    initForm();

    if (document.hidden) {
      document.addEventListener("visibilitychange", function onVis() {
        if (!document.hidden) {
          document.removeEventListener("visibilitychange", onVis);
          requestAnimationFrame(initMotion);
        }
      });
    } else {
      requestAnimationFrame(initMotion);
    }

    setTimeout(function () {
      var t = document.querySelector(".hero__title");
      if (window.gsap && t && parseFloat(getComputedStyle(t).opacity) === 0) {
        gsap.set(
          [".hero__title", ".hero .eyebrow", ".hero__sub", ".hero__actions", ".hero__trust", ".hero__cue", "[data-reveal]", "[data-reveal-item]"],
          { autoAlpha: 1, y: 0, yPercent: 0, clearProps: "transform" }
        );
      }
    }, 3000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
