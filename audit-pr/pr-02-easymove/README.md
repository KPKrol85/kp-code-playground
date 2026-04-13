# Easy Move

## PL

### Przegląd projektu
Easy Move to wielostronicowy serwis statyczny dla firmy przeprowadzkowej, zbudowany w oparciu o HTML, modularny JavaScript i warstwowy CSS. Repozytorium zawiera strony ofertowe i informacyjne (`index.html`, `uslugi.html`, `przeprowadzki-firm.html`, `cennik.html`, `o-nas.html`, `faq.html`, `kontakt.html`, `polityka-prywatnosci.html`, `cookies.html`) oraz pipeline budujący wersję produkcyjną w katalogu `dist`.

### Kluczowe funkcje
- Wielostronicowa nawigacja desktop/mobile z rozwijanym menu usług i dedykowanym menu mobilnym.
- Przełącznik motywu jasny/ciemny z zapisem preferencji użytkownika w `localStorage`.
- Moduły UI: accordion (FAQ), taby cennika, przycisk „back to top”, animacje reveal oparte o `IntersectionObserver`.
- Formularz kontaktowy z walidacją po stronie klienta (m.in. wymagane pola, email, telefon, data nie wcześniejsza niż bieżąca), komunikatami błędów i podsumowaniem błędów.
- Reużywalne partiale (`partials/footer.html`, `partials/scripts.html`) składane do stron podczas builda.
- Metadane SEO i social (`canonical`, Open Graph, Twitter), dane strukturalne JSON-LD, `robots.txt` i `sitemap.xml`.

### Stack technologiczny
**Runtime / frontend**
- HTML5 (architektura multi-page)
- CSS (podział na tokeny, bazę, layout, komponenty, utilities i style stron)
- Vanilla JavaScript ES Modules

**Build i narzędzia**
- Node.js + npm scripts
- Vite (dev server, preview)
- PostCSS (`postcss-import`, `cssnano`) do bundlingu/minifikacji CSS
- Terser do minifikacji JavaScript
- Skrypty builda Node (`scripts/build.mjs`, `scripts/build-js.mjs`) do składania include’ów HTML, minifikacji JS i kopiowania zasobów
- Sharp (`scripts/convert-images.mjs`) do konwersji obrazów do WebP/AVIF

### Struktura projektu
```text
.
├── assets/                  # Ikony/ilustracje + zasoby obrazów
├── css/
│   ├── main.css             # Punkt wejścia importów CSS
│   ├── tokens.css           # Design tokens
│   ├── base.css             # Reset/baza globalna
│   ├── layout.css           # Siatki i layout
│   ├── components.css       # Komponenty UI
│   ├── utilities.css        # Klasy pomocnicze
│   └── pages/               # Style specyficzne dla stron
├── js/
│   ├── main.js              # Bootstrap modułów frontendowych
│   └── modules/             # Menu, theme, form, tabs, accordion, reveal itd.
├── partials/                # Wspólne fragmenty HTML (footer, skrypty)
├── scripts/
│   ├── build.mjs            # Build produkcyjny do dist/
│   ├── build-js.mjs         # Minifikacja JS (entry + moduły) do dist/js
│   └── convert-images.mjs   # Konwersja obrazów
├── *.html                   # Strony serwisu
├── robots.txt
├── sitemap.xml
├── postcss.config.cjs
└── package.json
```

### Instalacja i konfiguracja
```bash
npm install
```

### Development lokalny
```bash
npm run dev
```
Opcjonalnie, osobny watch dla CSS:
```bash
npm run css:watch
```

### Build produkcyjny
```bash
npm run build
```
Build wykonuje:
- minifikację CSS do `dist/css/main.min.css`,
- minifikację `js/main.js` oraz modułów do `dist/js/...`,
- składanie include’ów HTML,
- podmianę odwołań do assetów na wersje `.min`,
- kopiowanie `assets/`, `robots.txt`, `sitemap.xml` do `dist/`.

Strategia URL dla deployu jest oparta o pliki HTML (`index.html`, `uslugi.html`, `kontakt.html` itd.).  
W związku z tym metadane SEO (canonical, Open Graph, JSON-LD `WebPage.url`) i wpisy `sitemap.xml` wskazują jawne ścieżki z `.html` (poza stroną główną `/`).

Podgląd builda (komenda najpierw odświeża `dist/`, a potem uruchamia serwer podglądu):
```bash
npm run preview
```

### Dostępność
- Skip link do głównej treści (`#main`).
- Atrybuty ARIA i obsługa klawiatury w komponentach interaktywnych (menu mobilne, accordion, taby).
- Obsługa `prefers-reduced-motion` dla animacji reveal.
- Formularz z etykietami, komunikatami błędów i stanem `aria-invalid`.

### SEO
- Meta `title` i `description` na stronach.
- `link rel="canonical"`.
- Open Graph i Twitter Cards.
- Dane strukturalne JSON-LD (`MovingCompany`, `WebPage`).
- `robots.txt` oraz `sitemap.xml`.

### Wydajność
- Minifikacja CSS i JavaScript w pipeline produkcyjnym.
- Modularny JS ładowany jako `type="module"`.
- Statyczna architektura bez warstwy frameworkowej po stronie klienta.

