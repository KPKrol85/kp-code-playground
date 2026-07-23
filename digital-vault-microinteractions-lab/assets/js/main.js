'use strict';

const selectors = {
  themeToggle: '[data-theme-toggle]',
  themeLabel: '[data-theme-label]',
  searchInput: '[data-search-input]',
  categoryFilter: '[data-category-filter]',
  complexityFilter: '[data-complexity-filter]',
  motionFilter: '[data-motion-filter]',
  resetFilters: '[data-reset-filters]',
  emptyReset: '[data-empty-reset]',
  patternGrid: '[data-pattern-grid]',
  resultsCount: '[data-results-count]',
  emptyState: '[data-empty-state]',
  previewName: '[data-preview-name]',
  previewDescription: '[data-preview-description]',
  previewMeta: '[data-preview-meta]',
  previewSurface: '[data-preview-surface]',
  previewBestFor: '[data-preview-best-for]',
  previewAccessibility: '[data-preview-accessibility]',
  codeTabs: '[data-code-tab]',
  codeOutput: '[data-code-output]',
  copyCurrent: '[data-copy-current]',
  toastRegion: '[data-toast-region]'
};

const filterState = {
  search: '',
  category: 'all',
  complexity: 'all',
  motion: 'all'
};

const state = {
  selectedId: 'button-magnetic',
  activeCodeTab: 'html',
  theme: 'light'
};

const interactionTaxonomy = {
  category: [
    { value: 'feedback', label: 'Feedback' },
    { value: 'navigation', label: 'Nawigacja' },
    { value: 'forms', label: 'Formularze' },
    { value: 'buttons', label: 'Przyciski' },
    { value: 'cards', label: 'Karty' },
    { value: 'loading', label: 'Ładowanie' },
    { value: 'onboarding', label: 'Onboarding' },
    { value: 'dashboard', label: 'Dashboard' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'empty-states', label: 'Empty states' }
  ],
  complexity: [
    { value: 'basic', label: 'Podstawowy' },
    { value: 'intermediate', label: 'Średni' },
    { value: 'advanced', label: 'Zaawansowany' }
  ],
  motion: [
    { value: 'none', label: 'Bez ruchu' },
    { value: 'subtle', label: 'Subtelny' },
    { value: 'medium', label: 'Średni' },
    { value: 'expressive', label: 'Ekspresyjny' }
  ],
  previewType: [
    { value: 'accordion', label: 'Accordion' },
    { value: 'button-glow', label: 'Glow button' },
    { value: 'button-loading', label: 'Loading button' },
    { value: 'button-magnetic', label: 'Magnetic button' },
    { value: 'button-press', label: 'Pressable button' },
    { value: 'card', label: 'Card' },
    { value: 'dot', label: 'Notification dot' },
    { value: 'empty', label: 'Empty state' },
    { value: 'field', label: 'Form field' },
    { value: 'meter', label: 'Meter' },
    { value: 'progress', label: 'Progress' },
    { value: 'row', label: 'Data row' },
    { value: 'skeleton', label: 'Skeleton' },
    { value: 'status', label: 'Status' },
    { value: 'tabs', label: 'Tabs' },
    { value: 'toast', label: 'Toast' },
    { value: 'tooltip', label: 'Tooltip' }
  ]
};

const requiredInteractionFields = [
  'id',
  'name',
  'category',
  'complexity',
  'motion',
  'featured',
  'description',
  'bestFor',
  'accessibility',
  'previewType',
  'html',
  'css',
  'js'
];

const requiredStringInteractionFields = [
  'id',
  'name',
  'category',
  'complexity',
  'motion',
  'description',
  'bestFor',
  'accessibility',
  'previewType'
];

