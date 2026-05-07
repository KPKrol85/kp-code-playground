# KP_Code Digital Vault — Project Access Tracker

## Czym jest ten produkt
To samodzielny, przeglądarkowy dokument operacyjny do śledzenia statusów dostępów projektowych oraz procesu przekazania projektu klientowi (handoff).

## Dla kogo
- freelancerzy i web developerzy
- małe studia projektowe
- zespoły realizujące wdrożenia z przekazaniem własności klientowi

## Zawartość
- `index.html` — główny interfejs narzędzia
- `assets/css/style.css` — styl premium + tryb druku A4
- `assets/js/main.js` — logika statusów, podsumowań, checklist i localStorage
- `access-tracker-template.md` — szablon Markdown do ponownego użycia

## Jak używać
1. Otwórz `index.html` w przeglądarce.
2. Uzupełnij sekcję informacji o projekcie.
3. Przejdź przez kategorie dostępów i ustaw statusy.
4. Uzupełnij checklisty uruchomienia i handoffu.
5. Sprawdź dashboard podsumowania.
6. Użyj „Drukuj / Zapisz jako PDF” do formalnego przekazania dokumentu.

## Jak dostosować kategorie dostępów
Edytuj tablicę `categories` w `assets/js/main.js` i dodaj/usuń pozycje zgodnie z procesem Twojego zespołu.

## Zasady bezpiecznej obsługi danych
- Ten dokument przechowuje tylko statusy, odpowiedzialność i notatki procesowe.
- Dane uwierzytelniające przekazuj poza dokumentem, przez bezpieczne kanały.
- Przed startem i po handoffie wykonuj przegląd dostępów.
- Usuwaj konta i uprawnienia, które nie są już potrzebne.

## Rekomendowany workflow handoffu
1. Zweryfikuj pełną listę punktów dostępowych.
2. Potwierdź właściciela każdego obszaru.
3. Przekaż dane poufne poza dokumentem (np. manager haseł, szyfrowany kanał).
4. Potwierdź 2FA i procedury odzyskiwania.
5. Zamknij checklistę handoffu oraz finalny przegląd.

## Krytyczne ostrzeżenie
**Nigdy nie zapisuj w tym dokumencie haseł, tokenów, secret keys, kluczy API ani recovery codes.**
