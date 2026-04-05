# Dzienny audyt frontendu Easy Move
Najważniejsze usprawnienia do wdrożenia w kolejnym kroku (na bazie aktualnego stanu kodu).

## HTML i semantyka
- Zastąpić powtarzające się style inline (`style="margin-top: ..."`, `style="display: flex; gap: ..."`) dedykowanymi klasami utility i użyć ich we wszystkich szablonach.
- Naprawić duplikat treści w sekcji opinii na stronie głównej (podwójne „Anna, Warszawa”).
- Zamienić tekstowe elementy stopki „Polityka prywatności” i „Cookies” na realne linki do podstron dokumentów.
- Ujednolicić dane kontaktowe między widokiem a JSON-LD (telefon w schema powinien odpowiadać numerowi prezentowanemu w interfejsie).

## Dostępność (A11y)
- Uzupełnić zakładki o pełny wzorzec WAI-ARIA: nadać `id` wszystkim `role="tab"`, ustawić `aria-labelledby` w `role="tabpanel"` oraz przełączać ukrycie paneli przez `hidden`/`aria-hidden` (nie tylko klasą CSS).
- Dodać zarządzanie dostępnością mobilnego menu: podczas zamknięcia ustawiać `aria-hidden`/`inert` dla kontenera, aby elementy poza ekranem nie były fokusowalne z klawiatury.
- Dodać obsługę zamykania menu po zmianie breakpointu do desktopu (reset stanu `aria-expanded`, focus trap i `no-scroll`).

## CSS i utrzymanie
- Ograniczyć zależność od `@import` w `css/main.css`: przenieść fonty Google do `<head>` (`preconnect` + `stylesheet`), a style lokalne spinać jednym buildem do pliku wynikowego.
- Uporządkować dublowanie klas utility `.sr-only` i `.visually-hidden` (zostawić jedną nazwę i jeden standard użycia).

## JavaScript i architektura
- Rozszerzyć moduł `tabs` o aktualizację stanów paneli (`hidden`, `aria-hidden`) równolegle do klas wizualnych.
- Wydzielić powtarzalny layout nagłówka i stopki do wspólnego szablonu w procesie build (`scripts/build.mjs`), aby ograniczyć duplikację zmian między wszystkimi stronami.

## SEO i wiarygodność
- Przygotować dedykowaną grafikę social preview 1200×630 (PNG/JPG) i podmienić `og:image`/`twitter:image` z obecnego SVG.
