# Ambre

## PL

### 1. Przegląd projektu
Ambre to wielostronicowy projekt front-end dla restauracji fine dining, zbudowany jako statyczna aplikacja webowa. Repozytorium zawiera stronę główną, podstrony ofertowe i prawne, komponenty interaktywne w Vanilla JavaScript oraz elementy PWA (manifest, service worker, widok offline).

### 2. Kluczowe funkcje
- Architektura multi-page: `index.html`, `menu.html`, `galeria.html`, `cookies.html`, `polityka-prywatnosci.html`, `regulamin.html`, `offline.html`, `404.html`.
- Nawigacja desktop/mobile z drawerem, overlayem, focus trapem, zamykaniem klawiszem `Escape`, `aria-current` i scrollspy.
- Interakcje UI: przełącznik motywu, przyciski przewijania, CTA pulse, baner demo, dynamiczne ustawianie roku w stopce.
- Sekcje dynamiczne: filtrowanie kart menu i galerii (tabs), przyciski „load more” dla menu i galerii.
- Galeria z lightboxem oraz nawigacją klawiaturową.
- Formularz rezerwacji z walidacją pól, formatowaniem numeru telefonu, obsługą komunikatów statusu (`aria-live`) i polem honeypot (`company`).
- PWA: `manifest.webmanifest`, rejestracja service workera (`js/sw-register.js`), cache app shell + cache obrazów runtime, fallback do `offline.html`.

### 3. Stack technologiczny
- HTML5
- CSS (architektura modularna + PostCSS)
- Vanilla JavaScript (ES modules)
- Narzędzia deweloperskie i QA:
  - bundling/minifikacja: `esbuild`, `postcss`, `cssnano`, `autoprefixer`, `postcss-import`
  - lint/validate: `eslint`, `stylelint`, `html-validate`
  - audyty: `@lhci/cli` (Lighthouse CI), `playwright`, `@axe-core/playwright`
  - asset pipeline obrazów: `sharp`

### 4. Struktura projektu
- `css/`
  - `base/` — tokeny, typografia, style bazowe
  - `layout/` — nagłówek i stopka
  - `components/` — komponenty UI (hero, menu, faq, forms, lightbox, itd.)
  - `pages/` — style specyficzne dla podstron
  - `style.css` — główny punkt wejścia CSS
- `js/`
  - `script.js` — główny punkt wejścia JS
  - `modules/` — moduły funkcjonalne (nav, form, tabs, lightbox, scroll, itd.)
  - `sw-register.js`, `pwa-install.js` — moduły PWA
- `assets/` — obrazy, fonty, favicony, ikony i screenshoty PWA
- `scripts/` — skrypty QA, audytowe i optymalizacji obrazów
- `_headers`, `_redirects` — konfiguracja hostingu statycznego
- `sw.js`, `manifest.webmanifest`, `robots.txt`, `sitemap.xml` — pliki runtime/SEO/PWA

### 5. Setup i instalacja
Projekt zawiera `package.json`.

```bash
npm install
```

### 6. Development lokalny
Dostępne komendy developerskie:

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

### 7. Build produkcyjny
Build produkcyjny jest realizowany przez skrypty npm:

```bash
npm run build
```

Szczegóły:
- `build:css` generuje `css/style.min.css` z `css/style.css`.
- `build:js` bundluje i minifikuje `js/script.js` do `js/script.min.js`.
- W skryptach build występują kontrole poprawności wygenerowanych artefaktów (m.in. weryfikacja braku `@import` w CSS bundle i importów modułowych w JS bundle).

### 8. Deployment
Repozytorium zawiera konfigurację typową dla statycznego deployu:
- `_redirects` — mapowanie tras i obsługa 404.
- `_headers` — nagłówki bezpieczeństwa, polityki przeglądarkowe i CSP.
- `manifest.webmanifest` + `sw.js` — wsparcie instalowalności i pracy offline.

### 9. Dostępność
Zaobserwowane elementy dostępności:
- Skip link (`.skip-link`) na stronach.
- Semantyczne sekcje i atrybuty ARIA w komponentach interaktywnych.
- Obsługa klawiatury dla nawigacji, tabsów, FAQ i lightboxa.
- Komunikaty statusowe formularza przez `aria-live`.
- Obsługa `prefers-reduced-motion` w modułach interakcji.

### 10. SEO
Wdrożone elementy SEO:
- `meta` (description, robots), canonical URL, Open Graph, Twitter cards.
- Dane strukturalne JSON-LD (`WebSite`, `Restaurant`, `WebPage`) w dokumentach HTML.
- `robots.txt` i `sitemap.xml`.
- Dedykowane metadane dla podstron (w tym strony offline i stron prawnych).

### 11. Wydajność
Zaimplementowane elementy wydajnościowe:
- Responsywne obrazy (`<picture>`, warianty AVIF/WebP/JPG).
- `loading="lazy"`, `decoding="async"`, w hero `fetchpriority="high"`.
- Preload fontów (`woff2`) oraz lokalne font assets.
- Service worker z cache app shell i cache runtime obrazów.
- Pipeline optymalizacji obrazów (`scripts/optimize-images.mjs`, `img:webp`, `img:avif`, `img:verify`).

### 12. Utrzymanie projektu
Punkty utrzymania i rozwoju:
- Główna orkiestracja funkcji JS: `js/script.js`.
- Logika funkcjonalna: `js/modules/*.js`.
- Konfiguracja jakości i audytów: `stylelint.config.cjs`, `.eslintrc.cjs`, `.htmlvalidate.json`, `lighthouserc.json`.
- Konfiguracja bundlingu CSS: `postcss.config.cjs`.
- Skrypty automatyzacji: `scripts/*.mjs`.

