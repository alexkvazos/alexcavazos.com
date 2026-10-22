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
      <main className="mx-auto flex min-h-dvh max-w-[44rem] flex-col justify-center gap-3 px-4 text-sm sm:px-6">
        <p className="text-subtle">
          <span className="text-accent">$</span> cd ./this-page
        </p>
        <p className="text-muted">not found · no encontrada</p>
        <p className="flex gap-5 text-muted">
          <Link href="/" className="underline decoration-border-strong underline-offset-4 hover:text-fg">
            cd ~
          </Link>
          <Link href="/es" className="underline decoration-border-strong underline-offset-4 hover:text-fg">
            cd ~/es
          </Link>
        </p>
      </main>
    </RootDocument>
  );
}
