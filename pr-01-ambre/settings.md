# settings.md — npm scripts reference

Źródło: `package.json` w katalogu projektu.

## build:css
- **Command:** `postcss css/style.css -o css/style.min.css --no-map && node -e "..."`
- **Co robi:** scala importy CSS przez PostCSS, minifikuje wynik i zapisuje do `css/style.min.css`; następnie sprawdza, czy w bundlu nie pozostały `@import`.
- **Kiedy używać:** przed deployem oraz po zmianach w CSS.

## build:js
- **Command:** `esbuild js/script.js --bundle --minify --target=es2018 --outfile=js/script.min.js --log-level=warning && node -e "..."`
- **Co robi:** bundluje moduły JS, minifikuje i zapisuje do `js/script.min.js`; potem waliduje brak składni importów modułowych w pliku wynikowym.
- **Kiedy używać:** przed deployem oraz po zmianach w JS.

## build
- **Command:** `npm run build:css && npm run build:js`
- **Co robi:** wykonuje pełny build assetów produkcyjnych CSS + JS.
- **Kiedy używać:** standardowy krok release/deploy.

## watch:css
- **Command:** `postcss css/style.css -o css/style.min.css --watch --no-map`
- **Co robi:** ciągłe budowanie CSS przy zmianach plików.
- **Kiedy używać:** podczas lokalnej pracy nad stylem.

## watch:js
- **Command:** `esbuild js/script.js --bundle --minify --target=es2018 --outfile=js/script.min.js --watch`
- **Co robi:** ciągłe budowanie JS przy zmianach modułów.
- **Kiedy używać:** podczas lokalnej pracy nad interakcjami JS.

## img:opt
- **Command:** `node scripts/optimize-images.mjs`
- **Co robi:** uruchamia pipeline optymalizacji obrazów zgodnie z logiką skryptu.
- **Kiedy używać:** po dodaniu/aktualizacji assetów graficznych.

## img:webp
- **Command:** `node scripts/optimize-images.mjs --webp`
- **Co robi:** generuje tylko warianty WebP.
- **Kiedy używać:** gdy potrzebna jest selektywna regeneracja WebP.

## img:avif
- **Command:** `node scripts/optimize-images.mjs --avif`
- **Co robi:** generuje tylko warianty AVIF.
- **Kiedy używać:** gdy potrzebna jest selektywna regeneracja AVIF.

## img:clean
- **Command:** `node -e "require('fs').rmSync('assets/img/_optimized', { recursive: true, force: true })"`
- **Co robi:** usuwa cały katalog wyników optymalizacji obrazów.
- **Kiedy używać:** przed pełną regeneracją obrazów od zera.

## img:verify
- **Command:** `node scripts/img-verify.mjs`
- **Co robi:** sprawdza status katalogu `assets/img/_optimized` i raportuje jego zawartość.
- **Kiedy używać:** po optymalizacji obrazów, do szybkiej walidacji wyniku.

## qa
- **Command:** `npm run qa:links && npm run qa:html && npm run qa:js && npm run qa:css`
- **Co robi:** uruchamia pełny zestaw kontroli jakości (linki, HTML, JS, CSS).
- **Kiedy używać:** przed commitem i przed deployem.

## qa:links
- **Command:** `node scripts/qa-links.mjs`
- **Co robi:** skanuje strony HTML i wykrywa błędne/nieistniejące odwołania lokalne.
- **Kiedy używać:** po zmianach ścieżek, plików HTML i assetów.

## qa:html
- **Command:** `html-validate index.html menu.html galeria.html cookies.html polityka-prywatnosci.html regulamin.html 404.html offline.html`
- **Co robi:** waliduje składnię i reguły jakości HTML dla wszystkich stron.
- **Kiedy używać:** po zmianach markupu.

## qa:js
- **Command:** `eslint --max-warnings 0 "js/**/*.js" "scripts/**/*.mjs"`
- **Co robi:** lintuje JS i skrypty narzędziowe; warningi traktuje jak błąd.
- **Kiedy używać:** po zmianach JS i skryptów node.

## qa:css
- **Command:** `stylelint --max-warnings 0 "css/**/*.css"`
- **Co robi:** lintuje cały CSS; warningi traktuje jak błąd.
- **Kiedy używać:** po zmianach CSS.
