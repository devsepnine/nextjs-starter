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
        // 동적 HTML 페이지: 매 요청 revalidate하되, back/forward 시 stale을 30초간 허용
        // stale-while-revalidate=30: 백/포워드 네비게이션 시 캐시된 HTML을 즉시 표시 후
        // 백그라운드에서 최신 응답을 가져와 갱신 (UX 체감 속도 향상)
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, no-cache, must-revalidate, stale-while-revalidate=30',
          },
        ],
        source: '/:path*',
      },
      {
        // Next.js 청크는 contenthash가 포함되어 immutable로 장기 캐시 가능
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
        source: '/_next/static/:path*',
      },
      {
        // 정적 자산: 1년 immutable 캐시 (이미지, 폰트 등)
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
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
