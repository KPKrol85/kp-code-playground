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
- kontraktowe stany opcji formularza: nieaktywne ustawienia są wyłączane lub opisane jako pomijane w uproszczonym modelu
- drukowanie czytelnego podsumowania po poprawnym obliczeniu
- kopiowanie transparentnego tekstowego podsumowania bez backendu ani usług zewnętrznych

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

## Tax constants verification
`js/tax-config.js` remains the source of truth for tax constants, contribution rates, metadata, and simplified model assumptions. The official-source audit workflow is documented in `docs/tax-verification-checklist.md` and must be updated whenever any tax constant, tax year, or model assumption changes.

The checklist maps app values to the official sources that should verify them and records whether each item is verified, requires verification, needs an update, or is a simplified model assumption. Automated tests protect current calculation behavior, but they do not prove official tax correctness or suitability for individual legal, tax, accounting, or financial decisions.


## Interpretacja wyników
- Wyniki pokazują szacunkowe wartości netto, brutto/przychodu oraz — dla umowy o pracę — łączny koszt pracodawcy.
- Ranking w porównaniu zależy od kierunku obliczeń: dla brutto → netto wyżej oceniany jest wyższy wynik netto, a dla netto → brutto niższa wymagana kwota brutto/przychodu.
- Łączny koszt pracodawcy jest bezpośrednio pokazywany głównie dla umowy o pracę; inne formy współpracy nie mają w uproszczonym modelu w pełni porównywalnego odpowiednika tego kosztu.
- Porównania B2B i umów cywilnoprawnych korzystają z uproszczonych założeń, bez pełnej analizy indywidualnych ulg, kosztów działalności, VAT i szczególnych zasad ZUS/zdrowotnych.
- Założenia, ograniczenia i disclaimer pozostają widoczne w aplikacji przy interpretacji wyników.

## Założenia uproszczonego modelu
- Kalkulacje opierają się na miesięcznej kwocie wejściowej i prostym przeliczeniu rocznym x12.
- Formularz obejmuje wybrane warianty: umowa o pracę, zlecenie, dzieło, B2B skala, B2B liniowy i B2B ryczałt.
- PIT-2, ulga dla osób poniżej 26 lat, PPK, koszty uzyskania przychodu i typ ZUS są obsługiwane jako uproszczone opcje formularza.
- Część opcji jest zależna od typu umowy: PPK działa tylko dla UoP, ustawienia ZUS i VAT są B2B-only, a 50% KUP jest dostępne tylko tam, gdzie wspiera je aktualny model.
- Status podatnika VAT jest obecnie założeniem informacyjnym i nie zmienia wyniku netto.
- Porównanie typów umów używa wspólnych ustawień wejściowych, ale opcje nieaktywne dla danego modelu mogą być pomijane zgodnie z uproszczoną logiką.
- W tej zmianie nie modyfikowano formuł, stałych podatkowych ani oczekiwanych wyników regresyjnych.


## Założenia modelu B2B
- Wyniki dla B2B skala, B2B liniowy i B2B ryczałt są uproszczonymi szacunkami, a nie kompletną analizą podatkową lub księgową.
- Koszty działalności nie są jeszcze odejmowane od podstawy opodatkowania; kalkulator nie ma aktywnego modelu kosztów firmowych ani kosztu księgowości.
- Status podatnika VAT jest obecnie informacyjny i nie zmienia wyniku netto, ponieważ model nie uwzględnia przepływów VAT.
- Założenia ZUS i składki zdrowotnej dla B2B są uproszczone i wymagają weryfikacji warunków, limitów oraz aktualnych kwot w oficjalnych źródłach.
- Ryczałt używa aktualnej stawki domyślnej z konfiguracji, dlatego nie powinien być traktowany jako uniwersalny dla każdej działalności, PKD lub rodzaju usługi.
- Kalkulator nie uwzględnia płatnego urlopu, chorobowego, ubezpieczeń, księgowości, indywidualnych ulg ani szczególnych zasad rozliczeń.
- Indywidualne przypadki B2B wymagają weryfikacji u księgowego lub doradcy oraz w oficjalnych źródłach.
- Planowane przyszłe usprawnienia mogą objąć jawne koszty działalności, koszt księgowości i selektor stawki ryczałtu, ale te funkcje nie są obecnie zaimplementowane.
- Testy regresyjne chronią obecne uproszczone zachowanie obliczeń, ale nie potwierdzają oficjalnej poprawności podatkowej modelu B2B.

## Drukowanie i kopiowanie podsumowania
Po poprawnym obliczeniu aplikacja odblokowuje akcje `Drukuj podsumowanie` i `Kopiuj podsumowanie` w sekcji wyników. Dla pustej lub niepoprawnej kwoty akcje pozostają nieaktywne, aby nie tworzyć mylącego wydruku ani tekstu bez ważnego wyniku.

