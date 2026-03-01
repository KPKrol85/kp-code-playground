# Ambre

## PL

### 1. Project Overview
Ambre to statyczny, wielostronicowy projekt front-end dla restauracji. Repozytorium zawiera stronę główną, podstrony menu/galerii/prawne, interaktywne moduły Vanilla JavaScript oraz elementy Progressive Web App (manifest, service worker, strona offline).

### 2. Key Features
- Architektura multi-page oparta o dokumenty HTML: `index.html`, `menu.html`, `galeria.html`, `cookies.html`, `polityka-prywatnosci.html`, `regulamin.html`, `offline.html`, `404.html`.
- Responsywna nawigacja z menu mobilnym (drawer + overlay), focus trapem, obsługą `Escape`, `aria-current` i scrollspy.
- Interfejs dynamiczny: przełącznik motywu, przewijanie do sekcji, przycisk powrotu do góry, CTA pulse, baner informacyjny demo.
- Sekcje menu i galerii z filtrowaniem kart przez taby oraz mechaniką „load more”.
- Lightbox galerii z nawigacją klawiaturową, licznikiem pozycji i preloadem sąsiednich obrazów.
- Formularz rezerwacji z walidacją po stronie klienta (telefon, zgoda, wymagane pola), komunikatami statusu `aria-live`, polem honeypot (`company`) i wysyłką `fetch` z fallbackiem.
- PWA: rejestracja service workera, cache app-shell i cache runtime obrazów, fallback na `offline.html`, przycisk instalacji aplikacji.

### 3. Tech Stack
- HTML5 (struktura stron i metadane).
- CSS (architektura warstwowa: `base`, `layout`, `components`, `pages`).
- Vanilla JavaScript (ES Modules + bundling do artefaktu produkcyjnego).
- PostCSS (`postcss-import`, `autoprefixer`, `cssnano`).
- Esbuild (bundling i minifikacja JS).
- Narzędzia jakości i audytu: ESLint, Stylelint, html-validate, Playwright, axe-core (Playwright), Lighthouse CI.
- Pipeline obrazów oparty o `sharp`.

### 4. Project Structure
- `css/`
  - `base/` — tokeny, style bazowe, typografia.
  - `layout/` — układ nagłówka i stopki.
  - `components/` — style komponentów (hero, formularz, FAQ, lightbox, tabs itd.).
  - `pages/` — style specyficzne dla podstron.
  - `style.css` — główny punkt wejścia CSS (importy modułowe).
- `js/`
  - `script.js` — główny entrypoint inicjalizujący moduły.
  - `modules/` — logika funkcjonalna (nav, form, tabs, lightbox, scroll, faq, theme, load-more).
  - `sw-register.js`, `pwa-install.js` — moduły PWA po stronie klienta.
- `assets/` — fonty i zasoby graficzne.
- `scripts/` — skrypty QA, SEO/a11y/link check, optymalizacja i weryfikacja obrazów, aktualizacja hashy CSP.
- `sw.js`, `manifest.webmanifest` — runtime PWA.
- `_headers`, `_redirects` — konfiguracja nagłówków i reguł tras dla hostingu statycznego.
- `robots.txt`, `sitemap.xml` — pliki SEO.

### 5. Setup and Installation
Projekt zawiera `package.json`.

```bash
npm install
```

### 6. Local Development
Dostępne komendy lokalne:

```bash
npm run watch:css
npm run watch:js
npm run qa
npm run qa:links
npm run qa:seo
npm run qa:html
npm run qa:js
npm run qa:css
npm run qa:a11y
npm run qa:lighthouse
```

### 7. Production Build
Build produkcyjny:

```bash
npm run build
```

Szczegóły:
- `npm run build:css` generuje `css/style.min.css` na podstawie `css/style.css` oraz waliduje brak `@import` w wyniku.
- `npm run build:js` bundluje i minifikuje `js/script.js` do `js/script.min.js` oraz waliduje brak składni importów modułowych w artefakcie.

