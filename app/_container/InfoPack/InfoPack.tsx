import { Icon } from '@iconify/react';
import Link from 'next/link';

import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import styles from './InfoPack.module.scss';

const InfoPack = () => {
  return (
    <Card className={styles['root']}>
      <div className={styles['title']}>library list</div>
      <div className={styles['contents']}>
        <span className={styles['chips']}>
          <Icon icon={'logos:nextjs-icon'} width={15} height={15} /> Next.js
        </span>
        <span className={styles['chips']}>
          <Icon icon={'logos:react'} width={15} height={15} />
          React.js
        </span>
        <span className={styles['chips']}>
          <Icon icon={'logos:sass'} width={15} height={15} />
          SCSS
        </span>
        <span className={styles['chips']}>
          <Icon icon={'logos:pwa'} width={15} height={15} />
          PWA
        </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className={styles['chips']}>
                <Icon icon={'logos:tailwindcss-icon'} width={15} height={15} />
                Tailwind CSS
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <div className={'underline'}>
                <Link href={'https://tailwindcss.com/docs'}>DOCS</Link>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span className={styles['chips']}>
          <Icon icon={'icon-park-solid:dark-mode'} width={15} height={15} /> DarkMode
        </span>
        <span className={styles['chips']}>
          <Icon icon={'material-symbols:language'} width={15} height={15} />
          i18n
        </span>
        <span className={styles['chips']}>
          <Icon icon={'icon-park-twotone:disk'} width={15} height={15} />
          Zustand
        </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className={styles['chips']}>
                <Icon icon={'line-md:iconify2-static-twotone'} width={15} height={15} />
                Iconify
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <div className={'underline'}>
                <Link href={'https://icon-sets.iconify.design/'}>Icon List</Link>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className={styles['chips']}>
                <Icon icon={'mdi:design'} width={15} height={15} />
                Shardcn/UI
              </span>
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
};

export default InfoPack;
