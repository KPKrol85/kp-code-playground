# Outland Gear

## PL (wersja podstawowa)

### Przegląd projektu
Outland Gear to statyczny serwis front-end typu MPA (multi-page application) oparty na HTML, CSS i JavaScript (ES Modules). Implementacja obejmuje stronę główną, listing kategorii, kartę produktu, koszyk, checkout oraz strony informacyjne/prawne.

### Kluczowe funkcje (potwierdzone w repozytorium)
- Wielostronicowa nawigacja: `index`, `kategoria`, `produkt`, `koszyk`, `checkout`, `o-nas`, `kontakt`, `regulamin`, `polityka-prywatnosci`.
- Dynamiczny listing produktów: filtrowanie, sortowanie, wyszukiwanie po URL (`?q=`), przycisk „Pokaż więcej”.
- Dynamiczna karta produktu: aktualizacja danych produktu po `slug`, galeria miniatur, tabela specyfikacji, sekcja „Często kupowane razem”.
- Koszyk oparty o `localStorage` oraz globalny licznik koszyka w nagłówku.
- Checkout demo z walidacją formularza i komunikatami błędów przy polach.
- Podstawy SEO: `canonical`, Open Graph, Twitter Card, `robots.txt`, `sitemap.xml`, JSON-LD na kluczowych stronach.
- Podstawy dostępności: skip-link, focus-visible, `aria-expanded`/`aria-hidden`, `aria-current`, live region dla toastów.

### Tech stack
- HTML5
- CSS3 (tokeny + warstwy `base`, `layout`, `components`, `pages`)
- Vanilla JavaScript (ES Modules)
- Lokalne pliki danych JSON (`data/products.json`, `data/categories.json`)
- Zasoby SVG (`assets/svg`)

### Struktura projektu
- Strony: pliki `*.html` w katalogu głównym projektu.
- Style: `css/main.css` i importowane moduły stylów.
- Logika: `js/app.js`, `js/config.js`, `js/utils.js`, `js/modules/*.js`.
- Dane: `data/products.json`, `data/categories.json`.
- SEO/deploy static: `robots.txt`, `sitemap.xml`.

### Setup i uruchomienie
`package.json` nie występuje w projekcie, więc nie ma skryptów npm.

Przykładowe uruchomienie lokalne:
1. `cd audit-pr/pr-02-outlandgear`
2. `python -m http.server 8000`
3. Otwórz `http://localhost:8000/index.html`

### Build / deployment notes
- Nie wykryto konfiguracji bundlera/frameworka.
- Nie wykryto plików `_headers`, `_redirects`, `netlify.toml`, `vercel.json`.
- Nie wykryto service workera ani manifestu.
- Projekt jest przygotowany do hostingu statycznych plików.

### Accessibility notes
- Skip link prowadzi do `#main` na stronach.
- Globalny styl `:focus-visible` jest zdefiniowany.
- Drawer mobilny ma focus trap i zamykanie klawiszem `Escape`.
- Dropdown i drawer synchronizują stany ARIA (`aria-expanded`, `aria-hidden`).
- Checkout przenosi fokus na pierwsze niepoprawne pole i oznacza je `aria-invalid`.
- Dla `kategoria`, `produkt`, `koszyk` są komunikaty `noscript`, ale kluczowe treści e-commerce nadal zależą od JavaScript.

### SEO notes
- Główne strony mają `title`, `meta description`, `canonical`, OG/Twitter.
- `robots.txt` istnieje i wskazuje `sitemap.xml`.
- `sitemap.xml` zawiera główne podstrony.
- JSON-LD występuje na kluczowych stronach (`Organization` + typ strony).
- Strony prawne również zawierają metadata OG/Twitter oraz JSON-LD.

### Performance notes
- Obrazy w HTML mają jawne `width`/`height`.
- Obrazy tworzone przez JS również dostają `width`/`height`.
- Lazy loading występuje m.in. na listingu i banerze.
- CSS jest ładowany przez łańcuch `@import` (potencjalny waterfall render-blocking).
- Brak ciężkich bibliotek JS po stronie klienta.

