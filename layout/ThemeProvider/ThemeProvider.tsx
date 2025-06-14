'use client';

import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes';
import * as React from 'react';
import { useEffect } from 'react';

export function ThemeProvider({ children, ...props }: Readonly<ThemeProviderProps>) {
  const [isMount, setIsMount] = React.useState(false);
  useEffect(() => {
    setIsMount(true);
  }, []);

  if (!isMount) {
    return null;
  }

  return (
    <NextThemesProvider attribute="class" {...props}>
      {children}
    </NextThemesProvider>
  );
}
