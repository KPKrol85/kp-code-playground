# KP_Code Algorithms Academy — plan wdrażania lekcji algorytmicznych

## Cel dokumentu
Ten dokument przekłada roadmapę z `plan.md` na operacyjny plan wdrożeń. Każdy algorytm lub temat algorytmiczny jest traktowany jako osobne wdrożenie, czyli osobne zadanie zakończone gotową stroną lekcji w katalogu `lessons/` oraz aktualizacją nawigacji i dashboardu.

## Aktualny stan projektu
- **Wdrożona lekcja:** `Binary Search / Wyszukiwanie binarne` w pliku `lessons/binary-search.html`.
- **Pozostałe lekcje:** zaplanowane, bez osobnych plików HTML w katalogu `lessons/`.
- **Rekomendowane podejście:** wdrażać lekcje zgodnie z kolejnością priorytetów z `plan.md`, ale utrzymywać spójność ścieżki nauki przez cykliczną aktualizację dashboardu, menu lekcji i linków „następna lekcja”.

## Definicja ukończenia pojedynczego wdrożenia
Każde zadanie wdrożeniowe uznajemy za gotowe dopiero wtedy, gdy spełnia poniższe kryteria:

- Powstał osobny plik lekcji HTML w katalogu `lessons/` z nazwą w kebab-case.
- Lekcja zawiera: tytuł, poziom trudności, wymagania wstępne, definicję, problem, analogię, kontekst, kroki, walkthrough, pseudokod, implementację JavaScript, złożoność, typowe błędy, zastosowania, pytania praktyczne i podsumowanie.
- Kod JavaScript jest czytelny, bez zależności zewnętrznych i zgodny z poziomem odbiorcy.
- Zaktualizowano `index.html`: dashboard, CTA, sekcję ścieżki nauki lub roadmapę, jeśli dana lekcja powinna być widoczna.
- Zaktualizowano nawigację w istniejących lekcjach, jeśli wdrożenie wpływa na kolejność przechodzenia między lekcjami.
- Zachowano dostępność: semantyczne nagłówki, linki, fokus, kontrast, brak treści dostępnych tylko po hoverze.
- Zweryfikowano stronę manualnie w przeglądarce lub przez statyczny przegląd HTML/CSS.

## Plan wdrożeń

### 1. Algorithmic Thinking Basics — **wdrożone**
- **Plik istniejący:** `lessons/algorithmic-thinking-basics.html`
- **Cel lekcji:** nauczyć rozbijania problemu na wejście, wyjście, ograniczenia, kroki i przypadki brzegowe.
- **Zakres wdrożony:** cele lekcji, definicja, problem przed kodem, analogia, mental model, analiza wejścia i wyjścia, ograniczenia, plan kroków, walkthrough, pseudokod, JavaScript, wariant wymagań, wprowadzenie do kosztu, błędy, checklista, praktyka, mini challenge, podsumowanie i informacja o następnej lekcji bez uszkodzonego linku.
- **Przykład:** planowanie funkcji wyszukiwania użytkownika po nazwie w aplikacji.
- **Poziom:** Beginner.
- **Uwagi seniorsko-produktowe:** zaktualizowano dashboard, menu lekcji, stopkę oraz nawigację Binary Search; wykonano statyczną weryfikację linków, identyfikatorów, nagłówków i przykładowego JavaScriptu.

### 2. Big O Notation — **do wdrożenia**
- **Plik docelowy:** `lessons/big-o-notation.html`
- **Cel lekcji:** wyjaśnić wzrost czasu i pamięci oraz porównywanie algorytmów.
- **Zakres wdrożenia:** O(1), O(log n), O(n), O(n log n), O(n²), uproszczone reguły liczenia, praktyczne porównania.
- **Przykład:** porównanie pełnego skanowania listy z dzieleniem zakresu na pół.
- **Poziom:** Beginner.

### 3. Linear Search — **do wdrożenia**
- **Plik docelowy:** `lessons/linear-search.html`
- **Cel lekcji:** pokazać bazowy algorytm wyszukiwania O(n), który sprawdza elementy po kolei.
- **Zakres wdrożenia:** wyszukiwanie w nieposortowanej tablicy, zwracanie indeksu lub `-1`, analiza najlepszego i najgorszego przypadku.
- **Przykład:** znalezienie użytkownika po nazwie w nieposortowanej liście.
- **Poziom:** Beginner.

