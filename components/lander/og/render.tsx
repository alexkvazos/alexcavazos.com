import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { lander } from "@/content/lander";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT = `${lander.intro.name} — ${lander.intro.headline}`;

const FONT_DIR = join(process.cwd(), "components/lander/og");
const fonts = Promise.all([
  readFile(join(FONT_DIR, "JetBrainsMono-Regular.ttf")),
  readFile(join(FONT_DIR, "JetBrainsMono-Bold.ttf")),
]);

// Dark theme tokens from app/globals.css.
const C = {
  bg: "#0b0b0c",
  surface: "#111112",
  border: "#232326",
  fg: "#e4e4e7",
  muted: "#a1a1aa",
  subtle: "#7c7c85",
  accent: "#c9a46a",
  tool: "#7fc3d6",
  ok: "#7bd497",
};

/**
 * Social card: the end of the intro (a green "ready") above the whoami block.
 * `cmd` replaces the whoami command for other pages (e.g. "cat cv").
 */
export async function renderOgImage({ cmd = "whoami", tagline }: { cmd?: string; tagline?: string } = {}) {
  const [regular, bold] = await fonts;
  const c = lander;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.bg,
        backgroundImage: "radial-gradient(circle at 100% 0%, rgba(201,164,106,0.10), transparent 55%)",
        fontFamily: "JetBrains Mono",
        padding: "64px 88px",
      }}
    >
      {/* top: terminal title */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 22, color: C.subtle }}>
        <div style={{ display: "flex", gap: 8, marginRight: 8 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: 6, background: "#3a3a3f" }} />
          ))}
        </div>
        <span>alex@cavazos</span>
        <span style={{ color: C.muted }}>~</span>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: C.ok, fontWeight: 700 }}>
          {/* JetBrains Mono has no U+2713, so the check is drawn. */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 12.5 9.5 18 20 6.5" stroke={C.ok} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Website is ready
        </div>
        <div style={{ display: "flex", marginTop: 34, fontSize: 28, color: C.subtle }}>
          <span style={{ color: C.accent, marginRight: 16 }}>$</span>
          <span>{cmd}</span>
        </div>
        <div style={{ display: "flex", marginTop: 22, fontSize: 30, fontWeight: 700, color: C.fg }}>{c.intro.name}</div>
        <div
          style={{
            display: "flex",
            marginTop: 10,
            fontSize: 64,
            fontWeight: 700,
            color: C.fg,
            letterSpacing: -1.5,
            lineHeight: 1.1,
          }}
        >
          {c.intro.headline.replace(/ (\S+)$/, "\u00a0$1")}
        </div>
        <div style={{ display: "flex", marginTop: 22, fontSize: 26, color: C.muted }}>
          {tagline ?? "Technical co-founder · Octagon Labs · Turboship"}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: C.subtle }}>
        <span>alexcavazos.com</span>
        <span style={{ color: C.tool }}>Monterrey, MX</span>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: "JetBrains Mono", data: regular, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
