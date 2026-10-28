# Beautiful Landscapes & Irrigation — build notes

Client: Beautiful Landscapes & Irrigation, 2910 Red Bud Ln, Round Rock, TX 78664 · (512) 743-5850
Built on `ghl-landscaper-template`. Everything client-specific is in `assets/js/config.js`.

## What was added to the template for this client

| Area | Change | Where |
|---|---|---|
| SEO | Real `<title>`/meta description, canonical, Open Graph, geo tags, hero image preload | `index.html` head, tokens in `config.js` |
| Schema | `LandscapingBusiness` + `FAQPage` JSON-LD (license, hours, 7 service areas, service catalog) | `main.js` → `renderSchema`, `lib-render.mjs` |
| Languages | EN/ES toggle in nav + mobile menu. Spanish lives in `SITE.es`; `?lang=es` or `#es` opens in Spanish; choice is remembered | `config.js`, `main.js` |
| FAQ | New section + accordion, driven by `SITE.faqs` | `index.html`, `main.js`, `lib-render.mjs`, `styles.css` |
| Mobile | Sticky "Call now" bar under 900px (the template hid the phone CTA on mobile). Hero padded so it stays clear | `styles.css` |
| Form | Hidden `language` field so GHL knows whether to reply in English or Spanish | `index.html`, `main.js` |
| Trust | License line in hero and footer; "since 1996 / LI# / 24-7 / woman-owned" stats | `config.js` |

Build outputs regenerate with `npm run build` (static, embed, inlined — same as before).

## CONFIRM with Esther before launch

1. **Email.** Old site says `info@beautifullandscapes.com` (that's a different domain from the website). Facebook says `beautiful.esther@yahoo.com`. Config uses the yahoo one. Pick one and use it everywhere.
2. **Street address.** `2910 Red Bud Ln` is public on Facebook and every directory, but the old site only shows city/ZIP. If she prefers city-only (home-based business), blank out `address_line` and set `addressLocality` only in schema.
3. **Hours.** Site says Mon–Sat 8–7; some directories say 9–5. Config uses 8–7. Fix the directories to match.
4. **Second phone.** Alignable lists 512-373-0170. Only 743-5850 is on the site. Confirm which is primary and retire the other from listings.
5. **Services to cut or add.** Facebook/Alignable also mention junk removal, seamless gutters, and roofing. Left out as off-brand for SEO; add to `services[]` (and `es.services[]`) if she wants them.
6. **Name/role of the designer.** Copy says "owner Esther Ortiz is a TCEQ licensed irrigator" (from her LinkedIn). Confirm.
7. **GHL webhook.** `ghl_webhook_url` is empty (demo mode). Paste the client's Inbound Webhook URL. Map the new `language` field so auto-replies go out in the right language.

## Images

All image URLs currently point at the old WordPress site (`beautifullandscapesatx.com/wp-content/uploads/...`). They're the client's own photos, so this is fine for staging, but **download them into `assets/img/` and update the paths before the old site is taken down**, or they'll 404. Shot list worth asking for: one photo per gallery on the old site (Flagstone Patio, Walkway, Cement & New Turf, Plants & Trees, Flower Beds, Xeriscaping), the before/after pair, and a photo of Esther/the crew for the About section.

## Local SEO follow-ups (outside this repo)

- Google Business Profile: same name, address, phone, hours, and website as `config.js`. Add all 8 services as GBP services. Primary category "Landscaper", secondary "Lawn sprinkler system contractor".
- Point `beautifullandscapesatx.com` (or the GHL domain) at this page; the canonical in config assumes the existing domain.
- 301 the old WordPress URLs (`/services/irrigation-and-drainage/`, etc.) to the matching anchors (`/#services`).
- Next phase for rankings: one page per service and per city (sprinkler repair Round Rock, French drain installation Austin, etc.). This single-page build is the hub; those become spokes.
