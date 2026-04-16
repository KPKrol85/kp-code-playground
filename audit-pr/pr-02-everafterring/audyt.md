# Audyt seniorski projektu (Frontend) – poziom professional / senior

## 1) Executive summary

Projekt ma solidny fundament jak na etap wczesny: modułowa architektura, router, warstwa store, retry dla fetch, service worker i sensowny pipeline build. Jednocześnie obecna implementacja jest **demonstracyjna** i nie powinna być traktowana jako gotowa produkcyjnie w obszarach bezpieczeństwa, auth oraz jakości procesu wytwórczego.

**Ocena ogólna (etap MVP): 6.5/10**  
**Ocena gotowości produkcyjnej: 3.5/10**

---

## 2) Metodologia audytu

Audyt wykonany na podstawie:
- struktury repo i konfiguracji projektu,
- przeglądu krytycznych modułów frontendowych (router, auth, store, fetch, service worker, build),
- podstawowych komend jakości (`format:check`, `lint:html`, `build`).

Zakres: front-end architecture, security baseline, performance baseline, code quality, DX/process, maintainability.

---

## 3) Klasyfikacja problemów (P0 / P1 / P2)

## P0 (Critical – wymagane przed realnym wdrożeniem)

### P0.1 – Autoryzacja i sesja wyłącznie po stronie klienta
- Aktualnie logowanie/rejestracja bazuje o `localStorage`, lokalny token i hash haseł po stronie klienta.
- To podejście jest poprawne wyłącznie dla demo/prototypu; nie zapewnia bezpieczeństwa kont produkcyjnych.
- Ryzyko: przejęcie sesji, manipulacja danymi użytkownika, brak realnej kontroli dostępu.

**Rekomendacja:** backend auth (HTTP-only cookie/JWT), refresh token rotation, unieważnianie sesji, rate-limit, audyt logowań.

### P0.2 – Brak egzekucji ról/permissions po stronie serwera
- Uprawnienia tras są realizowane po stronie frontu i admin jest jawnie wyłączony w trybie demo.
- Front nie może być źródłem prawdy dla autoryzacji.
- Ryzyko: bypass logiki przez manipulację klienta.

**Rekomendacja:** pełny RBAC na backendzie + autoryzacja endpointów + separacja claims i capabilities.

### P0.3 – Brak automatycznej bramki jakości (testy + CI)
- Brak aktywnego pipeline CI dla test/lint/build jako quality gate.
- W projekcie istnieją skrypty, ale bez wymuszenia PR checks.
- Ryzyko: regresje funkcjonalne i spadek jakości wraz z rozwojem zespołu.

**Rekomendacja:** CI (GitHub Actions/GitLab CI) z minimalnym workflow: install -> lint -> format:check -> build -> test -> artifact.

---

## P1 (High – wysoki priorytet po zabezpieczeniu P0)

### P1.1 – Niespójność formatowania i stylu kodu
- `format:check` zwraca wiele plików wymagających poprawy.
- To zwykle sygnał ryzyka konfliktów i obniżenia czytelności zmian.

**Rekomendacja:** jednorazowy reformat + pre-commit hook + CI check blokujący merge.

### P1.2 – Brak testów jednostkowych i E2E
- Krytyczne moduły (auth/router/cart/fetch) nie mają widocznych testów automatycznych.
- Ryzyko: niezauważone regresje przy refaktorze.

**Rekomendacja:**
- unit: utilities + services,
- integration: router/store flows,
- E2E: auth/cart/checkout/journey.

### P1.3 – Ograniczona obserwowalność błędów runtime
- Błędy są częściowo logowane do konsoli i toastów, brak centralnego monitoringu produkcyjnego.

**Rekomendacja:** Sentry + source maps + tagowanie release + dashboard alertów.

### P1.4 – Brak formalnej strategii wersjonowania SW/cache
- SW ma wersjonowane nazwy cache, ale brak procedury release/rollback i polityki invalidation opisanej procesowo.

**Rekomendacja:** release checklist dla SW, semver cache keys, polityka rollback i testy offline.

### P1.5 – Brak twardego kontraktu danych
- JSON-y są pobierane i używane bez formalnej walidacji schematów.

**Rekomendacja:** JSON Schema + runtime validation (np. zod/ajv) i test fixtures.

---

## P2 (Medium – optymalizacje i dojrzewanie produktu)

### P2.1 – Typowanie i kontrakty modułów
- Vanilla JS bez warstwy typów zwiększa koszt utrzymania wraz ze skalą.

**Rekomendacja:** TypeScript (stopniowo) lub konsekwentne JSDoc typedef + lint rules.

### P2.2 – Monitoring UX i wydajności
- Brak aktywnego RUM dla CWV i metryk biznesowych w runtime.

**Rekomendacja:** web-vitals + analytics events + dashboard KPI.

### P2.3 – Uporządkowanie domenowe i granice modułów
- Architektura jest modularna, ale wraz ze wzrostem funkcji warto formalnie opisać boundaries i ownership.

**Rekomendacja:** ADR + diagram C4 level 2 + codeowners dla katalogów.

### P2.4 – Dalsze usprawnienia dostępności
- Są dobre podstawy (skip-link, focus management, aria-live), ale warto zrobić pełny audyt WCAG 2.2 AA (klawiatura, kontrast, komunikaty błędów, semantyka formularzy).

**Rekomendacja:** axe/Lighthouse CI + checklista a11y per komponent.

### P2.5 – Roadmapa i plan delivery
- Wiele ścieżek ma charakter placeholderów, co jest naturalne na obecnym etapie.

**Rekomendacja:** plan 30/60/90 dni: hardening (P0), quality i telemetry (P1), scaling i optymalizacje (P2).

---

## 4) Mocne strony projektu

1. Sensowna modularność (pages/components/services/utils/store/router).
2. Retry/backoff dla fetch oraz mechanizmy timeout.
3. Podstawy PWA/offline i cache strategii.
4. Obsługa focus management, skip link i eventów route lifecycle.
5. Build pipeline z minifikacją CSS/JS i przepisywaniem importów.

---

## 5) Ryzyka biznesowe, jeśli nic nie zmienicie

- Trudność wejścia w produkcję z realnym ruchem i płatnościami.
- Wysokie ryzyko incydentów auth/security.
- Rosnący koszt refaktoryzacji bez testów i typowania.
- Spowolnienie delivery przy większym zespole bez CI quality gates.

---

## 6) Plan naprawczy (senior recommendation)

### Faza 1 (0–2 tygodnie) – „Production safety baseline”
- Zamknąć P0.1 i P0.2 (backend auth + RBAC).
- Wdrożyć CI jako bramkę jakości.
- Ustabilizować format i standard PR.

### Faza 2 (2–5 tygodni) – „Quality & Observability”
- Testy unit + integration + smoke E2E.
- Sentry + release tracking.
- Walidacja kontraktów danych.

### Faza 3 (5–8 tygodni) – „Scale readiness”
- TypeScript migration plan.
- RUM i analityka produktowa.
- Dopracowanie a11y i DX dokumentacji.

---

## 7) Finalna rekomendacja seniorska

Projekt ma bardzo dobry potencjał i jest dobrze rokującym starterem produktu cyfrowego. Najważniejsze: **oddzielić demo-frontend od produkcyjnego security modelu** i natychmiast dobudować fundamenty jakości procesu (CI + testy + observability). Po realizacji P0/P1 projekt może wejść na poziom stabilnego mid-stage frontendu gotowego do szybkiego skalowania.
