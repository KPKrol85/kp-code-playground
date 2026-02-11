# Audyt frontendowy (senior) — pr-01-translogix

## 1) Krótki opis techniczny projektu

- **Architektura:** statyczny, wielostronicowy serwis (MPA) oparty o HTML + modularny CSS (`assets/css/modules`) + natywne moduły ES (`assets/js/*.js`).
- **Pipeline build:** obecny częściowo — PostCSS (`postcss-import`, `autoprefixer`, `cssnano`) + skrypty Node do weryfikacji assetów i optymalizacji obrazów. Pipeline CSS jest skonfigurowany, ale obecnie niespójny z repo (patrz P0).
- **Wzorce:** komponentowy podział CSS (settings/base/layout/components/pages/utilities), semantyczne sekcje HTML, skip-link, ARIA dla nawigacji/tabs/accordion, dynamiczne filtrowanie i progressive enhancement (strony mają fallback statyczny).
- **Dojrzałość techniczna:** dobry poziom „production-oriented” dla projektu statycznego (SEO meta, sitemap, SW, security headers), ale z kilkoma krytycznymi błędami wdrożeniowymi i a11y/SEO, które trzeba zamknąć przed finalnym release.

---

## 2) Mocne strony projektu

- Dobra organizacja kodu: modularny CSS i podział JS na małe, odpowiedzialne moduły (`nav`, `tabs`, `forms`, `lightbox`, `services-filters`, itp.).
- Spójny standard SEO on-page na stronach: title, description, canonical, OG/Twitter, robots, sitemap.
- Wdrożone security headers i polityki cache na poziomie hostingu (`_headers`, `_redirects`).
- Dobrze rozbudowane mechanizmy UX: walidacja formularzy, filtry ofert/floty, lightbox, licznik statystyk, theme toggle, consent dialog.
- Widoczne działania performance: wieloformatowe obrazy (AVIF/WEBP/JPG), lazy-loading obrazów, service worker z cache strategiami.
- Dobre podstawy a11y: skip-link, aria-label dla nawigacji, aria-live dla komunikatów formularzy i wyników kalkulacji, strukturalne nagłówki sekcji.

---

## 3) Klasyfikacja problemów

## 🔴 P0 — Krytyczne (5)

1. **Niesprawny pipeline CSS (`npm run build:css` nie działa).**
   - **Miejsce:** `package.json` (`build:css` wskazuje `assets/css/style.src.css`, którego nie ma w repo).
   - **Wpływ:** brak możliwości poprawnego buildu/minifikacji stylów w CI/CD i przed deploymentem; ryzyko wdrażania nieprzetestowanych artefaktów.
   - **Wdrożenie:** poprawić wejście builda na istniejący plik (`assets/css/style.css` lub przywrócić `style.src.css`) i uruchamiać to w CI jako check blokujący merge.

2. **CSP blokuje inline skrypt inicjalizacji motywu (FOUC + utrata funkcji inicjalnej).**
   - **Miejsce:** inline `<script>` w `<head>` (np. `index.html`) + `Content-Security-Policy: script-src 'self'` w `_headers`.
   - **Wpływ:** przeglądarka odrzuca inline script (brak nonce/hash), więc pre-init trybu ciemnego nie działa jak zaprojektowano; pogorszenie UX i potencjalny flash nieprawidłowego motywu.
   - **Wdrożenie:** przenieść kod do zewnętrznego pliku JS lub dodać nonce/hash do CSP i skryptu.

3. **CSP blokuje osadzoną mapę Google w kontakcie.**
   - **Miejsce:** `contact.html` (`<iframe src="https://www.google.com/maps...">`) + `_headers` (brak `frame-src` dopuszczającego Google).
   - **Wpływ:** mapa nie renderuje się w produkcji; użytkownik traci istotną funkcję na stronie kontaktowej.
   - **Wdrożenie:** rozszerzyć CSP o `frame-src https://www.google.com https://www.google.com/maps https://www.gstatic.com` (lub zaakceptowany minimalny zestaw domen).

4. **Dane strukturalne JSON-LD są podpięte niepoprawnie (przez `src` zamiast inline JSON).**
   - **Miejsce:** wszystkie główne strony (`index.html`, `services.html`, `fleet.html`, itd.) mają `<script type="application/ld+json" src="...">`.
   - **Wpływ:** wyszukiwarki nie odczytują danych strukturalnych zgodnie ze specyfikacją; utrata korzyści SEO rich results.
   - **Wdrożenie:** wstrzykiwać JSON-LD inline (`<script type="application/ld+json">{...}</script>`) na każdej stronie.

5. **Galeria floty nie jest dostępna z klawiatury (nieklikalne semantycznie `img`).**
   - **Miejsce:** `fleet.html` + `assets/js/lightbox.js` — listenery `click` są podpięte do elementów `.lightbox-trigger`, którymi są `<img>`.
   - **Wpływ:** użytkownicy klawiatury i część technologii asystujących nie mogą otworzyć galerii; to realny blocker a11y.
   - **Wdrożenie:** zamienić trigger na `<button>` z obrazem w środku (lub dodać `tabindex="0"` + obsługę Enter/Space, preferowany button).

