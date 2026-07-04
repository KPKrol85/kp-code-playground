# FlowDesk

FlowDesk to demonstracyjna aplikacja SPA typu Service Management Dashboard dla małych firm usługowych. Projekt pokazuje, jak może wyglądać lekki panel operacyjny do obsługi klientów, zleceń, wydarzeń, podstawowych KPI oraz preferencji użytkownika.

Aktualna wersja działa w całości po stronie przeglądarki. Nie ma backendu, prawdziwego uwierzytelniania ani zewnętrznej bazy danych. Stan aplikacji jest zapisywany w `localStorage`, a dane startowe pochodzą z `js/data/seed.js`. Projekt jest dobrym początkiem pod rozwój produktu, ale przed użyciem produkcyjnym wymaga warstwy jakości, bezpieczeństwa, testów, kontraktów danych i docelowej architektury API.

## Najważniejsze funkcje

- Logowanie demonstracyjne z walidacją emaila i hasła.
- Guard routingu blokujący widoki aplikacji bez aktywnej sesji demo.
- Dashboard z KPI, aktywnymi zleceniami, wydarzeniami i zaległymi zadaniami.
- Widok klientów z filtrowaniem, sortowaniem, dodawaniem, edycją, usuwaniem i panelem szczegółów.
- Widok zleceń w formie prostego kanbana z filtrami statusu i priorytetu.
- Widok kalendarza z wydarzeniami powiązanymi z klientami i zleceniami.
- Ustawienia użytkownika: motyw jasny/ciemny, ograniczenie animacji, eksport JSON i reset danych demo.
- PWA: manifest, service worker, cache app-shell i widok offline.
- Podstawy dostępności: skip link, focus-visible, modal z `aria-modal`, obsługa ESC, preferencja reduced motion.

## Stack technologiczny

- HTML5 jako entrypoint aplikacji.
- CSS z podziałem na tokeny, bazę, layout, komponenty i widoki.
- JavaScript ES Modules bez frameworka frontendowego.
- Hash routing oparty o `window.location.hash`.
- `localStorage` jako lokalna warstwa persystencji danych demo.
- Service Worker i Web App Manifest dla trybu PWA.
- PostCSS + cssnano do budowy CSS.
- Terser do minifikacji JS.
- `serve` do lokalnego uruchamiania projektu.

## Struktura projektu

```text
flowdesk/
  assets/
    fonts/                 # lokalne fonty Inter
    icons/                 # ikony PWA
  css/
    base.css               # reset, fonty, focus, globalne reguły
    components.css         # przyciski, pola, karty, badge, modal, drawer, toast
    layout.css             # shell aplikacji, topbar, sidebar, kontenery
    style.css              # główny plik importujący CSS
    style.min.css          # zbudowany/minifikowany CSS
    tokens.css             # design tokens, kolory, spacing, font sizes, z-index
    views.css              # style widoków biznesowych
  js/
    components/            # sidebar, topbar, modal, drawer, table, toast, form controls
    core/                  # auth, router, store, helpery DOM
    data/                  # dane startowe demo
    utils/                 # formatowanie, storage, walidatory
    views/                 # widoki aplikacji
    main.js                # bootstrap aplikacji, shell, rejestracja service workera
  404.html
  _redirects               # konfiguracja redirectów pod hosting statyczny, np. Netlify
  index.html
  manifest.webmanifest
  offline.html
  package.json
  postcss.config.js
  robots.txt
  service-worker.js
  sitemap.xml
```

## Architektura aplikacji

Aplikacja jest zorganizowana jako statyczna SPA z modułami ES. `index.html` ładuje `css/style.css` i `js/main.js`. Bootstrap w `main.js` odpowiada za ustawienie motywu, wyrenderowanie shell layoutu, obsługę topbara, sidebaru, drawera, szybkiego dodawania, wylogowania oraz rejestrację service workera.

Routing znajduje się w `js/core/router.js`. Aktualna ścieżka jest odczytywana z hash fragmentu URL, np. `#/dashboard`. Router sprawdza sesję demo z `js/core/auth.js`; jeśli użytkownik nie jest zalogowany, przekierowuje na `#/login`.

Stan aplikacji znajduje się w `js/core/store.js`. Store przechowuje kolekcje `clients`, `projects`, `events` oraz `ui`, a następnie zapisuje je w `localStorage` pod kluczem `flowdesk_state_v1`. Sesja demo jest zapisywana oddzielnie pod kluczem `flowdesk_session_v1`.

