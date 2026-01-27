'use client';

import { Icon } from '@iconify/react';
import { clsx } from 'clsx';

import styles from './Hello.module.scss';

interface HelloClientProps {
  title: string;
  description: string;
  subDescription: string;
}

export function HelloClient({ title, description, subDescription }: HelloClientProps) {
  return (
    <div className={styles['root']}>
      <div className={styles['title']}>
        <Icon icon={'mdi:human-hello-variant'} width={30} height={30} />
        {title}
      </div>
      <div className={styles['description']}>{description}</div>
      <div className={clsx(styles['description'], styles['sub'])}>{subDescription}</div>
    </div>
  );
}
