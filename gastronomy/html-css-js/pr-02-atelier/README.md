# Atelier No.02 — dokumentacja projektu

## PL

### Przegląd projektu
Atelier No.02 to wielostronicowa aplikacja webowa dla restauracji fine dining (HTML/CSS/JS), oparta na warstwowej architekturze CSS oraz modularnym JavaScript, z implementacją standardów PWA.

### Kluczowe funkcje
- Wielostronicowa struktura: `index.html`, `about.html`, `menu.html`, `gallery.html` oraz podstrony prawne.
- Responsywna nawigacja z dropdownami i obsługą klawiatury.
- Tryb jasny/ciemny z zapisem preferencji w `localStorage`.
- Dynamiczne renderowanie sekcji menu z `data/menu.json`.
- Galeria z lightboxem i fallbackami obrazów.
- Tryb offline oparty o Service Worker oraz stronę `offline.html`.

### Tech stack
- HTML5
- CSS3 + PostCSS (`postcss-import`, `cssnano`)
- JavaScript (ES modules, bundling przez `esbuild`)
- Node.js tooling (`sharp`, `fast-glob`, `http-server`)

### Struktura projektu
- `css/` — tokeny, style bazowe, layout, komponenty, style stron i utilities.
- `js/` — inicjalizacja aplikacji, moduły core i features.
- `assets/` — fonty, ikony i obrazy (w tym wersje zoptymalizowane).
- `data/menu.json` — źródło danych dla dynamicznego menu.
- `scripts/images/build-images.js` — pipeline optymalizacji obrazów.
- `manifest.webmanifest`, `sw.js`, `robots.txt`, `sitemap.xml`, `_headers`, `_redirects.txt`.

### Setup i uruchomienie
1. Instalacja zależności:
   ```bash
   npm install
   ```
2. Uruchomienie lokalnego serwera statycznego:
   ```bash
   npm run dev:server
   ```
3. Build assetów CSS i JS:
   ```bash
   npm run build
   ```
4. Generowanie wariantów obrazów:
   ```bash
   npm run images:build
   ```

### Build i deployment — uwagi
- Produkcyjny CSS i JS są serwowane z `css/style.min.css` oraz `js/script.min.js`.
- Projekt zawiera pliki deploy (`_headers`, `_redirects.txt`), ale wymagają walidacji pod docelowy hosting.
- Manifest i Service Worker używają ścieżek absolutnych (`/`), co jest poprawne dla wdrożenia w katalogu głównym domeny.

### Dostępność
- Implementacja skip link (`.skip-link`) do przejścia do głównej treści.
- Widoczne style `:focus-visible` dla kluczowych elementów interaktywnych.
- Obsługa `aria-expanded`, `aria-current`, `aria-controls` i dialogów (`aria-modal`).
- Obsługa `prefers-reduced-motion` dla animacji reveal.
- Bazowa używalność bez JS: treść i nawigacja pozostają dostępne.

### SEO
- Implementacja `canonical`, `meta description`, Open Graph, Twitter Cards i JSON-LD.
- Obecne `robots.txt` i `sitemap.xml`.
- Wymagana korekta spójności `og:url` na stronie galerii względem canonical.

### Wydajność
- Responsywne obrazy (`avif/webp/jpg`) z `srcset`/`sizes`.
- Atrybuty `width`/`height` na obrazach.
- `loading="lazy"` i `decoding="async"` na obrazach niekrytycznych.
- Preload kluczowych fontów i obrazu hero.

### Roadmap
- Korekta konfiguracji deployment (`_headers`, `_redirects`).
- Uzupełnienie brakującego zasobu PDF wskazanego w `menu.html`.
- Usunięcie logów debugowych z produkcyjnych skryptów rejestracji SW.
- Uporządkowanie cache strategy w `sw.js` (cache tylko artefaktów produkcyjnych).
- Doprecyzowanie polityki prywatności dla zewnętrznych odnośników map.

### Licencja
MIT (zgodnie z `package.json`).

---

## EN

### Project overview
Atelier No.02 is a multi-page web application for a fine dining restaurant (HTML/CSS/JS), structured with a layered CSS architecture and modular JavaScript, including PWA capabilities.

### Key features
- Multi-page structure: `index.html`, `about.html`, `menu.html`, `gallery.html`, plus legal pages.
- Responsive navigation with dropdowns and keyboard support.
- Light/dark mode with preference persistence in `localStorage`.
- Dynamic menu section rendering from `data/menu.json`.
- Gallery with lightbox and image fallback handling.
- Offline mode powered by Service Worker and `offline.html` fallback page.

### Tech stack
- HTML5
- CSS3 + PostCSS (`postcss-import`, `cssnano`)
- JavaScript (ES modules, bundled with `esbuild`)
- Node.js tooling (`sharp`, `fast-glob`, `http-server`)

### Project structure
- `css/` — design tokens, base styles, layout, components, page styles, and utilities.
- `js/` — app initialization, core modules, and feature modules.
- `assets/` — fonts, icons, and images (including optimized variants).
- `data/menu.json` — data source for dynamic menu rendering.
- `scripts/images/build-images.js` — image optimization pipeline.
- `manifest.webmanifest`, `sw.js`, `robots.txt`, `sitemap.xml`, `_headers`, `_redirects.txt`.

### Setup and run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start a local static server:
   ```bash
   npm run dev:server
   ```
3. Build CSS and JS assets:
   ```bash
   npm run build
   ```
4. Generate optimized image variants:
   ```bash
   npm run images:build
   ```

### Build and deployment notes
- Production CSS and JS are served from `css/style.min.css` and `js/script.min.js`.
- Deployment config files are present (`_headers`, `_redirects.txt`) and should be validated for the target hosting platform.
- Manifest and Service Worker use absolute paths (`/`), suitable for root-domain deployment.

### Accessibility notes
- Skip link (`.skip-link`) is implemented for quick jump to main content.
- Visible `:focus-visible` styles are present for key interactive controls.
- `aria-expanded`, `aria-current`, `aria-controls`, and modal/dialog ARIA patterns are used.
- `prefers-reduced-motion` is handled for reveal animations.
- No-JS baseline remains usable for core content and navigation.

### SEO notes
- `canonical`, `meta description`, Open Graph, Twitter Cards, and JSON-LD are implemented.
- `robots.txt` and `sitemap.xml` are present.
- `og:url` on the gallery page should be aligned with its canonical URL.

### Performance notes
- Responsive images (`avif/webp/jpg`) with `srcset`/`sizes` are implemented.
- Images include `width`/`height` attributes.
- Non-critical images use `loading="lazy"` and `decoding="async"`.
- Key fonts and hero image are preloaded.

### Roadmap
- Fix deployment config issues in `_headers` and `_redirects` handling.
- Add the missing PDF resource currently referenced in `menu.html`.
- Remove debug logs from production Service Worker registration snippets.
- Refine `sw.js` cache strategy to keep only production runtime assets.
- Clarify privacy notes for external map links.

### License
MIT (as declared in `package.json`).
