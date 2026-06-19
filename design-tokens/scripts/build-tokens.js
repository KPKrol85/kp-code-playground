const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const tokenDirName = "tokens";
const tokenDir = path.join(rootDir, tokenDirName);

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
      primary: "#bd3f78",
      primaryHover: "#9b3060",
      primaryContrast: "#ffffff",
      secondary: "#7060d8",
      accent: "#2ba99d",
      success: "#2f8f64",
      warning: "#b86d0e",
      danger: "#c83f66",
      focus: "#7060d8",
      shadowRgb: "189 63 120"
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
    name: "Terminal Ops Console",
    category: "Dla devów",
    useCase: "CLI, narzędzia terminalowe, logi runtime i techniczne panele operacyjne",
    description: "Konsolowy system developerski z terminalową zielenią, zimnym błękitem telemetrycznym i ostrą strukturą komend.",
    primaryAction: "Uruchom komendę",
    secondaryAction: "Otwórz logi",
    tags: ["cli", "terminal", "runtime"],
    colors: {
      background: "#08110d",
      surface: "#101a15",
      surfaceRaised: "#1b2821",
      text: "#eef8f2",
      textMuted: "#a6b8ad",
      border: "#33473c",
      primary: "#4ade80",
      primaryHover: "#22c55e",
      primaryContrast: "#04130b",
      secondary: "#38bdf8",
      accent: "#f59e0b",
      success: "#4ade80",
      warning: "#f59e0b",
      danger: "#fb7185",
      focus: "#4ade80",
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
      primary: "#c43f2a",
      primaryHover: "#9f3020",
      primaryContrast: "#ffffff",
      secondary: "#2458d3",
      accent: "#b02579",
      success: "#278353",
      warning: "#bd6b00",
      danger: "#c73545",
      focus: "#2458d3",
      shadowRgb: "196 63 42"
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
    name: "Learning Management",
    category: "Edukacja",
    useCase: "LMS, dashboardy kursów, ścieżki modułów i bazy wiedzy dla dorosłych uczących się",
    description: "Stabilny system LMS z akademickim błękitem, czytelnym rytmem lekcji i neutralną bazą do długiej pracy.",
    primaryAction: "Start lekcji",
    secondaryAction: "Zapisz moduł",
    tags: ["lms", "courses", "knowledge"],
    colors: {
      background: "#f6f8fc",
      surface: "#ffffff",
      surfaceRaised: "#e8eef8",
      text: "#182233",
      textMuted: "#5d687b",
      border: "#d4deec",
      primary: "#2f5f9f",
      primaryHover: "#244a7d",
      primaryContrast: "#ffffff",
      secondary: "#2c8b78",
      accent: "#9a6b2f",
      success: "#23845a",
      warning: "#ad6800",
      danger: "#bf3f4d",
      focus: "#2f5f9f",
      shadowRgb: "47 95 159"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
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
      primaryContrast: "#1b0710",
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
    description: "Impactowy system nonprofit z organiczną zielenią, jasnym tłem raportowym i ciepłym akcentem wsparcia społecznego.",
    primaryAction: "Wesprzyj",
    secondaryAction: "Wolontariat",
    tags: ["nonprofit", "publiczne", "darowizny"],
    colors: {
      background: "#f6faf4",
      surface: "#ffffff",
      surfaceRaised: "#e6f0df",
      text: "#1e2a20",
      textMuted: "#5d6d5f",
      border: "#cfddc8",
      primary: "#3b7a45",
      primaryHover: "#2d5f35",
      primaryContrast: "#ffffff",
      secondary: "#2f6f73",
      accent: "#b7791f",
      success: "#2f7a48",
      warning: "#a86518",
      danger: "#b23a48",
      focus: "#2f6f73",
      shadowRgb: "59 122 69"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Aptos Display', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
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

systems.push(
  {
    id: "21",
    file: "tokens-21.css",
    name: "Documentation Pro",
    category: "Treści",
    useCase: "Portale wiedzy, bazy pomocy i dokumentacja produktów B2B",
    description: "Czytelny system dokumentacyjny z mocniejszą nawigacją, spokojnymi neutralami i wyraźnym stanem linków.",
    primaryAction: "Otwórz artykuł",
    secondaryAction: "Zapisz sekcję",
    tags: ["knowledge base", "docs", "support"],
    colors: {
      background: "#f5f7f9",
      surface: "#ffffff",
      surfaceRaised: "#e8edf2",
      text: "#1b2430",
      textMuted: "#5f6d7d",
      border: "#d3dbe5",
      primary: "#2b5d84",
      primaryHover: "#214766",
      primaryContrast: "#ffffff",
      secondary: "#58724f",
      accent: "#9a6b2f",
      success: "#2f7a48",
      warning: "#a86518",
      danger: "#a83e3e",
      focus: "#2b5d84",
      shadowRgb: "43 93 132"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Source Sans 3', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.2rem", "0.375rem", "0.625rem", "0.875rem"]
  },
  {
    id: "22",
    file: "tokens-22.css",
    name: "SaaS Control",
    category: "SaaS",
    useCase: "Panele kontroli, settings pages i narzędzia administracyjne SaaS",
    description: "Operacyjny zestaw SaaS z bardziej technicznym rytmem, chłodnymi powierzchniami i mocnym kolorem akcji.",
    primaryAction: "Zapisz zmiany",
    secondaryAction: "Zobacz plan",
    tags: ["settings", "admin", "subscription"],
    colors: {
      background: "#f2f6fb",
      surface: "#ffffff",
      surfaceRaised: "#e5edf7",
      text: "#152033",
      textMuted: "#5d6a7d",
      border: "#cfdae8",
      primary: "#2563c9",
      primaryHover: "#1d4f9f",
      primaryContrast: "#ffffff",
      secondary: "#0e8a83",
      accent: "#b1539b",
      success: "#168052",
      warning: "#b06a00",
      danger: "#c43c4f",
      focus: "#2563c9",
      shadowRgb: "37 99 201"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Manrope', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "23",
    file: "tokens-23.css",
    name: "Editorial House",
    category: "Marka",
    useCase: "Magazyny cyfrowe, publikacje brandowe, manifesty marek i strony redakcyjne premium",
    description: "Jasny kierunek editorial z chłodnym atramentem, subtelnym bursztynem i spokojną strukturą publikacji.",
    primaryAction: "Czytaj manifest",
    secondaryAction: "Zobacz wydanie",
    tags: ["editorial", "publishing", "brand"],
    colors: {
      background: "#f6f7f8",
      surface: "#ffffff",
      surfaceRaised: "#eaedf1",
      text: "#1f242b",
      textMuted: "#5f6670",
      border: "#d3d9e0",
      primary: "#23395b",
      primaryHover: "#182943",
      primaryContrast: "#ffffff",
      secondary: "#7c5b2e",
      accent: "#476a82",
      success: "#3d7a53",
      warning: "#a86518",
      danger: "#a64545",
      focus: "#476a82",
      shadowRgb: "35 57 91"
    },
    fonts: {
      sans: "'Inter', 'Avenir Next', 'Segoe UI', sans-serif",
      heading: "'Libre Baskerville', Georgia, serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "24",
    file: "tokens-24.css",
    name: "Community Care",
    category: "Konsumenckie",
    useCase: "Aplikacje społecznościowe, profile użytkowników i lekkie feedy",
    description: "Miękki społecznościowy system z przyjazną zielenią, ciepłymi tłami i bezpiecznymi akcentami.",
    primaryAction: "Dołącz",
    secondaryAction: "Zobacz profil",
    tags: ["community", "social", "profiles"],
    colors: {
      background: "#f6fbf6",
      surface: "#ffffff",
      surfaceRaised: "#e8f4e8",
      text: "#202b24",
      textMuted: "#637269",
      border: "#d2e2d4",
      primary: "#327548",
      primaryHover: "#285d3a",
      primaryContrast: "#ffffff",
      secondary: "#5d6bd8",
      accent: "#d17755",
      success: "#2f8f64",
      warning: "#b86d0e",
      danger: "#c84b62",
      focus: "#5d6bd8",
      shadowRgb: "50 117 72"
    },
    fonts: {
      sans: "'Nunito Sans', 'Inter', 'Segoe UI', sans-serif",
      heading: "'Nunito Sans', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.625rem", "0.875rem", "1.25rem", "1.625rem"]
  },
  {
    id: "25",
    file: "tokens-25.css",
    name: "Accessible Utility",
    category: "Dostępność",
    useCase: "Formularze publiczne, procesy wniosków i narzędzia samoobsługowe",
    description: "Użytkowy system dostępnościowy z mocnymi etykietami, prostymi stanami i bezpiecznymi kontrastami.",
    primaryAction: "Wyślij formularz",
    secondaryAction: "Sprawdź dane",
    tags: ["forms", "public", "wcag"],
    colors: {
      background: "#f7f7f7",
      surface: "#ffffff",
      surfaceRaised: "#eeeeee",
      text: "#121212",
      textMuted: "#383838",
      border: "#2d3748",
      primary: "#004a99",
      primaryHover: "#003870",
      primaryContrast: "#ffffff",
      secondary: "#00704a",
      accent: "#8a1f7a",
      success: "#0f7a32",
      warning: "#8f4a00",
      danger: "#b00020",
      focus: "#004a99",
      shadowRgb: "18 18 18"
    },
    fonts: {
      sans: "'Atkinson Hyperlegible', 'Inter', Arial, sans-serif",
      heading: "'Atkinson Hyperlegible', 'Segoe UI', Arial, sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0", "0.125rem", "0.25rem", "0.5rem"]
  },
  {
    id: "26",
    file: "tokens-26.css",
    name: "Finance Operations",
    category: "Finanse",
    useCase: "Backoffice finansowy, rozliczenia, faktury i widoki statusów płatności",
    description: "Operacyjny system finansowy z kompaktowym rytmem, neutralnymi tabelami i stabilnym kolorem decyzji.",
    primaryAction: "Zatwierdź płatność",
    secondaryAction: "Pobierz fakturę",
    tags: ["billing", "backoffice", "payments"],
    colors: {
      background: "#f4f6f6",
      surface: "#ffffff",
      surfaceRaised: "#e6eceb",
      text: "#14201f",
      textMuted: "#586664",
      border: "#cad6d4",
      primary: "#0c625d",
      primaryHover: "#084b47",
      primaryContrast: "#ffffff",
      secondary: "#294f86",
      accent: "#966a10",
      success: "#137a4b",
      warning: "#956111",
      danger: "#aa3535",
      focus: "#294f86",
      shadowRgb: "12 98 93"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.375rem", "0.625rem"]
  },
  {
    id: "27",
    file: "tokens-27.css",
    name: "Clinic Portal",
    category: "Zdrowie",
    useCase: "Panele placówek medycznych, grafiki wizyt i karty pacjenta",
    description: "Profesjonalny system kliniczny z chłodnym błękitem, spokojnym tłem i czytelnymi blokami danych.",
    primaryAction: "Dodaj wizytę",
    secondaryAction: "Karta pacjenta",
    tags: ["clinic", "schedule", "patient"],
    colors: {
      background: "#f2f8fb",
      surface: "#ffffff",
      surfaceRaised: "#e3f0f5",
      text: "#172b34",
      textMuted: "#5b6f78",
      border: "#c9dde6",
      primary: "#1976a2",
      primaryHover: "#125a7c",
      primaryContrast: "#ffffff",
      secondary: "#138071",
      accent: "#bf6b4b",
      success: "#23845a",
      warning: "#aa6515",
      danger: "#bf3f4d",
      focus: "#1976a2",
      shadowRgb: "25 118 162"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Source Sans 3', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "28",
    file: "tokens-28.css",
    name: "API Reference Lab",
    category: "Dla devów",
    useCase: "Dokumentacja API, przykłady requestów, eksploratory endpointów i referencje SDK",
    description: "Jasny system dokumentacyjny dla API z precyzyjnym błękitem, tealowym statusem odpowiedzi i mocnymi blokami kodu.",
    primaryAction: "Kopiuj endpoint",
    secondaryAction: "Uruchom test",
    tags: ["api", "reference", "requests"],
    colors: {
      background: "#f6f8fb",
      surface: "#ffffff",
      surfaceRaised: "#e7eef7",
      text: "#172331",
      textMuted: "#5e6c7a",
      border: "#d0dbe7",
      primary: "#295f9e",
      primaryHover: "#214a7b",
      primaryContrast: "#ffffff",
      secondary: "#0f766e",
      accent: "#6f4bb8",
      success: "#168052",
      warning: "#a86518",
      danger: "#ba3434",
      focus: "#295f9e",
      shadowRgb: "41 95 158"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "29",
    file: "tokens-29.css",
    name: "Campaign Builder",
    category: "Kreatywne",
    useCase: "Kreatory kampanii, kalendarze contentu i panele publikacji",
    description: "Dynamiczny system dla kampanii z wyrazistym fioletem, świeżym tłem i kontrolowanym kontrastem.",
    primaryAction: "Zaplanuj post",
    secondaryAction: "Zobacz kreację",
    tags: ["campaign", "content", "publishing"],
    colors: {
      background: "#f8f5ff",
      surface: "#ffffff",
      surfaceRaised: "#eee7ff",
      text: "#251f35",
      textMuted: "#686078",
      border: "#ddd2f1",
      primary: "#7c3bb8",
      primaryHover: "#633094",
      primaryContrast: "#ffffff",
      secondary: "#0e8f9a",
      accent: "#df6b36",
      success: "#278353",
      warning: "#bd6b00",
      danger: "#c73545",
      focus: "#7c3bb8",
      shadowRgb: "124 59 184"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Manrope', 'Inter', sans-serif",
      mono: "'DM Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.625rem", "0.875rem", "1.25rem"]
  },
  {
    id: "30",
    file: "tokens-30.css",
    name: "Checkout Flow",
    category: "Handel",
    useCase: "Koszyki, płatności, formularze dostawy i potwierdzenia zamówień",
    description: "Skoncentrowany system checkout z jasną hierarchią kroków, spokojnymi tłami i silnym CTA.",
    primaryAction: "Przejdź do płatności",
    secondaryAction: "Edytuj koszyk",
    tags: ["checkout", "payment", "cart"],
    colors: {
      background: "#f8faf7",
      surface: "#ffffff",
      surfaceRaised: "#edf4ea",
      text: "#1f2a20",
      textMuted: "#5f6d61",
      border: "#d4dfd0",
      primary: "#2f7d44",
      primaryHover: "#246134",
      primaryContrast: "#ffffff",
      secondary: "#8a5a24",
      accent: "#2f5f9f",
      success: "#2d7d46",
      warning: "#a86518",
      danger: "#b83b3b",
      focus: "#2f5f9f",
      shadowRgb: "47 125 68"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Libre Franklin', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.625rem", "0.875rem"]
  },
  {
    id: "31",
    file: "tokens-31.css",
    name: "Junior Academy",
    category: "Edukacja",
    useCase: "Aplikacje edukacyjne dla młodszych uczniów, mikro-lekcje, quizy obrazkowe i nagrody postępu",
    description: "Ciepły, przyjazny system junior learning z pomarańczowym CTA, tealowym wsparciem i bardziej miękką kompozycją.",
    primaryAction: "Kontynuuj lekcję",
    secondaryAction: "Zobacz odznaki",
    tags: ["junior", "lessons", "badges"],
    colors: {
      background: "#fff8f0",
      surface: "#ffffff",
      surfaceRaised: "#f6e8d7",
      text: "#2a2018",
      textMuted: "#6f5c4e",
      border: "#e4d1bd",
      primary: "#b64a1f",
      primaryHover: "#923815",
      primaryContrast: "#ffffff",
      secondary: "#237a68",
      accent: "#5b5fc7",
      success: "#287a52",
      warning: "#a86518",
      danger: "#b43d4a",
      focus: "#5b5fc7",
      shadowRgb: "182 74 31"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Nunito Sans', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.5rem", "0.875rem", "1.125rem", "1.5rem"]
  },
  {
    id: "32",
    file: "tokens-32.css",
    name: "Threat Monitor",
    category: "Bezpieczeństwo",
    useCase: "Monitoring zagrożeń, widoki incydentów i listy alertów operacyjnych",
    description: "Ciemny system monitoringu z czerwonym alertem, zielonym statusem i bardzo czytelnymi panelami.",
    primaryAction: "Izoluj alert",
    secondaryAction: "Historia zdarzeń",
    tags: ["threats", "alerts", "incident"],
    colors: {
      background: "#111318",
      surface: "#181c24",
      surfaceRaised: "#232936",
      text: "#f0f4fa",
      textMuted: "#a9b3c0",
      border: "#384253",
      primary: "#ef4444",
      primaryHover: "#dc2626",
      primaryContrast: "#ffffff",
      secondary: "#22c55e",
      accent: "#38bdf8",
      success: "#22c55e",
      warning: "#f59e0b",
      danger: "#ef4444",
      focus: "#38bdf8",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Space Grotesk', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.375rem", "0.5rem"]
  },
  {
    id: "33",
    file: "tokens-33.css",
    name: "Insights Hub",
    category: "Analityka",
    useCase: "Centra insightów, dashboardy zespołowe i widoki KPI dla zarządu",
    description: "Zbalansowany system insightów z bardziej premium powierzchniami i kolorem wspierającym analizę.",
    primaryAction: "Dodaj insight",
    secondaryAction: "Eksportuj widok",
    tags: ["insights", "kpi", "teams"],
    colors: {
      background: "#f6f7fb",
      surface: "#ffffff",
      surfaceRaised: "#ebeff7",
      text: "#192233",
      textMuted: "#5d687b",
      border: "#d5ddea",
      primary: "#355c9f",
      primaryHover: "#29487d",
      primaryContrast: "#ffffff",
      secondary: "#6f4bb8",
      accent: "#0f9f6e",
      success: "#168052",
      warning: "#a86518",
      danger: "#ba3434",
      focus: "#355c9f",
      shadowRgb: "53 92 159"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "34",
    file: "tokens-34.css",
    name: "Energy Grid",
    category: "Zrównoważony rozwój",
    useCase: "Panele energii, mapy zużycia, raporty produkcji i prognozy zasobów",
    description: "Ciemny system energetyczny z zielonym sygnałem produkcji, cyjanową telemetrią sieci i bursztynowym alertem obciążenia.",
    primaryAction: "Analizuj zużycie",
    secondaryAction: "Porównaj okres",
    tags: ["energy", "grid", "forecast"],
    colors: {
      background: "#0d1412",
      surface: "#141f1c",
      surfaceRaised: "#20312d",
      text: "#edf7f2",
      textMuted: "#a7b9b0",
      border: "#334a43",
      primary: "#4ade80",
      primaryHover: "#22c55e",
      primaryContrast: "#06100b",
      secondary: "#38bdf8",
      accent: "#f59e0b",
      success: "#4ade80",
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
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "35",
    file: "tokens-35.css",
    name: "Compliance Desk",
    category: "Enterprise",
    useCase: "Centra compliance, listy audytowe i workflow zatwierdzania dokumentów",
    description: "Surowy enterprise desk z mocnym granatem, dyskretnym bursztynem i formalnym układem kontroli.",
    primaryAction: "Zatwierdź rekord",
    secondaryAction: "Dodaj komentarz",
    tags: ["audit", "approval", "policy"],
    colors: {
      background: "#f5f6f8",
      surface: "#ffffff",
      surfaceRaised: "#eaedf1",
      text: "#1d232b",
      textMuted: "#5d6570",
      border: "#d0d7df",
      primary: "#1f3656",
      primaryHover: "#162840",
      primaryContrast: "#ffffff",
      secondary: "#7b6236",
      accent: "#426a86",
      success: "#23704b",
      warning: "#956111",
      danger: "#a63d40",
      focus: "#426a86",
      shadowRgb: "31 54 86"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Merriweather Sans', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.375rem", "0.5rem"]
  },
  {
    id: "36",
    file: "tokens-36.css",
    name: "Prompt Studio",
    category: "AI",
    useCase: "Edytory promptów, biblioteki automatyzacji i testy wariantów AI",
    description: "Kreatywny prompt lab z jasnym fioletem, miękkimi powierzchniami i studyjnym akcentem testów wariantów.",
    primaryAction: "Testuj wariant",
    secondaryAction: "Zapisz prompt",
    tags: ["prompting", "variants", "automation"],
    colors: {
      background: "#fbf7ff",
      surface: "#ffffff",
      surfaceRaised: "#f0e6fb",
      text: "#281f32",
      textMuted: "#70627d",
      border: "#e1d0ec",
      primary: "#8b4fc7",
      primaryHover: "#6e3fa0",
      primaryContrast: "#ffffff",
      secondary: "#0f8f8a",
      accent: "#d4772f",
      success: "#18835a",
      warning: "#b06a00",
      danger: "#c83f54",
      focus: "#8b4fc7",
      shadowRgb: "139 79 199"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Sora', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.5rem", "0.875rem", "1.125rem", "1.5rem"]
  },
  {
    id: "37",
    file: "tokens-37.css",
    name: "Property CRM",
    category: "Nieruchomości",
    useCase: "CRM agentów, pipeline sprzedaży, kontakty klientów i statusy ofert",
    description: "Operacyjny system nieruchomości z bardziej biznesową paletą, czytelnymi statusami i spokojnym tłem.",
    primaryAction: "Dodaj lead",
    secondaryAction: "Zobacz pipeline",
    tags: ["crm", "leads", "pipeline"],
    colors: {
      background: "#f5f7fb",
      surface: "#ffffff",
      surfaceRaised: "#e8eef7",
      text: "#182332",
      textMuted: "#5d6978",
      border: "#d2dce8",
      primary: "#2f5f9f",
      primaryHover: "#244a7d",
      primaryContrast: "#ffffff",
      secondary: "#2d8478",
      accent: "#b36b24",
      success: "#237a52",
      warning: "#a86518",
      danger: "#b23a48",
      focus: "#2f5f9f",
      shadowRgb: "47 95 159"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.375rem", "0.625rem", "0.875rem"]
  },
  {
    id: "38",
    file: "tokens-38.css",
    name: "Esports Arena",
    category: "Gry",
    useCase: "Turnieje, rankingi, profile drużyn i strony wydarzeń esportowych",
    description: "Energetyczny system esportowy z mocnym fioletem, neonowym akcentem i czytelnymi kartami wyników.",
    primaryAction: "Zapisz drużynę",
    secondaryAction: "Tabela wyników",
    tags: ["esports", "ranking", "teams"],
    colors: {
      background: "#0f1020",
      surface: "#181a2e",
      surfaceRaised: "#242642",
      text: "#f2f3ff",
      textMuted: "#b4b7d4",
      border: "#393d63",
      primary: "#8b5cf6",
      primaryHover: "#7c3aed",
      primaryContrast: "#12081f",
      secondary: "#22d3ee",
      accent: "#f43f5e",
      success: "#48c774",
      warning: "#f9c74f",
      danger: "#ff5f6d",
      focus: "#22d3ee",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Rajdhani', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.375rem", "0.625rem"]
  },
  {
    id: "39",
    file: "tokens-39.css",
    name: "Donation Platform",
    category: "Społeczne",
    useCase: "Platformy darowizn, kampanie społeczne i strony zbiórek",
    description: "Kampanijny system darowizn z ciepłym CTA, miękkimi kartami postępu i emocjonalnym akcentem udostępniania.",
    primaryAction: "Wesprzyj cel",
    secondaryAction: "Udostępnij zbiórkę",
    tags: ["donations", "campaign", "impact"],
    colors: {
      background: "#fff7f1",
      surface: "#ffffff",
      surfaceRaised: "#f5e6dc",
      text: "#2b211d",
      textMuted: "#75645b",
      border: "#e4cfc2",
      primary: "#c45334",
      primaryHover: "#9e3f28",
      primaryContrast: "#ffffff",
      secondary: "#2e806f",
      accent: "#7b5ab6",
      success: "#2f7a48",
      warning: "#a86518",
      danger: "#b23a48",
      focus: "#7b5ab6",
      shadowRgb: "196 83 52"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Libre Franklin', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.375rem", "0.75rem", "1rem", "1.25rem"]
  },
  {
    id: "40",
    file: "tokens-40.css",
    name: "Focus Planner",
    category: "Produktywność",
    useCase: "Planery dnia, focus time, widoki priorytetów i lekkie narzędzia pracy",
    description: "Skupiony system planowania z ciepłą papierową bazą, zielonym CTA i bursztynowym akcentem priorytetów.",
    primaryAction: "Zaplanuj blok",
    secondaryAction: "Otwórz dzień",
    tags: ["focus", "planning", "tasks"],
    colors: {
      background: "#f8f6ef",
      surface: "#ffffff",
      surfaceRaised: "#ede7d9",
      text: "#24231e",
      textMuted: "#6a665c",
      border: "#ddd4c4",
      primary: "#3f6f4f",
      primaryHover: "#30553c",
      primaryContrast: "#ffffff",
      secondary: "#7a5b2e",
      accent: "#9a6b2f",
      success: "#2f7a48",
      warning: "#a86518",
      danger: "#b43d4a",
      focus: "#3f6f4f",
      shadowRgb: "63 111 79"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Manrope', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  }
);

systems.push(
  {
    id: "41",
    file: "tokens-41.css",
    name: "Editorial Archive",
    category: "Treści",
    useCase: "Archiwa artykułów, biblioteki publikacji i kolekcje długich form",
    description: "Redakcyjny system archiwum z papierową bazą, klasyczną typografią i spokojnym rytmem czytania.",
    primaryAction: "Przeglądaj archiwum",
    secondaryAction: "Filtruj kolekcję",
    tags: ["archive", "publikacje", "reading"],
    colors: {
      background: "#f8f4ec",
      surface: "#fffdf8",
      surfaceRaised: "#efe7d8",
      text: "#28241e",
      textMuted: "#71695e",
      border: "#ded3bf",
      primary: "#6c5134",
      primaryHover: "#543f29",
      primaryContrast: "#ffffff",
      secondary: "#3f6b73",
      accent: "#9b6a3a",
      success: "#3f7a52",
      warning: "#a86518",
      danger: "#a83e3e",
      focus: "#3f6b73",
      shadowRgb: "108 81 52"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Fraunces', Georgia, 'Times New Roman', serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "42",
    file: "tokens-42.css",
    name: "Growth Metrics",
    category: "SaaS",
    useCase: "Widoki MRR, aktywacji, retencji i eksperymentów produktowych",
    description: "Analityczny SaaS dla wzrostu z ciepłym CTA eksperymentu, tealowym balansem danych i wyraźnymi statusami kohort.",
    primaryAction: "Uruchom eksperyment",
    secondaryAction: "Porównaj kohorty",
    tags: ["growth", "metrics", "experiments"],
    colors: {
      background: "#fff8f3",
      surface: "#ffffff",
      surfaceRaised: "#f4eadf",
      text: "#2a211b",
      textMuted: "#71665d",
      border: "#e2d3c5",
      primary: "#a9552f",
      primaryHover: "#874325",
      primaryContrast: "#ffffff",
      secondary: "#2d8478",
      accent: "#4f68c7",
      success: "#287a52",
      warning: "#a86518",
      danger: "#b23a48",
      focus: "#2d8478",
      shadowRgb: "169 85 47"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Sora', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.25rem", "0.375rem", "0.625rem", "0.875rem"]
  },
  {
    id: "43",
    file: "tokens-43.css",
    name: "Heritage Brand",
    category: "Marka",
    useCase: "Marki rzemieślnicze, galerie, wina premium i historie marek",
    description: "Dziedzictwo marki z głęboką zielenią, szlachetną kością słoniową i elegancką typografią.",
    primaryAction: "Poznaj historię",
    secondaryAction: "Zobacz atelier",
    tags: ["heritage", "craft", "story"],
    colors: {
      background: "#f6f1e7",
      surface: "#fffaf1",
      surfaceRaised: "#eadfcd",
      text: "#272217",
      textMuted: "#746957",
      border: "#d9cbb3",
      primary: "#35513f",
      primaryHover: "#283e30",
      primaryContrast: "#ffffff",
      secondary: "#9a6a2f",
      accent: "#7c3f32",
      success: "#3d7a53",
      warning: "#a86518",
      danger: "#a64545",
      focus: "#35513f",
      shadowRgb: "53 81 63"
    },
    fonts: {
      sans: "'Inter', 'Avenir Next', 'Segoe UI', sans-serif",
      heading: "'Cormorant Garamond', Georgia, serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.375rem", "0.625rem"]
  },
  {
    id: "44",
    file: "tokens-44.css",
    name: "Lifestyle App",
    category: "Konsumenckie",
    useCase: "Aplikacje nawyków, listy osobiste, mikrospołeczności i profile lifestyle",
    description: "Lekki konsumencki system z pastelowym niebem, koralowym CTA i zaokrąglonymi elementami.",
    primaryAction: "Dodaj nawyk",
    secondaryAction: "Zobacz dzień",
    tags: ["habits", "lifestyle", "daily"],
    colors: {
      background: "#f7fbff",
      surface: "#ffffff",
      surfaceRaised: "#eaf4fb",
      text: "#26303a",
      textMuted: "#657483",
      border: "#d5e3ed",
      primary: "#b94646",
      primaryHover: "#963838",
      primaryContrast: "#ffffff",
      secondary: "#3f88a7",
      accent: "#7d67c8",
      success: "#2f8f64",
      warning: "#b86d0e",
      danger: "#c84b62",
      focus: "#3f88a7",
      shadowRgb: "185 70 70"
    },
    fonts: {
      sans: "'Nunito Sans', 'Inter', 'Segoe UI', sans-serif",
      heading: "'Poppins', 'Nunito Sans', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.625rem", "1rem", "1.375rem", "1.75rem"]
  },
  {
    id: "45",
    file: "tokens-45.css",
    name: "Readable Forms",
    category: "Dostępność",
    useCase: "Rejestracje, ankiety, formularze urzędowe i procesy wieloetapowe",
    description: "Formularzowy system dostępnościowy z szerokimi stanami focus, dużą typografią i jednoznacznymi błędami.",
    primaryAction: "Przejdź dalej",
    secondaryAction: "Sprawdź formularz",
    tags: ["forms", "wcag", "survey"],
    colors: {
      background: "#fbfbfb",
      surface: "#ffffff",
      surfaceRaised: "#f0f2f4",
      text: "#101418",
      textMuted: "#3d454d",
      border: "#26313d",
      primary: "#005fcc",
      primaryHover: "#004a9f",
      primaryContrast: "#ffffff",
      secondary: "#00705c",
      accent: "#8b2f7b",
      success: "#0f7a32",
      warning: "#8f4a00",
      danger: "#b00020",
      focus: "#005fcc",
      shadowRgb: "16 20 24"
    },
    fonts: {
      sans: "'Atkinson Hyperlegible', 'Inter', Arial, sans-serif",
      heading: "'Atkinson Hyperlegible', 'Segoe UI', Arial, sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.375rem", "0.625rem"]
  },
  {
    id: "46",
    file: "tokens-46.css",
    name: "Trading Desk",
    category: "Finanse",
    useCase: "Portfele inwestycyjne, alerty rynkowe, watchlisty i widoki tradingowe",
    description: "Ciemny desk inwestycyjny z niskim kontrastem tła, wyraźną zielenią akcji i bursztynowym sygnałem.",
    primaryAction: "Dodaj alert",
    secondaryAction: "Zobacz portfel",
    tags: ["trading", "portfolio", "markets"],
    colors: {
      background: "#0f1718",
      surface: "#162123",
      surfaceRaised: "#213033",
      text: "#ecf4f2",
      textMuted: "#9fb2ae",
      border: "#33474a",
      primary: "#35c48f",
      primaryHover: "#26a879",
      primaryContrast: "#071310",
      secondary: "#64a7ff",
      accent: "#d8a536",
      success: "#35c48f",
      warning: "#d8a536",
      danger: "#f06f6f",
      focus: "#64a7ff",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.375rem", "0.5rem"]
  },
  {
    id: "47",
    file: "tokens-47.css",
    name: "Wellness Tracker",
    category: "Zdrowie",
    useCase: "Trackery zdrowia, aplikacje profilaktyczne, plany nawyków i check-iny",
    description: "Wellnessowy system zdrowia z miękką zielenią, spokojną typografią i komfortowymi odstępami.",
    primaryAction: "Zapisz pomiar",
    secondaryAction: "Historia zdrowia",
    tags: ["wellness", "tracker", "habits"],
    colors: {
      background: "#f5fbf5",
      surface: "#ffffff",
      surfaceRaised: "#e6f3e7",
      text: "#1d2e24",
      textMuted: "#5f7166",
      border: "#cfe1d2",
      primary: "#2f7a48",
      primaryHover: "#255f38",
      primaryContrast: "#ffffff",
      secondary: "#4f7ea3",
      accent: "#c47a4d",
      success: "#23845a",
      warning: "#aa6515",
      danger: "#bf3f4d",
      focus: "#4f7ea3",
      shadowRgb: "47 122 72"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Source Sans 3', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.5rem", "0.75rem", "1rem", "1.375rem"]
  },
  {
    id: "48",
    file: "tokens-48.css",
    name: "Observability Grid",
    category: "Dla devów",
    useCase: "Metryki usług, traces, alerty SLO, health checks i dashboardy observability",
    description: "Ciemny system observability z bursztynowym priorytetem alertów, błękitną telemetrią i różowym stanem incydentu.",
    primaryAction: "Sprawdź alert",
    secondaryAction: "Otwórz traces",
    tags: ["observability", "slo", "traces"],
    colors: {
      background: "#0f1217",
      surface: "#171b22",
      surfaceRaised: "#232934",
      text: "#f3f6fb",
      textMuted: "#aab3c0",
      border: "#3a4352",
      primary: "#f59e0b",
      primaryHover: "#d88706",
      primaryContrast: "#160f04",
      secondary: "#60a5fa",
      accent: "#fb7185",
      success: "#34d399",
      warning: "#f59e0b",
      danger: "#fb7185",
      focus: "#60a5fa",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Sora', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.375rem", "0.625rem"]
  },
  {
    id: "49",
    file: "tokens-49.css",
    name: "Media Dashboard",
    category: "Kreatywne",
    useCase: "Dashboardy wydawnicze, biblioteki assets, statusy produkcji i kalendarze publikacji",
    description: "Profesjonalny system medialny z grafitowym tekstem, żywym błękitem i mocnym kolorem publikacji.",
    primaryAction: "Dodaj asset",
    secondaryAction: "Zobacz kalendarz",
    tags: ["media", "assets", "calendar"],
    colors: {
      background: "#f7f8fb",
      surface: "#ffffff",
      surfaceRaised: "#e9edf4",
      text: "#1d2330",
      textMuted: "#606b7b",
      border: "#d5dce8",
      primary: "#2458d3",
      primaryHover: "#1d45a6",
      primaryContrast: "#ffffff",
      secondary: "#d4482f",
      accent: "#b02579",
      success: "#278353",
      warning: "#bd6b00",
      danger: "#c73545",
      focus: "#2458d3",
      shadowRgb: "36 88 211"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Manrope', 'Inter', sans-serif",
      mono: "'DM Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "50",
    file: "tokens-50.css",
    name: "Product Catalog",
    category: "Handel",
    useCase: "Katalogi produktów, listy wariantów, porównywarki i kolekcje cyfrowe",
    description: "Katalogowy commerce z neutralnym tłem, spokojną typografią i czytelnymi stanami wyboru wariantu.",
    primaryAction: "Dodaj produkt",
    secondaryAction: "Porównaj warianty",
    tags: ["catalog", "products", "variants"],
    colors: {
      background: "#f7f6f3",
      surface: "#ffffff",
      surfaceRaised: "#ede9e1",
      text: "#24211c",
      textMuted: "#696157",
      border: "#d8d0c4",
      primary: "#8f4b24",
      primaryHover: "#713a1c",
      primaryContrast: "#ffffff",
      secondary: "#2f6f73",
      accent: "#5569a8",
      success: "#2d7d46",
      warning: "#a86518",
      danger: "#b83b3b",
      focus: "#2f6f73",
      shadowRgb: "143 75 36"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Libre Franklin', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.375rem", "0.625rem", "0.875rem"]
  },
  {
    id: "51",
    file: "tokens-51.css",
    name: "Exam Assessment",
    category: "Edukacja",
    useCase: "Egzaminy online, testy kompetencji, wyniki oceniania i przeglądy odpowiedzi",
    description: "Formalny system oceniania z fioletowym priorytetem, precyzyjnymi stanami wyniku i spokojną bazą do tabel.",
    primaryAction: "Rozpocznij test",
    secondaryAction: "Zobacz wyniki",
    tags: ["exam", "assessment", "grading"],
    colors: {
      background: "#f7f7fb",
      surface: "#ffffff",
      surfaceRaised: "#eceaf4",
      text: "#202033",
      textMuted: "#626176",
      border: "#d8d4e4",
      primary: "#5b4bb2",
      primaryHover: "#46398c",
      primaryContrast: "#ffffff",
      secondary: "#256a78",
      accent: "#b35f00",
      success: "#23704b",
      warning: "#a86518",
      danger: "#b4233a",
      focus: "#5b4bb2",
      shadowRgb: "91 75 178"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Sora', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "52",
    file: "tokens-52.css",
    name: "Access Control",
    category: "Bezpieczeństwo",
    useCase: "Role użytkowników, uprawnienia, audyt logowań i panele kontroli dostępu",
    description: "Security system dla uprawnień z formalnym granatem, czytelną strukturą ról i jasnym stanem ryzyka.",
    primaryAction: "Nadaj dostęp",
    secondaryAction: "Audyt logowań",
    tags: ["access", "roles", "audit"],
    colors: {
      background: "#f4f6f8",
      surface: "#ffffff",
      surfaceRaised: "#e8edf2",
      text: "#17202a",
      textMuted: "#5f6b76",
      border: "#d0d8e1",
      primary: "#253b5b",
      primaryHover: "#1a2b43",
      primaryContrast: "#ffffff",
      secondary: "#0e8a6d",
      accent: "#c35a2d",
      success: "#23704b",
      warning: "#956111",
      danger: "#b73545",
      focus: "#253b5b",
      shadowRgb: "37 59 91"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Space Grotesk', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "53",
    file: "tokens-53.css",
    name: "Research Lab",
    category: "Analityka",
    useCase: "Notebooki badawcze, porównania danych, eksperymenty i raporty ad hoc",
    description: "Badawczy system analityczny z czystym płótnem, fioletowym akcentem i precyzyjną typografią techniczną.",
    primaryAction: "Dodaj eksperyment",
    secondaryAction: "Eksportuj dane",
    tags: ["research", "experiments", "notebooks"],
    colors: {
      background: "#f7f6fb",
      surface: "#ffffff",
      surfaceRaised: "#eeebf7",
      text: "#202034",
      textMuted: "#66627a",
      border: "#dcd6ea",
      primary: "#6549b8",
      primaryHover: "#503a93",
      primaryContrast: "#ffffff",
      secondary: "#237aa0",
      accent: "#0f9f6e",
      success: "#168052",
      warning: "#a86518",
      danger: "#ba3434",
      focus: "#6549b8",
      shadowRgb: "101 73 184"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.375rem", "0.625rem", "0.875rem"]
  },
  {
    id: "54",
    file: "tokens-54.css",
    name: "Impact Report",
    category: "Zrównoważony rozwój",
    useCase: "Raporty wpływu, strony ESG, podsumowania projektów i dane środowiskowe",
    description: "Formalny system raportowania ESG z neutralnym papierem, grafitowym CTA, zielonym statusem wpływu i złotym akcentem danych.",
    primaryAction: "Pobierz raport",
    secondaryAction: "Zobacz dane",
    tags: ["impact", "esg", "report"],
    colors: {
      background: "#f8f7f4",
      surface: "#ffffff",
      surfaceRaised: "#eeebe4",
      text: "#24221f",
      textMuted: "#69645e",
      border: "#dad3c8",
      primary: "#40505c",
      primaryHover: "#303c45",
      primaryContrast: "#ffffff",
      secondary: "#2f7a68",
      accent: "#b5832f",
      success: "#287a52",
      warning: "#a86518",
      danger: "#a63d40",
      focus: "#40505c",
      shadowRgb: "64 80 92"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Merriweather Sans', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.625rem", "0.875rem"]
  },
  {
    id: "55",
    file: "tokens-55.css",
    name: "Boardroom Suite",
    category: "Enterprise",
    useCase: "Raporty zarządcze, prezentacje wyników, notatki strategiczne i widoki decyzyjne",
    description: "Ciemny executive suite dla zarządu z atramentową bazą, złotym CTA i prezentacyjnym rytmem decyzji.",
    primaryAction: "Otwórz brief",
    secondaryAction: "Wyślij notatkę",
    tags: ["boardroom", "strategy", "brief"],
    colors: {
      background: "#101418",
      surface: "#171d24",
      surfaceRaised: "#242b34",
      text: "#f3f1ea",
      textMuted: "#b8b2a6",
      border: "#373f4a",
      primary: "#d0a85f",
      primaryHover: "#b98d42",
      primaryContrast: "#17110a",
      secondary: "#8aa0b6",
      accent: "#5fa086",
      success: "#58a778",
      warning: "#d0a85f",
      danger: "#c96060",
      focus: "#d0a85f",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Libre Franklin', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "56",
    file: "tokens-56.css",
    name: "Agent Operations",
    category: "AI",
    useCase: "Monitoring agentów AI, kolejki zadań, statusy automatyzacji i logi wykonania",
    description: "Operacyjny system AI z ciemnym panelem, błękitnym feedbackiem i jasnym statusem automatyzacji.",
    primaryAction: "Uruchom agenta",
    secondaryAction: "Zobacz kolejkę",
    tags: ["agents", "ops", "queue"],
    colors: {
      background: "#0f1320",
      surface: "#161c2b",
      surfaceRaised: "#222a3c",
      text: "#edf2ff",
      textMuted: "#a9b3c8",
      border: "#354056",
      primary: "#6aa6ff",
      primaryHover: "#4f8ce8",
      primaryContrast: "#07111f",
      secondary: "#2dd4bf",
      accent: "#c084fc",
      success: "#34d399",
      warning: "#fbbf24",
      danger: "#fb7185",
      focus: "#6aa6ff",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Manrope', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.25rem", "0.375rem", "0.625rem", "0.875rem"]
  },
  {
    id: "57",
    file: "tokens-57.css",
    name: "Listing Premium",
    category: "Nieruchomości",
    useCase: "Prezentacje apartamentów premium, strony inwestycji i galerie ofert",
    description: "Premium listing z ciepłymi neutralami, elegancką typografią i spokojnym kolorem rezerwacji.",
    primaryAction: "Zapytaj o ofertę",
    secondaryAction: "Zobacz galerię",
    tags: ["premium", "gallery", "listing"],
    colors: {
      background: "#f7f3ec",
      surface: "#ffffff",
      surfaceRaised: "#ede4d6",
      text: "#28231d",
      textMuted: "#71675b",
      border: "#ded2c1",
      primary: "#7a5c35",
      primaryHover: "#60482a",
      primaryContrast: "#ffffff",
      secondary: "#356859",
      accent: "#456f93",
      success: "#2f7a48",
      warning: "#9a6419",
      danger: "#b24646",
      focus: "#356859",
      shadowRgb: "122 92 53"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Libre Baskerville', Georgia, serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "58",
    file: "tokens-58.css",
    name: "Streamer Studio",
    category: "Gry",
    useCase: "Panele streamera, overlaye eventów, donacje live i profile społeczności graczy",
    description: "Streamingowy system gamingowy z ciemną sceną, różowym CTA i cyjanowym akcentem live.",
    primaryAction: "Start live",
    secondaryAction: "Ustaw overlay",
    tags: ["streaming", "live", "overlay"],
    colors: {
      background: "#130f1f",
      surface: "#1d1730",
      surfaceRaised: "#2a2240",
      text: "#f5f1ff",
      textMuted: "#b9afcf",
      border: "#403557",
      primary: "#f43f8c",
      primaryHover: "#d62f75",
      primaryContrast: "#190710",
      secondary: "#22d3ee",
      accent: "#a78bfa",
      success: "#48c774",
      warning: "#f9c74f",
      danger: "#ff5f6d",
      focus: "#22d3ee",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Rajdhani', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.25rem", "0.375rem", "0.625rem", "0.875rem"]
  },
  {
    id: "59",
    file: "tokens-59.css",
    name: "Public Program",
    category: "Społeczne",
    useCase: "Programy miejskie, inicjatywy lokalne, zgłoszenia mieszkańców i tablice informacji",
    description: "Administracyjny system programów miejskich z chłodną bazą, granatową strukturą i jednoznacznymi statusami spraw.",
    primaryAction: "Zgłoś udział",
    secondaryAction: "Zobacz zasady",
    tags: ["civic", "program", "local"],
    colors: {
      background: "#f4f6f8",
      surface: "#ffffff",
      surfaceRaised: "#e6ebf0",
      text: "#18212c",
      textMuted: "#5b6672",
      border: "#cfd7e0",
      primary: "#263f63",
      primaryHover: "#1c2f4a",
      primaryContrast: "#ffffff",
      secondary: "#5f6f82",
      accent: "#9a6a2e",
      success: "#24704b",
      warning: "#956111",
      danger: "#a63d40",
      focus: "#263f63",
      shadowRgb: "38 63 99"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Merriweather Sans', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0", "0.125rem", "0.25rem", "0.5rem"]
  },
  {
    id: "60",
    file: "tokens-60.css",
    name: "Operations Board",
    category: "Produktywność",
    useCase: "Tablice operacyjne, sprint planning, zadania zespołów i statusy priorytetów",
    description: "Ciemny system operacyjny do pracy zespołowej z mocnym cyjanem, zielonym statusem i czytelnymi alertami sprintu.",
    primaryAction: "Dodaj priorytet",
    secondaryAction: "Zobacz sprint",
    tags: ["operations", "sprint", "priorities"],
    colors: {
      background: "#0f141b",
      surface: "#171e28",
      surfaceRaised: "#232c39",
      text: "#eef4fb",
      textMuted: "#aab5c3",
      border: "#344253",
      primary: "#38bdf8",
      primaryHover: "#0ea5e9",
      primaryContrast: "#06111c",
      secondary: "#4ade80",
      accent: "#f2b84b",
      success: "#4ade80",
      warning: "#f2b84b",
      danger: "#fb7185",
      focus: "#38bdf8",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Space Grotesk', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  }
);

systems.push(
  {
    id: "61",
    file: "tokens-61.css",
    name: "Publisher Desk",
    category: "Treści",
    useCase: "CMS-y redakcyjne, harmonogramy publikacji i workflow akceptacji treści",
    description: "Ciemny system newsroom CMS z cyjanowym CTA publikacji, bursztynowym statusem kolejki i technicznym rytmem redakcji.",
    primaryAction: "Zaplanuj publikację",
    secondaryAction: "Otwórz workflow",
    tags: ["cms", "publishing", "workflow"],
    colors: {
      background: "#101318",
      surface: "#181d24",
      surfaceRaised: "#242b34",
      text: "#f2f5f7",
      textMuted: "#aeb8c1",
      border: "#374250",
      primary: "#38bdf8",
      primaryHover: "#0ea5e9",
      primaryContrast: "#06111c",
      secondary: "#a3b85a",
      accent: "#f2b84b",
      success: "#4ade80",
      warning: "#f2b84b",
      danger: "#fb7185",
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
    id: "62",
    file: "tokens-62.css",
    name: "Customer Success",
    category: "SaaS",
    useCase: "Panele success, health score, segmentacja klientów i alerty churn",
    description: "SaaS dla zespołów CS z zielonym health score, jasnym tłem kont i ciepłym akcentem ryzyka churn.",
    primaryAction: "Dodaj kontakt",
    secondaryAction: "Sprawdź health",
    tags: ["customer success", "health score", "accounts"],
    colors: {
      background: "#f5fbf7",
      surface: "#ffffff",
      surfaceRaised: "#e5f3ea",
      text: "#16251d",
      textMuted: "#5d6f64",
      border: "#cfe2d6",
      primary: "#2f7a48",
      primaryHover: "#245f38",
      primaryContrast: "#ffffff",
      secondary: "#2f6f93",
      accent: "#c06a2f",
      success: "#23845a",
      warning: "#a86518",
      danger: "#b23a48",
      focus: "#2f7a48",
      shadowRgb: "47 122 72"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Manrope', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "63",
    file: "tokens-63.css",
    name: "Museum Noir",
    category: "Marka",
    useCase: "Galerie sztuki, instytucje kultury, wystawy premium, showroomy i karty kolekcji",
    description: "Ciemny system instytucji kultury z chłodnym grafitem, szałwiowym CTA i oszczędnym akcentem kuratorskim.",
    primaryAction: "Zobacz wystawę",
    secondaryAction: "Otwórz kurację",
    tags: ["gallery", "museum", "culture"],
    colors: {
      background: "#101213",
      surface: "#181b1d",
      surfaceRaised: "#24292b",
      text: "#f2f3ef",
      textMuted: "#b1b8b2",
      border: "#373f40",
      primary: "#8fb3a4",
      primaryHover: "#759b8c",
      primaryContrast: "#0d1412",
      secondary: "#d0b47a",
      accent: "#9f6b5d",
      success: "#58a778",
      warning: "#d69d45",
      danger: "#c96060",
      focus: "#8fb3a4",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Avenir Next', 'Segoe UI', sans-serif",
      heading: "'Cormorant Garamond', Georgia, serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "64",
    file: "tokens-64.css",
    name: "Family Hub",
    category: "Konsumenckie",
    useCase: "Aplikacje rodzinne, listy zakupów, planowanie domu i współdzielone notatki",
    description: "Domowy system konsumencki z ciepłym tłem, spokojną zielenią i miękkim pomarańczowym akcentem.",
    primaryAction: "Dodaj wpis",
    secondaryAction: "Udostępnij listę",
    tags: ["family", "home", "shared"],
    colors: {
      background: "#fff9f2",
      surface: "#ffffff",
      surfaceRaised: "#f5ecdf",
      text: "#2a241e",
      textMuted: "#70665c",
      border: "#e1d3c2",
      primary: "#a9552f",
      primaryHover: "#874325",
      primaryContrast: "#ffffff",
      secondary: "#4d8a62",
      accent: "#5f72c8",
      success: "#2f8f64",
      warning: "#b86d0e",
      danger: "#c84b62",
      focus: "#4d8a62",
      shadowRgb: "169 85 47"
    },
    fonts: {
      sans: "'Nunito Sans', 'Inter', 'Segoe UI', sans-serif",
      heading: "'Poppins', 'Nunito Sans', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.5rem", "0.875rem", "1.25rem", "1.625rem"]
  },
  {
    id: "65",
    file: "tokens-65.css",
    name: "Civic Accessibility",
    category: "Dostępność",
    useCase: "Serwisy miejskie, deklaracje online, mapy usług i formularze kontaktu",
    description: "Publiczny system dostępnościowy z wysoką czytelnością, oficjalnym niebieskim i stabilnymi stanami.",
    primaryAction: "Wyślij zgłoszenie",
    secondaryAction: "Zapisz roboczo",
    tags: ["civic", "wcag", "services"],
    colors: {
      background: "#ffffff",
      surface: "#ffffff",
      surfaceRaised: "#f1f4f7",
      text: "#0f1720",
      textMuted: "#303a45",
      border: "#1f2937",
      primary: "#0057b8",
      primaryHover: "#00428d",
      primaryContrast: "#ffffff",
      secondary: "#006b55",
      accent: "#7a2eb8",
      success: "#0f7a32",
      warning: "#8f4a00",
      danger: "#b00020",
      focus: "#0057b8",
      shadowRgb: "15 23 32"
    },
    fonts: {
      sans: "'Atkinson Hyperlegible', 'Inter', Arial, sans-serif",
      heading: "'Atkinson Hyperlegible', 'Segoe UI', Arial, sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0", "0.125rem", "0.25rem", "0.375rem"]
  },
  {
    id: "66",
    file: "tokens-66.css",
    name: "Wealth Advisory",
    category: "Finanse",
    useCase: "Doradztwo majątkowe, widoki klientów premium, strategie portfela i raporty rekomendacji",
    description: "Elegancki system finansowy z ciemną zielenią, ciepłym złotem i spokojnym rytmem raportowym.",
    primaryAction: "Otwórz strategię",
    secondaryAction: "Pobierz raport",
    tags: ["wealth", "advisory", "portfolio"],
    colors: {
      background: "#f5f3ec",
      surface: "#ffffff",
      surfaceRaised: "#e8e1d1",
      text: "#24231d",
      textMuted: "#6b665a",
      border: "#d7ccb6",
      primary: "#31543e",
      primaryHover: "#243f2e",
      primaryContrast: "#ffffff",
      secondary: "#9a752e",
      accent: "#315f82",
      success: "#137a4b",
      warning: "#956111",
      danger: "#aa3535",
      focus: "#315f82",
      shadowRgb: "49 84 62"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "67",
    file: "tokens-67.css",
    name: "Telemedicine Desk",
    category: "Zdrowie",
    useCase: "Teleporady, czaty medyczne, plany opieki i zdalna obsługa pacjentów",
    description: "Cyfrowy desk telemedyczny z lawendową bazą, indygowym CTA konsultacji i tealowym statusem opieki.",
    primaryAction: "Rozpocznij konsultację",
    secondaryAction: "Wyślij notatkę",
    tags: ["telemedicine", "chat", "care"],
    colors: {
      background: "#f7f6ff",
      surface: "#ffffff",
      surfaceRaised: "#ece9ff",
      text: "#211f33",
      textMuted: "#66617a",
      border: "#d8d2ee",
      primary: "#5361c9",
      primaryHover: "#404b9f",
      primaryContrast: "#ffffff",
      secondary: "#0f8f8a",
      accent: "#d16d4a",
      success: "#18835a",
      warning: "#a86518",
      danger: "#c83f54",
      focus: "#5361c9",
      shadowRgb: "83 97 201"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Source Sans 3', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.375rem", "0.625rem", "0.875rem", "1.125rem"]
  },
  {
    id: "68",
    file: "tokens-68.css",
    name: "SDK Launchpad",
    category: "Dla devów",
    useCase: "Portale SDK, biblioteki integracji, quickstarty, changelogi i przykłady implementacji",
    description: "Jasny portal SDK z kobaltowym CTA, zielonym sygnałem kompatybilności i ciepłym akcentem wersji release.",
    primaryAction: "Pobierz SDK",
    secondaryAction: "Zobacz changelog",
    tags: ["sdk", "quickstart", "libraries"],
    colors: {
      background: "#f7f9fc",
      surface: "#ffffff",
      surfaceRaised: "#e9eef8",
      text: "#182033",
      textMuted: "#626d80",
      border: "#d5ddea",
      primary: "#4058c8",
      primaryHover: "#31449d",
      primaryContrast: "#ffffff",
      secondary: "#12805c",
      accent: "#b36b2c",
      success: "#168052",
      warning: "#a86518",
      danger: "#ba3434",
      focus: "#4058c8",
      shadowRgb: "64 88 200"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Manrope', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.375rem", "0.625rem", "0.875rem", "1.125rem"]
  },
  {
    id: "69",
    file: "tokens-69.css",
    name: "Design Studio",
    category: "Kreatywne",
    useCase: "Narzędzia projektowe, boards kreatywne, moodboardy i biblioteki elementów",
    description: "Studyjny system kreatywny z jasnym płótnem, mocnym magenta i chłodnym kolorem narzędzi.",
    primaryAction: "Dodaj projekt",
    secondaryAction: "Otwórz board",
    tags: ["design", "moodboard", "assets"],
    colors: {
      background: "#fbf7fb",
      surface: "#ffffff",
      surfaceRaised: "#f0e7f0",
      text: "#2b2130",
      textMuted: "#706176",
      border: "#e0d2e3",
      primary: "#b83280",
      primaryHover: "#922866",
      primaryContrast: "#ffffff",
      secondary: "#246aa8",
      accent: "#df6b36",
      success: "#278353",
      warning: "#bd6b00",
      danger: "#c73545",
      focus: "#246aa8",
      shadowRgb: "184 50 128"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Manrope', 'Inter', sans-serif",
      mono: "'DM Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.875rem", "1.25rem"]
  },
  {
    id: "70",
    file: "tokens-70.css",
    name: "Subscription Store",
    category: "Handel",
    useCase: "Produkty subskrypcyjne, pricing tables, plany licencji i upgrade flows",
    description: "Commerce subskrypcyjny z czystą hierarchią planów, niebieskim CTA i spokojnym tłem porównania.",
    primaryAction: "Wybierz plan",
    secondaryAction: "Porównaj licencje",
    tags: ["subscription", "pricing", "plans"],
    colors: {
      background: "#f6f8fb",
      surface: "#ffffff",
      surfaceRaised: "#e9eef6",
      text: "#1c2430",
      textMuted: "#606c7a",
      border: "#d4dce8",
      primary: "#2f5f9f",
      primaryHover: "#244a7d",
      primaryContrast: "#ffffff",
      secondary: "#2d8478",
      accent: "#b35a2f",
      success: "#2d7d46",
      warning: "#a86518",
      danger: "#b83b3b",
      focus: "#2f5f9f",
      shadowRgb: "47 95 159"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Libre Franklin', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "71",
    file: "tokens-71.css",
    name: "Workshop Canvas",
    category: "Edukacja",
    useCase: "Warsztaty online, materiały szkoleniowe, checklisty, ćwiczenia i zadania zespołowe",
    description: "Praktyczny system warsztatowy z zielonym rytmem pracy, ciepłym akcentem aktywności i czytelnymi kartami zadań.",
    primaryAction: "Start warsztatu",
    secondaryAction: "Pobierz materiały",
    tags: ["workshop", "training", "practice"],
    colors: {
      background: "#f5faf4",
      surface: "#ffffff",
      surfaceRaised: "#e5f0df",
      text: "#1f2b22",
      textMuted: "#5f6f61",
      border: "#cdddc7",
      primary: "#357a3d",
      primaryHover: "#285f2f",
      primaryContrast: "#ffffff",
      secondary: "#2f6f93",
      accent: "#b7791f",
      success: "#23845a",
      warning: "#ad6800",
      danger: "#bf3f4d",
      focus: "#2f6f93",
      shadowRgb: "53 122 61"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Aptos Display', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.375rem", "0.625rem", "0.875rem", "1.25rem"]
  },
  {
    id: "72",
    file: "tokens-72.css",
    name: "Identity Shield",
    category: "Bezpieczeństwo",
    useCase: "Logowanie, MFA, zarządzanie sesjami i ochrona kont użytkowników",
    description: "System identity z chłodnym granatem, bezpiecznym tealem i precyzyjnymi stanami weryfikacji.",
    primaryAction: "Włącz MFA",
    secondaryAction: "Sprawdź sesje",
    tags: ["identity", "mfa", "sessions"],
    colors: {
      background: "#f4f7fa",
      surface: "#ffffff",
      surfaceRaised: "#e6edf3",
      text: "#162330",
      textMuted: "#5a6876",
      border: "#cfd9e3",
      primary: "#24486f",
      primaryHover: "#1a3654",
      primaryContrast: "#ffffff",
      secondary: "#0e8a83",
      accent: "#bf6b2d",
      success: "#23704b",
      warning: "#956111",
      danger: "#b73545",
      focus: "#0e8a83",
      shadowRgb: "36 72 111"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Space Grotesk', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.375rem", "0.625rem"]
  },
  {
    id: "73",
    file: "tokens-73.css",
    name: "Metrics Console",
    category: "Analityka",
    useCase: "Konsole metryk technicznych, telemetry, alerty danych i monitoring KPI",
    description: "Ciemna konsola analityczna z technicznym błękitem, zielonym stanem i bardzo kompaktowym rytmem.",
    primaryAction: "Dodaj metrykę",
    secondaryAction: "Otwórz alerty",
    tags: ["metrics", "telemetry", "alerts"],
    colors: {
      background: "#0d131b",
      surface: "#141c27",
      surfaceRaised: "#202a38",
      text: "#edf3fb",
      textMuted: "#a6b2c0",
      border: "#344154",
      primary: "#4da3ff",
      primaryHover: "#2f88e6",
      primaryContrast: "#06111d",
      secondary: "#34d399",
      accent: "#f5a524",
      success: "#34d399",
      warning: "#f5a524",
      danger: "#fb7185",
      focus: "#4da3ff",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.375rem", "0.625rem"]
  },
  {
    id: "74",
    file: "tokens-74.css",
    name: "Carbon Ledger",
    category: "Zrównoważony rozwój",
    useCase: "Ślad węglowy, księgi emisji, dashboardy kompensacji i raporty zgodności",
    description: "System carbon accounting z profesjonalną zielenią, stalowym niebieskim i tabelarycznym rytmem danych.",
    primaryAction: "Dodaj emisję",
    secondaryAction: "Eksportuj ledger",
    tags: ["carbon", "ledger", "compliance"],
    colors: {
      background: "#f4f7f4",
      surface: "#ffffff",
      surfaceRaised: "#e5eee6",
      text: "#1e2b22",
      textMuted: "#5e6f63",
      border: "#cfddcf",
      primary: "#2f7451",
      primaryHover: "#255b40",
      primaryContrast: "#ffffff",
      secondary: "#2c6f8f",
      accent: "#a87322",
      success: "#2f7a48",
      warning: "#a86518",
      danger: "#b34545",
      focus: "#2c6f8f",
      shadowRgb: "47 116 81"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Aptos Display', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "75",
    file: "tokens-75.css",
    name: "Procurement Portal",
    category: "Enterprise",
    useCase: "Zakupy firmowe, akceptacje vendorów, budżety działów i zamówienia wewnętrzne",
    description: "Portal zakupowy enterprise z budżetowym złotem, stalowym kontrastem i wyraźnym rytmem akceptacji vendorów.",
    primaryAction: "Utwórz zamówienie",
    secondaryAction: "Sprawdź budżet",
    tags: ["procurement", "vendors", "budget"],
    colors: {
      background: "#f7f4ed",
      surface: "#ffffff",
      surfaceRaised: "#eee5d4",
      text: "#29251d",
      textMuted: "#71695c",
      border: "#ded2bc",
      primary: "#735a25",
      primaryHover: "#5a461c",
      primaryContrast: "#ffffff",
      secondary: "#315f73",
      accent: "#8a4f5f",
      success: "#23704b",
      warning: "#956111",
      danger: "#a63d40",
      focus: "#315f73",
      shadowRgb: "115 90 37"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Libre Franklin', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.625rem", "0.875rem"]
  },
  {
    id: "76",
    file: "tokens-76.css",
    name: "Model Registry",
    category: "AI",
    useCase: "Rejestry modeli, ewaluacje, wersjonowanie promptów i porównania wyników AI",
    description: "Techniczny system AI registry z jasnym tłem, fioletowym stanem modelu i czytelnymi metrykami.",
    primaryAction: "Dodaj model",
    secondaryAction: "Porównaj wyniki",
    tags: ["models", "evaluation", "registry"],
    colors: {
      background: "#f7f7fb",
      surface: "#ffffff",
      surfaceRaised: "#ececf6",
      text: "#1d1d2c",
      textMuted: "#626277",
      border: "#d8d8e8",
      primary: "#5d5bd6",
      primaryHover: "#4947aa",
      primaryContrast: "#ffffff",
      secondary: "#0f8f8a",
      accent: "#a65fb8",
      success: "#18835a",
      warning: "#b06a00",
      danger: "#c83f54",
      focus: "#5d5bd6",
      shadowRgb: "93 91 214"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Manrope', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "77",
    file: "tokens-77.css",
    name: "Rental Manager",
    category: "Nieruchomości",
    useCase: "Najem długoterminowy, obsługa lokatorów, płatności czynszu i zgłoszenia serwisowe",
    description: "Operacyjny system najmu z chłodną bazą, tealowym statusem obsługi i czytelnymi alertami płatności.",
    primaryAction: "Dodaj najemcę",
    secondaryAction: "Zgłoszenia",
    tags: ["rental", "tenants", "maintenance"],
    colors: {
      background: "#f5f9f9",
      surface: "#ffffff",
      surfaceRaised: "#e4f0ef",
      text: "#162a2b",
      textMuted: "#5b6f70",
      border: "#cfe0df",
      primary: "#0f766e",
      primaryHover: "#0a5d57",
      primaryContrast: "#ffffff",
      secondary: "#3d6f9f",
      accent: "#b56b2f",
      success: "#23845a",
      warning: "#a86518",
      danger: "#b23a48",
      focus: "#0f766e",
      shadowRgb: "15 118 110"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Manrope', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "78",
    file: "tokens-78.css",
    name: "Game Storefront",
    category: "Gry",
    useCase: "Sklepy z grami, DLC, promocje sezonowe i strony premier",
    description: "Gamingowy storefront z ciemnym tłem, neonowym zielonym CTA i wyraźną hierarchią ofert.",
    primaryAction: "Kup teraz",
    secondaryAction: "Dodaj do wishlist",
    tags: ["storefront", "dlc", "release"],
    colors: {
      background: "#101316",
      surface: "#181d23",
      surfaceRaised: "#252c34",
      text: "#f0f4f5",
      textMuted: "#adb8bd",
      border: "#3a444c",
      primary: "#7bdc5f",
      primaryHover: "#63bf49",
      primaryContrast: "#081107",
      secondary: "#46c7e8",
      accent: "#f45b8f",
      success: "#7bdc5f",
      warning: "#f9c74f",
      danger: "#ff5f6d",
      focus: "#46c7e8",
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
    id: "79",
    file: "tokens-79.css",
    name: "Volunteer Network",
    category: "Społeczne",
    useCase: "Koordynacja wolontariuszy, grafiki dyżurów, wydarzenia lokalne i listy zadań",
    description: "Energiczny system koordynacji wolontariuszy z tealem akcji, koralowym sygnałem wydarzeń i miękkim rytmem list.",
    primaryAction: "Dołącz do akcji",
    secondaryAction: "Zobacz dyżury",
    tags: ["volunteer", "events", "coordination"],
    colors: {
      background: "#f5fbfa",
      surface: "#ffffff",
      surfaceRaised: "#e2f2ef",
      text: "#18302d",
      textMuted: "#58706b",
      border: "#c9dfdc",
      primary: "#16827a",
      primaryHover: "#10635d",
      primaryContrast: "#ffffff",
      secondary: "#d45d3f",
      accent: "#4867d6",
      success: "#2f8f64",
      warning: "#b86d0e",
      danger: "#c83f66",
      focus: "#4867d6",
      shadowRgb: "22 130 122"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Nunito Sans', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.5rem", "0.875rem", "1.125rem", "1.5rem"]
  },
  {
    id: "80",
    file: "tokens-80.css",
    name: "Team Workflow",
    category: "Produktywność",
    useCase: "Workflow zespołów, kanbany operacyjne, handoffy i automatyzacje procesów",
    description: "Zespołowy system handoffów z tealowym kolorem współpracy, miękkim tłem i wyraźnym stanem przekazania.",
    primaryAction: "Dodaj workflow",
    secondaryAction: "Zobacz handoff",
    tags: ["workflow", "teams", "handoff"],
    colors: {
      background: "#f5fbfa",
      surface: "#ffffff",
      surfaceRaised: "#e2f1ef",
      text: "#1a302d",
      textMuted: "#5b706d",
      border: "#c9dfdc",
      primary: "#167a72",
      primaryHover: "#105d57",
      primaryContrast: "#ffffff",
      secondary: "#4867d6",
      accent: "#b46a2c",
      success: "#287a52",
      warning: "#a86518",
      danger: "#b43d4a",
      focus: "#4867d6",
      shadowRgb: "22 122 114"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Manrope', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  }
);

systems.push(
  {
    id: "81",
    file: "tokens-81.css",
    name: "Content Ops",
    category: "Treści",
    useCase: "Kalendarze redakcyjne, kolejki publikacji i operacje contentowe",
    description: "Formalny system operacji treści z grafitowym CTA, zielonym statusem publikacji i miedzianym akcentem przeglądu.",
    primaryAction: "Zaplanuj tekst",
    secondaryAction: "Otwórz kolejkę",
    tags: ["content ops", "publikacje", "workflow"],
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
      secondary: "#0e8a6d",
      accent: "#b06a2c",
      success: "#23704b",
      warning: "#956111",
      danger: "#a63d40",
      focus: "#23395b",
      shadowRgb: "35 57 91"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "82",
    file: "tokens-82.css",
    name: "Retention Suite",
    category: "SaaS",
    useCase: "Narzędzia retencji, automatyzacje lifecycle i segmenty użytkowników",
    description: "Ciemny system lifecycle SaaS z fioletowym CTA, cyjanowym sygnałem segmentu i mocnym akcentem automatyzacji.",
    primaryAction: "Utwórz segment",
    secondaryAction: "Zobacz kohorty",
    tags: ["retention", "lifecycle", "growth"],
    colors: {
      background: "#11131f",
      surface: "#191c2b",
      surfaceRaised: "#25293b",
      text: "#f2f5ff",
      textMuted: "#adb4c9",
      border: "#3a4057",
      primary: "#8b5cf6",
      primaryHover: "#7048d8",
      primaryContrast: "#0f071c",
      secondary: "#22c7d8",
      accent: "#f2a23a",
      success: "#4ade80",
      warning: "#f2a23a",
      danger: "#fb7185",
      focus: "#22c7d8",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Space Grotesk', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "83",
    file: "tokens-83.css",
    name: "Atelier Signature",
    category: "Marka",
    useCase: "Premiery kolekcji, atelier projektowe, marki autorskie i ekskluzywne zapisy klientów",
    description: "Autorski system atelier z papierową bazą, śliwkowym priorytetem i miedzianym akcentem podpisu marki.",
    primaryAction: "Zarezerwuj dostęp",
    secondaryAction: "Zobacz atelier",
    tags: ["atelier", "signature", "premium"],
    colors: {
      background: "#faf7f4",
      surface: "#ffffff",
      surfaceRaised: "#f1e8df",
      text: "#2a211d",
      textMuted: "#70645d",
      border: "#dfd2c7",
      primary: "#7a3f6f",
      primaryHover: "#603156",
      primaryContrast: "#ffffff",
      secondary: "#315f5d",
      accent: "#c26632",
      success: "#4f7f58",
      warning: "#a66a22",
      danger: "#a94545",
      focus: "#7a3f6f",
      shadowRgb: "122 63 111"
    },
    fonts: {
      sans: "'Inter', 'Avenir Next', 'Segoe UI', sans-serif",
      heading: "'Cormorant Garamond', Georgia, serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "84",
    file: "tokens-84.css",
    name: "Daily Companion",
    category: "Konsumenckie",
    useCase: "Aplikacje osobiste, rutyny dnia, przypomnienia i lekkie widoki profilu",
    description: "Przyjazny system konsumencki z jasnym błękitem, miękką zielenią i ciepłym akcentem dla codziennych mikrointerakcji.",
    primaryAction: "Dodaj rutynę",
    secondaryAction: "Zobacz dzień",
    tags: ["daily", "personal", "routine"],
    colors: {
      background: "#f6fbff",
      surface: "#ffffff",
      surfaceRaised: "#e8f4fb",
      text: "#20303d",
      textMuted: "#62717d",
      border: "#d1e2eb",
      primary: "#326f90",
      primaryHover: "#285873",
      primaryContrast: "#ffffff",
      secondary: "#58a06b",
      accent: "#d78245",
      success: "#2f8f64",
      warning: "#b86d0e",
      danger: "#c84b62",
      focus: "#3c82a6",
      shadowRgb: "50 111 144"
    },
    fonts: {
      sans: "'Nunito Sans', 'Inter', 'Segoe UI', sans-serif",
      heading: "'Poppins', 'Nunito Sans', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.5rem", "0.875rem", "1.125rem", "1.5rem"]
  },
  {
    id: "85",
    file: "tokens-85.css",
    name: "Service Kiosk",
    category: "Dostępność",
    useCase: "Kioski samoobsługowe, punkty obsługi i proste ścieżki zgłoszeń publicznych",
    description: "Wysokokontrastowy system dla samoobsługi z dużą czytelnością, mocnym fokusem i bardzo stabilnymi kontrolkami.",
    primaryAction: "Rozpocznij sprawę",
    secondaryAction: "Pomoc",
    tags: ["kiosk", "publiczne", "a11y"],
    colors: {
      background: "#ffffff",
      surface: "#ffffff",
      surfaceRaised: "#f0f3f6",
      text: "#101418",
      textMuted: "#2f3a45",
      border: "#17212b",
      primary: "#005ea8",
      primaryHover: "#004b86",
      primaryContrast: "#ffffff",
      secondary: "#00765f",
      accent: "#8b2bb2",
      success: "#0f7a32",
      warning: "#8f4a00",
      danger: "#b00020",
      focus: "#ffbf47",
      shadowRgb: "16 20 24"
    },
    fonts: {
      sans: "'Atkinson Hyperlegible', 'Inter', Arial, sans-serif",
      heading: "'Atkinson Hyperlegible', 'Segoe UI', Arial, sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0", "0.125rem", "0.25rem", "0.5rem"]
  },
  {
    id: "86",
    file: "tokens-86.css",
    name: "Treasury Console",
    category: "Finanse",
    useCase: "Zarządzanie płynnością, cashflow, limity i widoki skarbowe firm",
    description: "Finansowy system konsolowy z precyzyjną typografią, chłodną zielenią i stabilnymi statusami decyzji.",
    primaryAction: "Aktualizuj prognozę",
    secondaryAction: "Eksportuj raport",
    tags: ["treasury", "cashflow", "limits"],
    colors: {
      background: "#f4f7f6",
      surface: "#ffffff",
      surfaceRaised: "#e5eeeb",
      text: "#13241f",
      textMuted: "#586a65",
      border: "#cbdad5",
      primary: "#0f6b5d",
      primaryHover: "#0a5146",
      primaryContrast: "#ffffff",
      secondary: "#295f91",
      accent: "#9b7422",
      success: "#137a4b",
      warning: "#a06400",
      danger: "#ba3434",
      focus: "#295f91",
      shadowRgb: "15 107 93"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "87",
    file: "tokens-87.css",
    name: "Care Triage",
    category: "Zdrowie",
    useCase: "Triage pacjentów, kolejki zgłoszeń, priorytety opieki i eskalacje",
    description: "Ciemny system triage dla szybkiej kwalifikacji z pomarańczowym CTA, cyjanową telemetrią i czytelnymi alertami eskalacji.",
    primaryAction: "Nadaj priorytet",
    secondaryAction: "Otwórz kartę",
    tags: ["triage", "care", "priority"],
    colors: {
      background: "#101417",
      surface: "#181f23",
      surfaceRaised: "#243037",
      text: "#eef6f5",
      textMuted: "#aab9b7",
      border: "#34484b",
      primary: "#f97316",
      primaryHover: "#d85f0e",
      primaryContrast: "#180703",
      secondary: "#38bdf8",
      accent: "#fb7185",
      success: "#4ade80",
      warning: "#f59e0b",
      danger: "#fb7185",
      focus: "#f97316",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Space Grotesk', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "88",
    file: "tokens-88.css",
    name: "Release Pipeline",
    category: "Dla devów",
    useCase: "Kolejki CI/CD, artefakty wydań, promocje środowisk i statusy release trains",
    description: "Precyzyjny system pipeline z ciemną bazą, indygo jako sygnałem wykonania i zielonym statusem udanego release.",
    primaryAction: "Promuj release",
    secondaryAction: "Zobacz artefakty",
    tags: ["ci", "pipeline", "release"],
    colors: {
      background: "#10121c",
      surface: "#181b29",
      surfaceRaised: "#24283a",
      text: "#f1f3ff",
      textMuted: "#abb2c8",
      border: "#373d52",
      primary: "#8b9cff",
      primaryHover: "#6f7fe0",
      primaryContrast: "#080b17",
      secondary: "#34d399",
      accent: "#f2b84b",
      success: "#34d399",
      warning: "#f2b84b",
      danger: "#fb7185",
      focus: "#8b9cff",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Space Grotesk', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "89",
    file: "tokens-89.css",
    name: "Creative Brief",
    category: "Kreatywne",
    useCase: "Briefy kreatywne, akceptacje koncepcji i biblioteki kierunków wizualnych",
    description: "System briefów kreatywnych z chłodnym kobaltem, akcentem decyzji i bardziej redakcyjną strukturą akceptacji.",
    primaryAction: "Dodaj brief",
    secondaryAction: "Porównaj kierunki",
    tags: ["brief", "concept", "approval"],
    colors: {
      background: "#f6f8fc",
      surface: "#ffffff",
      surfaceRaised: "#e8eef8",
      text: "#20283a",
      textMuted: "#626d80",
      border: "#d4deec",
      primary: "#4058a8",
      primaryHover: "#314486",
      primaryContrast: "#ffffff",
      secondary: "#b65b72",
      accent: "#d27739",
      success: "#278353",
      warning: "#bd6b00",
      danger: "#c73545",
      focus: "#4058a8",
      shadowRgb: "64 88 168"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Sora', 'Inter', sans-serif",
      mono: "'DM Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "90",
    file: "tokens-90.css",
    name: "Vendor Marketplace",
    category: "Handel",
    useCase: "Marketplace B2B, profile sprzedawców, zapytania ofertowe i koszyki hurtowe",
    description: "Handlowy system B2B z wiarygodną neutralną bazą, mocnym CTA i akcentami dla porównywania ofert.",
    primaryAction: "Wyślij RFQ",
    secondaryAction: "Porównaj vendorów",
    tags: ["b2b", "vendors", "rfq"],
    colors: {
      background: "#f7f6f2",
      surface: "#ffffff",
      surfaceRaised: "#ede9df",
      text: "#26221d",
      textMuted: "#6d6358",
      border: "#ded5c8",
      primary: "#9f4f1f",
      primaryHover: "#7e3d17",
      primaryContrast: "#ffffff",
      secondary: "#2e7472",
      accent: "#5f58a6",
      success: "#2d7d46",
      warning: "#a86518",
      danger: "#b83b3b",
      focus: "#2e7472",
      shadowRgb: "38 34 29"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Libre Franklin', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "91",
    file: "tokens-91.css",
    name: "Live Cohort Room",
    category: "Edukacja",
    useCase: "Programy cohort-based, sesje live, mentoring, breakout rooms i postępy grupy",
    description: "Ciemny system live learning z błękitnym CTA, zielonym rytmem obecności i bursztynowym akcentem sesji.",
    primaryAction: "Dołącz do sesji",
    secondaryAction: "Zobacz zadania",
    tags: ["cohort", "live", "mentoring"],
    colors: {
      background: "#10141f",
      surface: "#171d2a",
      surfaceRaised: "#242c3d",
      text: "#f1f5ff",
      textMuted: "#aeb8cc",
      border: "#39465c",
      primary: "#7cc4ff",
      primaryHover: "#5aaae8",
      primaryContrast: "#06111d",
      secondary: "#50d18d",
      accent: "#f2b84b",
      success: "#50d18d",
      warning: "#f2b84b",
      danger: "#fb7185",
      focus: "#7cc4ff",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Space Grotesk', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "92",
    file: "tokens-92.css",
    name: "Risk Command",
    category: "Bezpieczeństwo",
    useCase: "Centra ryzyka, priorytety podatności, score zasobów i remediacje",
    description: "Bezpieczny system command center z ciemną powierzchnią, ostrymi stanami ryzyka i czytelnym sygnałem remediacji.",
    primaryAction: "Utwórz remediację",
    secondaryAction: "Otwórz ryzyka",
    tags: ["risk", "vulnerability", "remediation"],
    colors: {
      background: "#0b1118",
      surface: "#111923",
      surfaceRaised: "#1c2632",
      text: "#ecf2f8",
      textMuted: "#a1adba",
      border: "#314154",
      primary: "#2dd46f",
      primaryHover: "#21ae59",
      primaryContrast: "#06130b",
      secondary: "#44b7f0",
      accent: "#f97316",
      success: "#2dd46f",
      warning: "#f59e0b",
      danger: "#f43f5e",
      focus: "#44b7f0",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Space Grotesk', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.375rem", "0.5rem"]
  },
  {
    id: "93",
    file: "tokens-93.css",
    name: "Forecast Studio",
    category: "Analityka",
    useCase: "Prognozy biznesowe, scenariusze, modele trendów i widoki wariantów",
    description: "Analityczny system prognostyczny z chłodną bazą, precyzyjnym niebieskim i akcentem dla scenariuszy.",
    primaryAction: "Dodaj scenariusz",
    secondaryAction: "Porównaj trend",
    tags: ["forecast", "scenarios", "models"],
    colors: {
      background: "#f4f7fa",
      surface: "#ffffff",
      surfaceRaised: "#e6edf4",
      text: "#172330",
      textMuted: "#5d6b7a",
      border: "#d0dbe6",
      primary: "#286aa0",
      primaryHover: "#20537d",
      primaryContrast: "#ffffff",
      secondary: "#7952c7",
      accent: "#0f9f7d",
      success: "#168052",
      warning: "#a86518",
      danger: "#ba3434",
      focus: "#286aa0",
      shadowRgb: "40 106 160"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "94",
    file: "tokens-94.css",
    name: "Circular Supply",
    category: "Zrównoważony rozwój",
    useCase: "Łańcuchy dostaw circular economy, odzysk materiałów i raporty zasobów",
    description: "System circular supply z przemysłową oliwką, stalowym niebieskim i bardziej tabelarycznym rytmem zasobów.",
    primaryAction: "Dodaj zasób",
    secondaryAction: "Zobacz obieg",
    tags: ["circular", "supply", "materials"],
    colors: {
      background: "#f6f7f2",
      surface: "#ffffff",
      surfaceRaised: "#e8ebdc",
      text: "#24291e",
      textMuted: "#666d5d",
      border: "#d5dbc8",
      primary: "#657742",
      primaryHover: "#4f5e33",
      primaryContrast: "#ffffff",
      secondary: "#2e6f8e",
      accent: "#9c6b2e",
      success: "#2f7a48",
      warning: "#a86518",
      danger: "#b34545",
      focus: "#2e6f8e",
      shadowRgb: "101 119 66"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "95",
    file: "tokens-95.css",
    name: "Governance Hub",
    category: "Enterprise",
    useCase: "Zarządzanie politykami, komitety decyzyjne, rejestry ryzyk i akceptacje",
    description: "System governance z chłodnym tealem, formalnymi powierzchniami i mocnym rozdziałem polityk, ryzyk oraz decyzji.",
    primaryAction: "Dodaj politykę",
    secondaryAction: "Otwórz rejestr",
    tags: ["governance", "policy", "risk"],
    colors: {
      background: "#f4f7f6",
      surface: "#ffffff",
      surfaceRaised: "#e4eeec",
      text: "#1b2a29",
      textMuted: "#5f706d",
      border: "#cbdad7",
      primary: "#315f5d",
      primaryHover: "#244947",
      primaryContrast: "#ffffff",
      secondary: "#6c5a2d",
      accent: "#7a4b8f",
      success: "#23704b",
      warning: "#956111",
      danger: "#a63d40",
      focus: "#315f5d",
      shadowRgb: "49 95 93"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.25rem", "0.375rem", "0.625rem", "0.875rem"]
  },
  {
    id: "96",
    file: "tokens-96.css",
    name: "Inference Console",
    category: "AI",
    useCase: "Monitoring inferencji, koszty modeli, kolejki requestów i jakość odpowiedzi",
    description: "Ciemny runtime console dla inferencji z neonowym indygo, tealowym stanem jakości i kompaktowym rytmem metryk.",
    primaryAction: "Sprawdź request",
    secondaryAction: "Porównaj model",
    tags: ["inference", "latency", "quality"],
    colors: {
      background: "#10131d",
      surface: "#171b29",
      surfaceRaised: "#23283a",
      text: "#f0f3ff",
      textMuted: "#aab2c8",
      border: "#343b52",
      primary: "#7c8cff",
      primaryHover: "#6270df",
      primaryContrast: "#080b14",
      secondary: "#2dd4bf",
      accent: "#f5a524",
      success: "#34d399",
      warning: "#f5a524",
      danger: "#fb7185",
      focus: "#7c8cff",
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
    id: "97",
    file: "tokens-97.css",
    name: "Facility Leasing",
    category: "Nieruchomości",
    useCase: "Najem komercyjny, powierzchnie biurowe, terminy oględzin i warunki umów",
    description: "Profesjonalny system nieruchomości komercyjnych z formalnym granatem, miedzianym akcentem i stabilną strukturą ofert.",
    primaryAction: "Umów oględziny",
    secondaryAction: "Porównaj warunki",
    tags: ["leasing", "facility", "commercial"],
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
      secondary: "#8c5d2f",
      accent: "#2d7f78",
      success: "#23704b",
      warning: "#956111",
      danger: "#a63d40",
      focus: "#23395b",
      shadowRgb: "35 57 91"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Merriweather Sans', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "98",
    file: "tokens-98.css",
    name: "Quest Hub",
    category: "Gry",
    useCase: "Dzienniki zadań, progres sezonowy, nagrody graczy i wydarzenia live",
    description: "Energetyczny system grywalizacji z ciemną bazą, neonowym fioletem i czytelną hierarchią progresu.",
    primaryAction: "Odbierz nagrodę",
    secondaryAction: "Zobacz questy",
    tags: ["quests", "rewards", "season"],
    colors: {
      background: "#111019",
      surface: "#191827",
      surfaceRaised: "#252238",
      text: "#f4f2ff",
      textMuted: "#b6b0cc",
      border: "#3d3757",
      primary: "#a855f7",
      primaryHover: "#8b3fd6",
      primaryContrast: "#14081f",
      secondary: "#2dd4bf",
      accent: "#f9c74f",
      success: "#48c774",
      warning: "#f9c74f",
      danger: "#ff5f6d",
      focus: "#2dd4bf",
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
    id: "99",
    file: "tokens-99.css",
    name: "Grant Management",
    category: "Społeczne",
    useCase: "Nabory grantowe, oceny wniosków, komisje społeczne i raportowanie wpływu",
    description: "Formalny system grantowy dla komisji oceny z fioletowym priorytetem, neutralnymi dokumentami i wyraźną ścieżką decyzji.",
    primaryAction: "Oceń wniosek",
    secondaryAction: "Zobacz nabór",
    tags: ["grants", "review", "impact"],
    colors: {
      background: "#f6f5fb",
      surface: "#ffffff",
      surfaceRaised: "#ebe8f5",
      text: "#1f1d2e",
      textMuted: "#666176",
      border: "#d8d2e6",
      primary: "#4f46a3",
      primaryHover: "#3d367f",
      primaryContrast: "#ffffff",
      secondary: "#16736a",
      accent: "#b06a2c",
      success: "#23704b",
      warning: "#956111",
      danger: "#a63d40",
      focus: "#4f46a3",
      shadowRgb: "79 70 163"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Merriweather Sans', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "100",
    file: "tokens-100.css",
    name: "Decision Log",
    category: "Produktywność",
    useCase: "Rejestry decyzji, asynchroniczne uzgodnienia, właściciele tematów i follow-upy",
    description: "System decyzji asynchronicznych z dokumentowym tłem, fioletowym priorytetem i czytelnym akcentem follow-upów.",
    primaryAction: "Dodaj decyzję",
    secondaryAction: "Zobacz follow-upy",
    tags: ["decisions", "async", "follow-up"],
    colors: {
      background: "#f8f7fc",
      surface: "#ffffff",
      surfaceRaised: "#ece8f6",
      text: "#211f2f",
      textMuted: "#666077",
      border: "#dad3e8",
      primary: "#5b4bb2",
      primaryHover: "#46398c",
      primaryContrast: "#ffffff",
      secondary: "#2f7470",
      accent: "#b06a2c",
      success: "#287a52",
      warning: "#a86518",
      danger: "#b43d4a",
      focus: "#5b4bb2",
      shadowRgb: "91 75 178"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.625rem", "0.875rem"]
  }
);

systems.push(
  {
    id: "101",
    file: "tokens-101.css",
    name: "Neural Canvas",
    category: "AI",
    useCase: "Generatywne edytory obrazów, canvasy AI i narzędzia kreacji multimodalnej",
    description: "Jasny system dla kreatywnych produktów AI z chłodnym błękitem, tealowym balansem i mocnym akcentem generowania.",
    primaryAction: "Generuj wariant",
    secondaryAction: "Zapisz canvas",
    tags: ["generative", "canvas", "multimodal"],
    colors: {
      background: "#f8fbff",
      surface: "#ffffff",
      surfaceRaised: "#e7f1ff",
      text: "#132238",
      textMuted: "#5b6b82",
      border: "#cfdded",
      primary: "#2563eb",
      primaryHover: "#1d4fbd",
      primaryContrast: "#ffffff",
      secondary: "#0f9f8f",
      accent: "#e0568a",
      success: "#16865b",
      warning: "#b06a00",
      danger: "#c83f54",
      focus: "#2563eb",
      shadowRgb: "37 99 235"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Sora', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.5rem", "0.75rem", "1rem", "1.375rem"]
  },
  {
    id: "102",
    file: "tokens-102.css",
    name: "Knowledge Copilot",
    category: "AI",
    useCase: "Wyszukiwarki RAG, copiloci wiedzy firmowej i panele odpowiedzi kontekstowych",
    description: "Spokojny system AI dla pracy z wiedzą, z zielonym priorytetem zaufania, niebieską nawigacją i czytelnymi dokumentami.",
    primaryAction: "Zapytaj bazę",
    secondaryAction: "Pokaż źródła",
    tags: ["rag", "knowledge", "copilot"],
    colors: {
      background: "#f5f8f3",
      surface: "#ffffff",
      surfaceRaised: "#e7efe4",
      text: "#17231b",
      textMuted: "#5d6b61",
      border: "#d0ddcc",
      primary: "#276749",
      primaryHover: "#1f513a",
      primaryContrast: "#ffffff",
      secondary: "#315f9f",
      accent: "#b7791f",
      success: "#23704b",
      warning: "#956111",
      danger: "#b43d4a",
      focus: "#315f9f",
      shadowRgb: "39 103 73"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "103",
    file: "tokens-103.css",
    name: "Automation Mesh",
    category: "AI",
    useCase: "Orkiestracja agentów, grafy workflow AI i automatyzacje między narzędziami",
    description: "Ciemny system orchestration z zielonym sygnałem wykonania, błękitną telemetrią i kompaktowymi stanami przepływu.",
    primaryAction: "Uruchom workflow",
    secondaryAction: "Zobacz graf",
    tags: ["orchestration", "agents", "workflow"],
    colors: {
      background: "#0d1412",
      surface: "#141f1c",
      surfaceRaised: "#20312d",
      text: "#edf7f2",
      textMuted: "#a7b9b0",
      border: "#334a43",
      primary: "#4ade80",
      primaryHover: "#22c55e",
      primaryContrast: "#06100b",
      secondary: "#38bdf8",
      accent: "#f59e0b",
      success: "#4ade80",
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
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "104",
    file: "tokens-104.css",
    name: "Vision Lab",
    category: "AI",
    useCase: "Analiza obrazów, anotacje computer vision i review wyników multimodalnych",
    description: "Precyzyjny system dla produktów vision AI z jasnym tłem laboratoryjnym, tealowym CTA i wyraźnymi statusami annotacji.",
    primaryAction: "Analizuj obraz",
    secondaryAction: "Otwórz anotacje",
    tags: ["vision", "annotation", "multimodal"],
    colors: {
      background: "#f7fafb",
      surface: "#ffffff",
      surfaceRaised: "#e7f3f5",
      text: "#152529",
      textMuted: "#5a6d72",
      border: "#cfe0e4",
      primary: "#087f8c",
      primaryHover: "#066570",
      primaryContrast: "#ffffff",
      secondary: "#4f46e5",
      accent: "#d97706",
      success: "#16865b",
      warning: "#ad6500",
      danger: "#bf3f4d",
      focus: "#087f8c",
      shadowRgb: "8 127 140"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Manrope', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.375rem", "0.625rem", "0.875rem", "1.125rem"]
  },
  {
    id: "105",
    file: "tokens-105.css",
    name: "Safety Evaluator",
    category: "AI",
    useCase: "Ewaluacje bezpieczeństwa AI, red teaming, polityki modeli i raporty jakości",
    description: "Formalny system AI safety z neutralnym dokumentowym tłem, granatowym priorytetem i mocnym akcentem ryzyka.",
    primaryAction: "Uruchom eval",
    secondaryAction: "Zobacz politykę",
    tags: ["safety", "evals", "red-team"],
    colors: {
      background: "#f7f7fa",
      surface: "#ffffff",
      surfaceRaised: "#eceef5",
      text: "#1b1f2f",
      textMuted: "#606779",
      border: "#d7dbe7",
      primary: "#384b7a",
      primaryHover: "#2c3a60",
      primaryContrast: "#ffffff",
      secondary: "#16736a",
      accent: "#b94646",
      success: "#287a52",
      warning: "#a86518",
      danger: "#b4233a",
      focus: "#384b7a",
      shadowRgb: "56 75 122"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Merriweather Sans', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "106",
    file: "tokens-106.css",
    name: "Product Signals",
    category: "Analityka",
    useCase: "Analityka produktowa, event streams, segmenty użytkowników i alerty aktywacji",
    description: "Operacyjny system product analytics z tealowym priorytetem, chłodnym tłem i mocnym rozróżnieniem sygnałów behawioralnych.",
    primaryAction: "Dodaj sygnał",
    secondaryAction: "Zobacz segmenty",
    tags: ["product", "events", "segments"],
    colors: {
      background: "#f3faf8",
      surface: "#ffffff",
      surfaceRaised: "#e2f2ef",
      text: "#142623",
      textMuted: "#58706b",
      border: "#c7ded8",
      primary: "#0f766e",
      primaryHover: "#0a5d57",
      primaryContrast: "#ffffff",
      secondary: "#2f64b3",
      accent: "#c26632",
      success: "#16865b",
      warning: "#9f6200",
      danger: "#b43d4a",
      focus: "#0f766e",
      shadowRgb: "15 118 110"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "107",
    file: "tokens-107.css",
    name: "Cohort Matrix",
    category: "Analityka",
    useCase: "Analizy kohortowe, retencja, heatmapy aktywności i porównania segmentów",
    description: "System kohortowy z miękką śliwkową bazą, czytelną siatką danych i akcentem dla zmian retencji.",
    primaryAction: "Utwórz kohortę",
    secondaryAction: "Porównaj retencję",
    tags: ["cohorts", "retention", "segments"],
    colors: {
      background: "#faf7fb",
      surface: "#ffffff",
      surfaceRaised: "#f0e8f4",
      text: "#281f2e",
      textMuted: "#70637a",
      border: "#dfd2e5",
      primary: "#7a3f8f",
      primaryHover: "#613171",
      primaryContrast: "#ffffff",
      secondary: "#16736a",
      accent: "#c27a28",
      success: "#23704b",
      warning: "#a86518",
      danger: "#b43d4a",
      focus: "#7a3f8f",
      shadowRgb: "122 63 143"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Sora', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.375rem", "0.625rem", "0.875rem", "1.125rem"]
  },
  {
    id: "108",
    file: "tokens-108.css",
    name: "Funnel Diagnostics",
    category: "Analityka",
    useCase: "Lejki konwersji, diagnostyka drop-offów, ścieżki użytkownika i eksperymenty growth",
    description: "Konwersyjny system analityczny z miedzianym CTA, niebieskim porównaniem ścieżek i neutralną bazą do wykresów.",
    primaryAction: "Zdiagnozuj lejek",
    secondaryAction: "Porównaj ścieżki",
    tags: ["funnels", "conversion", "growth"],
    colors: {
      background: "#fbf8f3",
      surface: "#ffffff",
      surfaceRaised: "#f1e8dc",
      text: "#29231d",
      textMuted: "#71685d",
      border: "#dfd3c4",
      primary: "#a9551f",
      primaryHover: "#874217",
      primaryContrast: "#ffffff",
      secondary: "#286aa0",
      accent: "#6f58a8",
      success: "#287a52",
      warning: "#a86518",
      danger: "#ba3434",
      focus: "#286aa0",
      shadowRgb: "169 85 31"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Libre Franklin', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "109",
    file: "tokens-109.css",
    name: "Data Quality Monitor",
    category: "Analityka",
    useCase: "Monitoring jakości danych, lineage, świeżość pipeline'ów i statusy anomalii",
    description: "Ciemny system jakości danych z bursztynowym priorytetem, cyjanową telemetrią i precyzyjnymi alertami anomalii.",
    primaryAction: "Sprawdź jakość",
    secondaryAction: "Otwórz lineage",
    tags: ["quality", "lineage", "anomalies"],
    colors: {
      background: "#111414",
      surface: "#191f1f",
      surfaceRaised: "#253030",
      text: "#f4f7f5",
      textMuted: "#aab8b4",
      border: "#3a4947",
      primary: "#f2b84b",
      primaryHover: "#d89c2e",
      primaryContrast: "#171006",
      secondary: "#22c7b8",
      accent: "#9f7aea",
      success: "#34d399",
      warning: "#f2b84b",
      danger: "#fb7185",
      focus: "#22c7b8",
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
    id: "110",
    file: "tokens-110.css",
    name: "Executive Scorecard",
    category: "Analityka",
    useCase: "Scorecardy zarządcze, tablice OKR, przeglądy kwartalne i porównania KPI",
    description: "Formalny system scorecardów z grafitowym priorytetem, złotym akcentem decyzji i spokojną strukturą metryk zarządczych.",
    primaryAction: "Dodaj KPI",
    secondaryAction: "Otwórz scorecard",
    tags: ["scorecard", "okr", "executive"],
    colors: {
      background: "#f6f7f7",
      surface: "#ffffff",
      surfaceRaised: "#ebeeee",
      text: "#1f2428",
      textMuted: "#626b72",
      border: "#d5dbdf",
      primary: "#40505c",
      primaryHover: "#303c45",
      primaryContrast: "#ffffff",
      secondary: "#1d746c",
      accent: "#b5832f",
      success: "#287a52",
      warning: "#a86518",
      danger: "#a63d40",
      focus: "#40505c",
      shadowRgb: "64 80 92"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Merriweather Sans', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "111",
    file: "tokens-111.css",
    name: "Compliance Ledger",
    category: "Bezpieczeństwo",
    useCase: "Audyt zgodności, kontrole polityk, ślady decyzji i przeglądy regulacyjne",
    description: "Formalny system compliance z dokumentowym tłem, granatowym priorytetem i wyraźnym akcentem statusu kontroli.",
    primaryAction: "Dodaj kontrolę",
    secondaryAction: "Otwórz audyt",
    tags: ["compliance", "audit", "policies"],
    colors: {
      background: "#f6f7f8",
      surface: "#ffffff",
      surfaceRaised: "#eaedf1",
      text: "#1c232b",
      textMuted: "#606a75",
      border: "#d3dae2",
      primary: "#34465f",
      primaryHover: "#26364b",
      primaryContrast: "#ffffff",
      secondary: "#0f766e",
      accent: "#b7791f",
      success: "#23704b",
      warning: "#956111",
      danger: "#b73545",
      focus: "#34465f",
      shadowRgb: "52 70 95"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Merriweather Sans', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "112",
    file: "tokens-112.css",
    name: "Endpoint Sentinel",
    category: "Bezpieczeństwo",
    useCase: "Ochrona endpointów, statusy agentów, izolacja urządzeń i telemetria EDR",
    description: "Ciemny system EDR z cyjanowym priorytetem, fioletowym kontekstem śledztwa i ostrym akcentem izolacji.",
    primaryAction: "Izoluj endpoint",
    secondaryAction: "Sprawdź agenta",
    tags: ["endpoint", "edr", "devices"],
    colors: {
      background: "#0d1218",
      surface: "#141b24",
      surfaceRaised: "#202a36",
      text: "#edf5f7",
      textMuted: "#a6b4bb",
      border: "#344250",
      primary: "#2dd4bf",
      primaryHover: "#20b7a4",
      primaryContrast: "#041413",
      secondary: "#8b5cf6",
      accent: "#f97316",
      success: "#34d399",
      warning: "#f5a524",
      danger: "#fb7185",
      focus: "#2dd4bf",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Space Grotesk', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.375rem", "0.5rem"]
  },
  {
    id: "113",
    file: "tokens-113.css",
    name: "Privacy Guard",
    category: "Bezpieczeństwo",
    useCase: "Ochrona danych osobowych, zgody użytkowników, klasyfikacja PII i żądania DSAR",
    description: "Spokojny system privacy z przygaszonym indygo, tealowym potwierdzeniem i czytelnym priorytetem danych wrażliwych.",
    primaryAction: "Sprawdź PII",
    secondaryAction: "Zobacz zgody",
    tags: ["privacy", "pii", "consent"],
    colors: {
      background: "#f7f6fb",
      surface: "#ffffff",
      surfaceRaised: "#ebe8f4",
      text: "#211f2e",
      textMuted: "#666176",
      border: "#d9d4e5",
      primary: "#4c3f91",
      primaryHover: "#3a3070",
      primaryContrast: "#ffffff",
      secondary: "#0f7a72",
      accent: "#b44d5a",
      success: "#23704b",
      warning: "#a86518",
      danger: "#b4233a",
      focus: "#4c3f91",
      shadowRgb: "76 63 145"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "114",
    file: "tokens-114.css",
    name: "Cloud Posture",
    category: "Bezpieczeństwo",
    useCase: "CSPM, konfiguracje chmurowe, ekspozycja zasobów i priorytety hardeningu",
    description: "Chłodny system cloud security z niebieskim priorytetem, zielonym statusem konfiguracji i ciepłym akcentem ekspozycji.",
    primaryAction: "Skanuj chmurę",
    secondaryAction: "Napraw reguły",
    tags: ["cloud", "cspm", "hardening"],
    colors: {
      background: "#f4f8fb",
      surface: "#ffffff",
      surfaceRaised: "#e5eff6",
      text: "#172531",
      textMuted: "#5c6c79",
      border: "#cfdde8",
      primary: "#1d5f8f",
      primaryHover: "#16486d",
      primaryContrast: "#ffffff",
      secondary: "#0e8a6d",
      accent: "#b06a2c",
      success: "#23704b",
      warning: "#956111",
      danger: "#b73545",
      focus: "#1d5f8f",
      shadowRgb: "29 95 143"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Manrope', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.375rem", "0.625rem", "0.875rem"]
  },
  {
    id: "115",
    file: "tokens-115.css",
    name: "Incident Response",
    category: "Bezpieczeństwo",
    useCase: "Obsługa incydentów, playbooki reakcji, eskalacje i timeline działań SOC",
    description: "Ciemny system incident response z mocnym czerwonym CTA, cyjanowym śladem operacyjnym i bursztynowym stanem eskalacji.",
    primaryAction: "Uruchom playbook",
    secondaryAction: "Otwórz timeline",
    tags: ["incident", "soc", "playbooks"],
    colors: {
      background: "#141012",
      surface: "#1d171a",
      surfaceRaised: "#2a2226",
      text: "#f7f1f3",
      textMuted: "#b8aeb2",
      border: "#47383e",
      primary: "#e35b68",
      primaryHover: "#c54450",
      primaryContrast: "#170608",
      secondary: "#45c4b0",
      accent: "#f2b84b",
      success: "#34d399",
      warning: "#f2b84b",
      danger: "#fb7185",
      focus: "#45c4b0",
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
    id: "116",
    file: "tokens-116.css",
    name: "Code Review Desk",
    category: "Dla devów",
    useCase: "Pull requesty, diff review, komentarze inline, approvals i ownership zmian",
    description: "Jasny system code review z fioletowym priorytetem decyzji, zielonym approval i czerwonym akcentem blokujących uwag.",
    primaryAction: "Zatwierdź PR",
    secondaryAction: "Dodaj komentarz",
    tags: ["code-review", "pull-request", "diff"],
    colors: {
      background: "#f8f7fc",
      surface: "#ffffff",
      surfaceRaised: "#ece8f6",
      text: "#211f2f",
      textMuted: "#666077",
      border: "#dad3e8",
      primary: "#5b4bb2",
      primaryHover: "#46398c",
      primaryContrast: "#ffffff",
      secondary: "#237a57",
      accent: "#c24f5d",
      success: "#237a57",
      warning: "#a86518",
      danger: "#b4233a",
      focus: "#5b4bb2",
      shadowRgb: "91 75 178"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.625rem", "0.875rem"]
  },
  {
    id: "117",
    file: "tokens-117.css",
    name: "Package Registry",
    category: "Dla devów",
    useCase: "Registry pakietów, wersje bibliotek, dependency health i publish flows",
    description: "Ciemny system registry z npmowym czerwonym priorytetem, cyjanowym statusem paczek i bursztynowym akcentem wersji.",
    primaryAction: "Opublikuj pakiet",
    secondaryAction: "Sprawdź zależności",
    tags: ["packages", "registry", "dependencies"],
    colors: {
      background: "#141012",
      surface: "#1d171a",
      surfaceRaised: "#2a2226",
      text: "#f7f1f3",
      textMuted: "#b8aeb2",
      border: "#47383e",
      primary: "#bd3f4f",
      primaryHover: "#9f303e",
      primaryContrast: "#ffffff",
      secondary: "#2dd4bf",
      accent: "#f2b84b",
      success: "#34d399",
      warning: "#f2b84b",
      danger: "#fb7185",
      focus: "#2dd4bf",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Sora', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "118",
    file: "tokens-118.css",
    name: "Schema Explorer",
    category: "Dla devów",
    useCase: "GraphQL, schematy API, relacje typów, introspection i testowanie zapytań",
    description: "Eksploracyjny system schematów z jasnym lawendowym tłem, mocnym fioletem GraphQL i tealowym stanem walidacji.",
    primaryAction: "Uruchom query",
    secondaryAction: "Zobacz schema",
    tags: ["graphql", "schema", "queries"],
    colors: {
      background: "#faf7fd",
      surface: "#ffffff",
      surfaceRaised: "#f0e8f8",
      text: "#271f31",
      textMuted: "#6c6179",
      border: "#dfd3e9",
      primary: "#8a3ffc",
      primaryHover: "#6f31ca",
      primaryContrast: "#ffffff",
      secondary: "#0f766e",
      accent: "#c26632",
      success: "#23704b",
      warning: "#a86518",
      danger: "#b43d4a",
      focus: "#8a3ffc",
      shadowRgb: "138 63 252"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Sora', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.375rem", "0.625rem", "0.875rem", "1.125rem"]
  },
  {
    id: "119",
    file: "tokens-119.css",
    name: "Infrastructure Console",
    category: "Dla devów",
    useCase: "IaC, zasoby chmurowe, drift detection, plany Terraform i statusy provisioningu",
    description: "Techniczna konsola infrastruktury z głęboką zielenią, miedzianym akcentem zmian i błękitnym kontekstem zasobów.",
    primaryAction: "Zastosuj plan",
    secondaryAction: "Pokaż drift",
    tags: ["iac", "terraform", "cloud"],
    colors: {
      background: "#0b1412",
      surface: "#121f1c",
      surfaceRaised: "#1d302b",
      text: "#edf7f3",
      textMuted: "#a7b9b1",
      border: "#344a43",
      primary: "#22c55e",
      primaryHover: "#16a34a",
      primaryContrast: "#06130b",
      secondary: "#4da3ff",
      accent: "#c7782d",
      success: "#22c55e",
      warning: "#f2b84b",
      danger: "#fb7185",
      focus: "#4da3ff",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Space Grotesk', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.375rem", "0.625rem"]
  },
  {
    id: "120",
    file: "tokens-120.css",
    name: "Test Automation Lab",
    category: "Dla devów",
    useCase: "Test suites, coverage, snapshots, flaky tests i raporty jakości buildów",
    description: "Laboratoryjny system test automation z czystym tłem, zielonym coverage, niebieskim kontekstem suite i żółtym flaky warning.",
    primaryAction: "Uruchom suite",
    secondaryAction: "Zobacz coverage",
    tags: ["testing", "coverage", "qa"],
    colors: {
      background: "#f5faf7",
      surface: "#ffffff",
      surfaceRaised: "#e6f2eb",
      text: "#17251d",
      textMuted: "#5c6f64",
      border: "#cfe0d6",
      primary: "#287a52",
      primaryHover: "#1f6040",
      primaryContrast: "#ffffff",
      secondary: "#3568b8",
      accent: "#b7791f",
      success: "#23704b",
      warning: "#956111",
      danger: "#b73545",
      focus: "#3568b8",
      shadowRgb: "40 122 82"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Manrope', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.375rem", "0.625rem", "1rem", "1.375rem"]
  },
  {
    id: "121",
    file: "tokens-121.css",
    name: "Low Vision Reader",
    category: "Dostępność",
    useCase: "Czytniki treści, dokumenty publiczne, portale wiedzy i widoki dla osób słabowidzących",
    description: "Ciepły system wysokiej czytelności z ograniczonym olśnieniem, bardzo mocnym tekstem i dużym kontrastem akcji.",
    primaryAction: "Powiększ tekst",
    secondaryAction: "Otwórz dokument",
    tags: ["low-vision", "reading", "wcag"],
    colors: {
      background: "#fffdf5",
      surface: "#ffffff",
      surfaceRaised: "#f3eedf",
      text: "#15130f",
      textMuted: "#3d372f",
      border: "#2f2a1f",
      primary: "#005a8c",
      primaryHover: "#004466",
      primaryContrast: "#ffffff",
      secondary: "#006b55",
      accent: "#a14b00",
      success: "#0f7a32",
      warning: "#8f4a00",
      danger: "#b00020",
      focus: "#005a8c",
      shadowRgb: "21 19 15"
    },
    fonts: {
      sans: "'Atkinson Hyperlegible', 'Inter', Arial, sans-serif",
      heading: "'Atkinson Hyperlegible', 'Segoe UI', Arial, sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "122",
    file: "tokens-122.css",
    name: "Dyslexia Friendly",
    category: "Dostępność",
    useCase: "Platformy edukacyjne, formularze krokowe, instrukcje i interfejsy o niższym obciążeniu poznawczym",
    description: "Miękki, ale kontrastowy system dla czytania bez przeciążenia, z lawendowym priorytetem i spokojnymi powierzchniami.",
    primaryAction: "Kontynuuj krok",
    secondaryAction: "Zapisz postęp",
    tags: ["dyslexia", "education", "readability"],
    colors: {
      background: "#f8f7ef",
      surface: "#ffffff",
      surfaceRaised: "#eeecdc",
      text: "#1b1a16",
      textMuted: "#4b463d",
      border: "#3a352b",
      primary: "#4b4f9c",
      primaryHover: "#383c78",
      primaryContrast: "#ffffff",
      secondary: "#24745f",
      accent: "#9a5c00",
      success: "#23704b",
      warning: "#8f4a00",
      danger: "#a90025",
      focus: "#4b4f9c",
      shadowRgb: "27 26 22"
    },
    fonts: {
      sans: "'Atkinson Hyperlegible', 'Lexend', 'Inter', Arial, sans-serif",
      heading: "'Lexend', 'Atkinson Hyperlegible', Arial, sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.375rem", "0.625rem", "0.875rem", "1.125rem"]
  },
  {
    id: "123",
    file: "tokens-123.css",
    name: "Color Safe Status",
    category: "Dostępność",
    useCase: "Dashboardy statusów, tabele walidacji, systemy alertów i UI odporne na ślepotę barw",
    description: "Paleta statusów color-blind-safe z niebieskim priorytetem, pomarańczowym ostrzeżeniem i fioletowym akcentem informacji.",
    primaryAction: "Sprawdź status",
    secondaryAction: "Filtruj błędy",
    tags: ["color-safe", "status", "a11y"],
    colors: {
      background: "#f8fafc",
      surface: "#ffffff",
      surfaceRaised: "#eef2f6",
      text: "#111827",
      textMuted: "#344054",
      border: "#243041",
      primary: "#005ab5",
      primaryHover: "#004489",
      primaryContrast: "#ffffff",
      secondary: "#00876c",
      accent: "#d55e00",
      success: "#007a5a",
      warning: "#a86500",
      danger: "#b00020",
      focus: "#7a3db8",
      shadowRgb: "17 24 39"
    },
    fonts: {
      sans: "'Atkinson Hyperlegible', 'Inter', Arial, sans-serif",
      heading: "'Atkinson Hyperlegible', 'Segoe UI', Arial, sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.375rem", "0.625rem"]
  },
  {
    id: "124",
    file: "tokens-124.css",
    name: "Keyboard Focus Dark",
    category: "Dostępność",
    useCase: "Aplikacje keyboard-first, narzędzia administracyjne, command palettes i interfejsy focus-heavy",
    description: "Ciemny system dostępnościowy z bardzo mocnym żółtym fokusem, jasnymi obramowaniami i czytelnymi stanami bez myszy.",
    primaryAction: "Przejdź dalej",
    secondaryAction: "Pokaż skróty",
    tags: ["keyboard", "focus", "dark"],
    colors: {
      background: "#0c0f14",
      surface: "#141922",
      surfaceRaised: "#202632",
      text: "#f7f9fc",
      textMuted: "#c2cad6",
      border: "#d7dde8",
      primary: "#ffbf47",
      primaryHover: "#e5a72f",
      primaryContrast: "#111111",
      secondary: "#66ccff",
      accent: "#cc99ff",
      success: "#6ee7a8",
      warning: "#ffbf47",
      danger: "#ff7a8a",
      focus: "#ffbf47",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Atkinson Hyperlegible', 'Inter', Arial, sans-serif",
      heading: "'Atkinson Hyperlegible', 'Segoe UI', Arial, sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0", "0.125rem", "0.25rem", "0.375rem"]
  },
  {
    id: "125",
    file: "tokens-125.css",
    name: "Screen Reader Admin",
    category: "Dostępność",
    useCase: "Panele administracyjne, tabele danych, ustawienia systemowe i interfejsy wspierające screen readery",
    description: "Strukturalny system admin z czytelną hierarchią, granatowym priorytetem i statusami projektowanymi pod tekstowe etykiety.",
    primaryAction: "Zapisz ustawienia",
    secondaryAction: "Przejdź do tabeli",
    tags: ["screen-reader", "admin", "tables"],
    colors: {
      background: "#f5f7f9",
      surface: "#ffffff",
      surfaceRaised: "#e8edf2",
      text: "#101820",
      textMuted: "#303a45",
      border: "#1f2937",
      primary: "#243b73",
      primaryHover: "#1a2b55",
      primaryContrast: "#ffffff",
      secondary: "#0b6b5f",
      accent: "#8f4a00",
      success: "#0f7a32",
      warning: "#8f4a00",
      danger: "#b00020",
      focus: "#243b73",
      shadowRgb: "16 24 32"
    },
    fonts: {
      sans: "'Atkinson Hyperlegible', 'Inter', Arial, sans-serif",
      heading: "'Atkinson Hyperlegible', 'Segoe UI', Arial, sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "126",
    file: "tokens-126.css",
    name: "Research Notebook",
    category: "Edukacja",
    useCase: "Notatniki badawcze, seminaria akademickie, bibliografie, cytowania i przeglądy literatury",
    description: "Akademicki system research z papierową bazą, śliwkowym priorytetem i spokojnymi statusami pracy źródłowej.",
    primaryAction: "Dodaj źródło",
    secondaryAction: "Otwórz notatki",
    tags: ["research", "notes", "citations"],
    colors: {
      background: "#f8f6f2",
      surface: "#ffffff",
      surfaceRaised: "#eee9e2",
      text: "#24211d",
      textMuted: "#686158",
      border: "#ddd4c8",
      primary: "#6f3f5f",
      primaryHover: "#563049",
      primaryContrast: "#ffffff",
      secondary: "#2f6f73",
      accent: "#a86518",
      success: "#287a52",
      warning: "#a86518",
      danger: "#a63d40",
      focus: "#6f3f5f",
      shadowRgb: "111 63 95"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Merriweather Sans', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "127",
    file: "tokens-127.css",
    name: "STEM Lab Console",
    category: "Edukacja",
    useCase: "Laboratoria STEM, symulacje, eksperymenty, robotyka i panele wyników ćwiczeń",
    description: "Ciemny system laboratoryjny z błękitnym sygnałem eksperymentu, zielonym wynikiem i bursztynowym ostrzeżeniem.",
    primaryAction: "Uruchom symulację",
    secondaryAction: "Zapisz wynik",
    tags: ["stem", "lab", "simulation"],
    colors: {
      background: "#0d1720",
      surface: "#142131",
      surfaceRaised: "#203248",
      text: "#edf6ff",
      textMuted: "#a7b8c9",
      border: "#35495f",
      primary: "#38bdf8",
      primaryHover: "#0ea5e9",
      primaryContrast: "#06111c",
      secondary: "#34d399",
      accent: "#f59e0b",
      success: "#34d399",
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
    radius: ["0.125rem", "0.25rem", "0.375rem", "0.625rem"]
  },
  {
    id: "128",
    file: "tokens-128.css",
    name: "Language Tutor",
    category: "Edukacja",
    useCase: "Nauka języków, fiszki, wymowa, dialogi, progres słownictwa i ćwiczenia odsłuchowe",
    description: "Przyjazny system language learning z lawendowym priorytetem, tealowym stanem poprawności i koralowym akcentem mówienia.",
    primaryAction: "Ćwicz dialog",
    secondaryAction: "Powtórz fiszki",
    tags: ["language", "flashcards", "practice"],
    colors: {
      background: "#fbf7ff",
      surface: "#ffffff",
      surfaceRaised: "#f0e8f7",
      text: "#251f30",
      textMuted: "#6a6178",
      border: "#dfd3e8",
      primary: "#6d4fc2",
      primaryHover: "#553b9a",
      primaryContrast: "#ffffff",
      secondary: "#0f7a72",
      accent: "#d96c44",
      success: "#23704b",
      warning: "#a86518",
      danger: "#b43d4a",
      focus: "#6d4fc2",
      shadowRgb: "109 79 194"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Nunito Sans', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.5rem", "0.75rem", "1rem", "1.375rem"]
  },
  {
    id: "129",
    file: "tokens-129.css",
    name: "Knowledge Library",
    category: "Edukacja",
    useCase: "Biblioteki szkolne, katalogi wiedzy, listy lektur, archiwa materiałów i ścieżki czytania",
    description: "Biblioteczny system edukacyjny z naturalną zielenią, ciepłą powierzchnią dokumentową i spokojnym akcentem katalogu.",
    primaryAction: "Dodaj do listy",
    secondaryAction: "Otwórz katalog",
    tags: ["library", "reading", "catalog"],
    colors: {
      background: "#f8f5ef",
      surface: "#ffffff",
      surfaceRaised: "#ede6da",
      text: "#25231e",
      textMuted: "#6a6359",
      border: "#ded4c6",
      primary: "#4a6542",
      primaryHover: "#384d32",
      primaryContrast: "#ffffff",
      secondary: "#7c5b2e",
      accent: "#315f9f",
      success: "#2f7a48",
      warning: "#956111",
      danger: "#a63d40",
      focus: "#315f9f",
      shadowRgb: "74 101 66"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Libre Baskerville', Georgia, serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "130",
    file: "tokens-130.css",
    name: "Skills Bootcamp",
    category: "Edukacja",
    useCase: "Bootcampy zawodowe, projekty praktyczne, checklisty kompetencji i dashboardy certyfikacji",
    description: "Energetyczny system upskillingu z tealowym CTA, kobaltowym kontekstem projektów i wyraźnym akcentem certyfikacji.",
    primaryAction: "Oddaj projekt",
    secondaryAction: "Zobacz kompetencje",
    tags: ["bootcamp", "skills", "certification"],
    colors: {
      background: "#f3faf8",
      surface: "#ffffff",
      surfaceRaised: "#e2f2ef",
      text: "#142623",
      textMuted: "#58706b",
      border: "#c7ded8",
      primary: "#0f766e",
      primaryHover: "#0a5d57",
      primaryContrast: "#ffffff",
      secondary: "#4058c8",
      accent: "#c24f32",
      success: "#16865b",
      warning: "#a86518",
      danger: "#b43d4a",
      focus: "#4058c8",
      shadowRgb: "15 118 110"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Manrope', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.375rem", "0.625rem", "0.875rem", "1.125rem"]
  },
  {
    id: "131",
    file: "tokens-131.css",
    name: "HR Operations",
    category: "Enterprise",
    useCase: "Procesy HR, onboarding pracowników, przeglądy stanowisk i ścieżki akceptacji personalnych",
    description: "Enterprise HR system z grafitową bazą, spokojnym tealowym CTA i ciepłym akcentem decyzji kadrowych.",
    primaryAction: "Zatwierdź wniosek",
    secondaryAction: "Otwórz profil",
    tags: ["hr", "onboarding", "people-ops"],
    colors: {
      background: "#f6f7f7",
      surface: "#ffffff",
      surfaceRaised: "#ebeeee",
      text: "#1f2428",
      textMuted: "#626b72",
      border: "#d5dbdf",
      primary: "#315f5d",
      primaryHover: "#244947",
      primaryContrast: "#ffffff",
      secondary: "#4058a8",
      accent: "#b06a2c",
      success: "#23704b",
      warning: "#956111",
      danger: "#a63d40",
      focus: "#4058a8",
      shadowRgb: "49 95 93"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.25rem", "0.375rem", "0.625rem", "0.875rem"]
  },
  {
    id: "132",
    file: "tokens-132.css",
    name: "Finance Planning",
    category: "Enterprise",
    useCase: "Budżetowanie roczne, forecasty działowe, plany kosztów i akceptacje finansowe",
    description: "Formalny system finansowy enterprise z zielenią stabilności, granatowym kontekstem raportowym i złotym akcentem prognoz.",
    primaryAction: "Zatwierdź budżet",
    secondaryAction: "Porównaj forecast",
    tags: ["finance", "budget", "forecast"],
    colors: {
      background: "#f5f8f6",
      surface: "#ffffff",
      surfaceRaised: "#e7efe9",
      text: "#17231d",
      textMuted: "#5d6b62",
      border: "#d0ddd4",
      primary: "#276749",
      primaryHover: "#1f513a",
      primaryContrast: "#ffffff",
      secondary: "#2f5f9f",
      accent: "#a77a08",
      success: "#23704b",
      warning: "#956111",
      danger: "#a63d40",
      focus: "#2f5f9f",
      shadowRgb: "39 103 73"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Libre Franklin', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "133",
    file: "tokens-133.css",
    name: "Service Desk Command",
    category: "Enterprise",
    useCase: "ITSM, kolejki zgłoszeń, SLA, eskalacje, katalog usług i operacje wsparcia",
    description: "Ciemny system service desk z niebieskim priorytetem operacyjnym, zielonym SLA i pomarańczowym stanem eskalacji.",
    primaryAction: "Przypisz ticket",
    secondaryAction: "Otwórz SLA",
    tags: ["itsm", "service-desk", "sla"],
    colors: {
      background: "#0f141b",
      surface: "#171e27",
      surfaceRaised: "#232c39",
      text: "#f1f5fa",
      textMuted: "#aab5c2",
      border: "#3a4655",
      primary: "#60a5fa",
      primaryHover: "#3b82f6",
      primaryContrast: "#07111f",
      secondary: "#34d399",
      accent: "#f97316",
      success: "#34d399",
      warning: "#f59e0b",
      danger: "#fb7185",
      focus: "#60a5fa",
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
    id: "134",
    file: "tokens-134.css",
    name: "Data Governance",
    category: "Enterprise",
    useCase: "Katalogi danych, ownership datasetów, klasyfikacje informacji i workflow jakości danych",
    description: "System data governance z chłodnym granatem, fioletowym akcentem klasyfikacji i tealowym statusem zaufania.",
    primaryAction: "Przypisz ownera",
    secondaryAction: "Otwórz lineage",
    tags: ["data", "governance", "lineage"],
    colors: {
      background: "#f5f7fb",
      surface: "#ffffff",
      surfaceRaised: "#e8edf6",
      text: "#192233",
      textMuted: "#5f697a",
      border: "#d4dce9",
      primary: "#384b7a",
      primaryHover: "#2c3a60",
      primaryContrast: "#ffffff",
      secondary: "#16736a",
      accent: "#7a4b8f",
      success: "#23704b",
      warning: "#956111",
      danger: "#a63d40",
      focus: "#384b7a",
      shadowRgb: "56 75 122"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Manrope', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.625rem", "0.875rem"]
  },
  {
    id: "135",
    file: "tokens-135.css",
    name: "Executive Operations",
    category: "Enterprise",
    useCase: "Operacje zarządcze, rytuały leadership, rejestry decyzji i przeglądy inicjatyw strategicznych",
    description: "Premium enterprise operations z ciemną atramentową bazą, miedzianym CTA i chłodnym akcentem koordynacji.",
    primaryAction: "Dodaj decyzję",
    secondaryAction: "Otwórz inicjatywy",
    tags: ["executive", "operations", "decisions"],
    colors: {
      background: "#121114",
      surface: "#1b191e",
      surfaceRaised: "#28252d",
      text: "#f3f0ea",
      textMuted: "#b8b1a8",
      border: "#3d3844",
      primary: "#c28a4a",
      primaryHover: "#a97035",
      primaryContrast: "#17100a",
      secondary: "#8aa0b6",
      accent: "#6aa58f",
      success: "#58a778",
      warning: "#c28a4a",
      danger: "#c96060",
      focus: "#c28a4a",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Merriweather Sans', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "136",
    file: "tokens-136.css",
    name: "Payments Gateway",
    category: "Finanse",
    useCase: "Bramki płatnicze, autoryzacje kart, statusy transakcji, refundy i rozliczenia merchantów",
    description: "Operacyjny system payments z niebieskim priorytetem transakcji, tealowym statusem rozliczenia i ciepłym akcentem refundów.",
    primaryAction: "Autoryzuj płatność",
    secondaryAction: "Otwórz refund",
    tags: ["payments", "gateway", "transactions"],
    colors: {
      background: "#f4f8fb",
      surface: "#ffffff",
      surfaceRaised: "#e5eff6",
      text: "#172531",
      textMuted: "#5c6c79",
      border: "#cfdde8",
      primary: "#1d5f8f",
      primaryHover: "#16486d",
      primaryContrast: "#ffffff",
      secondary: "#0e8a6d",
      accent: "#b06a2c",
      success: "#137a4b",
      warning: "#956111",
      danger: "#ba3434",
      focus: "#1d5f8f",
      shadowRgb: "29 95 143"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.375rem", "0.625rem", "0.875rem"]
  },
  {
    id: "137",
    file: "tokens-137.css",
    name: "Crypto Custody",
    category: "Finanse",
    useCase: "Portfele aktywów cyfrowych, custody, cold storage, transfery on-chain i alerty ryzyka",
    description: "Ciemny system digital assets z indygo jako sygnałem zaufania, tealowym potwierdzeniem i bursztynowym alertem transferu.",
    primaryAction: "Zatwierdź transfer",
    secondaryAction: "Sprawdź wallet",
    tags: ["crypto", "custody", "wallet"],
    colors: {
      background: "#10131d",
      surface: "#171b29",
      surfaceRaised: "#23283a",
      text: "#f0f3ff",
      textMuted: "#aab2c8",
      border: "#343b52",
      primary: "#8b9cff",
      primaryHover: "#6f7fe0",
      primaryContrast: "#080b17",
      secondary: "#2dd4bf",
      accent: "#f2b84b",
      success: "#34d399",
      warning: "#f2b84b",
      danger: "#fb7185",
      focus: "#8b9cff",
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
    id: "138",
    file: "tokens-138.css",
    name: "Tax Compliance",
    category: "Finanse",
    useCase: "Deklaracje podatkowe, VAT, zamknięcia okresów, dokumenty księgowe i audyty fiskalne",
    description: "Formalny system tax compliance z granatowym priorytetem, bordowym akcentem kontroli i neutralną bazą dokumentową.",
    primaryAction: "Zamknij okres",
    secondaryAction: "Pobierz deklarację",
    tags: ["tax", "compliance", "vat"],
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
      accent: "#8a3f4f",
      success: "#23704b",
      warning: "#956111",
      danger: "#a63d40",
      focus: "#23395b",
      shadowRgb: "35 57 91"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Merriweather Sans', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "139",
    file: "tokens-139.css",
    name: "Insurance Claims",
    category: "Finanse",
    useCase: "Obsługa polis, zgłoszenia szkód, wyceny roszczeń, statusy wypłat i ryzyko aktuarialne",
    description: "Spokojny system insurance z morskim CTA, kobaltowym kontekstem polis i wyraźnym akcentem decyzji roszczeń.",
    primaryAction: "Przelicz roszczenie",
    secondaryAction: "Otwórz polisę",
    tags: ["insurance", "claims", "policies"],
    colors: {
      background: "#f3faf8",
      surface: "#ffffff",
      surfaceRaised: "#e2f2ef",
      text: "#142623",
      textMuted: "#58706b",
      border: "#c7ded8",
      primary: "#0f766e",
      primaryHover: "#0a5d57",
      primaryContrast: "#ffffff",
      secondary: "#4058c8",
      accent: "#b35a3a",
      success: "#16865b",
      warning: "#a86518",
      danger: "#b43d4a",
      focus: "#4058c8",
      shadowRgb: "15 118 110"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Manrope', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.375rem", "0.625rem", "0.875rem", "1.125rem"]
  },
  {
    id: "140",
    file: "tokens-140.css",
    name: "Revenue Analytics",
    category: "Finanse",
    useCase: "MRR, ARR, prognozy przychodu, kohorty płatności, churn revenue i dashboardy zarządcze",
    description: "Analityczny system revenue z chłodnym fioletem, zielonym stanem wzrostu i miedzianym akcentem prognozy.",
    primaryAction: "Dodaj forecast",
    secondaryAction: "Porównaj MRR",
    tags: ["revenue", "forecast", "mrr"],
    colors: {
      background: "#faf7fb",
      surface: "#ffffff",
      surfaceRaised: "#f0e8f4",
      text: "#281f2e",
      textMuted: "#70637a",
      border: "#dfd2e5",
      primary: "#7a3f8f",
      primaryHover: "#613171",
      primaryContrast: "#ffffff",
      secondary: "#16736a",
      accent: "#c27a28",
      success: "#23704b",
      warning: "#a86518",
      danger: "#b43d4a",
      focus: "#7a3f8f",
      shadowRgb: "122 63 143"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Sora', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "141",
    file: "tokens-141.css",
    name: "RPG Inventory",
    category: "Gry",
    useCase: "Ekwipunek RPG, karty przedmiotów, statystyki postaci, crafting i nagrody questów",
    description: "Fantazyjny system inventory z ciemnym pergaminowym tłem, złotym CTA i fioletowym akcentem rzadkości itemów.",
    primaryAction: "Wyposaż item",
    secondaryAction: "Porównaj staty",
    tags: ["rpg", "inventory", "items"],
    colors: {
      background: "#17130f",
      surface: "#211b15",
      surfaceRaised: "#2f261c",
      text: "#f5eddc",
      textMuted: "#c2b39d",
      border: "#4a3a28",
      primary: "#d6a84f",
      primaryHover: "#b98a35",
      primaryContrast: "#171006",
      secondary: "#8b5cf6",
      accent: "#58a778",
      success: "#58a778",
      warning: "#d6a84f",
      danger: "#c96060",
      focus: "#d6a84f",
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
    id: "142",
    file: "tokens-142.css",
    name: "Strategy Command",
    category: "Gry",
    useCase: "Gry strategiczne, minimapy, panele zasobów, rozkazy jednostek i stany frakcji",
    description: "Taktyczny system command UI z oliwkową bazą, bursztynowym priorytetem rozkazu i stalowym kontekstem mapy.",
    primaryAction: "Wydaj rozkaz",
    secondaryAction: "Otwórz mapę",
    tags: ["strategy", "command", "resources"],
    colors: {
      background: "#10140f",
      surface: "#181f17",
      surfaceRaised: "#242d21",
      text: "#f0f5e8",
      textMuted: "#aeb9a5",
      border: "#3a4836",
      primary: "#c9a227",
      primaryHover: "#aa841d",
      primaryContrast: "#141006",
      secondary: "#6ea7c8",
      accent: "#7bdc5f",
      success: "#7bdc5f",
      warning: "#c9a227",
      danger: "#e06b6b",
      focus: "#6ea7c8",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Saira Condensed', 'Rajdhani', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.375rem", "0.625rem"]
  },
  {
    id: "143",
    file: "tokens-143.css",
    name: "Puzzle Arcade",
    category: "Gry",
    useCase: "Gry mobilne puzzle, ekrany poziomów, nagrody dzienne, combo i lekkie profile graczy",
    description: "Jasny arcade system z kobaltowym CTA, malinowym akcentem nagrody i tealowym stanem ukończenia poziomu.",
    primaryAction: "Graj poziom",
    secondaryAction: "Odbierz nagrodę",
    tags: ["puzzle", "arcade", "mobile"],
    colors: {
      background: "#f8f7ff",
      surface: "#ffffff",
      surfaceRaised: "#ece9ff",
      text: "#211f35",
      textMuted: "#67617d",
      border: "#d9d3ee",
      primary: "#4f46e5",
      primaryHover: "#3f37b8",
      primaryContrast: "#ffffff",
      secondary: "#0f9f8f",
      accent: "#d93672",
      success: "#16865b",
      warning: "#a86518",
      danger: "#c83f54",
      focus: "#4f46e5",
      shadowRgb: "79 70 229"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Nunito Sans', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.5rem", "0.875rem", "1.125rem", "1.5rem"]
  },
  {
    id: "144",
    file: "tokens-144.css",
    name: "Survival Horror",
    category: "Gry",
    useCase: "Menu horror survival, dzienniki misji, stany zdrowia, zasoby i ostrzeżenia zagrożeń",
    description: "Napięty system survival UI z ciemną czerwienią, ostrym alertem i przygaszonym bursztynem dla ograniczonych zasobów.",
    primaryAction: "Użyj apteczki",
    secondaryAction: "Sprawdź zasoby",
    tags: ["survival", "horror", "resources"],
    colors: {
      background: "#140f11",
      surface: "#1f171a",
      surfaceRaised: "#2d2226",
      text: "#f6eef0",
      textMuted: "#b9adb1",
      border: "#4a363d",
      primary: "#e35b68",
      primaryHover: "#c54450",
      primaryContrast: "#170608",
      secondary: "#b8a35a",
      accent: "#7b8f7b",
      success: "#6fbf8e",
      warning: "#d2a94a",
      danger: "#ff5f6d",
      focus: "#d2a94a",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Rajdhani', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0", "0.125rem", "0.25rem", "0.375rem"]
  },
  {
    id: "145",
    file: "tokens-145.css",
    name: "Sci-Fi HUD",
    category: "Gry",
    useCase: "HUD science-fiction, status statku, radar, energia osłon, misje i telemetria gracza",
    description: "Futurystyczny HUD z granatową bazą, cyjanowym CTA, limonkową telemetrią i ostrym akcentem energii.",
    primaryAction: "Aktywuj osłony",
    secondaryAction: "Otwórz radar",
    tags: ["sci-fi", "hud", "telemetry"],
    colors: {
      background: "#08111f",
      surface: "#101a2b",
      surfaceRaised: "#1b2940",
      text: "#edf7ff",
      textMuted: "#a6b8c9",
      border: "#30455f",
      primary: "#38bdf8",
      primaryHover: "#0ea5e9",
      primaryContrast: "#06111c",
      secondary: "#a3e635",
      accent: "#f472b6",
      success: "#a3e635",
      warning: "#f9c74f",
      danger: "#fb7185",
      focus: "#38bdf8",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Orbitron', 'Rajdhani', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.375rem", "0.625rem"]
  },
  {
    id: "146",
    file: "tokens-146.css",
    name: "Luxury Retail",
    category: "Handel",
    useCase: "Sklepy premium, kolekcje limitowane, lookbooki produktowe i koszyki marek luksusowych",
    description: "Elegancki system retail z ciemną bazą, złotym CTA i stonowanym akcentem dla kolekcji premium.",
    primaryAction: "Dodaj do koszyka",
    secondaryAction: "Zobacz kolekcję",
    tags: ["luxury", "retail", "premium"],
    colors: {
      background: "#121111",
      surface: "#1b1918",
      surfaceRaised: "#282420",
      text: "#f4efe5",
      textMuted: "#b8afa1",
      border: "#3f3932",
      primary: "#c9a96b",
      primaryHover: "#b79253",
      primaryContrast: "#1b1711",
      secondary: "#8e7499",
      accent: "#6aa58f",
      success: "#58a778",
      warning: "#d69d45",
      danger: "#c96060",
      focus: "#c9a96b",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Avenir Next', 'Segoe UI', sans-serif",
      heading: "'Cormorant Garamond', Georgia, serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "147",
    file: "tokens-147.css",
    name: "Grocery Delivery",
    category: "Handel",
    useCase: "Zakupy spożywcze online, koszyki cykliczne, sloty dostaw i promocje produktów codziennych",
    description: "Świeży system grocery commerce z zielonym CTA, pomarańczowym akcentem promocji i czytelnymi kartami produktów.",
    primaryAction: "Dodaj produkt",
    secondaryAction: "Wybierz dostawę",
    tags: ["grocery", "delivery", "basket"],
    colors: {
      background: "#f6faf4",
      surface: "#ffffff",
      surfaceRaised: "#e6f0df",
      text: "#1e2a20",
      textMuted: "#5d6d5f",
      border: "#cfddc8",
      primary: "#327a3d",
      primaryHover: "#255f2f",
      primaryContrast: "#ffffff",
      secondary: "#2d6f93",
      accent: "#d56a2d",
      success: "#2f7a48",
      warning: "#a86518",
      danger: "#b34545",
      focus: "#2d6f93",
      shadowRgb: "50 122 61"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Nunito Sans', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.5rem", "0.75rem", "1rem", "1.375rem"]
  },
  {
    id: "148",
    file: "tokens-148.css",
    name: "Auction Market",
    category: "Handel",
    useCase: "Aukcje online, licytacje live, oferty czasowe, historia bidów i alerty przebicia",
    description: "Dynamiczny system auction commerce z fioletowym priorytetem bidu, czerwonym alertem przebicia i neutralnym tłem ofert.",
    primaryAction: "Złóż ofertę",
    secondaryAction: "Obserwuj aukcję",
    tags: ["auction", "bidding", "offers"],
    colors: {
      background: "#f8f7fc",
      surface: "#ffffff",
      surfaceRaised: "#ece8f6",
      text: "#211f2f",
      textMuted: "#666077",
      border: "#dad3e8",
      primary: "#5b4bb2",
      primaryHover: "#46398c",
      primaryContrast: "#ffffff",
      secondary: "#2f7470",
      accent: "#c24f5d",
      success: "#287a52",
      warning: "#a86518",
      danger: "#b4233a",
      focus: "#5b4bb2",
      shadowRgb: "91 75 178"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Sora', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "149",
    file: "tokens-149.css",
    name: "POS Inventory",
    category: "Handel",
    useCase: "Systemy POS, stany magazynowe, skanowanie produktów, paragony i operacje sklepu stacjonarnego",
    description: "Operacyjny system POS z ciemną konsolą, cyjanowym stanem skanera i zielonym potwierdzeniem sprzedaży.",
    primaryAction: "Skanuj produkt",
    secondaryAction: "Sprawdź magazyn",
    tags: ["pos", "inventory", "store"],
    colors: {
      background: "#0d1414",
      surface: "#141f1f",
      surfaceRaised: "#203030",
      text: "#edf7f5",
      textMuted: "#a8bab5",
      border: "#344a47",
      primary: "#22c7b8",
      primaryHover: "#19a99c",
      primaryContrast: "#041413",
      secondary: "#4ade80",
      accent: "#f2b84b",
      success: "#4ade80",
      warning: "#f2b84b",
      danger: "#fb7185",
      focus: "#22c7b8",
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
    id: "150",
    file: "tokens-150.css",
    name: "Wholesale Orders",
    category: "Handel",
    useCase: "Zamówienia hurtowe, cenniki B2B, limity MOQ, faktury pro forma i akceptacje zakupowe",
    description: "Formalny system wholesale z granatowym CTA, miedzianym akcentem negocjacji i stabilną strukturą tabel zakupowych.",
    primaryAction: "Wyślij zamówienie",
    secondaryAction: "Porównaj cennik",
    tags: ["wholesale", "b2b", "orders"],
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
      secondary: "#0e8a6d",
      accent: "#b06a2c",
      success: "#23704b",
      warning: "#956111",
      danger: "#a63d40",
      focus: "#23395b",
      shadowRgb: "35 57 91"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Libre Franklin', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "151",
    file: "tokens-151.css",
    name: "Travel Companion",
    category: "Konsumenckie",
    useCase: "Planery podróży, listy miejsc, rezerwacje aktywności, checklisty pakowania i mapy wyjazdów",
    description: "Lekki system travel app z niebieskim CTA, piaskowym tłem i ciepłym akcentem odkrywania miejsc.",
    primaryAction: "Dodaj miejsce",
    secondaryAction: "Otwórz plan",
    tags: ["travel", "trips", "places"],
    colors: {
      background: "#f5f9fb",
      surface: "#ffffff",
      surfaceRaised: "#e6f0f5",
      text: "#1a2a32",
      textMuted: "#5f717a",
      border: "#cfdee5",
      primary: "#2f76a3",
      primaryHover: "#245b7f",
      primaryContrast: "#ffffff",
      secondary: "#2f8a72",
      accent: "#c27a28",
      success: "#2f8f64",
      warning: "#a86518",
      danger: "#c84b62",
      focus: "#2f76a3",
      shadowRgb: "47 118 163"
    },
    fonts: {
      sans: "'Nunito Sans', 'Inter', 'Segoe UI', sans-serif",
      heading: "'Poppins', 'Nunito Sans', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.5rem", "0.875rem", "1.125rem", "1.5rem"]
  },
  {
    id: "152",
    file: "tokens-152.css",
    name: "Meal Planner",
    category: "Konsumenckie",
    useCase: "Aplikacje przepisów, planowanie posiłków, listy zakupów, kalendarze gotowania i preferencje diet",
    description: "Ciepły system meal planning z zielonym CTA, pomidorowym akcentem przepisu i miękkimi kartami list zakupów.",
    primaryAction: "Dodaj przepis",
    secondaryAction: "Zaplanuj tydzień",
    tags: ["meals", "recipes", "shopping"],
    colors: {
      background: "#fff8f3",
      surface: "#ffffff",
      surfaceRaised: "#f5eadf",
      text: "#2a211b",
      textMuted: "#71665d",
      border: "#e2d3c5",
      primary: "#3f7a4a",
      primaryHover: "#305e39",
      primaryContrast: "#ffffff",
      secondary: "#d25f3d",
      accent: "#7a62c7",
      success: "#2f8f64",
      warning: "#a86518",
      danger: "#c84b62",
      focus: "#d25f3d",
      shadowRgb: "63 122 74"
    },
    fonts: {
      sans: "'Nunito Sans', 'Inter', 'Segoe UI', sans-serif",
      heading: "'Nunito Sans', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.625rem", "0.875rem", "1.25rem", "1.625rem"]
  },
  {
    id: "153",
    file: "tokens-153.css",
    name: "Media Watchlist",
    category: "Konsumenckie",
    useCase: "Listy filmów i seriali, rekomendacje, oceny użytkowników, kolekcje watchlist i profile gustu",
    description: "Rozrywkowy system konsumencki z ciemną bazą, fioletowym CTA, cyjanowym kontekstem i malinowym akcentem rekomendacji.",
    primaryAction: "Dodaj do listy",
    secondaryAction: "Zobacz rekomendacje",
    tags: ["media", "watchlist", "recommendations"],
    colors: {
      background: "#12101a",
      surface: "#1b1828",
      surfaceRaised: "#272238",
      text: "#f4f1ff",
      textMuted: "#b8b1cc",
      border: "#403856",
      primary: "#9b5cf6",
      primaryHover: "#7f43d6",
      primaryContrast: "#13081f",
      secondary: "#22c7d8",
      accent: "#e0568a",
      success: "#48c774",
      warning: "#f2b84b",
      danger: "#ff5f6d",
      focus: "#22c7d8",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Poppins', 'Nunito Sans', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.375rem", "0.625rem", "0.875rem", "1.125rem"]
  },
  {
    id: "154",
    file: "tokens-154.css",
    name: "Pet Care",
    category: "Konsumenckie",
    useCase: "Aplikacje opieki nad zwierzętami, karmienie, wizyty weterynaryjne, przypomnienia i profile pupili",
    description: "Przyjazny system pet care z tealowym CTA, słonecznym akcentem i miękkimi powierzchniami dla codziennych przypomnień.",
    primaryAction: "Dodaj opiekę",
    secondaryAction: "Otwórz profil",
    tags: ["pets", "care", "reminders"],
    colors: {
      background: "#f4fbf8",
      surface: "#ffffff",
      surfaceRaised: "#e5f3ed",
      text: "#182a24",
      textMuted: "#5e716a",
      border: "#cde1d8",
      primary: "#0f766e",
      primaryHover: "#0a5d57",
      primaryContrast: "#ffffff",
      secondary: "#4f68c7",
      accent: "#d99a2b",
      success: "#2f8f64",
      warning: "#a86518",
      danger: "#c84b62",
      focus: "#4f68c7",
      shadowRgb: "15 118 110"
    },
    fonts: {
      sans: "'Nunito Sans', 'Inter', 'Segoe UI', sans-serif",
      heading: "'Poppins', 'Nunito Sans', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.625rem", "0.875rem", "1.125rem", "1.5rem"]
  },
  {
    id: "155",
    file: "tokens-155.css",
    name: "Mindfulness Space",
    category: "Konsumenckie",
    useCase: "Aplikacje medytacji, oddechu, dzienniki nastroju, rutyny wellness i spokojne widoki progresu",
    description: "Spokojny system mindfulness z lawendową bazą, śliwkowym CTA i tealowym sygnałem ukończenia sesji.",
    primaryAction: "Start sesji",
    secondaryAction: "Zapisz nastrój",
    tags: ["mindfulness", "wellness", "mood"],
    colors: {
      background: "#faf7fb",
      surface: "#ffffff",
      surfaceRaised: "#f0e8f4",
      text: "#281f2e",
      textMuted: "#70637a",
      border: "#dfd2e5",
      primary: "#7a3f8f",
      primaryHover: "#613171",
      primaryContrast: "#ffffff",
      secondary: "#16736a",
      accent: "#c27a28",
      success: "#2f8f64",
      warning: "#a86518",
      danger: "#c84b62",
      focus: "#7a3f8f",
      shadowRgb: "122 63 143"
    },
    fonts: {
      sans: "'Nunito Sans', 'Inter', 'Segoe UI', sans-serif",
      heading: "'Poppins', 'Nunito Sans', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.5rem", "0.75rem", "1rem", "1.375rem"]
  },
  {
    id: "156",
    file: "tokens-156.css",
    name: "Motion Studio",
    category: "Kreatywne",
    useCase: "Timeline animacji, keyframes, render queue, sceny motion design i podgląd wariantów wideo",
    description: "Ciemny system motion design z cyjanowym CTA, fioletową osią czasu i różowym akcentem klatek kluczowych.",
    primaryAction: "Renderuj scenę",
    secondaryAction: "Dodaj keyframe",
    tags: ["motion", "animation", "timeline"],
    colors: {
      background: "#10121b",
      surface: "#181b29",
      surfaceRaised: "#25293a",
      text: "#f2f5ff",
      textMuted: "#abb4c8",
      border: "#3a4054",
      primary: "#38bdf8",
      primaryHover: "#0ea5e9",
      primaryContrast: "#06111c",
      secondary: "#a855f7",
      accent: "#f43f8c",
      success: "#34d399",
      warning: "#f5a524",
      danger: "#fb7185",
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
    id: "157",
    file: "tokens-157.css",
    name: "Photo Editor",
    category: "Kreatywne",
    useCase: "Edycja zdjęć, presety kolorów, warstwy korekcji, kadrowanie i eksport wariantów",
    description: "Jasny system photo editing z kobaltowym priorytetem narzędzi, tealowym balansem i koralowym akcentem presetów.",
    primaryAction: "Zastosuj preset",
    secondaryAction: "Eksportuj zdjęcie",
    tags: ["photo", "editor", "presets"],
    colors: {
      background: "#f7f9fc",
      surface: "#ffffff",
      surfaceRaised: "#e9eef8",
      text: "#1d2430",
      textMuted: "#606c7b",
      border: "#d5dce8",
      primary: "#315fbd",
      primaryHover: "#264a94",
      primaryContrast: "#ffffff",
      secondary: "#0f8f8a",
      accent: "#d66a4a",
      success: "#278353",
      warning: "#a86518",
      danger: "#c73545",
      focus: "#315fbd",
      shadowRgb: "49 95 189"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Manrope', 'Inter', sans-serif",
      mono: "'DM Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "158",
    file: "tokens-158.css",
    name: "Audio Lab",
    category: "Kreatywne",
    useCase: "Podcasty, edycja audio, waveformy, miksy, biblioteki efektów i eksport odcinków",
    description: "Studyjny system audio z ciemną bazą, zielonym sygnałem poziomów, fioletem efektów i bursztynowym akcentem eksportu.",
    primaryAction: "Eksportuj miks",
    secondaryAction: "Dodaj efekt",
    tags: ["audio", "podcast", "waveform"],
    colors: {
      background: "#0d1412",
      surface: "#141f1c",
      surfaceRaised: "#20312d",
      text: "#edf7f2",
      textMuted: "#a7b9b0",
      border: "#334a43",
      primary: "#4ade80",
      primaryHover: "#22c55e",
      primaryContrast: "#06100b",
      secondary: "#9b5cf6",
      accent: "#f59e0b",
      success: "#4ade80",
      warning: "#f59e0b",
      danger: "#fb7185",
      focus: "#9b5cf6",
      shadowRgb: "0 0 0"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Sora', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "159",
    file: "tokens-159.css",
    name: "Brand Kit",
    category: "Kreatywne",
    useCase: "Systemy brandingu, biblioteki logo, palety marek, zasady użycia i review materiałów",
    description: "Formalny system brand kit z neutralnym płótnem, grafitowym CTA i złotym akcentem decyzji wizualnych.",
    primaryAction: "Zatwierdź asset",
    secondaryAction: "Otwórz zasady",
    tags: ["brand", "assets", "guidelines"],
    colors: {
      background: "#f8f7f4",
      surface: "#ffffff",
      surfaceRaised: "#eeebe4",
      text: "#24221f",
      textMuted: "#69645e",
      border: "#dad3c8",
      primary: "#40505c",
      primaryHover: "#303c45",
      primaryContrast: "#ffffff",
      secondary: "#7a4b8f",
      accent: "#b5832f",
      success: "#287a52",
      warning: "#a86518",
      danger: "#a63d40",
      focus: "#40505c",
      shadowRgb: "64 80 92"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Merriweather Sans', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "160",
    file: "tokens-160.css",
    name: "Portfolio Gallery",
    category: "Kreatywne",
    useCase: "Portfolio twórców, galerie case studies, kolekcje prac, showcase projektów i widoki kuratorskie",
    description: "Galerijny system portfolio z jasnym płótnem, śliwkowym CTA, zielonym akcentem publikacji i ciepłym tłem ekspozycji.",
    primaryAction: "Opublikuj pracę",
    secondaryAction: "Dodaj kolekcję",
    tags: ["portfolio", "gallery", "showcase"],
    colors: {
      background: "#faf7f4",
      surface: "#ffffff",
      surfaceRaised: "#f1e8df",
      text: "#2a211d",
      textMuted: "#70645d",
      border: "#dfd2c7",
      primary: "#7a3f6f",
      primaryHover: "#603156",
      primaryContrast: "#ffffff",
      secondary: "#16736a",
      accent: "#c26632",
      success: "#278353",
      warning: "#a86518",
      danger: "#c73545",
      focus: "#7a3f6f",
      shadowRgb: "122 63 111"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Libre Franklin', 'Inter', sans-serif",
      mono: "'DM Mono', Consolas, monospace"
    },
    radius: ["0.375rem", "0.625rem", "0.875rem", "1.125rem"]
  },
  {
    id: "161",
    file: "tokens-161.css",
    name: "Startup Signal",
    category: "Marka",
    useCase: "Marki technologiczne, startupy produktowe, launch pages, brand dashboards i komunikaty beta",
    description: "Nowoczesny system brand tech z kobaltowym CTA, tealowym sygnałem produktu i żywym akcentem premiery.",
    primaryAction: "Uruchom betę",
    secondaryAction: "Zobacz roadmapę",
    tags: ["startup", "tech", "launch"],
    colors: {
      background: "#f6f8ff",
      surface: "#ffffff",
      surfaceRaised: "#e9efff",
      text: "#172033",
      textMuted: "#5d687b",
      border: "#d4ddea",
      primary: "#3155c7",
      primaryHover: "#263f99",
      primaryContrast: "#ffffff",
      secondary: "#0f8f9a",
      accent: "#e0568a",
      success: "#18835a",
      warning: "#b06a00",
      danger: "#c83f54",
      focus: "#3155c7",
      shadowRgb: "49 85 199"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Sora', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.375rem", "0.625rem", "0.875rem", "1.125rem"]
  },
  {
    id: "162",
    file: "tokens-162.css",
    name: "Wellness Brand",
    category: "Marka",
    useCase: "Marki wellness, kosmetyki naturalne, rytuały pielęgnacji i landing page produktów self-care",
    description: "Spokojny system wellness brand z botaniczną zielenią, ciepłym tłem i subtelnym akcentem premium.",
    primaryAction: "Odkryj rytuał",
    secondaryAction: "Zobacz skład",
    tags: ["wellness", "beauty", "ritual"],
    colors: {
      background: "#f7f6f1",
      surface: "#ffffff",
      surfaceRaised: "#ebe7dc",
      text: "#25231e",
      textMuted: "#6b6459",
      border: "#ddd4c3",
      primary: "#456a50",
      primaryHover: "#344f3c",
      primaryContrast: "#ffffff",
      secondary: "#8c6b35",
      accent: "#7a4b8f",
      success: "#2f7a48",
      warning: "#9a6419",
      danger: "#b24646",
      focus: "#456a50",
      shadowRgb: "69 106 80"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Cormorant Garamond', Georgia, serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.875rem", "1.25rem"]
  },
  {
    id: "163",
    file: "tokens-163.css",
    name: "Culture Festival",
    category: "Marka",
    useCase: "Festiwale kultury, wydarzenia muzyczne, identyfikacje sezonowe i strony programu",
    description: "Ekspresyjny system brand event z ciemną sceną, koralowym CTA, cyjanowym światłem i żółtym akcentem programu.",
    primaryAction: "Zobacz program",
    secondaryAction: "Kup bilet",
    tags: ["festival", "event", "culture"],
    colors: {
      background: "#120f1a",
      surface: "#1b1728",
      surfaceRaised: "#282238",
      text: "#f5f1ff",
      textMuted: "#b9afcf",
      border: "#403557",
      primary: "#f05a72",
      primaryHover: "#cf455c",
      primaryContrast: "#18070c",
      secondary: "#22d3ee",
      accent: "#f9c74f",
      success: "#48c774",
      warning: "#f9c74f",
      danger: "#ff5f6d",
      focus: "#22d3ee",
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
    id: "164",
    file: "tokens-164.css",
    name: "Civic Identity",
    category: "Marka",
    useCase: "Identyfikacje miejskie, projekty publiczne, kampanie informacyjne i strony instytucji",
    description: "Publiczny system marki z formalnym niebieskim, zielonym stanem zaufania i mocną strukturą komunikatów.",
    primaryAction: "Zobacz komunikat",
    secondaryAction: "Otwórz usługi",
    tags: ["civic", "identity", "public"],
    colors: {
      background: "#f5f7f9",
      surface: "#ffffff",
      surfaceRaised: "#e8edf2",
      text: "#101820",
      textMuted: "#303a45",
      border: "#d2dae3",
      primary: "#0057b8",
      primaryHover: "#00428d",
      primaryContrast: "#ffffff",
      secondary: "#006b55",
      accent: "#8f4a00",
      success: "#0f7a32",
      warning: "#8f4a00",
      danger: "#b00020",
      focus: "#0057b8",
      shadowRgb: "0 87 184"
    },
    fonts: {
      sans: "'Atkinson Hyperlegible', 'Inter', Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Atkinson Hyperlegible', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0", "0.125rem", "0.25rem", "0.5rem"]
  },
  {
    id: "165",
    file: "tokens-165.css",
    name: "Personal Authority",
    category: "Marka",
    useCase: "Marki osobiste ekspertów, konsultanci premium, strony autorów i oferty doradcze",
    description: "Ekspercki system personal brand z neutralnym papierem, granatowym autorytetem i spokojnym akcentem redakcyjnym.",
    primaryAction: "Umów konsultację",
    secondaryAction: "Czytaj profil",
    tags: ["personal-brand", "expert", "consulting"],
    colors: {
      background: "#f7f7f5",
      surface: "#ffffff",
      surfaceRaised: "#ecebe6",
      text: "#22231f",
      textMuted: "#67665f",
      border: "#d8d6cf",
      primary: "#2f405d",
      primaryHover: "#243146",
      primaryContrast: "#ffffff",
      secondary: "#6f4b5f",
      accent: "#9a6b2f",
      success: "#287a52",
      warning: "#a86518",
      danger: "#a63d40",
      focus: "#2f405d",
      shadowRgb: "47 64 93"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Merriweather Sans', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "166",
    file: "tokens-166.css",
    name: "Urban Development",
    category: "Nieruchomości",
    useCase: "Strony inwestycji deweloperskich, osiedla miejskie, karty etapów budowy i zapisy zainteresowanych",
    description: "Miejski system deweloperski z betonową bazą, granatowym CTA, ceglastym akcentem inwestycji i stabilną hierarchią planów.",
    primaryAction: "Zobacz inwestycję",
    secondaryAction: "Sprawdź etap",
    tags: ["development", "urban", "investment"],
    colors: {
      background: "#f4f5f4",
      surface: "#ffffff",
      surfaceRaised: "#e5e7e6",
      text: "#202625",
      textMuted: "#5f6968",
      border: "#d0d6d4",
      primary: "#21495f",
      primaryHover: "#183749",
      primaryContrast: "#ffffff",
      secondary: "#9a4f32",
      accent: "#4f7a63",
      success: "#287a52",
      warning: "#a86518",
      danger: "#a63d40",
      focus: "#21495f",
      shadowRgb: "33 73 95"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Libre Franklin', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "167",
    file: "tokens-167.css",
    name: "Vacation Rentals",
    category: "Nieruchomości",
    useCase: "Najem krótkoterminowy, apartamenty wakacyjne, kalendarze rezerwacji i galerie lokalizacji",
    description: "Lekki system vacation rental z morskim CTA, słonecznym akcentem ceny i jasnymi kartami dostępności.",
    primaryAction: "Sprawdź termin",
    secondaryAction: "Zobacz apartament",
    tags: ["vacation", "booking", "apartments"],
    colors: {
      background: "#f4fbfd",
      surface: "#ffffff",
      surfaceRaised: "#e3f2f5",
      text: "#162b33",
      textMuted: "#5b7078",
      border: "#cde1e7",
      primary: "#1f7a8c",
      primaryHover: "#185f6d",
      primaryContrast: "#ffffff",
      secondary: "#d07a2d",
      accent: "#4f6fc7",
      success: "#23845a",
      warning: "#a86518",
      danger: "#b23a48",
      focus: "#1f7a8c",
      shadowRgb: "31 122 140"
    },
    fonts: {
      sans: "'Nunito Sans', 'Inter', 'Segoe UI', sans-serif",
      heading: "'Poppins', 'Nunito Sans', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.5rem", "0.75rem", "1rem", "1.375rem"]
  },
  {
    id: "168",
    file: "tokens-168.css",
    name: "Mortgage Portal",
    category: "Nieruchomości",
    useCase: "Kalkulatory hipoteczne, wnioski kredytowe, zdolność zakupowa i porównanie ofert finansowania",
    description: "Zaufany system hipoteczny z bankowym granatem, zielonym statusem akceptacji i neutralną strukturą formularzy.",
    primaryAction: "Oblicz zdolność",
    secondaryAction: "Porównaj oferty",
    tags: ["mortgage", "financing", "calculator"],
    colors: {
      background: "#f5f7fa",
      surface: "#ffffff",
      surfaceRaised: "#e7edf4",
      text: "#17212f",
      textMuted: "#5b6776",
      border: "#d0dae5",
      primary: "#275078",
      primaryHover: "#1d3d5c",
      primaryContrast: "#ffffff",
      secondary: "#23704b",
      accent: "#9a6b2f",
      success: "#1f7a4d",
      warning: "#9a6419",
      danger: "#a63d40",
      focus: "#275078",
      shadowRgb: "39 80 120"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.375rem", "0.625rem", "0.875rem"]
  },
  {
    id: "169",
    file: "tokens-169.css",
    name: "Property Map",
    category: "Nieruchomości",
    useCase: "Mapy ofert, wyszukiwarki lokalizacji, warstwy dzielnic i porównanie punktów zainteresowania",
    description: "Ciemny system mapowy z nocną bazą, zielonym sygnałem lokalizacji i cyjanowym akcentem warstw danych.",
    primaryAction: "Pokaż na mapie",
    secondaryAction: "Filtruj okolice",
    tags: ["map", "search", "location"],
    colors: {
      background: "#0d1518",
      surface: "#142024",
      surfaceRaised: "#203034",
      text: "#edf7f8",
      textMuted: "#a6b8ba",
      border: "#33494e",
      primary: "#4ade80",
      primaryHover: "#22c55e",
      primaryContrast: "#06130b",
      secondary: "#38bdf8",
      accent: "#f2b84b",
      success: "#4ade80",
      warning: "#f2b84b",
      danger: "#fb7185",
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
    id: "170",
    file: "tokens-170.css",
    name: "Smart Home Estate",
    category: "Nieruchomości",
    useCase: "Proptech, inteligentne budynki, monitoring energii, kontrola dostępu i panele mieszkańca",
    description: "Nowoczesny system proptech z chłodną bazą, indygowym priorytetem, tealowym statusem urządzeń i fioletowym akcentem automatyzacji.",
    primaryAction: "Otwórz panel",
    secondaryAction: "Sprawdź urządzenia",
    tags: ["proptech", "smart-home", "energy"],
    colors: {
      background: "#f6f8fc",
      surface: "#ffffff",
      surfaceRaised: "#e9eef8",
      text: "#182033",
      textMuted: "#5f687b",
      border: "#d5ddeb",
      primary: "#3f5fb8",
      primaryHover: "#31498f",
      primaryContrast: "#ffffff",
      secondary: "#0f8f8a",
      accent: "#7a4bd8",
      success: "#18835a",
      warning: "#b06a00",
      danger: "#c83f54",
      focus: "#3f5fb8",
      shadowRgb: "63 95 184"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Sora', 'Inter', sans-serif",
      mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace"
    },
    radius: ["0.375rem", "0.625rem", "0.875rem", "1.125rem"]
  },
  {
    id: "171",
    file: "tokens-171.css",
    name: "Deep Work",
    category: "Produktywność",
    useCase: "Tryby skupienia, sesje pracy głębokiej, listy priorytetów i widoki bez rozpraszaczy",
    description: "Cichy system deep work z kremową bazą, leśnym CTA, niskoszumową hierarchią i bursztynowym akcentem celu.",
    primaryAction: "Start sesji",
    secondaryAction: "Ustaw cel",
    tags: ["deep-work", "focus", "priorities"],
    colors: {
      background: "#f8f7f2",
      surface: "#ffffff",
      surfaceRaised: "#ede9df",
      text: "#24231f",
      textMuted: "#67645d",
      border: "#dcd6ca",
      primary: "#355f47",
      primaryHover: "#284936",
      primaryContrast: "#ffffff",
      secondary: "#7a5d35",
      accent: "#3f6f8f",
      success: "#287a52",
      warning: "#a86518",
      danger: "#a63d40",
      focus: "#355f47",
      shadowRgb: "53 95 71"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Merriweather Sans', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "172",
    file: "tokens-172.css",
    name: "Calendar Command",
    category: "Produktywność",
    useCase: "Kalendarze zespołowe, rezerwacje czasu, widoki tygodnia, konflikty spotkań i bloki pracy",
    description: "Precyzyjny system kalendarza z jasną bazą, granatowym CTA, cyjanowym stanem dostępności i pomarańczowym alertem konfliktu.",
    primaryAction: "Dodaj blok",
    secondaryAction: "Sprawdź konflikt",
    tags: ["calendar", "scheduling", "time-blocking"],
    colors: {
      background: "#f5f8fb",
      surface: "#ffffff",
      surfaceRaised: "#e6eef6",
      text: "#172332",
      textMuted: "#5d6a79",
      border: "#d0dce8",
      primary: "#284f7a",
      primaryHover: "#1f3c5d",
      primaryContrast: "#ffffff",
      secondary: "#0f8f9a",
      accent: "#c66a2e",
      success: "#23845a",
      warning: "#a86518",
      danger: "#b23a48",
      focus: "#0f8f9a",
      shadowRgb: "40 79 122"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.375rem", "0.625rem", "0.875rem"]
  },
  {
    id: "173",
    file: "tokens-173.css",
    name: "Knowledge Sprint",
    category: "Produktywność",
    useCase: "Notatki projektowe, sprinty wiedzy, research backlog, decyzje robocze i szybkie syntezy",
    description: "System produktywności wiedzy z lawendowym tłem, śliwkowym CTA, tealowym balansem i czytelnymi blokami notatek.",
    primaryAction: "Dodaj notatkę",
    secondaryAction: "Zbuduj syntezę",
    tags: ["notes", "research", "knowledge"],
    colors: {
      background: "#f8f6fc",
      surface: "#ffffff",
      surfaceRaised: "#eee8f6",
      text: "#241f2f",
      textMuted: "#696177",
      border: "#ddd5e8",
      primary: "#6a4bb2",
      primaryHover: "#51398c",
      primaryContrast: "#ffffff",
      secondary: "#2f7470",
      accent: "#b06a2c",
      success: "#287a52",
      warning: "#a86518",
      danger: "#b43d4a",
      focus: "#6a4bb2",
      shadowRgb: "106 75 178"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Sora', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.375rem", "0.625rem", "0.875rem", "1.125rem"]
  },
  {
    id: "174",
    file: "tokens-174.css",
    name: "Automation Desk",
    category: "Produktywność",
    useCase: "Automatyzacje pracy, reguły procesów, integracje narzędzi, kolejki zadań i statusy uruchomień",
    description: "Techniczny system automatyzacji z ciemnym pulpitem, zielonym CTA uruchomienia, fioletem integracji i żółtym stanem kolejki.",
    primaryAction: "Uruchom regułę",
    secondaryAction: "Zobacz kolejkę",
    tags: ["automation", "rules", "integrations"],
    colors: {
      background: "#0d1412",
      surface: "#141f1c",
      surfaceRaised: "#20312d",
      text: "#edf7f2",
      textMuted: "#a7b9b0",
      border: "#334a43",
      primary: "#4ade80",
      primaryHover: "#22c55e",
      primaryContrast: "#06100b",
      secondary: "#9b5cf6",
      accent: "#f59e0b",
      success: "#4ade80",
      warning: "#f59e0b",
      danger: "#fb7185",
      focus: "#9b5cf6",
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
    id: "175",
    file: "tokens-175.css",
    name: "Personal Kanban",
    category: "Produktywność",
    useCase: "Osobiste tablice kanban, nawyki, proste backlogi, checklisty i tygodniowe przeglądy",
    description: "Przyjazny system osobistego kanbana z miękkim błękitem, koralowym CTA i zielonym stanem ukończenia.",
    primaryAction: "Dodaj kartę",
    secondaryAction: "Przegląd tygodnia",
    tags: ["kanban", "personal", "habits"],
    colors: {
      background: "#f6fbff",
      surface: "#ffffff",
      surfaceRaised: "#e8f4fb",
      text: "#20303d",
      textMuted: "#62717d",
      border: "#d1e2eb",
      primary: "#b94646",
      primaryHover: "#963838",
      primaryContrast: "#ffffff",
      secondary: "#326f90",
      accent: "#58a06b",
      success: "#2f8f64",
      warning: "#b86d0e",
      danger: "#c84b62",
      focus: "#326f90",
      shadowRgb: "185 70 70"
    },
    fonts: {
      sans: "'Nunito Sans', 'Inter', 'Segoe UI', sans-serif",
      heading: "'Poppins', 'Nunito Sans', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.5rem", "0.875rem", "1.125rem", "1.5rem"]
  },
  {
    id: "176",
    file: "tokens-176.css",
    name: "Billing Console",
    category: "SaaS",
    useCase: "Fakturowanie SaaS, plany subskrypcji, usage-based billing, limity produktów i rozliczenia klientów",
    description: "Finansowy system SaaS z zielonym CTA rozliczeń, granatowym kontekstem planów i stabilną strukturą tabel billingowych.",
    primaryAction: "Wystaw fakturę",
    secondaryAction: "Zobacz plany",
    tags: ["billing", "subscriptions", "usage"],
    colors: {
      background: "#f7f8f4",
      surface: "#ffffff",
      surfaceRaised: "#ebeede",
      text: "#20251e",
      textMuted: "#626b5e",
      border: "#d5dccb",
      primary: "#356b4f",
      primaryHover: "#28533c",
      primaryContrast: "#ffffff",
      secondary: "#2f5f9f",
      accent: "#a66a22",
      success: "#287a52",
      warning: "#a86518",
      danger: "#b23a48",
      focus: "#356b4f",
      shadowRgb: "53 107 79"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.375rem", "0.625rem", "0.875rem"]
  },
  {
    id: "177",
    file: "tokens-177.css",
    name: "Onboarding Flow",
    category: "SaaS",
    useCase: "Self-serve onboarding, checklisty aktywacji, kreatory konfiguracji i ścieżki pierwszego sukcesu",
    description: "Aktywacyjny system SaaS z lawendową bazą, fioletowym CTA, tealowym stanem ukończenia i przyjaznym rytmem kroków.",
    primaryAction: "Kontynuuj setup",
    secondaryAction: "Pomiń krok",
    tags: ["onboarding", "activation", "setup"],
    colors: {
      background: "#f7f6ff",
      surface: "#ffffff",
      surfaceRaised: "#ece9ff",
      text: "#211f33",
      textMuted: "#66617a",
      border: "#d8d2ee",
      primary: "#6a4bd8",
      primaryHover: "#5338b2",
      primaryContrast: "#ffffff",
      secondary: "#0f8f8a",
      accent: "#d86a4a",
      success: "#18835a",
      warning: "#a86518",
      danger: "#c83f54",
      focus: "#6a4bd8",
      shadowRgb: "106 75 216"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Sora', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.375rem", "0.625rem", "0.875rem", "1.125rem"]
  },
  {
    id: "178",
    file: "tokens-178.css",
    name: "Enterprise Admin",
    category: "SaaS",
    useCase: "Panele organizacji B2B, role i uprawnienia, audit log, workspace settings i kontrola dostępu",
    description: "Formalny system enterprise SaaS z grafitowo-granatowym CTA, zielonym stanem dostępu i miedzianym akcentem audytu.",
    primaryAction: "Nadaj dostęp",
    secondaryAction: "Otwórz audit",
    tags: ["enterprise", "admin", "permissions"],
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
      secondary: "#0e8a6d",
      accent: "#8c5d2f",
      success: "#23704b",
      warning: "#956111",
      danger: "#a63d40",
      focus: "#23395b",
      shadowRgb: "35 57 91"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Merriweather Sans', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "179",
    file: "tokens-179.css",
    name: "Collaboration Hub",
    category: "SaaS",
    useCase: "Workspace zespołowy, komentarze, udostępnione dokumenty, powiadomienia i aktywność projektowa",
    description: "Zespołowy system SaaS z tealowym CTA współpracy, indygowym kontekstem notyfikacji i ciepłym akcentem aktywności.",
    primaryAction: "Zaproś zespół",
    secondaryAction: "Otwórz wątek",
    tags: ["collaboration", "workspace", "comments"],
    colors: {
      background: "#f4fbfa",
      surface: "#ffffff",
      surfaceRaised: "#e2f1ef",
      text: "#1a302d",
      textMuted: "#5b706d",
      border: "#c9dfdc",
      primary: "#167a72",
      primaryHover: "#105d57",
      primaryContrast: "#ffffff",
      secondary: "#4867d6",
      accent: "#c05f3a",
      success: "#287a52",
      warning: "#a86518",
      danger: "#b43d4a",
      focus: "#4867d6",
      shadowRgb: "22 122 114"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Manrope', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.375rem", "0.625rem", "0.875rem", "1.125rem"]
  },
  {
    id: "180",
    file: "tokens-180.css",
    name: "API Platform",
    category: "SaaS",
    useCase: "Developer SaaS, klucze API, webhooks, limity requestów, status usług i dokumentacja integracji",
    description: "Techniczny system API SaaS z ciemnym control plane, cyjanowym CTA, zielonym statusem usług i żółtym akcentem limitów.",
    primaryAction: "Wygeneruj klucz",
    secondaryAction: "Zobacz webhooks",
    tags: ["api", "developer", "webhooks"],
    colors: {
      background: "#0b1118",
      surface: "#121a24",
      surfaceRaised: "#1d2633",
      text: "#edf4fb",
      textMuted: "#a6b4c3",
      border: "#314052",
      primary: "#38bdf8",
      primaryHover: "#0ea5e9",
      primaryContrast: "#06111c",
      secondary: "#4ade80",
      accent: "#f59e0b",
      success: "#4ade80",
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
    radius: ["0.125rem", "0.25rem", "0.375rem", "0.625rem"]
  },
  {
    id: "181",
    file: "tokens-181.css",
    name: "Community Forum",
    category: "Społeczne",
    useCase: "Fora lokalne, grupy mieszkańców, dyskusje społecznościowe, wydarzenia osiedlowe i ogłoszenia sąsiedzkie",
    description: "Przyjazny system społecznościowy z jasnym błękitem, granatowym CTA, koralowym akcentem wydarzeń i czytelną strukturą wątków.",
    primaryAction: "Dodaj wątek",
    secondaryAction: "Zobacz wydarzenia",
    tags: ["community", "forum", "local"],
    colors: {
      background: "#f5fbff",
      surface: "#ffffff",
      surfaceRaised: "#e8f3fb",
      text: "#1a2c36",
      textMuted: "#5d707a",
      border: "#cfe0e9",
      primary: "#2f6f90",
      primaryHover: "#255671",
      primaryContrast: "#ffffff",
      secondary: "#d45d3f",
      accent: "#3f8a62",
      success: "#2f8f64",
      warning: "#b86d0e",
      danger: "#c83f66",
      focus: "#2f6f90",
      shadowRgb: "47 111 144"
    },
    fonts: {
      sans: "'Nunito Sans', 'Inter', 'Segoe UI', sans-serif",
      heading: "'Poppins', 'Nunito Sans', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.5rem", "0.875rem", "1.125rem", "1.5rem"]
  },
  {
    id: "182",
    file: "tokens-182.css",
    name: "Crisis Response",
    category: "Społeczne",
    useCase: "Centra pomocy kryzysowej, dystrybucja zasobów, alerty terenowe, mapy potrzeb i szybka koordynacja wsparcia",
    description: "Ciemny system reagowania kryzysowego z mocnym koralowym CTA, cyjanowym kanałem operacyjnym i żółtym akcentem pilności.",
    primaryAction: "Zgłoś potrzebę",
    secondaryAction: "Otwórz mapę",
    tags: ["crisis", "response", "aid"],
    colors: {
      background: "#0f1218",
      surface: "#181d26",
      surfaceRaised: "#242b36",
      text: "#f2f5f8",
      textMuted: "#aeb7c2",
      border: "#384352",
      primary: "#ff6b4a",
      primaryHover: "#e05537",
      primaryContrast: "#160703",
      secondary: "#38bdf8",
      accent: "#f9c74f",
      success: "#4ade80",
      warning: "#f9c74f",
      danger: "#fb7185",
      focus: "#ff6b4a",
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
    id: "183",
    file: "tokens-183.css",
    name: "Social Services",
    category: "Społeczne",
    useCase: "Usługi społeczne, prowadzenie spraw, wizyty terenowe, świadczenia, formularze wsparcia i statusy opieki",
    description: "Formalny system usług społecznych z tealowym CTA, urzędowym granatem i ciepłym akcentem spraw wymagających uwagi.",
    primaryAction: "Dodaj sprawę",
    secondaryAction: "Sprawdź status",
    tags: ["services", "casework", "support"],
    colors: {
      background: "#f6f8f7",
      surface: "#ffffff",
      surfaceRaised: "#e7eeeb",
      text: "#182421",
      textMuted: "#5f6d68",
      border: "#d1ddd8",
      primary: "#0f6b5c",
      primaryHover: "#0a5146",
      primaryContrast: "#ffffff",
      secondary: "#315f8f",
      accent: "#8f5a2a",
      success: "#23704b",
      warning: "#956111",
      danger: "#a63d40",
      focus: "#0f6b5c",
      shadowRgb: "15 107 92"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "184",
    file: "tokens-184.css",
    name: "Advocacy Campaign",
    category: "Społeczne",
    useCase: "Kampanie rzecznicze, petycje, akcje mobilizacyjne, strony manifestów i ścieżki zaangażowania społecznego",
    description: "Ekspresyjny system kampanii społecznych z malinowym CTA, jasnym różowym tłem i granatowym kontekstem argumentów.",
    primaryAction: "Podpisz petycję",
    secondaryAction: "Udostępnij akcję",
    tags: ["advocacy", "petition", "campaign"],
    colors: {
      background: "#fff5f8",
      surface: "#ffffff",
      surfaceRaised: "#f6e4ec",
      text: "#2b1d24",
      textMuted: "#765d68",
      border: "#e5cbd6",
      primary: "#b4235a",
      primaryHover: "#8f1b47",
      primaryContrast: "#ffffff",
      secondary: "#315f8f",
      accent: "#d98a2b",
      success: "#287a52",
      warning: "#a86518",
      danger: "#b4233a",
      focus: "#b4235a",
      shadowRgb: "180 35 90"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Libre Franklin', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "185",
    file: "tokens-185.css",
    name: "Impact Dashboard",
    category: "Społeczne",
    useCase: "Raportowanie wpływu, dashboardy NGO, wskaźniki programów, efekty interwencji i transparentność finansowania",
    description: "Analityczny system społeczny z granatowym CTA raportowym, zielonym statusem wpływu i fioletowym akcentem segmentów.",
    primaryAction: "Otwórz raport",
    secondaryAction: "Porównaj wpływ",
    tags: ["impact", "reporting", "ngo"],
    colors: {
      background: "#f5f8fb",
      surface: "#ffffff",
      surfaceRaised: "#e7eef5",
      text: "#17212f",
      textMuted: "#5b6675",
      border: "#d0dae4",
      primary: "#255f7f",
      primaryHover: "#1c4961",
      primaryContrast: "#ffffff",
      secondary: "#2f8f64",
      accent: "#7a5ab6",
      success: "#287a52",
      warning: "#a86518",
      danger: "#b23a48",
      focus: "#255f7f",
      shadowRgb: "37 95 127"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Sora', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.375rem", "0.625rem", "0.875rem"]
  },
  {
    id: "186",
    file: "tokens-186.css",
    name: "Newsletter Studio",
    category: "Treści",
    useCase: "Newslettery, edycja wydań, segmenty odbiorców, formularze zapisu i landing page subskrypcji",
    description: "Ciepły system newsletterowy z pomarańczowym CTA wysyłki, tealowym balansem segmentów i miękkimi kartami wydań.",
    primaryAction: "Wyślij wydanie",
    secondaryAction: "Zobacz listę",
    tags: ["newsletter", "publishing", "subscribers"],
    colors: {
      background: "#fff8f3",
      surface: "#ffffff",
      surfaceRaised: "#f4eadf",
      text: "#2a211b",
      textMuted: "#71665d",
      border: "#e2d3c5",
      primary: "#a9552f",
      primaryHover: "#874325",
      primaryContrast: "#ffffff",
      secondary: "#2d8478",
      accent: "#5f6fd6",
      success: "#287a52",
      warning: "#a86518",
      danger: "#b23a48",
      focus: "#2d8478",
      shadowRgb: "169 85 47"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Libre Franklin', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.375rem", "0.625rem", "0.875rem", "1.125rem"]
  },
  {
    id: "187",
    file: "tokens-187.css",
    name: "Research Library",
    category: "Treści",
    useCase: "Biblioteki badań, repozytoria raportów, cytowania, notatki źródłowe i katalogi publikacji eksperckich",
    description: "Akademicki system treści z zielonkawą bazą, tealowym CTA katalogu, granatowym kontekstem metadanych i stabilną strukturą cytowań.",
    primaryAction: "Dodaj źródło",
    secondaryAction: "Eksportuj cytat",
    tags: ["research", "library", "citations"],
    colors: {
      background: "#f5f8f7",
      surface: "#ffffff",
      surfaceRaised: "#e6efec",
      text: "#172421",
      textMuted: "#5d6d68",
      border: "#cfded8",
      primary: "#0f6b5c",
      primaryHover: "#0a5146",
      primaryContrast: "#ffffff",
      secondary: "#315f8f",
      accent: "#8f5a2a",
      success: "#23704b",
      warning: "#956111",
      danger: "#a63d40",
      focus: "#0f6b5c",
      shadowRgb: "15 107 92"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Source Sans 3', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "188",
    file: "tokens-188.css",
    name: "Media Portal",
    category: "Treści",
    useCase: "Portale multimedialne, huby wideo, strony programów, playlisty artykułów i kolekcje materiałów premium",
    description: "Ciemny system portalu media z malinowym CTA, cyjanowym kontekstem odtwarzania i żółtym akcentem wyróżnionych materiałów.",
    primaryAction: "Odtwórz materiał",
    secondaryAction: "Zobacz serię",
    tags: ["media", "video", "portal"],
    colors: {
      background: "#11131a",
      surface: "#1a1d27",
      surfaceRaised: "#262b38",
      text: "#f3f5fb",
      textMuted: "#acb3c4",
      border: "#3b4254",
      primary: "#f05a72",
      primaryHover: "#cf455c",
      primaryContrast: "#18070c",
      secondary: "#38bdf8",
      accent: "#f9c74f",
      success: "#4ade80",
      warning: "#f9c74f",
      danger: "#fb7185",
      focus: "#38bdf8",
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
    id: "189",
    file: "tokens-189.css",
    name: "Help Center",
    category: "Treści",
    useCase: "Centra pomocy, artykuły supportowe, ścieżki rozwiązywania problemów, wyszukiwarki FAQ i statusy odpowiedzi",
    description: "Wysokoczytelny system help center z oficjalnym niebieskim CTA, mocnym tekstem i prostą strukturą odpowiedzi.",
    primaryAction: "Znajdź odpowiedź",
    secondaryAction: "Zgłoś problem",
    tags: ["help center", "faq", "support"],
    colors: {
      background: "#ffffff",
      surface: "#ffffff",
      surfaceRaised: "#f2f4f7",
      text: "#111111",
      textMuted: "#333333",
      border: "#c7ced8",
      primary: "#003a8c",
      primaryHover: "#002b66",
      primaryContrast: "#ffffff",
      secondary: "#006b5b",
      accent: "#8f4a00",
      success: "#0f7a32",
      warning: "#8f4a00",
      danger: "#b00020",
      focus: "#003a8c",
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
    id: "190",
    file: "tokens-190.css",
    name: "Storytelling Canvas",
    category: "Treści",
    useCase: "Reportaże interaktywne, historie marek, case studies, narracje produktowe i strony longform",
    description: "Narracyjny system longform z lawendową bazą, śliwkowym CTA, tealowym balansem sekcji i ciepłym akcentem rozdziałów.",
    primaryAction: "Czytaj historię",
    secondaryAction: "Zobacz rozdziały",
    tags: ["storytelling", "longform", "case-study"],
    colors: {
      background: "#faf7fb",
      surface: "#ffffff",
      surfaceRaised: "#f0e8f4",
      text: "#281f2e",
      textMuted: "#70637a",
      border: "#dfd2e5",
      primary: "#7a3f8f",
      primaryHover: "#613171",
      primaryContrast: "#ffffff",
      secondary: "#16736a",
      accent: "#c27a28",
      success: "#2f8f64",
      warning: "#a86518",
      danger: "#c84b62",
      focus: "#7a3f8f",
      shadowRgb: "122 63 143"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Fraunces', Georgia, 'Times New Roman', serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.875rem", "1.25rem"]
  },
  {
    id: "191",
    file: "tokens-191.css",
    name: "Mental Health",
    category: "Zdrowie",
    useCase: "Aplikacje wsparcia psychicznego, dzienniki nastroju, sesje terapeutyczne, ćwiczenia oddechowe i check-iny dobrostanu",
    description: "Spokojny system mental health z lawendową bazą, śliwkowym CTA, tealowym balansem i ciepłym akcentem nastroju.",
    primaryAction: "Zapisz nastrój",
    secondaryAction: "Start ćwiczenia",
    tags: ["mental-health", "mood", "therapy"],
    colors: {
      background: "#faf7fb",
      surface: "#ffffff",
      surfaceRaised: "#f0e8f4",
      text: "#281f2e",
      textMuted: "#70637a",
      border: "#dfd2e5",
      primary: "#7a3f8f",
      primaryHover: "#613171",
      primaryContrast: "#ffffff",
      secondary: "#16736a",
      accent: "#c27a28",
      success: "#2f8f64",
      warning: "#a86518",
      danger: "#c84b62",
      focus: "#7a3f8f",
      shadowRgb: "122 63 143"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Manrope', 'Inter', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.5rem", "0.75rem", "1rem", "1.375rem"]
  },
  {
    id: "192",
    file: "tokens-192.css",
    name: "Pharmacy Care",
    category: "Zdrowie",
    useCase: "Apteki online, recepty, harmonogram leków, interakcje preparatów i powiadomienia o dawkowaniu",
    description: "Farmaceutyczny system zdrowia z granatowym CTA recept, tealowym statusem dostępności i bursztynowym akcentem dawki.",
    primaryAction: "Dodaj receptę",
    secondaryAction: "Sprawdź dawkowanie",
    tags: ["pharmacy", "prescriptions", "medication"],
    colors: {
      background: "#f5f8fb",
      surface: "#ffffff",
      surfaceRaised: "#e7eef5",
      text: "#17212f",
      textMuted: "#5b6675",
      border: "#d0dae4",
      primary: "#255f7f",
      primaryHover: "#1c4961",
      primaryContrast: "#ffffff",
      secondary: "#0f8f78",
      accent: "#a86518",
      success: "#23704b",
      warning: "#a86518",
      danger: "#b23a48",
      focus: "#255f7f",
      shadowRgb: "37 95 127"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.375rem", "0.625rem", "0.875rem"]
  },
  {
    id: "193",
    file: "tokens-193.css",
    name: "Lab Diagnostics",
    category: "Zdrowie",
    useCase: "Wyniki badań, panele laboratoryjne, statusy próbek, zakresy referencyjne i ścieżki diagnostyczne",
    description: "Techniczny system diagnostyczny z ciemnym tłem, cyjanowym CTA wyników, zielonym statusem próbki i żółtym akcentem odchyleń.",
    primaryAction: "Otwórz wyniki",
    secondaryAction: "Porównaj próbki",
    tags: ["lab", "diagnostics", "results"],
    colors: {
      background: "#0b1118",
      surface: "#121a24",
      surfaceRaised: "#1d2633",
      text: "#edf4fb",
      textMuted: "#a6b4c3",
      border: "#314052",
      primary: "#38bdf8",
      primaryHover: "#0ea5e9",
      primaryContrast: "#06111c",
      secondary: "#4ade80",
      accent: "#f59e0b",
      success: "#4ade80",
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
    radius: ["0.125rem", "0.25rem", "0.375rem", "0.625rem"]
  },
  {
    id: "194",
    file: "tokens-194.css",
    name: "Rehabilitation Plan",
    category: "Zdrowie",
    useCase: "Fizjoterapia, plany ćwiczeń, progres rehabilitacji, wizyty kontrolne i zalecenia domowe",
    description: "Aktywny system rehabilitacji z ciepłą bazą, miedzianym CTA ćwiczeń, zielonym postępem i błękitnym kontekstem sesji.",
    primaryAction: "Dodaj ćwiczenie",
    secondaryAction: "Zobacz progres",
    tags: ["rehab", "physio", "recovery"],
    colors: {
      background: "#fff8f3",
      surface: "#ffffff",
      surfaceRaised: "#f5eadf",
      text: "#2a211b",
      textMuted: "#71665d",
      border: "#e2d3c5",
      primary: "#a9552f",
      primaryHover: "#874325",
      primaryContrast: "#ffffff",
      secondary: "#2f8a72",
      accent: "#4f68c7",
      success: "#2f8f64",
      warning: "#a86518",
      danger: "#c84b62",
      focus: "#2f8a72",
      shadowRgb: "169 85 47"
    },
    fonts: {
      sans: "'Nunito Sans', 'Inter', 'Segoe UI', sans-serif",
      heading: "'Poppins', 'Nunito Sans', sans-serif",
      mono: "'Roboto Mono', Consolas, monospace"
    },
    radius: ["0.5rem", "0.875rem", "1.125rem", "1.5rem"]
  },
  {
    id: "195",
    file: "tokens-195.css",
    name: "Maternal Care",
    category: "Zdrowie",
    useCase: "Opieka okołoporodowa, harmonogram badań, konsultacje położnicze, monitorowanie objawów i edukacja pacjentek",
    description: "Delikatny system opieki okołoporodowej z jasnym różem, malinowym CTA, tealowym statusem wizyt i ciepłym akcentem edukacji.",
    primaryAction: "Umów kontrolę",
    secondaryAction: "Zobacz zalecenia",
    tags: ["maternal", "care", "appointments"],
    colors: {
      background: "#fff6fb",
      surface: "#ffffff",
      surfaceRaised: "#f6e7f0",
      text: "#2b1d26",
      textMuted: "#735e68",
      border: "#e5ced9",
      primary: "#a93f6f",
      primaryHover: "#843156",
      primaryContrast: "#ffffff",
      secondary: "#16736a",
      accent: "#c27a28",
      success: "#287a52",
      warning: "#a86518",
      danger: "#b23a48",
      focus: "#a93f6f",
      shadowRgb: "169 63 111"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Sora', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.375rem", "0.625rem", "0.875rem", "1.125rem"]
  },
  {
    id: "196",
    file: "tokens-196.css",
    name: "Regenerative Agriculture",
    category: "Zrównoważony rozwój",
    useCase: "Rolnictwo regeneracyjne, zdrowie gleby, monitoring upraw, raporty gospodarstw i programy odtworzenia ekosystemów",
    description: "Naturalny system agro sustainability z ciepłą bazą gleby, leśnym CTA, ziemistym akcentem zasobów i błękitnym kontekstem danych.",
    primaryAction: "Dodaj pomiar gleby",
    secondaryAction: "Zobacz pola",
    tags: ["agriculture", "soil", "regeneration"],
    colors: {
      background: "#f7f6ef",
      surface: "#ffffff",
      surfaceRaised: "#ede6d8",
      text: "#24231e",
      textMuted: "#6a655c",
      border: "#ddd3c4",
      primary: "#3f6f4f",
      primaryHover: "#30553c",
      primaryContrast: "#ffffff",
      secondary: "#7a5b2e",
      accent: "#2f6f93",
      success: "#2f7a48",
      warning: "#a86518",
      danger: "#a63d40",
      focus: "#3f6f4f",
      shadowRgb: "63 111 79"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Libre Franklin', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.5rem", "0.75rem", "1rem"]
  },
  {
    id: "197",
    file: "tokens-197.css",
    name: "Water Stewardship",
    category: "Zrównoważony rozwój",
    useCase: "Zużycie wody, retencja, monitoring oszczędności, programy ochrony zasobów i dashboardy infrastruktury wodnej",
    description: "Wodny system sustainability z jasnym błękitem, morskim CTA, tealowym statusem retencji i indygowym akcentem infrastruktury.",
    primaryAction: "Sprawdź retencję",
    secondaryAction: "Porównaj zużycie",
    tags: ["water", "retention", "resources"],
    colors: {
      background: "#f3fbfd",
      surface: "#ffffff",
      surfaceRaised: "#e2f2f6",
      text: "#142a32",
      textMuted: "#5a7078",
      border: "#c9e0e7",
      primary: "#1f7a8c",
      primaryHover: "#185f6d",
      primaryContrast: "#ffffff",
      secondary: "#0f8f78",
      accent: "#4f68c7",
      success: "#23845a",
      warning: "#a86518",
      danger: "#b23a48",
      focus: "#1f7a8c",
      shadowRgb: "31 122 140"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.25rem", "0.375rem", "0.625rem", "0.875rem"]
  },
  {
    id: "198",
    file: "tokens-198.css",
    name: "Clean Mobility",
    category: "Zrównoważony rozwój",
    useCase: "Floty elektryczne, ślad tras, ładowanie pojazdów, optymalizacja przejazdów i raporty redukcji emisji",
    description: "Ciemny system clean mobility z tealowym CTA ładowania, zielonym statusem energii i żółtym akcentem zasięgu.",
    primaryAction: "Zaplanuj ładowanie",
    secondaryAction: "Zobacz trasy",
    tags: ["mobility", "ev", "routes"],
    colors: {
      background: "#0d1414",
      surface: "#141f1f",
      surfaceRaised: "#203030",
      text: "#edf7f5",
      textMuted: "#a8bab5",
      border: "#344a47",
      primary: "#22c7b8",
      primaryHover: "#19a99c",
      primaryContrast: "#041413",
      secondary: "#4ade80",
      accent: "#f2b84b",
      success: "#4ade80",
      warning: "#f2b84b",
      danger: "#fb7185",
      focus: "#22c7b8",
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
    id: "199",
    file: "tokens-199.css",
    name: "Waste Recovery",
    category: "Zrównoważony rozwój",
    useCase: "Odzysk odpadów, recykling materiałów, sortowanie strumieni, logistyka odbioru i wskaźniki ponownego użycia",
    description: "Przemysłowy system odzysku z neutralnym tłem, tealowym CTA operacji, oliwkowym kontekstem materiałów i miedzianym akcentem sortowania.",
    primaryAction: "Dodaj strumień",
    secondaryAction: "Zobacz odzysk",
    tags: ["waste", "recycling", "materials"],
    colors: {
      background: "#f7f7f3",
      surface: "#ffffff",
      surfaceRaised: "#e9e8de",
      text: "#22251f",
      textMuted: "#676a60",
      border: "#d6d5ca",
      primary: "#2f7470",
      primaryHover: "#245a56",
      primaryContrast: "#ffffff",
      secondary: "#7a6b2e",
      accent: "#c26632",
      success: "#287a52",
      warning: "#a86518",
      danger: "#a63d40",
      focus: "#2f7470",
      shadowRgb: "47 116 112"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'IBM Plex Sans', 'Inter', sans-serif",
      mono: "'Source Code Pro', Consolas, monospace"
    },
    radius: ["0.125rem", "0.25rem", "0.5rem", "0.75rem"]
  },
  {
    id: "200",
    file: "tokens-200.css",
    name: "Biodiversity Atlas",
    category: "Zrównoważony rozwój",
    useCase: "Mapy bioróżnorodności, monitoring siedlisk, rejestry gatunków, projekty ochrony przyrody i raporty terenowe",
    description: "Ekologiczny system atlasu z jasną bazą terenową, zielonym CTA ochrony, śliwkowym kontekstem gatunków i bursztynowym akcentem obserwacji.",
    primaryAction: "Dodaj obserwację",
    secondaryAction: "Zobacz siedliska",
    tags: ["biodiversity", "habitats", "atlas"],
    colors: {
      background: "#f6faf4",
      surface: "#ffffff",
      surfaceRaised: "#e6f0df",
      text: "#1e2a20",
      textMuted: "#5d6d5f",
      border: "#cfddc8",
      primary: "#3b7a45",
      primaryHover: "#2d5f35",
      primaryContrast: "#ffffff",
      secondary: "#7a4b8f",
      accent: "#d08a2f",
      success: "#2f7a48",
      warning: "#a86518",
      danger: "#b23a48",
      focus: "#3b7a45",
      shadowRgb: "59 122 69"
    },
    fonts: {
      sans: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
      heading: "'Sora', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace"
    },
    radius: ["0.375rem", "0.625rem", "0.875rem", "1.125rem"]
  }
);

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
  align-items: center;
  margin: 0 0 var(--dt-space-3);
  border: 1px solid var(--dt-color-border);
  border-radius: var(--dt-radius-pill);
  padding: var(--dt-space-1) var(--dt-space-3);
  background: var(--dt-color-surface-raised);
  color: var(--dt-color-primary);
  font-family: var(--dt-font-sans);
  font-size: var(--dt-text-xs);
  font-weight: 800;
  letter-spacing: var(--dt-tracking-normal);
  text-transform: none;
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
    <link rel="stylesheet" href="tokens/${system.file}" />
  </head>
  <body>
    <main class="dt-preview">
      <span class="dt-preview__eyebrow">Kategoria: ${system.category}</span>
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
  const systemCount = systems.length;
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
    <link rel="stylesheet" href="assets/vault.css" />
    <script src="assets/vault-data.js" defer></script>
    <script src="assets/vault.js" defer></script>
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
            <span class="vault-status__item">${systemCount} zestawów tokenów</span>
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
          <div class="vault-summary__item"><span class="vault-summary__value">${systemCount}</span><span class="vault-summary__label">zestawów</span></div>
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
  </body>
</html>
`;
}

function vaultDataJs() {
  const cssById = Object.fromEntries(systems.map((system) => [system.id, tokenCss(system)]));
  return `window.VAULT_SYSTEMS = ${JSON.stringify(systems)};
window.VAULT_TOKEN_CSS = ${JSON.stringify(cssById)};
`;
}

function tokenPath(system) {
  return `${tokenDirName}/${system.file}`;
}

function readme() {
  const list = systems.map((system) => `- \`${tokenPath(system)}\` - ${system.name} (${system.useCase})`).join("\n");
  return `# KP_Code Digital Vault - CSS Design Token Systems

Ten folder produktu zawiera ${systems.length} gotowych do skopiowania systemów tokenów CSS dla projektów developerskich.
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
<link rel="stylesheet" href="./design-tokens/tokens/tokens-02.css" />
<link rel="stylesheet" href="./styles/components.css" />
\`\`\`

Możesz też skopiować CSS bezpośrednio z panelu w \`index.html\`.
Panel ma przełącznik \`Light\` / \`Dark\`, który zapisuje wybór użytkownika w \`localStorage\`.

## Struktura panelu

Panel jest rozdzielony na małe pliki, żeby biblioteka mogła rosnąć do setek zestawów:

- \`index.html\` - lekki szkielet panelu oraz szybkie ustawienie motywu przed renderem.
- \`assets/vault.css\` - style panelu głównego, filtrów, kart i stanów responsywnych.
- \`assets/vault.js\` - logika filtrowania, sortowania, kopiowania CSS i renderowania podglądów.
- \`assets/vault-data.js\` - generowane dane \`window.VAULT_SYSTEMS\` oraz pełne CSS-y do kopiowania w \`window.VAULT_TOKEN_CSS\`.

Nie edytuj ręcznie \`assets/vault-data.js\`; jest generowany z tablicy \`systems\` w \`scripts/build-tokens.js\`.

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

fs.mkdirSync(tokenDir, { recursive: true });

for (const system of systems) {
  fs.writeFileSync(path.join(tokenDir, system.file), tokenCss(system), "utf8");
}

fs.mkdirSync(path.join(rootDir, "assets"), { recursive: true });
fs.writeFileSync(path.join(rootDir, "index.html"), indexHtml(), "utf8");
fs.writeFileSync(path.join(rootDir, "assets", "vault-data.js"), vaultDataJs(), "utf8");
fs.writeFileSync(path.join(rootDir, "README.md"), readme(), "utf8");

console.log(`Wygenerowano ${systems.length} zestawów tokenów.`);
