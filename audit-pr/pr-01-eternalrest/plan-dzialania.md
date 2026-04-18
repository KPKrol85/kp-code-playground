# Plan działania — Eternal Rest (etap early-stage)

Poniżej znajduje się plan 20 konkretnych kroków, które podnoszą profesjonalizm projektu bez niepotrzebnego „przeprojektowania na siłę”.

1. **Naprawić pipeline build (`build:assets`)** tak, aby `npm run build` zawsze kończyło się sukcesem i generowało kompletne `dist`.
2. **Dodać automatyczny smoke-check po buildzie** (czy istnieją kluczowe pliki HTML/CSS/JS w `dist`) przed publikacją.
3. **Podłączyć formularz do realnego endpointu** (API/serverless), zamiast wyłącznie lokalnego komunikatu sukcesu.
4. **Wdrożyć obsługę stanów wysyłki formularza**: loading, sukces, błąd oraz jasny komunikat dla użytkownika.
5. **Rozszerzyć walidację formularza** o reguły formatu e-mail/telefon, limity długości i komunikaty kontekstowe.
6. **Dodać mechanizmy antyspamowe** (np. honeypot + rate limiting po stronie backendu) dla zabezpieczenia leadów.
7. **Dodać telemetrykę zdarzeń UX i konwersji** (kliknięcia CTA, wysyłka formularza, interakcje z cennikiem/FAQ).
8. **Zdefiniować i monitorować podstawowe KPI**: liczba leadów, współczynnik wysyłek, kliknięcia tel/mail, błędy formularza.
9. **Uzupełnić SEO techniczne per strona**: canonical, Open Graph, Twitter Cards, a następnie robots i sitemap.
10. **Dodać dane strukturalne JSON-LD** (LocalBusiness, Service, FAQPage), aby poprawić widoczność i wiarygodność w wyszukiwarce.
11. **Rozbić `js/main.js` na moduły funkcjonalne** (menu, motyw, formularz, FAQ, cennik), aby uprościć rozwój.
12. **Ustalić standard komponentów UI** (przyciski, badge, karty, formularze) z krótką dokumentacją użycia.
13. **Ograniczyć duplikację layoutu** (header/footer) przez prostą strategię templatkowania w procesie build.
14. **Rozszerzyć linting o kontrolę jakości HTML/CSS** (spójność stylu, potencjalne błędy, utrzymanie standardu).
15. **Dodać testy e2e dla krytycznych ścieżek**: menu mobilne, FAQ, filtr cennika, formularz kontaktowy.
16. **Wprowadzić podstawowe budżety wydajności** (LCP/INP/CLS, wielkość CSS/JS) i regularny pomiar Lighthouse.
17. **Wdrożyć realne zasoby i treści zaufania** (docelowe linki social, prawdziwa mapa, doprecyzowane dane firmy).
18. **Uzupełnić strony formalne** (polityka prywatności, cookies) i powiązać je z formularzem kontaktowym.
19. **Dopracować dostępność do poziomu WCAG 2.2 AA**: kolejność fokusu, komunikaty błędów, testy klawiaturą i czytnikiem.
20. **Ustalić proces release (staging + checklista)**, aby każdy kolejny etap wdrożenia był przewidywalny i mierzalny.
