// Lingui i18n 설정 파일
import { i18n } from '@lingui/core';

// 지원하는 언어 정의 (기존 i18next 설정과 동일하지만 zh를 분리)
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
    language: 'zh-cn',
    locale: 'zh-CN',
    label: '中文 (简体)',
  },
  {
    language: 'zh-tw',
    locale: 'zh-TW',
    label: '中文 (繁體)',
  },
];

export const FALLBACK_LANG = SUPPORTED_LANGUAGES[0].language;
export const SUPPORTED_LNGS = SUPPORTED_LANGUAGES.map((locale) => locale.language);
export type Locales = (typeof SUPPORTED_LNGS)[number];

// 언어 쿠키명 (기존과 동일)
export const LANGUAGE_COOKIE = 'scorn';

// 중국어 지역 코드 처리
function parseChineseVariant(region: string): string {
  if (region === 'cn' || region === 'hans') {
    return 'zh-cn';
  }
  if (region === 'tw' || region === 'hk' || region === 'hant') {
    return 'zh-tw';
  }
  return 'zh-cn'; // 기본값은 간체
}

// Accept-Language 문자열에서 언어 목록 추출
function extractLanguageList(acceptLng: string): string[] {
  const langList: string[] = [];
  const splitLng = acceptLng.split(',');

  for (const langItem of splitLng) {
    const fullLang = langItem.split(';')[0].trim().toLowerCase();
    const baseLang = fullLang.split(/[-_]/)[0];

    if (baseLang === 'zh') {
      const region = fullLang.split(/[-_]/)[1];
      langList.push(parseChineseVariant(region));
    } else {
      langList.push(baseLang);
    }
  }

  return langList;
}

// 지원하는 언어 중 첫 번째 매칭되는 언어 찾기
function findSupportedLanguage(langList: string[]): string {
  return langList.find((lang) => SUPPORTED_LNGS.includes(lang)) || '';
}

// Accept-Language 헤더에서 언어 감지 (zh-cn, zh-tw 지원 추가)
export function setLanguageCookie(acceptLng: string = '') {
  if (!acceptLng) {
    return FALLBACK_LANG;
  }

  const langList = extractLanguageList(acceptLng);
  const detectedLang = findSupportedLanguage(langList);

  return detectedLang || FALLBACK_LANG;
}

// 동적으로 메시지 로드 (SWC에서 처리됨)
export async function loadMessages(locale: Locales) {
  try {
    const messages = await import(`@/locales/${locale}/messages.po`);
    i18n.load(locale, messages.messages || messages.default);
    i18n.activate(locale);
  } catch (error) {
    console.warn(`Failed to load messages for ${locale}, falling back to ${FALLBACK_LANG}`, error);

    try {
      const fallbackMessages = await import(`@/locales/${FALLBACK_LANG}/messages.po`);
      i18n.load(FALLBACK_LANG, fallbackMessages.messages || fallbackMessages.default);
      i18n.activate(FALLBACK_LANG);
    } catch (fallbackError) {
      console.error(
        `Critical error: Failed to load fallback language ${FALLBACK_LANG}`,
        fallbackError
      );
      throw new Error(
        `Failed to load any language messages. Original: ${error instanceof Error ? error.message : 'Unknown error'}, Fallback: ${fallbackError instanceof Error ? fallbackError.message : 'Unknown error'}`
      );
    }
  }
}

export { i18n };
