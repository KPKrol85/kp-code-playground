# TransLogix — Daily Front-End Audit

## 1. Short overall assessment

TransLogix is a credible static multi-page front-end project with modular CSS/JS, realistic transport/logistics content on most business pages, SEO metadata, JSON-LD, deployment files, a service worker, and automated QA scripts. The implementation is stronger than a throwaway static site, but the current source still has production-readiness gaps: HTML validation currently fails on real source files, and some QA tooling scans too broadly or measures incomplete assets.

Documentation read first: `README.md` was present and reviewed. `AUDIT.md`, `settings.md`, and `BUILD-PIPELINE.md`: not detected in project.

## 2. Strengths

- Multi-page static structure is clear and source-owned: root pages include `index.html`, `services.html`, `service.html`, `fleet.html`, `pricing.html`, `contact.html`, legal pages, `404.html`, and `offline.html`.
- CSS is split into focused source modules via `assets/css/style.css` imports: `settings`, `base`, `layout`, `components`, `utilities`, and `pages`.
- JavaScript is organized by behavior in `assets/js/`, with `main.js` importing modules for partials, navigation, theme, forms, tabs, filters, reveal behavior, lightbox, service detail, consent, and stats.
- Core page structure is mostly semantic: root pages use `main id="main"`, visible `h1` headings, section-level headings, and live regions for dynamic results or form feedback.
- Metadata coverage is strong on primary pages: title, description, robots, canonical, Open Graph, Twitter cards, and inline JSON-LD are present across the main source HTML pages.
- Deployment and runtime support are present: `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`, `assets/icons/site.webmanifest`, and `sw.js`.
- Accessibility foundations are visible in code: skip target via `main#main`, `:focus-visible` styles, ARIA state management for navigation/tabs/accordion, form error states with `aria-invalid`, and `aria-live` feedback.
- Reduced motion is considered in CSS and JS: `assets/css/modules/pages.css` contains `@media (prefers-reduced-motion: reduce)`, and `assets/js/reveal.js`, `assets/js/stats.js`, and `assets/js/site-consent.js` check reduced-motion preferences.
- Contact form uses Netlify form attributes plus honeypot protection in `contact.html`, and client-side validation allows native submit after validation.
- Local link check passes: `npm run qa:links` reports 11 scanned root HTML files with no broken local references.
- Secrets exposure: none detected in project.
- TODO/FIXME/debugger in source: none detected in project.

## 3. P0 — Critical risks

none detected.

## 4. P1 — Important issues worth fixing next

none detected.

## 5. P2 — Minor refinements

- **Performance budget checks do not measure the effective CSS/JS footprint.** `perf-budgets.json` budgets `assets/css/style.css` and `assets/js/main.js`; `npm run qa:budget` passes with `style.css` at 99 B gzip and `main.js` at 464 B gzip. Those files mostly import other CSS/JS modules, so the current budget check does not represent the actual loaded source module footprint or production CSS/JS payload.

- **Focused source HTML validation still has validator cleanup items.** The old real ARIA/button/lightbox defects are resolved, and lowercase `<!doctype html>` is accepted by configuration. The focused source validation command still fails on remaining `void-style` and `prefer-native-element` findings, which should be handled as separate validator policy or markup review work.

- **Some dynamic UI copy lacks Polish diacritics.** `assets/js/services-filters.js` renders strings like `Wyswietlono` and `Brak wynikow dla wybranych filtrow.` This is minor, but visible user-facing copy should match the professional Polish language standard used elsewhere.

- **Service worker precache focuses on core pages but omits some root pages.** `sw.js` precaches `/`, `index`, `services`, `fleet`, `pricing`, `contact`, `404`, and `offline`, but not `privacy.html`, `terms.html`, `cookies.html`, or `service.html`. Network-first navigation can cache visited pages, so this is a conscious lightweight cache shape rather than a defect; broader precache would improve offline consistency for legal/detail pages.

## 6. Extra quality improvements

- Add a source-only HTML validation script that excludes `dist/`, templates intended for build-time expansion, reports, and dependency folders.
- Decide whether the HTML style should be XHTML-like self-closing void tags or standard HTML omitted end tags, then align `.htmlvalidate.json` with that decision.
- Add JSON-LD validation to CI for pages that intentionally include structured data.
- Expand `pa11y-ci` coverage beyond the five configured URLs if legal/detail pages are expected to be audited before release.

## 7. Senior rating (1-10)

**7.2 / 10**

The project has a solid static architecture, credible multi-page scope, structured metadata, thoughtful modular CSS/JS, accessibility-aware patterns, and deployment/runtime files. The score is held back by failing source HTML validation with real ARIA/button/lightbox issues and QA tooling that currently gives misleading or noisy signals. These are fixable issues, not architecture collapse.

