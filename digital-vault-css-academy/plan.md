# Plan rozwoju lekcji — KP_Code Digital Vault CSS Academy

## 1. Cel planu

Celem tego dokumentu jest uporządkowanie pełnej ścieżki nauki CSS w projekcie `digital-vault-css-academy`. Plan zakłada rozwój od absolutnych podstaw do praktycznego budowania komponentów, layoutów responsywnych, mikrointerakcji, architektury CSS i projektów końcowych.

Obecnie projekt zawiera pełne czterdzieści dwie lekcje. Roadmapa CSS Academy jest domknięta od fundamentów do praktycznych projektów końcowych.

## 2. Założenia dydaktyczne

Każda nowa lekcja powinna mieć powtarzalną strukturę:

1. **Cel lekcji** — czego użytkownik nauczy się po zakończeniu.
2. **Kontekst praktyczny** — gdzie temat pojawia się w realnym projekcie.
3. **Teoria minimum** — tylko tyle, ile potrzeba do zrozumienia mechanizmu.
4. **Przykład kodu** — krótki, możliwy do skopiowania.
5. **Demo/interpretacja** — opis, co użytkownik powinien zobaczyć.
6. **Najczęstsze błędy** — typowe problemy początkujących.
7. **Mini zadanie** — ćwiczenie utrwalające.
8. **Checklista** — szybkie kryteria sprawdzenia wiedzy.
9. **Podsumowanie** — najważniejsze wnioski.

## 3. Pełna ścieżka lekcji

### Moduł 1 — Fundamenty CSS

Celem modułu jest zbudowanie podstawowego modelu mentalnego CSS: czym jest język stylów, jak wybiera elementy, jak działa box model, jak przeglądarka układa elementy i jak tworzyć czytelny styl wizualny.

| Lekcja | Temat | Status | Cel |
| --- | --- | --- | --- |
| 01 | Wprowadzenie do CSS | Gotowa | Zrozumienie roli CSS, składni i pierwszego stylowania. |
| 02 | Selektory i dziedziczenie | Gotowa | Umiejętność wybierania elementów i rozumienia podstaw kaskady. |
| 03 | Box model, odstępy i rozmiary elementów | Gotowa | Zrozumienie content, padding, border, margin i `box-sizing`. |
| 04 | Display i przepływ dokumentu | Gotowa | Rozróżnianie block, inline, inline-block i normalnego flow. |
| 05 | Kolory, tło i podstawy wizualnego stylu | Gotowa | Stosowanie kolorów, tła i podstaw kontrastu. |
| 06 | Typografia, tekst i czytelność | Gotowa | Budowanie czytelnych bloków tekstu i podstawowej hierarchii. |

### Moduł 2 — Layout od podstaw

Ten moduł powinien być następnym etapem rozwoju. Użytkownik zna już box model i `display`, więc może przejść do świadomego układania elementów w poziomie i pionie.

| Lekcja | Temat | Status | Cel |
| --- | --- | --- | --- |
| 07 | Flexbox: oś główna, oś poprzeczna i kontener | Gotowa | Zrozumienie `display: flex`, `flex-direction`, osi i podstaw wyrównania. |
| 08 | Flexbox w praktyce: nawigacja, karty i układy sekcji | Gotowa | Użycie `gap`, `justify-content`, `align-items`, `flex-wrap` i prostych layoutów. |
| 09 | CSS Grid: kolumny, wiersze i odstępy | Gotowa | Zrozumienie `display: grid`, `grid-template-columns`, `grid-template-rows` i `gap`. |
| 10 | CSS Grid w praktyce: galerie, dashboardy i układy kart | Gotowa | Budowanie responsywnych siatek kart, galerii i sekcji marketingowych. |
| 11 | Pozycjonowanie: relative, absolute, fixed i sticky | Gotowa | Zrozumienie kontekstu pozycjonowania i typowych przypadków użycia. |
| 12 | Warstwy i nakładanie: `z-index`, overlay i kontekst stosu | Gotowa | Kontrola kolejności warstw, modali, badge'y i elementów pływających. |

#### Rekomendowana kolejność wdrożenia Modułu 2

1. Po wdrożonych lekcjach 07–42 moduł layoutu i moduł responsywności są domknięte na poziomie fundamentów, moduł komponentów UI obejmuje już pierwsze elementy interaktywne, formularze, komponenty treści, wzorce nawigacyjne oraz prezentację danych, moduł efektów wizualnych obejmuje separację powierzchni, transformacje 2D, przejścia stanów, animacje i dostępny ruch, moduł organizacji CSS obejmuje już nazewnictwo klas, zmienne CSS, design tokens, kaskadę, specyficzność, `@layer`, reset, normalize, style bazowe oraz strukturę plików CSS, moduł nowoczesnego CSS obejmuje pseudoklasy, pseudoelementy, container queries, logical properties, CSS nesting, tryby kolorów, zmienne motywu i dark mode, a moduł projektów końcowych ma komplet pięciu projektów: responsywną kartę profilu, landing page z sekcją hero i kartami, panel dashboardu, formularz rejestracji oraz mini system komponentów CSS.

### Moduł 3 — Responsywność i adaptacja interfejsu

Po opanowaniu Flexboxa, Grida i pozycjonowania użytkownik powinien nauczyć się projektować interfejsy działające na różnych ekranach.

| Lekcja | Temat | Status | Cel |
| --- | --- | --- | --- |
| 13 | Responsywność i podejście mobile-first | Gotowa | Zrozumienie projektowania od małego ekranu i stopniowego rozszerzania layoutu. |
| 14 | Media queries i breakpointy | Gotowa | Pisanie `@media`, dobieranie breakpointów i unikanie nadmiarowych reguł. |
| 15 | Jednostki CSS: px, %, em, rem, vw, vh, svh, ch | Gotowa | Dobór jednostek do tekstu, odstępów, kontenerów i viewportu. |
| 16 | Obrazy i media responsywne | Gotowa | Kontrola obrazów przez `max-width`, `object-fit`, proporcje i bezpieczne kadrowanie. |
| 17 | Fluid typography i funkcje `min()`, `max()`, `clamp()` | Gotowa | Tworzenie płynnych rozmiarów tekstu i odstępów. |

### Moduł 4 — Komponenty UI i stany interakcji

Ten moduł powinien zmienić kurs z nauki właściwości CSS w naukę budowania realnych elementów interfejsu.

