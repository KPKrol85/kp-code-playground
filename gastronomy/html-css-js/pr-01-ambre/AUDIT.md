# AUDYT ARCHITEKTURY FRONT-END — AMBRE (pr-01-ambre)

## 1. Executive Summary
Projekt ma dojrzałą, modularną strukturę statycznego front-endu: rozdzielone warstwy CSS (`base/components/layout/pages`), podział JavaScript na moduły funkcjonalne oraz komplet podstaw SEO/PWA (canonical, OpenGraph, manifest, service worker, robots, sitemap). Architektura jest spójna dla głównych podstron i ma dobrą bazę jakościową (lokalne skrypty QA dla linków, SEO, a11y, HTML). Główne ryzyka nie są krytyczne runtime, ale dotyczą utrzymania długoterminowego: powtarzalności szablonów HTML, częściowej niespójności semantyki ARIA dla tabów i manualnych kroków utrzymaniowych przy CSP.

## 2. P0 — Critical Risks
No P0 issues detected.

## 3. Strengths
- **Dobra baza dostępności i fallback bez JS**: obecne `skip-link`, globalne style `:focus-visible`, tryb `no-js` dla nawigacji i redukcja animacji przez `prefers-reduced-motion`. (dowód: `css/components/utilities.css`, `index.html`, `js/modules/utils.js`)
- **Kompletna warstwa SEO on-page na stronach głównych i legal**: `canonical`, OpenGraph/Twitter, `application/ld+json` (dla większości kluczowych stron), `robots.txt` oraz `sitemap.xml` wskazują na świadomą strategię indeksacji. (dowód: `index.html`, `menu.html`, `galeria.html`, `cookies.html`, `polityka-prywatnosci.html`, `regulamin.html`, `robots.txt`, `sitemap.xml`)
- **Silna dyscyplina bezpieczeństwa nagłówków**: obecne HSTS, COOP, X-Frame-Options, Permissions-Policy i rozbudowane CSP w `_headers`. (dowód: `_headers`)
- **Pragmatyczna strategia offline/PWA**: service worker precache’uje shell aplikacji i ma fallback strony offline oraz obrazu offline. (dowód: `sw.js`, `offline.html`, `manifest.webmanifest`)
- **Własne narzędzia QA w repo**: dedykowane skrypty do linków/SEO/a11y/no-JS/tekstów wspierają proces kontroli jakości. (dowód: `scripts/qa-links.mjs`, `scripts/qa-seo.mjs`, `scripts/qa-a11y.mjs`, `scripts/qa-nojs-e2e.mjs`, `scripts/text-lint.mjs`, `package.json`)

## 4. P1 — Exactly 5 Improvements Worth Doing Next

### 1) Ujednolicić semantykę ARIA dla komponentu tabów
**Powód:** W znacznikach tabów występuje niespójność atrybutów (`aria-controls` obecne tylko częściowo, brak pełnego spięcia tab ↔ panel we wszystkich wariantach), co obniża przewidywalność dla technologii asystujących.

**Sugerowane usprawnienie:**
- Nadać każdemu tabowi unikalne `id`.
- Każdemu panelowi przypisać `role="tabpanel"` + `aria-labelledby`.
- Ujednolicić `aria-controls` dla wszystkich tabów albo przejść na prostszy wzorzec filtrów bez `role="tab"`, jeśli to nie są klasyczne panele.

### 2) Ograniczyć duplikację layoutu (header/footer/head) między podstronami
**Powód:** Te same duże bloki HTML powtarzają się w wielu plikach, co podnosi koszt zmian i ryzyko dryfu treści/metadanych.

**Sugerowane usprawnienie:**
- Wprowadzić prosty etap build (np. Nunjucks/11ty/Vite static include) do składania wspólnych partiali (`head`, `header`, `footer`, baner demo), pozostawiając finalnie statyczny output.

