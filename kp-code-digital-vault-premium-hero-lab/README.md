# KP_Code Digital Vault — Premium Hero Lab

## Opis produktu
Premium Hero Lab to samodzielna biblioteka 10 interaktywnych sekcji hero (HTML/CSS/vanilla JS), gotowych do skopiowania do projektów statycznych oraz komercyjnych landing page'y.

## Jak uruchomić
1. Otwórz folder `kp-code-digital-vault-premium-hero-lab`.
2. Uruchom plik `index.html` w przeglądarce.
3. (Opcjonalnie) uruchom przez lokalny serwer, np. Live Server.

## Jak działa selektor
- Lewy panel zawiera 10 paczek hero.
- Kliknięcie (lub Enter/Spacja) aktywuje paczkę.
- W panelu głównym zobaczysz opis, live preview i kod HTML/CSS/JS.

## Jak skopiować pojedynczą paczkę hero
1. Wybierz hero z panelu selektora.
2. Skopiuj kod przez przyciski `Copy HTML`, `Copy CSS`, `Copy JS`.
3. Wklej do własnego projektu.
4. Zachowaj prefiks klasy (np. `h03_`) albo usuń go globalnie po stronie własnego kodu.

## Konwencja nazewnictwa
- Każda paczka ma bezpieczny prefiks: `h01_`, `h02_`, ..., `h10_`.
- Dlaczego: unikanie kolizji klas między różnymi sekcjami i gotowymi komponentami.
- Brak klas zaczynających się od cyfr oraz brak współdzielonej klasy eksportowej `.hero`.

## Struktura plików
```text
kp-code-digital-vault-premium-hero-lab/
  index.html
  css/
    style.css
  js/
    main.js
  README.md
```

## Dostępność (a11y)
- Semantyczny układ i pojedynczy `h1`.
- Fokus klawiatury (`:focus-visible`) dla przycisków i selektora.
- Obsługa nawigacji klawiszami (Enter/Spacja).
- Komunikaty kopiowania przez `aria-live`.
- Brak treści zależnych wyłącznie od hover.

## Reduced motion
- Obsługa `prefers-reduced-motion` w CSS i JS.
- Animacje i efekty pointer są wygaszane dla użytkowników ograniczających ruch.

## Notatki implementacyjne dla developerów
- Każda paczka hero ma osobny zakres klas i osobną inicjalizację JS (`initHero01` ... `initHero10`).
- Interakcje pointer oparte o `requestAnimationFrame`.
- Przy przełączaniu hero wykonywany jest cleanup listenerów, aby unikać wycieków pamięci.
