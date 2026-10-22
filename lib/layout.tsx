import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { fontVariables } from "./fonts";
import { DESCRIPTION, LINKS, SITE_NAME, SITE_URL, TITLE_TEMPLATE, themeBootstrapScript } from "./site";

/** Site-wide metadata defaults; pages override title/description/canonical. Icons come from app/ file conventions. */
export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: TITLE_TEMPLATE },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Alejandro Cavazos", url: SITE_URL }],
  creator: "Alejandro Cavazos",
  keywords: ["Alex Cavazos", "Alejandro Cavazos", "technical co-founder", "CTO", "Octagon Labs", "Turboship", "Monterrey"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: SITE_NAME,
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image", creator: LINKS.xHandle, site: LINKS.xHandle },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, address: false, email: false },
};

export const rootViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
  ],
};

/** <html>/<body> shell used by app/layout.tsx. */
export function RootDocument({ children }: { children: ReactNode }) {
  return (
    // data-theme (and the intro class) are set by inline scripts before hydration.
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      {/* Raw <head> + inline script so the saved theme applies before first paint (App Router, not next/head). */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body className="min-h-dvh bg-bg font-mono text-fg antialiased">{children}</body>
    </html>
  );
}
