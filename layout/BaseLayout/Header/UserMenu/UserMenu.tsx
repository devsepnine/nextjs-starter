import { Icon } from '@iconify/react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TranslateMenu } from '@/layout/BaseLayout/Header/UserMenu/TranslateMenu/TranslateMenu';

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} size={'icon'} aria-label={'personal-menu'}>
          <Icon icon={'mingcute:menu-fill'} width={15} height={15} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={'end'}>
        <DropdownMenuSub>
          <TranslateMenu />
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
