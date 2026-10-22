import { OG_SIZE, renderOgImage } from "@/components/lander/og/render";

export const alt = "Alex Cavazos — CV · Technical Co-Founder & CTO";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ cmd: "cat cv", tagline: "CV · Technical Co-Founder & CTO" });
}
