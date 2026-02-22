# npm scripts — `pr-01-ambre`

Źródło: `package.json`.

## `build:css`
- **Script name:** `build:css`
- **Command:** `postcss css/style.css -o css/style.min.css --no-map && node -e "..."`
- **What it does:** Bundle i minifikuje CSS do `css/style.min.css`, potem sprawdza, czy wynik nie zawiera `@import`.
- **When to use it:** Po zmianach w CSS, przed publikacją.

## `build:js`
- **Script name:** `build:js`
- **Command:** `esbuild js/script.js --bundle --minify --target=es2018 --outfile=js/script.min.js --log-level=warning && node -e "..."`
- **What it does:** Bundluje i minifikuje JS do `js/script.min.js`, następnie waliduje brak pozostałości `import` w bundle.
- **When to use it:** Po zmianach w JS, przed publikacją.

## `build`
- **Script name:** `build`
- **Command:** `npm run build:css && npm run build:js`
- **What it does:** Wykonuje pełny build CSS + JS.
- **When to use it:** Standardowy build release.

## `watch:css`
- **Script name:** `watch:css`
- **Command:** `postcss css/style.css -o css/style.min.css --watch --no-map`
- **What it does:** Obserwuje zmiany CSS i aktualizuje bundle w trybie ciągłym.
- **When to use it:** Podczas pracy nad stylami.

## `watch:js`
- **Script name:** `watch:js`
- **Command:** `esbuild js/script.js --bundle --minify --target=es2018 --outfile=js/script.min.js --watch`
- **What it does:** Obserwuje zmiany JS i przebudowuje bundle.
- **When to use it:** Podczas pracy nad logiką JS.

## `img:opt`
- **Script name:** `img:opt`
- **Command:** `node scripts/optimize-images.mjs`
- **What it does:** Uruchamia optymalizację obrazów według konfiguracji skryptu.
- **When to use it:** Po dodaniu/aktualizacji grafik.

## `img:webp`
- **Script name:** `img:webp`
- **Command:** `node scripts/optimize-images.mjs --webp`
- **What it does:** Generuje warianty obrazów WebP.
- **When to use it:** Gdy potrzebne są tylko pliki WebP.

## `img:avif`
- **Script name:** `img:avif`
- **Command:** `node scripts/optimize-images.mjs --avif`
- **What it does:** Generuje warianty obrazów AVIF.
- **When to use it:** Gdy potrzebne są tylko pliki AVIF.

## `img:clean`
- **Script name:** `img:clean`
- **Command:** `node -e "require('fs').rmSync('assets/img/_optimized', { recursive: true, force: true })"`
- **What it does:** Usuwa katalog `assets/img/_optimized`.
- **When to use it:** Przed pełną regeneracją obrazów.

## `img:verify`
- **Script name:** `img:verify`
- **Command:** `node scripts/img-verify.mjs`
- **What it does:** Sprawdza stan katalogu zoptymalizowanych obrazów.
- **When to use it:** Po optymalizacji grafik lub przed audytem.

## `qa`
- **Script name:** `qa`
- **Command:** `npm run qa:links && npm run qa:html && npm run qa:js && npm run qa:css`
- **What it does:** Uruchamia pełen pakiet kontroli jakości.
- **When to use it:** Przed merge/release.

## `qa:links`
- **Script name:** `qa:links`
- **Command:** `node scripts/qa-links.mjs`
- **What it does:** Waliduje linki, ścieżki assetów i anchory między stronami.
- **When to use it:** Po zmianach w HTML, nawigacji i obrazach.

## `qa:html`
- **Script name:** `qa:html`
- **Command:** `html-validate index.html menu.html galeria.html cookies.html polityka-prywatnosci.html regulamin.html 404.html offline.html`
- **What it does:** Waliduje strukturę i semantykę HTML wskazanych stron.
- **When to use it:** Po zmianach treści i układu HTML.

## `qa:js`
- **Script name:** `qa:js`
- **Command:** `eslint --max-warnings 0 "js/**/*.js" "scripts/**/*.mjs"`
- **What it does:** Lintuje JavaScript i skrypty pomocnicze; ostrzeżenia traktuje jako błędy.
- **When to use it:** Po każdej zmianie JS.

## `qa:css`
- **Script name:** `qa:css`
- **Command:** `stylelint --max-warnings 0 "css/**/*.css"`
- **What it does:** Lintuje pliki CSS; ostrzeżenia traktuje jako błędy.
- **When to use it:** Po każdej zmianie CSS.
