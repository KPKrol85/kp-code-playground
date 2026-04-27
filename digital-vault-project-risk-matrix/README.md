# Matryca Ryzyk Projektu Webowego (Project Risk Matrix)

Profesjonalna mini-aplikacja z biblioteki **KP_Code Digital Vault** do identyfikacji, oceny i priorytetyzacji ryzyk w projektach webowych.

## Dla kogo

- freelancerzy webowi,
- małe studia i software house’y,
- project managerowie,
- małe zespoły cyfrowe realizujące strony, landing page i wdrożenia CMS/e-commerce.

## Jaki problem rozwiązuje

Narzędzie porządkuje pracę z ryzykiem zanim projekt „wejdzie w poślizg”.
Pozwala wykryć newralgiczne blokery (treści, decyzje, dostępy, zakres, migracja, integracje), nadać im priorytet i wygenerować gotową komunikację wewnętrzną oraz do klienta.

## Najważniejsze funkcje

- interaktywny rejestr ryzyk z domyślną listą realnych ryzyk webowych,
- ocena ryzyka według wzoru: **prawdopodobieństwo × wpływ** (1–5),
- automatyczne poziomy ryzyka: niskie, średnie, wysokie, krytyczne,
- edycja statusu, właściciela i planu ograniczania dla każdego ryzyka,
- filtrowanie po kategorii, poziomie, statusie + wyszukiwarka tekstowa,
- dodawanie/usuwanie ryzyk niestandardowych,
- reset filtrów i reset całej matrycy do domyślnej listy,
- dashboard KPI ryzyk (średni wynik, najwyższy wynik, otwarte high/critical, status projektu),
- wizualna matryca 5×5 aktualizowana na żywo,
- sekcja priorytetów (Top 5, krytyczne, wysokie bez planu, ryzyka terminowe),
- generowanie i kopiowanie trzech szablonów komunikacji:
  - podsumowanie wewnętrzne,
  - wiadomość do klienta,
  - notatka o ryzyku terminu.

## Jak działa scoring

- **Prawdopodobieństwo (P):** skala 1–5, gdzie 1 = mało prawdopodobne, 5 = bardzo prawdopodobne.
- **Wpływ (W):** skala 1–5, gdzie 1 = niski wpływ, 5 = krytyczny wpływ.
- **Wynik ryzyka:** `P × W`.

Przedziały poziomów:

- **1–4:** niskie ryzyko,
- **5–9:** średnie ryzyko,
- **10–15:** wysokie ryzyko,
- **16–25:** krytyczne ryzyko.

## Sugerowany workflow

1. Uzupełnij dane projektu i planowany deadline.
2. Przejrzyj domyślne ryzyka oraz dostosuj P/W do realnej sytuacji.
3. Przypisz właściciela i plan ograniczania dla ryzyk wysokich/krytycznych.
4. Skorzystaj z filtrów i sekcji priorytetów, aby ustalić kolejność działań.
5. Skopiuj gotową komunikację do wewnętrznego kanału oraz do klienta.
6. Powtarzaj przegląd cyklicznie (np. weekly review lub przed ważnym milestone).

## Struktura plików

```text
digital-vault-project-risk-matrix/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Notatki techniczne

- aplikacja działa w pełni po stronie frontendu (HTML/CSS/vanilla JS),
- bez bibliotek zewnętrznych, bez CDN, bez backendu,
- z dbałością o dostępność (etykiety formularzy, focus states, aria-live),
- dane mogą być opcjonalnie zapisywane do `localStorage`, ale narzędzie działa także bez niego,
- architektura oparta o pojedynczy przewidywalny `state` i render reaktywny po zmianach.

## Możliwe kierunki rozwoju

- eksport do CSV/PDF,
- osobny widok „przegląd tylko high/critical”,
- wsparcie wielu projektów i snapshotów przeglądów ryzyk,
- historia zmian ryzyka (trend tygodniowy),
- warianty językowe (EN/PL przełączane w UI).
