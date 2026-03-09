# Axiom Construction

## PL

### Przegląd projektu
Axiom Construction to statyczny serwis typu MPA (wiele plików HTML) dla branży budowlano-remontowej. Repozytorium zawiera stronę główną, podstrony usług i dokumentów, warstwę PWA (manifest + service worker), oraz formularz kontaktowy z integracją Netlify Forms.

### Kluczowe funkcje (potwierdzone w kodzie)
- Strona główna + podstrony usług (`services/*.html`) i stron informacyjno-prawnych (`legal/*.html`).
- Formularz kontaktowy Netlify (`data-netlify="true"`, honeypot, komunikaty `aria-live`, fallback no-JS).
- Moduły interaktywne: mobilna nawigacja, przełącznik motywu, lightbox galerii, przycisk „powrót na górę”.
- SEO: `canonical`, Open Graph, Twitter Card, JSON-LD, `robots.txt`, `sitemap.xml`.
- PWA: `manifest.webmanifest`, `sw.js`, `offline.html`, polityki nagłówków w `_headers`.

### Tech stack
- HTML5 (wielostronicowy serwis statyczny).
- CSS modularny przez `@import` (`css/main.css` + warstwy tokens/base/layout/components/sections).
- Vanilla JavaScript (moduły `js/core`, `js/components`, `js/sections`, `js/utils`).
- Narzędzia Node/npm do build i QA (`tools/*`, Lighthouse CI, pa11y).

### Struktura projektu (skrót)
- Widoki: `index.html`, `404.html`, `offline.html`, `success.html`
- Podstrony: `services/`, `legal/`
- Style: `css/`
- Skrypty: `js/`
- SEO/deploy/PWA: `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `sw.js`
- Narzędzia build: `tools/`

### Setup i uruchomienie
1. `npm install`
2. `npm run build`
3. `npm run serve:dist` (podgląd builda)
4. Opcjonalnie: `npm run serve` (serwowanie katalogu roboczego)

### Build i deployment
- Projekt jest oparty o pipeline, który przygotowuje artefakty w `dist/` (`build:css`, `build:js`, `build:sw`, `build:dist`).
- `_headers` zawiera polityki bezpieczeństwa i cache.
- `_redirects` w aktualnym stanie zawiera tylko komentarze (brak aktywnych reguł przekierowań).

### Dostępność (A11y)
- Obecne: skip link, semantyczne sekcje i nagłówki, `aria-current`, `aria-expanded`, widoczny focus (`:focus-visible`), pułapki focusu w komponentach modalnych, fallback no-JS formularza.
- `prefers-reduced-motion` jest obsłużone zarówno w CSS, jak i przy scroll-to-top.
- Kontrast: częściowo oparty o tokeny; pełna walidacja kontrastu wymaga obliczeń runtime.

### SEO
- Wdrożono metadane SEO i social (`canonical`, `robots`, OG/Twitter).
- `robots.txt` wskazuje `sitemap.xml`.
- JSON-LD jest obecny na wielu podstronach (statycznie parsowalny).

### Wydajność
- Obrazy korzystają z `picture`, formatów AVIF/WebP/JPEG, a większość zasobów ma `loading="lazy"` i jawne `width/height`.
- Fonty są preloadowane, a cache statyków jest definiowany przez `_headers`.
- W katalogu repozytorium (bez builda) nie ma `dist/style.min.css`; to decyzja build/deploy, nie błąd logiki runtime po poprawnym procesie build.

### Roadmap
- Poprawa błędnych ścieżek względnych w cookie-modal na części podstron `legal/*`.
- Uzupełnienie `_redirects` o rzeczywiste reguły kanoniczne/HTTPS.
- Ujednolicenie skryptów QA do składni cross-platform.
- Wydzielenie spójnej strategii source-of-truth dla JSON-LD (`js/structured-data/*.json` vs inline w HTML).
- Dodanie automatycznego checkera linków lokalnych do domyślnego CI.

### Licencja
MIT (`LICENSE`).

---

## EN

### Project overview
Axiom Construction is a static multi-page front-end website for a construction/remodeling business. The repository includes a homepage, service/legal subpages, PWA pieces (manifest + service worker), and a Netlify-ready contact form.

### Key features (repository-verified)
- Homepage plus dedicated service (`services/*.html`) and legal/informational (`legal/*.html`) pages.
- Netlify contact form (`data-netlify="true"`) with honeypot, `aria-live` status messaging, and no-JS fallback.
- Interactive modules: mobile navigation, theme switcher, gallery lightbox, back-to-top button.
- SEO coverage: `canonical`, Open Graph, Twitter Card, JSON-LD, `robots.txt`, `sitemap.xml`.
- PWA coverage: `manifest.webmanifest`, `sw.js`, `offline.html`, and deployment headers in `_headers`.

### Tech stack
- HTML5 static MPA.
- Modular CSS via `@import` (`css/main.css` + tokens/base/layout/components/sections).
- Vanilla JavaScript modules (`js/core`, `js/components`, `js/sections`, `js/utils`).
- Node/npm tooling for build and QA (`tools/*`, Lighthouse CI, pa11y).

### Structure overview
- Pages: `index.html`, `404.html`, `offline.html`, `success.html`
- Subpages: `services/`, `legal/`
- Styling: `css/`
- Scripts: `js/`
- SEO/deploy/PWA files: `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `sw.js`
- Build tooling: `tools/`

### Setup & run
1. `npm install`
2. `npm run build`
3. `npm run serve:dist` (serve build output)
4. Optional: `npm run serve` (serve working tree)

### Build/deployment notes
- The project expects a build pipeline that outputs artifacts into `dist/`.
- `_headers` defines security and caching policies.
- `_redirects` currently contains comments only (no active redirect rules).

### Accessibility notes
- Present: skip link, semantic landmarks/headings, `aria-current`, `aria-expanded`, visible focus styling, focus handling in modal-like components, no-JS form baseline.
- `prefers-reduced-motion` is implemented in CSS and in JS scroll behavior.
- Contrast compliance cannot be fully verified statically without computed-style analysis.

### SEO notes
- SEO and social metadata are implemented (`canonical`, `robots`, OG/Twitter).
- `robots.txt` references `sitemap.xml`.
- JSON-LD appears across pages and is statically parseable.

### Performance notes
- Images use `picture`, modern formats (AVIF/WebP/JPEG), lazy loading, and explicit dimensions.
- Font preloads and cache rules are present.
- Missing `dist/style.min.css` in the source tree is a build-stage artifact expectation rather than an automatic production blocker.

### Roadmap
- Fix incorrect relative cookie-modal links on some `legal/*` pages.
- Add real canonical/HTTPS redirects in `_redirects`.
- Make QA scripts cross-platform (currently Windows shell syntax).
- Align JSON-LD source strategy (`js/structured-data/*.json` vs inline HTML blocks).
- Add local link-integrity check to default CI flow.

### License
MIT (`LICENSE`).
