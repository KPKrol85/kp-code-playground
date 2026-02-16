# settings.md

## npm scripts

### `img:build`
- **Command:** `node tools/images/build-images.mjs`
- **What it does:** generuje zoptymalizowane warianty obrazów (m.in. formaty nowoczesne i wersje responsywne) według reguł ze skryptu.
- **When to use:** po dodaniu nowych grafik, zmianie źródeł obrazów lub zmianie strategii optymalizacji.

### `img:clean`
- **Command:** `node tools/images/build-images.mjs --clean`
- **What it does:** usuwa wygenerowane artefakty obrazów z katalogu wyjściowego pipeline’u.
- **When to use:** przed pełną regeneracją obrazów albo przy porządkowaniu artefaktów builda.

### `build:css`
- **Command:** `node tools/css/build-css.mjs`
- **What it does:** buduje i minifikuje CSS do pliku `dist/style.min.css`.
- **When to use:** po zmianach w katalogu `css/` i przed publikacją/deployem.

### `min:css`
- **Command:** `npm run build:css`
- **What it does:** alias do skryptu `build:css`.
- **When to use:** gdy workflow używa nazwy „min:css”, ale realnie wykonuje ten sam proces co `build:css`.

### `build:js`
- **Command:** `node tools/js/build-js.mjs`
- **What it does:** buduje i minifikuje JavaScript do pliku `dist/script.min.js`.
- **When to use:** po zmianach w katalogu `js/` i przed testami końcowymi/deployem.

### `build:sw`
- **Command:** `node tools/sw/build-sw.mjs`
- **What it does:** generuje finalny `sw.js` (service worker) na podstawie szablonu i rewizji.
- **When to use:** po zmianach w logice SW, liście pre-cache lub przed wydaniem nowej wersji.

### `build`
- **Command:** `npm run build:css && npm run build:js && npm run build:sw`
- **What it does:** uruchamia pełny build front-endu (CSS + JS + SW).
- **When to use:** standardowy krok przed publikacją aplikacji.

### `serve`
- **Command:** `http-server -c-1 -p 8080`
- **What it does:** uruchamia lokalny serwer statyczny na porcie `8080` z wyłączonym cache po stronie serwera.
- **When to use:** do lokalnego QA/manual testing z zachowaniem warunków zbliżonych do produkcyjnego hostingu statycznego.

### `qa:lighthouse`
- **Command:** `mkdir -p reports/lighthouse && lhci collect --url=http://localhost:8080/ --url=http://localhost:8080/services/budowa-domow.html --url=http://localhost:8080/legal/regulamin.html --outputDir=reports/lighthouse`
- **What it does:** zbiera raporty Lighthouse CI dla trzech wskazanych URL i zapisuje je do `reports/lighthouse`.
- **When to use:** do okresowej kontroli wydajności, SEO, accessibility i best practices.

### `qa:a11y`
- **Command:** `mkdir -p reports/pa11y && pa11y http://localhost:8080/ --reporter json --output reports/pa11y/index.json && pa11y http://localhost:8080/services/budowa-domow.html --reporter json --output reports/pa11y/budowa-domow.json && pa11y http://localhost:8080/legal/regulamin.html --reporter json --output reports/pa11y/regulamin.json`
- **What it does:** uruchamia audyt Pa11y dla trzech stron i zapisuje wyniki JSON do `reports/pa11y`.
- **When to use:** przy weryfikacji dostępności przed release oraz po zmianach UI/markup.

### `qa`
- **Command:** `npm run qa:lighthouse && npm run qa:a11y`
- **What it does:** uruchamia pełny pakiet QA (Lighthouse + Pa11y).
- **When to use:** jako końcowy quality gate przed wdrożeniem.