### 3) Zautomatyzować aktualizację hashy CSP w pipeline build/deploy
**Powód:** `_headers` zawiera sekcję hashy CSP, a ich aktualizacja zależy od osobnej komendy (`csp:hash`), co przy zmianach inline scriptów grozi niedopasowaniem polityki i regresją po wdrożeniu.

**Sugerowane usprawnienie:**
- Włączyć `npm run csp:hash` do sekwencji `build`/`check` lub workflow CI przed deployem.
- Dodać walidację, która failuje build, gdy hashy brakuje lub są niezgodne.

### 4) Spiąć wszystkie skrypty QA z CI dla tego projektu
**Powód:** Istnieje bogaty zestaw testów (`qa:*`), ale bez jawnej, lokalnej konfiguracji CI w katalogu projektu nie ma gwarancji, że pełny pakiet uruchamia się przy każdym pushu.

**Sugerowane usprawnienie:**
- Dodać workflow CI dedykowany temu katalogowi (matrix: linki/SEO/HTML/JS/CSS, opcjonalnie a11y/no-JS).
- Ustawić progi quality gate i artefakty raportów.

### 5) Ujednolicić strategię danych strukturalnych dla stron specjalnych
**Powód:** `application/ld+json` jest obecne na głównych stronach, ale nie jest konsekwentne na stronach specjalnych (np. offline/404), co utrudnia spójne zarządzanie SEO i polityką metadanych.

**Sugerowane usprawnienie:**
- Zdefiniować politykę: które typy stron mają JSON-LD, a które świadomie nie.
- Udokumentować wyjątki i egzekwować je skryptem QA.

## 5. P2 — Minor Refinements (optional)
- Drobna higiena treści UI: w kilku miejscach teksty wyglądają na wersje bez polskich znaków (np. komunikaty demo/offline), warto ujednolicić warstwę copy pod kątem jakości językowej i spójności brandowej.
- Rozważyć dodanie `lastmod` w `sitemap.xml` dla lepszej sygnalizacji zmian treści.

## 6. Future Enhancements — Exactly 5 Ideas
1. Dodać budowanie krytycznego CSS dla strony głównej (critical path) przy zachowaniu obecnej modularności plików.
2. Wprowadzić budżety wydajności (Lighthouse CI budgets) jako warunek merge/deploy.
3. Rozszerzyć monitoring jakości o wizualne testy regresji dla komponentów (hero, menu grid, lightbox).
4. Dodać i18n-ready strukturę treści (np. pliki tłumaczeń) bez zmiany obecnej architektury statycznej.
5. Rozszerzyć service worker o strategię stale-while-revalidate dla wybranych assetów statycznych.

## 7. Compliance Checklist (pass / fail)
- headings structure valid — **pass**
- no broken links (excluding .min strategy) — **pass**
- no console.log — **pass** (w runtime `js/**` not detected in project)
- aria attributes valid — **fail** (niespójna implementacja wzorca tabów)
- images have width/height — **pass** (weryfikacja QA SEO: pass)
- no-JS baseline usable — **pass**
- robots.txt present (if expected) — **pass**
- sitemap.xml present (if expected) — **pass**
- OpenGraph image present — **pass**
- JSON-LD valid (if present) — **pass**

## 8. Architecture Score (1–10)
- structural consistency: **8/10**
- accessibility maturity: **7/10**
- performance discipline: **8/10**
- SEO correctness: **8/10**
- maintainability: **7/10**

**Wynik łączny: 7.6/10**

## 9. Senior Rating (1–10)
**7.5/10**

Projekt jest technicznie solidny i produkcyjnie bliski „ready”, szczególnie w obszarach SEO, PWA i organizacji kodu. Największy potencjał poprawy dotyczy utrzymania (duplikacja HTML) oraz domknięcia semantyki komponentów interaktywnych pod pełne a11y. Po wdrożeniu wskazanych P1 architektura może wejść na poziom 8.5+ bez gruntownej przebudowy.
