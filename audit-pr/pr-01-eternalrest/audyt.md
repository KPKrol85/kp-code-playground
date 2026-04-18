# Audyt senior front-end — Eternal Rest (etap early-stage)

**Projekt:** `audit-pr/pr-01-eternalrest`  
**Data audytu:** 18.04.2026  
**Zakres:** architektura MPA, HTML/CSS/JS, UX, a11y, utrzymanie, gotowość produkcyjna  
**Charakter oceny:** produkcyjno-wdrożeniowa, z uwzględnieniem realiów wczesnej fazy produktu

---

## 1) Executive summary

Projekt jest **dobrze przygotowanym MVP front-endowym** dla serwisu usługowego: ma czytelną strukturę wielostronicową, spójny design, modularny CSS i sensowny JavaScript dla najważniejszych interakcji (menu, accordion, filtrowanie, walidacja formularza, motyw jasny/ciemny).

Jednocześnie obecny stan to nadal **wersja przedprodukcyjna**. Największe ryzyka są praktyczne:

- pipeline build nie domyka się (błąd w `build:assets`),
- formularz kontaktowy działa wyłącznie po stronie klienta (brak realnej wysyłki danych),
- brakuje elementów „operacyjnej profesjonalizacji” (telemetria, testy e2e, twarde kryteria jakości release).

**Wniosek:** bardzo dobra baza do dalszego rozwoju, ale przed wdrożeniem publicznym potrzebny jest krótki etap hardeningu (technicznego i procesowego).

---

## 2) Co jest zrobione dobrze (mocne strony)

### 2.1 Struktura i organizacja projektu
- Jasny podział na strony biznesowe (`index`, `uslugi`, `cennik`, `o-nas`, `poradnik`, `formularz`).
- Rozsądny podział CSS na warstwy (`tokens`, `base`, `layout`, `components`, `utilities`, `pages`).
- Spójny schemat powtarzalnych sekcji (header/footer/sekcje treści), co ułatwia dalsze utrzymanie.

### 2.2 UX i interakcje
- Dobrze działające kluczowe interakcje front-endowe:
  - menu mobilne z obsługą ESC i pułapką fokusu,
  - akordeony FAQ,
  - filtrowanie pakietów cenowych,
  - przycisk „back to top”,
  - reveal-on-scroll (z fallbackiem dla reduced motion).
- CTA są widoczne i sensownie rozmieszczone (telefon 24/7, formularz konsultacji).

### 2.3 Dostępność bazowa (na plus)
- Obecny `skip-link` i sensowne landmarki (`header`, `nav`, `main`, `footer`).
- Dbałość o `aria-*` w elementach dynamicznych.
- Użycie `:focus-visible` i respektowanie `prefers-reduced-motion`.

### 2.4 Fundamenty utrzymania
- ESLint i Prettier są skonfigurowane.
- Osobny skrypt do konwersji obrazów (`webp/avif`) pokazuje dobrą intencję optymalizacji.
- Dokumentacja README opisuje uruchomienie i build.

---

## 3) Najważniejsze problemy i ryzyka

## P0 (krytyczne przed wdrożeniem)

### 3.1 Build produkcyjny jest niestabilny
Komenda `npm run build` kończy się błędem na kroku `build:assets` (`cpx -r assets dist/assets` -> `Unknown option(s): -r`). To blokuje powtarzalne wydania.

**Ryzyko biznesowe:** brak wiarygodnego artefaktu release i ryzyko ręcznych obejść.

### 3.2 Formularz nie realizuje celu biznesowego
Walidacja formularza działa tylko po stronie klienta i kończy się komunikatem sukcesu bez potwierdzonej wysyłki do backendu/CRM.

**Ryzyko biznesowe:** utrata leadów przy pozornie działającym flow.

---

## P1 (wysoki priorytet po domknięciu P0)

### 3.3 Walidacja danych jest zbyt ogólna
Obecna walidacja sprawdza głównie pusto/niepusto. Brakuje reguł formatów (np. telefon), limitów długości i bardziej precyzyjnych komunikatów.

### 3.4 Warstwa SEO technicznego jest podstawowa
Są `title` i `description`, ale brakuje szerszego pakietu pod SEO operacyjne (m.in. canonical, sitemap, robots, dane strukturalne).

### 3.5 Brak telemetrii i KPI
Brak analityki zdarzeń (kliknięcia CTA, wysyłki formularza, interakcje z cennikiem/FAQ), co utrudnia optymalizację konwersji.

### 3.6 Brak testów scenariuszy krytycznych
Brak automatycznych testów e2e dla najważniejszych flow użytkownika.

---

## P2 (doskonalenie jakości i skalowalności)

### 3.7 Monolityczny `main.js`
Plik JS jest czytelny, ale rosnąca liczba funkcji w jednym miejscu pogarsza skalowalność i utrzymanie.

### 3.8 Wysoki poziom duplikacji markupu
Header i footer są ręcznie powielane na wielu stronach, co zwiększa koszt zmian i ryzyko niespójności.

### 3.9 Treści i wiarygodność
Projekt jest poprawny wizualnie, ale część treści ma charakter szablonowy (placeholderowe social linki/mapa), co osłabia odbiór „production-ready”.

### 3.10 Braki formalno-prawne
Linki do polityk są placeholderami, brak domkniętych elementów compliance (RODO/prywatność/cookies).

---

## 4) Ocena obszarowa (w kontekście wczesnej fazy)

| Obszar | Ocena | Komentarz |
|---|---:|---|
| Architektura front-end | 8/10 | Dobra baza MPA i rozsądny podział CSS |
| Czytelność kodu | 8/10 | Kod prosty i przewidywalny |
| UX podstawowy | 7.5/10 | Intuicyjne flow i sensowne CTA |
| Dostępność (bazowa) | 7.5/10 | Fundamenty są, potrzebny pełny przegląd WCAG 2.2 |
| SEO techniczne | 6/10 | Podstawa jest, brakuje elementów operacyjnych |
| Konwersja / lead flow | 5.5/10 | Największa luka: brak realnej wysyłki formularza |
| Gotowość produkcyjna | 5/10 | Build blocker + brak testów/metryk |

---

## 5) Priorytety na najbliższy etap

### Priorytet A (natychmiast)
1. Naprawić pipeline build i potwierdzić powtarzalny artefakt `dist`.
2. Podłączyć formularz do realnego endpointu (z obsługą błędu i sukcesu).
3. Uporządkować minimalny standard release (checklista + podstawowe smoke testy).

### Priorytet B (krótki horyzont)
4. Rozszerzyć walidację formularza (formaty, ograniczenia, komunikaty).
5. Dodać analitykę zdarzeń i podstawowe KPI konwersji.
6. Uzupełnić SEO techniczne (roboty/sitemap/canonical/JSON-LD).

### Priorytet C (stabilizacja i skalowanie)
7. Rozbić JS na moduły domenowe.
8. Ograniczyć duplikację layoutów.
9. Dodać testy e2e dla flow krytycznych.

---

## 6) Ocena końcowa

Projekt Eternal Rest jest **solidnym early-stage front-endem**: estetycznym, spójnym i dobrze rokującym pod dalszą profesjonalizację. Nie wymaga przebudowy architektonicznej „od zera”, tylko **precyzyjnego domknięcia braków wdrożeniowych** i uporządkowania jakości procesu.

**Rekomendacja:**
- status na dziś: **„warunkowo gotowy do dalszego developmentu, nie do pełnego wdrożenia produkcyjnego”**,
- po usunięciu punktów P0 i części P1: możliwe bezpieczne wejście w etap soft-launch.
