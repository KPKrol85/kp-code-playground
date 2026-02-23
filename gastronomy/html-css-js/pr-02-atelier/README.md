# Atelier No.02

## PL

### Przegląd projektu
Atelier No.02 to wielostronicowy serwis portfolio restauracji fine dining zbudowany w oparciu o statyczne HTML, modularny CSS i JavaScript ES Modules. Projekt zawiera stronę główną, podstrony: O nas, Menu, Galeria, strony prawne, stronę offline, stronę 404 i stronę potwierdzenia formularza.

### Kluczowe funkcje (potwierdzone w kodzie)
- Responsywna nawigacja z menu mobilnym, dropdownami oraz obsługą stanów ARIA (`aria-expanded`, `aria-hidden`, `inert`).
- Przełącznik motywu light/dark z persistencją preferencji w `localStorage`.
- Sekcje reveal i animacje z obsługą preferencji `prefers-reduced-motion`.
- Dynamiczne renderowanie pozycji menu z `data/menu.json`.
- Galeria zdjęć z lightboxem i obsługą klawiatury.
- Formularz kontaktowy Netlify (`data-netlify`, honeypot `bot-field`) z walidacją po stronie klienta.
- PWA baseline: `manifest.webmanifest`, `sw.js`, `offline.html`.

### Tech stack
- HTML5 (architektura wielostronicowa).
- CSS3 z podziałem na: `base`, `layout`, `components`, `pages`, `utilities`.
- JavaScript ES Modules.
- Narzędzia: PostCSS, esbuild, sharp, fast-glob, http-server.

### Struktura projektu
- `css/base/` — tokeny, reset, typografia, style globalne.
- `css/layout/` — układ i siatka.
- `css/components/` — komponenty UI (header/nav/cards/forms/buttons/footer/lightbox/modal/sections).
- `css/pages/` — style specyficzne dla podstron.
- `css/utilities/` — helpery, stany, animacje.
- `js/app/`, `js/features/`, `js/core/` — warstwa aplikacyjna i moduły funkcjonalne.
- `assets/` — fonty, ikony i obrazy.
- `data/` — dane źródłowe dla menu.

### Setup i uruchomienie
1. `npm install`
2. `npm run build`
3. `npm run dev:server`

### Build i wdrożenie
- Konfiguracja hostingu: `_headers`, `_redirects`.
- SEO crawl: `robots.txt`, `sitemap.xml`.
- PWA: `manifest.webmanifest`, `sw.js`, `offline.html`.
- Obecnie HTML używa głównie `css/style.css` i `js/script.js`, mimo że build generuje `style.min.css` i `script.min.js`.

### Dostępność
- Skip link jest wdrożony na stronach.
- Hierarchia nagłówków jest zachowana (brak wykrytych przeskoków poziomów).
- Interaktywne komponenty (menu mobilne, lightbox, modal) obsługują klawiaturę i ESC.
- Widoczny focus dla kluczowych elementów interaktywnych (`:focus-visible`).
- Baseline bez JavaScript pozostaje używalny (nawigacja i treści są dostępne).

### SEO
- Obecne: `title`, `meta description`, canonical, OpenGraph, Twitter tags na głównych podstronach.
- `og:url` jest spójny z canonical na stronach, które zawierają oba pola.
- JSON-LD występuje na głównych podstronach i jest poprawny składniowo.
- JSON-LD nie wykryto na: `404.html`, `offline.html`, `thank-you.html`.

### Wydajność
- Obrazy dostarczane przez `<picture>` (AVIF/WebP/JPG fallback).
- Obrazy mają atrybuty `width`/`height`.
- Lazy loading jest używany dla zasobów niekrytycznych.
- Fonty są preloadowane, a definicje fontów używają `font-display: swap`.

### Roadmap
- Ujednolicić referencje produkcyjne do zminifikowanych assetów albo spójnie zmienić strategię build/runtime.
- Ograniczyć zależność od ścieżek absolutnych (`/`) dla łatwiejszego wdrożenia pod subpath.
- Dodać automatyczne testy CI (link-check, walidacja HTML, a11y smoke tests).
- Rozdzielić JS per typ strony, aby zmniejszyć payload na podstronach prawnych.
- Uspójnić politykę cache z wersjonowaniem assetów (hash/fingerprint).

### Licencja
MIT (zgodnie z `package.json`).

---

## EN

### Project overview
Atelier No.02 is a multi-page fine-dining portfolio website built with static HTML, modular CSS, and JavaScript ES Modules. The project includes home, About, Menu, Gallery, legal pages, an offline page, a 404 page, and a thank-you page.

### Key features (code-verified)
- Responsive navigation with mobile menu, dropdowns, and ARIA state handling (`aria-expanded`, `aria-hidden`, `inert`).
- Light/dark theme switch with preference persisted in `localStorage`.
- Reveal sections and motion handling with `prefers-reduced-motion` support.
- Dynamic menu rendering from `data/menu.json`.
- Gallery with keyboard-accessible lightbox.
- Netlify contact form (`data-netlify`, `bot-field` honeypot) with client-side validation.
- PWA baseline: `manifest.webmanifest`, `sw.js`, `offline.html`.

### Tech stack
- HTML5 (multi-page architecture).
- CSS3 split into: `base`, `layout`, `components`, `pages`, `utilities`.
- JavaScript ES Modules.
- Tooling: PostCSS, esbuild, sharp, fast-glob, http-server.

### Structure overview
- `css/base/` — tokens, reset, typography, global styles.
- `css/layout/` — layout and grid.
- `css/components/` — UI components (header/nav/cards/forms/buttons/footer/lightbox/modal/sections).
- `css/pages/` — page-specific styles.
- `css/utilities/` — helpers, states, animations.
- `js/app/`, `js/features/`, `js/core/` — app layer and feature modules.
- `assets/` — fonts, icons, and images.
- `data/` — source data for menu content.

### Setup & run
1. `npm install`
2. `npm run build`
3. `npm run dev:server`

### Build & deployment notes
- Hosting config: `_headers`, `_redirects`.
- SEO crawl files: `robots.txt`, `sitemap.xml`.
- PWA files: `manifest.webmanifest`, `sw.js`, `offline.html`.
- HTML currently loads mostly `css/style.css` and `js/script.js`, while build output is `style.min.css` and `script.min.js`.

### Accessibility notes
- Skip link is present on pages.
- Heading hierarchy is consistent (no skipped heading levels detected).
- Interactive components (mobile nav, lightbox, modal) support keyboard and ESC behavior.
- Visible focus styling is present for key interactive elements (`:focus-visible`).
- No-JS baseline remains usable (navigation and core content are still accessible).

### SEO notes
- Present: `title`, `meta description`, canonical, OpenGraph, and Twitter tags on primary pages.
- `og:url` aligns with canonical on pages where both are present.
- JSON-LD is present on primary pages and syntactically valid.
- JSON-LD not detected on: `404.html`, `offline.html`, `thank-you.html`.

### Performance notes
- Images are served through `<picture>` with AVIF/WebP/JPG fallback.
- Images include explicit `width` and `height`.
- Lazy loading is used for non-critical media.
- Fonts are preloaded and configured with `font-display: swap`.

### Roadmap
- Standardize production references to minified assets or align build/runtime strategy.
- Reduce reliance on absolute root paths (`/`) to support subpath deployments.
- Add CI automation (link checks, HTML validation, a11y smoke tests).
- Split JS by page type to reduce payload on legal/static pages.
- Align cache policy with asset versioning (hash/fingerprint).

### License
MIT (as declared in `package.json`).
