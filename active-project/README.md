# KP_Code Digital Vault (e-commerce-02)

Frontend-only, single-page application (SPA) built in Vanilla JavaScript for an e-commerce experience focused on digital products. The project runs entirely on the client side and uses a hash-based router with modular views.

## Status projektu
Projekt w trakcie rozwoju (in progress). Funkcjonalności, treści i widoki są rozwijane etapowo.

## Kluczowe cechy
- Hash-based SPA z lazy-loadem widoków i obsługą fallbacku 404.
- Dane produktowe i licencyjne z plików JSON (`data/`).
- Koszyk i sesja użytkownika w trybie demo (localStorage).
- Przełączanie jasnego/ciemnego motywu z zapisem preferencji.
- Service Worker + `offline.html` (cache app shell i fallback offline).
- Wbudowane komunikaty toast i modal (UI feedback) oraz error boundary.

## Stack technologiczny
- HTML5, CSS3 (custom properties), Vanilla JS (ESM).
- Hash-based router i ręczne renderowanie widoków.
- Narzędzia jakości: ESLint, Prettier, html-validate.
- Testy: Vitest + skrypty node w `tests/`.
- Skrypty build/minify w Node.js (CSSO, Terser).

## Struktura projektu
Najważniejsze katalogi i pliki:

```
active-project/
├── index.html
├── offline.html
├── sw.js
├── site.webmanifest
├── styles/
├── js/
├── data/
├── assets/
├── products/
├── legal/
├── scripts/
├── tests/
└── docs/
```

Opis wybranych katalogów:
- `index.html` — punkt wejścia aplikacji (shell + mount pointy dla header/main/footer).
- `js/` — logika aplikacji (routing, widoki, komponenty, usługi, store, utils).
- `styles/` — tokeny, style bazowe, layouty, komponenty oraz motywy.
- `data/` — dane JSON używane przez mock API.
- `assets/` — grafiki, fonty, favicony, pliki statyczne.
- `products/` — materiały dla przykładowych produktów (np. Core UI Components Pack).
- `legal/` — statyczne podstrony prawne w HTML.
- `scripts/` — build i narzędzia pomocnicze (minifikacja, eksporty).
- `tests/` — testy jednostkowe i pomocnicze skrypty testowe.
- `docs/` — dokumenty robocze projektu.

## Uruchomienie lokalne
1. Zainstaluj zależności: `npm install`
2. Uruchom serwer statyczny: `npm run serve`
3. (Opcjonalnie) Zbuduj wersję produkcyjną: `npm run build`
4. (Opcjonalnie) Serwuj `dist/`: `npm run serve:dist`

## Architektura i routing SPA
- Routing działa w oparciu o hash (`#/path`) i jest zdefiniowany w `js/router/`.
- `registerRoutes()` rejestruje trasy, a `startRouter()` obsługuje renderowanie i lifecycle widoków.
- Lazy-loading widoków realizowany jest przez dynamiczny import modułów `js/pages/*`.

Dodanie nowego widoku:
1. Utwórz moduł w `js/pages/` (np. `newView.js`).
2. Dodaj trasę w `js/router/routes.js` z odpowiednim `pattern` i loaderem.
3. Zarejestruj metadane dla SEO w `js/content/pl.js` (sekcja `meta`).

## Komponenty i organizacja kodu
- `js/components/` — komponenty UI (header, footer, toast, modal, karty produktu).
- `js/pages/` — widoki routowane (home, products, cart, checkout, account, itp.).
- `js/services/` — logika domenowa i integracje lokalne (auth demo, cart, storage).
- `js/store/` — prosty store stanu aplikacji + selektory i akcje.
- `js/utils/` — narzędzia wspierające (DOM, nawigacja, error boundary, meta).
- `js/content/` — centralne źródło treści UI (PL).

## Styl, design tokens, tryby kolorystyczne
- `styles/tokens.css` definiuje tokeny (kolory, typografia, spacing, radiusy, cienie).
- `styles/themes.css` zawiera wariant dark mode oparty o `data-theme` na `:root`.
- `js/theme.js` i `js/theme-init.js` zarządzają inicjalizacją i zapisem preferencji motywu.
- `styles/base.css`, `layout.css`, `components.css` budują bazową warstwę UI.

## Quality & zasady projektowe
- Brak frameworków: czysty Vanilla JS + moduły ESM.
- Spójne linting/formatowanie: ESLint, Prettier, html-validate.
- Testy jednostkowe uruchamiane przez Vitest oraz skrypty node.
- Stabilność UI: error boundary i fallback offline w Service Workerze.