const interactions = [
  {
    id: "button-magnetic",
    name: "Magnetic CTA Button",
    category: "buttons",
    complexity: "intermediate",
    motion: "medium",
    featured: true,
    description: "Magnetic CTA Button pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Buttons, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 1 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Użyj natywnego przycisku z jasną etykietą i widocznym :focus-visible. Efekt magnetyczny musi działać też na focus, a przy prefers-reduced-motion powinien zostać zastąpiony statycznym cieniem lub krótką zmianą kontrastu.",
    previewType: "button-magnetic",
    html: `<div class="interaction-demo interaction-demo--button-magnetic">\n  <button class="demo-button demo-button--glow" type="button">Magnetic CTA Button</button>\n</div>`,
    css: `.interaction-demo--button-magnetic { display: grid; place-items: center; }\n.interaction-demo--button-magnetic > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--button-magnetic > *:hover { transform: translateY(-2px); }`,
    js: `const element = document.querySelector('[data-interaction]');
if (element) {
  element.addEventListener('click', () => element.classList.toggle('is-active'));
}`
  },
  {
    id: "button-soft-glow",
    name: "Soft Glow Button",
    category: "buttons",
    complexity: "basic",
    motion: "subtle",
    featured: true,
    description: "Soft Glow Button pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Buttons, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 2 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Glow jest dekoracją: zachowaj tekstową etykietę przycisku, widoczny focus i wystarczający kontrast. Przy prefers-reduced-motion ogranicz przejścia do delikatnej zmiany cienia bez przesuwania elementu.",
    previewType: "button-glow",
    html: `<div class="interaction-demo interaction-demo--button-soft-glow">\n  <button class="demo-button demo-button--glow" type="button">Soft Glow Button</button>\n</div>`,
    css: `.interaction-demo--button-soft-glow { display: grid; place-items: center; }\n.interaction-demo--button-soft-glow > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--button-soft-glow > *:hover { transform: translateY(-2px); }`,
    js: ``
  },
  {
    id: "button-pressable",
    name: "Pressable Button",
    category: "buttons",
    complexity: "basic",
    motion: "subtle",
    featured: false,
    description: "Pressable Button pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Buttons, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 3 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Stan wciśnięcia nie może być jedyną informacją o akcji; przycisk ma mieć etykietę i focus widoczny z klawiatury. Przy prefers-reduced-motion zostaw zmianę cienia/obramowania zamiast ruchu w osi Y.",
    previewType: "button-press",
    html: `<div class="interaction-demo interaction-demo--button-pressable">\n  <button class="demo-button demo-button--glow" type="button">Pressable Button</button>\n</div>`,
    css: `.interaction-demo--button-pressable { display: grid; place-items: center; }\n.interaction-demo--button-pressable > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--button-pressable > *:hover { transform: translateY(-2px); }`,
    js: ``
  },
  {
    id: "button-loading",
    name: "Loading Button",
    category: "buttons",
    complexity: "intermediate",
    motion: "medium",
    featured: false,
    description: "Loading Button pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Buttons, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 4 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Podczas zapisu pokaż tekstowy status, np. „Zapisywanie”, i nie blokuj focusu bez powodu. Przy prefers-reduced-motion usuń obracanie spinnera, ale zostaw widoczny komunikat stanu.",
    previewType: "button-loading",
    html: `<div class="interaction-demo interaction-demo--button-loading">\n  <button class="demo-button demo-button--glow" type="button">Loading Button</button>\n</div>`,
    css: `.interaction-demo--button-loading { display: grid; place-items: center; }\n.interaction-demo--button-loading > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--button-loading > *:hover { transform: translateY(-2px); }`,
    js: `const element = document.querySelector('[data-interaction]');
if (element) {
  element.addEventListener('click', () => element.classList.toggle('is-active'));
}`
  },
  {
    id: "button-success",
    name: "Success Button",
    category: "feedback",
    complexity: "intermediate",
    motion: "subtle",
    featured: false,
    description: "Success Button pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Feedback, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 5 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Potwierdzenie sukcesu powinno mieć tekst i opcjonalny role=\"status\"/aria-live, nie sam kolor zielony. Przy prefers-reduced-motion skróć wejście komunikatu do zmiany opacity bez przesunięcia.",
    previewType: "toast",
    html: `<div class="interaction-demo interaction-demo--button-success">\n  <button class="demo-button demo-button--glow" type="button">Success Button</button>\n</div>`,
    css: `.interaction-demo--button-success { display: grid; place-items: center; }\n.interaction-demo--button-success > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--button-success > *:hover { transform: translateY(-2px); }`,
    js: `const element = document.querySelector('[data-interaction]');
if (element) {
  element.addEventListener('click', () => element.classList.toggle('is-active'));
}`
  },
  {
    id: "button-ripple",
    name: "Ripple Feedback Button",
    category: "buttons",
    complexity: "advanced",
    motion: "medium",
    featured: false,
    description: "Ripple Feedback Button pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Buttons, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 6 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Ripple jest tylko feedbackiem wizualnym; przycisk musi mieć etykietę, focus i aktywację klawiaturą. Przy prefers-reduced-motion wyłącz rozlewający się ruch, zostawiając statyczny stan active/focus.",
    previewType: "button-glow",
    html: `<div class="interaction-demo interaction-demo--button-ripple">\n  <button class="demo-button demo-button--glow" type="button">Ripple Feedback Button</button>\n</div>`,
    css: `.interaction-demo--button-ripple { display: grid; place-items: center; }\n.interaction-demo--button-ripple > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--button-ripple > *:hover { transform: translateY(-2px); }`,
    js: `const element = document.querySelector('[data-interaction]');
if (element) {
  element.addEventListener('click', () => element.classList.toggle('is-active'));
}`
  },
  {
    id: "card-tilt-product",
    name: "Tilt Product Card",
    category: "cards",
    complexity: "advanced",
    motion: "medium",
    featured: true,
    description: "Tilt Product Card pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Cards, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 7 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Karta z tilt nie może ukrywać treści ani wymagać hovera; jeśli jest klikalna, użyj linku lub przycisku z focus-visible. Przy prefers-reduced-motion wyłącz perspektywę i obrót, zostaw obramowanie lub cień.",
    previewType: "card",
    html: `<article class="demo-card">\n  <h4>Tilt Product Card</h4>\n  <p>Krótki opis, metryka i subtelny hover state.</p>\n</article>`,
    css: `.interaction-demo--card-tilt-product { display: grid; place-items: center; }\n.interaction-demo--card-tilt-product > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--card-tilt-product > *:hover { transform: translateY(-2px); }`,
    js: `const element = document.querySelector('[data-interaction]');
if (element) {
  element.addEventListener('click', () => element.classList.toggle('is-active'));
}`
  },
  {
    id: "card-lift",
    name: "Lift Card",
    category: "cards",
    complexity: "basic",
    motion: "subtle",
    featured: false,
    description: "Lift Card pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Cards, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 8 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Hover lift powinien mieć równoważny focus dla klawiatury, a treść karty pozostaje czytelna bez animacji. Przy prefers-reduced-motion usuń translateY i zachowaj statyczny cień/obramowanie.",
    previewType: "card",
    html: `<article class="demo-card">\n  <h4>Lift Card</h4>\n  <p>Krótki opis, metryka i subtelny hover state.</p>\n</article>`,
    css: `.interaction-demo--card-lift { display: grid; place-items: center; }\n.interaction-demo--card-lift > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--card-lift > *:hover { transform: translateY(-2px); }`,
    js: ``
  },
  {
    id: "card-expandable-info",
    name: "Expandable Info Card",
    category: "cards",
    complexity: "intermediate",
    motion: "subtle",
    featured: false,
    description: "Expandable Info Card pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Cards, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 9 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Dla rozwijania preferuj details/summary albo button z aria-expanded i kontrolowanym panelem. Przy prefers-reduced-motion treść powinna pojawiać się bez animowanego przesuwania, z zachowanym stanem otwarcia.",
    previewType: "accordion",
    html: `<details class="demo-accordion" open>\n  <summary>Jak działa wzorzec?</summary>\n  <p>Treść rozwija się przewidywalnie i pozostaje dostępna z klawiatury.</p>\n</details>`,
    css: `.interaction-demo--card-expandable-info { display: grid; place-items: center; }\n.interaction-demo--card-expandable-info > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--card-expandable-info > *:hover { transform: translateY(-2px); }`,
    js: `const element = document.querySelector('[data-interaction]');
if (element) {
  element.addEventListener('click', () => element.classList.toggle('is-active'));
}`
  },
  {
    id: "card-pricing-highlight",
    name: "Pricing Highlight Card",
    category: "cards",
    complexity: "intermediate",
    motion: "subtle",
    featured: true,
    description: "Pricing Highlight Card pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Cards, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 10 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Wyróżnienie planu cenowego musi mieć tekstową etykietę, nie tylko kolor lub cień. Przy prefers-reduced-motion ogranicz animacje wyróżnienia, ale zostaw widoczny aktywny/zalecany stan.",
    previewType: "card",
    html: `<article class="demo-card">\n  <h4>Pricing Highlight Card</h4>\n  <p>Krótki opis, metryka i subtelny hover state.</p>\n</article>`,
    css: `.interaction-demo--card-pricing-highlight { display: grid; place-items: center; }\n.interaction-demo--card-pricing-highlight > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--card-pricing-highlight > *:hover { transform: translateY(-2px); }`,
    js: `const element = document.querySelector('[data-interaction]');
if (element) {
  element.addEventListener('click', () => element.classList.toggle('is-active'));
}`
  },
  {
    id: "skeleton-profile",
    name: "Skeleton Profile Card",
    category: "loading",
    complexity: "basic",
    motion: "medium",
    featured: true,
    description: "Skeleton Profile Card pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Loading, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 11 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Skeleton oznacz jako dekoracyjny lub opisz go tekstowym statusem ładowania; nie zastępuje komunikatu dla czytnika. Przy prefers-reduced-motion wyłącz shimmer i zostaw statyczne placeholdery oraz tekst „Ładowanie”.",
    previewType: "skeleton",
    html: `<div class="demo-skeleton" aria-label="Ładowanie profilu">\n  <span></span>\n  <span></span>\n  <span></span>\n</div>`,
    css: `.interaction-demo--skeleton-profile { display: grid; place-items: center; }\n.interaction-demo--skeleton-profile > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--skeleton-profile > *:hover { transform: translateY(-2px); }`,
    js: ``
  },
  {
    id: "skeleton-dashboard-row",
    name: "Skeleton Dashboard Row",
    category: "loading",
    complexity: "basic",
    motion: "medium",
    featured: false,
    description: "Skeleton Dashboard Row pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Loading, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 12 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Wiersz skeleton powinien rezerwować układ i mieć obok tekstowy status ładowania. Przy prefers-reduced-motion usuń zapętlony shimmer, zachowując statyczny kształt i późniejszą treść.",
    previewType: "skeleton",
    html: `<div class="demo-skeleton" aria-label="Ładowanie profilu">\n  <span></span>\n  <span></span>\n  <span></span>\n</div>`,
    css: `.interaction-demo--skeleton-dashboard-row { display: grid; place-items: center; }\n.interaction-demo--skeleton-dashboard-row > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--skeleton-dashboard-row > *:hover { transform: translateY(-2px); }`,
    js: ``
  },
  {
    id: "progress-stepper",
    name: "Progress Stepper",
    category: "navigation",
    complexity: "intermediate",
    motion: "subtle",
    featured: false,
    description: "Progress Stepper pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Navigation, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 13 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Postęp musi być opisany tekstowo, np. procentem i nazwą kroku, a nie tylko szerokością paska. Przy prefers-reduced-motion unikaj animowanego wzrostu, ustaw finalną wartość od razu.",
    previewType: "progress",
    html: `<div class="demo-progress">\n  <span>Postęp konfiguracji</span><strong>86%</strong>\n  <div><i></i></div>\n</div>`,
    css: `.interaction-demo--progress-stepper { display: grid; place-items: center; }\n.interaction-demo--progress-stepper > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--progress-stepper > *:hover { transform: translateY(-2px); }`,
    js: `const element = document.querySelector('[data-interaction]');
if (element) {
  element.addEventListener('click', () => element.classList.toggle('is-active'));
}`
  },
  {
    id: "badge-animated",
    name: "Animated Badge",
    category: "feedback",
    complexity: "basic",
    motion: "medium",
    featured: true,
    description: "Animated Badge pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Feedback, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 14 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Animowany badge powinien mieć czytelną etykietę statusu i nie przekazywać znaczenia samym kolorem. Przy prefers-reduced-motion usuń pulsowanie, zostaw statyczną ikonę/tekst.",
    previewType: "status",
    html: `<div class="demo-status"><span></span>Animated Badge</div>`,
    css: `.interaction-demo--badge-animated { display: grid; place-items: center; }\n.interaction-demo--badge-animated > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--badge-animated > *:hover { transform: translateY(-2px); }`,
    js: ``
  },
  {
    id: "status-pulse",
    name: "Status Pulse",
    category: "feedback",
    complexity: "basic",
    motion: "medium",
    featured: false,
    description: "Status Pulse pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Feedback, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 15 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Puls statusu wymaga tekstu typu „Status: aktywny” i kontrastu niezależnego od koloru kropki. Przy prefers-reduced-motion wyłącz zapętlone pulsowanie, zostaw stały znacznik i tekst.",
    previewType: "status",
    html: `<div class="demo-status"><span></span>Status Pulse</div>`,
    css: `.interaction-demo--status-pulse { display: grid; place-items: center; }\n.interaction-demo--status-pulse > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--status-pulse > *:hover { transform: translateY(-2px); }`,
    js: ``
  },
  {
    id: "toast-feedback",
    name: "Toast Feedback",
    category: "feedback",
    complexity: "intermediate",
    motion: "subtle",
    featured: false,
    description: "Toast Feedback pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Feedback, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 16 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Toast powinien trafiać do aria-live=\"polite\", zawierać widoczny tekst i nie polegać wyłącznie na kolorze. Przy prefers-reduced-motion pokaż go bez przesunięcia, ewentualnie krótką zmianą opacity.",
    previewType: "toast",
    html: `<div class="interaction-demo interaction-demo--toast-feedback">\n  <button class="demo-button demo-button--glow" type="button">Toast Feedback</button>\n</div>`,
    css: `.interaction-demo--toast-feedback { display: grid; place-items: center; }\n.interaction-demo--toast-feedback > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--toast-feedback > *:hover { transform: translateY(-2px); }`,
    js: `const element = document.querySelector('[data-interaction]');
if (element) {
  element.addEventListener('click', () => element.classList.toggle('is-active'));
}`
  },
  {
    id: "form-inline-error",
    name: "Inline Form Error",
    category: "forms",
    complexity: "basic",
    motion: "none",
    featured: false,
    description: "Inline Form Error pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Forms, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 17 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Błąd formularza połącz z polem przez aria-describedby i pokaż tekst obok obramowania/koloru. Ruch nie jest wymagany; przy prefers-reduced-motion nie dodawaj potrząsania ani migania.",
    previewType: "field",
    html: `<label class="demo-field">\n  <span>Email zespołu</span>\n  <input type="email" value="team@kp.dev">\n  <small>Komunikat stanu jest tekstowy.</small>\n</label>`,
    css: `.interaction-demo--form-inline-error { display: grid; place-items: center; }\n.interaction-demo--form-inline-error > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--form-inline-error > *:hover { transform: translateY(-2px); }`,
    js: ``
  },
  {
    id: "form-floating-label",
    name: "Floating Label Input",
    category: "forms",
    complexity: "intermediate",
    motion: "subtle",
    featured: false,
    description: "Floating Label Input pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Forms, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 18 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Floating label nie może zastąpić prawdziwej etykiety pola; label musi pozostać widoczny i powiązany z inputem. Przy prefers-reduced-motion skróć przejście etykiety lub ustaw ją bez animacji.",
    previewType: "field",
    html: `<label class="demo-field">\n  <span>Email zespołu</span>\n  <input type="email" value="team@kp.dev">\n  <small>Komunikat stanu jest tekstowy.</small>\n</label>`,
    css: `.interaction-demo--form-floating-label { display: grid; place-items: center; }\n.interaction-demo--form-floating-label > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--form-floating-label > *:hover { transform: translateY(-2px); }`,
    js: `const element = document.querySelector('[data-interaction]');
if (element) {
  element.addEventListener('click', () => element.classList.toggle('is-active'));
}`
  },
  {
    id: "password-strength",
    name: "Password Strength Meter",
    category: "forms",
    complexity: "intermediate",
    motion: "subtle",
    featured: false,
    description: "Password Strength Meter pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Forms, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 19 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Miernik siły hasła powinien mieć tekstową ocenę i nie opierać się wyłącznie na kolorach segmentów. Przy prefers-reduced-motion aktualizuj wartość statycznie, bez animowanego wypełniania.",
    previewType: "meter",
    html: `<div class="demo-meter">\n  <strong>Siła hasła: dobra</strong>\n  <div class="demo-meter__bar"><span></span></div>\n</div>`,
    css: `.interaction-demo--password-strength { display: grid; place-items: center; }\n.interaction-demo--password-strength > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--password-strength > *:hover { transform: translateY(-2px); }`,
    js: `const element = document.querySelector('[data-interaction]');
if (element) {
  element.addEventListener('click', () => element.classList.toggle('is-active'));
}`
  },
  {
    id: "segmented-control",
    name: "Segmented Control",
    category: "navigation",
    complexity: "intermediate",
    motion: "subtle",
    featured: false,
    description: "Segmented Control pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Navigation, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 20 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Segmenty realizuj jako radio group albo tablist z jasnym aria-selected/checked i obsługą klawiatury. Przy prefers-reduced-motion przesuwany wskaźnik zastąp statycznym tłem/obramowaniem aktywnej opcji.",
    previewType: "tabs",
    html: `<div class="demo-tabs" role="tablist">\n  <button type="button">Design</button>\n  <button type="button">Code</button>\n  <button type="button">Audit</button>\n</div>`,
    css: `.interaction-demo--segmented-control { display: grid; place-items: center; }\n.interaction-demo--segmented-control > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--segmented-control > *:hover { transform: translateY(-2px); }`,
    js: `const element = document.querySelector('[data-interaction]');
if (element) {
  element.addEventListener('click', () => element.classList.toggle('is-active'));
}`
  },
  {
    id: "tabs-indicator",
    name: "Tabs Indicator",
    category: "navigation",
    complexity: "intermediate",
    motion: "subtle",
    featured: false,
    description: "Tabs Indicator pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Navigation, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 21 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Zakładki wymagają semantyki tablist/tab, widocznego active state i przewidywalnego focusu. Przy prefers-reduced-motion wskaźnik aktywnej zakładki powinien zmieniać pozycję bez animowanego ślizgu.",
    previewType: "tabs",
    html: `<div class="demo-tabs" role="tablist">\n  <button type="button">Design</button>\n  <button type="button">Code</button>\n  <button type="button">Audit</button>\n</div>`,
    css: `.interaction-demo--tabs-indicator { display: grid; place-items: center; }\n.interaction-demo--tabs-indicator > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--tabs-indicator > *:hover { transform: translateY(-2px); }`,
    js: `const element = document.querySelector('[data-interaction]');
if (element) {
  element.addEventListener('click', () => element.classList.toggle('is-active'));
}`
  },
  {
    id: "accordion-reveal",
    name: "Accordion Reveal",
    category: "navigation",
    complexity: "basic",
    motion: "subtle",
    featured: false,
    description: "Accordion Reveal pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Navigation, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 22 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Accordion powinien używać summary albo button z aria-expanded oraz treści dostępnej w logicznej kolejności. Przy prefers-reduced-motion panel otwieraj bez animacji wysokości.",
    previewType: "accordion",
    html: `<details class="demo-accordion" open>\n  <summary>Jak działa wzorzec?</summary>\n  <p>Treść rozwija się przewidywalnie i pozostaje dostępna z klawiatury.</p>\n</details>`,
    css: `.interaction-demo--accordion-reveal { display: grid; place-items: center; }\n.interaction-demo--accordion-reveal > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--accordion-reveal > *:hover { transform: translateY(-2px); }`,
    js: ``
  },
  {
    id: "tooltip-hint",
    name: "Tooltip Hint",
    category: "feedback",
    complexity: "basic",
    motion: "none",
    featured: false,
    description: "Tooltip Hint pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Feedback, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 23 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Tooltip nie może zawierać krytycznej informacji dostępnej wyłącznie na hover; pokaż go też na focus i zapewnij zrozumiałą etykietę. Ruch nie jest potrzebny, wystarczy statyczne pojawienie się.",
    previewType: "tooltip",
    html: `<button class="demo-tooltip" type="button">Najedź lub ustaw focus</button>`,
    css: `.interaction-demo--tooltip-hint { display: grid; place-items: center; }\n.interaction-demo--tooltip-hint > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--tooltip-hint > *:hover { transform: translateY(-2px); }`,
    js: ``
  },
  {
    id: "empty-state-cta",
    name: "Empty State CTA",
    category: "empty-states",
    complexity: "basic",
    motion: "none",
    featured: false,
    description: "Empty State CTA pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Empty States, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 24 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Empty state powinien jasno opisywać brak danych i następny krok tekstem oraz przyciskiem/linkiem. Bez ruchu nadal musi być zrozumiały; nie używaj samej ilustracji jako komunikatu.",
    previewType: "empty",
    html: `<div class="demo-empty">\n  <div>⌁</div>\n  <h4>Brak danych</h4>\n  <p>Dodaj pierwszy element, aby rozpocząć.</p>\n</div>`,
    css: `.interaction-demo--empty-state-cta { display: grid; place-items: center; }\n.interaction-demo--empty-state-cta > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--empty-state-cta > *:hover { transform: translateY(-2px); }`,
    js: ``
  },
  {
    id: "notification-dot",
    name: "Notification Dot",
    category: "feedback",
    complexity: "basic",
    motion: "none",
    featured: false,
    description: "Notification Dot pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Feedback, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 25 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Kropka powiadomienia wymaga tekstu lub aria-label z liczbą/statussem, bo kolor i pozycja nie wystarczą. Ruch nie jest wymagany; przy ograniczeniu animacji zostaw statyczny licznik.",
    previewType: "dot",
    html: `<div class="demo-dot" aria-label="3 nowe powiadomienia"></div>`,
    css: `.interaction-demo--notification-dot { display: grid; place-items: center; }\n.interaction-demo--notification-dot > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--notification-dot > *:hover { transform: translateY(-2px); }`,
    js: ``
  },
  {
    id: "copy-feedback-chip",
    name: "Copy Feedback Chip",
    category: "feedback",
    complexity: "intermediate",
    motion: "subtle",
    featured: false,
    description: "Copy Feedback Chip pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Feedback, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 26 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Feedback kopiowania powinien używać widocznego tekstu i aria-live, aby potwierdzenie nie było tylko kolorem chipu. Przy prefers-reduced-motion pokaż stan bez wysuwania lub pulsowania.",
    previewType: "toast",
    html: `<div class="interaction-demo interaction-demo--copy-feedback-chip">\n  <button class="demo-button demo-button--glow" type="button">Copy Feedback Chip</button>\n</div>`,
    css: `.interaction-demo--copy-feedback-chip { display: grid; place-items: center; }\n.interaction-demo--copy-feedback-chip > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--copy-feedback-chip > *:hover { transform: translateY(-2px); }`,
    js: `const element = document.querySelector('[data-interaction]');
if (element) {
  element.addEventListener('click', () => element.classList.toggle('is-active'));
}`
  },
  {
    id: "mini-progress-bar",
    name: "Mini Progress Bar",
    category: "dashboard",
    complexity: "basic",
    motion: "medium",
    featured: false,
    description: "Mini Progress Bar pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Data UI, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 27 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Mini pasek postępu musi mieć tekstową wartość lub etykietę statusu oraz kontrast toru i wypełnienia. Przy prefers-reduced-motion ustaw szerokość docelową bez animowanego wzrostu.",
    previewType: "progress",
    html: `<div class="demo-progress">\n  <span>Postęp konfiguracji</span><strong>86%</strong>\n  <div><i></i></div>\n</div>`,
    css: `.interaction-demo--mini-progress-bar { display: grid; place-items: center; }\n.interaction-demo--mini-progress-bar > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--mini-progress-bar > *:hover { transform: translateY(-2px); }`,
    js: ``
  },
  {
    id: "timeline-reveal",
    name: "Timeline Item Reveal",
    category: "dashboard",
    complexity: "intermediate",
    motion: "subtle",
    featured: false,
    description: "Timeline Item Reveal pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Data UI, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 28 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Element osi czasu powinien mieć datę/etykietę w tekście i focus, jeśli prowadzi do szczegółów. Przy prefers-reduced-motion usuń reveal/translate, zostaw statyczny marker i treść.",
    previewType: "row",
    html: `<div class="demo-row">\n  <span>Vault token</span>\n  <strong>Aktywny</strong>\n</div>`,
    css: `.interaction-demo--timeline-reveal { display: grid; place-items: center; }\n.interaction-demo--timeline-reveal > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--timeline-reveal > *:hover { transform: translateY(-2px); }`,
    js: `const element = document.querySelector('[data-interaction]');
if (element) {
  element.addEventListener('click', () => element.classList.toggle('is-active'));
}`
  },
  {
    id: "data-row-hover",
    name: "Data Row Hover",
    category: "dashboard",
    complexity: "basic",
    motion: "subtle",
    featured: false,
    description: "Data Row Hover pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Data UI, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 29 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Wiersz danych nie może ujawniać akcji wyłącznie na hover; zapewnij focus i widoczne tekstowe statusy. Przy prefers-reduced-motion wyłącz przesunięcie wiersza, zostaw tło lub obramowanie.",
    previewType: "row",
    html: `<div class="demo-row">\n  <span>Vault token</span>\n  <strong>Aktywny</strong>\n</div>`,
    css: `.interaction-demo--data-row-hover { display: grid; place-items: center; }\n.interaction-demo--data-row-hover > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--data-row-hover > *:hover { transform: translateY(-2px); }`,
    js: ``
  },
  {
    id: "save-state-indicator",
    name: "Save State Indicator",
    category: "feedback",
    complexity: "intermediate",
    motion: "subtle",
    featured: false,
    description: "Save State Indicator pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Feedback, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 30 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Stan zapisu powinien być tekstem w role=\"status\"/aria-live, np. „Zapisano”, nie samą ikoną. Przy prefers-reduced-motion pomiń puls/slide i zachowaj trwały komunikat.",
    previewType: "status",
    html: `<div class="demo-status"><span></span>Save State Indicator</div>`,
    css: `.interaction-demo--save-state-indicator { display: grid; place-items: center; }\n.interaction-demo--save-state-indicator > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--save-state-indicator > *:hover { transform: translateY(-2px); }`,
    js: `const element = document.querySelector('[data-interaction]');
if (element) {
  element.addEventListener('click', () => element.classList.toggle('is-active'));
}`
  },
  {
    id: "empty-search-results",
    name: "Empty Search Results",
    category: "empty-states",
    complexity: "basic",
    motion: "none",
    featured: false,
    description: "Empty Search Results pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Empty States, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 31 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Brak wyników powinien być ogłoszony tekstowo i oferować przycisk resetu filtrów dostępny z klawiatury. Nie wymaga ruchu; ilustracja jest tylko dodatkiem.",
    previewType: "empty",
    html: `<div class="demo-empty">\n  <div>⌁</div>\n  <h4>Brak danych</h4>\n  <p>Dodaj pierwszy element, aby rozpocząć.</p>\n</div>`,
    css: `.interaction-demo--empty-search-results { display: grid; place-items: center; }\n.interaction-demo--empty-search-results > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--empty-search-results > *:hover { transform: translateY(-2px); }`,
    js: ``
  },
  {
    id: "form-valid-check",
    name: "Valid Field Check",
    category: "forms",
    complexity: "basic",
    motion: "subtle",
    featured: false,
    description: "Valid Field Check pomaga pokazać użytkownikowi czytelny stan elementu w kategorii Forms, bez nadmiernej dekoracji i bez utraty kontroli klawiaturą.",
    bestFor: "Najlepsze dla ekranów produktu KP_Code, gdzie akcja numer 32 wymaga szybkiego feedbacku i jasnego następnego kroku.",
    accessibility: "Komunikat poprawności połącz z polem przez aria-describedby i pokaż tekst, nie tylko zielony kolor. Przy prefers-reduced-motion unikaj animowanego checkmarka, zostaw statyczny stan.",
    previewType: "field",
    html: `<label class="demo-field">\n  <span>Email zespołu</span>\n  <input type="email" value="team@kp.dev">\n  <small>Komunikat stanu jest tekstowy.</small>\n</label>`,
    css: `.interaction-demo--form-valid-check { display: grid; place-items: center; }\n.interaction-demo--form-valid-check > * { transition: transform 220ms ease, box-shadow 220ms ease; }\n.interaction-demo--form-valid-check > *:hover { transform: translateY(-2px); }`,
    js: ``
  }
];