Wydruk korzysta z reguł `@media print` w `css/style.css`. Układ ekranowy nie jest zmieniany, a podgląd wydruku upraszcza stronę do czytelnej wersji zawierającej: nazwę aplikacji, metadane modelu i status weryfikacji, wybrany kontekst kalkulacji, wyniki, tabelę porównania, założenia, ograniczenia oraz disclaimer. Kontrolki interaktywne, takie jak wybór motywu, formularz, szybkie scenariusze, przyciski akcji i historia kalkulacji, są ukrywane w druku.

Kopiowanie podsumowania używa Clipboard API, a w razie braku dostępu próbuje prostego fallbacku po stronie przeglądarki. Kopiowany tekst zawiera nazwę aplikacji, kwotę, kierunek, okres, typ umowy, aktywne opcje, wartości miesięczne i roczne, porównanie typów umów, założenia, ograniczenia oraz informację, że wartości są przybliżone i nie stanowią porady prawnej, podatkowej, księgowej ani finansowej.

### Prywatność i udostępnianie
Ta funkcja nie wprowadza backendu, kont użytkowników, bazy danych, analityki ani zewnętrznych usług udostępniania. Dane są drukowane lub kopiowane wyłącznie po świadomej akcji użytkownika w przeglądarce. Historia pozostaje lokalna w `localStorage` tak jak dotychczas.

Udostępnianie stanu przez URL nie zostało wdrożone w tym etapie. Może być przyszłym usprawnieniem, jeśli zostanie dodane z walidacją i tylko dla niesensytywnych pól kalkulatora, bez historii i bez identyfikatorów osobowych.

## Manual QA dla podsumowań
- Poprawna kalkulacja odblokowuje przyciski drukowania i kopiowania w sekcji wyników.
- Pusta albo niepoprawna kwota blokuje drukowanie i kopiowanie oraz pokazuje bezpieczny status.
- Podgląd wydruku zawiera disclaimer, założenia, ograniczenia, metadane modelu, wyniki i tabelę porównania.
- Podgląd wydruku ukrywa formularz, wybór motywu, szybkie scenariusze, przyciski akcji i historię.
- Skopiowany tekst zawiera kontekst wejściowy, aktywne opcje, wyniki, porównanie, ograniczenia i disclaimer.
- Tabela porównania pozostaje czytelna w wydruku.
- Widok mobilny/wąski pozostaje czytelny, a przyciski akcji układają się bez przepełnienia.
- Zachowanie motywu jasny/ciemny/system na ekranie pozostaje bez zmian.
- Konsola przeglądarki nie pokazuje nowych błędów po kalkulacji, druku i kopiowaniu.

## Testy regresyjne obliczeń

Projekt używa lekkiego zestawu testów opartych o wbudowany runner Node.js, bez zewnętrznych zależności. Testy uruchamia się z katalogu projektu:

```bash
npm test
```

Zakres testów obejmuje obecne publiczne funkcje obliczeniowe: reprezentatywne brutto → netto dla UoP, zlecenia, dzieła, B2B na skali, B2B liniowo i B2B ryczałtem; iteracyjne netto → brutto z tolerancją; koszt pracodawcy dla UoP; miesięczne/roczne kształtowanie wyników; porównanie typów umów oraz wybrane opcje brzegowe, takie jak ulga dla osób poniżej 26 lat, PIT-2, PPK, 50% KUP i własne wartości ZUS dla B2B.

Oczekiwane wartości w testach są wartościami regresyjnymi dla aktualnego uproszczonego modelu. Przejście testów oznacza, że bieżące formuły nie zmieniły się przypadkowo, ale nie oznacza oficjalnej weryfikacji stawek podatkowych, składkowych ani poprawności dla indywidualnych przypadków.

## Status weryfikacji
Stałe podatkowe i składkowe nie zostały oficjalnie zweryfikowane w ramach ostatniej zmiany. Przed zmianą statusu na zweryfikowany należy sprawdzić wartości w oficjalnych źródłach oraz zaktualizować pola `metadata.lastReviewed`, `metadata.verificationStatus` i `metadata.sourceStatus` w `js/tax-config.js`.

## Ograniczenia i disclaimer
- Wyniki są szacunkowe i nie stanowią porady prawnej, podatkowej, księgowej ani finansowej.
- Indywidualne przypadki (ulgi, limity, szczególne zasady ZUS/zdrowotnej, kwalifikacja prawna formy współpracy) wymagają weryfikacji przez specjalistę.
- B2B jest modelem uproszczonym: kalkulator nie uwzględnia kosztów działalności, VAT, pełnych zasad składki zdrowotnej, limitów ZUS ani pełnej klasyfikacji ryczałtu.
- Przed użyciem produkcyjnym wartości stawek należy zweryfikować i zaktualizować w `js/tax-config.js`.
