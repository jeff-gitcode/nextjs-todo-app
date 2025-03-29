import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  // Enable source maps for production
  productionBrowserSourceMaps: true,
  serverExternalPackages: ["@electric-sql/pglite"],
  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = 'source-map'; // Enable source maps in development
    }
    return config;
  },
};

export default nextConfig;