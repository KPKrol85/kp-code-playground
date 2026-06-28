export const TAX_CONFIG = {
  year: 2026,
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
  healthMinimums: {
    b2bScale: 432.54,
    b2bLinear: 432.54,
    b2bLumpSumLow: 432.54,
    b2bLumpSumMid: 622.93,
    b2bLumpSumHigh: 1495.04,
  },
  b2bZus: {
    full: { social: 1926.76, healthBase: 5652 },
    preferential: { social: 456.18, healthBase: 1441.8 },
    starter: { social: 0, healthBase: 0 },
  },
  notes: {
    legalDisclaimer: 'Wyniki są szacunkowe i bazują na uproszczonym modelu miesięcznym. Przepisy oraz indywidualne ulgi mogą zmienić wynik.',
    accountingCheck: 'Wybrane ustawienia, szczególnie B2B, ulga dla młodych i 50% KUP, wymagają indywidualnej weryfikacji księgowej.',
  },
};
