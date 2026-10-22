import { lander, type Metric } from "@/content/lander";
import { LINKS, SITE_URL, absoluteUrl, localePath, type Locale } from "@/lib/site";
import HeroSession from "./HeroSession";
import { Agents, Contact, CvBlock, History, Infra, SectionShell, Ships, Stack } from "./Sections";
import SectionNav, { type NavItem } from "./SectionNav";
import Shell from "./Shell";
import { SECTION_ORDER, SHELL_ID, UI } from "./strings";
import ThemeToggle from "./ThemeToggle";
import "./lander.css";

const PROMPT = "alex@cavazos:~$";
const SUGGESTIONS = ["whoami", "ls", "open eventkit", "git blame", "sudo hire alex", "rm -rf /"];

function personJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Alejandro Cavazos",
    alternateName: "Alex Cavazos",
    jobTitle: "Co-Founder & CTO",
    description: lander[locale].meta.description,
    url: absoluteUrl(locale, "/"),
    email: `mailto:${LINKS.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Monterrey",
      addressRegion: "Nuevo León",
      addressCountry: "MX",
    },
    knowsLanguage: ["es", "en"],
    sameAs: [LINKS.github, LINKS.linkedin, LINKS.x],
    worksFor: [
      { "@type": "Organization", name: "Octagon Labs" },
      { "@type": "Organization", name: "Turboship", url: "https://turboship.app" },
    ],
  };
}

function MetricValue({ value }: { value: string }) {
  const i = value.lastIndexOf(" ");
  if (i < 0) return <>{value}</>;
  return (
    <>
      {value.slice(0, i)}
      <span className="ml-1.5 text-[0.45em] font-semibold tracking-normal text-muted">{value.slice(i + 1)}</span>
    </>
  );
}

function Metrics({ metrics, label }: { metrics: Metric[]; label: string }) {
  return (
    <section aria-label={label} className="mt-16 sm:mt-20">
      <p className="mb-3 flex items-center gap-3 text-xs tracking-[0.16em] text-subtle uppercase">
        <span>{label}</span>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </p>
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
        {metrics.map((m) => (
          <div key={m.label} className="flex flex-col bg-surface p-4 sm:p-5">
            <dt className="order-2 mt-2 text-[12.5px] leading-snug text-fg sm:text-[13px]">{m.label}</dt>
            <dd className="order-1 text-[clamp(1.45rem,1rem+2.2vw,2.35rem)] leading-none font-extrabold tracking-[-0.04em] whitespace-nowrap text-accent tabular-nums">
              <MetricValue value={m.value} />
            </dd>
            {m.sub && <dd className="order-3 mt-1 text-[11.5px] leading-snug text-subtle">{m.sub}</dd>}
          </div>
        ))}
      </dl>
    </section>
  );
}

function TopBar({ locale, navItems }: { locale: Locale; navItems: NavItem[] }) {
  const c = lander[locale];
  const ui = UI[locale];
  const langs: Locale[] = ["en", "es"];
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70">
      <div className="mx-auto grid h-11 max-w-[1200px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <a href={localePath(locale)} className="truncate text-center text-xs text-muted hover:text-fg">
          <span className="text-fg">alex@cavazos</span>
          <span className="text-subtle">:</span>{" "}
          <span id="term-path" className="text-accent">
            ~
          </span>
        </a>
        <div className="flex items-center justify-end gap-1">
          <nav
            aria-label={ui.langLabel}
            className="flex items-center rounded-md border border-border p-0.5 text-[11px]"
          >
            {langs.map((l) => {
              const on = l === locale;
              return (
                <a
                  key={l}
                  href={on ? localePath(l) : c.ui.langSwitch.href}
                  hrefLang={l}
                  lang={l}
                  aria-current={on ? "page" : undefined}
                  title={ui.langName[l]}
                  className={`rounded px-1.5 py-0.5 uppercase transition-colors ${
                    on ? "bg-surface-2 text-fg" : "text-subtle hover:text-fg"
                  }`}
                >
                  {l}
                </a>
              );
            })}
          </nav>
          <ThemeToggle label={c.ui.themeToggle} />
        </div>
      </div>
      <div className="border-t border-border lg:hidden">
        <div className="mx-auto max-w-[1200px]">
          <SectionNav items={navItems} variant="chips" label={ui.navLabel} />
        </div>
      </div>
    </header>
  );
}

function Subhead({ text }: { text: string }) {
  const i = text.indexOf(" — ");
  if (i < 0) return <>{text}</>;
  return (
    <>
      <strong className="font-bold text-fg">{text.slice(0, i)}</strong>
      {text.slice(i)}
    </>
  );
}

export default function Lander({ locale }: { locale: Locale }) {
  const c = lander[locale];
  const ui = UI[locale];
  const sec = c.sections;
  const navItems: NavItem[] = [
    ...SECTION_ORDER.map((k) => ({ id: k, label: sec[k].cmd })),
    { id: SHELL_ID, label: ui.shellNav },
  ];
  const commandNames = new Set(c.shell.commands.map((x) => x.name));

  return (
    <div className="relative isolate min-h-dvh overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale)).replace(/</g, "\\u003c") }}
      />
      <a
        href="#main"
        className="sr-only z-50 rounded bg-accent px-3 py-2 text-accent-fg focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        {ui.skipToContent}
      </a>
      <div className="lander-backdrop" aria-hidden="true" />

      <TopBar locale={locale} navItems={navItems} />

      <main id="main" className="relative z-10">
        <div className="mx-auto max-w-[1200px] px-4 pt-6 sm:px-6 sm:pt-10 xl:pt-12">
          <HeroSession
            steps={c.hero.session}
            headline={c.hero.headline}
            subhead={<Subhead text={c.hero.subhead} />}
            ctas={c.hero.ctas}
            labels={{ skip: c.ui.skip, replay: c.ui.replay, session: ui.sessionLabel, transcript: ui.transcriptLabel }}
          />
        </div>

        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:grid lg:grid-cols-[168px_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-[76px] pt-16 sm:pt-20">
              <SectionNav items={navItems} variant="rail" label={ui.navLabel} titleTargetId="term-path" />
              <p className="mt-6 px-2 text-[11px] leading-relaxed text-subtle">
                <kbd className="rounded border border-border-strong px-1 text-muted">/</kbd> {ui.railHint}
              </p>
            </div>
          </aside>

          <div className="min-w-0 max-w-[880px] pb-24">
            <Metrics metrics={c.metrics} label={ui.metricsLabel} />

            <Ships s={sec.ships} ui={ui} />
            <Agents s={sec.agents} ui={ui} />
            <Infra s={sec.infra} ui={ui} />
            <Stack s={sec.stack} />
            <History s={sec.history} />
            <CvBlock s={sec.cv} ui={ui} />
            <Contact s={sec.contact} copyLabel={c.ui.copyEmail} copiedLabel={c.ui.copied} />

            <SectionShell
              id={SHELL_ID}
              cmd={ui.shellNav}
              title={ui.shellHeading}
              intro={ui.slashHint}
              introClassName="hidden sm:block"
            >
              <Shell
                inputId="shell-input"
                prompt={PROMPT}
                banner={c.shell.banner}
                help={c.shell.help}
                commands={c.shell.commands}
                notFound={c.shell.notFound}
                placeholder={c.ui.promptPlaceholder.replace(/`/g, "")}
                suggestions={SUGGESTIONS.filter((s) => commandNames.has(s))}
                sectionIds={SECTION_ORDER}
                labels={{
                  input: ui.shellInputLabel,
                  output: ui.shellOutputLabel,
                  hint: ui.shellHint,
                  tryLabel: ui.shellTry,
                  title: `${PROMPT.replace(/:~\$$/, "")} — ${ui.shellTitle}`,
                }}
              />
            </SectionShell>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-border bg-surface">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 text-[11px] text-subtle sm:px-6">
          <p className="flex items-center gap-3">
            <span className="rounded-sm bg-accent px-1.5 py-px font-bold text-accent-fg">alex</span>
            <span className="text-fg">0:lander*</span>
            <a href={localePath(locale, "/cv")} className="hover:text-fg">
              1:cv
            </a>
          </p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 whitespace-nowrap">
            <a href="/llms.txt" className="hover:text-fg">
              llms.txt
            </a>
            <span aria-hidden="true" className="hidden sm:inline">
              ·
            </span>
            <span>{ui.footerPlace}</span>
            <span aria-hidden="true" className="hidden sm:inline">
              ·
            </span>
            <span>© 2026 Alejandro Cavazos</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export { Lander };
