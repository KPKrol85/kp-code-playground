# TransLogix — Raport CSS

## 1. Krótka ocena

Architektura CSS jest czytelna i zgodna z deklarowanym podziałem modułów. `assets/css/style.css` importuje warstwy w stabilnej kolejności: tokens, base, layout, header, footer, components, utilities i pages (`assets/css/style.css:2-9`).

Użycie selektorów jest w większości uzasadnione aktualnym HTML, partialami albo JavaScriptem. Wykryto kilka grup selektorów, które w obecnym źródle nie mają potwierdzonego użycia i wyglądają jak pozostałość po wcześniejszym wariancie fleet/lightbox. Nie należy jednak usuwać ich automatycznie bez krótkiego smoke testu, ponieważ dotyczą widocznych obszarów UI.

System tokenów w `settings.css` jest szeroko używany dla kolorów, spacingu, typografii, radiusów, focus ringów i motywu ciemnego. Najważniejsza uwaga dotyczy kilku odwołań do niezdefiniowanych custom properties, z których część nie ma fallbacku i powoduje ignorowanie pojedynczej deklaracji CSS.

## 2. Zakres sprawdzenia

- CSS entrypoint: `assets/css/style.css`.
- Moduły CSS: `settings.css`, `base.css`, `layout.css`, `header.css`, `footer.css`, `components.css`, `utilities.css`, `pages.css`.
- Źródłowe pliki HTML w katalogu root.
- Partiale: `partials/` i `templates/partials/`.
- JavaScript selector usage w `assets/js/`, z uwzględnieniem `querySelector`, `querySelectorAll`, `classList`, `dataset`, klas tworzonych przez `className` i stanów ARIA/data.
- Tokeny CSS z `settings.css` oraz odwołania `var(...)` w modułach CSS.
- Z analizy źródłowej wyłączono `dist/`, `.min.css`, `.min.js`, `node_modules/`, raporty Playwright i artefakty testowe.

## 3. Mapa modułów CSS

- `settings.css` — design tokens: kolory, fonty, skala spacingu, font sizes, font weights, line heights, letter spacing, radiusy, shadows, focus ring, transition i tokeny motywu ciemnego (`assets/css/modules/settings.css:1-107`).
- `base.css` — reset, bazowe style dokumentu, `@font-face`, focus defaults, skip link i bazowa typografia (`assets/css/modules/base.css:1-153`).
- `layout.css` — współdzielone prymitywy layoutu: `.container`, `.section`, gridy, stack i nagłówki sekcji (`assets/css/modules/layout.css:1-53`).
- `header.css` — header, brand, nawigacja, mobile panel, theme toggle i stany headera (`assets/css/modules/header.css:1-454`).
- `footer.css` — stopka, statystyki, kolumny, linki, social links i layout stopki (`assets/css/modules/footer.css:1-316`).
- `components.css` — komponenty współdzielone: hero, cards, fleet cards, kalkulator wyceny, CTA, buttons, forms, tags, filters, badges, lightbox i site consent (`assets/css/modules/components.css:1-1206`).
- `utilities.css` — małe helpery: reveal, text muted, center i visually hidden (`assets/css/modules/utilities.css:1-28`).
- `pages.css` — reguły stron i page-specific flows pogrupowane komentarzami dla index, service, fleet, services, contact, system, pricing i legal pages (`assets/css/modules/pages.css:1-1392`).

Organizacja jest ogólnie czysta. Najbardziej rozmyty obszar to split stylów fleet: bazowe `.card.fleet-card` są w `components.css`, a szczegółowe warianty `fleet.html` w `pages.css`. To jest akceptowalne po ostatnim cleanupie, ale wymaga ostrożności przy przyszłym usuwaniu starych selektorów fleet.

## 4. Potencjalnie nieużywane selektory

### 4.1 Potwierdzone jako nieużywane

- `.fleet-card__icon`, `.fleet-card__icon img`, `.fleet-card__icon .lightbox-trigger`  
  Plik: `assets/css/modules/components.css:237-258`.  
  Powód: nie wykryto tej klasy w root HTML, partialach, `templates/partials/`, `assets/js/` ani `assets/data/`. Aktualny `fleet.html` używa struktury `.fleet-card__media`, `.fleet-card__main`, `.fleet-card__single` i powiązanych klas stronowych.  
  Rekomendacja: kandydat do bezpiecznego cleanupu w osobnym commicie po potwierdzeniu, że starszy wariant fleet icon nie wraca.

