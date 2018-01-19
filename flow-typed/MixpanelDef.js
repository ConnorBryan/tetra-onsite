declare var mixpanel: {
  alias(uniqueId: string): void;
  identify(uniqueId: string): void;
  track(eventId: string, data: Object): void;
  time_event(eventId: string): void;
  register(data: Object): void;
  reset(): void;
  people: {
    set(data: Object): void;
  }
}
