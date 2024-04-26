'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export function RefreshProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    return () => {
      router.refresh();
    };
  }, [router]);
  return <div>{children}</div>;
}
