# AUDYT ARCHITEKTURY FRONT-END — Atelier No.02

## 1. Executive Summary
Projekt ma dojrzałą strukturę statycznego front-endu: wielostronicowe HTML, warstwowy CSS (base/layout/components/pages), modułowy JavaScript oraz konfigurację deploymentu dla Netlify (`_headers`, `_redirects`, `sw.js`). Implementacja zawiera solidne podstawy dostępności (skip-link, ARIA, fallback `noscript`), SEO (canonical, OpenGraph, JSON-LD, robots, sitemap) i optymalizacji obrazów (`picture`, `srcset`, nowoczesne formaty). Największe ryzyka nie są krytyczne runtime, ale dotyczą spójności architektury uruchomieniowej i utrzymania.

## 2. P0 — Critical Risks
No P0 issues detected.

## 3. Strengths
- Spójny podział warstw CSS oraz centralny punkt kompozycji stylów przez `@import` w `css/style.css`.
  - Evidence: `css/style.css` (importy base/layout/components/pages).
- Dobrze wdrożona semantyka i dostępność bazowa: skip-link, etykiety ARIA, obsługa `noscript`, logiczne sekcje `main`/`nav`/`footer`.
  - Evidence: `index.html:93`, `index.html:96`, `index.html:162`, `index.html:849`.
- Poprawna strategia obrazów responsywnych: AVIF/WebP/JPG fallback, `srcset`, `sizes`, `loading`, `decoding`, oraz atrybuty rozmiaru.
  - Evidence: `index.html:180-214`, `menu.html` (powtarzalne obrazki kart z `loading="lazy"` i wymiarami), brak wykrytych `<img>` bez `width/height`.
- Dobre pokrycie SEO na stronach głównych i podstronach treściowych: canonical, robots, OpenGraph, Twitter i JSON-LD.
  - Evidence: `index.html:9-43`, `about.html:11-54`, `contact.html:9-52`, `menu.html:9-52`, `gallery.html:11-54`.
- Obecna konfiguracja publikacji i indeksowania (`robots.txt`, `sitemap.xml`, `_headers`, `_redirects`, `manifest.webmanifest`, `sw.js`).
  - Evidence: `robots.txt`, `sitemap.xml`, `_headers`, `_redirects`, `manifest.webmanifest`, `sw.js`.

## 4. P1 — Exactly 5 Improvements Worth Doing Next

### 1) Ujednolicenie strategii ścieżek URL (portable deployment)
- **Reason:** W HTML dominują ścieżki absolutne od root (`/about.html`, `/#hero`), co utrudnia poprawne działanie przy hostingu w podkatalogu (np. `/portfolio/atelier/`).
- **Suggested improvement:** Przyjąć jedną politykę: względne ścieżki dla nawigacji statycznej albo jawny `base` + test deployu w subpath.
- **Evidence:** `index.html:98`, `index.html:147-149`, `contact.html:294`, `contact.html:304-318`.

### 2) Uspójnienie entrypointów JS między typami stron
- **Reason:** Część stron ładuje `js/script.min.js`, a część `js/core.js`, co zwiększa ryzyko dryfu funkcjonalnego i utrudnia utrzymanie jednej matrycy inicjalizacji.
- **Suggested improvement:** Zdefiniować jedną strategię runtime (np. jeden bundle z inicjalizacją per `data-page`) i konsekwentnie stosować na wszystkich stronach.
- **Evidence:** `index.html:853`, `about.html:1060`, `contact.html:420`, `menu.html:1856`, `gallery.html:974` vs `cookies.html:543`, `polityka-prywatnosci.html:580`, `regulamin.html:598`, `404.html:242`.

