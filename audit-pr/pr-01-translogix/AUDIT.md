# AUDIT.md — Senior Front-End Static Audit (evidence-based)

## 1) Executive summary
Zakres audytu: statyczna analiza rzeczywistych plików projektu `audit-pr/pr-01-translogix` bez modyfikacji kodu aplikacji.

Projekt ma dobrze uporządkowaną bazę front-endową (modularny CSS, komponentowe moduły JS, wdrożone podstawy a11y, obecne mechanizmy SEO/deploy i service worker). Najważniejsze ryzyka dotyczą spójności linkowania i kompletności SEO (broken internal links w `fleet.html`, brakujący asset Twitter image na stronie floty, ograniczony zakres sitemap). W warstwie utrzymaniowej widać też miejsca do poprawy (nagłówki semantyczne na niektórych stronach, ostre budżety gzip, potencjalne rozjazdy między źródłami CSS).

## 2) P0 — Critical risks
Brak potwierdzonych P0.

Nie wykryto twardych runtime blockerów globalnie (aplikacja ma działające wejścia HTML, CSS, JS i deploy config), ale wykryto istotne P1 wymagające szybkiej korekty.

## 3) Strengths
- Modularna architektura stylów przez importy warstw (`settings/base/layout/components/utilities/pages`). Evidence: `assets/css/style.css:1-6`.
- Uporządkowane inicjalizowanie funkcji front-end i bezpieczna rejestracja service worker tylko na HTTPS/localhost. Evidence: `assets/js/main.js:1-35`.
- Dobre fundamenty dostępności: skip-link, focus-visible, aria-controls/expanded, pułapka focusa w menu i consent modalu. Evidence: `index.html:73-108`, `assets/css/modules/base.css:39-62`, `assets/js/nav.js:15-99`, `assets/js/site-consent.js:60-111`.
- Wdrożone reduced-motion w JS i CSS. Evidence: `assets/js/reveal.js:4-6`, `assets/js/stats.js:4-31`, `assets/css/modules/pages.css` (`@media (prefers-reduced-motion: reduce)`).
- SEO i deploy baseline obecne: canonical/OG/JSON-LD, robots, sitemap, _headers, _redirects. Evidence: `index.html:17-68`, `robots.txt:1-4`, `sitemap.xml:1-28`, `_headers:1-49`, `_redirects:1-5`.

## 4) P1 — Improvements worth doing next (exactly 5)
1. **Broken internal links in fleet cards (`order.html` does not exist).**
   - Evidence: `fleet.html:178`, `fleet.html:250`, `fleet.html:322`, `fleet.html:394`.
   - Evidence of missing target: no `order.html` file in project root (`rg --files` output).
   - Impact: user journey dead-end + crawl quality drop.

2. **Twitter image path mismatch on fleet page.**
   - Evidence: `fleet.html:38` uses `assets/img/og/translogix-og.jpg`.
   - Existing OG assets are under `assets/img/og-img/` (e.g. `assets/img/og-img/og-1200x630.jpg`).
   - Impact: social preview reliability for X/Twitter.

3. **Sitemap coverage is incomplete vs existing HTML pages.**
   - Evidence (sitemap URLs): `sitemap.xml:3-27` (5 URLs).
   - Existing indexable/supporting pages include more files (`privacy.html`, `terms.html`, `cookies.html`, `service.html`, `404.html`, etc.; visible in root file list).
   - Impact: weaker crawl discoverability / inconsistent SEO intent.

4. **Heading hierarchy consistency issues on selected pages.**
   - Example: `fleet.html` starts with `h1` then card titles begin at `h3` (`fleet.html:102`, `fleet.html:130`, `fleet.html:156`).
   - Example: similar skips occur on `services.html` footer sections (`services.html:102`, `services.html:171`, `services.html:196`).
   - Impact: semantic clarity and screen-reader section navigation quality.

5. **Potential maintainability drift in CSS source of truth.**
   - Evidence: development CSS is modular imports in `assets/css/style.css:1-6`, while script `deploy:css` copies minified output over `style.css` (`package.json:9-10`).
   - Impact: risk of accidental overwrite of authoring entrypoint if process discipline is weak.

## 5) P2 — Minor refinements
- Rozważyć ograniczenie logów `console.warn/error` w SW na produkcji lub zapięcie ich pod flagę środowiskową. Evidence: `sw.js:39`, `sw.js:52`, `sw.js:56`.
- Ujednolicić formatowanie i wyrównanie w sekcjach `<head>` (sporadyczne różnice w wcięciach przy `<link rel="stylesheet">`). Evidence: `index.html:27`, `services.html:24`, `fleet.html:24`.
- Rozważyć dopisanie jawnych `aria-label` dla niektórych grup przycisków filtrów dla pełniejszego kontekstu SR (częściowo obecne już teraz). Evidence: `services.html:104-111`, `fleet.html:104-110`.

