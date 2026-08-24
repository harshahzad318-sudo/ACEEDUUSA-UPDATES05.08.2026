import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "www.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/tutoring",
        destination: "/online-tutoring",
        permanent: true,
      },
      {
        source: "/sat-prep",
        destination: "/test-prep/sat",
        permanent: true,
      },
      {
        source: "/homeschooling",
        destination: "/home-tutoring",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/online-tutoring",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/icons/:path*",
        destination: "/api/pwa/icon-asset",
      },
    ];
  },
};

export default nextConfig;
