# Outland Gear — Dokumentacja projektu

## PL (wersja podstawowa)

### Przegląd projektu
Outland Gear to statyczny, wielostronicowy front-end sklepu outdoor/travel, zbudowany w Vanilla HTML/CSS/JS (ES Modules). Aplikacja renderuje katalog i kartę produktu na podstawie lokalnych plików JSON, obsługuje koszyk w `localStorage` oraz udostępnia formularz checkout demo.

### Kluczowe funkcje (potwierdzone w kodzie)
- Wielostronicowa nawigacja: strona główna, listing, produkt, koszyk, checkout, o nas, kontakt.
- Dynamiczny listing produktów z filtrowaniem, sortowaniem, wyszukiwarką i przyciskiem „Pokaż więcej”.
- Dynamiczna karta produktu (parametry, galeria miniatur, sekcja produktów powiązanych).
- Koszyk klienta z zapisem w `localStorage` i aktualizacją licznika globalnego.
- Checkout demo z walidacją formularza i panelem sukcesu.
- Podstawowe SEO techniczne: `canonical`, `robots.txt`, `sitemap.xml`, JSON-LD (`Organization` / `WebSite`).
- Podstawowe mechanizmy a11y: skip-link, `aria-current`, `aria-expanded`, focus ring, live region toast.

### Tech stack
- HTML5 (strony statyczne, semantyczne sekcje i formularze).
- CSS3 (tokeny design systemu + podział na base/layout/components/pages).
- JavaScript ES Modules (moduły katalogu, produktu, koszyka, checkoutu, nawigacji).
- Dane lokalne: `data/products.json`, `data/categories.json`.

### Struktura projektu
- `index.html`, `kategoria.html`, `produkt.html`, `koszyk.html`, `checkout.html`, `o-nas.html`, `kontakt.html`
- `css/`
  - `tokens.css`, `base.css`, `layout.css`, `main.css`
  - `components/*.css`
  - `pages/*.css`
- `js/`
  - `app.js`, `config.js`, `utils.js`
  - `modules/*.js`
- `data/` (`products.json`, `categories.json`)
- `assets/svg/`
- `robots.txt`, `sitemap.xml`

### Setup i uruchomienie
Brak `package.json` i brak skryptów npm.

Uruchomienie lokalne (serwer statyczny):
1. Wejdź do katalogu projektu `audit-pr/pr-02-outlandgear`.
2. Uruchom serwer, np. `python -m http.server 8000`.
3. Otwórz `http://localhost:8000/index.html`.

### Build i deployment
- Projekt nie zawiera konfiguracji bundlera ani frameworka SPA.
- Nie wykryto plików typu Netlify/Vercel config ani service workera.
- Struktura jest gotowa do hostingu statycznego (np. dowolny serwer plików).

### Notatki accessibility
- Obecny skip link i styl fokusu.
- Nawigacja mobilna i dropdowny aktualizują `aria-expanded`/`aria-hidden`.
- Formularze mają etykiety i komunikaty błędów dla checkoutu.
- Część kluczowych widoków (listing, produkt, koszyk) opiera się na JS do renderu danych; bez JS zawartość dynamiczna jest ograniczona.

### Notatki SEO
- Każda strona ma `title`, `meta description` i `canonical`.
- `robots.txt` wskazuje sitemapę.
- `sitemap.xml` zawiera główne URL-e.
- Nie wykryto Open Graph/Twitter cards.

### Notatki performance
- Obrazy SVG i jawne `width`/`height` dla obrazów.
- Lazy loading dla obrazów kart/listingu i bannera.
- CSS ładowany przez łańcuch `@import` (możliwy koszt render-blocking).
- Brak ciężkich bibliotek zewnętrznych po stronie runtime.

### Roadmap (na podstawie audytu)
1. Uzupełnić Open Graph/Twitter metadata + dedykowany obraz social.
2. Dodać no-JS fallback (`<noscript>` + serwerowy preload treści krytycznej).
3. Dodać klikalne `mailto:` i `tel:` na stronie kontaktowej.
4. Rozbudować dane strukturalne o `Product`/`BreadcrumbList`.
5. Ograniczyć koszt `@import` w CSS (scalenie lub preload krytycznego CSS).

### Licencja
Nie wykryto pliku `LICENSE` w repozytorium projektu.

---

## EN (translated version)

### Project overview
Outland Gear is a static multi-page outdoor/travel storefront built with Vanilla HTML/CSS/JS (ES Modules). The app renders catalog and product content from local JSON files, stores cart data in `localStorage`, and includes a demo checkout form.

### Key features (repository-confirmed)
- Multi-page navigation: home, listing, product, cart, checkout, about, contact.
- Dynamic product listing with filtering, sorting, search, and “load more”.
- Dynamic product page (specs, gallery thumbnails, related products section).
- Customer cart persisted in `localStorage` with shared cart counter updates.
- Demo checkout flow with client-side validation and success panel.
- Baseline technical SEO: `canonical`, `robots.txt`, `sitemap.xml`, JSON-LD (`Organization` / `WebSite`).
- Baseline accessibility features: skip-link, `aria-current`, `aria-expanded`, focus ring, toast live region.

### Tech stack
- HTML5 static pages.
- CSS3 with tokenized design system and layered structure.
- JavaScript ES Modules for feature-level logic.
- Local data sources: `data/products.json`, `data/categories.json`.

### Structure overview
- Pages: `index.html`, `kategoria.html`, `produkt.html`, `koszyk.html`, `checkout.html`, `o-nas.html`, `kontakt.html`
- Styles: `css/` (`tokens`, `base`, `layout`, `components`, `pages`, `main`)
- Scripts: `js/` (`app`, `config`, `utils`, `modules/*`)
- Data: `data/products.json`, `data/categories.json`
- SEO files: `robots.txt`, `sitemap.xml`

### Setup & run
`package.json` is not present, so there are no npm scripts.

Run with any static server:
1. `cd audit-pr/pr-02-outlandgear`
2. Start server (example): `python -m http.server 8000`
3. Open `http://localhost:8000/index.html`

### Build/deployment notes
- No bundler/framework build pipeline is defined.
- No Netlify/Vercel config files or service worker were detected.
- Suitable for static hosting.

### Accessibility notes
- Skip-link and visible focus styling are implemented.
- Mobile drawer/dropdowns update ARIA state.
- Checkout/contact forms include labels and validation messaging.
- Core catalog/product/cart content depends on JS-rendered data, so no-JS behavior is limited.

### SEO notes
- All pages include `title`, `meta description`, and `canonical`.
- `robots.txt` references `sitemap.xml`.
- Sitemap includes main route set.
- No Open Graph/Twitter tags detected.

### Performance notes
- SVG assets and explicit `width`/`height` for images.
- Lazy loading present for listing/banner images.
- CSS is assembled through multiple `@import` directives (potential render-blocking overhead).
- No heavy runtime third-party libraries detected.

### Roadmap
1. Add Open Graph/Twitter metadata and dedicated social image.
2. Add no-JS fallback (`<noscript>` + critical content fallback).
3. Turn contact data into actionable `mailto:`/`tel:` links.
4. Extend structured data with `Product` and `BreadcrumbList`.
5. Reduce CSS `@import` waterfall (bundle or critical CSS strategy).

### License
No `LICENSE` file was detected in this project directory.
