# EverAfter Ring

## PL

### Przegląd projektu
EverAfter Ring to statyczny, wielostronicowy serwis WWW zbudowany w HTML, CSS i JavaScript. Repozytorium zawiera sześć głównych stron źródłowych plus stronę potwierdzenia formularza, współdzielone partiale nagłówka i stopki, klientowe moduły interakcji oraz własny pipeline builda generujący gotową wersję produkcyjną w katalogu `dist/`.

### Kluczowe funkcje
- Wielostronicowa struktura obejmująca strony: `index.html`, `oferta.html`, `uslugi.html`, `realizacje.html`, `o-nas.html`, `kontakt.html` oraz `dziekujemy.html`.
- Współdzielony `header` i `footer` obsługiwane przez `partials/`, ładowane w wersji źródłowej przez JavaScript i osadzane bezpośrednio w HTML podczas builda.
- Responsywna nawigacja z menu mobilnym, dropdownem dla sekcji usług, obsługą `Escape`, kliknięcia poza menu oraz stanem aktywnej strony przez `aria-current`.
- Formularz kontaktowy z walidacją po stronie klienta, komunikatami błędów dla poszczególnych pól oraz komunikatem statusu aktualizowanym w `aria-live`.
- Strona usług z linkowaniem do sekcji przez kotwice oraz efekt ruchu obrazu w sekcjach hero.

### Stack technologiczny
**Runtime**
- HTML5
- CSS
- Vanilla JavaScript w formie ES modules

**Assety i metadane**
- SVG, JPG, WOFF2
- `robots.txt`
- `sitemap.xml`
- dane strukturalne JSON-LD

**Tooling**
- Node.js i `npm`
- `esbuild`
- `lightningcss`
- własny skrypt builda `scripts/build.mjs`

### Struktura projektu
```text
.
├── assets/                 # obrazy, fonty, favicony i placeholdery
├── css/                    # tokeny, baza, layout, komponenty i sekcje
├── dist/                   # wygenerowana wersja produkcyjna
├── js/                     # punkt wejścia, konfiguracja, utils i moduły UI
├── partials/               # współdzielony header i footer
├── scripts/
│   └── build.mjs           # proces builda i przygotowanie dist/
├── index.html
├── oferta.html
├── uslugi.html
├── realizacje.html
├── o-nas.html
├── kontakt.html
├── dziekujemy.html
├── package.json
├── robots.txt
├── sitemap.xml
└── start-local-preview.bat
```

### Instalacja i konfiguracja
Repozytorium zawiera zależności developerskie do procesu builda. Instalacja:

```bash
npm install
```

### Development lokalny
Podgląd lokalny jest uruchamiany przez skrypt wsadowy, który startuje serwer HTTP w katalogu projektu:

```bat
start-local-preview.bat
```

Skrypt uruchamia `python -m http.server 8181`, dzięki czemu strony źródłowe mogą pobierać partiale z katalogu `partials/`.

### Build produkcyjny
Pełny build produkcyjny:

```bash
npm run build
```

Dostępne są również skrypty cząstkowe:

```bash
npm run clean
npm run build:css
npm run build:js
npm run build:html
npm run build:assets
```

Build:
- minifikuje CSS do `dist/css/main.min.css`,
- bundluje i minifikuje JavaScript do `dist/js/app.min.js`,
- osadza partiale w finalnych plikach HTML,
- kopiuje assety oraz pliki `robots.txt` i `sitemap.xml` do `dist/`.

### Dostępność
- Każda strona zawiera link pomijający do `#main`.
- Struktura dokumentów korzysta z semantycznych landmarków: `header`, `nav`, `main`, `footer`.
- Nawigacja używa atrybutów `aria-expanded`, `aria-controls` i `aria-current`, a dropdown obsługuje klawiaturę.
- Styl bazowy definiuje widoczny stan `:focus-visible` dla elementów interaktywnych.
- Obsługiwane jest `prefers-reduced-motion: reduce`.
- Formularz kontaktowy korzysta z powiązań `label`, `aria-describedby` i regionu statusu `aria-live="polite"`.

### SEO
- Każda strona ma własny `<title>`, `meta name="description"` i `link rel="canonical"`.
- Repozytorium zawiera `robots.txt` oraz `sitemap.xml` obejmujący sześć głównych stron.
- W dokumentach osadzono dane strukturalne JSON-LD typu `LocalBusiness` i `WebSite`.
- Projekt zawiera faviconę SVG.

### Wydajność
- Produkcyjny pipeline generuje zminifikowane pliki CSS i JavaScript.
- HTML produkcyjny przełącza odwołania z plików źródłowych na zasoby zminifikowane.
- Obrazy w serwisie mają jawnie określone wymiary.
- Wybrane obrazy portfolio korzystają z `loading="lazy"`.
- Fonty są serwowane lokalnie w formacie WOFF2.

