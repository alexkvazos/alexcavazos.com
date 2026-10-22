// Landing-page copy for alexcavazos.com.
// Every number and claim here must trace back to content/facts.md.
// The page is rendered as a coding-agent terminal session about Alex.

export type Locale = "en" | "es";

export type ToolCall = { tool: string; args: string; output: string[] };

export type Step =
  | { kind: "user"; text: string }
  | { kind: "thinking"; text: string }
  | { kind: "tool"; call: ToolCall }
  /** Short paragraph. Inline markers allowed: **bold** and `code` only. */
  | { kind: "say"; text: string };

export type Metric = { value: string; label: string; sub?: string };

export type ProductStatus = "live" | "launching" | "internal";

export type Product = {
  name: string;
  company: string;
  url?: string;
  /** Omitted when facts.md gives no status. */
  status?: ProductStatus;
  tagline: string;
  points: string[];
  stack: string[];
  /** Highlight this card (EventKit). */
  featured?: boolean;
};

export type Role = { title: string; company: string; period: string; line: string };

/** Deterministic shell command. `name` is matched case-insensitively after trimming. */
export type Command = { name: string; summary: string; output: string[] };

export type Link = { label: string; href: string };

export type Cta = { label: string; href: string; kind: "primary" | "secondary" };

export type LanderContent = {
  meta: { title: string; description: string; ogTitle: string; ogSubtitle: string };
  ui: {
    skip: string;
    replay: string;
    themeToggle: string;
    langSwitch: Link;
    promptPlaceholder: string;
    copyEmail: string;
    copied: string;
  };
  hero: { session: Step[]; headline: string; subhead: string; ctas: Cta[] };
  metrics: Metric[];
  sections: {
    ships: { cmd: "/ships"; title: string; intro: string; products: Product[] };
    agents: { cmd: "/agents"; title: string; intro: string; log: string[]; guardrails: string[] };
    infra: { cmd: "/infra"; title: string; intro: string; items: { k: string; v: string }[] };
    stack: { cmd: "/stack"; title: string; groups: { name: string; items: string[] }[] };
    history: { cmd: "/history"; title: string; roles: Role[]; footnote: string };
    cv: { cmd: "/cv"; title: string; text: string; links: Link[] };
    contact: { cmd: "/contact"; title: string; text: string; links: Link[] };
  };
  shell: { banner: string[]; help: string[]; commands: Command[]; notFound: string };
};

export type SectionKey = keyof LanderContent["sections"];

// ---------------------------------------------------------------------------
// Shared constants (locale-independent)
// ---------------------------------------------------------------------------

export const EMAIL = "me@alexcavazos.com";

export const LINKS = {
  email: `mailto:${EMAIL}`,
  github: "https://github.com/alexkvazos",
  linkedin: "https://www.linkedin.com/in/alejandro-cavazos-76a488b9",
  x: "https://x.com/alexcavazossh",
  cvPdfEn: "/alejandro-cavazos-cv-en.pdf",
  cvPdfEs: "/alejandro-cavazos-cv-es.pdf",
  eventkit: "https://eventkit.octagonlabs.ai",
  turboship: "https://turboship.app",
  fankit: "https://app.fankit.io",
} as const;

const STACK_GROUPS_EN: { name: string; items: string[] }[] = [
  { name: "language", items: ["TypeScript end to end", "zod"] },
  { name: "web", items: ["Next.js 16", "React 19", "Tailwind 4", "shadcn / Base UI", "Hono", "Fastify"] },
  { name: "data", items: ["Postgres", "Drizzle", "Prisma", "Redis / Valkey", "BullMQ", "Socket.IO"] },
  { name: "ai", items: ["Vercel AI SDK", "Claude", "OpenAI", "OpenRouter", "Claude Code", "Codex", "OpenCode"] },
  { name: "mobile", items: ["Kotlin / Jetpack Compose", "React Native / Expo"] },
  { name: "ops", items: ["Vercel", "DigitalOcean", "self-hosted: pm2, Docker, Cloudflare Tunnel", "GitHub Actions"] },
];

const STACK_GROUPS_ES: { name: string; items: string[] }[] = [
  { name: "lenguaje", items: ["TypeScript de punta a punta", "zod"] },
  { name: "web", items: ["Next.js 16", "React 19", "Tailwind 4", "shadcn / Base UI", "Hono", "Fastify"] },
  { name: "datos", items: ["Postgres", "Drizzle", "Prisma", "Redis / Valkey", "BullMQ", "Socket.IO"] },
  { name: "ia", items: ["Vercel AI SDK", "Claude", "OpenAI", "OpenRouter", "Claude Code", "Codex", "OpenCode"] },
  { name: "móvil", items: ["Kotlin / Jetpack Compose", "React Native / Expo"] },
  { name: "ops", items: ["Vercel", "DigitalOcean", "self-hosted: pm2, Docker, Cloudflare Tunnel", "GitHub Actions"] },
];

// ---------------------------------------------------------------------------
// English (primary)
// ---------------------------------------------------------------------------

