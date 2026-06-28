import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@mui/material", "@mui/icons-material"],
  },
  reactCompiler: true,
  reactStrictMode: true,
  images: {
    qualities: [52, 75],
    deviceSizes: [640, 700, 750, 800, 828, 900, 1080, 1200],
    imageSizes: [64, 128, 256, 320, 400, 480],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.reachdigital.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
