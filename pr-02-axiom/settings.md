# settings.md

## package.json scripts

### img:build
- **Command:** `node tools/images/build-images.mjs`
- **What it does:** Generuje zoptymalizowane warianty obrazów (pipeline obrazów).
- **When to use:** Po zmianie plików graficznych przed buildem release.

### img:clean
- **Command:** `node tools/images/build-images.mjs --clean`
- **What it does:** Czyści wygenerowane artefakty pipeline obrazów.
- **When to use:** Przed pełnym, czystym przebiegiem przetwarzania obrazów.

### build:clean
- **Command:** `node tools/release/clean-dist.mjs`
- **What it does:** Czyści katalog `dist`.
- **When to use:** Na początku pełnego builda.

### build:css
- **Command:** `node tools/css/build-css.mjs`
- **What it does:** Buduje/minifikuje CSS do paczki dystrybucyjnej.
- **When to use:** Po zmianach w `css/` lub jako część `build`.

### min:css
- **Command:** `npm run build:css`
- **What it does:** Alias do `build:css`.
- **When to use:** Gdy używana jest historyczna nazwa komendy.

### build:js
- **Command:** `node tools/js/build-js.mjs`
- **What it does:** Buduje/minifikuje JavaScript do paczki dystrybucyjnej.
- **When to use:** Po zmianach w `js/` lub jako część `build`.

### build:sw
- **Command:** `node tools/sw/build-sw.mjs`
- **What it does:** Generuje finalny `sw.js` z szablonu i rewizji.
- **When to use:** Po zmianach w `sw.template.js` lub assetach cache pre-load.

### build:dist
- **Command:** `node tools/release/build-dist.mjs`
- **What it does:** Składa finalną strukturę artefaktów dystrybucyjnych.
- **When to use:** Po `build:css`, `build:js`, `build:sw`, przed wdrożeniem.

### build
- **Command:** `npm run build:clean && npm run build:css && npm run build:js && npm run build:sw && npm run build:dist`
- **What it does:** Uruchamia pełny pipeline build.
- **When to use:** Standardowo przed publikacją.

### serve
- **Command:** `http-server -c-1 -p 8080`
- **What it does:** Serwuje bieżący katalog projektu bez cache na porcie 8080.
- **When to use:** Lokalny podgląd drzewa roboczego.

### serve:dist
- **Command:** `http-server dist -c-1 -p 8080`
- **What it does:** Serwuje wyłącznie katalog `dist` bez cache.
- **When to use:** Weryfikacja finalnej paczki build.

### qa:lighthouse
- **Command:** `if not exist reports\lighthouse mkdir reports\lighthouse && lhci collect --url=http://localhost:8080/ --url=http://localhost:8080/services/budowa-domow.html --url=http://localhost:8080/legal/regulamin.html --outputDir=reports/lighthouse`
- **What it does:** Generuje raporty Lighthouse CI dla 3 URL.
- **When to use:** Audyt performance/SEO/a11y przed release.
- **Note:** Polecenie używa składni Windows (`if not exist`).

### qa:a11y
- **Command:** `if not exist reports\pa11y mkdir reports\pa11y && pa11y http://localhost:8080/ --reporter json > reports/pa11y/index.json && pa11y http://localhost:8080/services/budowa-domow.html --reporter json > reports/pa11y/budowa-domow.json && pa11y http://localhost:8080/legal/regulamin.html --reporter json > reports/pa11y/regulamin.json`
- **What it does:** Uruchamia pa11y i zapisuje raporty JSON dla 3 URL.
- **When to use:** Kontrola dostępności w QA.
- **Note:** Polecenie używa składni Windows (`if not exist`).

### qa
- **Command:** `npm run qa:lighthouse && npm run qa:a11y`
- **What it does:** Uruchamia cały zestaw QA (Lighthouse + pa11y).
- **When to use:** Jako quality gate przed publikacją.

### build:head
- **Command:** `node tools/html/build-head.mjs`
- **What it does:** Aktualizuje sekcje `<head>` na stronach wg szablonu i metadanych.
- **When to use:** Po zmianach globalnych SEO/head.
