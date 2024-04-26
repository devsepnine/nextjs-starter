import { cookies, headers } from 'next/headers';

import { LANGUAGE_COOKIE, setLanguageCookie } from '@/i18n/settings.ts';

export function langInitializer(): string {
  let lng: string;
  const cookieStore = cookies();
  const cookie = cookieStore.get('scorn')?.value || undefined;
  if (cookie) lng = cookie;
  else {
    let acceptLang = headers().get(LANGUAGE_COOKIE) || undefined;
    lng = setLanguageCookie(acceptLang);
  }
  return lng;
}
