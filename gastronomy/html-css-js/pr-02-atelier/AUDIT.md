# Front-End Audit — Atelier No.02

## 1. Executive summary
- Projekt ma dojrzałą strukturę warstw CSS (base/layout/components/pages/utilities), konsekwentny styl nazewnictwa i dobrze rozdzielone moduły JS.
- Rdzeń dostępności jest wdrożony: skip link, fokus klawiatury, `aria-*`, fallbacki no-JS, redukcja ruchu.
- Występują jednak krytyczne ryzyka deploymentowe (P0): konfiguracja przekierowań i nagłówków jest niespójna z oczekiwaniami Netlify.
- Dodatkowo stwierdzono problemy utrzymaniowe i jakościowe (P1), m.in. niespójność metadanych OG oraz pojedynczy brakujący asset.

## 2. P0 — Critical risks

### P0-1: Brak aktywnego pliku `_redirects` dla hostingu Netlify
- **Impact:** niestandardowa obsługa 404 może nie działać w produkcji, co obniża niezawodność nawigacji i SEO crawl path.
- **Evidence:** plik przekierowań występuje jako `_redirects.txt`, nie `_redirects` (`_redirects.txt:1`).
- **Fix:** zmienić nazwę pliku na `_redirects` i ponownie zweryfikować regułę `/* /404.html 404` po wdrożeniu.
- **Effort:** S

### P0-2: Niepoprawna składnia kluczowych reguł w `_headers`
- **Impact:** nagłówki bezpieczeństwa i cache mogą nie być stosowane, co wpływa na bezpieczeństwo i stabilność cache policy w produkcji.
- **Evidence:** w `_headers` użyto nietypowych patternów (`/\*`, `/assets/_`, `Access-Control-Allow-Origin: _`), które nie odpowiadają poprawnej składni reguł ścieżek i wartości CORS (`_headers:1`, `_headers:29`, `_headers:31`).
- **Fix:** zastosować poprawne wildcardy (`/*`, `/assets/*`, `/assets/fonts/*`) oraz poprawną wartość CORS (np. `*` lub konkretna domena); zwalidować konfigurację na Netlify deploy preview.
- **Effort:** M

## 3. Strengths
- Dobra modularność CSS: `tokens.css`, separacja layout/components/pages/utilities.
- Konsekwentne użycie tokenów spacing/radius/colors.
- Rozbudowana obsługa interakcji klawiaturowych w nawigacji mobilnej i modalach.
- Obrazy responsywne (`avif`/`webp`/`jpg`) z atrybutami wymiarów.
- PWA baseline: manifest, Service Worker, strona `offline.html`, `robots.txt`, `sitemap.xml`.

## 4. P1 — 5 improvements worth doing next

### P1-1: Niespójność `og:url` na stronie galerii
- **Reason:** `gallery.html` ma canonical ustawiony na `/gallery.html`, ale `og:url` wskazuje `/about.html`.
- **Suggested improvement:** zaktualizować `og:url` w `gallery.html` do `https://gastronomy-project-02.netlify.app/gallery.html`.

### P1-2: Brakujący asset PDF w menu
- **Reason:** odnośnik w sekcji menu wskazuje istniejący placeholder `assets/docs/menu.svg`.
- **Suggested improvement:** dodać brakujący plik lub usunąć link/zmienić target na istniejący zasób.

### P1-3: Produkcyjne logi debugowe w stronach HTML
- **Reason:** rejestracja Service Workera zostawia `console.log`/`console.warn` na wszystkich podstronach.
- **Suggested improvement:** usunąć logi lub opakować je warunkiem środowiskowym tylko dla developmentu.

### P1-4: Strategia cache w `sw.js` obejmuje jednocześnie źródła i build artefacts CSS
- **Reason:** cache predefiniowany zawiera `css/style.css` i `css/style.min.css`, co zwiększa footprint i ryzyko niespójności.
- **Suggested improvement:** cache’ować wyłącznie artefakty runtime (`style.min.css`, `script.min.js`) i kluczowe zasoby produkcyjne.

### P1-5: Formularz kontaktowy bez realnego mechanizmu wysyłki i ochrony antyspamowej
- **Reason:** formularz działa wyłącznie po stronie klienta (`preventDefault` + komunikat), brak honeypot/token/back-end endpoint.
- **Suggested improvement:** podłączyć endpoint (lub provider forms), dodać honeypot i serwerową walidację.

## 5. Future enhancements — 5 realistic ideas
1. Dodać automatyczny test linków i anchorów w CI (np. html-validate + custom checker).
2. Dodać Lighthouse CI z budżetami dla Performance/Accessibility/SEO.
3. Wydzielić wspólne fragmenty HTML (header/footer) do procesu templatingowego przy buildzie statycznym.
4. Rozszerzyć i18n o pełną wersję EN stron (obecnie not detected in project).
5. Dodać consent manager dla cookies analitycznych (jeśli w przyszłości zostaną wdrożone narzędzia trackujące).

## 6. Compliance checklist
- **headings valid:** pass
- **no broken links:** pass (link menu wskazuje istniejący `assets/docs/menu.svg`)
- **no console.log:** fail (`console.log` w snippetach SW registration)
- **aria attributes valid:** pass (sprawdzone m.in. `aria-controls` do istniejących `id`)
- **images have width/height:** pass
- **no-JS baseline usable:** pass
- **sitemap present (if expected):** pass (`sitemap.xml` obecny)
- **robots present:** pass (`robots.txt` obecny)
- **OG image exists:** pass (`assets/img-optimized/og-img/og-img-1200x630.jpg` obecny)
- **JSON-LD valid:** pass (bloki JSON-LD parsują się poprawnie)

## 7. Architecture Score (0–10)
- **BEM consistency:** 8.5/10
- **token usage:** 9/10
- **accessibility:** 8/10
- **performance:** 8/10
- **maintainability:** 7.5/10

**Total Architecture Score:** **8.2/10**

## 8. Senior rating (1–10)
**8/10** — projekt jest solidny architektonicznie i gotowy portfolio-wise, ale wymaga korekt deploymentowych oraz kilku poprawek jakościowych, aby spełniał standard bezwarunkowej produkcyjnej stabilności.