Widoki w `js/views/` renderują HTML bezpośrednio do kontenera i samodzielnie podpinają event listenery. Ten model jest wystarczający dla obecnego rozmiaru projektu, ale przy rozbudowie warto wydzielić wspólne komponenty formularzy, bezpieczne renderowanie danych użytkownika, selektory store'a oraz warstwę domenową.

## Dostępne trasy

| Trasa | Widok | Opis |
| --- | --- | --- |
| `#/login` | `loginView.js` | Logowanie demo i walidacja formularza. |
| `#/dashboard` | `dashboardView.js` | KPI, najbliższe działania i ostatnie zlecenia. |
| `#/clients` | `clientsView.js` | Lista klientów, filtrowanie, sortowanie, CRUD i szczegóły. |
| `#/projects` | `projectsView.js` | Kanban zleceń, filtrowanie, CRUD. |
| `#/calendar` | `calendarView.js` | Lista wydarzeń powiązanych z klientami i zleceniami. |
| `#/settings` | `settingsView.js` | Preferencje, eksport danych, reset danych demo. |

## Model danych demo

### Client

```js
{
  id: 'c1',
  name: 'Nova Studio',
  email: 'hello@novastudio.pl',
  phone: '+48 605 010 120',
  status: 'Aktywny',
  notes: 'Stały klient od 2022. Preferuje kontakt mailowy.'
}
```

### Project

```js
{
  id: 'p1',
  name: 'Wdrożenie panelu klienta',
  clientId: 'c1',
  status: 'In progress',
  priority: 'High',
  dueDate: 'ISO date',
  notes: 'Oczekuje na feedback do makiet.'
}
```

### Event

```js
{
  id: 'e1',
  title: 'Weekly status call',
  date: 'ISO date',
  clientId: 'c1',
  projectId: 'p1'
}
```

### UI preferences

```js
{
  theme: 'light',
  reducedMotion: false
}
```

## Uruchomienie lokalne

Wymagania:

- Node.js LTS.
- npm.

Instalacja zależności:

```bash
npm install
```

Uruchomienie lokalnego serwera:

```bash
npm run dev
```

Projekt należy uruchamiać przez lokalny serwer HTTP. Otwieranie `index.html` bezpośrednio przez `file://` nie jest zalecane, ponieważ aplikacja korzysta ze ścieżek absolutnych, modułów ES i service workera.

## Komendy npm

| Komenda | Opis |
| --- | --- |
| `npm run dev` | Uruchamia statyczny serwer przez `serve`. |
| `npm run build:css` | Buduje `css/style.min.css` przez PostCSS i cssnano. |
| `npm run build:js` | Minifikuje `js/main.js` przez Terser. Obecnie nie bundluje całego drzewa modułów. |
| `npm run images` | Kompresuje obrazy z `assets/images/*` do WebP, jeśli taki katalog istnieje. |

## Uwierzytelnianie demo

Logowanie jest jawnie demonstracyjne i znajduje się w `js/core/auth.demo.js`. Plik `js/core/auth.js` jest tylko kompatybilną fasadą dla obecnego importu `auth`.

Aplikacja nie sprawdza użytkownika po stronie serwera. Wymaga jedynie poprawnego formatu emaila i hasła o długości minimum 6 znaków. Po zalogowaniu zapisuje przykładową sesję w `localStorage`.

To rozwiązanie nadaje się wyłącznie do prototypu. W wersji produkcyjnej konieczne będą prawdziwa autoryzacja, sesje lub tokeny, kontrola ról, ochrona danych oraz backend.

## Bezpieczeństwo i granice demo

FlowDesk jest aplikacją frontend-only. `localStorage` nie jest bezpiecznym miejscem na dane poufne, tokeny ani sekrety. Obecny store traktuje dane z `localStorage` jako niezaufane: stan przechodzi przez migrację, walidację domenową i reguły spójności przed zapisem oraz odczytem.

Dane renderowane z formularzy, seedów i odzyskanego `localStorage` są escapowane helperami `escapeHTML`, `escapeAttribute` i `safeText`. Toasty renderują tekst przez `textContent`, a payloady HTML są wyświetlane jako tekst, nie jako wykonywalny DOM.

`index.html` zawiera konserwatywną meta Content Security Policy dla hostingu statycznego: lokalne moduły JS, lokalny CSS, fonty, manifest, service worker i obrazy z tego samego originu. Produkcyjny hosting powinien przenieść CSP do nagłówków HTTP i rozszerzyć ją o docelowe domeny API, monitoring oraz politykę raportowania.

