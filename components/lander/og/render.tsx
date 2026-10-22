import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { lander } from "@/content/lander";
import type { Locale } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };

/** Non-breaking space before the last word so the headline never ends on a lone word. */
const keepLastWords = (s: string) => s.replace(/ (\S+)$/, "\u00a0$1");

const FONT_DIR = join(process.cwd(), "components/lander/og");
const fonts = Promise.all([
  readFile(join(FONT_DIR, "JetBrainsMono-Regular.ttf")),
  readFile(join(FONT_DIR, "JetBrainsMono-Bold.ttf")),
  readFile(join(FONT_DIR, "JetBrainsMono-ExtraBold.ttf")),
]);

// Terminal palette (dark theme tokens from app/globals.css).
const C = {
  bg: "#0a0a0b",
  surface: "#111113",
  border: "#2a2a2f",
  fg: "#e7e7ea",
  muted: "#8a8a93",
  subtle: "#808089",
  accent: "#ffb224",
  info: "#5ccfe6",
};

/** Metrics shown on the card: shipments, leads, tokens (indices into content metrics). */
const OG_METRICS = [0, 2, 5];

export async function renderOgImage(locale: Locale) {
  const c = lander[locale];
  const [regular, bold, extra] = await fonts;
  const user = c.hero.session.find((s) => s.kind === "user");
  const metrics = OG_METRICS.map((i) => c.metrics[i]).filter((m) => m !== undefined);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.bg,
        backgroundImage: `radial-gradient(circle at 85% 0%, rgba(255,178,36,0.16), transparent 55%)`,
        fontFamily: "JetBrains Mono",
        color: C.fg,
        padding: 40,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          background: "rgba(17,17,19,0.85)",
          overflow: "hidden",
        }}
      >
        {/* title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: 52,
            padding: "0 22px",
            borderBottom: `1px solid ${C.border}`,
            background: "#18181b",
          }}
        >
          <div style={{ display: "flex", gap: 9 }}>
            {["#ff5f57", "#febc2e", "#28c840"].map((col) => (
              <div key={col} style={{ width: 14, height: 14, borderRadius: 7, background: col }} />
            ))}
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", fontSize: 20, color: C.muted }}>
            <span style={{ color: C.fg }}>alex@cavazos</span>
            <span>:</span>
            <span style={{ color: C.accent, marginLeft: 8 }}>~</span>
          </div>
          <div style={{ width: 60, display: "flex" }} />
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "28px 48px 34px" }}>
          {user && user.kind === "user" && (
            <div style={{ display: "flex", fontSize: 22, color: C.muted }}>
              <span style={{ color: C.accent, marginRight: 14 }}>&gt;</span>
              <span>{user.text}</span>
            </div>
          )}
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 28,
              fontWeight: 700,
              color: C.accent,
              letterSpacing: -0.5,
            }}
          >
            {c.meta.ogTitle}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 8,
              fontSize: 66,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: -3,
              color: C.fg,
            }}
          >
            {keepLastWords(c.hero.headline)}
          </div>
          <div style={{ display: "flex", marginTop: 14, fontSize: 22, color: C.muted }}>{c.meta.ogSubtitle}</div>

          <div style={{ flex: 1, display: "flex", minHeight: 18 }} />

          <div style={{ display: "flex", gap: 18 }}>
            {metrics.map((m) => (
              <div
                key={m.label}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  border: `1px solid ${C.border}`,
                  borderRadius: 10,
                  padding: "14px 20px",
                  background: C.surface,
                }}
              >
                <div style={{ display: "flex", fontSize: 36, fontWeight: 800, color: C.accent, letterSpacing: -1.5 }}>
                  {m.value}
                </div>
                <div style={{ display: "flex", marginTop: 4, fontSize: 16, color: C.fg, lineHeight: 1.3 }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: "JetBrains Mono", data: regular, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: bold, weight: 700, style: "normal" },
        { name: "JetBrains Mono", data: extra, weight: 800, style: "normal" },
      ],
    },
  );
}
