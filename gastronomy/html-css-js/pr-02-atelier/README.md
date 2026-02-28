# Atelier No.02

## PL — Dokumentacja projektu

### 1. Przegląd projektu
Atelier No.02 to statyczny, wielostronicowy front-end restauracji fine dining. Projekt dostarcza kompletny serwis informacyjny (strona główna, podstrony funkcjonalne, strony prawne i systemowe) z naciskiem na dostępność, SEO, wydajność i gotowość do wdrożenia na hostingu statycznym.

### 2. Kluczowe funkcje
- Wielostronicowa architektura HTML: `index.html`, `about.html`, `menu.html`, `gallery.html`, `contact.html`, strony prawne (`cookies.html`, `polityka-prywatnosci.html`, `regulamin.html`) oraz systemowe (`offline.html`, `404.html`, `thank-you.html`).
- Responsywna nawigacja z menu mobilnym, dropdownami, obsługą klawiatury, focus trap i kontrolą stanu ARIA.
- Przełącznik motywu jasny/ciemny z zapisem w `localStorage` i aktualizacją meta `theme-color`.
- Dynamiczne renderowanie kart menu z `data/menu.json` (sekcja featured + kategorie), wraz z wyszukiwaniem i filtrowaniem po tagach.
- Galeria ze wsparciem lightboxa oraz zakładkami sekcji (scrollspy).
- Formularz kontaktowy przygotowany pod Netlify Forms (`data-netlify`, `netlify-honeypot`) z walidacją po stronie klienta.
- Banner statusu sieci online/offline oraz komunikaty offline dla wybranych podstron.
- Podstawy PWA: `manifest.webmanifest`, `sw.js`, cache zasobów i fallback na `offline.html`.

### 3. Tech Stack
- HTML5 (serwis statyczny).
- CSS z architekturą modułową (`base`, `layout`, `components`, `pages`) i scalaniem przez PostCSS.
- Vanilla JavaScript (ES Modules) z podziałem na `app`, `features`, `core`.
- Narzędzia i QA: PostCSS, cssnano, esbuild, ESLint, html-validate, linkinator, pa11y-ci, http-server, start-server-and-test.
- Pipeline obrazów: Node.js + `sharp` + `fast-glob` (`scripts/images/build-images.js`).

### 4. Struktura projektu
- `assets/` — fonty, ikony i zasoby graficzne (`img-src`, `img`, `img-optimized`).
- `css/` — style bazowe, layout, komponenty i style stron.
- `js/` — bootstrap, inicjalizacja aplikacji, moduły funkcjonalne i narzędzia core.
- `data/menu.json` — źródło danych menu renderowanego dynamicznie.
- `scripts/images/build-images.js` — generowanie wariantów obrazów (AVIF/WEBP + format bazowy).
- `_headers`, `_redirects` — konfiguracja nagłówków i przekierowań pod hosting statyczny.
- `manifest.webmanifest`, `sw.js` — konfiguracja PWA i Service Workera.

### 5. Setup i instalacja
Wymagany jest Node.js oraz npm.

```bash
npm install
```

### 6. Lokalny development
```bash
npm run dev:server
```
Uruchamia lokalny serwer HTTP na porcie `5173`.

Dodatkowe komendy używane lokalnie:

```bash
npm run lint
npm run validate:html
npm run check
npm run check:server
npm run check:server:prod
```

### 7. Build produkcyjny
Build produkcyjny assetów:

```bash
npm run build
```

Skrypt generuje:
- `css/style.min.css` (PostCSS + cssnano),
- `js/script.min.js` (esbuild, bundle + minify).

Build obrazów:

```bash
npm run images:build
```

### 8. Deployment
Repozytorium zawiera konfigurację wdrożeniową dla hostingu statycznego:
- `_headers` — security headers, cache policy i deklaracje preload/manifest,
- `_redirects` — mapowanie do strony `404.html` dla nieobsłużonych tras,
- `contact.html` — formularz zgodny z Netlify Forms.

