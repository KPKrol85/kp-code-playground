# AUDIT.md — Senior Front-End Static Audit

## 1. Executive summary
Audit scope: static, repository-only review of `audit-pr/pr-01-translogix` implementation files (excluding build artifacts).

The project has a clear modular front-end foundation (layered CSS, module-based JS, Netlify deployment files, service worker, QA scripts). No confirmed P0 runtime/deployment blocker was detected. Main issues are quality/maintainability level (HTML lint baseline mismatch, one ARIA misuse, dynamic image dimension omissions in JS-generated markup, and workflow clarity between source vs deploy artifacts).

## 2. P0 — Critical risks
No confirmed P0 issues detected from repository evidence.

## 3. Strengths
- Modular CSS architecture via layered imports in `style.css`. Evidence: `assets/css/style.css:1-6`.
- Design tokens and theme variables are centralized in `settings.css`. Evidence: `assets/css/modules/settings.css:1-78`.
- Progressive enhancement pattern exists (`no-js` to `js` class switch) and does not block base content. Evidence: `assets/js/boot.js:1-4`.
- Mobile navigation includes ARIA state updates, Escape handling, and focus loop behavior on mobile. Evidence: `assets/js/nav.js:16-40`, `assets/js/nav.js:77-99`.
- Reduced-motion handling is implemented for reveal animations. Evidence: `assets/js/reveal.js:3-7`.
- SEO/deployment essentials are present: canonical/OG/JSON-LD, `robots.txt`, `sitemap.xml`, `_headers`, `_redirects`. Evidence: `index.html:17-44`, `robots.txt:1-4`, `sitemap.xml:1-47`, `_headers:1-53`, `_redirects:1-5`.

## 4. P1 — Improvements worth doing next
1. **HTML lint baseline currently fails repo-wide with existing script defaults.**  
   Evidence: `npm run check:html` returns non-zero and reports many rule failures (`doctype-style`, `void-style`, `no-implicit-button-type`) across multiple pages.
2. **`aria-label` misuse on non-landmark element in fleet filters.**  
   Evidence: `<div class="filters" aria-label="Filtry floty">` in `fleet.html:104` (also reported by html-validate).
3. **Dynamic lightbox thumbnails inserted without width/height in JS template strings (CLS risk).**  
   Evidence: `assets/js/lightbox.js:131-137`.
4. **Production path uses non-minified assets in source HTML, while minified references are only rewritten during dist build (workflow coupling risk).**  
   Evidence: `index.html:27`, `index.html:385`, and rewrite behavior in `scripts/build-dist.js:55-74`.
5. **Runtime JS contains direct console error logging in failure path, which may leak noisy logs in production.**  
   Evidence: `assets/js/service-detail.js:80-82`.

## 5. P2 — Minor refinements
- Normalize head formatting consistency (e.g., stylesheet link indentation differs between pages). Evidence: `index.html:27`, `fleet.html:24`.
- Consider adding explicit `type="button"` for all non-submit UI buttons for stricter semantics (already flagged by linter). Evidence: `index.html:84`, `contact.html:189`.
- Consider validating all JSON-LD payloads with an automated checker in CI (currently present but not validated by script). Evidence: `index.html:44-68`, `services.html:39-58`.

## 6. Future enhancements
1. Add a dedicated CI stage that runs `check:html`, `check:links`, and `check:a11y` separately with artifacted reports.
2. Add JSON-LD validation tooling (schema lint) for all page templates.
3. Add a static check for OG/Twitter image dimensions and file existence.
4. Expand accessibility tests to include keyboard tab-order smoke checks in Playwright.
5. Add image dimension policy checks for any HTML/JS-generated `<img>`.

## 7. Compliance checklist
- **Headings valid:** ✅ Pass (each page has one `h1`; hierarchy is generally consistent in static scan). Evidence: `index.html:112`, `fleet.html:102`, `contact.html:104`.
- **No broken links excluding intentional minification strategy:** ✅ Pass (`npm run check:links` passed for 11 HTML files). Evidence: command output.
- **No console.log:** ❌ Fail (console logging exists in project scripts). Evidence: `scripts/check-local-links.js:114`, `scripts/build-dist.js:89`, `scripts/build-js.js:26`, `scripts/check-budgets.js:67-87`.
- **ARIA attributes valid:** ❌ Fail (fleet filters use `aria-label` on `div`, flagged by validator). Evidence: `fleet.html:104`.
- **Images have width/height:** ❌ Fail (JS-injected lightbox images omit intrinsic dimensions). Evidence: `assets/js/lightbox.js:131-137`.
- **No-JS baseline usable:** ✅ Pass (content exists without JS; class switch only enhances behavior; service page has `<noscript>` support). Evidence: `assets/js/boot.js:1-4`, `service.html:169-172`.
- **Sitemap present if expected:** ✅ Pass. Evidence: `sitemap.xml:1-47`.
- **Robots present:** ✅ Pass. Evidence: `robots.txt:1-4`.
- **OG image exists:** ✅ Pass (referenced OG image file exists in repo). Evidence: `index.html:34`, `assets/img/og-img/og-1200x630.jpg`.
- **JSON-LD valid:** ⚠️ Partial (JSON-LD blocks are present and syntactically well-formed in source, but no automated schema validation script is configured). Evidence: `index.html:44-68`, `contact.html:39-60`.

## 8. Architecture score (0–10)
- **BEM consistency:** 8.6/10
- **Token usage:** 9.0/10
- **Accessibility:** 7.8/10
- **Performance:** 8.1/10
- **Maintainability:** 8.0/10

**Overall architecture score: 8.3/10**

## 9. Senior rating (1–10)
**Senior rating: 8.2/10**

Justification: solid modular architecture and good baseline quality controls are already in place, but the current lint baseline mismatch and a few semantic/performance quality gaps should be fixed next to reach a stronger production-ready standard.
