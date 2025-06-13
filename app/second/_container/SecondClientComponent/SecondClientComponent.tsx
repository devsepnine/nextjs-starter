'use client';

import { Icon } from '@iconify/react';

const SecondClientComponent = () => {
  return (
    <div className={'relative flex items-center justify-center gap-x-2 w-full'}>
      <div className={'py-8'}>
        <Icon icon={'line-md:cloud-alt-print-loop'} width={200} />
      </div>
    </div>
  );
};

export default SecondClientComponent;
