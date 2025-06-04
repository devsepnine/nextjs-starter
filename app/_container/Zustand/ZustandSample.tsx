'use client';

import { Icon } from '@iconify/react';

import { useTranslation } from '@/i18n/client.ts';
import useSampleStore from '@/store/sampleStore.ts';

import styles from './Zustand.module.scss';

import { AnimatedNumber } from '@/components/template/AnimatedNumber.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Card } from '@/components/ui/card.tsx';

const ZustandSample = () => {
  const { t } = useTranslation('common');

  const { number, increase, decrease } = useSampleStore();

  return (
    <Card className={styles['root']}>
      <div className={styles['title']}>Zustand</div>

      <div className={styles['contents']}>
        <div className={styles['number']}>
          <AnimatedNumber value={number} />
        </div>
        <div className={styles['button-area']}>
          <Button size={'sm'} variant={'default'} onClick={increase}>
            <Icon icon={'mingcute:plus-fill'} width={15} height={15} />
            {t('Add')}
          </Button>
          <Button size={'sm'} variant={'destructive'} onClick={decrease}>
            <Icon icon={'mingcute:minus-square-fill'} width={15} height={15} />
            {t('Subtract')}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ZustandSample;
