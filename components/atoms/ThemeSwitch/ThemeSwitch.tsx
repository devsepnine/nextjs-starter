'use client';

import { RiMacbookFill, RiMoonClearFill, RiSunFill } from '@remixicon/react';
import { clsx } from 'clsx';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { useEffect, useState } from 'react';

import styles from './ThemeSwitch.module.scss';

import { Button } from '@/components/ui/Button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu.tsx';

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={clsx(styles['theme-switch'])}
        >
          <RiSunFill className={clsx(styles['light'])} size={15} />
          <RiMoonClearFill className={clsx(styles['dark'])} size={15} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={styles['theme-content']}>
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={styles['menu']}
        >
          <RiSunFill size={15} />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={styles['menu']}
        >
          <RiMoonClearFill size={15} />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className={styles['menu']}
        >
          <RiMacbookFill size={15} />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
