# Atelier No.02 — Portfolio Front-End (PL/EN)

## PL

### Przegląd projektu
Atelier No.02 to wielostronicowy projekt portfolio restauracji fine dining, zbudowany w oparciu o HTML, modularny CSS (tokens + layout + components + utilities) i JavaScript ES Modules. Strona zawiera podstrony: główną, o nas, menu, galerię oraz strony prawne i offline. Projekt ma wdrożone elementy PWA (manifest + service worker).

### Kluczowe funkcje (potwierdzone w kodzie)
- Responsywny układ z wieloma podstronami (`index.html`, `about.html`, `menu.html`, `gallery.html`, strony prawne).
- Nawigacja mobilna z obsługą `aria-expanded`, focus trap i blokadą scrolla (`js/features/nav.js`).
- Dynamiczne renderowanie kart menu z `data/menu.json` (`js/features/menu.js`).
- Galeria z lightboxem i obsługą klawiatury (`js/features/lightbox.js`).
- Tryb jasny/ciemny z zapisem preferencji (`js/features/theme.js`).
- Reveal animations z obsługą preferencji ograniczenia ruchu (`js/features/reveal.js`).
- Rejestracja Service Workera i offline fallback (`sw.js`, `offline.html`).

### Tech stack
- HTML5 (strony statyczne, semantyczne sekcje).
- CSS3 + PostCSS (`postcss-import`, `cssnano`) i architektura plików modułowych.
- JavaScript (ES Modules) + bundling przez `esbuild`.
- Node.js tooling do budowania assetów obrazów (`sharp`, `fast-glob`).

### Struktura projektu
- `css/base` — tokeny, reset, typografia, globalne reguły.
- `css/layout` — kontenery i grid.
- `css/components` — komponenty UI (header/nav/cards/forms/footer/lightbox/modal).
- `css/pages` — style specyficzne dla podstron.
- `css/utilities` — animacje, stany, helpery.
- `js/core` — funkcje bazowe (DOM, scrollspy).
- `js/features` — moduły funkcjonalne (nav, menu, gallery, lightbox, theme, form itd.).
- `data/menu.json` — dane menu.
- `assets/` — obrazy zoptymalizowane, ikony, fonty.

### Instalacja i uruchomienie
1. `npm install`
2. Build assetów front-end:
   - `npm run build`
3. Lokalny serwer:
   - `npm run dev:server`
   - Domyślnie: `http://localhost:5173`

### Build i wdrożenie
- Produkcyjne pliki wynikowe:
  - `css/style.min.css`
  - `js/script.min.js`
- Nagłówki i reguły hostingu pod Netlify:
  - `_headers`
  - `_redirects`
- PWA:
  - `manifest.webmanifest`
  - `sw.js`

### Accessibility notes
- Wdrożony skip link i focus state dla linków/przycisków.
- Obsługa `aria-expanded` w menu mobilnym.
- Focus trap w menu mobilnym i modalu prawnym.
- Obsługa `prefers-reduced-motion` w module reveal (JS).
- Uwaga: `aria-current` dla aktywnych sekcji ustawiane jest jako `"true"`, a nie `"page"` (`js/core/scrollspy.js`).

### SEO notes
- Na głównych podstronach wykryto: `title`, `description`, `canonical`, Open Graph, Twitter Cards i JSON-LD.
- `robots.txt` i `sitemap.xml` są obecne.
- Strona `offline.html`: canonical i OpenGraph not detected in project.

### Performance notes
- Obrazy podawane przez `<picture>` z AVIF/WebP/JPEG fallback.
- Szerokie użycie `loading="lazy"` poza kluczowymi obrazami hero.
- Preload fontów i preload hero image na stronie głównej.
- Minifikowane zasoby CSS/JS podpinane jako `style.min.css` i `script.min.js`.

