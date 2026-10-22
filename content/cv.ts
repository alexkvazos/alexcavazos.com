// CV content (English). Every claim is sourced from content/facts.md.
// Formal register, one US-Letter page per language at ~9.5pt.
// No vanity metrics (commits, lines, tests, tokens) and no product status labels.

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

export const cv: CvContent = {
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
        "Built HQ, the studio's operations console: revenue reporting from each company, a shared lead database and the controls for its AI agents.",
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

