# TransLogix — Dokumentacja projektu (PL)

## 1) Przegląd projektu
TransLogix to statyczna strona firmowa B2B dla transportu i logistyki, oparta o wielostronicowe HTML + modularny CSS + moduły JS uruchamiane przez `main.js`. Projekt ma konfigurację deploy dla Netlify (`_headers`, `_redirects`), service worker z fallbackiem offline oraz zestaw narzędzi QA (HTML, a11y, E2E, budżety wydajnościowe, Lighthouse CI).

## 2) Kluczowe funkcje wykryte w repo
- Wielostronicowa nawigacja: `index`, `services`, `service`, `fleet`, `pricing`, `contact`, strony legalne i `404`.
- Dynamiczne elementy UI: menu mobilne, przełącznik motywu, filtry usług/floty, lightbox, akordeon FAQ, kalkulatory wyceny.
- Formularz kontaktowy z atrybutami Netlify Forms (`data-netlify`, honeypot, hidden `form-name`).
- Dostępność: skip-link, `aria-expanded`, `aria-current` (ustawiane skryptem), focus traps w menu i modalu zgody.
- SEO baseline: `meta description`, `canonical`, Open Graph, Twitter card, inline JSON-LD, `robots.txt`, `sitemap.xml`.
- PWA/offline: `site.webmanifest`, rejestracja SW na HTTPS/localhost, `offline.html`.

## 3) Tech stack
- HTML5 (statyczne strony)
- CSS (moduły importowane przez `assets/css/style.css`)
- Vanilla JavaScript ES modules
- Narzędzia Node.js: PostCSS, html-validate, pa11y-ci, Playwright, Lighthouse CI, Sharp

## 4) Struktura katalogów (skrót)
- `*.html` — strony serwisu
- `assets/css/modules/` — warstwy stylów (`settings`, `base`, `layout`, `components`, `utilities`, `pages`)
- `assets/js/` — moduły front-end
- `assets/data/` — dane usług oraz pliki JSON-LD
- `scripts/` — skrypty pomocnicze (budowa CSS, budżety, optymalizacja obrazów)
- `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`, `sw.js` — warstwa deploy/SEO/runtime

## 5) Setup i uruchomienie
1. Zainstaluj zależności:
   ```bash
   npm install
   ```
2. Zbuduj CSS (minified):
   ```bash
   npm run build:css
   ```
3. Uruchom testy zależnie od celu (pełna lista w `settings.md`).

## 5a) QA: automatic broken-links guard
- `npm run check:links` validates local HTML `href` and `src` references (internal pages and local assets).
- The check ignores external/protocol links (`http`, `https`, `mailto`, `tel`, etc.) and fragment-only anchors.
- `npm run test:e2e` now runs this check first via `pretest:e2e`, so broken local references fail fast before Playwright.

## 6) Build i deployment
- Deploy jest przygotowany pod Netlify przez `_headers` (CSP, cache policy, security headers) i `_redirects` (pretty URL rewrites).
- `sw.js` cache’uje kluczowe strony i część assetów oraz obsługuje fallback offline.
- `deploy:css` nadpisuje `style.css` zawartością wygenerowaną z `style.min.css` (to decyzja operacyjna i warto ją utrzymać spójnie w pipeline).

## 7) Dostępność (stan obecny)
**Zaobserwowane wdrożenia:**
- skip link i `main#main`
- focus-visible w CSS
- aria patterns (`aria-expanded`, `aria-controls`, `aria-live`, `aria-current`)
- `prefers-reduced-motion` w JS (reveal/stats) i CSS (lightbox/consent)
- no-JS baseline przez klasę `no-js`/`js` + fallback `<noscript>` na `service.html`

**Ryzyko do poprawy:**
- Hierarchia nagłówków bywa przeskakiwana na części stron (np. `h1 -> h3` bez `h2`).

## 8) SEO (stan obecny)
- Strony główne mają komplet podstawowych metadanych oraz JSON-LD.
- `canonical` i `og:url` są z reguły spójne.
- Wykryta niespójność: `fleet.html` wskazuje obraz Twitter na ścieżkę, której nie ma w repo (`assets/img/og/translogix-og.jpg`).
- `sitemap.xml` zawiera tylko 5 URL-i i nie obejmuje wszystkich istniejących stron HTML.

