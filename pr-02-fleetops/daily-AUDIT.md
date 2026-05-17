# FleetOps — Daily Front-End Audit

## 1. Short overall assessment

FleetOps is a mature static frontend reference project with a clean source/dist workflow, modular CSS sources, a repeatable production build, optimized hero images, separated logo/icon assets, and a clean npm audit result.

The main remaining production-facing risk is client-side HTML injection from user-editable local demo data rendered through `innerHTML`. Service worker behavior is also not active because registration is not detected.

## 2. Strengths

- Source organization is clear: routing, initialization, state, seed data, layouts, views, and shared UI components are separated under `scripts/`.
- CSS architecture is now source-based: `styles/main.css` imports modular files from `styles/src/`, while production CSS is generated into `dist/styles/main.min.css`.
- Production build is repeatable through `npm run build`, which runs image optimization and generates `dist/`.
- Hero images have a source/output split: editable JPG sources live under `assets/img-src/hero/`, and optimized AVIF/WebP/JPG runtime files live under `assets/img/hero/`.
- Asset taxonomy is clearer: logos are under `assets/logos/`, UI icons are under `assets/icons/`, and specialized favicon/OG/screenshot/shortcut assets remain separate.
- Accessibility implementation includes a skip link, `<noscript>` fallback, ARIA states, focus trapping, Escape handling, visible focus states, and `prefers-reduced-motion` CSS.
- Static deployment support is present through `_redirects`, `_headers`, `robots.txt`, `sitemap.xml`, `404.html`, and metadata in `index.html`.
- Dependency audit is clean: `npm audit` reports `0 vulnerabilities`.

## 3. P0 — Critical risks

none detected

## 4. P1 — Important issues worth fixing next

### P1. User-editable local data is rendered through `innerHTML`

Evidence:

- Orders, fleet, and drivers views read user-editable form values and store them in local application state.
- Those values are later interpolated into HTML strings and rendered through `innerHTML` in `scripts/ui/views/ordersView.js`, `scripts/ui/views/fleetView.js`, and `scripts/ui/views/driversView.js`.
- Shared helpers and modal rendering also allow string-based HTML insertion through `scripts/utils/dom.js` and `scripts/ui/components/modal.js`.

Risk:

This creates a client-side HTML injection risk for data entered through demo forms or restored from `localStorage`. The project is frontend-only, but the rendering layer still treats user-editable strings as HTML instead of text.

Recommendation:

Render user-editable values with `textContent`, build dynamic rows with DOM APIs, or introduce a small escaping helper and use it consistently before interpolation.

## 5. P2 — Minor refinements

### P2. Service worker file is present but not registered

Evidence:

- `sw.js` defines install, activate, and fetch handlers.
- `navigator.serviceWorker.register(...)` is not detected in the source.

Impact:

The cache strategy in `sw.js` has no runtime effect unless registration is handled outside this repository.

Recommendation:

Register `sw.js` intentionally during startup or remove the file if offline/cache behavior is not part of the current project scope.

### P2. Legacy `minify-js.js` remains but is not part of the active workflow

Evidence:

- `package.json` no longer exposes `min:js`.
- `npm run build` minifies active scripts from `scripts/` through `build-dist.js`.
- `minify-js.js` still exists at the repository root.

Impact:

No runtime impact, but the unused script can confuse future maintenance.

Recommendation:

Remove `minify-js.js` in a dedicated cleanup step if it is no longer needed.

## 6. Extra quality improvements

- Add a small smoke-check script for required asset references, manifest shortcut URLs, and route coverage.
- Add a shared HTML escaping or DOM rendering convention for user-editable values.
- Decide whether service worker behavior should be active production behavior or removed from the repository.

## 7. Senior rating (1–10)

8.4/10

FleetOps now has strong static frontend architecture, a clean source/dist workflow, modular CSS, optimized runtime assets, and a healthy dependency audit. The rating is held back mainly by the remaining `innerHTML` rendering risk for user-editable local data and the inactive service worker file.

---

# FleetOps — Dzienny audyt front-end

## 1. Krótka ocena ogólna

FleetOps to dojrzały statyczny projekt referencyjny frontendu z czystym workflow source/dist, modularnymi źródłami CSS, powtarzalnym buildem produkcyjnym, zoptymalizowanymi obrazami hero, rozdzielonymi assetami logo/ikon oraz czystym wynikiem `npm audit`.

Główne pozostałe ryzyko produkcyjne dotyczy client-side HTML injection: lokalne dane demo edytowalne przez użytkownika są renderowane przez `innerHTML`. Zachowanie service workera również nie jest aktywne, ponieważ nie wykryto jego rejestracji.

