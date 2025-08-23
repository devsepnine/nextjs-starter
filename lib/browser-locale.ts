import { cookies } from 'next/headers';

import { FALLBACK_LANG, LANGUAGE_COOKIE, SUPPORTED_LNGS, type Locales } from '@/lib/i18n';

/**
 * 현재 설정된 locale을 가져오는 함수 (미들웨어에서 이미 감지 완료)
 * - 쿠키에서 언어 설정을 읽어옴
 * - 미들웨어에서 브라우저 언어 감지 및 쿠키 설정이 완료됨
 */
export async function getLocaleFromCookie(): Promise<Locales> {
  const cookieStore = await cookies();
  const locale = cookieStore.get(LANGUAGE_COOKIE)?.value;

  // 쿠키에 저장된 언어가 있고 지원하는 언어인 경우
  if (locale && SUPPORTED_LNGS.includes(locale)) {
    return locale;
  }

  // 쿠키가 없거나 잘못된 경우 기본 언어 반환
  return FALLBACK_LANG;
}
