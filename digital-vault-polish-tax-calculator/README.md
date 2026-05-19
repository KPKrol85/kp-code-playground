# Kalkulator podatkowy PL

## Cel projektu
Statyczna aplikacja webowa do orientacyjnego szacowania wynagrodzeń i obciążeń podatkowo-składkowych w Polsce dla różnych typów umów.

## Funkcje
- kalkulacja brutto → netto oraz netto → brutto (iteracyjnie),
- wsparcie dla umowy o pracę, zlecenia, dzieła i modeli B2B,
- szacowanie kosztu pracodawcy (dla UoP),
- podział składników: PIT, składki społeczne, zdrowotna, zaliczka,
- widok miesięczny i roczny,
- tabela porównawcza typów umów,
- ostrzeżenia kontekstowe i disclaimer.

## Struktura plików
```
digital-vault-polish-tax-calculator/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── tax-config.js
│   ├── calculations.js
│   └── utils.js
└── README.md
```

## Konfiguracja zasad podatkowych
Wszystkie podstawowe stawki, progi i założenia są centralnie utrzymywane w `js/tax-config.js`.
Logika w `js/calculations.js` korzysta z tych wartości, dzięki czemu aktualizacja stawek odbywa się w jednym miejscu.

## Ograniczenia i disclaimer
- Aplikacja nie zastępuje indywidualnej konsultacji księgowej/podatkowej/prawnej.
- Część wariantów (zwłaszcza B2B, ulgi, koszty 50%, status VAT, niestandardowe ZUS) wymaga indywidualnej weryfikacji.
- Przed wdrożeniem produkcyjnym wartości stawek i zasad muszą zostać zaktualizowane i potwierdzone według aktualnych przepisów.
