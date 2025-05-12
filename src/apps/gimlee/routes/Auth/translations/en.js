export default {
  register: {
    register: 'New account registration',
    doRegister: 'Register',
    repeatPassword: 'Re-enter the password',
    passwordPlaceholder: 'Enter new password',
    emailPlaceholder: 'Enter your E-Mail address',
    usernamePlaceholder: 'Enter your username',
    complete: '<p>Your account has been registered successfully. Confirmation email has been sent to' +
    ' <strong>{{email}}</strong>. Please check your email and follow the instructions to complete your registration process.</p>',
    pending: 'Registering',
  },
  login: {
    remember: 'Remember me on this device',
    remember_short: 'Remember me',
    pending: 'Logging in',
    newAdInfo: 'Only registered users can publish ads.',
  },
  verify: {
    submitVerify: 'Confirm',
    resendError: 'An error occurred when sending new verification code. Please try later. Apologies for the inconvenience.',
    resendSuccess: 'Your new verification code has been sent successfully.',
    resendPending: 'Sending new verification code...',
  },
  validation: {
    usernameTaken: 'Username is already taken',
    emailTaken: 'E-Mail address is already taken',
    invalidUsername: 'Invalid username - only alphanumeric characters allowed',
    invalidEmail: 'Invalid E-Mail address',
    invalidPhone: 'Invalid phone number',
    passwordsDoNotMatch: 'Passwords do not match',
    passwordNotSecure: 'Password should be at least 8 characters long,' +
    'should contain at least one lower-case and one upper-case character' +
    'and should contain a digit',
    noNickname: 'Please, tell us your nickname',
    nicknameTooLong: 'Your nickname is too long',
  },
};
