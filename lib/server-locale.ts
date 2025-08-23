import { cookies } from 'next/headers';

import { FALLBACK_LANG, LANGUAGE_COOKIE, SUPPORTED_LNGS, type Locales } from '@/lib/i18n';

/**
 * 서버 사이드에서 현재 locale을 가져오는 함수
 * - 쿠키에서 언어 설정을 읽어옴
 * - 지원하지 않는 언어일 경우 fallback 언어 반환
 */
export async function getServerLocale(): Promise<Locales> {
  const cookieStore = await cookies();
  const locale = cookieStore.get(LANGUAGE_COOKIE)?.value;

  // 지원하는 언어인지 확인
  if (locale && SUPPORTED_LNGS.includes(locale)) {
    return locale;
  }

  return FALLBACK_LANG;
}

/**
 * 서버 사이드에서 번역 함수를 제공하는 함수
 * - 동적 임포트를 통해 해당 언어의 메시지를 로드
 * - 서버 컴포넌트에서 직접 번역 사용 가능
 */
export async function getServerTranslations(locale?: Locales) {
  const currentLocale = locale || (await getServerLocale());

  // 동적으로 메시지 임포트 (SWC 플러그인으로 처리된 .po 파일)
  const messages = await import(`@/locales/${currentLocale}/messages.po`)
    .then((module) => module.messages || module.default)
    .catch(async () => {
      // fallback 언어의 메시지 사용
      const fallbackModule = await import(`@/locales/${FALLBACK_LANG}/messages.po`);
      return fallbackModule.messages || fallbackModule.default;
    });

  // Lingui 번역 함수 반환
  return {
    t: (msgDescriptor: any) => {
      // Lingui msg macro는 {id, message} 형태의 객체를 반환
      if (typeof msgDescriptor === 'object' && msgDescriptor.id) {
        return messages[msgDescriptor.id] || msgDescriptor.message || msgDescriptor.id;
      }
      // 문자열이 직접 전달된 경우
      return messages[msgDescriptor] || msgDescriptor;
    },
    locale: currentLocale,
  };
}
