# Detektor Sygnałów Ostrzegawczych Klienta

Samodzielne narzędzie **KP_Code Digital Vault**, które pomaga freelancerom i małym studiom ocenić ryzyko współpracy z klientem przed podjęciem projektu.

## Pliki

- `index.html` – semantyczna struktura strony, sekcje treści, formularz checklisty i panel wyniku na żywo
- `styles.css` – responsywne style mobile-first z własnymi właściwościami CSS i dostępnymi stanami focus
- `script.js` – logika oceny ryzyka w vanilla JavaScript, aktualizacje na żywo i reset formularza

## Model punktacji ryzyka

Każdy sygnał ostrzegawczy ma przypisaną wagę:

- Łagodny: 1–2 punkty
- Średni: 3 punkty
- Poważny: 4–5 punktów

Przedziały ryzyka:

- **Niskie ryzyko:** 0–6
- **Średnie ryzyko:** 7–15
- **Wysokie ryzyko:** 16+

## Jak używać

Otwórz `index.html` w przeglądarce. Zaznaczaj i odznaczaj sygnały ostrzegawcze, aby na bieżąco widzieć zmianę poziomu ryzyka współpracy.

## Uwagi

- W pełni statyczne narzędzie: bez frameworków, build tools, storage i zewnętrznych assetów.
- Narzędzie wyłącznie wspierające decyzje (to nie porada prawna/finansowa).
