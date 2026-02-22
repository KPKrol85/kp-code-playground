# FRONTEND AUDIT — Ambre (`pr-01-ambre`)

## 1. Executive summary
Projekt prezentuje dojrzałą strukturę portfolio front-end: modularny CSS oparty o tokeny, spójny podział warstw (`base/layout/components/pages`), sensowne moduły JS i konfigurację deploymentu pod Netlify. Wymagane obszary (a11y, SEO, performance, link integrity, deployment, hygiene) są w większości zaadresowane. Najważniejsze obszary do dopracowania dotyczą utrzymania spójności architektonicznej i drobnych braków jakościowych, a nie krytycznej stabilności produkcyjnej.

## 2. P0 — Critical risks (real issues only)
Brak wykrytych P0 w aktualnym stanie kodu (na podstawie przeglądu statycznego oraz uruchomionych kontroli linków).

## 3. Strengths
- Dobra architektura CSS z wyraźnym podziałem na warstwy i centralizacją tokenów (`css/base/tokens.css`, importy w `css/style.css`).
- Implementacja dostępności obejmuje skip link, focus styles, semantyczną strukturę nagłówków i obsługę klawiatury w nawigacji mobilnej.
- SEO techniczne jest kompletne na poziomie statycznym: canonical, OG, Twitter, robots i sitemap.
- Obecne są mechanizmy performance: obrazy AVIF/WebP/JPEG, preload fontów, `font-display: swap`, lazy loading.
- Projekt zawiera działające skrypty QA i build scripts (`qa:links`, `build:*`, linting).

## 4. P1 — 5 improvements worth doing next

### P1-1. Ujednolicić politykę ścieżek assetów
- **Reason:** Występuje mieszanie ścieżek absolutnych i względnych dla tych samych typów zasobów (np. CSS).
- **Suggested improvement:** Przyjąć jeden standard (preferencyjnie absolutny od root dla Netlify) i ujednolicić wszystkie strony.

### P1-2. Dodać `width`/`height` do dekoracyjnych SVG `<img>`
- **Reason:** Część obrazów (logotypy SVG) nie ma atrybutów wymiarów, co utrudnia pełną kontrolę CLS.
- **Suggested improvement:** Uzupełnić brakujące wymiary lub zastąpić elementy dekoracyjne przez inline SVG/CSS background.

### P1-3. Wzmocnić kontrolę „production hygiene” dla logowania w JS
- **Reason:** W kodzie źródłowym nadal występuje `console.log` w helperze debug (`utils.js`), choć kontrolowany flagą.
- **Suggested improvement:** Dodać regułę lint/CI blokującą produkcyjny `console.*` poza skryptami narzędziowymi.

### P1-4. Rozszerzyć automatyczne QA o walidację JSON-LD i metadanych SEO
- **Reason:** JSON-LD jest obecny, ale brak dedykowanego kroku walidacyjnego w skryptach QA.
- **Suggested improvement:** Dodać etap CI sprawdzający poprawność schematów, canonical/og:url i obecność OG image.

### P1-5. Ujednolicić politykę ładowania artefaktów buildowych
- **Reason:** HTML ładuje obecnie źródłowe `style.css` i `script.js`, mimo dostępnych skryptów bundlowania/minifikacji.
- **Suggested improvement:** Zdecydować i opisać jeden tryb produkcyjny (źródłowy vs minifikowany), a następnie egzekwować go w README i release checklist.

## 5. Future enhancements — 5 realistic ideas
1. Dodać automatyczne testy dostępności (axe-core) dla kluczowych podstron.
2. Wprowadzić Lighthouse CI z progami dla Performance/SEO/Best Practices.
3. Dodać wizualne testy regresji UI dla nawigacji, menu i lightboxa.
4. Dodać wersjonowanie cache SW oparte o hash builda zamiast ręcznego `CACHE_VERSION`.
5. Rozszerzyć i18n o wersję EN dla treści stron (nie tylko dokumentacji).

## 6. Compliance checklist (pass / fail)
- **headings valid:** PASS
- **no broken links:** PASS
- **no console.log:** FAIL
- **aria attributes valid:** PASS
- **images have width/height:** FAIL
- **no-JS baseline usable:** PASS
- **sitemap present (if expected):** PASS
- **robots present:** PASS
- **OG image exists:** PASS
- **JSON-LD valid:** PASS

## 7. Architecture Score (0–10)
- **BEM consistency:** 8.5/10
- **token usage:** 9.5/10
- **accessibility:** 8.5/10
- **performance:** 8.5/10
- **maintainability:** 8.5/10

**Total architecture score:** **8.7/10**

## 8. Senior rating (1–10)
**8.8/10** — Projekt spełnia standard portfolio produkcyjnego: ma dobrą strukturę, rozsądne zabezpieczenia wdrożeniowe i wysoki poziom jakości front-end. Obszary do poprawy mają charakter utrzymaniowy i standaryzacyjny, bez krytycznego ryzyka produkcyjnego.
