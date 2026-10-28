/* Shared rendering logic used by build-static.mjs and build-embed.mjs.
   Takes the raw index.html source + the SITE config object and returns a
   fully baked HTML string: every {{token}} filled, every list rendered,
   every image resolved, CSS inlined, no dependency on JS running.
*/
import { readFileSync } from "node:fs";

export const esc = (s) =>
  String(s == null ? "" : s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
  );

export function loadSite() {
  const cfgText = readFileSync("assets/js/config.js", "utf8");
  const sandbox = {};
  new Function("window", cfgText)(sandbox);
  return sandbox.SITE;
}

export function renderSite(html, SITE, css, { stripAnimate = true } = {}) {
  const projectAlt = (p) => `${esc(p.name)} — ${esc(p.location)}`;
  const servicesHTML = (SITE.services || [])
    .map((s, i) => {
      const num = String(i + 1).padStart(2, "0");
      const thumb = s.image
        ? `<img class="service__thumb" src="${esc(s.image)}" alt="" loading="lazy">`
        : "";
      return `<li class="service" data-reveal-item><span class="service__num">${num}</span><div><h3 class="service__title">${esc(
        s.title
      )}</h3><p class="service__desc">${esc(
        s.desc
      )}</p></div><span class="service__arrow" aria-hidden="true">&rarr;</span>${thumb}</li>`;
    })
    .join("");

  const statsHTML = (SITE.about_stats || [])
    .map(
      (s) =>
        `<div class="about__stat"><div class="value">${esc(
          s.value
        )}</div><div class="label">${esc(s.label)}</div></div>`
    )
    .join("");

  const projectsHTML = (SITE.projects || [])
    .map(
      (p) =>
        `<article class="project" data-reveal-item><div class="project__frame"><img src="${esc(
          p.image
        )}" alt="${projectAlt(p)}" loading="lazy"></div><div class="project__caption"><div><div class="project__name">${esc(
          p.name
        )}</div><div class="project__loc">${esc(
          p.location
        )}</div></div><div class="project__type">${esc(p.type)}</div></div></article>`
    )
    .join("");

  const quotesHTML = (SITE.testimonials || [])
    .map(
      (t) =>
        `<blockquote class="quote" data-reveal-item><p class="quote__text">&ldquo;${esc(
          t.quote
        )}&rdquo;</p><div class="quote__attr">${esc(t.author)}${
          t.meta ? ` <span class="quote__meta">· ${esc(t.meta)}</span>` : ""
        }</div></blockquote>`
    )
    .join("");

  const faqsHTML = (SITE.faqs || [])
    .map(
      (f, i) =>
        `<details class="faq__item" data-reveal-item${i === 0 ? " open" : ""}><summary class="faq__q">${esc(
          f.q
        )}<span class="faq__icon" aria-hidden="true"></span></summary><p class="faq__a">${esc(f.a)}</p></details>`
    )
    .join("");

  const areas = String(SITE.areas_served || "").replace(/&/g, ",").split(",").map((a) => a.trim()).filter(Boolean);
  const schema = JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": ["LandscapingBusiness", "LocalBusiness"],
      "@id": (SITE.site_url || "") + "#business",
      name: SITE.company_name,
      url: SITE.site_url,
      telephone: "+1" + (SITE.phone_raw || ""),
      email: SITE.email,
      image: SITE.og_image,
      description: SITE.seo_description,
      foundingDate: "1996",
      priceRange: "$$",
      address: { "@type": "PostalAddress", streetAddress: SITE.address_line, addressLocality: "Round Rock", addressRegion: "TX", postalCode: "78664", addressCountry: "US" },
      geo: { "@type": "GeoCoordinates", latitude: SITE.geo_lat, longitude: SITE.geo_lng },
      areaServed: areas.map((a) => ({ "@type": "City", name: a + ", TX" })),
      openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "08:00", closes: "19:00" }],
      hasCredential: { "@type": "EducationalOccupationalCredential", credentialCategory: "license", name: "Texas Licensed Irrigator LI# 0016669", recognizedBy: { "@type": "Organization", name: "Texas Commission on Environmental Quality" } },
      sameAs: [SITE.facebook_url].filter(Boolean),
      hasOfferCatalog: { "@type": "OfferCatalog", name: "Landscaping and irrigation services", itemListElement: (SITE.services || []).map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.desc } })) },
    },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: (SITE.faqs || []).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ]);

  const selectHTML = [`<option value="">${esc((SITE.ui || {}).form_select || "Select a service…")}</option>`]
    .concat((SITE.services || []).map((s) => `<option value="${esc(s.title)}">${esc(s.title)}</option>`))
    .concat(`<option value="Other">${esc((SITE.ui || {}).form_other || "Something else")}</option>`)
    .join("");

  const socialsHTML = [
    SITE.facebook_url ? `<a href="${esc(SITE.facebook_url)}" target="_blank" rel="noopener">Facebook</a>` : "",
    SITE.instagram_url ? `<a href="${esc(SITE.instagram_url)}" target="_blank" rel="noopener">Instagram</a>` : "",
  ].join("");

  if (css != null) {
    html = html.replace(
      '<link rel="stylesheet" href="assets/css/styles.css" />',
      `<style>\n${css}\n</style>`
    );
  }

  if (stripAnimate) {
    html = html.replace('<header class="nav" data-nav data-animate>', '<header class="nav" data-nav>');
  }

  html = html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (m, key) =>
    SITE[key] != null ? String(SITE[key]) : m
  );

  html = html.replace(/<img([^>]*?)\sdata-img="([\w.]+)"([^>]*?)\s*\/?>/g, (m, pre, key, post) => {
    const src = SITE[key] ? ` src="${esc(SITE[key])}"` : "";
    const tail = post.trim() ? " " + post.trim() : "";
    return `<img${pre}${tail}${src}>`;
  });

  const inject = (attr, inner) => {
    const re = new RegExp(`(<[^>]*\\b${attr}\\b[^>]*>)([\\s\\S]*?)(</(?:ul|div|select)>)`);
    html = html.replace(re, (m, open, _mid, close) => `${open}${inner}${close}`);
  };
  inject("data-services", servicesHTML);
  inject("data-stats", statsHTML);
  inject("data-projects", projectsHTML);
  inject("data-quotes", quotesHTML);
  inject("data-service-select", selectHTML);
  inject("data-faqs", faqsHTML);
  html = html.replace(/(<script type="application\/ld\+json" data-schema>)([\s\S]*?)(<\/script>)/, (m, o, _x, c) => `${o}${schema}${c}`);

  html = html.replace(/(<span data-year>)(<\/span>)/, `$1${new Date().getFullYear()}$2`);
  html = html.replace(/(<span data-socials>)(<\/span>)/, `$1${socialsHTML}$2`);

  return html;
}
