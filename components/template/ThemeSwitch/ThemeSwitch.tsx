'use client';

import { Icon } from '@iconify/react';
import { clsx } from 'clsx';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsClient } from '@/hooks/useIsClient';

import styles from './ThemeSwitch.module.scss';

export function ThemeSwitch() {
  const isClient = useIsClient();
  const { setTheme } = useTheme();

  if (!isClient) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={clsx(styles['theme-switch'])}>
          <div className={styles['trigger']}>
            <Icon
              icon={'line-md:moon-filled-alt-to-sunny-filled-loop-transition'}
              width={15}
              height={15}
              className={clsx(styles['light'])}
            />
            <Icon
              icon={'line-md:sunny-filled-loop-to-moon-filled-loop-transition'}
              width={15}
              height={15}
              className={clsx(styles['dark'])}
            />
            <span className="sr-only">Toggle theme</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={styles['theme-content']}>
        <DropdownMenuItem onClick={() => setTheme('light')} className={styles['menu']}>
          <Icon
            icon={'line-md:moon-filled-alt-to-sunny-filled-loop-transition'}
            width={15}
            height={15}
          />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} className={styles['menu']}>
          <Icon
            icon={'line-md:sunny-filled-loop-to-moon-filled-loop-transition'}
            width={15}
            height={15}
          />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')} className={styles['menu']}>
          <Icon icon={'line-md:cog-filled-loop'} width={15} height={15} />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
