import styles from './Home.module.scss';

import { Hello } from '@/page/home/Hello/Hello.tsx';
import { InfoPack } from '@/page/home/InfoPack/InfoPack.tsx';
import { Something } from '@/page/home/Something/Something.tsx';

export function Home() {
  return (
    <div className={styles['home']}>
      <Hello />
      <InfoPack />
      <Something />
    </div>
  );
}
