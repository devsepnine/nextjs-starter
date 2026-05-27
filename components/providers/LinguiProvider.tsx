'use client';

import { ReactNode, useState } from 'react';

import { I18nProvider } from '@lingui/react';

import { i18n } from '@/lib/i18n';
import type { Locales } from '@/lib/i18n';

import type { Messages } from '@lingui/core';

interface LinguiProviderProps {
  children: ReactNode;
  locale: Locales;
  messages: Messages;
}

/**
 * Lingui I18n Provider
 *
 * - 서버에서 컴파일된 메시지를 props로 받아 첫 렌더부터 동기적으로 활성화.
 * - 빈 카탈로그로 시작했다가 비동기 로드하던 기존 방식이 유발했던
 *   "Uncompiled message detected" 경고를 제거하고 SSR/CSR 일관성 보장.
 * - useState 이니셜라이저는 마운트 시 1회만 실행되어 사이드 이펙트를 안전하게 수행.
 */
export default function LinguiProvider({
  children,
  locale,
  messages,
}: Readonly<LinguiProviderProps>) {
  useState(() => {
    i18n.load(locale, messages);
    i18n.activate(locale);
    return null;
  });

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
