# TransLogix

## PL

### Przegląd projektu

TransLogix to statyczny, wielostronicowy projekt front-endowy przygotowany jako portfolio/reference build KP_Code Digital Studio. Kod źródłowy opisuje serwis transportowo-logistyczny B2B z osobnymi stronami dla oferty, szczegółów usługi, floty, cennika, kontaktu, stron prawnych, błędu 404 i fallbacku offline.

Projekt jest oparty na HTML, modularnym CSS i Vanilla JavaScript. Nie używa frameworków front-endowych ani backendu aplikacyjnego. Interaktywne zachowania są inicjalizowane przez moduły ES z `assets/js/main.js`, a workflow builda generuje paczkę `dist/` z przepisanymi referencjami do minifikowanych assetów.

### Kluczowe funkcje

- Wielostronicowa struktura źródłowa: `index.html`, `services.html`, `service.html`, `fleet.html`, `pricing.html`, `contact.html`, `privacy.html`, `terms.html`, `cookies.html`, `404.html`, `offline.html`.
- Wspólne partiale nagłówka i stopki w `partials/`, z kopiami szablonowymi w `templates/partials/`.
- Nawigacja mobilna, kompaktowy nagłówek, przełącznik motywu, aktywny stan nawigacji i UI zgody.
- Zakładki, akordeon FAQ, filtrowanie usług i floty, lightbox galerii oraz strona szczegółów usługi oparta o dane.
- Formularz kontaktowy z atrybutami Netlify Forms, honeypotem i walidacją po stronie klienta.
- Service worker z precache stron root, fallbackiem offline i runtime cachingiem assetów.
- Manifest aplikacji, ikony, skróty oraz screenshoty PWA w `assets/icons/site.webmanifest`.
- Skrypty build/QA dla HTML, linków lokalnych, dostępności, assetów, budżetów wydajnościowych i testów E2E.

### Stack technologiczny

Runtime:

- HTML5
- CSS z modułami importowanymi przez `assets/css/style.css`
- Vanilla JavaScript jako ES modules
- Service Worker API
- Web App Manifest

Build i QA:

- Node.js / npm
- PostCSS, `postcss-import`, Autoprefixer, cssnano
- `html-validate`
- `pa11y-ci`
- Playwright
- Lighthouse CI
- `http-server`
- Sharp

### Struktura projektu

```text
.
├── *.html                         # źródłowe strony root
├── assets/
│   ├── css/
│   │   ├── style.css              # źródłowy entrypoint CSS
│   │   └── modules/               # settings, base, layout, components, utilities, pages
│   ├── data/
│   │   ├── services.json          # dane usług
│   │   └── jsonld/                # dane strukturalne JSON-LD
│   ├── fonts/                     # lokalne fonty woff2
│   ├── icons/                     # favicony i manifest
│   ├── img/                       # obrazy, SVG, OG images, screenshoty
│   └── js/                        # moduły interakcji front-end
├── partials/                      # współdzielony header/footer dla źródeł i builda
├── templates/                     # kopie szablonowe partiali
├── scripts/                       # build, walidacja i weryfikacja projektu
├── tests/e2e/                     # testy Playwright
├── dist/                          # generowany output builda
├── _headers                       # deployment-related headers/cache/security config
├── _redirects                     # deployment-related redirect rules
├── robots.txt
├── sitemap.xml
└── sw.js
```

### Instalacja i konfiguracja

```bash
npm install
```

Projekt jest prywatnym pakietem npm (`private: true`) z zależnościami developerskimi zdefiniowanymi w `package.json` i zablokowanymi w `package-lock.json`.

### Development lokalny

Źródła są plikami kanonicznymi do pracy developerskiej. Nie należy edytować ręcznie `dist/`, `assets/css/style.min.css` ani `assets/js/main.min.js`.

Po wygenerowaniu buildu produkcyjnego można uruchomić lokalny podgląd paczki `dist/`:

```bash
npm run preview:dist
```

### Build produkcyjny

```bash
npm run build
```

Najważniejsze skrypty builda:

- `npm run build:css` - generuje `assets/css/style.min.css` z `assets/css/style.css`.
- `npm run build:js` - generuje `assets/js/main.min.js`.
- `npm run build:assets` - uruchamia build CSS i JS.
- `npm run build:dist` - buduje `dist/`, kopiuje strony root i assety, inlinuje partiale header/footer oraz przepisuje referencje HTML/SW na minifikowane assety.
- `npm run clean` - usuwa katalog `dist/`.

### Deployment

Repozytorium zawiera pliki deployment-related:

- `_headers` z nagłówkami bezpieczeństwa i politykami cache.
- `_redirects` z regułami dla krótszych ścieżek, takich jak `/services`, `/fleet`, `/pricing` i `/contact`.
- `robots.txt` i `sitemap.xml`.
- `sw.js` oraz `assets/icons/site.webmanifest`.

### Dostępność

Projekt zawiera dostępnościowe wzorce widoczne w kodzie:

