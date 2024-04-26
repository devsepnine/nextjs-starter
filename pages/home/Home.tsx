import styles from './Home.module.scss';

import { Hello } from '@/pages/home/Hello/Hello.tsx';
import { InfoPack } from '@/pages/home/InfoPack/InfoPack.tsx';
import { Something } from '@/pages/home/Something/Something.tsx';

export function Home() {
  return (
    <div className={styles['home']}>
      <Hello />
      <InfoPack />
      <Something />
    </div>
  );
}
