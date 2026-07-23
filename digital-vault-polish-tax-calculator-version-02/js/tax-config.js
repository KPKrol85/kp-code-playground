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
      "Model B2B jest uproszczony; szczegółowe założenia B2B są pokazane osobno w panelu i nie zmieniają formuł kalkulacji.",
    ],
    limitations: [
      "Brak indywidualnych ulg, odliczeń, limitów rocznych i szczególnych przypadków podatkowych poza opcjami formularza.",
      "B2B nie uwzględnia kosztów działalności, przepływów VAT, księgowości, płatnego urlopu, chorobowego, ubezpieczeń ani pełnej klasyfikacji ryczałtu.",
      "Obliczenia roczne są uproszczone i nie zastępują rozliczenia według rzeczywistych przychodów w kolejnych miesiącach.",
      "Kalkulator nie prowadzi kwalifikacji prawnej formy współpracy ani prawa do ulg.",
    ],
    disclaimer: "Wynik jest szacunkiem obecnego, niezweryfikowanego modelu i nie stanowi porady podatkowej, prawnej, księgowej, pracowniczej ani finansowej. Stałe i formuły oznaczone jako 2026 nie przeszły audytu źródeł urzędowych; ważne obliczenia zweryfikuj w aktualnych źródłach urzędowych lub u wykwalifikowanego specjalisty.",
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
    modelAssumptions: {
      title: "Założenia B2B",
      summary: "Model B2B jest uproszczony i służy wyłącznie do orientacyjnego porównania wariantów współpracy.",
      items: [
        "Wyniki B2B są szacunkowe i wymagają weryfikacji w oficjalnych źródłach lub u księgowego.",
        "Koszty działalności nie są obecnie odejmowane od podstawy opodatkowania.",
        "W obecnej wersji status VAT jest informacyjny i nie zmienia wyniku netto. Model nie uwzględnia przepływów VAT.",
        "Składka zdrowotna w B2B jest liczona w uproszczony sposób na podstawie konfiguracji.",
        "Presety ZUS są uproszczone i wymagają weryfikacji warunków, limitów oraz aktualnych kwot.",
        "Ryczałt używa uproszczonej stawki z konfiguracji i nie powinien być traktowany jako uniwersalny dla każdej działalności.",
        "Księgowość, płatny urlop, chorobowe, ubezpieczenia i indywidualne ulgi nie są uwzględnione.",
      ],
      selectedContractNote: "Model B2B jest uproszczony: koszty działalności, przepływy VAT, księgowość, płatny urlop, chorobowe i indywidualne ulgi nie są uwzględnione.",
      comparisonNote: "Porównanie B2B nie uwzględnia kosztów działalności, przepływów VAT, płatnego urlopu, chorobowego, księgowości ani indywidualnych ulg.",
      vatInformationalNote: "W obecnej wersji status VAT jest informacyjny i nie zmienia wyniku netto. Model nie uwzględnia przepływów VAT.",
      futureBoundaries: {
        supportedFutureInputs: ["expenses", "accountingCost", "lumpSumRateSelector"],
        expenseModelStatus: "planned",
        lumpSumRateSelectorStatus: "planned",
        vatCashFlowStatus: "notImplemented",
        implementationNotes: [
          "Przyszłe koszty działalności muszą być jawnie opisane i pokryte testami regresyjnymi.",
          "Selektor stawek ryczałtu nie może sugerować automatycznej klasyfikacji PKD lub usług.",
          "Przepływy VAT powinny być pokazane oddzielnie od wyniku netto, jeśli zostaną wdrożone.",
        ],
      },
    },
    zus: {
      full: { social: 1600, healthBase: 5200 },
      preferential: { social: 450, healthBase: 3000 },
      starter: { social: 0, healthBase: 2600 },
    },
    healthRates: { scale: 0.09, linear: 0.049, lumpSum: 0.09 },
    lumpSumRates: { it: 0.12, default: 0.12 },
  },
  notes: {
    disclaimer: "Wyniki są szacunkami obecnego modelu; uproszczenia i nieobsługiwane okoliczności mogą zmienić rezultat.",
  },
};

