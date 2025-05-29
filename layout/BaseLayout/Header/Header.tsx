import { Icon } from '@iconify/react';
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
          <span className={styles['label']}>
            <Icon icon={'logos:nextjs-icon'} width={20} height={20} />
            Next.js {t('StarterKit')}
          </span>
        </div>
        <div className={styles['right']}>
          <Link href={'https://github.com/devsepnine'}>
            <Button variant={'ghost'} size={'icon'} aria-label={'github'}>
              <Icon icon={'mingcute:github-fill'} width={15} height={15} />
            </Button>
          </Link>
          <Link href={'https://x.com/c0zycr473'}>
            <Button variant={'ghost'} size={'icon'} aria-label={'x(twitter)'}>
              <Icon icon={'mingcute:social-x-line'} width={15} height={15} />
            </Button>
          </Link>
          <UserMenu />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
