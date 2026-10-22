"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import type { LanderContent } from "@/content/lander";

type Entry = { id: number; kind: "cmd" | "out"; text: string };

const norm = (s: string) => s.trim().replace(/\s+/g, " ").toLowerCase();

const LINK_RE = /(https?:\/\/[^\s]+|mailto:[^\s]+|\/[\w./-]+\.pdf|(?<![\w/])\/(?:es\/)?cv(?![\w/]))/g;

/** Turns URLs, mailto:, PDF and CV paths into links. */
function Linkify({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const at = m.index ?? 0;
    if (at > last) parts.push(text.slice(last, at));
    const href = m[0];
    parts.push(
      <a
        key={at}
        href={href}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="underline decoration-border-strong underline-offset-4 hover:text-fg hover:decoration-fg"
      >
        {href.replace(/^mailto:/, "")}
      </a>,
    );
    last = at + href.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

/** The prompt at the bottom of the page: a few plain commands, history (↑↓) and Tab completion. */
export default function Shell({ shell, label }: { shell: LanderContent["shell"]; label: string }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState<number | null>(null);
  const nextId = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const names = ["help", "clear", ...shell.commands.map((c) => c.name)];

  useEffect(() => {
    if (entries.length) inputRef.current?.scrollIntoView({ block: "nearest" });
  }, [entries]);

  const push = (items: Omit<Entry, "id">[]) =>
    setEntries((prev) => [...prev, ...items.map((e) => ({ ...e, id: nextId.current++ }))]);

  const run = (raw: string) => {
    const cmd = norm(raw);
    setValue("");
    setHIndex(null);
    if (raw.trim()) setHistory((h) => (h[h.length - 1] === raw.trim() ? h : [...h, raw.trim()]));
    if (cmd === "clear") return setEntries([]);
    const echo = { kind: "cmd" as const, text: raw.trim() };
    if (!cmd) return push([echo]);
    const output =
      cmd === "help"
        ? shell.help
        : (shell.commands.find((c) => norm(c.name) === cmd)?.output ?? [shell.notFound.replace("{cmd}", raw.trim())]);
    push([echo, ...output.map((text) => ({ kind: "out" as const, text }))]);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    run(value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const i = hIndex === null ? history.length - 1 : Math.max(0, hIndex - 1);
      setHIndex(i);
      setValue(history[i] ?? "");
    } else if (e.key === "ArrowDown" && hIndex !== null) {
      e.preventDefault();
      const i = hIndex + 1;
      setHIndex(i >= history.length ? null : i);
      setValue(i >= history.length ? "" : (history[i] ?? ""));
    } else if (e.key === "Tab" && !e.shiftKey) {
      // Complete only when there is a unique match; otherwise Tab keeps moving focus.
      const v = value.trimStart().toLowerCase();
      const matches = v ? names.filter((n) => n.startsWith(v)) : [];
      if (matches.length !== 1) return;
      e.preventDefault();
      setValue(matches[0] ?? v);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    }
  };

  return (
    <div className="mt-16">
      <div role="log" aria-live="polite" aria-label={label} className="space-y-0.5">
        {entries.map((e) =>
          e.kind === "cmd" ? (
            <p key={e.id} className="break-words text-fg">
              <span className="mr-2 text-accent select-none" aria-hidden="true">
                $
              </span>
              {e.text}
            </p>
          ) : (
            <p key={e.id} className="break-words whitespace-pre-wrap text-muted">
              <Linkify text={e.text} />
            </p>
          ),
        )}
      </div>
      <form onSubmit={onSubmit} action="#" className="flex items-baseline">
        <label htmlFor="shell-input" className="mr-2 text-accent select-none">
          <span aria-hidden="true">$</span>
          <span className="sr-only">{label}</span>
        </label>
        <input
          ref={inputRef}
          id="shell-input"
          name="cmd"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setHIndex(null);
          }}
          onKeyDown={onKeyDown}
          placeholder={shell.placeholder}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="go"
          className="min-w-0 flex-1 bg-transparent text-fg caret-muted placeholder:text-subtle focus:outline-none"
        />
      </form>
    </div>
  );
}
