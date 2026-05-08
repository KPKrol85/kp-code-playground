# KP_Code Digital Vault — CSS Flashcards Advanced

## Co to jest
Samodzielny produkt edukacyjny w przeglądarce: 100 zaawansowanych fiszek CSS (HTML/CSS/Vanilla JS), zaprojektowanych pod praktykę seniorską.

## Dla kogo
Dla osób, które znają CSS i chcą podnieść poziom decyzji produkcyjnych: architektura, utrzymywalność, wydajność renderowania, dostępność, debugowanie i audyt.

## Pliki
- `index.html` — struktura aplikacji.
- `assets/css/style.css` — stylowanie UI, responsywność, tryb druku A4.
- `assets/js/main.js` — logika fiszek, filtrowanie, postęp, localStorage, tryby nauki.

## Jak używać
1. Otwórz `index.html` w przeglądarce.
2. Czytaj pytanie, użyj **Odwróć**, porównaj odpowiedź.
3. Oznaczaj znane karty przyciskiem **Oznacz jako znam**.
4. Nawiguj: **Poprzednia**, **Następna**, **Losowa**.

## Jak dostosować fiszki
W `assets/js/main.js` edytuj tablicę `flashcards` (obiekty z polami: `id`, `category`, `difficulty`, `question`, `answer`, opcjonalnie `code`, `note`).

## Filtry
- **Kategoria**: wszystkie lub konkretna domena CSS.
- **Poziom trudności**: wszystkie / advanced / senior / expert.

Filtry działają łącznie i od razu aktualizują nawigację oraz widok karty.

## Postęp
Aplikacja zapisuje w `localStorage`:
- bieżącą kartę,
- znane karty,
- wybraną kategorię,
- wybraną trudność,
- aktywne tryby nauki.

Dashboard pokazuje: łączną liczbę kart, znane, pozostałe, procent postępu i etykietę gotowości.

## Focus mode
Ukrywa dashboard, intro i notatki, aby ograniczyć dystrakcje.

## Interview mode
Pokazuje wskazówkę „odpowiedz na głos najpierw”, a odpowiedź staje się widoczna dopiero po odwróceniu karty.

## Druk / study sheet
Użyj drukowania przeglądarki (`Ctrl/Cmd + P`).
Tryb `@media print` ukrywa interaktywne kontrolki i przygotowuje czytelny arkusz nauki na A4.

## Sugerowany workflow nauki
1. Przejście całości bez filtrowania.
2. Druga runda: filtrowanie po kategoriach problematycznych.
3. Trzecia runda: tylko `senior` i `expert`.
4. Interview mode: odpowiedzi na głos.
5. Review tygodniowy + reset postępu co sprint/iterację.