- `.fleet-card__brand`, `.fleet-card__brand-text`, `.fleet-card__brand .logo--dark`, `html.theme-dark .fleet-card__brand .logo--light`, `html.theme-dark .fleet-card__brand .logo--dark`  
  Plik: `assets/css/modules/pages.css:436-572`.  
  Powód: brak odpowiadającego markup lub dynamicznego tworzenia tych klas w aktualnych źródłach. Wyszukanie wykrywa tylko reguły CSS, nie realne użycie.  
  Rekomendacja: kandydat do usunięcia razem jako jedna stara grupa fleet brand, po krótkim smoke teście `fleet.html`.

- `.lightbox__thumb` i powiązane stany hover/focus/reduced-motion  
  Plik: `assets/css/modules/components.css:754-793`, `assets/css/modules/components.css:1052-1070`.  
  Powód: brak markup i brak tworzenia `.lightbox__thumb` w `assets/js/lightbox.js`; aktualny lightbox ukrywa grid i czyści `grid.innerHTML` (`assets/js/lightbox.js:153-154`).  
  Rekomendacja: usunąć tylko jeśli thumbnail grid nie jest planowany jako celowy fallback albo przyszły wariant lightboxa.

- `.center`  
  Plik: `assets/css/modules/utilities.css:17-19`.  
  Powód: helper nie jest użyty w aktualnych źródłach HTML, partialach, danych ani JS.  
  Rekomendacja: można zostawić jako świadomy publiczny helper utility albo usunąć, jeśli repo ma utrzymywać wyłącznie używane utility classes.

### 4.2 Wymagające ostrożnej weryfikacji

- `.lightbox__grid`  
  Plik: `fleet.html:443`, `assets/css/modules/components.css:746-752`.  
  Dlaczego niepewne: grid istnieje w markup, ale aktualny JS ukrywa go i czyści jego zawartość (`assets/js/lightbox.js:153-154`). Sam wrapper jest częścią lightbox DOM, więc nie należy usuwać go razem z `.lightbox__thumb` bez sprawdzenia layoutu i historii funkcji.  
  Rekomendacja: zostawić bez zmian; ewentualnie zweryfikować w oddzielnym cleanupie lightboxa.

### 4.3 Selektory celowo zachowane

- `.nav__panel--open`, `.is-open`, `.no-scroll` — stany mobile nav i blokady scrolla sterowane przez JS (`assets/js/nav.js:26-39`, `assets/js/lightbox.js:81-85`, `assets/js/lightbox.js:163-172`).
- `.is-active` — stan filtrów fleet/services ustawiany przez JS (`assets/js/gallery-filters.js:25-32`, `assets/js/services-filters.js:135-143`).
- `.is-visible` — reveal/site consent state sterowany runtime (`assets/js/reveal.js:5-13`, `assets/js/site-consent.js:88-108`).
- `.theme-dark`, `.js`, `.no-js` — klasy inicjalizacyjne i theme state (`assets/js/theme-init.js:17`, `assets/js/boot.js:3-4`).
- `.invalid` — stan walidacji formularzy (`assets/js/form.js:21-29`).
- `.service-card`, `.service-card__header`, `.tag`, `.text-muted` — część listy usług generowanej z `assets/data/services.json` przez `assets/js/services-filters.js:32-69`.
- `.site-consent*` — markup tworzony w całości przez `assets/js/site-consent.js:17-32`.
- `.lightbox__meta`, `.is-zoomed` — element i stan tworzone/przełączane przez `assets/js/lightbox.js:18-20`, `assets/js/lightbox.js:121-230`.

## 5. Audyt tokenów z settings.css

### 5.1 Tokeny używane prawidłowo

