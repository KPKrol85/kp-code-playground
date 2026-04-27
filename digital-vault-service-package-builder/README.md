# Generator Pakietów Usług (Service Package Builder)

Generator Pakietów Usług to statyczne narzędzie z biblioteki **KP_Code Digital Vault**, które pomaga freelancerom i małym studiom szybko budować profesjonalne pakiety usług typu **Basic / Standard / Premium**.

## Dla kogo jest ten produkt

- freelancerzy web / WordPress / SEO / UX
- małe studia projektowe i software house'y butikowe
- konsultanci cyfrowi i zespoły realizujące oferty dla MŚP

## Jaki problem rozwiązuje

Wiele ofert powstaje jako nieuporządkowana lista zadań bez jasnych granic zakresu. Ten generator porządkuje strukturę i tworzy spójny materiał do komunikacji z klientem:

- każdy pakiet ma cel, zakres, cenę i czas realizacji,
- widoczne są wykluczenia oraz odpowiedzialności klienta,
- dodatki (add-ons) są oddzielone od bazowego zakresu,
- powstają gotowe teksty do maila/oferty.

## Najważniejsze funkcje

1. **Kontekst oferty** – nazwa, typ usługi, typ klienta, waluta, cel i notatka.
2. **Builder pakietów** – pełna edycja pól dla pakietów Basic/Standard/Premium.
3. **Operacje na pakietach** – duplikowanie, reset do domyślnych danych i oznaczenie rekomendacji.
4. **Porównanie pakietów** – widok side-by-side (lub stack na mobile).
5. **Checklist jakości** – automatyczna ocena gotowości oferty.
6. **Wspólne add-ons** – edycja listy dodatków z ceną i opisem.
7. **Generowane treści** – 4 gotowe sekcje do skopiowania:
   - podsumowanie oferty dla klienta,
   - tekst porównania pakietów,
   - notatka o zakresie,
   - notatka wewnętrzna.
8. **Opcjonalna trwałość danych** – stan może być zapisany w `localStorage`, ale aplikacja działa również bez zapisu.

## Jak używać

1. Uzupełnij sekcję **Kontekst oferty**.
2. Przejdź przez pakiety i doprecyzuj zakres, wykluczenia, poprawki oraz wsparcie.
3. Oznacz **jeden pakiet jako rekomendowany**.
4. Uzupełnij lub zaktualizuj **add-ons**.
5. Sprawdź **Checklist jakości oferty** i dopracuj brakujące elementy.
6. Skopiuj wygenerowane treści i użyj ich w komunikacji z klientem.

## Sugerowany workflow dla freelancerów / studiów

1. Przygotuj wstępny szkic na call discovery.
2. Dopracuj pakiet Standard jako główną propozycję.
3. Użyj Basic jako opcji „entry” i Premium jako opcji strategicznej.
4. Oddziel prace poza zakresem do add-ons.
5. Przed wysyłką sprawdź status gotowości oraz checklistę.

## Jak liczona jest gotowość oferty

Checklista zawiera 10 warunków. Każdy spełniony warunek zwiększa wynik gotowości.

- **0–44%** → `Szkic roboczy`
- **45–74%** → `Wymaga doprecyzowania`
- **75–94%** → `Prawie gotowe`
- **95–100%** → `Gotowe do wysłania klientowi`

Weryfikowane są m.in.: cena, czas realizacji, zakres zawarty/wykluczony, limity poprawek, obowiązki klienta, wybrany typ usługi i pojedyncza rekomendacja pakietu.

## Struktura plików

```text
digital-vault-service-package-builder/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Notatki techniczne

- aplikacja działa bez backendu i bez zewnętrznych bibliotek,
- UI jest Polish-first,
- komponenty są renderowane dynamicznie przez Vanilla JS,
- skopiowanie treści działa przez Clipboard API z fallbackiem.

## Możliwe przyszłe usprawnienia

- eksport do PDF / Markdown,
- wariant językowy EN,
- predefiniowane zestawy branżowe (np. SEO, maintenance, e-commerce),
- dodatkowy tryb „pakiet miesięczny / abonamentowy”,
- import / eksport JSON dla pracy zespołowej.
