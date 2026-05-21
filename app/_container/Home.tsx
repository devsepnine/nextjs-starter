import dynamic from 'next/dynamic';

import { div as MotionDiv } from 'motion/react-client';

const InfoPack = dynamic(() => import('@/app/_container/InfoPack/InfoPack'));
const NumberAnimate = dynamic(() => import('@/app/_container/NumberAnimate/NumberAnimate'));
const Something = dynamic(() => import('@/app/_container/Something/Something'));
const ZustandSample = dynamic(() => import('@/app/_container/Zustand/ZustandSample'));
const GoSecondPage = dynamic(() => import('@/app/_container/GoSecondPage/GoSecondPage'));

import { Hello } from '@/app/_container/Hello/Hello';

import styles from './Home.module.scss';

// opacity는 1로 유지 → LCP 메트릭/체감 모두 정상
// y 슬라이드만 애니메이션하여 시각적 효과 보존
// cascade는 짧게 (마지막 카드 안착 시간: 0.24 + 0.3 = 0.54s)
const MOTION_INITIAL = { y: -20 };
const MOTION_ANIMATE = { y: 0 };
const MOTION_TRANSITION_BASE = { duration: 0.3, ease: 'easeOut' as const };

const createTransition = (delay: number) => ({ ...MOTION_TRANSITION_BASE, delay });

export function Home() {
  return (
    <div className={styles['root']}>
      <MotionDiv
        className={'md:col-span-2'}
        initial={MOTION_INITIAL}
        animate={MOTION_ANIMATE}
        transition={createTransition(0.04)}
      >
        <Hello />
      </MotionDiv>
      <MotionDiv
        className={'w-full h-full bp:col-span-2'}
        initial={MOTION_INITIAL}
        animate={MOTION_ANIMATE}
        transition={createTransition(0.08)}
      >
        <InfoPack />
      </MotionDiv>
      <MotionDiv
        className={'w-full h-full'}
        initial={MOTION_INITIAL}
        animate={MOTION_ANIMATE}
        transition={createTransition(0.12)}
      >
        <Something />
      </MotionDiv>
      <MotionDiv
        className={'w-full h-full'}
        initial={MOTION_INITIAL}
        animate={MOTION_ANIMATE}
        transition={createTransition(0.16)}
      >
        <ZustandSample />
      </MotionDiv>
      <MotionDiv
        className={'w-full h-full'}
        initial={MOTION_INITIAL}
        animate={MOTION_ANIMATE}
        transition={createTransition(0.2)}
      >
        <NumberAnimate />
      </MotionDiv>
      <MotionDiv
        className={'w-full h-full'}
        initial={MOTION_INITIAL}
        animate={MOTION_ANIMATE}
        transition={createTransition(0.24)}
      >
        <GoSecondPage />
      </MotionDiv>
    </div>
  );
}
