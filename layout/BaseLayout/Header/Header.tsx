import Link from 'next/link';

import { Icon } from '@iconify/react';
import { msg } from '@lingui/core/macro';

import { ThemeSwitch } from '@/components/template/ThemeSwitch/ThemeSwitch';
import { Button } from '@/components/ui/button';
import { UserMenu } from '@/layout/BaseLayout/Header/UserMenu/UserMenu';
import { getServerTranslations } from '@/lib/server-locale';

import styles from './Header.module.scss';

export async function Header() {
  const { t } = await getServerTranslations();
  return (
    <header className={styles['header']}>
      <div className={styles['contents']}>
        <div className={styles['left']}>
          <span className={styles['label']}>
            <Icon icon={'logos:nextjs-icon'} width={20} height={20} />
            Next.js {t(msg`Starter kit`)}
          </span>
        </div>
        <div className={styles['right']}>
          <Link href={'https://github.com/devsepnine/nextjs-starter'}>
            <Button variant={'ghost'} size={'icon'} aria-label={'github'}>
              <Icon icon={'mingcute:github-fill'} width={15} height={15} />
            </Button>
          </Link>
          <Link href={'https://x.com/HIBICanvas'}>
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
