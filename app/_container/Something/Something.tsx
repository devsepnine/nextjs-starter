import { Icon } from '@iconify/react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { createTranslation } from '@/i18n/server';

import styles from './Something.module.scss';

const Something = async () => {
  const { t } = await createTranslation('common');
  return (
    <Card className={styles['root']}>
      <Icon icon={'line-md:hazard-lights-loop'} width={50} height={50} />
      <div>{t('JustMock')}</div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'outline'}>{t('Boop')} !!</Button>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined}>
          <DialogTitle className={'hidden'}>pop</DialogTitle>
          <div className={'flex justify-center'}>{t('Pop')}!</div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Something;
