# FleetOps — Technical Front-End Audit

## 1. Short overall assessment

EN:
FleetOps is a well-structured static SaaS demo with a clear source/build split, hash routing, browser-side state, local demo data, route protection for `/app`, and focused Playwright smoke coverage. No P0 or P1 risks were detected from the current source audit. The main issues are low-risk consistency refinements around demo-stubbed controls and metadata portability. Contrast compliance cannot be verified without computed style analysis.

PL:
FleetOps jest dobrze uporządkowanym statycznym projektem demo typu SaaS, z czytelnym podziałem na źródła i build, routingiem hash-based, stanem po stronie przeglądarki, lokalnymi danymi demo, ochroną tras `/app` oraz celowanymi testami smoke w Playwright. W aktualnym audycie źródeł nie wykryto ryzyk P0 ani P1. Główne uwagi dotyczą niskiego ryzyka: spójności kontrolek demonstracyjnych i przenośności metadanych. Zgodności kontrastu nie da się potwierdzić bez analizy stylów wyliczonych.

## 2. Strengths

EN:
- Source/build discipline is explicit: `build-dist.js` builds CSS from `styles/src/*`, rewrites `index.html` and `404.html` to `/styles/main.min.css`, minifies active scripts found in `index.html`, copies deploy metadata, and excludes `assets/img-src` from `dist` (`build-dist.js:10-24`, `build-dist.js:87-188`).
- Accessibility basics are implemented in real code: skip link and route live region (`index.html:86-87`), focus-visible styles (`styles/src/01-base.css:45-56`), mobile/app drawer focus trapping (`scripts/ui/layoutLanding.js:253-293`, `scripts/ui/layoutApp.js:223-259`), modal and drawer focus restoration (`scripts/ui/components/modal.js:18-109`, `scripts/ui/components/recordDrawer.js:58-205`), and field-to-error association helpers (`scripts/utils/dom.js:55-88`).
- Dynamic record output is mostly rendered through escaping or text nodes before being inserted into HTML. Orders, fleet cards, drivers, delete confirmations, and toast messages use `escapeHtml`, `textContent`, or `document.createTextNode` (`scripts/ui/views/ordersView.js:455-473`, `scripts/ui/views/fleetView.js:436-455`, `scripts/ui/views/driversView.js:455-464`, `scripts/ui/components/toast.js:37-47`).
- Routing and demo permissions are coherent for a static app: app routes require local auth and preserve return targets (`scripts/router.js:214-234`), route changes update `aria-current`, announce the view, and reset scroll (`scripts/router.js:88-121`, `scripts/router.js:148-162`, `scripts/router.js:305-307`), while role checks and blocking feedback live in a central permission module (`scripts/core/permissions.js:54-105`).
- Performance-oriented asset handling is visible: local Inter font with `font-display: swap` (`styles/src/00-settings.css:1-6`), hero AVIF/WebP/JPG variants with dimensions and high fetch priority (`scripts/ui/layoutLanding.js:404-416`), a service worker with shell caching and stale-while-revalidate for static assets (`sw.js:3-60`), and long-lived asset caching headers (`_headers:9-12`).
- Tests cover important user-facing behavior: route scroll reset, mobile drawer routing, dropdown disclosure behavior, field validation linkage, and HTML-like text escaping in CRUD flows (`tests/smoke.spec.js:130-164`, `tests/smoke.spec.js:225-255`, `tests/smoke.spec.js:385-426`).

