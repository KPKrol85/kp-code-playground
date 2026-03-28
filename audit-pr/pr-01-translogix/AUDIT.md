# TransLogix — Senior Front-End Audit (static repository audit)

## 1) Executive summary
Zakres audytu objął rzeczywiste pliki źródłowe w katalogu `audit-pr/pr-01-translogix` (bez artefaktów build). Projekt ma czytelną strukturę wielostronicową, modularny CSS, dobrze wdrożone podstawy a11y (skip-link, focus-visible, aria-current/expanded), sensowną warstwę SEO i deploy (robots/sitemap/_headers/_redirects), a także service worker z offline fallback. Dowody: `index.html:73-109`, `assets/css/style.css:2-7`, `_headers:1-49`, `robots.txt:1-4`, `sw.js:1-143`.

Największe ryzyka nie są krytyczne runtime (brak P0), ale dotyczą jakości utrzymania i spójności operacyjnej: niespójna konfiguracja testów E2E, placeholderowe linki social, nieużywane pliki JSON-LD oraz drobne niedociągnięcia wydajnościowe (brak width/height dla obrazów lightboxa). Dowody: `playwright.config.js:23-27`, `package.json:8-23`, `index.html:363-373`, `fleet.html:418-427`, `assets/data/jsonld/*.json` + brak referencji do tej ścieżki (`rg` w repo).

## 2) P0 — Critical risks
**Brak wykrytych P0** na podstawie analizy statycznej repo.

## 3) Strengths
- Semantyczna struktura i spójny landmarking (`header`, `nav`, `main`, `footer`) na podstronach. Dowód: np. `index.html:76-109`, `index.html:297-386`.
- Dobre fundamenty dostępności: skip-link, focus-visible, aria-current, aria-expanded, focus trap w menu i modalu zgody. Dowód: `index.html:73`, `assets/css/modules/base.css:39-62`, `assets/js/aria-current.js:1-27`, `assets/js/nav.js:76-99`, `assets/js/site-consent.js:60-111`.
- Progressive enhancement/no-JS sygnalizowane klasami `no-js/js`, a strona `service.html` ma fallback `<noscript>`. Dowód: `assets/js/boot.js:1-4`, `service.html:169-172`.
- Dobrze przygotowane SEO baseline: meta description + canonical + OG + JSON-LD na stronach indeksowalnych, robots i sitemap obecne. Dowód: `index.html:8-68`, `robots.txt:1-4`, `sitemap.xml:1-28`.
- Wydajnościowo: self-hosted fonts `woff2` + `font-display: swap`, lazy-loading obrazów na kartach floty, cache policy i SW. Dowód: `assets/css/modules/base.css:64-113`, `index.html:209-230`, `_headers:12-49`, `sw.js:1-143`.

## 4) P1 — Improvements worth doing next (exactly 5)
1. **Konfiguracja Playwright wskazuje brakujące skrypty npm (`build:html`, `serve`)** — utrudnia uruchamialność testów E2E w obecnym stanie konfiguracji. Dowód: `playwright.config.js:24`, `package.json:8-23`.
2. **Linki social są placeholderami (`href="#"`)** na stronach publicznych — to problem jakości/wiarygodności i potencjalnie użyteczności (nawigacja donikąd). Dowód: `index.html:363-373` (analogiczny wzorzec na innych podstronach).
3. **Brak `width`/`height` dla obrazów lightboxa** (dynamiczne `<img src="">`) może zwiększać ryzyko CLS przy renderze galerii. Dowód: `fleet.html:418`, `fleet.html:427`.
4. **Nieużywane pliki `assets/data/jsonld/*.json`** — dane JSON-LD istnieją, ale strony używają JSON-LD inline i brak referencji do tej ścieżki, co zwiększa koszt utrzymania i ryzyko dryfu treści. Dowód: `assets/data/jsonld/*.json`, `index.html:44-68` oraz brak wyników odwołań do `assets/data/jsonld` w kodzie.
5. **Sitemap obejmuje tylko 5 URL-i i pomija strony legalne** (`privacy.html`, `terms.html`, `cookies.html`, `service.html`) — jeśli mają być indeksowane, obecny stan jest niepełny SEO-operacyjnie. Dowód: `sitemap.xml:3-27` vs obecność plików HTML w repo (`privacy.html`, `terms.html`, `cookies.html`, `service.html`).

