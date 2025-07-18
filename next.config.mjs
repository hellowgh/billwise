import path from 'path'; // <-- Import path module
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  experimental: {},
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'apps/web');
    return config;
  },
};

export default nextConfig;
