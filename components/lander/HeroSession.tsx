"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { Cta, Step } from "@/content/lander";
import { parseInline, segLength, TypedSegs, type Seg } from "./inline";

/**
 * Hero transcript. Progressive enhancement:
 * - The server renders the FINAL transcript (readable without JS, and with reduced motion).
 * - An inline script adds `hero-anim` to <html> before first paint when the animation will run
 *   (JS on, no reduced motion, not yet played this session, no #hash); lander.css hides the lines
 *   until this component takes over (with a CSS failsafe that reveals them anyway).
 * - Every line is always rendered at its final size; unrevealed text is `visibility: hidden`,
 *   so the animation never shifts layout.
 */

const PLAYED_KEY = "hero-played";
const BUDGET_MS = 6000;
/** Side-by-side layout (Tailwind `lg`): the headline types alongside the transcript instead of after it. */
const WIDE_MQ = "(min-width: 1024px)";
/** When the headline starts on the side-by-side layout (before compression). */
const WIDE_HEAD_START_MS = 1200;

const HERO_SCRIPT = `(function(){try{var d=document.documentElement;if(location.hash)return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;if(sessionStorage.getItem("${PLAYED_KEY}"))return;d.classList.add("hero-anim")}catch(e){}})();`;

/** Inline script that runs during HTML parsing (type text/plain on the client, so it never re-runs). */
function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

type Span = { start: number; end: number };
type StepTiming = Span & { outStart?: number; outLine?: number; len?: number; segs?: Seg[] };
type Timeline = { steps: StepTiming[]; head: Span & { len: number }; sub: number; ctas: number; total: number };

function buildTimeline(steps: Step[], headline: string, parallelHead: boolean): Timeline {
  const D = {
    lead: 250,
    userChar: 26,
    afterUser: 260,
    thinking: 620,
    toolHead: 230,
    outLine: 70,
    toolGap: 110,
    sayChar: 5,
    sayGap: 180,
    headChar: 34,
    afterHead: 140,
    sub: 260,
    ctas: 240,
  };
  let t = D.lead;
  const out: StepTiming[] = steps.map((s) => {
    switch (s.kind) {
      case "user": {
        const len = s.text.length;
        const r = { start: t, end: t + len * D.userChar, len };
        t = r.end + D.afterUser;
        return r;
      }
      case "thinking": {
        const r = { start: t, end: t + D.thinking };
        t = r.end;
        return r;
      }
      case "tool": {
        const outStart = t + D.toolHead;
        const r = {
          start: t,
          outStart,
          outLine: D.outLine,
          end: outStart + s.call.output.length * D.outLine,
        };
        t = r.end + D.toolGap;
        return r;
      }
      case "say": {
        const segs = parseInline(s.text);
        const len = segLength(segs);
        const r = { start: t, end: t + len * D.sayChar, len, segs };
        t = r.end + D.sayGap;
        return r;
      }
    }
  });
  const transcriptEnd = t;
  const headStart = parallelHead ? Math.min(WIDE_HEAD_START_MS, transcriptEnd) : transcriptEnd;
  const head = { start: headStart, end: headStart + headline.length * D.headChar, len: headline.length };
  const sub = head.end + D.afterHead;
  const ctas = sub + D.sub;
  t = Math.max(transcriptEnd, ctas + D.ctas);

  // Compress uniformly so the whole hero stays within the budget.
  const k = Math.min(1, BUDGET_MS / t);
  const sc = (n: number) => n * k;
  return {
    steps: out.map((s) => ({
      ...s,
      start: sc(s.start),
      end: sc(s.end),
      outStart: s.outStart === undefined ? undefined : sc(s.outStart),
      outLine: s.outLine === undefined ? undefined : sc(s.outLine),
    })),
    head: { start: sc(head.start), end: sc(head.end), len: head.len },
    sub: sc(sub),
    ctas: sc(ctas),
    total: sc(t),
  };
}

// U+FE0E forces text presentation: without it "✳" falls back to a colour emoji font.
const SPINNER = ["·", "✢", "✳\uFE0E", "✶", "✻", "✽", "✻", "✶", "✳\uFE0E", "✢"];

function typedCount(span: Span & { len?: number }, t: number) {
  const len = span.len ?? 0;
  if (t >= span.end) return len;
  if (t <= span.start) return 0;
  return Math.round((len * (t - span.start)) / (span.end - span.start));
}