const dom = {};

function queryElement(selector) {
  return document.querySelector(selector);
}

function queryAll(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function createElement(tagName, className, textContent) {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (typeof textContent === 'string') {
    element.textContent = textContent;
  }
  return element;
}

function normalize(value) {
  return String(value || '').trim().toLowerCase();
}

function getTaxonomyValues(key) {
  return interactionTaxonomy[key].map((item) => item.value);
}

function getTaxonomyLabel(key, value) {
  return interactionTaxonomy[key].find((item) => item.value === value)?.label || value;
}

function getSelectedInteraction() {
  return interactions.find((interaction) => interaction.id === state.selectedId) || null;
}

function populateSelect(selectElement, options) {
  options.forEach(({ value, label }) => {
    const option = createElement('option', '', label);
    option.value = value;
    selectElement.append(option);
  });
}


function buildSnippetCss(blockName, previewType) {
  const movingTypes = ['button-glow', 'button-loading', 'button-magnetic', 'button-press', 'card', 'row', 'tooltip'];
  const motion = movingTypes.includes(previewType)
    ? `\n.${blockName} { transition: transform 180ms ease, box-shadow 180ms ease; }\n.${blockName}:where(:hover, :focus-within) { transform: translateY(-2px); }`
    : '';
  const base = `.${blockName} { color: var(--mi-text, #172033); font: 600 1rem/1.5 system-ui, sans-serif; }`;
  const map = {
    accordion: `.${blockName} { border: 1px solid var(--mi-border, #d9e2f2); border-radius: 1rem; padding: 1rem; background: var(--mi-surface, #ffffff); }\n.${blockName}__summary { cursor: pointer; font-weight: 700; }\n.${blockName}__content { margin: .75rem 0 0; color: var(--mi-muted, #5d6b82); }`,
    'button-glow': `.${blockName} { border: 0; border-radius: 999px; padding: .85rem 1.2rem; background: var(--mi-accent, #5b7cfa); color: #fff; box-shadow: 0 10px 28px rgb(91 124 250 / .35); cursor: pointer; }${motion}\n.${blockName}:focus-visible { outline: 3px solid var(--mi-focus, #f5c542); outline-offset: 3px; }`,
    'button-magnetic': `.${blockName} { border: 0; border-radius: 999px; padding: .85rem 1.2rem; background: var(--mi-accent, #5b7cfa); color: #fff; box-shadow: 0 14px 34px rgb(91 124 250 / .38); cursor: pointer; }${motion}\n.${blockName}:where(:hover, :focus-visible) { transform: translateY(-3px) scale(1.02); }\n.${blockName}:focus-visible { outline: 3px solid var(--mi-focus, #f5c542); outline-offset: 3px; }`,
    'button-press': `.${blockName} { border: 0; border-radius: .9rem; padding: .85rem 1.2rem; background: var(--mi-accent, #334155); color: #fff; box-shadow: 0 6px 0 var(--mi-shadow, #0f172a); cursor: pointer; }${motion}\n.${blockName}:active { transform: translateY(4px); box-shadow: 0 2px 0 var(--mi-shadow, #0f172a); }\n.${blockName}:focus-visible { outline: 3px solid var(--mi-focus, #f5c542); outline-offset: 3px; }`,
    'button-loading': `.${blockName} { display: inline-flex; align-items: center; gap: .6rem; border: 0; border-radius: 999px; padding: .85rem 1.2rem; background: var(--mi-accent, #5b7cfa); color: #fff; cursor: wait; }\n.${blockName}__spinner { inline-size: 1rem; block-size: 1rem; border: 2px solid rgb(255 255 255 / .45); border-top-color: #fff; border-radius: 50%; animation: ${blockName}-spin .8s linear infinite; }\n@keyframes ${blockName}-spin { to { transform: rotate(1turn); } }`,
    card: `.${blockName} { max-width: 18rem; border: 1px solid var(--mi-border, #d9e2f2); border-radius: 1.25rem; padding: 1.25rem; background: var(--mi-surface, #ffffff); box-shadow: 0 18px 40px rgb(15 23 42 / .10); }${motion}\n.${blockName}__title { margin: 0 0 .4rem; font-size: 1.1rem; }\n.${blockName}__text { margin: 0; color: var(--mi-muted, #5d6b82); }`,
    skeleton: `.${blockName} { width: min(100%, 18rem); display: grid; gap: .75rem; }\n.${blockName}__line { height: .9rem; border-radius: 999px; background: linear-gradient(90deg, #e6ecf5, #f7f9fc, #e6ecf5); background-size: 220% 100%; animation: ${blockName}-shine 1.4s ease-in-out infinite; }\n.${blockName}__line:first-child { height: 3rem; border-radius: 1rem; }\n@keyframes ${blockName}-shine { to { background-position: -220% 0; } }`,
    status: `.${blockName} { display: inline-flex; align-items: center; gap: .55rem; border-radius: 999px; padding: .45rem .75rem; background: var(--mi-success-bg, #e8f8ef); color: var(--mi-success-text, #126b3a); }\n.${blockName}__dot { inline-size: .65rem; block-size: .65rem; border-radius: 50%; background: currentColor; box-shadow: 0 0 0 .35rem rgb(18 107 58 / .16); }`,
    field: `.${blockName} { display: grid; gap: .4rem; max-width: 20rem; }\n.${blockName}__input { border: 1px solid var(--mi-border, #d9e2f2); border-radius: .85rem; padding: .75rem .9rem; }\n.${blockName}__input:focus { outline: 3px solid var(--mi-focus, #f5c542); outline-offset: 2px; }\n.${blockName}__hint { color: var(--mi-success-text, #126b3a); }`,
    tabs: `.${blockName} { display: inline-flex; gap: .35rem; border-radius: 999px; padding: .35rem; background: var(--mi-muted-bg, #edf2f7); }\n.${blockName}__tab { border: 0; border-radius: 999px; padding: .6rem .9rem; background: transparent; cursor: pointer; }\n.${blockName}__tab[aria-selected="true"] { background: var(--mi-surface, #fff); box-shadow: 0 8px 20px rgb(15 23 42 / .12); }`,
    toast: `.${blockName} { max-width: 22rem; border-radius: 1rem; padding: 1rem; background: var(--mi-surface, #ffffff); color: var(--mi-text, #172033); box-shadow: 0 18px 45px rgb(15 23 42 / .18); }\n.${blockName}__title { display: block; margin-bottom: .25rem; }`,
    tooltip: `.${blockName} { position: relative; border: 1px solid var(--mi-border, #d9e2f2); border-radius: 999px; padding: .75rem 1rem; background: #fff; cursor: help; }${motion}\n.${blockName}::after { content: attr(data-tooltip); position: absolute; inset-inline-start: 50%; inset-block-end: calc(100% + .6rem); transform: translateX(-50%); width: max-content; max-width: 14rem; border-radius: .7rem; padding: .45rem .65rem; background: #172033; color: #fff; opacity: 0; pointer-events: none; }\n.${blockName}:where(:hover, :focus-visible)::after { opacity: 1; }`,
    dot: `.${blockName} { inline-size: 1rem; block-size: 1rem; border-radius: 50%; background: var(--mi-danger, #ef4444); box-shadow: 0 0 0 .35rem rgb(239 68 68 / .16); }`,
    meter: `.${blockName} { display: grid; gap: .55rem; width: min(100%, 18rem); }\n.${blockName}__track { height: .65rem; border-radius: 999px; background: var(--mi-muted-bg, #edf2f7); overflow: hidden; }\n.${blockName}__bar { display: block; width: 72%; height: 100%; background: var(--mi-success, #22c55e); }`,
    progress: `.${blockName} { display: grid; gap: .55rem; width: min(100%, 18rem); }\n.${blockName}__meta { display: flex; justify-content: space-between; gap: 1rem; }\n.${blockName}__track { height: .65rem; border-radius: 999px; background: var(--mi-muted-bg, #edf2f7); overflow: hidden; }\n.${blockName}__bar { display: block; width: 86%; height: 100%; background: var(--mi-accent, #5b7cfa); }`,
    row: `.${blockName} { display: flex; justify-content: space-between; gap: 1rem; align-items: center; border: 1px solid var(--mi-border, #d9e2f2); border-radius: 1rem; padding: .85rem 1rem; background: #fff; }${motion}`,
    empty: `.${blockName} { max-width: 20rem; text-align: center; border: 1px dashed var(--mi-border, #cbd5e1); border-radius: 1.25rem; padding: 1.5rem; color: var(--mi-muted, #5d6b82); }\n.${blockName}__icon { font-size: 2rem; }\n.${blockName}__title { margin: .4rem 0; color: var(--mi-text, #172033); }`
  };
  return `${base}\n${map[previewType] || map.card}\n@media (prefers-reduced-motion: reduce) {\n  .${blockName}, .${blockName} *, .${blockName}::after { animation: none; transition: none; transform: none; }\n}`;
}

function buildInteractionSnippets(interaction) {
  const blockName = `mi-${interaction.id}`;
  const title = interaction.name;
  const htmlByType = {
    accordion: `<details class="${blockName}" open>\n  <summary class="${blockName}__summary">Jak działa wzorzec?</summary>\n  <p class="${blockName}__content">Treść rozwija się przewidywalnie i pozostaje dostępna z klawiatury.</p>\n</details>`,
    skeleton: `<div class="${blockName}" role="status" aria-label="Ładowanie treści">\n  <span class="${blockName}__line"></span>\n  <span class="${blockName}__line"></span>\n  <span class="${blockName}__line"></span>\n</div>`,
    status: `<div class="${blockName}" role="status">\n  <span class="${blockName}__dot" aria-hidden="true"></span>\n  <span>${title}</span>\n</div>`,
    field: `<label class="${blockName}">\n  <span class="${blockName}__label">Email zespołu</span>\n  <input class="${blockName}__input" type="email" value="team@kp.dev">\n  <small class="${blockName}__hint">Format adresu jest poprawny.</small>\n</label>`,
    tabs: `<div class="${blockName}" role="tablist" aria-label="Sekcje przykładu">\n  <button class="${blockName}__tab" type="button" role="tab" aria-selected="true">Design</button>\n  <button class="${blockName}__tab" type="button" role="tab" aria-selected="false">Code</button>\n  <button class="${blockName}__tab" type="button" role="tab" aria-selected="false">Audit</button>\n</div>`,
    toast: `<div class="${blockName}" role="status">\n  <strong class="${blockName}__title">Zapisano ustawienia</strong>\n  <span>Toast pokazuje krótkie potwierdzenie akcji.</span>\n</div>`,
    tooltip: `<button class="${blockName}" type="button" data-tooltip="Bezpieczna podpowiedź tekstowa.">\n  Najedź lub ustaw focus\n</button>`,
    dot: `<span class="${blockName}" role="img" aria-label="3 nowe powiadomienia"></span>`,
    meter: `<div class="${blockName}">\n  <strong>Siła hasła: dobra</strong>\n  <div class="${blockName}__track" aria-hidden="true"><span class="${blockName}__bar"></span></div>\n</div>`,
    progress: `<div class="${blockName}">\n  <div class="${blockName}__meta"><span>Postęp konfiguracji</span><strong>86%</strong></div>\n  <div class="${blockName}__track" aria-hidden="true"><span class="${blockName}__bar"></span></div>\n</div>`,
    row: `<div class="${blockName}">\n  <span>Vault token</span>\n  <strong>Status: aktywny</strong>\n</div>`,
    empty: `<section class="${blockName}" aria-labelledby="${blockName}-title">\n  <div class="${blockName}__icon" aria-hidden="true">⌁</div>\n  <h3 class="${blockName}__title" id="${blockName}-title">Brak danych</h3>\n  <p>Dodaj pierwszy element, aby rozpocząć.</p>\n</section>`
  };
  const html = htmlByType[interaction.previewType] || (interaction.previewType.startsWith('button-')
    ? `<button class="${blockName}" type="button">${title}</button>`
    : `<article class="${blockName}">\n  <h3 class="${blockName}__title">${title}</h3>\n  <p class="${blockName}__text">Subtelny hover state z czytelną hierarchią treści.</p>\n</article>`);
  const js = interaction.previewType === 'tabs'
    ? `document.querySelectorAll('.${blockName}').forEach((tablist) => {\n  const tabs = Array.from(tablist.querySelectorAll('.${blockName}__tab'));\n  if (tabs.length === 0) return;\n\n  tabs.forEach((tab) => {\n    tab.addEventListener('click', () => {\n      tabs.forEach((item) => item.setAttribute('aria-selected', String(item === tab)));\n    });\n  });\n});`
    : "";
  return { html, css: buildSnippetCss(blockName, interaction.previewType), js };
}

function normalizeInteractionSnippets(interactionList) {
  interactionList.forEach((interaction) => {
    const snippets = buildInteractionSnippets(interaction);
    interaction.html = snippets.html;
    interaction.css = snippets.css;
    interaction.js = snippets.js;
  });
}

function getSnippetClasses(snippet) {
  return Array.from(snippet.matchAll(/class="([^"]+)"/g))
    .flatMap((match) => match[1].split(/\s+/))
    .filter(Boolean);
}

function validateInteractions(interactionList) {
  const ids = new Set();
  const duplicateIds = new Set();
  const allowedCategory = getTaxonomyValues('category');
  const allowedComplexity = getTaxonomyValues('complexity');
  const allowedMotion = getTaxonomyValues('motion');
  const allowedPreviewType = getTaxonomyValues('previewType');
  const snippetClassOwners = new Map();
  const warnings = [];
  const weakAccessibilityPhrases = [
    'dostępne dla czytników ekranu',
    'zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji',
    'nie powinien polegać wyłącznie na kolorze'
  ];
  const reducedMotionTerms = ['prefers-reduced-motion', 'reduced motion', 'ograniczeniu animacji', 'ograniczonego ruchu', 'bez animacji', 'usuń', 'wyłącz', 'zastąp', 'skróć', 'statycz'];

  interactionList.forEach((interaction, index) => {
    const label = interaction.id || `interaction at index ${index}`;

    requiredInteractionFields.forEach((field) => {
      if (!Object.prototype.hasOwnProperty.call(interaction, field)) {
        warnings.push(`${label}: missing required field "${field}".`);
      }
    });

    requiredStringInteractionFields.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(interaction, field) && (typeof interaction[field] !== 'string' || interaction[field].trim() === '')) {
        warnings.push(`${label}: required field "${field}" must be a non-empty string.`);
      }
    });
    if (Object.prototype.hasOwnProperty.call(interaction, 'featured') && typeof interaction.featured !== 'boolean') {
      warnings.push(`${label}: required field "featured" must be a boolean.`);
    }

    if (interaction.id) {
      if (ids.has(interaction.id)) {
        duplicateIds.add(interaction.id);
      }
      ids.add(interaction.id);
    }

    if (!allowedCategory.includes(interaction.category)) warnings.push(`${label}: invalid category "${interaction.category}".`);
    if (!allowedComplexity.includes(interaction.complexity)) warnings.push(`${label}: invalid complexity "${interaction.complexity}".`);
    if (!allowedMotion.includes(interaction.motion)) warnings.push(`${label}: invalid motion "${interaction.motion}".`);
    if (!allowedPreviewType.includes(interaction.previewType)) warnings.push(`${label}: invalid previewType "${interaction.previewType}".`);

    const accessibilityNote = typeof interaction.accessibility === 'string' ? interaction.accessibility.trim() : '';
    const normalizedAccessibilityNote = normalize(accessibilityNote);
    if (!Object.prototype.hasOwnProperty.call(interaction, 'accessibility')) {
      warnings.push(`${label}: missing accessibility note.`);
    } else if (!accessibilityNote) {
      warnings.push(`${label}: accessibility note cannot be empty.`);
    } else {
      if (accessibilityNote.length < 80 || weakAccessibilityPhrases.some((phrase) => normalizedAccessibilityNote === phrase)) {
        warnings.push(`${label}: accessibility note looks too short or generic; add pattern-specific keyboard, ARIA, contrast or motion guidance.`);
      }
      if (['medium', 'expressive'].includes(interaction.motion) && !reducedMotionTerms.some((term) => normalizedAccessibilityNote.includes(term))) {
        warnings.push(`${label}: motion level "${interaction.motion}" needs an explicit reduced-motion strategy in the accessibility note.`);
      }
    }

    ['html', 'css', 'js'].forEach((field) => {
      if (!Object.prototype.hasOwnProperty.call(interaction, field)) {
        warnings.push(`${label}: missing "${field}" snippet field.`);
        return;
      }
      if (typeof interaction[field] !== 'string') {
        warnings.push(`${label}: "${field}" snippet must be a string${field === 'js' ? '; use an empty string when JavaScript is not needed' : ''}.`);
        return;
      }
      if ((field === 'html' || field === 'css') && interaction[field].trim() === '') {
        warnings.push(`${label}: "${field}" snippet is required and cannot be empty.`);
      }
      if (/<script[\s>]/i.test(interaction[field]) || /\beval\s*\(/i.test(interaction[field]) || /https?:\/\/|cdn\./i.test(interaction[field])) {
        warnings.push(`${label}: "${field}" snippet contains a forbidden pattern (<script>, eval or external CDN/link).`);
      }
    });

    getSnippetClasses(`${interaction.html || ''}\n${interaction.css || ''}`).forEach((className) => {
      const owner = snippetClassOwners.get(className);
      if (owner && owner !== label && className.startsWith('mi-')) {
        warnings.push(`${label}: possible duplicate snippet class "${className}" also used by ${owner}.`);
      } else {
        snippetClassOwners.set(className, label);
      }
    });
  });

  duplicateIds.forEach((id) => warnings.push(`Duplicate interaction id "${id}".`));

  if (warnings.length > 0) {
    console.warn('Interaction metadata validation warnings:', warnings);
  }

  return warnings;
}


