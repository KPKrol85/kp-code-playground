# Axiom Construction — portfolio front-end (PL)

## Przegląd projektu
Axiom Construction to wielostronicowy serwis portfolio firmy budowlano-remontowej przygotowany w HTML/CSS/JS (vanilla), z naciskiem na dostępność, SEO techniczne, modularną architekturę CSS i gotowość wdrożeniową (Netlify + PWA). Strona obejmuje landing page, podstrony usług, podstrony prawne, stronę sukcesu formularza, offline fallback i 404. 

## Kluczowe funkcje (potwierdzone w kodzie)
- Responsywna nawigacja z mobilnym menu, sterowaniem klawiaturą i obsługą `aria-expanded`. 
- Sekcje usług i galerie z obrazami responsywnymi (`avif/webp/jpg`) oraz lightboxem. 
- Formularz kontaktowy zgodny z Netlify Forms (honeypot, walidacja HTML + JS, statusy ARIA, fallback no-JS). 
- Przełączanie motywu jasny/ciemny z zapisem preferencji i wsparciem `prefers-color-scheme`. 
- PWA: `manifest.webmanifest`, `sw.js`, strona `offline.html`, polityki cache i pliki deploy (`_headers`, `_redirects`).
- Rozszerzone metadane SEO: canonical, OpenGraph, Twitter cards, JSON-LD dla stron i FAQ.

## Stack technologiczny
- HTML5 (wielostronicowy serwis statyczny)
- CSS (architektura modularna: tokens/base/layout/components/sections)
- JavaScript ES Modules (komponenty + sekcje)
- Narzędzia Node.js do budowania zasobów (`tools/*`)
- Netlify (formularze, deploy, redirecty, headery)

## Struktura projektu
- `index.html`, `services/*.html`, `legal/*.html`, `404.html`, `offline.html`, `success.html`
- `css/` → `tokens/`, `base/`, `layout/`, `components/`, `sections/`, `main.css`
- `js/` → `core/`, `components/`, `sections/`, `utils/`, dane structured-data
- `dist/` → zbudowane assety CSS/JS
- `tools/` → skrypty build (CSS/JS/SW/head/images)
- Pliki deploy/PWA: `_headers`, `_redirects`, `manifest.webmanifest`, `sw.js`, `robots.txt`, `sitemap.xml`

## Setup i uruchomienie
Wymagania: Node.js + npm.

```bash
npm install
npm run build
npm run serve
```

Serwis lokalny uruchamia się na `http://localhost:8080`.

## Build i wdrożenie
- Podstawowy pipeline: `build:head` → `build:css` → `build:js` → `build:sw`.
- Minifikowane assety w `dist/` są artefaktem etapu build/deploy.
- Brak dodatkowych wariantów `.min.*` poza aktualnie linkowanymi plikami nie jest traktowany jako błąd architektoniczny, o ile runtime działa na istniejących zasobach.

## Dostępność (stan obecny)
- Obecne: skip link, semantyczne nagłówki, focus styles (`:focus-visible`), obsługa `prefers-reduced-motion`, fallback no-JS dla kluczowych ścieżek i formularza.
- Do dopracowania: `aria-current` na podstronach (nawigacja globalna), pełny automatyczny raport kontrastu WCAG AA oparty o render.

## SEO (stan obecny)
- Obecne: canonical, `og:*`, Twitter cards, robots meta, `robots.txt`, `sitemap.xml`, JSON-LD na stronach.
- Do dopracowania: usunięcie niespójnego anchora `/#oferta` w `manifest.webmanifest` (sekcja na stronie głównej ma `id="uslugi"`).

## Wydajność (stan obecny)
- Obecne: preload fontów i CSS, obrazy responsywne z nowoczesnymi formatami, lazy loading na obrazach treści.
- Do dopracowania: jawna polityka cache dla `dist/*` w `_headers` (obecnie brak dedykowanego bloku dla tej ścieżki).

