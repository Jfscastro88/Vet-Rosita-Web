import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: [
      "@mantine/core",
      "@mantine/hooks",
      "@mantine/form",
      "@mantine/dates",
      "@tabler/icons-react",
    ],
  },

  // Optimize bundle
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Enable compression
  compress: true,

  // Optimize images
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
  },

  // Enable SWC minification
  swcMinify: true,

  // Optimize CSS
  cssModules: true,
};

export default nextConfig;