### 9. Dostępność
Zaobserwowane implementacje a11y:
- skip link do treści głównej,
- semantyczne landmarki i atrybuty ARIA w nawigacji i komponentach interaktywnych,
- obsługa klawiatury (nawigacja mobilna, dropdowny, lightbox),
- focus trap dla menu mobilnego,
- komunikaty `aria-live` (status sieci, komunikaty formularza),
- fallback `noscript` na stronach HTML,
- automatyczne testy dostępności przez `pa11y-ci` (`WCAG2AA`).

### 10. SEO
Zaimplementowane elementy SEO:
- `meta description`, `canonical`, `robots`,
- Open Graph i Twitter Cards,
- dane strukturalne JSON-LD (`application/ld+json`) na stronach,
- `robots.txt` i `sitemap.xml`.

### 11. Wydajność
Zastosowane optymalizacje:
- obrazy responsywne (`srcset`, `sizes`) w wielu formatach (AVIF/WEBP/JPG),
- explicit `width`/`height` dla obrazów,
- `loading="lazy"` dla mediów niekrytycznych,
- preload wybranych fontów i zasobów hero,
- minifikacja CSS/JS i bundling JS,
- cache statycznych zasobów w Service Worker.

### 12. Utrzymanie projektu
Najważniejsze miejsca dla dalszego rozwoju:
- logika startowa i orkiestracja: `js/bootstrap.js`, `js/app/init.js`,
- funkcje domenowe: `js/features/*.js` (nawigacja, formularz, menu, galeria, lightbox, sieć),
- stylowanie i skala UI: `css/style.css` + moduły `css/**`,
- dane menu: `data/menu.json`,
- jakość i walidacja: skrypty npm z `package.json`, konfiguracje `.pa11yci`, `.htmlvalidate.json`, `eslint.config.mjs`,
- konfiguracja wdrożeniowa/PWA: `_headers`, `_redirects`, `manifest.webmanifest`, `sw.js`.

### 13. Roadmap
- Przenieść krok raportowania rozmiaru CSS z `powershell` do rozwiązania neutralnego systemowo, aby build działał identycznie na Linux/macOS/Windows.
- Uzupełnić `check:server:prod` o automatyczne testy a11y (obecnie obejmuje link-check po buildzie).
- Rozszerzyć testy integracyjne front-endu o scenariusze krytyczne (nawigacja mobilna, filtry menu, walidacja formularza).
- Wydzielić parametry cache/versioning Service Workera do centralnej konfiguracji release.
- Dodać automatyczną walidację spójności `sitemap.xml` względem listy stron HTML.

### 14. Licencja
MIT.

---

## EN — Project documentation

### 1. Project Overview
Atelier No.02 is a static multi-page front-end for a fine-dining restaurant. The project provides a complete informational website (home page, functional subpages, legal pages, and system pages) with focus on accessibility, SEO, performance, and static-hosting deployment readiness.

### 2. Key Features
- Multi-page HTML architecture: `index.html`, `about.html`, `menu.html`, `gallery.html`, `contact.html`, legal pages (`cookies.html`, `polityka-prywatnosci.html`, `regulamin.html`), and system pages (`offline.html`, `404.html`, `thank-you.html`).
- Responsive navigation with mobile menu, dropdowns, keyboard support, focus trap, and ARIA state management.
- Light/dark theme switch with `localStorage` persistence and dynamic `theme-color` meta update.
- Dynamic menu card rendering from `data/menu.json` (featured section + categories), including search and tag filtering.
- Gallery with lightbox support and section tabs (scrollspy).
- Contact form prepared for Netlify Forms (`data-netlify`, `netlify-honeypot`) with client-side validation.
- Online/offline network status banner and offline notices for selected pages.
- PWA baseline: `manifest.webmanifest`, `sw.js`, asset caching, and `offline.html` fallback.

