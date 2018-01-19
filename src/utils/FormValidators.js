import { appearsValidPhoneNumber } from 'src/utils/PhoneUtil';

const emailRegex = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
export function getEmailError(email: string) {
  if (email.length === 0) return 'An email address is required';
  if (!email.match(emailRegex))
    return `This doesn't look like an email address`;
  return null;
}

export function getPhoneError(phone: string) {
  if (phone.length === 0) return 'A phone number is required';
  if (!appearsValidPhoneNumber(`+1${phone}`))
    return `This doesn't look like a phone number`;
  return null;
}

export function getFirstNameError(firstName: string) {
  if (firstName.length === 0) return 'Your first name is required';
  if (firstName.length > 50) return 'Maximum 50 characters';
  return null;
}

export function getLastNameError(lastName: string) {
  if (lastName.length === 0) return 'Your last name is required';
  if (lastName.length > 50) return 'Maximum 50 characters';
  return null;
}

export function getPasswordError(password: string) {
  if (password.length === 0) return 'A password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  if (password.length > 255) return 'Maximum 255 characters';
  return null;
}
