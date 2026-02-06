import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { fr } from './locales';

export const SUPPORTED_LANGUAGES = ['fr'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = 'fr';

i18n.use(initReactI18next).init({
  resources: {
    fr: {
      translation: fr,
    },
  },
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  interpolation: {
    escapeValue: false,
  },
  keySeparator: '.',
  react: {
    useSuspense: false,
  },
});

export default i18n;