## 2026-05-06 update — P1 source HTML validation defects

The real source-level P1 validation defects were corrected in the active source files: invalid `aria-label` usage on generic containers, missing explicit `type="button"` on non-submit UI controls, and invalid static lightbox image markup with empty `src=""` and inline styles. Remaining HTML validation output should be reviewed separately as validator style/config scope, such as `doctype-style`, `void-style`, and generated/template scan noise.

## 2026-05-06 update — HTML validator doctype policy

The HTML validator configuration was aligned with the project's Prettier-style lowercase `<!doctype html>` formatting by setting `doctype-style` to lowercase. This was a validator policy alignment only; source HTML files were not changed for this item, and remaining `void-style` or `prefer-native-element` findings stay out of scope.

## 2026-05-06 update — asset verification scope

The asset verifier now scans project-owned source/public HTML contexts only: root source pages, `partials/`, `templates/`, and service worker precache URLs. Generated and third-party folders are excluded by path, including `node_modules`, `dist`, `playwright-report`, `test-results`, `coverage`, and `.git`. `npm run assets:verify` now passes and remains focused on real TransLogix asset references.

---

# TransLogix — Codzienny audyt front-endu

## 1. Krótka ocena ogólna

TransLogix to wiarygodny, statyczny, wielostronicowy projekt front-endowy z modułowym CSS/JS, realistyczną treścią transportowo-logistyczną na większości stron biznesowych, metadanymi SEO, JSON-LD, plikami wdrożeniowymi, service workerem i automatycznymi skryptami QA. Implementacja jest mocniejsza niż tymczasowa strona statyczna, ale obecne źródła nadal mają luki względem gotowości produkcyjnej: walidacja HTML obecnie nie przechodzi na realnych plikach źródłowych, a część narzędzi QA skanuje zbyt szeroko albo mierzy niepełne assety.

Dokumentacja przeczytana w pierwszej kolejności: `README.md` był obecny i został przejrzany. `AUDIT.md`, `settings.md` i `BUILD-PIPELINE.md`: nie wykryto w projekcie.

## 2. Mocne strony

- Wielostronicowa struktura statyczna jest czytelna i oparta na plikach źródłowych: strony główne obejmują `index.html`, `services.html`, `service.html`, `fleet.html`, `pricing.html`, `contact.html`, strony prawne, `404.html` i `offline.html`.
- CSS jest podzielony na skupione moduły źródłowe importowane przez `assets/css/style.css`: `settings`, `base`, `layout`, `components`, `utilities` i `pages`.
- JavaScript jest zorganizowany według zachowań w `assets/js/`, a `main.js` importuje moduły partiali, nawigacji, motywu, formularzy, zakładek, filtrów, reveal, lightboxa, szczegółów usługi, zgody i statystyk.
- Bazowa struktura stron jest w większości semantyczna: strony główne używają `main id="main"`, widocznych nagłówków `h1`, nagłówków sekcji oraz live regionów dla dynamicznych wyników albo komunikatów formularzy.
- Pokrycie metadanych jest mocne na głównych stronach: title, description, robots, canonical, Open Graph, Twitter cards i inline JSON-LD są obecne w głównych źródłowych plikach HTML.
- Obecne jest wsparcie wdrożeniowe i runtime: `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`, `assets/icons/site.webmanifest` i `sw.js`.
- Fundamenty dostępności są widoczne w kodzie: cel skip linka przez `main#main`, style `:focus-visible`, zarządzanie stanami ARIA dla nawigacji/zakładek/akordeonu, stany błędów formularza przez `aria-invalid` oraz feedback przez `aria-live`.
- Ograniczenie ruchu jest uwzględnione w CSS i JS: `assets/css/modules/pages.css` zawiera `@media (prefers-reduced-motion: reduce)`, a `assets/js/reveal.js`, `assets/js/stats.js` i `assets/js/site-consent.js` sprawdzają preferencję reduced motion.
- Formularz kontaktowy używa atrybutów Netlify Forms oraz zabezpieczenia honeypot w `contact.html`, a walidacja po stronie klienta pozwala na natywny submit po przejściu walidacji.
- Lokalny check linków przechodzi: `npm run qa:links` zgłasza 11 przeskanowanych głównych plików HTML bez zerwanych lokalnych referencji.
- Ekspozycja sekretów: nie wykryto w projekcie.
- TODO/FIXME/debugger w źródłach: nie wykryto w projekcie.

## 3. P0 — Ryzyka krytyczne

nie wykryto.

## 4. P1 — Ważne problemy do naprawy w następnej kolejności

nie wykryto.

## 5. P2 — Drobne usprawnienia