| Lekcja | Temat | Status | Cel |
| --- | --- | --- | --- |
| 18 | Linki, przyciski i stany: hover, focus, active, disabled | Gotowa | Budowanie dostępnych i czytelnych elementów interaktywnych. |
| 19 | Formularze: inputy, labelki, błędy i stany walidacji | Gotowa | Stylowanie formularzy bez niszczenia dostępności. |
| 20 | Karty, listy i sekcje treści | Gotowa | Projektowanie powtarzalnych komponentów contentowych. |
| 21 | Nawigacje, breadcrumbsy i paginacja | Gotowa | Budowanie orientacji użytkownika w strukturze strony. |
| 22 | Tabele i dane w CSS | Gotowa | Czytelne prezentowanie danych, overflow i wersje mobilne. |

### Moduł 5 — Efekty wizualne i mikrointerakcje

Po opanowaniu komponentów można wprowadzić efekty, ale w sposób kontrolowany i dostępny.

| Lekcja | Temat | Status | Cel |
| --- | --- | --- | --- |
| 23 | Cienie, obramowania, zaokrąglenia i separacja wizualna | Gotowa | Budowanie głębi i hierarchii bez chaosu wizualnego. |
| 24 | Transformacje 2D | Gotowa | Użycie `transform`, `scale`, `translate`, `rotate` w mikrointerakcjach. |
| 25 | Przejścia CSS: `transition` | Gotowa | Tworzenie płynnych zmian stanów. |
| 26 | Animacje CSS: `@keyframes` | Gotowa | Budowanie prostych animacji i rozumienie kosztów animowania. |
| 27 | Dostępne animacje i `prefers-reduced-motion` | Gotowa | Projektowanie ruchu z poszanowaniem preferencji użytkownika. |

### Moduł 6 — Organizacja CSS w większym projekcie

Ten moduł jest ważny, kiedy kurs przechodzi z poziomu właściwości CSS do poziomu pracy zespołowej i utrzymania kodu.

| Lekcja | Temat | Status | Cel |
| --- | --- | --- | --- |
| 28 | Nazewnictwo klas i BEM-like naming | Gotowa | Pisanie klas, które są zrozumiałe i odporne na kolizje. |
| 29 | Zmienne CSS i design tokens | Gotowa | Centralizacja kolorów, odstępów, promieni, cieni i typografii. |
| 30 | Kaskada, specyficzność i `@layer` | Gotowa | Kontrolowanie kolejności stylów w większym projekcie. |
| 31 | Reset, normalize i style bazowe | Gotowa | Przygotowanie przewidywalnego fundamentu CSS. |
| 32 | Struktura plików CSS i skalowanie arkusza | Gotowa | Organizacja stylów według baz, layoutów, komponentów i utilities. |

### Moduł 7 — Nowoczesny CSS

Ten moduł powinien pojawić się po utrwaleniu klasycznych podstaw, aby nie przeciążyć początkującego użytkownika zbyt wcześnie.

| Lekcja | Temat | Status | Cel |
| --- | --- | --- | --- |
| 33 | Pseudoklasy i pseudoelementy w praktyce | Gotowa | Użycie `:is()`, `:where()`, `:not()`, `::before`, `::after` i stanów UI. |
| 34 | Container queries | Gotowa | Stylowanie komponentów zależnie od rozmiaru kontenera, nie tylko viewportu. |
| 35 | Logical properties | Gotowa | Pisanie stylów lepiej wspierających różne kierunki tekstu i layouty. |
| 36 | CSS nesting i nowoczesna składnia | Gotowa | Bezpieczne używanie zagnieżdżeń i unikanie nadmiernej specyficzności. |
| 37 | Tryby kolorów, zmienne motywu i dark mode | Gotowa | Budowa jasnego i ciemnego motywu z użyciem custom properties. |

### Moduł 8 — Praktyczne projekty końcowe

Ten moduł powinien łączyć wiedzę z poprzednich lekcji. Projekty powinny być małe, ale kompletne.

| Lekcja | Temat | Status | Cel |
| --- | --- | --- | --- |
| 38 | Projekt 1: responsywna karta profilu | Gotowa | Połączenie box modelu, typografii, kolorów, stanów i responsywności. |
| 39 | Projekt 2: landing page sekcji hero + karty | Gotowa | Budowa sekcji marketingowej z CTA i układem kart. |
| 40 | Projekt 3: panel dashboardu | Gotowa | Zastosowanie Grida, kart, danych i responsywnego układu. |
| 41 | Projekt 4: formularz rejestracji | Gotowa | Dostępny formularz z walidacją wizualną i stanami. |
| 42 | Projekt 5: mini system komponentów CSS | Gotowa | Zbudowanie zestawu przycisków, kart, alertów, pól formularza i tokenów. |

## 4. Najbliższe lekcje do wdrożenia

Po wdrożeniu lekcji 42 Moduł 8 i cała roadmapa 42 lekcji są domknięte. Najbliższy sprint powinien skupić się na jakości technicznej: centralnym źródle prawdy dla listy lekcji, ograniczeniu powielonej nawigacji i ewentualnym podziale arkusza CSS na sekcje lub pliki.

### Lekcja 07 — Flexbox: oś główna, oś poprzeczna i kontener

Status: wdrożona.

Zrealizowany zakres:

- czym jest Flexbox,
- `display: flex`,
- oś główna i poprzeczna,
- `flex-direction`,
- `justify-content`,
- `align-items`,
- `gap`,
- proste wyrównanie elementów w rzędzie i kolumnie.

Mini zadanie:

- zbudować pasek z trzema elementami: logo, menu i przyciskiem CTA.

### Lekcja 08 — Flexbox w praktyce: nawigacja, karty i układy sekcji

Status: wdrożona.

Zrealizowany zakres:

- `flex-wrap`,
- `flex-basis`,
- `flex-grow`,
- `flex-shrink`,
- układ kart,
- układ media object,
- typowe problemy z nierównymi wysokościami.

Mini zadanie:

- zbudować responsywną listę kart lekcji, która zawija się na mniejszych ekranach.

### Lekcja 09 — CSS Grid: kolumny, wiersze i odstępy

Status: wdrożona.

Zrealizowany zakres:

- czym Grid różni się od Flexboxa,
- `display: grid`,
- `grid-template-columns`,
- `grid-template-rows`,
- `gap`,
- `fr`,
- `repeat()`,
- `minmax()`.

Mini zadanie:

- zbudować prostą siatkę sześciu kart z równymi kolumnami.

### Lekcja 10 — CSS Grid w praktyce: galerie, dashboardy i układy kart

Status: wdrożona.

Zrealizowany zakres:

