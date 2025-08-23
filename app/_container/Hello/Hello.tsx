import { Icon } from '@iconify/react';
import { msg } from '@lingui/core/macro';
import { clsx } from 'clsx';

import { getServerTranslations } from '@/lib/server-locale';

import styles from './Hello.module.scss';

export async function Hello() {
  const { t } = await getServerTranslations();
  return (
    <div className={styles['root']}>
      <div className={styles['title']}>
        <Icon icon={'mdi:human-hello-variant'} width={30} height={30} />
        {t(msg`Hello Next.js`)}
      </div>
      <div className={styles['description']}>
        {t(msg`This is a project configured for convenient and fast start of next.js projects.`)}
      </div>
      <div className={clsx(styles['description'], styles['sub'])}>
        {t(msg`Please let me know any improvements or feedback, and I will incorporate them.`)}
      </div>
    </div>
  );
}
