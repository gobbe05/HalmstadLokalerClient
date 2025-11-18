import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import sv from './sv.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      sv: { translation: sv },
    },
    fallbackLng: 'sv',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
