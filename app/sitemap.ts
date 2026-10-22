import type { MetadataRoute } from "next";
import { absoluteUrl, LOCALES, type SitePath } from "@/lib/site";

const PATHS: { path: SitePath; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/cv", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap(({ path, priority }) =>
    LOCALES.map((locale) => ({
      url: absoluteUrl(locale, path),
      changeFrequency: "monthly" as const,
      priority: locale === "en" ? priority : Math.round((priority - 0.1) * 10) / 10,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, absoluteUrl(l, path)])),
      },
    })),
  );
}
