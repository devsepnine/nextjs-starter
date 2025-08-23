'use client';

import { Icon } from '@iconify/react';
import { useLingui } from '@lingui/react';

import { switchLocaleAction } from '@/actions/switch-locale';
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { SUPPORTED_LANGUAGES } from '@/lib/i18n';

export function TranslateMenu() {
  const { i18n } = useLingui();

  return (
    <>
      <DropdownMenuSubTrigger>
        <div className={'flex items-center gap-x-2 w-full'}>
          <Icon icon={'mingcute:earth-2-fill'} width={15} height={15} />
          <div>{i18n.locale?.toUpperCase()}</div>
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
