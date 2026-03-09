# AUDIT — pr-02-axiom

## 1. Executive summary
Projekt ma solidną architekturę statycznego MPA: modularny CSS, modułowy JS, wdrożone SEO/PWA i dobre fundamenty a11y. Największe ryzyka dotyczą spójności operacyjnej (brak aktywnych reguł w `_redirects`, błędne ścieżki części linków wewnętrznych na podstronach legal, niespójność źródła JSON-LD względem plików `js/structured-data`).

## 2. P0 — Critical risks
Brak potwierdzonych problemów klasy P0 na podstawie statycznej analizy repozytorium.

## 3. Strengths
- Spójna baza SEO: canonical + OG + robots + sitemap + JSON-LD na stronach głównych i podstronach. (np. `index.html`, `legal/regulamin.html`).
- Dobre fundamenty dostępności: skip link, `aria-current`, `aria-expanded`, live regiony formularza, focus management w menu/lightbox/cookie modal.
- Responsywne obrazowanie (`picture`, AVIF/WebP/JPEG, `srcset`) i jawne wymiary obrazów.
- Modularna organizacja CSS i JS (`css/*`, `js/*`) poprawiająca utrzymanie.
- Obecna warstwa PWA i polityki nagłówków (`manifest.webmanifest`, `sw.js`, `_headers`).

## 4. P1 — Improvements worth doing next (exactly 5)
1. **Błędne linki względne na podstronach legal (integralność nawigacji).**  
   Dowód: `legal/kariera.html:384`, `legal/kariera.html:388-389`, `legal/polityka-cookies.html:526`, `legal/polityka-cookies.html:530-531` zawierają odwołania `href="legal/..."` będąc już w katalogu `legal/`.

2. **Brak aktywnych reguł przekierowań w `_redirects` mimo komentarzy o WWW/HTTPS/trailing slash.**  
   Dowód: `_redirects:1-4` zawiera tylko komentarze, bez realnych mapowań.

3. **Skrypty QA są shellowo windowsowe (`if not exist`) i nie są przenośne na bash/Linux.**  
   Dowód: `package.json:40-42`.

4. **Dublowanie / rozjazd źródła JSON-LD (inline w HTML + osobne pliki `js/structured-data/*.json`).**  
   Dowód: inline bloki np. `index.html:56-257`, `index.html:228-257`; osobne pliki danych np. `js/structured-data/index.json`, `js/structured-data/legal-regulamin.json`.

5. **Service worker używa fallbacku `./index.html`, który nie jest pre-cache'owany w tablicy `ASSETS` (możliwy niespójny fallback offline).**  
   Dowód: `sw.js:6` (ASSETS bez `index.html`) oraz `sw.js:40` (`caches.match("./index.html")`).

## 5. P2 — Minor refinements
- Ujednolicić konwencję nazw klas body dla stanu menu (`menu-open` pojawia się w utility, runtime używa `nav-open`), aby ograniczyć ryzyko regresji stylistycznych. Dowód: `css/components/utilities.css:70,161`, `js/components/navigation.js:13-14`, `css/layout/layout.css:297,381`.
- Rozważyć doprecyzowanie komentarzy/implementacji `Cache-Control` dla `manifest.webmanifest` (immutable + 1 dzień), by uprościć operacyjne aktualizacje PWA. Dowód: `_headers:27-29`.
- `initFaqSection` jest pustą implementacją; warto albo usunąć hook, albo dodać docelową logikę. Dowód: `js/sections/faq.js:1` i `js/core/init.js:9,21`.

## 6. Future enhancements (exactly 5)
1. Dodać automatyczny test integralności linków lokalnych do stałego pipeline QA (nie tylko workflow repo-level).
2. Znormalizować generację `<head>` i JSON-LD tak, aby HTML był budowany z jednego źródła danych.
3. Rozszerzyć statyczne testy a11y o keyboard-flow smoke tests dla menu/lightbox/modal.
4. Dodać walidację zgodności metadanych SEO (canonical ↔ og:url ↔ sitemap) jako check CI.
5. Dodać raport pokrycia obrazów (lazy loading + dimension attributes) na wszystkich stronach jako quality gate.

## 7. Compliance checklist
- **Headings valid:** **PASS** — każda z 15 stron HTML ma pojedynczy `h1` (kontrola skryptem: `for f in *.html legal/*.html services/*.html; do rg -o "<h1" "$f" | wc -l; done`).
- **No broken links (excluding intentional minification/build strategy):** **FAIL** — wykryte błędne ścieżki `legal/legal/...` w dwóch podstronach legal (patrz P1.1).
- **No console.log:** **FAIL** — `console.log` występuje w skryptach narzędziowych (`tools/images/build-images.mjs:56,143-146,149,151`, `tools/sw/build-sw.mjs:73`, `tools/html/build-head.mjs:104`).
- **ARIA attributes valid:** **PASS (statycznie)** — poprawne użycia `aria-current`, `aria-expanded`, `aria-live`, `aria-hidden` w głównych komponentach (`index.html:285`, `index.html:306`, `index.html:1144`, `js/components/navigation.js:33-37,43-47,66-70`).
- **Images have width/height:** **PASS (sampled + main templates)** — obrazy treści mają jawne wymiary (`index.html:346-347`, `index.html:453-454`, `index.html:668-669`, `index.html:1235-1236`).
- **No-JS baseline usable:** **PASS** — nawigacja bez JS pozostaje widoczna (`css/layout/layout.css:202-207`), formularz ma noscript fallback (`index.html:1213-1215`).
- **Sitemap present if expected:** **PASS** — `sitemap.xml` obecny i wskazany w robots (`sitemap.xml:1-80`, `robots.txt:17`).
- **Robots present:** **PASS** — `robots.txt` obecny (`robots.txt:4-17`) + meta robots w stronach (`index.html:12`).
- **OG image exists:** **PASS** — meta OG image ustawione (`index.html:20`) i plik istnieje (`assets/img/og/og-1200x630.jpg`).
- **JSON-LD valid:** **PASS (statyczny parse)** — 15 bloków JSON-LD parsuje się bez błędów (komenda node wykonana podczas audytu).

## 8. Architecture score (0–10)
**8.2 / 10**
- **BEM consistency: 8.4/10** — konwencja `block__element` jest dominująca (`site-nav__item`, `project-modal__content`, `footer__section`).
- **Token usage: 8.6/10** — warstwa tokenów i motywowania (light/dark) jest spójna (`css/tokens/tokens.css`, `css/main.css:1-19`).
- **Accessibility: 8.3/10** — mocne fundamenty semantyki/focus/no-JS + reduced-motion; do poprawy link integrity i dalsza automatyzacja testów.
- **Performance: 8.0/10** — nowoczesne formaty obrazów, lazy loading, font preload, cache policy; drobne niespójności SW/deploy.
- **Maintainability: 7.8/10** — dobra modularność, ale rozjazdy w JSON-LD oraz nieprzenośne skrypty QA obniżają ocenę.

## 9. Senior rating (1–10)
**8.1 / 10**  
Projekt jest technicznie dojrzały jak na statyczny front-end: ma przemyślaną strukturę, SEO/PWA/a11y i rozsądny podział kodu. Ocena jest obniżona głównie przez kwestie operacyjno-utrzymaniowe (linking na części podstron, `_redirects` bez aktywnych reguł, cross-platform QA scripts), a nie przez błędy architektury bazowej.
