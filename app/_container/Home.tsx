import { div as MotionDiv } from 'motion/react-client';
import dynamic from 'next/dynamic';

import { Hello } from '@/app/_container/Hello/Hello';

const InfoPack = dynamic(() =>
  import('@/app/_container/InfoPack/InfoPack').then((mod) => ({ default: mod.InfoPack }))
);
const NumberAnimate = dynamic(() => import('@/app/_container/NumberAnimate/NumberAnimate'));
const Something = dynamic(() =>
  import('@/app/_container/Something/Something').then((mod) => ({ default: mod.Something }))
);
const ZustandSample = dynamic(() => import('@/app/_container/Zustand/ZustandSample'));

import styles from './Home.module.scss';

export function Home() {
  return (
    <div className={styles['home']}>
      <MotionDiv
        className={'md:col-span-2'}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.1 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <Hello />
      </MotionDiv>
      <MotionDiv
        className={'w-full h-full bp:col-span-2'}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <InfoPack />
      </MotionDiv>
      <MotionDiv
        className={'w-full h-full'}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.3 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <Something />
      </MotionDiv>
      <MotionDiv
        className={'w-full h-full'}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.4 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <ZustandSample />
      </MotionDiv>
      <MotionDiv
        className={'w-full h-full'}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.5 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <NumberAnimate />
      </MotionDiv>
    </div>
  );
}
