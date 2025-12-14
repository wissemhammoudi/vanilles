import type { NextConfig } from "next";
const nextConfig = {
  // ...your existing config
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
export default nextConfig;
