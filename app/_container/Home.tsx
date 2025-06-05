import * as motion from 'motion/react-client';

import styles from './Home.module.scss';

import { Hello } from '@/app/_container/Hello/Hello.tsx';
import { InfoPack } from '@/app/_container/InfoPack/InfoPack.tsx';
import { Something } from '@/app/_container/Something/Something.tsx';
import ZustandSample from '@/app/_container/Zustand/ZustandSample.tsx';

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
    </div>
  );
}