### 4. Binary Search — **wdrożone**
- **Plik istniejący:** `lessons/binary-search.html`
- **Cel lekcji:** nauczyć wyszukiwania przez dzielenie posortowanej przestrzeni na połowy.
- **Zakres wdrożony:** definicja, problem, analogia, kontekst, kroki, walkthrough, pseudokod, JavaScript, złożoność, błędy, zastosowania, quiz i podsumowanie.
- **Przykład:** znalezienie ID lub wartości w posortowanych rekordach.
- **Poziom:** Beginner.
- **Uwagi seniorsko-produktowe:** przy kolejnych wdrożeniach warto dodać linki do lekcji poprzedniej i następnej, aby Binary Search stał się częścią pełnej sekwencji po Linear Search i Big O.

### 5. Bubble Sort — **do wdrożenia**
- **Plik docelowy:** `lessons/bubble-sort.html`
- **Cel lekcji:** wyjaśnić mechanikę sortowania przez porównywanie sąsiednich elementów.
- **Zakres wdrożenia:** podstawowa wersja, wersja z flagą `swapped`, analiza nieefektywności O(n²).
- **Przykład:** sortowanie małej listy wyników w klasie.
- **Poziom:** Beginner.

### 6. Selection Sort — **do wdrożenia**
- **Plik docelowy:** `lessons/selection-sort.html`
- **Cel lekcji:** pokazać sortowanie przez wybieranie minimum i zamianę elementów.
- **Zakres wdrożenia:** in-place sorting, indeks minimum, liczba porównań, kiedy algorytm jest edukacyjnie przydatny.
- **Przykład:** układanie cen produktów rosnąco.
- **Poziom:** Beginner.

### 7. Insertion Sort — **do wdrożenia**
- **Plik docelowy:** `lessons/insertion-sort.html`
- **Cel lekcji:** nauczyć budowania posortowanego prefiksu i wstawiania elementu na właściwe miejsce.
- **Zakres wdrożenia:** przesuwanie elementów, dobre zachowanie na danych prawie posortowanych, stabilność.
- **Przykład:** sortowanie kart trzymanych w ręce.
- **Poziom:** Beginner.

### 8. Recursion Basics — **do wdrożenia**
- **Plik docelowy:** `lessons/recursion-basics.html`
- **Cel lekcji:** wyjaśnić funkcje wywołujące same siebie oraz znaczenie warunku bazowego.
- **Zakres wdrożenia:** base case, recursive case, call stack, typowe błędy z nieskończoną rekurencją.
- **Przykład:** przechodzenie po zagnieżdżonych folderach.
- **Poziom:** Beginner.

### 9. Factorial — **do wdrożenia**
- **Plik docelowy:** `lessons/factorial.html`
- **Cel lekcji:** przećwiczyć rekurencję na klasycznym, małym problemie.
- **Zakres wdrożenia:** definicja matematyczna, implementacja rekurencyjna i iteracyjna, śledzenie stosu wywołań.
- **Przykład:** liczenie liczby możliwych uporządkowań.
- **Poziom:** Beginner.

### 10. Fibonacci — **do wdrożenia**
- **Plik docelowy:** `lessons/fibonacci.html`
- **Cel lekcji:** pokazać różnicę między naiwną rekurencją, iteracją i ponownym użyciem wyników.
- **Zakres wdrożenia:** drzewo wywołań, powtarzana praca, wersja iteracyjna jako bezpieczny baseline.
- **Przykład:** modelowanie prostych wzorców wzrostu.
- **Poziom:** Beginner.

### 11. Two Pointers — **do wdrożenia**
- **Plik docelowy:** `lessons/two-pointers.html`
- **Cel lekcji:** nauczyć przetwarzania danych z dwóch pozycji jednocześnie.
- **Zakres wdrożenia:** wskaźnik lewy i prawy, warunki przesuwania, zależność od posortowanych danych.
- **Przykład:** znalezienie pary o zadanej sumie w posortowanej tablicy.
- **Poziom:** Intermediate.

### 12. Sliding Window — **do wdrożenia**
- **Plik docelowy:** `lessons/sliding-window.html`
- **Cel lekcji:** pokazać utrzymywanie ruchomego zakresu dla problemów na podtablicach i stringach.
- **Zakres wdrożenia:** okno stałe i zmienne, aktualizacja sumy/liczników, redukcja z O(n²) do O(n).
- **Przykład:** najdłuższy fragment tekstu spełniający ograniczenie.
- **Poziom:** Intermediate.

