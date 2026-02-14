# npm scripts — `pr-01-solidcraft`

Źródło: `package.json`.

## `start`

- **Command:** `npm run dev`
- **What it does:** Alias na skrypt developerski.
- **When to use:** Gdy chcesz standardowo uruchomić projekt lokalnie komendą `npm start`.

## `dev`

- **Command:** `live-server --port=15500 --open=index.html --quiet`
- **What it does:** Uruchamia lokalny serwer statyczny na porcie `15500`, otwiera `index.html` i ogranicza logowanie.
- **When to use:** Podczas lokalnego developmentu i ręcznej weryfikacji UI.

## `format`

- **Command:** `prettier -w "**/*.{html,css,js,json,md}"`
- **What it does:** Formatuje pliki HTML/CSS/JS/JSON/MD w całym repo.
- **When to use:** Przed commitem, aby utrzymać spójny styl kodu.

## `format:check`

- **Command:** `prettier -c "**/*.{html,css,js,json,md}"`
- **What it does:** Sprawdza zgodność formatowania bez modyfikowania plików.
- **When to use:** W CI lub jako szybki quality gate przed wypchnięciem zmian.

## `build:css`

- **Command:** `postcss css/style.css -o css/style.min.css --no-map`
- **What it does:** Buduje zminifikowany CSS z `style.css` do `style.min.css`.
- **When to use:** Przy przygotowaniu artefaktów produkcyjnych.

## `build:js`

- **Command:** `terser js/script.js -o js/script.min.js -c -m`
- **What it does:** Minifikuje główny skrypt `script.js` do `script.min.js`.
- **When to use:** Przy buildzie produkcyjnym.

## `build`

- **Command:** `npm run build:css && npm run build:js && npm run format`
- **What it does:** Uruchamia pełny build frontendu (CSS + JS) i formatowanie.
- **When to use:** Przed deployem lub publikacją paczki.

## `images:build`

- **Command:** `node scripts/images.js build`
- **What it does:** Generuje warianty obrazów (pipeline oparty o `sharp`) według logiki w `scripts/images.js`.
- **When to use:** Po dodaniu/aktualizacji obrazów źródłowych.

## `images:clean`

- **Command:** `node scripts/images.js clean`
- **What it does:** Czyści wygenerowane pliki obrazów wskazane przez pipeline.
- **When to use:** Gdy chcesz odtworzyć artefakty obrazów od zera.

## Uwagi operacyjne

- W projekcie **nie wykryto** skryptu buildującego `js/theme-init.min.js`, mimo że plik jest referencjonowany przez HTML.
- Przed wdrożeniem warto dodać ten krok do pipeline’u i zweryfikować kompletność assetów produkcyjnych.
