/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wp = withPWA({
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
    prependData: "@import 'styles/common/_variables.scss';",
  },
};

export default wp(nextConfig);
