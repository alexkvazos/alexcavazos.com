import type { MetadataRoute } from "next";
import { DESCRIPTION, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Alex",
    description: DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: "#0b0b0c",
    theme_color: "#0b0b0c",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
      { src: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
  };
}
