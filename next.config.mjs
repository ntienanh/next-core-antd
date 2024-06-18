/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  publicRuntimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
};

export default nextConfig;
