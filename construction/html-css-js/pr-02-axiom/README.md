# Axiom Construction — dokumentacja projektu

## Wersja polska

### Przegląd projektu
Axiom Construction to wielostronicowy serwis portfolio (HTML/CSS/JS) dla firmy budowlano-remontowej. Projekt zawiera stronę główną, podstrony usługowe i prawne, stronę sukcesu formularza, obsługę offline, manifest PWA, service worker oraz konfigurację deploymentu statycznego.

### Kluczowe funkcje (potwierdzone w repozytorium)
- Wielostronicowa struktura: `index.html`, `services/*.html`, `legal/*.html`, `404.html`, `offline.html`, `success.html`.
- Modularny CSS: tokeny + base + layout + components + sections (`css/main.css` + katalogi warstw).
- Modularny JavaScript (ES modules): `js/core`, `js/components`, `js/sections`, `js/utils`.
- Formularz kontaktowy z Netlify Forms (`data-netlify="true"`), honeypotem i walidacją po stronie klienta.
- SEO i social metadata: canonical, robots meta, OpenGraph, Twitter cards.
- Structured data JSON-LD osadzane inline na stronach.
- PWA i deploy: `manifest.webmanifest`, `sw.js`, `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`.

### Tech stack
- HTML5
- CSS3 (custom properties + modułowa architektura)
- Vanilla JavaScript (ES Modules)
- Node.js tooling (build CSS/JS/SW, obrazy, audyty Lighthouse/Pa11y)
- Netlify-compatible statyczny deployment

### Struktura projektu (skrót)
- `assets/` — obrazy, ikony, fonty
- `css/` — tokeny, baza, layout, komponenty, sekcje
- `js/` — core, components, sections, utils, structured-data
- `dist/` — artefakty produkcyjne (`style.min.css`, `script.min.js`)
- `services/`, `legal/` — podstrony
- `tools/` — skrypty buildowe
- pliki deploy/SEO/PWA: `_headers`, `_redirects`, `manifest.webmanifest`, `robots.txt`, `sitemap.xml`, `sw.js`

### Setup i uruchomienie
1. Instalacja zależności:
   ```bash
   npm install
   ```
2. Build assetów:
   ```bash
   npm run build
   ```
3. Uruchomienie lokalnego serwera:
   ```bash
   npm run serve
   ```
4. Podgląd: `http://localhost:8080`

### Build i deployment
- Produkcyjny CSS/JS trafia do `dist/`.
- Service worker jest generowany przez `npm run build:sw`.
- Nagłówki bezpieczeństwa/cache są utrzymywane w `_headers`.
- Redirecty i fallback 404 są utrzymywane w `_redirects`.
- Projekt używa ścieżek kompatybilnych z hostingiem statycznym (w tym Netlify).

### Dostępność (stan aktualny)
- Obecne: skip link, poprawna hierarchia nagłówków H1–H3, `aria-expanded` dla menu mobilnego, `aria-current` w breadcrumb/nav, focus styles (`:focus-visible`), obsługa `prefers-reduced-motion`.
- Formularz: powiązane etykiety, `aria-live` dla statusu i licznika znaków, fokus na pierwszym błędzie.
- No-JS: obecne komunikaty `<noscript>`, formularz ma klasyczny `POST` + `action="/success.html"`.

### SEO (stan aktualny)
- Obecne: meta description, canonical, robots meta, OG image, twitter metadata, `robots.txt`, `sitemap.xml`, JSON-LD inline.
- Uwaga: `success.html` ma canonical i JSON-LD, ale nie ma `og:url` (pozostałe strony mają).

### Wydajność (stan aktualny)
- Obecne: AVIF/WEBP/JPG, `srcset/sizes`, lazy-loading dla treści poza pierwszym viewportem, preload fontów i CSS.
- Service worker obsługuje cache static assets i fallback offline.
- Uwaga: element `img.lb__img` (lightbox) nie ma stałych `width/height` (obraz dynamiczny), co może generować pojedyncze przesunięcia layoutu po otwarciu lightboxa.

