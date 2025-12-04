'use client';

import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes';

import { useIsClient } from '@/hooks/useIsClient';

export function ThemeProvider({ children, ...props }: Readonly<ThemeProviderProps>) {
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return (
    <NextThemesProvider attribute="class" {...props}>
      {children}
    </NextThemesProvider>
  );
}
