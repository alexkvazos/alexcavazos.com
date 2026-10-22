import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { RootDocument, rootMetadata, rootViewport } from "@/lib/layout";

export const metadata: Metadata = rootMetadata;
export const viewport: Viewport = rootViewport;

export default function RootLayout({ children }: { children: ReactNode }) {
  return <RootDocument>{children}</RootDocument>;
}
