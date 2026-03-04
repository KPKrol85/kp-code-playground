# 1. Executive Summary

Projekt `pr-01-solidcraft` ma architekturę statycznego serwisu wielostronicowego (13 dokumentów HTML) z modularnym CSS i modułowym JavaScriptem, oraz konfiguracją pod Netlify/PWA (`_headers`, `_redirects`, `manifest.webmanifest`, `sw.js`). Implementacja jest spójna semantycznie, ma rozbudowane metadane SEO i poprawną strategię obrazów responsywnych. Wykryto jednak realne ryzyka produkcyjne w warstwie deploy/service worker, które wymagają priorytetowej korekty.

# 2. P0 — Critical Risks

## P0.1 — Błąd wykonania w Service Worker podczas `activate`

- **Impact:** Service Worker może nie przejść poprawnie fazy aktywacji (ReferenceError), co zwiększa ryzyko niestabilnego cache i problemów offline.
- **Evidence:** w `sw.js` używany jest `CACHE_PREFIX` w `activate`, ale zmienna nie jest nigdzie zdefiniowana.
- **Fix:** zdefiniować `CACHE_PREFIX` (np. `const CACHE_PREFIX = `${APP_ID}-v`;`) albo filtrować po `APP_ID`/`CACHE_NAME` bez niezdefiniowanej stałej.
- **Effort:** S

## P0.2 — Niespójny kontrakt build/deploy dla Netlify (`publish = dist` bez tworzenia `dist`)

- **Impact:** realne ryzyko pustej lub nieaktualnej publikacji na Netlify.
- **Evidence:** `netlify.toml` ustawia `publish = "dist"` i `command = "npm run build"`, a `package.json` definiuje `build` tylko jako minifikację CSS/JS; tworzenie `dist` istnieje osobno w `build:dist`.
- **Fix:** zmienić komendę Netlify na pipeline obejmujący `build:dist` (np. `npm run build:dist`) albo zaktualizować `build`, aby zawsze tworzył `dist`.
- **Effort:** S

# 3. Strengths

- Dobra baza dostępności: `skip link`, semantyczne sekcje (`header/nav/main/footer`), etykiety pól formularza, focus styles i fallback `.no-js` w CSS.
- Dojrzała warstwa SEO: `canonical`, OpenGraph, Twitter Cards, `robots.txt`, `sitemap.xml` i JSON-LD na kluczowych stronach.
- Strategia obrazów jest wydajna: `picture` + AVIF/WEBP/JPG, `srcset`, `sizes`, `loading`, oraz jawne `width/height`.
- Architektura JS jest modularna (`js/modules/*`) i rozdziela odpowiedzialności (nawigacja, formularze, lightbox, mapa, cookies).
- Konfiguracja bezpieczeństwa HTTP jest obecna (`Content-Security-Policy`, HSTS, `X-Content-Type-Options`, `Permissions-Policy`).

# 4. P1 — Exactly 5 Improvements Worth Doing Next

## P1.1 — Uzgodnić CSP z użyciem inline JSON-LD

- **Reason:** `_headers` zawiera `script-src 'self' ...` bez nonce/hash/`'unsafe-inline'`, a strony zawierają inline `<script type="application/ld+json">`.
- **Suggested improvement:** dodać nonce/hash dla inline JSON-LD lub przenieść JSON-LD do zewnętrznych plików dozwolonych przez CSP.

## P1.2 — Naprawić niespójny host w generatorze sitemap

- **Reason:** `package.json` ma `build:sitemap` z `SITE_URL=https://construction-pr01-solidcraft.netlify.app` (bez `-`), podczas gdy canonical/robots/sitemap używają `construction-pr01-solidcraft.netlify.app`.
- **Suggested improvement:** ujednolicić `SITE_URL` do produkcyjnego hosta we wszystkich skryptach build.

## P1.3 — Ograniczyć duplikację `head`/`header`/`footer` między stronami

- **Reason:** powtarzalne bloki HTML występują w `index.html`, `oferta/*.html`, `doc/*.html`, `404.html`, `offline.html`, `thank-you.html`, co zwiększa koszt utrzymania i ryzyko rozjazdów.
- **Suggested improvement:** wdrożyć etap generowania z partiali/layoutów (SSG lub prosty build templates).

## P1.4 — Ujednolicić strategię runtime assets vs pre-cache SW

- **Reason:** runtime ładuje `css/style.css` i `js/script.js`, a pre-cache SW zawiera `css/style.min.css` i `js/script.min.js`.
- **Suggested improvement:** dopasować listę `ASSETS` w `sw.js` do faktycznie serwowanych plików runtime dla aktualnego trybu deploy.

## P1.5 — Ustabilizować bramkę a11y w procesie predeploy

- **Reason:** `npm run qa:a11y` kończy się błędem `Missing dependency: playwright`, więc kontrola a11y nie jest gwarantowana w każdym środowisku.
- **Suggested improvement:** zapewnić instalację Playwright w CI i uruchamiać `check:predeploy` jako obowiązkowy quality gate.

# 5. P2 — Minor Refinements (optional)

- Rozważyć ograniczenie liczby preloadów fontów do faktycznie krytycznych zasobów LCP po pomiarach Web Vitals.
- Dodać automatyczną walidację danych strukturalnych (JSON-LD) w pipeline CI.
- Ujednolicić i udokumentować źródło prawdy dla wersjonowania cache (`CACHE_VERSION`) i procesu invalidacji po deploy.

# 6. Future Enhancements — Exactly 5 Ideas

1. Dodać Lighthouse CI (Performance/A11y/SEO/Best Practices) jako stały quality gate.
2. Wprowadzić test regresji wizualnej kluczowych widoków (home + podstrony oferty + strony dokumentów).
3. Rozszerzyć monitoring błędów front-end (np. raportowanie błędów JS/SW po deploy).
4. Zautomatyzować generowanie `sitemap.xml` i `lastmod` na podstawie zmian plików.
5. Dodać smoke testy nawigacji klawiaturowej i formularza w trybie headless.

# 7. Compliance Checklist (pass / fail)

- headings structure valid — **pass**
- no broken links (excluding .min strategy) — **pass**
- no console.log — **pass**
- aria attributes valid — **pass**
- images have width/height — **pass**
- no-JS baseline usable — **pass**
- robots.txt present (if expected) — **pass**
- sitemap.xml present (if expected) — **pass**
- OpenGraph image present — **pass**
- JSON-LD valid (if present) — **pass**

# 8. Architecture Score (1–10)

- structural consistency — **7/10**
- accessibility maturity — **8/10**
- performance discipline — **8/10**
- SEO correctness — **8/10**
- maintainability — **6/10**

**Wynik łączny: 7.4/10**

# 9. Senior Rating (1–10)

**7/10**

Projekt ma solidny poziom wykonania front-endowego: dobra semantyka, wysoka dyscyplina SEO i poprawne wzorce wydajnościowe w warstwie assetów. Największe ryzyko dotyczy operacyjnej spójności wdrożenia i błędu w Service Workerze. Po usunięciu P0 oraz redukcji duplikacji HTML architektura będzie wyraźnie bardziej odporna i prostsza w utrzymaniu.
