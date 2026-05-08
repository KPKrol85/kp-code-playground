# KP_Code Digital Vault — CSS Flashcards Basic Kids

## Co to jest?
To samodzielna aplikacja webowa z 100 fiszkami o podstawach CSS. Działa bez instalacji — wystarczy otworzyć `index.html` w przeglądarce.

## Dla kogo?
- Dla dzieci i młodych osób zaczynających programowanie.
- Dla absolutnie początkujących, którzy chcą zrozumieć CSS spokojnie i krok po kroku.

## Pliki w produkcie
- `index.html` — struktura aplikacji.
- `assets/css/style.css` — stylowanie, responsywność i tryb wydruku.
- `assets/js/main.js` — dane 100 fiszek, logika nawigacji i postęp.
- `README.md` — opis działania i instrukcje.

## Jak używać
1. Otwórz `index.html`.
2. Wybierz kategorię lub ucz się ze wszystkich kart.
3. Kliknij **Odwróć**, aby zobaczyć odpowiedź.
4. Oznacz kartę jako znaną, gdy temat jest jasny.
5. Użyj przycisków poprzednia / następna / losowa do nawigacji.

## Jak działa postęp
- Aplikacja zapisuje stan w `localStorage`:
  - znane fiszki,
  - aktualną pozycję,
  - wybraną kategorię.
- Dashboard pokazuje: liczbę wszystkich kart w filtrze, znane, pozostałe i procent postępu.
- **Resetuj postęp** czyści zapisaną naukę po potwierdzeniu.

## Jak dostosować fiszki
- Otwórz `assets/js/main.js`.
- Edytuj tablicę `flashcards`.
- Każda fiszka ma pola: `id`, `category`, `question`, `answer`, opcjonalnie `example`.
- Zachowaj unikalne `id` i dokładnie 100 wpisów, jeśli chcesz utrzymać ten sam format produktu.

## Jak wydrukować kartę nauki
1. Otwórz aplikację w przeglądarce.
2. Użyj `Ctrl+P` / `Cmd+P`.
3. Styl `@media print` ukryje kontrolki i pokaże arkusz nauki z pytaniami i odpowiedziami na A4.
