declare type StripeElementsCreateOptions = any;

declare class StripeElements {};

declare class StripeInstance {
	elements(options?: StripeElementsCreateOptions): StripeElements
};

declare function Stripe(string): StripeInstance;