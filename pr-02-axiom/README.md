# Axiom Construction — dokumentacja projektu

## Wersja polska

### 1) Przegląd projektu
Axiom Construction to portfolio front-endowe dla firmy budowlano-remontowej, zbudowane w oparciu o statyczne HTML/CSS/JS, z przygotowanymi assetami produkcyjnymi w `dist/`, konfiguracją PWA oraz konfiguracją wdrożenia Netlify.

### 2) Kluczowe funkcje
- Wielostronicowy serwis: strona główna, podstrony usług, podstrony prawne, `404.html`, `offline.html`.
- Responsywna nawigacja mobilna i desktopowa z przełącznikiem motywu jasny/ciemny.
- Formularz kontaktowy Netlify (`data-netlify="true"` + honeypot).
- Lightbox galerii, przycisk „powrót na górę”, baner cookies.
- PWA: `manifest.webmanifest` + `sw.js` + strona offline.
- SEO: canonical, OpenGraph, Twitter Cards, `robots.txt`, `sitemap.xml`.

### 3) Tech stack
- HTML5
- CSS3 (modułowa architektura + design tokens)
- Vanilla JavaScript (ES modules w źródłach)
- Node.js tooling (build CSS/JS/image, Lighthouse, Pa11y)
- Netlify (`_headers`, `_redirects`)

### 4) Struktura projektu
- `css/` — warstwy: `tokens`, `base`, `layout`, `components`, `sections`
- `js/` — podział: `core`, `components`, `sections`, `utils`, `structured-data`
- `dist/` — zminifikowane assety produkcyjne (`style.min.css`, `script.min.js`)
- `services/`, `legal/` — podstrony
- `tools/` — skrypty build
- `assets/` — obrazy, fonty, ikony

### 5) Setup i uruchomienie
```bash
npm install
npm run serve
```
Aplikacja lokalnie: `http://localhost:8080`.

### 6) Build i wdrożenie
```bash
npm run build:css
npm run build:js
npm run build
```
- Wdrożenie jest przygotowane pod Netlify.
- Reguły nagłówków i przekierowań: `_headers`, `_redirects`.

### 7) Dostępność (stan aktualny)
- Obecne: skip link, `aria-expanded` dla menu mobilnego, focus states, `prefers-reduced-motion`, semantyczne landmarki i pojedyncze `h1` na stronę.
- Wymaga dopracowania: spójne oznaczenie aktywnego kontekstu nawigacji (`aria-current`) na podstronach usług i legal.

### 8) SEO (stan aktualny)
- Obecne: canonical, meta description, OG/Twitter, `robots.txt`, `sitemap.xml`.
- Ryzyko: JSON-LD jest ładowany jako zewnętrzny `src` w `<script type="application/ld+json">`; zalecane jest osadzenie inline.

### 9) Wydajność (stan aktualny)
- Obecne: obrazy `avif/webp/jpg` z fallbackami, `srcset/sizes`, lazy loading obrazów, preload fontów, minifikacja CSS/JS.
- Dalsze kroki: CI z automatyczną kontrolą budżetów Lighthouse i regularny audyt nieużywanych assetów.

### 10) Roadmap
- Przeniesienie JSON-LD do inline script blocks na wszystkich stronach.
- Domknięcie spójności `aria-current` w nawigacji.
- Usunięcie lub implementacja pustego modułu FAQ (`js/sections/faq.js`).
- Dodatkowy pipeline CI z gate dla QA.

### 11) Licencja
ISC (zgodnie z `package.json`).

---

## English version

### 1) Project overview
Axiom Construction is a front-end portfolio website for a construction/renovation brand, implemented with static HTML/CSS/JS, production assets in `dist/`, PWA setup, and Netlify deployment configuration.

### 2) Key features
- Multi-page website: home, service pages, legal pages, `404.html`, `offline.html`.
- Responsive navigation (mobile + desktop) with light/dark theme toggle.
- Netlify contact form (`data-netlify="true"` + honeypot).
- Gallery lightbox, “back to top” button, cookie banner.
- PWA: `manifest.webmanifest` + `sw.js` + offline page.
- SEO: canonical, OpenGraph, Twitter Cards, `robots.txt`, `sitemap.xml`.

### 3) Tech stack
- HTML5
- CSS3 (modular architecture + design tokens)
- Vanilla JavaScript (ES modules in source)
- Node.js tooling (CSS/JS/image build, Lighthouse, Pa11y)
- Netlify (`_headers`, `_redirects`)

### 4) Structure overview
- `css/` — layers: `tokens`, `base`, `layout`, `components`, `sections`
- `js/` — split into `core`, `components`, `sections`, `utils`, `structured-data`
- `dist/` — minified production assets (`style.min.css`, `script.min.js`)
- `services/`, `legal/` — subpages
- `tools/` — build scripts
- `assets/` — images, fonts, icons

### 5) Setup & run
```bash
npm install
npm run serve
```
Local URL: `http://localhost:8080`.

### 6) Build & deployment notes
```bash
npm run build:css
npm run build:js
npm run build
```
- Deployment target is prepared for Netlify.
- Header and redirect rules are defined in `_headers` and `_redirects`.

### 7) Accessibility notes
- Present: skip link, `aria-expanded` for mobile nav, focus styles, `prefers-reduced-motion`, semantic landmarks, one `h1` per page.
- To improve: consistent active-context navigation marking (`aria-current`) on service/legal pages.

### 8) SEO notes
- Present: canonical, meta description, OG/Twitter tags, `robots.txt`, `sitemap.xml`.
- Risk: JSON-LD is loaded via external `src` in `<script type="application/ld+json">`; inline script blocks are recommended.

### 9) Performance notes
- Present: `avif/webp/jpg` image pipeline with fallbacks, `srcset/sizes`, lazy image loading, font preloads, minified CSS/JS.
- Next step: CI-based Lighthouse budget checks and recurring unused-asset audits.

### 10) Roadmap
- Migrate JSON-LD to inline script blocks across all pages.
- Finalize `aria-current` consistency in navigation.
- Remove or implement the empty FAQ module (`js/sections/faq.js`).
- Add CI pipeline gates for QA tasks.

### 11) License
ISC (as defined in `package.json`).
