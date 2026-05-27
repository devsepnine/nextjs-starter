import 'server-only';

import { cookies } from 'next/headers';

import { cache } from 'react';

import { setupI18n } from '@lingui/core';

import { FALLBACK_LANG, LANGUAGE_COOKIE, SUPPORTED_LNGS, type Locales } from '@/lib/i18n';
import { getMessages } from '@/lib/i18n-messages';

/**
 * 서버 사이드에서 현재 locale을 가져오는 함수
 * - 쿠키에서 언어 설정을 읽어옴
 * - 지원하지 않는 언어일 경우 fallback 언어 반환
 */
export async function getServerLocale(): Promise<Locales> {
  const cookieStore = await cookies();
  const locale = cookieStore.get(LANGUAGE_COOKIE)?.value;

  if (locale && SUPPORTED_LNGS.includes(locale)) {
    return locale;
  }

  return FALLBACK_LANG;
}

/**
 * locale별 i18n 인스턴스를 React cache로 요청당 1회만 생성.
 * - 컴파일된 메시지(@/locales/{locale}/messages)를 직접 사용
 * - ICU/플러럴/인터폴레이션이 올바르게 동작 (i18n._()가 처리)
 */
const getI18nInstance = cache((locale: Locales) =>
  setupI18n({
    locale,
    messages: { [locale]: getMessages(locale) },
  })
);

/**
 * 서버 사이드에서 번역 함수를 제공하는 함수
 * - 컴파일된 메시지로 setupI18n해 t = i18n._ 바인딩
 * - msg`...` descriptor와 plain string id 모두 처리 가능
 */
export async function getServerTranslations(locale?: Locales) {
  const currentLocale = locale ?? (await getServerLocale());
  const i18n = getI18nInstance(currentLocale);

  return {
    t: i18n._.bind(i18n),
    locale: currentLocale,
  };
}
