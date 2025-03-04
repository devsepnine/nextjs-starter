/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

import withPWA from 'next-pwa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wp = withPWA({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
});

const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 180,
    },
  },
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: "@use 'styles/common/variables' as *;",
  },
};

export default wp(nextConfig);
