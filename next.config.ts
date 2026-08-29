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
        hostname: 'xohftjaohhkwgxdnouoo.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'easttnchemicals.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/studio/:path*',
        destination: '/admin/login',
        permanent: false,
      },
      {
        source: '/tools/mess-quest',
        destination: '/tools/machine-match',
        permanent: true,
      },
      {
        source: '/wash-plants',
        destination: '/wash-plant',
        permanent: true,
      },
      {
        source: '/machines/wash-plants',
        destination: '/wash-plant',
        permanent: true,
      },
      {
        source: '/water-recovery-skids',
        destination: '/water-treatment',
        permanent: true,
      },
      {
        source: '/machines/water-recovery-skids',
        destination: '/water-treatment',
        permanent: true,
      },
      {
        source: '/machines/water-treatment',
        destination: '/water-treatment',
        permanent: true,
      },
      {
        source: '/water-recovery',
        destination: '/water-treatment',
        permanent: true,
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
