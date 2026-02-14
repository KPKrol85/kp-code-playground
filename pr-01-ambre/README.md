# Ambre — Profesjonalny projekt front-end (portfolio)

## 🇵🇱 Wersja polska

## Przegląd projektu
Ambre to wielostronicowy projekt portfolio restauracji fine dining, zbudowany w oparciu o semantyczny HTML, modularny CSS i Vanilla JavaScript. Projekt zawiera strony: główną, menu, galerię, podstrony prawne, stronę offline i 404. Jest przygotowany pod wdrożenie statyczne (np. Netlify). 

## Kluczowe funkcje
- Responsywny układ (desktop/mobile) z osobnym drawerem nawigacji mobilnej.
- Tryb jasny/ciemny z przełącznikiem motywu.
- Interaktywne komponenty: filtrowanie kart menu i galerii, „load more”, lightbox, FAQ, formularz rezerwacji.
- Obsługa PWA: `manifest.webmanifest`, rejestracja service workera, strona offline.
- Podstawowe SEO techniczne: canonical, Open Graph, Twitter Cards, JSON-LD, robots.txt, sitemap.xml.

## Stack technologiczny
- HTML5
- CSS3 (design tokens + struktura modularna + konwencja BEM)
- Vanilla JavaScript (ES modules + bundling)
- PostCSS, cssnano, autoprefixer
- esbuild
- ESLint, Stylelint, html-validate

## Struktura projektu
- `css/base` — tokeny i typografia.
- `css/layout` — layout globalny (header/footer).
- `css/components` — komponenty UI.
- `css/pages` — style specyficzne dla podstron.
- `js/modules` — moduły funkcjonalne.
- `assets` — obrazy, ikony, fonty.
- `scripts` — skrypty QA i optymalizacji assetów.

## Instalacja i uruchomienie
```bash
npm install
npm run build
```

Dla kontroli jakości:
```bash
npm run qa
```

## Build i wdrożenie
- Produkcyjne assety budowane są do:
  - `css/style.min.css`
  - `js/script.min.js`
- HTML odwołuje się do wersji minifikowanych (`style.min.css`, `script.min.js`).
- W repozytorium nie wykryto konfiguracji CI/CD wymuszającej build przed deployem (np. `netlify.toml`) — build musi być jawnie ustawiony w pipeline/hostingu.

## Dostępność (A11y)
- Wdrożone: skip link, `aria-live`, obsługa klawiatury dla zakładek, `aria-expanded` w nawigacji mobilnej, widoczne stany `:focus-visible`, obsługa `prefers-reduced-motion`.
- Uwaga: część interaktywnych bloków ma strukturę zależną od JS — przy wyłączonym JS doświadczenie jest ograniczone (informacja `noscript` jest obecna).

## SEO
- Obecne: meta description, canonical, Open Graph, Twitter metadata, robots i sitemap, JSON-LD.
- Do korekty: pole `email` w JSON-LD zawiera wartość bez `@` (`kontakt-kp-code.pl`).

## Wydajność
- Obrazy: zastosowane formaty AVIF/WebP/JPG fallback przez `<picture>`.
- Lazy-loading: szeroko stosowany dla obrazów poza krytycznym hero.
- Fonty: preload + `font-display: swap`.
- Potencjalny problem wdrożeniowy: brak zbudowanych plików `.min` w repozytorium.

## Roadmap
- Uporządkowanie błędów walidacji HTML i domknięć znaczników.
- Ujednolicenie metadanych i danych kontaktowych (mailto/JSON-LD).
- Włączenie automatycznego QA + build w CI/CD.
- Dalsze testy a11y (nawigacja klawiaturą i screen reader).
- Dalsza optymalizacja krytycznej ścieżki renderowania.

## Licencja
MIT (zgodnie z `package.json`).

---

## 🇬🇧 English version

## Project overview
Ambre is a multi-page fine-dining portfolio project built with semantic HTML, modular CSS, and Vanilla JavaScript. It includes a home page, menu, gallery, legal pages, offline page, and a 404 page. The project is prepared for static deployment (e.g., Netlify).

## Key features
- Responsive layout (desktop/mobile) with a dedicated mobile navigation drawer.
- Light/dark theme switching.
- Interactive components: menu and gallery filters, load-more patterns, lightbox, FAQ, reservation form.
- PWA support: `manifest.webmanifest`, service worker registration, offline page.
- Technical SEO baseline: canonical, Open Graph, Twitter Cards, JSON-LD, robots.txt, sitemap.xml.

## Tech stack
- HTML5
- CSS3 (design tokens + modular structure + BEM convention)
- Vanilla JavaScript (ES modules + bundling)
- PostCSS, cssnano, autoprefixer
- esbuild
- ESLint, Stylelint, html-validate

## Project structure
- `css/base` — tokens and typography.
- `css/layout` — global layout (header/footer).
- `css/components` — UI components.
- `css/pages` — page-specific styles.
- `js/modules` — functional modules.
- `assets` — images, icons, fonts.
- `scripts` — QA and asset optimization scripts.

## Setup & run
```bash
npm install
npm run build
```

For quality checks:
```bash
npm run qa
```

## Build & deployment
- Production assets are generated to:
  - `css/style.min.css`
  - `js/script.min.js`
- HTML files reference minified assets (`style.min.css`, `script.min.js`).
- No CI/CD config forcing pre-deploy build (e.g., `netlify.toml`) was detected in the project, so build must be explicitly configured in hosting/pipeline.

## Accessibility notes
- Implemented: skip link, `aria-live`, keyboard support for tabs, `aria-expanded` in mobile nav, visible `:focus-visible` states, `prefers-reduced-motion` handling.
- Note: some interactive sections depend on JS behavior; UX is limited when JS is disabled (`noscript` notice is present).

## SEO notes
- Present: meta description, canonical, Open Graph, Twitter metadata, robots and sitemap, JSON-LD.
- To fix: the JSON-LD `email` field currently uses a value without `@` (`kontakt-kp-code.pl`).

## Performance notes
- Images: AVIF/WebP/JPG fallback used via `<picture>`.
- Lazy loading: widely used for non-critical images.
- Fonts: preload + `font-display: swap`.
- Deployment risk: minified `.min` bundles are not present in the repository.

## Roadmap
- Resolve HTML validation issues and stray closing tags.
- Unify metadata and contact values (mailto/JSON-LD).
- Enable automatic QA + build in CI/CD.
- Extend a11y test coverage (keyboard + screen reader).
- Continue critical rendering path optimization.

## License
MIT (as declared in `package.json`).