- `main id="main"` jako cel przejścia do głównej treści.
- Style `:focus-visible` w modułach CSS.
- Zarządzanie stanami ARIA dla nawigacji, zakładek i akordeonu.
- Komunikaty `aria-live` oraz `aria-invalid` dla formularzy i dynamicznych wyników.
- Ukryte dostępnościowo etykiety dla linków ikonowych w stopce.
- Obsługa `prefers-reduced-motion` w CSS i modułach JS.
- Automatyczny check `pa11y-ci` skonfigurowany dla 11 realnych stron root zgodnie z WCAG2AA.

### SEO

Źródłowe strony zawierają elementy SEO i social metadata:

- `meta description`
- linki canonical
- dyrektywy robots tam, gdzie są użyte
- Open Graph metadata
- Twitter card metadata
- inline JSON-LD na stronach z danymi strukturalnymi
- `robots.txt`
- `sitemap.xml`
- obrazy OG w `assets/img/og-img/`

### Wydajność

W projekcie są zaimplementowane mierzalne i źródłowo widoczne elementy wydajnościowe:

- Minifikowany CSS i JS generowany przez pipeline builda.
- Budżety wydajnościowe w `perf-budgets.json` sprawdzane przez `scripts/check-budgets.js`.
- Lokalne fonty `woff2` z `font-display: swap`.
- Obrazy w formatach AVIF, WebP, JPG i SVG.
- `loading="lazy"` oraz jawne wymiary na wybranych obrazach.
- Service worker z precache stron root i strategią stale-while-revalidate dla assetów.

### Quality Assurance

Dostępne komendy QA:

```bash
npm run qa
npm run qa:html
npm run qa:links
npm run qa:a11y
npm run qa:budget
npm run assets:verify
npm run test:e2e
npm run release-check
```

Zakres:

- `qa:html` waliduje źródłowe strony root, `partials/` i `templates/`.
- `qa:links` sprawdza lokalne referencje HTML.
- `qa:a11y` uruchamia `pa11y-ci` dla 11 skonfigurowanych URL-i.
- `assets:verify` sprawdza referencje do assetów w źródłach projektu i precache service workera.
- `qa:budget` sprawdza budżety dla wygenerowanego CSS i grafu modułów JS.
- `test:e2e` uruchamia testy Playwright dla wybranych przepływów UI.
- `release-check` uruchamia cięższą bramkę przed wydaniem: `qa`, `assets:verify`, `qa:budget` i `test:e2e`.

### Utrzymanie projektu

- Edytuj pliki źródłowe: root `*.html`, `partials/`, `assets/css/modules/`, `assets/js/`, `assets/data/` i `scripts/`.
- Traktuj `dist/` jako output generowany przez `npm run build:dist`.
- Traktuj `assets/css/style.min.css` i `assets/js/main.min.js` jako artefakty builda.
- Zmiany w headerze i footerze synchronizuj na poziomie `partials/`; `templates/partials/` przechowuje kopie szablonowe.
- Przy zmianach w assetach, ścieżkach lub service workerze uruchamiaj `npm run assets:verify` i `npm run qa:links`.
- Przy zmianach w HTML lub interakcjach uruchamiaj odpowiednio `npm run qa:html`, `npm run qa:a11y` i testy Playwright.

### Roadmap

- Dodać automatyczną walidację JSON-LD dla stron, które zawierają dane strukturalne.
- Dodać skupiony smoke test service workera dla precache stron root i fallbacku `/offline.html`.
- Uporządkować checklistę release wokół `build`, `preview:dist` i komend QA.

### Licencja

`UNLICENSED` zgodnie z `package.json`.

---

## EN

### Project Overview

TransLogix is a static multi-page front-end project prepared as a KP_Code Digital Studio portfolio/reference build. The source code represents a B2B transport and logistics website with separate pages for services, service details, fleet, pricing, contact, legal content, 404 handling, and an offline fallback.

The project is built with HTML, modular CSS, and Vanilla JavaScript. It does not use front-end frameworks or an application backend. Interactive behavior is initialized by ES modules from `assets/js/main.js`, while the build workflow generates a `dist/` package with rewritten references to minified assets.

### Key Features

- Multi-page source structure: `index.html`, `services.html`, `service.html`, `fleet.html`, `pricing.html`, `contact.html`, `privacy.html`, `terms.html`, `cookies.html`, `404.html`, `offline.html`.
- Shared header and footer partials in `partials/`, with template copies in `templates/partials/`.
- Mobile navigation, compact header, theme toggle, active navigation state, and consent UI.
- Tabs, FAQ accordion, services and fleet filtering, gallery lightbox, and data-driven service detail page.
- Contact form with Netlify Forms attributes, honeypot protection, and client-side validation.
- Service worker with root-page precache, offline fallback, and asset runtime caching.
- App manifest, icons, shortcuts, and PWA screenshots in `assets/icons/site.webmanifest`.
- Build and QA scripts for HTML, local links, accessibility, assets, performance budgets, and E2E tests.

### Tech Stack

Runtime:

- HTML5
- CSS modules imported through `assets/css/style.css`
- Vanilla JavaScript as ES modules
- Service Worker API
- Web App Manifest

Build and QA:

- Node.js / npm
- PostCSS, `postcss-import`, Autoprefixer, cssnano
- `html-validate`
- `pa11y-ci`
- Playwright
- Lighthouse CI
- `http-server`
- Sharp

