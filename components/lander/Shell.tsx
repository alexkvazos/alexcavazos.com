"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import type { Command } from "@/content/lander";

type Entry = { id: number; kind: "cmd" | "out" | "err" | "banner"; text: string };

export type ShellProps = {
  inputId: string;
  prompt: string;
  banner: string[];
  help: string[];
  commands: Command[];
  notFound: string;
  placeholder: string;
  suggestions: string[];
  labels: { input: string; output: string; hint: string; tryLabel: string; title: string };
  /** Slash commands that map to on-page sections (e.g. "/ships" -> "#ships"). */
  sectionIds: string[];
};

const norm = (s: string) => s.trim().replace(/\s+/g, " ").toLowerCase();

// A bare /cv path links, except inside a list of slash commands ("/history /cv /contact").
const LINK_RE = /(https?:\/\/[^\s]+|mailto:[^\s]+|\/[\w./-]+\.pdf|(?<![\w/]|\/\w+ )\/(?:es\/)?cv(?![\w/]| \/))/g;
const CODE_RE = /`([^`]+)`/g;

/** Turns URLs, mailto:, PDF and CV paths into links; `code` into highlighted spans. */
function ShellText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let i = 0;
  const pushCode = (chunk: string) => {
    let last = 0;
    for (const m of chunk.matchAll(CODE_RE)) {
      const at = m.index ?? 0;
      if (at > last) parts.push(chunk.slice(last, at));
      parts.push(
        <code key={`c${i++}`} className="text-info">
          {m[1]}
        </code>,
      );
      last = at + m[0].length;
    }
    if (last < chunk.length) parts.push(chunk.slice(last));
  };
  let last = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const at = m.index ?? 0;
    if (at > last) pushCode(text.slice(last, at));
    const href = m[0];
    const external = href.startsWith("http");
    parts.push(
      <a
        key={`l${i++}`}
        href={href}
        className="text-info underline decoration-info/40 underline-offset-4 hover:decoration-info"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {href}
      </a>,
    );
    last = at + href.length;
  }
  if (last < text.length) pushCode(text.slice(last));
  return <>{parts}</>;
}

/** "alex@cavazos:~$" — the user@host part is hidden on narrow screens to leave room to type. */
function Prompt({ prompt }: { prompt: string }) {
  const i = prompt.lastIndexOf(":");
  return (
    <span className="text-success">
      {i > 0 && <span className="hidden sm:inline">{prompt.slice(0, i + 1)}</span>}
      {i > 0 ? prompt.slice(i + 1) : prompt}
    </span>
  );
}

function commonPrefix(xs: string[]): string {
  if (xs.length === 0) return "";
  let p = xs[0] ?? "";
  for (const x of xs) while (!x.startsWith(p)) p = p.slice(0, -1);
  return p;
}

export default function Shell({
  inputId,
  prompt,
  banner,
  help,
  commands,
  notFound,
  placeholder,
  suggestions,
  labels,
  sectionIds,
}: ShellProps) {
  const initial = (): Entry[] => banner.map((text, i) => ({ id: i, kind: "banner", text }));
  const [entries, setEntries] = useState<Entry[]>(initial);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState<number | null>(null);
  const nextId = useRef(banner.length);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const names = commands.map((c) => c.name);

  // Keep the newest output in view (inside the shell's own scroll box only).
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  // "/" anywhere focuses the shell and starts a slash command.
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      e.preventDefault();
      const input = inputRef.current;
      if (!input) return;
      setValue("/");
      input.focus({ preventScroll: true });
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      boxRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const push = (items: Omit<Entry, "id">[]) =>
    setEntries((prev) => [...prev, ...items.map((e) => ({ ...e, id: nextId.current++ }))]);

  const run = (raw: string) => {
    const cmd = norm(raw);
    if (raw.trim()) {
      setHistory((h) => (h[h.length - 1] === raw.trim() ? h : [...h, raw.trim()]));
    }
    setHIndex(null);
    setValue("");
    if (!cmd) {
      push([{ kind: "cmd", text: "" }]);
      return;
    }
    if (cmd === "clear") {
      setEntries([]);
      return;
    }
    const echo: Omit<Entry, "id"> = { kind: "cmd", text: raw.trim() };
    if (cmd === "help") {
      push([echo, ...help.map((text) => ({ kind: "out" as const, text }))]);
      return;
    }
    const found = commands.find((c) => norm(c.name) === cmd);
    if (!found) {
      push([echo, { kind: "err", text: notFound.replace("{cmd}", raw.trim()) }]);
      return;
    }
    push([echo, ...found.output.map((text) => ({ kind: "out" as const, text }))]);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (cmd.startsWith("/")) {
      const id = cmd.slice(1);
      if (sectionIds.includes(id)) {
        window.setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
          window.history.replaceState(null, "", `#${id}`);
        }, 350);
      }
    } else if (cmd === "sudo hire alex") {
      const mail = found.output.join(" ").match(/mailto:[^\s]+/)?.[0];
      if (mail) window.setTimeout(() => (window.location.href = mail), 900);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    run(value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      if (history.length === 0) return;
      e.preventDefault();
      const i = hIndex === null ? history.length - 1 : Math.max(0, hIndex - 1);
      setHIndex(i);
      setValue(history[i] ?? "");
    } else if (e.key === "ArrowDown") {
      if (hIndex === null) return;
      e.preventDefault();
      const i = hIndex + 1;
      if (i >= history.length) {
        setHIndex(null);
        setValue("");
      } else {
        setHIndex(i);
        setValue(history[i] ?? "");
      }
    } else if (e.key === "Tab" && !e.shiftKey) {
      // Only complete when there is something to complete; otherwise Tab keeps moving focus.
      const v = value.replace(/^\s+/, "").toLowerCase();
      if (!v) return;
      const matches = names.filter((n) => n.toLowerCase().startsWith(v));
      if (matches.length === 0) return;
      e.preventDefault();
      if (matches.length === 1) {
        setValue(matches[0] ?? v);
      } else {
        const p = commonPrefix(matches.map((m) => m.toLowerCase()));
        if (p.length > v.length) setValue(p);
        else
          push([
            { kind: "cmd", text: value },
            { kind: "out", text: matches.join("   ") },
          ]);
      }
    } else if (e.key === "Escape") {
      setValue("");
      setHIndex(null);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    }
  };

  return (
    <div
      ref={boxRef}
      className="overflow-hidden rounded-lg border border-border-strong bg-surface pane-shadow transition-colors focus-within:border-accent focus-within:ring-1 focus-within:ring-accent"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a,button")) return;
        if (window.getSelection()?.toString()) return;
        inputRef.current?.focus({ preventScroll: true });
      }}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border bg-surface-2 px-3 py-2 text-xs text-subtle">
        <span className="truncate">{labels.title}</span>
        <span className="hidden truncate sm:inline">{labels.hint}</span>
      </div>

      <div
        ref={scrollRef}
        className="max-h-[22rem] min-h-[12rem] overflow-y-auto px-3 py-3 text-[13px] leading-relaxed sm:px-4 sm:text-sm"
      >
        <div role="log" aria-live="polite" aria-relevant="additions" aria-label={labels.output}>
          {entries.map((e) =>
            e.kind === "cmd" ? (
              <p key={e.id} className="break-words whitespace-pre-wrap">
                <Prompt prompt={prompt} /> <span className="text-fg">{e.text}</span>
              </p>
            ) : (
              <p
                key={e.id}
                className={`break-words whitespace-pre-wrap ${
                  e.kind === "err" ? "text-danger" : e.kind === "banner" ? "text-subtle" : "text-muted"
                }`}
              >
                <ShellText text={e.text} />
              </p>
            ),
          )}
        </div>

        <form onSubmit={onSubmit} className="mt-1 flex items-center gap-2" action="#">
          <label htmlFor={inputId} className="shrink-0 text-success">
            <span aria-hidden="true">
              <Prompt prompt={prompt} />
            </span>
            <span className="sr-only">{labels.input}</span>
          </label>
          <input
            ref={inputRef}
            id={inputId}
            name="cmd"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setHIndex(null);
            }}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="go"
            className="shell-input min-w-0 flex-1 rounded-sm bg-transparent py-1 text-fg caret-accent placeholder:text-subtle focus:outline-none focus-visible:outline-none"
          />
        </form>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-border px-3 py-2.5 text-xs">
        <span className="text-subtle">{labels.tryLabel}:</span>
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              run(s);
              inputRef.current?.focus({ preventScroll: true });
            }}
            className="rounded border border-border bg-bg px-2 py-1 text-muted transition-colors hover:border-accent hover:text-accent"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