function createPreviewShell(previewType, interaction) {
  const safeType = previewRenderers[previewType] ? previewType : 'fallback';
  const wrapper = createElement('div', `interaction-demo interaction-demo--${safeType}`);
  wrapper.dataset.previewType = safeType;
  wrapper.setAttribute('aria-label', `Demo: ${interaction?.name || 'podgląd mikrointerakcji'}`);

  const label = createElement('p', 'interaction-demo__label', `Demo: ${getPreviewLabel(safeType)}`);
  wrapper.append(label);
  return wrapper;
}

function getPreviewLabel(previewType) {
  const labels = {
    accordion: 'sekcja rozwijana dostępna z klawiatury',
    'button-glow': 'przycisk z subtelnym stanem hover i focus',
    'button-loading': 'przycisk pokazujący stan zapisywania',
    'button-magnetic': 'CTA z lekką odpowiedzią na interakcję',
    'button-press': 'przycisk z wyczuwalnym stanem naciśnięcia',
    card: 'karta z czytelną hierarchią i hover state',
    dot: 'znacznik nowych powiadomień z tekstową etykietą',
    empty: 'empty state z instrukcją następnego kroku',
    field: 'pole formularza z tekstowym komunikatem stanu',
    meter: 'miernik jakości pokazany tekstem i paskiem',
    progress: 'postęp procesu z wartością procentową',
    row: 'wiersz danych ze statusem tekstowym',
    skeleton: 'skeleton loading dla karty produktu',
    status: 'status z ikoną oraz tekstem',
    tabs: 'przełączane zakładki na natywnych przyciskach',
    toast: 'toast z informacją o zapisaniu ustawień',
    tooltip: 'podpowiedź dostępna na hover i focus',
    fallback: 'bezpieczny podgląd zastępczy dla nieznanego typu'
  };
  return labels[previewType] || labels.fallback;
}

