/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

import withBundleAnalyzer from '@next/bundle-analyzer';
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

  reactStrictMode: true,

  compress: true, // Gzip Enabled (Next.js 기본값)
  poweredByHeader: false, // X-Powered-By Header remove

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: "@use 'styles/common/variables' as *;",
  },

  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },

            motion: {
              test: /[\\/]node_modules[\\/](motion|framer-motion)[\\/]/,
              name: 'motion',
              chunks: 'all',
              priority: 20,
            },

            radix: {
              test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
              name: 'radix',
              chunks: 'all',
              priority: 20,
            },

            i18n: {
              test: /[\\/]node_modules[\\/](i18next|react-i18next)[\\/]/,
              name: 'i18n',
              chunks: 'all',
              priority: 20,
            },
          },
        },
        // Tree Shaking
        usedExports: true, // usedExports 활성화
        sideEffects: false, // side effects 없는 모듈로 가정하여 더 공격적인 최적화
      };
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

// 번들 분석기 설정 - ANALYZE=true 환경변수로 활성화
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// 설정 조합: 번들분석기 → PWA → Next.js 설정
export default bundleAnalyzer(wp(nextConfig));