function Caret({ blink = false }: { blink?: boolean }) {
  // Zero-width anchor so the caret never changes line wrapping.
  return (
    <span className="relative inline-block h-0 w-0" aria-hidden="true">
      <span
        className={`caret absolute -bottom-[0.14em] left-[0.06em] h-[0.98em] w-[0.55em] bg-accent ${blink ? "caret-blink" : ""}`}
      />
    </span>
  );
}

/**
 * Aligned "key   value" output lines wrap under their value column (hanging indent in ch units),
 * so narrow screens keep the table look instead of wrapping to column 0.
 */
function hangingIndent(line: string): CSSProperties | undefined {
  const m = line.match(/^\S[^\s]*(?: \S+)?\s{2,}/);
  if (!m || m[0].length > 16) return undefined;
  const col = m[0].length;
  return { paddingLeft: `calc(${col}ch + 0.25rem)`, textIndent: `-${col}ch` };
}

/** The "⎿" connector, drawn with borders so it looks identical in every font. */
function Elbow() {
  return (
    <span
      aria-hidden="true"
      className="absolute top-[0.2em] left-[0.45ch] h-[0.75em] w-[0.95ch] rounded-bl-[3px] border-b border-l border-subtle/80"
    />
  );
}

export type HeroLabels = { skip: string; replay: string; session: string; transcript: string };

