# settings.md

## package.json scripts

### `img:opt`
- **Command:** `node tools/image-optimizer/optimize-images.mjs --only=all`
- **What it does:** Uruchamia optymalizator obrazów dla wszystkich wspieranych formatów wejściowych zgodnie z logiką skryptu.
- **When to use:** Standardowa optymalizacja całego zestawu obrazów przed commitem/deployem.

### `img:opt:jpg`
- **Command:** `node tools/image-optimizer/optimize-images.mjs --only=jpg`
- **What it does:** Ogranicza optymalizację do plików JPG/JPEG.
- **When to use:** Gdy zmieniasz tylko zdjęcia JPG i chcesz szybszy przebieg.

### `img:opt:png`
- **Command:** `node tools/image-optimizer/optimize-images.mjs --only=png`
- **What it does:** Ogranicza optymalizację do plików PNG.
- **When to use:** Gdy zmieniasz tylko assety PNG (np. grafiki produktowe/ikony).

### `img:opt:all`
- **Command:** `node tools/image-optimizer/optimize-images.mjs --only=all`
- **What it does:** Alias działający praktycznie tak samo jak `img:opt`.
- **When to use:** Alternatywna, jawna nazwa pełnego przebiegu optymalizacji.

### `img:opt:out`
- **Command:** `node tools/image-optimizer/optimize-images.mjs --mode=output --out=tools/image-optimizer/output --only=all`
- **What it does:** Generuje zoptymalizowane pliki do katalogu wyjściowego zamiast nadpisywania źródeł.
- **When to use:** Gdy chcesz porównać wynik lub przygotować eksport testowy bez modyfikacji assetów wejściowych.

### `img:opt:dry`
- **Command:** `node tools/image-optimizer/optimize-images.mjs --dry-run --only=all`
- **What it does:** Symuluje proces optymalizacji bez zapisu plików.
- **When to use:** Do szybkiej inspekcji, jakie pliki zostałyby przetworzone.

### `minify:css`
- **Command:** `postcss css/main.css -o css/main.min.css --no-map -u cssnano`
- **What it does:** Minifikuje główny CSS do `main.min.css` z użyciem `cssnano`.
- **When to use:** Przed wydaniem/hostingiem, gdy chcesz wygenerować wersję skompresowaną CSS.

### `minify:js`
- **Command:** `terser js/main.js -o js/main.min.js -c -m`
- **What it does:** Minifikuje `js/main.js` do `js/main.min.js` (compress + mangle).
- **When to use:** Przed publikacją, jeśli pipeline wymaga minifikowanego JS.

### `build`
- **Command:** `npm run minify:css && npm run minify:js`
- **What it does:** Uruchamia pełny build assetów front-end (CSS + JS minified).
- **When to use:** Standardowy krok build lokalny przed deployem.

### `watch:css`
- **Command:** `postcss css/main.css -o css/main.min.css --watch --no-map -u cssnano`
- **What it does:** Watch mode dla minifikacji CSS przy każdej zmianie.
- **When to use:** Podczas lokalnej pracy nad stylami, gdy potrzebny jest ciągły output minified.

### `qa`
- **Command:** `npm run qa:html && npm run qa:js && npm run qa:css`
- **What it does:** Zbiorczy quality gate dla HTML, JS i CSS.
- **When to use:** Przed commitem/PR jako podstawowy check jakości.

### `qa:format`
- **Command:** `npm run format:check`
- **What it does:** Alias do sprawdzenia formatowania Prettierem.
- **When to use:** Gdy chcesz szybko sprawdzić zgodność stylu kodu.

### `qa:html`
- **Command:** `html-validate --config htmlvalidate.json index.html pages/cart.html pages/checkout.html pages/contact.html pages/cookies.html pages/kolekcje.html pages/nowosci.html pages/polityka-prywatnosci.html pages/product.html pages/promocje.html pages/regulamin.html pages/shop.html`
- **What it does:** Waliduje wskazane pliki HTML według reguł `htmlvalidate.json`.
- **When to use:** Po edycjach szablonów/stron HTML.

### `qa:js`
- **Command:** `eslint --max-warnings 0 "js/**/*.js" "tools/**/*.mjs"`
- **What it does:** Lintuje JS/MJS i failuje na ostrzeżeniach.
- **When to use:** Po zmianach logiki JS lub narzędzi w `tools/`.

### `qa:css`
- **Command:** `stylelint --max-warnings 0 "css/**/*.css"`
- **What it does:** Lintuje wszystkie style CSS i failuje na ostrzeżeniach.
- **When to use:** Po zmianach warstwy CSS.

### `format`
- **Command:** `prettier . --write`
- **What it does:** Formatuje pliki w repozytorium zgodnie z konfiguracją Prettier.
- **When to use:** Gdy chcesz automatycznie wyrównać styl formatowania.

### `format:check`
- **Command:** `prettier . --check`
- **What it does:** Sprawdza formatowanie bez modyfikowania plików.
- **When to use:** W CI lub przed commitem do szybkiej weryfikacji.

### `validate:jsonld`
- **Command:** `node scripts/validate-jsonld.js`
- **What it does:** Waliduje bloki JSON-LD w plikach HTML obsługiwanych przez skrypt.
- **When to use:** Po zmianach SEO/schema.org (lub pre-merge jako kontrola jakości).