## 6) Future enhancements (exactly 5)
1. Dodać automatyczny check broken links dla wszystkich `href/src` w CI (przed `test:e2e`).
2. Dodać statyczną walidację spójności `canonical` ↔ `og:url` ↔ `twitter:image` dla każdej strony HTML.
3. Rozszerzyć testy Playwright o scenariusz SEO smoke (meta tags + canonical presence).
4. Dodać dedykowany check hierarchii nagłówków i landmarków (np. custom lint script).
5. Ustabilizować proces release CSS (oddzielny plik wejściowy autora vs plik wyjściowy deploy bez nadpisywania).

## 7) Compliance checklist
- **Headings valid:** ❌ FAIL (wykryte przeskoki poziomów na części stron). Evidence: `fleet.html:102`, `fleet.html:130`.
- **No broken links (excluding minification strategy):** ❌ FAIL (`order.html` missing). Evidence: `fleet.html:178`, `fleet.html:250`, `fleet.html:322`, `fleet.html:394`.
- **No console.log:** ❌ FAIL (występują w skryptach narzędziowych). Evidence: `scripts/check-budgets.js:67-87`, `scripts/build-css.js:47`.
- **ARIA attributes valid:** ✅ PASS (sensowne użycie `aria-expanded`, `aria-controls`, `aria-current`, `aria-live`). Evidence: `assets/js/nav.js:15-37`, `assets/js/aria-current.js:20-24`, `contact.html:174`.
- **Images have width/height:** ✅ PASS (na głównych stronach obrazy mają atrybuty wymiarów). Evidence: `index.html:79-80`, `index.html:209-230`, `fleet.html:116-122`.
- **No-JS baseline usable:** ✅ PASS (treść dostępna statycznie, `no-js/js` class toggle, fallback `<noscript>` na dynamic detail page). Evidence: `assets/js/boot.js:1-4`, `service.html:169-172`.
- **Sitemap present if expected:** ✅ PASS (`sitemap.xml` istnieje). Evidence: `sitemap.xml:1-28`.
- **Robots present:** ✅ PASS (`robots.txt` + robots meta). Evidence: `robots.txt:1-4`, `index.html:12`.
- **OG image exists:** ⚠️ PARTIAL (globalnie asset OG istnieje, ale `fleet.html` ma błędną ścieżkę twitter image). Evidence: `index.html:34`, `fleet.html:38`, `assets/img/og-img/og-1200x630.jpg`.
- **JSON-LD valid:** ⚠️ PARTIAL (JSON-LD występuje i jest syntaktycznie poprawny wizualnie, ale pełna walidacja schema.org wymaga runtime walidatora). Evidence: `index.html:44-68`, `services.html:39-58`, `contact.html:39-60`.

## 8) Architecture score (0–10)
- **BEM consistency: 8.0/10** — nazewnictwo klas jest przeważnie komponentowe i spójne (`block__element--modifier`), z nielicznymi wyjątkami utility-like. Evidence: `assets/css/modules/components.css`, `index.html` class patterns.
- **Token usage: 8.8/10** — szerokie użycie custom properties i centralnych tokenów. Evidence: `assets/css/modules/settings.css:1-78`.
- **Accessibility: 7.9/10** — solidne bazowe wdrożenie, ale z miejscowymi problemami semantyki nagłówków. Evidence: `assets/js/nav.js:76-99`, `fleet.html:102-156`.
- **Performance: 7.8/10** — nowoczesne formaty obrazów i lazy-loading + SW/cache, ale istnieją ryzyka operacyjne (budżety, cache/fingerprinting). Evidence: `_headers:12-49`, `sw.js:1-143`, `perf-budgets.json:2-9`.
- **Maintainability: 7.6/10** — modularna struktura jest dobra, lecz proces CSS i niespójności treści/SEO obniżają ocenę. Evidence: `assets/css/style.css:1-6`, `package.json:9-10`, `fleet.html:38`.

**Final architecture score: 8.0/10**

## 9) Senior rating (1–10)
**Senior rating: 8/10.**

Technicznie jest to solidny, produkcyjnie sensowny front-end statyczny z dobrze rozdzielonymi warstwami i praktycznym zestawem narzędzi QA. Do poziomu „bardzo dobry+” brakuje domknięcia kilku jakościowych detali o wysokiej widoczności biznesowej (broken links, pełna spójność SEO assets, pełniejsza mapa strony, semantyka nagłówków).
