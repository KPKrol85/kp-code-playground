# TransLogix — Dokumentacja projektu

## 🇵🇱 Wersja polska

### Przegląd projektu
TransLogix to statyczny serwis B2B (HTML/CSS/JS) dla firmy transportowo-logistycznej, z wieloma podstronami (usługi, flota, cennik, kontakt, polityki prawne), obsługą trybu offline (service worker + offline page) oraz lokalnym pipeline’em walidacji jakości. Dowód: `package.json:2-23`, `index.html:1-391`, `sw.js:1-143`.

### Kluczowe funkcje (wyłącznie wykryte w repo)
- Wielostronicowa architektura statyczna (`index.html`, `services.html`, `service.html`, `fleet.html`, `pricing.html`, `contact.html`, dokumenty prawne). Dowód: `sitemap.xml:3-27`, lista plików HTML w katalogu głównym.
- Responsywna nawigacja mobilna z `aria-expanded`, trapem fokusu i obsługą `Escape`. Dowód: `assets/js/nav.js:1-131`.
- Motyw jasny/ciemny z zapisem preferencji do `localStorage`. Dowód: `assets/js/theme-init.js:1-17`, `assets/js/theme.js:1-50`, `assets/css/modules/settings.css:57-78`.
- Formularze z walidacją klienta + stany błędu (`aria-invalid`, `aria-describedby`) oraz formularz kontaktowy z Netlify (`data-netlify`). Dowód: `assets/js/form.js:1-272`, `contact.html:126-175`.
- FAQ (accordion), filtry usług i strona szczegółu usługi oparta o `assets/data/services.json`. Dowód: `assets/js/accordion-faq.js`, `assets/js/services-filters.js:102`, `assets/js/service-detail.js:40`.
- Lightbox galerii floty oraz animacje reveal z uwzględnieniem `prefers-reduced-motion`. Dowód: `assets/js/lightbox.js`, `assets/js/reveal.js:2-22`, `assets/css/modules/pages.css:888-1093`.
- PWA/offline baseline: rejestracja SW tylko na HTTPS/localhost, cache strategii network-first/stale-while-revalidate, `offline.html`. Dowód: `assets/js/main.js:32-35`, `sw.js:1-143`, `offline.html:1-205`.

### Tech stack
- HTML5 (wielostronicowo, semantyczne sekcje). Dowód: pliki `*.html`.
- CSS modularny przez `@import` (settings/base/layout/components/utilities/pages). Dowód: `assets/css/style.css:2-7`.
- Vanilla JavaScript ES modules. Dowód: `assets/js/main.js:1-35`.
- Tooling: PostCSS, Autoprefixer, cssnano, html-validate, pa11y-ci, Playwright, LHCI. Dowód: `package.json:24-36`.

### Struktura projektu (skrót)
- `assets/css/` — style źródłowe + wynik minifikacji.
- `assets/js/` — moduły funkcjonalne front-end.
- `assets/data/` — dane usług i dodatkowe JSON-LD.
- `scripts/` — skrypty pomocnicze (budżety, CSS build, asset verification, image optimize).
- `tests/e2e/` — testy Playwright.
- `_headers`, `_redirects`, `sw.js`, `robots.txt`, `sitemap.xml` — warstwa deploy/SEO.

### Setup i uruchomienie
1. Instalacja zależności:
   ```bash
   npm ci
   ```
2. Build CSS:
   ```bash
   npm run build:css
   ```
3. Walidacje:
   ```bash
   npm run check
   ```
4. E2E:
   ```bash
   npm run test:e2e
   ```

> Uwaga: `playwright.config.js` odwołuje się do `npm run build:html` i `npm run serve`, których nie ma w `package.json` (patrz audyt). Dowód: `playwright.config.js:23-27`, `package.json:8-23`.

### Build / deployment notes
- Konfiguracja nagłówków bezpieczeństwa i cache policy w `_headers`. Dowód: `_headers:1-49`.
- Friendly URL rewrites/redirects w `_redirects`. Dowód: `_redirects:1-5`.
- `robots.txt` i `sitemap.xml` są obecne. Dowód: `robots.txt:1-4`, `sitemap.xml:1-28`.
- Manifest web-app obecny. Dowód: `assets/icons/site.webmanifest:1-20`.

### Accessibility notes
- Obecne: skip-link, `main#main`, focus-visible, aria-current, aria-expanded, focus trap w menu i modalu zgody. Dowód: `index.html:73-109`, `assets/css/modules/base.css:39-62`, `assets/js/aria-current.js:1-27`, `assets/js/nav.js:76-99`, `assets/js/site-consent.js:60-111`.
- `prefers-reduced-motion` zaimplementowane JS + CSS. Dowód: `assets/js/reveal.js:4-6`, `assets/js/stats.js:4`, `assets/css/modules/pages.css:888-1093`.
- No-JS baseline wykryty; dodatkowo `service.html` zawiera `<noscript>`. Dowód: `service.html:169-172`, `assets/js/boot.js:1-4`.
- Kontrast: częściowo oparty o tokeny; pełna zgodność kontrastu nie może być potwierdzona bez obliczeń stylów runtime.

