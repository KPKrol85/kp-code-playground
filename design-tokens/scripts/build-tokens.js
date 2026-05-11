const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");

const systems = [
  {
    id: "01",
    file: "tokens-01.css",
    name: "Minimal Neutral",
    category: "Treści",
    useCase: "Serwisy redakcyjne, centra dokumentacji i portfolio osobiste",
    description: "Stonowana neutralna baza dla interfejsów opartych na treści i spokojnej hierarchii.",
    primaryAction: "Czytaj poradnik",
    secondaryAction: "Zobacz indeks",
    tags: ["redakcja", "dokumentacja", "portfolio"],
    colors: {
      background: "#f7f6f2",
      surface: "#ffffff",
      surfaceRaised: "#eeece5",
      text: "#20201d",
      textMuted: "#63635c",
      border: "#d9d6ca",
      primary: "#405b73",
      primaryHover: "#31485d",
      primaryContrast: "#ffffff",
      secondary: "#7f8f7f",
      accent: "#8b6f47",
      success: "#2f7a48",
      warning: "#a86518",
      danger: "#a83e3e",
      focus: "#405b73",
      shadowRgb: "32 32 29"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Fraunces', Georgia, 'Times New Roman', serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "02",
    file: "tokens-02.css",
    name: "Modern SaaS",
    category: "SaaS",
    useCase: "Dashboardy, onboarding i produkty subskrypcyjne",
    description: "Jasne tokeny UI dla czytelnej hierarchii aplikacji i ścieżek konwersji.",
    primaryAction: "Rozpocznij test",
    secondaryAction: "Zobacz demo",
    tags: ["dashboard", "produkt", "wzrost"],
    colors: {
      background: "#f4f7ff",
      surface: "#ffffff",
      surfaceRaised: "#eaf0ff",
      text: "#111827",
      textMuted: "#5b6476",
      border: "#d7e0f3",
      primary: "#3858e9",
      primaryHover: "#2d46bd",
      primaryContrast: "#ffffff",
      secondary: "#0f9fb8",
      accent: "#8a4de8",
      success: "#0f8f65",
      warning: "#bd6b00",
      danger: "#cf222e",
      focus: "#3858e9",
      shadowRgb: "56 88 233"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Sora', 'Inter', 'Segoe UI', sans-serif",
      mono: "'IBM Plex Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.375rem", "0.625rem", "0.875rem", "1.125rem"]
  },
  {
    id: "03",
    file: "tokens-03.css",
    name: "Premium Luxury",
    category: "Marka",
    useCase: "Landing page premium, butiki i produkty z dostępem na zaproszenie",
    description: "Ciemne, warstwowe powierzchnie z eleganckim kontrastem i redakcyjną typografią.",
    primaryAction: "Zarezerwuj dostęp",
    secondaryAction: "Odkryj",
    tags: ["premium", "marka", "sprzedaż"],
    colors: {
      background: "#111112",
      surface: "#19191b",
      surfaceRaised: "#242428",
      text: "#f5f0e7",
      textMuted: "#bbb3a3",
      border: "#37363a",
      primary: "#c9a96b",
      primaryHover: "#b79253",
      primaryContrast: "#1b1711",
      secondary: "#8e7499",
      accent: "#e1c88f",
      success: "#58a778",
      warning: "#d69d45",
      danger: "#c96060",
      focus: "#e1c88f",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Avenir Next', 'Segoe UI', sans-serif",
      heading: "'Cormorant Garamond', Georgia, serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.2rem", "0.4rem", "0.7rem", "1rem"]
  },
  {
    id: "04",
    file: "tokens-04.css",
    name: "Soft Friendly",
    category: "Konsumenckie",
    useCase: "Produkty społecznościowe, aplikacje wellness i lekkie narzędzia konsumenckie",
    description: "Przystępna paleta UI z ciepłymi powierzchniami, miękkimi akcentami i wygodnym rytmem.",
    primaryAction: "Zacznij",
    secondaryAction: "Zobacz funkcje",
    tags: ["przyjazne", "wellness", "społeczność"],
    colors: {
      background: "#fff8fb",
      surface: "#ffffff",
      surfaceRaised: "#fdf1f6",
      text: "#2c2a3a",
      textMuted: "#6c6882",
      border: "#efdceb",
      primary: "#e64f93",
      primaryHover: "#c93678",
      primaryContrast: "#ffffff",
      secondary: "#7060d8",
      accent: "#2ba99d",
      success: "#2f8f64",
      warning: "#b86d0e",
      danger: "#c83f66",
      focus: "#7060d8",
      shadowRgb: "125 103 255"
    },
    fonts: {
      sans: "'Nunito Sans', 'Inter', 'Segoe UI', sans-serif",
      heading: "'Poppins', 'Nunito Sans', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.5rem", "0.875rem", "1.125rem", "1.5rem"]
  },
  {
    id: "05",
    file: "tokens-05.css",
    name: "High Contrast",
    category: "Dostępność",
    useCase: "Narzędzia publiczne, panele administracyjne i interfejsy wymagające wysokiej czytelności",
    description: "Baza projektowana pod dostępność, z wyraźnymi stanami, mocniejszymi obramowaniami i silnym kontrastem tekstu.",
    primaryAction: "Kontynuuj",
    secondaryAction: "Druga akcja",
    tags: ["a11y", "publiczne", "czytelne"],
    colors: {
      background: "#ffffff",
      surface: "#ffffff",
      surfaceRaised: "#f2f4f7",
      text: "#111111",
      textMuted: "#333333",
      border: "#1f2937",
      primary: "#0033cc",
      primaryHover: "#0027a0",
      primaryContrast: "#ffffff",
      secondary: "#006b5b",
      accent: "#6d28d9",
      success: "#0f7a32",
      warning: "#8f4a00",
      danger: "#b00020",
      focus: "#0033cc",
      shadowRgb: "17 17 17"
    },
    fonts: {
      sans: "'Atkinson Hyperlegible', 'Inter', Arial, sans-serif",
      heading: "'Atkinson Hyperlegible', 'Segoe UI', Arial, sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "06",
    file: "tokens-06.css",
    name: "Fintech Ledger",
    category: "Finanse",
    useCase: "Dashboardy bankowe, narzędzia księgowe i produkty inwestycyjne",
    description: "Precyzyjne tokeny dla interfejsów finansowych ze stabilnymi akcentami i gęstym rytmem.",
    primaryAction: "Otwórz raport",
    secondaryAction: "Eksportuj CSV",
    tags: ["fintech", "analityka", "enterprise"],
    colors: {
      background: "#f5f8f7",
      surface: "#ffffff",
      surfaceRaised: "#e8f0ee",
      text: "#12221f",
      textMuted: "#536461",
      border: "#cad9d5",
      primary: "#075e54",
      primaryHover: "#04463f",
      primaryContrast: "#ffffff",
      secondary: "#1d70b8",
      accent: "#a77a08",
      success: "#137a4b",
      warning: "#a06400",
      danger: "#ba3434",
      focus: "#1d70b8",
      shadowRgb: "7 94 84"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.375rem", "0.5rem", "0.75rem"]
  },
  {
    id: "07",
    file: "tokens-07.css",
    name: "Health Care",
    category: "Zdrowie",
    useCase: "Portale pacjenta, narzędzia kliniczne i produkty do monitorowania zdrowia",
    description: "Czyste tokeny kliniczne ze spokojnym tealem, dostępnymi stanami i czytelnymi odstępami.",
    primaryAction: "Umów wizytę",
    secondaryAction: "Zobacz plan",
    tags: ["zdrowie", "portal", "usługi"],
    colors: {
      background: "#f3fbfa",
      surface: "#ffffff",
      surfaceRaised: "#e6f5f3",
      text: "#17302d",
      textMuted: "#5a706d",
      border: "#c9e2df",
      primary: "#087f7a",
      primaryHover: "#06635f",
      primaryContrast: "#ffffff",
      secondary: "#3a6ea5",
      accent: "#d16d4a",
      success: "#23845a",
      warning: "#aa6515",
      danger: "#bf3f4d",
      focus: "#087f7a",
      shadowRgb: "8 127 122"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Source Sans 3', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.375rem", "0.625rem", "0.875rem", "1.25rem"]
  },
  {
    id: "08",
    file: "tokens-08.css",
    name: "Developer Console",
    category: "Dla devów",
    useCase: "Produkty API, CLI, logi i dokumentacja techniczna",
    description: "Ciemny system konsolowy dla developerów, z terminalowym charakterem i wyraźnymi stanami interakcji.",
    primaryAction: "Utwórz klucz",
    secondaryAction: "Otwórz docs",
    tags: ["api", "developer", "konsola"],
    colors: {
      background: "#0b1020",
      surface: "#111827",
      surfaceRaised: "#1b2437",
      text: "#eef3ff",
      textMuted: "#a4b0c4",
      border: "#303a50",
      primary: "#38bdf8",
      primaryHover: "#0ea5e9",
      primaryContrast: "#06111c",
      secondary: "#34d399",
      accent: "#f59e0b",
      success: "#22c55e",
      warning: "#f59e0b",
      danger: "#fb7185",
      focus: "#38bdf8",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Space Grotesk', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.25rem", "0.375rem", "0.625rem", "0.875rem"]
  },
  {
    id: "09",
    file: "tokens-09.css",
    name: "Creator Studio",
    category: "Kreatywne",
    useCase: "Narzędzia medialne, dashboardy twórców i kreatory kampanii",
    description: "Ekspresyjny zestaw dla twórców, z nasyconymi akcentami zbalansowanymi czystymi powierzchniami.",
    primaryAction: "Opublikuj",
    secondaryAction: "Podgląd",
    tags: ["twórcy", "media", "kampanie"],
    colors: {
      background: "#fff7f2",
      surface: "#ffffff",
      surfaceRaised: "#fce9dd",
      text: "#2b211d",
      textMuted: "#715f56",
      border: "#efcfbf",
      primary: "#d4482f",
      primaryHover: "#b83723",
      primaryContrast: "#ffffff",
      secondary: "#2458d3",
      accent: "#b02579",
      success: "#278353",
      warning: "#bd6b00",
      danger: "#c73545",
      focus: "#2458d3",
      shadowRgb: "212 72 47"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Manrope', 'Inter', sans-serif",
      mono: "'DM Mono', Consolas, monospace"
    },
    radius: ["0.375rem", "0.75rem", "1rem", "1.375rem"]
  },
  {
    id: "10",
    file: "tokens-10.css",
    name: "Marketplace Commerce",
    category: "Handel",
    useCase: "Sklepy cyfrowe, katalogi produktów i procesy checkout",
    description: "Tokeny commerce wspierające konwersję, z wiarygodnymi powierzchniami i jasnym kolorem akcji.",
    primaryAction: "Dodaj do koszyka",
    secondaryAction: "Porównaj",
    tags: ["commerce", "sklep", "checkout"],
    colors: {
      background: "#faf8f4",
      surface: "#ffffff",
      surfaceRaised: "#f0ebe2",
      text: "#231f1b",
      textMuted: "#6d6258",
      border: "#ded4c7",
      primary: "#b34316",
      primaryHover: "#91350f",
      primaryContrast: "#ffffff",
      secondary: "#2f6f73",
      accent: "#6f4aa5",
      success: "#2d7d46",
      warning: "#a86518",
      danger: "#b83b3b",
      focus: "#2f6f73",
      shadowRgb: "35 31 27"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Libre Franklin', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "11",
    file: "tokens-11.css",
    name: "Education Platform",
    category: "Edukacja",
    useCase: "Platformy kursowe, dashboardy nauki i bazy wiedzy",
    description: "Czytelny system edukacyjny ze wspierającymi stanami i przyjaznym akademickim rytmem.",
    primaryAction: "Start lekcji",
    secondaryAction: "Zapisz moduł",
    tags: ["nauka", "kurs", "wiedza"],
    colors: {
      background: "#f7f9ff",
      surface: "#ffffff",
      surfaceRaised: "#edf2ff",
      text: "#182033",
      textMuted: "#5f6880",
      border: "#d8e0f2",
      primary: "#3155c7",
      primaryHover: "#263f99",
      primaryContrast: "#ffffff",
      secondary: "#2c8b78",
      accent: "#c07a22",
      success: "#23845a",
      warning: "#ad6800",
      danger: "#bf3f4d",
      focus: "#3155c7",
      shadowRgb: "49 85 199"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Nunito Sans', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.375rem", "0.625rem", "0.875rem", "1.25rem"]
  },
  {
    id: "12",
    file: "tokens-12.css",
    name: "Cyber Security",
    category: "Bezpieczeństwo",
    useCase: "Dashboardy bezpieczeństwa, konsole SOC i narzędzia zarządzania ryzykiem",
    description: "Tokeny dla interfejsów security z ostrą strukturą, wysokim sygnałem i gotowymi stanami alertów.",
    primaryAction: "Skanuj zasób",
    secondaryAction: "Otwórz log",
    tags: ["security", "ryzyko", "monitoring"],
    colors: {
      background: "#0c1117",
      surface: "#121922",
      surfaceRaised: "#1d2632",
      text: "#e8f0f8",
      textMuted: "#9aa8b8",
      border: "#334155",
      primary: "#22c55e",
      primaryHover: "#16a34a",
      primaryContrast: "#06130b",
      secondary: "#38bdf8",
      accent: "#f97316",
      success: "#22c55e",
      warning: "#f59e0b",
      danger: "#f43f5e",
      focus: "#38bdf8",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Space Grotesk', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.375rem", "0.625rem"]
  },
  {
    id: "13",
    file: "tokens-13.css",
    name: "Data Analytics",
    category: "Analityka",
    useCase: "Narzędzia BI, dashboardy raportowe i przestrzenie badawcze",
    description: "Tokeny analityczne dopasowane do wykresów, podsumowań, gęstych tabel i procesów decyzyjnych.",
    primaryAction: "Uruchom zapytanie",
    secondaryAction: "Udostępnij widok",
    tags: ["dane", "bi", "raporty"],
    colors: {
      background: "#f5f7fa",
      surface: "#ffffff",
      surfaceRaised: "#e8eef5",
      text: "#17202a",
      textMuted: "#596777",
      border: "#d2dbe6",
      primary: "#2563a8",
      primaryHover: "#1c4f86",
      primaryContrast: "#ffffff",
      secondary: "#7c3aed",
      accent: "#0f9f6e",
      success: "#168052",
      warning: "#a86518",
      danger: "#ba3434",
      focus: "#2563a8",
      shadowRgb: "37 99 168"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.625rem", "0.875rem"]
  },
  {
    id: "14",
    file: "tokens-14.css",
    name: "Climate Tech",
    category: "Zrównoważony rozwój",
    useCase: "Dashboardy ESG, produkty energetyczne i raporty klimatyczne",
    description: "Naturalna paleta technologiczna z pewnymi zieleniami, czytelnymi neutralami i odstępami gotowymi pod raporty.",
    primaryAction: "Śledź wpływ",
    secondaryAction: "Zobacz raport",
    tags: ["klimat", "energia", "wpływ"],
    colors: {
      background: "#f4f8f1",
      surface: "#ffffff",
      surfaceRaised: "#e5efe0",
      text: "#1f2b22",
      textMuted: "#5d6d5f",
      border: "#cfddc8",
      primary: "#327a3d",
      primaryHover: "#255f2f",
      primaryContrast: "#ffffff",
      secondary: "#2d6f93",
      accent: "#b7791f",
      success: "#2f7a48",
      warning: "#a86518",
      danger: "#b34545",
      focus: "#2d6f93",
      shadowRgb: "50 122 61"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Aptos Display', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.375rem", "0.625rem", "0.875rem", "1.25rem"]
  },
  {
    id: "15",
    file: "tokens-15.css",
    name: "Legal Enterprise",
    category: "Enterprise",
    useCase: "Legal SaaS, portale compliance i usługi profesjonalne",
    description: "Formalne tokeny enterprise z zdyscyplinowaną typografią, oszczędnym kolorem i precyzyjnymi stanami.",
    primaryAction: "Sprawdź sprawę",
    secondaryAction: "Pobierz PDF",
    tags: ["legal", "compliance", "enterprise"],
    colors: {
      background: "#f6f7f8",
      surface: "#ffffff",
      surfaceRaised: "#eceff2",
      text: "#1f242b",
      textMuted: "#5f6670",
      border: "#d3d9e0",
      primary: "#23395b",
      primaryHover: "#182943",
      primaryContrast: "#ffffff",
      secondary: "#7c5b2e",
      accent: "#476a82",
      success: "#23704b",
      warning: "#956111",
      danger: "#a63d40",
      focus: "#476a82",
      shadowRgb: "35 57 91"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Merriweather Sans', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.375rem", "0.625rem"]
  },
  {
    id: "16",
    file: "tokens-16.css",
    name: "AI Workspace",
    category: "AI",
    useCase: "Asystenci AI, narzędzia promptów i przestrzenie automatyzacji",
    description: "Spokojny system produktu AI z czystymi powierzchniami, akcentami blue-indigo i jasnym feedbackiem.",
    primaryAction: "Uruchom prompt",
    secondaryAction: "Zapisz flow",
    tags: ["ai", "automatyzacja", "workspace"],
    colors: {
      background: "#f6f7fb",
      surface: "#ffffff",
      surfaceRaised: "#eceffd",
      text: "#161a2a",
      textMuted: "#5f6477",
      border: "#d8ddef",
      primary: "#4b5fd7",
      primaryHover: "#3a49ad",
      primaryContrast: "#ffffff",
      secondary: "#0e8f9a",
      accent: "#9a4dcc",
      success: "#18835a",
      warning: "#b06a00",
      danger: "#c83f54",
      focus: "#4b5fd7",
      shadowRgb: "75 95 215"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Manrope', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.375rem", "0.625rem", "0.875rem", "1.125rem"]
  },
  {
    id: "17",
    file: "tokens-17.css",
    name: "Real Estate",
    category: "Nieruchomości",
    useCase: "Platformy nieruchomości, narzędzia rezerwacji i strony ofert premium",
    description: "Wiarygodne tokeny dla produktów nieruchomościowych, z dopracowanymi neutralami i pewnymi zielonymi akcentami.",
    primaryAction: "Umów prezentację",
    secondaryAction: "Zapisz ofertę",
    tags: ["nieruchomości", "oferty", "rezerwacje"],
    colors: {
      background: "#f8f6f1",
      surface: "#ffffff",
      surfaceRaised: "#eee8dd",
      text: "#25231f",
      textMuted: "#6a6258",
      border: "#ddd4c5",
      primary: "#356859",
      primaryHover: "#284f44",
      primaryContrast: "#ffffff",
      secondary: "#9b6b35",
      accent: "#456f93",
      success: "#2f7a48",
      warning: "#9a6419",
      danger: "#b24646",
      focus: "#456f93",
      shadowRgb: "53 104 89"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Libre Baskerville', Georgia, serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "18",
    file: "tokens-18.css",
    name: "Gaming Interface",
    category: "Gry",
    useCase: "Launchery gier, profile graczy i dashboardy eventów",
    description: "Ciemne UI rozrywkowe z elektrycznymi akcentami, kompaktowym rytmem i energicznymi kontrolkami.",
    primaryAction: "Dołącz do meczu",
    secondaryAction: "Zobacz statystyki",
    tags: ["gaming", "eventy", "profile"],
    colors: {
      background: "#111018",
      surface: "#191826",
      surfaceRaised: "#242235",
      text: "#f4f2ff",
      textMuted: "#b6b0cc",
      border: "#3a3652",
      primary: "#ff4d8d",
      primaryHover: "#d93672",
      primaryContrast: "#ffffff",
      secondary: "#36d1dc",
      accent: "#f9c74f",
      success: "#48c774",
      warning: "#f9c74f",
      danger: "#ff5f6d",
      focus: "#36d1dc",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Rajdhani', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "19",
    file: "tokens-19.css",
    name: "Nonprofit Civic",
    category: "Społeczne",
    useCase: "Strony nonprofit, programy publiczne i ścieżki darowizn",
    description: "Transparentne tokeny civic z przystępnym kolorem, bezpośrednimi CTA i trwałą czytelnością.",
    primaryAction: "Wesprzyj",
    secondaryAction: "Wolontariat",
    tags: ["nonprofit", "publiczne", "darowizny"],
    colors: {
      background: "#f8fbf8",
      surface: "#ffffff",
      surfaceRaised: "#eaf3ea",
      text: "#1f2a24",
      textMuted: "#5e6d64",
      border: "#d2dfd5",
      primary: "#2f6f4e",
      primaryHover: "#25583f",
      primaryContrast: "#ffffff",
      secondary: "#bf5b2c",
      accent: "#4267a5",
      success: "#2f7a48",
      warning: "#a86518",
      danger: "#b23a48",
      focus: "#4267a5",
      shadowRgb: "47 111 78"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Source Sans 3', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "20",
    file: "tokens-20.css",
    name: "Productivity OS",
    category: "Produktywność",
    useCase: "Managery zadań, przestrzenie pracy i narzędzia operacyjne",
    description: "Ciche tokeny produktywnościowe do codziennego użycia, z gęstymi komponentami i neutralnym fokusem.",
    primaryAction: "Utwórz zadanie",
    secondaryAction: "Otwórz tablicę",
    tags: ["produktywność", "operacje", "workspace"],
    colors: {
      background: "#f7f8fa",
      surface: "#ffffff",
      surfaceRaised: "#eef1f5",
      text: "#1c222b",
      textMuted: "#606b79",
      border: "#d7dde5",
      primary: "#2f5f9f",
      primaryHover: "#244a7d",
      primaryContrast: "#ffffff",
      secondary: "#2d8478",
      accent: "#8a5a24",
      success: "#287a52",
      warning: "#a86518",
      danger: "#b43d4a",
      focus: "#2f5f9f",
      shadowRgb: "47 95 159"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.375rem", "0.625rem", "0.875rem"]
  }
];

function tokenCss(system) {
  const c = system.colors;
  const r = system.radius;
  return `:root {
  /* ==========================================
     KP_Code Digital Vault - ${system.name}
     Zestaw tokenów ${system.id} / ${system.category}
     ========================================== */

  /* Prymitywy kolorów */
  --dt-color-background: ${c.background};
  --dt-color-surface: ${c.surface};
  --dt-color-surface-raised: ${c.surfaceRaised};
  --dt-color-text: ${c.text};
  --dt-color-text-muted: ${c.textMuted};
  --dt-color-border: ${c.border};
  --dt-color-primary: ${c.primary};
  --dt-color-primary-hover: ${c.primaryHover};
  --dt-color-primary-contrast: ${c.primaryContrast};
  --dt-color-secondary: ${c.secondary};
  --dt-color-accent: ${c.accent};
  --dt-color-success: ${c.success};
  --dt-color-warning: ${c.warning};
  --dt-color-danger: ${c.danger};
  --dt-color-focus: ${c.focus};

  /* Typografia */
  --dt-font-sans: ${system.fonts.sans};
  --dt-font-heading: ${system.fonts.heading};
  --dt-font-mono: ${system.fonts.mono};
  --dt-text-xs: 0.75rem;
  --dt-text-sm: 0.875rem;
  --dt-text-md: 1rem;
  --dt-text-lg: 1.125rem;
  --dt-text-xl: 1.375rem;
  --dt-text-2xl: 1.75rem;
  --dt-text-3xl: 2.25rem;
  --dt-leading-tight: 1.2;
  --dt-leading-normal: 1.5;
  --dt-leading-relaxed: 1.75;
  --dt-tracking-tight: 0;
  --dt-tracking-normal: 0;
  --dt-tracking-wide: 0.04em;

  /* Skala odstępów */
  --dt-space-1: 0.25rem;
  --dt-space-2: 0.5rem;
  --dt-space-3: 0.75rem;
  --dt-space-4: 1rem;
  --dt-space-5: 1.5rem;
  --dt-space-6: 2rem;
  --dt-space-7: 3rem;
  --dt-space-8: 4rem;

  /* Zaokrąglenia */
  --dt-radius-sm: ${r[0]};
  --dt-radius-md: ${r[1]};
  --dt-radius-lg: ${r[2]};
  --dt-radius-xl: ${r[3]};
  --dt-radius-pill: 999px;

  /* Cienie i głębia */
  --dt-shadow-sm: 0 1px 2px rgb(${c.shadowRgb} / 0.08);
  --dt-shadow-md: 0 8px 20px rgb(${c.shadowRgb} / 0.12);
  --dt-shadow-lg: 0 18px 42px rgb(${c.shadowRgb} / 0.16);
  --dt-shadow-xl: 0 28px 60px rgb(${c.shadowRgb} / 0.22);

  /* Układ */
  --dt-container-sm: 36rem;
  --dt-container-md: 52rem;
  --dt-container-lg: 70rem;
  --dt-container-xl: 88rem;

  /* Ruch */
  --dt-transition-fast: 120ms ease;
  --dt-transition-normal: 220ms ease;
  --dt-transition-slow: 360ms ease;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--dt-font-sans);
  font-size: var(--dt-text-md);
  line-height: var(--dt-leading-normal);
  color: var(--dt-color-text);
  background: var(--dt-color-background);
}

.dt-preview {
  min-height: 100vh;
  max-width: var(--dt-container-md);
  margin: 0 auto;
  padding: var(--dt-space-6);
}

.dt-preview__eyebrow {
  display: inline-flex;
  margin: 0 0 var(--dt-space-3);
  color: var(--dt-color-primary);
  font-family: var(--dt-font-mono);
  font-size: var(--dt-text-xs);
  font-weight: 700;
  letter-spacing: var(--dt-tracking-wide);
  text-transform: uppercase;
}

.dt-preview__title,
.dt-card__title {
  margin: 0;
  font-family: var(--dt-font-heading);
  line-height: var(--dt-leading-tight);
  letter-spacing: var(--dt-tracking-tight);
}

.dt-preview__title {
  max-width: 12ch;
  margin-bottom: var(--dt-space-3);
  font-size: var(--dt-text-2xl);
}

.dt-preview__copy {
  max-width: 58ch;
  margin: 0 0 var(--dt-space-5);
  color: var(--dt-color-text-muted);
}

.dt-preview__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dt-space-3);
  margin-bottom: var(--dt-space-5);
}

.dt-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.5rem;
  border: 1px solid transparent;
  border-radius: var(--dt-radius-md);
  padding: 0 var(--dt-space-4);
  font: 700 var(--dt-text-sm) / 1 var(--dt-font-sans);
  cursor: pointer;
  transition:
    background var(--dt-transition-fast),
    border-color var(--dt-transition-fast),
    color var(--dt-transition-fast),
    transform var(--dt-transition-fast);
}

.dt-button:hover {
  transform: translateY(-1px);
}

.dt-button:focus-visible {
  outline: 3px solid var(--dt-color-focus);
  outline-offset: 3px;
}

.dt-button--primary {
  background: var(--dt-color-primary);
  color: var(--dt-color-primary-contrast);
}

.dt-button--primary:hover {
  background: var(--dt-color-primary-hover);
}

.dt-button--secondary {
  background: var(--dt-color-surface-raised);
  border-color: var(--dt-color-border);
  color: var(--dt-color-text);
}

.dt-card {
  margin-bottom: var(--dt-space-5);
  border: 1px solid var(--dt-color-border);
  border-radius: var(--dt-radius-lg);
  background: var(--dt-color-surface);
  box-shadow: var(--dt-shadow-md);
  overflow: hidden;
}

.dt-card__body {
  padding: var(--dt-space-5);
}

.dt-card__title {
  margin-bottom: var(--dt-space-2);
  font-size: var(--dt-text-xl);
}

.dt-card__text {
  margin: 0 0 var(--dt-space-4);
  color: var(--dt-color-text-muted);
}

.dt-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--dt-space-2);
}

.dt-metric {
  border: 1px solid var(--dt-color-border);
  border-radius: var(--dt-radius-md);
  padding: var(--dt-space-3);
  background: var(--dt-color-surface-raised);
}

.dt-metric__value {
  display: block;
  margin-bottom: var(--dt-space-1);
  font-family: var(--dt-font-heading);
  font-size: var(--dt-text-lg);
  font-weight: 800;
}

.dt-metric__label {
  color: var(--dt-color-text-muted);
  font-size: var(--dt-text-xs);
}

.dt-scale {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--dt-space-2);
}

.dt-scale__item {
  min-width: 0;
}

.dt-scale__swatch {
  display: block;
  height: var(--dt-space-6);
  border-radius: var(--dt-radius-sm);
  background: var(--dt-color-primary);
}

.dt-scale__swatch--secondary {
  background: var(--dt-color-secondary);
}

.dt-scale__swatch--accent {
  background: var(--dt-color-accent);
}

.dt-scale__swatch--surface {
  border: 1px solid var(--dt-color-border);
  background: var(--dt-color-surface-raised);
}

.dt-scale__label {
  display: block;
  margin-top: var(--dt-space-2);
  color: var(--dt-color-text-muted);
  font-family: var(--dt-font-mono);
  font-size: var(--dt-text-xs);
}
`;
}

function previewSource(system) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="${system.file}" />
  </head>
  <body>
    <main class="dt-preview">
      <span class="dt-preview__eyebrow">${system.category} / Tokeny ${system.id}</span>
      <h1 class="dt-preview__title">${system.name}</h1>
      <p class="dt-preview__copy">${system.description}</p>
      <div class="dt-preview__actions">
        <button class="dt-button dt-button--primary">${system.primaryAction}</button>
        <button class="dt-button dt-button--secondary">${system.secondaryAction}</button>
      </div>
      <section class="dt-card" aria-label="Przykład komponentu">
        <div class="dt-card__body">
          <h2 class="dt-card__title">Podgląd komponentu</h2>
          <p class="dt-card__text">${system.useCase}</p>
          <div class="dt-metrics" aria-label="Przykładowe metryki">
            <div class="dt-metric"><span class="dt-metric__value">24</span><span class="dt-metric__label">Komponenty</span></div>
            <div class="dt-metric"><span class="dt-metric__value">8</span><span class="dt-metric__label">Kroki odstępów</span></div>
            <div class="dt-metric"><span class="dt-metric__value">4</span><span class="dt-metric__label">Poziomy cienia</span></div>
          </div>
        </div>
      </section>
      <div class="dt-scale" aria-label="Skala kolorów">
        <span class="dt-scale__item"><span class="dt-scale__swatch"></span><span class="dt-scale__label">Główny</span></span>
        <span class="dt-scale__item"><span class="dt-scale__swatch dt-scale__swatch--secondary"></span><span class="dt-scale__label">Drugi</span></span>
        <span class="dt-scale__item"><span class="dt-scale__swatch dt-scale__swatch--accent"></span><span class="dt-scale__label">Akcent</span></span>
        <span class="dt-scale__item"><span class="dt-scale__swatch dt-scale__swatch--surface"></span><span class="dt-scale__label">Powierzchnia</span></span>
      </div>
    </main>
  </body>
</html>`;
}

function indexHtml() {
  const categoryCount = new Set(systems.map((system) => system.category)).size;
  return `<!doctype html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KP_Code Digital Vault - Design Tokens</title>
    <script>
      (() => {
        try {
          const storedTheme = localStorage.getItem("vault-theme");
          const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          document.documentElement.dataset.theme = storedTheme || (prefersDark ? "dark" : "light");
        } catch (error) {
          document.documentElement.dataset.theme = "light";
        }
      })();
    </script>
    <style>
      :root {
        --vault-bg: #f4f5f7;
        --vault-page-start: #ffffff;
        --vault-ink: #111827;
        --vault-muted: #667085;
        --vault-surface: #ffffff;
        --vault-panel: #ebeef2;
        --vault-chip-bg: #ffffff;
        --vault-input-bg: #ffffff;
        --vault-line: #d7dce3;
        --vault-strong: #1f4e79;
        --vault-strong-hover: #173b5d;
        --vault-accent: #2d8478;
        --vault-warn: #9b6b24;
        --vault-mark-bg: #111827;
        --vault-mark-ink: #ffffff;
        --vault-radius: 8px;
        --vault-shadow: 0 16px 42px rgb(17 24 39 / 0.08);
        --vault-focus: rgb(31 78 121 / 0.22);
        color-scheme: light;
      }

      :root[data-theme="dark"] {
        --vault-bg: #0f141b;
        --vault-page-start: #151b24;
        --vault-ink: #eef3f8;
        --vault-muted: #a8b3c2;
        --vault-surface: #171f2a;
        --vault-panel: #202a37;
        --vault-chip-bg: #151d27;
        --vault-input-bg: #111821;
        --vault-line: #2f3b4c;
        --vault-strong: #6aa6d8;
        --vault-strong-hover: #8abce5;
        --vault-accent: #4ab6a8;
        --vault-warn: #d0a85f;
        --vault-mark-bg: #eef3f8;
        --vault-mark-ink: #0f141b;
        --vault-shadow: 0 20px 52px rgb(0 0 0 / 0.34);
        --vault-focus: rgb(106 166 216 / 0.32);
        color-scheme: dark;
      }

      * {
        box-sizing: border-box;
      }

      html {
        scroll-behavior: smooth;
      }

      body {
        margin: 0;
        color: var(--vault-ink);
        background:
          linear-gradient(180deg, var(--vault-page-start) 0, var(--vault-bg) 420px),
          var(--vault-bg);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      button,
      input,
      select {
        font: inherit;
      }

      .vault-shell {
        width: min(1440px, 100% - 32px);
        margin: 0 auto;
        padding: 24px 0 56px;
      }

      .vault-topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        min-height: 56px;
        margin-bottom: 28px;
        border-bottom: 1px solid var(--vault-line);
      }

      .vault-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;
      }

      .vault-brand {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 0;
      }

      .vault-brand__mark {
        display: grid;
        width: 36px;
        height: 36px;
        place-items: center;
        border-radius: 8px;
        background: var(--vault-mark-bg);
        color: var(--vault-mark-ink);
        font-weight: 800;
      }

      .vault-brand__name {
        display: block;
        font-size: 0.95rem;
        font-weight: 800;
      }

      .vault-brand__meta {
        display: block;
        color: var(--vault-muted);
        font-size: 0.78rem;
      }

      .vault-status {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 8px;
      }

      .vault-status__item {
        border: 1px solid var(--vault-line);
        border-radius: 999px;
        padding: 6px 10px;
        background: var(--vault-chip-bg);
        color: var(--vault-muted);
        font-size: 0.78rem;
        font-weight: 700;
      }

      .vault-theme-toggle {
        display: inline-grid;
        grid-template-columns: 1fr 1fr;
        gap: 3px;
        min-height: 36px;
        border: 1px solid var(--vault-line);
        border-radius: 999px;
        padding: 3px;
        background: var(--vault-chip-bg);
      }

      .vault-theme-toggle__option {
        min-width: 58px;
        border: 0;
        border-radius: 999px;
        padding: 0 10px;
        background: transparent;
        color: var(--vault-muted);
        font-size: 0.78rem;
        font-weight: 800;
        cursor: pointer;
      }

      .vault-theme-toggle__option[aria-pressed="true"] {
        background: var(--vault-strong);
        color: var(--vault-page-start);
      }

      .vault-hero {
        display: grid;
        grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
        gap: 24px;
        align-items: end;
        margin-bottom: 24px;
      }

      .vault-hero__eyebrow {
        margin: 0 0 10px;
        color: var(--vault-strong);
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .vault-hero__title {
        max-width: 820px;
        margin: 0;
        font-size: clamp(2rem, 5vw, 4.5rem);
        line-height: 0.98;
        letter-spacing: 0;
      }

      .vault-hero__copy {
        max-width: 720px;
        margin: 18px 0 0;
        color: var(--vault-muted);
        font-size: 1.05rem;
        line-height: 1.6;
      }

      .vault-summary {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 10px;
      }

      .vault-summary__item {
        border: 1px solid var(--vault-line);
        border-radius: var(--vault-radius);
        padding: 16px;
        background: var(--vault-surface);
      }

      .vault-summary__value {
        display: block;
        font-size: 1.65rem;
        font-weight: 850;
      }

      .vault-summary__value--action {
        color: var(--vault-strong);
        font-size: 1rem;
        font-weight: 750;
        line-height: 1.3;
      }

      .vault-summary__label {
        display: block;
        margin-top: 4px;
        color: var(--vault-muted);
        font-size: 0.82rem;
      }

      .vault-toolbar {
        position: sticky;
        top: 0;
        z-index: 10;
        display: grid;
        grid-template-columns: minmax(220px, 1fr) 220px 180px;
        gap: 10px;
        margin: 0 0 18px;
        border: 1px solid var(--vault-line);
        border-radius: var(--vault-radius);
        padding: 10px;
        background: color-mix(in srgb, var(--vault-surface) 94%, transparent);
        box-shadow: 0 10px 24px rgb(17 24 39 / 0.06);
        backdrop-filter: blur(10px);
      }

      .vault-field {
        display: grid;
        gap: 6px;
      }

      .vault-field__label {
        color: var(--vault-muted);
        font-size: 0.72rem;
        font-weight: 800;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }

      .vault-input,
      .vault-select {
        width: 100%;
        min-height: 42px;
        border: 1px solid var(--vault-line);
        border-radius: 7px;
        padding: 0 12px;
        background: var(--vault-input-bg);
        color: var(--vault-ink);
      }

      .vault-input:focus,
      .vault-select:focus,
      .vault-copy:focus-visible,
      .vault-theme-toggle__option:focus-visible {
        outline: 3px solid var(--vault-focus);
        outline-offset: 2px;
      }

      .vault-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 18px;
      }

      .token-card {
        display: grid;
        min-width: 0;
        border: 1px solid var(--vault-line);
        border-radius: var(--vault-radius);
        background: var(--vault-surface);
        box-shadow: var(--vault-shadow);
        overflow: hidden;
      }

      .token-card__header {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 14px;
        align-items: start;
        padding: 18px;
        border-bottom: 1px solid var(--vault-line);
      }

      .token-card__kicker {
        margin: 0 0 6px;
        color: var(--vault-strong);
        font-size: 0.74rem;
        font-weight: 850;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .token-card__title {
        margin: 0;
        font-size: 1.28rem;
        line-height: 1.2;
        letter-spacing: 0;
      }

      .token-card__text {
        margin: 8px 0 0;
        color: var(--vault-muted);
        line-height: 1.5;
      }

      .token-card__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 12px;
      }

      .token-card__tag {
        border: 1px solid var(--vault-line);
        border-radius: 999px;
        padding: 4px 8px;
        background: var(--vault-panel);
        color: #475467;
        font-size: 0.72rem;
        font-weight: 750;
      }

      .vault-copy {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 118px;
        min-height: 40px;
        border: 1px solid var(--vault-strong);
        border-radius: 7px;
        padding: 0 12px;
        background: var(--vault-strong);
        color: #ffffff;
        font-weight: 800;
        cursor: pointer;
        transition: background 160ms ease, border-color 160ms ease, transform 160ms ease;
      }

      .vault-copy:hover {
        background: var(--vault-strong-hover);
        border-color: var(--vault-strong-hover);
        transform: translateY(-1px);
      }

      .vault-copy[data-state="copied"] {
        background: var(--vault-accent);
        border-color: var(--vault-accent);
      }

      .token-card__palette {
        display: grid;
        grid-template-columns: repeat(6, minmax(0, 1fr));
        gap: 1px;
        background: var(--vault-line);
      }

      .token-card__swatch {
        min-height: 36px;
      }

      .token-card__preview {
        width: 100%;
        height: 430px;
        border: 0;
        background: #ffffff;
      }

      .vault-empty {
        display: none;
        border: 1px dashed var(--vault-line);
        border-radius: var(--vault-radius);
        padding: 28px;
        background: var(--vault-surface);
        color: var(--vault-muted);
        text-align: center;
      }

      .vault-empty.is-visible {
        display: block;
      }

      @media (max-width: 1040px) {
        .vault-hero,
        .vault-grid {
          grid-template-columns: 1fr;
        }

        .vault-toolbar {
          grid-template-columns: 1fr 1fr;
        }
      }

      @media (max-width: 680px) {
        .vault-shell {
          width: min(100% - 20px, 1440px);
          padding-top: 14px;
        }

        .vault-topbar,
        .token-card__header {
          grid-template-columns: 1fr;
        }

        .vault-topbar,
        .vault-hero {
          align-items: start;
        }

        .vault-status {
          justify-content: flex-start;
        }

        .vault-actions {
          justify-content: flex-start;
        }

        .vault-summary,
        .vault-toolbar {
          grid-template-columns: 1fr;
        }

        .vault-hero__title {
          font-size: 2.35rem;
        }

        .token-card__preview {
          height: 500px;
        }
      }
    </style>
  </head>
  <body>
    <main class="vault-shell">
      <nav class="vault-topbar" aria-label="Produkt">
        <div class="vault-brand">
          <span class="vault-brand__mark">KP</span>
          <span>
            <span class="vault-brand__name">KP_Code Digital Vault</span>
            <span class="vault-brand__meta">Biblioteka produktów z tokenami CSS</span>
          </span>
        </div>
        <div class="vault-actions">
          <div class="vault-status" aria-label="Statystyki biblioteki">
            <span class="vault-status__item">20 zestawów tokenów</span>
            <span class="vault-status__item">Podglądy BEM</span>
            <span class="vault-status__item">CSS do skopiowania</span>
          </div>
          <div class="vault-theme-toggle" aria-label="Motyw panelu">
            <button class="vault-theme-toggle__option" type="button" data-theme-option="light" aria-pressed="true">Light</button>
            <button class="vault-theme-toggle__option" type="button" data-theme-option="dark" aria-pressed="false">Dark</button>
          </div>
        </div>
      </nav>

      <header class="vault-hero">
        <div>
          <p class="vault-hero__eyebrow">Design Tokens / Produkt dla developerów</p>
          <h1 class="vault-hero__title">Gotowe systemy stylów CSS dla profesjonalnych produktów.</h1>
          <p class="vault-hero__copy">
            Wybierz zestaw dopasowany do typu projektu, sprawdź komponenty w podglądzie i skopiuj pełny plik CSS z tokenami, skalami oraz klasami BEM do własnej aplikacji.
          </p>
        </div>
        <section class="vault-summary" aria-label="Podsumowanie produktu">
          <div class="vault-summary__item"><span class="vault-summary__value">${systems.length}</span><span class="vault-summary__label">zestawów</span></div>
          <div class="vault-summary__item"><span class="vault-summary__value">${categoryCount}</span><span class="vault-summary__label">kategorii</span></div>
          <div class="vault-summary__item"><span class="vault-summary__value vault-summary__value--action">Kopiuj CSS</span><span class="vault-summary__label">gotowe tokeny w schowku</span></div>
        </section>
      </header>

      <section class="vault-toolbar" aria-label="Filtry tokenów">
        <label class="vault-field">
          <span class="vault-field__label">Szukaj</span>
          <input class="vault-input" id="tokenSearch" type="search" placeholder="np. SaaS, fintech, AI" />
        </label>
        <label class="vault-field">
          <span class="vault-field__label">Kategoria</span>
          <select class="vault-select" id="categoryFilter"></select>
        </label>
        <label class="vault-field">
          <span class="vault-field__label">Sortowanie</span>
          <select class="vault-select" id="sortFilter">
            <option value="id">Numer zestawu</option>
            <option value="name">Nazwa</option>
            <option value="category">Kategoria</option>
          </select>
        </label>
      </section>

      <section class="vault-grid" id="tokenGrid" aria-live="polite"></section>
      <p class="vault-empty" id="emptyState">Brak zestawów dla wybranych filtrów.</p>
    </main>

    <script>
      const systems = ${JSON.stringify(systems)};

      ${tokenCss.toString()}

      ${previewSource.toString()}

      const grid = document.querySelector("#tokenGrid");
      const searchInput = document.querySelector("#tokenSearch");
      const categoryFilter = document.querySelector("#categoryFilter");
      const sortFilter = document.querySelector("#sortFilter");
      const emptyState = document.querySelector("#emptyState");
      const themeButtons = Array.from(document.querySelectorAll("[data-theme-option]"));

      function setTheme(theme) {
        const nextTheme = theme === "dark" ? "dark" : "light";
        document.documentElement.dataset.theme = nextTheme;
        themeButtons.forEach((button) => {
          button.setAttribute("aria-pressed", String(button.dataset.themeOption === nextTheme));
        });
        try {
          localStorage.setItem("vault-theme", nextTheme);
        } catch (error) {
          // localStorage can be unavailable in some embedded previews.
        }
      }

      setTheme(document.documentElement.dataset.theme);

      const categories = ["Wszystkie", ...Array.from(new Set(systems.map((system) => system.category))).sort()];
      categoryFilter.innerHTML = categories.map((category) => '<option value="' + category + '">' + category + '</option>').join("");

      function matchesFilters(system) {
        const query = searchInput.value.trim().toLowerCase();
        const selectedCategory = categoryFilter.value;
        const searchable = [system.name, system.category, system.useCase, system.description, ...system.tags].join(" ").toLowerCase();
        const categoryMatches = selectedCategory === "Wszystkie" || system.category === selectedCategory;
        return categoryMatches && (!query || searchable.includes(query));
      }

      function sortedSystems(items) {
        return [...items].sort((a, b) => {
          const key = sortFilter.value;
          return a[key].localeCompare(b[key], "pl", { numeric: true });
        });
      }

      async function copyCss(system, button) {
        const css = tokenCss(system);
        try {
          let copied = false;
          if (navigator.clipboard && window.isSecureContext) {
            try {
              await navigator.clipboard.writeText(css);
              copied = true;
            } catch (error) {
              copied = false;
            }
          }

          if (!copied) {
            const textarea = document.createElement("textarea");
            textarea.value = css;
            textarea.setAttribute("readonly", "");
            textarea.style.position = "fixed";
            textarea.style.inset = "0 auto auto 0";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            copied = document.execCommand("copy");
            textarea.remove();
          }

          if (!copied) {
            throw new Error("Clipboard write failed");
          }

          button.dataset.state = "copied";
          button.textContent = "Skopiowano";
          window.setTimeout(() => {
            button.dataset.state = "";
            button.textContent = "Kopiuj CSS";
          }, 1800);
        } catch (error) {
          button.textContent = "Błąd kopiowania";
          window.setTimeout(() => {
            button.textContent = "Kopiuj CSS";
          }, 1800);
        }
      }

      function createCard(system) {
        const article = document.createElement("article");
        article.className = "token-card";
        article.innerHTML = \`
          <header class="token-card__header">
            <div>
              <p class="token-card__kicker">Tokeny \${system.id} / \${system.category}</p>
              <h2 class="token-card__title">\${system.name}</h2>
              <p class="token-card__text">\${system.description}</p>
              <div class="token-card__tags">\${system.tags.map((tag) => \`<span class="token-card__tag">\${tag}</span>\`).join("")}</div>
            </div>
            <button class="vault-copy" type="button">Kopiuj CSS</button>
          </header>
          <div class="token-card__palette" aria-label="Podgląd palety">
            \${["background", "surfaceRaised", "primary", "secondary", "accent", "text"].map((key) => \`<span class="token-card__swatch" style="background: \${system.colors[key]}"></span>\`).join("")}
          </div>
          <iframe class="token-card__preview" title="Podgląd \${system.name}"></iframe>
        \`;
        article.querySelector(".vault-copy").addEventListener("click", (event) => copyCss(system, event.currentTarget));
        article.querySelector("iframe").srcdoc = previewSource(system);
        return article;
      }

      function render() {
        const visibleSystems = sortedSystems(systems.filter(matchesFilters));
        grid.replaceChildren(...visibleSystems.map(createCard));
        emptyState.classList.toggle("is-visible", visibleSystems.length === 0);
      }

      searchInput.addEventListener("input", render);
      categoryFilter.addEventListener("change", render);
      sortFilter.addEventListener("change", render);
      themeButtons.forEach((button) => {
        button.addEventListener("click", () => setTheme(button.dataset.themeOption));
      });
      render();
    </script>
  </body>
</html>
`;
}

function readme() {
  const list = systems.map((system) => `- \`${system.file}\` - ${system.name} (${system.useCase})`).join("\n");
  return `# KP_Code Digital Vault - CSS Design Token Systems

Ten folder produktu zawiera 20 gotowych do skopiowania systemów tokenów CSS dla projektów developerskich.
Każdy plik jest samodzielny i zawiera namespacowane CSS custom properties oraz warstwę podglądu komponentów w strukturze BEM.

## Dostępne zestawy tokenów

${list}

## Struktura tokenów

Każdy plik \`tokens-xx.css\` zawiera:

1. Prymitywy kolorów pod \`--dt-color-*\`
2. Tokeny typografii pod \`--dt-font-*\`, \`--dt-text-*\` i \`--dt-leading-*\`
3. Tokeny odstępów od \`--dt-space-1\` do \`--dt-space-8\`
4. Tokeny zaokrągleń, cieni, układu i ruchu
5. Profesjonalne klasy demo w BEM:
   - \`.dt-preview\`
   - \`.dt-preview__title\`
   - \`.dt-button\`
   - \`.dt-button--primary\`
   - \`.dt-card\`
   - \`.dt-metric\`
   - \`.dt-scale__swatch\`

## Użycie

Zaimportuj jeden plik tokenów przed stylami komponentów:

\`\`\`html
<link rel="stylesheet" href="./design-tokens/tokens-02.css" />
<link rel="stylesheet" href="./styles/components.css" />
\`\`\`

Możesz też skopiować CSS bezpośrednio z panelu w \`index.html\`.
Panel ma przełącznik \`Light\` / \`Dark\`, który zapisuje wybór użytkownika w \`localStorage\`.

## Rekomendowany workflow

1. Wybierz zestaw tokenów dopasowany do kategorii produktu.
2. Mapuj komponenty aplikacji na zmienne \`--dt-*\`.
3. Traktuj klasy BEM z podglądu jako wskazówkę do projektowania API komponentów.
4. Zmieniaj pliki tokenów, gdy potrzebujesz innego kierunku wizualnego.

## Utrzymanie

Źródłem prawdy jest \`scripts/build-tokens.js\`.
Po edycji danych tokenów uruchom generator:

\`\`\`bash
node scripts/build-tokens.js
\`\`\`
`;
}

for (const system of systems) {
  fs.writeFileSync(path.join(rootDir, system.file), tokenCss(system), "utf8");
}

fs.writeFileSync(path.join(rootDir, "index.html"), indexHtml(), "utf8");
fs.writeFileSync(path.join(rootDir, "README.md"), readme(), "utf8");

console.log(`Wygenerowano ${systems.length} zestawów tokenów.`);
