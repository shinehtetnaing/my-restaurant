import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "my-restaurant-dev.s3.ap-southeast-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
