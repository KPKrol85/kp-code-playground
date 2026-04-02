# Easy Move — dokumentacja techniczna repozytorium

## PL

### Przegląd projektu
Statyczny, wielostronicowy serwis front-end dla marki Easy Move, zbudowany jako projekt oparty o Vite + skrypty budujące CSS/JS do katalogu `dist/`. Implementacja używa modularnego CSS (tokens/base/layout/components/utilities/pages) oraz modułowego JavaScriptu ES Modules. Dowód: `package.json`, `css/main.css`, `js/main.js`.

### Kluczowe funkcje (potwierdzone w kodzie)
- Wielostronicowa nawigacja (`index.html`, `uslugi.html`, `cennik.html`, `o-nas.html`, `faq.html`, `kontakt.html`, `przeprowadzki-firm.html`).
- Menu mobilne z obsługą klawiatury (focus trap, Escape, zamykanie po kliknięciu poza panelem). Dowód: `js/modules/menu.js`.
- Przełączanie motywu jasny/ciemny z persystencją w `localStorage`. Dowód: `js/modules/theme.js`, `css/tokens.css`.
- Sekcje reveal z fallbackiem dla `prefers-reduced-motion` i braku `IntersectionObserver`. Dowód: `js/modules/reveal.js`, `css/components.css`.
- Walidacja formularza kontaktowego po stronie klienta z podsumowaniem błędów i komunikatem `aria-live`. Dowód: `kontakt.html`, `js/modules/form.js`.

### Tech stack
- HTML5 (strony statyczne)
- CSS + PostCSS (`postcss-import`, `cssnano`)
- Vanilla JavaScript (ES Modules)
- Vite (dev server / preview)
- Terser (minifikacja JS)
- Sharp (konwersja obrazów)

### Struktura projektu
- `*.html` — strony serwisu
- `css/` — warstwy stylów + style stron
- `js/` — entrypoint i moduły UI
- `scripts/` — build i konwersja obrazów
- `assets/` — zasoby statyczne
- `dist/` — artefakty builda (generowane)

### Instalacja i uruchomienie
```bash
npm install
npm run dev
```

### Build i deployment (repozytoryjnie)
```bash
npm run build
npm run preview
```
- `npm run build` wykonuje: `css:build` + `js:build`, następnie kopiuje pliki HTML i katalog `assets/` do `dist/`.
- Dedykowane pliki deploymentowe (`_headers`, `_redirects`, `netlify.toml`, `vercel.json`) nie zostały wykryte w projekcie.

### Dostępność (stan implementacji)
- Obecny skip link i semantyczny landmark `<main id="main">` na stronach.
- Widoczny focus ring (`:focus-visible`) zdefiniowany globalnie.
- Menu mobilne zarządza fokusem i umożliwia zamknięcie klawiszem Escape.
- Formularz ma stany błędu (`aria-invalid`) oraz regiony statusu.
- `aria-current` w nawigacji nie wykryto (stosowana jest klasa wizualna `nav__link--active`).

### SEO (stan implementacji)
- Każda strona ma `<title>`.
- Meta description: nie wykryto.
- `canonical`: nie wykryto.
- Open Graph (`og:*`): nie wykryto.
- JSON-LD: nie wykryto.
- `robots.txt` i `sitemap.xml`: nie wykryto.

### Wydajność (stan implementacji)
- CSS ładowany jako jeden entrypoint (`css/main.css`) z `@import` i fontami Google Fonts.
- JS ładowany jako `type="module"`.
- Brak tagów `<img>` w stronach (UI oparty głównie o SVG inline i tekst).
- Konwersja obrazów do AVIF/WebP jest przewidziana skryptem (`scripts/convert-images.mjs`), ale katalog źródłowy obrazów nie jest częścią obecnej implementacji.

### Roadmap (na podstawie stanu repozytorium)
1. Uzupełnić metadane SEO (`meta description`, `canonical`, OG, JSON-LD).
2. Dodać `robots.txt` i `sitemap.xml`.
3. Zastąpić linki placeholder (`href="#"`) realnymi URL (social + polityki prawne).
4. Uzupełnić nawigację o `aria-current="page"` dla aktywnej pozycji.
5. Rozszerzyć semantykę tabów o pełen wzorzec WAI-ARIA (np. `tabindex`, powiązania ukrywania paneli).

### Licencja
Plik licencji nie został wykryty w projekcie.

---

## EN

### Project overview
A static multi-page front-end website for Easy Move, built as a Vite-based project with CSS/JS build scripts outputting to `dist/`. The implementation uses layered CSS architecture (tokens/base/layout/components/utilities/pages) and modular ES Module JavaScript.

### Key implemented features
- Multi-page site structure (`index.html`, `uslugi.html`, `cennik.html`, `o-nas.html`, `faq.html`, `kontakt.html`, `przeprowadzki-firm.html`).
- Mobile menu with keyboard support (focus trap, Escape close, outside-click close).
- Light/dark theme toggle with `localStorage` persistence.
- Reveal animations with reduced-motion and no-IntersectionObserver fallback.
- Client-side contact form validation with `aria-live` feedback and error summary.

### Tech stack
- HTML5
- CSS + PostCSS (`postcss-import`, `cssnano`)
- Vanilla JavaScript (ES Modules)
- Vite
- Terser
- Sharp

### Repository structure
- `*.html` — pages
- `css/` — style layers and page styles
- `js/` — entrypoint and feature modules
- `scripts/` — build utilities
- `assets/` — static assets
- `dist/` — generated build output

### Setup and run
```bash
npm install
npm run dev
```

### Build and deployment notes
```bash
npm run build
npm run preview
```
- Build runs CSS/JS compilation and copies HTML + `assets/` into `dist/`.
- No dedicated deployment config files (`_headers`, `_redirects`, `netlify.toml`, `vercel.json`) were detected.

### Accessibility notes
- Skip link and `<main id="main">` landmarks are present.
- Global visible focus style is implemented via `:focus-visible`.
- Mobile menu includes keyboard/focus management.
- Form validation updates `aria-invalid` and exposes status/error regions.
- `aria-current` in navigation is not detected.

### SEO notes
- `<title>` tags are present on pages.
- Meta description: not detected in project.
- Canonical: not detected in project.
- Open Graph: not detected in project.
- JSON-LD: not detected in project.
- `robots.txt` and `sitemap.xml`: not detected in project.

### Performance notes
- Single CSS entrypoint (`css/main.css`) with `@import`, including Google Fonts import.
- JS loaded as `type="module"`.
- No `<img>` elements detected in HTML pages.
- AVIF/WebP conversion script exists, but source image folder is optional and not present now.

### Roadmap
1. Add SEO metadata (`meta description`, canonical, OG, JSON-LD).
2. Add `robots.txt` and `sitemap.xml`.
3. Replace placeholder links (`href="#"`) with real destinations.
4. Add `aria-current="page"` for active nav links.
5. Improve tabs to full WAI-ARIA keyboard pattern.

### License
License file not detected in project.
