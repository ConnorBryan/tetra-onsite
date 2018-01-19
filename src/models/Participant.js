import { formatNationalPhoneNumber } from 'src/utils/PhoneUtil';

export default class Participant {
  email: ?string;
  phoneNumber: ?string;
  firstName: ?string;
  lastName: ?string;

  constructor(data: any) {
    this.email = data.email;
    this.phoneNumber = data.phoneNumber || data.phone_number || null;
    this.firstName = data.firstName || data.first_name || null;
    this.lastName = data.lastName || data.last_name || null;
  }

  getUniqueName() {
    return this.phoneNumber != null
      ? formatNationalPhoneNumber(this.phoneNumber)
      : this.email;
  }

  getFullName() {
    let name = '';
    if (this.firstName) name += this.firstName;
    if (this.firstName && this.lastName) name += ' ';
    if (this.lastName) name += this.lastName;
    return name;
  }

  getDisplayName(): string {
    const fullName = this.getFullName();
    const uniqueName = this.getUniqueName();
    return fullName != '' ? fullName : uniqueName != null ? uniqueName : '';
  }

  getDisplayLetter(): string {
    const displayName = this.getDisplayName();
    const replacedName = displayName.replace(/\W/g, '');
    return replacedName != '' ? replacedName.substr(0, 1) : '?';
  }
}
