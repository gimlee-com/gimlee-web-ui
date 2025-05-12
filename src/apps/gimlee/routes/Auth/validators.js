import i18n from 'gimlee-ui-service/i18n';
import { validation } from 'gimlee-ui-model/forms';

export function validateNickname(nickname) {
  let message;
  let valid = false;
  if (!nickname || nickname.length === 0) {
    message = i18n.t('app:auth:validation:noNickname');
  } else if (nickname.length > 50) {
    message = i18n.t('app:auth:validation:nicknameTooLong');
  } else {
    valid = true;
  }

  return { ...validation, valid, message };
}
