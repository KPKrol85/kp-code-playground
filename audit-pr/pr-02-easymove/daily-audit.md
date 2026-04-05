# Dzienny audyt frontendu Easy Move
Najważniejsze usprawnienia do wdrożenia w kolejnym kroku.

## Dostępność i interakcje
- Uzupełnić akordeon o pełne powiązania dostępności (`id`, `aria-controls`, `aria-labelledby`) i przełączanie stanu paneli atrybutem `hidden`.
- Dodać pełną obsługę klawiatury dla zakładek (strzałki, Home/End, roving `tabindex`) oraz spójne stany `aria-selected` i `tabindex`.
- Powiązać przyciski akordeonu z konkretnymi panelami zamiast opierać logikę wyłącznie na klasach CSS.
- Uzupełnić formularz o walidację daty przeprowadzki względem dnia bieżącego (blokada dat przeszłych).

## Treść i wiarygodność
- Zastąpić wszystkie linki techniczne `href="#"` docelowymi adresami lub tymczasowo usunąć je z interfejsu.
- Zaktualizować stopkę z `© 2024` do bieżącego roku albo generować rok automatycznie.
- Zamienić widoczne dane kontaktowe (telefon, e-mail) na klikalne odnośniki `tel:` i `mailto:`.

## Spójność kodu HTML/CSS
- Usunąć powtarzalne style inline (`style="..."`) i przenieść je do klas w arkuszach CSS.
- Ograniczyć globalne `a { text-decoration: none; }` i przywrócić podkreślenia dla linków treściowych (np. prawnych i stopki).
- Ujednolicić komponenty list w stopce i sekcjach kart przez wspólną klasę pomocniczą zamiast lokalnych nadpisań.

## JavaScript i utrzymanie
- Dodać synchronizację stanów ARIA w modułach `tabs` i `accordion` przy każdej zmianie widoku.
- Rozszerzyć walidację formularza o deduplikację komunikatów błędów w podsumowaniu (bez powtórzeń tych samych treści).
- Rozbić powtarzalny układ nagłówka i stopki na współdzielony mechanizm szablonów w procesie budowania, aby ograniczyć duplikację między stronami.

## Wydajność
- Zastąpić ładowanie fontów przez `@import` zestawem linków w `<head>` (`preconnect` + `stylesheet`) dla szybszego renderu.
- Przygotować dedykowaną grafikę social preview (raster 1200x630) zamiast opierania Open Graph wyłącznie na pliku SVG.
