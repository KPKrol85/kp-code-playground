# FleetOps

## PL

### Przegląd projektu

FleetOps to statyczna, frontendowa aplikacja demonstracyjna dla operacji transportowych i flotowych. Repozytorium zawiera landing page, strony informacyjne, ekran logowania demo oraz panel aplikacyjny renderowany po stronie przeglądarki.

Aplikacja działa bez backendu. Dane domenowe, preferencje użytkownika, stan logowania demo, filtry, ustawienia list i zmiany w rekordach są obsługiwane lokalnie w przeglądarce.

### Kluczowe funkcje

- Routing oparty o hash URL dla stron marketingowych, logowania i widoków aplikacyjnych.
- Widoki panelu: przegląd KPI, zlecenia, flota, kierowcy, raporty i ustawienia.
- Dane demo dla zleceń, pojazdów, kierowców, aktywności, alertów i raportów.
- Lokalne zarządzanie rekordami zleceń, pojazdów i kierowców: dodawanie, edycja i usuwanie.
- Filtrowanie, sortowanie, wyszukiwanie i przyrostowe ładowanie list.
- Role demo oraz blokowanie wybranych akcji na podstawie uprawnień.
- Motyw jasny/ciemny, tryb kompaktowy i reset danych demo.
- Eksport raportów do JSON; eksport CSV zleceń jest obecny w kodzie, ale zablokowany w interfejsie demo.
- Manifest aplikacji, plik źródłowy service workera oraz statyczna strona `404.html`.

### Stack technologiczny

Runtime:

- HTML5
- CSS3
- Vanilla JavaScript
- Web Storage API
- Service Worker API
- Web App Manifest

Tooling:

- Node.js / npm
- PostCSS
- cssnano
- postcss-cli
- terser

### Struktura projektu

```text
.
├── index.html              # Główny dokument HTML i punkt wejścia aplikacji
├── 404.html                # Statyczna strona błędu
├── sw.js                   # Service worker dla shell/cache
├── _headers                # Nagłówki dla statycznego hostingu Netlify
├── _redirects              # Reguły fallback dla aplikacji statycznej
├── robots.txt              # Reguły indeksowania
├── sitemap.xml             # Mapa witryny
├── assets/                 # Ikony, fonty, obrazy hero, OG, screeny i skróty manifestu
├── styles/                 # Warstwy CSS oraz wygenerowane pliki .min.css
├── scripts/                # Logika aplikacji, routing, stan, dane demo i komponenty UI
├── doc/                    # Dokumentacja projektowa
├── minify-js.js            # Skrypt minifikacji JS dla katalogu js/
├── postcss.config.js       # Konfiguracja cssnano dla PostCSS
├── package.json            # Skrypty npm i zależności developerskie
└── LICENSE                 # Treść licencji MIT
```

Główna logika aplikacji znajduje się w `scripts/`:

- `scripts/router.js` obsługuje routing hash-based i ochronę widoków `/app`.
- `scripts/main.js` inicjalizuje stan, motyw, status online/offline i routing.
- `scripts/state/store.js` zarządza stanem aplikacji i zapisem do `localStorage`.
- `scripts/data/seed.js` dostarcza dane demonstracyjne.
- `scripts/ui/layoutLanding.js` i `scripts/ui/layoutApp.js` renderują główne układy.
- `scripts/ui/views/` zawiera widoki modułów aplikacyjnych.
- `scripts/ui/components/` zawiera komponenty modal, dropdown, accordion, toast i table.

### Instalacja i konfiguracja

Repozytorium zawiera zależności developerskie używane do minifikacji zasobów.

```bash
npm install
```

### Development lokalny

Projekt jest statyczny. Głównym punktem wejścia jest `index.html`, a `package.json` nie definiuje skryptu uruchamiającego lokalny serwer developerski.

### Build produkcyjny

Dostępne skrypty npm:

```bash
npm run min:css
npm run min:js
npm run min:all
```

