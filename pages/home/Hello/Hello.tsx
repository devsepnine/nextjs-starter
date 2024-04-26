import { clsx } from 'clsx';

import { createTranslation } from '@/i18n/server.ts';

import styles from './Hello.module.scss';

export async function Hello() {
  const { t } = await createTranslation('common');
  return (
    <div className={styles['hello']}>
      <div className={styles['title']}>{t('HelloNext')}</div>
      <div className={styles['description']}>{t('MainDescription')}</div>
      <div className={clsx(styles['description'], styles['sub'])}>
        {t('MainDescription2')}
      </div>
    </div>
  );
}
