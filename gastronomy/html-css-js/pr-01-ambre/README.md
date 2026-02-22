# Ambre — Front-End Portfolio Project

## 🇵🇱 Wersja polska

## Przegląd projektu
Ambre to wielostronicowa strona restauracji fine dining oparta o HTML, modularny CSS i Vanilla JS. Projekt zawiera konfigurację PWA (manifest, Service Worker, strona offline), walidację jakości przez skrypty QA oraz konfigurację wdrożeniową Netlify.

## Kluczowe funkcje
- Wielostronicowy serwis: `index.html`, `menu.html`, `galeria.html`, strony prawne, `404.html` i `offline.html`.
- Nawigacja responsywna z menu mobilnym, focus trap i synchronizacją atrybutów `aria-expanded`.
- Przełącznik motywu (light/dark) oparty o `localStorage` i `prefers-color-scheme`.
- Interaktywne moduły: filtrowanie i „load more” w menu/galerii, FAQ (`details/summary`), lightbox, CTA i scroll utilities.
- Formularz rezerwacji z walidacją klienta, honeypotem, wsparciem dla Netlify Forms i fallbackiem submit.
- PWA: `manifest.webmanifest`, `sw.js`, `js/sw-register.js`, `offline.html`.

## Tech stack
- HTML5
- CSS3 (architektura: `base/`, `layout/`, `components/`, `pages/`)
- JavaScript ES Modules (Vanilla JS)
- Tooling: PostCSS, esbuild, ESLint, Stylelint, html-validate
- Deployment: Netlify (`_headers`, `_redirects`)

## Struktura projektu
- `css/base/` — tokeny, reset i typografia.
- `css/layout/` — struktura header/footer.
- `css/components/` — komponenty i utility.
- `css/pages/` — style stron specyficznych.
- `js/modules/` — moduły funkcjonalne.
- `scripts/` — QA linków i optymalizacja obrazów.

## Setup i uruchomienie
```bash
npm install
npm run build
```

Dodatkowo dostępne są skrypty watch (`watch:css`, `watch:js`) oraz zestaw QA (`npm run qa`).

## Build i deployment
- HTML ładuje aktualnie pliki źródłowe: `/css/style.css` i `/js/script.js`.
- `_headers` definiuje m.in. CSP, HSTS, COOP i polityki uprawnień.
- `_redirects` obsługuje skrócone ścieżki i fallback 404.
- `sw-register.js` nie rejestruje SW lokalnie (localhost/LAN), a w środowisku produkcyjnym rejestruje `sw.js`.

## Dostępność
- Zaimplementowano skip link, `:focus-visible`, semantyczne nagłówki i strukturę `main`.
- Nawigacja mobilna ma obsługę klawiatury (Escape + trap focus).
- Projekt zawiera reguły `prefers-reduced-motion` w CSS oraz warunkowe zachowania w JS.
- Wersja no-JS pozostaje używalna (klasy `.no-js`, formularz HTML POST).

## SEO
- Strony mają `title`, `description`, `canonical`, Open Graph i Twitter Card.
- `robots.txt` oraz `sitemap.xml` są obecne i wskazują docelową domenę.
- JSON-LD jest obecny na stronach głównych i prawnych (`WebSite`, `Restaurant`, `WebPage`).

## Wydajność
- Obrazy wykorzystują AVIF/WebP z fallbackiem JPEG (picture + srcset).
- Dla kluczowych obrazów stosowane są `width/height`, `decoding`, `loading` i `fetchpriority`.
- Fonty `.woff2` są preloadowane i mają `font-display: swap`.
- Service Worker cache’uje app shell i runtime images.

## Roadmap
- Ujednolicić sposób podpinania assetów (konsekwentne ścieżki absolutne względne).
- Dodać automatyczną walidację JSON-LD/SEO w CI.
- Rozszerzyć testy a11y o automatyczne skany (np. axe + Playwright).
- Uzupełnić brakujące `width/height` dla dekoracyjnych SVG w stopce/hero.

## Licencja
MIT (zgodnie z `package.json`).

---

## 🇬🇧 English version

## Project overview
Ambre is a multi-page fine-dining restaurant website built with HTML, modular CSS, and Vanilla JS. It includes PWA capabilities (manifest, Service Worker, offline page), QA scripts, and Netlify deployment configuration.

## Key features
- Multi-page setup: `index.html`, `menu.html`, `galeria.html`, legal pages, `404.html`, and `offline.html`.
- Responsive navigation with mobile drawer, focus trap, and synchronized `aria-expanded` states.
- Theme switcher (light/dark) based on `localStorage` and `prefers-color-scheme`.
- Interactive modules: menu/gallery filtering and load-more, FAQ (`details/summary`), lightbox, CTA, and scroll utilities.
- Reservation form with client-side validation, honeypot anti-spam, Netlify Forms support, and submit fallback.
- PWA: `manifest.webmanifest`, `sw.js`, `js/sw-register.js`, `offline.html`.

## Tech stack
- HTML5
- CSS3 (architecture: `base/`, `layout/`, `components/`, `pages/`)
- JavaScript ES Modules (Vanilla JS)
- Tooling: PostCSS, esbuild, ESLint, Stylelint, html-validate
- Deployment: Netlify (`_headers`, `_redirects`)

## Structure overview
- `css/base/` — tokens, reset, typography.
- `css/layout/` — header/footer layout.
- `css/components/` — UI components and utilities.
- `css/pages/` — page-specific styles.
- `js/modules/` — feature modules.
- `scripts/` — link QA and image optimization.

## Setup & run
```bash
npm install
npm run build
```

Watch scripts (`watch:css`, `watch:js`) and QA bundle (`npm run qa`) are also available.

## Build/deployment notes
- HTML currently loads source assets: `/css/style.css` and `/js/script.js`.
- `_headers` defines CSP, HSTS, COOP, and additional hardening headers.
- `_redirects` maps short routes and provides a 404 fallback.
- `sw-register.js` avoids SW registration on localhost/LAN and registers `sw.js` in production-like hosts.

## Accessibility notes
- Implemented: skip link, `:focus-visible`, semantic heading structure, and `main` landmarks.
- Mobile navigation supports keyboard control (Escape + focus trap).
- `prefers-reduced-motion` is handled in CSS and selected JS interactions.
- No-JS baseline remains usable (`.no-js` behavior and HTML form POST).

## SEO notes
- Pages include `title`, `description`, `canonical`, Open Graph, and Twitter metadata.
- `robots.txt` and `sitemap.xml` are present and aligned to the public domain.
- JSON-LD is implemented on main/legal pages (`WebSite`, `Restaurant`, `WebPage`).

## Performance notes
- Images use AVIF/WebP with JPEG fallback via `picture`/`srcset`.
- Main images include `width/height`, `decoding`, `loading`, and `fetchpriority`.
- `.woff2` fonts are preloaded and use `font-display: swap`.
- Service Worker caches the app shell and runtime image requests.

## Roadmap
- Standardize asset linking strategy (consistent absolute/relative URL policy).
- Add automated JSON-LD/SEO checks in CI.
- Add automated a11y scans (e.g., axe + Playwright).
- Add missing `width/height` attributes for decorative SVG logos.

## License
MIT (as declared in `package.json`).
