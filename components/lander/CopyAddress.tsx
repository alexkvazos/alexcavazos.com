"use client";

import { useEffect, useRef, useState } from "react";

const TOAST_MS = 2400;

/** A wallet address that copies itself on click and confirms with a toast. */
export default function CopyAddress({
  label,
  address,
  copied,
  failed,
}: {
  label: string;
  address: string;
  copied: string;
  failed: string;
}) {
  const [toast, setToast] = useState<{ ok: boolean; text: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    let ok = true;
    try {
      await navigator.clipboard.writeText(address);
    } catch {
      ok = false;
    }
    setToast({ ok, text: ok ? copied : failed });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), TOAST_MS);
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        title={`Copy ${label} address`}
        className="flex max-w-full cursor-pointer items-center gap-2.5 text-left text-muted transition-colors hover:text-fg"
      >
        {/* Ethereum logo */}
        <svg width="14" height="23" viewBox="0 0 256 417" aria-hidden="true" className="shrink-0 fill-current">
          <path opacity="0.6" d="M127.96 0 125.17 9.5v275.67l2.79 2.79 127.96-75.64z" />
          <path d="M127.96 0 0 212.32l127.96 75.64V154.16z" />
          <path opacity="0.6" d="m127.96 312.19-1.57 1.92v98.2l1.57 4.6L256 236.59z" />
          <path d="M127.96 416.9V312.19L0 236.59z" />
          <path opacity="0.35" d="m127.96 287.96 127.96-75.64-127.96-58.16z" />
          <path opacity="0.6" d="m0 212.32 127.96 75.64V154.16z" />
        </svg>
        <span className="min-w-0 break-all underline decoration-border-strong underline-offset-4">
          <span className="sr-only">Copy {label} address: </span>
          {address}
        </span>
      </button>
      <div
        role="status"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4 text-[13px]"
      >
        {toast && (
          <p className="copy-toast rounded-md border border-border-strong bg-surface-2 px-3 py-1.5 text-fg">
            <span className={toast.ok ? "text-ok" : "text-accent"} aria-hidden="true">
              {toast.ok ? "✓" : "!"}{" "}
            </span>
            {toast.text}
          </p>
        )}
      </div>
    </>
  );
}
