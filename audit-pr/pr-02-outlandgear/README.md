# Outland Gear

## PL (wersja polska)

### Przegląd projektu
Outland Gear to statyczny serwis front-end typu MPA (multi-page app) zbudowany na HTML, CSS i Vanilla JS (ES Modules). Repozytorium zawiera stronę główną, listing, kartę produktu, koszyk, checkout oraz strony informacyjne/prawne.  
Dowody: `index.html`, `kategoria.html`, `produkt.html`, `koszyk.html`, `checkout.html`, `o-nas.html`, `kontakt.html`, `regulamin.html`, `polityka-prywatnosci.html`.

### Kluczowe funkcje (tylko wykryte w kodzie)
- Wielostronicowa nawigacja + aktywne stany `aria-current` na podstronach. (`kategoria.html:95`, `kontakt.html:97`)
- Dynamiczny listing produktów (filtrowanie/sortowanie/search po query string + load more). (`kategoria.html:141-225`, `js/modules/catalog.js:33-103`, `js/modules/catalog.js:205-218`)
- Dynamiczny koszyk oparty o `localStorage`. (`js/modules/storage.js:39-57`, `js/modules/cart.js:44-83`)
- Formularz kontaktowy i checkout z walidacją po stronie klienta. (`kontakt.html:139-167`, `js/modules/form-ux.js:72-87`, `checkout.html:133-210`)
- SEO baseline: canonical, OG, Twitter, robots, sitemap, JSON-LD. (`index.html:11-25`, `index.html:27-50`, `robots.txt:1-3`, `sitemap.xml:1-30`)

### Tech stack
- HTML5 (MPA)
- CSS (tokeny + modularny podział przez `@import`) (`css/main.css:1-17`, `css/tokens.css:1-37`)
- Vanilla JavaScript (ES Modules) (`js/app.js:1-34`)
- Narzędzia build: PostCSS, cssnano, esbuild (`package.json:6-17`)

### Struktura projektu
- Strony: pliki HTML w katalogu głównym projektu.
- Style: `css/main.css` + `css/base.css`, `css/layout.css`, `css/components/*`, `css/pages/*`.
- Skrypty: `js/app.js`, `js/config.js`, `js/modules/*`.
- Dane: `data/products.json`, `data/categories.json`.
- SEO/deploy static: `robots.txt`, `sitemap.xml`.

### Setup i uruchomienie
1. `cd audit-pr/pr-02-outlandgear`
2. `npm install`
3. Build: `npm run build`
4. Lokalny podgląd (przykład): `python -m http.server 8000`
5. Otwórz `http://localhost:8000/index.html`

### Build / deployment notes
- Skrypty build istnieją i generują `css/main.min.css` oraz `js/app.min.js`. (`package.json:6-10`)
- Aktualnie HTML ładuje **nieminiowane** entrypointy: `css/main.css`, `js/app.js`. (`index.html:26`, `index.html:269`)
- Brak wykrytych plików `_headers`, `_redirects`, `netlify.toml`, `vercel.json`.
- Brak wykrytego service workera i brak manifestu PWA.

### Accessibility notes
- Obecny skip link i focus-visible. (`index.html:53`, `css/base.css:57-62`, `css/base.css:103-117`)
- Drawer mobilny ma `aria-expanded`/`aria-hidden`, focus trap i ESC. (`index.html:72`, `index.html:106-107`, `js/modules/nav.js:65-125`)
- Preferencja reduced motion obsłużona w tokenach CSS. (`css/tokens.css:39-47`)
- No-JS baseline jest częściowy: listing/produkt/koszyk pokazują komunikaty, ale kluczowe treści e-commerce są renderowane JS-em. (`kategoria.html:213-220`, `produkt.html:124-131`, `koszyk.html:135-140`)

### SEO notes
- Meta description/canonical/OG/Twitter obecne na głównych podstronach. (`index.html:7`, `index.html:11`, `index.html:13-25`)
- `og:url` jest zgodny z canonical na analizowanych stronach. (`index.html:11`, `index.html:18`)
- JSON-LD występuje jako `Organization` + typ strony. (`index.html:27-50`, `kategoria.html:27-50`, `kontakt.html:27-50`)
- robots i sitemap obecne i spójne. (`robots.txt:1-3`, `sitemap.xml:1-30`)

### Performance notes
- Obrazy mają deklarowane `width`/`height` w HTML i przy renderze JS. (`index.html:136`, `produkt.html:137`, `js/modules/catalog.js:116-117`)
- Lazy loading jest używany w części obrazów (np. miniatury/grafiki listingowe). (`produkt.html:141-147`, `js/modules/catalog.js:114`)
- CSS przez łańcuch `@import` może zwiększać koszt pierwszego renderu. (`css/main.css:1-17`)
- W projekcie nie wykryto zewnętrznych frameworków runtime JS.

