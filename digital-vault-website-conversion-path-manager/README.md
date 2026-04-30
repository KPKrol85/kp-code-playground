# Manager ścieżki konwersji na stronie

Produkt z serii **KP_Code Digital Vault – Website Improvement Tools**.

## Opis
Manager ścieżki konwersji na stronie to samodzielna mini-platforma do oceny, porządkowania i poprawy ścieżki użytkownika od pierwszego kontaktu ze stroną do działania (zapytanie, kontakt, zakup).

## Jaki problem rozwiązuje
Narzędzie pomaga szybko wykryć, gdzie strona traci użytkowników oraz które elementy należy poprawić najpierw, żeby ścieżka decyzji była czytelna i skuteczna.

## Dla kogo
- freelancerzy
- agencje
- właściciele firm
- osoby przygotowujące redesign, landing page lub audyt konwersji

## Główne funkcje
- dashboard z wynikiem Conversion Path Score
- ocena 6 etapów ścieżki konwersji
- statusy elementów: Brak / Słabo / Dobrze / Bardzo dobrze
- notatki per element
- wykrywanie blokerów konwersji
- dynamiczny plan działań (Najpierw odblokuj / Następnie uporządkuj / Później zoptymalizuj)
- raport końcowy z podsumowaniem
- kopiowanie raportu do schowka
- tryb wydruku raportu
- lokalny zapis danych (localStorage)
- reset danych demonstracyjnych

## Struktura plików
- `index.html` – struktura aplikacji
- `styles.css` – styl premium workspace + responsywność + print
- `script.js` – logika oceny, scoring, rekomendacje, persistence
- `README.md` – dokumentacja

## Uruchomienie lokalne
1. Otwórz plik `index.html` w przeglądarce.
2. Nie są wymagane build tools, backend ani zależności zewnętrzne.

## Jak używać
1. Przejdź przez etapy i ustaw status dla każdego punktu.
2. Dodawaj notatki przy elementach wymagających decyzji.
3. Obserwuj wynik, blokery i plan priorytetów po prawej stronie.
4. Skopiuj raport lub wydrukuj podsumowanie.

## Model scoringowy
- Statusy: Brak=0, Słabo=1, Dobrze=2, Bardzo dobrze=3
- Wpływ: niski=1, średni=2, wysoki=3, krytyczny=4
- Wynik końcowy: `actual points / max points * 100`
- Blokery krytyczne: status Brak/Słabo + wpływ wysoki/krytyczny

## Trwałość danych
Aplikacja zapisuje statusy i notatki do `localStorage` (przeglądarka użytkownika), z informacją o ostatniej lokalnej aktualizacji.

## Dostępność
- semantyczne sekcje HTML
- focus states dla kontrolek
- aria-live dla komunikatów (zapis, kopiowanie, reset)
- etykiety pól formularza
- wsparcie `prefers-reduced-motion`

## Druk i eksport
- przycisk „Drukuj raport” używa `window.print()`
- style wydruku ukrywają interakcje i upraszczają widok pod raport
- przycisk „Kopiuj raport” generuje czysty tekst po polsku

## Możliwe rozwinięcia
- porównywanie dwóch wersji strony (przed/po)
- eksport PDF i JSON
- wsparcie wielu projektów w jednym interfejsie
- dedykowany moduł „rekomendacje wg typu strony”
