# Blachodach — strona firmowa (HTML/CSS/JS)

Profesjonalny, responsywny serwis marketingowo-ofertowy dla firmy Blachodach (pokrycia dachowe, daszki, obróbki blacharskie i konstrukcje na wymiar) z modułem przeglądu produktów opartym o plik JSON.

## Cel projektu

- Przedstawić wiarygodną ofertę firmy produkcyjno-budowlanej.
- Ułatwić klientowi przegląd produktów i przygotowanie zapytania.
- Utrzymać architekturę gotową do dalszej rozbudowy (np. API/CRM).

## Struktura plików

- `index.html` — semantyczna struktura strony, sekcje marketingowe, marketplace i kontakt.
- `style.css` — tokeny designu, BEM-style classes, responsywność i dostępność wizualna.
- `script.js` — logika menu mobilnego, pobieranie `products.json`, filtrowanie, wyszukiwanie, lista zapytań.
- `products.json` — baza produktów renderowanych dynamicznie.
- `README.md` — instrukcja utrzymania i rozwoju projektu.

## Jak działa ładowanie produktów

1. `script.js` uruchamia `fetch('products.json')` po załadowaniu strony.
2. Dane produktów zapisywane są w stanie aplikacji.
3. Kategorie są budowane dynamicznie i podpinane do filtra.
4. Karty produktów renderują się bez przeładowania strony.
5. Wyszukiwanie i filtrowanie działa na danych już załadowanych w pamięci.

## Jak dodać nowy produkt

Dodaj nowy obiekt do tablicy w `products.json` z polami:

- `id` (unikalne)
- `name`
- `category`
- `shortDescription`
- `longDescription`
- `material`
- `finish`
- `priceLabel`
- `leadTime`
- `tags` (tablica stringów)
- `recommendedUse`

Po zapisaniu pliku produkt pojawi się automatycznie w marketplace po odświeżeniu strony.

## Dostępność (A11y)

- Semantyczna struktura (`header`, `main`, `section`, `footer`).
- Jeden nagłówek `h1` i logiczna hierarchia nagłówków.
- Link „Przejdź do treści”.
- Widoczne style `:focus-visible` dla klawiatury.
- Menu mobilne z `aria-expanded` i `aria-controls`.
- Kontrolki formularza i przyciski działające klawiaturą.
- Obsługa `prefers-reduced-motion`.

## Uruchomienie lokalne

Najprościej uruchomić stronę przez lokalny serwer statyczny (aby `fetch` do JSON działał poprawnie), np.:

```bash
python3 -m http.server 5173
```

Następnie otwórz: `http://localhost:5173/blachodach/`

## Pomysły na dalszy rozwój

- Integracja listy zapytań z formularzem kontaktowym (prefill wiadomości).
- Zapis koszyka zapytań do `localStorage`.
- Zaawansowane filtrowanie (materiał, termin, zakres cenowy).
- Integracja z CMS lub backendem ofertowym.
- Wielojęzyczność (PL/EN/DE).