function renderButtonGlowPreview(wrapper, interaction) { const button = createElement('button', 'demo-button demo-button--glow', interaction.name); button.type = 'button'; wrapper.append(button); }
function renderButtonMagneticPreview(wrapper, interaction) { const button = createElement('button', 'demo-button demo-button--glow demo-button--magnetic', interaction.name); button.type = 'button'; wrapper.append(button); }
function renderButtonPressPreview(wrapper, interaction) { const button = createElement('button', 'demo-button demo-button--press', interaction.name); button.type = 'button'; wrapper.append(button); }
function renderButtonLoadingPreview(wrapper) { const button = createElement('button', 'demo-button demo-button--loading', 'Zapisywanie'); button.type = 'button'; wrapper.append(button, createElement('span', 'interaction-demo__hint', 'Stan: trwa zapisywanie danych.')); }
function renderCardPreview(wrapper, interaction) { const card = createElement('article', 'demo-card'); card.append(createElement('h4', '', interaction.name), createElement('p', '', 'Subtelny hover state z czytelną hierarchią treści.')); wrapper.append(card); }
function renderSkeletonPreview(wrapper) { const skeleton = createElement('div', 'demo-skeleton'); skeleton.setAttribute('aria-hidden', 'true'); skeleton.append(createElement('span'), createElement('span'), createElement('span')); wrapper.append(skeleton, createElement('span', 'interaction-demo__hint', 'Ładowanie: układ karty jest rezerwowany przed pojawieniem się treści.')); }
function renderStatusPreview(wrapper, interaction) { const status = createElement('div', 'demo-status'); status.setAttribute('role', 'status'); status.append(createElement('span'), document.createTextNode(interaction.name)); wrapper.append(status); }
function renderFieldPreview(wrapper) { const field = createElement('label', 'demo-field'); field.append(createElement('span', '', 'Email zespołu')); const input = createElement('input'); input.type = 'email'; input.value = 'team@kp.dev'; field.append(input, createElement('small', '', 'Komunikat stanu: format adresu jest poprawny.')); wrapper.append(field); }
function renderTabsPreview(wrapper) { const tabs = createElement('div', 'demo-tabs'); tabs.setAttribute('role', 'tablist'); ['Design', 'Code', 'Audit'].forEach((item, index) => { const tab = createElement('button', '', item); tab.type = 'button'; tab.setAttribute('role', 'tab'); tab.setAttribute('aria-selected', String(index === 0)); tab.addEventListener('click', () => { Array.from(tabs.querySelectorAll('button')).forEach((button) => button.setAttribute('aria-selected', String(button === tab))); }); tabs.append(tab); }); wrapper.append(tabs, createElement('span', 'interaction-demo__hint', 'Użyj Tab i Enter/Space, aby przełączać zakładki.')); }
function renderAccordionPreview(wrapper) { const details = createElement('details', 'demo-accordion'); details.open = true; details.append(createElement('summary', '', 'Jak działa wzorzec?'), createElement('p', '', 'Treść rozwija się przewidywalnie i pozostaje dostępna z klawiatury.')); wrapper.append(details); }
function renderTooltipPreview(wrapper) { const tooltip = createElement('button', 'demo-tooltip', 'Najedź lub ustaw focus'); tooltip.type = 'button'; tooltip.setAttribute('aria-label', 'Najedź lub ustaw focus, aby zobaczyć podpowiedź: Bezpieczna podpowiedź tekstowa.'); wrapper.append(tooltip); }
function renderEmptyPreview(wrapper) { const empty = createElement('div', 'demo-empty'); empty.append(createElement('div', '', '⌁'), createElement('h4', '', 'Brak danych'), createElement('p', '', 'Dodaj pierwszy element, aby rozpocząć.')); wrapper.append(empty); }
function renderDotPreview(wrapper) { const dot = createElement('div', 'demo-dot'); dot.setAttribute('role', 'img'); dot.setAttribute('aria-label', '3 nowe powiadomienia'); wrapper.append(dot, createElement('span', 'interaction-demo__hint', '3 nowe powiadomienia')); }
function renderMeterPreview(wrapper) { const meter = createElement('div', 'demo-meter'); meter.append(createElement('strong', '', 'Siła hasła: dobra')); const bar = createElement('div', 'demo-meter__bar'); bar.setAttribute('aria-hidden', 'true'); bar.append(createElement('span')); meter.append(bar); wrapper.append(meter); }
function renderProgressPreview(wrapper) { const progress = createElement('div', 'demo-progress'); progress.append(createElement('span', '', 'Postęp konfiguracji'), createElement('strong', '', '86%')); const track = createElement('div'); track.setAttribute('aria-hidden', 'true'); track.append(createElement('i')); progress.append(track); wrapper.append(progress); }
function renderRowPreview(wrapper) { const row = createElement('div', 'demo-row'); row.append(createElement('span', '', 'Vault token'), createElement('strong', '', 'Status: aktywny')); wrapper.append(row); }
function renderToastPreview(wrapper) { const toast = createElement('div', 'demo-toast-preview'); toast.setAttribute('role', 'status'); toast.append(createElement('strong', '', 'Zapisano ustawienia'), createElement('span', '', 'Toast pokazuje krótkie potwierdzenie akcji.')); wrapper.append(toast); }
function renderFallbackPreview(wrapper, interaction) { const fallback = createElement('div', 'demo-fallback'); fallback.append(createElement('strong', '', 'Bezpieczny podgląd zastępczy'), createElement('p', '', `${interaction?.name || 'Ten wzorzec'} nie ma rozpoznanego typu podglądu, ale snippetty pozostają dostępne w panelu kodu.`)); wrapper.append(fallback); }

