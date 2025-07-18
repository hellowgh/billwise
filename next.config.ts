import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'apps/web');
    return config;
  },
};

export default nextConfig;
