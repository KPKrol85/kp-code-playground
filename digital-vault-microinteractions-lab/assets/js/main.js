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

const state = {
  query: '',
  category: 'all',
  complexity: 'all',
  motion: 'all',
  selectedId: 'button-magnetic',
  activeCodeTab: 'html',
  theme: 'light'
};

const interactions = [
  {
    id: "button-magnetic",
    name: "Magnetic CTA Button",
    category: "Buttons",
    complexity: "Medium",
    motion: "Animated",
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
    category: "Buttons",
    complexity: "Easy",
    motion: "Subtle",
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
    category: "Buttons",
    complexity: "Easy",
    motion: "Subtle",
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
    category: "Buttons",
    complexity: "Medium",
    motion: "Animated",
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
    category: "Feedback",
    complexity: "Medium",
    motion: "Subtle",
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
    category: "Buttons",
    complexity: "Advanced",
    motion: "Animated",
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
    category: "Cards",
    complexity: "Advanced",
    motion: "Animated",
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
    category: "Cards",
    complexity: "Easy",
    motion: "Subtle",
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
    category: "Cards",
    complexity: "Medium",
    motion: "Subtle",
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
    category: "Cards",
    complexity: "Medium",
    motion: "Subtle",
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
    category: "Loading",
    complexity: "Easy",
    motion: "Animated",
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
    category: "Loading",
    complexity: "Easy",
    motion: "Animated",
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
    category: "Navigation",
    complexity: "Medium",
    motion: "Subtle",
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
    category: "Feedback",
    complexity: "Easy",
    motion: "Animated",
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
    category: "Feedback",
    complexity: "Easy",
    motion: "Animated",
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
    category: "Feedback",
    complexity: "Medium",
    motion: "Subtle",
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
    category: "Forms",
    complexity: "Easy",
    motion: "Static",
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
    category: "Forms",
    complexity: "Medium",
    motion: "Subtle",
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
    category: "Forms",
    complexity: "Medium",
    motion: "Subtle",
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
    category: "Navigation",
    complexity: "Medium",
    motion: "Subtle",
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
    category: "Navigation",
    complexity: "Medium",
    motion: "Subtle",
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
    category: "Navigation",
    complexity: "Easy",
    motion: "Subtle",
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
    category: "Feedback",
    complexity: "Easy",
    motion: "Static",
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
    category: "Empty States",
    complexity: "Easy",
    motion: "Static",
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
    category: "Feedback",
    complexity: "Easy",
    motion: "Static",
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
    category: "Feedback",
    complexity: "Medium",
    motion: "Subtle",
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
    category: "Data UI",
    complexity: "Easy",
    motion: "Animated",
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
    category: "Data UI",
    complexity: "Medium",
    motion: "Subtle",
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
    category: "Data UI",
    complexity: "Easy",
    motion: "Subtle",
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
    category: "Feedback",
    complexity: "Medium",
    motion: "Subtle",
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
    category: "Empty States",
    complexity: "Easy",
    motion: "Static",
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
    category: "Forms",
    complexity: "Easy",
    motion: "Subtle",
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

function getSelectedInteraction() {
  return interactions.find((interaction) => interaction.id === state.selectedId) || interactions[0];
}

function getUniqueValues(key) {
  return [...new Set(interactions.map((interaction) => interaction[key]))].sort((a, b) => a.localeCompare(b, 'pl'));
}

function populateSelect(selectElement, values) {
  values.forEach((value) => {
    const option = createElement('option', '', value);
    option.value = value;
    selectElement.append(option);
  });
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
    const badge = createElement('span', 'badge', interaction[key]);
    if (key === 'motion') {
      badge.classList.add('badge--motion');
    }
    fragment.append(badge);
  });
  return fragment;
}