## 9) Wydajność (stan obecny)
- Pozytywy: formaty obrazów AVIF/WebP/JPG, lazy-loading na wielu obrazach, self-hosted `woff2` + `font-display: swap`, service worker, budżety gzip.
- Ryzyka: bardzo restrykcyjne budżety w `perf-budgets.json` (mogą często failować), brak fingerprintingu nazw plików przy polityce cache.

## 10) Roadmap (proponowana)
1. Naprawić linki `order.html` w `fleet.html` (plik nie istnieje).
2. Ujednolicić ścieżkę Twitter image w `fleet.html` do istniejącego assetu OG.
3. Rozszerzyć `sitemap.xml` o wszystkie strony przeznaczone do indeksacji.
4. Uporządkować hierarchię nagłówków na stronach o przeskokach poziomów.
5. Urealnić/zweryfikować budżety gzip pod faktyczne rozmiary produkcyjne.

## 11) Licencja
W `package.json` ustawiono `UNLICENSED`.

---

# TransLogix — Project documentation (EN)

## 1) Project overview
TransLogix is a static B2B transport/logistics website built as a multi-page HTML project with modular CSS and JS modules initialized from `main.js`. The repository also includes Netlify deployment config (`_headers`, `_redirects`), a service worker with offline fallback, and QA tooling (HTML validation, accessibility checks, E2E tests, performance budgets, Lighthouse CI).

## 2) Implemented key features (repository evidence)
- Multi-page content architecture (`index`, `services`, `service`, `fleet`, `pricing`, `contact`, legal pages, `404`).
- Interactive UI modules: mobile navigation, theme switch, filters, gallery lightbox, FAQ accordion, quote calculators.
- Netlify form handling for contact workflow (`data-netlify`, honeypot, hidden form-name).
- Accessibility foundations: skip link, `aria-expanded`, JS-driven `aria-current`, focus trapping in mobile nav and consent modal.
- SEO baseline: description/canonical/OG/Twitter tags, inline JSON-LD, `robots.txt`, `sitemap.xml`.
- Offline/PWA baseline: `site.webmanifest`, service worker registration on HTTPS/localhost, `offline.html`.

## 3) Tech stack
- HTML5
- CSS (modular imports)
- Vanilla JS (ES modules)
- Node tooling: PostCSS, html-validate, pa11y-ci, Playwright, Lighthouse CI, Sharp

## 4) Structure overview (short)
- `*.html` — pages
- `assets/css/modules/` — style layers
- `assets/js/` — front-end modules
- `assets/data/` — services data and JSON-LD payloads
- `scripts/` — helper/build scripts
- `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`, `sw.js` — deployment/runtime/SEO config

## 5) Setup & run
```bash
npm install
npm run build:css
```
Then run the needed checks from `settings.md`.

## 6) Build / deployment notes
- Netlify-oriented headers and rewrite rules are present.
- Service worker precaches key pages and provides offline fallback.
- `deploy:css` copies minified CSS over `style.css` (should stay consistent with your release workflow).

## 7) Accessibility notes
Current implementation includes skip-link, focus-visible styles, ARIA state management, reduced-motion handling, and no-JS baseline support. Heading hierarchy consistency still needs cleanup on selected pages.

## 8) SEO notes
Meta tags and JSON-LD are present on primary pages, but there is a broken Twitter image path in `fleet.html`, and sitemap coverage is incomplete vs available HTML pages.

## 9) Performance notes
The project uses modern image formats and lazy loading in many areas, self-hosted `woff2` fonts with `font-display: swap`, and SW caching. Potential risk areas: strict gzip budgets and non-fingerprinted asset naming with revalidation cache strategy.

## 10) Roadmap
1. Fix `order.html` links in `fleet.html`.
2. Fix Twitter image path in `fleet.html`.
3. Extend sitemap coverage.
4. Normalize heading levels.
5. Recalibrate performance budgets.

## 11) License
`UNLICENSED` (as declared in `package.json`).
