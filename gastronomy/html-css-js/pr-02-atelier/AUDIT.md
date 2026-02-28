# Atelier No.02 — Front-end Architecture Audit

## 1. Executive Summary
Projekt jest dojrzałą statyczną architekturą front-end: modułowy podział CSS (base/layout/components/pages), podział logiki JS na feature modules, spójne metadane SEO dla kluczowych podstron i działające linkowanie wewnętrzne. Najważniejsze ryzyka produkcyjne klasy P0 nie zostały wykryte. Główne obszary do poprawy dotyczą utrzymania spójności semantycznej na stronach systemowych, redukcji duplikacji szablonowej oraz wzmocnienia strategii cache/service worker pod kątem długoterminowej maintainability.

## 2. P0 — Critical Risks
No P0 issues detected.

## 3. Strengths
- Modularna architektura CSS jest czytelnie warstwowa (base/layout/components/pages) i oparta o pojedynczy punkt kompozycji `css/style.css` przez `@import`.【css/style.css:1】【css/style.css:33】
- System tokenów designu jest centralny i szeroki (kolory, spacing, typografia, breakpoints, theme vars), co wspiera spójność UI i theme switching.【css/base/tokens.css:1】【css/base/tokens.css:150】
- Nawigacja i komponenty interaktywne implementują atrybuty ARIA (`aria-expanded`, `aria-controls`, `aria-current`) oraz mechanizmy nawigacji klawiaturą/focus trap w modalu demo legalnym.【menu.html:583】【js/features/demo-modal.js:58】
- Strategia obrazów jest produkcyjna: `<picture>` + AVIF/WebP/JPG fallback, `srcset/sizes`, `width/height`, `loading` i `decoding` na obrazach runtime.【index.html:180】【index.html:213】【gallery.html:380】
- SEO technical baseline jest obecny na kluczowych stronach (canonical, OpenGraph, Twitter, JSON-LD, robots, sitemap).【index.html:9】【index.html:25】【index.html:58】【robots.txt:1】【sitemap.xml:1】
- Walidacja linków wewnętrznych przeszła bez błędów (483 linki, check fragments aktywny, z wykluczeniem strategii `.min`).【package.json:30】

## 4. P1 — Exactly 5 Improvements Worth Doing Next

### 1) Uporządkowanie hierarchii nagłówków na stronach systemowych
- **Reason:** Na `404.html` i `thank-you.html` po `h1` pojawiają się od razu `h3` w sekcji footer, co tworzy przeskok poziomów i obniża spójność semantyczną.
- **Suggested improvement:** Wprowadzić `h2` jako nagłówek grupy sekcji footer (lub zmienić bieżące `h3` na `h2` w tych widokach), utrzymując sekwencję `h1 → h2 → h3`.
- **Evidence:** `404.html` (`h1` + wiele `h3`) i `thank-you.html` (`h1` + wiele `h3`).【404.html:98】【404.html:126】【thank-you.html:99】【thank-you.html:134】

### 2) Korekta błędnej etykiety dostępności w linku LinkedIn
- **Reason:** W wielu stronach przy linku LinkedIn występuje ukryty tekst „Facebook”, co jest błędem utrzymaniowym i może wprowadzać niespójności nazewnictwa dostępnościowego.
- **Suggested improvement:** Zastąpić ukryty tekst przy ikonie LinkedIn na „LinkedIn” oraz zredukować powielanie tego bloku do wspólnego include/template (jeśli workflow na to pozwala).
- **Evidence:** Powtarzalny wzorzec w wielu HTML-ach (np. `index.html`, `about.html`, `menu.html`).【index.html:825】【index.html:831】【about.html:1032】【menu.html:1828】

### 3) Unifikacja strategii bundli JS między stronami
- **Reason:** Część stron ładuje `js/script.min.js`, a część `js/core.js`, co zwiększa ryzyko driftu funkcjonalnego i utrudnia utrzymanie jednego kontraktu runtime.
- **Suggested improvement:** Ustalić jedną strategię ładowania (np. jeden entrypoint z page-based init i tree-shaking) oraz opisać regułę w dokumentacji build/deploy.
- **Evidence:** Równoległe użycie `script.min.js` i `core.js` na różnych podstronach.【index.html:853】【menu.html:1856】【cookies.html:543】【404.html:242】

