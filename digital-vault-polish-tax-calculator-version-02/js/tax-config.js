export const TAX_CONFIG = {
  metadata: {
    taxYear: 2026,
    modelName: "Uproszczony model kalkulacji wynagrodzeń PL",
    lastReviewed: "wymaga weryfikacji źródłowej",
    verificationStatus: "wymaga weryfikacji w oficjalnych źródłach",
    sourceStatus: "Stałe podatkowe i składkowe są wartościami roboczymi w konfiguracji aplikacji; nie zostały zweryfikowane w ramach tego wdrożenia.",
    assumptions: [
      "Kalkulacje opierają się na miesięcznej kwocie wejściowej i prostym przeliczeniu rocznym x12.",
      "Model obejmuje wybrane warianty: UoP, zlecenie, dzieło oraz B2B na skali, liniowo i ryczałtem.",
      "PIT-2, ulga dla osób poniżej 26 lat, PPK, koszty uzyskania przychodu i typ ZUS są stosowane zgodnie z uproszczonymi opcjami formularza.",
      "Porównanie typów umów używa tych samych ustawień wejściowych, aby pokazać orientacyjną różnicę netto.",
    ],
    limitations: [
      "Brak indywidualnych ulg, odliczeń, limitów rocznych i szczególnych przypadków podatkowych poza opcjami formularza.",
      "B2B nie uwzględnia kosztów działalności, VAT, szczegółowych zasad składki zdrowotnej, limitów ZUS ani pełnej klasyfikacji ryczałtu.",
      "Obliczenia roczne są uproszczone i nie zastępują rozliczenia według rzeczywistych przychodów w kolejnych miesiącach.",
      "Kalkulator nie prowadzi kwalifikacji prawnej formy współpracy ani prawa do ulg.",
    ],
    disclaimer: "Wynik jest orientacyjną symulacją i nie stanowi porady prawnej, podatkowej, księgowej ani finansowej. Przed podjęciem decyzji zweryfikuj dane w oficjalnych źródłach lub z doradcą.",
  },
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