- responsywne siatki bez nadmiaru breakpointów,
- `auto-fit`,
- `auto-fill`,
- `minmax()`,
- rozmieszczanie elementów na siatce,
- podstawy layoutu dashboardu.

Mini zadanie:

- stworzyć responsywną sekcję dashboardu z kartą główną i kartami pomocniczymi.

### Lekcja 11 — Pozycjonowanie: relative, absolute, fixed i sticky

Status: wdrożona.

Zrealizowany zakres:

- normalny flow a pozycjonowanie,
- `position: relative`,
- `position: absolute`,
- `position: fixed`,
- `position: sticky`,
- `top`, `right`, `bottom`, `left`,
- najczęstsze błędy z pozycjonowaniem.

Mini zadanie:

- dodać badge „Nowe” w prawym górnym rogu karty oraz sticky spis treści.

### Lekcja 12 — Warstwy i nakładanie: `z-index`, overlay i kontekst stosu

Status: wdrożona.

Zrealizowany zakres:

- czym jest stacking context,
- kiedy `z-index` działa, a kiedy nie,
- overlay,
- modal,
- dropdown,
- bezpieczne wartości warstw.

Mini zadanie:

- stworzyć prosty overlay z kartą modalną i warstwą tła.

### Lekcja 13 — Responsywność i podejście mobile-first

Status: wdrożona.

Zrealizowany zakres:

- czym jest responsywność,
- podejście mobile-first,
- viewport i podstawowa skala strony,
- elastyczne kontenery,
- zabezpieczanie obrazów i mediów,
- layout od jednej kolumny,
- pierwsze breakpointy przez `@media (min-width: 760px)`,
- najczęstsze błędy responsywności.

Mini zadanie:

- zbudować responsywną sekcję trzech kart, która startuje od jednej kolumny i rozszerza się do dwóch oraz trzech kolumn na większych viewportach.

### Lekcja 14 — Media queries i breakpointy

Status: wdrożona.

Zrealizowany zakres:

- czym jest media query,
- składnia `@media`,
- `min-width` w podejściu mobile-first,
- kiedy `max-width` ma sens jako wyjątek,
- dobór breakpointów na podstawie treści,
- prosta skala breakpointów,
- zmiana layoutu sekcji przez breakpoint,
- debugowanie responsywności między punktami zmiany.

Mini zadanie:

- rozbudować sekcję kart z Lekcji 13 o breakpointy `760px` i `1024px`, a następnie usunąć każdy breakpoint, który nie poprawia czytelności.

### Lekcja 15 — Jednostki CSS: px, %, em, rem, vw, vh, svh, ch

Status: wdrożona.

Zrealizowany zakres:

- rola jednostek CSS,
- `px`,
- `%`,
- `em`,
- `rem`,
- `vw`, `vh`, `svh`,
- `ch`,
- dobór jednostek do tekstu, odstępów, kontenerów i viewportu,
- najczęstsze błędy z jednostkami.

Mini zadanie:

- zbudować kartę artykułu używając `min(100%, 36rem)`, paddingu w `rem`, badge'a z paddingiem w `em`, tekstu ograniczonego przez `ch` i sekcji zależnej od `svh`.

### Lekcja 16 — Obrazy i media responsywne

Status: wdrożona.

Zrealizowany zakres:

- bazowy styl dla obrazów, wideo i osadzonych mediów,
- `max-width: 100%` i `height: auto`,
- proporcje przez `aspect-ratio`,
- kadrowanie przez `object-fit` i `object-position`,
- art direction przez `picture`,
- dobór źródeł przez `srcset` i `sizes`,
- stabilność layoutu przez `width` i `height`,
- `loading="lazy"` i `decoding="async"`,
- podstawy dostępnego opisu alternatywnego.

Mini zadanie:

- zbudować responsywną kartę artykułu z ramką obrazu `aspect-ratio: 16 / 9`, obrazem ustawionym przez `object-fit: cover`, poprawnymi atrybutami `alt`, `width`, `height`, `loading` i `decoding`, a następnie sprawdzić brak poziomego overflow na szerokości 390px.

### Lekcja 17 — Fluid typography i funkcje `min()`, `max()`, `clamp()`

Status: wdrożona.

Zrealizowany zakres:

- problem skokowej skali typografii,
- `min()`,
- `max()`,
- `clamp()`,
- płynna typografia,
- tokeny typograficzne oparte o `clamp()`,
- płynne odstępy,
- granice czytelności i dostępność,
- najczęstsze błędy przy skalowaniu przez viewport.

Mini zadanie:

- zbudować sekcję hero z nagłówkiem `font-size: clamp(2rem, 1.2rem + 4vw, 4.5rem)`, leadem ograniczonym przez `max-width: 60ch`, paddingiem `clamp(3rem, 8vw, 7rem)` oraz testem szerokości 390px, 768px i 1440px.

### Lekcja 18 — Linki, przyciski i stany: hover, focus, active, disabled

Status: wdrożona.

Zrealizowany zakres:

- różnica semantyczna między linkiem i przyciskiem,
- bazowy styl przycisku,
- stan `:hover`,
- stan `:focus-visible`,
- stan `:active`,
- `:disabled`,
- `aria-disabled`,
- dostępne stany klawiatury,
- najczęstsze błędy przy budowaniu komponentów interaktywnych.

Mini zadanie:

- zbudować mały system dwóch przycisków i jednego linku tekstowego, dodać warianty `button--primary` i `button--secondary`, obsłużyć `:hover`, `:focus-visible`, `:active`, `:disabled`, a następnie przetestować komponent myszą, klawiaturą i na małym ekranie.

### Lekcja 19 — Formularze: inputy, labelki, błędy i stany walidacji

Status: wdrożona.

Zrealizowany zakres:

- semantyczny HTML formularzy,
- widoczne labelki powiązane przez `for` i `id`,
- tekst pomocniczy przez `aria-describedby`,
- bazowy styl pola formularza,
- `:focus-visible` dla inputów i selectów,
- placeholder jako podpowiedź, nie zamiennik labelki,
- stany walidacji i `aria-invalid`,
- komunikaty błędów oraz komunikaty sukcesu,
- różnica między `disabled` i `readonly`,
- najczęstsze błędy przy stylowaniu formularzy.

Mini zadanie:

- zbudować formularz zapisu do newslettera z widoczną labelką, tekstem pomocniczym, wariantem błędu z `aria-invalid`, czytelnym `:focus-visible` i testem przejścia klawiaturą oraz braku poziomego overflow na szerokości 390px.

### Lekcja 20 — Karty, listy i sekcje treści

