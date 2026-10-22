import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets several dev/build servers run side by side (e.g. NEXT_DIST_DIR=.next-cv).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  reactStrictMode: true,
  poweredByHeader: false,
  // The site is English only; the old Spanish routes and PDFs land on their English versions.
  async redirects() {
    return [
      { source: "/es", destination: "/", permanent: true },
      { source: "/es/cv", destination: "/cv", permanent: true },
      { source: "/alejandro-cavazos-cv-:lang(en|es).pdf", destination: "/alejandro-cavazos-cv.pdf", permanent: true },
    ];
  },
};

export default nextConfig;