const previewRenderers = {
  accordion: renderAccordionPreview,
  'button-glow': renderButtonGlowPreview,
  'button-loading': renderButtonLoadingPreview,
  'button-magnetic': renderButtonMagneticPreview,
  'button-press': renderButtonPressPreview,
  card: renderCardPreview,
  dot: renderDotPreview,
  empty: renderEmptyPreview,
  field: renderFieldPreview,
  meter: renderMeterPreview,
  progress: renderProgressPreview,
  row: renderRowPreview,
  skeleton: renderSkeletonPreview,
  status: renderStatusPreview,
  tabs: renderTabsPreview,
  toast: renderToastPreview,
  tooltip: renderTooltipPreview
};

function renderPreviewMarkup(previewType, interactionOrLabel) {
  const interaction = typeof interactionOrLabel === 'object' ? interactionOrLabel : { name: interactionOrLabel || 'Podgląd mikrointerakcji', previewType };
  const renderer = previewRenderers[previewType];
  const wrapper = createPreviewShell(previewType, interaction);
  if (!renderer) {
    console.warn(`Unknown previewType "${previewType}". Rendering safe fallback preview.`);
    renderFallbackPreview(wrapper, interaction);
    return wrapper;
  }
  renderer(wrapper, interaction);
  return wrapper;
}

