import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import moment from 'moment';
import { pl, en } from '../translations';

const i18n = i18next
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',

    react: {
      wait: true,
    },

    ns: ['common'],
    defaultNS: 'common',
    debug: APP_DEV,
    resources: { pl, en },
  });


i18n.on('languageChanged', (lng) => {
  moment.locale(lng);
});

export default i18n;
