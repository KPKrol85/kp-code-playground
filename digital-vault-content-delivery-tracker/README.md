# KP_Code Digital Vault · Tracker Materiałów od Klienta

## Czym jest ten produkt
Tracker Materiałów od Klienta to samodzielna statyczna aplikacja webowa do zarządzania zbiorem materiałów od klienta przed i w trakcie realizacji strony lub projektu cyfrowego.

Pomaga zespołom monitorować, co zostało poproszone, co jest zablokowane, co wymaga poprawek i czy projekt jest gotowy do przekazania na produkcję.

## Dla kogo
- Freelancerzy realizujący strony i portale klientowskie
- Projektanci i developerzy zarządzający ryzykiem zależności materiałowych
- Agencje i małe studia koordynujące wielu interesariuszy po stronie klienta
- Małe zespoły cyfrowe potrzebujące prostego trackera bez backendu

## Jakie problemy rozwiązuje
- Brakujące materiały wykrywane zbyt późno w produkcji
- Niejasna odpowiedzialność za dostarczenie materiałów i dostępów
- Chaos statusów między elementami wymaganymi i opcjonalnymi
- Trudna komunikacja przy przekazaniu między PM, devem i klientem
- Ryzyko opóźnień przez krytyczne braki treści

## Funkcje
- Jednostronicowy interfejs w stylu Digital Vault
- Panel ustawień projektu z podsumowaniem na żywo
- Interaktywny tracker z domyślną listą startową
- Edycja statusu, priorytetu, wymagalności, dat, właściciela i notatek
- Filtrowanie po kategorii, statusie, priorytecie i wyszukiwaniu tekstowym
- Dodawanie i usuwanie własnych elementów
- Szybki reset trackera do szablonu startowego
- Dashboard metryk i wyliczana gotowość projektu
- Podsumowanie braków do follow-upów z klientem
- Generowanie wiadomości do klienta jednym kliknięciem
- Szablony eksportu: checklista klienta, handoff wewnętrzny, follow-up braków
- Opcjonalny localStorage z fallbackiem do pamięci sesji

## Jak używać
1. Otwórz `index.html` w nowoczesnej przeglądarce.
2. Uzupełnij dane projektu i klienta.
3. Przejrzyj domyślne elementy i aktualizuj statusy/priorytety.
4. Uzupełniaj daty, właściciela i notatki wraz z napływem materiałów.
5. Dodawaj własne elementy zależnie od projektu.
6. Filtruj listę, aby skupić się na blokadach i elementach krytycznych.
7. Korzystaj z podsumowań i eksportów w komunikacji z klientem i zespołem.

## Struktura plików
- `index.html` — układ, formularze, tabela trackera, sekcje podsumowań i eksportu.
- `styles.css` — responsywny system wizualny i stany focus.
- `script.js` — stan aplikacji, renderowanie, filtrowanie, metryki, eksporty, schowek.
- `README.md` — dokumentacja produktu.

## Notatki techniczne
- Czyste HTML/CSS/vanilla JavaScript.
- Bez frameworków, zewnętrznych zależności i backendu.
- Działa bez localStorage (fallback do pamięci).
- Dostępne sterowanie klawiaturą i aria-live.
