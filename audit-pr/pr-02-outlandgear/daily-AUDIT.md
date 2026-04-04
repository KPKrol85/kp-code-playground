# daily-AUDIT — OutlandGear (audit-pr/pr-02-outlandgear)

## 1) Short overall assessment
Projekt jest solidnie zorganizowany jak na statyczny front-end: ma modularny podział CSS/JS, poprawne podstawy semantyki i dobre bazowe A11y/SEO. Największe realne ryzyka są na poziomie P1 (spójność build/runtime oraz niepełny no-JS baseline dla formularzy). Nie wykryto krytycznych blockerów runtime/deploy (P0).

## 2) Strengths
- Modularna architektura stylów przez warstwy (`tokens`, `base`, `layout`, `components`, `pages`) i jeden punkt wejścia CSS. 
- Dobry baseline dostępności: skip-link, `aria-*` w nawigacji, obsługa `Escape`, focus trap i powrót focusu w mobilnym drawerze.
- Progressive enhancement dla współdzielonych partials (`header/footer`) z fallbackiem HTML, gdy fetch partiala się nie powiedzie.
- Widoczne wsparcie `prefers-reduced-motion` przez wyzerowanie czasów przejść i `scroll-behavior`.
- SEO baseline obecny: `description`, canonical, Open Graph, Twitter Card, robots meta, `robots.txt`, `sitemap.xml`, JSON-LD.

## 3) P0 — Critical risks
none detected.

## 4) P1 — Important issues worth fixing next
1. **Niespójność build artifacts vs runtime asset loading (real defect jakościowy).**
   - Build generuje `css/main.min.css` i `js/app.min.js`, ale wszystkie strony HTML ładują `css/main.css` i `js/app.js`.
   - Ryzyko: rozjazd między pipeline release a realnie serwowanymi zasobami oraz większa niejednoznaczność procesu wdrożenia.

2. **Brak pełnego no-JS baseline dla kluczowych formularzy checkout/kontakt (real defect progressive enhancement).**
   - Formularze mają `novalidate`, JS przechwytuje submit przez `preventDefault()`, brak wykrytego `action`/alternatywnego backend workflow.
   - Ryzyko: bez JS użytkownik dostaje ograniczony/niekontrolowany flow wysyłki.

3. **Niespójny model layoutu globalnego (część stron: partials, część stron: pełny inline markup) (real maintainability defect).**
   - Część podstron używa `data-partial-src`, ale np. `produkt.html` ma duplikowany pełny header/footer inline.
   - Ryzyko: drift treści/ARIA/UI i wyższy koszt utrzymania.

4. **Strona produktu aktualizuje canonical dynamicznie, ale nie aktualizuje OG/Twitter/JSON-LD pod `?slug=` (real SEO quality issue).**
   - JS ustawia `document.title`, `meta description` i `canonical`, ale nie aktualizuje pozostałych metadanych social/structured data.
   - Ryzyko: słabsze podglądy share i gorsza spójność metadata dla dynamicznego wariantu produktu.

## 5) P2 — Minor refinements
1. `produkt.html` zawiera dwa `h1` (jeden w `<noscript>`, drugi w głównym layoucie); warto uprościć hierarchię nagłówków.
2. W galerii produktu część miniaturek ma `loading="lazy"`, część nie — drobna niespójność.
3. Linki social w stopce nie mają `rel="noopener noreferrer"` (obecnie bez `target="_blank"` to nie jest aktywny bug, ale warto dodać jako regułę defensywną).
4. `console.log` występuje w narzędziu buildowym `scripts/optimize-images.mjs`; to nie jest problem runtime strony, ale można ujednolicić politykę logowania skryptów.

## 6) Extra quality improvements
- Dodać prostą walidację w CI: integralność `href/src`, meta tag baseline i brak regresji semantyki nagłówków.
- Ujednolicić jeden mechanizm header/footer (preferencyjnie partials) na wszystkich podstronach.
- Rozszerzyć structured data na stronie produktu o `Product`/`Offer` (opcjonalne ulepszenie, nie bieżący defect).
- Doprecyzować strategię deploymentu: jawnie wskazać, czy produkcja serwuje source czy minified assets.
- Jeśli roadmap obejmuje PWA: dopiero wtedy dodać `manifest.webmanifest` i service worker; obecnie **not detected in project**.

## 7) Senior rating (1–10)
**8/10** — Dojrzała baza front-endowa (modularność, A11y fundamentals, SEO baseline, progressive enhancement części layoutu), z kilkoma ważnymi tematami P1 dotyczącymi spójności pipeline i no-JS flow formularzy, które warto domknąć przed traktowaniem projektu jako w pełni production-hardened.
