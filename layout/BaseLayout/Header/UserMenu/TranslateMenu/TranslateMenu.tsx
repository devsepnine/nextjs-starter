'use client';

import { Icon } from '@iconify/react';

import { switchLocaleAction } from '@/actions/switch-locale.ts';
import { useTranslation } from '@/i18n/client.ts';
import { SUPPORTED_LANGUAGES } from '@/i18n/settings.ts';

import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu.tsx';

export function TranslateMenu() {
  const { i18n } = useTranslation('common');

  return (
    <>
      <DropdownMenuSubTrigger>
        <div className={'flex items-center gap-x-2 w-full'}>
          <Icon icon={'mingcute:earth-2-fill'} width={15} height={15} />
          <div>{i18n.resolvedLanguage?.toUpperCase()}</div>
        </div>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {SUPPORTED_LANGUAGES.map((locale) => (
            <DropdownMenuItem
              key={locale.language}
              onClick={() => {
                switchLocaleAction(locale.language).then();
              }}
            >
              {locale.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </>
  );
}