### 13. Roadmap
- Dodać skrypt `dev` uruchamiający równolegle watch CSS/JS i lokalny serwer statyczny.
- Rozszerzyć automatyczne testy Playwright o scenariusze regresji UI dla menu i galerii.
- Ujednolicić użycie artefaktów minifikowanych (`*.min.*`) z wybranym środowiskiem deploy.
- Dodać automatyczną walidację `_headers` (CSP) w pipeline QA.
- Rozszerzyć QA linków o walidację zasobów obrazów w podstronach.

### 14. Licencja
MIT (zgodnie z `package.json`).

---

## EN

### 1. Project Overview
Ambre is a multi-page front-end project for a fine dining restaurant, implemented as a static web application. The repository includes a homepage, offer and legal subpages, interactive Vanilla JavaScript components, and PWA elements (manifest, service worker, offline view).

### 2. Key Features
- Multi-page architecture: `index.html`, `menu.html`, `galeria.html`, `cookies.html`, `polityka-prywatnosci.html`, `regulamin.html`, `offline.html`, `404.html`.
- Desktop/mobile navigation with drawer, overlay, focus trap, `Escape` close behavior, `aria-current`, and scrollspy.
- UI interactions: theme switcher, scroll controls, CTA pulse, demo banner, dynamic footer year.
- Dynamic sections: menu and gallery filtering (tabs), “load more” controls for menu and gallery content.
- Gallery lightbox with keyboard navigation.
- Reservation form with field validation, phone number formatting, status messaging (`aria-live`), and honeypot field (`company`).
- PWA: `manifest.webmanifest`, service worker registration (`js/sw-register.js`), app shell + runtime image caching, fallback to `offline.html`.

### 3. Tech Stack
- HTML5
- CSS (modular architecture + PostCSS)
- Vanilla JavaScript (ES modules)
- Development and QA tooling:
  - bundling/minification: `esbuild`, `postcss`, `cssnano`, `autoprefixer`, `postcss-import`
  - lint/validate: `eslint`, `stylelint`, `html-validate`
  - audits: `@lhci/cli` (Lighthouse CI), `playwright`, `@axe-core/playwright`
  - image asset pipeline: `sharp`

### 4. Project Structure
- `css/`
  - `base/` — tokens, typography, base styles
  - `layout/` — header and footer
  - `components/` — UI components (hero, menu, faq, forms, lightbox, etc.)
  - `pages/` — page-specific styles
  - `style.css` — main CSS entrypoint
- `js/`
  - `script.js` — main JS entrypoint
  - `modules/` — feature modules (nav, form, tabs, lightbox, scroll, etc.)
  - `sw-register.js`, `pwa-install.js` — PWA modules
- `assets/` — images, fonts, favicons, icons, and PWA screenshots
- `scripts/` — QA, audit, and image optimization scripts
- `_headers`, `_redirects` — static hosting configuration
- `sw.js`, `manifest.webmanifest`, `robots.txt`, `sitemap.xml` — runtime/SEO/PWA files

### 5. Setup and Installation
`package.json` is present.

```bash
npm install
```

### 6. Local Development
Available development commands:

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
Production build is provided through npm scripts:

```bash
npm run build
```

Details:
- `build:css` generates `css/style.min.css` from `css/style.css`.
- `build:js` bundles and minifies `js/script.js` into `js/script.min.js`.
- Build scripts include artifact integrity checks (e.g., no `@import` in CSS bundle and no module import syntax in JS bundle).

### 8. Deployment
The repository includes static deployment configuration:
- `_redirects` — route mapping and 404 handling.
- `_headers` — security headers, browser policies, and CSP.
- `manifest.webmanifest` + `sw.js` — installability and offline behavior.

### 9. Accessibility
Observed accessibility implementation:
- Skip link (`.skip-link`) across pages.
- Semantic sections and ARIA attributes in interactive components.
- Keyboard support for navigation, tabs, FAQ, and lightbox.
- Form status announcements through `aria-live`.
- `prefers-reduced-motion` support in interaction modules.

### 10. SEO
Implemented SEO elements:
- `meta` tags (description, robots), canonical URL, Open Graph, Twitter cards.
- JSON-LD structured data (`WebSite`, `Restaurant`, `WebPage`) in HTML documents.
- `robots.txt` and `sitemap.xml`.
- Dedicated metadata on subpages (including offline and legal pages).

### 11. Performance
Implemented performance measures:
- Responsive images (`<picture>`, AVIF/WebP/JPG variants).
- `loading="lazy"`, `decoding="async"`, and `fetchpriority="high"` in hero media.
- Font preload (`woff2`) and local font assets.
- Service worker with app shell and runtime image caching.
- Image optimization pipeline (`scripts/optimize-images.mjs`, `img:webp`, `img:avif`, `img:verify`).

### 12. Project Maintenance
Core maintenance locations:
- Main JS feature orchestration: `js/script.js`.
- Functional logic: `js/modules/*.js`.
- Quality/audit configuration: `stylelint.config.cjs`, `.eslintrc.cjs`, `.htmlvalidate.json`, `lighthouserc.json`.
- CSS bundling configuration: `postcss.config.cjs`.
- Automation scripts: `scripts/*.mjs`.

### 13. Roadmap
- Add a `dev` script to run CSS/JS watchers and a local static server in parallel.
- Extend automated Playwright coverage with UI regression scenarios for menu and gallery flows.
- Standardize usage of minified artifacts (`*.min.*`) for the selected deployment environment.
- Add automated `_headers` (CSP) validation to the QA pipeline.
- Expand link QA with subpage image resource validation.

### 14. License
MIT (as declared in `package.json`).
