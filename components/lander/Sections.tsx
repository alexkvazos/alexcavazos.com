import type { ReactNode } from "react";
import type { LanderContent, Product, ProductStatus } from "@/content/lander";
import { EMAIL } from "@/content/lander";
import CopyEmail from "./CopyEmail";
import { Inline } from "./inline";
import type { LanderUi } from "./strings";

type Sections = LanderContent["sections"];

/** "> /ships" prompt box + heading. Every section starts like a command typed into the agent. */
export function SectionShell({
  id,
  cmd,
  title,
  intro,
  introClassName = "",
  children,
}: {
  id: string;
  cmd: string;
  title: string;
  intro?: string;
  introClassName?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="lander-section pt-20 sm:pt-24">
      <p className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-surface px-3 py-1.5 text-sm">
        <span className="text-accent" aria-hidden="true">
          &gt;
        </span>
        <span className="text-fg">{cmd}</span>
      </p>
      <div className="mt-5 sm:border-l sm:border-border sm:pl-6">
        <h2
          id={`${id}-title`}
          className="text-[1.6rem] leading-tight font-bold tracking-[-0.03em] text-balance text-fg sm:text-[2rem]"
        >
          {title}
        </h2>
        {intro && <p className={`mt-3 max-w-2xl text-[15px] leading-relaxed text-muted ${introClassName}`}>{intro}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

const STATUS_STYLE: Record<ProductStatus, { text: string; border: string; pulse: boolean }> = {
  live: { text: "text-success", border: "border-success/35", pulse: true },
  launching: { text: "text-accent", border: "border-accent/45", pulse: true },
  internal: { text: "text-muted", border: "border-border-strong", pulse: false },
};

function StatusBadge({ status, label }: { status: ProductStatus; label: string }) {
  const s = STATUS_STYLE[status];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border ${s.border} px-2 py-0.5 text-[11px] tracking-wide uppercase ${s.text}`}
    >
      <span className={`size-1.5 rounded-full bg-current ${s.pulse ? "dot-pulse" : ""}`} aria-hidden="true" />
      {label}
    </span>
  );
}

function hostOf(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function ProductCard({ p, ui }: { p: Product; ui: LanderUi }) {
  const featured = !!p.featured;
  return (
    <article
      className={`relative flex flex-col rounded-lg border p-5 sm:p-6 ${
        featured
          ? "featured-card border-accent/50 shadow-[0_0_0_1px_var(--accent-soft),0_30px_80px_-50px_var(--accent)] md:col-span-2"
          : "border-border bg-surface"
      }`}
    >
      {featured && <p className="mb-3 text-[11px] tracking-[0.18em] text-accent uppercase">★ {ui.featured}</p>}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className={`font-bold tracking-[-0.02em] text-fg ${featured ? "text-2xl sm:text-3xl" : "text-lg"}`}>
            {p.name}
          </h3>
          <p className="mt-0.5 text-xs text-subtle">{p.company}</p>
        </div>
        {p.status && <StatusBadge status={p.status} label={ui.status[p.status]} />}
      </div>
      <p className={`mt-4 leading-relaxed text-fg ${featured ? "text-base sm:text-lg" : "text-[14px]"}`}>{p.tagline}</p>
      <ul
        className={`mt-4 grid gap-x-8 gap-y-2 text-[13px] leading-relaxed text-muted ${featured ? "md:grid-cols-2" : ""}`}
      >
        {p.points.map((pt) => (
          <li key={pt} className="flex gap-2">
            <span className="text-subtle" aria-hidden="true">
              –
            </span>
            <span className="min-w-0">
              <Inline text={pt} tone="muted" />
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-5">
        <ul className="flex flex-wrap gap-1.5" aria-label="stack">
          {p.stack.map((s) => (
            <li key={s} className="rounded border border-border bg-surface-2 px-1.5 py-0.5 text-[11px] text-muted">
              {s}
            </li>
          ))}
        </ul>
        {p.url && (
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-4 inline-flex items-center gap-1.5 text-sm underline-offset-4 hover:underline ${
              featured ? "text-accent" : "text-info"
            }`}
          >
            {hostOf(p.url)}
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}

export function Ships({ s, ui }: { s: Sections["ships"]; ui: LanderUi }) {
  // Featured product (EventKit) leads, full width; the rest follow in content order.
  const products = [...s.products.filter((p) => p.featured), ...s.products.filter((p) => !p.featured)];
  return (
    <SectionShell id="ships" cmd={s.cmd} title={s.title} intro={s.intro}>
      <div className="grid gap-4 md:grid-cols-2">
        {products.map((p) => (
          <ProductCard key={p.name} p={p} ui={ui} />
        ))}
      </div>
    </SectionShell>
  );
}

function LogLines({ lines, copy }: { lines: string[]; copy?: boolean }) {
  return (
    <ol className={copy ? "log-copy" : undefined} aria-hidden={copy || undefined}>
      {lines.map((l, i) => {
        const [head, ...rest] = l.split(" · ");
        return (
          <li key={i} className="flex gap-3 py-[3px]">
            <span className="w-5 shrink-0 text-right text-subtle tabular-nums select-none" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 break-words">
              <span className="text-fg">{head}</span>
              {rest.length > 0 && <span className="text-muted"> · {rest.join(" · ")}</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function Agents({ s, ui }: { s: Sections["agents"]; ui: LanderUi }) {
  return (
    <SectionShell id="agents" cmd={s.cmd} title={s.title} intro={s.intro}>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-surface">
          <div className="flex items-center justify-between border-b border-border bg-surface-2 px-3 py-2 text-xs text-subtle">
            <span>
              <span className="text-success" aria-hidden="true">
                ●
              </span>{" "}
              tail -f {ui.logTitle}
            </span>
          </div>
          <div
            className="log-viewport relative min-h-72 flex-1 overflow-hidden px-3 py-2 text-[12.5px] leading-relaxed"
            tabIndex={0}
            role="region"
            aria-label={ui.logTitle}
          >
            <div className="log-track">
              <LogLines lines={s.log} />
              <LogLines lines={s.log} copy />
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4 sm:p-5">
          <h3 className="text-xs tracking-[0.14em] text-subtle uppercase">{ui.guardrailsTitle}</h3>
          <ul className="mt-4 space-y-2.5 text-[13.5px] leading-relaxed">
            {s.guardrails.map((g) => (
              <li key={g} className="flex gap-2.5">
                <span className="shrink-0 text-success" aria-hidden="true">
                  [✓]
                </span>
                <span className="text-fg">{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}

export function Infra({ s, ui }: { s: Sections["infra"]; ui: LanderUi }) {
  return (
    <SectionShell id="infra" cmd={s.cmd} title={s.title} intro={s.intro}>
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-3 py-2 text-xs text-subtle">
          <span className="rounded-sm bg-bg px-2 py-0.5 text-muted">{ui.infraFile}</span>
        </div>
        <dl className="divide-y divide-dashed divide-border text-[13.5px]">
          {s.items.map((it) => (
            <div key={it.k} className="grid gap-1 px-4 py-3 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-4">
              <dt className="text-accent">
                {it.k}
                <span className="text-subtle">:</span>
              </dt>
              <dd className="min-w-0 break-words text-fg">{it.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </SectionShell>
  );
}

export function Stack({ s }: { s: Sections["stack"] }) {
  return (
    <SectionShell id="stack" cmd={s.cmd} title={s.title}>
      <div className="space-y-4">
        {s.groups.map((g) => (
          <div key={g.name} className="grid gap-2 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4">
            <p className="pt-1 text-sm text-subtle">
              {g.name}
              <span aria-hidden="true">:</span>
            </p>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((it) => (
                <li
                  key={it}
                  className="rounded-md border border-border bg-surface px-2.5 py-1 text-[13px] text-fg transition-colors hover:border-accent/60"
                >
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function History({ s }: { s: Sections["history"] }) {
  return (
    <SectionShell id="history" cmd={s.cmd} title={s.title}>
      <ol className="relative text-[13.5px]">
        {s.roles.map((r, i) => (
          <li key={`${r.company}-${r.period}`} className="relative grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-3 pb-6">
            {/* graph rail */}
            <span aria-hidden="true" className="absolute top-5 bottom-0 left-[0.6rem] w-px bg-border-strong" />
            <span aria-hidden="true" className="relative z-10 pt-px text-center font-bold text-accent">
              *
            </span>
            <div className="min-w-0">
              <p className="leading-snug">
                <span className="font-bold text-fg">{r.title}</span>
                <span className="text-subtle"> · </span>
                <span className="text-fg">{r.company}</span>
                {i === 0 && (
                  <span className="ml-2 text-xs whitespace-nowrap">
                    <span className="text-subtle">(</span>
                    <span className="text-info">HEAD</span>
                    <span className="text-subtle"> → </span>
                    <span className="text-success">main</span>
                    <span className="text-subtle">)</span>
                  </span>
                )}
              </p>
              <p className="mt-1 text-xs text-accent tabular-nums">{r.period}</p>
              <p className="mt-1.5 leading-relaxed text-muted">{r.line}</p>
            </div>
          </li>
        ))}
        <li className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-3">
          <span aria-hidden="true" className="relative z-10 text-center text-subtle">
            ○
          </span>
          <p className="leading-relaxed text-subtle">{s.footnote}</p>
        </li>
      </ol>
    </SectionShell>
  );
}

export function CvBlock({ s, ui }: { s: Sections["cv"]; ui: LanderUi }) {
  return (
    <SectionShell id="cv" cmd={s.cmd} title={s.title} intro={s.text}>
      <div className="flex flex-wrap gap-3">
        {s.links.map((l, i) => {
          const pdf = l.href.endsWith(".pdf");
          return (
            <a
              key={l.href}
              href={l.href}
              {...(pdf ? { download: "" } : {})}
              className={`inline-flex h-11 items-center gap-2 rounded-md px-4 text-sm transition-colors ${
                i === 0
                  ? "bg-accent font-bold text-accent-fg hover:opacity-90"
                  : "border border-border-strong bg-surface text-fg hover:border-accent hover:text-accent"
              }`}
            >
              <span aria-hidden="true">{pdf ? "↓" : "→"}</span>
              {l.label}
              <span className="sr-only">{pdf ? ` (${ui.download})` : ""}</span>
            </a>
          );
        })}
      </div>
    </SectionShell>
  );
}

export function Contact({
  s,
  copyLabel,
  copiedLabel,
}: {
  s: Sections["contact"];
  copyLabel: string;
  copiedLabel: string;
}) {
  return (
    <SectionShell id="contact" cmd={s.cmd} title={s.title} intro={s.text}>
      <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface text-sm">
        {s.links.map((l) => {
          const isMail = l.href.startsWith("mailto:");
          const external = l.href.startsWith("http");
          const key = isMail ? "email" : (l.href.match(/(github|linkedin|x)\.com/)?.[1] ?? "link");
          return (
            <li
              key={l.href}
              className="grid grid-cols-[4.25rem_minmax(0,1fr)_auto] items-center gap-x-3 px-4 py-3 sm:grid-cols-[6rem_minmax(0,1fr)_auto]"
            >
              <span className="text-subtle">{key}</span>
              <a
                href={l.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer me" } : {})}
                className={`min-w-0 truncate underline-offset-4 hover:underline ${isMail ? "font-bold text-accent" : "text-fg"}`}
              >
                {l.label}
              </a>
              {isMail ? (
                <CopyEmail email={EMAIL} label={copyLabel} copied={copiedLabel} />
              ) : (
                <span className="text-subtle" aria-hidden="true">
                  ↗
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
