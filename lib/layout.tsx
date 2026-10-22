import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { fontVariables } from "./fonts";
import {
  DEFAULT_DESCRIPTION,
  OG_LOCALE,
  SITE_NAME,
  SITE_URL,
  TITLE_TEMPLATE,
  themeBootstrapScript,
  type Locale,
} from "./site";

/** Metadata defaults shared by both root layouts; pages override title/description/alternates. */
export function rootMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: SITE_NAME, template: TITLE_TEMPLATE },
    description: DEFAULT_DESCRIPTION[locale],
    applicationName: SITE_NAME,
    authors: [{ name: "Alejandro Cavazos", url: SITE_URL }],
    creator: "Alejandro Cavazos",
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      alternateLocale: Object.values(OG_LOCALE).filter((l) => l !== OG_LOCALE[locale]),
    },
    twitter: { card: "summary_large_image", creator: "@alexcavazossh" },
    formatDetection: { telephone: false, address: false, email: false },
  };
}

export const rootViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
  ],
};

/** <html>/<body> shell used by app/(en)/layout.tsx and app/(es)/layout.tsx. */
export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    // data-theme is set by the bootstrap script before hydration.
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      {/* Raw <head> + inline script so the saved theme applies before first paint (App Router, not next/head). */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body className="min-h-dvh bg-bg font-mono text-fg antialiased">{children}</body>
    </html>
  );
}
