'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

const Second = () => {
  const router = useRouter();
  const goHome = () => {
    router.push('/');
  };
  return <Button onClick={goHome}>Return home Page</Button>;
};

export default Second;
