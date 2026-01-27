import dynamic from 'next/dynamic';

import { div as MotionDiv } from 'motion/react-client';

const InfoPack = dynamic(() => import('@/app/_container/InfoPack/InfoPack'));
const NumberAnimate = dynamic(() => import('@/app/_container/NumberAnimate/NumberAnimate'));
const Something = dynamic(() => import('@/app/_container/Something/Something'));
const ZustandSample = dynamic(() => import('@/app/_container/Zustand/ZustandSample'));
const GoSecondPage = dynamic(() => import('@/app/_container/GoSecondPage/GoSecondPage'));

import { Hello } from '@/app/_container/Hello/Hello';
import TemporalTest from '@/app/_container/TemporalTest/TemporalTest';

import styles from './Home.module.scss';

// Hoist animation configs outside component to prevent recreation on every render
const MOTION_INITIAL = { opacity: 0, y: -20 };
const MOTION_ANIMATE = { opacity: 1, y: 0 };
const MOTION_TRANSITION_BASE = { duration: 0.5, ease: 'easeInOut' as const };

const createTransition = (delay: number) => ({ ...MOTION_TRANSITION_BASE, delay });

export function Home() {
  return (
    <div className={styles['root']}>
      <MotionDiv
        className={'md:col-span-2'}
        initial={MOTION_INITIAL}
        animate={MOTION_ANIMATE}
        transition={createTransition(0.1)}
      >
        <Hello />
      </MotionDiv>
      <MotionDiv
        className={'w-full h-full bp:col-span-2'}
        initial={MOTION_INITIAL}
        animate={MOTION_ANIMATE}
        transition={createTransition(0.2)}
      >
        <InfoPack />
      </MotionDiv>
      <MotionDiv
        className={'w-full h-full'}
        initial={MOTION_INITIAL}
        animate={MOTION_ANIMATE}
        transition={createTransition(0.3)}
      >
        <Something />
      </MotionDiv>
      <MotionDiv
        className={'w-full h-full'}
        initial={MOTION_INITIAL}
        animate={MOTION_ANIMATE}
        transition={createTransition(0.4)}
      >
        <ZustandSample />
      </MotionDiv>
      <MotionDiv
        className={'w-full h-full'}
        initial={MOTION_INITIAL}
        animate={MOTION_ANIMATE}
        transition={createTransition(0.5)}
      >
        <NumberAnimate />
      </MotionDiv>
      <MotionDiv
        className={'w-full h-full'}
        initial={MOTION_INITIAL}
        animate={MOTION_ANIMATE}
        transition={createTransition(0.6)}
      >
        <GoSecondPage />
      </MotionDiv>
      <MotionDiv
        className={'w-full h-full'}
        initial={MOTION_INITIAL}
        animate={MOTION_ANIMATE}
        transition={createTransition(0.7)}
      >
        <TemporalTest />
      </MotionDiv>
    </div>
  );
}