## 2. Mocne strony

- Organizacja źródeł jest czytelna: routing, inicjalizacja, stan, dane seed, layouty, widoki i współdzielone komponenty UI są rozdzielone w `scripts/`.
- Architektura CSS jest oparta o źródła: `styles/main.css` importuje moduły z `styles/src/`, a CSS produkcyjny jest generowany do `dist/styles/main.min.css`.
- Build produkcyjny jest powtarzalny przez `npm run build`, który uruchamia optymalizację obrazów i generuje `dist/`.
- Obrazy hero mają podział source/output: edytowalne źródła JPG są w `assets/img-src/hero/`, a zoptymalizowane runtime AVIF/WebP/JPG są w `assets/img/hero/`.
- Taksonomia assetów jest czytelniejsza: logo są w `assets/logos/`, ikony UI w `assets/icons/`, a favicony/OG/screenshoty/skróty pozostają osobno.
- Dostępność obejmuje skip link, fallback `<noscript>`, stany ARIA, pułapki fokusu, obsługę Escape, widoczne focus states i `prefers-reduced-motion`.
- Wsparcie statycznego deploymentu jest obecne przez `_redirects`, `_headers`, `robots.txt`, `sitemap.xml`, `404.html` i metadane w `index.html`.
- Audyt zależności jest czysty: `npm audit` raportuje `0 vulnerabilities`.

## 3. P0 — Ryzyka krytyczne

nie wykryto

## 4. P1 — Ważne problemy do naprawy w następnej kolejności

### P1. Dane lokalne edytowalne przez użytkownika są renderowane przez `innerHTML`

Dowody:

- Widoki zleceń, floty i kierowców odczytują wartości z formularzy i zapisują je w lokalnym stanie aplikacji.
- Te wartości są później interpolowane do stringów HTML i renderowane przez `innerHTML` w `scripts/ui/views/ordersView.js`, `scripts/ui/views/fleetView.js` i `scripts/ui/views/driversView.js`.
- Współdzielone helpery i modal również dopuszczają stringowe wstawianie HTML przez `scripts/utils/dom.js` i `scripts/ui/components/modal.js`.

Ryzyko:

Tworzy to ryzyko client-side HTML injection dla danych wpisanych w formularzach demo albo odtworzonych z `localStorage`. Projekt jest frontend-only, ale warstwa renderowania nadal traktuje edytowalne stringi jako HTML zamiast tekstu.

Rekomendacja:

Renderować wartości edytowalne przez użytkownika przez `textContent`, budować dynamiczne wiersze przez DOM API albo wprowadzić mały helper do escapowania i stosować go konsekwentnie przed interpolacją.

## 5. P2 — Drobne usprawnienia

### P2. Plik service workera istnieje, ale nie jest rejestrowany

Dowody:

- `sw.js` definiuje handlery install, activate i fetch.
- `navigator.serviceWorker.register(...)` nie został wykryty w źródłach.

Wpływ:

Strategia cache w `sw.js` nie ma efektu runtime, chyba że rejestracja jest obsługiwana poza tym repozytorium.

Rekomendacja:

Zarejestrować `sw.js` intencjonalnie podczas startu aplikacji albo usunąć plik, jeśli offline/cache nie jest częścią aktualnego zakresu projektu.

### P2. Legacy `minify-js.js` pozostaje w repozytorium, ale nie jest częścią aktywnego workflow

Dowody:

- `package.json` nie wystawia już `min:js`.
- `npm run build` minifikuje aktywne skrypty z `scripts/` przez `build-dist.js`.
- `minify-js.js` nadal istnieje w katalogu głównym repozytorium.

Wpływ:

Brak wpływu runtime, ale nieużywany skrypt może utrudniać przyszłe utrzymanie.

Rekomendacja:

Usunąć `minify-js.js` w osobnym kroku cleanupu, jeśli nie jest już potrzebny.

## 6. Dodatkowe usprawnienia jakościowe

- Dodać mały smoke-check dla wymaganych assetów, URL-i skrótów manifestu i pokrycia tras.
- Wprowadzić wspólną konwencję escapowania HTML albo renderowania DOM dla wartości edytowalnych przez użytkownika.
- Zdecydować, czy service worker ma być aktywnym zachowaniem produkcyjnym, czy powinien zostać usunięty z repozytorium.

## 7. Senior rating (1–10)

8.4/10

FleetOps ma teraz mocną statyczną architekturę frontendu, czysty workflow source/dist, modularny CSS, zoptymalizowane assety runtime i zdrowy audyt zależności. Ocenę obniża głównie pozostałe ryzyko renderowania danych edytowalnych przez `innerHTML` oraz nieaktywny plik service workera.
