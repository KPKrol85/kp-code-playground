# Digital Vault Polish Tax Calculator

Statyczny kalkulator podatkowy i wynagrodzeń dla Polski. Aplikacja szacuje netto, brutto, składki, PIT, koszt pracodawcy oraz porównuje najpopularniejsze formy współpracy:

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

- kalkulacja brutto → netto oraz netto → brutto,
- tryb miesięczny i roczny,
- panel wyników ze składkami, PIT, PPK, obciążeniem i kosztem pracodawcy,
- ranking umów dopasowany do kierunku kalkulacji,
- opcje B2B: typ ZUS, własne składki oraz informacyjny status VAT,
- panel założeń z wersją reguł, datą przeglądu, uproszczeniami i disclaimerem,
- ostrzeżenia kontekstowe dla ustawień wymagających indywidualnej weryfikacji,
- jasny, ciemny i systemowy motyw,
- odtworzenie stanu z parametrów URL, np. `?amount=10000&direction=netToGross&period=monthly&contractType=b2bLinear`,
- przycisk drukowania podsumowania po poprawnej kalkulacji.

## Testy

Projekt ma lekki, bez-zależnościowy harness regresyjny dla funkcji kalkulacyjnych:

```bash
npm run test:calculations
```

Testy obejmują smoke testy dla wszystkich typów umów, wybrane wartości regresyjne brutto → netto oraz podstawowe przypadki netto → brutto z tolerancją zaokrągleń.

## Założenia i disclaimer

Kalkulator jest modelem orientacyjnym. Parametry podatkowe i składkowe są uproszczone, a wynik nie zastępuje indywidualnej konsultacji księgowej, finansowej, podatkowej ani prawnej.

Ważne ograniczenia obecnej wersji:

- tryb roczny jest przeliczeniem uproszczonego modelu miesięcznego,
- B2B nie uwzględnia kosztów działalności, VAT, księgowości, urlopu, chorobowego ani prywatnych ubezpieczeń,
- ryczałt B2B używa domyślnej stawki IT 12%,
- opcja VAT jest informacyjna i nie zmienia wyniku,
- poprawność stawek i formuł wymaga okresowej weryfikacji z aktualnymi, oficjalnymi źródłami.

## Notatki projektowe

Szczegółowa mapa projektu, ryzyka, plan dokładności obliczeń i kolejne zadania znajdują się w [`plan.md`](plan.md).
