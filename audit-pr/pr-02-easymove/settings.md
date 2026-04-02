# settings.md — npm scripts reference (`package.json`)

Źródło: `package.json`.

## `build`
- **Command:** `node scripts/build.mjs`
- **What it does:** Uruchamia pełny build projektu: kompilację CSS i JS, a następnie kopiuje pliki HTML oraz `assets/` do `dist/`.
- **When to use:** Przy generowaniu finalnych artefaktów do publikacji / testu produkcyjnego.

## `css:build`
- **Command:** `postcss css/main.css -o dist/css/main.css`
- **What it does:** Buduje produkcyjny plik CSS z entrypointu `css/main.css` do `dist/css/main.css` (z pluginami PostCSS skonfigurowanymi w `postcss.config.cjs`).
- **When to use:** Gdy chcesz przebudować tylko warstwę CSS.

## `css:watch`
- **Command:** `postcss css/main.css -o dist/css/main.css --watch`
- **What it does:** Obserwuje zmiany w CSS i automatycznie przebudowuje plik wynikowy.
- **When to use:** Podczas lokalnej pracy nad stylami bez pełnego builda.

## `dev`
- **Command:** `vite --host`
- **What it does:** Uruchamia serwer deweloperski Vite dostępny po interfejsie hosta.
- **When to use:** Do lokalnego developmentu i szybkiego podglądu zmian.

## `images:convert`
- **Command:** `node scripts/convert-images.mjs`
- **What it does:** Konwertuje obrazy PNG/JPG/JPEG z `assets/src-images` do formatów `webp` i `avif` w `assets/images`.
- **When to use:** Po dodaniu/aktualizacji źródłowych obrazów, przed ich podpięciem do stron.

## `js:build`
- **Command:** `mkdir -p dist/js/modules && terser js/main.js -o dist/js/main.js --compress --mangle --module && for f in js/modules/*.js; do terser "$f" -o "dist/$f" --compress --mangle --module; done`
- **What it does:** Minifikuje entrypoint JS oraz każdy moduł z `js/modules/` do `dist/js/...`.
- **When to use:** Gdy chcesz przebudować tylko warstwę JavaScript.

## `preview`
- **Command:** `vite preview --host`
- **What it does:** Uruchamia podgląd builda produkcyjnego (zwykle po `npm run build`).
- **When to use:** Do lokalnej walidacji tego, co będzie serwowane po wdrożeniu.
