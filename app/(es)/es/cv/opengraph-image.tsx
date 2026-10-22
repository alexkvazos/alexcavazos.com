import { lander } from "@/content/lander";
import { OG_SIZE, renderOgImage } from "@/components/lander/og/render";

export const alt = `${lander.es.meta.ogTitle} — ${lander.es.hero.headline}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("es");
}
