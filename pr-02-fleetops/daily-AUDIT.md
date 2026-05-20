# FleetOps Daily Front-End Audit

## EN

### 1. Short Overall Assessment

FleetOps is a well-structured static SaaS reference project with clear separation between source CSS, JavaScript modules, demo state, runtime assets, and generated production output. The implementation shows serious front-end craft: hash routing, local persistence, demo RBAC, accessible modal/drawer patterns, reduced-motion handling, image optimization, and a build pipeline are all visible in source. The main issues are not architectural failures, but remaining hardening and consistency gaps around shell-rendered local data and production metadata.

Documentation read: `README.md` and `IMAGE-ASSET-PIPELINE-MAP.md`. `AUDIT.md`, `settings.md`, and `CSS-ARCHITECTURE-MAP.md` are not detected in project.

### 2. Strengths

- Clear static architecture: `index.html` loads ordered source scripts, `scripts/router.js` owns hash routing, `scripts/state/store.js` owns local state, and `scripts/ui/views/` contains feature views.
- Build pipeline is explicit and conservative: `build-dist.js` creates `dist/`, minifies CSS/active JS, copies runtime assets, and excludes `assets/img-src/`.
- Accessibility foundations are real: skip link in `index.html`, `<noscript>` fallback, focus trapping in `scripts/ui/components/modal.js`, mobile drawer focus trapping in layout files, visible focus styles, and `aria-current` route updates.
- CSS source is modular and tokenized through `styles/main.css` imports and `styles/src/00-settings.css` design tokens.
- Motion reduction is implemented in source CSS through multiple `prefers-reduced-motion` blocks.
- Image handling is production-aware: local font preload, hero `picture` with AVIF/WebP/JPG, explicit hero dimensions, `fetchpriority="high"`, and a `sharp` optimization script.
- Static hosting basics are present: `_redirects`, `_headers`, `robots.txt`, `sitemap.xml`, manifest, favicons, and a static `404.html`.
- User-editable orders/fleet/drivers render paths now use `FleetUI.escapeHtml()` in the relevant source views.
- TODO/FIXME/debugger markers and obvious committed secrets are not detected in project. Console usage is limited to build/error logging and local storage cleanup warnings.

### 3. P0 - Critical Risks

none detected

### 4. P1 - Important Issues Worth Fixing Next

- **App shell still renders locally persisted user/session values through raw HTML.** `scripts/ui/layoutApp.js:67`, `scripts/ui/layoutApp.js:99`, and `scripts/ui/layoutApp.js:100` interpolate `auth.user.email`, `auth.user.name`, and `currentUser.displayName/currentUser.role` into `innerHTML`. Those values can come from login input or `localStorage`. `scripts/ui/components/toast.js:13` also interpolates toast `message` into `innerHTML`. This is the same class of render-time HTML injection risk already addressed in order/fleet/driver views; fix by escaping shell/user/toast text at render time or using text nodes.
- **Production hostname metadata is inconsistent.** `index.html` and `404.html` use `https://saas-pr02-fleetops.netlify.app` for canonical, Open Graph, and Twitter metadata, while `sitemap.xml` uses `https://transport-project-02.netlify.app` and `assets/favicon/site.webmanifest` uses `https://transport-project-02.netlify.app` for screenshots and shortcut icons. `robots.txt` points the sitemap to the `saas-pr02-fleetops` hostname. This can split SEO/PWA signals across two domains.

### 5. P2 - Minor Refinements

- **Accordion state is not exposed with ARIA.** `scripts/ui/components/accordion.js` toggles `.open` and `maxHeight`, but does not set `aria-expanded`, `aria-controls`, or stable content IDs for accordion buttons/content. The controls are native buttons, so this is a refinement rather than a blocker.
- **Malformed extra quote appears in marketing markup.** `scripts/ui/marketingPages.js:455`, `scripts/ui/marketingPages.js:960`, and `scripts/ui/marketingPages.js:1014` contain `<div class="grid marketing-grid"">`. Browsers will usually recover, but it is invalid source markup and should be cleaned up.
- **Service worker source exists but registration is not detected in project.** `sw.js` defines install/activate/fetch handlers, but no `navigator.serviceWorker.register(...)` call is detected in `index.html` or source scripts. If offline/PWA caching is expected, the worker is currently inactive.

### 6. Extra Quality Improvements

- Add one stable per-route primary heading strategy for app views. The app shell currently renders the view title as `h2` and module headers commonly start at `h3`; this is acceptable for a dashboard shell, but a route-level `h1` would strengthen semantics.
- Consider adding a small automated smoke test for the known demo flows: login, route navigation, create/edit/delete record, and escaped text rendering. No test runner is configured beyond `npm test` aliasing the production build.
- JSON-LD is not detected in project. This is not a defect for this SPA-style portfolio project, but a single Organization/WebSite schema could be an optional SEO enhancement if the canonical production domain is settled first.

