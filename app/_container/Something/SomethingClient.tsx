'use client';

import { Icon } from '@iconify/react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import styles from './Something.module.scss';

interface SomethingClientProps {
  sampleText: string;
  boopText: string;
  popText: string;
}

const SomethingClient = ({ sampleText, boopText, popText }: SomethingClientProps) => {
  return (
    <Card className={styles['root']}>
      <Icon icon={'line-md:hazard-lights-loop'} width={50} height={50} />
      <div>{sampleText}</div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'outline'}>{boopText} !!</Button>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined}>
          <DialogTitle className={'hidden'}>pop</DialogTitle>
          <div className={'flex justify-center'}>{popText}!</div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SomethingClient;