### SEO notes
- Na głównych podstronach: `meta description`, `canonical`, Open Graph, Twitter card, robots meta, JSON-LD inline. Dowód: np. `index.html:8-68`, `contact.html:11-39`.
- `canonical` i `og:url` są spójne na stronach indeksowalnych. Dowód: `index.html:17`, `index.html:31`, analogicznie pozostałe strony.
- `404.html` ma `noindex,follow`. Dowód: `404.html:10`.

### Performance notes
- Obrazy: użyte formaty AVIF/WEBP/JPG w zasobach i lazy-loading na wielu elementach. Dowód: `assets/img/hero/*`, `index.html:209-230`, `fleet.html:116-344`.
- Fonts self-hosted `woff2` + `font-display: swap`. Dowód: `assets/css/modules/base.css:64-113`.
- CSS/JS cache policy ustawione, SW obecny. Dowód: `_headers:12-49`, `sw.js:1-143`.

### Roadmap (repo-evidence driven)
- Naprawa komend `build:html` / `serve` użytych w Playwright config.
- Uporządkowanie nieużywanych plików `assets/data/jsonld/*.json`.
- Zamiana linków social `href="#"` na rzeczywiste URL lub usunięcie.
- Dodanie explicit `width`/`height` dla obrazów lightboxa.
- Rozszerzenie sitemap o strony legalne (jeśli mają być indeksowane).

### Licencja
`UNLICENSED`. Dowód: `package.json:7`.

---

## 🇬🇧 English version

### Project overview
TransLogix is a static B2B logistics website (HTML/CSS/JS) with multiple pages, offline support (service worker + offline page), and local quality tooling. Evidence: `package.json:2-23`, `index.html:1-391`, `sw.js:1-143`.

### Key implemented features
- Multi-page static architecture (home, services, service detail, fleet, pricing, contact, legal pages). Evidence: `sitemap.xml:3-27`.
- Mobile navigation with `aria-expanded`, keyboard handling, and focus trap. Evidence: `assets/js/nav.js:1-131`.
- Light/dark theme with persisted preference. Evidence: `assets/js/theme-init.js:1-17`, `assets/js/theme.js:1-50`.
- Client-side form validation and Netlify form integration. Evidence: `assets/js/form.js:1-272`, `contact.html:126-175`.
- Service worker registration and offline fallback. Evidence: `assets/js/main.js:32-35`, `sw.js:1-143`, `offline.html:1-205`.

### Tech stack
- HTML5, modular CSS (`@import`), vanilla JS modules.
- Build/QA toolchain: PostCSS, html-validate, pa11y-ci, Playwright, LHCI.
Evidence: `assets/css/style.css:2-7`, `assets/js/main.js:1-35`, `package.json:8-36`.

### Structure overview
- `assets/css`, `assets/js`, `assets/data`
- `scripts`, `tests/e2e`
- deployment & SEO files: `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`, `sw.js`

### Setup & run
```bash
npm ci
npm run build:css
npm run check
npm run test:e2e
```

### Build/deployment notes
- Security and caching headers are defined in `_headers`.
- Route rewrites are defined in `_redirects`.
- Robots and sitemap are present.
Evidence: `_headers:1-49`, `_redirects:1-5`, `robots.txt:1-4`, `sitemap.xml:1-28`.

### Accessibility notes
- Skip links, focus-visible styling, `aria-current`, `aria-expanded`, and keyboard focus traps are implemented.
- Reduced-motion handling exists in JS/CSS.
- No-JS baseline is present; `service.html` includes a `<noscript>` fallback note.
Evidence: `index.html:73-109`, `assets/css/modules/base.css:39-62`, `assets/js/nav.js:76-99`, `assets/js/reveal.js:4-6`, `service.html:169-172`.

### SEO notes
- Meta description, canonical, OG/Twitter tags, robots meta, and inline JSON-LD are present on indexable pages.
- `canonical` and `og:url` values are aligned.
Evidence: `index.html:8-44`, `index.html:17`, `index.html:31`.

### Performance notes
- Lazy-loaded imagery is used in many sections.
- Self-hosted `woff2` fonts with `font-display: swap`.
- SW caching and explicit cache-control headers are configured.
Evidence: `index.html:209-230`, `fleet.html:116-344`, `assets/css/modules/base.css:64-113`, `_headers:12-49`, `sw.js:1-143`.

### Roadmap
- Fix missing Playwright webServer scripts (`build:html`, `serve`).
- Remove or wire unused JSON-LD data files.
- Replace social placeholder links.
- Add `width`/`height` for lightbox dynamic images.
- Revisit sitemap coverage for legal pages.

### License
`UNLICENSED` (`package.json:7`).
