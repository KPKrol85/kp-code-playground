# VOLT GARAGE — Dokumentacja projektu (PL)

## Przegląd projektu
VOLT GARAGE to statyczny front-end sklepu motoryzacyjnego z wieloma podstronami, modułowym CSS/JS, dynamicznym renderowaniem katalogu produktów z `data/products.json`, trybem PWA (manifest + service worker) oraz wdrożeniem pod Netlify (`_headers`, `_redirects`).

## Kluczowe funkcje (wyłącznie wykryte w repozytorium)
- Wielostronicowa struktura HTML: strona główna + koszyk, checkout, kontakt, regulaminy, nowości, promocje, sklep, produkt, kolekcje.
- Dynamiczne renderowanie produktów i filtrów po stronie klienta (`js/features/products.js`, `js/features/filters.js`, `js/services/products.js`).
- Koszyk oparty o localStorage (`js/features/cart.js`, `js/services/storage.js`).
- Modal demo z wymuszeniem akceptacji i pułapką focusu (`js/ui/demo-modal.js`, `js/ui/focus-trap.js`).
- Przełącznik motywu light/dark z pamięcią preferencji (`js/ui/theme.js`).
- Obsługa PWA: `site.webmanifest`, `sw.js`, strona offline, CTA instalacji i komunikaty offline/update (`js/ui/pwa-prompts.js`).
- SEO techniczne: canonical, Open Graph, Twitter card, JSON-LD, `robots.txt`, `sitemap.xml`.

## Stos technologiczny
- HTML5 (wielostronicowy, semantyczny).
- CSS (architektura z partialami i tokenami, `@import` z `main.css`).
- JavaScript ES Modules (podział na `core`, `features`, `services`, `ui`).
- Node.js narzędziowo (lint, format, minifikacja, walidacja HTML/JSON-LD, optymalizacja obrazów).
- Netlify (nagłówki bezpieczeństwa i reguła 404).

## Struktura projektu (skrót)
- `index.html`, `offline.html`, `404.html`
- `pages/*.html`
- `css/main.css` + `css/partials/{base,layout,components,themes}.css`
- `js/{core,features,services,ui}/**/*.js` + `js/main.js`
- `data/products.json`
- `site.webmanifest`, `sw.js`, `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`
- `tools/image-optimizer/*`, `scripts/validate-jsonld.js`

## Setup i uruchomienie
1. `npm install`
2. QA i walidacja:
   - `npm run qa`
   - `npm run validate:jsonld`
3. Build assetów (minifikacja CSS/JS):
   - `npm run build`
4. Lokalny podgląd: statyczny serwer (np. `npx serve .`) lub środowisko hostingu statycznego.

## Notatki build/deployment
- Deployment target jest zgodny z Netlify (`_headers`, `_redirects`).
- Service worker rejestruje się z root scope (`/sw.js`) i obsługuje fallback offline.
- Nagłówki CSP dopuszczają inline script/style (potrzebne przy obecnym preloadzie motywu i stylach inline-free fallbackach).

## Notatki dostępności
- Skip link jest obecny na stronach.
- Widoczne style `:focus-visible` i mechanizm wykrywania nawigacji klawiaturą.
- Dropdowny i menu mobilne mają atrybuty `aria-expanded` i obsługę klawiszy (Escape, strzałki).
- Modal demo używa `role="dialog"`, `aria-modal`, focus trap.
- Wykryto jednak zależność od JS dla części nawigacji legal links w modalu (w wielu podstronach startowo `href="#"`).

## Notatki SEO
- Każda główna podstrona ma meta description, canonical i Open Graph.
- `og:url` jest zgodny z canonical (na analizowanych stronach).
- Obecne JSON-LD (Organization + WebSite; na stronie produktu dodatkowo Product i BreadcrumbList przez JS).
- Obecne `robots.txt` oraz `sitemap.xml`.

## Notatki wydajności
- Obrazy produktowe i hero używają `<picture>` (AVIF/WebP/JPG fallback) oraz `loading="lazy"` poza kluczowym hero.
- Fonty lokalne WOFF2 + `font-display: swap`; preload głównej czcionki display.
- Service worker stosuje cache dla HTML i assetów.
- Wykryto brak `width`/`height` dla części `<img>` (m.in. footer/header logos na wybranych stronach), co zwiększa ryzyko CLS.

