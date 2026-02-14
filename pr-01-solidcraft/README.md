# SolidCraft — portfolio front-end (audytowana wersja)

## PL

### Przegląd projektu

SolidCraft to wielostronicowy serwis front-end dla firmy remontowo-budowlanej, oparty na statycznych plikach HTML/CSS/JS z konfiguracją pod hosting Netlify. Projekt zawiera stronę główną, podstrony ofertowe, dokumenty prawne, stronę 404, widok offline i stronę podziękowania po formularzu.

### Kluczowe funkcje (potwierdzone w kodzie)

- Strona główna z sekcjami: oferta, realizacje, opinie, FAQ i kontakt.
- Podstrony usług: łazienki, malowanie, kafelkowanie, elektryka, hydraulika, remonty.
- Przełącznik motywu jasny/ciemny.
- Nawigacja z dropdownem i obsługą klawiatury.
- Walidacja formularza po stronie klienta oraz flow „thank-you”.
- Banner cookies.
- PWA: `manifest.webmanifest`, rejestracja service workera i strona offline.

### Tech stack

- HTML5 (wielostronicowy serwis statyczny).
- CSS3 (custom properties / design tokens, media queries, komponenty).
- JavaScript (vanilla, bez wykrytego frameworka).
- Node.js tooling: PostCSS, Terser, Prettier, Sharp, live-server.
- Netlify (`_headers`, `_redirects`).

### Struktura projektu

```text
pr-01-solidcraft/
├── index.html
├── 404.html
├── offline.html
├── thank-you/index.html
├── oferta/*.html
├── doc/*.html
├── css/style.css
├── js/script.js
├── js/theme-init.js
├── js/sw-register.js
├── sw.js
├── assets/
│   ├── fonts/
│   ├── img/
│   └── jsonld/
├── manifest.webmanifest
├── robots.txt
├── sitemap.xml
├── _headers
├── _redirects
└── package.json
```

### Setup i uruchomienie

```bash
npm install
npm run dev
```

Aplikacja uruchamia się przez `live-server` na porcie `15500`.

### Build i wdrożenie

```bash
npm run build
```

Build generuje minifikację CSS i JS (`build:css`, `build:js`) oraz formatuje repozytorium.

Uwaga wdrożeniowa: pliki `css/style.min.css`, `js/script.min.js` i `js/theme-init.min.js` nie są obecnie obecne w repozytorium, mimo że są referencjonowane przez HTML. Przed publikacją trzeba wygenerować i/lub dołączyć komplet assetów produkcyjnych.

### Dostępność (a11y)

- Wdrożone: skip link, landmarki, widoczne focus states (`:focus-visible`), obsługa `aria-expanded` i `aria-current`, wsparcie `prefers-reduced-motion`.
- Ryzyko: brak plików `*.min.*` blokuje wykonanie głównego JS, co ogranicza działanie kluczowych interakcji nawigacji i części ścieżek klawiaturowych.

### SEO

- Wdrożone: `title`, `description`, canonicale, OpenGraph, Twitter Cards, `sitemap.xml`, JSON-LD.
- Ryzyko krytyczne: `robots.txt` ma globalne `Disallow: /`, więc indeksacja jest zablokowana.

### Performance

- Wdrożone: obrazy AVIF/WEBP/JPG + `srcset`, lazy loading poza hero, preload fontów WOFF2, preload obrazu hero.
- Obszar do poprawy: pojedynczy CSS (`style.css`, ~72 KB) i pojedynczy JS (`script.js`, ~56 KB) są duże jak na statyczny serwis i warto je dalej modularnie optymalizować.

### Roadmap

- Dodać stabilny proces generowania i wersjonowania assetów `*.min.*` przed deployem.
- Ujednolicić naming klas do pełnej, konsekwentnej konwencji BEM.
- Rozdzielić CSS na warstwy (tokens/base/components/utilities) z pipeline scalającym.
- Dodać automatyczny audyt a11y/performance w CI.
- Uporządkować strategię SEO dla środowisk demo vs production.

### Licencja

`UNLICENSED` (zgodnie z `package.json`).

---

## EN

### Project overview

SolidCraft is a multi-page front-end website for a construction/renovation company, implemented as static HTML/CSS/JS with Netlify deployment configuration. It includes a homepage, service subpages, legal pages, a 404 page, an offline page, and a thank-you page.

### Key features (verified in code)

- Homepage sections: services, portfolio, testimonials, FAQ, and contact.
- Service subpages: bathrooms, painting, tiling, electrical, plumbing, renovations.
- Light/dark theme switch.
- Navigation with dropdown and keyboard handling.
- Client-side form validation and “thank-you” flow.
- Cookie banner.
- PWA setup: `manifest.webmanifest`, service worker registration, offline page.

### Tech stack

- HTML5 (static multi-page website).
- CSS3 (custom properties / design tokens, media queries, components).
- JavaScript (vanilla, no framework detected in project).
- Node.js tooling: PostCSS, Terser, Prettier, Sharp, live-server.
- Netlify (`_headers`, `_redirects`).

### Project structure

```text
pr-01-solidcraft/
├── index.html
├── 404.html
├── offline.html
├── thank-you/index.html
├── oferta/*.html
├── doc/*.html
├── css/style.css
├── js/script.js
├── js/theme-init.js
├── js/sw-register.js
├── sw.js
├── assets/
│   ├── fonts/
│   ├── img/
│   └── jsonld/
├── manifest.webmanifest
├── robots.txt
├── sitemap.xml
├── _headers
├── _redirects
└── package.json
```

### Setup & run

```bash
npm install
npm run dev
```

The site runs via `live-server` on port `15500`.

### Build & deployment notes

```bash
npm run build
```

Build runs CSS and JS minification (`build:css`, `build:js`) and then formatting.

Deployment note: `css/style.min.css`, `js/script.min.js`, and `js/theme-init.min.js` are currently not present in the repository, even though HTML files reference them. Production deployment requires generating and/or committing those assets.

### Accessibility notes

- Implemented: skip link, semantic landmarks, visible focus states (`:focus-visible`), `aria-expanded` and `aria-current` handling, `prefers-reduced-motion` support.
- Risk: missing `*.min.*` assets prevents main JS execution, which degrades key navigation interactions and keyboard paths.

### SEO notes

- Implemented: `title`, `description`, canonicals, OpenGraph, Twitter Cards, `sitemap.xml`, JSON-LD.
- Critical risk: `robots.txt` has global `Disallow: /`, so indexing is blocked.

### Performance notes

- Implemented: AVIF/WEBP/JPG responsive images with `srcset`, lazy loading outside hero, WOFF2 font preload, hero image preload.
- Improvement area: single large CSS (`style.css`, ~72 KB) and JS (`script.js`, ~56 KB) bundles should be further modularized/optimized.

### Roadmap

- Add a stable process to generate and version `*.min.*` assets before deployment.
- Align class naming toward strict BEM consistency.
- Split CSS into explicit layers (tokens/base/components/utilities) with a bundling pipeline.
- Add automated accessibility/performance audits in CI.
- Separate SEO policy for demo vs production environments.

### License

`UNLICENSED` (as declared in `package.json`).
