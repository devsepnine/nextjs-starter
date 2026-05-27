import { FALLBACK_LANG, type Locales } from '@/lib/i18n';
import { messages as ar } from '@/locales/ar/messages';
import { messages as en } from '@/locales/en/messages';
import { messages as ja } from '@/locales/ja/messages';
import { messages as ko } from '@/locales/ko/messages';
import { messages as zhCn } from '@/locales/zh-cn/messages';
import { messages as zhTw } from '@/locales/zh-tw/messages';

import type { Messages } from '@lingui/core';

const ALL_MESSAGES: Record<Locales, Messages> = {
  en,
  ko,
  ja,
  'zh-cn': zhCn,
  'zh-tw': zhTw,
  ar,
};

export function getMessages(locale: Locales): Messages {
  return ALL_MESSAGES[locale] ?? ALL_MESSAGES[FALLBACK_LANG as Locales];
}
