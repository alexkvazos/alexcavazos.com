// Landing-page copy for alexcavazos.com (English only).
// Every claim must trace back to content/facts.md (local only).
// Voice: first person, plain, specific. No hype, no vanity metrics (commits, lines, tests, tokens).

export type Link = { label: string; href: string };

/** One thing built at a company. `name` is optional for plain statements. `text` may mark KPIs as **bold**. */
export type Item = { name?: string; href?: string; text: string };

export type Company = {
  company: string;
  href?: string;
  role: string;
  period: string;
  about: string;
  items: Item[];
};

/** Intro: a coding-agent session that builds and ships this page, then fades into it. */
export type BootLine =
  | { kind: "user"; text: string }
  | { kind: "tool"; tool: string; args: string; output: string[] }
  | { kind: "done"; text: string };

export type EarlierRole = { title: string; company?: string; period: string };

export type LanderContent = {
  meta: { title: string; description: string };
  ui: {
    skipToContent: string;
    themeToggle: string;
    place: string;
  };
  boot: { lines: BootLine[]; skip: string; replay: string };
  /** `$ whoami` and its answer. */
  intro: { cmd: string; name: string; headline: string; lines: string[]; links: Link[] };
  work: { cmd: string; companies: Company[]; earlierLabel: string; earlier: EarlierRole[] };
  notes: { cmd: string; lines: string[] };
  stack: { cmd: string; lines: string[] };
  cv: { cmd: string; links: Link[] };
  contact: { cmd: string; links: Link[] };
};

export const EMAIL = "me@alexcavazos.com";

export const LINKS = {
  email: `mailto:${EMAIL}`,
  github: "https://github.com/alexkvazos",
  linkedin: "https://www.linkedin.com/in/alejandro-cavazos-76a488b9",
  x: "https://x.com/alexkvazos_",
  cvPdf: "/alejandro-cavazos-cv.pdf",
  eventkit: "https://eventkit.octagonlabs.ai",
  turboshipCarrier: "https://turboship.mx/carrier/",
  turboshipWms: "https://turboship.mx/wms/",
  fankit: "https://fankit.io",
  terpa: "https://terpasolutions.com",
  octagon: "https://octagonlabs.ai",
  turboship: "https://turboship.mx",
  timbrachat: "https://timbrachat.ai",
} as const;

const contactLinks: Link[] = [
  { label: EMAIL, href: LINKS.email },
  { label: "github.com/alexkvazos", href: LINKS.github },
  { label: "linkedin.com/in/alejandro-cavazos-76a488b9", href: LINKS.linkedin },
  { label: "x.com/alexkvazos_", href: LINKS.x },
];

const stackLines = [
  "TypeScript, Next.js, React, Tailwind",
  "Postgres, Redis, BullMQ, Socket.IO",
  "Vercel AI SDK, Claude, OpenAI, OpenRouter",
  "Kotlin / Compose, React Native",
  "Vercel, DigitalOcean, my own servers, GitHub Actions",
];

