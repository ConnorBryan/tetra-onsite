import Subscription from 'src/models/Subscription';

export default class Customer {
  defaultCard: ?string;
  secondsRemaining: number;
  isDelinquent: boolean;
  subscription: ?Subscription;

  constructor(data: any) {
    this.defaultCard = data.defaultCard || data.default_card || null;
    this.secondsRemaining =
      data.secondsRemaining || data.seconds_remaining || 0;
    this.isDelinquent = data.isDelinquent || data.is_delinquent || false;
    this.subscription = data.subscription
      ? new Subscription(data.subscription)
      : null;
  }
}
