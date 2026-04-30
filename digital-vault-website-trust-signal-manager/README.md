# Manager sygnałów zaufania na stronie

Produkt KP_Code Digital Vault do audytu i zarządzania sygnałami zaufania na stronie firmowej.

## Co rozwiązuje
Narzędzie pomaga uporządkować ocenę wiarygodności strony i zamienić ją na konkretne priorytety wdrożeniowe przed redesignem, optymalizacją konwersji lub przygotowaniem projektu dla klienta.

## Dla kogo
- freelancerzy
- agencje
- właściciele firm
- konsultanci UX/CRO

## Najważniejsze funkcje
- dashboard z Trust Score i metrykami gotowości
- ocena 6 kategorii sygnałów zaufania
- interaktywne karty sygnałów (status + notatki)
- dynamiczny plan priorytetów działań
- wykrywanie braków krytycznych i wysokiego wpływu
- raport końcowy z podsumowaniem i rekomendacjami
- kopiowanie raportu do schowka
- widok do wydruku (`window.print()`)
- zapis stanu w `localStorage`
- reset danych demonstracyjnych

## Struktura plików
- `index.html` – struktura aplikacji i sekcje platformy
- `styles.css` – tokeny UI, layout dashboardu, responsywność, print, reduced motion
- `script.js` – konfiguracja danych, logika scoringu, renderowanie, interakcje, persistence
- `README.md` – dokumentacja produktu

## Jak uruchomić lokalnie
1. Otwórz folder `digital-vault-website-trust-signal-manager`.
2. Uruchom plik `index.html` bezpośrednio w przeglądarce.
3. Korzystaj z narzędzia bez backendu i bez zależności zewnętrznych.

## Jak używać platformy
1. Oceniaj każdy sygnał przez status: `Brak`, `Do poprawy`, `Dobrze`, `Mocny sygnał`.
2. Dodawaj notatki operacyjne do konkretnych sygnałów.
3. Obserwuj aktualizację Trust Score, wyników kategorii i planu działań.
4. Skopiuj raport lub wydrukuj podsumowanie.
5. Zresetuj dane, aby zacząć nową analizę.

## Model scoringu
- Wartości statusów: `Brak=0`, `Do poprawy=1`, `Dobrze=2`, `Mocny sygnał=3`
- Wagi wpływu: `niski=1`, `średni=2`, `wysoki=3`, `krytyczny=4`
- Trust Score = `actual points / max points * 100` (zaokrąglony)
- Kategorie liczone osobno tym samym modelem
- Braki krytyczne: status `Brak` + wpływ `wysoki` lub `krytyczny`

## localStorage i trwałość danych
Aplikacja zapisuje wszystkie statusy i notatki w `localStorage` pod kluczem `vaultTrustSignals`. Dane wracają po odświeżeniu strony.

## Dostępność
- semantyczna struktura (`header`, `main`, `section`, `article`, `aside`, `footer`)
- focus states dla przycisków i pól
- etykiety dla pól statusu i notatek
- region `aria-live` dla komunikatów systemowych
- wsparcie `prefers-reduced-motion`

## Druk i eksport
- przycisk „Drukuj” uruchamia `window.print()`
- styl print usuwa elementy interaktywne i dekoracyjne
- raport pozostaje czytelny na jasnym tle
- przycisk „Kopiuj raport” generuje raport tekstowy w języku polskim

## Dalsze usprawnienia
- eksport raportu do PDF
- własne profile branżowe sygnałów
- porównanie wersji audytów
- import/export danych JSON
- dedykowany tryb prezentacji dla klienta
