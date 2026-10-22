// CV content (EN / ES). Every claim is sourced from content/facts.md.
// Formal register, one US-Letter page per language at ~9.5pt.
// No vanity metrics (commits, lines, tests, tokens) and no product status labels.

export type Locale = "en" | "es"

export type CvRole = {
  title: string
  company: string
  companyNote?: string
  location: string
  period: string
  bullets: string[]
}

export type CvContent = {
  meta: { title: string; description: string }
  labels: {
    summary: string
    experience: string
    skills: string
    languages: string
    earlier: string
    download: string
    backToSite: string
    otherLang: { label: string; href: string }
  }
  header: {
    name: string
    headline: string
    location: string
    contacts: { label: string; href: string }[]
  }
  summary: string
  experience: CvRole[]
  skills: { group: string; items: string }[]
  languages: string
  earlier?: string
}

const contacts: CvContent["header"]["contacts"] = [
  { label: "me@alexcavazos.com", href: "mailto:me@alexcavazos.com" },
  { label: "alexcavazos.com", href: "https://alexcavazos.com" },
  { label: "github.com/alexkvazos", href: "https://github.com/alexkvazos" },
  {
    label: "linkedin.com/in/alejandro-cavazos-76a488b9",
    href: "https://www.linkedin.com/in/alejandro-cavazos-76a488b9",
  },
]

const en: CvContent = {
  meta: {
    title: "CV — Alex Cavazos",
    description:
      "Curriculum vitae of Alex Cavazos, technical co-founder and CTO in Monterrey, Mexico.",
  },
  labels: {
    summary: "Summary",
    experience: "Experience",
    skills: "Skills",
    languages: "Languages",
    earlier: "Earlier",
    download: "Download PDF",
    backToSite: "Back to site",
    otherLang: { label: "Español", href: "/es/cv" },
  },
  header: {
    name: "Alejandro (Alex) Cavazos",
    headline: "Technical Co-Founder & CTO",
    location: "Monterrey, Nuevo León, Mexico",
    contacts,
  },
  summary:
    "Technical co-founder and CTO who designs, builds and operates software products end to end: architecture, infrastructure, payments and Mexican tax compliance, and AI agents in production.",
  experience: [
    {
      title: "Co-Founder & CTO",
      company: "Octagon Labs",
      companyNote: "Studio that builds and operates its own software companies",
      location: "Monterrey",
      period: "Jan 2025 – Present",
      bullets: [
        "Built HQ, the studio's operations console: revenue reporting from each company, a shared lead database and the controls for its AI agents. It replaced three legacy systems.",
        "Designed and run autonomous browser agents that find and qualify leads on Google Maps and Facebook: 7,549 leads across Mexico, Canada, Colombia and Brazil.",
        "Built EventKit (event ticketing with Wallet passes, QR check-in and an Android door scanner), FanKit (Wallet loyalty cards) and Timbra Chat (an agent that issues CFDI invoices from receipts).",
        "Run the studio's products on self-hosted infrastructure: Postgres, Redis, object storage, Cloudflare Tunnel and self-hosted CI runners, with automatic rollback and daily verified backups.",
      ],
    },
    {
      title: "Co-Founder & CTO",
      company: "Turboship",
      companyNote: "Shipping software for businesses in Mexico",
      location: "Monterrey",
      period: "Nov 2023 – Present",
      bullets: [
        "Built Turboship Carrier, a multi-tenant shipping platform integrating 18 carriers, deployed as an isolated instance for each white-label reseller.",
        "From Jul 2025 to Jul 2026 the network processed ~1.6M shipments for 852 businesses through 9 resellers (~$257.7M MXN billed).",
        "Owned payments and Mexican tax compliance: SPEI deposits with automated reconciliation, CFDI e-invoicing, Mercado Pago.",
        "Built Turboship WMS (inventory, point of sale, online stores) as a second product and automated white-label provisioning end to end.",
      ],
    },
    {
      title: "Technical Advisor (Aug 2026 – Present) · previously Head of Technology (Apr 2024 – Jul 2026)",
      company: "Terpa Solutions",
      companyNote: "Payments for vending, micromarkets, parking and kiosks",
      location: "Monterrey",
      period: "Apr 2024 – Present",
      bullets: [
        "Built the multi-tenant platform that manages 1,300+ payment terminals across Mexico, with Openpay, Mercado Pago and CFDI integrations.",
        "Led the team building the Android apps on PAX and Sunmi terminals; set up release pipelines and crash reporting.",
        "Introduced AI-assisted code review and agent-based development practices to the team.",
      ],
    },
    {
      title: "Software Engineer, Tech Lead — Partner Experience (contract)",
      company: "Caring",
      location: "Remote",
      period: "Jan 2025 – May 2025",
      bullets: [],
    },
    {
      title: "Software Engineer, Tech Lead — Full-Stack Web (contract)",
      company: "Able",
      location: "Remote",
      period: "Nov 2021 – Dec 2024",
      bullets: [],
    },
    {
      title: "Software Engineer — Consumer Web Platform (contract)",
      company: "PayPal",
      location: "Remote",
      period: "Jan 2021 – Oct 2021",
      bullets: [],
    },
    {
      title: "Remote Software Development & Consulting for US companies",
      company: "Independent",
      location: "Remote",
      period: "2014 – 2020",
      bullets: [],
    },
  ],
  skills: [
    {
      group: "AI",
      items: "Coding agents (Claude Code, Codex); Vercel AI SDK, OpenAI, Anthropic, OpenRouter; browser and tool-calling agents, document vision, structured outputs",
    },
    {
      group: "Engineering",
      items: "TypeScript, Next.js, React, Postgres, Redis, BullMQ, Socket.IO, Kotlin / Compose, React Native",
    },
    {
      group: "Infrastructure",
      items: "Linux servers, Docker, Cloudflare, Vercel, DigitalOcean, GitHub Actions",
    },
    {
      group: "Payments (MX)",
      items: "CFDI e-invoicing, SPEI reconciliation, Openpay, Mercado Pago",
    },
  ],
  languages: "Spanish (native) · English (professional)",
}

