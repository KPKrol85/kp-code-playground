# AUDIT — Axiom Construction (pr-02-axiom)

## 1) Executive summary
Projekt prezentuje dojrzały poziom wykonania front-endu dla portfolio komercyjnego: modularny CSS, spójna struktura HTML, dobra implementacja formularza Netlify, rozsądna strategia obrazów oraz poprawna baza SEO/PWA. Nie wykryto krytycznych błędów runtime blokujących użytkownika.

Najważniejsze ryzyka dotyczą spójności architektury i utrzymania: brak `aria-current` na podstronach, niespójny skrót w manifeście (`/#oferta`), brak dedykowanego cache dla `dist/*`, cichy fallback błędów SW oraz brak automatycznej walidacji kontrastu.

## 2) P0 — Critical risks (real issues only)
**Brak wykrytych problemów P0 w aktualnym zakresie audytu.**

## 3) Strengths
- Modularna architektura CSS (`tokens/base/layout/components/sections`) i czytelny podział odpowiedzialności.  
- Dostępność: skip-link, focus states, obsługa `aria-expanded`, `prefers-reduced-motion`, fallback no-JS.  
- Formularz: Netlify forms + honeypot + walidacja semantyczna i JS + komunikaty ARIA.  
- SEO: canonical + OpenGraph + Twitter + JSON-LD + robots + sitemap.  
- Performance: responsive images (`avif/webp/jpg`), lazy loading i rozmiary obrazów deklarowane w większości przypadków.

## 4) P1 — 5 improvements worth doing next

1. **Uzupełnić `aria-current` na podstronach**  
   - **Reason:** Tylko strona główna oznacza aktywną pozycję (`aria-current="page"`); na podstronach brak analogicznego markera kontekstowego.  
   - **Suggested improvement:** Wprowadzić mapowanie aktywnej sekcji/page type i ustawiać `aria-current="page"` dla linku odpowiadającego bieżącej podstronie.

2. **Naprawić niespójny anchor w `manifest.webmanifest`**  
   - **Reason:** Shortcut `Oferta` prowadzi do `/#oferta`, ale na stronie głównej sekcja ma `id="uslugi"`.  
   - **Suggested improvement:** Zmienić URL skrótu na `/#uslugi` i ponownie zweryfikować skróty PWA.

3. **Dodać dedykowaną politykę cache dla `dist/*`**  
   - **Reason:** Runtime ładuje `dist/style.min.css` i `dist/script.min.js`, a `_headers` nie definiuje osobnej reguły cache dla `/dist/*`.  
   - **Suggested improvement:** Dodać blok `/dist/*` z `Cache-Control: public, max-age=31536000, immutable` dla wersjonowanych buildów.

4. **Ograniczyć „silent fail” przy rejestracji SW**  
   - **Reason:** Rejestracja SW kończy się `.catch(() => {})`, co utrudnia obserwowalność awarii i diagnozę środowiskową.  
   - **Suggested improvement:** Zastąpić pusty catch raportem diagnostycznym (np. telemetry/debug flag) bez zakłócania UX.

5. **Zautomatyzować test kontrastu WCAG AA w pipeline QA**  
   - **Reason:** Bieżąca implementacja a11y jest dobra, ale brak automatycznego, renderowanego raportu kontrastu dla trybu jasnego/ciemnego.  
   - **Suggested improvement:** Dodać etap CI (np. pa11y/lighthouse + custom contrast assertions) dla kluczowych podstron.

## 5) P2 — Minor refinements
- Ujednolicić dokumentację, aby odróżnić artefakty runtime (`dist/*`) od źródeł (`css/*`, `js/*`) w sekcjach build/deploy.  
- Rozważyć dodanie krótkiej tabeli „support matrix” (przeglądarki/feature policy) do README.

## 6) Future enhancements — 5 realistic ideas
1. Wdrożyć automatyczne generowanie i walidację JSON-LD z jednego źródła danych (single source of truth).  
2. Dodać wizualne testy regresji (snapshot) dla kluczowych widoków: home, usługa, legal, offline, 404.  
3. Rozszerzyć analytics consent mode o granularne kategorie zgód (analityczne/marketingowe/funkcjonalne).  
4. Dodać mechanizm image placeholders (LQIP/blur-up) dla cięższych galerii.  
5. Uzupełnić quality gates o automatyczny check nawigacji klawiaturą (tab order + focus trap scenariusze).

## 7) Compliance checklist (pass / fail)
- **headings valid:** **PASS**
- **no broken links (excluding intentional .min strategy):** **PASS**
- **no console.log:** **FAIL** (występują w skryptach narzędziowych `tools/*`, nie w runtime front-end)
- **aria attributes valid:** **PASS**
- **images have width/height:** **FAIL** (placeholdery obrazów lightboxa bez stałych wymiarów)
- **no-JS baseline usable:** **PASS**
- **sitemap present (if expected):** **PASS**
- **robots present:** **PASS**
- **OG image exists:** **PASS**
- **JSON-LD valid:** **PASS**

## 8) Architecture Score (0–10)
- **BEM consistency:** 8.5/10  
- **token usage:** 9.0/10  
- **accessibility:** 8.5/10  
- **performance:** 8.0/10  
- **maintainability:** 8.5/10  

**Overall Architecture Score: 8.5/10**

## 9) Senior rating (1–10)
**Senior rating: 8.6/10**  
Projekt jest bliski poziomu produkcyjnego portfolio: mocna baza architektoniczna, dobre SEO i dostępność, brak błędów krytycznych. Do pełnej dojrzałości brakuje kilku usprawnień operacyjnych (cache polityka `dist/*`, aktywny stan nawigacji na podstronach, pełna automatyzacja kontrastu i telemetrii SW).
