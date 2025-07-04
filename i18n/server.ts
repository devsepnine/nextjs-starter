import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { cookies } from 'next/headers';
import { initReactI18next } from 'react-i18next/initReactI18next';

import { FALLBACK_LANG, getOptions, LANGUAGE_COOKIE, Locales } from '@/i18n/settings';

async function initI18next(lang: Locales, namespace: string) {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((lang: string, ns: string) => import(`./locales/${lang}/${ns}.json`)))
    .init(getOptions(lang, namespace));
  return i18nInstance;
}

export async function createTranslation(ns: string) {
  const lang = await getLocale();
  const i18nextInstance = await initI18next(lang, ns);

  return {
    t: i18nextInstance.getFixedT(lang, Array.isArray(ns) ? ns[0] : ns),
  };
}

export async function getLocale() {
  const c = await cookies();
  return c.get(LANGUAGE_COOKIE)?.value ?? FALLBACK_LANG;
}
