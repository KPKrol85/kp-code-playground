# 1. Executive Summary
Projekt `pr-01-ambre` ma spójną, modularną architekturę front-endową: wielostronicowy HTML (strona główna + podstrony), podział CSS na warstwy (`base`, `layout`, `components`, `pages`) oraz JS oparty o moduły inicjalizowane centralnie. W repozytorium są obecne elementy produkcyjne: PWA (manifest + service worker), polityka nagłówków bezpieczeństwa, przekierowania, sitemapa i robots. Jakość strukturalna jest dobra, natomiast w obszarze utrzymania i wydajności warto domknąć ścieżkę “build → runtime”, uprościć politykę CSP z hashami inline oraz rozszerzyć spójność cache offline.

# 2. P0 — Critical Risks
No P0 issues detected.

# 3. Strengths
- Dobra segmentacja CSS i wyraźna warstwowość stylów przez `@import` w `css/style.css` oraz osobne katalogi komponentów/układów/stron.
- Modularny JS z centralnym bootstrapem i separacją funkcji domenowych (`nav`, `tabs`, `lightbox`, `form`, `faq`, `theme`, `scroll`).
- Solidna baza SEO technicznego: canonicale i `og:url` na stronach, obecne `robots.txt` i `sitemap.xml`, oraz dane strukturalne JSON-LD w dokumentach.
- Dobra baza a11y: `lang="pl"`, skip-link, widoczne style `:focus-visible`, semantyczne nagłówki, atrybuty ARIA na kluczowych komponentach (menu mobilne, lightbox, FAQ).
- Obecna konfiguracja wdrożeniowa (`_headers`, `_redirects`) z HSTS, CSP, politykami bezpieczeństwa i przekierowaniami friendly URL.
- Strategia obrazów jest rozsądna (JPEG + WebP/AVIF + `srcset`/`sizes`, `loading="lazy"`, deklarowane `width`/`height`).

# 4. P1 — Exactly 5 Improvements Worth Doing Next

## 1) Domknięcie ścieżki produkcyjnej bundli (CSS/JS)
**Powód:** Runtime ładuje `css/style.css` i `js/script.js`, podczas gdy w `package.json` istnieją skrypty buildujące `css/style.min.css` i `js/script.min.js`. To rozjeżdża model „to co testujemy i budujemy” vs „to co serwujemy”.

**Sugerowane usprawnienie:**
- Albo przełączyć HTML na pliki zbundlowane/minifikowane w produkcji,
- albo usunąć nieużywaną ścieżkę build i traktować `style.css`/`script.js` jako jedyne źródło runtime.

## 2) Ujednolicenie offline cache dla legal pages
**Powód:** Service worker pre-cache obejmuje m.in. `cookies.html` i `polityka-prywatnosci.html`, ale nie obejmuje `regulamin.html`. Przy niedostępnej sieci użytkownik może mieć niespójne doświadczenie między stronami prawnymi.

**Sugerowane usprawnienie:**
Dodać `regulamin.html` do `PRECACHE` lub jawnie opisać i egzekwować politykę, które podstrony muszą działać offline.

## 3) Ograniczenie inline scripts i uproszczenie CSP maintenance
**Powód:** Występują inline skrypty (np. ustawianie roku), a `_headers` zawiera wiele hashy `script-src-elem`. Każda zmiana inline wymaga aktualizacji hashy, co podnosi koszt utrzymania i ryzyko regresji po deployu.

**Sugerowane usprawnienie:**
Przenieść inline JS do plików zewnętrznych i uprościć CSP (mniej hashy, bardziej przewidywalny proces release).

## 4) Rozszerzenie automatyzacji QA w CI dla tego projektu
**Powód:** W projekcie są skrypty QA (`qa:links`, `qa:seo`, `qa:a11y`, `qa:html`, `qa:js`, `qa:css`), ale dedykowany workflow CI dla `pr-01-ambre` jest **not detected in project**.

**Sugerowane usprawnienie:**
Dodać workflow (GitHub Actions) uruchamiający minimalnie: link check, SEO check, lint JS/CSS i walidację HTML na każdym PR.

## 5) Ujednolicenie semantyki dialogów na wszystkich podstronach
**Powód:** Część stron używa natywnego `<dialog>` dla lightboxa, a część `div role="dialog"`. Działa to poprawnie, ale zwiększa złożoność utrzymania i testów a11y (różne ścieżki obsługi focusu/ESC).

**Sugerowane usprawnienie:**
Ustandaryzować implementację lightboxa do jednego wzorca (preferencyjnie `<dialog>` + wspólny kontrakt ARIA).

# 5. P2 — Minor Refinements (optional)
- Ujednolicić zapisy meta `robots` (np. `index,follow` vs `index, follow`) dla konsekwencji formatowania.
- Rozważyć doprecyzowanie metadanych OG/Twitter na stronach technicznych (`offline.html`, `404.html`) lub utrzymanie minimalnego zakresu i udokumentowanie tej decyzji.
- Drobne korekty językowe w treściach (literówki) dla spójności jakości copy.

# 6. Future Enhancements — Exactly 5 Ideas
1. Wdrożyć budowanie krytycznego CSS (critical path) dla `index.html` i opóźnione ładowanie reszty stylów.
2. Dodać budżety wydajności (LCP/CLS/TBT, wielkości assetów) egzekwowane automatycznie w CI.
3. Rozszerzyć testy e2e o kluczowe scenariusze: menu mobilne, formularz rezerwacji, lightbox, no-JS baseline.
4. Wprowadzić standaryzację danych SEO (centralny generator meta/JSON-LD), aby zmniejszyć duplikację między stronami.
5. Dodać monitoring błędów runtime (np. lekki logger produkcyjny bez PII) do szybszego wykrywania regresji po wdrożeniu.

# 7. Compliance Checklist (pass / fail)
- headings structure valid — **pass**
- no broken links (excluding .min strategy) — **pass**
- no console.log — **pass** (w kodzie runtime JS)
- aria attributes valid — **pass** (na podstawie statycznego przeglądu atrybutów)
- images have width/height — **pass**
- no-JS baseline usable — **pass**
- robots.txt present (if expected) — **pass**
- sitemap.xml present (if expected) — **pass**
- OpenGraph image present — **pass**
- JSON-LD valid (if present) — **pass** (składnia wykryta; pełna walidacja schematu not detected in project)

# 8. Architecture Score (1–10)
- structural consistency — **8/10**
- accessibility maturity — **8/10**
- performance discipline — **7/10**
- SEO correctness — **8/10**
- maintainability — **7/10**

**Łączny wynik architektury: 7.6/10**

# 9. Senior Rating (1–10)
**7.8/10**

Projekt jest dojrzały jak na statyczny front-end: ma sensowną strukturę, dobre podstawy a11y/SEO i elementy produkcyjne (PWA, security headers). Największy potencjał poprawy dotyczy operacyjnej spójności procesu build/runtime oraz redukcji kosztu utrzymania CSP + rozszerzenia CI. Po tych korektach projekt może być oceniany jako bardzo dobrze przygotowany do stabilnego utrzymania produkcyjnego.
