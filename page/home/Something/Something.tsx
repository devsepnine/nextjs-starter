import { RiBaseStationFill } from '@remixicon/react';

import { createTranslation } from '@/i18n/server.ts';

import styles from './Something.module.scss';

import { Button } from '@/components/ui/button.tsx';
import { Card } from '@/components/ui/card.tsx';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';

export async function Something() {
  const { t } = await createTranslation('common');
  return (
    <Card className={styles['something']}>
      <RiBaseStationFill size={34} />
      <div>{t('JustMock')}</div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'outline'}>{t('Boop')} !!</Button>
        </DialogTrigger>
        <DialogContent>
          <div className={'flex justify-center'}>{t('Pop')}!</div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
