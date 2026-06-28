# Digital Vault Polish Tax Calculator

Statyczny kalkulator podatkowy i wynagrodzeń dla Polski. Aplikacja liczy szacunkowe netto, brutto, składki, PIT, koszt pracodawcy oraz porównuje formy współpracy:

- umowa o pracę,
- umowa zlecenie,
- umowa o dzieło,
- B2B na skali podatkowej,
- B2B liniowo,
- B2B ryczałt.

## Uruchomienie lokalne

Projekt używa modułów ES, dlatego najlepiej uruchomić go przez prosty statyczny serwer:

```bash
npx serve .
```

albo dowolnym lokalnym serwerem HTTP i wejść na `index.html`.

## Funkcje

- kalkulacja brutto -> netto oraz netto -> brutto,
- tryb miesięczny i roczny,
- czytelny panel wyników ze składkami, PIT, PPK i kosztem pracodawcy,
- ranking umów dopasowany do kierunku kalkulacji,
- opcje B2B, własne wartości składek i ostrzeżenia kontekstowe,
- szybkie kwoty i możliwość odtworzenia stanu z parametrów URL, np. `?amount=10000&direction=netToGross&period=monthly&contractType=b2bLinear`.

## Uwagi

Kalkulator jest modelem orientacyjnym. Parametry podatkowe i składkowe są uproszczone, a wynik nie zastępuje indywidualnej konsultacji księgowej, finansowej ani prawnej.
