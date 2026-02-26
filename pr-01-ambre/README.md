# Ambre — projekt portfolio front-end

## PL

### Przegląd projektu
Ambre to wielostronicowy projekt portfolio restauracji fine dining, zbudowany w oparciu o HTML, modularny CSS i Vanilla JavaScript. Projekt zawiera stronę główną, podstronę menu, podstronę galerii, strony prawne, stronę offline i obsługę błędu 404.

### Kluczowe funkcje
- Wielostronicowa architektura: `index.html`, `menu.html`, `galeria.html`, strony prawne, `offline.html`, `404.html`.
- Modularny CSS (`base`, `layout`, `components`, `pages`) z tokenami projektowymi i konwencją BEM.
- Nawigacja desktop/mobile (drawer + overlay), wsparcie `aria-current`, `aria-expanded`, focus trap i zamykanie `Esc`.
- Formularz rezerwacji z walidacją, honeypotem (`company`) i obsługą POST (`data-netlify="true"`).
- PWA: `manifest.webmanifest`, rejestracja service workera, strona offline, cache app-shell i cache runtime dla obrazów.
- SEO i dane strukturalne (meta, OpenGraph, Twitter, JSON-LD, `robots.txt`, `sitemap.xml`).

### Stack technologiczny
- HTML5
- CSS3 (PostCSS, CSS custom properties/tokens)
- Vanilla JavaScript (ES modules)
- Narzędzia QA/build: ESLint, Stylelint, html-validate, Lighthouse CI, Playwright + axe, esbuild

### Struktura projektu
- `css/` — style bazowe, layout, komponenty i style stron
- `js/` — entrypointy i moduły funkcjonalne
- `assets/` — fonty, ikony i obrazy (w tym warianty `_optimized`)
- `scripts/` — skrypty QA i optymalizacji obrazów
- `_headers`, `_redirects` — konfiguracja deploy

### Uruchomienie lokalne
1. Zainstaluj zależności: `npm install`
2. Uruchamiaj wybrane skrypty QA lub build:
   - `npm run build`
   - `npm run qa:links`
   - `npm run qa:seo`

### Build i wdrożenie
- W development używane są nieminizowane assety (`/css/style.css`, `/js/script.js`).
- Pliki `.min.*` są generowane skryptami build i mogą być decyzją etapu deploymentu.
- Konfiguracje deploy są przygotowane pod hosting statyczny (np. Netlify): `_headers`, `_redirects`, `manifest.webmanifest`, `sw.js`.

### Dostępność (a11y)
- Skip-link (`.skip-link`) i logiczna hierarchia nagłówków na stronach.
- Widoczny focus (`:focus-visible`) dla kluczowych interakcji.
- Obsługa `prefers-reduced-motion` w CSS i modułach JS (scroll/lightbox/banner).
- Rozszerzone wsparcie aria dla nawigacji, FAQ i statusów formularza.

### SEO
- Spójne metadane title/description, canonical i OpenGraph.
- `og:url` zgodne z canonical na podstronach.
- JSON-LD (`WebSite`, `Restaurant`, `WebPage`) na stronach.
- `robots.txt` i `sitemap.xml` obecne.

### Wydajność
- Obrazy responsywne (`picture`, `avif/webp/jpg`) i lazy loading.
- Deklaracje `width`/`height` dla obrazów.
- Fonty `woff2` z `font-display: swap` i preloadem.
- Service worker dla cache app-shell i fallbacku offline.

### Roadmap
- Uzupełnić automatyczne testy kontrastu WCAG AA w pipeline QA.
- Dodać CI uruchamiające pełny zestaw `qa:*` na każdym PR.
- Rozważyć automatyczne generowanie i walidację CSP hashy.
- Dodać monitorowanie Web Vitals po wdrożeniu.
- Rozbudować testy regresji a11y i keyboard-flow na podstronach.

### Licencja
MIT (zgodnie z `package.json`).

---

## EN

### Project overview
Ambre is a multi-page fine-dining portfolio website built with HTML, modular CSS, and Vanilla JavaScript. It includes a home page, menu page, gallery page, legal pages, an offline page, and a 404 page.

### Key features
- Multi-page setup: `index.html`, `menu.html`, `galeria.html`, legal pages, `offline.html`, `404.html`.
- Modular CSS architecture (`base`, `layout`, `components`, `pages`) with design tokens and BEM naming.
- Desktop/mobile navigation (drawer + overlay), `aria-current`, `aria-expanded`, focus trap, and `Esc` close handling.
- Reservation form with validation, honeypot (`company`), and POST handling (`data-netlify="true"`).
- PWA support: `manifest.webmanifest`, service worker registration, offline page, app-shell and image runtime caching.
- SEO and structured data (meta tags, OpenGraph, Twitter, JSON-LD, `robots.txt`, `sitemap.xml`).

### Tech stack
- HTML5
- CSS3 (PostCSS, CSS custom properties/tokens)
- Vanilla JavaScript (ES modules)
- QA/build tooling: ESLint, Stylelint, html-validate, Lighthouse CI, Playwright + axe, esbuild

### Structure overview
- `css/` — base, layout, components, and page styles
- `js/` — entry scripts and feature modules
- `assets/` — fonts, icons, and images (including `_optimized` variants)
- `scripts/` — QA and image optimization scripts
- `_headers`, `_redirects` — deployment configuration

### Setup & run
1. Install dependencies: `npm install`
2. Run selected QA/build scripts:
   - `npm run build`
   - `npm run qa:links`
   - `npm run qa:seo`

### Build & deployment notes
- Development uses non-minified runtime assets (`/css/style.css`, `/js/script.js`).
- `.min.*` files are build outputs and can remain deployment-stage decisions.
- Deployment config targets static hosting (e.g., Netlify): `_headers`, `_redirects`, `manifest.webmanifest`, `sw.js`.

### Accessibility notes
- Skip link (`.skip-link`) and consistent heading hierarchy.
- Visible keyboard focus (`:focus-visible`) across interactive controls.
- `prefers-reduced-motion` support in CSS and JS modules (scroll/lightbox/banner).
- Extended ARIA handling for navigation, FAQ, and form status messaging.

### SEO notes
- Consistent title/description, canonical, and OpenGraph metadata.
- `og:url` aligned with canonical URLs.
- JSON-LD graph (`WebSite`, `Restaurant`, `WebPage`) on pages.
- `robots.txt` and `sitemap.xml` included.

### Performance notes
- Responsive images (`picture`, `avif/webp/jpg`) with lazy loading.
- `width`/`height` attributes on images.
- `woff2` fonts with `font-display: swap` and preload hints.
- Service worker app-shell caching and offline fallback.

### Roadmap
- Add automated WCAG AA contrast verification to QA pipeline.
- Add CI jobs running full `qa:*` suite on each PR.
- Consider automatic CSP hash generation/validation.
- Add post-deploy Web Vitals monitoring.
- Expand regression tests for a11y and keyboard flows.

### License
MIT (as defined in `package.json`).
