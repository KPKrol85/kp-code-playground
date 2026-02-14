# TransLogix — Portfolio Front-End Project

## 🇵🇱 Wersja polska

### 1) Przegląd projektu
TransLogix to wielostronicowy front-end B2B dla firmy transportowo-logistycznej, zbudowany w HTML/CSS/Vanilla JS. Projekt działa jako statyczny serwis i zawiera moduły interakcji (nawigacja mobilna, filtry usług/floty, FAQ accordion, kalkulatory, lightbox, przełącznik motywu, animacje sekcji i obsługa service workera). Kod bazuje na architekturze komponentowej CSS z tokenami i nazewnictwem BEM.

### 2) Kluczowe funkcje (wykryte w repozytorium)
- Wielostronicowa struktura: `index.html`, `services.html`, `service.html`, `fleet.html`, `pricing.html`, `contact.html`, strony prawne i `404.html`.
- Dynamiczne renderowanie szczegółu usługi z `assets/data/services.json` (`service.html?id=...` / `service.html?service=...`).
- Filtrowanie i sortowanie usług, zapis stanu filtrów w `sessionStorage`.
- Filtrowanie kart floty po typie pojazdu.
- Lightbox galerii floty z nawigacją, pułapką fokusu i widokiem powiększenia.
- Interaktywne formularze (walidacja, komunikaty błędów, wynik kalkulacji i historia wycen).
- Obsługa motywu light/dark i ustawianie `aria-pressed` dla przełącznika.
- Automatyczne `aria-current="page"` dla aktywnych linków w nawigacji.
- Rejestracja service workera (HTTPS/localhost) i cache strategii w `sw.js`.
- Konfiguracja deploymentu Netlify (`_headers`, `_redirects`).

### 3) Tech stack
- HTML5
- CSS3 (design tokens + BEM + warstwy layout/components/utilities)
- Vanilla JavaScript (ES modules)
- Node.js tooling: PostCSS + cssnano (`postcss-cli`)

### 4) Struktura katalogów
```text
pr-01-translogix/
├── *.html
├── assets/
│   ├── css/style.css
│   ├── js/*.js
│   ├── data/services.json
│   ├── fonts/
│   ├── icons/
│   └── img/
├── sw.js
├── _headers
├── _redirects
├── postcss.config.js
├── package.json
└── package-lock.json
```

### 5) Setup i uruchomienie
1. Zainstaluj zależności:
   ```bash
   npm install
   ```
2. Zbuduj zminifikowany CSS:
   ```bash
   npm run build
   ```
3. Uruchom statyczny serwer (dowolny, np. VS Code Live Server / `npx serve .`) i otwórz stronę.

> Uwaga: strony HTML używają `assets/css/style.min.css`, więc przed uruchomieniem produkcyjnym należy wykonać build CSS.

### 6) Build i deployment
- Build front-endu: `npm run build` (alias do `npm run css:min`).
- Netlify headers i cache policy są zdefiniowane w `_headers`.
- Redirecty ścieżek bez rozszerzeń są zdefiniowane w `_redirects`.

### 7) Dostępność (stan aktualny)
- Obecne: skip link, `aria-current`, `aria-expanded`, `aria-live`, focus-visible, obsługa ESC w menu/lightboxie, fallback dla `prefers-reduced-motion` w części modułów.
- Do dopracowania: spójniejsza hierarchia nagłówków na części podstron, pełne wyłączenie animacji reveal dla reduced-motion także po stronie CSS.

### 8) SEO (stan aktualny)
- Obecne: meta title/description, canonical, Open Graph, Twitter Card, JSON-LD, `robots.txt`, `sitemap.xml`.
- Ryzyka: część ścieżek assetów SEO/JSON-LD wskazuje zasoby niewykryte w repozytorium (szczegóły w `AUDIT.md`).

### 9) Performance (stan aktualny)
- Obecne: `loading="lazy"` na wielu obrazach, nowoczesne formaty obrazów (AVIF/WebP/JPG) w galerii floty, lokalne fonty WOFF2 z `font-display: swap`, minifikacja CSS przez PostCSS.
- Ryzyka: brak wygenerowanego `style.min.css` w repo powoduje brak stylów po świeżym checkout bez builda.

