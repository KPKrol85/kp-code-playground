# AUDIT — Axiom Construction (Senior Front-End Review)

## 1. Executive summary
Projekt ma dojrzałą bazę front-endową: modularny CSS/JS, poprawne wykorzystanie tokenów i wielostronicową strukturę gotową do statycznego deploymentu. Audyt nie wykrył aktywnych błędów klasy P0 w aktualnym stanie kodu. Najważniejsze obszary do dopracowania dotyczą spójności SEO między wszystkimi podstronami, strategii cache SW dla dokumentów HTML oraz dalszego porządkowania architektury utrzymaniowej.

## 2. P0 — Critical risks (real issues only)
Brak aktywnych ryzyk klasy **P0** wykrytych w analizowanym katalogu.

## 3. Strengths
- Spójna, warstwowa architektura CSS (`tokens`, `base`, `layout`, `components`, `sections`) i centralny punkt wejścia `css/main.css`.
- Dobre podstawy dostępności: skip link, semantyczne nagłówki, `aria-expanded`/`aria-current`, focus-visible, obsługa `prefers-reduced-motion`.
- Rozsądny podział kodu JS na domeny odpowiedzialności (`core/components/sections/utils`) i prosty bootstrap (`initApp`).
- Dobrze przygotowane media: formaty AVIF/WEBP/JPG, `srcset/sizes`, lazy loading i atrybuty wymiarów dla większości grafik.
- Kompletna baza SEO/deploy/PWA: canonicale, robots, sitemap, JSON-LD, `_headers`, `_redirects`, `manifest.webmanifest`, `sw.js`.

## 4. P1 — 5 improvements worth doing next

### 1) Ujednolicenie OpenGraph na `success.html`
- **Reason:** `success.html` ma canonical i JSON-LD, ale brak `og:url`, co obniża spójność udostępnień social względem pozostałych podstron.
- **Suggested improvement:** dodać `meta property="og:url"` zgodny z canonical i utrzymywać checklistę meta dla wszystkich szablonów.

### 2) Wersjonowanie cache dokumentów HTML w service workerze
- **Reason:** SW wersjonuje cache statyczny (`CACHE_NAME` z rewizją), ale `HTML_CACHE` ma stałą nazwę (`html-pages-v1`), co utrudnia pełne unieważnianie starego HTML po deployu.
- **Suggested improvement:** włączyć rewizję również dla cache HTML i czyścić starsze warianty analogicznie do cache statycznego.

### 3) Redukcja duplikacji sekcji `<head>` między podstronami
- **Reason:** metadane są utrzymywane ręcznie na wielu stronach, co zwiększa koszt zmian i ryzyko niespójności (przykład: różnice OG między stronami).
- **Suggested improvement:** zastosować build-time generator/templating dla powtarzalnych fragmentów head.

### 4) Doprecyzowanie konwencji BEM vs utility classes
- **Reason:** architektura jest poprawna, ale widoczne jest mieszanie klas blokowych i utility bez formalnej reguły granicznej.
- **Suggested improvement:** dodać krótki standard nazewnictwa (co jest utility, co jest blokiem BEM, jak oznaczać modyfikatory).

### 5) Uzupełnienie wymiarów dla dynamicznego obrazu lightboxa
- **Reason:** `img.lb__img` tworzony dla lightboxa nie ma stałych `width/height`; może powodować lokalne CLS podczas otwarcia podglądu.
- **Suggested improvement:** ustawić domyślny ratio kontenera i/lub dynamicznie przypisywać `width`/`height` na podstawie metadanych obrazu.

## 5. Future enhancements — 5 realistic ideas
1. Dodać automatyczny check linków lokalnych i anchorów do CI.
2. Dodać regresję wizualną dla strony głównej + minimum 2 podstron usług.
3. Rozszerzyć structured data o `Organization`/`WebSite` z centralnym `@id` współdzielonym między stronami.
4. Dodać testy smoke dla krytycznych ścieżek klawiaturowych (menu mobilne, formularz, lightbox).
5. Dodać budżety wydajności (CSS/JS/obrazy) z progiem fail w pipeline.

## 6. Compliance checklist (pass / fail)
- **headings valid:** **PASS**
- **no broken links:** **PASS**
- **no console.log:** **FAIL** (wykryte `console.log` w skryptach narzędziowych builda)
- **aria attributes valid:** **PASS**
- **images have width/height:** **FAIL** (`img.lb__img` bez jawnych wymiarów)
- **no-JS baseline usable:** **PASS** (formularz zachowuje natywny `POST` i komunikaty `<noscript>`)
- **sitemap present (if expected):** **PASS**
- **robots present:** **PASS**
- **OG image exists:** **PASS**
- **JSON-LD valid:** **PASS**

## 7. Architecture Score (0–10)
- **BEM consistency:** 8.0/10
- **token usage:** 8.8/10
- **accessibility:** 8.4/10
- **performance:** 8.2/10
- **maintainability:** 8.0/10

**Overall Architecture Score: 8.3 / 10**

## 8. Senior rating (1–10)
**Senior rating: 8.2 / 10**

Projekt prezentuje poziom profesjonalny i jest przekonującym portfolio piece dla front-endu statycznego. Aktualne braki mają charakter głównie porządkujący (spójność SEO i utrzymaniowość), a nie blokujący produkcyjnie.