## Roadmap
1. Ujednolicenie aktywnego stanu nawigacji (`aria-current`) na wszystkich podstronach.
2. Korekta skrótu PWA `/#oferta` → `/#uslugi`.
3. Dodanie dedykowanego cache-control dla `dist/*`.
4. Automatyzacja walidacji kontrastu WCAG AA w CI.
5. Rozszerzenie testów QA (a11y + SEO smoke) przy każdym buildzie.

## Licencja
ISC (zgodnie z `package.json`).

---

# Axiom Construction — portfolio front-end (EN)

## Project overview
Axiom Construction is a multi-page construction portfolio website built with vanilla HTML/CSS/JS, focused on accessibility, technical SEO, modular CSS architecture, and deployment readiness (Netlify + PWA). The site includes the home page, service subpages, legal pages, a form success page, offline fallback, and a 404 page.

## Key features (verified in code)
- Responsive navigation with mobile menu, keyboard handling, and `aria-expanded` support.
- Service sections and galleries using responsive image pipelines (`avif/webp/jpg`) and a lightbox.
- Contact form integrated with Netlify Forms (honeypot, HTML + JS validation, ARIA status messaging, no-JS fallback).
- Light/dark theme switch with persisted preference and `prefers-color-scheme` support.
- PWA setup: `manifest.webmanifest`, `sw.js`, `offline.html`, cache policy headers, deploy files (`_headers`, `_redirects`).
- Extended SEO metadata: canonical, OpenGraph, Twitter cards, JSON-LD for pages and FAQ.

## Tech stack
- HTML5 (static multi-page site)
- CSS (modular architecture: tokens/base/layout/components/sections)
- JavaScript ES Modules (components + section modules)
- Node.js tooling scripts for asset generation (`tools/*`)
- Netlify (forms, deploy, redirects, headers)

## Project structure
- `index.html`, `services/*.html`, `legal/*.html`, `404.html`, `offline.html`, `success.html`
- `css/` → `tokens/`, `base/`, `layout/`, `components/`, `sections/`, `main.css`
- `js/` → `core/`, `components/`, `sections/`, `utils/`, structured-data files
- `dist/` → built CSS/JS assets
- `tools/` → build scripts (CSS/JS/SW/head/images)
- Deploy/PWA files: `_headers`, `_redirects`, `manifest.webmanifest`, `sw.js`, `robots.txt`, `sitemap.xml`

## Setup & run
Requirements: Node.js + npm.

```bash
npm install
npm run build
npm run serve
```

Local server runs on `http://localhost:8080`.

## Build & deployment notes
- Main pipeline: `build:head` → `build:css` → `build:js` → `build:sw`.
- Minified assets in `dist/` are build/deploy artifacts.
- Missing additional `.min.*` variants is not treated as an architecture issue when non-minified runtime behavior is not broken.

## Accessibility notes (current state)
- Present: skip link, semantic heading structure, focus styles (`:focus-visible`), `prefers-reduced-motion`, no-JS baseline for critical paths and form.
- Pending improvements: `aria-current` on subpages in global navigation; full automated WCAG AA contrast report from rendered pages.

## SEO notes (current state)
- Present: canonical, `og:*`, Twitter cards, robots meta, `robots.txt`, `sitemap.xml`, JSON-LD.
- Pending fix: inconsistent PWA shortcut anchor `/#oferta` in `manifest.webmanifest` while homepage section uses `id="uslugi"`.

## Performance notes (current state)
- Present: font/CSS preload, responsive modern image formats, lazy loading on content images.
- Pending improvement: explicit cache-control policy for `dist/*` in `_headers`.

## Roadmap
1. Normalize active navigation state (`aria-current`) across all subpages.
2. Fix PWA shortcut `/#oferta` → `/#uslugi`.
3. Add dedicated cache-control block for `dist/*`.
4. Add automated WCAG AA contrast checks in CI.
5. Expand QA automation (a11y + SEO smoke checks) per build.

## License
ISC (as declared in `package.json`).
