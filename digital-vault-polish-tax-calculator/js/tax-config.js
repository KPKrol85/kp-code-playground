export const TAX_CONFIG = {
  thresholds: {
    annualTaxFreeAmount: 30000,
    firstBracketLimit: 120000,
    firstBracketRate: 0.12,
    secondBracketRate: 0.32,
    linearRate: 0.19,
  },
  socialRates: {
    pension: 0.0976,
    disability: 0.015,
    sickness: 0.0245,
  },
  healthRates: {
    employee: 0.09,
    b2bScale: 0.09,
    b2bLinear: 0.049,
    b2bLumpSum: 0.09,
  },
  ppk: { employeeRate: 0.02 },
  employerRates: {
    pension: 0.0976,
    disability: 0.065,
    accident: 0.0167,
    laborFund: 0.0245,
    fgsp: 0.001,
    ppk: 0.015,
  },
  deductibleCosts: {
    standard: 250,
    elevated: 300,
    fiftyPercentRate: 0.5,
  },
  pit2MonthlyRelief: 300,
  under26AnnualExemption: 85528,
  b2bLumpSumRates: { it: 0.12, general: 0.085 },
  b2bZus: {
    full: { social: 1600, healthBase: 6000 },
    preferential: { social: 450, healthBase: 4500 },
    starter: { social: 0, healthBase: 4500 },
  },
  notes: {
    legalDisclaimer: 'Wyniki są szacunkowe. Przepisy podatkowe i składkowe mogą ulegać zmianie.',
    accountingCheck: 'Wybrane ustawienia mogą wymagać indywidualnej konsultacji z księgowym.',
  },
};