## Roadmap (Next)
- Uzupełnienie treści dla placeholderów (Pricing, Updates, Docs, FAQ, Support, Careers).
- Rozwinięcie strony Roadmap i About w oparciu o przygotowane widoki.
- Dalsze dopracowanie sekcji usług i case studies (treści + struktura danych).
- Rozbudowa biblioteki i widoków produktu o kolejne przykłady.
- Ujednolicenie i rozszerzenie treści w `js/content/pl.js`.
- Doprecyzowanie ścieżek administracyjnych po stronie backendu (obecnie zablokowane w trybie demo).

## Licencja
Repozytorium zawiera licencję MIT w katalogu głównym (`LICENSE`).

## Autor / projekt
KP_Code / Kamil Król.

---

# KP_Code Digital Vault (e-commerce-02)

Frontend-only, single-page application (SPA) built in Vanilla JavaScript for an e-commerce experience focused on digital products. The project runs entirely on the client side and uses a hash-based router with modular views.

## Project status
In progress. Features, content, and views are being developed iteratively.

## Key features
- Hash-based SPA with lazy-loaded views and a 404 fallback.
- Product and license data loaded from JSON files (`data/`).
- Demo-only user session and cart stored in localStorage.
- Light/dark theme switching with persisted preference.
- Service Worker + `offline.html` (app shell cache and offline fallback).
- Built-in toast and modal UI feedback plus an error boundary.

## Tech stack
- HTML5, CSS3 (custom properties), Vanilla JS (ESM).
- Hash-based router with manual view rendering.
- Quality tooling: ESLint, Prettier, html-validate.
- Tests: Vitest + Node scripts in `tests/`.
- Build/minify scripts in Node.js (CSSO, Terser).

## Project structure
Key directories and files:

```
active-project/
├── index.html
├── offline.html
├── sw.js
├── site.webmanifest
├── styles/
├── js/
├── data/
├── assets/
├── products/
├── legal/
├── scripts/
├── tests/
└── docs/
```

Directory roles:
- `index.html` — app entry point (shell + mount points for header/main/footer).
- `js/` — application logic (routing, views, components, services, store, utils).
- `styles/` — tokens, base styles, layouts, components, and themes.
- `data/` — JSON data used by the mock API.
- `assets/` — images, fonts, favicons, static files.
- `products/` — materials for sample products (e.g., Core UI Components Pack).
- `legal/` — static legal HTML pages.
- `scripts/` — build and helper scripts (minification, exports).
- `tests/` — unit tests and helper test scripts.
- `docs/` — working project documentation.

## Local development
1. Install dependencies: `npm install`
2. Run a static server: `npm run serve`
3. (Optional) Build a production bundle: `npm run build`
4. (Optional) Serve `dist/`: `npm run serve:dist`

## SPA architecture and routing
- Routing is hash-based (`#/path`) and defined in `js/router/`.
- `registerRoutes()` registers route patterns, while `startRouter()` handles view rendering and lifecycles.
- Lazy-loading is done via dynamic imports of `js/pages/*` modules.

Adding a new view:
1. Create a module in `js/pages/` (e.g., `newView.js`).
2. Register it in `js/router/routes.js` with a `pattern` and loader.
3. Add SEO metadata in `js/content/pl.js` (the `meta` section).

## Components and code organization
- `js/components/` — UI components (header, footer, toast, modal, product cards).
- `js/pages/` — routed views (home, products, cart, checkout, account, etc.).
- `js/services/` — domain logic and local integrations (demo auth, cart, storage).
- `js/store/` — lightweight state store with selectors and actions.
- `js/utils/` — supporting utilities (DOM, navigation, error boundary, meta).
- `js/content/` — centralized UI copy (PL).

## Styling, design tokens, color modes
- `styles/tokens.css` defines tokens (colors, typography, spacing, radii, shadows).
- `styles/themes.css` provides dark mode via `data-theme` on `:root`.
- `js/theme.js` and `js/theme-init.js` handle theme initialization and persistence.
- `styles/base.css`, `layout.css`, `components.css` build the UI layer.

## Quality & project principles
- Framework-free: pure Vanilla JS with ESM modules.
- Consistent linting/formatting: ESLint, Prettier, html-validate.
- Unit tests via Vitest plus Node-based scripts.
- UI stability: error boundary and offline fallback through Service Worker.

## Roadmap (Next)
- Fill in placeholder content (Pricing, Updates, Docs, FAQ, Support, Careers).
- Expand the Roadmap and About views based on existing screens.
- Further refine services and case studies (content + data structure).
- Extend the library and product views with additional examples.
- Normalize and expand copy in `js/content/pl.js`.
- Define backend admin verification flow (currently blocked in demo mode).

## License
The repository includes an MIT license in the root `LICENSE` file.

## Author / project
KP_Code / Kamil Król.