### 4) Wzmocnienie strategii cache Service Workera
- **Reason:** SW cache’uje jednocześnie pliki źródłowe i minifikowane (`/css/style.css` + `/css/style.min.css`, `/js/script.js` + `/js/script.min.js`), co zwiększa powierzchnię niespójności cache i utrudnia kontrolę wersji.
- **Suggested improvement:** Cache’ować tylko rzeczywisty runtime production set, a wersję cache (`CACHE_NAME`) aktualizować automatycznie w buildzie.
- **Evidence:** Lista `FILES_TO_CACHE` zawiera duplikujące warianty assetów runtime/source.【sw.js:1】【sw.js:12】【sw.js:15】

### 5) Ograniczenie powielania dużych bloków layoutu między plikami HTML
- **Reason:** Header/footer i sekcje legal/social są ręcznie powielone w wielu dokumentach, co już skutkuje błędami copy-paste i podnosi koszt zmian globalnych.
- **Suggested improvement:** Wprowadzić prostą warstwę templatingu na etapie build (np. partials) bez zmiany stacku runtime.
- **Evidence:** Identyczne sekcje nawigacji i stopki powtarzają się w wielu stronach (`index.html`, `about.html`, `contact.html`, `menu.html`, `gallery.html`, legal/system pages).【index.html:96】【about.html:129】【contact.html:81】【menu.html:578】【gallery.html:136】

## 5. P2 — Minor Refinements (optional)
- Ujednolicić metadane OG/Twitter dla stron technicznych (`offline.html`, `404.html`, `thank-you.html`) zgodnie z decyzją SEO (np. explicite `noindex` + minimal OG dla share preview), aby zmniejszyć rozjazdy między szablonami head.
- Rozważyć usunięcie pustego handlera `.then()` po rejestracji service workera i zastąpienie go telemetry hookiem (lub usunięcie całkowite), aby kod bootstrap był bardziej jednoznaczny.

## 6. Future Enhancements — Exactly 5 Realistic Ideas
1. Dodać automatyczny test regresji linków + fragmentów jako obowiązkowy krok CI (używając już istniejących skryptów `check:links:*`).
2. Dodać testy semantyczne nagłówków i ARIA (statyczne reguły lint dla HTML) jako gate dla commitów.
3. Wprowadzić prosty generator layout partials (header/footer/meta) dla redukcji driftu między 11 stronami HTML.
4. Rozszerzyć monitoring web-vitals (LCP/CLS/INP) przez lekki skrypt telemetryczny tylko w produkcji.
5. Dodać automatyczne versioning/hash dla build assets i zsynchronizować z polityką cache `_headers` + `sw.js`.

## 7. Compliance Checklist (pass / fail)
- headings valid: **FAIL** (przeskok `h1 → h3` na `404.html` i `thank-you.html`).
- no broken links (excluding .min strategy): **PASS** (linkinator: 483 links scanned, sukces).
- no console.log: **PASS** (`console.log` not detected in project source runtime files).
- aria attributes valid: **PASS** (statyczna inspekcja atrybutów i relacji `aria-controls`/`aria-expanded`/`aria-current`).
- images have width/height: **PASS** (w plikach HTML atrybuty wykryte dla obrazów runtime).
- no-JS baseline usable: **PASS** (skip-link, statyczna nawigacja, treści bazowe i `<noscript>` komunikaty obecne).
- robots present (if expected): **PASS** (`robots.txt` present).
- sitemap present (if expected): **PASS** (`sitemap.xml` present).
- OG image exists: **PASS** (referencje do `assets/img-optimized/og-img/og-img-1200x630.jpg` obecne i dostępne w link check).
- JSON-LD valid (if present): **PASS (syntax-level)** (bloki JSON-LD obecne; walidacja zewnętrznym rich-result testerem not detected in project).

## 8. Architecture Score (0–10)
**8.2 / 10**
- structural consistency: **8.5/10**
- accessibility maturity: **7.9/10**
- performance discipline: **8.4/10**
- SEO correctness: **8.1/10**
- maintainability: **7.9/10**

## 9. Senior Rating (1–10)
**8.3 / 10**
Projekt jest technicznie solidny, z dobrą bazą produkcyjną dla statycznego front-endu: modularny CSS, uporządkowany JS feature-based i szeroki zakres metadanych SEO. Największy dług dotyczy utrzymania spójności między wieloma ręcznie utrzymywanymi stronami HTML oraz detali semantycznych. Po wdrożeniu wskazanych P1 architektura będzie bliżej poziomu „production-hardened”.
