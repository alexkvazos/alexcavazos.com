import { Inter, JetBrains_Mono } from "next/font/google";

/** Terminal / lander face. Registered as --font-jetbrains-mono, exposed by globals.css as --font-mono (Tailwind: font-mono). */
export const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

/** CV face. Registered as --font-inter, exposed by globals.css as --font-sans (Tailwind: font-sans). */
export const sans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

/** Class string for <html> that registers both font CSS variables. */
export const fontVariables = `${mono.variable} ${sans.variable}`;