### 7. Senior Rating

**8/10.** The project is above typical portfolio-demo quality: modular source structure, static deployment discipline, accessibility work, image pipeline, and local app behavior are all implemented with care. The score is held back by remaining render-time escaping gaps in the app shell/toast layer and inconsistent production-domain metadata, both of which are concrete but contained fixes.

---

## PL

### 1. Krótka Ocena Ogólna

FleetOps to dobrze uporządkowany statyczny projekt referencyjny SaaS z czytelnym podziałem na źródłowy CSS, moduły JavaScript, stan demo, assety runtime i generowany output produkcyjny. W implementacji widać solidny warsztat frontendowy: hash routing, lokalną persystencję, demo RBAC, dostępne modale i drawery, obsługę reduced motion, optymalizację obrazów oraz pipeline builda. Główne problemy nie są awariami architektury, tylko pozostałymi lukami w hardeningu danych lokalnych i spójności metadanych produkcyjnych.

Przeczytana dokumentacja: `README.md` i `IMAGE-ASSET-PIPELINE-MAP.md`. `AUDIT.md`, `settings.md` oraz `CSS-ARCHITECTURE-MAP.md`: not detected in project.

### 2. Mocne Strony

- Czytelna architektura statyczna: `index.html` ładuje skrypty źródłowe w kolejności, `scripts/router.js` obsługuje hash routing, `scripts/state/store.js` obsługuje stan lokalny, a `scripts/ui/views/` zawiera widoki funkcjonalne.
- Pipeline builda jest jawny i konserwatywny: `build-dist.js` tworzy `dist/`, minifikuje CSS/aktywne JS, kopiuje assety runtime i wyklucza `assets/img-src/`.
- Dostępność ma realne podstawy: skip link w `index.html`, fallback `<noscript>`, focus trap w `scripts/ui/components/modal.js`, focus trap drawerów mobilnych, widoczne focus styles oraz aktualizacja `aria-current`.
- CSS jest modularny i oparty o tokeny przez importy w `styles/main.css` oraz tokeny w `styles/src/00-settings.css`.
- Redukcja ruchu jest zaimplementowana w źródłowym CSS przez kilka bloków `prefers-reduced-motion`.
- Obsługa obrazów jest przygotowana produkcyjnie: preload lokalnego fontu, hero `picture` z AVIF/WebP/JPG, jawne wymiary hero, `fetchpriority="high"` oraz skrypt optymalizacji przez `sharp`.
- Podstawy hostingu statycznego są obecne: `_redirects`, `_headers`, `robots.txt`, `sitemap.xml`, manifest, favicony i statyczny `404.html`.
- Ścieżki renderowania edytowalnych danych orders/fleet/drivers używają już `FleetUI.escapeHtml()` w odpowiednich widokach źródłowych.
- TODO/FIXME/debugger oraz oczywiste sekrety w repozytorium nie zostały wykryte. Użycie console ogranicza się do logowania builda, błędów storage i cleanup.

### 3. P0 - Ryzyka Krytyczne

none detected

### 4. P1 - Ważne Problemy Do Naprawy W Następnej Kolejności



### 5. P2 - Drobne Usprawnienia

- **Plik service workera istnieje, ale rejestracja nie została wykryta.** `sw.js` definiuje obsługę install/activate/fetch, ale w `index.html` ani skryptach źródłowych nie wykryto `navigator.serviceWorker.register(...)`. Jeżeli oczekiwane jest cache/offline PWA, worker obecnie nie jest aktywny.

### 6. Dodatkowe Ulepszenia Jakościowe

- Rozważyć jedną stabilną strategię głównego nagłówka dla tras aplikacyjnych. App shell renderuje tytuł widoku jako `h2`, a nagłówki modułów często zaczynają się od `h3`; dla dashboardu jest to akceptowalne, ale route-level `h1` wzmocniłby semantykę.

- Dodać mały smoke test dla kluczowych flow demo: logowanie, nawigacja, create/edit/delete rekordów i renderowanie escapowanego tekstu. Obecnie `npm test` jest aliasem do builda produkcyjnego.

- JSON-LD: not detected in project. To nie jest defekt dla tego portfolio/SPAle, ale pojedynczy schemat Organization/WebSite może być opcjonalnym ulepszeniem SEO po ustaleniu jednej kanonicznej domeny.

### 7. Ocena Seniorska

**8/10.** Projekt jest wyraźnie powyżej typowego poziomu demo portfolio: modularne źródła, dyscyplina statycznego deploymentu, praca nad dostępnością, pipeline obrazów i lokalne zachowania aplikacyjne są wykonane starannie. Ocenę obniżają pozostałe luki w escapowaniu app shell/toast oraz niespójne domeny w metadanych produkcyjnych; oba problemy są konkretne, ale ograniczone zakresem.
