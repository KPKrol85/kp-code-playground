# Plan działania — Eternal Rest (20 priorytetów rozwojowych)

> Cel: zamienić solidną bazę statycznego front-endu w produkcyjny, skalowalny i mierzalny produkt dla KP_Code Digital Studio.

## 1) Naprawić pipeline build (P0)
Obecny build zatrzymuje się na `build:assets` przez niepoprawne użycie `cpx -r`. Najpierw trzeba ustabilizować release process, żeby każde wdrożenie było powtarzalne i bezpieczne.

## 2) Wprowadzić endpoint wysyłki formularza (P0)
Formularz ma walidację po stronie klienta, ale brak realnej integracji (API/serverless/CRM). Bez tego projekt nie realizuje celu biznesowego (lead generation).

## 3) Dodać walidację semantyczną (P0/P1)
Poza `required` wdrożyć precyzyjne reguły dla email/tel, limity długości i komunikaty kontekstowe. To zmniejsza liczbę leadów niskiej jakości.

## 4) Dodać backendową ochronę formularza (P1)
Rate limiting, honeypot/Turnstile/reCAPTCHA, sanitization i logging błędów po stronie serwera. Ochroni to skrzynkę i zasoby zespołu.

## 5) Uzupełnić warstwę SEO technicznego (P1)
Dodać `robots.txt`, `sitemap.xml`, canonicale i metadane OpenGraph/Twitter na wszystkich stronach. Obecnie strona ma podstawowe `<title>`/`description`, ale brak pełnej warstwy indeksacji.

## 6) Dodać structured data (P1)
Wdrożyć JSON-LD (`LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`). To podniesie jakość snippetów i wiarygodność SERP.

## 7) Urealnić dane kontaktowe i NAP (P1)
Ujednolicić Name-Address-Phone, godziny, obszar działania i link do mapy/Google Business Profile. Spójność NAP jest kluczowa lokalnie.

## 8) Podłączyć analitykę i zdarzenia konwersji (P1)
Skonfigurować GA4/Matomo + eventy: klik tel, submit formularza, scroll-depth, CTA click. Bez telemetryki nie da się optymalizować lejka.

## 9) Zdefiniować KPI i dashboard projektu (P1)
Ustalić KPI: CR formularza, czas do pierwszego kontaktu, bounce, LCP/INP/CLS. Spiąć w 1 dashboard dla PM + marketingu.

## 10) Wdrożyć monitoring jakości frontu (P1)
Dodać Lighthouse CI + budżety wydajności i regresje per PR. Jakość będzie kontrolowana automatycznie, nie tylko manualnie.

## 11) Rozszerzyć testy automatyczne (P1/P2)
Dodać testy E2E (Playwright/Cypress) dla kluczowych flow: nawigacja, menu mobilne, formularz, filtr cennika, accordion.

## 12) Wzmocnić linting i standardy kodu (P2)
Rozszerzyć ESLint o reguły jakościowe i accessibility (np. plugini HTML/JS), dodać `lint:css` i pre-commit hooks.

## 13) Uporządkować architekturę JS (P2)
`main.js` jest monolitem funkcjonalnym — rozbić na moduły domenowe (theme, menu, forms, pricing, faq, ui-state).

## 14) Wprowadzić tokeny i system designu (P2)
Sformalizować design tokens (kolory, spacing, typography, motion), oraz komponenty z zasadami użycia i dostępności.

## 15) Dopracować dostępność WCAG 2.2 AA (P2)
Wykonać pełny audyt kontrastów, focus order, nazw dostępnych, komunikatów formularza, klawiatury i czytników ekranu.

## 16) Dodać i zoptymalizować assety graficzne (P2)
Uruchomić pipeline obrazów w praktyce (AVIF/WebP), ale też responsive images (`srcset`, `sizes`) i lazy loading.

## 17) Przygotować wersję wielojęzyczną (P2/P3)
Jeśli studio celuje szerzej: architektura i18n (np. PL/EN), słowniki treści i strategia SEO dla każdej wersji.

## 18) Uspójnić treści sprzedażowe i trust factors (P2)
Dodać realne referencje, certyfikaty, obszary działania, case’y i konkretne CTA per sekcja. Obecnie content jest poprawny, ale bardzo szablonowy.

## 19) Przygotować standard wdrożeń (P2)
Wdrożyć CI/CD + środowiska `staging`/`production`, checklistę release i rollback plan.

## 20) Przygotować roadmapę v2 (P3)
Na bazie danych z analityki zaplanować wersję 2: blog ekspercki, kalkulator kosztów, live chat, integracje CRM/ERP.

---

## Proponowana kolejność realizacji (90 dni)
- **Sprint 1 (tyg. 1–2):** punkty 1–4.
- **Sprint 2 (tyg. 3–5):** punkty 5–10.
- **Sprint 3 (tyg. 6–8):** punkty 11–16.
- **Sprint 4 (tyg. 9–12):** punkty 17–20 + hardening i retrospektywa.
