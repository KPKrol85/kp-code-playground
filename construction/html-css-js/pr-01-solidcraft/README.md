# SolidCraft — Portfolio Front-End (Audyt techniczny)

## Wersja polska

### Przegląd projektu
SolidCraft to statyczna implementacja front-end strony internetowej firmy remontowo-budowlanej, zrealizowana jako projekt portfolio w technologii HTML/CSS/JavaScript. Projekt obejmuje stronę główną, podstrony ofertowe, dokumenty prawne, stronę 404, stronę offline oraz stronę potwierdzenia wysłania formularza.

### Kluczowe funkcje (wyłącznie wykryte w kodzie)
- Sekcje landing page: hero, oferta, realizacje, opinie, FAQ, kontakt.
- Podstrony usług: łazienki, malowanie, kafelkowanie, elektryka, hydraulika, remonty.
- Formularz kontaktowy Netlify (`netlify`, `netlify-honeypot`) z walidacją HTML + walidacją JS i honeypotem.
- Obsługa motywu jasny/ciemny z inicjalizacją motywu przed renderem (`theme-init.min.js`) i ręcznym przełącznikiem.
- Skip link, focus styles, nawigacja mobilna z `aria-expanded`, dropdown „Oferta”, lightbox galerii.
- Progressive Web App: `manifest.webmanifest`, service worker (`sw.js`) i rejestracja (`js/sw-register.js`).
- SEO meta i Open Graph na stronach publicznych, pliki JSON-LD w `assets/jsonld/*.json`, `sitemap.xml` i `robots.txt`.

### Stack technologiczny
- HTML5
- CSS3 + PostCSS (autoprefixer, cssnano, postcss-preset-env)
- Vanilla JavaScript
- Narzędzia deweloperskie: live-server, prettier, terser, sharp
- Hosting/deploy: Netlify-style pliki `_headers` i `_redirects`

### Struktura projektu (skrót)
- `index.html` — strona główna.
- `oferta/*.html` — podstrony oferty.
- `doc/*.html` — polityka prywatności, regulamin, cookies.
- `css/style.css`, `css/style.min.css` — style źródłowe i zminifikowane.
- `js/script.js`, `js/script.min.js`, `js/theme-init.js`, `js/sw-register.js`.
- `assets/` — obrazy, fonty, favicony, JSON-LD.
- `sw.js`, `manifest.webmanifest`, `robots.txt`, `sitemap.xml`, `_headers`, `_redirects`.

### Setup i uruchomienie
```bash
npm install
npm run dev
```
Domyślnie uruchamiany jest `live-server` na porcie `15500`.

### Build i deployment
```bash
npm run build
```
Buduje minifikaty CSS/JS i uruchamia formatowanie.

Dodatkowo:
```bash
npm run images:build
npm run images:clean
```
Skrypty generują/czyszczą warianty obrazów na podstawie `scripts/images.js`.

### Notatki dostępności (stan aktualny)
- Zaimplementowano skip link (`.skip`) i focus-visible.
- W kodzie są media queries `prefers-reduced-motion` oraz fallbacki JS respektujące redukcję ruchu.
- Nawigacja mobilna i dropdown mają obsługę `aria-expanded` oraz zachowanie klawiaturowe (Escape/Tab).
- Formularz ma etykiety, `required`, komunikaty błędów i aria-live.
- Istnieją jednak wykryte odchylenia (szczegóły w `AUDIT.md`), m.in. martwe kotwice w `404.html`.

### Notatki SEO (stan aktualny)
- Canonical i `og:url` są spójne na stronach, które je deklarują.
- Występuje krytyczna niespójność indeksowania: `robots.txt` blokuje crawl (`Disallow: /`), a HTML ma meta `index, follow`.
- JSON-LD jest podłączone przez `<script type="application/ld+json" src="...">`, co nie jest standardowo przetwarzane jako dane strukturalne przez wyszukiwarki.

### Notatki wydajnościowe (stan aktualny)
- Obrazy mają warianty AVIF/WebP/JPG i szeroko używają `loading="lazy"`.
- Preloadowane są fonty `.woff2`; `font-display: swap` jest ustawione.
- Service Worker stosuje strategię cache-first dla wielu zasobów, bez ograniczeń typu zasobu i bez walidacji odpowiedzi (`res.ok`, status), co może utrwalać błędne odpowiedzi.