### Roadmap
1. Ujednolicić metadata SEO na stronach prawnych.
2. Ograniczyć koszt ładowania CSS przez strategię bundling/preload.
3. Dodać czytelny UI fallback dla błędów `fetch` danych produktów.
4. Rozszerzyć no-JS fallback dla krytycznych ścieżek e-commerce.
5. Dopracować semantykę menu dropdown (nawigacja linkowa vs wzorzec `menuitem`).

### Licencja
Plik `LICENSE` nie został wykryty w katalogu projektu.

---

## EN (English version)

### Project overview
Outland Gear is a static multi-page front-end site built with HTML, CSS, and JavaScript (ES Modules). The implementation includes a homepage, category listing, product detail page, cart, checkout, and informational/legal pages.

### Key features (repository-evidenced)
- Multi-page navigation: `index`, `kategoria`, `produkt`, `koszyk`, `checkout`, `o-nas`, `kontakt`, `regulamin`, `polityka-prywatnosci`.
- Dynamic product listing: filtering, sorting, URL-based search (`?q=`), and “Load more”.
- Dynamic product page: slug-based product state, thumbnail gallery, specs table, related products.
- `localStorage` cart with shared cart counter in header.
- Demo checkout with client-side validation and per-field error messaging.
- SEO baseline: `canonical`, Open Graph, Twitter tags, `robots.txt`, `sitemap.xml`, JSON-LD on core pages.
- Accessibility baseline: skip link, focus-visible styling, ARIA state toggles, `aria-current`, live toast region.

### Tech stack
- HTML5
- CSS3 (tokens + `base/layout/components/pages` layers)
- Vanilla JavaScript (ES Modules)
- Local JSON data files (`data/products.json`, `data/categories.json`)
- SVG assets (`assets/svg`)

### Structure overview
- Pages: top-level `*.html` files.
- Styles: `css/main.css` and imported CSS modules.
- Scripts: `js/app.js`, `js/config.js`, `js/utils.js`, `js/modules/*.js`.
- Data: `data/products.json`, `data/categories.json`.
- SEO/static hosting files: `robots.txt`, `sitemap.xml`.

### Setup & run
`package.json` is not present, so npm scripts are unavailable.

Example local run:
1. `cd audit-pr/pr-02-outlandgear`
2. `python -m http.server 8000`
3. Open `http://localhost:8000/index.html`

### Build / deployment notes
- No bundler/framework configuration detected.
- No `_headers`, `_redirects`, `netlify.toml`, or `vercel.json` files detected.
- No service worker or web app manifest detected.
- The repository is structured for static file hosting.

### Accessibility notes
- Skip link points to `#main`.
- Global `:focus-visible` styling is implemented.
- Mobile drawer has focus trapping and `Escape` close handling.
- Dropdown/drawer update ARIA state attributes (`aria-expanded`, `aria-hidden`).
- Checkout moves focus to the first invalid field and applies `aria-invalid`.
- `kategoria`, `produkt`, and `koszyk` provide `noscript` notices, but core e-commerce rendering still relies on JavaScript.

### SEO notes
- Core pages include `title`, `meta description`, `canonical`, OG/Twitter tags.
- `robots.txt` exists and references `sitemap.xml`.
- `sitemap.xml` lists core pages.
- JSON-LD is present on core pages (`Organization` + page schema type).
- Legal pages also include OG/Twitter metadata and JSON-LD blocks.

### Performance notes
- HTML images include explicit `width`/`height`.
- JS-created images also include explicit dimensions.
- Lazy loading is used (e.g., listing/banner).
- CSS is composed via `@import`, which can increase render-blocking waterfall risk.
- No heavy third-party runtime JS libraries were detected.

### Roadmap
1. Align SEO metadata coverage on legal pages.
2. Reduce CSS loading overhead with bundling/preload strategy.
3. Add user-facing UI fallback for `fetch` failures.
4. Strengthen no-JS fallback for critical e-commerce flows.
5. Refine dropdown semantics (navigational links vs `menuitem` pattern).

### License
No `LICENSE` file was detected in this project directory.
