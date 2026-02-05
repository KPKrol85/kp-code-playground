# Apple-style Calculator

Mini-projekt kalkulatora inspirowanego iOS: ciemny interfejs, duże przyciski, obsługa klawiatury oraz PWA (offline + instalacja).

## Uruchomienie lokalne

1. Otwórz katalog `calculator/` w edytorze.
2. Uruchom prosty serwer, np.:
   ```bash
   python -m http.server 8080
   ```
3. Wejdź na `http://localhost:8080`.

## Testowanie PWA

1. Otwórz Chrome DevTools → Application → Service Workers.
2. Zaznacz „Offline” i odśwież stronę – kalkulator powinien nadal działać.
3. W DevTools → Application → Manifest kliknij „Install” (lub „Add to Home Screen” na mobile).

## Scenariusze testów manualnych

- Podstawowe działania: `2 + 3 =` → `5`.
- Powtarzanie `=`: `2 + 3 =` → `5`, kolejne `=` → `8`, `11`.
- Procenty: `200 %` → `2`.
- Zmiana znaku: `9 +/-` → `-9`.
- Backspace: wpisz `123`, `Backspace` → `12`.
- Dzielenie przez zero: `7 ÷ 0` → `Error` i blokada wejścia do `AC`.
- Obsługa klawiatury: cyfry, `.` , `+ - * /`, `Enter`, `Escape`, `Backspace`.
- Responsywność: brak przewijania na telefonie, wyśrodkowanie na desktopie.
