import moment from 'moment';
import i18n from 'gimlee-ui-service/i18n';
import validation from 'gimlee-ui-model/forms/validation';

const EMAIL_REGEXP = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const PHONE_REGEXP = /^\+?[0-9. ()-]{7,25}$/;

export function validateTime(time) {
  const momentTime = moment(time);
  const hours = momentTime.hour();
  const minutes = momentTime.minute();
  let message;
  let valid = false;
  if (hours < 0 || hours > 23) {
    message = i18n.t('app:validation:invalidHour');
  } else if (minutes < 0 || minutes > 59) {
    message = i18n.t('app:validation:invalidMinute');
  } else {
    valid = true;
  }
  return { ...validation, valid, message };
}

export function validateEmail(email) {
  let message;
  let valid = true;
  if (!email.match(EMAIL_REGEXP)) {
    valid = false;
    message = i18n.t('app:validation:invalidEmail');
  }
  return { ...validation, valid, message };
}

export function validatePhone(phone) {
  let message;
  let valid = true;
  if (!phone.match(PHONE_REGEXP)) {
    valid = false;
    message = i18n.t('app:validation:invalidPhone');
  }
  return { ...validation, valid, message };
}