### Project Structure

```text
.
├── *.html                         # root source pages
├── assets/
│   ├── css/
│   │   ├── style.css              # source CSS entrypoint
│   │   └── modules/               # settings, base, layout, components, utilities, pages
│   ├── data/
│   │   ├── services.json          # services data
│   │   └── jsonld/                # JSON-LD structured data
│   ├── fonts/                     # local woff2 fonts
│   ├── icons/                     # favicons and manifest
│   ├── img/                       # images, SVG, OG images, screenshots
│   └── js/                        # front-end interaction modules
├── partials/                      # shared header/footer for source and build
├── templates/                     # template copies of partials
├── scripts/                       # build, validation, and verification scripts
├── tests/e2e/                     # Playwright tests
├── dist/                          # generated build output
├── _headers                       # deployment-related headers/cache/security config
├── _redirects                     # deployment-related redirect rules
├── robots.txt
├── sitemap.xml
└── sw.js
```

### Setup and Installation

```bash
npm install
```

The project is a private npm package (`private: true`) with development dependencies declared in `package.json` and locked in `package-lock.json`.

### Local Development

Source files are the canonical development files. Do not manually edit `dist/`, `assets/css/style.min.css`, or `assets/js/main.min.js`.

After generating the production build, the `dist/` package can be previewed locally:

```bash
npm run preview:dist
```

### Production Build

```bash
npm run build
```

Main build scripts:

- `npm run build:css` - generates `assets/css/style.min.css` from `assets/css/style.css`.
- `npm run build:js` - generates `assets/js/main.min.js`.
- `npm run build:assets` - runs the CSS and JS build.
- `npm run build:dist` - builds `dist/`, copies root pages and assets, inlines header/footer partials, and rewrites HTML/SW references to minified assets.
- `npm run clean` - removes the `dist/` directory.

### Deployment

The repository contains deployment-related files:

- `_headers` with security headers and cache policies.
- `_redirects` with rules for shorter paths such as `/services`, `/fleet`, `/pricing`, and `/contact`.
- `robots.txt` and `sitemap.xml`.
- `sw.js` and `assets/icons/site.webmanifest`.

### Accessibility

The project includes accessibility-focused patterns visible in the codebase:

- `main id="main"` as the main-content target.
- `:focus-visible` styles in CSS modules.
- ARIA state handling for navigation, tabs, and accordion components.
- `aria-live` and `aria-invalid` feedback for forms and dynamic results.
- Visually hidden accessible labels for icon-only footer links.
- `prefers-reduced-motion` handling in CSS and JS modules.
- Automated `pa11y-ci` checks configured for 11 real root pages using WCAG2AA.

### SEO

Source pages include SEO and social metadata:

- `meta description`
- canonical links
- robots directives where used
- Open Graph metadata
- Twitter card metadata
- inline JSON-LD on pages with structured data
- `robots.txt`
- `sitemap.xml`
- OG images in `assets/img/og-img/`

### Performance

The project includes measurable and source-visible performance work:

- Minified CSS and JS generated by the build pipeline.
- Performance budgets in `perf-budgets.json` checked by `scripts/check-budgets.js`.
- Local `woff2` fonts with `font-display: swap`.
- Images in AVIF, WebP, JPG, and SVG formats.
- `loading="lazy"` and explicit dimensions on selected images.
- Service worker precache for root pages and stale-while-revalidate strategy for assets.

### Quality Assurance

Available QA commands:

```bash
npm run qa
npm run qa:html
npm run qa:links
npm run qa:a11y
npm run qa:budget
npm run assets:verify
npm run test:e2e
npm run release-check
```

Scope:

- `qa:html` validates root source pages, `partials/`, and `templates/`.
- `qa:links` checks local HTML references.
- `qa:a11y` runs `pa11y-ci` against 11 configured URLs.
- `assets:verify` checks asset references in project sources and service worker precache.
- `qa:budget` checks budgets for generated CSS and the JS module graph.
- `test:e2e` runs Playwright tests for selected UI flows.
- `release-check` runs the heavier pre-release gate: `qa`, `assets:verify`, `qa:budget`, and `test:e2e`.

### Project Maintenance

- Edit source files: root `*.html`, `partials/`, `assets/css/modules/`, `assets/js/`, `assets/data/`, and `scripts/`.
- Treat `dist/` as output generated by `npm run build:dist`.
- Treat `assets/css/style.min.css` and `assets/js/main.min.js` as build artifacts.
- Keep header and footer changes source-owned in `partials/`; `templates/partials/` stores template copies.
- When changing assets, paths, or the service worker, run `npm run assets:verify` and `npm run qa:links`.
- When changing HTML or interactions, run `npm run qa:html`, `npm run qa:a11y`, and the relevant Playwright tests.

### Roadmap

- Add automated JSON-LD validation for pages that include structured data.
- Add a focused service worker smoke test for root-page precache and the `/offline.html` fallback.
- Formalize a release checklist around `build`, `preview:dist`, and QA commands.

### License

`UNLICENSED` as declared in `package.json`.
