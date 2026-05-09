'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = Exclude<Theme, 'system'>;

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: ResolvedTheme;
  systemTheme: ResolvedTheme;
  themes: Theme[];
}

const STORAGE_KEY = 'theme';
const THEME_CLASS_NAMES: ResolvedTheme[] = ['light', 'dark'];
const THEMES: Theme[] = ['light', 'dark', 'system'];

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialSystemTheme(): ResolvedTheme {
  return typeof window === 'undefined' ? 'light' : getSystemTheme();
}

function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === 'system' ? getSystemTheme() : theme;
}

function applyTheme(theme: Theme) {
  const resolvedTheme = resolveTheme(theme);
  const element = document.documentElement;

  element.classList.remove(...THEME_CLASS_NAMES);
  element.classList.add(resolvedTheme);
  element.style.setProperty('color-scheme', resolvedTheme);
}

function getStoredTheme(): Theme {
  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  return THEMES.includes(storedTheme as Theme) ? (storedTheme as Theme) : 'system';
}

function getInitialTheme(): Theme {
  return typeof window === 'undefined' ? 'system' : getStoredTheme();
}

export function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getInitialSystemTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      const nextSystemTheme = getSystemTheme();

      setSystemTheme(nextSystemTheme);
      setThemeState((currentTheme) => {
        if (currentTheme === 'system') {
          applyTheme('system');
        }

        return currentTheme;
      });
    };

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }

      const nextTheme = getStoredTheme();

      setThemeState(nextTheme);
      applyTheme(nextTheme);
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      resolvedTheme: theme === 'system' ? systemTheme : theme,
      systemTheme,
      themes: THEMES,
    }),
    [setTheme, systemTheme, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