### 8. Deployment
W repozytorium znajduje się konfiguracja dla statycznego hostingu:
- `_redirects` — mapowanie tras (m.in. przekierowania czytelnych URL do plików `.html`) i obsługa `404`.
- `_headers` — nagłówki bezpieczeństwa i polityki (m.in. CSP, HSTS, Referrer-Policy, Permissions-Policy).
- `scripts/check-server-prod.mjs` — kontrola serwera produkcyjnego pod kątem oczekiwanych nagłówków i zasobów.

### 9. Accessibility
Zaimplementowane elementy dostępności:
- Skip link (`.skip-link`) obecny na stronach.
- Semantyczna struktura dokumentów oraz ARIA dla komponentów interaktywnych.
- Obsługa klawiatury dla nawigacji, tabów, FAQ i lightboxa.
- Komunikaty statusowe formularza i sekcji dynamicznych przez `aria-live`.
- Reguły `prefers-reduced-motion` w stylach komponentów.

### 10. SEO
Wdrożone elementy SEO:
- Meta tagi (`description`, `robots`), canonical, Open Graph i Twitter Cards.
- JSON-LD (`WebSite`, `Restaurant`, `WebPage`) w stronie głównej.
- `robots.txt` i `sitemap.xml`.
- Dedykowane metadane dla podstron (w tym 404/offline/prawne).

### 11. Performance
Obecne optymalizacje wydajności:
- Responsywne obrazy przez `<picture>` i warianty AVIF/WebP/JPG.
- Atrybuty `loading="lazy"`, `decoding="async"` oraz `fetchpriority="high"` (hero).
- Preload lokalnych fontów `woff2`.
- Service worker z cachowaniem app-shell, cache runtime obrazów i fallbackiem offline.
- Skrypty optymalizacji obrazów (`img:opt`, `img:webp`, `img:avif`, `img:verify`).

### 12. Project Maintenance
Kluczowe miejsca utrzymaniowe:
- Orkiestracja funkcji front-end: `js/script.js`.
- Implementacja zachowań komponentów: `js/modules/*.js`.
- Konfiguracje jakości i walidacji: `.eslintrc.cjs`, `stylelint.config.cjs`, `.htmlvalidate.json`, `lighthouserc.json`.
- Konfiguracja przetwarzania CSS: `postcss.config.cjs`.
- Automatyzacja i QA: `scripts/*.mjs`.

### 13. Roadmap
- Dodać skrypt `dev` do równoległego uruchamiania watcherów CSS/JS i lokalnego serwera statycznego.
- Rozszerzyć testy E2E Playwright o scenariusze regresji UI dla filtrów tabów i lightboxa.
- Dodać automatyczny check integralności `_headers` (np. spójność CSP hashy) w głównym pipeline `qa`.
- Rozbudować walidację SEO o kontrolę poprawności danych strukturalnych we wszystkich podstronach.
- Dodać testy smoke dla trybu offline (service worker + `offline.html`) w CI.

### 14. License
MIT (zgodnie z `package.json`).

---

## EN

### 1. Project Overview
Ambre is a static multi-page front-end project for a restaurant website. The repository includes a homepage, menu/gallery/legal subpages, interactive Vanilla JavaScript modules, and Progressive Web App elements (manifest, service worker, offline page).

### 2. Key Features
- Multi-page HTML architecture: `index.html`, `menu.html`, `galeria.html`, `cookies.html`, `polityka-prywatnosci.html`, `regulamin.html`, `offline.html`, `404.html`.
- Responsive navigation with mobile drawer + overlay, focus trap, `Escape` handling, `aria-current`, and scrollspy.
- Dynamic UI behaviors: theme switcher, section scroll targeting, scroll-to-top button, CTA pulse, demo info banner.
- Menu and gallery sections with tab-based filtering and “load more” mechanics.
- Gallery lightbox with keyboard navigation, item counter, and adjacent-image preloading.
- Reservation form with client-side validation (phone, consent, required fields), `aria-live` status messaging, honeypot field (`company`), and `fetch` submit fallback.
- PWA support: service worker registration, app-shell + runtime image caching, offline fallback to `offline.html`, and install prompt button.

### 3. Tech Stack
- HTML5 (page structure and metadata).
- CSS (layered architecture: `base`, `layout`, `components`, `pages`).
- Vanilla JavaScript (ES Modules + production bundling).
- PostCSS (`postcss-import`, `autoprefixer`, `cssnano`).
- Esbuild (JS bundling and minification).
- Quality and audit tooling: ESLint, Stylelint, html-validate, Playwright, axe-core (Playwright), Lighthouse CI.
- Image pipeline based on `sharp`.