### 3) Ograniczenie duplikacji assetów w cache Service Workera
- **Reason:** Precache zawiera równolegle wersje źródłowe i zminifikowane (`style.css` + `style.min.css`, `script.js` + `script.min.js`), co zwiększa koszt cache i złożoność invalidacji.
- **Suggested improvement:** Cache’ować wyłącznie faktyczny zestaw runtime dla produkcji i powiązać wersjonowanie `CACHE_NAME` z procesem build.
- **Evidence:** `sw.js:12-15`.

### 4) Redukcja render-blocking dla bootstrapu motywu
- **Reason:** `bootstrap.js` jest ładowany synchronicznie w `<head>` na każdej stronie; mimo małego rozmiaru to nadal blokuje parser HTML.
- **Suggested improvement:** Zostawić minimalny inline snippet tylko do ustawienia `data-theme`, a rejestrację SW i logikę poboczną przenieść do `defer`/module.
- **Evidence:** `index.html:56`, `about.html:50`, `contact.html:48`, `menu.html:48`, `gallery.html:50`; logika w `js/bootstrap.js:1-38`.

### 5) Refaktoryzacja powtarzalnych bloków layoutu (header/footer/legal)
- **Reason:** Duże sekcje nawigacji i stopki są kopiowane między wieloma plikami HTML, co podnosi koszt zmian i ryzyko niespójności.
- **Suggested improvement:** Wprowadzić prosty etap generowania partials (np. include w build step) bez zmiany runtime na kliencie.
- **Evidence:** Powtarzalne bloki w `index.html`, `about.html`, `contact.html`, `menu.html`, `gallery.html`, `cookies.html`, `polityka-prywatnosci.html`, `regulamin.html`.

## 5. P2 — Minor Refinements (optional)
- W `js/bootstrap.js` użyty jest `console.warn` przy błędzie rejestracji SW; w produkcji warto przełączyć to na kontrolowany logger lub telemetry event.
  - Evidence: `js/bootstrap.js:33-35`.
- Część polityk bezpieczeństwa w `_headers` bazuje na starszym nagłówku `X-XSS-Protection`; można uprościć zestaw i oprzeć go głównie na nowoczesnym CSP (not detected in project).
  - Evidence: `_headers:4`, `_headers:23`.

## 6. Future Enhancements — Exactly 5 Ideas
1. Dodać automatyczny test linków i anchorów jako stały gate CI/CD na bazie istniejących skryptów npm (`check:links:*`).
2. Dodać testy regresji a11y (klawiatura/focus/kontrast) uruchamiane per page template.
3. Wdrożyć automatyczne generowanie i walidację sitemap przy zmianach listy podstron.
4. Rozszerzyć monitoring wydajności o pomiar Web Vitals w środowisku produkcyjnym.
5. Dodać automatyczne versioning/hash assetów i zgrać je z polityką cache SW + `_headers`.

## 7. Compliance Checklist (pass / fail)
- headings structure valid: **PASS**
- no broken links (excluding .min strategy): **PASS**
- no console.log: **PASS**
- aria attributes valid: **PASS**
- images have width/height: **PASS**
- no-JS baseline usable: **PASS**
- robots.txt present (if expected): **PASS**
- sitemap.xml present (if expected): **PASS**
- OpenGraph image present: **PASS**
- JSON-LD valid (if present): **not detected in project**

## 8. Architecture Score (1–10)
- structural consistency: **8/10**
- accessibility maturity: **8/10**
- performance discipline: **7/10**
- SEO correctness: **8/10**
- maintainability: **7/10**

**Architecture Score (overall): 7.6/10**

## 9. Senior Rating (1–10)
**7.8/10**

Projekt jest technicznie solidny i gotowy do produkcyjnego utrzymania dla skali małego/średniego serwisu marketingowego. Największy dług nie dotyczy krytycznych błędów użytkownika końcowego, tylko konsekwencji architektonicznych (duplikacja szablonów, różne entrypointy JS, polityka cache). Po wdrożeniu wskazanych P1 serwis osiągnie wyraźnie lepszą spójność i niższy koszt zmian.
