import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { RootDocument, rootMetadata, rootViewport } from "@/lib/layout";

export const metadata: Metadata = rootMetadata("es");
export const viewport: Viewport = rootViewport;

export default function SpanishRootLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="es">{children}</RootDocument>;
}
