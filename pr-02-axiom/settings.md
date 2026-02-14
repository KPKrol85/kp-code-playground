# settings.md — npm scripts reference

Źródło: `package.json`.

| Script | Command | Co robi | Kiedy użyć |
|---|---|---|---|
| `img:build` | `node tools/images/build-images.mjs` | Buduje i optymalizuje warianty obrazów (pipeline obrazów). | Po dodaniu/zmianie plików w `assets/img` przed buildem produkcyjnym. |
| `img:clean` | `node tools/images/build-images.mjs --clean` | Czyści katalog wyjściowy pipeline obrazów. | Gdy chcesz przebudować obrazy od zera i usunąć stare warianty. |
| `build:css` | `node tools/css/build-css.mjs` | Buduje/minifikuje CSS do `dist/style.min.css`. | Po zmianach w `css/` przed publikacją. |
| `min:css` | `npm run build:css` | Alias dla `build:css`. | Gdy używasz starszej nazwy komendy w workflow. |
| `build:js` | `node tools/js/build-js.mjs` | Bundluje/minifikuje JS do `dist/script.min.js`. | Po zmianach w `js/` przed publikacją. |
| `build` | `npm run build:css && npm run build:js` | Kompletny build front-endu (CSS + JS). | Standardowy krok release/deploy. |
| `serve` | `http-server -c-1 -p 8080` | Uruchamia lokalny serwer statyczny na porcie 8080 bez cache. | Lokalny podgląd i testy manualne. |
| `qa:lighthouse` | `mkdir -p reports/lighthouse && lhci collect --url=http://localhost:8080/ --url=http://localhost:8080/services/budowa-domow.html --url=http://localhost:8080/legal/regulamin.html --outputDir=reports/lighthouse` | Zbiera raporty Lighthouse dla trzech URL-i i zapisuje je do `reports/lighthouse`. | Po starcie lokalnego serwera, podczas audytu jakości/performance/SEO. |
| `qa:a11y` | `mkdir -p reports/pa11y && pa11y http://localhost:8080/ --reporter json --output reports/pa11y/index.json && pa11y http://localhost:8080/services/budowa-domow.html --reporter json --output reports/pa11y/budowa-domow.json && pa11y http://localhost:8080/legal/regulamin.html --reporter json --output reports/pa11y/regulamin.json` | Uruchamia audyt dostępności Pa11y dla 3 stron i zapisuje wyniki JSON do `reports/pa11y`. | Po starcie lokalnego serwera, przy przeglądzie accessibility. |
| `qa` | `npm run qa:lighthouse && npm run qa:a11y` | Uruchamia pełny pakiet QA (Lighthouse + Pa11y). | Przed oddaniem projektu lub przed deploymentem. |

Jeżeli `package.json` byłby nieobecny: **not detected in project**. W tym projekcie `package.json` jest obecny.
