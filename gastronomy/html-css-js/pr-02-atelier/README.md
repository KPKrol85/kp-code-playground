# Atelier

## PL

### 1. Przegląd projektu
Atelier to statyczny, wielostronicowy serwis WWW restauracji fine dining. Projekt obejmuje stronę główną, podstrony tematyczne, strony prawne i systemowe oraz warstwę front-end opartą o modularny CSS i JavaScript.

### 2. Kluczowe funkcje
- Wielostronicowa architektura HTML: `index.html`, `about.html`, `menu.html`, `gallery.html`, `contact.html`, `cookies.html`, `polityka-prywatnosci.html`, `regulamin.html`, `offline.html`, `thank-you.html`, `404.html`.
- Responsywna nawigacja z menu mobilnym, dropdownami, zarządzaniem fokusowaniem i obsługą klawiatury.
- Przełącznik motywu (light/dark) z persystencją ustawień w `localStorage`.
- Dynamiczne renderowanie sekcji menu na podstawie `data/menu.json`.
- Filtry i wyszukiwarka w sekcji menu.
- Galeria zdjęć ze wsparciem lightboxa.
- Formularz kontaktowy z walidacją po stronie klienta oraz integracją z Netlify Forms.
- Banner statusu sieci online/offline.
- Implementacja PWA: `manifest.webmanifest`, `sw.js`, cache zasobów i fallback do `offline.html`.

### 3. Tech Stack
- HTML5.
- CSS (architektura: `base`, `layout`, `components`, `pages`).
- JavaScript (Vanilla JS, ES Modules).
- Node.js + npm (narzędzia deweloperskie).
- PostCSS (`postcss-import`, `cssnano`) do przetwarzania CSS.
- esbuild do bundlingu i minifikacji JS.
- ESLint, html-validate, linkinator, pa11y-ci do kontroli jakości.
- sharp + fast-glob do pipeline'u obrazów.

### 4. Struktura projektu
- `assets/` — ikony, fonty, obrazy źródłowe i zoptymalizowane zasoby.
- `css/` — style globalne, layout, komponenty i style per strona.
- `js/` — bootstrap aplikacji, moduły `app/`, `core/`, `features/`.
- `data/menu.json` — dane menu wykorzystywane przez warstwę JS.
- `scripts/images/build-images.js` — generowanie wariantów obrazów.
- `_headers`, `_redirects` — konfiguracja wdrożeniowa dla hostingu statycznego.
- `manifest.webmanifest`, `sw.js` — konfiguracja PWA.

### 5. Setup i instalacja
Wymagane: Node.js i npm.

```bash
npm install
```

### 6. Lokalny development
Uruchomienie lokalnego serwera:

```bash
npm run dev:server
```

Najważniejsze komendy deweloperskie:

```bash
npm run lint
npm run validate:html
npm run check
npm run check:server
npm run check:server:prod
```

### 7. Build produkcyjny
Budowa assetów produkcyjnych:

```bash
npm run build
```

Składa się z:
- `npm run build:css` → `css/style.min.css`,
- `npm run build:js` → `js/script.min.js`.

Budowa obrazów:

```bash
npm run images:build
```

### 8. Wdrożenie
Repozytorium zawiera konfigurację wdrożenia dla hostingu statycznego:
- `_headers` — nagłówki bezpieczeństwa i polityki cache,
- `_redirects` — przekierowanie nieobsłużonych tras do `404.html`,
- `contact.html` — formularz z atrybutami Netlify Forms.

### 9. Dostępność
Zaobserwowane elementy dostępności:
- skip link do treści głównej,
- semantyczne landmarki i ARIA dla komponentów interaktywnych,
- obsługa klawiatury w nawigacji i lightboxie,
- komunikaty `aria-live` (formularz, status sieci),
- fallback `noscript`,
- automatyczne testy a11y przez `pa11y-ci` (`WCAG2AA`).

### 10. SEO
Zaimplementowane elementy SEO:
- `meta description`, `canonical`, `robots`,
- Open Graph i Twitter Cards,
- dane strukturalne JSON-LD (`application/ld+json`),
- `robots.txt` i `sitemap.xml`.

### 11. Wydajność
Zaimplementowane optymalizacje:
- responsywne obrazy (`picture`, `srcset`, `sizes`) w formatach AVIF/WEBP/JPG,
- preload fontów i wybranych zasobów,
- lazy loading obrazów poza krytycznym viewportem,
- minifikacja CSS i JS,
- cache zasobów przez Service Worker.

### 12. Utrzymanie projektu
Kluczowe miejsca utrzymaniowe:
- inicjalizacja aplikacji: `js/bootstrap.js`, `js/app/init.js`,
- logika funkcjonalna: `js/features/*.js`,
- warstwa UI: `css/style.css` i moduły `css/**`,
- konfiguracja quality gates: `package.json`, `.pa11yci`, `.htmlvalidate.json`, `eslint.config.mjs`,
- konfiguracja PWA i deploy: `manifest.webmanifest`, `sw.js`, `_headers`, `_redirects`.

