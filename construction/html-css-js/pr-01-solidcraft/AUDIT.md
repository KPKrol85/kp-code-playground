# AUDIT — SolidCraft (Senior Front-End Review)

## 1) Executive summary
Projekt ma solidną bazę front-end (modułowy CSS oparty o tokeny, konsekwentny układ sekcji, responsywne obrazy i przemyślane komponenty interaktywne). W obecnym stanie nie spełnia jednak kryterium „production-ready portfolio” z perspektywy SEO/deploy i spójności nawigacji, głównie przez konflikt polityki indeksowania, nieprawidłowe osadzanie JSON-LD oraz realnie niedziałające linki.

## 2) P0 — Critical risks (real issues only)

### P0.1 — Konflikt polityki indeksowania (strona faktycznie zablokowana dla robotów)
- **Impact:** Wyszukiwarki nie crawlują projektu (`Disallow: /`), mimo że HTML i sitemap sygnalizują indeksowanie. To blokuje organiczną widoczność i podważa wiarygodność wdrożenia.
- **Evidence:** `robots.txt` zawiera `Disallow: /`; jednocześnie `index.html` ma `meta name="robots" content="index, follow"`, a `_headers` wymusza `X-Robots-Tag: all` globalnie.
- **Fix:** Ujednolicić politykę: dla wersji produkcyjnej zmienić `robots.txt` na `Allow: /` (lub usunąć blokadę), utrzymać spójne meta robots/X-Robots-Tag, zostawić prawidłowy sitemap pointer.
- **Effort:** **S**

### P0.2 — Dane strukturalne JSON-LD nie są osadzone w standardowy sposób
- **Impact:** Strukturalne dane mogą nie zostać przetworzone przez crawlers, co obniża jakość SEO (rich results/entity signals).
- **Evidence:** Strony używają `<script type="application/ld+json" src="...">` zamiast inline JSON-LD, np. `index.html` i podstrony oferty.
- **Fix:** Wstrzyknąć zawartość plików JSON bezpośrednio do `<script type="application/ld+json"> ... </script>` na każdej stronie (lub pipeline build-time inline).
- **Effort:** **M**

### P0.3 — Błędne linki prawne w banerze cookies na stronie głównej
- **Impact:** Użytkownik z `index.html` trafia na nieistniejące ścieżki (`../doc/...`), przez co nie ma dostępu do wymaganych informacji prawnych.
- **Evidence:** `index.html` (sekcja cookie banner) używa `../doc/polityka-prywatnosci.html` i `../doc/cookies.html`.
- **Fix:** Zmienić linki na `doc/polityka-prywatnosci.html` i `doc/cookies.html` (lub absolutne `/doc/...`).
- **Effort:** **S**

### P0.4 — 404 zawiera martwe kotwice i błędny `srcset`
- **Impact:** Nawigacja na stronie błędu prowadzi do nieistniejących sekcji (`#oferta`, `#faq` itd.), a jeden asset brandu wskazuje na nieistniejącą ścieżkę; pogarsza UX i jakość awaryjnej ścieżki.
- **Evidence:** `404.html` ma linki do kotwic nieobecnych w dokumencie oraz `srcset="../assets/img/logo/logo-dark.svg"` przy pliku osadzonym w root.
- **Fix:** W 404 użyć nawigacji do realnych URL (np. `/`, `/oferta/...`, `/doc/...`) i poprawić ścieżkę logo na `assets/img/logo/logo-dark.svg`.
- **Effort:** **S**

## 3) Strengths
- Dobra baza dostępności: skip link, focus-visible, aria dla menu/dropdown, klawiaturowa obsługa ESC/Tab.
- Obrazy mają nowoczesne formaty (`avif/webp/jpg`) i w większości poprawne `loading="lazy"`.
- Formularz zawiera walidację natywną + JS, honeypot i komunikaty statusu (`aria-live`).
- Spójny zestaw tokenów CSS (kolory, spacing, typografia, shadows) i ciemny motyw.
- Obecne pliki deployowe (`_headers`, `_redirects`), `manifest.webmanifest`, `sitemap.xml` i `sw.js`.