Eksport JSON jest generowany jako `Blob` z aplikacyjnego stanu, a wewnętrzny punkt restore/import przechodzi przez akcje domenowe i migracje. Nie istnieje jeszcze publiczny UI importu JSON.

Wersja produkcyjna wymaga backendowego uwierzytelniania, autoryzacji, bezpiecznej persystencji, walidacji po stronie serwera, nagłówków bezpieczeństwa na hostingu, ochrony przed CSRF tam, gdzie pojawią się cookies, oraz kontroli uprawnień dla danych organizacji.

## PWA i offline

`service-worker.js` cache'uje app-shell, pliki CSS, JS, fonty, ikony i `offline.html`. Dla żądań nawigacyjnych próbuje pobrać stronę z sieci, a przy braku połączenia zwraca fallback offline. Dla pozostałych requestów używa strategii cache-first.

Przy dalszym rozwoju trzeba pamiętać o aktualizacji listy `APP_SHELL` po dodaniu nowych plików. Docelowo warto rozważyć generowanie manifestu cache automatycznie w buildzie.

## Dostępność

Projekt ma dobre podstawy dostępności, ale wymaga pełnego audytu przed uznaniem go za gotowy produkt. Obecnie istnieją:

- skip link do głównej treści,
- style focus-visible,
- obsługa `prefers-reduced-motion`,
- modal z `role="dialog"` i `aria-modal="true"`,
- obsługa ESC w modalu,
- etykiety pól formularzy,
- podstawowe komunikaty błędów walidacji.

Do dopracowania pozostają m.in. focus management po zamykaniu modali, aria-live dla toastów, spójna semantyka tabel/akcji, obsługa klawiatury w menu użytkownika i testy automatyczne dostępności.

## Obecne ograniczenia

- Brak testów jednostkowych, integracyjnych i e2e.
- Brak lintingu, formatowania, kontroli typów i CI.
- Brak lockfile, więc instalacje zależności mogą nie być w pełni powtarzalne.
- Brak bundlera; `build:js` minifikuje tylko entrypoint i nie buduje kompletnej paczki aplikacji.
- Dane użytkownika są escapowane po stronie frontendu, ale przed produkcją nadal potrzebna jest walidacja serwerowa i hosting-level security headers.
- Auth jest tylko demonstracyjny i nie stanowi mechanizmu bezpieczeństwa.
- `localStorage` ma walidację i migracje, ale nie jest bezpieczną persystencją dla danych produkcyjnych.
- Lista plików service workera jest utrzymywana ręcznie.
- Brak observability, monitoringu błędów i release processu.
- Część logiki formularzy i renderowania powtarza się w widokach.

## Kierunek rozwoju

Rekomendowany kierunek to najpierw ustabilizować fundamenty jakości i architektury, a dopiero potem rozbudowywać domenę produktową. Szczegółowa analiza i 10 priorytetów implementacyjnych znajdują się w `implementation-plan.md`. Roadmapa rozwoju projektu znajduje się w `plan.md`.

Najważniejsze pierwsze kroki:

1. Dodać powtarzalny toolchain: lockfile, lint, format, testy i CI.
2. Zabezpieczyć renderowanie danych i oddzielić logikę domenową od widoków.
3. Uporządkować store, modele danych, walidację i migracje `localStorage`.
4. Zbudować podstawowy system komponentów UI.
5. Przygotować aplikację pod backend, prawdziwe auth i deployment.

## Deployment

Projekt jest przygotowany jako statyczna aplikacja, więc może być hostowany np. na Netlify, Cloudflare Pages, GitHub Pages lub dowolnym serwerze statycznym. Plik `_redirects` sugeruje kompatybilność z Netlify.

Przed publikacją trzeba zmienić wartości produkcyjne w `index.html`, `sitemap.xml`, `robots.txt` i metadanych Open Graph, szczególnie `canonical`, `og:url` oraz `og:image`.

## Status projektu

FlowDesk jest aktualnie jakościowym prototypem startowym. Ma czytelną strukturę, realne przepływy CRUD, PWA i sensowny fundament UI. Nie jest jeszcze produktem gotowym na dane użytkowników ani pracę zespołową. Największa wartość kolejnych etapów będzie wynikała z profesjonalizacji procesu, testów, bezpieczeństwa, architektury danych i stopniowej rozbudowy funkcji domenowych.
