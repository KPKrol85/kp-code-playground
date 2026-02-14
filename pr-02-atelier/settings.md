# settings.md — npm scripts explanation

Źródło: `package.json` w katalogu projektu.

## Dostępne skrypty

### `build:css`
- **Command:** `postcss css/style.css -o css/style.min.css --no-map`
- **What it does:** uruchamia PostCSS (z pluginami z `postcss.config.js`, tj. `postcss-import` i `cssnano`) i generuje zminifikowany plik `css/style.min.css` bez sourcemapy.
- **When to use:** przed wdrożeniem lub gdy zmienisz style i chcesz odtworzyć produkcyjny CSS.

### `build:js`
- **Command:** `esbuild js/script.js --bundle --minify --outfile=js/script.min.js --target=es2018`
- **What it does:** bundluje moduły JS od `js/script.js`, minifikuje kod i tworzy `js/script.min.js` targetowany na ES2018.
- **When to use:** przed wdrożeniem lub po zmianach w JS, aby mieć produkcyjny bundle.

### `build`
- **Command:** `npm run build:css && npm run build:js`
- **What it does:** uruchamia pełny build front-endu (CSS + JS) w kolejności.
- **When to use:** domyślna komenda release przed publikacją statycznego buildu.

### `images:build`
- **Command:** `node scripts/images/build-images.js`
- **What it does:** uruchamia skrypt optymalizacji obrazów:
  - czyści `assets/img-optimized`,
  - pobiera źródła z `assets/img-src` (lub seeduje je z `assets/img`, jeśli potrzeba),
  - generuje warianty AVIF/WebP i fallback JPG/PNG,
  - kopiuje SVG.
- **When to use:** gdy dodajesz/zmieniasz obrazy i chcesz wygenerować zoptymalizowane warianty.

### `dev:server`
- **Command:** `http-server -p 5173 -c-1`
- **What it does:** uruchamia prosty lokalny serwer statyczny na porcie `5173` z wyłączonym cache (`-c-1`).
- **When to use:** do lokalnego podglądu stron HTML/CSS/JS bez bundlera dev-server.

## Implikacje operacyjne
- Projekt **nie ma** skryptów typu `test`, `lint` ani `start`.
- Oznacza to, że walidacja jakości (lint/testy/audyt) nie jest zautomatyzowana w `npm scripts` i musi być uruchamiana osobno (lub dodana w przyszłości do pipeline CI).