function updatePreview(interaction) {
  dom.previewSurface.replaceChildren();
  dom.previewMeta.replaceChildren();
  if (!interaction) {
    dom.previewName.textContent = 'Brak wzorca do podglądu';
    dom.previewDescription.textContent = 'Żaden wzorzec nie pasuje do aktualnych filtrów. Wyczyść filtry, aby wrócić do biblioteki.';
    dom.previewSurface.replaceChildren(createElement('p', 'preview-stage__empty-note', 'Brak podglądu dla pustego wyniku.'));
    dom.previewBestFor.textContent = 'Wyczyść filtry albo zmień frazę wyszukiwania.';
    dom.previewAccessibility.textContent = 'Pusty stan jest komunikowany tekstowo i nie blokuje panelu kodu.';
    return;
  }
  dom.previewName.textContent = interaction.name;
  dom.previewDescription.textContent = interaction.description;
  dom.previewMeta.replaceChildren(renderMeta(interaction));
  dom.previewSurface.replaceChildren(renderPreviewMarkup(interaction.previewType, interaction));
  dom.previewBestFor.textContent = interaction.bestFor;
  dom.previewAccessibility.textContent = interaction.accessibility;
}

function renderMeta(interaction) {
  const fragment = document.createDocumentFragment();
  ['category', 'complexity', 'motion'].forEach((key) => {
    const badge = createElement('span', 'badge', getTaxonomyLabel(key, interaction[key]));
    if (key === 'motion') {
      badge.classList.add('badge--motion');
    }
    fragment.append(badge);
  });
  return fragment;
}

