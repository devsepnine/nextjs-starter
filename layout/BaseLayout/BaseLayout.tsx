import React from 'react';

import { Header } from '@/layout/BaseLayout/Header/Header';

import styles from './BaseLayout.module.scss';

export function BaseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={styles['base-layout']}>
      <Header />
      <main className={styles['contents']}>{children}</main>
    </div>
  );
}
