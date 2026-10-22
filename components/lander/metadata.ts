import type { Metadata } from "next";
import { lander } from "@/content/lander";
import { LINKS } from "@/lib/site";

/** Lander metadata. The OG/Twitter image comes from app/opengraph-image.tsx and app/twitter-image.tsx. */
const { title, description } = lander.meta;

export const landerMetadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    firstName: "Alejandro",
    lastName: "Cavazos",
    username: "alexkvazos",
    url: "/",
    title,
    description,
    siteName: "Alex Cavazos",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: LINKS.xHandle,
    site: LINKS.xHandle,
  },
};
