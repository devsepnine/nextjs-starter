import type { Metadata, Viewport } from 'next';

import '@/styles/modern-css-reset.scss';
import '@/styles/preset.scss';
import '@/styles/globals.css';

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
  title: 'c0zyCr473 Stater Kit',
  description: 'Next.js Starter Kit - c0zyCr473',
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
