'use client';

import i18next, { i18n } from 'i18next';
import languageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { useEffect } from 'react';
import { initReactI18next, useTranslation as useTransAlias } from 'react-i18next';

import { useLocale } from '@/hooks/locale-provider';
import { getOptions, LANGUAGE_COOKIE, Locales, SUPPORTED_LNGS } from '@/i18n/settings';

const runsOnServerSide = typeof window === 'undefined';

i18next
  .use(initReactI18next)
  .use(languageDetector)
  .use(resourcesToBackend((lang: string, ns: string) => import(`./locales/${lang}/${ns}.json`)))
  .init({
    ...getOptions(),
    lng: undefined,
    detection: {
      order: ['cookie'],
      lookupCookie: LANGUAGE_COOKIE,
    },
    load: 'languageOnly',
    preload: runsOnServerSide ? SUPPORTED_LNGS : [],
  })
  .then();

export function useTranslation(ns: string) {
  const lng = useLocale();

  const translator = useTransAlias(ns);
  const { i18n } = translator;

  useEffect(() => {
    if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
      i18n.changeLanguage(lng).then();
    }
  }, [lng, i18n]);

  useCustomTranslationImpl(i18n, lng);

  return translator;
}

function useCustomTranslationImpl(i18n: i18n, lng: Locales) {
  useEffect(() => {
    if (!lng || i18n.resolvedLanguage === lng) return;
    i18n.changeLanguage(lng).then();
  }, [lng, i18n]);
}
