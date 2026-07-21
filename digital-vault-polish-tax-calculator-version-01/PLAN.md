# Digital Vault Polish Tax Calculator — plan rozwoju

## Status projektu

Projekt jest statycznym, działającym kalkulatorem orientacyjnym/portfolio project w HTML, CSS i JavaScript. Obsługuje sześć form współpracy oraz kierunki brutto → netto i netto → brutto, ale nie jest kandydatem do wydania jako zweryfikowany kalkulator podatkowy. Najważniejsze ograniczenie: dane i formuły oznaczone jako model 2026 nie mają w repozytorium źródeł urzędowych ani udokumentowanego audytu poprawności.

## Zweryfikowany obecny zakres

- [x] Statyczna aplikacja oparta na modułach ES, bez procesu budowania i bez zależności npm.
- [x] Wejście kwoty, walidacja pustej, niedodatniej i bardzo dużej wartości oraz komunikat przy polu.
- [x] Tryby brutto → netto i netto → brutto; drugi korzysta z binarnego wyszukiwania wyniku funkcji brutto → netto.
- [x] Miesięczny model oraz roczne wejście/wyjście oparte na podziale i mnożeniu przez 12.
- [x] Obliczenia dla UoP, zlecenia, dzieła oraz B2B: skala, liniowy i ryczałt.
- [x] Opcje formularza dla ulgi dla młodych, PPK, PIT-2, KUP oraz B2B ZUS (w tym wartości własne); część opcji jest wyłączana zależnie od typu umowy.
- [x] Wyniki z pozycjami składek, PIT, PPK, obciążeniem i — tylko dla UoP — kosztem pracodawcy, plus ranking sześciu form współpracy.
- [x] Parametry URL dla stanu kalkulacji, wydruk podsumowania i preferencja motywu w `localStorage`.
- [x] Jasny, ciemny i systemowy motyw, układ responsywny, style fokusu, `aria-live`, semantyczne grupy formularza oraz reguła ograniczonego ruchu.
- [x] Dependency-free harness Node.js dla logiki obliczeń.
- [ ] Poprawność wartości, formuł i ich zgodność z rzeczywistymi polskimi zasadami nie została zweryfikowana w repozytorium.
- [ ] Nie ma testów DOM/UI, automatycznego audytu dostępności ani zapisanych scenariuszy kalkulacji.

## Zasady rozwoju

- [ ] Nie przedstawiać wyników jako porady podatkowej, prawnej, księgowej ani finansowej.
- [ ] Zmieniać dane i formuły dopiero po weryfikacji w wiarygodnych źródłach oraz dodaniu odpowiednich testów.
- [ ] Oddzielać dane reguł od funkcji obliczeń i renderowania interfejsu; zachować obecne granice `tax-config.js`, `calculations.js`, `utils.js` i `main.js`.
- [ ] Dokumentować uproszczenia, źródła, datę przeglądu, reguły zaokrągleń i przypadki nieobsługiwane.
- [ ] Chronić prywatność: domyślnie nie przesyłać ani nie zapisywać danych finansowych użytkownika.

## Wymagane prace przed pozycjonowaniem jako wiarygodny kalkulator

### 1. Poprawność obliczeń

- [ ] Zweryfikować każdą stałą i formułę w `js/tax-config.js` oraz `js/calculations.js` względem zamierzonego zbioru polskich reguł.
- [ ] Udokumentować wspierany rok/reguły, źródła, datę ich przeglądu i wszystkie świadome uproszczenia.
- [ ] Zweryfikować progi, ulgi, składki, KUP, wartości minimalne, limity i zależności obliczeń bez wprowadzania niepotwierdzonych danych.
- [ ] Ustalić kolejność obliczeń oraz zasady zaokrągleń do groszy i potwierdzić zgodność wyświetlanych sum z wartościami wewnętrznymi.
- [ ] Sprawdzić ścieżki UoP, zlecenia, dzieła i każdej formy B2B, w tym odwrócone wyszukiwanie netto → brutto.
- [ ] Wyjaśnić lub zmienić model roczny, który obecnie annualizuje model miesięczny.

### 2. Walidacja i obsługa błędów

- [ ] Przetestować zero, liczby ujemne, puste i błędnie sformatowane wartości oraz wartości nietypowo duże.
- [ ] Zweryfikować zakresy i format własnych składek B2B oraz zachowanie opcji nieobsługiwanych przez daną umowę.
- [ ] Zapewnić zrozumiałe błędy przy polu i zachowanie wprowadzonych wartości po błędzie.
- [ ] Upewnić się, że nieaktualne wyniki nie są widoczne po nieprawidłowej kalkulacji.

### 3. Testy i weryfikacja

