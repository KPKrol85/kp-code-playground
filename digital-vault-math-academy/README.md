# digital-vault-math-academy

## Cel projektu
Statyczny, edukacyjny serwis matematyczny w stylu Digital Vault, zaprojektowany jako baza do rozwoju kolejnych modułów nauki matematyki po polsku.

## Funkcje
- Strona główna z nawigacją i ścieżką nauki.
- Pełny moduł „Liczby pierwsze” (teoria + praktyka).
- Interaktywny sandbox:
  - sprawdzanie pierwszości liczby,
  - siatka 1–100 z oznaczaniem i klasyfikacją,
  - trening wyboru liczb pierwszych,
  - rozkład na czynniki pierwsze,
  - mini quiz z punktacją.
- Sekcja ćwiczeń z ukrytymi odpowiedziami (`details`).

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

## Jak uruchomić lokalnie
1. Otwórz folder projektu.
2. Uruchom `index.html` w przeglądarce.
3. Przejdź do `liczby-pierwsze.html`, aby korzystać z modułu i sandboxu.

## Opis sandboxu
- **Prime checker**: podajesz liczbę i dostajesz wynik pierwszości, dzielniki i testowane dzielniki do pierwiastka.
- **Number grid (1–100)**: klikasz liczby, pokazujesz liczby pierwsze/złożone lub uruchamiasz wizualne sito.
- **Training mode**: zaznaczasz liczby pierwsze i sprawdzasz wynik.
- **Factorization**: szybki rozkład na czynniki pierwsze.
- **Quiz**: losowa liczba, odpowiedź Tak/Nie i bieżąca punktacja.

## Ograniczenia
- Projekt działa wyłącznie po stronie klienta (brak backendu i zapisu postępu).
- Wyniki quizu i treningu nie są utrwalane po odświeżeniu strony.
- Obecnie tylko moduł „Liczby pierwsze” jest w pełni wdrożony.

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