### Roadmap
- Ujednolicić semantykę `aria-current` dla scrollspy do wartości tokenowych (`page`/`location`).
- Usunąć produkcyjne `console.log` z inline rejestracji SW.
- Rozważyć per-page code-splitting zamiast ładowania pełnego bundla na każdej podstronie.
- Dodać automatyczne testy statyczne (np. lint + a11y checks) w CI.
- Ujednolicić politykę cache dla HTML i assetów przy zmianach wersji SW.

### Licencja
MIT (zgodnie z `package.json`).

---

## EN

### Project overview
Atelier No.02 is a multi-page fine-dining portfolio website built with HTML, modular CSS (tokens + layout + components + utilities), and JavaScript ES Modules. It includes the home page, about page, menu, gallery, legal pages, and an offline fallback page. PWA elements are implemented (manifest + service worker).

### Key features (verified in code)
- Responsive multi-page layout (`index.html`, `about.html`, `menu.html`, `gallery.html`, legal pages).
- Mobile navigation with `aria-expanded`, focus trap, and scroll lock (`js/features/nav.js`).
- Dynamic menu card rendering from `data/menu.json` (`js/features/menu.js`).
- Gallery with lightbox and keyboard support (`js/features/lightbox.js`).
- Light/dark theme switch with persisted preference (`js/features/theme.js`).
- Reveal animations with reduced-motion handling (`js/features/reveal.js`).
- Service Worker registration and offline fallback (`sw.js`, `offline.html`).

### Tech stack
- HTML5 (static pages with semantic sections).
- CSS3 + PostCSS (`postcss-import`, `cssnano`) with modular architecture.
- JavaScript (ES Modules) bundled via `esbuild`.
- Node.js tooling for image processing (`sharp`, `fast-glob`).

### Structure overview
- `css/base` — tokens, reset, typography, global rules.
- `css/layout` — containers and grid.
- `css/components` — UI components (header/nav/cards/forms/footer/lightbox/modal).
- `css/pages` — page-specific styles.
- `css/utilities` — animations, states, helpers.
- `js/core` — base utilities (DOM, scrollspy).
- `js/features` — feature modules (nav, menu, gallery, lightbox, theme, form, etc.).
- `data/menu.json` — menu data source.
- `assets/` — optimized images, icons, fonts.

### Setup & run
1. `npm install`
2. Build front-end assets:
   - `npm run build`
3. Run local static server:
   - `npm run dev:server`
   - Default: `http://localhost:5173`

### Build & deployment notes
- Production outputs:
  - `css/style.min.css`
  - `js/script.min.js`
- Netlify hosting config:
  - `_headers`
  - `_redirects`
- PWA files:
  - `manifest.webmanifest`
  - `sw.js`

### Accessibility notes
- Skip link and visible focus styles for links/buttons are implemented.
- `aria-expanded` is managed in mobile navigation.
- Focus trap is implemented for mobile menu and legal modal.
- `prefers-reduced-motion` is handled in reveal logic (JS).
- Note: active section `aria-current` in scrollspy is set to `"true"` instead of token values like `"page"` (`js/core/scrollspy.js`).

### SEO notes
- Main pages include `title`, `description`, `canonical`, Open Graph, Twitter cards, and JSON-LD.
- `robots.txt` and `sitemap.xml` are present.
- `offline.html`: canonical and OpenGraph not detected in project.

### Performance notes
- Images use `<picture>` with AVIF/WebP/JPEG fallback.
- Broad `loading="lazy"` usage outside critical hero assets.
- Font preloading and hero image preload on the home page.
- Minified CSS/JS delivered as `style.min.css` and `script.min.js`.

### Roadmap
- Standardize `aria-current` tokens for scrollspy (`page`/`location`).
- Remove production `console.log` from inline SW registration.
- Consider per-page code splitting instead of loading one bundle on every page.
- Add automated static checks (lint + a11y checks) in CI.
- Align cache policy/versioning strategy for HTML and SW updates.

### License
MIT (as defined in `package.json`).
