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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Magnetic CTA Button nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Soft Glow Button nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Pressable Button nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Loading Button nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Success Button nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Ripple Feedback Button nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Tilt Product Card nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Lift Card nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Expandable Info Card nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Pricing Highlight Card nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Skeleton Profile Card nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Skeleton Dashboard Row nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Progress Stepper nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Animated Badge nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Status Pulse nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Toast Feedback nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Inline Form Error nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Floating Label Input nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Password Strength Meter nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Segmented Control nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Tabs Indicator nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Accordion Reveal nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Tooltip Hint nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Empty State CTA nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Notification Dot nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Copy Feedback Chip nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Mini Progress Bar nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Timeline Item Reveal nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Data Row Hover nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Save State Indicator nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Empty Search Results nie powinien polegać wyłącznie na kolorze.",
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
    accessibility: "Zapewnij widoczny focus, tekstową etykietę oraz wariant bez animacji dla prefers-reduced-motion; Valid Field Check nie powinien polegać wyłącznie na kolorze.",
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

function validateInteractions(interactionList) {
  const ids = new Set();
  const duplicateIds = new Set();
  const allowedCategory = getTaxonomyValues('category');
  const allowedComplexity = getTaxonomyValues('complexity');
  const allowedMotion = getTaxonomyValues('motion');
  const allowedPreviewType = getTaxonomyValues('previewType');
  const warnings = [];

  interactionList.forEach((interaction, index) => {
    const label = interaction.id || `interaction at index ${index}`;

    requiredInteractionFields.forEach((field) => {
      if (!Object.prototype.hasOwnProperty.call(interaction, field)) {
        warnings.push(`${label}: missing required field "${field}".`);
      }
    });

    if (interaction.id) {
      if (ids.has(interaction.id)) {
        duplicateIds.add(interaction.id);
      }
      ids.add(interaction.id);
    }

    if (!allowedCategory.includes(interaction.category)) {
      warnings.push(`${label}: invalid category "${interaction.category}".`);
    }
    if (!allowedComplexity.includes(interaction.complexity)) {
      warnings.push(`${label}: invalid complexity "${interaction.complexity}".`);
    }
    if (!allowedMotion.includes(interaction.motion)) {
      warnings.push(`${label}: invalid motion "${interaction.motion}".`);
    }
    if (!allowedPreviewType.includes(interaction.previewType)) {
      warnings.push(`${label}: invalid previewType "${interaction.previewType}".`);
    }
    ['html', 'css'].forEach((field) => {
      if (typeof interaction[field] !== 'string' || interaction[field].trim() === '') {
        warnings.push(`${label}: "${field}" snippet is required and cannot be empty.`);
      }
    });
    if (typeof interaction.js !== 'string') {
      warnings.push(`${label}: "js" must be a string; use an empty string when JavaScript is not needed.`);
    }
  });

  duplicateIds.forEach((id) => warnings.push(`Duplicate interaction id "${id}".`));

  if (warnings.length > 0) {
    console.warn('Interaction metadata validation warnings:', warnings);
  }
}

