export const TAX_CONFIG = {
  constants: {
    annualTaxFreeAmount: 30000,
    taxReductionMonthly: 300,
    firstThreshold: 120000,
    scaleRate1: 0.12,
    scaleRate2: 0.32,
    linearRate: 0.19,
    lumpSumDefaultRate: 0.12,
    annualizationFactor: 12,
  },
  employment: {
    employeeContributions: { pension: 0.0976, disability: 0.015, sickness: 0.0245, health: 0.09 },
    employerContributions: { pension: 0.0976, disability: 0.065, accident: 0.0167, laborFund: 0.0245, fgsp: 0.001 },
    deductibleCosts: { standard: 250, increased: 300 },
    ppkEmployeeRate: 0.02,
  },
  mandate: {
    socialRates: { pension: 0.0976, disability: 0.015, sickness: 0.0245, health: 0.09 },
    deductibleCostsRate: 0.2,
  },
  specificWork: { deductibleCostsRate: { standard: 0.2, fiftyPercent: 0.5 } },
  b2b: {
    zus: {
      full: { social: 1600, healthBase: 5200 },
      preferential: { social: 450, healthBase: 3000 },
      starter: { social: 0, healthBase: 2600 },
    },
    healthRates: { scale: 0.09, linear: 0.049, lumpSum: 0.09 },
    lumpSumRates: { it: 0.12, default: 0.12 },
  },
  notes: {
    disclaimer: "Wyniki mają charakter orientacyjny. Przy indywidualnych przypadkach skonsultuj się z księgowym.",
  },
};
