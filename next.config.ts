import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    // Strict TS — errors will fail the build. Keep it honest.
    ignoreBuildErrors: false,
  },
  reactStrictMode: false,
};

export default nextConfig;
