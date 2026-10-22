import type { Metadata } from "next";
import { cv, type CvContent, type CvRole } from "@/content/cv";
import { CV_PDF, OG_LOCALE, absoluteUrl, alternatesFor, localePath, otherLocale, type Locale } from "@/lib/site";
import s from "./cv.module.css";

/** Per-locale metadata for /cv and /es/cv (used by the two thin page wrappers). */
export function cvMetadata(locale: Locale): Metadata {
  const { meta } = cv[locale];
  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: alternatesFor(locale, "/cv"),
    robots: { index: true, follow: true },
    openGraph: {
      type: "profile",
      title: meta.title,
      description: meta.description,
      url: absoluteUrl(locale, "/cv"),
      locale: OG_LOCALE[locale],
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, creator: "@alexcavazossh" },
  };
}

function isExternal(href: string) {
  return href.startsWith("http");
}

function Contact({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} {...(isExternal(href) ? { rel: "me noopener" } : {})}>
      {label}
    </a>
  );
}

function Role({ role }: { role: CvRole }) {
  return (
    <article className={s.role}>
      <header className={s.roleHead}>
        <p className={s.company}>
          <strong>{role.company}</strong>
          {role.companyNote ? (
            <span className={s.companyNote}>
              <span className={s.noteDash}> — </span>
              {role.companyNote}
            </span>
          ) : null}
        </p>
        <p className={s.period}>{role.period}</p>
        <p className={s.title}>{role.title}</p>
        <p className={s.location}>{role.location}</p>
      </header>
      {role.bullets.length > 0 ? (
        <ul className={s.bullets}>
          {role.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

function CompactRole({ role }: { role: CvRole }) {
  return (
    <li className={s.compact}>
      <p className={s.compactMain}>
        <strong>{role.company}</strong>
        <span className={s.sep} aria-hidden="true">
          {" · "}
        </span>
        <span>{role.title}</span>
      </p>
      <p className={s.compactMeta}>
        <span className={s.compactLocation}>{role.location}</span>
        <span className={s.period}>{role.period}</span>
      </p>
    </li>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section className={s.section} aria-labelledby={id}>
      <h2 id={id} className={s.h2}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Sheet({ c }: { c: CvContent }) {
  const full = c.experience.filter((r) => r.bullets.length > 0);
  const compact = c.experience.filter((r) => r.bullets.length === 0);

  return (
    <main className={s.sheet}>
      <header className={s.header}>
        <div className={s.identity}>
          <h1 className={s.name}>{c.header.name}</h1>
          <p className={s.headline}>{c.header.headline}</p>
        </div>
        <ul className={s.contacts}>
          <li>{c.header.location}</li>
          {c.header.contacts.map((ct) => (
            <li key={ct.href}>
              <Contact {...ct} />
            </li>
          ))}
        </ul>
      </header>

      <Section id="cv-summary" title={c.labels.summary}>
        <p className={s.summary}>{c.summary}</p>
      </Section>

      <Section id="cv-experience" title={c.labels.experience}>
        {full.map((r) => (
          <Role key={`${r.company}-${r.period}`} role={r} />
        ))}
        {compact.length > 0 ? (
          <ul className={s.compactList}>
            {compact.map((r) => (
              <CompactRole key={`${r.company}-${r.period}`} role={r} />
            ))}
          </ul>
        ) : null}
      </Section>

      <Section id="cv-selected" title={c.labels.selected}>
        <ul className={s.products}>
          {c.selected.map((p) => (
            <li key={p.name}>
              <strong>{p.name}.</strong> {p.line}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="cv-skills" title={c.labels.skills}>
        <dl className={s.skills}>
          {c.skills.map((g) => (
            <div key={g.group} className={s.skillRow}>
              <dt>{g.group}</dt>
              <dd>{g.items}</dd>
            </div>
          ))}
          <div className={s.skillRow}>
            <dt>{c.labels.languages}</dt>
            <dd>{c.languages}</dd>
          </div>
        </dl>
        {c.earlier ? (
          <p className={s.earlier}>
            <strong>{c.labels.earlier}:</strong> {c.earlier}
          </p>
        ) : null}
      </Section>
    </main>
  );
}

export default function Cv({ locale }: { locale: Locale }) {
  const c = cv[locale];
  const other = otherLocale(locale);

  return (
    <div className={s.page}>
      <nav className={s.toolbar} aria-label="CV">
        <a href={localePath(locale, "/")} className={s.tool}>
          <span aria-hidden="true">←</span> {c.labels.backToSite}
        </a>
        <span className={s.toolSpacer} />
        <a href={c.labels.otherLang.href} hrefLang={other} lang={other} className={s.tool}>
          {c.labels.otherLang.label}
        </a>
        <a href={CV_PDF[locale]} className={`${s.tool} ${s.toolPrimary}`} type="application/pdf">
          {c.labels.download}
        </a>
      </nav>
      <Sheet c={c} />
    </div>
  );
}

export { Cv };
