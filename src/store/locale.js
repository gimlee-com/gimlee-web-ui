import { translations } from 'gimlee-ui-app'; // eslint-disable-line
import i18n from '../service/i18n';

export const SET_LOCALE = 'locale/set-locale';

if (translations) {
  Object.keys(translations).forEach((language) => {
    i18n.addResourceBundle(language, 'app', translations[language], true, true);
  });
}

const language = APP_DEFAULT_LOCALE || 'pl';
i18n.changeLanguage(language);

const initialState = { language };

export function setLocale(locale) {
  i18n.changeLanguage(locale);
  return { type: SET_LOCALE, locale };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOCALE:
      return { language: action.locale };
    default:
      return state;
  }
}
