# Manager struktury treści strony

Profesjonalne narzędzie KP_Code Digital Vault do oceny i porządkowania treści strony internetowej przed wdrożeniem projektu.

## Jaki problem rozwiązuje
Pomaga zamienić rozproszone treści w logiczną strukturę gotową do implementacji: wykrywa braki, słabe szkice, ryzyka publikacyjne i podpowiada kolejność działań.

## Dla kogo
- freelancerzy i web designerzy,
- agencje,
- właściciele małych i średnich firm,
- osoby przygotowujące content do strony usługowej, lokalnej lub firmowej.

## Miejsce w serii KP_Code Digital Vault
To jeden z produktów serii Website Improvement Tools obok:
- Website Trust Signal Manager
- Website Conversion Path Manager
- Website Content Structure Manager

## Najważniejsze funkcje
- edytowalna mapa sekcji treści (6 obszarów, 30 bloków),
- statusy bloków: Brak / Szkic / Gotowe / Mocne,
- dynamiczny Content Structure Score (ważony wpływem),
- ocena gotowości treści i podsumowania grupowe,
- wykrywanie braków krytycznych i słabych szkiców,
- automatyczne wnioski i plan działań (teraz / następnie / później),
- notatki per blok,
- raport końcowy (widok + kopiowanie),
- reset danych, druk i widok print-friendly,
- trwałość danych przez localStorage.

## Struktura plików
- `index.html` – struktura aplikacji
- `styles.css` – layout, design system, responsywność, druk
- `script.js` – logika renderowania, scoring, rekomendacje, localStorage
- `README.md` – dokumentacja produktu

## Jak uruchomić lokalnie
1. Otwórz folder `digital-vault-website-content-structure-manager`.
2. Uruchom `index.html` w przeglądarce.
3. Nie są wymagane build tools ani zależności zewnętrzne.

## Jak używać
1. Ustaw status każdego bloku treści.
2. Dodaj notatki wdrożeniowe tam, gdzie trzeba dopisać lub uprościć copy.
3. Obserwuj dashboard: score, gotowość, braki krytyczne, mocne i słabe obszary.
4. Korzystaj z panelu wniosków i planu priorytetów.
5. Skopiuj raport lub wydrukuj podsumowanie do pracy z zespołem/klientem.

## Model oceny
- Statusy: Brak=0, Szkic=1, Gotowe=2, Mocne=3.
- Wpływ: niski=1, średni=2, wysoki=3, krytyczny=4.
- `Content Structure Score = (punkty rzeczywiste / punkty maksymalne) * 100`.
- Wynik zaokrąglany do pełnych procentów.

## Poziomy gotowości treści
- 0–35: Treści nie są gotowe
- 36–60: Treści wymagają uporządkowania
- 61–80: Treści mają solidną bazę
- 81–100: Treści są dobrze przygotowane

## LocalStorage i trwałość
Aplikacja zapisuje stan lokalnie (statusy i notatki) i przy odświeżeniu przywraca ostatnią wersję roboczą.

## Dostępność
- semantyczne sekcje HTML,
- widoczne focus states,
- etykiety pól formularzy,
- aria-live dla komunikatów (kopiowanie/reset),
- obsługa klawiatury,
- wsparcie `prefers-reduced-motion`.

## Druk i eksport
- przycisk drukowania (`window.print()`),
- uproszczony styl wydruku z raportem,
- przycisk kopiowania raportu do schowka (tekst prosty).

## Możliwe kierunki rozwoju
- eksport do pliku `.txt` i `.md`,
- porównanie wersji raportów,
- szablony branżowe bloków treści,
- rozdzielenie widoków: homepage / oferta / landing page,
- współdzielenie raportu przez URL (bez backendu, np. encoded state).