### 3. Tech Stack
- HTML5 (static website).
- CSS with modular architecture (`base`, `layout`, `components`, `pages`) and PostCSS processing.
- Vanilla JavaScript (ES Modules) organized into `app`, `features`, and `core`.
- Tooling and QA: PostCSS, cssnano, esbuild, ESLint, html-validate, linkinator, pa11y-ci, http-server, start-server-and-test.
- Image pipeline: Node.js + `sharp` + `fast-glob` (`scripts/images/build-images.js`).

### 4. Project Structure
- `assets/` — fonts, icons, and graphic assets (`img-src`, `img`, `img-optimized`).
- `css/` — base styles, layout, components, and page-specific styles.
- `js/` — bootstrap, app initialization, feature modules, and core utilities.
- `data/menu.json` — data source for dynamically rendered menu content.
- `scripts/images/build-images.js` — image variant generation (AVIF/WEBP + base format).
- `_headers`, `_redirects` — headers and redirects configuration for static hosting.
- `manifest.webmanifest`, `sw.js` — PWA and Service Worker configuration.

### 5. Setup and Installation
Node.js and npm are required.

```bash
npm install
```

### 6. Local Development
```bash
npm run dev:server
```
Runs a local HTTP server on port `5173`.

Additional locally used commands:

```bash
npm run lint
npm run validate:html
npm run check
npm run check:server
npm run check:server:prod
```

### 7. Production Build
Production asset build:

```bash
npm run build
```

The build generates:
- `css/style.min.css` (PostCSS + cssnano),
- `js/script.min.js` (esbuild, bundle + minify).

Image build:

```bash
npm run images:build
```

### 8. Deployment
The repository includes deployment configuration for static hosting:
- `_headers` — security headers, cache policy, and preload/manifest declarations,
- `_redirects` — mapping to `404.html` for unmatched routes,
- `contact.html` — Netlify Forms-compatible form.

### 9. Accessibility
Observed accessibility implementation:
- skip link to main content,
- semantic landmarks and ARIA attributes in navigation and interactive components,
- keyboard support (mobile nav, dropdowns, lightbox),
- focus trap for mobile navigation,
- `aria-live` announcements (network status, form feedback),
- `noscript` fallback across HTML pages,
- automated accessibility checks via `pa11y-ci` (`WCAG2AA`).

### 10. SEO
Implemented SEO elements:
- `meta description`, `canonical`, `robots`,
- Open Graph and Twitter Cards,
- JSON-LD structured data (`application/ld+json`) on pages,
- `robots.txt` and `sitemap.xml`.

### 11. Performance
Implemented optimizations:
- responsive images (`srcset`, `sizes`) in multiple formats (AVIF/WEBP/JPG),
- explicit image `width`/`height`,
- `loading="lazy"` for non-critical media,
- preload for selected fonts and hero assets,
- CSS/JS minification and JS bundling,
- static asset caching through the Service Worker.

### 12. Project Maintenance
Primary locations for ongoing maintenance:
- startup and orchestration logic: `js/bootstrap.js`, `js/app/init.js`,
- domain features: `js/features/*.js` (navigation, form, menu, gallery, lightbox, network),
- styling and UI scale: `css/style.css` + `css/**` modules,
- menu data: `data/menu.json`,
- quality and validation: npm scripts in `package.json`, plus `.pa11yci`, `.htmlvalidate.json`, `eslint.config.mjs`,
- deployment/PWA config: `_headers`, `_redirects`, `manifest.webmanifest`, `sw.js`.

### 13. Roadmap
- Replace the `powershell` CSS-size reporting step with a cross-platform solution so the build behaves consistently on Linux/macOS/Windows.
- Extend `check:server:prod` with automated accessibility checks (it currently focuses on post-build link validation).
- Add front-end integration tests for critical flows (mobile navigation, menu filtering, form validation).
- Extract Service Worker cache/version parameters into centralized release configuration.
- Add automatic `sitemap.xml` consistency validation against the HTML page set.

### 14. License
MIT.
