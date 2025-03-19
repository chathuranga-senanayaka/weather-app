const isProd = process.env.NODE_ENV === "production";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {},
  },
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? "/weather-app/" : "",
  basePath: isProd ? "/weather-app" : "",
};

export default nextConfig;
