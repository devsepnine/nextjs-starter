import type { Metadata, Viewport } from 'next';

import Script from 'next/script';

import '@/styles/modern-css-reset.scss';
import '@/styles/preset.scss';
import '@/styles/globals.css';

import React from 'react';

import LinguiProvider from '@/components/providers/LinguiProvider';
import { BaseLayout } from '@/layout/BaseLayout/BaseLayout';
import { ThemeProvider } from '@/layout/ThemeProvider/ThemeProvider';
import { getLocaleFromCookie } from '@/lib/browser-locale';
import { getTextDirection } from '@/lib/i18n';
import { getMessages } from '@/lib/i18n-messages';
import { themeInitial } from '@/lib/themeInitial';

export const viewport: Viewport = {
  themeColor: '#000000',
};
export const metadata: Metadata = {
  title: 'HIBICanvas Stater Kit',
  description: 'Next.js Starter Kit - HIBICanvas',
  manifest: '/manifest.webmanifest',
  icons: {
    other: [
      {
        url: '/assets/splash/iphone5_splash.png',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image',
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // i18n init - 미들웨어에서 설정된 쿠키 읽기
  const lng = await getLocaleFromCookie();
  // 서버에서 컴파일된 메시지를 미리 로드해 LinguiProvider에 전달
  // → 첫 렌더부터 카탈로그가 채워져 있어 "Uncompiled message detected" 경고 방지
  const messages = getMessages(lng);
  // initial theme
  const ti = themeInitial();
  // RTL/LTR direction
  const dir = getTextDirection(lng);

  return (
    <html lang={lng} dir={dir} suppressHydrationWarning={true}>
      <head>
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/PretendardGOV-Regular.subset.woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/PretendardGOV-Bold.subset.woff2"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://api.iconify.design" crossOrigin="anonymous" />
        <title>HIVICanvas Starter Kit</title>
      </head>
      <body>
        <Script
          id="theme-initial"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: ti }}
        />
        <LinguiProvider locale={lng} messages={messages}>
          <ThemeProvider>
            <BaseLayout>{children}</BaseLayout>
          </ThemeProvider>
        </LinguiProvider>
      </body>
    </html>
  );
}