### Roadmap (evidence-based)
1. Naprawić krytyczne błędy runtime w `js/modules/product.js`, `js/modules/cart.js`, `js/modules/checkout.js`.
2. Ograniczyć waterfall CSS (prefabrykowany bundle / krytyczny CSS).
3. Rozszerzyć no-JS fallback o realną, czytelną treść produktów.
4. Ujednolicić i odchudzić powtarzany header/footer między stronami.
5. Dodać automatyczne kontrole jakości (lint/test statyczny HTML/JS).

### Licencja
`LICENSE` nie został wykryty w katalogu projektu.

---

## EN (English version)

### Project overview
Outland Gear is a static multi-page front-end website built with HTML, CSS, and Vanilla JS (ES Modules). The repository includes a homepage, listing, product page, cart, checkout, and legal/informational pages.  
Evidence: `index.html`, `kategoria.html`, `produkt.html`, `koszyk.html`, `checkout.html`, `o-nas.html`, `kontakt.html`, `regulamin.html`, `polityka-prywatnosci.html`.

### Key features (repository-evidenced only)
- Multi-page navigation with `aria-current` on active pages. (`kategoria.html:95`, `kontakt.html:97`)
- Dynamic product listing (URL search/filter/sort/load more). (`kategoria.html:141-225`, `js/modules/catalog.js:33-103`, `js/modules/catalog.js:205-218`)
- LocalStorage-backed cart. (`js/modules/storage.js:39-57`, `js/modules/cart.js:44-83`)
- Client-side validated contact and checkout forms. (`kontakt.html:139-167`, `js/modules/form-ux.js:72-87`, `checkout.html:133-210`)
- SEO baseline: canonical, OG/Twitter tags, robots, sitemap, JSON-LD. (`index.html:11-25`, `index.html:27-50`, `robots.txt:1-3`, `sitemap.xml:1-30`)

### Tech stack
- HTML5 (MPA)
- CSS (tokenized + modular imports) (`css/main.css:1-17`, `css/tokens.css:1-37`)
- Vanilla JavaScript ES Modules (`js/app.js:1-34`)
- Build tooling: PostCSS, cssnano, esbuild (`package.json:6-17`)

### Structure overview
- Pages: top-level HTML files.
- Styles: `css/main.css`, `css/base.css`, `css/layout.css`, `css/components/*`, `css/pages/*`.
- Scripts: `js/app.js`, `js/config.js`, `js/modules/*`.
- Data: `data/products.json`, `data/categories.json`.
- SEO/static hosting: `robots.txt`, `sitemap.xml`.

### Setup & run
1. `cd audit-pr/pr-02-outlandgear`
2. `npm install`
3. Build: `npm run build`
4. Local preview example: `python -m http.server 8000`
5. Open `http://localhost:8000/index.html`

### Build / deployment notes
- Build scripts generate `css/main.min.css` and `js/app.min.js`. (`package.json:6-10`)
- Current HTML loads non-minified entries (`css/main.css`, `js/app.js`). (`index.html:26`, `index.html:269`)
- No `_headers`, `_redirects`, `netlify.toml`, or `vercel.json` detected.
- No service worker and no PWA manifest detected.

### Accessibility notes
- Skip link and focus-visible styles are implemented. (`index.html:53`, `css/base.css:57-62`, `css/base.css:103-117`)
- Mobile drawer includes ARIA state sync, focus trapping, and Escape close handling. (`index.html:72`, `index.html:106-107`, `js/modules/nav.js:65-125`)
- Reduced-motion preference is supported. (`css/tokens.css:39-47`)
- No-JS baseline is partial: listing/product/cart rely on JS for core ecommerce content. (`kategoria.html:213-220`, `produkt.html:124-131`, `koszyk.html:135-140`)

### SEO notes
- Meta description/canonical/OG/Twitter are present on core pages. (`index.html:7`, `index.html:11`, `index.html:13-25`)
- `og:url` aligns with canonical on reviewed pages. (`index.html:11`, `index.html:18`)
- JSON-LD is present (`Organization` + page type). (`index.html:27-50`, `kategoria.html:27-50`, `kontakt.html:27-50`)
- robots and sitemap are present and consistent. (`robots.txt:1-3`, `sitemap.xml:1-30`)

### Performance notes
- Images define width/height in HTML and JS-generated cards. (`index.html:136`, `produkt.html:137`, `js/modules/catalog.js:116-117`)
- Lazy loading is used on product/gallery/listing images. (`produkt.html:141-147`, `js/modules/catalog.js:114`)
- CSS `@import` chain can add render-blocking waterfall risk. (`css/main.css:1-17`)
- No heavy third-party runtime framework detected.

### Roadmap
1. Fix critical runtime errors in `js/modules/product.js`, `js/modules/cart.js`, and `js/modules/checkout.js`.
2. Reduce CSS loading waterfall.
3. Improve meaningful no-JS fallback for ecommerce views.
4. Reduce repeated header/footer markup.
5. Add automated static quality checks.

### License
No `LICENSE` file detected in this project directory.
