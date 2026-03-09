# AUDIT — pr-02-axiom

## 1) Executive summary
Projekt jest dobrze ustrukturyzowanym serwisem statycznym z modularnym CSS/JS, wielostronicowym SEO i podstawami PWA. Nie wykryto jednoznacznych awarii P0 w kodzie źródłowym, ale istnieją istotne ryzyka jakościowe (ścieżki względne w części podstron legal, niespójność ścieżek SW vs runtime assets, zależność od builda dla stylów). Dowody: `index.html:52-54`, `legal/regulamin.html:545-550`, `sw.js:6`, `js/core/service-worker.js:4`.

## 2) P0 — Critical risks
Brak wykrytych potwierdzonych problemów klasy P0 na podstawie statycznej analizy repozytorium.

## 3) Strengths
- Rozbudowana implementacja SEO: canonical + OG + Twitter + robots meta + JSON-LD na stronach. Dowód: `index.html:11-33`, `index.html:56-257`.
- Dostępność bazowa jest obecna: skip-link, aria dla nawigacji, focus-visible, komunikaty formularza, no-JS fallback. Dowód: `index.html:263`, `index.html:306`, `css/base/base.css:65-68`, `index.html:1143-1215`.
- Dobre podstawy wydajności obrazów: `picture` + AVIF/WebP + `srcset` + `loading="lazy"` + atrybuty wymiarów. Dowód: `index.html:320-350`, `index.html:735-747`.
- Tokenizacja i warstwowość CSS są czytelne (`tokens/base/layout/components/sections`). Dowód: `css/main.css:1-19`, `css/tokens/tokens.css:1-124`.
- Bezpieczniejsza polityka nagłówków dla hostingu (`CSP`, `X-Frame-Options`, `HSTS`, cache policy). Dowód: `_headers:1-40`.

## 4) P1 — Improvements worth doing next (exactly 5)
1. **Błędne ścieżki względne w linkach modalu na stronach `legal/*`** — linki typu `href="legal/..."` wewnątrz katalogu `legal/` kierują do nieistniejącego `legal/legal/...`. Dowód: `legal/regulamin.html:545-550`, `legal/polityka-prywatnosci.html:531-536`, `legal/certyfikaty.html:451-456`.
2. **Niespójność listy precache SW względem faktycznie ładowanych assetów** — SW precachuje `/style.min.css` i `/script.min.js`, podczas gdy HTML ładuje `dist/style.min.css` i `js/main.js` (module). To osłabia skuteczność offline cache. Dowód: `sw.js:6`, `index.html:54`, `index.html:1417`.
3. **Silna zależność runtime od artefaktów build (`dist/style.min.css`)** — bez kroku build strony uruchamiane lokalnie pozostają bez stylów. Dowód: `index.html:52-54`, `404.html:52-54`, `offline.html` (analogicznie), plus lokalny check linków zgłasza brak pliku.
4. **Skrypty QA są platformowo zależne (Windows syntax)** — `if not exist` w `qa:lighthouse` i `qa:a11y` ogranicza przenośność automatyzacji w środowiskach Unix/Linux CI. Dowód: `package.json:40-42`.
5. **Nadmiarowe/globalne reguły focus mogą utrudniać przewidywalność stylów** — jednocześnie istnieją globalne i komponentowe definicje `:focus-visible`, co zwiększa ryzyko konfliktów utrzymaniowych. Dowód: `css/base/base.css:65-68`, `css/components/utilities.css:182-185`, `css/components/utilities.css:205-208`.

## 5) P2 — Minor refinements
- Ujednolicić opisy komentarzy (np. komentarz „LinkedIn” przy linku do Reddita) dla lepszej czytelności kodu. Dowód: `index.html:1330-1332`.
- Rozważyć doprecyzowanie `_redirects` (obecnie głównie komentarze) o finalne reguły produkcyjne, jeśli są oczekiwane. Dowód: `_redirects:1-5`.
- Rozważyć redukcję liczby preloadów do najważniejszych zasobów krytycznych, po pomiarze Lighthouse.

## 6) Future enhancements (exactly 5)
1. Dodać automatyczną walidację linków lokalnych w CI dla wszystkich HTML (z whitelistą dla świadomych decyzji build/deploy).
2. Wprowadzić statyczny lint ARIA/HTML (np. przez pipeline QA) jako stałą bramkę jakości.
3. Zintegrować generowanie i walidację JSON-LD z jednego źródła danych (ograniczenie duplikacji ręcznej).
4. Rozszerzyć testy a11y o kluczowe user flows klawiaturowe (menu mobilne, lightbox, formularz).
5. Dodać automatyczne sprawdzanie spójności `canonical` ↔ `og:url` ↔ `sitemap`.

## 7) Compliance checklist
- **Headings valid:** **PASS** (spójna hierarchia `h1`→`h2`→`h3` na audytowanych stronach). Dowód: `index.html:353`, `index.html:364`, `index.html:460`; `services/budowa-domow.html:153`, `services/budowa-domow.html:195`, `services/budowa-domow.html:198`.
- **No broken links (excluding intentional minification strategy):** **FAIL** (błędne relatywne linki `legal/legal/...`). Dowód: `legal/regulamin.html:545-550`.
- **No console.log:** **FAIL** (występuje w skryptach narzędziowych). Dowód: `tools/images/build-images.mjs:56`, `tools/sw/build-sw.mjs:73`.
- **ARIA attributes valid:** **PASS (static evidence)** — poprawne użycie `aria-controls`, `aria-expanded`, `aria-current`, aktualizowane też w JS. Dowód: `index.html:285`, `index.html:306`, `js/components/navigation.js:10`, `js/components/navigation.js:66`.
- **Images have width/height:** **PASS (spot check representative pages)**. Dowód: `index.html:346-347`, `index.html:744-745`, `index.html:1235-1236`.
- **No-JS baseline usable:** **PASS** (formularz i reCAPTCHA mają komunikaty/no-JS fallback). Dowód: `index.html:1208-1215`.
- **Sitemap present if expected:** **PASS**. Dowód: `sitemap.xml:1-80`.
- **Robots present:** **PASS**. Dowód: `robots.txt:4-17`.
- **OG image exists (declared):** **PASS (declared in metadata)**. Dowód: `index.html:20-25`.
- **JSON-LD valid:** **PASS** (statyczny parse JSON-LD przeszedł dla 15 bloków; brak błędów parsera).

## 8) Architecture score (0–10)
**8.1 / 10**
- **BEM consistency: 8.5/10** — nazewnictwo blok__element jest szeroko stosowane (`site-nav__item`, `footer__section`, `project-modal__content`).
- **Token usage: 8.5/10** — rozbudowane tokeny kolorów/spacing/typografii i warstwy theme light/dark. Dowód: `css/tokens/tokens.css:1-124`.
- **Accessibility: 8.0/10** — dobre fundamenty + reduced motion + no-JS fallback, ale są kwestie link integrity i potencjalnych konfliktów stylów focus.
- **Performance: 7.8/10** — nowoczesne obrazy i lazy loading, ale wymaga lepszej spójności SW/runtime assets.
- **Maintainability: 7.8/10** — modularna struktura, lecz część ścieżek i skryptów QA wymaga ujednolicenia.

## 9) Senior rating (1–10)
**8.0 / 10**

Uzasadnienie: projekt wygląda jak solidna implementacja produkcyjna front-end MPA z myśleniem o SEO, a11y i PWA. Główne braki dotyczą spójności ścieżek i operacyjnej niezawodności build/runtime, a nie fundamentalnej architektury.
