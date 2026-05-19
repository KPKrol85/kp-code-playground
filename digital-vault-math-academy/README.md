# Digital Vault Math Academy

## Cel projektu
**Matematyka od podstaw** to samodzielny, statyczny projekt edukacyjny w stylu KP_Code Digital Vault. Celem jest budowanie praktycznego rozumienia matematyki przez moduły tematyczne i interaktywne narzędzia.

## Funkcje
- Strona główna z mapą tematów i ścieżką nauki.
- Rozbudowany moduł **Liczby pierwsze**.
- Interaktywny sandbox:
  - sprawdzanie pierwszości liczby,
  - wizualna siatka 1–100,
  - tryb treningowy „zaznacz liczby pierwsze”,
  - rozkład na czynniki pierwsze,
  - mini quiz z wynikiem.

## Struktura plików
```
digital-vault-math-academy/
├── index.html
├── liczby-pierwsze.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── prime-sandbox.js
│   └── utils.js
└── README.md
```

## Uruchomienie lokalne
1. Wejdź do folderu `digital-vault-math-academy`.
2. Otwórz `index.html` w przeglądarce.
3. Przejdź do modułu `Liczby pierwsze` i sekcji sandbox.

## Jak działa sandbox
- **Sprawdzanie liczby**: podaje informację, czy liczba jest pierwsza, listę dzielników i testowane dzielniki do pierwiastka.
- **Siatka 1–100**: pozwala oznaczać liczby, wyróżniać liczby pierwsze/złożone i uruchamiać wizualne sito Eratostenesa.
- **Trening**: użytkownik zaznacza liczby pierwsze, a system pokazuje poprawne, pominięte i błędne trafienia.
- **Rozkład na czynniki**: zwraca rozkład liczby na czynniki pierwsze.
- **Mini quiz**: losuje liczbę i sprawdza odpowiedź „Tak/Nie” z natychmiastowym wyjaśnieniem.

## Ograniczenia
- Projekt nie korzysta z backendu i nie zapisuje postępów użytkownika.
- Brak modułów tematycznych poza „Liczby pierwsze” (pozostałe są zaplanowane).

## Pomysły na kolejne moduły
- liczby naturalne
- dzielniki
- ułamki
- potęgi
- algebra
- funkcje
- geometria
- statystyka
- logika matematyczna
