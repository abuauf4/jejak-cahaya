import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Force Neon PostgreSQL URL — system env may have stale SQLite value
  env: {
    DATABASE_URL:
      process.env.DATABASE_URL?.startsWith("postgresql://")
        ? process.env.DATABASE_URL
        : "postgresql://neondb_owner:npg_orNaGX6I0uvV@ep-noisy-dew-ao6kchi7-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
  },
};

export default nextConfig;
