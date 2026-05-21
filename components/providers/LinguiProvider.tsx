'use client';

import { ReactNode, useEffect, useState } from 'react';

import { I18nProvider } from '@lingui/react';

import { FALLBACK_LANG, i18n, loadMessages } from '@/lib/i18n';
import type { Locales } from '@/lib/i18n';

interface LinguiProviderProps {
  children: ReactNode;
  locale: Locales;
}

/**
 * Lingui I18n Provider 컴포넌트
 *
 * - 첫 렌더 시 i18n.activate를 동기적으로 호출해 `@lingui/react`의 I18nProvider가
 *   `i18n.locale === null`일 때 null을 반환하는 가드를 우회. LCP 차단 방지.
 * - 실제 메시지는 useEffect에서 비동기 로드. 메시지 도착 시 i18n.on('change') 이벤트가
 *   I18nProvider 내부의 리스너를 트리거해 번역이 자동 반영됨.
 * - useState 이니셜라이저는 mount 시 한 번만 실행되어 사이드 이펙트를 안전하게 수행.
 */
export default function LinguiProvider({ children, locale }: Readonly<LinguiProviderProps>) {
  useState(() => {
    if (i18n.locale !== locale) {
      // 빈 메시지로라도 즉시 activate → I18nProvider null 가드 우회
      // 실제 메시지는 아래 useEffect에서 비동기 로드됨
      i18n.load(locale, {});
      i18n.activate(locale);
    }
    return null;
  });

  useEffect(() => {
    let cancelled = false;

    loadMessages(locale).catch((error) => {
      if (cancelled) return;

      console.error('Failed to initialize i18n', error);

      // 모든 fallback이 실패해도 i18n이 최소한 활성화 상태이도록 보장
      // (loadMessages 내부에서 FALLBACK_LANG으로 한 번 더 시도하지만,
      //  그것마저 실패한 극단적인 경우의 안전망)
      if (!i18n.locale) {
        i18n.load(FALLBACK_LANG, {});
        i18n.activate(FALLBACK_LANG);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
