import { lander } from "@/content/lander";
import { OG_SIZE, renderOgImage } from "@/components/lander/og/render";

export const alt = `${lander.en.meta.ogTitle} — ${lander.en.hero.headline}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("en");
}
