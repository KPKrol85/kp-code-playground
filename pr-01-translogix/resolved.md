# Resolved audit items

## 2026-05-06 — Focused source HTML validation cleanup

Resolved scope:

- `.htmlvalidate.json`
- `contact.html`
- `fleet.html`
- `assets/js/lightbox.js`
- `assets/css/modules/pages.css`
- focused source HTML validation command

Outcome:

- `void-style` now matches the project's self-closing void element formatting.
- FAQ accordion panels now use native `<section>` elements while preserving IDs, classes, `hidden`, and `aria-labelledby`.
- The lightbox thumbnail container now uses a native `<ul>`, with JavaScript rendering each thumbnail inside an `<li>`.
- Focused validation for the root source pages now passes.

Notes:

- No minified files or `dist/` files were edited.
- This resolves only the focused source HTML validation cleanup.

## 2026-05-06 — Effective performance budget measurement

Resolved scope:

- `perf-budgets.json`
- `scripts/check-budgets.js`
- `npm run qa:budget`

Outcome:

- CSS budget now measures `assets/css/style.min.css`.
- JS budget now measures the static module graph loaded from `assets/js/main.min.js`.
- `npm run qa:budget` passes with realistic generated payload measurements.

Notes:

- No minified files or `dist/` files were edited manually.
- This resolves only the budget measurement accuracy issue.

## 2026-05-06 — Services filter Polish UI copy

Resolved scope:

- `assets/js/services-filters.js`
- dynamic services filter result messages

Outcome:

- The visible result counter now renders `Wyświetlono`.
- The empty-state message now renders `Brak wyników dla wybranych filtrów.`
- Filtering logic, DOM hooks, ARIA state handling, and event handling were unchanged.

Notes:

- This resolves only the dynamic services filter copy issue.

## 2026-05-06 — Asset verifier source scope

Resolved scope:

- `scripts/verify-assets.js`
- `npm run assets:verify`
- project-owned source/public HTML asset references

Outcome:

- Asset verification now scans root source HTML pages, `partials/`, `templates/`, and service worker precache URLs.
- Generated and third-party folders are excluded by path instead of hiding individual missing-asset reports.
- `npm run assets:verify` now passes for the current source set.

Notes:

- This resolves only the verifier scope issue.
- Real missing assets from project-owned source pages should still fail the verifier.

## 2026-05-06 — HTML validator lowercase doctype policy

Resolved scope:

- `.htmlvalidate.json`
- project HTML validation policy for `<!doctype html>`

Outcome:

- `doctype-style` now accepts the project's Prettier-style lowercase doctype.
- Source HTML files were not changed for this policy alignment.
- Remaining validation findings such as `void-style` and `prefer-native-element` remain separate.

Notes:

- This resolves only the doctype validator configuration mismatch.

## 2026-05-06 — Real P1 source HTML validation defects

Resolved scope:

- `contact.html`
- `fleet.html`
- `services.html`
- `service.html`
- `partials/header.html`
- `templates/partials/header.html`
- source HTML ARIA, button semantics, and static lightbox markup

Outcome:

- Invalid `aria-label` usage on generic containers was removed or converted to valid grouped semantics.
- Non-submit accordion, filter, tab, navigation, and theme buttons now declare `type="button"`.
- Static lightbox image markup no longer ships empty `src=""` values or inline aspect-ratio styles.
- Existing JavaScript hooks and dynamic lightbox image population remain intact.

Notes:

- This resolves only the real source-level P1 validation defects.
- Style/config-only validation findings such as `doctype-style`, `void-style`, and validator scan scope remain separate.

## 2026-05-05 — Legal pages public copy and anchor offset

Resolved scope:

- `terms.html`
- `privacy.html`
- `cookies.html`
- legal page public copy
- legal table-of-contents anchor scroll offset

Outcome:

- Legal pages now use production-facing TransLogix wording for a transport/logistics company.
- Public legal content no longer describes the project as demo, portfolio, showcase, or a fictional front-end project.
- Legal page metadata was cleaned where it exposed outdated demo/KP_Code authoring context.
- Legal in-page anchor targets now use a scoped CSS `scroll-margin-top` offset so headings remain visible below the sticky header.

Notes:

- This resolves only the legal-pages audit finding.
- No unrelated P1/P2 audit items are marked as resolved.

## 2026-05-05 — Source partial hosts verified against dist build

Resolved scope:

- `scripts/build-dist.js`
- root source HTML partial hosts
- generated `dist/*.html` header/footer output
- no-JS navigation/footer audit finding

Outcome:

- The active no-JS header/footer P1 finding was verified as a source/dist workflow false positive.
- Source files intentionally use `<div data-partial="header"></div>` and `<div data-partial="footer"></div>` as authoring placeholders.
- `scripts/build-dist.js` inlines `partials/header.html` and `partials/footer.html` into every generated root HTML page in `dist/`.
- Existing `dist` pages were checked and contain normal `<header>` and `<footer>` markup instead of empty partial hosts.

Notes:

- No source authoring workflow or header/footer architecture change was needed.
- Remaining audit findings are still active unless listed separately.