### Roadmapa
- Uzupełnić social metadata na `success.html` o `og:url`.
- Wersjonować także cache dokumentów HTML w SW (spójnie z cache statycznym).
- Dodać automatyczną walidację SEO/A11y/linków w CI.
- Ograniczyć duplikację metadanych poprzez prosty generator head (build-time).
- Ujednolicić konwencję nazw utility/BEM i opisać ją w krótkim standardzie projektu.

### Licencja
ISC (zgodnie z `package.json`).

---

## English version

### Project overview
Axiom Construction is a multi-page portfolio website (HTML/CSS/JS) for a construction/renovation company. The project includes a homepage, service and legal subpages, form success page, offline page, PWA manifest, service worker, and static deployment configuration.

### Key features (verified in repository)
- Multi-page structure: `index.html`, `services/*.html`, `legal/*.html`, `404.html`, `offline.html`, `success.html`.
- Modular CSS architecture: tokens + base + layout + components + sections (`css/main.css` and layer folders).
- Modular JavaScript (ES modules): `js/core`, `js/components`, `js/sections`, `js/utils`.
- Contact form integrated with Netlify Forms (`data-netlify="true"`), honeypot, and client-side validation.
- SEO/social metadata: canonical, robots meta, OpenGraph, Twitter cards.
- Structured data JSON-LD embedded inline in pages.
- PWA/deployment files: `manifest.webmanifest`, `sw.js`, `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`.

### Tech stack
- HTML5
- CSS3 (custom properties + modular architecture)
- Vanilla JavaScript (ES Modules)
- Node.js tooling (CSS/JS/SW build, images, Lighthouse/Pa11y audits)
- Netlify-compatible static deployment

### Project structure (short)
- `assets/` — images, icons, fonts
- `css/` — tokens, base, layout, components, sections
- `js/` — core, components, sections, utils, structured-data
- `dist/` — production artifacts (`style.min.css`, `script.min.js`)
- `services/`, `legal/` — subpages
- `tools/` — build scripts
- deploy/SEO/PWA files: `_headers`, `_redirects`, `manifest.webmanifest`, `robots.txt`, `sitemap.xml`, `sw.js`

### Setup & run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Build assets:
   ```bash
   npm run build
   ```
3. Start local server:
   ```bash
   npm run serve
   ```
4. Open: `http://localhost:8080`

### Build & deployment notes
- Production CSS/JS are generated in `dist/`.
- Service worker is generated via `npm run build:sw`.
- Security/cache headers are managed in `_headers`.
- Redirects and 404 fallback are managed in `_redirects`.
- Paths are compatible with static hosting (including Netlify).

### Accessibility notes (current state)
- Present: skip link, consistent H1–H3 hierarchy, `aria-expanded` for mobile nav, `aria-current` in breadcrumb/nav, focus styles (`:focus-visible`), `prefers-reduced-motion` handling.
- Form: explicit labels, `aria-live` status/counter, focus move to first invalid control.
- No-JS: `<noscript>` notices are provided, and form keeps a native `POST` path via `action="/success.html"`.

### SEO notes (current state)
- Present: meta description, canonical, robots meta, OG image, twitter metadata, `robots.txt`, `sitemap.xml`, inline JSON-LD.
- Note: `success.html` contains canonical and JSON-LD but does not include `og:url` (other pages do).

### Performance notes (current state)
- Present: AVIF/WEBP/JPG, `srcset/sizes`, lazy-loading for non-critical media, font and CSS preload.
- Service worker provides static cache and offline fallback behavior.
- Note: the dynamic `img.lb__img` (lightbox) has no fixed `width/height`, which may create localized layout shifts when opening the lightbox.

### Roadmap
- Add `og:url` on `success.html` for social metadata consistency.
- Version HTML cache in service worker (aligned with static asset cache strategy).
- Add automated SEO/A11y/link validation in CI.
- Reduce duplicated head metadata via a lightweight build-time head generator.
- Formalize and document utility/BEM naming conventions.

### License
ISC (as declared in `package.json`).
