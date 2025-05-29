/** @type {import('next').NextConfig} */
const path = require('path');

const withPWA = require('next-pwa');

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
  headers: async () => {
    return [
      {
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, no-cache, no-store, max-age=0, must-revalidate',
          },
        ],
        source: '/:path*',
      },
      {
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, immutable',
          },
        ],
        source:
          '/:path(.+\\.(?:ico|png|svg|jpg|jpeg|gif|webp|json|mp3|mp4|ttf|ttc|otf|woff|woff2)$)',
      },
    ];
  },
};

module.exports = wp(nextConfig);
