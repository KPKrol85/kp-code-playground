# 1. Podsumowanie wykonawcze
Projekt **pr-01-ambre** jest dojrzałym, statycznym front-endem z modularnym podziałem CSS i JS, poprawnie skonfigurowanym SEO technicznym (canonical, OG, sitemap, robots) oraz wdrożonym PWA (manifest, service worker, offline page). Architektura jest czytelna i utrzymywalna, ale w kilku miejscach występuje dryf strukturalny (duplikacje styli, centralny bootstrap wszystkich modułów, ręczne utrzymanie hashy CSP), który przy dalszej rozbudowie będzie podnosił koszt utrzymania.

# 2. P0 — Ryzyka krytyczne
**No P0 issues detected.**

# 3. Mocne strony
- Spójna, wielostronicowa struktura HTML z konsekwentnymi metadanymi SEO: canonical + `og:url` per strona oraz obecność JSON-LD na głównych podstronach (`index.html`, `menu.html`, `galeria.html`, `regulamin.html`, `polityka-prywatnosci.html`, `cookies.html`).
- Dostępność bazowa jest zaadresowana: skip link (`href="#main"`), logiczne landmarki (`header/main/footer/nav`), aria dla elementów interaktywnych, obsługa focus trap i klawisza Escape w menu mobilnym (`js/modules/nav.js`).
- Strategia obrazów jest nowoczesna: `picture` + AVIF/WebP + fallback JPG/PNG, lazy loading dla obrazów niekrytycznych, jawne `width/height` na obrazach.
- Podział CSS jest modułowy (`base/layout/components/pages`) i oparty o tokeny (`css/base/tokens.css`), co tworzy sensowny fundament systemu designu.
- Konfiguracja deploymentu jest obecna i sensowna: `_headers` (HSTS, CSP, Referrer-Policy itd.), `_redirects`, `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `sw.js`.
- W repo istnieją skrypty QA dla linków i SEO (`scripts/qa-links.mjs`, `scripts/qa-seo.mjs`), co ogranicza ryzyko regresji w obszarach technicznych.

# 4. P1 — Dokładnie 5 usprawnień do wdrożenia w następnym kroku

## 4.1. Duplikacja i konflikt reguł `.skip-link`
**Powód:** Reguły `.skip-link` są zdefiniowane równolegle w `css/base/base.css` i `css/components/utilities.css`, z różnymi wariantami focus (`:focus-visible` vs `:focus`). To zwiększa niejednoznaczność kaskady i utrudnia przewidywalność a11y przy refaktorach.
**Sugerowane usprawnienie:** Utrzymać jedną definicję źródłową (np. w `base`), a w drugim miejscu pozostawić tylko rozszerzenia specyficzne dla kontekstu lub usunąć duplikat.

## 4.2. Monolityczny bootstrap JS na wszystkich stronach
**Powód:** `js/script.js` importuje i inicjalizuje wszystkie moduły dla każdej strony (`FEATURES`), a moduły same kończą działanie guardami. To działa poprawnie, ale skaluje się słabo i zwiększa koszt parsowania/utrzymania.
**Sugerowane usprawnienie:** Wprowadzić page-level entrypoints (np. `script-home.js`, `script-menu.js`, `script-legal.js`) albo lazy init po detekcji selektorów, by ograniczyć zakres inicjalizacji per widok.

## 4.3. Wysoka kruchość CSP przez ręcznie utrzymywane hashe inline scriptów
**Powód:** `_headers` zawiera ręcznie wpisane hashe `script-src-elem` dla inline skryptów. Każda zmiana inline JSON-LD/metadanych może wymagać ręcznej aktualizacji hashy i grozi cichym zablokowaniem skryptów po deployu.
**Sugerowane usprawnienie:** Ograniczyć inline skrypty do minimum i przenieść JSON-LD do plików zewnętrznych (lub zautomatyzować generowanie hashy w buildzie).

## 4.4. Niespójność zakresu offline cache względem nawigacji stopki
**Powód:** `sw.js` pre-cache’uje część podstron (`/`, `menu.html`, `galeria.html`, `cookies.html`, `polityka-prywatnosci.html`), ale pomija np. `regulamin.html`, mimo że jest to linkowana strona legalna.
**Sugerowane usprawnienie:** Ujednolicić listę `PRECACHE` z rzeczywistą mapą nawigacji/stron legalnych (minimum: dodać `regulamin.html` albo udokumentować intencjonalne wykluczenie).

## 4.5. Brak jednolitej strategii warstwowania CSS (cascade governance)
**Powód:** Importy w `css/style.css` mieszają warstwy bazowe, komponentowe i utilities bez jawnych `@layer`, a utilities są importowane na końcu i nadpisują wcześniejsze reguły. Przy rosnącej bazie kodu zwiększa to ryzyko side-effectów.
**Sugerowane usprawnienie:** Wprowadzić `@layer` (base/layout/components/utilities/pages) i określić stałą kolejność priorytetów, by zredukować przypadkowe nadpisania.

# 5. P2 — Drobne usprawnienia
- `offline.html` ma minimalny zestaw metadanych i brak `meta description`/pełnego OG (prawdopodobnie intencjonalne, ale można ujednolicić z resztą stron).
- W repo utrzymywane są równolegle wersje `script.js` i `script.min.js`; runtime korzysta z `script.js`. Warto doprecyzować strategię produkcyjną w dokumentacji build/deploy.
- W wielu miejscach występują długie, powtarzalne fragmenty markupu stopki/nawigacji pomiędzy stronami statycznymi; warto rozważyć partiale w etapie build (bez zmiany stacku runtime).

# 6. Przyszłe rozszerzenia — Dokładnie 5 realistycznych kierunków
1. Dodać automatyczną walidację a11y/SEO/linków w CI (uruchamianie istniejących skryptów `qa:*` przy każdym PR).
2. Wprowadzić generowanie nagłówka/stopki z jednego źródła (templating build-time), by wyeliminować duplikację HTML.
3. Rozszerzyć service worker o politykę aktualizacji cache opartą o manifest zasobów builda, aby ograniczyć ręczne zarządzanie `CACHE_VERSION`.
4. Uzupełnić monitorowanie jakości o budżety performance (np. limity wielkości CSS/JS i obrazów) oraz automatyczną regresję Lighthouse.
5. Ujednolicić architekturę JS wokół „feature flags” per widok (mapowanie modułów do stron) i odciążyć inicjalizację globalną.

# 7. Checklista zgodności (pass / fail)
- **headings valid:** **PASS**
- **no broken links (excluding .min strategy):** **PASS** (potwierdzone lokalnym `qa:links`)
- **no console.log:** **PASS** dla kodu runtime (`js/`, `sw.js`, HTML); logi występują tylko w skryptach QA
- **aria attributes valid:** **PASS** (brak wykrytych błędów statycznych w kodzie)
- **images have width/height:** **PASS** dla znaczników `<img>` w stronach HTML
- **no-JS baseline usable:** **PASS** (klasa `.no-js` i działająca nawigacja/linki bazowe)
- **robots present (if expected):** **PASS** (`robots.txt` obecny)
- **sitemap present (if expected):** **PASS** (`sitemap.xml` obecny)
- **OG image exists:** **PASS** (`assets/img/og-img/og-1200x630.jpg` obecny)
- **JSON-LD valid (if present):** **PASS (statycznie)** — JSON-LD obecny na głównych podstronach; brak błędów wykrytych przez `qa:seo`

# 8. Wynik architektury (0–10)
- **Spójność strukturalna:** 8.5/10
- **Dojrzałość dostępności:** 8.0/10
- **Dyscyplina wydajnościowa:** 8.0/10
- **Poprawność SEO:** 9.0/10
- **Utrzymywalność:** 7.5/10

**Łączny wynik architektury: 8.2/10**

# 9. Senior rating (1–10)
**8/10**
Projekt jest technicznie solidny i gotowy do stabilnego użycia produkcyjnego w obecnym zakresie: ma sensowne SEO, dostępność bazową, PWA i porządną strukturę plików. Główne ryzyka nie są krytyczne, ale dotyczą rosnącego długu utrzymaniowego (CSP/hash workflow, bootstrap JS, duplikacje CSS/HTML), które warto uporządkować przed dalszą skalą zmian.
