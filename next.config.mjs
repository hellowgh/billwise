import path from 'path'; // <-- Import path module
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  experimental: {},
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'apps/web');

    // 🔽 新增 alias 映射（与 tsconfig 中 paths 保持一致）
    config.resolve.alias['@billwise/trpc'] = path.resolve(__dirname, 'packages/trpc/src');
    config.resolve.alias['@billwise/db'] = path.resolve(__dirname, 'packages/db/src');
    config.resolve.alias['@billwise/utils'] = path.resolve(__dirname, 'packages/utils/src');

    return config;
  },
};

export default nextConfig;
