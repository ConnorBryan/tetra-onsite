import Customer from 'src/models/Customer';
import { formatNationalPhoneNumber } from 'src/utils/PhoneUtil';

export default class User {
  id: number;
  email: string;
  phoneNumber: ?string;
  password: ?string;
  firstName: ?string;
  lastName: ?string;
  isAdmin: boolean;
  isAlphaTester: boolean;
  dateCreated: ?Date;
  customer: ?Customer;

  constructor(data: any) {
    this.id = data.id;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber || data.phone_number || null;
    this.password = data.password || null;
    this.firstName = data.firstName || data.first_name || null;
    this.lastName = data.lastName || data.last_name || null;
    this.isAdmin = data.isAdmin || data.is_superuser || false;
    this.isAlphaTester = data.isAlphaTester || data.is_alpha_tester || false;
    this.dateCreated = data.dateCreated || data.date_created || null;

    this.customer = data.customer ? new Customer(data.customer) : null;
  }

  getDisplayName() {
    return this.firstName && this.lastName
      ? `${this.firstName} ${this.lastName}`
      : this.firstName
        ? this.firstName
        : this.lastName ? this.lastName : 'Unknown';
  }

  getDisplayLetter(): string {
    const displayName = this.getDisplayName();
    const replacedName = displayName.replace(/\W/g, '');
    return replacedName != '' ? replacedName.substr(0, 1) : '?';
  }

  getDisplayPhoneNumber() {
    return this.phoneNumber != null
      ? formatNationalPhoneNumber(this.phoneNumber)
      : '';
  }

  getRemainingMinutes() {
    return this.customer != null
      ? Math.floor(this.customer.secondsRemaining / 60)
      : 0;
  }

  getSubscriptionPlan() {
    return this.customer != null && this.customer.subscription != null
      ? this.customer.subscription.plan
      : null;
  }
}
