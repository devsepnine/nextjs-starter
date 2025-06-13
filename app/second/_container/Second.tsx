'use client';

import { div as MotionDiv } from 'motion/react-client';
import { useRouter } from 'next/navigation';

import SecondClientComponent from '@/app/second/_container/SecondClientComponent/SecondClientComponent';
import { Button } from '@/components/ui/button';

import styles from './Second.module.scss';

const Second = () => {
  const router = useRouter();
  const goHome = () => {
    router.push('/');
  };
  return (
    <MotionDiv
      className={styles['root']}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.1 }}
    >
      <SecondClientComponent />
      <Button className={'w-full'} onClick={goHome}>
        Return home Page
      </Button>
    </MotionDiv>
  );
};

export default Second;
