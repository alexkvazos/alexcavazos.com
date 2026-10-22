import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { RootDocument, rootViewport } from "@/lib/layout";

export const metadata: Metadata = {
  title: "404 — Alex Cavazos",
  robots: { index: false },
};
export const viewport = rootViewport;

export default function GlobalNotFound() {
  return (
    <RootDocument locale="en">
      <main className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-4 px-4 text-sm">
        <p className="text-muted">
          <span className="text-accent">$</span> cd ./this-page
        </p>
        <p className="text-danger">error: 404 — not found / no encontrada</p>
        <p className="flex gap-6">
          <Link href="/" className="text-info underline underline-offset-4">
            cd ~ (en)
          </Link>
          <Link href="/es" className="text-info underline underline-offset-4">
            cd ~ (es)
          </Link>
        </p>
      </main>
    </RootDocument>
  );
}
