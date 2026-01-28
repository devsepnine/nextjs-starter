'use client';

import { useRouter } from 'next/navigation';

import { useCallback } from 'react';


import { Button } from '@/components/ui/button';

const GoSecondPage = () => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push('/temporal');
  }, [router]);

  return (
    <Button className={'w-full'} onClick={handleClick}>
      Temporal Example
    </Button>
  );
};

export default GoSecondPage;