const es: CvContent = {
  meta: {
    title: "Currículum — Alex Cavazos",
    description: "Currículum de Alex Cavazos, cofundador técnico y CTO en Monterrey, México.",
  },
  labels: {
    summary: "Perfil",
    experience: "Experiencia",
    skills: "Competencias",
    languages: "Idiomas",
    earlier: "Trayectoria previa",
    download: "Descargar PDF",
    backToSite: "Volver al sitio",
    otherLang: { label: "English", href: "/cv" },
  },
  header: {
    name: "Alejandro (Alex) Cavazos",
    headline: "Cofundador técnico y CTO",
    location: "Monterrey, Nuevo León, México",
    contacts,
  },
  summary:
    "Cofundador técnico y CTO que diseña, construye y opera productos de software de punta a punta: arquitectura, infraestructura, pagos y cumplimiento fiscal en México, y agentes de IA en producción.",
  experience: [
    {
      title: "Cofundador y CTO",
      company: "Octagon Labs",
      companyNote: "Estudio que construye y opera sus propias empresas de software",
      location: "Monterrey",
      period: "Ene 2025 – Actualidad",
      bullets: [
        "Construí HQ, la consola de operación del estudio: ingresos de cada empresa, una base de prospectos compartida y los controles de sus agentes de IA. Reemplazó tres sistemas anteriores.",
        "Diseñé y opero agentes autónomos de navegador que encuentran y califican prospectos en Google Maps y Facebook: 7,549 prospectos en México, Canadá, Colombia y Brasil.",
        "Construí EventKit (boletaje con pases de Wallet, check-in con QR y escáner Android), FanKit (tarjetas de lealtad en Wallet) y Timbra Chat (un agente que emite facturas CFDI a partir de tickets).",
        "Opero los productos del estudio en infraestructura propia: Postgres, Redis, almacenamiento de objetos, Cloudflare Tunnel y runners de CI propios, con reversión automática y respaldos diarios verificados.",
      ],
    },
    {
      title: "Cofundador y CTO",
      company: "Turboship",
      companyNote: "Software de envíos para negocios en México",
      location: "Monterrey",
      period: "Nov 2023 – Actualidad",
      bullets: [
        "Construí Turboship Carrier, una plataforma de envíos multi-tenant con 18 paqueterías integradas, desplegada como instancia aislada para cada revendedor de marca blanca.",
        "De jul 2025 a jul 2026 la red procesó ~1.6 millones de envíos para 852 negocios a través de 9 revendedores (~$257.7 millones MXN facturados).",
        "Responsable de pagos y cumplimiento fiscal: depósitos SPEI con conciliación automática, facturación CFDI, Mercado Pago.",
        "Construí Turboship WMS (inventario, punto de venta, tiendas en línea) como segundo producto y automaticé por completo el alta de nuevas marcas blancas.",
      ],
    },
    {
      title: "Asesor Técnico (ago 2026 – actualidad) · antes Líder de Tecnología (abr 2024 – jul 2026)",
      company: "Terpa Solutions",
      companyNote: "Pagos para vending, micromercados, estacionamientos y kioscos",
      location: "Monterrey",
      period: "Abr 2024 – Actualidad",
      bullets: [
        "Construí la plataforma multi-tenant que administra más de 1,300 terminales de pago en México, con integraciones de Openpay, Mercado Pago y CFDI.",
        "Dirigí al equipo de las apps Android para terminales PAX y Sunmi; implementé pipelines de publicación y reporte de errores.",
        "Introduje revisión de código asistida por IA y prácticas de desarrollo con agentes en el equipo.",
      ],
    },
    {
      title: "Ingeniero de Software, Tech Lead — Partner Experience (por contrato)",
      company: "Caring",
      location: "Remoto",
      period: "Ene 2025 – May 2025",
      bullets: [],
    },
    {
      title: "Ingeniero de Software, Tech Lead — Full-Stack Web (por contrato)",
      company: "Able",
      location: "Remoto",
      period: "Nov 2021 – Dic 2024",
      bullets: [],
    },
    {
      title: "Ingeniero de Software — Consumer Web Platform (por contrato)",
      company: "PayPal",
      location: "Remoto",
      period: "Ene 2021 – Oct 2021",
      bullets: [],
    },
    {
      title: "Remote Software Development & Consulting for US companies",
      company: "Independiente",
      location: "Remoto",
      period: "2014 – 2020",
      bullets: [],
    },
  ],
  skills: [
    {
      group: "IA",
      items: "Agentes de programación (Claude Code, Codex); Vercel AI SDK, OpenAI, Anthropic, OpenRouter; agentes de navegador y con herramientas, visión de documentos, salidas estructuradas",
    },
    {
      group: "Ingeniería",
      items: "TypeScript, Next.js, React, Postgres, Redis, BullMQ, Socket.IO, Kotlin / Compose, React Native",
    },
    {
      group: "Infraestructura",
      items: "Servidores Linux, Docker, Cloudflare, Vercel, DigitalOcean, GitHub Actions",
    },
    {
      group: "Pagos (MX)",
      items: "Facturación CFDI, conciliación SPEI, Openpay, Mercado Pago",
    },
  ],
  languages: "Español (nativo) · Inglés (profesional)",
}

export const cv: Record<Locale, CvContent> = { en, es }