export default function HeroSession({
  steps,
  headline,
  subhead,
  ctas,
  labels,
}: {
  steps: Step[];
  headline: string;
  subhead: ReactNode;
  ctas: Cta[];
  labels: HeroLabels;
}) {
  // Non-breaking space before the last word, so the headline never ends on a lone word.
  const headText = useMemo(() => headline.replace(/ (\S+)$/, "\u00a0$1"), [headline]);
  const [wide, setWide] = useState(false);
  const tl = useMemo(() => buildTimeline(steps, headText, wide), [steps, headText, wide]);
  const headSegs = useMemo<Seg[]>(() => [{ k: "t", s: headText }], [headText]);

  // SSR + first client render: final state (matches the server HTML).
  const [mode, setMode] = useState<"final" | "anim">("final");
  const [t, setT] = useState(0);
  const [run, setRun] = useState(0);
  const [ready, setReady] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);
  const paneRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  const finish = useCallback(() => {
    setMode("final");
    try {
      document.documentElement.classList.remove("hero-anim");
    } catch {}
  }, []);

  /** Skip to the end and show the conclusion of the transcript. */
  const skipNow = useCallback(() => {
    finish();
    const pane = paneRef.current;
    if (pane) pane.scrollTop = pane.scrollHeight;
  }, [finish]);

  // Mount: decide whether to animate (state updates happen in a frame callback, not the effect body).
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const root = document.documentElement;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let played = false;
      try {
        played = sessionStorage.getItem(PLAYED_KEY) === "1";
      } catch {}
      const auto = root.classList.contains("hero-anim") && !played && !reduced;
      setCanAnimate(!reduced);
      setWide(window.matchMedia(WIDE_MQ).matches);
      setReady(true);
      if (auto) {
        try {
          sessionStorage.setItem(PLAYED_KEY, "1");
        } catch {}
        setT(0);
        setMode("anim");
      } else {
        root.classList.remove("hero-anim");
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Animation clock.
  useEffect(() => {
    if (mode !== "anim") return;
    let raf = 0;
    let t0 = -1;
    const tick = (now: number) => {
      if (t0 < 0) t0 = now;
      const el = now - t0;
      if (el >= tl.total) {
        finish();
        return;
      }
      setT(el);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mode, run, tl.total, finish]);

  // Any key / click / scroll skips the animation.
  useEffect(() => {
    if (mode !== "anim") return;
    const skip = (e: Event) => {
      // The skip/replay button handles its own activation (pointer, Enter, Space).
      const onControl = !!(e.target as Element | null)?.closest?.("[data-hero-control]");
      if (onControl && (e.type === "pointerdown" || ["Enter", " "].includes((e as KeyboardEvent).key))) return;
      skipNow();
    };
    const opts: AddEventListenerOptions = { passive: true };
    const events = ["keydown", "pointerdown", "wheel", "touchmove"] as const;
    events.forEach((e) => window.addEventListener(e, skip, opts));
    // Ignore the scroll event that may fire right as the page settles.
    const armScroll = window.setTimeout(() => window.addEventListener("scroll", skip, opts), 400);
    return () => {
      events.forEach((e) => window.removeEventListener(e, skip));
      window.removeEventListener("scroll", skip);
      window.clearTimeout(armScroll);
    };
  }, [mode, skipNow]);

  const replay = () => {
    const pane = paneRef.current;
    if (pane) pane.scrollTop = 0;
    setT(0);
    setRun((r) => r + 1);
    setMode("anim");
  };

  const anim = mode === "anim";
  const now = anim ? t : Number.POSITIVE_INFINITY;

  // Keep the newest revealed line in view inside the transcript pane (never scrolls the page).
  useEffect(() => {
    if (mode !== "anim") return;
    const pane = paneRef.current;
    if (!pane) return;
    let idx = -1;
    tl.steps.forEach((s, i) => {
      if (t >= s.start) idx = i;
    });
    const el = stepRefs.current[idx];
    if (!el) return;
    const bottom = el.offsetTop + el.offsetHeight + 16;
    if (bottom > pane.scrollTop + pane.clientHeight) pane.scrollTop = bottom - pane.clientHeight;
  }, [t, mode, tl.steps]);

  const shown = (at: number) => now >= at;
  const vis = (at: number) => (shown(at) ? "" : " invisible");
  const typingHead = anim && now >= tl.head.start && now < tl.head.end;
  const spinnerFrame = SPINNER[Math.floor(now / 90) % SPINNER.length] ?? "✻";
  const firstSay = steps.findIndex((x) => x.kind === "say");

  return (
    <div
      className="hero grid gap-10 lg:grid-cols-[minmax(0,1.22fr)_minmax(0,1fr)] lg:items-center lg:gap-10 xl:gap-14"
      data-ready={ready ? "" : undefined}
    >
      <InlineScript html={HERO_SCRIPT} />

      {/* Transcript pane */}
      <div className="min-w-0 overflow-hidden rounded-xl border border-border-strong bg-surface/80 pane-shadow backdrop-blur-sm">
        <div className="flex h-10 items-center justify-between gap-3 border-b border-border bg-surface-2/70 px-3 text-xs text-subtle sm:px-4">
          <span className="truncate">
            <span className={anim ? "text-accent" : "text-success"} aria-hidden="true">
              ●
            </span>{" "}
            {labels.session}
          </span>
          {ready && canAnimate && (
            <button
              type="button"
              data-hero-control=""
              onClick={anim ? skipNow : replay}
              className="shrink-0 rounded border border-border-strong px-2 py-0.5 text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {anim ? (
                <>
                  {labels.skip} <span className="hidden text-subtle sm:inline">· esc</span>
                </>
              ) : (
                <>
                  <span aria-hidden="true">↻</span> {labels.replay}
                </>
              )}
            </button>
          )}
        </div>

        <div
          ref={paneRef}
          tabIndex={0}
          role="region"
          aria-label={labels.transcript}
          aria-busy={anim || undefined}
          className="transcript-pane relative max-h-[24rem] overflow-y-auto overscroll-contain px-3 py-4 text-[12px] leading-[1.65] sm:max-h-[22rem] sm:px-5 sm:text-[13px] lg:max-h-[max(26rem,calc(100svh-9.5rem))]"
        >
          <div className="space-y-3">
            {steps.map((step, i) => {
              const s = tl.steps[i];
              if (!s) return null;
              const key = `${step.kind}-${i}`;
              const ref = (el: HTMLElement | null) => {
                stepRefs.current[i] = el;
              };
              if (step.kind === "user") {
                const n = typedCount(s, now);
                const typing = anim && now >= s.start && now < s.end + 200;
                return (
                  <p
                    key={key}
                    ref={ref}
                    className={`hl flex gap-2 rounded-md border border-border bg-bg/60 px-3 py-2 text-fg${vis(s.start)}`}
                  >
                    <span className="text-accent" aria-hidden="true">
                      &gt;
                    </span>
                    <span className="min-w-0">
                      <TypedSegs segs={[{ k: "t", s: step.text }]} n={n} caret={typing ? <Caret /> : null} />
                    </span>
                  </p>
                );
              }
              if (step.kind === "thinking") {
                const active = anim && now >= s.start && now < s.end;
                return (
                  <p key={key} ref={ref} className={`hl flex gap-2 text-subtle italic${vis(s.start)}`}>
                    <span
                      className={`w-[1ch] shrink-0 text-center not-italic ${active ? "text-accent" : ""}`}
                      aria-hidden="true"
                    >
                      {active ? spinnerFrame : "✻"}
                    </span>
                    <span>{step.text}</span>
                  </p>
                );
              }
              if (step.kind === "tool") {
                const running = anim && now >= s.start && now < s.end;
                const outStart = s.outStart ?? s.start;
                const outLine = s.outLine ?? 0;
                return (
                  <div key={key} ref={ref} className={`hl${vis(s.start)}`}>
                    <p className="flex gap-2">
                      <span
                        className={`w-[1ch] shrink-0 text-center text-info ${running ? "animate-pulse" : ""}`}
                        aria-hidden="true"
                      >
                        ●
                      </span>
                      <span className="min-w-0 break-words">
                        <span className="font-bold text-info">{step.call.tool}</span>
                        <span className="text-subtle">(</span>
                        <span className="text-fg">{step.call.args}</span>
                        <span className="text-subtle">)</span>
                      </span>
                    </p>
                    <div className="mt-0.5 text-muted">
                      {step.call.output.map((line, j) => (
                        <p key={j} className={`flex gap-2${vis(outStart + j * outLine)}`}>
                          <span className="relative w-[1ch] shrink-0" aria-hidden="true">
                            {j === 0 && <Elbow />}
                          </span>
                          <span className="min-w-0 pl-1 whitespace-pre-wrap break-words" style={hangingIndent(line)}>
                            {line}
                          </span>
                        </p>
                      ))}
                    </div>
                  </div>
                );
              }
              const first = i === firstSay;
              const segs = s.segs ?? parseInline(step.text);
              const n = typedCount(s, now);
              const typing = anim && now >= s.start && now < s.end;
              return (
                <p key={key} ref={ref} className={`hl flex gap-2 text-fg${first ? " pt-2" : ""}${vis(s.start)}`}>
                  <span
                    className={`w-[1ch] shrink-0 text-center ${first ? "text-fg" : "invisible"}`}
                    aria-hidden="true"
                  >
                    ●
                  </span>
                  <span className="min-w-0">
                    <TypedSegs segs={segs} n={n} caret={typing ? <Caret /> : null} />
                  </span>
                </p>
              );
            })}
          </div>
          {/* Fade hint that the capped pane scrolls. It sits in flow after the last line, so once the
              pane is scrolled to the end it covers only empty space, never the final line. */}
          <div
            aria-hidden="true"
            className="pointer-events-none sticky -bottom-4 -mx-3 h-8 bg-gradient-to-t from-surface to-transparent sm:-mx-5"
          />
        </div>
      </div>

      {/* Answer: headline, subhead, CTAs */}
      <div className="min-w-0">
        <h1
          className={`hl text-[clamp(2.2rem,1.2rem+4.4vw,4.5rem)] lg:text-[clamp(2.25rem,0.4rem+2.8vw,3rem)] leading-[1.02] font-extrabold tracking-[-0.045em] text-balance text-fg${vis(tl.head.start)}`}
        >
          <TypedSegs
            segs={headSegs}
            n={typedCount(tl.head, now)}
            caret={typingHead || !anim ? <Caret blink={!anim} /> : null}
          />
        </h1>

        <p className={`hl mt-6 max-w-2xl text-[15px] sm:text-base leading-relaxed text-muted${vis(tl.sub)}`}>
          {subhead}
        </p>

        <div className={`hl mt-8 flex flex-wrap items-center gap-3${vis(tl.ctas)}`}>
          {ctas.map((c) =>
            c.kind === "primary" ? (
              <a
                key={c.href}
                href={c.href}
                className="group inline-flex h-11 items-center gap-2 rounded-md bg-accent px-5 text-sm font-bold text-accent-fg shadow-[0_0_0_1px_var(--accent),0_10px_34px_-12px_var(--accent)] transition-transform hover:-translate-y-px"
              >
                {c.label}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            ) : (
              <a
                key={c.href}
                href={c.href}
                className="inline-flex h-11 items-center rounded-md border border-border-strong bg-surface px-4 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
              >
                {c.label}
              </a>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