### Utrzymanie projektu
- Nowe zachowania interaktywne dodawaj jako osobne moduły w `js/modules/` i rejestruj w `js/main.js`.
- Zmiany globalnego wyglądu zaczynaj od `css/tokens.css` i odpowiednich warstw (`base`, `layout`, `components`, `utilities`).
- Wspólne fragmenty HTML utrzymuj w `partials/`; build automatycznie osadza je w stronach przez `<!-- @include ... -->`.
- Dla produkcji używaj wyłącznie artefaktów generowanych przez `scripts/build.mjs` do katalogu `dist/`.

## EN

### Project Overview
Easy Move is a multi-page static website for a moving company, built with HTML, modular JavaScript, and layered CSS. The repository includes offer and information pages (`index.html`, `uslugi.html`, `przeprowadzki-firm.html`, `cennik.html`, `o-nas.html`, `faq.html`, `kontakt.html`, `polityka-prywatnosci.html`, `cookies.html`) and a production build pipeline that outputs to `dist`.

### Key Features
- Multi-page desktop/mobile navigation with a services dropdown and dedicated mobile menu.
- Light/dark theme toggle with user preference persisted in `localStorage`.
- UI modules: accordion (FAQ), pricing tabs, back-to-top button, reveal animations using `IntersectionObserver`.
- Contact form with client-side validation (required fields, email, phone, non-past date), inline field errors, and error summary.
- Reusable partials (`partials/footer.html`, `partials/scripts.html`) assembled into pages during build.
- SEO and social metadata (`canonical`, Open Graph, Twitter), JSON-LD structured data, `robots.txt`, and `sitemap.xml`.

### Tech Stack
**Runtime / frontend**
- HTML5 (multi-page architecture)
- CSS (tokens, base, layout, components, utilities, page-specific styles)
- Vanilla JavaScript ES Modules

**Build and tooling**
- Node.js + npm scripts
- Vite (dev server, preview)
- PostCSS (`postcss-import`, `cssnano`) for CSS bundling/minification
- Terser for JavaScript minification
- Node build scripts (`scripts/build.mjs`, `scripts/build-js.mjs`) for HTML include assembly, JS minification, and asset copying
- Sharp (`scripts/convert-images.mjs`) for WebP/AVIF conversion

### Project Structure
```text
.
├── assets/                  # Icons/illustrations + image assets
├── css/
│   ├── main.css             # CSS import entry point
│   ├── tokens.css           # Design tokens
│   ├── base.css             # Global reset/base
│   ├── layout.css           # Grids and layout
│   ├── components.css       # UI components
│   ├── utilities.css        # Utility classes
│   └── pages/               # Page-specific styles
├── js/
│   ├── main.js              # Frontend module bootstrap
│   └── modules/             # Menu, theme, form, tabs, accordion, reveal, etc.
├── partials/                # Shared HTML fragments (footer, scripts)
├── scripts/
│   ├── build.mjs            # Production build to dist/
│   ├── build-js.mjs         # JS minification (entry + modules) to dist/js
│   └── convert-images.mjs   # Image conversion utility
├── *.html                   # Website pages
├── robots.txt
├── sitemap.xml
├── postcss.config.cjs
└── package.json
```

### Setup and Installation
```bash
npm install
```

### Local Development
```bash
npm run dev
```
Optional separate CSS watcher:
```bash
npm run css:watch
```

### Production Build
```bash
npm run build
```
The build process performs:
- CSS minification to `dist/css/main.min.css`,
- minification of `js/main.js` and modules to `dist/js/...`,
- HTML include assembly,
- replacement of asset references with `.min` variants,
- copying of `assets/`, `robots.txt`, and `sitemap.xml` to `dist/`.

Deployment URL strategy is explicitly file-based (`index.html`, `uslugi.html`, `kontakt.html`, etc.).  
Therefore, SEO metadata (canonical, Open Graph, JSON-LD `WebPage.url`) and `sitemap.xml` entries point to explicit `.html` paths (except the homepage `/`).

Build preview (the command refreshes `dist/` first and then starts the preview server):
```bash
npm run preview
```

### Accessibility
- Skip link to main content (`#main`).
- ARIA attributes and keyboard handling in interactive components (mobile menu, accordion, tabs).
- `prefers-reduced-motion` handling for reveal animations.
- Form labels, field-level errors, and `aria-invalid` state handling.

### SEO
- Per-page `title` and `description` metadata.
- `link rel="canonical"`.
- Open Graph and Twitter Card metadata.
- JSON-LD structured data (`MovingCompany`, `WebPage`).
- `robots.txt` and `sitemap.xml`.

### Performance
- CSS and JavaScript minification in the production pipeline.
- Modular JavaScript loaded via `type="module"`.
- Static architecture without a client-side framework runtime.

### Project Maintenance
- Add new interactive behavior as separate modules in `js/modules/` and register them in `js/main.js`.
- Start global styling changes in `css/tokens.css` and the appropriate layers (`base`, `layout`, `components`, `utilities`).
- Keep shared HTML in `partials/`; the build assembles it through `<!-- @include ... -->`.
- For production, use artifacts generated by `scripts/build.mjs` in `dist/`.
