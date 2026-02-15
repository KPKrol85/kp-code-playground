# settings.md

## npm scripts (`package.json`)

### `start`
- **Command:** `npm run dev`
- **What it does:** Alias uruchamiający skrypt developerski.
- **When to use:** Gdy potrzebujesz standardowego punktu wejścia (`npm start`) do pracy lokalnej.

### `dev`
- **Command:** `live-server --port=15500 --open=index.html --quiet`
- **What it does:** Startuje lokalny serwer statyczny na porcie `15500` i otwiera `index.html`.
- **When to use:** Podczas codziennego developmentu i szybkiego sprawdzania zmian HTML/CSS/JS.

### `format`
- **Command:** `prettier -w "**/*.{html,css,js,json,md}"`
- **What it does:** Formatuje pliki projektu in-place.
- **When to use:** Przed commitem, aby utrzymać spójny styl kodu.

### `format:check`
- **Command:** `prettier -c "**/*.{html,css,js,json,md}"`
- **What it does:** Sprawdza zgodność formatowania bez modyfikacji plików.
- **When to use:** W CI lub lokalnie jako gate przed push/merge.

### `build:css`
- **Command:** `postcss css/style.css -o css/style.min.css --no-map`
- **What it does:** Przetwarza i minifikuje CSS do pliku `style.min.css`.
- **When to use:** Przy przygotowaniu produkcyjnych assetów CSS.

### `build:js`
- **Command:** `terser js/script.js -o js/script.min.js -c -m`
- **What it does:** Minifikuje główny skrypt JS do `script.min.js`.
- **When to use:** Przy buildzie produkcyjnym JS.

### `build`
- **Command:** `npm run build:css && npm run build:js && npm run format`
- **What it does:** Uruchamia pełny build CSS/JS i finalne formatowanie.
- **When to use:** Przed deploymentem lub przygotowaniem release.

### `images:build`
- **Command:** `node scripts/images.js build`
- **What it does:** Generuje zestawy obrazów (rozmiary/formaty) zgodnie z konfiguracją skryptu.
- **When to use:** Po dodaniu/zmianie źródłowych grafik.

### `images:clean`
- **Command:** `node scripts/images.js clean`
- **What it does:** Usuwa obrazy wygenerowane przez pipeline `images.js`.
- **When to use:** Przy porządkowaniu artefaktów lub regeneracji od zera.
