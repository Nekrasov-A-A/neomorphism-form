const alphaRuEn = (v) =>
  /(^|^\s*)[а-я]*($|\s*$)|(^|^\s*)[a-z]*($|\s*$)/gi.test(v);

const firstValueMobilePhoneNumber = (v) => {
  if (v !== "") return /^[7]|^[+7]/g.test(v);
  return true;
};

const MobilePhoneNumberLength = (v) => {
  if (v !== "" && /^[7]|^[+7]/g.test(v)) return v.match(/[0-9]/g).length === 11;
  return true;
};

export { alphaRuEn, firstValueMobilePhoneNumber, MobilePhoneNumberLength };