export const lander: LanderContent = {
  meta: {
    title: "Alex Cavazos — I build software, and the agents that help run it",
    description:
      "Co-founder and CTO at Octagon Labs and Turboship, in Monterrey, Mexico. I design, build and run software products end to end.",
  },
  ui: {
    skipToContent: "Skip to content",
    themeToggle: "Toggle theme",
    place: "Monterrey, MX",
  },
  boot: {
    skip: "press any key to skip",
    replay: "replay intro",
    lines: [
      { kind: "user", text: "build alexcavazos.com and ship it" },
      {
        kind: "tool",
        tool: "Read",
        args: "content/work.md",
        output: [
          "octagon-labs/",
          "├─ hq",
          "├─ sales-agents",
          "├─ infra",
          "├─ eventkit",
          "├─ fankit",
          "└─ timbra-chat",
          "turboship/",
          "├─ carrier",
          "└─ wms",
          "terpa/",
          "└─ terminal-platform",
        ],
      },
      { kind: "tool", tool: "Write", args: "app/page.tsx", output: ["whoami, work, notes, stack, cv, contact"] },
      { kind: "tool", tool: "Bash", args: "npm run build", output: ["✓ compiled"] },
      { kind: "tool", tool: "Bash", args: "octagon deploy --prod", output: ["✓ alexcavazos.com"] },
      { kind: "done", text: "Website is ready" },
    ],
  },
  intro: {
    cmd: "whoami",
    name: "Alex Cavazos",
    headline: "I build software, and the agents that help run it.",
    lines: [
      "Co-founder and CTO at Octagon Labs and Turboship.",
    ],
    links: [
      { label: "cv", href: "/cv" },
      { label: "email", href: LINKS.email },
      { label: "github", href: LINKS.github },
      { label: "linkedin", href: LINKS.linkedin },
    ],
  },
  work: {
    cmd: "cat work",
    companies: [
      {
        company: "Octagon Labs",
        href: LINKS.octagon,
        role: "Co-founder & CTO",
        period: "2025 – now",
        about: "A studio that builds and operates its own software companies.",
        items: [
          {
            name: "HQ",
            text: "The studio's operations console: revenue from each company, one shared lead database, and the controls for our agents.",
          },
          {
            name: "Sales agents",
            text: "Browser agents that find and qualify leads on Google Maps and in Facebook groups. They have collected **7,549 leads** across Mexico, Canada, Colombia and Brazil.",
          },
          {
            name: "Infrastructure",
            text: "The studio's products run on servers we own and operate: Postgres, Redis and object storage, a Cloudflare tunnel in front, self-hosted CI runners, deploys that roll back on failure, and daily verified backups.",
          },
          {
            name: "EventKit",
            href: LINKS.eventkit,
            text: "Ticketing for event organizers in Latin America: paid tickets and RSVPs, Wallet passes, QR check-in, and an Android scanner for the door.",
          },
          {
            name: "FanKit",
            href: LINKS.fankit,
            text: "Loyalty cards that live in Apple and Google Wallet.",
          },
          {
            name: "Timbra Chat",
            href: LINKS.timbrachat,
            text: "An agent that issues Mexican tax invoices: it reads the receipt, then fills in the merchant's invoicing site.",
          },
        ],
      },
      {
        company: "Turboship",
        href: LINKS.turboship,
        role: "Co-founder & CTO",
        period: "2023 – now",
        about: "Shipping software for businesses in Mexico.",
        items: [
          {
            name: "Turboship Carrier",
            href: LINKS.turboshipCarrier,
            text: "A multi-carrier shipping platform: quotes, labels and tracking across 18 carriers, prepaid balances funded over SPEI, and CFDI e-invoicing. Each white-label reseller runs its own isolated instance.",
          },
          {
            text: "From July 2025 to July 2026 the network processed **about 1.6M shipments** for **852 businesses** through **9 resellers**.",
          },
          {
            name: "Turboship WMS",
            href: LINKS.turboshipWms,
            text: "Inventory, point of sale and online stores for merchants, in one system.",
          },
        ],
      },
      {
        company: "Terpa Solutions",
        href: LINKS.terpa,
        role: "Technical advisor · head of technology until 2026",
        period: "2024 – now",
        about: "Payments for vending machines, micromarkets, parking and kiosks.",
        items: [
          { text: "Built the platform that manages **1,300+ payment terminals** across Mexico, with Openpay, Mercado Pago and CFDI integrations." },
          { text: "Led the team building the Android apps that run on the terminals." },
        ],
      },
    ],
    earlierLabel: "Before that",
    earlier: [
      { title: "Software engineer, tech lead", company: "Caring (contract)", period: "2025" },
      { title: "Software engineer, tech lead", company: "Able (contract)", period: "2021 – 2024" },
      { title: "Software engineer", company: "PayPal (contract)", period: "2021" },
      { title: "Remote Software Development & Consulting for US companies", period: "2014 – 2020" },
    ],
  },
  notes: {
    cmd: "cat notes",
    lines: [
      "I like owning the whole thing, from the first commit to keeping it running.",
      "I write software with coding agents every day.",
      "I build agents that operate: they find leads, talk to customers, issue invoices, suggest improvements and run real work in production.",
      "I build lean infrastructure and purposeful architecture, not whatever is trending.",
    ],
  },
  stack: { cmd: "cat stack", lines: stackLines },
  cv: {
    cmd: "open cv",
    links: [
      { label: "read online", href: "/cv" },
      { label: "download pdf", href: LINKS.cvPdf },
    ],
  },
  contact: { cmd: "contact", links: contactLinks },
};

