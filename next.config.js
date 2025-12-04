/** @type {import('next').NextConfig} */
import { createRequire } from 'module';

import withSerwistInit from '@serwist/next';

const require = createRequire(import.meta.url);
const { version } = require('./package.json');

const withBundleAnalyzer =
  process.env.ANALYZE === 'true'
    ? (await import('@next/bundle-analyzer')).default({ enabled: true })
    : (config) => config;

const withSerwist = withSerwistInit({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 180,
    },
    // Lingui SWC 플러그인 설정
    swcPlugins: [['@lingui/swc-plugin', {}]],
  },

  // Turbopack 설정 (Next.js 16+)
  turbopack: {
    rules: {
      // Lingui .po 파일 로더 설정 (Turbopack용)
      '*.po': {
        loaders: ['@lingui/loader'],
        as: '*.js',
      },
    },
  },

  reactStrictMode: true,
  compress: true, // Gzip Enabled (Next.js 기본값)
  poweredByHeader: false, // X-Powered-By Header remove

  sassOptions: {
    prependData: "@use '@/styles/common/variables' as *;",
  },

  webpack(config, { isServer, dev }) {
    // Lingui .po 파일 로더 설정
    config.module.rules.push({
      test: /\.po$/,
      use: {
        loader: '@lingui/loader',
      },
    });

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

// 설정 조합: 번들분석기 → Serwist → Next.js 설정
export default withBundleAnalyzer(withSerwist(nextConfig));
