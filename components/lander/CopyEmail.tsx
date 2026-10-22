"use client";

import { useEffect, useState } from "react";

export default function CopyEmail({ email, label, copied }: { email: string; label: string; copied: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const id = window.setTimeout(() => setDone(false), 1800);
    return () => window.clearTimeout(id);
  }, [done]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setDone(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      title={label}
      className="inline-flex h-8 items-center gap-1.5 rounded border border-border-strong px-2.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
    >
      <span aria-hidden="true">{done ? "✓" : "⧉"}</span>
      <span aria-live="polite" className={done ? "" : "sr-only sm:not-sr-only"}>
        {done ? copied : label}
      </span>
    </button>
  );
}
