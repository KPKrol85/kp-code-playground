export const formatCurrency = (value) =>
  new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 2 }).format(
    Number.isFinite(value) ? value : 0,
  );

export const round2 = (value) => Math.round((value + Number.EPSILON) * 100) / 100;

export const parseAmount = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : NaN;
};

export const safeMax = (value) => Math.max(0, value);
