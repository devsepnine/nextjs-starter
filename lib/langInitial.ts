import { cookies, headers } from 'next/headers';

import { LANGUAGE_COOKIE, setLanguageCookie } from '@/i18n/settings.ts';

export async function langInitializer(): Promise<string> {
  let lng: string;
  const c = await cookies();
  const cookie = c.get('scorn')?.value ?? undefined;
  if (cookie) lng = cookie;
  else {
    const h = await headers();
    let acceptLang = h.get(LANGUAGE_COOKIE) ?? undefined;
    lng = setLanguageCookie(acceptLang);
  }
  return lng;
}