### 13. Hash Map Lookup — **do wdrożenia**
- **Plik docelowy:** `lessons/hash-map-lookup.html`
- **Cel lekcji:** nauczyć używania map do szybkiego dostępu po kluczu.
- **Zakres wdrożenia:** `Map` w JavaScript, frequency counting, zastępowanie pętli zagnieżdżonych.
- **Przykład:** liczenie wystąpień elementów.
- **Poziom:** Beginner.

### 14. Stack — **do wdrożenia**
- **Plik docelowy:** `lessons/stack.html`
- **Cel lekcji:** wyjaśnić strukturę LIFO i jej zastosowania algorytmiczne.
- **Zakres wdrożenia:** `push`, `pop`, `peek`, modelowanie cofania akcji, parsowania i dopasowań.
- **Przykład:** sprawdzanie poprawności nawiasów.
- **Poziom:** Beginner.

### 15. Queue — **do wdrożenia**
- **Plik docelowy:** `lessons/queue.html`
- **Cel lekcji:** wyjaśnić strukturę FIFO i jej rolę w harmonogramach oraz BFS.
- **Zakres wdrożenia:** enqueue, dequeue, problem wydajności `shift`, implementacja z indeksem startowym.
- **Przykład:** kolejka zgłoszeń do supportu.
- **Poziom:** Beginner.

### 16. Linked List Basics — **do wdrożenia**
- **Plik docelowy:** `lessons/linked-list-basics.html`
- **Cel lekcji:** pokazać dane przechowywane jako węzły połączone referencjami.
- **Zakres wdrożenia:** node, head, next, przechodzenie listy, podstawowe dodawanie i usuwanie.
- **Przykład:** nawigacja po playliście.
- **Poziom:** Intermediate.

### 17. Merge Sort — **do wdrożenia**
- **Plik docelowy:** `lessons/merge-sort.html`
- **Cel lekcji:** wdrożyć stabilne sortowanie oparte o divide and conquer.
- **Zakres wdrożenia:** dzielenie tablicy, scalanie posortowanych części, koszt pamięci O(n).
- **Przykład:** sortowanie dużego eksportu rekordów.
- **Poziom:** Intermediate.

### 18. Quick Sort — **do wdrożenia**
- **Plik docelowy:** `lessons/quick-sort.html`
- **Cel lekcji:** wyjaśnić sortowanie przez wybór pivota i partycjonowanie.
- **Zakres wdrożenia:** pivot, partition, średni i najgorszy przypadek, praktyczne ryzyka implementacyjne.
- **Przykład:** sortowanie danych dashboardu.
- **Poziom:** Intermediate.

### 19. Binary Tree Traversal — **do wdrożenia**
- **Plik docelowy:** `lessons/binary-tree-traversal.html`
- **Cel lekcji:** nauczyć odwiedzania węzłów drzewa w różnych kolejnościach.
- **Zakres wdrożenia:** preorder, inorder, postorder, rekurencja na strukturach drzewiastych.
- **Przykład:** renderowanie zagnieżdżonych kategorii.
- **Poziom:** Intermediate.

### 20. Breadth-First Search — **do wdrożenia**
- **Plik docelowy:** `lessons/breadth-first-search.html`
- **Cel lekcji:** pokazać eksplorację grafu poziomami z użyciem kolejki.
- **Zakres wdrożenia:** graf jako lista sąsiedztwa, visited set, najkrótsza ścieżka w grafie nieważonym.
- **Przykład:** rekomendacje znajomych według odległości.
- **Poziom:** Intermediate.

### 21. Depth-First Search — **do wdrożenia**
- **Plik docelowy:** `lessons/depth-first-search.html`
- **Cel lekcji:** pokazać eksplorację grafu lub drzewa w głąb.
- **Zakres wdrożenia:** wersja rekurencyjna i iteracyjna ze stosem, visited set, porównanie z BFS.
- **Przykład:** eksploracja labiryntu.
- **Poziom:** Intermediate.

### 22. Greedy Algorithms — **do wdrożenia**
- **Plik docelowy:** `lessons/greedy-algorithms.html`
- **Cel lekcji:** nauczyć rozpoznawania problemów, w których lokalnie najlepszy wybór prowadzi do dobrego wyniku.
- **Zakres wdrożenia:** greedy choice, kontrprzykłady, sortowanie wejścia, dowodzenie intuicyjne.
- **Przykład:** activity scheduling.
- **Poziom:** Intermediate.

