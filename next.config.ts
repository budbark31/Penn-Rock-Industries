import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. This shrinks the build size (Faster Load)
  productionBrowserSourceMaps: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;