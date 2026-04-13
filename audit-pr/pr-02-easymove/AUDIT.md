# Easy Move — audyt techniczny repozytorium

## 1. Krótka ocena całościowa
Projekt jest uporządkowanym, wielostronicowym front-endem statycznym z modularnym JS i sensownym pipeline builda. Kod pokazuje dobrą bazę semantyki, dostępności i SEO. Główny realny problem produkcyjny to brak skonfigurowanego endpointu formularza kontaktowego w aktualnych plikach HTML (formularz waliduje i obsługuje błędy, ale bez `action` nie wyśle danych).

## 2. Mocne strony
- Dobra dokumentacja techniczna i zgodność architektury z kodem (multi-page, modułowy JS, pipeline build) (`README.md`).
- Spójny pipeline budowania: minifikacja CSS/JS, składanie partiali, kopiowanie assetów i plików SEO (`scripts/build.mjs:30-61`, `package.json:6-14`).
- Dostępność bazowa jest obecna: skip link, styl `:focus-visible`, focus management i trap focus w mobilnym menu (`index.html:56`, `css/base.css:59-78`, `js/modules/menu.js:31-111`).
- Komponenty interaktywne mają poprawne wzorce ARIA i obsługę klawiatury (accordion + tabs) (`faq.html:127-155`, `js/modules/accordion.js:1-48`, `cennik.html:127-163`, `js/modules/tabs.js:1-61`).
- Preferencje ograniczenia animacji są obsłużone w CSS i JS (`css/base.css:111-115`, `css/components.css:265-272`, `js/modules/reveal.js:30-38`).
- Strategia SEO oparta na jawnych URL z `.html` jest konsekwentna między `canonical`, `og:url`, JSON-LD i `sitemap.xml` (`kontakt.html:8-15`, `kontakt.html:38-44`, `sitemap.xml:6-23`).

## 3. P0 — Ryzyka krytyczne
none detected.

## 4. P1 — Important issues worth fixing next
1. **Formularz kontaktowy nie ma endpointu wysyłki w aktualnej implementacji**  
   - Dowód: formularz ma `method="post"`, ale brak atrybutu `action` (`kontakt.html:155`).  
   - Dowód: kod JS jawnie blokuje wysyłkę bez endpointu i pokazuje komunikat konfiguracyjny (`js/modules/form.js:49-54`, `js/modules/form.js:141-148`).  
   - Ocena: to realny problem funkcjonalny dla konwersji leadów (nie crashuje aplikacji, ale blokuje właściwą wysyłkę zgłoszeń).

## 5. P2 — Minor refinements
1. **Brak `og:image:alt` przy obecnym `og:image`**  
   - Dowód: `og:image` występuje, ale nie wykryto `og:image:alt` w audytowanych stronach (`index.html:15`, `kontakt.html:15`, `faq.html:15`, `cennik.html:15`).

2. **W stopce są generyczne linki social (placeholders) zamiast profili marki**  
   - Dowód: linki kierują do głównych domen serwisów społecznościowych (`partials/footer.html:12`, `partials/footer.html:18`).  
   - Ocena: to nie jest błąd runtime, ale obniża wiarygodność i użyteczność.

3. **Kontrast kolorystyczny: nie można potwierdzić pełnej zgodności bez analizy computed styles**  
   - Dowód: tokeny kolorów i motyw dark/light są zdefiniowane, ale brak uruchomionej analizy renderowanej strony w tym audycie statycznym (`css/tokens.css:1-54`).

## 6. Extra quality improvements
- Uzupełnić `action` formularza o realny endpoint (lub integrację serverless/API) i utrzymać obecny, poprawny model obsługi błędów i stanu pending (`kontakt.html:155`, `js/modules/form.js:150-186`).
- Dodać `og:image:alt` na wszystkich stronach z Open Graph dla lepszej jakości metadanych social/a11y (`index.html:15`, `kontakt.html:15`).
- Rozważyć oznaczenie linków social jako tymczasowe lub podmianę na docelowe profile firmy (`partials/footer.html:12-19`).
- Jeśli celem projektu będzie PWA/offline, obecnie takie elementy są **not detected in project** (brak manifestu, service workera i plików deploy typu `_headers`/`_redirects`).

## 7. Senior rating (1–10)
**8.1 / 10**  
Projekt ma dobrą jakość implementacji front-endowej (modularność, dostępność interakcji, spójne SEO i sensowny build). Ocena nie jest wyższa głównie z powodu jednego istotnego problemu funkcjonalnego: formularz kontaktowy bez endpointu nie realizuje finalnego celu biznesowego (wysyłki zapytania).

---

## Kontekst poprzedniego audytu (RESOLVED)
- **RESOLVED:** Spójność strategii URL SEO/deploy jest obecnie utrzymana dla ścieżek `.html` w metadanych i sitemapie (`README.md`, `sitemap.xml:6-23`, `kontakt.html:8-13`, `kontakt.html:43`).
- **RESOLVED:** W sekcji zgody formularza dodano bezpośrednie linki do polityk, co poprawia przejrzystość i kontekst prawny (`kontakt.html:223-230`).
- **Uwaga statusowa:** Poprzednie „RESOLVED” dotyczące formularza zostało częściowo wdrożone technicznie (uczciwa obsługa stanów i błędów), ale brak `action` nadal pozostawia realną lukę funkcjonalną (`js/modules/form.js:141-148`, `kontakt.html:155`).
