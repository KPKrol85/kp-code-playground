# AUDIT — KP_CODE Digital Studio / Ambre (pr-01-ambre)

## 1. Executive Summary
The project shows a strong front-end baseline: modular CSS layers (`base/layout/components/pages`), split JavaScript modules, consistent SEO metadata, working static link integrity checks, and PWA deployment artifacts (`manifest`, `sw.js`, `_headers`, `_redirects`). The implementation is production-oriented, but there is architectural drift around runtime asset strategy and modal accessibility details that should be tightened next.

## 2. P0 — Critical Risks
No P0 issues detected.

## 3. Strengths
- Clear CSS architecture with separation of concerns (`css/base`, `css/layout`, `css/components`, `css/pages`) and central token file (`css/base/tokens.css`).
- JavaScript is modularized by feature (`js/modules/*`) and bootstrapped from one entry (`js/script.js`).
- SEO baseline is implemented across pages: `meta description`, `canonical`, OpenGraph tags, and JSON-LD blocks are present in primary pages.
- Link/path validation script exists and passes in local checks (`scripts/qa-links.mjs` + `npm run qa:links`).
- Core accessibility primitives are present: skip link, semantic headings, ARIA states (`aria-current`, `aria-expanded`, `aria-busy`, `aria-live`), and reduced-motion media queries.
- Deployment and PWA files are present and internally coherent: `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `sw.js`.

## 4. P1 — Exactly 5 Improvements Worth Doing Next

### 1) Unify runtime asset strategy (source vs minified)
**Reason:** HTML pages load `/js/script.js` and `/css/style.css`, while minified artifacts are also versioned (`js/script.min.js`, build scripts for `css/style.min.css`). This increases maintenance overhead and can create source/build drift.
**Suggested improvement:** Define one production path: either (a) load minified bundles in production and keep source for development only, or (b) remove minified artifacts from repo and build them only in deployment.

### 2) Deliver modern image formats in markup, not only via tooling
**Reason:** Runtime HTML image references are predominantly JPEG; AVIF/WebP generation exists only as scripts (`scripts/optimize-images.mjs`) and lightbox dynamic handling.
**Suggested improvement:** Add `<picture>` with AVIF/WebP/JPEG fallback for key above-the-fold and gallery images, then keep current JPEG fallback for compatibility.

### 3) Strengthen non-`<dialog>` lightbox focus management
**Reason:** Lightbox is implemented as `div[role="dialog"]` in HTML and opened/closed via JS, but there is no explicit focus trap for this modal path.
**Suggested improvement:** Add full focus trap and focus cycling for the lightbox container when open (or migrate to native `<dialog>` consistently), and ensure background content is inert while modal is active.

### 4) Reduce CSP hash maintenance risk
**Reason:** `_headers` contains multiple hard-coded `script-src-elem` hashes, which are fragile when inline scripts change.
**Suggested improvement:** Minimize inline scripts and move logic to external files; if inline scripts remain required, automate CSP hash generation in build/deploy.

### 5) Add automated QA execution in CI (not detected in project)
**Reason:** Local QA scripts exist (`qa:links`, `qa:seo`, `qa:a11y`, linters), but CI/CD pipeline configuration is not detected in project.
**Suggested improvement:** Add a CI workflow that runs the existing QA commands on each PR to keep quality gates deterministic.

## 5. P2 — Minor Refinements (optional)
- Fix malformed inline SVG string in `js/modules/load-more.js` (`...focusable="false">><path...`) to avoid invalid markup injection in status icon output.
- Consider reducing font preloads on low-content pages (legal pages) to limit initial transfer on non-core routes.
- Consider adding explicit `aria-label`/`title` consistency pass for all social links so naming style is uniform (`Github` vs `Linkedin` casing).

## 6. Future Enhancements — Exactly 5 Realistic Ideas
1. Add visual regression snapshots for key routes (`index`, `menu`, `galeria`) to protect component consistency.
2. Add route-level JS loading (or feature flags per page) so legal pages do not initialize all interactive modules.
3. Extend SEO QA script to assert one unique `<h1>` per page and enforce metadata consistency checks in one command.
4. Add offline UX enhancement by caching a small subset of critical hero/gallery assets for faster repeat visits.
5. Add a structured content map for legal pages (shared templates/partials) to reduce duplicated markup across `cookies`, `regulamin`, `polityka-prywatnosci`.

## 7. Compliance Checklist (pass / fail)
- headings valid: **PASS**
- no broken links (excluding .min strategy): **PASS**
- no console.log: **PASS** (runtime JS modules)
- aria attributes valid: **PASS** (static reference checks)
- images have width/height: **PASS**
- no-JS baseline usable: **PASS**
- robots present (if expected): **PASS**
- sitemap present (if expected): **PASS**
- OG image exists: **PASS**
- JSON-LD valid (if present): **PASS** (project SEO QA script)

## 8. Architecture Score (0–10)
- structural consistency: **8.8/10**
- accessibility maturity: **8.2/10**
- performance discipline: **7.9/10**
- SEO correctness: **9.0/10**
- maintainability: **8.1/10**

**Overall Architecture Score: 8.4/10**

## 9. Senior Rating (1–10)
**8.3/10**

The codebase is clearly above junior portfolio quality and already includes many production-minded elements (modularization, QA scripts, SEO/PWA assets, deploy headers/redirects). The next step is not a stack rewrite, but tightening operational consistency: one asset strategy, stronger modal accessibility guarantees, and CI-backed enforcement of the existing quality checks.