Status: wdrożona.

Zrealizowany zakres:

- anatomia karty treści,
- semantyczne użycie `article`, `section`, `ul` i `ol`,
- metadane, tytuł, opis i akcja w karcie,
- sekcje treści z `aria-labelledby`,
- responsywny layout kart przez `repeat(auto-fit, minmax())`,
- hierarchia typograficzna i rytm odstępów,
- karta z mediami i stabilnym `aspect-ratio`,
- listy cech i listy kroków jako prawdziwe listy HTML,
- najczęstsze błędy przy budowaniu komponentów contentowych.

Mini zadanie:

- zbudować sekcję „Polecane materiały” z trzema kartami jako `article`, nagłówkiem sekcji powiązanym przez `aria-labelledby`, listą cech w jednej karcie oraz siatką `repeat(auto-fit, minmax(14rem, 1fr))` sprawdzoną na szerokości 390px.

### Lekcja 21 — Nawigacje, breadcrumbsy i paginacja

Status: wdrożona.

Zrealizowany zakres:

- rola nawigacji w orientacji użytkownika,
- semantyczny element `nav`,
- rozróżnianie wielu nawigacji przez `aria-label`,
- aktywny element przez `aria-current`,
- breadcrumbsy jako uporządkowana lista w `nav`,
- paginacja z poprzednią, następną i aktualną stroną,
- stany `:hover` i `:focus-visible` dla linków nawigacyjnych,
- niedostępny element paginacji przez `aria-disabled`,
- responsywne zawijanie nawigacji bez poziomego overflow.

Mini zadanie:

- zbudować komplet nawigacyjny dla listy artykułów: nawigację kategorii z aktywnym linkiem, breadcrumb jako `ol` w `nav`, paginację z poprzednią i następną stroną oraz test fokusu klawiaturą i braku poziomego overflow na szerokości 390px.

### Lekcja 22 — Tabele i dane w CSS

Status: wdrożona.

Zrealizowany zakres:

- kiedy używać tabeli, a kiedy wybrać listę lub karty,
- semantyczna struktura tabeli z `caption`, `thead`, `tbody`, `th`, `td` i `scope`,
- bazowy styl tabeli: padding, linie, nagłówki, pasy wierszy i wyrównanie danych liczbowych,
- kontrolowany `overflow-x` dla szerokich zestawów danych,
- sticky header dla przewijanych tabel,
- statusy i dane liczbowe w czytelnym układzie,
- alternatywny widok rekordów dla małych ekranów,
- najczęstsze błędy przy tabelach i danych w CSS.

Mini zadanie:

- zbudować tabelę porównania trzech planów subskrypcji z `caption`, nagłówkami ze `scope`, wyrównaniem liczb do prawej, przewijalnym kontenerem i testem braku poziomego overflow na szerokości 390px.

### Lekcja 23 — Cienie, obramowania, zaokrąglenia i separacja wizualna

Status: wdrożona.

Zrealizowany zakres:

- rola separacji wizualnej w organizowaniu powierzchni UI,
- dobór `border`, tła, promienia i cienia do roli komponentu,
- bazowe obramowania jako spokojna granica elementu,
- spójna skala `border-radius` przez tokeny,
- miękkie cienie przez `box-shadow` i kontrolę przezroczystości,
- hierarchia głębi dla kart, popoverów i modali,
- różnica między `outline` i `border` w stanach fokusu,
- demo czterech poziomów separacji: powierzchnia płaska, obramowana, podniesiona i wyróżniona,
- najczęstsze błędy przy nadużywaniu cieni, promieni i ramek.

Mini zadanie:

- zbudować zestaw trzech kart cenowych z tokenami dla `--radius-md`, `--shadow-sm` i `--shadow-md`, różnymi poziomami separacji oraz kontrolą, czy karta polecana jest wyróżniona celowo, a nie przypadkowo.

### Lekcja 24 — Transformacje 2D

Status: wdrożona.

Zrealizowany zakres:

- czym jest `transform` i dlaczego nie przebudowuje normalnego flow dokumentu,
- użycie `translate()`, `translateX()` i `translateY()` do przesuwania elementów,
- użycie `scale()` w komponentach UI bez nadmiernego powiększania,
- użycie `rotate()` dla ikon, detali i lekkich efektów wizualnych,
- rola `transform-origin` w zmianie punktu obrotu lub skalowania,
- znaczenie kolejności funkcji w jednej deklaracji `transform`,
- demo statyczne pokazujące bazowy element, przesunięcie, skalowanie, obrót i punkt transformacji,
- najczęstsze błędy przy używaniu transformacji zamiast narzędzi layoutu.

Mini zadanie:

- zbudować kartę produktu z delikatnym `translateY()`, przyciskiem używającym `scale(.98)`, ikoną obracaną przez `rotate(90deg)` i testem braku poziomego overflow na szerokości 390px.

### Lekcja 25 — Przejścia CSS: `transition`

Status: wdrożona.

Zrealizowany zakres:

- czym jest `transition` i dlaczego deklaruje się go najczęściej na stanie bazowym,
- kontrola `transition-property`,
- kontrola `transition-duration`,
- kontrola `transition-timing-function`,
- kontrola `transition-delay`,
- zapis skrótem `transition` i kilka przejść rozdzielonych przecinkami,
- płynne stany `:hover`, `:focus-visible` i `:active`,
- bezpieczne właściwości do animowania, szczególnie `transform` i `opacity`,
- unikanie `transition: all` w komponentach produkcyjnych,
- obsługa `prefers-reduced-motion`,
- demo przejść dla przycisku, karty linku, statusów i timing function.

Mini zadanie:

- zbudować kartę linku z przejściami dla `transform`, `box-shadow` i `border-color`, wyraźnym `:focus-visible` oraz regułą `prefers-reduced-motion`, która wyłącza ruch, ale zostawia stany wizualne.

### Lekcja 26 — Animacje CSS: `@keyframes`

Status: wdrożona.

Zrealizowany zakres:

- różnica między przejściem `transition` a animacją opartą o `@keyframes`,
- definiowanie sekwencji przez `from`, `to` oraz kroki procentowe,
- łączenie `animation-name` i `animation-duration`,
- kontrola rytmu przez `animation-timing-function` i startu przez `animation-delay`,
- powtarzanie i kierunek przez `animation-iteration-count` oraz `animation-direction`,
- utrzymywanie stanu początkowego lub końcowego przez `animation-fill-mode`,
- zapis skrótem `animation` i bezpieczna kolejność wartości,
- wskazanie właściwości najbezpieczniejszych do animowania: `transform` i `opacity`,
- demo animacji wejścia, pulsowania, ruchu wskaźnika i paska progresu,
- najczęstsze błędy przy nadużywaniu nieskończonych animacji i animowaniu kosztownych właściwości.

