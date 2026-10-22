// CV content (EN / ES). Every claim is sourced from content/facts.md.
// Formal register, one US-Letter page per language at ~9.5pt.
// Copy was tightened by the CV agent so each language fits exactly one page.

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
    selected: string
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
  selected: { name: string; line: string }[]
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
      "Curriculum vitae of Alex Cavazos, technical co-founder and CTO in Monterrey, Mexico: products from first commit to production, infrastructure, payments and AI agents.",
  },
  labels: {
    summary: "Summary",
    experience: "Experience",
    selected: "Selected Products",
    skills: "Skills",
    languages: "Languages",
    earlier: "Earlier",
    download: "Download PDF",
    backToSite: "Back to site",
    otherLang: { label: "Español", href: "/es/cv" },
  },
  header: {
    name: "Alejandro (Alex) Cavazos",
    headline: "Technical Co-Founder & CTO · Product, Infrastructure and AI Agents",
    location: "Monterrey, Nuevo León, Mexico",
    contacts,
  },
  summary:
    "Technical co-founder and CTO who takes products from first commit to production on his own (architecture, infrastructure, payments, Mexican tax compliance, AI agents) and has led a team of ~10 engineers.",
  experience: [
    {
      title: "Co-Founder & CTO",
      company: "Octagon Labs",
      companyNote: "Venture studio that builds and operates software companies",
      location: "Monterrey",
      period: "Jan 2025 – Present",
      bullets: [
        "Built HQ, the operations console and agent control plane (24 tables, 354 tests, 25-command CLI); it replaced 3 legacy systems through a migration that passes 25/25 verification checks.",
        "Designed and operate 6 autonomous browser agents on 18 systemd timers (headless Claude Code driving real Chrome): 1,677 recorded runs, 7,549 leads (4,798 qualified) in 4 countries, ~1,700 AI-written emails sent.",
        "Agent guardrails live in tested TypeScript, not prompts: no agent-written SQL; dedupe, budgets, send guard.",
        "Run 24 production processes on a self-hosted server: CI/CD with automatic rollback, daily verified backups.",
      ],
    },
    {
      title: "Co-Founder & CTO",
      company: "Turboship",
      companyNote: "Multi-carrier shipping platform, Mexico",
      location: "Monterrey",
      period: "Nov 2023 – Present",
      bullets: [
        "Built Turboship Carrier, the multi-tenant B2B shipping SaaS, from the first commit: 2,047 commits (~99.7% authored personally), ~192k lines of TypeScript, 18 carriers via 47 provider integrations.",
        "One codebase serves 9 white-label resellers and 852 business customers: ~1.6M shipments and ~$257.7M MXN processed and billed across the network in 13 months (Jul 2025 – Jul 2026).",
        "Owned payments and Mexican tax compliance: STP/SPEI reconciliation, CFDI e-invoicing, Mercado Pago.",
        "Shipped Turboship WMS as a second product (1,088 commits, ~311k lines in ~15 months) and made white-label provisioning an AI-agent skill: database, CDN, Vercel project, email domain and first deploy in one run.",
      ],
    },
    {
      title: "Technical Advisor (Aug 2026 – Present) · previously Head of Technology (Apr 2024 – Jul 2026)",
      company: "Terpa Solutions",
      companyNote: "Payments fintech: card terminals for vending, micromarkets, parking and kiosks",
      location: "Monterrey",
      period: "Apr 2024 – Present",
      bullets: [
        "Built the multi-tenant terminal-management platform from the first commit (~1,227 of 1,272 commits, ~166k lines, 77 data models) with Openpay, Mercado Pago and Facturama CFDI integrations.",
        "Led a team of ~10 engineers across Android payment-terminal apps (PAX, Sunmi EMV, MDB vending, parking, kiosks): signed-APK release pipelines, Sentry crash reporting, sprint planning.",
        "Introduced AI-native engineering: Claude Code PR review, CODEOWNERS guardrails, an AI-agent hiring exercise.",
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
  selected: [
    {
      name: "EventKit (launching)",
      line: "Event ticketing: Wallet passes with rotating codes, QR check-in, Android scanner kiosk.",
    },
    {
      name: "FanKit (in production)",
      line: "Loyalty cards on Apple and Google Wallet, Openpay billing, SMS/email campaigns.",
    },
    {
      name: "Timbra Chat",
      line: "AI agent that reads receipts with vision models and issues CFDI invoices in a real browser.",
    },
  ],
  skills: [
    {
      group: "AI & agents",
      items: "Claude Code, Codex, OpenCode (~3.9B tokens in 7 months); Vercel AI SDK, OpenRouter; browser and tool-calling agents, vision document intake, structured outputs, cost-capped model chains",
    },
    {
      group: "Engineering",
      items: "TypeScript, Next.js 16, React 19, Tailwind 4, Postgres (Drizzle, Prisma), Redis/BullMQ, Socket.IO, zod, Kotlin/Compose, React Native/Expo",
    },
    {
      group: "Infrastructure",
      items: "Self-hosted Linux (pm2, Docker, Cloudflare Tunnel), Vercel, DigitalOcean, GitHub Actions",
    },
    {
      group: "Payments (MX)",
      items: "CFDI e-invoicing (Facturama), STP/SPEI reconciliation, Openpay, Mercado Pago, Zoho Books",
    },
  ],
  languages: "Spanish (native) · English (professional)",
}

const es: CvContent = {
  meta: {
    title: "Currículum — Alex Cavazos",
    description:
      "Currículum de Alex Cavazos, cofundador técnico y CTO en Monterrey, México: productos desde el primer commit hasta producción, infraestructura, pagos y agentes de IA.",
  },
  labels: {
    summary: "Perfil",
    experience: "Experiencia",
    selected: "Productos destacados",
    skills: "Competencias",
    languages: "Idiomas",
    earlier: "Trayectoria previa",
    download: "Descargar PDF",
    backToSite: "Volver al sitio",
    otherLang: { label: "English", href: "/cv" },
  },
  header: {
    name: "Alejandro (Alex) Cavazos",
    headline: "Cofundador técnico y CTO · Producto, infraestructura y agentes de IA",
    location: "Monterrey, Nuevo León, México",
    contacts,
  },
  summary:
    "Cofundador técnico y CTO que lleva productos por su cuenta del primer commit a producción (arquitectura, infraestructura, pagos, cumplimiento fiscal en México, agentes de IA); dirigió un equipo de ~10 ingenieros.",
  experience: [
    {
      title: "Cofundador y CTO",
      company: "Octagon Labs",
      companyNote: "Estudio de ventures que construye y opera empresas de software",
      location: "Monterrey",
      period: "Ene 2025 – Actualidad",
      bullets: [
        "Construí HQ, la consola de operaciones y plano de control de agentes (24 tablas, 354 pruebas, CLI de 25 comandos); reemplazó 3 sistemas heredados con una migración que aprueba 25 de 25 verificaciones.",
        "Diseñé y opero 6 agentes autónomos de navegador en 18 temporizadores de systemd (Claude Code sobre Chrome real): 1,677 ejecuciones, 7,549 prospectos (4,798 calificados) en 4 países, ~1,700 correos enviados, escritos por IA.",
        "Salvaguardas en TypeScript probado, no en prompts: sin SQL de agentes; deduplicación y presupuestos en código.",
        "Opero 24 procesos en un servidor propio: CI/CD con reversión automática y respaldos diarios verificados.",
      ],
    },
    {
      title: "Cofundador y CTO",
      company: "Turboship",
      companyNote: "Plataforma de envíos multipaquetería, México",
      location: "Monterrey",
      period: "Nov 2023 – Actualidad",
      bullets: [
        "Construí Turboship Carrier, el SaaS B2B multi-tenant de envíos, desde el primer commit: 2,047 commits (~99.7% propios), ~192 mil líneas de TypeScript, 18 paqueterías mediante 47 integraciones.",
        "Una sola base de código para 9 revendedores de marca blanca y 852 clientes empresariales: ~1.6 millones de envíos y ~$257.7 millones MXN procesados y facturados en la red en 13 meses (jul 2025 – jul 2026).",
        "Responsable de pagos y cumplimiento fiscal: conciliación STP/SPEI, facturación CFDI, Mercado Pago.",
        "Lancé Turboship WMS como segundo producto (1,088 commits, ~311 mil líneas en ~15 meses) y convertí el alta de cada marca blanca en una habilidad de agente de IA: base de datos, CDN, Vercel, correo y primer despliegue.",
      ],
    },
    {
      title: "Asesor Técnico (ago 2026 – actualidad) · antes Líder de Tecnología (abr 2024 – jul 2026)",
      company: "Terpa Solutions",
      companyNote: "Fintech: terminales para vending, micromercados, estacionamientos y kioscos",
      location: "Monterrey",
      period: "Abr 2024 – Actualidad",
      bullets: [
        "Construí la plataforma multi-tenant de gestión de terminales desde el primer commit (~1,227 de 1,272 commits, ~166 mil líneas, 77 modelos de datos) con Openpay, Mercado Pago y CFDI vía Facturama.",
        "Dirigí un equipo de ~10 ingenieros en apps Android para terminales de pago (PAX, Sunmi EMV, vending MDB, estacionamientos, kioscos): APK firmados, Sentry y planeación de sprints.",
        "Introduje ingeniería nativa en IA: revisión de PR con Claude Code y una prueba de contratación con agentes.",
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
  selected: [
    {
      name: "EventKit (en lanzamiento)",
      line: "Boletaje con pases de Wallet de código rotativo, check-in por QR y kiosco Android.",
    },
    {
      name: "FanKit (en producción)",
      line: "Tarjetas de lealtad en Apple y Google Wallet, cobro con Openpay, campañas por SMS y correo.",
    },
    {
      name: "Timbra Chat",
      line: "Agente de IA que lee tickets con modelos de visión y emite facturas CFDI en un navegador real.",
    },
  ],
  skills: [
    {
      group: "IA y agentes",
      items: "Claude Code, Codex, OpenCode (~3,900 millones de tokens en 7 meses); Vercel AI SDK, OpenRouter; agentes de navegador, visión, cadenas de modelos con tope de costo",
    },
    {
      group: "Ingeniería",
      items: "TypeScript, Next.js 16, React 19, Tailwind 4, Postgres (Drizzle, Prisma), Redis/BullMQ, Socket.IO, zod, Kotlin/Compose, React Native/Expo",
    },
    {
      group: "Infraestructura",
      items: "Servidores Linux propios (pm2, Docker, Cloudflare Tunnel), Vercel, DigitalOcean, GitHub Actions",
    },
    {
      group: "Pagos (MX)",
      items: "Facturación CFDI (Facturama), conciliación STP/SPEI, Openpay, Mercado Pago, Zoho Books",
    },
  ],
  languages: "Español (nativo) · Inglés (profesional)",
}

export const cv: Record<Locale, CvContent> = { en, es }