### 10) Roadmapa
- Uszczelnienie ścieżek assetów (CSS, SEO, CTA).
- Poprawa semantyki nagłówków na podstronach.
- Dodanie fallbacków i obsługi błędów `fetch` (offline/network).
- Domknięcie polityki cachingu pod aktualizacje assetów.
- Audyt końcowy Lighthouse + axe po korektach.

### 11) Licencja
Projekt oznaczony jako `UNLICENSED` w `package.json`.

---

## 🇬🇧 English version

### 1) Project overview
TransLogix is a multi-page B2B front-end website built with HTML/CSS/Vanilla JS. It runs as a static site and includes interaction modules (mobile navigation, services/fleet filters, FAQ accordion, calculators, lightbox, theme switch, section reveal animations, and service worker handling). The codebase follows a component-oriented CSS architecture with tokens and BEM naming.

### 2) Key features (detected in repository)
- Multi-page structure: `index.html`, `services.html`, `service.html`, `fleet.html`, `pricing.html`, `contact.html`, legal pages, and `404.html`.
- Dynamic service detail rendering from `assets/data/services.json` (`service.html?id=...` / `service.html?service=...`).
- Service filtering/sorting with filter state persisted in `sessionStorage`.
- Fleet card filtering by vehicle type.
- Fleet gallery lightbox with navigation, focus trap, and zoom mode.
- Interactive forms (validation, field errors, quote output, quote history).
- Light/dark theme toggle with `aria-pressed` state updates.
- Automatic `aria-current="page"` for active navigation links.
- Service worker registration (HTTPS/localhost) and caching strategies in `sw.js`.
- Netlify deployment configuration (`_headers`, `_redirects`).

### 3) Tech stack
- HTML5
- CSS3 (design tokens + BEM + layout/components/utilities separation)
- Vanilla JavaScript (ES modules)
- Node.js tooling: PostCSS + cssnano (`postcss-cli`)

### 4) Structure overview
```text
pr-01-translogix/
├── *.html
├── assets/
│   ├── css/style.css
│   ├── js/*.js
│   ├── data/services.json
│   ├── fonts/
│   ├── icons/
│   └── img/
├── sw.js
├── _headers
├── _redirects
├── postcss.config.js
├── package.json
└── package-lock.json
```

### 5) Setup & run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Build minified CSS:
   ```bash
   npm run build
   ```
3. Run a static server (e.g., VS Code Live Server / `npx serve .`) and open the site.

> Note: HTML pages load `assets/css/style.min.css`, so CSS build is required before production run.

### 6) Build & deployment notes
- Front-end build: `npm run build` (alias to `npm run css:min`).
- Netlify security/cache headers are defined in `_headers`.
- Extensionless path redirects are defined in `_redirects`.

### 7) Accessibility notes
- Present: skip link, `aria-current`, `aria-expanded`, `aria-live`, visible focus styles, ESC handling in menu/lightbox, reduced-motion fallback in selected modules.
- To improve: more consistent heading hierarchy on selected pages, full reveal animation disablement for reduced-motion also in CSS.

### 8) SEO notes
- Present: meta title/description, canonical, Open Graph, Twitter Card, JSON-LD, `robots.txt`, `sitemap.xml`.
- Risks: some SEO/JSON-LD asset paths reference files not detected in the repository (see `AUDIT.md`).

### 9) Performance notes
- Present: `loading="lazy"` on many images, modern image formats (AVIF/WebP/JPG) in fleet gallery, local WOFF2 fonts with `font-display: swap`, CSS minification via PostCSS.
- Risk: missing generated `style.min.css` in repository causes unstyled pages on fresh checkout without running build.

### 10) Roadmap
- Fix asset path integrity (CSS, SEO assets, CTA links).
- Improve heading semantics across subpages.
- Add robust `fetch` error handling and offline fallback.
- Refine caching strategy for predictable asset updates.
- Run final Lighthouse + axe audit after fixes.

### 11) License
This project is marked as `UNLICENSED` in `package.json`.