Mini zadanie:

- zbudować komponent powiadomienia, który pojawia się przez animację `@keyframes`, zostaje w stanie końcowym dzięki `animation-fill-mode: both` i używa tylko `transform` oraz `opacity`.

### Lekcja 27 — Dostępne animacje i `prefers-reduced-motion`

Status: wdrożona.

Zrealizowany zakres:

- rola dostępnego ruchu w interfejsach użytkownika,
- działanie media feature `prefers-reduced-motion`,
- pisanie reguły `@media (prefers-reduced-motion: reduce)`,
- różnica między ograniczeniem ruchu a usunięciem całego feedbacku,
- bezpieczne ograniczanie `transition` i animacji opartych o `@keyframes`,
- ustawianie stanu końcowego komponentu po wyłączeniu animacji,
- alternatywy bez ruchu: kolor, obramowanie, tekst statusu i kontrast,
- obsługa `scroll-behavior`, efektów scrolla i parallaxu,
- proste tokeny ruchu przez zmienne CSS,
- demo porównujące pełny ruch z wariantem reduced motion.

Mini zadanie:

- przerobić komponent powiadomienia z lekcji 26 tak, aby w trybie `prefers-reduced-motion: reduce` zachował stan końcowy, wyłączył ruch i nadal komunikował sukces przez statyczny feedback.

### Lekcja 28 — Nazewnictwo klas i BEM-like naming

Status: wdrożona.

Zrealizowany zakres:

- rola nazewnictwa klas w utrzymaniu większego CSS,
- problemy nazw ogólnych typu `.box`, `.title`, `.green`,
- model BEM-like: blok, element i modyfikator,
- zapis `block__element--modifier`,
- wybór samodzielnego bloku komponentu,
- projektowanie elementów bez głębokich łańcuchów selektorów,
- używanie modyfikatorów do wariantów komponentu,
- rozróżnianie klas komponentu, stanu i utility,
- ograniczanie zależności CSS od konkretnej struktury HTML,
- demo porównujące nazwy ogólne z nazwami komponentowymi.

Mini zadanie:

- przepisać kartę profilu na nazwy BEM-like z blokiem `.profile-card`, elementami `__avatar`, `__name`, `__role`, `__actions`, modyfikatorem `--featured` albo `--compact` oraz opcjonalnym stanem `.is-loading`.

### Lekcja 29 — Zmienne CSS i design tokens

Status: wdrożona.

Zrealizowany zakres:

- rola zmiennych CSS w utrzymaniu większego projektu,
- definiowanie custom properties w `:root`,
- użycie funkcji `var()` i wartości awaryjnych,
- różnica między tokenami bazowymi i semantycznymi,
- centralizacja kolorów, powierzchni, obramowań i stanów UI,
- projektowanie skal odstępów, promieni i cieni,
- lokalne nadpisywanie tokenów w wariantach komponentu,
- unikanie tokenów jednorazowych i nieużywanych,
- demo komponentu statusu opartego o lokalne tokeny,
- mini system tokenów dla kart informacyjnych.

Mini zadanie:

- zbudować zestaw tokenów dla kart informacyjnych: kolory akcji i sukcesu, powierzchnie, obramowania, skalę odstępów, promień, cień oraz wariant `.info-card--success`, który nadpisuje tylko lokalne tokeny.

### Lekcja 30 — Kaskada, specyficzność i `@layer`

Status: wdrożona.

Zrealizowany zakres:

- czym jest kaskada CSS i dlaczego kilka reguł może dotyczyć tego samego elementu,
- rola specyficzności selektorów: element, klasa i ID,
- znaczenie kolejności źródła przy regułach o tej samej specyficzności,
- ryzyka związane z nadużywaniem `!important`,
- wpływ stylów inline na możliwość nadpisywania CSS,
- podstawowa składnia `@layer`,
- planowanie kolejności warstw: reset, base, components, utilities,
- użycie warstw do ograniczenia walki ze specyficznością,
- demo porównujące rosnące selektory z jawną kolejnością warstw,
- mini ćwiczenie porządkujące style przycisku w małym systemie UI.

Mini zadanie:

- uporządkować style przycisku przez warstwy `reset`, `base`, `components` i `utilities`, dodać bazowy `.button`, utility `.u-bg-success` oraz sprawdzić, czy utility wygrywa bez użycia `!important`.

### Lekcja 31 — Reset, normalize i style bazowe

Status: wdrożona.

Zrealizowany zakres:

- różnica między resetem CSS i normalize,
- rola małego, świadomego resetu zamiast agresywnego wymazywania domyślnych stylów,
- globalne `box-sizing: border-box`,
- bazowe style dla `html` i `body`,
- przewidywalne ustawienia fontu, tła, koloru i `line-height`,
- zabezpieczenie obrazów i mediów przez `display: block` oraz `max-width: 100%`,
- bazowe reguły dla typografii, linków i widocznego fokusu,
- podstawowe wyrównanie elementów formularzy przez `font: inherit`,
- trzymanie resetu i stylów bazowych w odpowiednich warstwach CSS,
- demo porównujące brak fundamentu z uporządkowanym resetem i warstwą base.

Mini zadanie:

- przygotować fundament CSS dla nowej strony statycznej: warstwy `reset`, `base`, `components` i `utilities`, globalny `box-sizing`, bazowe style `body`, bezpieczne media, czytelne linki, fokus klawiatury oraz podstawowe reguły formularzy.

### Lekcja 32 — Struktura plików CSS i skalowanie arkusza

Status: wdrożona.

Zrealizowany zakres:

- kiedy pojedynczy plik CSS zaczyna utrudniać utrzymanie projektu,
- różnica między problemem jednego pliku i problemem braku konwencji,
- praktyczny podział na `settings`, `reset`, `base`, `layout`, `components` i `utilities`,
- planowanie folderów oraz sekcji arkusza wokół odpowiedzialności,
- kolejność importów zgodna z kaskadą i `@layer`,
- granice komponentów i rozdzielenie komponentu od layoutu strony,
- świadome użycie utilities jako małych, przewidywalnych wyjątków,
- zasady skalowania arkusza bez podbijania specyficzności,
- demo porównujące dopisywanie poprawek na końcu pliku z warstwową strukturą CSS,
- mini ćwiczenie projektowania struktury CSS dla małej strony.

