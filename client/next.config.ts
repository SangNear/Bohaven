import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dqfwj0sc2/image/upload/**', // or '/**' to allow all
      },
    ],
  },
};

export default nextConfig;
