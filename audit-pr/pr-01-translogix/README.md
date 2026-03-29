# TransLogix — Dokumentacja techniczna (PL)

## Przegląd projektu
TransLogix to wielostronicowy, statyczny serwis front-end (HTML/CSS/JS) dla usług transportowych B2B. Strony są renderowane po stronie klienta, a interaktywne zachowania są dodawane przez moduły JavaScript ładowane z `assets/js/main.js`.

## Kluczowe funkcje (potwierdzone w repo)
- Wielostronicowa struktura: `index`, `services`, `service`, `fleet`, `pricing`, `contact`, strony prawne, `404`, `offline`.
- Menu mobilne z obsługą ARIA i klawiatury.
- Przełącznik motywu jasny/ciemny z inicjalizacją przed renderem.
- Filtrowanie usług i floty, lightbox galerii, akordeon FAQ.
- Formularz kontaktowy z atrybutami Netlify Forms.
- Service Worker z cache i fallbackiem offline.

## Tech stack
- HTML5 (multi-page)
- CSS (modułowa architektura przez `@import`)
- Vanilla JavaScript (ES modules)
- Node.js tooling: PostCSS, html-validate, pa11y-ci, Playwright, Lighthouse CI

## Struktura projektu (skrót)
- `*.html` — strony serwisu
- `assets/css/modules/` — warstwy stylów (`settings/base/layout/components/utilities/pages`)
- `assets/js/` — moduły UI i logiki front-end
- `assets/data/` — dane usług i JSON-LD
- `scripts/` — skrypty build/check
- `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`, `sw.js` — deployment/SEO/runtime

## Setup i uruchomienie
```bash
npm install
npm run build:assets
npm run build:dist
```

## Build i deployment
- `_headers` definiuje security headers oraz polityki cache.
- `_redirects` obsługuje przyjazne adresy (`/services`, `/fleet`, itd.).
- `build:dist` buduje paczkę `dist/` i przepina referencje HTML/SW na minifikowane assety (`style.min.css`, `main.min.js`).

## Dostępność (stan zaimplementowany)
- Obecne: skip link, `main#main`, style `:focus-visible`, `aria-expanded`/`aria-controls`/`aria-current`, focus trap w menu, `aria-live` dla komunikatów formularza.
- Progressive enhancement: `html.no-js` -> `html.js` po starcie (`boot.js`), a treść bazowa działa bez JS.
- `prefers-reduced-motion` jest obsłużone dla animacji reveal i liczników.

## SEO (stan zaimplementowany)
- Strony mają `meta description`, `canonical`, OG, Twitter meta.
- Obecny jest `robots.txt` i `sitemap.xml`.
- JSON-LD jest osadzony inline na stronach.

## Performance (stan zaimplementowany)
- Obrazy dostępne w AVIF/WebP/JPG.
- Część obrazów korzysta z `loading="lazy"` i atrybutów `width`/`height`.
- Fonty lokalne `woff2` z `font-display: swap`.
- Service Worker cache’uje kluczowe zasoby i strony offline.

## Roadmap (audit-driven)
1. Ujednolicić konfigurację `html-validate` do aktualnego stylu HTML albo dostosować markup.
2. Poprawić semantykę atrybutów ARIA tam, gdzie linter zgłasza nadużycia.
3. Zmniejszyć ryzyko CLS dla obrazów dynamicznie osadzanych w lightboxie.
4. Rozdzielić domyślnie skrypty QA od skryptów releaseowych w workflow CI.
5. Dodać automatyczną walidację JSON-LD w pipeline.

## Licencja
`UNLICENSED` (zgodnie z `package.json`).

---

# TransLogix — Technical Documentation (EN)

## Project overview
TransLogix is a static multi-page front-end website (HTML/CSS/JS) for B2B transport services. Pages are delivered as static documents, and interactive behavior is initialized via JavaScript modules from `assets/js/main.js`.

## Key features (repository-proven)
- Multi-page architecture: `index`, `services`, `service`, `fleet`, `pricing`, `contact`, legal pages, `404`, `offline`.
- Mobile navigation with ARIA state handling and keyboard support.
- Light/dark theme toggle initialized before first paint.
- Service/fleet filtering, gallery lightbox, FAQ accordion.
- Netlify-ready contact form setup.
- Service worker with caching and offline fallback page.

## Tech stack
- HTML5 (multi-page)
- CSS (modular layers via `@import`)
- Vanilla JavaScript (ES modules)
- Node.js tooling: PostCSS, html-validate, pa11y-ci, Playwright, Lighthouse CI

## Structure overview
- `*.html` — site pages
- `assets/css/modules/` — style layers
- `assets/js/` — front-end modules
- `assets/data/` — services data + JSON-LD payloads
- `scripts/` — build and validation scripts
- `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`, `sw.js` — deployment/SEO/runtime files

## Setup & run
```bash
npm install
npm run build:assets
npm run build:dist
```

## Build & deployment notes
- `_headers` configures security headers and cache strategy.
- `_redirects` maps pretty URLs to HTML pages.
- `build:dist` creates a `dist/` package and rewrites HTML/SW references to minified assets.

## Accessibility notes
- Implemented: skip link, `main#main`, `:focus-visible`, ARIA state attributes, keyboard-friendly navigation, live regions for form feedback.
- Progressive enhancement baseline exists (`no-js` → `js` class switch).
- `prefers-reduced-motion` is explicitly supported in JS logic.

## SEO notes
- Core tags implemented: description, canonical, OG, Twitter.
- `robots.txt` and `sitemap.xml` are present.
- JSON-LD is embedded inline in pages.

## Performance notes
- Modern image formats (AVIF/WebP) are present.
- Many images include lazy loading and intrinsic dimensions.
- Local `woff2` fonts use `font-display: swap`.
- Service worker provides runtime caching and offline fallback.

## Roadmap
1. Align `html-validate` rules with current HTML style or update markup accordingly.
2. Fix ARIA semantics where linting reports misuse.
3. Improve CLS safety for lightbox-injected images.
4. Split QA scripts and release scripts in CI stages.
5. Add JSON-LD validation into CI.

## License
`UNLICENSED` (as declared in `package.json`).
