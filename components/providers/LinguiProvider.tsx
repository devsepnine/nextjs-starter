'use client';

import { ReactNode, useEffect, useState } from 'react';

import { I18nProvider } from '@lingui/react';

import { i18n, loadMessages } from '@/lib/i18n';
import type { Locales } from '@/lib/i18n';

interface LinguiProviderProps {
  children: ReactNode;
  locale: Locales;
}

/**
 * Lingui I18n Provider 컴포넌트
 * - 클라이언트 컴포넌트에서 i18n 컨텍스트를 제공
 * - 서버에서 전달받은 locale에 따라 언어 활성화
 * - 메시지가 로드될 때까지 기다린 후 렌더링
 */
export default function LinguiProvider({ children, locale }: Readonly<LinguiProviderProps>) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function initializeI18n() {
      // 현재 활성화된 언어와 다른 경우 메시지 로드
      if (i18n.locale !== locale) {
        await loadMessages(locale);
      }
      setIsLoaded(true);
    }

    initializeI18n().then();
  }, [locale]);

  // 메시지가 로드되기 전에는 null 반환 (깜빡임 방지)
  if (!isLoaded) {
    return null;
  }

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
