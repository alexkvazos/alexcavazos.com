import type { ReactNode } from "react";

/** Inline markers supported by content/lander.ts: **bold** and `code`. */
export type Seg = { k: "t" | "b" | "c"; s: string };

const INLINE_RE = /\*\*(.+?)\*\*|`([^`]+)`/g;

export function parseInline(text: string): Seg[] {
  const out: Seg[] = [];
  let last = 0;
  for (const m of text.matchAll(INLINE_RE)) {
    const at = m.index ?? 0;
    if (at > last) out.push({ k: "t", s: text.slice(last, at) });
    if (m[1] !== undefined) out.push({ k: "b", s: m[1] });
    else out.push({ k: "c", s: m[2] ?? "" });
    last = at + m[0].length;
  }
  if (last < text.length) out.push({ k: "t", s: text.slice(last) });
  return out;
}

export function segLength(segs: Seg[]): number {
  return segs.reduce((n, s) => n + s.s.length, 0);
}

/** Visible text of a marked-up string (markers stripped). */
export function plainText(text: string): string {
  return parseInline(text)
    .map((s) => s.s)
    .join("");
}

function segClass(k: Seg["k"], tone: "fg" | "muted") {
  if (k === "b") return "font-bold text-accent";
  if (k === "c") return "text-info";
  return tone === "fg" ? undefined : "text-muted";
}

function renderSegs(segs: Seg[], keyPrefix: string, tone: "fg" | "muted"): ReactNode[] {
  return segs.map((s, i) =>
    s.k === "c" ? (
      <code key={`${keyPrefix}${i}`} className={segClass(s.k, tone)}>
        {s.s}
      </code>
    ) : s.k === "b" ? (
      <strong key={`${keyPrefix}${i}`} className={segClass(s.k, tone)}>
        {s.s}
      </strong>
    ) : (
      <span key={`${keyPrefix}${i}`} className={segClass(s.k, tone)}>
        {s.s}
      </span>
    ),
  );
}

/** Split segments at character `n` (for typing animations). */
export function splitSegs(segs: Seg[], n: number): [Seg[], Seg[]] {
  const shown: Seg[] = [];
  const rest: Seg[] = [];
  let left = n;
  for (const s of segs) {
    if (left >= s.s.length) {
      shown.push(s);
      left -= s.s.length;
    } else if (left > 0) {
      shown.push({ k: s.k, s: s.s.slice(0, left) });
      rest.push({ k: s.k, s: s.s.slice(left) });
      left = 0;
    } else {
      rest.push(s);
    }
  }
  return [shown, rest];
}

/** Renders **bold** / `code` markers. */
export function Inline({ text, tone = "fg" }: { text: string; tone?: "fg" | "muted" }) {
  return <>{renderSegs(parseInline(text), "s", tone)}</>;
}

/**
 * Renders the first `n` characters visibly and the remainder invisibly, so the line keeps its
 * final size while it types (no layout shift). `caret` is rendered at the split point.
 */
export function TypedSegs({
  segs,
  n,
  caret,
  tone = "fg",
}: {
  segs: Seg[];
  n: number;
  caret?: ReactNode;
  tone?: "fg" | "muted";
}) {
  const [shown, rest] = splitSegs(segs, n);
  return (
    <>
      {renderSegs(shown, "a", tone)}
      {caret}
      {rest.length > 0 && (
        <span className="invisible" aria-hidden="true">
          {renderSegs(rest, "b", tone)}
        </span>
      )}
    </>
  );
}
