export const moneyFormatter = new Intl.NumberFormat('pl-PL', {
  style: 'currency',
  currency: 'PLN',
  maximumFractionDigits: 2,
});

export function formatMoney(value) {
  return moneyFormatter.format(Number.isFinite(value) ? value : 0);
}

export function round2(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function clampPositive(value) {
  return Math.max(0, Number(value) || 0);
}

export function annualize(monthlyValue, period) {
  return period === 'yearly' ? monthlyValue / 12 : monthlyValue;
}

export function monthlyToPeriod(monthlyValue, period) {
  return period === 'yearly' ? monthlyValue * 12 : monthlyValue;
}
