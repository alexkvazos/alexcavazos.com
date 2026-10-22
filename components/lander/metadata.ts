import type { Metadata } from "next";
import { lander } from "@/content/lander";
import { OG_LOCALE, absoluteUrl, alternatesFor, type Locale } from "@/lib/site";

/** Per-locale metadata for the lander (OG/Twitter images come from the opengraph-image files). */
export function landerMetadata(locale: Locale): Metadata {
  const { meta } = lander[locale];
  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: alternatesFor(locale, "/"),
    openGraph: {
      type: "profile",
      firstName: "Alejandro",
      lastName: "Cavazos",
      username: "alexkvazos",
      url: absoluteUrl(locale, "/"),
      title: meta.title,
      description: meta.description,
      siteName: "Alex Cavazos",
      locale: OG_LOCALE[locale],
      alternateLocale: Object.values(OG_LOCALE).filter((l) => l !== OG_LOCALE[locale]),
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      creator: "@alexcavazossh",
    },
  };
}