function renderCards() {
  const filtered = applyFilters();
  dom.patternGrid.replaceChildren();
  filtered.forEach((interaction) => {
    const card = createElement('article', 'pattern-card');
    card.dataset.patternId = interaction.id;
    if (interaction.id === state.selectedId) {
      card.classList.add('is-selected');
    }
    const preview = createElement('div', 'pattern-card__preview');
    preview.append(renderPreviewMarkup(interaction.previewType, interaction.name));
    const header = createElement('div', 'pattern-card__header');
    const titleWrap = createElement('div');
    titleWrap.append(createElement('h3', 'pattern-card__title', interaction.name));
    titleWrap.append(createElement('p', 'pattern-card__description', interaction.description));
    header.append(titleWrap);
    const meta = createElement('div', 'pattern-card__meta');
    meta.append(renderMeta(interaction));
    const best = createElement('p', 'pattern-card__best', `Best for: ${interaction.bestFor}`);
    const actions = createElement('div', 'pattern-card__actions');
    actions.append(createActionButton('Preview', () => selectInteraction(interaction.id)));
    actions.append(createActionButton('Copy HTML', () => copySnippet(interaction, 'html')));
    actions.append(createActionButton('Copy CSS', () => copySnippet(interaction, 'css')));
    if (interaction.js) {
      actions.append(createActionButton('Copy JS', () => copySnippet(interaction, 'js')));
    }
    card.append(preview, header, meta, best, actions);
    dom.patternGrid.append(card);
  });
  dom.resultsCount.textContent = `${filtered.length} z ${interactions.length} wzorców pasuje do filtrów.`;
  dom.emptyState.classList.toggle('is-hidden', filtered.length > 0);
  dom.patternGrid.classList.toggle('is-hidden', filtered.length === 0);
}

function createActionButton(label, onClick) {
  const button = createElement('button', 'button button--ghost', label);
  button.type = 'button';
  button.addEventListener('click', onClick);
  return button;
}

function applyFilters() {
  const query = normalize(state.query);
  return interactions.filter((interaction) => {
    const haystack = normalize(`${interaction.name} ${interaction.description} ${interaction.bestFor} ${interaction.category}`);
    const matchesQuery = !query || haystack.includes(query);
    const matchesCategory = state.category === 'all' || interaction.category === state.category;
    const matchesComplexity = state.complexity === 'all' || interaction.complexity === state.complexity;
    const matchesMotion = state.motion === 'all' || interaction.motion === state.motion;
    return matchesQuery && matchesCategory && matchesComplexity && matchesMotion;
  });
}

function renderFeaturedPreview() {
  const interaction = getSelectedInteraction();
  dom.previewName.textContent = interaction.name;
  dom.previewDescription.textContent = interaction.description;
  dom.previewMeta.replaceChildren(renderMeta(interaction));
  dom.previewSurface.replaceChildren(renderPreviewMarkup(interaction.previewType, interaction.name));
  dom.previewBestFor.textContent = interaction.bestFor;
  dom.previewAccessibility.textContent = interaction.accessibility;
}

function renderCodePanel() {
  const interaction = getSelectedInteraction();
  const snippet = interaction[state.activeCodeTab] || '// Ten wzorzec nie wymaga dodatkowego JavaScriptu.';
  dom.codeOutput.textContent = snippet;
  queryAll(selectors.codeTabs).forEach((tab) => {
    const active = tab.dataset.codeTab === state.activeCodeTab;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
  });
}

function selectInteraction(id) {
  state.selectedId = id;
  renderFeaturedPreview();
  renderCodePanel();
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
  state.query = '';
  state.category = 'all';
  state.complexity = 'all';
  state.motion = 'all';
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
  populateSelect(dom.categoryFilter, getUniqueValues('category'));
  populateSelect(dom.complexityFilter, getUniqueValues('complexity'));
  populateSelect(dom.motionFilter, getUniqueValues('motion'));
  dom.searchInput.addEventListener('input', (event) => {
    state.query = event.target.value;
    renderCards();
  });
  dom.categoryFilter.addEventListener('change', (event) => {
    state.category = event.target.value;
    renderCards();
  });
  dom.complexityFilter.addEventListener('change', (event) => {
    state.complexity = event.target.value;
    renderCards();
  });
  dom.motionFilter.addEventListener('change', (event) => {
    state.motion = event.target.value;
    renderCards();
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
  initTheme();
  initFilters();
  initCodeTabs();
  initNavigation();
  renderFeaturedPreview();
  renderCodePanel();
  renderCards();
}

document.addEventListener('DOMContentLoaded', initApp);
