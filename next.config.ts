import type { NextConfig } from "next";
import { env } from "@packages/config";

env;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
