# Front-end Audit — SolidCraft (`pr-01-solidcraft`)

## 1) Executive summary

Projekt ma solidną bazę front-endową (semantyczny HTML, szerokie użycie ARIA, tokeny CSS, responsywne obrazy i konfigurację PWA), ale w obecnym stanie repozytorium nie jest gotowy do bezpiecznego deployu produkcyjnego.

Najważniejsze ryzyka:

- wszystkie strony odwołują się do nieistniejących plików `style.min.css`, `script.min.js`, `theme-init.min.js`,
- `robots.txt` blokuje indeksowanie całego serwisu (`Disallow: /`).

## 2) P0 — Critical risks (real issues only)

1. **Brak kluczowych assetów produkcyjnych**
   - HTML ładuje `css/style.min.css`, `js/script.min.js`, `js/theme-init.min.js`, ale pliki nie istnieją w repo.
   - Skutek: brak stylów i/lub brak działania krytycznych interakcji JS (menu, aria-state updates, formularz, lightbox, itp.) po wdrożeniu bez procesu build w pipeline.

2. **Globalna blokada SEO w `robots.txt`**
   - `User-agent: *` + `Disallow: /` całkowicie wyklucza crawl/index.
   - Skutek: serwis portfolio nie będzie indeksowany przez wyszukiwarki.

## 3) Strengths

- **Semantyka i a11y**: obecne landmarki (`header`, `main`, `footer`), skip link, aria-atrybuty i mechanizmy klawiaturowe w JS.
- **Motion accessibility**: wielokrotne warunki `prefers-reduced-motion` zarówno w CSS, jak i JS.
- **SEO metadata coverage**: canonical, OpenGraph, Twitter Cards, osobne JSON-LD dla stron.
- **Performance foundations**: obrazy AVIF/WEBP/JPG + `srcset`, lazy loading, preload fontów i hero image.
- **Deploy hygiene**: obecne `_headers` (CSP i security headers) oraz `_redirects`.

## 4) P1 — 5 improvements worth doing next (exactly five)

1. **Dokończyć i wymusić pipeline assetów produkcyjnych**
   - Dodać generowanie `theme-init.min.js` i fail build, gdy brakuje któregokolwiek assetu referencjonowanego przez HTML.

2. **Ujednolicić nomenklaturę klas względem BEM**
   - Obecnie występuje miks stylów (`hero__media` obok klas typu `header-bar`, `block-head`, `card`) — warto doprowadzić do jednej, konsekwentnej konwencji.

3. **Rozdzielić CSS architektonicznie na pliki warstwowe**
   - Tokeny, base/layout/components/utilities istnieją logicznie, ale są utrzymywane w jednym dużym `style.css`; warto rozdzielić źródła i łączyć je buildem.

4. **Doprecyzować politykę robots dla środowisk**
   - Wersja demo może pozostać noindex, ale wariant portfolio/produkcyjny powinien mieć indeksację zgodną z celem publikacji.

5. **Dodać automatyczne testy statyczne jakości**
   - Link check, asset existence check, prosty lint a11y/HTML i smoke testy JS przed deployem.

## 5) Future enhancements — 5 realistic ideas (exactly five)

1. Dodać krytyczny CSS inline + reszta asynchronicznie dla szybszego FCP/LCP.
2. Wprowadzić budżety wydajności i monitorować Web Vitals w CI.
3. Rozbudować formularz o backend (np. walidacja serwerowa + ochrona antyspam).
4. Uzupełnić analitykę zdarzeń UX (klik CTA, scroll depth, submit form).
5. Dodać testy regresji wizualnej dla sekcji hero/oferta/faq.

## 6) Architecture Score (0–10)

**Wynik ogólny: 7.4 / 10**

- **BEM consistency: 6.8 / 10**
  - Dobre praktyki częściowo obecne, ale naming klas nie jest w pełni jednolity.
- **Token usage: 8.6 / 10**
  - Silne użycie custom properties (kolory, spacing, typografia, cienie, promienie).
- **Accessibility: 7.8 / 10**
  - Dobra baza semantyczna i ARIA; realny spadek oceny przez ryzyko niedziałającego JS przy brakujących assetach.
- **Performance: 7.3 / 10**
  - Dobre obrazy i preload, ale duże monolity CSS/JS i brak spójnego artefaktu produkcyjnego.
- **Maintainability: 6.5 / 10**
  - Czytelna struktura katalogów, jednak monolityczny CSS/JS i brak twardej walidacji pipeline’u utrudniają skalowanie.

## 7) Senior rating (1–10)

**7 / 10**

To jakościowy projekt portfolio z dobrą świadomością front-end fundamentals, ale obecne P0 (missing build artifacts + globalny `Disallow`) są blokujące dla publikacji „production-grade”. Po zamknięciu tych punktów i ujednoliceniu architektury CSS/BEM projekt może wejść na poziom 8.5+.
