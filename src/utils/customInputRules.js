const acceptOnlyLetters = (key) => {
  return /[а-яa-z]/gi.test(key);
};
const acceptOnlyNumbers = (key) => {
  return /[0-9]/gi.test(key);
};
export { acceptOnlyLetters, acceptOnlyNumbers };
