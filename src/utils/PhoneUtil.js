import googleLibphonenumber from 'google-libphonenumber';

const phoneUtil = googleLibphonenumber.PhoneNumberUtil.getInstance();
const PhoneNumberFormat = googleLibphonenumber.PhoneNumberFormat;

export function appearsValidPhoneNumber(phone: string) {
  return phoneUtil.isPossibleNumberString(phone, 'US');
}

export function formatPhoneNumber(phone: string) {
  return phoneUtil.format(phoneUtil.parse(phone, 'US'), PhoneNumberFormat.E164);
}

export function formatNationalPhoneNumber(phone: string) {
  return appearsValidPhoneNumber(phone)
    ? phoneUtil.format(phoneUtil.parse(phone, 'US'), PhoneNumberFormat.NATIONAL)
    : phone;
}
