import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { lander } from "@/content/lander";
import type { Locale } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };

const FONT_DIR = join(process.cwd(), "components/lander/og");
const fonts = Promise.all([
  readFile(join(FONT_DIR, "JetBrainsMono-Regular.ttf")),
  readFile(join(FONT_DIR, "JetBrainsMono-Bold.ttf")),
]);

// Dark theme tokens from app/globals.css.
const C = {
  bg: "#0b0b0c",
  fg: "#e4e4e7",
  muted: "#a1a1aa",
  subtle: "#7c7c85",
  accent: "#c9a46a",
};

/** Social card: the `whoami` block, nothing else. `subtitle` defaults to the headline. */
export async function renderOgImage(locale: Locale, subtitle?: string) {
  const c = lander[locale];
  const [regular, bold] = await fonts;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: C.bg,
        fontFamily: "JetBrains Mono",
        padding: "0 96px",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, color: C.subtle }}>
        <span style={{ color: C.accent, marginRight: 16 }}>$</span>
        <span>{c.intro.cmd}</span>
      </div>
      <div style={{ display: "flex", marginTop: 28, fontSize: 64, fontWeight: 700, color: C.fg, letterSpacing: -1 }}>
        {c.intro.name}
      </div>
      <div style={{ display: "flex", marginTop: 16, fontSize: 30, color: C.muted, lineHeight: 1.4 }}>
        {subtitle ?? c.intro.headline}
      </div>
      <div style={{ display: "flex", marginTop: 56, fontSize: 24, color: C.subtle }}>alexcavazos.com</div>
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