### 23. Dijkstra Algorithm — **do wdrożenia**
- **Plik docelowy:** `lessons/dijkstra-algorithm.html`
- **Cel lekcji:** wyjaśnić najkrótsze ścieżki w grafach ważonych bez ujemnych wag.
- **Zakres wdrożenia:** relaksacja krawędzi, odległości, poprzednicy, kolejka priorytetowa w ujęciu edukacyjnym.
- **Przykład:** planowanie trasy.
- **Poziom:** Advanced.

### 24. Dynamic Programming Basics — **do wdrożenia**
- **Plik docelowy:** `lessons/dynamic-programming-basics.html`
- **Cel lekcji:** nauczyć definiowania stanu, przejść i ponownego używania wyników.
- **Zakres wdrożenia:** overlapping subproblems, optimal substructure, memoization, tabulation.
- **Przykład:** warianty problemu wchodzenia po schodach.
- **Poziom:** Advanced.

### 25. Knapsack Problem — **do wdrożenia**
- **Plik docelowy:** `lessons/knapsack-problem.html`
- **Cel lekcji:** przećwiczyć tablice DP na problemie optymalizacji wartości przy ograniczonej pojemności.
- **Zakres wdrożenia:** 0/1 knapsack, stan `item + capacity`, tabela, odczyt wyniku.
- **Przykład:** wybór funkcji produktu przy ograniczonym budżecie.
- **Poziom:** Advanced.

### 26. String Matching Basics — **do wdrożenia**
- **Plik docelowy:** `lessons/string-matching-basics.html`
- **Cel lekcji:** pokazać wyszukiwanie wzorca w tekście i różnicę między podejściem naiwnym a zoptymalizowanym myśleniem.
- **Zakres wdrożenia:** naive search, przesuwanie okna po tekście, wprowadzenie do dalszych algorytmów string matching.
- **Przykład:** filtrowanie treści artykułów.
- **Poziom:** Intermediate.

### 27. Palindrome Check — **do wdrożenia**
- **Plik docelowy:** `lessons/palindrome-check.html`
- **Cel lekcji:** zastosować two pointers do sprawdzania lustrzanego układu znaków.
- **Zakres wdrożenia:** normalizacja tekstu, ignorowanie wielkości liter i znaków niealfanumerycznych, porównywanie krańców.
- **Przykład:** walidacja frazy wpisanej przez użytkownika.
- **Poziom:** Beginner.

### 28. Anagram Check — **do wdrożenia**
- **Plik docelowy:** `lessons/anagram-check.html`
- **Cel lekcji:** nauczyć porównywania częstotliwości znaków za pomocą map.
- **Zakres wdrożenia:** normalizacja stringów, frequency map, porównanie dwóch map, analiza O(n).
- **Przykład:** walidacja łamigłówki słownej.
- **Poziom:** Beginner.

## Rekomendowana kolejność operacyjna
1. Najpierw domknąć fundamenty: Algorithmic Thinking Basics, Big O Notation, Linear Search.
2. Następnie połączyć istniejące Binary Search z poprzednimi lekcjami przez linki nawigacyjne.
3. Wdrożyć blok sortowania: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort.
4. Wdrożyć blok rekurencji: Recursion Basics, Factorial, Fibonacci.
5. Wdrożyć techniki problem solving: Two Pointers, Sliding Window, Hash Map Lookup.
6. Wdrożyć struktury danych: Stack, Queue, Linked List Basics, Binary Tree Traversal.
7. Wdrożyć grafy i strategie: Breadth-First Search, Depth-First Search, Greedy Algorithms, Dijkstra Algorithm.
8. Wdrożyć tematy zaawansowane i stringi: Dynamic Programming Basics, Knapsack Problem, String Matching Basics, Palindrome Check, Anagram Check.

## Ryzyka i zależności
- **Spójność nawigacji:** wraz ze wzrostem liczby lekcji ręczna aktualizacja menu może stać się źródłem błędów. Warto rozważyć centralną listę lekcji w JavaScript lub generowanie statyczne, jeśli projekt urośnie.
- **Powtarzalność standardu:** każda lekcja powinna korzystać z tego samego szablonu sekcji, aby produkt nie tracił jakości edukacyjnej.
- **Długość treści:** lekcje powinny być kompletne, ale skanowalne; zbyt długie bloki kodu należy dzielić komentarzami i opisem.
- **Dostępność:** nowe komponenty wizualne nie mogą obniżyć dostępności już wdrożonego layoutu.
- **Kolejność merytoryczna:** część lekcji zależy od wcześniejszych tematów, np. Sliding Window po Two Pointers, Dijkstra po grafach i kolejce priorytetowej, Knapsack po podstawach DP.
