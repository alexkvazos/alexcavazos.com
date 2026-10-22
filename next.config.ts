import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets several dev/build servers run side by side (e.g. NEXT_DIST_DIR=.next-cv).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Two root layouts (app/(en), app/(es)) => no single layout to compose a 404 from.
    globalNotFound: true,
  },
};

export default nextConfig;
