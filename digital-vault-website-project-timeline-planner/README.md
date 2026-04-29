# Website Project Timeline Planner

Polish-first, standalone produkt KP_Code Digital Vault do planowania harmonogramu projektu strony internetowej od briefu po post-launch review.

## Utworzone pliki
- `index.html` — pełny interfejs produktu,
- `styles.css` — responsywny styl i wersja print,
- `script.js` — lekki planner interaktywny,
- `website-project-timeline-planner.md` — edytowalna wersja Markdown,
- `README.md` — instrukcja użycia.

## Jak używać lokalnie
1. Otwórz `index.html` w przeglądarce.
2. Wypełnij pola w sekcji „Interaktywny planner harmonogramu”.
3. Kliknij „Oblicz harmonogram”, aby wygenerować timeline i ocenę ryzyka.
4. Użyj `Ctrl+P`, aby zapisać jako PDF.

## Dla kogo
- freelancerzy,
- frontend developerzy,
- web designerzy,
- małe studia projektowo-developerskie.

## Rekomendowany workflow
1. Ustal brief i scope.
2. Wygeneruj wstępny timeline.
3. Potwierdź gate’y i role z klientem.
4. Aktualizuj plan po zmianach zakresu/feedbacku.
5. Zamknij projekt handoffem i review 7/14/30 dni.

## Notatki o plannerze interaktywnym
- Planer liczy szacowany czas na podstawie typu projektu, tempa, gotowości treści, liczby rewizji i szybkości odpowiedzi klienta.
- Generuje tabelę etapów, datę końcową i poziom ryzyka wraz z rekomendacją.
- Działa bez zależności i bez backendu.

## Dostosowanie
- Zmień logikę dni i mnożników w `script.js` (obiekt `config`).
- Dostosuj teksty procesowe i szablony wiadomości w `index.html` lub `website-project-timeline-planner.md`.
- Zmodyfikuj kolory i spacing przez custom properties w `styles.css`.

## Technicznie
- Brak build stepu.
- Brak frameworków i bibliotek.
- Produkt jest w pełni standalone.
