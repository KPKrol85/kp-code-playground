# Audit Resolved

Krotkie notki o sprawach zamknietych po audycie.

Format wpisu: `YYYY-MM-DD - [Priorytet] Temat: krotki opis dowodu lub decyzji.`

## Resolved

- 2026-05-20 - [P1] Bezpieczne renderowanie shell/toast: `scripts/ui/layoutApp.js` escapuje dane uzytkownika przez `window.FleetUI.escapeHtml`, a `scripts/ui/components/toast.js` renderuje komunikaty przez `document.createTextNode`.

- 2026-05-20 - [P1] Spojna domena produkcyjna: `index.html`, `404.html`, `sitemap.xml`, `robots.txt` i `assets/favicon/site.webmanifest` wskazuja `https://saas-pr02-fleetops.netlify.app`.

- 2026-05-20 - [P2] Accordion ARIA: `scripts/ui/components/accordion.js` synchronizuje `aria-expanded`, `aria-controls` i stabilne ID paneli akordeonu.

- 2026-05-20 - [P2] Marketing markup quotes: `scripts/ui/marketingPages.js` ma usuniete nadmiarowe cudzyslowy w `class="grid marketing-grid"`.

- 2026-05-20 - [P2] Service worker registration: `sw.js` zostal zweryfikowany i jest rejestrowany progresywnie z `scripts/main.js`.

- 2026-05-20 - [P2] Heading hierarchy: app routes maja route-level `h1`, glowne sekcje widokow `h2`, a karty i zagniezdzone grupy `h3`.

- 2026-05-20 - [P2] Smoke tests: dodano minimalne testy Playwright dla landing/login, routingu aplikacji, CRUD zlecen i bezpiecznego renderowania tekstu.
