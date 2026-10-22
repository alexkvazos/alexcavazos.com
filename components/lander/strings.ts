import type { Locale } from "@/lib/site";
import type { ProductStatus, SectionKey } from "@/content/lander";

/**
 * UI chrome strings for the lander (labels, hints, aria text).
 * No claims about Alex live here; every claim comes from content/lander.ts.
 */
export type LanderUi = {
  skipToContent: string;
  navLabel: string;
  shellNav: string;
  metricsLabel: string;
  sessionLabel: string;
  transcriptLabel: string;
  featured: string;
  status: Record<ProductStatus, string>;
  logTitle: string;
  guardrailsTitle: string;
  infraFile: string;
  shellTitle: string;
  shellHeading: string;
  shellHint: string;
  shellInputLabel: string;
  shellOutputLabel: string;
  shellTry: string;
  slashHint: string;
  railHint: string;
  langLabel: string;
  langName: Record<Locale, string>;
  footerPlace: string;
  download: string;
};

export const UI: Record<Locale, LanderUi> = {
  en: {
    skipToContent: "Skip to content",
    navLabel: "Sections",
    shellNav: "~$ shell",
    metricsLabel: "by the numbers",
    sessionLabel: "~/alex · session",
    transcriptLabel: "Agent session about Alex Cavazos",
    featured: "featured",
    status: { live: "live", launching: "launching", internal: "internal" },
    logTitle: "agent.log",
    guardrailsTitle: "guardrails (enforced in code)",
    infraFile: "infra.yaml",
    shellTitle: "interactive shell",
    shellHeading: "Ask the shell",
    shellHint: "↑↓ history · tab completes · enter runs",
    shellInputLabel: "Shell command",
    shellOutputLabel: "Shell output",
    shellTry: "try",
    slashHint: "press / anywhere to type",
    railHint: "to type a command",
    langLabel: "Language",
    langName: { en: "English", es: "Español" },
    footerPlace: "Monterrey, MX",
    download: "download",
  },
  es: {
    skipToContent: "Saltar al contenido",
    navLabel: "Secciones",
    shellNav: "~$ shell",
    metricsLabel: "en números",
    sessionLabel: "~/alex · sesión",
    transcriptLabel: "Sesión de agente sobre Alex Cavazos",
    featured: "destacado",
    status: { live: "en vivo", launching: "lanzamiento", internal: "interno" },
    logTitle: "agent.log",
    guardrailsTitle: "guardrails (en código)",
    infraFile: "infra.yaml",
    shellTitle: "shell interactivo",
    shellHeading: "Pregúntale al shell",
    shellHint: "↑↓ historial · tab completa · enter ejecuta",
    shellInputLabel: "Comando del shell",
    shellOutputLabel: "Salida del shell",
    shellTry: "prueba",
    slashHint: "presiona / en cualquier lado",
    railHint: "para escribir un comando",
    langLabel: "Idioma",
    langName: { en: "English", es: "Español" },
    footerPlace: "Monterrey, MX",
    download: "descargar",
  },
};

/** Section render order; the DOM id of each section equals its key. */
export const SECTION_ORDER: SectionKey[] = ["ships", "agents", "infra", "stack", "history", "cv", "contact"];

export const SHELL_ID = "shell";
