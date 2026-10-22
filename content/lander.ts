// Landing-page copy for alexcavazos.com (EN / ES).
// Every claim must trace back to content/facts.md (local only).
// Voice: first person, plain, specific. No hype, no vanity metrics (commits, lines, tests, tokens).

export type Locale = "en" | "es";

export type Link = { label: string; href: string };

/** One thing built at a company. `name` is optional for plain statements. */
export type Item = { name?: string; href?: string; text: string };

export type Company = {
  company: string;
  role: string;
  period: string;
  about: string;
  items: Item[];
};

/** Intro: a coding-agent session that builds and ships this page, then fades into it. */
export type BootLine =
  | { kind: "user"; text: string }
  | { kind: "tool"; tool: string; args: string; output: string }
  | { kind: "done"; text: string };

export type EarlierRole = { title: string; company?: string; period: string };

export type LanderContent = {
  meta: { title: string; description: string };
  ui: {
    skipToContent: string;
    themeToggle: string;
    langLabel: string;
    langSwitch: Link;
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
  cvPdfEn: "/alejandro-cavazos-cv-en.pdf",
  cvPdfEs: "/alejandro-cavazos-cv-es.pdf",
  eventkit: "https://eventkit.octagonlabs.ai",
  turboship: "https://turboship.app",
  fankit: "https://fankit.io",
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

// ---------------------------------------------------------------------------
// English
// ---------------------------------------------------------------------------

const en: LanderContent = {
  meta: {
    title: "Alex Cavazos — I ship companies, not features",
    description:
      "Technical co-founder in Monterrey, Mexico. I design, build and run software products end to end, including the AI agents that handle parts of the work.",
  },
  ui: {
    skipToContent: "Skip to content",
    themeToggle: "Toggle theme",
    langLabel: "Language",
    langSwitch: { label: "es", href: "/es" },
    place: "Monterrey, MX",
  },
  boot: {
    skip: "press any key to skip",
    replay: "replay intro",
    lines: [
      { kind: "user", text: "build alexcavazos.com and ship it" },
      { kind: "tool", tool: "Read", args: "content/work.md", output: "Octagon Labs · Turboship · Terpa Solutions" },
      { kind: "tool", tool: "Write", args: "app/page.tsx", output: "whoami, work, notes, stack, cv, contact" },
      { kind: "tool", tool: "Bash", args: "npm run build", output: "✓ compiled, 4 pages" },
      { kind: "tool", tool: "Bash", args: "octagon deploy --prod", output: "✓ alexcavazos.com" },
      { kind: "done", text: "Website is ready" },
    ],
  },
  intro: {
    cmd: "whoami",
    name: "Alex Cavazos",
    headline: "I ship companies, not features.",
    lines: [
      "Technical co-founder in Monterrey, Mexico.",
      "I design, build and run software products end to end: the product, the infrastructure, the payments and tax integrations, and the AI agents that handle parts of the work.",
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
            text: "Browser agents that find and qualify leads on Google Maps and in Facebook groups. They have collected 7,549 leads across Mexico, Canada, Colombia and Brazil.",
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
        role: "Co-founder & CTO",
        period: "2023 – now",
        about: "Shipping software for businesses in Mexico.",
        items: [
          {
            name: "Turboship Carrier",
            text: "A multi-carrier shipping platform: quotes, labels and tracking across 18 carriers, prepaid balances funded over SPEI, and CFDI e-invoicing. Each white-label reseller runs its own isolated instance.",
          },
          {
            text: "From July 2025 to July 2026 the network processed about 1.6M shipments for 852 businesses through 9 resellers.",
          },
          {
            name: "Turboship WMS",
            href: LINKS.turboship,
            text: "Inventory, point of sale and online stores for merchants, in one system.",
          },
        ],
      },
      {
        company: "Terpa Solutions",
        role: "Technical advisor · head of technology until 2026",
        period: "2024 – now",
        about: "Payments for vending machines, micromarkets, parking and kiosks.",
        items: [
          { text: "Built the platform that manages 1,300+ payment terminals across Mexico, with Openpay, Mercado Pago and CFDI integrations." },
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
      "I write software with coding agents every day, and I put agents inside products when they do a job better than a form would.",
      "I prefer plain, typed tools and servers I understand.",
    ],
  },
  stack: { cmd: "cat stack", lines: stackLines },
  cv: {
    cmd: "open cv",
    links: [
      { label: "read online", href: "/cv" },
      { label: "pdf, english", href: LINKS.cvPdfEn },
      { label: "pdf, español", href: LINKS.cvPdfEs },
    ],
  },
  contact: { cmd: "contact", links: contactLinks },
};

// ---------------------------------------------------------------------------
// Español (MX)
// ---------------------------------------------------------------------------

const es: LanderContent = {
  meta: {
    title: "Alex Cavazos — No entrego features. Entrego empresas.",
    description:
      "Cofundador técnico en Monterrey, México. Diseño, construyo y opero productos de software de punta a punta, incluidos los agentes de IA que se encargan de parte del trabajo.",
  },
  ui: {
    skipToContent: "Saltar al contenido",
    themeToggle: "Cambiar tema",
    langLabel: "Idioma",
    langSwitch: { label: "en", href: "/" },
    place: "Monterrey, MX",
  },
  boot: {
    skip: "presiona cualquier tecla para saltar",
    replay: "repetir intro",
    lines: [
      { kind: "user", text: "arma alexcavazos.com y publícalo" },
      { kind: "tool", tool: "Read", args: "content/work.md", output: "Octagon Labs · Turboship · Terpa Solutions" },
      { kind: "tool", tool: "Write", args: "app/es/page.tsx", output: "whoami, trabajo, notas, stack, cv, contacto" },
      { kind: "tool", tool: "Bash", args: "npm run build", output: "✓ compilado, 4 páginas" },
      { kind: "tool", tool: "Bash", args: "octagon deploy --prod", output: "✓ alexcavazos.com/es" },
      { kind: "done", text: "El sitio está listo" },
    ],
  },
  intro: {
    cmd: "whoami",
    name: "Alex Cavazos",
    headline: "No entrego features. Entrego empresas.",
    lines: [
      "Cofundador técnico en Monterrey, México.",
      "Diseño, construyo y opero productos de software de punta a punta: el producto, la infraestructura, las integraciones de pagos y facturación, y los agentes de IA que se encargan de parte del trabajo.",
      "Cofundador y CTO en Octagon Labs y Turboship.",
    ],
    links: [
      { label: "cv", href: "/es/cv" },
      { label: "correo", href: LINKS.email },
      { label: "github", href: LINKS.github },
      { label: "linkedin", href: LINKS.linkedin },
    ],
  },
  work: {
    cmd: "cat trabajo",
    companies: [
      {
        company: "Octagon Labs",
        role: "Cofundador y CTO",
        period: "2025 – hoy",
        about: "Un estudio que construye y opera sus propias empresas de software.",
        items: [
          {
            name: "HQ",
            text: "La consola de operación del estudio: ingresos de cada empresa, una base de prospectos compartida y los controles de nuestros agentes.",
          },
          {
            name: "Agentes de ventas",
            text: "Agentes de navegador que encuentran y califican prospectos en Google Maps y en grupos de Facebook. Llevan 7,549 prospectos en México, Canadá, Colombia y Brasil.",
          },
          {
            name: "Infraestructura",
            text: "Los productos del estudio corren en servidores propios que operamos nosotros: Postgres, Redis y almacenamiento de objetos, un túnel de Cloudflare al frente, runners de CI propios, despliegues que se revierten solos si fallan y respaldos diarios verificados.",
          },
          {
            name: "EventKit",
            href: LINKS.eventkit,
            text: "Boletaje para organizadores de eventos en Latinoamérica: boletos pagados y RSVP, pases de Wallet, check-in con QR y un escáner Android para la entrada.",
          },
          {
            name: "FanKit",
            href: LINKS.fankit,
            text: "Tarjetas de lealtad que viven en Apple Wallet y Google Wallet.",
          },
          {
            name: "Timbra Chat",
            href: LINKS.timbrachat,
            text: "Un agente que emite facturas CFDI: lee el ticket y llena el portal de facturación del comercio.",
          },
        ],
      },
      {
        company: "Turboship",
        role: "Cofundador y CTO",
        period: "2023 – hoy",
        about: "Software de envíos para negocios en México.",
        items: [
          {
            name: "Turboship Carrier",
            text: "Plataforma de envíos con varias paqueterías: cotización, guías y rastreo con 18 paqueterías, saldo prepagado por SPEI y facturación CFDI. Cada revendedor de marca blanca tiene su propia instancia aislada.",
          },
          {
            text: "De julio de 2025 a julio de 2026 la red procesó cerca de 1.6 millones de envíos para 852 negocios a través de 9 revendedores.",
          },
          {
            name: "Turboship WMS",
            href: LINKS.turboship,
            text: "Inventario, punto de venta y tiendas en línea para comercios, en un solo sistema.",
          },
        ],
      },
      {
        company: "Terpa Solutions",
        role: "Asesor técnico · líder de tecnología hasta 2026",
        period: "2024 – hoy",
        about: "Pagos para máquinas vending, micromercados, estacionamientos y kioscos.",
        items: [
          { text: "Construí la plataforma que administra más de 1,300 terminales de pago en México, con integraciones de Openpay, Mercado Pago y CFDI." },
          { text: "Dirigí al equipo que hace las apps Android de las terminales." },
        ],
      },
    ],
    earlierLabel: "Antes",
    earlier: [
      { title: "Ingeniero de software, tech lead", company: "Caring (contrato)", period: "2025" },
      { title: "Ingeniero de software, tech lead", company: "Able (contrato)", period: "2021 – 2024" },
      { title: "Ingeniero de software", company: "PayPal (contrato)", period: "2021" },
      { title: "Remote Software Development & Consulting for US companies", period: "2014 – 2020" },
    ],
  },
  notes: {
    cmd: "cat notas",
    lines: [
      "Me gusta hacerme cargo de todo, desde el primer commit hasta mantenerlo funcionando.",
      "Programo con agentes todos los días, y meto agentes en los productos cuando hacen un trabajo mejor que un formulario.",
      "Prefiero herramientas simples y tipadas, y servidores que entiendo.",
    ],
  },
  stack: {
    cmd: "cat stack",
    lines: stackLines.map((l) => l.replace("my own servers", "servidores propios")),
  },
  cv: {
    cmd: "open cv",
    links: [
      { label: "leer en línea", href: "/es/cv" },
      { label: "pdf, español", href: LINKS.cvPdfEs },
      { label: "pdf, english", href: LINKS.cvPdfEn },
    ],
  },
  contact: { cmd: "contacto", links: contactLinks },
};

export const lander: Record<Locale, LanderContent> = { en, es };
