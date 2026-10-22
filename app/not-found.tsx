import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[44rem] flex-col justify-center gap-3 px-4 text-sm sm:px-6">
      <p className="text-subtle">
        <span className="text-accent">$</span> cd ./this-page
      </p>
      <p className="text-muted">not found</p>
      <p className="text-muted">
        <Link href="/" className="underline decoration-border-strong underline-offset-4 hover:text-fg">
          cd ~
        </Link>
      </p>
    </main>
  );
}
