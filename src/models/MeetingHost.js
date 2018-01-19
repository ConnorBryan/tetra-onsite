export type MeetingHostData = {
  email: string,
  phone_number: string,
  first_name: string,
  last_name: string,
};
export default class MeetingHost {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;

  constructor(data: MeetingHostData) {
    this.email = data.email;
    this.phoneNumber = data.phone_number;
    this.firstName = data.first_name;
    this.lastName = data.last_name;
  }

  getUniqueName() {
    return this.phoneNumber != null ? this.phoneNumber : this.email;
  }

  getFullName() {
    let name = '';
    if (this.firstName) name += this.firstName;
    if (this.firstName && this.lastName) name += ' ';
    if (this.lastName) name += this.lastName;
    return name;
  }

  getDisplayName() {
    const fullName = this.getFullName();
    return fullName != '' ? fullName : this.getUniqueName();
  }
}
