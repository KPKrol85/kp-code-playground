# Kalkulator podatkowy PL

## Cel projektu
Statyczna aplikacja webowa do orientacyjnego wyliczania wynagrodzeń brutto/netto, kosztu pracodawcy i porównania form rozliczeń w Polsce.

## Funkcje
- brutto → netto i netto → brutto (iteracyjnie)
- wsparcie dla: UoP, zlecenie, dzieło, B2B skala/liniowy/ryczałt
- rozbicie składek i podatku PIT
- koszt pracodawcy dla umowy o pracę
- porównanie netto dla wszystkich typów umów
- walidacja i ostrzeżenia

## Struktura
- `index.html` – układ aplikacji i semantyczne sekcje
- `css/style.css` – styl premium, mobile-first, BEM
- `js/tax-config.js` – centralne stawki i progi podatkowe
- `js/calculations.js` – logika obliczeń
- `js/utils.js` – formatowanie i funkcje pomocnicze
- `js/main.js` – zachowanie UI i render wyników

## Konfiguracja zasad podatkowych
Wszystkie stawki, progi, składki i notatki znajdują się w `js/tax-config.js`.
Aby zaktualizować kalkulator, należy zmieniać wartości wyłącznie w tym pliku.

## Ograniczenia i disclaimer
- Wyniki są szacunkowe i nie stanowią porady prawnej, podatkowej ani księgowej.
- Indywidualne przypadki (ulgi, limity, szczególne zasady ZUS/zdrowotnej) wymagają weryfikacji przez księgowego.
- Przed użyciem produkcyjnym wartości stawek należy zweryfikować i zaktualizować.
