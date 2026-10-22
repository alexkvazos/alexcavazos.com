"use client";

import { useEffect, useRef, useState } from "react";

export type NavItem = { id: string; label: string };

/**
 * Slash-command section nav. `rail` = desktop left rail, `chips` = mobile horizontal chips
 * (scrolls inside its own container, never the page). Highlights the section in view and
 * mirrors it into the window title ("alex@cavazos: ~/ships").
 */
export default function SectionNav({
  items,
  variant,
  label,
  titleTargetId,
}: {
  items: NavItem[];
  variant: "rail" | "chips";
  label: string;
  titleTargetId?: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    if (els.length === 0) return;
    const visible = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        const first = items.find((i) => visible.get(i.id));
        setActive(first ? first.id : null);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  // Window title + keep the active chip visible inside its own scroller.
  useEffect(() => {
    if (titleTargetId) {
      const t = document.getElementById(titleTargetId);
      if (t) t.textContent = active ? `~/${active}` : "~";
    }
    if (variant !== "chips" || !active) return;
    const list = listRef.current;
    const chip = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !chip) return;
    const left = chip.offsetLeft - list.clientWidth / 2 + chip.clientWidth / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [active, variant, titleTargetId]);

  if (variant === "rail") {
    return (
      <nav aria-label={label}>
        <ul className="space-y-0.5 text-sm">
          {items.map((i) => {
            const on = active === i.id;
            return (
              <li key={i.id}>
                <a
                  href={`#${i.id}`}
                  aria-current={on ? "location" : undefined}
                  className={`group flex items-center gap-2 rounded px-2 py-1.5 transition-colors ${
                    on ? "bg-accent-soft text-accent" : "text-muted hover:bg-surface hover:text-fg"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`w-2 ${on ? "text-accent" : "text-transparent group-hover:text-subtle"}`}
                  >
                    ›
                  </span>
                  {i.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label={label} className="relative">
      <ul ref={listRef} className="no-scrollbar chips-fade flex gap-1.5 overflow-x-auto px-4 py-2 text-xs sm:px-6">
        {items.map((i) => {
          const on = active === i.id;
          return (
            <li key={i.id} className="shrink-0">
              <a
                href={`#${i.id}`}
                data-id={i.id}
                aria-current={on ? "location" : undefined}
                className={`block rounded-full border px-3 py-1.5 transition-colors ${
                  on
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-border bg-surface text-muted hover:border-border-strong hover:text-fg"
                }`}
              >
                {i.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
