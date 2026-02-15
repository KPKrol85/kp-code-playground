# Axiom Construction — dokumentacja projektu

## Wersja polska

### Przegląd projektu
Axiom Construction to wielostronicowy serwis portfolio (HTML/CSS/JS) dla firmy budowlano-remontowej. Projekt zawiera stronę główną, podstrony usług, podstrony prawne, manifest PWA, service worker oraz konfigurację deployu pod Netlify.

### Kluczowe funkcje (potwierdzone w kodzie)
- Wielostronicowa architektura: `index.html`, podstrony `services/*.html`, `legal/*.html`, `404.html`, `offline.html`.
- Modularny CSS z podziałem na tokeny, bazę, layout, komponenty i sekcje.
- Modularny JavaScript (entrypoint `js/main.js`) z inicjalizacją nawigacji mobilnej, lightboxa, formularza kontaktowego, FAQ, cookies, trybu jasny/ciemny, przycisku „powrót na górę”.
- Formularz kontaktowy Netlify (`data-netlify="true"`) z honeypotem i walidacją po stronie klienta.
- SEO/PWA: canonicale, OpenGraph/Twitter meta, `manifest.webmanifest`, `robots.txt`, `sitemap.xml`, `sw.js`.
- Dane strukturalne JSON-LD utrzymywane jako pliki w `js/structured-data/*.json` i dołączane na stronach.

### Stack technologiczny
- HTML5
- CSS3 (Custom Properties + modularna struktura plików)
- JavaScript ES Modules (vanilla JS)
- Node.js tooling (build CSS/JS/obrazów, QA Lighthouse/Pa11y)
- Netlify (`_headers`, `_redirects`)

### Struktura projektu (skrót)
- `assets/` — obrazy, fonty, favicon
- `css/` — tokeny, baza, layout, komponenty, sekcje
- `js/` — core, components, sections, utils, structured-data
- `dist/` — wynikowe pliki produkcyjne (`style.min.css`, `script.min.js`)
- `services/`, `legal/` — podstrony
- `tools/` — skrypty build
- `manifest.webmanifest`, `sw.js`, `robots.txt`, `sitemap.xml`, `_headers`, `_redirects`

### Setup i uruchomienie
1. Instalacja zależności:
   ```bash
   npm install
   ```
2. Build zasobów:
   ```bash
   npm run build
   ```
3. Uruchomienie serwera lokalnego:
   ```bash
   npm run serve
   ```
4. Aplikacja lokalnie: `http://localhost:8080`

### Build i deployment
- Główne artefakty produkcyjne: `dist/style.min.css`, `dist/script.min.js`.
- Cache/security i CSP: `_headers`.
- Reguły redirect/rewrite + custom 404: `_redirects`.
- Routing jest oparty o statyczne ścieżki `.html`.

### Dostępność (stan aktualny)
- Obecne: skip-link, semantyczne nagłówki, focus-visible, aria dla menu mobilnego i elementów interaktywnych, obsługa `prefers-reduced-motion`.
- Ograniczenia wykryte w audycie:
  - niedziałający anchor `#polityka` w sekcji zgody formularza,
  - formularz kontaktowy zależny od JS/reCAPTCHA (bez JS wysyłka jest ograniczona).

### SEO (stan aktualny)
- Obecne: `meta description`, canonical, OG/Twitter, `robots.txt`, `sitemap.xml`, JSON-LD (pliki JSON).
- Ograniczenia wykryte w audycie:
  - JSON-LD jest osadzany przez `script type="application/ld+json" src="..."` zamiast inline,
  - część treści „demo” (np. certyfikaty) zawiera placeholdery.

### Wydajność (stan aktualny)
- Obecne: obrazy AVIF/WEBP/JPG z `srcset`, lazy-loading, wymiary obrazów dla większości grafik, preloading fontów i CSS, service worker.
- Ograniczenia wykryte w audycie:
  - pojedyncze obrazy pomocnicze bez `width`/`height` (np. obraz w lightboxie),
  - service worker cache nazwany wersją stałą (brak automatycznej strategii wersjonowania z builda).

### Roadmapa
- Naprawa krytycznych linków do certyfikatów i anchora zgody formularza.
- Przeniesienie JSON-LD do inline `<script>`.
- Ujednolicenie nazewnictwa CSS do pełnej konwencji BEM.
- Dopracowanie fallbacku formularza bez JavaScript.
- Automatyzacja walidacji linków i dostępności w CI.

### Licencja
ISC (zgodnie z `package.json`).

---

## English version

### Project overview
Axiom Construction is a multi-page portfolio website (HTML/CSS/JS) for a construction/renovation company. The project includes a homepage, service pages, legal pages, PWA manifest, service worker, and Netlify deployment configuration.

### Key features (verified in code)
- Multi-page structure: `index.html`, `services/*.html`, `legal/*.html`, `404.html`, `offline.html`.
- Modular CSS architecture split into tokens, base, layout, components, and sections.
- Modular JavaScript (`js/main.js`) initializing mobile navigation, lightbox, contact form, FAQ, cookies, theme toggle, and back-to-top button.
- Netlify contact form (`data-netlify="true"`) with honeypot and client-side validation.
- SEO/PWA: canonical tags, OpenGraph/Twitter meta, `manifest.webmanifest`, `robots.txt`, `sitemap.xml`, `sw.js`.
- JSON-LD structured data stored in `js/structured-data/*.json` and referenced by pages.

### Tech stack
- HTML5
- CSS3 (Custom Properties + modular file structure)
- JavaScript ES Modules (vanilla JS)
- Node.js tooling (CSS/JS/images build, Lighthouse/Pa11y QA)
- Netlify (`_headers`, `_redirects`)

### Project structure (short)
- `assets/` — images, fonts, favicon
- `css/` — tokens, base, layout, components, sections
- `js/` — core, components, sections, utils, structured-data
- `dist/` — production assets (`style.min.css`, `script.min.js`)
- `services/`, `legal/` — subpages
- `tools/` — build scripts
- `manifest.webmanifest`, `sw.js`, `robots.txt`, `sitemap.xml`, `_headers`, `_redirects`

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
- Production artifacts: `dist/style.min.css`, `dist/script.min.js`.
- Cache/security + CSP: `_headers`.
- Redirect/rewrite rules + custom 404: `_redirects`.
- Routing uses static `.html` paths.

### Accessibility notes (current state)
- Present: skip link, semantic heading hierarchy, focus-visible styles, ARIA for mobile menu and interactive controls, `prefers-reduced-motion` support.
- Audit-detected limitations:
  - broken `#polityka` anchor in form consent text,
  - contact form flow is JS/reCAPTCHA dependent (limited no-JS submission path).

### SEO notes (current state)
- Present: `meta description`, canonical, OG/Twitter, `robots.txt`, `sitemap.xml`, JSON-LD files.
- Audit-detected limitations:
  - JSON-LD is linked via `script type="application/ld+json" src="..."` instead of inline,
  - some demo content (e.g., certificates) still contains placeholders.

### Performance notes (current state)
- Present: AVIF/WEBP/JPG responsive images with `srcset`, lazy loading, dimensions for most images, font/CSS preload, service worker.
- Audit-detected limitations:
  - selected utility images are missing explicit `width`/`height` (e.g., lightbox image),
  - service worker uses static cache naming (no automatic cache versioning from build metadata).

### Roadmap
- Fix critical certificate links and consent anchor.
- Move JSON-LD to inline `<script>` blocks.
- Align CSS naming with stricter BEM consistency.
- Improve no-JS contact-form fallback.
- Add automated link and accessibility checks in CI.

### License
ISC (as declared in `package.json`).
