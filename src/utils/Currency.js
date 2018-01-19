import numeral from 'numeral';

const currencyLocaleMap = {
  usd: 'en',
};

export function formatCents(currency: string, cents: number) {
  numeral.locale(currencyLocaleMap[currency]);
  return numeral(cents / 100).format('$,0.00');
}