PL:
- Dyscyplina źródła i buildu jest jawna: `build-dist.js` buduje CSS z `styles/src/*`, przepisuje `index.html` i `404.html` na `/styles/main.min.css`, minifikuje aktywne skrypty znalezione w `index.html`, kopiuje metadane wdrożeniowe i wyklucza `assets/img-src` z `dist` (`build-dist.js:10-24`, `build-dist.js:87-188`).
- Podstawy dostępności są zaimplementowane w realnym kodzie: skip link i live region dla tras (`index.html:86-87`), style `focus-visible` (`styles/src/01-base.css:45-56`), pułapki fokusu w drawerach mobilnych i aplikacyjnych (`scripts/ui/layoutLanding.js:253-293`, `scripts/ui/layoutApp.js:223-259`), przywracanie fokusu w modalach i drawerach (`scripts/ui/components/modal.js:18-109`, `scripts/ui/components/recordDrawer.js:58-205`) oraz helpery łączące pola formularzy z błędami (`scripts/utils/dom.js:55-88`).
- Dynamiczne dane rekordów są w większości renderowane przez escapowanie albo węzły tekstowe przed wstawieniem do HTML. Zlecenia, karty floty, kierowcy, potwierdzenia usunięcia i toasty używają `escapeHtml`, `textContent` albo `document.createTextNode` (`scripts/ui/views/ordersView.js:455-473`, `scripts/ui/views/fleetView.js:436-455`, `scripts/ui/views/driversView.js:455-464`, `scripts/ui/components/toast.js:37-47`).
- Routing i uprawnienia demo są spójne jak na aplikację statyczną: trasy aplikacji wymagają lokalnego logowania i zapamiętują ścieżkę powrotu (`scripts/router.js:214-234`), zmiany tras aktualizują `aria-current`, ogłaszają widok i resetują scroll (`scripts/router.js:88-121`, `scripts/router.js:148-162`, `scripts/router.js:305-307`), a logika ról i komunikaty blokujące są w centralnym module uprawnień (`scripts/core/permissions.js:54-105`).
- Widać świadome podejście do wydajności assetów: lokalny font Inter z `font-display: swap` (`styles/src/00-settings.css:1-6`), warianty hero AVIF/WebP/JPG z wymiarami i wysokim priorytetem pobrania (`scripts/ui/layoutLanding.js:404-416`), service worker z cache shella i stale-while-revalidate dla assetów statycznych (`sw.js:3-60`) oraz długie cache dla `/assets/*` w nagłówkach (`_headers:9-12`).
- Testy obejmują istotne zachowania użytkownika: reset scrolla przy trasach, routing w drawerze mobilnym, semantykę dropdownów, powiązanie walidacji z polami i bezpieczne renderowanie tekstu podobnego do HTML w CRUD (`tests/smoke.spec.js:130-164`, `tests/smoke.spec.js:225-255`, `tests/smoke.spec.js:385-426`).

## 3. P0 — Critical risks

EN:
none detected.

PL:
nie wykryto.

## 4. P1 — Important issues worth fixing next

EN:
none detected.

PL:
nie wykryto.

## 5. P2 — Minor refinements

EN:
- Orders CSV export has an implementation that is unreachable in the current UI. `exportOrders` creates a CSV blob (`scripts/ui/views/ordersView.js:603-615`), but `#exportOrders` is immediately disabled and its click handler only shows a demo-permission warning (`scripts/ui/views/ordersView.js:617-624`). Keeping both paths increases maintenance noise and can confuse future work.
- Homepage canonical and Open Graph URL differ only by trailing slash. The canonical URL is `https://saas-pr02-fleetops.netlify.app/`, while `og:url` omits the slash (`index.html:12-19`). This is minor, but aligning them removes a small SEO/social metadata inconsistency.
- Manifest shortcut icon paths are less portable than the rest of the manifest. Core icons and screenshots use root-relative `src` values (`assets/favicon/site.webmanifest:12-45`), while shortcut icons use absolute production URLs (`assets/favicon/site.webmanifest:52-87`). This works for the declared Netlify domain, but root-relative shortcut icons would be more consistent for local previews and alternate static hosts.

PL:
- Eksport CSV zleceń ma implementację, która jest obecnie nieosiągalna z interfejsu. `exportOrders` tworzy blob CSV (`scripts/ui/views/ordersView.js:603-615`), ale `#exportOrders` jest od razu wyłączony, a jego handler pokazuje tylko ostrzeżenie o braku uprawnień w demo (`scripts/ui/views/ordersView.js:617-624`). Utrzymywanie obu ścieżek zwiększa szum utrzymaniowy i może mylić przy kolejnych zmianach.
- Canonical homepage i Open Graph URL różnią się tylko końcowym ukośnikiem. Canonical wskazuje `https://saas-pr02-fleetops.netlify.app/`, a `og:url` pomija ukośnik (`index.html:12-19`). To drobna uwaga, ale ujednolicenie usuwa małą niespójność SEO/social metadata.
- Ścieżki ikon skrótów w manifeście są mniej przenośne niż reszta manifestu. Główne ikony i screenshoty używają ścieżek root-relative (`assets/favicon/site.webmanifest:12-45`), a ikony skrótów używają absolutnych URL-i domeny produkcyjnej (`assets/favicon/site.webmanifest:52-87`). Działa to dla zadeklarowanej domeny Netlify, ale ścieżki root-relative byłyby spójniejsze dla lokalnego podglądu i innych statycznych hostów.

