"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { BootLine } from "@/content/lander";

export const INTRO_PLAYED_KEY = "intro-played";
export const INTRO_REPLAY_EVENT = "intro:replay";

/**
 * Runs before first paint (inlined in the page): turns the intro on for the first visit of the session,
 * unless the visitor prefers reduced motion or landed on an #anchor. Without JS the intro never shows.
 */
export const INTRO_BOOT_SCRIPT = `(function(){try{if(location.hash)return;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;if(sessionStorage.getItem("${INTRO_PLAYED_KEY}"))return;document.documentElement.classList.add("intro")}catch(e){}})();`;

const TIMING = {
  start: 250,
  userChar: 26,
  afterUser: 320,
  argChar: 9,
  running: 360,
  afterOutput: 130,
  hold: 950,
  fade: 550,
};

type Phase = "typing" | "running" | "output";
type Progress = { line: number; typed: number; phase: Phase };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function Caret() {
  return <span className="intro-caret" aria-hidden="true" />;
}

/** Full-screen agent session that "builds" the page, then fades out to reveal it. */
export default function Intro({ lines, skip }: { lines: BootLine[]; skip: string }) {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [leaving, setLeaving] = useState(false);
  const runId = useRef(0);

  const finish = useCallback(async (id: number) => {
    if (id !== runId.current) return;
    runId.current++; // stops the running sequence
    try {
      sessionStorage.setItem(INTRO_PLAYED_KEY, "1");
    } catch {}
    setLeaving(true);
    await sleep(TIMING.fade);
    document.documentElement.classList.remove("intro");
    document.body.style.overflow = "";
    setLeaving(false);
    setProgress(null);
  }, []);

  const play = useCallback(async () => {
    const id = ++runId.current;
    const alive = () => id === runId.current;
    document.body.style.overflow = "hidden";
    setLeaving(false);
    setProgress({ line: -1, typed: 0, phase: "typing" });
    await sleep(TIMING.start);

    for (let i = 0; i < lines.length && alive(); i++) {
      const l = lines[i];
      if (!l) continue;
      const text = l.kind === "tool" ? l.args : l.text;
      const perChar = l.kind === "user" ? TIMING.userChar : l.kind === "tool" ? TIMING.argChar : 0;

      if (perChar) {
        for (let n = 0; n <= text.length && alive(); n++) {
          setProgress({ line: i, typed: n, phase: "typing" });
          await sleep(perChar);
        }
      }
      if (!alive()) return;
      if (l.kind === "user") {
        await sleep(TIMING.afterUser);
      } else if (l.kind === "tool") {
        setProgress({ line: i, typed: text.length, phase: "running" });
        await sleep(TIMING.running);
        setProgress({ line: i, typed: text.length, phase: "output" });
        await sleep(TIMING.afterOutput);
      } else {
        setProgress({ line: i, typed: text.length, phase: "output" });
        await sleep(TIMING.hold);
      }
    }
    if (alive()) await finish(id);
  }, [lines, finish]);

  // Start if the boot script turned the intro on; listen for "replay intro".
  useEffect(() => {
    const root = document.documentElement;
    let t: ReturnType<typeof setTimeout> | undefined;
    if (root.classList.contains("intro")) t = setTimeout(play, 0);
    const onReplay = () => {
      window.scrollTo(0, 0);
      root.classList.add("intro");
      play();
    };
    window.addEventListener(INTRO_REPLAY_EVENT, onReplay);
    return () => {
      clearTimeout(t);
      window.removeEventListener(INTRO_REPLAY_EVENT, onReplay);
    };
  }, [play]);

  // Any key, click, wheel or touch skips.
  useEffect(() => {
    if (!progress || leaving) return;
    const skipNow = () => finish(runId.current);
    const opts = { once: true, passive: true } as const;
    window.addEventListener("keydown", skipNow, opts);
    window.addEventListener("pointerdown", skipNow, opts);
    window.addEventListener("wheel", skipNow, opts);
    window.addEventListener("touchmove", skipNow, opts);
    return () => {
      window.removeEventListener("keydown", skipNow);
      window.removeEventListener("pointerdown", skipNow);
      window.removeEventListener("wheel", skipNow);
      window.removeEventListener("touchmove", skipNow);
    };
  }, [progress, leaving, finish]);

  const p = progress;
  return (
    <div className={`intro-overlay fixed inset-0 z-50 bg-bg ${leaving ? "intro-leaving" : ""}`} aria-hidden="true">
      <div className="mx-auto flex h-full max-w-[44rem] flex-col px-4 text-[14px] leading-[1.75] sm:px-6 sm:text-[15px]">
        <div className="py-6 text-[13px] text-subtle">
          alex@cavazos <span className="text-muted">~</span>
        </div>
        <div className="flex-1 space-y-3 pt-6 sm:pt-10">
          {(!p || p.line < 0) && (
            <p>
              <span className="mr-2 text-accent">&gt;</span>
              <Caret />
            </p>
          )}
          {p &&
            lines.slice(0, p.line + 1).map((l, i) => {
              const current = i === p.line;
              const typed = current ? p.typed : Infinity;
              const phase: Phase = current ? p.phase : "output";
              if (l.kind === "user")
                return (
                  <p key={i} className="text-fg">
                    <span className="mr-2 text-accent">&gt;</span>
                    {l.text.slice(0, typed)}
                    {current && <Caret />}
                  </p>
                );
              if (l.kind === "tool")
                return (
                  <div key={i}>
                    <p className="break-words">
                      <span
                        className={`mr-2 ${phase === "output" ? "text-subtle" : "intro-pulse text-tool"}`}
                      >
                        ●
                      </span>
                      <span className="text-tool">{l.tool}</span>
                      <span className="text-muted">({l.args.slice(0, typed)}</span>
                      {phase === "typing" ? <Caret /> : <span className="text-muted">)</span>}
                    </p>
                    {phase === "output" && (
                      <p className="grid grid-cols-[1.5rem_minmax(0,1fr)] text-subtle">
                        <span className="pl-1">⎿</span>
                        <span className={`break-words ${l.output.startsWith("✓") ? "text-ok" : ""}`}>
                          {l.output}
                        </span>
                      </p>
                    )}
                  </div>
                );
              return (
                <p key={i} className="intro-done pt-2 font-semibold text-ok">
                  <span className="mr-2">✓</span>
                  {l.text}
                </p>
              );
            })}
        </div>
        <p className="py-6 text-right text-[12px] text-subtle">{skip}</p>
      </div>
    </div>
  );
}

/** Subtle header button that plays the intro again. */
export function ReplayIntro({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(INTRO_REPLAY_EVENT))}
      title={label}
      aria-label={label}
      className="grid size-8 place-items-center rounded-md text-subtle transition-colors hover:bg-surface-2 hover:text-fg"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
