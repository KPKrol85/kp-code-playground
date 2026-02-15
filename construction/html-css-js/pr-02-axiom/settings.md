# settings.md

## npm scripts

### `img:build`
- **Command:** `node tools/images/build-images.mjs`
- **What it does:** generuje/aktualizuje zoptymalizowane warianty obrazów (m.in. AVIF/WEBP i wersje responsywne) zgodnie z logiką skryptu.
- **When to use:** po dodaniu nowych obrazów źródłowych lub po zmianach strategii optymalizacji grafik.

### `img:clean`
- **Command:** `node tools/images/build-images.mjs --clean`
- **What it does:** czyści artefakty wygenerowane przez pipeline obrazów.
- **When to use:** przed pełnym przebudowaniem obrazów lub przy porządkowaniu outputu.

### `build:css`
- **Command:** `node tools/css/build-css.mjs`
- **What it does:** buduje produkcyjny CSS do `dist/style.min.css`.
- **When to use:** po zmianach w `css/` przed testami wydajności/deployem.

### `min:css`
- **Command:** `npm run build:css`
- **What it does:** alias do `build:css`.
- **When to use:** gdy wymagane jest spójne nazewnictwo „minifikacji” CSS w workflow.

### `build:js`
- **Command:** `node tools/js/build-js.mjs`
- **What it does:** buduje produkcyjny JavaScript do `dist/script.min.js`.
- **When to use:** po zmianach w `js/` przed uruchomieniem strony produkcyjnej.

### `build`
- **Command:** `npm run build:css && npm run build:js`
- **What it does:** wykonuje pełny build assetów front-end.
- **When to use:** standardowo przed deployem lub po większych zmianach.

### `serve`
- **Command:** `http-server -c-1 -p 8080`
- **What it does:** uruchamia lokalny serwer statyczny na porcie `8080` bez cache po stronie serwera.
- **When to use:** lokalny podgląd projektu i testy manualne.

### `qa:lighthouse`
- **Command:** `mkdir -p reports/lighthouse && lhci collect --url=http://localhost:8080/ --url=http://localhost:8080/services/budowa-domow.html --url=http://localhost:8080/legal/regulamin.html --outputDir=reports/lighthouse`
- **What it does:** uruchamia Lighthouse CI dla zdefiniowanych URL i zapisuje raporty do `reports/lighthouse`.
- **When to use:** okresowa kontrola jakości performance/SEO/a11y/best-practices.

### `qa:a11y`
- **Command:** `mkdir -p reports/pa11y && pa11y http://localhost:8080/ --reporter json --output reports/pa11y/index.json && pa11y http://localhost:8080/services/budowa-domow.html --reporter json --output reports/pa11y/budowa-domow.json && pa11y http://localhost:8080/legal/regulamin.html --reporter json --output reports/pa11y/regulamin.json`
- **What it does:** uruchamia skan dostępności Pa11y dla trzech stron i zapisuje raporty JSON w `reports/pa11y`.
- **When to use:** przy audytach dostępności i przed publikacją zmian UI.

### `qa`
- **Command:** `npm run qa:lighthouse && npm run qa:a11y`
- **What it does:** wykonuje pełny pakiet QA (Lighthouse + Pa11y).
- **When to use:** pełna walidacja jakościowa przed deployem.