const en: LanderContent = {
  meta: {
    title: "Alex Cavazos — I ship companies, not features",
    description:
      "Technical co-founder and AI builder in Monterrey, MX. Takes products from first commit to production alone: product, infra, and the AI agents that operate and sell them.",
    ogTitle: "Alex Cavazos",
    ogSubtitle: "Technical co-founder. Whole products. Agents included.",
  },
  ui: {
    skip: "skip",
    replay: "replay",
    themeToggle: "toggle theme",
    langSwitch: { label: "ES", href: "/es" },
    promptPlaceholder: "type a command — try `help`",
    copyEmail: "copy email",
    copied: "copied",
  },
  hero: {
    session: [
      { kind: "user", text: "who is alex cavazos and why should i care?" },
      { kind: "thinking", text: "Recruiter energy. Skip the adjectives, pull receipts." },
      {
        kind: "tool",
        call: {
          tool: "Bash",
          args: "git -C turboship/carrier rev-list --count HEAD",
          output: ["2047", "first commit 2023-11-14 · ~99.7% authored by alex"],
        },
      },
      {
        kind: "tool",
        call: {
          tool: "Bash",
          args: "psql -c \"select count(*), sum(billed_mxn) from network.shipments\"",
          output: [
            "orders   1,599,074     (Jul 2025 – Jul 2026)",
            "billed   ~$257.7M MXN  network GMV, not revenue",
            "across   9 white-label resellers · 852 businesses",
          ],
        },
      },
      {
        kind: "tool",
        call: {
          tool: "Bash",
          args: "systemctl list-timers 'hq-*'",
          output: ["18 timers listed · 6 agents", "each run: headless Claude Code driving a real Chrome"],
        },
      },
      {
        kind: "tool",
        call: {
          tool: "Bash",
          args: "hq leads stats",
          output: [
            "leads       7,549",
            "qualified   4,798",
            "countries   MX · CA · CO · BR",
            "agent runs  1,677 · cold emails sent ~1,700",
          ],
        },
      },
      {
        kind: "tool",
        call: {
          tool: "Bash",
          args: "pm2 ls --no-color | grep -c online",
          output: ["24"],
        },
      },
      {
        kind: "tool",
        call: {
          tool: "Bash",
          args: "tokscale --since 2025-12-01 --until 2026-07-31",
          output: ["~3.9B tokens · Claude Code, Codex, OpenCode", "peak day: 261M"],
        },
      },
      {
        kind: "say",
        text: "Short version: **Alex Cavazos** builds the whole product. Product, infra, and the agents that sell it. Then he runs it in prod.",
      },
      {
        kind: "say",
        text: "A shipping platform that processed **~1.6M shipments** across its network in 13 months. A WMS. A team of agents that found **7,549 leads** on its own. Next: **EventKit**.",
      },
      {
        kind: "say",
        text: "You were going to hire a team. He brings one: it runs on `systemd`.",
      },
    ],
    headline: "I ship companies, not features.",
    subhead:
      "Alex Cavazos — technical co-founder and AI builder in Monterrey, MX. First commit to production, alone: product, infra, and the AI agents that operate and sell it.",
    ctas: [
      { label: "Get the CV", href: "/cv", kind: "primary" },
      { label: EMAIL, href: LINKS.email, kind: "secondary" },
      { label: "/ships", href: "#ships", kind: "secondary" },
    ],
  },
  metrics: [
    { value: "~1.6M", label: "shipments processed across the network", sub: "13 months · 9 white-labels" },
    { value: "~$257.7M MXN", label: "billed across the platform", sub: "network GMV, not revenue" },
    { value: "7,549", label: "leads found by his agents", sub: "4,798 qualified · 4 countries" },
    { value: "~3.4k", label: "commits across 33 Turboship repos", sub: "nearly all his" },
    { value: "24", label: "production processes he runs himself", sub: "self-hosted, auto rollback" },
    { value: "~3.9B", label: "tokens through coding agents", sub: "7 months · peak day 261M" },
  ],
  sections: {
    ships: {
      cmd: "/ships",
      title: "What he ships",
      intro: "Built from the first commit, mostly solo. Statuses are honest.",
      products: [
        {
          name: "Turboship Carrier",
          company: "Turboship",
          status: "live",
          tagline: "Multi-carrier shipping SaaS. One codebase, one isolated instance per white-label.",
          points: [
            "~1.6M shipments, ~$257.7M MXN billed across the network in 13 months",
            "18 carriers via 47 integrations: FedEx, DHL, UPS, Estafeta, J&T…",
            "SPEI deposits with hourly reconciliation, CFDI e-invoicing, public REST API",
            "2,047 commits, ~99.7% his · ~192k hand-written lines of TypeScript",
            "New white-label environment provisioned by one AI-agent skill run",
          ],
          stack: ["TypeScript", "Vercel", "SPEI", "CFDI", "Mercado Pago", "WhatsApp Cloud API"],
        },
        {
          name: "HQ + browser agents",
          company: "Octagon Labs",
          status: "internal",
          tagline: "Ops console and control plane for autonomous browser agents.",
          points: [
            "6 agents on 18 systemd timers: find leads, enrich, read inboxes, send outreach",
            "7,549 leads, 4,798 qualified, across Mexico, Canada, Colombia and Brazil",
            "Replaced 3 legacy systems; migration passes 25/25 verification checks",
            "24 tables, 354 tests, a 25-command CLI. Agents never write SQL.",
          ],
          stack: ["Next.js 16", "Postgres", "BullMQ", "Claude Code", "Claude in Chrome", "systemd"],
        },
        {
          name: "EventKit",
          company: "Octagon Labs",
          url: LINKS.eventkit,
          status: "launching",
          featured: true,
          tagline: "Event ticketing for Latin American organizers.",
          points: [
            "RSVP and paid tickets, Openpay payments",
            "Apple & Google Wallet passes with rotating codes, QR check-in",
            "Inventory reservation enforced in the database: no overselling",
            "Locked-down Android entry-scanner kiosk in Kotlin / Jetpack Compose",
          ],
          stack: ["Openpay", "Apple Wallet", "Google Wallet", "Kotlin", "Jetpack Compose"],
        },
        {
          name: "Turboship WMS",
          company: "Turboship",
          url: LINKS.turboship,
          status: "live",
          tagline: "Warehouse, POS and online stores in one system.",
          points: [
            "Inventory ledger, cycle counts, manufacturing, POS, B2B customer portal",
            "Store builder on a Cloudflare Worker edge, custom domains, immutable publishes",
            "Every store serves `/llms.txt` and `/agents.md` so AI agents can read it",
            "1,088 commits, ~311k lines in ~15 months, ~95% his",
          ],
          stack: ["TypeScript", "Cloudflare Workers", "Socket.IO"],
        },
        {
          name: "Terpa terminal platform",
          company: "Terpa Solutions",
          tagline: "Multi-tenant management for card terminals in vending, parking and kiosks.",
          points: [
            "~1,227 of 1,272 commits, from the first one · ~166k lines, 77 data models",
            "Openpay, Mercado Pago, Pharos and Facturama CFDI integrations",
            "Socket.IO relay + Android client library pushing events to terminals",
            "Led ~10 engineers on the Android payment-terminal apps",
          ],
          stack: ["Next.js", "Prisma", "Postgres", "Redis", "BullMQ", "Socket.IO", "Sentry", "Android"],
        },
        {
          name: "FanKit",
          company: "Octagon Labs",
          url: LINKS.fankit,
          status: "live",
          tagline: "Digital loyalty cards that live in Apple & Google Wallet.",
          points: [
            "Openpay billing, SMS and email campaigns",
            "EN / ES / PT",
            "333 commits, ~53k lines, in production",
          ],
          stack: ["Apple Wallet", "Google Wallet", "Openpay"],
        },
        {
          name: "Timbra Chat",
          company: "Octagon Labs",
          tagline: "An AI agent that issues Mexican CFDI invoices.",
          points: [
            "Vision models read receipt photos and tax certificates",
            "Drives merchants' self-invoicing sites with a real browser",
            "Cheap-to-strong model chain with a $0.14 per-run cost cap",
            "207 commits in 23 days",
          ],
          stack: ["Vision models", "Browser agent", "Structured outputs"],
        },
      ],
    },
    agents: {
      cmd: "/agents",
      title: "The sales team is a cron job",
      intro:
        "6 agents, 18 systemd timers, a dedicated machine. Each run is headless Claude Code driving a real Chrome profile. The model gets a browser; the rules live in tested TypeScript.",
      log: [
        "timer fired → agent: discover · source: Google Maps",
        "lock acquired · agent ✓ · browser ✓",
        "signed-in account matches profile ✓",
        "jitter: randomized start delay applied",
        "chrome: browsing listings…",
        "wrote leads.json → hq leads import",
        "dedupe + scoring (TypeScript, not the model)",
        "agent: outreach · drafting cold email",
        "send guard: budget ✓ · banned phrases ✓",
        "run recorded · total agent runs: 1,677",
        "orphan net: sweeping runs the model abandoned",
        "git pull main · self-update every 5 min",
      ],
      guardrails: [
        "Agents never write SQL: they drive a browser, write JSON, call the CLI",
        "Per-agent and per-browser locks",
        "Signed-in-account checks before every run",
        "Randomized timing",
        "Database-backed pause switch, mirrored onto the timers",
        "Orphan net closes runs the model abandoned",
        "Outbound send guard, budgets and banned phrases in tested code",
        "GitOps: merge to main = deploy",
      ],
    },
    infra: {
      cmd: "/infra",
      title: "He's also the ops team",
      intro: "No platform team. One person who reads the logs and has restore-tested the backups.",
      items: [
        { k: "prod", v: "24 processes on a self-hosted server" },
        { k: "data", v: "Postgres 18 · Redis 8 · MinIO object storage" },
        { k: "ingress", v: "Cloudflare Tunnel" },
        { k: "ci/cd", v: "push to main, automatic rollback · 2 self-hosted GitHub Actions runners" },
        { k: "backups", v: "daily, verified, every DB + Redis + object store → NAS · restore tested" },
        { k: "agents", v: "dedicated machine · 6 agents · 18 systemd timers" },
        { k: "white-labels", v: "one codebase, isolated instance per reseller, provisioned by an agent skill" },
      ],
    },
    stack: {
      cmd: "/stack",
      title: "Boring, typed, fast",
      groups: STACK_GROUPS_EN,
    },
    history: {
      cmd: "/history",
      title: "Receipts since 2014",
      roles: [
        {
          title: "Co-Founder & CTO",
          company: "Octagon Labs",
          period: "Jan 2025 – Present",
          line: "Venture studio that builds and operates software companies. HQ, agents, EventKit, FanKit.",
        },
        {
          title: "Co-Founder & CTO",
          company: "Turboship",
          period: "Nov 2023 – Present",
          line: "Shipping tech. ~3.4k commits across 33 repos, nearly all his.",
        },
        {
          title: "Technical Advisor",
          company: "Terpa Solutions",
          period: "Aug 2026 – Present",
          line: "Advising the payments fintech whose platform he built.",
        },
        {
          title: "Head of Technology",
          company: "Terpa Solutions",
          period: "Apr 2024 – Jul 2026",
          line: "Built the terminal platform from commit one; led ~10 engineers; brought in AI code review.",
        },
        {
          title: "Software Engineer, Tech Lead — Partner Experience",
          company: "Caring",
          period: "Jan 2025 – May 2025",
          line: "Contract, remote.",
        },
        {
          title: "Software Engineer, Tech Lead — Full-Stack Web",
          company: "Able",
          period: "Nov 2021 – Dec 2024",
          line: "Contract, remote.",
        },
        {
          title: "Software Engineer — Consumer Web Platform",
          company: "PayPal",
          period: "Jan 2021 – Oct 2021",
          line: "Contract, remote.",
        },
        {
          title: "Remote Software Development & Consulting for US companies",
          company: "Independent",
          period: "2014 – 2020",
          line: "Remote.",
        },
      ],
      footnote: "Building in public on GitHub since 2014. First repos: CordovaBuild, SpaceShooter, MinecraftChat.",
    },
    cv: {
      cmd: "/cv",
      title: "The boring version",
      text: "Same receipts, fewer jokes. English and Spanish.",
      links: [
        { label: "Read online", href: "/cv" },
        { label: "PDF (English)", href: LINKS.cvPdfEn },
        { label: "PDF (Español)", href: LINKS.cvPdfEs },
      ],
    },
    contact: {
      cmd: "/contact",
      title: "Let's ship something",
      text: "Co-founder, CTO, or the person you call when it has to be in prod by Friday. He once shipped an enterprise client's monitoring app in one day. Email works best.",
      links: [
        { label: EMAIL, href: LINKS.email },
        { label: "github.com/alexkvazos", href: LINKS.github },
        { label: "in/alejandro-cavazos-76a488b9", href: LINKS.linkedin },
        { label: "x.com/alexcavazossh", href: LINKS.x },
      ],
    },
  },
  shell: {
    banner: [
      "alexcavazos.com — interactive shell",
      "no LLM here, just switch statements. type `help`.",
    ],
    help: [
      "help              this list",
      "whoami            the 10-second version",
      "ls                sections and companies",
      "cat cv            CV links",
      "open <name>       eventkit · turboship · fankit",
      "contact           how to reach him",
      "stack             what he builds with",
      "agents            the browser agents",
      "sudo hire alex    you know what this does",
      "clear             clear the screen",
      "/ships /agents /infra /stack /history /cv /contact",
    ],
    commands: [
      {
        name: "help",
        summary: "List commands",
        output: [],
      },
      {
        name: "whoami",
        summary: "Who is this",
        output: [
          "Alex Cavazos · Monterrey, MX",
          "Technical co-founder & AI builder.",
          "Co-Founder & CTO at Octagon Labs and Turboship.",
          "Ships product, infra and the AI agents that run and sell it.",
        ],
      },
      {
        name: "ls",
        summary: "List sections and companies",
        output: [
          "sections/   ships  agents  infra  stack  history  cv  contact",
          "turboship/  carrier  wms",
          "octagon/    hq  eventkit  fankit  timbra-chat",
          "terpa/      terminal-platform",
        ],
      },
      {
        name: "cat cv",
        summary: "CV links",
        output: [
          "online   /cv",
          `pdf en   ${LINKS.cvPdfEn}`,
          `pdf es   ${LINKS.cvPdfEs}`,
        ],
      },
      {
        name: "open eventkit",
        summary: "Open EventKit",
        output: [
          "EventKit — ticketing for Latin American organizers. Launching.",
          "Wallet passes, QR check-in, no overselling.",
          `→ ${LINKS.eventkit}`,
        ],
      },
      {
        name: "open turboship",
        summary: "Open Turboship",
        output: [
          "Turboship — shipping platform + WMS.",
          "~1.6M shipments processed across the network in 13 months.",
          `→ ${LINKS.turboship}`,
        ],
      },
      {
        name: "open fankit",
        summary: "Open FanKit",
        output: [
          "FanKit — loyalty cards in Apple & Google Wallet. In production.",
          `→ ${LINKS.fankit}`,
        ],
      },
      {
        name: "contact",
        summary: "Contact links",
        output: [
          `email     ${EMAIL}`,
          "github    github.com/alexkvazos",
          "linkedin  linkedin.com/in/alejandro-cavazos-76a488b9",
          "x         x.com/alexcavazossh",
        ],
      },
      {
        name: "stack",
        summary: "Preferred stack",
        output: [
          "TypeScript end to end · Next.js 16 / React 19 · Tailwind 4",
          "Postgres (Drizzle, Prisma) · Redis/Valkey + BullMQ · Socket.IO",
          "Vercel AI SDK · Claude · OpenAI · OpenRouter",
          "Kotlin/Compose · React Native/Expo",
          "Vercel · DigitalOcean · self-hosted · GitHub Actions",
        ],
      },
      {
        name: "agents",
        summary: "The browser agents",
        output: [
          "6 agents · 18 systemd timers · headless Claude Code + real Chrome",
          "7,549 leads · 4,798 qualified · 4 countries · 1,677 runs",
          "agents never write SQL. the guardrails are code.",
        ],
      },
      {
        name: "sudo hire alex",
        summary: "Hire Alex",
        output: [
          "[sudo] verifying recruiter… ok",
          "permission granted. opening a channel…",
          `→ mailto:${EMAIL}`,
        ],
      },
      {
        name: "clear",
        summary: "Clear the screen",
        output: [],
      },
      {
        name: "/ships",
        summary: "What he ships",
        output: [
          "Turboship Carrier · Turboship WMS · HQ + agents",
          "EventKit (launching) · FanKit · Timbra Chat · Terpa platform",
        ],
      },
      {
        name: "/agents",
        summary: "The browser agents",
        output: ["6 agents on 18 timers. 7,549 leads. Zero SQL written by a model."],
      },
      {
        name: "/infra",
        summary: "Infrastructure",
        output: [
          "24 prod processes · Postgres 18 · Redis 8 · MinIO",
          "push-to-main CI/CD, auto rollback · daily verified backups",
        ],
      },
      {
        name: "/stack",
        summary: "Stack",
        output: ["TypeScript end to end. Next.js, Postgres, Redis, BullMQ, AI SDK."],
      },
      {
        name: "/history",
        summary: "Experience",
        output: [
          "2025–now  Co-Founder & CTO · Octagon Labs",
          "2023–now  Co-Founder & CTO · Turboship",
          "2024–now  Terpa Solutions · Head of Tech → Technical Advisor",
          "2021–25   Caring · Able · PayPal (contract, remote)",
          "2014–20   Remote Software Development & Consulting for US companies",
        ],
      },
      {
        name: "/cv",
        summary: "CV",
        output: ["/cv · /alejandro-cavazos-cv-en.pdf · /alejandro-cavazos-cv-es.pdf"],
      },
      {
        name: "/contact",
        summary: "Contact",
        output: [`${EMAIL} · github.com/alexkvazos · x.com/alexcavazossh`],
      },
      {
        name: "rm -rf /",
        summary: "Easter egg",
        output: [
          "nice try.",
          "backups are daily, verified, and restore-tested.",
          "you'd lose a minute. he'd restore the latest daily backup.",
        ],
      },
      {
        name: "vim",
        summary: "Easter egg",
        output: [
          "you are now trapped in vim.",
          "kidding. type :q! — or just email him, it's faster.",
        ],
      },
      {
        name: "git blame",
        summary: "Easter egg",
        output: [
          "turboship/carrier: ~99.7% Alex Cavazos.",
          "blame accepted. credit too.",
        ],
      },
      {
        name: "exit",
        summary: "Easter egg",
        output: ["there is no exit. only `sudo hire alex`."],
      },
    ],
    notFound: "command not found: {cmd} — try `help`",
  },
};