### Roadmapa
1. Uspójnić politykę indeksowania (`robots.txt`, `_headers`, meta robots) zgodnie z celem produkcyjnym.
2. Przenieść JSON-LD inline do dokumentów HTML.
3. Naprawić błędne ścieżki i kotwice (404 + cookie banner na homepage).
4. Utwardzić SW (filtrowanie requestów, cache policy per typ, guards dla nieudanych odpowiedzi).
5. Ograniczyć duplikację między plikami źródłowymi i zminifikowanymi przez automatyzację release.

### Licencja
Projekt udostępniony na licencji MIT. Zobacz plik `LICENSE`.

---

## English version

### Project overview
SolidCraft is a static front-end implementation of a construction/renovation company website, created as a portfolio project using HTML, CSS, and JavaScript. The project includes a homepage, service subpages, legal documents, a 404 page, an offline page, and a form confirmation page.

### Key features (only detected in code)
- Landing sections: hero, offer, projects, testimonials, FAQ, contact.
- Service subpages: bathrooms, painting, tiling, electrical, plumbing, renovations.
- Netlify contact form (`netlify`, `netlify-honeypot`) with HTML validation + JS validation and honeypot.
- Light/dark theme with pre-render theme initialization (`theme-init.min.js`) and manual toggle.
- Skip link, visible focus styles, mobile nav with `aria-expanded`, “Offer” dropdown, gallery lightbox.
- Progressive Web App: `manifest.webmanifest`, service worker (`sw.js`) and registration (`js/sw-register.js`).
- SEO metadata and Open Graph on public pages, JSON-LD files in `assets/jsonld/*.json`, `sitemap.xml`, and `robots.txt`.

### Tech stack
- HTML5
- CSS3 + PostCSS (autoprefixer, cssnano, postcss-preset-env)
- Vanilla JavaScript
- Dev tooling: live-server, prettier, terser, sharp
- Hosting/deploy: Netlify-style `_headers` and `_redirects`

### Project structure (short)
- `index.html` — homepage.
- `oferta/*.html` — service pages.
- `doc/*.html` — privacy policy, terms, cookies.
- `css/style.css`, `css/style.min.css` — source and minified styles.
- `js/script.js`, `js/script.min.js`, `js/theme-init.js`, `js/sw-register.js`.
- `assets/` — images, fonts, favicons, JSON-LD.
- `sw.js`, `manifest.webmanifest`, `robots.txt`, `sitemap.xml`, `_headers`, `_redirects`.

### Setup & run
```bash
npm install
npm run dev
```
Default dev server uses `live-server` on port `15500`.

### Build & deployment
```bash
npm run build
```
Builds minified CSS/JS and runs formatting.

Additional image workflows:
```bash
npm run images:build
npm run images:clean
```
Scripts generate/clean image variants via `scripts/images.js`.

### Accessibility notes (current state)
- Skip link (`.skip`) and focus-visible styles are implemented.
- `prefers-reduced-motion` support exists in CSS and JS behavior fallbacks.
- Mobile navigation and dropdown include `aria-expanded` and keyboard behavior (Escape/Tab).
- Contact form includes labels, `required`, error messaging, and aria-live feedback.
- There are still identified deviations (see `AUDIT.md`), including dead anchors in `404.html`.

### SEO notes (current state)
- Canonical and `og:url` are aligned on pages that declare both.
- There is a critical indexing conflict: `robots.txt` blocks crawling (`Disallow: /`) while HTML uses `index, follow` meta directives.
- JSON-LD is referenced via `<script type="application/ld+json" src="...">`, which is not standard for structured-data parsing.

### Performance notes (current state)
- Images provide AVIF/WebP/JPG variants and broadly use `loading="lazy"`.
- `.woff2` fonts are preloaded; `font-display: swap` is configured.
- Service Worker uses broad cache-first behavior without robust response guards (`res.ok`, status), which can preserve invalid responses.

### Roadmap
1. Align indexing policy (`robots.txt`, `_headers`, robots meta) with production intent.
2. Move JSON-LD into inline blocks in HTML.
3. Fix broken paths and anchors (404 + homepage cookie banner).
4. Harden SW strategy (request filtering, cache policy by type, failed-response guards).
5. Reduce source/minified file duplication risk through release automation.

### License
This project is released under the MIT License. See the `LICENSE` file for details.
