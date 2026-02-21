# settings.md

## npm scripts (na podstawie `package.json`)

### `build:css`
- **script name:** `build:css`
- **command:** `postcss css/style.css -o css/style.min.css --no-map`
- **what it does:** kompiluje i minifikuje główny arkusz CSS do `css/style.min.css` z użyciem konfiguracji PostCSS.
- **when to use it:** po zmianach w plikach CSS przed publikacją lub testem wersji produkcyjnej.

### `build:js`
- **script name:** `build:js`
- **command:** `esbuild js/script.js --bundle --minify --outfile=js/script.min.js --target=es2018`
- **what it does:** bundluje moduły JS, minifikuje kod i zapisuje wynik do `js/script.min.js`.
- **when to use it:** po zmianach w `js/` przed release.

### `build`
- **script name:** `build`
- **command:** `npm run build:css && npm run build:js`
- **what it does:** uruchamia pełny build front-endu (CSS + JS).
- **when to use it:** jako standardowy krok walidacji artefaktów przed wdrożeniem.

### `images:build`
- **script name:** `images:build`
- **command:** `node scripts/images/build-images.js`
- **what it does:** generuje zoptymalizowane warianty obrazów (pipeline oparty o `sharp` i `fast-glob`).
- **when to use it:** po dodaniu/zmianie obrazów źródłowych.

### `dev:server`
- **script name:** `dev:server`
- **command:** `http-server -p 5173 -c-1`
- **what it does:** uruchamia lokalny serwer statyczny na porcie `5173` z wyłączonym cache.
- **when to use it:** do lokalnego przeglądu i ręcznych testów UI.
