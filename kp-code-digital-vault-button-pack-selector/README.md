# KP_Code Digital Vault — Button Pack Selector

## O produkcie
To samodzielny, statyczny produkt HTML/CSS/JavaScript zawierający **10 premium zestawów przycisków**. Każdy zestaw ma własny numer (`01–10`), nazwę, warianty i oddzielną sekcję CSS, którą można łatwo skopiować do innego projektu.

## Jak uruchomić
1. Otwórz folder `kp-code-digital-vault-button-pack-selector`.
2. Uruchom plik `index.html` w przeglądarce.
3. Nie są wymagane żadne frameworki ani build tools.

## Jak wybrać button pack
1. W sekcji **Pack selector panel** kliknij wybrany pakiet.
2. W sekcji **Active pack preview** zobaczysz:
   - opis,
   - live preview wariantów,
   - listę klas,
   - gotowy snippet HTML,
   - informację, którą sekcję CSS skopiować.

## Jak skopiować pakiet do innego projektu
1. Skopiuj klasy z podglądu (lub użyj przycisku kopiowania).
2. W pliku `css/style.css` znajdź sekcję:
   - `Button Pack XX — Nazwa`
3. Skopiuj **tylko tę sekcję** CSS do swojego projektu.
4. Użyj klas w HTML, np.:
   - `btn-01`
   - `btn-01--primary`
   - `btn-01--secondary`

## Konwencja nazewnictwa klas
Zastosowano bezpieczny wzorzec:
- `.btn-XX` (klasa bazowa)
- `.btn-XX--variant` (wariant)

Przykład:
- `.btn-04`
- `.btn-04--primary`
- `.btn-04--outline`

## Struktura plików
```text
kp-code-digital-vault-button-pack-selector/
  index.html
  css/
    style.css
  js/
    main.js
  README.md
```

## Notatka o separacji CSS
Każdy z 10 pakietów ma oddzielny, jasno opisany blok w `css/style.css`. Dzięki temu style są **copy-friendly** i nie wymagają kopiowania całego arkusza.
