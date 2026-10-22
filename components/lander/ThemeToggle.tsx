"use client";

import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

/** Flips dark/light and persists it. The icon is chosen by CSS (lander.css), so SSR never mismatches. */
export default function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const current: Theme =
      root.dataset.theme === "light" || root.dataset.theme === "dark"
        ? (root.dataset.theme as Theme)
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
    const next: Theme = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="theme-toggle grid size-8 place-items-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-fg"
    >
      {/* moon: shown in dark theme */}
      <svg className="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
      {/* sun: shown in light theme */}
      <svg className="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
