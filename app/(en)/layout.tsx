import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { RootDocument, rootMetadata, rootViewport } from "@/lib/layout";

export const metadata: Metadata = rootMetadata("en");
export const viewport: Viewport = rootViewport;

export default function EnglishRootLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
