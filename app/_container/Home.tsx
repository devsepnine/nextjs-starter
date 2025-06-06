import * as motion from 'motion/react-client';

import { Hello } from '@/app/_container/Hello/Hello';
import { InfoPack } from '@/app/_container/InfoPack/InfoPack';
import NumberAnimate from '@/app/_container/NumberAnimate/NumberAnimate';
import { Something } from '@/app/_container/Something/Something';
import ZustandSample from '@/app/_container/Zustand/ZustandSample';

import styles from './Home.module.scss';

export function Home() {
  return (
    <div className={styles['home']}>
      <motion.div
        className={'md:col-span-2'}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.1 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <Hello />
      </motion.div>
      <motion.div
        className={'w-full h-full bp:col-span-2'}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <InfoPack />
      </motion.div>
      <motion.div
        className={'w-full h-full'}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.3 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <Something />
      </motion.div>
      <motion.div
        className={'w-full h-full'}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.4 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <ZustandSample />
      </motion.div>
      <motion.div
        className={'w-full h-full'}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.5 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <NumberAnimate />
      </motion.div>
    </div>
  );
}
