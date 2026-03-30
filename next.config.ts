import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'alkota.com',
      },
      {
        protocol: 'https',
        hostname: 'alkota.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/tools/mess-quest',
        destination: '/tools/machine-match',
        permanent: true,
      },
    ];
  },
};


export default nextConfig;
