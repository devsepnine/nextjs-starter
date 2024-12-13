import styles from './Home.module.scss';

import { Hello } from '@/app/_container/Hello/Hello.tsx';
import { InfoPack } from '@/app/_container/InfoPack/InfoPack.tsx';
import { Something } from '@/app/_container/Something/Something.tsx';
import ZustandSample from '@/app/_container/Zustand/ZustandSample.tsx';

export function Home() {
  return (
    <div className={styles['home']}>
      <Hello />
      <InfoPack />
      <Something />
      <ZustandSample />
    </div>
  );
}
