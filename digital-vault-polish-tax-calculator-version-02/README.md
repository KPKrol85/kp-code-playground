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
- widoczny panel założeń kalkulacji i statusu weryfikacji modelu

## Struktura
- `index.html` – układ aplikacji i semantyczne sekcje
- `css/style.css` – styl premium, mobile-first, BEM
- `js/tax-config.js` – centralne stawki, progi podatkowe, metadane modelu i założenia kalkulacji
- `js/calculations.js` – logika obliczeń
- `js/utils.js` – formatowanie i funkcje pomocnicze
- `js/main.js` – zachowanie UI i render wyników oraz panelu założeń

## Konfiguracja zasad podatkowych
`js/tax-config.js` jest źródłem prawdy dla kalkulatora. Wszystkie stawki, progi, składki, uproszczenia modelu, metadane roku podatkowego i teksty założeń należy aktualizować w tym pliku.

Aktualny model w konfiguracji wskazuje rok zasad podatkowych `2026`, ale stałe podatkowe i składkowe wymagają weryfikacji w oficjalnych źródłach przed traktowaniem kalkulatora jako materiału publikacyjnego lub produkcyjnego.

## Założenia uproszczonego modelu
- Kalkulacje opierają się na miesięcznej kwocie wejściowej i prostym przeliczeniu rocznym x12.
- Formularz obejmuje wybrane warianty: umowa o pracę, zlecenie, dzieło, B2B skala, B2B liniowy i B2B ryczałt.
- PIT-2, ulga dla osób poniżej 26 lat, PPK, koszty uzyskania przychodu i typ ZUS są obsługiwane jako uproszczone opcje formularza.
- Porównanie typów umów używa wspólnych ustawień wejściowych, aby pokazać orientacyjną różnicę netto.

## Status weryfikacji
Stałe podatkowe i składkowe nie zostały oficjalnie zweryfikowane w ramach ostatniej zmiany. Przed zmianą statusu na zweryfikowany należy sprawdzić wartości w oficjalnych źródłach oraz zaktualizować pola `metadata.lastReviewed`, `metadata.verificationStatus` i `metadata.sourceStatus` w `js/tax-config.js`.

## Ograniczenia i disclaimer
- Wyniki są szacunkowe i nie stanowią porady prawnej, podatkowej, księgowej ani finansowej.
- Indywidualne przypadki (ulgi, limity, szczególne zasady ZUS/zdrowotnej, kwalifikacja prawna formy współpracy) wymagają weryfikacji przez specjalistę.
- B2B jest modelem uproszczonym: kalkulator nie uwzględnia kosztów działalności, VAT, pełnych zasad składki zdrowotnej, limitów ZUS ani pełnej klasyfikacji ryczałtu.
- Przed użyciem produkcyjnym wartości stawek należy zweryfikować i zaktualizować w `js/tax-config.js`.
