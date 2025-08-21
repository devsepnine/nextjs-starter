import type { Metadata, Viewport } from 'next';

import '@/styles/modern-css-reset.scss';
import '@/styles/preset.scss';
import '@/styles/globals.css';

import Head from 'next/head';
import React from 'react';

import { LocaleProvider } from '@/hooks/locale-provider';
import { BaseLayout } from '@/layout/BaseLayout/BaseLayout';
import { ThemeProvider } from '@/layout/ThemeProvider/ThemeProvider';
import { langInitializer } from '@/lib/langInitial';
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
  // i18n init
  const lng = await langInitializer();
  // initial theme
  const ti = themeInitial();

  return (
    <html lang={lng} suppressHydrationWarning={true}>
      <Head>
        <link rel="preconnect" href="https://api.iconify.design" crossOrigin="anonymous" />
      </Head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: ti }} />
        <LocaleProvider value={lng}>
          <ThemeProvider>
            <BaseLayout>{children}</BaseLayout>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
