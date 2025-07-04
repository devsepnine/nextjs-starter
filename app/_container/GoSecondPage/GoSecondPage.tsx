'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

const GoSecondPage = () => {
  const router = useRouter();
  return (
    <Button
      className={'w-full'}
      onClick={() => {
        router.push('/second');
      }}
    >
      GoSecondPage
    </Button>
  );
};

export default GoSecondPage;
