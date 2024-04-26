/** @type {import('next').NextConfig} */

import withPWA from 'next-pwa';

const wp = withPWA({
  dest: 'public',
});

const nextConfig = {
  reactStrictMode: false,
};

export default wp(nextConfig);
