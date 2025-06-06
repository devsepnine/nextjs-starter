'use client';

import { useState } from 'react';

import { AnimatedNumber } from '@/components/template/AnimatedNumber';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { NUM_REGEX } from '@/lib/constants';

const NumberAnimate = () => {
  const [tempNumber, setTempNumber] = useState<string>('0');
  const [number, setNumber] = useState<string>('0');

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
        <div className={'w-full p-2 border-border border-1 rounded-md '}>
          <AnimatedNumber
            value={number}
            className={'relative flex-wrap font-bold justify-start w-full'}
          />
        </div>

        <div className={'flex gap-x-2 items-center'}>
          <Input
            type={'text'}
            className={'w-full h-10'}
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
          <Button onClick={handleInput}>Input!</Button>
        </div>
      </div>
    </Card>
  );
};

export default NumberAnimate;