- Kolory bazowe i motyw: `--color-bg`, `--color-surface`, `--color-text`, `--color-muted`, `--color-accent`, `--color-accent-strong`, `--color-accent-soft`, `--color-border` są konsekwentnie używane w base, header, footer, components i pages.
- Typografia: `--font-base`, `--font-heading`, `--fs-*`, `--fw-*`, `--lh-*` i `--ls-*` są używane w nagłówkach, kartach, CTA, formularzach, stopce i sekcjach stron.
- Spacing i radius: `--space-01` do `--space-08`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-pill` są szeroko używane w layoutach, komponentach, formularzach, badge'ach, filtrach i lightboxie.
- Focus i interakcje: `--ring` oraz `--transition` są stosowane w focus states, hover states i stanach interaktywnych.
- Theme/social: `--social-icon-filter` jest użyty w stopce (`assets/css/modules/footer.css:226`) i ma override w dark theme (`assets/css/modules/settings.css:84-107`).

Wykryto jednak odwołania do custom properties, które nie są zdefiniowane w `settings.css` ani w innych modułach:

- `--color-surface-elevated`  
  Pliki: `assets/css/modules/components.css:234`, `assets/css/modules/components.css:289`, `assets/css/modules/components.css:332`, `assets/css/modules/components.css:699`, `assets/css/modules/pages.css:1022`, `assets/css/modules/pages.css:1276`, `assets/css/modules/pages.css:1378`.  
  Ocena: niskie ryzyko runtime, bo każde użycie ma fallback. Warto rozważyć dodanie tokenu do `settings.css`, jeśli ten poziom surface ma być częścią systemu.

- `--color-surface-soft`  
  Plik: `assets/css/modules/layout.css:38`.  
  Ocena: wyższe ryzyko spójności, bo brak fallbacku powoduje ignorowanie `background` dla `.section__header`.

- `--text-muted`  
  Plik: `assets/css/modules/components.css:365`.  
  Ocena: brak fallbacku; wygląda na literówkę względem istniejącego `--color-muted`.

- `--color-text-muted`  
  Plik: `assets/css/modules/components.css:382`.  
  Ocena: brak fallbacku; wygląda na nieistniejący alias tekstu muted.

- `--lh-body`  
  Plik: `assets/css/modules/pages.css:94`.  
  Ocena: brak fallbacku; wygląda na starszą nazwę dla istniejącego `--lh-base`.

### 5.2 Tokeny potencjalnie nieużywane

- `--container`  
  Plik: `assets/css/modules/settings.css:80`.  
  Pewność: wysoka. `.container` używa aktualnie `width: min(1200px, 90vw)` bez tokenu (`assets/css/modules/layout.css:2`).  
  Rekomendacja: zdecydować, czy token ma zastąpić hardcoded szerokość, czy zostać usunięty w przyszłym cleanupie.

- `--logo-blue`, `--logo-dark`, `--logo-light`  
  Plik: `assets/css/modules/settings.css:14-16`, `assets/css/modules/settings.css:101-103`.  
  Pewność: średnia. Tokeny nie są używane przez CSS, ale mogą być pozostałością po wcześniejszej integracji logo.  
  Rekomendacja: do weryfikacji; nie usuwać automatycznie bez decyzji, czy kolory logo mają być częścią systemu tokenów.

- `--fs-02`, `--fw-regular`, `--fw-medium`, `--radius-xs`, `--radius-xl`, `--space-09`, `--space-10`  
  Plik: `assets/css/modules/settings.css:24-57`, `assets/css/modules/settings.css:40-45`.  
  Pewność: wysoka dla aktualnego użycia, ale niska jako kandydat do usunięcia. To elementy skali projektowej, które mogą być celowo zachowane dla kompletności systemu.  
  Rekomendacja: zostawić jako scale reserve albo usunąć dopiero po decyzji, że token scale ma zawierać tylko aktywnie używane wartości.

### 5.3 Miejsca z wartościami hardcoded

- `assets/css/modules/layout.css:2` — `width: min(1200px, 90vw)` przy istniejącym `--container: 1120px`.  
  Możliwa zamiana: `width: min(var(--container), 90vw)`, ale zmieniłaby realną szerokość kontenera z 1200px na 1120px.  
  Rekomendacja: opcjonalna decyzja architektoniczna, nie automatyczna zmiana.

- `assets/css/modules/components.css:529-543` — hardcoded kolory stanów formularza: `#dc2626`, `#ecfdf3`, `#bbf7d0`, `#f87171`, `#fef2f2`.  
  Możliwa zamiana: nowe semantyczne tokeny typu error/success, bo obecny `settings.css` nie ma takich tokenów.  
  Rekomendacja: opcjonalne usprawnienie systemu tokenów, szczególnie jeśli formularze będą rozwijane.

