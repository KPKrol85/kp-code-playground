# TransLogix — Daily Front-End Audit

## 1. Short overall assessment

TransLogix is a credible static multi-page front-end project with modular CSS/JS, realistic transport/logistics content on most business pages, SEO metadata, JSON-LD, deployment files, a service worker, and automated QA scripts. The implementation is stronger than a throwaway static site, but the current source still has production-readiness gaps: the no-JS navigation/footer baseline depends on client-side partial loading, HTML validation currently fails on real source files, the terms page still describes the site as a demo/portfolio project, and some QA tooling scans too broadly or measures incomplete assets.

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

- **No-JS baseline is incomplete for primary navigation and footer.** Root pages render only empty partial hosts such as `index.html:88` and `index.html:280` (`<div data-partial="header"></div>`, `<div data-partial="footer"></div>`). The actual header/footer are injected by `assets/js/partials.js` through `await initPartials()` in `assets/js/main.js`. With JavaScript unavailable or partial fetch failing, users lose the primary site navigation and footer links. This conflicts with the README claim that baseline content works without JS.

- **Source HTML validation currently fails on real semantic and accessibility issues.** Running `npx html-validate ...` against the root source pages reports 404 errors. Many are style-rule mismatches (`doctype-style`, `void-style`), but there are also real source issues worth fixing: invalid `aria-label` on generic containers (`contact.html:101`, `fleet.html:88`, `services.html:89`, `service.html:131`), missing explicit `type` on non-submit buttons (`fleet.html:89-93`, `services.html:90-95`, `services.html:125-129`, `contact.html:165+`), empty `src=""` on lightbox images (`fleet.html:403`, `fleet.html:412`), and inline styles on those lightbox images. This makes the configured HTML QA gate fail on implementation evidence, not just generated artifacts.

- **The terms page still presents the project as a demo/portfolio instead of a production-facing transport company site.** Evidence: `terms.html:13` contains `KP_Code_ Demo` in the title, `terms.html:83` says `Regulamin projektu demonstracyjnego (portfolio)`, and sections such as `terms.html:123`, `terms.html:136`, and `terms.html:145` describe demo functionality and lack of service provision. That directly weakens business credibility and conflicts with the rest of the site’s production-style transport company positioning.

- **Asset verification tooling is currently unreliable because it scans too broadly.** `scripts/verify-assets.js` recursively reads every HTML file under the project root without excluding `node_modules`, reports, or generated folders. `npm run assets:verify` currently fails with missing references from third-party/generated HTML contexts such as Mocha, Playwright UI, socket.io, and Vite-style assets. This is a tooling defect in the current project workflow; it does not prove those app assets are missing from the public source pages.

## 5. P2 — Minor refinements

- **`offline.html` contains partial placeholders but does not load the partial loader.** It includes `data-partial="header"` and `data-partial="footer"` at `offline.html:83` and `offline.html:95`, but it does not include `assets/js/main.js`. The offline main content still works, so this is not critical, but the empty placeholders are dead markup in the source page.

- **Performance budget checks do not measure the effective CSS/JS footprint.** `perf-budgets.json` budgets `assets/css/style.css` and `assets/js/main.js`; `npm run qa:budget` passes with `style.css` at 99 B gzip and `main.js` at 464 B gzip. Those files mostly import other CSS/JS modules, so the current budget check does not represent the actual loaded source module footprint or production CSS/JS payload.

- **Some dynamic UI copy lacks Polish diacritics.** `assets/js/services-filters.js` renders strings like `Wyswietlono` and `Brak wynikow dla wybranych filtrow.` This is minor, but visible user-facing copy should match the professional Polish language standard used elsewhere.

- **Service worker precache focuses on core pages but omits some root pages.** `sw.js` precaches `/`, `index`, `services`, `fleet`, `pricing`, `contact`, `404`, and `offline`, but not `privacy.html`, `terms.html`, `cookies.html`, or `service.html`. Network-first navigation can cache visited pages, so this is a conscious lightweight cache shape rather than a defect; broader precache would improve offline consistency for legal/detail pages.

## 6. Extra quality improvements

- Add a source-only HTML validation script that excludes `dist/`, templates intended for build-time expansion, reports, and dependency folders.
- Decide whether the HTML style should be XHTML-like self-closing void tags or standard HTML omitted end tags, then align `.htmlvalidate.json` with that decision.
- Add JSON-LD validation to CI for pages that intentionally include structured data.
- Expand `pa11y-ci` coverage beyond the five configured URLs if legal/detail pages are expected to be audited before release.
- Make the asset verifier scope explicit, for example root pages plus partials plus service worker precache, instead of every HTML file under the project root.
- Consider adding fallback static header/footer markup for no-JS, or generate/inject partials at build time for source preview as well as `dist`.

## 7. Senior rating (1-10)

**7.2 / 10**

The project has a solid static architecture, credible multi-page scope, structured metadata, thoughtful modular CSS/JS, accessibility-aware patterns, and deployment/runtime files. The score is held back by the incomplete no-JS navigation/footer baseline, failing source HTML validation with real ARIA/button/lightbox issues, demo-oriented legal copy, and QA tooling that currently gives misleading or noisy signals. These are fixable issues, not architecture collapse.
