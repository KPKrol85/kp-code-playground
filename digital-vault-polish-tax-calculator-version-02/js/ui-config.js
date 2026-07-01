export const resultLabels = {
  net: "Szacunkowo na rękę",
  gross: "Kwota brutto / przychód",
  employerCost: "Łączny koszt pracodawcy",
  pit: "Zaliczka PIT",
  taxAdvance: "Zaliczka PIT",
  pension: "Składka emerytalna",
  disability: "Składka rentowa",
  sickness: "Składka chorobowa",
  socialContributions: "Składki społeczne",
  health: "Składka zdrowotna",
  ppk: "PPK pracownika",
  totalDeductions: "Łączne potrącenia",
  effectiveBurden: "Efektywne obciążenie",
};

export const contractNames = {
  employment: "umowa o pracę",
  mandate: "umowa zlecenie",
  specificWork: "umowa o dzieło",
  b2bScale: "B2B skala",
  b2bLinear: "B2B liniowy",
  b2bLumpSum: "B2B ryczałt",
};

export const directionLabels = {
  grossToNet: "brutto → netto",
  netToGross: "netto → brutto",
};

export const periodLabels = {
  monthly: "miesięcznie",
  yearly: "rocznie",
};

export const deductibleCostLabels = {
  standard: "KUP standardowe",
  increased: "KUP podwyższone",
  fiftyPercent: "KUP 50%",
};

export const zusTypeLabels = {
  full: "pełny ZUS",
  preferential: "preferencyjny ZUS",
  starter: "ulga na start",
  custom: "własne wartości ZUS",
};

export const quickScenarios = {
  juniorEmployment: { amount: 6800, direction: "grossToNet", period: "monthly", contractType: "employment", under26: true, pit2: true, ppk: false, deductibleCosts: "standard", zusType: "full" },
  seniorB2BLinear: { amount: 22000, direction: "grossToNet", period: "monthly", contractType: "b2bLinear", under26: false, pit2: false, ppk: false, deductibleCosts: "standard", zusType: "full" },
  creatorSpecificWork: { amount: 12000, direction: "grossToNet", period: "monthly", contractType: "specificWork", under26: false, pit2: true, ppk: false, deductibleCosts: "fiftyPercent", zusType: "full" },
};
