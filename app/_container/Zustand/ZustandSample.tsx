'use client';

import { useTranslation } from '@/i18n/client.ts';
import useSampleStore from '@/store/sampleStore.ts';

import styles from './Zustand.module.scss';

import { Button } from '@/components/ui/button.tsx';
import { Card } from '@/components/ui/card.tsx';

const ZustandSample = () => {
  const { t } = useTranslation('common');

  const { number, increase, decrease } = useSampleStore();

  return (
    <Card className={styles['root']}>
      <div className={styles['title']}>Zustand</div>

      <div className={styles['contents']}>
        <div>{number}</div>
        <div className={styles['button-area']}>
          <Button size={'sm'} variant={'green'} onClick={increase}>
            {t('Add')}
          </Button>
          <Button size={'sm'} variant={'red'} onClick={decrease}>
            {t('Subtract')}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ZustandSample;
