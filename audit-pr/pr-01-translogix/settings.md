# npm scripts reference (`package.json`)

Źródło: `package.json:8-23`.

## `dev:css`
- **Command:** `npm run build:css`
- **What it does:** Alias developerski uruchamiający kompilację CSS przez PostCSS.
- **When to use:** Gdy chcesz szybko odświeżyć CSS lokalnie (bez dodatkowych kroków deploy).

## `build:css`
- **Command:** `postcss assets/css/style.css -o assets/css/style.min.css`
- **What it does:** Buduje/minifikuje główny arkusz CSS do `assets/css/style.min.css`.
- **When to use:** Przed testami wydajnościowymi, kontrolą budżetów albo wydaniem.

## `deploy:css`
- **Command:** `npm run build:css && cp assets/css/style.min.css assets/css/style.css`
- **What it does:** Buduje minifikowany CSS i nadpisuje nim `style.css`.
- **When to use:** Przy strategii deploy, w której produkcyjny link wskazuje na `style.css`, ale ma zawierać już zminifikowaną treść.

## `verify:assets`
- **Command:** `node scripts/verify-assets.js`
- **What it does:** Sprawdza referencje do assetów i raportuje brakujące pliki.
- **When to use:** Przed deployem lub po refaktorze ścieżek/assetów.

## `img:opt`
- **Command:** `node scripts/optimize-images.js`
- **What it does:** Optymalizuje obrazy źródłowe (workflow opisany w README projektu).
- **When to use:** Gdy dodajesz/aktualizujesz obrazy i chcesz wygenerować lżejsze warianty.

## `check:html`
- **Command:** `html-validate "**/*.html"`
- **What it does:** Waliduje składnię i reguły HTML dla wszystkich stron.
- **When to use:** Przed merge/deploy oraz po zmianach w strukturze dokumentów.

## `check:links`
- **Command:** `npm run verify:assets`
- **What it does:** Alias do weryfikacji istnienia assetów referencjonowanych w kodzie.
- **When to use:** Jako szybki check linkowania zasobów.

## `check:a11y`
- **Command:** `start-server-and-test "http-server . -p 8080" http://127.0.0.1:8080 "pa11y-ci --config .pa11yci.json"`
- **What it does:** Uruchamia lokalny serwer i odpala smoke testy dostępności (WCAG2AA) przez `pa11y-ci`.
- **When to use:** Przed wydaniem lub po zmianach UI/semantyki.

## `check`
- **Command:** `npm run check:html && npm run check:a11y`
- **What it does:** Zbiorczy quality gate: HTML + accessibility smoke.
- **When to use:** Standardowy pre-merge check.

## `test:e2e`
- **Command:** `playwright test`
- **What it does:** Uruchamia testy end-to-end Playwright.
- **When to use:** Po zmianach funkcjonalnych i przed release.

## `test:e2e:ui`
- **Command:** `playwright test --ui`
- **What it does:** Uruchamia testy E2E w trybie interaktywnym UI.
- **When to use:** Lokalny debugging scenariuszy testowych.

## `test:e2e:report`
- **Command:** `playwright show-report`
- **What it does:** Otwiera raport HTML z ostatniego uruchomienia Playwright.
- **When to use:** Analiza failed/passed test cases i trace.

## `lhci`
- **Command:** `npx --yes @lhci/cli@0.14.0 autorun --config=./lighthouserc.json`
- **What it does:** Uruchamia Lighthouse CI według konfiguracji projektu.
- **When to use:** Audyt wydajności/a11y/SEO best practices przed publikacją.

## `check:budget`
- **Command:** `node scripts/check-budgets.js`
- **What it does:** Sprawdza limity rozmiaru gzip dla wskazanych assetów (performance budgets).
- **When to use:** Po zmianach w CSS/JS, aby kontrolować regresje wagowe.