Mini zadanie:

- zaprojektować strukturę CSS dla strony z hero, kartami, formularzem i stopką: rozpisać foldery lub sekcje, przypisać tokeny, bazowe reguły, layouty, komponenty oraz maksymalnie trzy utilities z opisem zasad użycia.

### Lekcja 33 — Pseudoklasy i pseudoelementy w praktyce

Status: wdrożona.

Zrealizowany zakres:

- różnica między pseudoklasą i pseudoelementem,
- pseudoklasy stanów UI: `:hover`, `:focus-visible`, `:disabled`,
- strukturalne pseudoklasy dla list, tabel i powtarzalnych elementów,
- użycie `:is()` do skracania grup selektorów,
- użycie `:where()` do obniżania specyficzności stylów bazowych,
- użycie `:not()` do kontrolowanych wyjątków,
- pseudoklasy formularzy: `:required`, `:valid`, `:invalid`,
- pseudoelementy `::before`, `::after`, `::marker` i `::selection`,
- ograniczenia dostępnościowe pseudoelementów i zasada, że ważna treść powinna pozostać w HTML,
- demo komponentu zadania z realnymi stanami UI, markerem statusu i strukturalnymi separatorami.

Mini zadanie:

- zbudować małą listę zadań z pseudoklasami i pseudoelementami: dodać stany przycisku, separatory przez `:not(:last-child)`, grupowanie selektorów przez `:is()`, dekoracyjny status przez `::before` oraz wizualne stany formularza przez `:required`, `:valid` i `:invalid`.

### Lekcja 34 — Container queries

Status: wdrożona.

Zrealizowany zakres:

- różnica między `@media` i `@container`,
- użycie container queries do komponentów niezależnych od konkretnego layoutu strony,
- ustawianie kontenera przez `container-type: inline-size`,
- stosowanie nazwanych kontenerów przez `container-name`,
- składnia reguły `@container`,
- przełączanie komponentu z układu pionowego na poziomy zależnie od rozmiaru rodzica,
- jednostki container query: `cqi`, `cqb`, `cqmin` i `cqmax`,
- projektowanie fallbacku jako bazowego, czytelnego stylu mobile-first,
- rozdzielenie odpowiedzialności między globalne media queries i lokalne container queries,
- demo tej samej karty w wąskim i szerokim kontenerze.

Mini zadanie:

- zbudować kartę profilu reagującą na rozmiar kontenera: dodać wrapper z `container-type: inline-size`, bazowy układ pionowy, przełączenie przez `@container (min-width: 32rem)`, płynny rozmiar przez `cqi` oraz sprawdzenie komponentu w sidebarze i szerokiej sekcji.

### Lekcja 35 — Logical properties

Status: wdrożona.

Zrealizowany zakres:

- różnica między physical properties i logical properties,
- model osi `inline` i `block`,
- zamiana fizycznych odstępów na `margin-inline`, `padding-block`, `padding-inline` i `margin-block-start`,
- stosowanie `border-inline-start` jako akcentu zależnego od kierunku tekstu,
- użycie `inline-size`, `block-size`, `max-inline-size` i `min-block-size`,
- pozycjonowanie badge'y przez `inset-block-start` i `inset-inline-end`,
- projektowanie komponentów bez założenia, że początek treści zawsze jest po lewej stronie,
- testowanie komponentów w wariantach `dir="ltr"` i `dir="rtl"`,
- demo dwóch kart używających tego samego CSS w różnych kierunkach tekstu.

Mini zadanie:

- przepisać komponent alertu z fizycznych właściwości na logical properties: użyć `padding-block`, `padding-inline`, `border-inline-start`, `max-inline-size`, `inset-block-start` i `inset-inline-end`, a następnie sprawdzić komponent w wariantach `dir="ltr"` i `dir="rtl"` bez dodatkowych klas wariantów.

### Lekcja 36 — CSS nesting i nowoczesna składnia

Status: wdrożona.

Zrealizowany zakres:

- czym jest natywny CSS nesting i kiedy poprawia organizację komponentu,
- różnica między płaskimi selektorami i regułami zagnieżdżonymi,
- użycie selektora rodzica `&` przy pseudoklasach, klasach stanu i wariantach tego samego elementu,
- grupowanie stanów komponentu: `:hover`, `:focus-within` i wariantów BEM-like,
- bezpieczne używanie zagnieżdżonych `@media`, `@supports` i `@container` w architekturze opartej o warstwy,
- rozróżnienie natywnego CSS nesting od składni i wygód Sass,
- kontrola specyficzności, głębokości selektorów i zależności od struktury HTML,
- demo porównujące komponent zapisany jako flat CSS i jako CSS nesting,
- praktyczne zasady wyboru między selektorem płaskim i zagnieżdżonym.

Mini zadanie:

- przepisać komponent `.course-card` z płaskiego CSS na nesting: zagnieździć elementy, dodać `&:hover`, `&:focus-within`, wariant `&.course-card--featured`, zagnieżdżony breakpoint oraz sprawdzić, czy po rozwinięciu selektorów nie powstały zbyt głębokie zależności.

### Lekcja 37 — Tryby kolorów, zmienne motywu i dark mode

Status: wdrożona.

Zrealizowany zakres:

- rola właściwości `color-scheme` w dopasowaniu natywnych kontrolek przeglądarki,
- wykorzystanie `@media (prefers-color-scheme: dark)` jako reakcji na preferencję systemową,
- projektowanie jasnego i ciemnego motywu przez semantyczne custom properties,
- rozróżnienie preferencji systemowej od ręcznego wyboru użytkownika,
- ręczne przełączanie motywu przez atrybut `data-theme`,
- mapowanie globalnych tokenów motywu na lokalne tokeny komponentu,
- projektowanie osobnych tokenów dla fokusu, akcentu, tekstu, tła, powierzchni i obramowań,
- kontrola kontrastu, stanów interakcji, disabled state i błędów w obu motywach,
- demo tego samego komponentu dashboardowego w jasnym i ciemnym motywie.

Mini zadanie:

- zbudować kartę informacyjną opartą o tokeny `--color-bg`, `--color-surface`, `--color-text`, `--color-muted`, `--color-border`, `--color-accent` i `--color-focus`, dodać wariant `[data-theme="dark"]`, ustawić `color-scheme`, a następnie sprawdzić kartę w jasnym oraz ciemnym motywie bez zmieniania klas komponentu.

### Lekcja 38 — Projekt 1: responsywna karta profilu

Status: wdrożona.