### Utrzymanie projektu
- Główna treść stron znajduje się w plikach HTML w katalogu głównym repozytorium.
- Wspólne elementy layoutu są utrzymywane w `partials/header.html` i `partials/footer.html`.
- Zachowania interaktywne są rozdzielone na moduły w `js/modules/` (`partials`, `nav`, `form`, `hero`).
- Organizacja styli jest centralizowana przez `css/main.css`, który importuje warstwy tokenów, bazy, layoutu, komponentów i sekcji.
- Logika przygotowania wersji produkcyjnej jest skupiona w `scripts/build.mjs`.

## EN

### Project Overview
EverAfter Ring is a static multi-page website built with HTML, CSS, and JavaScript. The repository contains six main source pages plus a post-submit success page, shared header and footer partials, client-side interaction modules, and a custom build pipeline that produces a production-ready output in `dist/`.

### Key Features
- Multi-page structure covering `index.html`, `oferta.html`, `uslugi.html`, `realizacje.html`, `o-nas.html`, `kontakt.html`, and `dziekujemy.html`.
- Shared `header` and `footer` managed through `partials/`, loaded by JavaScript in source mode and embedded directly into HTML during the build.
- Responsive navigation with a mobile menu, services dropdown, `Escape` handling, outside-click closing, and active-page state via `aria-current`.
- Contact form with client-side validation, field-level error messages, and a status message updated through `aria-live`.
- Services page with anchor-based section linking and a hero image motion effect.

### Tech Stack
**Runtime**
- HTML5
- CSS
- Vanilla JavaScript using ES modules

**Assets and metadata**
- SVG, JPG, WOFF2
- `robots.txt`
- `sitemap.xml`
- JSON-LD structured data

**Tooling**
- Node.js and `npm`
- `esbuild`
- `lightningcss`
- custom build script in `scripts/build.mjs`

### Project Structure
```text
.
├── assets/                 # images, fonts, favicons, and placeholders
├── css/                    # tokens, base, layout, components, and sections
├── dist/                   # generated production output
├── js/                     # entry point, config, utils, and UI modules
├── partials/               # shared header and footer
├── scripts/
│   └── build.mjs           # build process and dist/ generation
├── index.html
├── oferta.html
├── uslugi.html
├── realizacje.html
├── o-nas.html
├── kontakt.html
├── dziekujemy.html
├── package.json
├── robots.txt
├── sitemap.xml
└── start-local-preview.bat
```

### Setup and Installation
The repository includes development dependencies used by the build process. Install them with:

```bash
npm install
```

### Local Development
Local preview is started through the batch script, which launches an HTTP server in the project root:

```bat
start-local-preview.bat
```

The script runs `python -m http.server 8181`, allowing the source pages to fetch partials from `partials/`.

### Production Build
Full production build:

```bash
npm run build
```

Available partial build scripts:

```bash
npm run clean
npm run build:css
npm run build:js
npm run build:html
npm run build:assets
```

The build process:
- minifies CSS into `dist/css/main.min.css`,
- bundles and minifies JavaScript into `dist/js/app.min.js`,
- embeds partials into the final HTML files,
- copies assets plus `robots.txt` and `sitemap.xml` into `dist/`.

### Accessibility
- Every page includes a skip link targeting `#main`.
- Document structure uses semantic landmarks: `header`, `nav`, `main`, and `footer`.
- Navigation uses `aria-expanded`, `aria-controls`, and `aria-current`, and the dropdown supports keyboard interaction.
- The base styles define a visible `:focus-visible` state for interactive elements.
- `prefers-reduced-motion: reduce` is supported.
- The contact form uses connected `label` elements, `aria-describedby`, and an `aria-live="polite"` status region.

### SEO
- Each page defines its own `<title>`, `meta name="description"`, and `link rel="canonical"`.
- The repository includes `robots.txt` and a `sitemap.xml` covering the six main pages.
- JSON-LD structured data for `LocalBusiness` and `WebSite` is embedded in the documents.
- The project includes an SVG favicon.

### Performance
- The production pipeline outputs minified CSS and JavaScript bundles.
- Production HTML switches references from source assets to minified assets.
- Images across the site use explicit dimensions.
- Selected portfolio images use `loading="lazy"`.
- Fonts are served locally in WOFF2 format.

### Project Maintenance
- Primary page content lives in the top-level HTML files.
- Shared layout fragments are maintained in `partials/header.html` and `partials/footer.html`.
- Interactive behaviors are split into focused modules in `js/modules/` (`partials`, `nav`, `form`, `hero`).
- Style organization is centralized through `css/main.css`, which imports tokens, base, layout, component, and section layers.
- Production build logic is concentrated in `scripts/build.mjs`.
