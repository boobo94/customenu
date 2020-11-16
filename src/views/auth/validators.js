function isValidEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export const emailValidator = [
  (email) => {
    if (email.trim() === '') return 'Email-ul trebuie completat.';
    if (!isValidEmail(email)) return 'Email-ul este invalid.';
    return true;
  },
];

export const passwordValidator = [
  (password) => {
    if (password.trim() === '') return 'Parola trebuie completata.';
    return true;
  },
];
