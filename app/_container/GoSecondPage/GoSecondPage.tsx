'use client';

import { useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

const GoSecondPage = () => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push('/second');
  }, [router]);

  return (
    <Button className={'w-full'} onClick={handleClick}>
      GoSecondPage
    </Button>
  );
};

export default GoSecondPage;
