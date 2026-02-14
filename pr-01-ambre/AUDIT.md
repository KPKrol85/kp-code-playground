# AUDIT — pr-01-ambre

## 1) Executive summary
Projekt ma solidną bazę architektoniczną (modularny CSS, tokeny, komponentyzacja JS, metadane SEO, PWA), ale zawiera krytyczne problemy jakościowe w warstwie HTML i pipeline build/deploy. Najważniejsze ryzyka to: błędny atrybut `href` w `404.html`, dodatkowe niezamknięcia/zbędne domknięcia kontenerów w wielu stronach oraz brak wygenerowanych assetów produkcyjnych (`style.min.css`, `script.min.js`) mimo że są wymagane przez HTML.

## 2) P0 — Critical risks (real issues only)
- **Błędny link do CSS na stronie 404**: `href=/css/style.min.css"` ma uszkodzoną składnię, co może wyłączyć styling strony błędu. (`404.html`, linia 50).
- **Niespójna struktura DOM na końcu stron**: wykryto zbędne `</div>` przed zamknięciem `</body>` (m.in. `index.html`, `menu.html`, `galeria.html`, `cookies.html`, `polityka-prywatnosci.html`, `regulamin.html`). To realne ryzyko walidacyjne i utrudnienie utrzymania.
- **Wymagane assety produkcyjne nie są wykryte w repozytorium**: HTML odwołuje się do `css/style.min.css` i `js/script.min.js`, ale pliki nie zostały wykryte w projekcie. Bez builda przed deployem strona traci style i logikę JS.

## 3) Strengths
- Dobra separacja CSS: `base` / `layout` / `components` / `pages`.
- Spójne użycie tokenów (`--c-*`, `--fs-*`, `--radius`, `--header-h`) i custom properties.
- Prawidłowe wykorzystanie obrazów responsywnych (`<picture>` z AVIF/WebP/JPG fallback).
- Widoczna dbałość o A11y: skip link, `aria-live`, focus states, obsługa klawiatury dla tabs.
- Obecne metadane SEO + `robots.txt` + `sitemap.xml` + JSON-LD.
- Konfiguracja security headers i CSP w `_headers`.

## 4) P1 — 5 improvements worth doing next (exactly five)
1. **Naprawić dane kontaktowe `mailto:` i JSON-LD `email`** (`kontakt-kp-code.pl` bez `@`), aby uniknąć błędów semantycznych i UX.
2. **Dodać formalny etap build/deploy w konfiguracji hostingu** (np. `netlify.toml`) tak, by `.min` były zawsze generowane przed publikacją.
3. **Usunąć produkcyjny `console.log` w lightboxie** (`js/modules/lightbox.js`) i zostawić logowanie wyłącznie przez mechanizm debug.
4. **Uruchomić automatyczną walidację HTML w pipeline** (obecne skrypty istnieją, ale w praktyce nie chronią repo przed błędami domknięć i atrybutów).
5. **Dookreślić kontrakty ARIA dla tabów** (`aria-controls` / `aria-labelledby`) na wszystkich zakładkach dla pełniejszej zgodności wzorca WAI-ARIA.

## 5) Future enhancements — 5 realistic ideas (exactly five)
1. Dodać testy E2E (Playwright) dla kluczowych przepływów: nawigacja, formularz, lightbox, filtry.
2. Dodać Lighthouse CI (perf/a11y/seo) jako bramkę jakości przed mergem.
3. Wprowadzić automatyczny budżet wydajności (rozmiar JS/CSS i obrazów).
4. Rozszerzyć warstwę i18n (pełna wersja EN stron, nie tylko README).
5. Dodać wersjonowanie changeloga i release notes dla portfolio production-grade.

## 6) Architecture Score (0–10)
- **BEM consistency:** 8.0/10  
  Przeważają nazwy komponentowe i modyfikatory, ale występują też klasy mieszane i selektory bardziej „strukturalne”.
- **Token usage:** 9.0/10  
  Tokeny kolorów, typografii, spacingu i promieni są używane konsekwentnie.
- **Accessibility:** 7.5/10  
  Mocna podstawa, ale błędy HTML i brak pełnych powiązań ARIA dla części tabów obniżają ocenę.
- **Performance:** 8.0/10  
  Dobre formaty obrazów, lazy-loading i font strategy; ryzyko wdrożeniowe przez brak `.min`.
- **Maintainability:** 7.5/10  
  Architektura modułowa jest dobra, lecz jakość końcówki HTML i brak twardego pipeline QA/build to realny koszt utrzymania.

**Final Architecture Score: 8.0/10**

## 7) Senior rating (1–10)
**7.8/10** — projekt jest bliski poziomu production-ready pod kątem architektury i organizacji front-endu, ale nie spełnia jeszcze standardu „professional release” przez krytyczne niedociągnięcia walidacyjne i brak gwarancji build-before-deploy.
