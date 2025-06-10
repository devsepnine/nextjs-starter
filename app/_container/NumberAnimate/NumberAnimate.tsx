'use client';

import { useState } from 'react';

import { AnimatedNumber } from '@/components/template/AnimatedNumber';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from '@/i18n/client';
import { NUM_REGEX } from '@/lib/constants';
import { cn } from '@/lib/utils';

const NumberAnimate = () => {
  const { t } = useTranslation('common');
  const [tempNumber, setTempNumber] = useState<string>('0');
  const [number, setNumber] = useState<string>('0');

  const [position, setPosition] = useState<string>('justify-end');
  const [size, setSize] = useState<number>(1.5);

  const handleInput = () => {
    const value = tempNumber;

    if (NUM_REGEX.test(value)) {
      setNumber(value);
    } else {
      setNumber('0');
    }
  };

  return (
    <Card className={'w-full h-full p-4'}>
      <div className={'flex flex-col gap-y-4 items-center justify-center'}>
        <div className={'w-full p-2 border-border border-1 rounded-md'}>
          <AnimatedNumber
            value={number}
            fontSize={size}
            className={cn('relative flex-wrap font-bold  w-full', position)}
          />
        </div>

        <div className={'grid grid-cols-6 gap-2 w-full'}>
          <Input
            name={'number-input'}
            aria-label={'Number Input'}
            type={'text'}
            className={'h-10 col-span-6 sm:col-span-4'}
            value={tempNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              if (NUM_REGEX.test(value) || value === '') {
                setTempNumber(value);
              }
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                handleInput();
              }
            }}
          />
          <Button
            onClick={handleInput}
            aria-label={t('Input')}
            className={'h-10 col-span-6 sm:col-span-2'}
          >
            {t('Input').toUpperCase()}!!
          </Button>
          <Select value={position} onValueChange={setPosition}>
            <SelectTrigger className={'w-full col-span-3'} size={'semi-lg'} aria-label={'Position'}>
              <SelectValue placeholder={'Select'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={'justify-start'}>{t('Left').toUpperCase()}</SelectItem>
              <SelectItem value={'justify-center'}>{t('Center').toUpperCase()}</SelectItem>
              <SelectItem value={'justify-end'}>{t('Right').toUpperCase()}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={size.toString()} onValueChange={(value) => setSize(Number(value))}>
            <SelectTrigger className={'w-full col-span-3'} aria-label={'Size'} size={'semi-lg'}>
              <SelectValue placeholder={'Size'} />
            </SelectTrigger>
            <SelectContent>
              {[1, 1.5, 2, 2.5, 3].map((s) => (
                <SelectItem key={s} value={s.toString()}>
                  {s}x
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};

export default NumberAnimate;
