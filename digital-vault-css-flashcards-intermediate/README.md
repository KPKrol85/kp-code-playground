# KP_Code Digital Vault — CSS Flashcards (Intermediate)

## Co to jest
Przeglądarkowa aplikacja edukacyjna z **dokładnie 100 fiszkami CSS** na poziomie intermediate. Pomaga przejść od podstaw do praktycznej pracy frontendowej.

## Dla kogo
Dla osób, które znają podstawy CSS i chcą lepiej rozumieć: layout, responsywność, kaskadę, komponenty, dostępność i wydajność.

## Struktura plików
- `index.html` — struktura aplikacji
- `assets/css/style.css` — style UI, responsywność, druk
- `assets/js/main.js` — logika fiszek, filtry, postęp, localStorage

## Jak używać
1. Otwórz `index.html` w przeglądarce.
2. Czytaj pytanie, odpowiedz samodzielnie, kliknij **Odwróć**.
3. Nawiguj kartami: **Poprzednia / Następna / Losowa**.
4. Oznaczaj znane karty przyciskiem **Oznacz jako znaną**.

## Jak działają filtry
- **Kategoria**: wszystkie lub jedna kategoria.
- **Trudność**: wszystkie / medium / harder.
- Nawigacja i licznik działają tylko na aktualnie przefiltrowanym zbiorze.

## Jak działa postęp
Aplikacja zapisuje w `localStorage`:
- znane karty,
- aktualny indeks karty,
- wybraną kategorię,
- wybraną trudność,
- tryb challenge.

Dashboard pokazuje: łączną liczbę kart, znane, pozostałe i procent postępu.

## Tryb challenge
Po włączeniu trybu challenge kategoria i trudność są ukryte do momentu odwrócenia karty.

## Jak wydrukować study sheet
Użyj systemowego drukowania (`Ctrl/Cmd + P`).
Widok print:
- ukrywa interaktywne kontrolki,
- pokazuje treść fiszek czytelnie na A4,
- zachowuje pytania, odpowiedzi, kod i notatki praktyczne.

## Personalizacja fiszek
Edytuj tablicę `content` w `assets/js/main.js`.
Każda pozycja odpowiada jednej karcie i zawiera: kategorię, trudność, pytanie, odpowiedź, opcjonalny kod i opcjonalną notatkę.