export const OPTION_APPLICABILITY = {
  employment: {
    pit2: { status: "applicable", note: "PIT-2 jest używany w uproszczonym modelu UoP." },
    under26: { status: "applicable", note: "Ulga poniżej 26 lat jest uwzględniana dla UoP w uproszczonym modelu." },
    ppk: { status: "applicable", note: "PPK jest używane tylko dla umowy o pracę." },
    deductibleCosts: { status: "partial", allowedValues: ["standard", "increased"], fallbackValue: "standard", note: "Dla UoP dostępne są standardowe lub podwyższone koszty; 50% KUP nie jest tu obsługiwane." },
    zusType: { status: "notApplicable", note: "Opcje ZUS B2B dotyczą tylko wariantów B2B." },
    customZus: { status: "notApplicable", note: "Własne składki ZUS są aktywne tylko dla B2B z trybem własnych wartości." },
    vatPayer: { status: "notApplicable", note: "VAT dotyczy tylko wariantów B2B i nie zmienia obecnie wyniku netto." },
  },
  mandate: {
    pit2: { status: "applicable", note: "PIT-2 jest używany dla zlecenia w uproszczonym modelu." },
    under26: { status: "applicable", note: "Ulga poniżej 26 lat jest uwzględniana dla zlecenia w uproszczonym modelu." },
    ppk: { status: "notApplicable", note: "PPK jest używane tylko dla umowy o pracę." },
    deductibleCosts: { status: "ignored", allowedValues: ["standard"], fallbackValue: "standard", note: "Zlecenie używa stałych 20% kosztów z modelu; wybór z listy jest pomijany." },
    zusType: { status: "notApplicable", note: "Opcje ZUS B2B dotyczą tylko wariantów B2B." },
    customZus: { status: "notApplicable", note: "Własne składki ZUS są aktywne tylko dla B2B z trybem własnych wartości." },
    vatPayer: { status: "notApplicable", note: "VAT dotyczy tylko wariantów B2B i nie zmienia obecnie wyniku netto." },
  },
  specificWork: {
    pit2: { status: "applicable", note: "PIT-2 jest używany dla dzieła w uproszczonym modelu." },
    under26: { status: "applicable", note: "Ulga poniżej 26 lat jest uwzględniana dla dzieła w obecnym uproszczeniu." },
    ppk: { status: "notApplicable", note: "PPK jest używane tylko dla umowy o pracę." },
    deductibleCosts: { status: "partial", allowedValues: ["standard", "fiftyPercent"], fallbackValue: "standard", note: "50% KUP jest dostępne dla dzieła w uproszczonym modelu; podwyższone koszty nie są obsługiwane." },
    zusType: { status: "notApplicable", note: "Opcje ZUS B2B dotyczą tylko wariantów B2B." },
    customZus: { status: "notApplicable", note: "Własne składki ZUS są aktywne tylko dla B2B z trybem własnych wartości." },
    vatPayer: { status: "notApplicable", note: "VAT dotyczy tylko wariantów B2B i nie zmienia obecnie wyniku netto." },
  },
  b2bScale: {
    pit2: { status: "applicable", note: "PIT-2 wpływa tylko na B2B na skali w obecnym uproszczeniu." },
    under26: { status: "ignored", note: "Ulga poniżej 26 lat nie jest stosowana w wariantach B2B." },
    ppk: { status: "notApplicable", note: "PPK jest używane tylko dla umowy o pracę." },
    deductibleCosts: { status: "ignored", allowedValues: ["standard"], fallbackValue: "standard", note: "B2B nie uwzględnia kosztów działalności w tym modelu; wybór KUP jest pomijany." },
    zusType: { status: "applicable", note: "Opcje ZUS B2B dotyczą wariantów B2B." },
    customZus: { status: "partial", note: "Własne składki są aktywne tylko po wyborze trybu własnych wartości." },
    vatPayer: { status: "informational", note: "W obecnej wersji status VAT jest informacyjny i nie zmienia wyniku netto. Model nie uwzględnia przepływów VAT." },
  },
  b2bLinear: {},
  b2bLumpSum: {},
};

OPTION_APPLICABILITY.b2bLinear = {
  ...OPTION_APPLICABILITY.b2bScale,
  pit2: { status: "ignored", note: "PIT-2 nie wpływa na B2B liniowy w obecnym modelu." },
};
OPTION_APPLICABILITY.b2bLumpSum = {
  ...OPTION_APPLICABILITY.b2bScale,
  pit2: { status: "ignored", note: "PIT-2 nie wpływa na B2B ryczałt w obecnym modelu." },
};
