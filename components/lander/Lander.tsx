import type { ReactNode } from "react";
import { lander, type Company, type Link, type Step } from "@/content/lander";
import { LINKS, SITE_URL, absoluteUrl, localePath, type Locale } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";
import "./lander.css";

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
    email: LINKS.mailto,
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

function A({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer me" } : {})}
      {...(href.endsWith(".pdf") ? { download: "" } : {})}
      className={`underline decoration-border-strong underline-offset-4 transition-colors hover:text-fg hover:decoration-fg ${className}`}
    >
      {children}
    </a>
  );
}

/** A block that reads like a command typed at a prompt, followed by its output. */
function Block({ id, cmd, children }: { id: string; cmd: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-cmd`} className="mt-16">
      <h2 id={`${id}-cmd`} className="text-subtle">
        <span className="text-accent select-none" aria-hidden="true">
          ${" "}
        </span>
        {cmd}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function LinkRow({ links }: { links: Link[] }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-1 text-muted">
      {links.map((l) => (
        <li key={l.href}>
          <A href={l.href}>{l.label}</A>
        </li>
      ))}
    </ul>
  );
}

/** Hero: a short agent transcript. Fully server-rendered; lines fade in with CSS only (none with reduced motion). */
function Session({ steps, label }: { steps: Step[]; label: string }) {
  let line = 0;
  const next = () => ({ "--i": line++ }) as React.CSSProperties;
  return (
    <figure className="overflow-hidden rounded-md border border-border bg-surface text-[13px] leading-[1.7] sm:text-[13.5px]">
      <div className="flex items-center gap-3 border-b border-border px-4 py-2.5" aria-hidden="true">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
        </span>
        <span className="text-[12px] text-subtle">~/alex</span>
      </div>
      <figcaption className="sr-only">{label}</figcaption>
      <div className="space-y-3 px-4 py-4 sm:px-5">
        {steps.map((s, i) => {
          if (s.kind === "user")
            return (
              <p key={i} className="session-line text-fg" style={next()}>
                <span className="mr-2 text-accent select-none" aria-hidden="true">
                  &gt;
                </span>
                {s.text}
              </p>
            );
          if (s.kind === "tool")
            return (
              <div key={i}>
                <p className="session-line break-words" style={next()}>
                  <span className="mr-2 text-subtle select-none" aria-hidden="true">
                    ●
                  </span>
                  <span className="text-fg">{s.tool}</span>
                  <span className="text-muted">({s.args})</span>
                </p>
                {s.output.map((o) => (
                  <p key={o} className="session-line grid grid-cols-[1.5rem_minmax(0,1fr)] text-subtle" style={next()}>
                    <span className="pl-1 select-none" aria-hidden="true">
                      ⎿
                    </span>
                    <span className="break-words">{o}</span>
                  </p>
                ))}
              </div>
            );
          return (
            <p key={i} className="session-line grid grid-cols-[1rem_minmax(0,1fr)] gap-x-2 text-fg" style={next()}>
              <span className="text-accent select-none" aria-hidden="true">
                ●
              </span>
              <span>{s.text}</span>
            </p>
          );
        })}
      </div>
    </figure>
  );
}

/** Timeline node: a dot on the rail, the period above the content. */
function Node({
  period,
  hollow,
  className = "",
  children,
}: {
  period: string;
  hollow?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <li className={`relative pl-7 ${className}`}>
      <span
        aria-hidden="true"
        className={`absolute top-[0.55em] left-0 size-[9px] -translate-x-1/2 rounded-full ${
          hollow ? "border border-border-strong bg-bg" : "bg-muted"
        }`}
      />
      <p className="text-[12.5px] text-subtle tabular-nums">{period}</p>
      <div className="mt-1">{children}</div>
    </li>
  );
}

function CompanyEntry({ c }: { c: Company }) {
  return (
    <Node period={c.period} className="pb-14">
      <h3>
        <span className="font-semibold text-fg">{c.company}</span>
        <span className="text-muted"> · {c.role}</span>
      </h3>
      <p className="text-subtle">{c.about}</p>
      <ul className="mt-4 space-y-3">
        {c.items.map((it) => (
          <li key={it.text} className="text-muted">
            {it.name && (
              <>
                {it.href ? (
                  <A href={it.href} className="text-fg">
                    {it.name}
                  </A>
                ) : (
                  <span className="text-fg">{it.name}</span>
                )}
                {". "}
              </>
            )}
            {it.text}
          </li>
        ))}
      </ul>
    </Node>
  );
}

export default function Lander({ locale }: { locale: Locale }) {
  const c = lander[locale];
  const langs: Locale[] = ["en", "es"];

  return (
    <div className="mx-auto flex min-h-dvh max-w-[44rem] flex-col px-4 text-[14px] leading-[1.75] sm:px-6 sm:text-[15px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale)).replace(/</g, "\\u003c") }}
      />
      <a
        href="#main"
        className="sr-only rounded bg-fg px-3 py-2 text-bg focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50"
      >
        {c.ui.skipToContent}
      </a>

      <header className="flex items-center justify-between py-6 text-[13px] text-subtle">
        <a href={localePath(locale)} className="hover:text-fg">
          alex@cavazos <span className="text-muted">~</span>
        </a>
        <div className="flex items-center gap-3">
          <nav aria-label={c.ui.langLabel} className="flex gap-2">
            {langs.map((l) => (
              <a
                key={l}
                href={localePath(l)}
                hrefLang={l}
                lang={l}
                aria-current={l === locale ? "page" : undefined}
                className={l === locale ? "text-fg" : "hover:text-fg"}
              >
                {l}
              </a>
            ))}
          </nav>
          <ThemeToggle label={c.ui.themeToggle} />
        </div>
      </header>

      <main id="main" className="flex-1 pt-6 pb-20 sm:pt-10">
        <Session steps={c.session} label={c.ui.sessionLabel} />

        <Block id="whoami" cmd={c.intro.cmd}>
          <p className="font-semibold text-fg">{c.intro.name}</p>
          <h1 className="mt-2 text-[1.625rem] leading-tight font-semibold tracking-[-0.02em] text-balance text-fg sm:text-[2rem]">
            {c.intro.headline}
          </h1>
          <div className="mt-5 space-y-3 text-muted">
            {c.intro.lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
          <div className="mt-5">
            <LinkRow links={c.intro.links} />
          </div>
        </Block>

        <Block id="work" cmd={c.work.cmd}>
          <ol className="relative ml-1 before:absolute before:top-2 before:bottom-2 before:left-0 before:w-px before:bg-border">
            {c.work.companies.map((co) => (
              <CompanyEntry key={co.company} c={co} />
            ))}
            {c.work.earlier.map((r) => (
              <Node key={r.title + r.period} period={r.period} hollow className="pb-6 last:pb-0">
                <p className="text-muted">
                  {r.title}
                  {r.company && <span className="text-subtle"> · {r.company}</span>}
                </p>
              </Node>
            ))}
          </ol>
        </Block>

        <Block id="notes" cmd={c.notes.cmd}>
          <div className="space-y-3 text-muted">
            {c.notes.lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        </Block>

        <Block id="stack" cmd={c.stack.cmd}>
          <ul className="text-muted">
            {c.stack.lines.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </Block>

        <Block id="cv" cmd={c.cv.cmd}>
          <LinkRow links={c.cv.links} />
        </Block>

        <Block id="contact" cmd={c.contact.cmd}>
          <ul className="space-y-1 text-muted">
            {c.contact.links.map((l) => (
              <li key={l.href}>
                <A href={l.href}>{l.label}</A>
              </li>
            ))}
          </ul>
        </Block>

      </main>

      <footer className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-border py-6 text-[12px] text-subtle">
        <p>© 2026 Alejandro Cavazos · {c.ui.place}</p>
        <a href="/llms.txt" className="hover:text-fg">
          llms.txt
        </a>
      </footer>
    </div>
  );
}

export { Lander };
