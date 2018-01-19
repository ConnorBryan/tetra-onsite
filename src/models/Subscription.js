import Plan from 'src/models/Plan';

export default class Subscription {
  plan: Plan;
  status: string;
  cancelAtPeriodEnd: boolean;
  currentPeriodStart: ?Date;
  currentPeriodEnd: ?Date;

  constructor(data: any) {
    this.plan = new Plan(data.plan);
    this.status = data.status || 'unknown';
    this.cancelAtPeriodEnd =
      data.cancelAtPeriodEnd || data.cancel_at_period_end || false;

    const currentPeriodStart =
      data.currentPeriodStart || data.current_period_start || null;
    this.currentPeriodStart =
      currentPeriodStart != null ? new Date(currentPeriodStart) : null;

    const currentPeriodEnd =
      data.currentPeriodEnd || data.current_period_end || null;
    this.currentPeriodEnd =
      currentPeriodEnd != null ? new Date(currentPeriodEnd) : null;
  }
}
