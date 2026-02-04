import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['shared'],
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
