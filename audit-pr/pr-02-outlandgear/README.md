# Outland Gear — Documentation

## PL (wersja podstawowa)

### Przegląd projektu
Outland Gear to statyczny serwis front-end (MPA) oparty o HTML, CSS i JavaScript ES Modules. Kod implementuje katalog produktów, kartę produktu, koszyk i checkout demo z danymi ładowanymi z lokalnych plików JSON.

### Kluczowe funkcje (potwierdzone w repo)
- Wielostronicowa struktura: strona główna, listing, produkt, koszyk, checkout, kontakt, o nas, regulamin i polityka prywatności.
- Dynamiczny listing (filtry, sortowanie, wyszukiwanie, paginacja przyciskiem „Pokaż więcej”).
- Dynamiczna karta produktu z galerią miniatur, specyfikacją i sekcją produktów powiązanych.
- Koszyk oparty o `localStorage` + globalny licznik koszyka.
- Checkout demo z walidacją pól i komunikatami błędów.
- Podstawy SEO technicznego: `canonical`, Open Graph/Twitter (na głównych podstronach), `robots.txt`, `sitemap.xml`, JSON-LD.
- Podstawy dostępności: skip-link, focus ring, `aria-expanded`/`aria-hidden` w nawigacji, `aria-current`, live region dla toastów.

### Tech stack
- HTML5 (statyczne podstrony).
- CSS3 (tokeny + warstwy `base`, `layout`, `components`, `pages`).
- Vanilla JS (ES Modules).
- Lokalne źródła danych JSON (`data/products.json`, `data/categories.json`).
- Zasoby SVG (logo, grafiki produktu, hero/banner, OG placeholder).

### Struktura projektu
- Strony: `index.html`, `kategoria.html`, `produkt.html`, `koszyk.html`, `checkout.html`, `o-nas.html`, `kontakt.html`, `regulamin.html`, `polityka-prywatnosci.html`
- Style: `css/main.css` + importy do `tokens/base/layout/components/pages`
- Logika: `js/app.js`, `js/config.js`, `js/utils.js`, `js/modules/*.js`
- Dane: `data/products.json`, `data/categories.json`
- SEO/deploy static: `robots.txt`, `sitemap.xml`

### Setup i uruchomienie
`package.json` nie występuje w projekcie, więc nie ma skryptów npm.

Przykładowe uruchomienie lokalne:
1. `cd audit-pr/pr-02-outlandgear`
2. `python -m http.server 8000`
3. Otwórz `http://localhost:8000/index.html`

### Build / deployment notes
- Nie wykryto konfiguracji bundlera/frameworka ani pipeline build.
- Nie wykryto konfiguracji Netlify/Vercel ani Service Workera.
- Projekt jest przygotowany jako statyczny serwis do hostingu plików.

### Accessibility notes
- Obecny skip link i globalny styl `:focus-visible`.
- Nawigacja mobilna ma focus trap i zamykanie klawiszem `Escape`.
- Dropdowny i drawer aktualizują `aria-expanded` oraz `aria-hidden`.
- Formularz checkout ustawia `aria-invalid` i skupia fokus na pierwszym błędnym polu.
- Dla listing/produkt/koszyk są fallbacki `noscript`, ale kluczowa zawartość e-commerce pozostaje zależna od JS.

### SEO notes
- Główne strony mają `title`, `meta description`, `canonical`, Open Graph i Twitter metadata.
- `robots.txt` istnieje i wskazuje `sitemap.xml`.
- `sitemap.xml` zawiera komplet głównych podstron.
- JSON-LD (`Organization`, miejscami `WebSite`) jest obecne.
- Strony prawne (`regulamin`, `polityka prywatności`) nie mają bloków OG/Twitter/JSON-LD.

### Performance notes
- Obrazy statyczne mają jawne `width`/`height`; obrazy w JS są tworzone z wymiarami.
- Lazy loading jest stosowany dla obrazów listingu i bannera.
- Brak zewnętrznych bibliotek JS runtime.
- CSS jest ładowany łańcuchem `@import` (potencjalny waterfall render-blocking).