### 4. Project Structure
- `css/`
  - `base/` — tokens, base styles, typography.
  - `layout/` — header and footer layout.
  - `components/` — component styles (hero, form, FAQ, lightbox, tabs, etc.).
  - `pages/` — page-specific styles.
  - `style.css` — main CSS entrypoint (module imports).
- `js/`
  - `script.js` — main entrypoint orchestrating modules.
  - `modules/` — feature logic (nav, form, tabs, lightbox, scroll, faq, theme, load-more).
  - `sw-register.js`, `pwa-install.js` — client-side PWA modules.
- `assets/` — fonts and image assets.
- `scripts/` — QA scripts, SEO/a11y/link checks, image optimization/verification, CSP hash update.
- `sw.js`, `manifest.webmanifest` — PWA runtime files.
- `_headers`, `_redirects` — static hosting headers and route rules.
- `robots.txt`, `sitemap.xml` — SEO files.

### 5. Setup and Installation
`package.json` is present.

```bash
npm install
```

### 6. Local Development
Available local commands:

```bash
npm run watch:css
npm run watch:js
npm run qa
npm run qa:links
npm run qa:seo
npm run qa:html
npm run qa:js
npm run qa:css
npm run qa:a11y
npm run qa:lighthouse
```

### 7. Production Build
Production build:

```bash
npm run build
```

Details:
- `npm run build:css` generates `css/style.min.css` from `css/style.css` and validates that no `@import` remains in the output.
- `npm run build:js` bundles and minifies `js/script.js` into `js/script.min.js` and validates that no module import syntax remains in the artifact.

### 8. Deployment
The repository includes static hosting configuration:
- `_redirects` — route mapping (including clean URL redirects to `.html` files) and `404` handling.
- `_headers` — security headers and policies (including CSP, HSTS, Referrer-Policy, Permissions-Policy).
- `scripts/check-server-prod.mjs` — production server verification for expected headers and assets.

### 9. Accessibility
Implemented accessibility elements:
- Skip link (`.skip-link`) across pages.
- Semantic document structure and ARIA attributes in interactive components.
- Keyboard interaction support for navigation, tabs, FAQ, and lightbox.
- `aria-live` status messaging for form and dynamic content sections.
- `prefers-reduced-motion` rules in component styles.

### 10. SEO
Implemented SEO elements:
- Meta tags (`description`, `robots`), canonical, Open Graph, and Twitter Cards.
- JSON-LD (`WebSite`, `Restaurant`, `WebPage`) on the homepage.
- `robots.txt` and `sitemap.xml`.
- Dedicated metadata across subpages (including 404/offline/legal pages).

### 11. Performance
Implemented performance optimizations:
- Responsive images via `<picture>` with AVIF/WebP/JPG variants.
- `loading="lazy"`, `decoding="async"`, and `fetchpriority="high"` (hero).
- Local `woff2` font preloads.
- Service worker with app-shell caching, runtime image cache, and offline fallback.
- Image optimization scripts (`img:opt`, `img:webp`, `img:avif`, `img:verify`).

### 12. Project Maintenance
Core maintenance locations:
- Front-end feature orchestration: `js/script.js`.
- Component behavior implementation: `js/modules/*.js`.
- Quality and validation configs: `.eslintrc.cjs`, `stylelint.config.cjs`, `.htmlvalidate.json`, `lighthouserc.json`.
- CSS processing config: `postcss.config.cjs`.
- Automation and QA scripts: `scripts/*.mjs`.

### 13. Roadmap
- Add a `dev` script to run CSS/JS watchers and a local static server in parallel.
- Extend Playwright E2E coverage with UI regression scenarios for tab filtering and lightbox flows.
- Add an automated `_headers` integrity check (e.g., CSP hash consistency) to the main `qa` pipeline.
- Extend SEO validation with structured-data checks across all subpages.
- Add CI smoke checks for offline mode (service worker + `offline.html`).

### 14. License
MIT (as defined in `package.json`).
