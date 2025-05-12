export default {
  register: {
    register: 'Rejestracja',
    doRegister: 'Zarejestruj',
    repeatPassword: 'Powtórz hasło',
    passwordPlaceholder: 'Wprowadź hasło',
    emailPlaceholder: 'Wprowadź adres E-Mail',
    usernamePlaceholder: 'Wprowadź nazwę użytkownika',
    complete: '<p>Twoje konto zostało utworzone pomyślnie!<br/>Wiadomość potwierdzająca rejestrację użytkownika została wysłana ' +
    'na adres <strong>{{email}}</strong>. Aby dokończyć rejestrację, postępuj zgodnie z instrukcjami zawartymi w wiadomości.</p>',
    pending: 'Trwa rejestracja',
  },
  login: {
    remember: 'Zapamiętaj mnie na tym urządzeniu',
    remember_short: 'Zapamiętaj mnie',
    pending: 'Trwa logowanie',
    newAdInfo: 'Tylko zalogowani użytkownicy mogą publikować ogłoszenia.',
  },
  verify: {
    submitVerify: 'Potwierdź',
    resendError: 'Wystąpił błąd podczas wysyłania kodu weryfikującego. Prosimy spróbować później. Przepraszamy za niedogodności.',
    resendSuccess: 'Twój nowy kod veryfikacyjny został wysłany pomyślnie.',
    resendPending: 'Trwa wysyłanie nowego kodu weryfikacyjnego',
  },
  validation: {
    usernameTaken: 'Wybrana nazwa użytkownika jest już zajęta',
    emailTaken: 'Podany adres E-Mail jest już zarejestrowany',
    invalidUsername: 'Nieprawidłowa nazwa użytkownika',
    invalidEmail: 'Nieprawidłowy adres E-Mail',
    invalidPhone: 'Nieprawidłowy numer telefonu',
    passwordsDoNotMatch: 'Wprowadzone hasła nie są takie same',
    passwordNotSecure: 'Hasło powinno się składać z co najmniej 8 znaków,' +
    'w tym co najmniej jednej małej i jednej dużej litery oraz jednej cyfry',
    noNickname: 'Pole wymagane',
    nicknameTooLong: 'Przepraszamy, ta nazwa jest zbyt długa',
  },
};
