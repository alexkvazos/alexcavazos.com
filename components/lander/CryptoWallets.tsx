"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Wallet } from "@/content/lander";

const TOAST_MS = 2400;

const LOGOS: Record<Wallet["chain"], ReactNode> = {
  ethereum: (
    <svg width="14" height="23" viewBox="0 0 256 417" aria-hidden="true" className="fill-current">
      <path opacity="0.6" d="M127.96 0 125.17 9.5v275.67l2.79 2.79 127.96-75.64z" />
      <path d="M127.96 0 0 212.32l127.96 75.64V154.16z" />
      <path opacity="0.6" d="m127.96 312.19-1.57 1.92v98.2l1.57 4.6L256 236.59z" />
      <path d="M127.96 416.9V312.19L0 236.59z" />
      <path opacity="0.35" d="m127.96 287.96 127.96-75.64-127.96-58.16z" />
      <path opacity="0.6" d="m0 212.32 127.96 75.64V154.16z" />
    </svg>
  ),
  bitcoin: (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="fill-current">
      <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.185 3.137.53 2.75 2.084v.006z" />
    </svg>
  ),
};

/** Wallet addresses that copy themselves on click and confirm with a shared toast. */
export default function CryptoWallets({
  wallets,
  copied,
  failed,
}: {
  wallets: Wallet[];
  copied: string;
  failed: string;
}) {
  const [toast, setToast] = useState<{ ok: boolean; text: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async (address: string) => {
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
      <ul className="space-y-2">
        {wallets.map((w) => (
          <li key={w.chain}>
            <button
              type="button"
              onClick={() => copy(w.address)}
              title={`Copy ${w.label} address`}
              className="flex max-w-full cursor-pointer items-center gap-2.5 text-left text-muted transition-colors hover:text-fg"
            >
              <span className="grid w-[18px] shrink-0 place-items-center">{LOGOS[w.chain]}</span>
              <span className="min-w-0 break-all underline decoration-border-strong underline-offset-4">
                <span className="sr-only">Copy {w.label} address: </span>
                {w.address}
              </span>
            </button>
          </li>
        ))}
      </ul>
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
