import Link from 'next/link';

import styles from './InfoPack.module.scss';

import { Card } from '@/components/ui/Card.tsx';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip.tsx';

export function InfoPack() {
  return (
    <Card className={styles['info-pack']}>
      <div className={styles['title']}>library list</div>
      <div className={styles['contents']}>
        <span className={styles['chips']}>Next.js</span>
        <span className={styles['chips']}>React.js</span>
        <span className={styles['chips']}>SCSS</span>
        <span className={styles['chips']}>PWA</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className={styles['chips']}>Tailwind CSS</span>
            </TooltipTrigger>
            <TooltipContent>
              <div className={'underline'}>
                <Link href={'https://tailwindcss.com/docs'}>DOCS</Link>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span className={styles['chips']}>Dark Mode</span>
        <span className={styles['chips']}>I18n</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className={styles['chips']}>Remix Icon</span>
            </TooltipTrigger>
            <TooltipContent>
              <div className={'underline'}>
                <Link href={'https://remixicon.com/'}>Icon List</Link>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className={styles['chips']}>Shardcn/UI</span>
            </TooltipTrigger>
            <TooltipContent>
              <div className={'underline'}>
                <Link href={'https://ui.shadcn.com/docs'}>DOCS</Link>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </Card>
  );
}
