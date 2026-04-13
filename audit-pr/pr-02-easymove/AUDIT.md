# Easy Move — repository technical audit

## 1. Short overall assessment
The project is a clean multi-page static front-end with consistent semantic structure, reusable JS modules, and a defined build pipeline. The main risks are around deployment URL strategy consistency (clean URLs in SEO files vs `.html` output artifacts) and a contact form that currently simulates successful submission without any persistence or transport.

## 2. Strengths
- Clear build pipeline exists and is deterministic: CSS minification, JS minification, partial includes resolution, and asset/static file copy (`scripts/build.mjs:30-61`).
- Cross-page baseline SEO metadata is present (title, description, canonical, OG, Twitter) across core pages (example: `index.html:6-19`, `kontakt.html:6-19`, `uslugi.html:6-19`).
- Accessibility baseline includes skip link and visible keyboard focus styles (`index.html:56`, `css/base.css:59-78`).
- Navigation and mobile menu include explicit ARIA state updates and keyboard escape/focus-trap handling (`js/modules/menu.js:31-111`).
- Motion preferences are respected in CSS and JS (`css/base.css:102-105`, `css/components.css:227-231`, `js/modules/reveal.js:5-10`).
- Form fields include labels, required state, and field-level error targets (`kontakt.html:155-227`).

## 3. P0 — Critical risks
none detected.

## 4. P1 — Important issues worth fixing next
1. **Contact form success is client-only (no transport/persistence)**  
   - Evidence: submit handler always `preventDefault()`, validates, then `form.reset()` and displays a success message; no `fetch`, no XHR, no action target, no backend integration (`js/modules/form.js:50-127`, `kontakt.html:155`).  
   - Why this matters: on a production lead form, users can receive a success confirmation while no inquiry is actually delivered.

2. **URL strategy mismatch between SEO/declarative URLs and build output files**  
   - Evidence: canonical/og/sitemap use clean URLs like `/kontakt`, `/uslugi` (`kontakt.html:8,13`; `sitemap.xml:7-23`), while build copies source pages as `.html` files into `dist` (`scripts/build.mjs:38-48`).  
   - Also not detected in project: `_redirects`, rewrite config, hosting rules that guarantee extensionless routing.  
   - Why this matters: without host-level rewrites, canonical/og/sitemap URLs may not resolve to actual pages, weakening SEO consistency and crawl reliability.

3. **Consent copy references policies but does not link them in the form context**  
   - Evidence: consent label says user accepts privacy/cookies policy but contains no anchors (`kontakt.html:221-224`). Links exist elsewhere (footer) but not in the consent text itself (`partials/footer.html:57`).  
   - Why this matters: legal/compliance and usability expectations are stronger when referenced policies are directly accessible at decision point.

## 5. P2 — Minor refinements
1. **`og:image` is present, but `og:image:alt` is not detected**  
   - Evidence: OG image tag appears (`index.html:15`, similarly other pages), but no `og:image:alt` tag detected in audited HTML files.

2. **Google Fonts loaded via CSS `@import` in main entry stylesheet**  
   - Evidence: `@import url('https://fonts.googleapis.com/...')` in `css/main.css:1`.  
   - Impact: workable, but typically slower than `<link rel="preconnect">` + `<link rel="stylesheet">` in document head.

3. **Contrast compliance cannot be verified without computed style analysis**  
   - Evidence: color tokens and theme variables exist, but this static audit did not run rendered contrast computations (`css/tokens.css`, `css/components.css`).

## 6. Extra quality improvements
- Add explicit hosting/deploy documentation (or config files) that defines extensionless routing behavior, and align source links/canonical/sitemap with that strategy.
- If form backend is intentionally out of scope for this repo, show a clear non-submission disclaimer in UI or wire a lightweight endpoint (serverless/email API).
- Add `og:image:alt` consistently for better social accessibility metadata quality.
- Consider adding `manifest.webmanifest` only if PWA installability is a real project goal (not detected in project currently).
- Optionally add `noscript` microcopy for JS-dependent enhancements (menu animation/reveal/theme toggle), while keeping core navigation/content already accessible.

## 7. Senior rating (1–10)
**7.6 / 10**  
Strong front-end fundamentals, clean modularity, and good accessibility baseline are present. Score is reduced by production-readiness gaps around lead capture reliability and URL/deploy consistency evidence.