### 13. Roadmap
- Dodać testy E2E dla krytycznych przepływów UI (nawigacja mobilna, formularz, filtry menu).
- Rozszerzyć kontrolę jakości po buildzie produkcyjnym o automatyczny audyt a11y.
- Ujednolicić raportowanie metryk builda tak, aby było niezależne od powłoki systemowej.
- Wprowadzić wersjonowanie cache Service Workera powiązane z wersją release.
- Dodać automatyczną weryfikację spójności `sitemap.xml` z listą stron HTML.

### 14. Licencja
MIT.

---

## EN

### 1. Project Overview
Atelier is a static multi-page website for a fine-dining restaurant. The project includes a home page, functional subpages, legal/system pages, and a front-end layer based on modular CSS and JavaScript.

### 2. Key Features
- Multi-page HTML architecture: `index.html`, `about.html`, `menu.html`, `gallery.html`, `contact.html`, `cookies.html`, `polityka-prywatnosci.html`, `regulamin.html`, `offline.html`, `thank-you.html`, `404.html`.
- Responsive navigation with mobile menu, dropdowns, focus handling, and keyboard support.
- Light/dark theme toggle with `localStorage` persistence.
- Dynamic menu rendering based on `data/menu.json`.
- Menu filtering and search.
- Image gallery with lightbox support.
- Contact form with client-side validation and Netlify Forms integration.
- Online/offline network status banner.
- PWA implementation: `manifest.webmanifest`, `sw.js`, asset caching, and `offline.html` fallback.

### 3. Tech Stack
- HTML5.
- CSS (architecture: `base`, `layout`, `components`, `pages`).
- JavaScript (Vanilla JS, ES Modules).
- Node.js + npm (development tooling).
- PostCSS (`postcss-import`, `cssnano`) for CSS processing.
- esbuild for JS bundling and minification.
- ESLint, html-validate, linkinator, pa11y-ci for quality checks.
- sharp + fast-glob for image pipeline automation.

### 4. Project Structure
- `assets/` — icons, fonts, source images, and optimized assets.
- `css/` — global styles, layout, components, and page-specific styles.
- `js/` — app bootstrap and `app/`, `core/`, `features/` modules.
- `data/menu.json` — menu data consumed by JavaScript.
- `scripts/images/build-images.js` — image variant generation.
- `_headers`, `_redirects` — static hosting deployment configuration.
- `manifest.webmanifest`, `sw.js` — PWA configuration.

### 5. Setup and Installation
Requirements: Node.js and npm.

```bash
npm install
```

### 6. Local Development
Run local server:

```bash
npm run dev:server
```

Main development commands:

```bash
npm run lint
npm run validate:html
npm run check
npm run check:server
npm run check:server:prod
```

### 7. Production Build
Build production assets:

```bash
npm run build
```

This includes:
- `npm run build:css` → `css/style.min.css`,
- `npm run build:js` → `js/script.min.js`.

Build images:

```bash
npm run images:build
```

### 8. Deployment
The repository includes static-hosting deployment configuration:
- `_headers` — security headers and cache policies,
- `_redirects` — unmatched routes redirected to `404.html`,
- `contact.html` — form configured with Netlify Forms attributes.

### 9. Accessibility
Implemented accessibility elements:
- skip link to main content,
- semantic landmarks and ARIA attributes for interactive components,
- keyboard support in navigation and lightbox,
- `aria-live` announcements (form and network status),
- `noscript` fallback,
- automated a11y checks via `pa11y-ci` (`WCAG2AA`).

### 10. SEO
Implemented SEO elements:
- `meta description`, `canonical`, `robots`,
- Open Graph and Twitter Cards,
- JSON-LD structured data (`application/ld+json`),
- `robots.txt` and `sitemap.xml`.

### 11. Performance
Implemented performance optimizations:
- responsive images (`picture`, `srcset`, `sizes`) in AVIF/WEBP/JPG,
- preloading for fonts and selected assets,
- lazy loading for non-critical images,
- CSS/JS minification,
- Service Worker asset caching.

### 12. Project Maintenance
Core maintenance locations:
- app initialization: `js/bootstrap.js`, `js/app/init.js`,
- feature logic: `js/features/*.js`,
- UI layer: `css/style.css` and `css/**` modules,
- quality-gate configuration: `package.json`, `.pa11yci`, `.htmlvalidate.json`, `eslint.config.mjs`,
- PWA and deployment configuration: `manifest.webmanifest`, `sw.js`, `_headers`, `_redirects`.

### 13. Roadmap
- Add E2E tests for critical UI flows (mobile navigation, form, menu filters).
- Extend post-build quality checks with automated accessibility audit.
- Make build metrics reporting shell-agnostic across environments.
- Introduce Service Worker cache versioning tied to release version.
- Add automated validation for `sitemap.xml` consistency against HTML pages.

### 14. License
MIT.