- `assets/css/modules/components.css:921`, `assets/css/modules/components.css:1122` — `border-radius: 999px`.  
  Możliwa zamiana: `var(--radius-pill)`.  
  Rekomendacja: zalecane przy najbliższym cleanupie, bo token już istnieje i semantycznie pasuje.

- `assets/css/modules/components.css:806-845`, `assets/css/modules/footer.css:223-224` — stałe rozmiary ikon/kontrolek `24px` i `48px`.  
  Możliwa zamiana: brak koniecznej.  
  Rekomendacja: zostawić; to precyzyjne rozmiary ikon i hit targetów, a nie problem tokenizacji.

- Breakpointy `480px`, `520px`, `680px`, `700px`, `760px`, `860px`, `900px`, `1024px` w modułach CSS.  
  Możliwa zamiana: custom media nie jest dostępne w obecnym stacku bez dodatkowego tooling/konwencji.  
  Rekomendacja: zostawić; obecny projekt nie ma tokenów breakpointów.

## 6. Spójność komponentów i stron

- Reusable components są zasadniczo w `components.css`: hero, cards, CTA, buttons, forms, tags, filters, badges, lightbox i consent.
- Page-specific rules są w `pages.css` i są pogrupowane według stron. Sekcje fleet/services/contact/pricing/legal/system są czytelne.
- Layout primitives są w `layout.css`; jedyny punkt do decyzji to nieużyty `--container` wobec hardcoded szerokości `.container`.
- Header i footer pozostają izolowane w swoich modułach. Footer statystyki są poprawnie w `footer.css`, a ich wartości są sterowane przez `assets/js/stats.js`.
- Utilities są małe i generyczne. `.center` jest aktualnie nieużyty, ale jako helper może być świadomie zachowany.
- Największa ostrożność przy dalszym cleanupie dotyczy `fleet-card*`, bo część reguł jest współdzielona (`components.css`), a część stricte stronowa (`pages.css`).

## 7. Rekomendacje

Safe cleanup candidates:

- Usunąć w osobnym commicie potwierdzone nieużywane grupy `.fleet-card__icon*`, `.fleet-card__brand*` i `.lightbox__thumb*`, jeśli szybki smoke test `fleet.html` i lightboxa potwierdzi brak zależności.
- Podmienić `border-radius: 999px` na `var(--radius-pill)` tam, gdzie chodzi o pill shape.
- Dodać lub skorygować niezdefiniowane tokeny bez fallbacku: `--color-surface-soft`, `--text-muted`, `--color-text-muted`, `--lh-body`.

Items to keep unchanged:

- Dynamiczne klasy JS: `.is-open`, `.is-active`, `.is-visible`, `.theme-dark`, `.invalid`, `.site-consent*`, `.lightbox__meta`, `.is-zoomed`.
- Hardcoded rozmiary ikon i kontrolek lightbox/footer, bo są precyzyjnymi wartościami UI.
- Breakpointy, dopóki projekt nie wprowadzi formalnej warstwy breakpoint tokens/custom media.

Optional improvements for future audits:

- Dodać prosty CSS audit script, który rozróżnia klasy z HTML, JS, partiali i data-driven rendering, żeby kolejne cleanupy nie opierały się na ręcznym grep.
- Rozszerzyć token set o semantyczne kolory statusów formularzy: success/error/warning.
- Udokumentować decyzję, czy token scale ma obejmować wartości rezerwowe, czy wyłącznie aktywnie używane tokeny.

## 8. Ocena końcowa

Ocena jakości architektury CSS: 8.3/10.

Projekt ma dobrą strukturę modułów, szerokie użycie tokenów i ostrożny podział między komponentami a regułami stron. Główne ryzyka są ograniczone: kilka starych selektorów po fleet/lightbox, kilka nieużywanych tokenów oraz odwołania do niezdefiniowanych custom properties. To są problemy utrzymaniowe i spójnościowe, nie oznaki złej architektury.
