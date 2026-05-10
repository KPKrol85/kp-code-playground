# KP_Code Digital Vault — Interactive Hero Pack Selector

To produkt premium z 10 gotowymi, interaktywnymi sekcjami hero (HTML/CSS/JS), przygotowanymi do szybkiego kopiowania do innych projektów statycznych.

## Jak uruchomić
1. Otwórz plik `index.html` w przeglądarce.
2. Wybierz pakiet hero w panelu selektora.
3. Sprawdź podgląd i interakcje.
4. Skopiuj odpowiednie snippety HTML, CSS i JS.

## Jak używać w innym projekcie
- Wybierz numer pakietu (np. `01`).
- Skopiuj tylko fragmenty oznaczone dla tego pakietu.
- Wklej do własnych plików i dostosuj treści/kolory.

## Konwencja klas
Każdy pakiet używa prefiksu `hXX_`:
- `h01_hero`, `h01_hero__title` ... `h10_hero`, `h10_hero__title`

Dlaczego tak?
- Klasy CSS nie powinny zaczynać się od cyfry.
- Prefiks utrzymuje numerację pakietu i bezpieczeństwo implementacji.
- Po wdrożeniu możesz usunąć prefiks i nazwać klasy po swojemu.

## Struktura plików
- `index.html` — interfejs produktu, podgląd aktywny, galeria, sekcje kopiowania.
- `css/style.css` — wspólny plik stylów, z wyraźnymi sekcjami dla każdego hero packa.
- `js/main.js` — selektor pakietów, kopiowanie snippetów, interakcje hero.

## Dostępność i reduced motion
- Semantyczny HTML i poprawna hierarchia nagłówków.
- Widoczne stany focus (`:focus-visible`).
- `aria-live` dla potwierdzeń kopiowania.
- Obsługa `prefers-reduced-motion` dla ograniczenia animacji.

## Uwaga
Każdy pakiet HTML/CSS/JS jest separowany i copy-friendly, aby dało się go przenieść niezależnie od pozostałych.
