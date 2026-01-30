import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';

const initI18n = () => {
  if (!i18n.isInitialized) {
    i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources: {
          en: {
            translation: enTranslations
          },
          fr: {
            translation: frTranslations
          }
        },
        fallbackLng: 'en',
        debug: false,
        interpolation: {
          escapeValue: false
        },
        detection: {
          order: ['localStorage', 'navigator'],
          caches: ['localStorage'],
          lookupLocalStorage: 'i18nextLng'
        },
        react: {
          useSuspense: false
        }
      });
  }
  return i18n;
};

initI18n();

export default i18n;

