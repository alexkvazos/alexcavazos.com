/**
 * Theme contract (see app/globals.css):
 * - No attribute  -> follows the OS (dark is the default terminal look, light via prefers-color-scheme).
 * - <html data-theme="dark" | "light"> -> explicit override, persisted in localStorage.
 *
 * A toggle component only needs to:
 *   document.documentElement.dataset.theme = next;
 *   try { localStorage.setItem(THEME_STORAGE_KEY, next) } catch {}
 */

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";

/** Inlined in <head> of each root layout so the saved theme applies before first paint. */
export const themeBootstrapScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t==="dark"||t==="light"){document.documentElement.dataset.theme=t;}}catch(e){}})();`;
