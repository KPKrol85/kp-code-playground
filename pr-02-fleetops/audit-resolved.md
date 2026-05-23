# Audit Resolved

Krotkie notki o sprawach zamknietych po audycie.

Format wpisu: `YYYY-MM-DD - [Priorytet] Temat: krotki opis dowodu lub decyzji.`

## Resolved

- 2026-05-23 - [P1] Dropdown disclosure semantics: `layoutApp.js`, `layoutLanding.js`, `marketingPages.js`, `dashboardView.js`, `ordersView.js`, `fleetView.js` i `driversView.js` nie renderuja juz niepelnej semantyki ARIA menu; triggery zachowuja `aria-expanded`/`aria-controls`, a zawartosc pozostaje natywnymi linkami, buttonami i kontrolkami. Zweryfikowano targeted `rg` dla `role="menu"` / `aria-haspopup="menu"` / `role="menuitem"` oraz `npm run test:smoke` z regresja Escape i brakiem pulapki fokusu.

- 2026-05-22 - [P1] Dostepny feedback dynamiczny: `scripts/ui/components/toast.js` ma stale regiony live `role="status"` i `role="alert"` z `aria-live` oraz `aria-atomic`, blokujace komunikaty w `scripts/router.js`, `scripts/core/permissions.js`, `scripts/ui/marketingPages.js` i `scripts/ui/views/ordersView.js` sa oznaczane jako assertive, a formularze CRUD w `ordersView.js`, `fleetView.js` i `driversView.js` lacza pola z bledami przez stabilne ID i `aria-describedby` przy minimalnych helperach w `scripts/utils/dom.js`. Zweryfikowano `npm run test:smoke` oraz targeted `rg`; dokladny wpis P1 zostal usuniety z `daily-AUDIT.md`.

- 2026-05-20 - [P1] Bezpieczne renderowanie shell/toast: `scripts/ui/layoutApp.js` escapuje dane uzytkownika przez `window.FleetUI.escapeHtml`, a `scripts/ui/components/toast.js` renderuje komunikaty przez `document.createTextNode`.

- 2026-05-20 - [P1] Spojna domena produkcyjna: `index.html`, `404.html`, `sitemap.xml`, `robots.txt` i `assets/favicon/site.webmanifest` wskazuja `https://saas-pr02-fleetops.netlify.app`.

- 2026-05-22 - [P1] Manifest shortcuts zgodne z hash routerem: `assets/favicon/site.webmanifest` uzywa `/#/app`, `/#/app/fleet` i `/#/app/orders` dla skrotow PWA.

- 2026-05-22 - [P2] Manifest screenshot paths: `assets/favicon/site.webmanifest` uzywa root-relative `src` dla screenshotow, zeby dzialaly lokalnie i produkcyjnie.

- 2026-05-22 - [P2] Open Graph asset map: `IMAGE-ASSET-PIPELINE-MAP.md` wskazuje `.jpg` dla `assets/og-img/og-1200x1200.jpg` i `og-1200x630.jpg`.

- 2026-05-20 - [P2] Accordion ARIA: `scripts/ui/components/accordion.js` synchronizuje `aria-expanded`, `aria-controls` i stabilne ID paneli akordeonu.

- 2026-05-20 - [P2] Marketing markup quotes: `scripts/ui/marketingPages.js` ma usuniete nadmiarowe cudzyslowy w `class="grid marketing-grid"`.

- 2026-05-20 - [P2] Service worker registration: `sw.js` zostal zweryfikowany i jest rejestrowany progresywnie z `scripts/main.js`.

- 2026-05-20 - [P2] Heading hierarchy: app routes maja route-level `h1`, glowne sekcje widokow `h2`, a karty i zagniezdzone grupy `h3`.

- 2026-05-20 - [P2] Smoke tests: dodano minimalne testy Playwright dla landing/login, routingu aplikacji, CRUD zlecen i bezpiecznego renderowania tekstu.