// ---------------------------------------------------------------------------
// Español (MX)
// ---------------------------------------------------------------------------

const es: LanderContent = {
  meta: {
    title: "Alex Cavazos — No entrego features. Entrego empresas.",
    description:
      "Co-founder técnico y AI builder en Monterrey. Lleva productos del primer commit a producción él solo: producto, infra y los agentes de IA que los operan y venden.",
    ogTitle: "Alex Cavazos",
    ogSubtitle: "Cofundador técnico. Productos completos. Agentes incluidos.",
  },
  ui: {
    skip: "saltar",
    replay: "repetir",
    themeToggle: "cambiar tema",
    langSwitch: { label: "EN", href: "/" },
    promptPlaceholder: "escribe un comando — prueba `help`",
    copyEmail: "copiar correo",
    copied: "copiado",
  },
  hero: {
    session: [
      { kind: "user", text: "¿quién es alex cavazos y por qué me debería importar?" },
      { kind: "thinking", text: "Huele a recruiter. Cero adjetivos, puros números." },
      {
        kind: "tool",
        call: {
          tool: "Bash",
          args: "git -C turboship/carrier rev-list --count HEAD",
          output: ["2047", "primer commit 2023-11-14 · ~99.7% escrito por alex"],
        },
      },
      {
        kind: "tool",
        call: {
          tool: "Bash",
          args: "psql -c \"select count(*), sum(billed_mxn) from network.shipments\"",
          output: [
            "envíos     1,599,074     (jul 2025 – jul 2026)",
            "facturado  ~$257.7M MXN  GMV de la red, no ingresos",
            "en         9 white-labels · 852 empresas",
          ],
        },
      },
      {
        kind: "tool",
        call: {
          tool: "Bash",
          args: "systemctl list-timers 'hq-*'",
          output: ["18 timers · 6 agentes", "cada run: Claude Code headless manejando un Chrome real"],
        },
      },
      {
        kind: "tool",
        call: {
          tool: "Bash",
          args: "hq leads stats",
          output: [
            "leads        7,549",
            "calificados  4,798",
            "países       MX · CA · CO · BR",
            "runs         1,677 · cold emails enviados ~1,700",
          ],
        },
      },
      {
        kind: "tool",
        call: {
          tool: "Bash",
          args: "pm2 ls --no-color | grep -c online",
          output: ["24"],
        },
      },
      {
        kind: "tool",
        call: {
          tool: "Bash",
          args: "tokscale --since 2025-12-01 --until 2026-07-31",
          output: ["~3.9B tokens · Claude Code, Codex, OpenCode", "día pico: 261M"],
        },
      },
      {
        kind: "say",
        text: "Resumen: **Alex Cavazos** construye el producto completo. Producto, infra y los agentes que lo venden. Y luego lo opera en prod.",
      },
      {
        kind: "say",
        text: "Una plataforma de envíos que procesó **~1.6M envíos** en su red en 13 meses. Un WMS. Un equipo de agentes que encontró **7,549 leads** sola. Lo que sigue: **EventKit**.",
      },
      {
        kind: "say",
        text: "Ibas a contratar un equipo. Él ya trae uno: corre en `systemd`.",
      },
    ],
    headline: "No entrego features. Entrego empresas.",
    subhead:
      "Alex Cavazos — co-founder técnico y AI builder en Monterrey. Del primer commit a producción, solo: producto, infra y los agentes de IA que lo operan y lo venden.",
    ctas: [
      { label: "Ver el CV", href: "/es/cv", kind: "primary" },
      { label: EMAIL, href: LINKS.email, kind: "secondary" },
      { label: "/ships", href: "#ships", kind: "secondary" },
    ],
  },
  metrics: [
    { value: "~1.6M", label: "envíos procesados en la red", sub: "13 meses · 9 white-labels" },
    { value: "~$257.7M MXN", label: "facturados en la plataforma", sub: "GMV de la red, no ingresos" },
    { value: "7,549", label: "leads encontrados por sus agentes", sub: "4,798 calificados · 4 países" },
    { value: "~3.4k", label: "commits en 33 repos de Turboship", sub: "casi todos suyos" },
    { value: "24", label: "procesos en producción que él mismo opera", sub: "self-hosted, rollback automático" },
    { value: "~3.9B", label: "tokens en agentes de código", sub: "3.9 mil millones · 7 meses · pico 261M/día" },
  ],
  sections: {
    ships: {
      cmd: "/ships",
      title: "Lo que ha sacado",
      intro: "Hecho desde el primer commit, casi todo solo. Los estatus son honestos.",
      products: [
        {
          name: "Turboship Carrier",
          company: "Turboship",
          status: "live",
          tagline: "SaaS de envíos multi-paquetería. Un codebase, una instancia aislada por white-label.",
          points: [
            "~1.6M envíos y ~$257.7M MXN facturados en la red en 13 meses",
            "18 paqueterías vía 47 integraciones: FedEx, DHL, UPS, Estafeta, J&T…",
            "Depósitos SPEI con conciliación cada hora, CFDI, API REST pública",
            "2,047 commits, ~99.7% suyos · ~192k líneas de TypeScript a mano",
            "Un ambiente white-label nuevo se levanta con un solo run de un agent skill",
          ],
          stack: ["TypeScript", "Vercel", "SPEI", "CFDI", "Mercado Pago", "WhatsApp Cloud API"],
        },
        {
          name: "HQ + agentes de navegador",
          company: "Octagon Labs",
          status: "internal",
          tagline: "Consola de operación y control plane para agentes de navegador autónomos.",
          points: [
            "6 agentes en 18 timers de systemd: buscan leads, enriquecen, leen inbox, hacen outreach",
            "7,549 leads, 4,798 calificados, en México, Canadá, Colombia y Brasil",
            "Reemplazó 3 sistemas legacy; la migración pasa 25/25 checks",
            "24 tablas, 354 tests, un CLI de 25 comandos. Los agentes nunca escriben SQL.",
          ],
          stack: ["Next.js 16", "Postgres", "BullMQ", "Claude Code", "Claude in Chrome", "systemd"],
        },
        {
          name: "EventKit",
          company: "Octagon Labs",
          url: LINKS.eventkit,
          status: "launching",
          featured: true,
          tagline: "Boletaje para organizadores de eventos en Latinoamérica.",
          points: [
            "RSVP y boletos pagados, cobros con Openpay",
            "Pases en Apple y Google Wallet con códigos rotativos, check-in con QR",
            "Reserva de inventario a nivel base de datos: cero sobreventa",
            "Kiosco Android bloqueado para escanear en la entrada (Kotlin / Compose)",
          ],
          stack: ["Openpay", "Apple Wallet", "Google Wallet", "Kotlin", "Jetpack Compose"],
        },
        {
          name: "Turboship WMS",
          company: "Turboship",
          url: LINKS.turboship,
          status: "live",
          tagline: "Almacén, punto de venta y tiendas en línea en un solo sistema.",
          points: [
            "Kardex de inventario, conteos cíclicos, manufactura, POS, portal B2B",
            "Builder de tiendas en el edge de Cloudflare Workers, dominios propios",
            "Cada tienda expone `/llms.txt` y `/agents.md` para que la lean agentes de IA",
            "1,088 commits, ~311k líneas en ~15 meses, ~95% suyos",
          ],
          stack: ["TypeScript", "Cloudflare Workers", "Socket.IO"],
        },
        {
          name: "Plataforma de terminales Terpa",
          company: "Terpa Solutions",
          tagline: "Gestión multi-tenant de terminales de pago para vending, estacionamientos y kioscos.",
          points: [
            "~1,227 de 1,272 commits, desde el primero · ~166k líneas, 77 modelos",
            "Integraciones con Openpay, Mercado Pago, Pharos y Facturama (CFDI)",
            "Relay de Socket.IO + librería Android que empuja eventos a las terminales",
            "Lideró a ~10 ingenieros en las apps Android de terminales de pago",
          ],
          stack: ["Next.js", "Prisma", "Postgres", "Redis", "BullMQ", "Socket.IO", "Sentry", "Android"],
        },
        {
          name: "FanKit",
          company: "Octagon Labs",
          url: LINKS.fankit,
          status: "live",
          tagline: "Tarjetas de lealtad digitales que viven en Apple y Google Wallet.",
          points: [
            "Cobros con Openpay, campañas por SMS y email",
            "EN / ES / PT",
            "333 commits, ~53k líneas, en producción",
          ],
          stack: ["Apple Wallet", "Google Wallet", "Openpay"],
        },
        {
          name: "Timbra Chat",
          company: "Octagon Labs",
          tagline: "Un agente de IA que emite facturas CFDI.",
          points: [
            "Modelos de visión leen fotos de tickets y constancias fiscales",
            "Maneja los portales de autofacturación con un navegador real",
            "Cadena de modelos de barato a potente, tope de $0.14 por run",
            "207 commits en 23 días",
          ],
          stack: ["Modelos de visión", "Browser agent", "Structured outputs"],
        },
      ],
    },
    agents: {
      cmd: "/agents",
      title: "El equipo de ventas es un cron job",
      intro:
        "6 agentes, 18 timers de systemd, una máquina dedicada. Cada run es Claude Code headless manejando un perfil real de Chrome. Al modelo se le da un navegador; las reglas viven en TypeScript con tests.",
      log: [
        "timer disparado → agente: discover · fuente: Google Maps",
        "lock tomado · agente ✓ · navegador ✓",
        "la cuenta logueada coincide con el perfil ✓",
        "jitter: arranque con retraso aleatorio",
        "chrome: navegando resultados…",
        "escribió leads.json → hq leads import",
        "dedupe + scoring (TypeScript, no el modelo)",
        "agente: outreach · redactando cold email",
        "send guard: presupuesto ✓ · frases prohibidas ✓",
        "run registrado · total de runs: 1,677",
        "orphan net: cerrando runs que el modelo dejó tirados",
        "git pull main · auto-update cada 5 min",
      ],
      guardrails: [
        "Los agentes nunca escriben SQL: manejan un navegador, escriben JSON, llaman al CLI",
        "Locks por agente y por navegador",
        "Checa la cuenta logueada antes de cada run",
        "Tiempos aleatorios",
        "Pausa general en base de datos, reflejada en los timers",
        "Orphan net que cierra los runs que el modelo abandonó",
        "Send guard, presupuestos y frases prohibidas en código con tests",
        "GitOps: merge a main = deploy",
      ],
    },
    infra: {
      cmd: "/infra",
      title: "También es el equipo de ops",
      intro: "Sin platform team. Una persona que sí lee los logs y ya probó restaurar los backups.",
      items: [
        { k: "prod", v: "24 procesos en un servidor self-hosted" },
        { k: "datos", v: "Postgres 18 · Redis 8 · MinIO para object storage" },
        { k: "ingress", v: "Cloudflare Tunnel" },
        { k: "ci/cd", v: "push a main, rollback automático · 2 runners self-hosted de GitHub Actions" },
        { k: "backups", v: "diarios y verificados: cada DB, Redis y object store → NAS · restore probado" },
        { k: "agentes", v: "máquina dedicada · 6 agentes · 18 timers de systemd" },
        { k: "white-labels", v: "un codebase, instancia aislada por reseller, la levanta un agent skill" },
      ],
    },
    stack: {
      cmd: "/stack",
      title: "Aburrido, tipado y rápido",
      groups: STACK_GROUPS_ES,
    },
    history: {
      cmd: "/history",
      title: "Evidencia desde 2014",
      roles: [
        {
          title: "Co-Founder & CTO",
          company: "Octagon Labs",
          period: "ene 2025 – hoy",
          line: "Venture studio que construye y opera empresas de software. HQ, agentes, EventKit, FanKit.",
        },
        {
          title: "Co-Founder & CTO",
          company: "Turboship",
          period: "nov 2023 – hoy",
          line: "Tech de logística. ~3.4k commits en 33 repos, casi todos suyos.",
        },
        {
          title: "Asesor Técnico",
          company: "Terpa Solutions",
          period: "ago 2026 – hoy",
          line: "Asesora a la fintech de pagos cuya plataforma él construyó.",
        },
        {
          title: "Líder de Tecnología",
          company: "Terpa Solutions",
          period: "abr 2024 – jul 2026",
          line: "Construyó la plataforma desde el commit uno; lideró ~10 ingenieros; metió code review con IA.",
        },
        {
          title: "Software Engineer, Tech Lead — Partner Experience",
          company: "Caring",
          period: "ene 2025 – may 2025",
          line: "Contrato, remoto.",
        },
        {
          title: "Software Engineer, Tech Lead — Full-Stack Web",
          company: "Able",
          period: "nov 2021 – dic 2024",
          line: "Contrato, remoto.",
        },
        {
          title: "Software Engineer — Consumer Web Platform",
          company: "PayPal",
          period: "ene 2021 – oct 2021",
          line: "Contrato, remoto.",
        },
        {
          title: "Remote Software Development & Consulting for US companies",
          company: "Independiente",
          period: "2014 – 2020",
          line: "Remoto.",
        },
      ],
      footnote: "Construyendo en público en GitHub desde 2014. Primeros repos: CordovaBuild, SpaceShooter, MinecraftChat.",
    },
    cv: {
      cmd: "/cv",
      title: "La versión aburrida",
      text: "Los mismos números, menos chistes. En español e inglés.",
      links: [
        { label: "Ver en línea", href: "/es/cv" },
        { label: "PDF (Español)", href: LINKS.cvPdfEs },
        { label: "PDF (English)", href: LINKS.cvPdfEn },
      ],
    },
    contact: {
      cmd: "/contact",
      title: "Saquemos algo a producción",
      text: "Co-founder, CTO, o a quien le hablas cuando tiene que estar en prod el viernes. Una vez sacó la app de monitoreo de un cliente enterprise en un día. Mejor por correo.",
      links: [
        { label: EMAIL, href: LINKS.email },
        { label: "github.com/alexkvazos", href: LINKS.github },
        { label: "in/alejandro-cavazos-76a488b9", href: LINKS.linkedin },
        { label: "x.com/alexcavazossh", href: LINKS.x },
      ],
    },
  },
  shell: {
    banner: [
      "alexcavazos.com — shell interactivo",
      "aquí no hay LLM, puro switch. escribe `help`.",
    ],
    help: [
      "help              esta lista",
      "whoami            la versión de 10 segundos",
      "ls                secciones y empresas",
      "cat cv            links al CV",
      "open <nombre>     eventkit · turboship · fankit",
      "contact           cómo contactarlo",
      "stack             con qué construye",
      "agents            los agentes de navegador",
      "sudo hire alex    ya sabes qué hace",
      "clear             limpiar la pantalla",
      "/ships /agents /infra /stack /history /cv /contact",
    ],
    commands: [
      {
        name: "help",
        summary: "Lista de comandos",
        output: [],
      },
      {
        name: "whoami",
        summary: "Quién es",
        output: [
          "Alex Cavazos · Monterrey, MX",
          "Co-founder técnico y AI builder.",
          "Co-Founder & CTO en Octagon Labs y Turboship.",
          "Saca producto, infra y los agentes de IA que lo operan y venden.",
        ],
      },
      {
        name: "ls",
        summary: "Secciones y empresas",
        output: [
          "sections/   ships  agents  infra  stack  history  cv  contact",
          "turboship/  carrier  wms",
          "octagon/    hq  eventkit  fankit  timbra-chat",
          "terpa/      terminal-platform",
        ],
      },
      {
        name: "cat cv",
        summary: "Links al CV",
        output: [
          "en línea  /es/cv",
          `pdf es    ${LINKS.cvPdfEs}`,
          `pdf en    ${LINKS.cvPdfEn}`,
        ],
      },
      {
        name: "open eventkit",
        summary: "Abrir EventKit",
        output: [
          "EventKit — boletaje para organizadores en LatAm. En lanzamiento.",
          "Pases en Wallet, check-in con QR, cero sobreventa.",
          `→ ${LINKS.eventkit}`,
        ],
      },
      {
        name: "open turboship",
        summary: "Abrir Turboship",
        output: [
          "Turboship — plataforma de envíos + WMS.",
          "~1.6M envíos procesados en la red en 13 meses.",
          `→ ${LINKS.turboship}`,
        ],
      },
      {
        name: "open fankit",
        summary: "Abrir FanKit",
        output: [
          "FanKit — tarjetas de lealtad en Apple y Google Wallet. En prod.",
          `→ ${LINKS.fankit}`,
        ],
      },
      {
        name: "contact",
        summary: "Contacto",
        output: [
          `correo    ${EMAIL}`,
          "github    github.com/alexkvazos",
          "linkedin  linkedin.com/in/alejandro-cavazos-76a488b9",
          "x         x.com/alexcavazossh",
        ],
      },
      {
        name: "stack",
        summary: "Stack preferido",
        output: [
          "TypeScript de punta a punta · Next.js 16 / React 19 · Tailwind 4",
          "Postgres (Drizzle, Prisma) · Redis/Valkey + BullMQ · Socket.IO",
          "Vercel AI SDK · Claude · OpenAI · OpenRouter",
          "Kotlin/Compose · React Native/Expo",
          "Vercel · DigitalOcean · self-hosted · GitHub Actions",
        ],
      },
      {
        name: "agents",
        summary: "Los agentes de navegador",
        output: [
          "6 agentes · 18 timers · Claude Code headless + Chrome real",
          "7,549 leads · 4,798 calificados · 4 países · 1,677 runs",
          "los agentes nunca escriben SQL. los guardrails son código.",
        ],
      },
      {
        name: "sudo hire alex",
        summary: "Contratar a Alex",
        output: [
          "[sudo] verificando recruiter… ok",
          "permiso concedido. abriendo canal…",
          `→ mailto:${EMAIL}`,
        ],
      },
      {
        name: "clear",
        summary: "Limpiar pantalla",
        output: [],
      },
      {
        name: "/ships",
        summary: "Lo que ha sacado",
        output: [
          "Turboship Carrier · Turboship WMS · HQ + agentes",
          "EventKit (en lanzamiento) · FanKit · Timbra Chat · Terpa",
        ],
      },
      {
        name: "/agents",
        summary: "Los agentes de navegador",
        output: ["6 agentes en 18 timers. 7,549 leads. Cero SQL escrito por un modelo."],
      },
      {
        name: "/infra",
        summary: "Infraestructura",
        output: [
          "24 procesos en prod · Postgres 18 · Redis 8 · MinIO",
          "CI/CD con push a main, rollback automático · backups diarios",
        ],
      },
      {
        name: "/stack",
        summary: "Stack",
        output: ["TypeScript de punta a punta. Next.js, Postgres, Redis, BullMQ, AI SDK."],
      },
      {
        name: "/history",
        summary: "Experiencia",
        output: [
          "2025–hoy  Co-Founder & CTO · Octagon Labs",
          "2023–hoy  Co-Founder & CTO · Turboship",
          "2024–hoy  Terpa Solutions · Líder de Tecnología → Asesor Técnico",
          "2021–25   Caring · Able · PayPal (contrato, remoto)",
          "2014–20   Remote Software Development & Consulting for US companies",
        ],
      },
      {
        name: "/cv",
        summary: "CV",
        output: ["/es/cv · /alejandro-cavazos-cv-es.pdf · /alejandro-cavazos-cv-en.pdf"],
      },
      {
        name: "/contact",
        summary: "Contacto",
        output: [`${EMAIL} · github.com/alexkvazos · x.com/alexcavazossh`],
      },
      {
        name: "rm -rf /",
        summary: "Easter egg",
        output: [
          "buen intento.",
          "los backups son diarios, verificados y con restore probado.",
          "tú perderías un minuto. él restauraría el último backup diario.",
        ],
      },
      {
        name: "vim",
        summary: "Easter egg",
        output: [
          "ya quedaste atrapado en vim.",
          "es broma. escribe :q! — o mándale correo, es más rápido.",
        ],
      },
      {
        name: "git blame",
        summary: "Easter egg",
        output: [
          "turboship/carrier: ~99.7% Alex Cavazos.",
          "culpa aceptada. el crédito también.",
        ],
      },
      {
        name: "exit",
        summary: "Easter egg",
        output: ["no hay salida. nomás `sudo hire alex`."],
      },
    ],
    notFound: "comando no encontrado: {cmd} — prueba `help`",
  },
};

export const lander: Record<Locale, LanderContent> = { en, es };

/** Max characters per shell/tool output line (fits a phone-width terminal). */
export const MAX_LINE = 72;
