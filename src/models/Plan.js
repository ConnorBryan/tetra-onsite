import { formatCents } from 'src/utils/Currency';

export default class Plan {
  name: string;
  noteSeconds: number;
  isNoteTimeUnlimited: boolean;
  interval: string;
  intervalCount: number;
  cost: number;
  currency: string;

  constructor(data: any) {
    this.name = data.name;
    this.noteSeconds = data.noteSeconds || data.note_seconds || 0;
    this.isNoteTimeUnlimited =
      data.isNoteTimeUnlimited || data.is_note_time_unlimited || false;
    this.interval = data.interval;
    this.intervalCount = data.intervalCount || data.interval_count;
    this.cost = data.cost;
    this.currency = data.currency;
  }

  getPrice() {
    return formatCents(this.currency, this.cost);
  }

  getInterval() {
    return `${this.noteSeconds / 60} Minutes for ${this.getPrice()} ${this
      .intervalCount == 1
      ? `per ${this.interval}`
      : `every ${this.intervalCount} ${this.interval}s`}`;
  }
}