## 🟠 P1 — Ważne (5)

1. **`style.css` opiera się o łańcuch `@import` zamiast sklejonego artefaktu produkcyjnego.**
   - **Miejsce:** `assets/css/style.css`.
   - **Wpływ:** dodatkowe requesty i opóźnienie renderu CSS; gorsze TTFB->FCP przy słabszych warunkach.
   - **Wdrożenie:** generować pojedynczy, zminifikowany bundle (np. `style.min.css`) i serwować go w HTML.

2. **Brak wymiarów (`width`/`height`) dla wielu obrazów treściowych.**
   - **Miejsce:** m.in. ikony/obrazy w `index.html`, `fleet.html`, `services.html`.
   - **Wpływ:** ryzyko CLS podczas doczytywania assetów.
   - **Wdrożenie:** uzupełnić atrybuty rozmiaru lub użyć `aspect-ratio`/placeholderów tam, gdzie to uzasadnione.

3. **Placeholdery social (`href="#"`) w stopce na wszystkich stronach.**
   - **Miejsce:** stopki (`index.html`, `services.html`, `fleet.html`, `pricing.html`, `contact.html`, `service.html`, `privacy.html`, `terms.html`, `cookies.html`).
   - **Wpływ:** martwe linki (UX + SEO quality signal), niepotrzebne skoki do topu strony.
   - **Wdrożenie:** podpiąć realne URL lub tymczasowo usunąć linki z DOM.

4. **Service worker + cache immutable bez wersjonowania nazw plików.**
   - **Miejsce:** `_headers` (`/assets/* max-age=31536000, immutable`) + `sw.js` + brak hashy w nazwach assetów.
   - **Wpływ:** wysokie ryzyko „starego” frontu u części użytkowników po deployu (cache hard-stale).
   - **Wdrożenie:** wprowadzić fingerprinting plików (`style.[hash].css`, `main.[hash].js`) i automatyczne odświeżanie `CACHE_NAME`.

5. **Niespójność językowa walidacji formularza (PL/EN).**
   - **Miejsce:** `assets/js/form.js` (`Use international format, e.g. +48123456789`).
   - **Wpływ:** niespójny UX i niższa jakość komunikatów błędów.
   - **Wdrożenie:** ujednolicić komunikaty walidacji do języka polskiego (lub i18n).

## 🟡 P2 — Ulepszenia (5)

1. **Dodać automatyczną walidację HTML/a11y w pipeline.**
   - **Miejsce:** repo globalnie.
   - **Wartość:** szybsze wykrywanie regresji (np. linki placeholder, błędy semantyczne).

2. **Wydzielić wspólne fragmenty layoutu (header/footer) do prostego procesu templatingu.**
   - **Miejsce:** wszystkie pliki `*.html`.
   - **Wartość:** mniejsze ryzyko niespójności między stronami i krótszy czas zmian.

3. **Doprecyzować politykę fallbacków offline w SW.**
   - **Miejsce:** `sw.js`.
   - **Wartość:** bardziej przewidywalne UX offline (np. dedykowany offline page zamiast fallbacku do `/index.html`).

4. **Dodać testy E2E kluczowych flow (formularz, filtry, lightbox, nawigacja mobilna).**
   - **Miejsce:** nowy katalog testów (np. Playwright).
   - **Wartość:** kontrola regresji funkcjonalnych przed wdrożeniem.

5. **Uspójnić nazewnictwo i literówki w assetach SVG/tekście.**
   - **Miejsce:** np. `assets/img/svg/linktin.svg`.
   - **Wartość:** czytelność i mniejsze ryzyko pomyłek w utrzymaniu.

---

## 4) Sugestie podniesienia poziomu profesjonalnego

1. **CI/CD (minimum):**
   - lint + build CSS + weryfikacja assetów + smoke test linków + Lighthouse CI (mobile).

2. **Budżet performance:**
   - ustalić limity (np. JS < 120KB gzip, CSS < 70KB gzip, LCP < 2.5s na 4G).

3. **Docelowe metryki Lighthouse/WCW:**
   - Performance >= 90, Accessibility >= 95, Best Practices >= 95, SEO >= 95.

4. **Docelowa zgodność WCAG:**
   - minimum **WCAG 2.1 AA** (klawiatura, focus order, kontrasty, semantyka elementów interaktywnych).

5. **Hardening security headers pod realne użycie:**
   - doprecyzować CSP (nonce/hash dla inline albo pełna eliminacja inline), jawne `frame-src` dla map, ew. `form-action 'self'`.

6. **Strategia deployu assetów:**
   - hashowanie plików + automatyczna invalidacja SW + kontrola wersji cache.

7. **Narzędzia npm warte dodania:**
   - `eslint`, `stylelint`, `html-validate`, `pa11y`/`axe-core` (CI), `lhci`, `prettier` (w trybie check).
