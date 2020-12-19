function isValidEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default (self) => ({
  emailValidator: [
    (email) => {
      if (email.trim() === '') return self.$t('EMAIL_VALIDATOR_REQUIRED');
      if (!isValidEmail(email)) return self.$t('EMAIL_VALIDATOR_VALID');
      return true;
    },
  ],
  passwordValidator: [
    (password) => {
      if (password.trim() === '') return self.$t('PASSWORD_VALIDATOR_REQUIRED');
      return true;
    },
  ],
  requiredRules: [(v) => !!v || self.$t('REQUIRED_NAME')],
});
