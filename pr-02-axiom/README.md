# Axiom Construction

## PL

### Przegląd projektu
Axiom Construction to statyczny serwis front-end (HTML/CSS/JS) dla firmy budowlano-remontowej, z wieloma podstronami usługowymi i prawnymi, formularzem kontaktowym oraz elementami PWA (manifest + service worker).

### Kluczowe funkcje (wykryte w repozytorium)
- Strona główna + dedykowane podstrony usług (`services/*.html`) i dokumentów (`legal/*.html`).
- Formularz kontaktowy Netlify (`data-netlify="true"`) z honeypotem, komunikatami błędów i fallbackiem no-JS.
- Lightbox galerii, przełącznik motywu, menu mobilne, przycisk „powrót na górę”.
- SEO: canonical, Open Graph, Twitter cards, robots meta, `sitemap.xml`, `robots.txt`, JSON-LD.
- PWA: `manifest.webmanifest`, `sw.js`, `offline.html`, nagłówki cache/security w `_headers`.

### Tech stack
- HTML5 (wiele stron statycznych)
- CSS modularny przez `@import` (`css/main.css` + tokens/base/layout/components/sections)
- Vanilla JS modułowy (`js/core`, `js/components`, `js/sections`, `js/utils`)
- Narzędzia build/QA przez npm scripts (Node, Lighthouse CI, pa11y)

### Struktura projektu (skrót)
- `index.html`, `404.html`, `success.html`, `offline.html`
- `services/` — podstrony usług
- `legal/` — podstrony prawne/informacyjne
- `css/` — tokeny + warstwy stylów
- `js/` — logika aplikacji
- `manifest.webmanifest`, `sw.js`, `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`

### Instalacja i uruchomienie
1. `npm install`
2. Build produkcyjny: `npm run build`
3. Podgląd katalogu wynikowego: `npm run serve:dist`
4. Alternatywnie serwowanie katalogu roboczego: `npm run serve`

### Build i wdrożenie
- Projekt zakłada pipeline budujący zasoby do `dist/` (m.in. `dist/style.min.css`).
- Reguły cache i security są zdefiniowane dla hostingu Netlify w `_headers`.
- Trasy fallback/404 są opisane w `_redirects` (plik zawiera głównie komentarze).

### Dostępność (A11y)
- Obecne: skip-link, semantyczne nagłówki, `aria-current`, `aria-expanded`, widoczne style focus, `prefers-reduced-motion`, komunikaty formularza (`aria-live`), no-JS fallback formularza.
- Do poprawy: część linków w modalu na podstronach `legal/*` używa błędnych ścieżek względnych (`legal/...` zamiast lokalnych względem katalogu `legal`).

### SEO
- Implementacja obejmuje `meta description`, `canonical`, Open Graph, Twitter card, JSON-LD, `robots.txt` i `sitemap.xml`.
- `og:url` jest zgodny z canonical na analizowanych stronach.

### Wydajność
- Obecne: obrazy responsywne (`srcset`), nowoczesne formaty (AVIF/WebP), `loading="lazy"` dla większości obrazów, `font-display: swap`, preload fontów.
- Ryzyko: w drzewie roboczym brakuje `dist/style.min.css`, więc uruchomienie bez kroku build powoduje brak stylów.

### Roadmap (techniczna)
- Uporządkować spójność ścieżek względnych w modalu `legal/*`.
- Ujednolicić strategię cachowania SW z faktycznymi ścieżkami zasobów runtime.
- Dodać cross-platformowe skrypty QA (obecnie składnia `if not exist` jest windowsowa).
- Rozważyć redukcję globalnych nadpisań stylów focus i uporządkowanie warstw utility/base.
- Dodać automatyczny test integralności linków do CI dla katalogu `pr-02-axiom`.

### Licencja
MIT (`LICENSE`).

---

## EN

### Project overview
Axiom Construction is a static front-end website (HTML/CSS/JS) for a construction/remodeling business, with multiple service/legal subpages, a contact form, and PWA elements (manifest + service worker).

### Key features (verified in repository)
- Home page + dedicated service pages (`services/*.html`) and legal pages (`legal/*.html`).
- Netlify contact form (`data-netlify="true"`) with honeypot, validation messaging, and no-JS fallback.
- Gallery lightbox, theme switcher, mobile navigation, “back to top” control.
- SEO coverage: canonical, Open Graph, Twitter cards, robots meta, `sitemap.xml`, `robots.txt`, JSON-LD.
- PWA coverage: `manifest.webmanifest`, `sw.js`, `offline.html`, caching/security headers in `_headers`.

### Tech stack
- HTML5 (multi-page static setup)
- Modular CSS via `@import` (`css/main.css` + tokens/base/layout/components/sections)
- Modular vanilla JS (`js/core`, `js/components`, `js/sections`, `js/utils`)
- Build/QA tooling via npm scripts (Node, Lighthouse CI, pa11y)

### Structure overview
- `index.html`, `404.html`, `success.html`, `offline.html`
- `services/` — service subpages
- `legal/` — legal/informational subpages
- `css/` — tokens + style layers
- `js/` — application logic
- `manifest.webmanifest`, `sw.js`, `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`

### Setup & run
1. `npm install`
2. Production build: `npm run build`
3. Serve build output: `npm run serve:dist`
4. Optional dev/static serving from project root: `npm run serve`

### Build/deployment notes
- The project expects a build pipeline that outputs assets to `dist/` (including `dist/style.min.css`).
- Netlify cache/security policies are declared in `_headers`.
- Fallback/404 behavior is documented in `_redirects` (currently mostly comments).

### Accessibility notes
- Present: skip-link, semantic heading flow, `aria-current`, `aria-expanded`, visible focus styles, `prefers-reduced-motion`, form live-region messaging, no-JS form fallback.
- Improvement needed: some modal links on `legal/*` pages use incorrect relative paths (`legal/...`) from inside the `legal` directory.

### SEO notes
- Includes `meta description`, `canonical`, Open Graph, Twitter card, JSON-LD, `robots.txt`, and `sitemap.xml`.
- `og:url` and canonical values are aligned on audited pages.

### Performance notes
- Present: responsive images (`srcset`), AVIF/WebP sources, widespread `loading="lazy"`, `font-display: swap`, font preloads.
- Risk: `dist/style.min.css` is missing in the working tree, so running without build leads to unstyled pages.

### Roadmap
- Fix inconsistent relative paths in `legal/*` modal links.
- Align service-worker precache asset list with actual runtime asset paths.
- Make QA scripts cross-platform (current `if not exist` syntax is Windows-oriented).
- Simplify global focus-style overrides and utility/base layering.
- Add automated local link-integrity checks in CI for `pr-02-axiom`.

### License
MIT (`LICENSE`).