## 6. Extra quality improvements

EN:
- If public marketing routes become SEO targets, consider generating static route-level HTML or updating canonical/Open Graph/Twitter metadata per route. The current marketing shell updates only `document.title` and the meta description at runtime (`scripts/ui/marketingPages.js:1-5`, `scripts/ui/marketingPages.js:21-23`), which is acceptable for a hash-routed static demo but limited for share previews.
- Before making hard WCAG contrast claims, run computed-style contrast checks against the light and dark token combinations. Source tokens and focus styles are present, but contrast compliance cannot be verified from static token definitions alone (`styles/src/00-settings.css:13-28`, `styles/src/01-base.css:45-56`).
- Verify deployment CSP behavior for the inline JSON-LD block if strict production CSP is a priority. The project declares inline JSON-LD (`index.html:33-75`) and a Netlify CSP with `script-src 'self'` (`_headers:7`); whether this affects structured-data processing should be checked in the deployed browser context before changing the policy.
- If CSV export is re-enabled later, quote CSV cells and consider formula-injection hardening before downloading user-edited local data. The current helper joins raw fields with commas (`scripts/ui/views/ordersView.js:603-607`), but the UI currently keeps export disabled (`scripts/ui/views/ordersView.js:617-624`).

PL:
- Jeśli publiczne trasy marketingowe mają stać się celami SEO, warto rozważyć generowanie statycznego HTML per trasa albo aktualizowanie canonical/Open Graph/Twitter dla każdej trasy. Obecny shell marketingowy zmienia w runtime tylko `document.title` i meta description (`scripts/ui/marketingPages.js:1-5`, `scripts/ui/marketingPages.js:21-23`), co jest akceptowalne dla statycznego demo z routingiem hash-based, ale ograniczone dla podglądów udostępniania.
- Przed deklarowaniem pełnej zgodności kontrastu z WCAG warto uruchomić kontrolę kontrastu na stylach wyliczonych dla jasnych i ciemnych kombinacji tokenów. Tokeny i style fokusu są obecne, ale same definicje statyczne nie pozwalają potwierdzić zgodności kontrastu (`styles/src/00-settings.css:13-28`, `styles/src/01-base.css:45-56`).
- Jeśli restrykcyjny CSP produkcyjny jest priorytetem, warto zweryfikować zachowanie wdrożeniowe dla inline JSON-LD. Projekt deklaruje inline JSON-LD (`index.html:33-75`) i Netlify CSP z `script-src 'self'` (`_headers:7`); wpływ na przetwarzanie danych strukturalnych należy sprawdzić w realnym kontekście przeglądarki przed zmianą polityki.
- Jeśli eksport CSV zostanie później włączony, warto cytować komórki CSV i rozważyć ochronę przed formułami w danych edytowanych lokalnie przez użytkownika. Obecny helper łączy surowe pola przecinkami (`scripts/ui/views/ordersView.js:603-607`), ale interfejs aktualnie trzyma eksport wyłączony (`scripts/ui/views/ordersView.js:617-624`).

## 7. Senior rating (1–10)

EN:
8.4/10. FleetOps is stronger than a typical static portfolio demo because it has a coherent architecture, explicit build pipeline, modular CSS, route cleanup, guarded demo permissions, local persistence, accessibility-focused components, and smoke tests for key flows. The score is held back mainly by small demo-control inconsistencies, limited route-level metadata for marketing pages, and the lack of computed accessibility/contrast verification in the project.

PL:
8.4/10. FleetOps jest mocniejszy niż typowe statyczne demo portfolio, bo ma spójną architekturę, jawny pipeline build, modularny CSS, cleanup przy zmianie tras, kontrolę uprawnień demo, lokalną persystencję, komponenty projektowane z myślą o dostępności i testy smoke dla kluczowych przepływów. Wynik ograniczają głównie drobne niespójności kontrolek demo, ograniczone metadata per trasa marketingowa oraz brak projektowej weryfikacji dostępności/kontrastu na stylach wyliczonych.
