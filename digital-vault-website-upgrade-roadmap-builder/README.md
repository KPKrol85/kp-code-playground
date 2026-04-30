# Generator roadmapy ulepszenia strony internetowej

Produkt z kolekcji **KP_Code Digital Vault**.

## Opis
Interaktywne narzędzie online, które zamienia problemy istniejącej strony w praktyczną roadmapę ulepszeń. Użytkownik przechodzi przez 7 kroków diagnostycznych i otrzymuje wynik z priorytetami: **Teraz**, **Następny etap**, **Później**.

## Jaki problem rozwiązuje
Pomaga właścicielowi firmy, freelancerowi lub małemu zespołowi uporządkować zakres prac przed:
- redesignem,
- budową nowej strony,
- poprawą SEO,
- zwiększaniem konwersji,
- przygotowaniem briefu usługowego.

## Najważniejsze funkcje
- Landing intro w stylu premium.
- Formularz wieloetapowy (7 kroków) z walidacją.
- Pasek postępu i licznik kroków.
- Logika scoringu i rekomendacji ścieżki ulepszeń.
- Wynik: kondycja strony, gotowość projektu, priorytet działań.
- Roadmapa działań (Teraz / Następny etap / Później).
- Sekcja ryzyk i kolejnych kroków.
- Kopiowanie podsumowania do schowka.
- Tryb druku / eksportu PDF.
- Reset i restart procesu.

## Struktura plików
- `index.html` — struktura aplikacji i sekcje produktu.
- `styles.css` — styl premium, responsywność, print styles.
- `script.js` — logika kroków, walidacja, scoring, renderowanie wyników.
- `README.md` — dokumentacja produktu.

## Uruchomienie lokalne
1. Otwórz folder `digital-vault-website-upgrade-roadmap-builder`.
2. Uruchom `index.html` bezpośrednio w przeglądarce.
3. Alternatywnie użyj prostego serwera statycznego (opcjonalnie).

## Jak używać narzędzia
1. Przejdź przez kolejne kroki formularza.
2. Uzupełnij wymagane odpowiedzi.
3. Kliknij „Generuj roadmapę”.
4. Sprawdź rekomendację, wyniki i plan działań.
5. Użyj „Kopiuj podsumowanie” lub „Drukuj / eksportuj PDF”.

## Przegląd scoringu
- **Stan strony (0–100)**: oparty o ocenę aktualnej strony, stan posiadania strony i skalę problemów.
- **Gotowość projektu (0–100)**: oparta o gotowość treści, materiałów, oferty, zaplecza technicznego i decyzyjności.
- **Priorytet (niski/średni/wysoki)**: wyliczany z pilności i istotnych sygnałów ryzyka.
- **Rekomendacja ścieżki**: dopasowana do odpowiedzi (np. porządkowanie, odświeżenie, nowa strona, SEO, rozbudowa).

## Dostępność
- Semantyczne elementy HTML (`fieldset`, `legend`, etykiety).
- Widoczne focus states.
- Obsługa klawiatury dla opcji i nawigacji.
- Komunikaty walidacyjne oraz feedback kopiowania z `aria-live`.
- Wsparcie `prefers-reduced-motion`.

## Druk / eksport
- Osobne style `@media print`.
- Ukrycie elementów dekoracyjnych i przycisków.
- Kontrast i kolory dostosowane do wydruku.

## Potencjalne rozwinięcia
- Eksport wyniku do JSON/CSV.
- Wersja z zapisem historii wyników w localStorage.
- Dodatkowe reguły branżowe (np. usługi lokalne, e-commerce, B2B).
- Generator krótkiego briefu dla wykonawcy.