Zrealizowany zakres:

- pierwszy praktyczny projekt końcowy łączący wcześniejsze lekcje,
- przygotowanie briefu i kryteriów sukcesu dla komponentu portfolio,
- semantyczna struktura karty profilu przez `article`, nagłówek, opis, listę kompetencji, metryki i akcje,
- lokalne tokeny komponentu dla tła, tekstu, tekstu pomocniczego, obramowania, akcentu i fokusu,
- stabilny avatar oparty o proporcje i kontrolowany rozmiar,
- layout mobile-first z naturalną kolejnością treści,
- responsywne przejście do układu dwukolumnowego na szerszym ekranie,
- dostępne stany hover, active i `:focus-visible` dla akcji,
- checklista jakości obejmująca brak overflow, kontrast, semantykę i reużywalność komponentu,
- demo kompletnej karty profilu gotowej jako punkt startowy do portfolio.

Mini zadanie:

- zbudować własną responsywną kartę profilu od zera: semantyczny `article`, lokalne tokeny, stabilny avatar, mobile-first, jeden breakpoint lub container query, dostępne stany interakcji i test na szerokościach 390px, 768px oraz 1280px.

### Lekcja 39 — Projekt 2: landing page sekcji hero + karty

Status: wdrożona.

Zrealizowany zakres:

- drugi praktyczny projekt końcowy łączący fundamenty layoutu, typografii, responsywności i komponentów UI,
- przygotowanie briefu dla landing page produktu edukacyjnego,
- zdefiniowanie kryteriów sukcesu dla hero, CTA, panelu wizualnego i kart wartości,
- architektura sekcji marketingowej: komunikat, lead, akcje, element wizualny i argumenty wspierające,
- semantyczna struktura HTML oparta o `section`, nagłówek, akcje i powtarzalne `article`,
- lokalne tokeny dla tła, paneli, tekstu, tekstu pomocniczego, obramowań, akcentu i fokusu,
- layout mobile-first z naturalną kolejnością treści,
- responsywne przejście hero do układu dwukolumnowego,
- responsywna siatka kart przez `repeat(auto-fit, minmax())`,
- dostępne stany hover, active i `:focus-visible` dla CTA,
- demo kompletnej sekcji landing page z panelem sprintu i trzema kartami wartości,
- checklista jakości obejmująca hierarchię treści, brak overflow, widoczny fokus i sensowne breakpointy.

Mini zadanie:

- zbudować własną sekcję landing page dla małego produktu: brief, hero, lead, jedno główne CTA, panel wizualny, trzy karty wartości, lokalne tokeny, mobile-first, breakpoint dla szerszego layoutu i test na szerokościach 390px, 768px oraz 1280px.

### Lekcja 40 — Projekt 3: panel dashboardu

Status: wdrożona.

Zrealizowany zakres:

- trzeci praktyczny projekt końcowy nastawiony na interfejs operacyjny, a nie marketingowy,
- przygotowanie briefu dla dashboardu platformy edukacyjnej,
- zdefiniowanie kryteriów sukcesu dla metryk, hierarchii danych, siatki i stanów interakcji,
- anatomia dashboardu: nagłówek panelu, karty metryk, panel główny, lista zadań i aktywność,
- semantyczna struktura HTML z użyciem `section`, `header`, `dl`, `article` i list,
- lokalne tokeny dashboardu dla tła, paneli, tekstu, obramowań, akcentów, statusów i fokusu,
- layout mobile-first z priorytetową kolejnością informacji,
- responsywny układ dashboardu oparty o CSS Grid,
- karty metryk z nazwą, wartością i kontekstem trendu,
- panel trendu z prostym wykresem słupkowym opartym o CSS,
- lista priorytetów i aktywności bez poziomego overflow,
- dostępne stany hover, active i `:focus-visible` dla filtrów oraz akcji,
- demo kompletnego panelu dashboardu gotowego jako baza do portfolio,
- checklista jakości obejmująca hierarchię danych, brak overflow, widoczny fokus i czytelność narzędziową.

Mini zadanie:

- zbudować własny dashboard dla panelu edukacyjnego albo SaaS: brief użytkownika, nagłówek, trzy metryki jako `dl`, panel główny, lista zadań, aktywność, lokalne tokeny, mobile-first, responsywny CSS Grid i test na szerokościach 390px, 768px oraz 1280px.

### Lekcja 41 — Projekt 4: formularz rejestracji

Status: wdrożona.

Zrealizowany zakres:

- czwarty praktyczny projekt końcowy skupiony na dostępnych formularzach,
- przygotowanie briefu dla formularza rejestracji do programu edukacyjnego,
- zdefiniowanie kryteriów sukcesu dla labelek, pól, błędów, zgód i CTA,
- anatomia formularza: nagłówek, dane konta, preferencje, zgody i informacja zwrotna,
- semantyczna struktura HTML z użyciem `form`, `label`, `input`, `select`, `fieldset`, `legend` i przycisków,
- powiązanie pól z tekstami pomocniczymi i błędami przez `aria-describedby`,
- przykład pola błędnego z `aria-invalid="true"`,
- lokalne tokeny formularza dla tła, paneli, tekstu, obramowań, fokusu, błędu i sukcesu,
- layout mobile-first z jedną kolumną jako bazą,
- responsywne przejście wybranych pól do dwóch kolumn na szerszym ekranie,
- dostępne stany focus-visible, error, success i disabled,
- demo formularza rejestracji z polem błędu, stanem sukcesu, wyborem poziomu i checkboxami zgód,
- checklista jakości obejmująca semantykę, brak overflow, klikalne labelki, widoczny fokus i zrozumiałość bez JavaScriptu.

Mini zadanie:

- zbudować własny formularz rejestracji dla kursu online albo aplikacji SaaS: brief użytkownika, dane konta, preferencje, zgody, labelki z `for` i `id`, teksty przez `aria-describedby`, przykład błędu, `fieldset`, stany focus/error/success/disabled i test na szerokościach 390px, 768px oraz 1280px.

### Lekcja 42 — Projekt 5: mini system komponentów CSS

Status: wdrożona.

Zrealizowany zakres:

- piąty i końcowy projekt praktyczny domykający roadmapę CSS Academy,
- przygotowanie briefu dla mini systemu komponentów `CSS Academy UI Kit`,
- zdefiniowanie kryteriów sukcesu dla tokenów, wariantów, stanów i reużywalności,
- świadome ograniczenie zakresu systemu do tokenów, przycisków, kart, alertów i pól formularza,
- semantyczna struktura HTML dla komponentów używanych w realnym widoku aplikacji,
- tokeny systemowe dla tła, powierzchni, tekstu, tekstu pomocniczego, obramowań, akcentu, sukcesu, ostrzeżenia, błędu, fokusu i promieni,
- komponent przycisku z wariantami primary, secondary, ghost i disabled,
- komponent karty z wariantem bazowym i wyróżnionym,
- komponent alertu z wariantami success, warning i error,
- komponent pola formularza z labelką, inputem i help text,
- spójne stany hover, active, focus-visible i disabled,
- responsywna siatka komponentów oparta o `repeat(auto-fit, minmax())`,
- demo mini systemu pokazujące tokeny, przyciski, karty, alerty i pole formularza w jednym widoku,
- checklista jakości dla reużywalności, semantyki, dostępności i braku overflow.

Mini zadanie:

- zbudować własny mini system komponentów CSS: tokeny semantyczne, przyciski, karty, alerty, pole formularza, warianty, stany interakcji, responsywna siatka oraz krótka dokumentacja użycia każdego wariantu.

## 5. Proponowane kamienie milowe

### Kamień milowy A — Pełny fundament CSS

Zakres:

- lekcje 01–06,
- strona główna,
- spójna nawigacja,
- podstawowy progress bar.

Status: osiągnięty.

### Kamień milowy B — Layout Essentials

Zakres:

- lekcje 07–12,
- nawigacja poprzednia/następna,
- checklisty po każdej lekcji,
- przykłady wizualne dla Flexboxa, Grida i pozycjonowania.

Rekomendowany efekt: użytkownik potrafi zbudować podstawowy layout strony z kartami, nawigacją i sekcjami.

### Kamień milowy C — Responsive CSS

Zakres:

- lekcje 13–17,
- mini projekt responsywnej strony,
- testowanie układu na kilku szerokościach ekranu.

Rekomendowany efekt: użytkownik rozumie mobile-first i potrafi dopasować layout do telefonu, tabletu i desktopu.

### Kamień milowy D — UI Components

Zakres:

- lekcje 18–22,
- biblioteka prostych komponentów,
- ćwiczenia z dostępnych stanów interakcji.

Rekomendowany efekt: użytkownik potrafi stylować przyciski, formularze, karty, listy, tabele i nawigację.

### Kamień milowy E — Professional CSS

Zakres:

- lekcje 23–37,
- design tokens,
- organizacja CSS,
- nowoczesne funkcje CSS,
- motywy i dark mode.

Rekomendowany efekt: użytkownik zaczyna myśleć o CSS jak o utrzymywalnym systemie, a nie tylko zbiorze właściwości.

### Kamień milowy F — Portfolio Practice

Zakres:

- lekcje 38–42,
- pięć mini projektów,
- checklisty jakości,
- sekcja „co dodać do portfolio”.

Rekomendowany efekt: użytkownik ma praktyczne przykłady do pokazania i utrwalony proces budowania UI.

## 6. Standard jakości dla nowych lekcji

Każda nowa lekcja powinna spełniać następujące kryteria:

- ma unikalny `title` i `meta description`,
- ma poprawne `data-page` zgodne z nawigacją,
- jest podpięta w nawigacji strony głównej i wszystkich lekcji albo w centralnym mechanizmie generowania nawigacji,
- ma spis treści z działającymi kotwicami,
- zawiera przynajmniej jeden praktyczny przykład kodu,
- zawiera przynajmniej jedno mini zadanie,
- kończy się podsumowaniem i linkami do poprzedniej/następnej lekcji,
- nie wymaga JavaScript do zrozumienia głównej treści,
- zachowuje dostępność klawiaturą,
- przechodzi kontrolę linków lokalnych.

## 7. Rekomendacje wdrożeniowe

Przed dodaniem wielu kolejnych lekcji warto wykonać trzy kroki techniczne:

1. **Utrzymywać dokumentację główną po każdej lekcji** — opis projektu, lista podstron i statusy w roadmapie powinny odzwierciedlać bieżący zakres kursu.
2. **Utworzyć listę lekcji jako źródło prawdy** — nawet prosty plik JSON lub JS pozwoli generować karty lekcji i nawigację.
3. **Dodać walidację lokalnych linków** — prosty skrypt w Pythonie lub Node ograniczy ryzyko błędów przy rozwoju do kilkudziesięciu lekcji.

## 8. Docelowy efekt edukacyjny

Po ukończeniu całej ścieżki użytkownik powinien umieć:

- wyjaśnić, jak działa CSS, kaskada, dziedziczenie i specyficzność,
- dobrać właściwe selektory i nazewnictwo klas,
- kontrolować box model, odstępy, rozmiary i typografię,
- budować layouty za pomocą Flexboxa i Grida,
- projektować responsywnie w podejściu mobile-first,
- stylować komponenty UI z uwzględnieniem stanów i dostępności,
- tworzyć proste animacje i mikrointerakcje,
- przygotować reset, normalize i style bazowe dla nowego projektu,
- zaplanować strukturę plików CSS dla skalowanego arkusza,
- stosować pseudoklasy i pseudoelementy do stanów, struktury i dekoracji UI,
- budować komponenty reagujące na rozmiar kontenera przez container queries,
- pisać style oparte o logical properties, osie `inline` i `block` oraz kierunki tekstu,
- używać CSS nesting i nowoczesnej składni bez podbijania specyficzności,
- budować jasny i ciemny motyw przez semantyczne tokeny oraz preferencje użytkownika,
- organizować CSS w większym projekcie,
- korzystać ze zmiennych CSS i design tokens,
- zbudować responsywną kartę profilu jako pierwszy kompletny komponent portfolio,
- zbudować landing page z hero, CTA, panelem wizualnym i responsywnym układem kart,
- zbudować panel dashboardu z metrykami, listami, prostą wizualizacją danych i responsywnym CSS Grid,
- zbudować dostępny formularz rejestracji z labelkami, błędami, walidacją wizualną i stanami pól,
- zaprojektować mini system komponentów CSS z tokenami, wariantami, stanami i dokumentacją użycia,
- przygotować kilka praktycznych projektów do portfolio.

## 9. Rekomendowana najbliższa decyzja

Najlepszą następną decyzją produktową po ukończeniu roadmapy jest etap jakości technicznej: utworzenie centralnej listy lekcji jako źródła prawdy, ograniczenie powielonej nawigacji, rozważenie podziału `assets/css/style.css` na uporządkowane sekcje lub pliki oraz dodanie stałej walidacji linków lokalnych.
