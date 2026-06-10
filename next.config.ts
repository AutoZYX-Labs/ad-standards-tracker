import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "ad-standards-tracker.vercel.app" }],
        destination: "https://standards.autozyx.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
