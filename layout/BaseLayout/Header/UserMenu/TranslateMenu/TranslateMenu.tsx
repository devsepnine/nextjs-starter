'use client';

import { switchLocaleAction } from '@/actions/switch-locale.ts';
import { useTranslation } from '@/i18n/client.ts';
import { SUPPORTED_LANGUAGES } from '@/i18n/settings.ts';

import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/DropdownMenu.tsx';

export function TranslateMenu() {
  const { i18n } = useTranslation('common');

  return (
    <>
      <DropdownMenuSubTrigger>
        Translate ({i18n.resolvedLanguage})
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
