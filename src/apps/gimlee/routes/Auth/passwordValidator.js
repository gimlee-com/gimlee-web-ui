/* eslint-disable newline-per-chained-call */
import PasswordValidator from 'password-validator';

const passwordValidator = new PasswordValidator();
export default passwordValidator
  .is().min(8)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().not().spaces();
