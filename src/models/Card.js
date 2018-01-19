export default class Card {
  token: string;
  brand: string;
  last4: string;
  isDefault: boolean;
  expMonth: number;
  expYear: number;

  constructor(data: any) {
    this.token = data.token;
    this.brand = data.brand;
    this.last4 = data.last4;
    this.isDefault = data.is_default;
    this.expMonth = data.exp_month;
    this.expYear = data.exp_year;
  }
}
