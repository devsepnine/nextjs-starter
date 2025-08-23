import { Icon } from '@iconify/react';
import { msg } from '@lingui/core/macro';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getServerTranslations } from '@/lib/server-locale';

import styles from './Something.module.scss';

const Something = async () => {
  const { t } = await getServerTranslations();

  return (
    <Card className={styles['root']}>
      <Icon icon={'line-md:hazard-lights-loop'} width={50} height={50} />
      <div>{t(msg`Just Sample Design`)}</div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'outline'}>{t(msg`boop`)} !!</Button>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined}>
          <DialogTitle className={'hidden'}>pop</DialogTitle>
          <div className={'flex justify-center'}>{t(msg`pop`)}!</div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Something;
