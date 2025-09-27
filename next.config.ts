import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Disable development indicators for cleaner UI during development
    optimizePackageImports: ['@heroicons/react'],
  },
  // Hide development indicators in the browser
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  // Additional optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  // Temporarily disable linting for demo deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
