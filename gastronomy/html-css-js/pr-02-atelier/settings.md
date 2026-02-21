# settings.md

## npm scripts (na podstawie `package.json`)

### 1) `build:css`
- **Command:** `postcss css/style.css -o css/style.min.css --no-map`
- **Co robi:**
  - Kompiluje główny entry CSS (`css/style.css`) z importami modułów.
  - Uruchamia pipeline PostCSS (m.in. `postcss-import`, `cssnano`) i zapisuje wynik do `css/style.min.css`.
  - Wyłącza source mapy (`--no-map`).
- **Kiedy używać:**
  - Przy każdej zmianie w stylach przed commitem/release.
  - Gdy chcesz odświeżyć produkcyjny plik CSS.

### 2) `build:js`
- **Command:** `esbuild js/script.js --bundle --minify --outfile=js/script.min.js --target=es2018`
- **Co robi:**
  - Bundle’uje moduły JS od wejścia `js/script.js`.
  - Minifikuje kod i zapisuje do `js/script.min.js`.
  - Ustawia target kompatybilności na `es2018`.
- **Kiedy używać:**
  - Po zmianach w plikach `js/core`, `js/features`, `js/app`.
  - Przed wdrożeniem, aby wygenerować finalny bundle.

### 3) `build`
- **Command:** `npm run build:css && npm run build:js`
- **Co robi:**
  - Wykonuje pełny build front-end: najpierw CSS, potem JS.
- **Kiedy używać:**
  - Przed publikacją/preview produkcyjnym.
  - Jako standardowy krok walidacji artefaktów statycznych.

### 4) `images:build`
- **Command:** `node scripts/images/build-images.js`
- **Co robi:**
  - Uruchamia skrypt Node do przetwarzania obrazów (pipeline oparty o `sharp` i `fast-glob` z `devDependencies`).
  - Generuje/aktualizuje zoptymalizowane warianty obrazów.
- **Kiedy używać:**
  - Po dodaniu nowych obrazów źródłowych.
  - Przy regeneracji wariantów AVIF/WebP/JPEG.

### 5) `dev:server`
- **Command:** `http-server -p 5173 -c-1`
- **Co robi:**
  - Uruchamia lokalny serwer statyczny na porcie `5173`.
  - Wyłącza cache (`-c-1`) dla wygodniejszego developmentu.
- **Kiedy używać:**
  - Do ręcznego testowania stron lokalnie.
  - Do sprawdzania działania nawigacji, layoutu i skryptów bez procesu bundlera dev-server.
