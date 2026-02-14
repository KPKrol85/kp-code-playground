# AUDIT — pr-02-axiom

## 1. Executive summary
Projekt ma solidną bazę produkcyjną: modularny podział CSS (`tokens/base/layout/components/sections`), osobne skrypty narzędziowe do buildów, komplet metadanych SEO i konsekwentne użycie elementów semantycznych (`header`, `main`, `section`, `article`, `footer`).

Najważniejszy problem wykryty w audycie dotyczy implementacji danych strukturalnych: JSON-LD jest ładowany jako zewnętrzny `src` w znaczniku `<script type="application/ld+json">`, co nie jest poprawnym sposobem publikacji danych strukturalnych dla crawlerów i realnie obniża wartość SEO.

## 2. P0 — Critical risks (real issues only)

1. **JSON-LD prawdopodobnie nie jest konsumowany przez wyszukiwarki (SEO critical).**  
   Wiele stron używa wzorca `<script type="application/ld+json" src="...">` zamiast osadzenia JSON inline. Dla `application/ld+json` oczekiwany jest content wewnątrz tagu; podejście z `src` jest ryzykowne i może skutkować brakiem rich results.  
   Przykłady: `index.html`, `offline.html`, `services/*`, `legal/*`, `404.html`.

## 3. Strengths

- **Architektura CSS jest czytelna i warstwowa** (`tokens`, `base`, `layout`, `components`, `sections`) z pojedynczym entrypointem `css/main.css`.
- **Design tokens są aktywnie używane** (kolory, spacing, powierzchnie, parametry headera), co ułatwia utrzymanie i skalowanie.
- **Dostępność na dobrym poziomie bazowym:** skip-link, `aria-expanded`/`aria-hidden` w menu mobilnym, `aria-live` w formularzu oraz focus styles.
- **Performance baseline jest rozsądny:** `webp/avif + jpg fallback`, `srcset/sizes`, lazy loading obrazów i minifikowane assety w `dist/`.
- **Deploy readiness:** obecne `_headers`, `_redirects`, `manifest.webmanifest`, `sw.js`, `robots.txt`, `sitemap.xml`.

## 4. P1 — 5 improvements worth doing next (exactly five)

1. **Ujednolicić nawigację pod kątem `aria-current` na podstronach usług i legal** (obecnie top-nav na tych stronach nie oznacza aktywnej sekcji/obszaru).
2. **Usunąć martwą warstwę JS FAQ** (`initFaqSection` jest pustą funkcją) albo dodać realną logikę, by uniknąć technicznego długu.
3. **Naprawić niespójność klasy blokującej scroll/menu state** (`nav-open` w JS vs `menu-open` w części utility CSS).
4. **Ujednolicić nazewnictwo BEM w obszarach starszego layoutu** (część selektorów pozostaje generyczna, np. `.service`, `.nav`, `.feature`, co utrudnia pełną skalowalność architektury).
5. **Skorygować PWA shortcut URL** (`/#oferta` → realna sekcja to `#uslugi`), aby skrót prowadził do istniejącego anchoru.

## 5. Future enhancements — 5 realistic ideas (exactly five)

1. Dodać automatyczny CI gate (Lighthouse + Pa11y) jako job w `.github/workflows`.
2. Wprowadzić critical CSS extraction dla above-the-fold i opóźnione ładowanie reszty stylów.
3. Rozbudować telemetrykę front-end (np. Web Vitals do endpointu analitycznego).
4. Dodać mapę XML dla obrazów (`image sitemap`) dla większej ekspozycji realizacji w Google Images.
5. Wprowadzić kontrakt testów linków i assetów (np. skrypt wykrywający osierocone pliki i błędne ścieżki).

## 6. Architecture Score (0–10)

**8.4 / 10**

- **BEM consistency:** 7.8/10  
  Dobra baza, ale niepełna konsekwencja w starszych/globalnych selektorach.
- **Token usage:** 9.1/10  
  Tokeny są centralne i realnie używane w warstwach.
- **Accessibility:** 8.3/10  
  Solidny fundament (skip link, focus, ARIA), do dopracowania sygnalizacja aktywności nawigacji i pełny keyboard QA cross-page.
- **Performance:** 8.5/10  
  Dobre formaty obrazów i lazy loading; można poprawić strategię krytycznej ścieżki CSS i walidację real-user metryk.
- **Maintainability:** 8.4/10  
  Modułowy podział i tooling są dobre; do poprawy drobne niespójności klas/stubów JS.

## 7. Senior rating (1–10)

**8.5 / 10**  
To jest portfolio na poziomie profesjonalnym i bliskim produkcji. Główna korekta wymagana przed „client-ready SEO” to poprawna publikacja JSON-LD. Po usunięciu tego ryzyka i dopięciu kilku P1 projekt będzie bardzo mocnym case study.