### Roadmap
1. Ujednolicić SEO metadata dla stron prawnych (OG/Twitter/JSON-LD).
2. Ograniczyć koszt ładowania CSS z `@import` (scalenie/preload krytycznego CSS).
3. Rozszerzyć dostępność galerii produktu (np. pełna obsługa klawiatury miniatur).
4. Dodać bezpieczny fallback UI dla błędów `fetch` danych produktów.
5. Rozważyć pełniejszy no-JS fallback dla listingu/produktu/koszyka.

### Licencja
Plik `LICENSE` nie został wykryty w katalogu projektu.

---

## EN (English version)

### Project overview
Outland Gear is a static multi-page front-end website built with HTML, CSS, and JavaScript ES Modules. The implementation includes a product listing, product details page, cart, and a demo checkout flow powered by local JSON files.

### Key features (repository-evidenced)
- Multi-page structure: home, category listing, product, cart, checkout, contact, about, terms, privacy policy.
- Dynamic listing (filters, sorting, search, and “load more”).
- Dynamic product page with thumbnails, specs table, and related products.
- Cart persistence in `localStorage` plus a shared cart counter.
- Demo checkout form with field validation and status messages.
- Technical SEO baseline: `canonical`, Open Graph/Twitter tags (on core pages), `robots.txt`, `sitemap.xml`, JSON-LD.
- Accessibility baseline: skip link, visible focus styling, ARIA state handling in nav, and live toast region.

### Tech stack
- HTML5 static pages.
- CSS3 with tokenized system and layered architecture.
- Vanilla JavaScript (ES Modules).
- Local JSON data files (`data/products.json`, `data/categories.json`).
- SVG assets for UI/marketing/product visuals.

### Structure overview
- Pages: `index.html`, `kategoria.html`, `produkt.html`, `koszyk.html`, `checkout.html`, `o-nas.html`, `kontakt.html`, `regulamin.html`, `polityka-prywatnosci.html`
- Styles: `css/main.css` plus imports to `tokens/base/layout/components/pages`
- Scripts: `js/app.js`, `js/config.js`, `js/utils.js`, `js/modules/*.js`
- Data: `data/products.json`, `data/categories.json`
- SEO/static hosting files: `robots.txt`, `sitemap.xml`

### Setup & run
`package.json` is not present, so npm scripts are not available.

Example local run:
1. `cd audit-pr/pr-02-outlandgear`
2. `python -m http.server 8000`
3. Open `http://localhost:8000/index.html`

### Build / deployment notes
- No bundler/framework build pipeline detected.
- No Netlify/Vercel config files or service worker detected.
- Repository is structured for static hosting.

### Accessibility notes
- Skip link and global `:focus-visible` styles are implemented.
- Mobile drawer implements focus trap and `Escape` close behavior.
- Dropdown and drawer components synchronize ARIA states.
- Checkout validation applies `aria-invalid` and focus management.
- Listing/product/cart include `noscript` notices, but core commerce rendering still depends on JavaScript.

### SEO notes
- Core pages include `title`, `meta description`, `canonical`, Open Graph, and Twitter metadata.
- `robots.txt` exists and references `sitemap.xml`.
- `sitemap.xml` includes all core pages.
- JSON-LD (`Organization`, sometimes `WebSite`) is present.
- Legal pages do not include OG/Twitter/JSON-LD blocks.

### Performance notes
- Static images have explicit `width`/`height`; JS-created images are also assigned dimensions.
- Lazy loading is used in listing/banner flows.
- No runtime-heavy third-party JS libraries were found.
- CSS is composed through `@import`, which can introduce render-blocking request waterfalls.

### Roadmap
1. Align legal pages with the SEO metadata standard (OG/Twitter/JSON-LD).
2. Reduce CSS `@import` waterfall via bundling or critical CSS strategy.
3. Improve product gallery keyboard accessibility patterns.
4. Add robust user-facing fallback for product-data fetch failures.
5. Consider stronger no-JS fallback for core commerce paths.

### License
No `LICENSE` file was detected in this project directory.
