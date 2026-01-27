'use client';

import { Icon } from '@iconify/react';
import { useLingui } from '@lingui/react/macro';
import { motion } from 'motion/react';

import { AnimatedNumber } from '@/components/template/AnimatedNumber';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { sampleActions, useSampleStore } from '@/store/sampleStore';

import styles from './Zustand.module.scss';

// Hoist motion animation configs outside component to prevent recreation on every render
const MOTION_HOVER = { scale: 1.1, transition: { duration: 0.2 } };
const MOTION_TAP = { scale: 0.8, transition: { duration: 0.2 } };

const ZustandSample = () => {
  const { t } = useLingui();

  const number = useSampleStore((state) => state.number);
  const { increase, decrease } = sampleActions;

  return (
    <Card className={styles['root']}>
      <div className={styles['title']}>Zustand</div>

      <div className={styles['contents']}>
        <div className={styles['number']}>
          <AnimatedNumber value={number.toString()} />
        </div>
        <div className={styles['button-area']}>
          <motion.div whileHover={MOTION_HOVER} whileTap={MOTION_TAP}>
            <Button
              size={'sm'}
              variant={'default'}
              className={'w-full font-bold'}
              onClick={increase}
            >
              <Icon icon={'mingcute:plus-fill'} width={15} height={15} className={'min-w-4 mr-1'} />
              {t`Add`.toUpperCase()}
            </Button>
          </motion.div>
          <motion.div whileHover={MOTION_HOVER} whileTap={MOTION_TAP}>
            <Button
              size={'sm'}
              variant={'destructive'}
              className={'w-full font-bold'}
              onClick={decrease}
            >
              <Icon
                icon={'mingcute:minus-square-fill'}
                width={15}
                height={15}
                className={'min-w-4 mr-1'}
              />
              {t`Subtract`.toUpperCase()}
            </Button>
          </motion.div>
        </div>
      </div>
    </Card>
  );
};

export default ZustandSample;
