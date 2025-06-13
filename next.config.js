/** @type {import('next').NextConfig} */
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

import withPWA from 'next-pwa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const { version } = require('./package.json');

const withBundleAnalyzer =
  process.env.ANALYZE === 'true'
    ? (await import('@next/bundle-analyzer')).default({ enabled: true })
    : (config) => config;

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
    forceSwcTransforms: true,
  },

  reactStrictMode: true,
  compress: true, // Gzip Enabled (Next.js 기본값)
  poweredByHeader: false, // X-Powered-By Header remove

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: "@use 'styles/common/variables' as *;",
  },

  webpack(config, { isServer, dev }) {
    if (!isServer) {
      if (!dev) {
        config.output.filename = `static/chunks/[name]-v${version.replace(/\./g, '_')}-[contenthash].js`;
        config.output.chunkFilename = `static/chunks/[name]-v${version.replace(/\./g, '_')}-[contenthash].js`;
      } else {
        config.output.filename = `static/chunks/[name]-v${version.replace(/\./g, '_')}-[hash].js`;
        config.output.chunkFilename = `static/chunks/[name]-v${version.replace(/\./g, '_')}-[hash].js`;
      }
    }
    return config;
  },

  // HTTP 헤더 설정
  headers: async () => {
    return [
      {
        // 모든 페이지에 캐시 방지 헤더 적용
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
            value: 'public, max-age=86400, immutable', // 24시간 캐시
          },
        ],
        source: '/_next/static/chunks/:path*',
      },
      {
        // 정적 자산에 장기 캐시 헤더 적용 (이미지, 폰트, 오디오, 비디오)
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, immutable', // 24시간 캐시
          },
        ],
        source:
          '/:path(.+\\.(?:ico|png|svg|jpg|jpeg|gif|webp|json|mp3|mp4|ttf|ttc|otf|woff|woff2)$)',
      },
    ];
  },
};

// 설정 조합: 번들분석기 → PWA → Next.js 설정
export default withBundleAnalyzer(wp(nextConfig));
