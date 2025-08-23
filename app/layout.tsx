import type { Metadata, Viewport } from 'next';

import '@/styles/modern-css-reset.scss';
import '@/styles/preset.scss';
import '@/styles/globals.css';

import React from 'react';

import LinguiProvider from '@/components/providers/LinguiProvider';
import { BaseLayout } from '@/layout/BaseLayout/BaseLayout';
import { ThemeProvider } from '@/layout/ThemeProvider/ThemeProvider';
import { getLocaleFromCookie } from '@/lib/browser-locale';
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
  // initial theme
  const ti = themeInitial();

  return (
    <html lang={lng} suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://api.iconify.design" crossOrigin="anonymous" />
        <title>HIVICanvas Starter Kit</title>
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: ti }} />
        <LinguiProvider locale={lng}>
          <ThemeProvider>
            <BaseLayout>{children}</BaseLayout>
          </ThemeProvider>
        </LinguiProvider>
      </body>
    </html>
  );
}
