import type { Metadata, Viewport } from 'next';

import '@/styles/modern-css-reset.scss';
import './globals.scss';

import React from 'react';

import { langInitializer } from '@/lib/langInitial.ts';
import { themeInitial } from '@/lib/themeInitial.ts';

import { LocaleProvider } from '@/hooks/locale-provider.tsx';
import { BaseLayout } from '@/layout/BaseLayout/BaseLayout.tsx';
import { ThemeProvider } from '@/layout/ThemeProvider/ThemeProvider.tsx';

export const viewport: Viewport = {
  themeColor: '#000000',
};
export const metadata: Metadata = {
  title: 'Codenyang Stater Kit',
  description: 'Next.js 14 Starter Kit - codenyang',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // i18n init
  const lng = langInitializer();
  // initial theme
  const ti = themeInitial();

  return (
    <html lang={lng} suppressHydrationWarning={true}>
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
