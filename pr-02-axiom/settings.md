# settings.md

## package.json scripts

### `img:build`
- **Command:** `node tools/images/build-images.mjs`
- **What it does:** Przetwarza obrazy źródłowe i przygotowuje zoptymalizowane warianty (pipeline obrazów).
- **When to use:** Po dodaniu/zmianie grafik, przed buildem produkcyjnym.

### `img:clean`
- **Command:** `node tools/images/build-images.mjs --clean`
- **What it does:** Czyści wygenerowane artefakty z procesu optymalizacji obrazów.
- **When to use:** Przed pełnym odświeżeniem pipeline obrazów lub podczas porządkowania builda.

### `build:clean`
- **Command:** `node tools/build/clean-dist.mjs`
- **What it does:** Usuwa/czyści katalog wyjściowy builda (`dist`).
- **When to use:** Na początku pełnego builda, aby uniknąć starych artefaktów.

### `build:css`
- **Command:** `node tools/css/build-css.mjs`
- **What it does:** Buduje/minifikuje CSS do artefaktów dystrybucyjnych.
- **When to use:** Po zmianach w `css/` lub jako część pełnego builda.

### `min:css`
- **Command:** `npm run build:css`
- **What it does:** Alias do `build:css`.
- **When to use:** Gdy w zespole/pipeline używana jest historyczna nazwa „min:css”.

### `build:js`
- **Command:** `node tools/js/build-js.mjs`
- **What it does:** Buduje/minifikuje JavaScript do wersji dystrybucyjnej.
- **When to use:** Po zmianach w `js/` lub jako część pełnego builda.

### `build:sw`
- **Command:** `node tools/sw/build-sw.mjs`
- **What it does:** Generuje finalny plik service workera (`sw.js`) na bazie szablonu i rewizji.
- **When to use:** Po zmianach w assetach lub logice offline/cache.

### `build:dist`
- **Command:** `node tools/build/build-dist.mjs`
- **What it does:** Składa finalny katalog dystrybucyjny z wymaganych plików projektu.
- **When to use:** Po zbudowaniu CSS/JS/SW, przed wdrożeniem.

### `build`
- **Command:** `npm run build:clean && npm run build:css && npm run build:js && npm run build:sw && npm run build:dist`
- **What it does:** Wykonuje pełny pipeline builda end-to-end.
- **When to use:** Standardowy build release.

### `serve`
- **Command:** `http-server -c-1 -p 8080`
- **What it does:** Serwuje bieżący katalog projektu na porcie `8080` bez cache.
- **When to use:** Szybki podgląd lokalny drzewa roboczego.

### `serve:dist`
- **Command:** `http-server dist -c-1 -p 8080`
- **What it does:** Serwuje wyłącznie katalog `dist` na porcie `8080` bez cache.
- **When to use:** Walidacja finalnej paczki produkcyjnej.

### `qa:lighthouse`
- **Command:** `if not exist reports\lighthouse mkdir reports\lighthouse && lhci collect --url=http://localhost:8080/ --url=http://localhost:8080/services/budowa-domow.html --url=http://localhost:8080/legal/regulamin.html --outputDir=reports/lighthouse`
- **What it does:** Uruchamia Lighthouse CI dla wskazanych URL i zapisuje raporty.
- **When to use:** Okresowy/per-release audyt wydajności i jakości web vitals.
- **Uwaga:** składnia tworzenia katalogu jest windowsowa.

### `qa:a11y`
- **Command:** `if not exist reports\pa11y mkdir reports\pa11y && pa11y http://localhost:8080/ --reporter json > reports/pa11y/index.json && pa11y http://localhost:8080/services/budowa-domow.html --reporter json > reports/pa11y/budowa-domow.json && pa11y http://localhost:8080/legal/regulamin.html --reporter json > reports/pa11y/regulamin.json`
- **What it does:** Uruchamia pa11y dla wybranych stron i zapisuje wynik JSON.
- **When to use:** Weryfikacja dostępności w pipeline QA.
- **Uwaga:** składnia tworzenia katalogu jest windowsowa.

### `qa`
- **Command:** `npm run qa:lighthouse && npm run qa:a11y`
- **What it does:** Odpala kompletną sekwencję QA (Lighthouse + pa11y).
- **When to use:** Przed wdrożeniem lub jako quality gate w CI.

### `build:head`
- **Command:** `node tools/html/build-head.mjs`
- **What it does:** Automatyzuje/aktualizuje sekcje `<head>` w stronach HTML wg logiki skryptu.
- **When to use:** Po zmianach globalnych metadanych SEO/head lub przy synchronizacji nagłówków między podstronami.