function renderPreviewMarkup(previewType, label) {
  const wrapper = createElement('div', `interaction-demo interaction-demo--${previewType}`);
  if (previewType === 'card') {
    const card = createElement('article', 'demo-card');
    card.append(createElement('h4', '', label));
    card.append(createElement('p', '', 'Subtelny hover state z czytelną hierarchią treści.'));
    wrapper.append(card);
    return wrapper;
  }
  if (previewType === 'skeleton') {
    const skeleton = createElement('div', 'demo-skeleton');
    skeleton.setAttribute('aria-hidden', 'true');
    skeleton.append(createElement('span'));
    skeleton.append(createElement('span'));
    skeleton.append(createElement('span'));
    wrapper.append(skeleton);
    return wrapper;
  }
  if (previewType === 'status') {
    const status = createElement('div', 'demo-status');
    status.append(createElement('span'));
    status.append(document.createTextNode(label));
    wrapper.append(status);
    return wrapper;
  }
  if (previewType === 'field') {
    const field = createElement('label', 'demo-field');
    field.append(createElement('span', '', 'Email zespołu'));
    const input = createElement('input');
    input.type = 'email';
    input.value = 'team@kp.dev';
    field.append(input);
    field.append(createElement('small', '', 'Komunikat stanu jest tekstowy.'));
    wrapper.append(field);
    return wrapper;
  }
  if (previewType === 'tabs') {
    const tabs = createElement('div', 'demo-tabs');
    tabs.setAttribute('role', 'tablist');
    ['Design', 'Code', 'Audit'].forEach((item) => tabs.append(createElement('button', '', item)));
    wrapper.append(tabs);
    return wrapper;
  }
  if (previewType === 'accordion') {
    const details = createElement('details', 'demo-accordion');
    details.open = true;
    details.append(createElement('summary', '', 'Jak działa wzorzec?'));
    details.append(createElement('p', '', 'Treść rozwija się przewidywalnie i pozostaje dostępna z klawiatury.'));
    wrapper.append(details);
    return wrapper;
  }
  if (previewType === 'tooltip') {
    const tooltip = createElement('button', 'demo-tooltip', 'Najedź lub ustaw focus');
    tooltip.type = 'button';
    wrapper.append(tooltip);
    return wrapper;
  }
  if (previewType === 'empty') {
    const empty = createElement('div', 'demo-empty');
    empty.append(createElement('div', '', '⌁'));
    empty.append(createElement('h4', '', 'Brak danych'));
    empty.append(createElement('p', '', 'Dodaj pierwszy element, aby rozpocząć.'));
    wrapper.append(empty);
    return wrapper;
  }
  if (previewType === 'dot') {
    const dot = createElement('div', 'demo-dot');
    dot.setAttribute('aria-label', '3 nowe powiadomienia');
    wrapper.append(dot);
    return wrapper;
  }
  if (previewType === 'meter') {
    const meter = createElement('div', 'demo-meter');
    meter.append(createElement('strong', '', 'Siła hasła: dobra'));
    const bar = createElement('div', 'demo-meter__bar');
    bar.append(createElement('span'));
    meter.append(bar);
    wrapper.append(meter);
    return wrapper;
  }
  if (previewType === 'progress') {
    const progress = createElement('div', 'demo-progress');
    progress.append(createElement('span', '', 'Postęp konfiguracji'));
    progress.append(createElement('strong', '', '86%'));
    const track = createElement('div');
    track.append(createElement('i'));
    progress.append(track);
    wrapper.append(progress);
    return wrapper;
  }
  if (previewType === 'row') {
    const row = createElement('div', 'demo-row');
    row.append(createElement('span', '', 'Vault token'));
    row.append(createElement('strong', '', 'Aktywny'));
    wrapper.append(row);
    return wrapper;
  }
  const button = createElement('button', 'demo-button demo-button--glow', label);
  button.type = 'button';
  if (previewType === 'button-press') {
    button.className = 'demo-button demo-button--press';
  }
  if (previewType === 'button-loading') {
    button.className = 'demo-button demo-button--loading';
    button.textContent = 'Zapisywanie';
  }
  wrapper.append(button);
  return wrapper;
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
    preview.append(renderPreviewMarkup(interaction.previewType, interaction.name));
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
  const interaction = getSelectedInteraction();
  if (!interaction) {
    dom.previewName.textContent = 'Brak wzorca do podglądu';
    dom.previewDescription.textContent = 'Żaden wzorzec nie pasuje do aktualnych filtrów. Wyczyść filtry, aby wrócić do biblioteki.';
    dom.previewMeta.replaceChildren();
    dom.previewSurface.replaceChildren(createElement('p', 'preview-stage__empty-note', 'Brak podglądu dla pustego wyniku.'));
    dom.previewBestFor.textContent = 'Wyczyść filtry albo zmień frazę wyszukiwania.';
    dom.previewAccessibility.textContent = 'Pusty stan jest komunikowany tekstowo i nie blokuje panelu kodu.';
    return;
  }
  dom.previewName.textContent = interaction.name;
  dom.previewDescription.textContent = interaction.description;
  dom.previewMeta.replaceChildren(renderMeta(interaction));
  dom.previewSurface.replaceChildren(renderPreviewMarkup(interaction.previewType, interaction.name));
  dom.previewBestFor.textContent = interaction.bestFor;
  dom.previewAccessibility.textContent = interaction.accessibility;
}

function renderCodePanel() {
  const interaction = getSelectedInteraction();
  const snippet = interaction ? (interaction[state.activeCodeTab] || '// Ten wzorzec nie wymaga dodatkowego JavaScriptu.') : '// Brak snippetu: aktualne filtry nie zwracają żadnego wzorca.';
  dom.codeOutput.textContent = snippet;
  queryAll(selectors.codeTabs).forEach((tab) => {
    const active = tab.dataset.codeTab === state.activeCodeTab;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
  });
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
  const snippet = interaction[type] || '// Ten wzorzec nie wymaga tego typu snippetu.';
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