`npm run min:css` minifikuje pliki CSS w `styles/` do wariantów `.min.css`, które są ładowane przez `index.html`. `npm run min:js` uruchamia `minify-js.js`, który minifikuje pliki z katalogu `js/` do `js/dist/`, jeśli takie pliki są obecne.

### Deployment

Repozytorium zawiera statyczną konfigurację kompatybilną z Netlify:

- `_redirects` kieruje ruch do `index.html`, co wspiera routing po stronie klienta.
- `_headers` definiuje nagłówki bezpieczeństwa oraz cache dla zasobów statycznych.
- `sitemap.xml`, `robots.txt`, metadane canonical i Open Graph wskazują domenę `transport-project-02.netlify.app`.

### Dostępność

W kodzie widoczne są następujące mechanizmy dostępności:

- link pomijania do `#main-content`;
- semantyczne role i etykiety ARIA w nawigacji, drawerach, menu, modalach i statusach;
- obsługa `aria-current`, `aria-expanded`, `aria-controls`, `aria-modal`, `aria-live` i `aria-invalid`;
- pułapka fokusu i zamykanie klawiszem Escape w modalach oraz mobilnych drawerach;
- widoczne style fokusu dla linków, przycisków i pól formularzy;
- obsługa `prefers-reduced-motion` w warstwie CSS.

### SEO

Repozytorium zawiera:

- meta description i title w `index.html`;
- canonical URL;
- metadane Open Graph i Twitter Card;
- favicony i manifest aplikacji;
- `robots.txt`;
- `sitemap.xml`;
- osobną stronę `404.html`.

### Wydajność

W kodzie widoczne są następujące rozwiązania:

- preload lokalnego fontu Inter w formacie WOFF2;
- obrazy hero w wariantach AVIF, WebP i JPG przez element `picture`;
- ustawione wymiary oraz `decoding="async"` dla obrazu hero;
- ładowanie CSS w wariantach `.min.css`;
- `sw.js` definiuje strategie cache dla shell aplikacji i zasobów statycznych;
- reguły cache dla `/assets/*` w `_headers`.

### Utrzymanie projektu

- Style są podzielone na `base.css`, `components.css`, `landing.css` i `app.css`; warianty `.min.css` są generowane przez PostCSS.
- Stan aplikacji i trwałość danych są scentralizowane w `scripts/state/store.js`.
- Dane demonstracyjne są odseparowane w `scripts/data/seed.js`.
- Uprawnienia ról demo są zdefiniowane w `scripts/core/permissions.js`.
- Widoki aplikacyjne są rozdzielone w `scripts/ui/views/`, a współdzielone komponenty w `scripts/ui/components/`.
- Metadane licencji są niespójne: `LICENSE` zawiera MIT License, a `package.json` deklaruje `ISC`.

### Licencja

Repozytorium zawiera plik `LICENSE` z treścią MIT License.

## EN

### Project Overview

FleetOps is a static frontend demo application for transport and fleet operations. The repository includes a landing page, informational pages, a demo login screen, and a browser-rendered application dashboard.

The application runs without a backend. Domain data, user preferences, demo authentication state, filters, list settings, and record changes are handled locally in the browser.

### Key Features

- Hash-based URL routing for marketing pages, login, and application views.
- Dashboard views: KPI overview, orders, fleet, drivers, reports, and settings.
- Demo data for orders, vehicles, drivers, activity, alerts, and reports.
- Local record management for orders, vehicles, and drivers: create, edit, and delete.
- Filtering, sorting, search, and incremental list loading.
- Demo roles and action blocking based on permissions.
- Light/dark theme, compact mode, and demo data reset.
- JSON report export; CSV order export exists in the code but is disabled in the demo UI.
- Application manifest, service worker source file, and static `404.html` page.

### Tech Stack

Runtime:

- HTML5
- CSS3
- Vanilla JavaScript
- Web Storage API
- Service Worker API
- Web App Manifest

Tooling:

- Node.js / npm
- PostCSS
- cssnano
- postcss-cli
- terser

