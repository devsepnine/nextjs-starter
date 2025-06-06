'use client';

import { Icon } from '@iconify/react';
import { useState } from 'react';

import { useTranslation } from '@/i18n/client.ts';
import useSampleStore from '@/store/sampleStore.ts';

import styles from './Zustand.module.scss';

import { AnimatedNumber } from '@/components/template/AnimatedNumber.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Card } from '@/components/ui/card.tsx';
import { Input } from '@/components/ui/input.tsx';

const NUM_REGEX = /^-?(\d+\.?\d*|\.\d+)$/;

const ZustandSample = () => {
  const { t } = useTranslation('common');

  const { number, increase, decrease, number2, setNumber2 } = useSampleStore();
  const [tempNumber, setTempNumber] = useState<string>('0');

  const handleInput = () => {
    const value = tempNumber;

    if (NUM_REGEX.test(value)) {
      setNumber2(value);
    } else {
      setNumber2('0');
    }
  };

  return (
    <Card className={styles['root']}>
      <div className={styles['title']}>Zustand</div>

      <div className={styles['contents']}>
        <div className={styles['number']}>
          <AnimatedNumber value={number.toString()} />
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
        <hr className={'w-full my-2'} />
        <div className={'flex flex-col gap-y-2 items-center justify-center'}>
          <div className={'flex gap-x-2 items-center '}>
            <Input
              type={'text'}
              className={'h-10'}
              value={tempNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                // regex only number matching include minus sign first
                if (NUM_REGEX.test(value) || value === '') {
                  setTempNumber(value);
                }
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  handleInput();
                }
              }}
            />
            <Button onClick={handleInput}>Input!</Button>
          </div>
          <AnimatedNumber value={number2} className={'relative flex-wrap'} />
        </div>
      </div>
    </Card>
  );
};

export default ZustandSample;
