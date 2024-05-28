/** @type {import('next').NextConfig} */

import withPWA from 'next-pwa';

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
};

export default wp(nextConfig);