function readFilterStateFromControls() {
  filterState.search = dom.searchInput.value;
  filterState.category = dom.categoryFilter.value;
  filterState.complexity = dom.complexityFilter.value;
  filterState.motion = dom.motionFilter.value;
}

function syncSelectedInteraction(filteredInteractions) {
  if (filteredInteractions.some((interaction) => interaction.id === state.selectedId)) {
    return;
  }
  state.selectedId = filteredInteractions[0]?.id || null;
}

function renderCards() {
  const filtered = applyFilters();
  syncSelectedInteraction(filtered);
  dom.patternGrid.replaceChildren();
  filtered.forEach((interaction) => {
    const isSelected = interaction.id === state.selectedId;
    const card = createElement('article', 'pattern-card');
    card.dataset.patternId = interaction.id;
    card.classList.toggle('is-selected', isSelected);

    const selectButton = createElement('button', 'pattern-card__select');
    selectButton.type = 'button';
    selectButton.setAttribute('aria-pressed', String(isSelected));
    selectButton.setAttribute('aria-label', `Wybierz wzorzec: ${interaction.name}`);
    selectButton.addEventListener('click', () => selectInteraction(interaction.id));

    const preview = createElement('div', 'pattern-card__preview');
    preview.append(renderPreviewMarkup(interaction.previewType, interaction));
    const status = createElement('span', 'pattern-card__selected-label', isSelected ? 'Wybrany wzorzec' : 'Wybierz wzorzec');
    const title = createElement('h3', 'pattern-card__title', interaction.name);
    const description = createElement('p', 'pattern-card__description', interaction.description);
    const meta = createElement('div', 'pattern-card__meta');
    meta.setAttribute('aria-label', 'Metadane wzorca');
    meta.append(renderMeta(interaction));
    const best = createElement('p', 'pattern-card__best', `Najlepsze użycie: ${interaction.bestFor}`);
    const a11y = createElement('p', 'pattern-card__a11y', `Dostępność: ${interaction.accessibility}`);
    selectButton.append(status, title, description, meta, best, a11y);

    const actions = createElement('div', 'pattern-card__actions');
    actions.append(createActionButton('Kopiuj HTML', () => copySnippet(interaction, 'html')));
    actions.append(createActionButton('Kopiuj CSS', () => copySnippet(interaction, 'css')));
    if (interaction.js) {
      actions.append(createActionButton('Kopiuj JS', () => copySnippet(interaction, 'js')));
    }
    card.append(preview, selectButton, actions);
    dom.patternGrid.append(card);
  });
  renderResultStatus(filtered.length);
  dom.emptyState.classList.toggle('is-hidden', filtered.length > 0);
  dom.patternGrid.classList.toggle('is-hidden', filtered.length === 0);
  renderFeaturedPreview();
  renderCodePanel();
}

function createActionButton(label, onClick) {
  const button = createElement('button', 'button button--ghost', label);
  button.type = 'button';
  button.addEventListener('click', onClick);
  return button;
}

function applyFilters() {
  const query = normalize(filterState.search);
  return interactions.filter((interaction) => {
    const searchableText = [
      interaction.name,
      interaction.description,
      getTaxonomyLabel('category', interaction.category),
      interaction.category,
      interaction.bestFor,
      interaction.accessibility
    ].join(' ');
    const matchesQuery = !query || normalize(searchableText).includes(query);
    const matchesCategory = filterState.category === 'all' || interaction.category === filterState.category;
    const matchesComplexity = filterState.complexity === 'all' || interaction.complexity === filterState.complexity;
    const matchesMotion = filterState.motion === 'all' || interaction.motion === filterState.motion;
    return matchesQuery && matchesCategory && matchesComplexity && matchesMotion;
  });
}

function renderResultStatus(resultCount) {
  dom.resultsCount.textContent = resultCount === 0
    ? 'Brak wyników dla wybranych filtrów.'
    : `Znaleziono ${resultCount} ${getPolishResultWord(resultCount)} z ${interactions.length}.`;
}

function getPolishResultWord(count) {
  if (count === 1) {
    return 'interakcję';
  }
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  return lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14) ? 'interakcje' : 'interakcji';
}

function renderFeaturedPreview() {
  updatePreview(getSelectedInteraction());
}

function renderCodePanel() {
  const interaction = getSelectedInteraction();
  const snippet = interaction
    ? getDisplaySnippet(interaction, state.activeCodeTab)
    : '// Brak snippetu: aktualne filtry nie zwracają żadnego wzorca.';
  dom.codeOutput.textContent = snippet;
  queryAll(selectors.codeTabs).forEach((tab) => {
    const active = tab.dataset.codeTab === state.activeCodeTab;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
  });
}

function getDisplaySnippet(interaction, type) {
  if (type === 'js' && interaction.js === '') {
    return '// Ten wzorzec nie wymaga dodatkowego JavaScriptu.';
  }
  return interaction[type] || `// Brak snippetu ${type.toUpperCase()} dla tego wzorca.`;
}

function selectInteraction(id) {
  state.selectedId = id;
  renderCards();
  showToast('Podgląd został zaktualizowany.', 'success');
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.className = 'clipboard-fallback';
  document.body.append(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

function copySnippet(interaction, type) {
  if (!interaction) {
    showToast('Brak wzorca do skopiowania. Wyczyść filtry lub wybierz wynik.', 'error');
    return;
  }
  const snippet = interaction[type];
  if (type === 'js' && snippet === '') {
    showToast('Ten wzorzec nie wymaga JavaScriptu — nie ma kodu JS do skopiowania.', 'success');
    return;
  }
  copyText(snippet)
    .then(() => showToast(`Skopiowano ${type.toUpperCase()} dla: ${interaction.name}.`, 'success'))
    .catch(() => showToast('Nie udało się skopiować. Zaznacz kod ręcznie.', 'error'));
}

function showToast(message, variant) {
  const toast = createElement('div', `toast toast--${variant || 'success'}`, message);
  toast.setAttribute('role', 'status');
  dom.toastRegion.append(toast);
  window.setTimeout(() => toast.remove(), 3200);
}

function resetFilters() {
  filterState.search = '';
  filterState.category = 'all';
  filterState.complexity = 'all';
  filterState.motion = 'all';
  dom.searchInput.value = '';
  dom.categoryFilter.value = 'all';
  dom.complexityFilter.value = 'all';
  dom.motionFilter.value = 'all';
  renderCards();
}


function initTheme() {
  const stored = localStorage.getItem('kp-micro-theme');
  const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  state.theme = stored || (preferredDark ? 'dark' : 'light');
  applyTheme();
  dom.themeToggle.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('kp-micro-theme', state.theme);
    applyTheme();
  });
}

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  const dark = state.theme === 'dark';
  dom.themeToggle.setAttribute('aria-pressed', String(dark));
  dom.themeLabel.textContent = dark ? 'Light' : 'Dark';
}

function initFilters() {
  populateSelect(dom.categoryFilter, interactionTaxonomy.category);
  populateSelect(dom.complexityFilter, interactionTaxonomy.complexity);
  populateSelect(dom.motionFilter, interactionTaxonomy.motion);
  [dom.searchInput, dom.categoryFilter, dom.complexityFilter, dom.motionFilter].forEach((control) => {
    control.addEventListener(control === dom.searchInput ? 'input' : 'change', () => {
      readFilterStateFromControls();
      renderCards();
    });
  });
  dom.resetFilters.addEventListener('click', resetFilters);
  dom.emptyReset.addEventListener('click', resetFilters);
}

function initCodeTabs() {
  queryAll(selectors.codeTabs).forEach((tab) => {
    tab.addEventListener('click', () => {
      state.activeCodeTab = tab.dataset.codeTab;
      renderCodePanel();
    });
  });
  dom.copyCurrent.addEventListener('click', () => copySnippet(getSelectedInteraction(), state.activeCodeTab));
}

function initNavigation() {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) {
      return;
    }
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.setAttribute('tabindex', '-1');
      window.setTimeout(() => target.focus({ preventScroll: true }), 250);
    }
  });
}

function cacheDom() {
  Object.entries(selectors).forEach(([key, selector]) => {
    if (key === 'codeTabs') {
      return;
    }
    dom[key] = queryElement(selector);
  });
}

function initApp() {
  cacheDom();
  normalizeInteractionSnippets(interactions);
  validateInteractions(interactions);
  initTheme();
  initFilters();
  initCodeTabs();
  initNavigation();
  renderFeaturedPreview();
  renderCodePanel();
  renderCards();
}

document.addEventListener('DOMContentLoaded', initApp);
