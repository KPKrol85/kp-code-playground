# TODO – 20 priorytetowych usprawnień projektu

> Kontekst: projekt jest w fazie początkowej (MVP / demo), dlatego lista skupia się na szybkich krokach o wysokim zwrocie biznesowo-technicznym.

1. Dodać **prawdziwy backend autoryzacji** (JWT + refresh token + unieważnianie sesji).
2. Zastąpić hash hasła po stronie klienta (`simpleHash`) pełnym flow po stronie serwera.
3. Wprowadzić **role i uprawnienia RBAC** (user/admin/editor) egzekwowane na backendzie, nie tylko w UI.
4. Wdrożyć **testy jednostkowe** dla utils/services (minimum smoke testy dla krytycznych modułów).
5. Dodać **testy E2E** (logowanie, checkout, nawigacja, error states).
6. Uruchomić **CI/CD** (lint + build + test + deploy preview).
7. Ujednolicić formatowanie kodu (prettier --write + blokada na PR przez format:check).
8. Dodać **TypeScript lub JSDoc types** do kluczowych warstw (router/store/services).
9. Rozdzielić konfigurację środowiskową (dev/staging/prod) do jawnych plików konfiguracyjnych.
10. Zaimplementować centralny **logger błędów** (Sentry/LogRocket) z kontekstem route/user action.
11. Zdefiniować i mierzyć **Core Web Vitals** (LCP/INP/CLS) z real-user monitoring.
12. Dodać **analitykę produktową** (zdarzenia: view product, add to cart, checkout intent, purchase).
13. Rozszerzyć obsługę offline/PWA o jawny fallback dla niedostępnych zasobów dynamicznych.
14. Wprowadzić wersjonowanie i politykę cache busting dla assetów oraz SW release strategy.
15. Uporządkować i udokumentować architekturę frontendu (ADR + diagram modułów).
16. Dodać pełny **design system** (tokeny, komponenty, standardy dostępności WCAG 2.2 AA).
17. Zaimplementować i zwalidować i18n (PL/EN) z separacją treści od logiki.
18. Rozbudować bezpieczeństwo frontu: CSP, trusted types, twarde nagłówki bezpieczeństwa.
19. Dodać monitoring jakości danych (walidacja JSON schemas dla `data/*.json`).
20. Uzupełnić roadmapę produktu o KPI i etapy delivery (30/60/90 dni).
