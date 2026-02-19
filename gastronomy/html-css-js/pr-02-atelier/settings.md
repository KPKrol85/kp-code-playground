# settings.md

## npm scripts

### `build:css`
- **Command:** `postcss css/style.css -o css/style.min.css --no-map`
- **What it does:** buduje i minifikuje główny arkusz CSS do pliku produkcyjnego `css/style.min.css`.
- **When to use:** po zmianach w plikach CSS przed publikacją lub testami wydajnościowymi.

### `build:js`
- **Command:** `esbuild js/script.js --bundle --minify --outfile=js/script.min.js --target=es2018`
- **What it does:** bundluje moduły JS i tworzy zminifikowany bundle `js/script.min.js`.
- **When to use:** po zmianach w `js/` przed wdrożeniem i testami końcowymi.

### `build`
- **Command:** `npm run build:css && npm run build:js`
- **What it does:** uruchamia pełny build front-end assets (CSS + JS).
- **When to use:** standardowy krok release/predeploy.

### `images:build`
- **Command:** `node scripts/images/build-images.js`
- **What it does:** generuje zoptymalizowane warianty obrazów (m.in. AVIF/WEBP/JPG) na podstawie pipeline w `scripts/images/build-images.js`.
- **When to use:** po dodaniu nowych obrazów źródłowych lub zmianie parametrów optymalizacji.

### `dev:server`
- **Command:** `http-server -p 5173 -c-1`
- **What it does:** uruchamia lokalny serwer statyczny na porcie `5173` z wyłączonym cache (`-c-1`).
- **When to use:** do lokalnych testów ręcznych strony i podstron.