## Roadmapa (proponowana)
- Uzupełnić statyczne fallbacki `href` w modalu na wszystkich stronach (no-JS robustness).
- Uzupełnić brakujące `width`/`height` dla wszystkich `<img>`.
- Dodać no-JS fallback treści produktów/list (np. serwerowy snapshot lub statyczna lista bazowa).
- Rozdzielić część inline CSP zależności (docelowo ograniczyć `'unsafe-inline'`).
- Dodać automatyczne testy linków i regresji a11y w CI.

## Licencja
Repozytorium zawiera plik `LICENSE` w katalogu nadrzędnym `kp-code-playground`.

---

# VOLT GARAGE — Project documentation (EN)

## Project overview
VOLT GARAGE is a static front-end storefront with multiple pages, modular CSS/JS architecture, client-side product rendering from `data/products.json`, PWA capabilities (manifest + service worker), and Netlify-oriented deployment files (`_headers`, `_redirects`).

## Key features (repository-evidenced only)
- Multi-page HTML structure: home, cart, checkout, contact, legal pages, new arrivals, promotions, shop, product details, collections.
- Client-side product catalog rendering and filtering (`js/features/products.js`, `js/features/filters.js`, `js/services/products.js`).
- LocalStorage-based cart (`js/features/cart.js`, `js/services/storage.js`).
- Demo gate modal with acceptance flow and keyboard focus trap (`js/ui/demo-modal.js`, `js/ui/focus-trap.js`).
- Light/dark theme toggle with persisted preference (`js/ui/theme.js`).
- PWA support: `site.webmanifest`, `sw.js`, offline page, install/update/offline prompts (`js/ui/pwa-prompts.js`).
- Technical SEO foundation: canonical, OG/Twitter tags, JSON-LD, robots, sitemap.

## Tech stack
- HTML5 (semantic multi-page structure).
- CSS (token-based partials imported via `css/main.css`).
- JavaScript ES Modules (`core`, `features`, `services`, `ui`).
- Node.js tooling for linting, formatting, minification, HTML/JSON-LD validation, and image optimization.
- Netlify deployment headers/redirect behavior.

## Structure overview
- Root pages: `index.html`, `offline.html`, `404.html`
- Content pages: `pages/*.html`
- Styles: `css/main.css` + partials
- Scripts: `js/main.js` + modular folders
- Data source: `data/products.json`
- PWA/deploy: `site.webmanifest`, `sw.js`, `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`

## Setup & run
1. `npm install`
2. Quality checks:
   - `npm run qa`
   - `npm run validate:jsonld`
3. Asset build:
   - `npm run build`
4. Serve statically (e.g., `npx serve .`) or deploy to static hosting.

## Build/deployment notes
- Netlify-specific config is included (`_headers`, `_redirects`).
- Service worker is registered at root (`/sw.js`) and provides offline fallback.
- Current CSP allows inline script/style due to current implementation choices.

## Accessibility notes
- Skip links are implemented.
- Focus-visible styling and keyboard interaction handling are present.
- Menu/dropdown controls expose ARIA state and keyboard support.
- Demo modal includes dialog semantics and focus trapping.
- Some legal modal links depend on JS to replace initial `href="#"`, reducing no-JS resilience.

## SEO notes
- Main pages include description, canonical, OG/Twitter metadata.
- `og:url` and canonical align on reviewed pages.
- JSON-LD is present and validated by project script.
- `robots.txt` and `sitemap.xml` are present.

## Performance notes
- Responsive images use AVIF/WebP fallbacks via `<picture>`.
- Most content images are lazy-loaded; hero uses eager/high priority.
- Local WOFF2 fonts with `font-display: swap` and preload for display font.
- Service worker caches HTML/assets.
- Some `<img>` elements still miss explicit `width`/`height`, which may impact CLS.

## Roadmap
- Add static legal-link fallbacks in modal markup for no-JS mode.
- Add missing intrinsic dimensions to all `<img>` elements.
- Improve no-JS fallback for product listing pages.
- Harden CSP to reduce inline allowances.
- Add automated link + accessibility regression checks in CI.

## License
A `LICENSE` file exists at the parent repository root (`kp-code-playground`).