## 4) P1 — 5 improvements worth doing next (exactly five)

### P1.1 — Ustabilizować strategię Service Workera
- **Reason:** `sw.js` cache’uje szeroko odpowiedzi bez walidacji statusów/typów, co zwiększa ryzyko utrwalenia błędnych odpowiedzi i trudniejszych rollbacków.
- **Suggested improvement:** Wprowadzić strategię per typ zasobu (HTML network-first + fallback, static cache-first z wersjonowaniem), cache tylko `GET`, tylko `res.ok`, i wykluczyć requesty cross-origin niekrytyczne.

### P1.2 — Uspójnić branding i nazewnictwo semantyczne
- **Reason:** Występują mieszane nazwy i opisy (`Construction Project`, literówki typu `electrition`), co obniża profesjonalny odbiór kodu portfolio.
- **Suggested improvement:** Przejrzeć copy/klasy/nazwy assetów i ujednolicić do jednej nomenklatury `SolidCraft`.

### P1.3 — Domknąć wymiary obrazów dla pełnej stabilności layoutu
- **Reason:** Część obrazów (głównie logotypy w headerach) nie ma `width`/`height`, co utrudnia eliminację CLS na wolnych połączeniach.
- **Suggested improvement:** Dodać wymiary do wszystkich `<img>` (w tym logo) lub użyć `aspect-ratio` + jawnych rozmiarów kontenera.

### P1.4 — Zredukować ryzyko rozjazdu source/minified assets
- **Reason:** Repo utrzymuje równolegle `style.css`/`style.min.css` i `script.js`/`script.min.js`; łatwo o niespójność przy ręcznych zmianach.
- **Suggested improvement:** Wymusić build-step w CI przed deployem i/lub commitować tylko źródła + artefakty release.

### P1.5 — Doprecyzować politykę prywatności dla osadzeń zewnętrznych
- **Reason:** Mapa Google ładowana jest po zgodzie kliknięciem, ale dokumentacja prywatności może precyzyjniej opisać przepływ danych do dostawcy.
- **Suggested improvement:** W `doc/polityka-prywatnosci.html` dodać sekcję o danych przekazywanych do Google Maps i podstawie prawnej/retencji.

## 5) Future enhancements — 5 realistic ideas (exactly five)
1. Dodać automatyczny test link-check + anchor-check w CI.
2. Wdrożyć Lighthouse CI z budżetami (Performance/Accessibility/SEO).
3. Rozszerzyć formularz o jawny checkbox zgody marketingowej (jeśli planowany remarketing).
4. Zbudować pipeline generowania inline JSON-LD na etapie build.
5. Rozszerzyć `sitemap.xml` o `lastmod` automatycznie aktualizowany z git metadata.

## 6) Compliance checklist (pass / fail)
- **headings valid:** **PASS**
- **no broken links:** **FAIL** (cookie banner links w `index.html`, anchor/path issues w `404.html`)
- **no console.log:** **FAIL** (`scripts/images.js` ma `console.log`)
- **aria attributes valid:** **PASS** (menu/dropdown/form używają poprawnych atrybutów)
- **images have width/height:** **FAIL** (część logo bez wymiarów)
- **no-JS baseline usable:** **PASS** (strony i formularz działają bez JS na poziomie bazowym)
- **sitemap present (if expected):** **PASS**
- **robots present:** **PASS** (plik obecny, ale konfiguracja konfliktowa z celem SEO)
- **OG image exists:** **PASS**
- **JSON-LD valid:** **FAIL** (pliki JSON są poprawne, ale sposób osadzenia w HTML jest niepoprawny)

## 7) Architecture Score (0–10)
- **BEM consistency:** 7.5/10
- **token usage:** 8.5/10
- **accessibility:** 7.5/10
- **performance:** 7.0/10
- **maintainability:** 7.0/10

**Overall architecture score:** **7.5/10**

## 8) Senior rating (1–10)
**7.0/10** — Projekt ma bardzo dobrą bazę techniczną i modularność, ale wymaga korekt krytycznych w SEO/deploy (robots + JSON-LD) i naprawy realnych błędów linkowania, aby spełnić standard portfolio produkcyjnego.
