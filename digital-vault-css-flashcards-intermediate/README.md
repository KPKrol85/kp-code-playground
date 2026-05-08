# KP_Code Digital Vault — CSS Flashcards Intermediate

Przeglądarkowa aplikacja edukacyjna z **100 fiszkami CSS (poziom intermediate)**, zbudowana wyłącznie w HTML, CSS i Vanilla JavaScript.

## Dla kogo
Dla osób, które znają podstawy CSS i chcą wejść poziom wyżej: layout, responsywność, kaskada, nowoczesne funkcje CSS i dobre decyzje frontendowe.

## Struktura plików
- `index.html` — struktura aplikacji, sekcje edukacyjne, panel fiszek, filtry i dashboard.
- `assets/css/style.css` — stylowanie UI, tokeny CSS, responsywność, tryb druku A4.
- `assets/js/main.js` — logika fiszek, nawigacja, filtry, challenge mode, lokalne zapisywanie postępu.

## Jak używać
1. Otwórz `index.html` w przeglądarce.
2. Czytaj pytanie, kliknij **Odwróć**, sprawdź odpowiedź.
3. Przechodź przez karty przyciskami **Poprzednia/Następna/Losowa**.
4. Oznaczaj opanowane karty przyciskiem **Oznacz jako znam**.

## Filtry
- **Kategoria**: wszystkie lub konkretna grupa tematyczna.
- **Poziom trudności**: wszystkie, średni, trudniejszy.

Filtry wpływają na widok kart i metryki postępu tylko w aktualnym podzbiorze.

## Postęp
Aplikacja zapisuje w `localStorage`:
- listę kart oznaczonych jako znane,
- aktualną kartę,
- wybraną kategorię,
- wybrany poziom trudności,
- stan challenge mode.

## Challenge mode
Po włączeniu challenge mode kategoria i poziom trudności są ukryte do momentu odwrócenia karty. Dzięki temu skupiasz się najpierw na samym pytaniu.

## Drukowanie (study sheet)
Użyj funkcji **Print** w przeglądarce. Arkusz druku:
- ukrywa kontrolki interaktywne,
- zachowuje treść naukową,
- stosuje czytelny układ pod A4.

## Rozbudowa / własne fiszki
W `assets/js/main.js` edytuj tablicę źródłową i funkcję `add(...)`:
- pytanie (`question`),
- odpowiedź (`answer`),
- kod (`code`, opcjonalny),
- notatka (`note`, opcjonalna),
- kategoria i poziom trudności.

Po zmianach odśwież stronę.
