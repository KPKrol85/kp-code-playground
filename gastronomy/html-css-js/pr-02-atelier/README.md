# Atelier No.02 — Portfolio Front-End Audit Summary

## PL

### Przegląd projektu
Atelier No.02 to wielostronicowy projekt portfolio restauracji fine dining oparty o statyczne HTML, modularny CSS i JavaScript ES Modules. W repozytorium występują strony: główna, o nas, menu, galeria, strony prawne, strona offline i 404.

### Kluczowe funkcje (potwierdzone implementacją)
- Nawigacja responsywna z menu mobilnym, dropdownami i zarządzaniem atrybutami ARIA (`aria-expanded`, `aria-hidden`, `inert`).
- Przełącznik motywu light/dark z zapisem preferencji w `localStorage`.
- Sekcje reveal i animacje kontrolowane przez `prefers-reduced-motion`.
- Dynamiczne renderowanie menu z `data/menu.json`.
- Galeria z lightboxem i obsługą klawiatury.
- Formularz kontaktowy Netlify z honeypotem i walidacją po stronie klienta.
- Service Worker + `offline.html` + manifest PWA.

### Tech stack
- HTML5 (wielostronicowy serwis statyczny).
- CSS3 z architekturą modułową (`base/layout/components/pages/utilities`) i tokenami.
- JavaScript ES Modules.
- Tooling: PostCSS, esbuild, sharp, fast-glob, http-server.

### Struktura projektu
- `css/base` — reset, typografia, tokeny, reguły globalne.
- `css/layout` — layout i grid.
- `css/components` — komponenty UI.
- `css/pages` — style per podstrona.
- `css/utilities` — helpery, stany, animacje.
- `js/core`, `js/features`, `js/app` — podział logiki JS na moduły funkcjonalne.
- `assets/`, `assets/img-optimized` — obrazy, fonty i ikony.

### Setup i uruchomienie
1. `npm install`
2. `npm run build`
3. `npm run dev:server`

### Build i wdrożenie
- Konfiguracja hostingu: `_headers`, `_redirects`.
- SEO crawl: `robots.txt`, `sitemap.xml`.
- PWA: `manifest.webmanifest`, `sw.js`, `offline.html`.
- Uwaga: strony HTML ładują głównie nieminifikowane entry (`css/style.css`, `js/script.js` lub `js/core.js`), mimo obecności buildów `.min`.

### Dostępność (stan obecny)
- Skip link jest wdrożony.
- Hierarchia nagłówków semantycznie spójna (brak skoków poziomu).
- Obsługa klawiatury: focus trap i ESC dla menu mobilnego i modalu.
- Widoczny fokus dla linków, przycisków i pól formularza.
- No-JS baseline: nawigacja pozostaje dostępna bez JS.

### SEO (stan obecny)
- Wykryto: `title`, `meta description`, canonical, OpenGraph, Twitter Cards na stronach głównych i prawnych.
- `og:url` jest spójny z canonical na podstronach, gdzie oba występują.
- JSON-LD występuje na kluczowych podstronach i jest poprawny składniowo.
- `offline.html`: JSON-LD not detected in project.

### Wydajność (stan obecny)
- Obrazy dostarczane przez `<picture>` (AVIF/WebP/JPEG fallback).
- Obrazy mają atrybuty `width`/`height`.
- Szerokie użycie `loading="lazy"` dla zasobów niekrytycznych.
- Strategia fontów obejmuje preload + `font-display` w CSS.

### Roadmap
- Ujednolicić produkcyjne ładowanie assetów do plików `.min`.
- Ograniczyć duplikację inline skryptów inicjalizacji motywu/SW między podstronami.
- Dodać automatyczny lint linków i anchorów w CI.
- Dodać automatyczne testy a11y (np. axe/pa11y).
- Dodać per-page podział JS dla redukcji transferu na stronach prawnych.

### Licencja
MIT (`package.json`).

---

## EN

### Project overview
Atelier No.02 is a multi-page fine-dining portfolio website built with static HTML, modular CSS, and JavaScript ES Modules. The repository includes home, about, menu, gallery, legal pages, offline page, and 404 page.

### Key features (implementation-confirmed)
- Responsive navigation with mobile menu, dropdowns, and ARIA state management (`aria-expanded`, `aria-hidden`, `inert`).
- Light/dark theme switch persisted in `localStorage`.
- Reveal sections and animations controlled by `prefers-reduced-motion`.
- Dynamic menu rendering from `data/menu.json`.
- Gallery with keyboard-accessible lightbox.
- Netlify contact form with honeypot and client-side validation.
- Service Worker + `offline.html` + web app manifest.

### Tech stack
- HTML5 (static multi-page site).
- CSS3 with modular architecture (`base/layout/components/pages/utilities`) and design tokens.
- JavaScript ES Modules.
- Tooling: PostCSS, esbuild, sharp, fast-glob, http-server.

### Structure overview
- `css/base` — reset, typography, tokens, global rules.
- `css/layout` — layout and grid.
- `css/components` — UI components.
- `css/pages` — page-specific styles.
- `css/utilities` — helpers, states, animations.
- `js/core`, `js/features`, `js/app` — functional module split.
- `assets/`, `assets/img-optimized` — images, fonts, icons.

### Setup & run
1. `npm install`
2. `npm run build`
3. `npm run dev:server`

### Build & deployment notes
- Hosting config: `_headers`, `_redirects`.
- Crawl artifacts: `robots.txt`, `sitemap.xml`.
- PWA files: `manifest.webmanifest`, `sw.js`, `offline.html`.
- Note: most HTML pages currently load non-minified entries (`css/style.css`, `js/script.js` or `js/core.js`) although `.min` builds exist.

### Accessibility notes (current state)
- Skip link is implemented.
- Heading hierarchy is structurally consistent (no skipped heading levels detected).
- Keyboard support includes focus trap and ESC handling for mobile nav and modal.
- Visible focus states are present for links, buttons, and form controls.
- No-JS baseline remains usable (navigation is still accessible without JS).

### SEO notes (current state)
- Detected: `title`, `meta description`, canonical, OpenGraph, and Twitter Cards on primary and legal pages.
- `og:url` aligns with canonical on pages where both are present.
- JSON-LD is present on key pages and syntactically valid.
- `offline.html`: JSON-LD not detected in project.

### Performance notes (current state)
- Images are served with `<picture>` (AVIF/WebP/JPEG fallback).
- Images include explicit `width`/`height` attributes.
- `loading="lazy"` is broadly used on non-critical media.
- Font strategy includes preload and `font-display` usage.

### Roadmap
- Standardize production HTML to load `.min` assets.
- Reduce duplicated inline scripts for theme and SW registration.
- Add automated link/anchor validation in CI.
- Add automated accessibility checks (e.g., axe/pa11y).
- Introduce per-page JS splitting to reduce legal-page payload.

### License
MIT (`package.json`).
