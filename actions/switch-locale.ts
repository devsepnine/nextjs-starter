'use server';

import { cookies } from 'next/headers';

import { LANGUAGE_COOKIE } from '@/lib/i18n';

export async function switchLocaleAction(value: string) {
  const c = await cookies();
  c.set(LANGUAGE_COOKIE, value);

  return {
    status: 'success',
  };
}
