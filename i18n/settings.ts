import type { InitOptions } from 'i18next';

export interface ILocale {
  language: string;
  locale: string;
  label: string;
}
export const SUPPORTED_LANGUAGES: ILocale[] = [
  {
    language: 'en',
    locale: 'en-US',
    label: 'English',
  },
  {
    language: 'ko',
    locale: 'ko-KR',
    label: '한국어',
  },
  {
    language: 'ja',
    locale: 'ja-JP',
    label: '日本語',
  },
  {
    language: 'zh',
    locale: 'zh-CN',
    label: '中文',
  },
];
export const FALLBACK_LANG = SUPPORTED_LANGUAGES[0].language;
export const SUPPORTED_LNGS = SUPPORTED_LANGUAGES.map(
  (locale) => locale.language,
);
export type Locales = (typeof SUPPORTED_LNGS)[number];

export const LANGUAGE_COOKIE = 'scorn';

export function getOptions(lang = FALLBACK_LANG, ns = 'common'): InitOptions {
  return {
    // debug: true, // Set to true to see console logs
    supportedLngs: SUPPORTED_LNGS,
    fallbackLng: FALLBACK_LANG,
    lng: lang,
    ns,
    react: {
      useSuspense: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  };
}

export function setLanguageCookie(acceptLng: string = '') {
  let lang = '';
  const langList: string[] = [];
  if (acceptLng) {
    const splitLng = acceptLng.split(',');
    for (let i = 0, max = splitLng.length; i < max; i++) {
      const lang = splitLng[i].split(';')[0].split(/[-_]/)[0].toLowerCase();
      langList.push(lang);
    }
  }

  if (langList.length > 0) {
    for (let i = 0, max = langList.length; i < max; i++) {
      if (SUPPORTED_LNGS.includes(langList[i])) {
        lang = langList[i];
        break;
      }
    }
  }
  return lang ? lang : FALLBACK_LANG;
}