### Project Structure

```text
.
├── index.html              # Main HTML document and application entry point
├── 404.html                # Static error page
├── sw.js                   # Service worker for shell/cache behavior
├── _headers                # Headers for Netlify static hosting
├── _redirects              # Static-app fallback rules
├── robots.txt              # Indexing rules
├── sitemap.xml             # Sitemap
├── assets/                 # Icons, fonts, hero images, OG assets, screenshots, manifest shortcuts
├── styles/                 # CSS layers and generated .min.css files
├── scripts/                # App logic, routing, state, demo data, and UI components
├── doc/                    # Project documentation
├── minify-js.js            # JS minification script for the js/ directory
├── postcss.config.js       # cssnano configuration for PostCSS
├── package.json            # npm scripts and development dependencies
└── LICENSE                 # MIT License text
```

The main application logic is located in `scripts/`:

- `scripts/router.js` handles hash-based routing and `/app` view protection.
- `scripts/main.js` initializes state, theme, online/offline status, and routing.
- `scripts/state/store.js` manages application state and `localStorage` persistence.
- `scripts/data/seed.js` provides demo data.
- `scripts/ui/layoutLanding.js` and `scripts/ui/layoutApp.js` render the main layouts.
- `scripts/ui/views/` contains application module views.
- `scripts/ui/components/` contains modal, dropdown, accordion, toast, and table components.

### Setup and Installation

The repository includes development dependencies used for asset minification.

```bash
npm install
```

### Local Development

The project is static. The main entry point is `index.html`, and `package.json` does not define a local development server script.

### Production Build

Available npm scripts:

```bash
npm run min:css
npm run min:js
npm run min:all
```

`npm run min:css` minifies CSS files in `styles/` into `.min.css` variants loaded by `index.html`. `npm run min:js` runs `minify-js.js`, which minifies files from the `js/` directory into `js/dist/` when such files are present.

### Deployment

The repository includes static configuration compatible with Netlify:

- `_redirects` routes traffic to `index.html`, supporting client-side routing.
- `_headers` defines security headers and static asset caching.
- `sitemap.xml`, `robots.txt`, canonical metadata, and Open Graph metadata reference the `transport-project-02.netlify.app` domain.

### Accessibility

The code includes the following accessibility mechanisms:

- skip link to `#main-content`;
- semantic roles and ARIA labels in navigation, drawers, menus, modals, and status elements;
- usage of `aria-current`, `aria-expanded`, `aria-controls`, `aria-modal`, `aria-live`, and `aria-invalid`;
- focus trapping and Escape-key closing in modals and mobile drawers;
- visible focus styles for links, buttons, and form fields;
- `prefers-reduced-motion` handling in CSS.

### SEO

The repository includes:

- meta description and title in `index.html`;
- canonical URL;
- Open Graph and Twitter Card metadata;
- favicons and application manifest;
- `robots.txt`;
- `sitemap.xml`;
- separate `404.html` page.

### Performance

The code includes the following implementation details:

- preload for the local Inter WOFF2 font;
- hero images served through `picture` with AVIF, WebP, and JPG variants;
- explicit dimensions and `decoding="async"` for the hero image;
- CSS loaded through `.min.css` variants;
- `sw.js` defines cache strategies for the application shell and static assets;
- cache rules for `/assets/*` in `_headers`.

### Project Maintenance

- Styles are split into `base.css`, `components.css`, `landing.css`, and `app.css`; `.min.css` variants are generated through PostCSS.
- Application state and persistence are centralized in `scripts/state/store.js`.
- Demo data is isolated in `scripts/data/seed.js`.
- Demo role permissions are defined in `scripts/core/permissions.js`.
- Application views are split under `scripts/ui/views/`, with shared components under `scripts/ui/components/`.
- License metadata is inconsistent: `LICENSE` contains the MIT License, while `package.json` declares `ISC`.

### License

The repository includes a `LICENSE` file with the MIT License text.