- **Checki budżetów wydajnościowych nie mierzą efektywnego footprintu CSS/JS.** `perf-budgets.json` ustawia budżety dla `assets/css/style.css` i `assets/js/main.js`; `npm run qa:budget` przechodzi z `style.css` na poziomie 99 B gzip i `main.js` na poziomie 464 B gzip. Te pliki głównie importują inne moduły CSS/JS, więc obecny check budżetu nie reprezentuje faktycznie ładowanego footprintu modułów źródłowych ani produkcyjnego payloadu CSS/JS.

- **Skupiona walidacja źródłowego HTML nadal ma tematy porządkowe walidatora.** Dawne realne defekty ARIA/przycisków/lightboxa są rozwiązane, a mały `<!doctype html>` jest akceptowany przez konfigurację. Skupiona komenda walidacji źródeł nadal nie przechodzi przez pozostałe wyniki `void-style` i `prefer-native-element`, które należy traktować jako osobną decyzję polityki walidatora albo przegląd markupowy.

- **Część dynamicznej treści UI nie ma polskich znaków.** `assets/js/services-filters.js` renderuje teksty takie jak `Wyswietlono` i `Brak wynikow dla wybranych filtrow.` To drobne, ale widoczna treść dla użytkownika powinna odpowiadać profesjonalnemu standardowi języka polskiego stosowanemu w innych miejscach.

- **Precache service workera skupia się na stronach głównych, ale pomija część stron root.** `sw.js` precache’uje `/`, `index`, `services`, `fleet`, `pricing`, `contact`, `404` i `offline`, ale nie `privacy.html`, `terms.html`, `cookies.html` ani `service.html`. Strategia network-first dla nawigacji może cache’ować odwiedzone strony, więc jest to świadomy, lekki kształt cache, a nie defekt; szerszy precache poprawiłby spójność offline dla stron prawnych i szczegółowych.

## 6. Dodatkowe usprawnienia jakościowe

- Dodać walidację HTML tylko dla źródeł, która wyklucza `dist/`, szablony przeznaczone do rozwinięcia w buildzie, raporty i foldery zależności.
- Zdecydować, czy styl HTML ma używać samozamykających tagów void w stylu XHTML, czy standardowych tagów HTML bez końcówek, a potem dopasować `.htmlvalidate.json` do tej decyzji.
- Dodać walidację JSON-LD do CI dla stron, które celowo zawierają dane strukturalne.
- Rozszerzyć pokrycie `pa11y-ci` poza pięć skonfigurowanych URL-i, jeśli strony prawne/szczegółowe mają być audytowane przed releasem.

## 7. Ocena seniorska (1-10)

**7.2 / 10**

Projekt ma solidną architekturę statyczną, wiarygodny zakres wielostronicowy, uporządkowane metadane, przemyślany modułowy CSS/JS, wzorce uwzględniające dostępność oraz pliki wdrożeniowe/runtime. Ocenę obniżają nieprzechodząca walidacja źródłowego HTML z realnymi problemami ARIA/przycisków/lightboxa oraz narzędzia QA, które obecnie dają mylące lub zaszumione sygnały. To są problemy naprawialne, nie załamanie architektury.

## Aktualizacja 2026-05-06 — defekty P1 walidacji HTML źródeł

Realne źródłowe defekty P1 walidacji HTML zostały poprawione w aktywnych plikach źródłowych: nieprawidłowe `aria-label` na generycznych kontenerach, brak jawnego `type="button"` na kontrolkach UI niebędących submitami oraz nieprawidłowy statyczny markup obrazów lightboxa z pustym `src=""` i stylami inline. Pozostały output walidacji HTML należy rozpatrywać osobno jako zakres stylu/konfiguracji walidatora, m.in. `doctype-style`, `void-style` i szum ze skanowania plików generowanych lub szablonowych.

## Aktualizacja 2026-05-06 — polityka doctype w walidatorze HTML

Konfiguracja walidatora HTML została dopasowana do używanego w projekcie formatowania Prettier z małym `<!doctype html>` przez ustawienie `doctype-style` na lowercase. To była wyłącznie zmiana polityki walidatora; pliki źródłowe HTML nie były zmieniane w tym zakresie, a pozostałe wyniki `void-style` lub `prefer-native-element` pozostają poza zakresem.

## Aktualizacja 2026-05-06 — zakres weryfikacji assetów

Weryfikator assetów skanuje teraz wyłącznie konteksty HTML należące do projektu: główne strony źródłowe, `partials/`, `templates/` oraz URL-e precache service workera. Katalogi generowane i third-party są wykluczane po ścieżce, w tym `node_modules`, `dist`, `playwright-report`, `test-results`, `coverage` i `.git`. `npm run assets:verify` przechodzi i pozostaje skupiony na realnych referencjach assetów TransLogix.
