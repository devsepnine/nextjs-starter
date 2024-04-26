import { PersonIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/Button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu.tsx';
import { TranslateMenu } from '@/layout/BaseLayout/Header/UserMenu/TranslateMenu/TranslateMenu.tsx';

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} size={'icon'} aria-label={'personal-menu'}>
          <PersonIcon />
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