## 5) P2 — Minor refinements
- Ujednolicić diakrytykę i copywriting (np. “chlodnia” vs “chłodnia”) dla spójności językowej UI. Dowód: `index.html:225`, `contact.html:158`.
- Dodać spójny wzorzec linków `tel:`/`mailto:` także w sekcjach treści kontaktowych (nie tylko w stopce) dla szybszej akcji użytkownika mobilnego. Dowód: `contact.html:111-116`, `contact.html:314-315`.
- Ograniczyć logowanie `console.warn/error` w service workerze na produkcji (bardziej kontrolowane raportowanie). Dowód: `sw.js:39`, `sw.js:52`, `sw.js:56`.

## 6) Future enhancements (exactly 5)
1. Dodać automatyczny test spójności `canonical` ↔ `og:url` dla wszystkich HTML w CI.
2. Rozszerzyć testy E2E o ścieżki legal pages i offline fallback.
3. Wprowadzić automatyczny checker placeholderów linków (`href="#"`) przed deployem.
4. Przenieść i centralizować JSON-LD do jednego źródła prawdy (inline generator lub import), żeby uniknąć duplikacji.
5. Dodać statyczny raport kontrastu (token-aware) jako etap CI, bo obecnie pełna zgodność kontrastu nie jest możliwa do potwierdzenia tylko z analizy statycznej.

## 7) Compliance checklist
- **Headings valid:** ✅ PASS (po 1 `h1` na stronę HTML, logiczne `h2/h3`). Dowód: skan `*.html`, np. `index.html:112-124`, `contact.html:104-108`.
- **No broken links (excluding intentional minification strategy):** ⚠️ PARTIAL — asset links zweryfikowane pozytywnie, ale wykryto celowe placeholdery `href="#"` w social. Dowód: `scripts/verify-assets.js` wynik „All referenced assets exist.” + `index.html:363-373`.
- **No console.log:** ❌ FAIL (występuje w skryptach narzędziowych). Dowód: `scripts/check-budgets.js:67-86`, `scripts/build-css.js:47`.
- **ARIA attributes valid:** ✅ PASS (poprawne wzorce `aria-expanded`, `aria-current`, `aria-live`, `aria-controls`). Dowód: `assets/js/nav.js:15-37`, `assets/js/aria-current.js:21-24`, `contact.html:189-206`.
- **Images have width/height:** ❌ FAIL (2 wyjątki w lightboxie). Dowód: `fleet.html:418`, `fleet.html:427`.
- **No-JS baseline usable:** ✅ PASS (strony renderują treść statyczną; dodatkowy `<noscript>` dla detail page). Dowód: `service.html:169-172`, `assets/js/boot.js:1-4`.
- **Sitemap present if expected:** ✅ PASS (`sitemap.xml` obecny).
- **Robots present:** ✅ PASS (`robots.txt` obecny + robots meta na stronach). Dowód: `robots.txt:1-4`, `index.html:12`.
- **OG image exists:** ✅ PASS (plik istnieje i jest referencjonowany). Dowód: `index.html:34`, `assets/img/og-img/og-1200x630.jpg`.
- **JSON-LD valid:** ✅ PASS (parsowanie JSON poprawne dla inline i plików data/jsonld). Dowód: statyczna walidacja parserem JSON + `index.html:44-68`.

## 8) Architecture score (0–10)
**8.2 / 10**
- **BEM consistency: 8.4/10** — wysoka spójność (`block__element--modifier`) w komponentach header/footer/cards. Dowód: `index.html:77-104`, `assets/css/modules/components.css`.
- **Token usage: 8.8/10** — rozbudowane CSS custom properties i dark theme overrides. Dowód: `assets/css/modules/settings.css:1-78`.
- **Accessibility: 8.0/10** — bardzo dobre fundamenty, drobne braki i miejsca do dalszej automatyzacji. Dowód: `assets/js/nav.js`, `assets/css/modules/base.css`.
- **Performance: 7.8/10** — dobre podstawy (lazy/fonts/cache/SW), ale są miejsca do dopracowania (lightbox sizing, porządki danych). Dowód: `fleet.html:418-427`, `_headers:12-49`.
- **Maintainability: 8.0/10** — modularność dobra, jednak niespójność konfiguracji testów i martwe artefakty obniżają wynik. Dowód: `playwright.config.js:23-27`, `package.json:8-23`.

## 9) Senior rating (1–10)
**8.1 / 10**

Krótka ocena techniczna: implementacja jest produkcyjnie bliska gotowości dla statycznego serwisu marketingowo-usługowego (solidne a11y/SEO/deploy baseline), ale wymaga uporządkowania warstwy operacyjnej (E2E config drift), eliminacji placeholderów i drobnych poprawek CLS/utrzymaniowych, aby spełnić standard „senior-ready” bez zastrzeżeń.
