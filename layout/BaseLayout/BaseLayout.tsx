import React from 'react';

import styles from './BaseLayout.module.scss';

import { Header } from '@/layout/BaseLayout/Header/Header.tsx';

export function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles['base-layout']}>
      <Header />
      <main className={styles['contents']}>{children}</main>
    </div>
  );
}
