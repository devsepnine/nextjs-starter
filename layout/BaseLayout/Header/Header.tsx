import { RiGithubFill, RiTwitterXFill } from '@remixicon/react';
import Link from 'next/link';

import { createTranslation } from '@/i18n/server.ts';

import styles from './Header.module.scss';

import { ThemeSwitch } from '@/components/atoms/ThemeSwitch/ThemeSwitch.tsx';
import { Button } from '@/components/ui/button.tsx';
import { UserMenu } from '@/layout/BaseLayout/Header/UserMenu/UserMenu.tsx';

export async function Header() {
  const { t } = await createTranslation('common');
  return (
    <header className={styles['header']}>
      <div className={styles['contents']}>
        <div className={styles['left']}>
          <span className={styles['label']}>Next 14 {t('StarterKit')}</span>
        </div>
        <div className={styles['right']}>
          <Link href={'https://github.com/devsepnine'}>
            <Button variant={'ghost'} size={'icon'} aria-label={'github'}>
              <RiGithubFill size={15} />
            </Button>
          </Link>
          <Link href={'https://x.com/c0zycr473'}>
            <Button variant={'ghost'} size={'icon'} aria-label={'x(twitter)'}>
              <RiTwitterXFill size={15} />
            </Button>
          </Link>
          <UserMenu />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