- [ ] Dodać źródłowo potwierdzone lub zweryfikowane przez specjalistę przypadki referencyjne dla wszystkich ścieżek obliczeń.
- [ ] Dodać testy progów, wartości granicznych, zaokrągleń, ulg, PPK, PIT-2, KUP, typów ZUS i modelu rocznego.
- [ ] Dodać regresje dla każdej naprawionej wady obliczeń oraz rozdzielić testy obecnego zachowania od testów poprawności merytorycznej.
- [ ] Dodać testy interakcji formularza, przywracania URL, resetu i formatowania wyników, jeżeli zostanie wybrany lekki runner przeglądarkowy.

### 4. Dostępność i jakość interakcji

- [ ] Wykonać keyboard-only walkthrough, przegląd kolejności fokusu i działania resetu oraz ponownej kalkulacji.
- [ ] Przeprowadzić screen-reader smoke test etykiet, opisów, błędów, aktualizacji wyników, założeń i tabeli porównawczej.
- [ ] Sprawdzić kontrast w obu motywach i czy podsumowanie pozostaje zrozumiałe bez formatowania wizualnego.
- [ ] Sprawdzić czytelność formularza, wyników i porównania na reprezentatywnych widokach mobilnych i desktopowych.
- [ ] Doprecyzować nazwy, jednostki i objaśnienia brutto, netto, obciążenia, PIT, składek i kosztu pracodawcy.

### 5. Prywatność, dokumentacja i gotowość wydaniowa

- [ ] Potwierdzić przed wydaniem, że dane finansowe pozostają lokalne, oraz ponownie sprawdzić brak usług zewnętrznych i niezamierzonego trwałego zapisu.
- [ ] Utrzymywać widoczne ograniczenia modelu i disclaimer w interfejsie oraz dokumentacji.
- [ ] Zweryfikować uruchomienie przez udokumentowany serwer HTTP, ścieżki assetów, druk, metadane i zachowanie w wspieranych przeglądarkach.
- [ ] Usunąć błędy i ostrzeżenia konsoli wykryte podczas zwykłego użycia.
- [ ] Potwierdzić, że README, plan i changelog odpowiadają wydawanemu kodowi.

## Zalecane usprawnienia po weryfikacji podstaw

- [ ] Rozdzielić szczegóły kosztu pracodawcy na składniki, jeśli zostaną poprawnie zdefiniowane dla modelu.
- [ ] Dodać objaśnienia/glosariusz oraz czytelniejsze wyjaśnienie relacji w rankingu.
- [ ] Rozważyć dostępną prezentację porównania przy małych szerokościach bez utraty kontekstu tabeli.
- [ ] Rozstrzygnąć los informacyjnego przełącznika VAT: jasno utrzymać go jako no-op, usunąć albo modelować dopiero w ramach zweryfikowanego zakresu.
- [ ] Rozważyć wybór stawki ryczałtu wyłącznie z opisanym zakresem i testami; obecnie kod używa jednej stawki IT.
- [ ] Przy rozbudowie UI podzielić `main.js` na mniejsze moduły, zachowując istniejący przepływ stanu i URL.

## Opcjonalny przyszły rozwój

- [ ] Zweryfikowane konfiguracje dodatkowych lat podatkowych.
- [ ] Porównanie zapisanych scenariuszy lokalnie w przeglądarce, z jasną informacją o przechowywaniu danych.
- [ ] Eksport lub druk przyjaznego podsumowania po uprzedniej weryfikacji obliczeń.
- [ ] Wielojęzyczność, integracje backendowe lub automatyczne aktualizacje danych — tylko po zdefiniowaniu prywatności, źródeł i odpowiedzialności za dane.

## Kryteria ukończenia wymaganej pracy

- [ ] Wszystkie wspierane ścieżki kalkulacji mają udokumentowane reguły i zweryfikowane przypadki referencyjne.
- [ ] Przypadki graniczne, odwrócone wyszukiwanie i zaokrąglenia są pokryte testami.
- [ ] Nie ma znanych krytycznych błędów obliczeń, a ograniczenia i przypadki nieobsługiwane są opisane.
- [ ] Przeglądy dostępności, responsywności, druku i podstawowych przeglądarek są wykonane oraz odnotowane.
- [ ] Projekt uruchamia się poleceniem opisanym w README, a dokumentacja jest zgodna z kodem.

## Migracja wcześniejszych notatek

Dotychczasowy plik planu został zastąpiony tym dokumentem po odróżnieniu funkcji widocznych w kodzie od niezweryfikowanych deklaracji. W katalogu projektu nie istniał osobny plik z listą ulepszeń, więc nie było dodatkowej listy do migracji. Przydatne, nadal otwarte tematy z wcześniejszego planu zostały skonsolidowane powyżej jako wymagane, zalecane albo opcjonalne zadania.
