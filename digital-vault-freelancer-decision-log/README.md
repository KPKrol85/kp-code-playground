# Dziennik Decyzji Projektowych (Freelancer Decision Log)

Profesjonalne narzędzie z biblioteki **KP_Code Digital Vault** do dokumentowania decyzji projektowych w pracy freelancera, małego studia i zespołów realizujących projekty webowe.

## Czym jest ten produkt?

**Dziennik Decyzji Projektowych** to statyczna mini-aplikacja (HTML/CSS/JS), która pomaga uporządkować proces podejmowania decyzji i zachować pełny kontekst: dlaczego coś zostało wybrane, jakie były alternatywy, jaki kompromis zaakceptowano i jaki jest wpływ na projekt.

## Dla kogo?

- freelancerzy web developerzy,
- projektanci UX/UI,
- małe studia i software house’y,
- konsultanci prowadzący audyty i redesign,
- osoby odpowiedzialne za przekazanie projektu do utrzymania.

## Jaki problem rozwiązuje?

W realnych projektach decyzje często zapadają „w locie”, a po kilku tygodniach trudno odtworzyć ich sens. To narzędzie:

- porządkuje uzasadnienia techniczne i biznesowe,
- ułatwia komunikację z klientem,
- buduje materiał pod case study,
- wspiera onboarding i utrzymanie projektu,
- zmniejsza ryzyko chaosu po zmianach zakresu.

## Dlaczego dokumentowanie decyzji jest ważne?

Dobra dokumentacja decyzji:

- skraca czas wyjaśniania „dlaczego tak”,
- pomaga bronić jakości przed przypadkowymi zmianami,
- zwiększa transparentność wobec klienta,
- pozwala szybciej planować kolejne iteracje,
- tworzy wiarygodny zapis procesu projektowego.

## Funkcje wbudowane w aplikacji

1. Hero i kontekst produktu (Polish-first).
2. Panel ustawień projektu + żywe podsumowanie.
3. Rejestr decyzji z realistyczną listą startową.
4. Edytor decyzji (dodawanie, edycja, duplikowanie, usuwanie niestandardowych wpisów).
5. Oznaczenia decyzji: ważna / dla klienta / case study.
6. Filtry i wyszukiwarka (kategoria, etap, status, flagi, tekst).
7. Dashboard jakości dokumentacji z procentem kompletności.
8. Macierz wpływu decyzji (UX, SEO, dostępność, wydajność, itd.).
9. Sekcja pytań senior-level przed zapisaniem decyzji.
10. Generowane podsumowania z kopiowaniem do schowka:
    - wewnętrzne,
    - dla klienta,
    - do case study,
    - techniczne (handoff/maintenance).
11. Gotowe szablony decyzji do szybkiego wstawiania.
12. Opcjonalny zapis stanu w `localStorage` (narzędzie działa również bez niego).

## Jak używać

1. Uzupełnij dane projektu w sekcji **Ustawienia projektu**.
2. Przejrzyj domyślne decyzje i oznacz te, które są kluczowe.
3. Dodawaj własne decyzje przez **Edytor decyzji**.
4. Używaj filtrów, aby przygotować widok pod rozmowę z klientem, audyt lub handoff.
5. Kontroluj poziom dojrzałości dokumentacji w sekcji **Jakość dokumentacji decyzji**.
6. Generuj gotowe podsumowania i kopiuj je jednym kliknięciem.

## Sugerowany workflow dla freelancera / studia

1. **Po kickoffie**: dodaj decyzje strategiczne i zakresowe.
2. **Podczas design/developmentu**: dokumentuj decyzje technologiczne, UX i wydajnościowe.
3. **Przed wdrożeniem**: oznacz decyzje krytyczne dla klienta oraz utrzymania.
4. **Po wdrożeniu**: zaktualizuj statusy i daty przeglądu.
5. **Case study / portfolio**: wyfiltruj decyzje oznaczone jako „case study” i użyj generatora notatek.

## Jak działa wskaźnik jakości dokumentacji?

Wskaźnik ocenia kompletność decyzji na podstawie pól:

- uzasadnienie,
- alternatywy,
- kompromisy,
- wpływ,
- zatwierdzenie/status,
- data przeglądu,
- tagi.

Dodatkowo dashboard raportuje m.in. braki uzasadnień, brak alternatyw i decyzje wymagające przeglądu.

Statusy gotowości:

- Luźne notatki,
- Wymaga dopracowania,
- Dobra dokumentacja projektu,
- Gotowe do case study,
- Gotowe do audytu / przekazania.

## Jak używać w komunikacji z klientem?

- Oznacz decyzje jako **Widoczna dla klienta**.
- Skorzystaj z sekcji **Podsumowanie dla klienta**.
- Przekaż konsekwencje biznesowe i kompromisy prostym językiem.

## Jak używać do portfolio i case study?

- Oznacz decyzje jako **Przydatna do case study**.
- Uzupełniaj wpływ i wartość decyzji.
- Skopiuj **Notatki do case study** i wykorzystaj jako bazę opisu projektu.

## Struktura plików

```text
digital-vault-freelancer-decision-log/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Notatki techniczne

- Brak backendu i zewnętrznych bibliotek.
- Brak CDN i zewnętrznych fontów.
- Dane decyzji renderowane dynamicznie w JavaScript.
- Obsługa schowka przez Clipboard API + fallback.
- Aplikacja działa bez `localStorage`; storage jest opcjonalnym usprawnieniem.

## Potencjalne usprawnienia w przyszłości

- eksport do Markdown/PDF,
- import/eksport JSON,
- wersjonowanie decyzji,
- współdzielony tryb zespołowy (backend),
- wielojęzyczność (EN/PL),
- integracja z checklistą QA i odbiorem projektu.
