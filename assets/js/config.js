/* =============================================================================
   SITE CONFIG  —  THE ONLY FILE YOU EDIT PER CLIENT
   -----------------------------------------------------------------------------
   Client: Beautiful Landscapes & Irrigation  (Round Rock, TX — Austin metro)
   Source material: beautifullandscapesatx.com, the business Facebook page,
   Alignable / directory listings. Items marked CONFIRM need a yes from Esther
   before launch — see PROJECT-NOTES.md.

   Every value below fills a {{token}} in index.html. Token names match
   GoHighLevel Custom Value names 1:1 (see GHL-INTEGRATION.md).

   LANGUAGES: everything in SITE is English. SITE.es holds Spanish overrides —
   any key present there replaces the English one when the visitor picks ES.
   Keys that are the same in both languages (phone, images, URLs) live only
   in the English block.
   ========================================================================== */

window.SITE = {
  // --- Brand / identity -----------------------------------------------------
  company_name: "Beautiful Landscapes & Irrigation",   // {{custom_values.company_name}}
  company_short: "Beautiful Landscapes",               // {{custom_values.company_short}}
  tagline: "Landscaping and irrigation in Round Rock and the Austin metro since 1996. TCEQ licensed irrigator LI# 0016669.",
  founded_note: "Serving Central Texas since 1996",
  license_display: "TCEQ Licensed Irrigator LI# 0016669",

  // --- SEO ------------------------------------------------------------------
  // Keep seo_title under ~60 characters and seo_description under ~155.
  seo_title: "Landscaping & Irrigation in Round Rock & Austin, TX | Beautiful Landscapes",
  seo_description: "Licensed landscaping and irrigation company serving Round Rock, Austin, Cedar Park, Leander and Pflugerville since 1996. Sprinkler repair, drainage, hardscaping, tree work. Free estimates.",
  site_url: "https://beautifullandscapesatx.com/",     // canonical — update if the domain changes
  og_image: "https://beautifullandscapesatx.com/wp-content/uploads/2024/04/esther-phone-pic-3977-scaled.jpg",
  geo_region: "US-TX",
  geo_placename: "Round Rock, Texas",
  geo_lat: "30.5083",
  geo_lng: "-97.6789",

  // --- Contact --------------------------------------------------------------
  phone_display: "(512) 743-5850",
  phone_raw: "5127435850",
  email: "beautiful.esther@yahoo.com",                 // CONFIRM — the old site shows info@beautifullandscapes.com, which is a different domain
  address_line: "2910 Red Bud Ln",                     // CONFIRM — listed on Facebook & directories; old site shows city/ZIP only
  address_city: "Round Rock, TX 78664",
  areas_served: "Round Rock, Austin, Cedar Park, Leander, Pflugerville, Georgetown & Hutto",
  hours: "Mon–Sat 8:00 AM – 7:00 PM · Sun by emergency appointment",
  emergency_line: "24/7 emergency sprinkler repair",

  // --- Social (leave "" to hide) -------------------------------------------
  facebook_url: "https://www.facebook.com/p/Beautiful-Landscapes-Irrigation-16669-100041829050212/",
  instagram_url: "",
  financing_url: "https://www.lightstream.com/landscape-financing",

  // --- Hero -----------------------------------------------------------------
  hero_eyebrow: "Landscaping & irrigation · Round Rock, TX",
  hero_headline: "Your landscape,\nthe way you imagine it.",
  hero_sub: "Design, installation, irrigation and drainage for homes and businesses across the Austin metro. One designer sees your project through from the first walk-through to the last plant in the ground.",
  hero_cta: "Get a free estimate",
  hero_cta_secondary: "See our services",
  hero_image: "https://beautifullandscapesatx.com/wp-content/uploads/2024/04/esther-phone-pic-3977-scaled.jpg", // client's own photo (see PROJECT-NOTES.md to self-host)

  // --- Services -------------------------------------------------------------
  // Descriptions deliberately name the sub-services people search for
  // (French drains, flagstone, sprinkler repair, Zoysia…) — that's the SEO.
  services: [
    {
      title: "Irrigation & sprinkler systems",
      desc: "New sprinkler system design and installation, head and valve replacement, controller upgrades, and 24/7 emergency repair. Every system is designed by a TCEQ licensed irrigator for full coverage with less water.",
      image: "https://beautifullandscapesatx.com/wp-content/uploads/2024/07/OIP.jpg"
    },
    {
      title: "Drainage solutions",
      desc: "French drains, catch basins, surface drains and rain gardens that move water away from your foundation and stop standing water in the yard after Central Texas storms.",
      image: "https://beautifullandscapesatx.com/wp-content/uploads/2024/04/esther-phone-pic-4457-scaled.jpg"
    },
    {
      title: "Landscape design & installation",
      desc: "Flower beds, raised beds, native and xeriscape plantings, mulch, river rock and sod — including drought-tolerant Zoysia and Bermuda that hold up through an Austin summer. Virtual design consultations available.",
      image: "https://beautifullandscapesatx.com/wp-content/uploads/2024/04/esther-phone-pic-5587-scaled.jpg"
    },
    {
      title: "Stone & hardscaping",
      desc: "Flagstone patios and walkways, limestone retaining walls, borders and decomposed granite paths built from Texas native stone to cut water use and last for decades.",
      image: "https://beautifullandscapesatx.com/wp-content/uploads/2024/04/esther-phone-pics-632-scaled.jpg"
    },
    {
      title: "Tree trimming & removal",
      desc: "Oak trimming and sealing, canopy lifts, storm-damage cleanup and safe removal of sick, leaning or foundation-threatening trees. Removal is always the last resort.",
      image: "https://beautifullandscapesatx.com/wp-content/uploads/2024/05/freshly-pruned-conifer-tree-in-a-beautiful-garden-gardening-and-art-picture-id1189385655.jpg"
    },
    {
      title: "Landscape lighting",
      desc: "Low-voltage path, accent and security lighting designed by an FX Luminaire certified designer so you can use your outdoor space after dark.",
      image: "https://beautifullandscapesatx.com/wp-content/uploads/2024/04/esther-phone-pic-4546-scaled.jpg"
    },
    {
      title: "Artificial turf",
      desc: "Pet-friendly, water-free turf for play areas, side yards and problem lawns that never recover from the heat.",
      image: "https://beautifullandscapesatx.com/wp-content/uploads/2024/05/easy_landscaping_hardscapes.webp"
    },
    {
      title: "Maintenance plans & lawn repair",
      desc: "Scheduled visits on the same day each week, seasonal cleanups, bed refreshes and lawn patching for bare spots. Take your weekends back.",
      image: "https://beautifullandscapesatx.com/wp-content/uploads/2024/05/esther-phone-pic-5871-scaled.jpg"
    }
  ],

  // --- About ----------------------------------------------------------------
  about_statement: "One designer, start to finish. No hand-offs, no guessing who to call.",
  about_body: "Beautiful Landscapes is a woman-owned landscaping and irrigation company founded in Round Rock in 1996. Owner Esther Ortiz is a TCEQ licensed irrigator, and the same designer who walks your property is the one who manages the crew and answers your calls until the job is done. We work on homes, apartment communities and commercial properties across the Austin metro, with free consultations, written estimates and a warranty on our work.",
  about_stats: [
    { value: "1996", label: "Serving Central Texas since" },
    { value: "LI# 0016669", label: "TCEQ licensed irrigator" },
    { value: "24/7", label: "Emergency sprinkler repair" },
    { value: "Woman-owned", label: "Texas HUB certified" }
  ],
  about_image: "https://beautifullandscapesatx.com/wp-content/uploads/2024/05/esther-phone-pic-5507-scaled-e1715000251378.jpg",

  // --- Projects -------------------------------------------------------------
  // Names come from the galleries on the old site. Swap images for the matching
  // gallery photos (see PROJECT-NOTES.md).
  projects: [
    { name: "Flagstone patio", type: "Hardscaping", location: "Round Rock, TX", image: "https://beautifullandscapesatx.com/wp-content/uploads/2024/04/esther-phone-pics-632-scaled.jpg" },
    { name: "New turf and concrete", type: "Lawn & hardscape", location: "Cedar Park, TX", image: "https://beautifullandscapesatx.com/wp-content/uploads/2024/05/esther-phone-pic-5871-scaled.jpg" },
    { name: "Xeriscape front yard", type: "Design & install", location: "Austin, TX", image: "https://beautifullandscapesatx.com/wp-content/uploads/2024/04/esther-phone-pic-4546-scaled.jpg" },
    { name: "Flower beds and plantings", type: "Planting", location: "Leander, TX", image: "https://beautifullandscapesatx.com/wp-content/uploads/2024/04/esther-phone-pic-5587-scaled.jpg" },
    { name: "Flagstone walkway", type: "Hardscaping", location: "Pflugerville, TX", image: "https://beautifullandscapesatx.com/wp-content/uploads/2024/05/hardscape4.jpg" },
    { name: "Before and after: full yard makeover", type: "Design & install", location: "Round Rock, TX", image: "https://beautifullandscapesatx.com/wp-content/uploads/2024/04/esther-phone-pic-4457-scaled.jpg" }
  ],

  // --- Testimonials (real, from the client's current site) ------------------
  testimonials: [
    { quote: "My property was in desperate need of a makeover, and Beautiful Landscapes truly exceeded my expectations. Their team listened attentively to my vision and offered valuable insights to enhance it. Every aspect of the landscaping and irrigation installation was executed flawlessly.", author: "Kathy L.", meta: "Round Rock, TX" },
    { quote: "They do tree removal also. We liked them because all the employees are hard working, honest and reliable. I have used them on several occasions and they always come on time, and the prices are great too.", author: "Carmen M.", meta: "Leander, TX" },
    { quote: "The entire process was smooth and hassle-free thanks to the efficient communication and project management of the team. They completed the project within the agreed-upon timeline and budget.", author: "David & Jennifer", meta: "Cedar Park, TX" },
    { quote: "We wholeheartedly recommend Beautiful Landscapes to anyone seeking professional landscaping and irrigation services. Thank you for turning our outdoor space into a stunning masterpiece.", author: "Bob & Kate", meta: "Austin, TX" }
  ],

  // --- FAQ (renders on page + FAQPage schema for Google) --------------------
  faqs: [
    { q: "Are you licensed and insured?", a: "Yes. Beautiful Landscapes is fully insured, and our irrigation work is done under Texas irrigator license LI# 0016669, issued by the TCEQ, which regulates irrigation in Texas." },
    { q: "Which areas do you serve?", a: "Round Rock, Austin, Cedar Park, Leander, Pflugerville, Georgetown, Hutto and the surrounding Austin metro." },
    { q: "Do you offer emergency sprinkler repair?", a: "Yes. Call (512) 743-5850 any time, day or night. Emergency projects can also be scheduled on Sundays for an additional fee." },
    { q: "Is the consultation free?", a: "Yes. Consultations and written estimates are free, and we offer transparent pricing with no surprises." },
    { q: "What deposit do you require?", a: "Projects typically start with a 50% deposit, with the balance due on completion. Financing is available through LightStream." },
    { q: "Do you offer maintenance plans?", a: "Yes. We offer tailored maintenance plans with visits scheduled on the same day and time each week, so your landscape looks its best year-round." },
    { q: "Do you warranty your work?", a: "Yes. We stand behind our workmanship and provide a warranty so you have peace of mind long after the project is finished." }
  ],

  // --- Contact --------------------------------------------------------------
  contact_headline: "Let's talk about your yard.",
  contact_sub: "Tell us what you need and we'll get back to you with a free estimate, usually the same day.",

  // --- UI strings (nav, buttons, form) --------------------------------------
  ui: {
    nav_services: "Services", nav_about: "About", nav_projects: "Projects",
    nav_testimonials: "Reviews", nav_faq: "FAQ", nav_contact: "Contact",
    nav_financing: "Financing",
    lang_switch: "ES", lang_switch_label: "Ver en español",
    scroll: "Scroll",
    services_eyebrow: "Services", services_title: "What we do",
    about_eyebrow: "About",
    projects_eyebrow: "Projects", projects_title: "Recent work",
    testimonials_eyebrow: "What clients say",
    faq_eyebrow: "FAQ", faq_title: "Questions we hear a lot",
    contact_eyebrow: "Contact",
    label_call: "Call", label_email: "Email", label_visit: "Visit", label_serving: "Serving", label_hours: "Hours",
    form_name: "Name", form_phone: "Phone", form_email: "Email",
    form_service: "Service needed", form_message: "Project details",
    form_select: "Select a service…", form_other: "Something else",
    form_submit: "Request my free estimate",
    form_need: "Please add your name and phone.",
    form_sending: "Sending…",
    form_thanks: "Thanks! We'll be in touch shortly.",
    form_error: "Something went wrong — please call",
    form_demo: "Thanks! (Demo mode — connect your GHL webhook to receive this lead.)",
    mobile_call: "Call now",
    mobile_emergency: "24/7 sprinkler repair"
  },

  // --- Spanish overrides ----------------------------------------------------
  es: {
    tagline: "Jardinería e irrigación en Round Rock y el área metropolitana de Austin desde 1996. Irrigador con licencia TCEQ LI# 0016669.",
    founded_note: "Sirviendo al centro de Texas desde 1996",
    license_display: "Irrigador con licencia TCEQ LI# 0016669",
    seo_title: "Jardinería e Irrigación en Round Rock y Austin, TX | Beautiful Landscapes",
    seo_description: "Empresa de jardinería e irrigación con licencia que sirve Round Rock, Austin, Cedar Park, Leander y Pflugerville desde 1996. Reparación de aspersores, drenaje, piedra, árboles. Presupuestos gratis.",
    areas_served: "Round Rock, Austin, Cedar Park, Leander, Pflugerville, Georgetown y Hutto",
    hours: "Lun–Sáb 8:00 AM – 7:00 PM · Dom solo emergencias",
    emergency_line: "Reparación de aspersores de emergencia 24/7",
    hero_eyebrow: "Jardinería e irrigación · Round Rock, TX",
    hero_headline: "Su jardín,\ntal como lo imagina.",
    hero_sub: "Diseño, instalación, irrigación y drenaje para casas y negocios en toda el área de Austin. Un solo diseñador acompaña su proyecto desde la primera visita hasta la última planta.",
    hero_cta: "Pida un presupuesto gratis",
    hero_cta_secondary: "Ver servicios",
    services: [
      { title: "Irrigación y sistemas de aspersores", desc: "Diseño e instalación de sistemas nuevos, reemplazo de cabezales y válvulas, controladores modernos y reparación de emergencia 24/7. Cada sistema lo diseña un irrigador con licencia TCEQ para cubrir todo el jardín con menos agua." },
      { title: "Soluciones de drenaje", desc: "Drenajes franceses, cajas de captación, drenajes de superficie y jardines de lluvia que alejan el agua de los cimientos y evitan los charcos después de las tormentas." },
      { title: "Diseño e instalación de jardines", desc: "Macizos de flores, camas elevadas, plantas nativas y xeriscape, mulch, piedra de río y césped resistente a la sequía como Zoysia y Bermuda. Consultas virtuales disponibles." },
      { title: "Piedra y hardscaping", desc: "Patios y caminos de flagstone, muros de contención de piedra caliza, bordes y senderos de granito descompuesto, con piedra nativa de Texas que dura décadas." },
      { title: "Poda y remoción de árboles", desc: "Poda y sellado de robles, limpieza por tormentas y remoción segura de árboles enfermos, inclinados o que amenazan los cimientos. La remoción siempre es el último recurso." },
      { title: "Iluminación de jardín", desc: "Iluminación de bajo voltaje para caminos, acentos y seguridad, diseñada por un diseñador certificado FX Luminaire para disfrutar su patio de noche." },
      { title: "Césped artificial", desc: "Césped sin agua y apto para mascotas, ideal para áreas de juego, patios laterales y zonas donde el pasto natural no sobrevive al calor." },
      { title: "Mantenimiento y reparación de césped", desc: "Visitas programadas el mismo día cada semana, limpiezas de temporada, renovación de macizos y parcheo de zonas secas. Recupere sus fines de semana." }
    ],
    about_statement: "Un solo diseñador, de principio a fin. Sin intermediarios ni dudas sobre a quién llamar.",
    about_body: "Beautiful Landscapes es una empresa de jardinería e irrigación propiedad de una mujer, fundada en Round Rock en 1996. La dueña, Esther Ortiz, es irrigadora con licencia TCEQ, y la misma diseñadora que visita su propiedad dirige la cuadrilla y atiende sus llamadas hasta terminar el trabajo. Trabajamos en casas, comunidades de apartamentos y propiedades comerciales en toda el área de Austin, con consultas gratis, presupuestos por escrito y garantía.",
    about_stats: [
      { value: "1996", label: "Sirviendo al centro de Texas desde" },
      { value: "LI# 0016669", label: "Irrigador con licencia TCEQ" },
      { value: "24/7", label: "Reparación de aspersores de emergencia" },
      { value: "Propiedad de mujer", label: "Certificación HUB de Texas" }
    ],
    projects: [
      { name: "Patio de flagstone", type: "Hardscaping", location: "Round Rock, TX" },
      { name: "Césped nuevo y concreto", type: "Césped y hardscape", location: "Cedar Park, TX" },
      { name: "Jardín frontal xeriscape", type: "Diseño e instalación", location: "Austin, TX" },
      { name: "Macizos de flores y plantas", type: "Plantación", location: "Leander, TX" },
      { name: "Camino de flagstone", type: "Hardscaping", location: "Pflugerville, TX" },
      { name: "Antes y después: renovación completa", type: "Diseño e instalación", location: "Round Rock, TX" }
    ],
    testimonials: [
      { quote: "Mi propiedad necesitaba urgentemente una renovación y Beautiful Landscapes superó mis expectativas. Escucharon mi visión con atención y ofrecieron ideas valiosas para mejorarla. Cada detalle de la jardinería y la instalación del riego se ejecutó a la perfección.", author: "Kathy L.", meta: "Round Rock, TX" },
      { quote: "También hacen remoción de árboles. Nos gustaron porque todos los empleados son trabajadores, honestos y confiables. Los he contratado varias veces y siempre llegan a tiempo, y los precios son muy buenos.", author: "Carmen M.", meta: "Leander, TX" },
      { quote: "Todo el proceso fue fluido y sin complicaciones gracias a la comunicación eficiente y la buena gestión del equipo. Terminaron el proyecto dentro del plazo y el presupuesto acordados.", author: "David & Jennifer", meta: "Cedar Park, TX" },
      { quote: "Recomendamos de todo corazón a Beautiful Landscapes a quien busque servicios profesionales de jardinería e irrigación. Gracias por convertir nuestro patio en una obra maestra.", author: "Bob & Kate", meta: "Austin, TX" }
    ],
    faqs: [
      { q: "¿Tienen licencia y seguro?", a: "Sí. Beautiful Landscapes está totalmente asegurada y nuestro trabajo de irrigación se realiza bajo la licencia de irrigador de Texas LI# 0016669, emitida por la TCEQ, que regula la irrigación en Texas." },
      { q: "¿Qué áreas atienden?", a: "Round Rock, Austin, Cedar Park, Leander, Pflugerville, Georgetown, Hutto y el área metropolitana de Austin." },
      { q: "¿Ofrecen reparación de aspersores de emergencia?", a: "Sí. Llame al (512) 743-5850 a cualquier hora, de día o de noche. Los proyectos de emergencia también pueden programarse los domingos por un cargo adicional." },
      { q: "¿La consulta es gratis?", a: "Sí. Las consultas y los presupuestos por escrito son gratis, con precios transparentes y sin sorpresas." },
      { q: "¿Qué depósito piden?", a: "Los proyectos normalmente comienzan con un depósito del 50 % y el saldo se paga al terminar. Hay financiamiento disponible a través de LightStream." },
      { q: "¿Ofrecen planes de mantenimiento?", a: "Sí. Ofrecemos planes de mantenimiento a su medida con visitas el mismo día y hora cada semana, para que su jardín luzca bien todo el año." },
      { q: "¿Garantizan su trabajo?", a: "Sí. Respaldamos la calidad de nuestro trabajo con garantía para que tenga tranquilidad mucho después de terminar el proyecto." }
    ],
    contact_headline: "Hablemos de su jardín.",
    contact_sub: "Cuéntenos qué necesita y le responderemos con un presupuesto gratis, normalmente el mismo día.",
    ui: {
      nav_services: "Servicios", nav_about: "Nosotros", nav_projects: "Proyectos",
      nav_testimonials: "Opiniones", nav_faq: "Preguntas", nav_contact: "Contacto",
      nav_financing: "Financiamiento",
      lang_switch: "EN", lang_switch_label: "View in English",
      scroll: "Bajar",
      services_eyebrow: "Servicios", services_title: "Lo que hacemos",
      about_eyebrow: "Nosotros",
      projects_eyebrow: "Proyectos", projects_title: "Trabajos recientes",
      testimonials_eyebrow: "Lo que dicen nuestros clientes",
      faq_eyebrow: "Preguntas frecuentes", faq_title: "Lo que más nos preguntan",
      contact_eyebrow: "Contacto",
      label_call: "Llame", label_email: "Correo", label_visit: "Visítenos", label_serving: "Áreas", label_hours: "Horario",
      form_name: "Nombre", form_phone: "Teléfono", form_email: "Correo",
      form_service: "Servicio que necesita", form_message: "Detalles del proyecto",
      form_select: "Elija un servicio…", form_other: "Otro",
      form_submit: "Pedir mi presupuesto gratis",
      form_need: "Por favor agregue su nombre y teléfono.",
      form_sending: "Enviando…",
      form_thanks: "¡Gracias! Nos comunicaremos pronto.",
      form_error: "Algo salió mal — por favor llame al",
      form_demo: "¡Gracias! (Modo demo — conecte su webhook de GHL para recibir este contacto.)",
      mobile_call: "Llamar ahora",
      mobile_emergency: "Aspersores 24/7"
    }
  },

  // FORM DESTINATION — see GHL-INTEGRATION.md.
  // Paste the client's GHL Inbound Webhook URL here. The one below is the
  // template's demo webhook (Berman) — REPLACE before launch.
  ghl_webhook_url: ""
};
