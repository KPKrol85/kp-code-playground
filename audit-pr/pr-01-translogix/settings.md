# settings.md

## package.json scripts audit

`package.json` detected.

Poniżej opis każdego skryptu z sekcji `scripts`.

| Script name | Command | What it does | When to use |
|---|---|---|---|
| `dev:css` | `npm run build:css` | Alias na budowanie CSS. | Gdy chcesz szybko przebudować CSS lokalnie. |
| `build:css` | `postcss assets/css/style.css -o assets/css/style.min.css` | Przetwarza CSS przez PostCSS i tworzy plik minifikowany `style.min.css`. | Przed testami wydajności i przed deployem. |
| `deploy:css` | `npm run build:css && cp assets/css/style.min.css assets/css/style.css` | Buduje CSS, potem kopiuje wynik minifikacji do `style.css`. | Tylko w pipeline/release, jeśli strategia deploy wymaga podmiany pliku źródłowego. |
| `verify:assets` | `node scripts/verify-assets.js` | Sprawdza integralność referencji do assetów (linki/zasoby lokalne). | Po zmianach w HTML/CSS/assetach, przed merge. |
| `img:opt` | `node scripts/optimize-images.js` | Uruchamia optymalizację obrazów przez skrypt Node. | Po dodaniu nowych obrazów lub porządkach wydajnościowych. |
| `check:html` | `html-validate "**/*.html"` | Waliduje składnię/zasady HTML we wszystkich stronach. | W CI oraz lokalnie po edycjach HTML. |
| `check:links` | `node scripts/check-local-links.js` | Waliduje lokalne `href` i `src` w HTML (strony i assety) oraz failuje dla brakujących celów. | Po zmianach HTML/assetów i jako gate przed E2E. |
| `pretest:e2e` | `npm run check:links` | Automatycznie uruchamia broken-links check przed Playwright E2E. | Działa automatycznie przy `npm run test:e2e`. |
| `check:a11y` | `start-server-and-test "http-server . -p 8080" http://127.0.0.1:8080 "pa11y-ci --config .pa11yci.json"` | Startuje lokalny serwer i wykonuje audyt a11y według konfiguracji pa11y-ci. | Przed wydaniem i cyklicznie w QA dostępności. |
| `check` | `npm run check:html && npm run check:a11y` | Łączy podstawowy check jakości: HTML + a11y. | Jako szybki quality gate przed PR. |
| `test:e2e` | `playwright test` | Uruchamia testy end-to-end Playwright. | Przed mergem i po zmianach zachowania UI. |
| `test:e2e:ui` | `playwright test --ui` | Odpala Playwright w trybie interaktywnym UI runner. | Podczas lokalnego debugowania testów E2E. |
| `test:e2e:report` | `playwright show-report` | Otwiera raport z ostatniego przebiegu Playwright. | Po `test:e2e`, gdy analizujesz błędy/regresje. |
| `lhci` | `npx --yes @lhci/cli@0.14.0 autorun --config=./lighthouserc.json` | Uruchamia Lighthouse CI zgodnie z `lighthouserc.json`. | Do pomiarów jakości (performance/a11y/SEO/best-practices) i trendów CI. |
| `check:budget` | `node scripts/check-budgets.js` | Sprawdza budżety gzip zdefiniowane w `perf-budgets.json`. | Po zmianach wpływających na rozmiar CSS/JS i przed release. |

## Notes
- `check` nie obejmuje domyślnie testów E2E ani Lighthouse; te uruchamiane są osobno.
- `test:e2e` ma teraz automatyczny pre-check (`pretest:e2e`) walidujący lokalne referencje `href`/`src`, aby wychwycić broken linki przed uruchomieniem Playwright.
- `deploy:css` zmienia `assets/css/style.css`; używaj świadomie, bo wpływa na źródło stylów w repo.
