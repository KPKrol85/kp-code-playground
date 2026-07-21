# Polish Tax Calculator

A static, browser-based calculator that estimates gross-to-net and net-to-gross amounts for selected Polish employment and B2B cooperation models. It is a working calculator with a deliberately simplified model, not a release candidate for tax-critical use.

> **Important:** Results are estimates only and are not legal, tax, accounting, or financial advice. The tax and contribution configuration declares that its values require official-source verification. Do not use the calculator as the sole basis for financial decisions.

## Verified scope

The implementation currently provides:

- Gross-to-net calculations and approximate net-to-gross search for employment, mandate, specific-work, B2B scale, B2B linear, and B2B lump-sum models.
- Monthly input and a yearly input mode that converts the entered value to a monthly equivalent, then displays monthly and annualized values.
- A result breakdown, an employment-only employer-cost estimate, and a comparison table across all six models.
- Form controls for PIT-2, under-26, employee PPK, deductible-cost selection, B2B ZUS presets or custom contribution amounts, and an informational B2B VAT-payer flag. Applicability is controlled per model; some settings are disabled, ignored, or informational.
- Quick scenarios, printable and copyable calculation summaries, and a local calculation history limited to eight entries.
- Light, dark, and system themes stored in browser `localStorage`.
- Semantic sections, form labels and fieldsets, a skip link, live regions, focus-visible styling, responsive layouts, and reduced-motion styling.
- Node.js regression tests for the current simplified calculation behavior.

The configured metadata names **2026** as the target tax year/rule set, but the repository explicitly marks the configuration as requiring official-source verification. This is not a claim that the model is verified for 2026.

## Known limitations and assumptions

- The calculation logic is a simplified model. It does not model full annual settlement, irregular income, month-by-month threshold progression, or individual circumstances beyond implemented controls.
- The reverse calculation uses an iterative binary search and is approximate.
- B2B models do not model business expenses, accounting costs, paid leave, sick leave, insurance, VAT cash flow, annual ZUS limits, full health-contribution rules, or complete lump-sum activity classification.
- The VAT-payer control does not alter the calculated net result.
- Employer cost is calculated only for the employment model; it is not an equivalent cost model for other rows.
- Eligibility and limits for options such as under-26 relief and 50% deductible costs require individual verification.

Tax rates, thresholds, contribution settings, assumptions, limitations, metadata, and option applicability are centralized in [`js/tax-config.js`](js/tax-config.js). Verify that file using [`docs/tax-verification-checklist.md`](docs/tax-verification-checklist.md) before changing the verification status or presenting results as reliable for a specific ruleset.

## Technology

- Static HTML, CSS, and ES modules
- No framework, backend, build step, or runtime dependency
- Node.js built-in test runner

## Run locally

Use a local static server because the application loads ES modules:

```bash
cd digital-vault-polish-tax-calculator-version-02
python3 -m http.server 8000
```

Open <http://localhost:8000/>. Any equivalent static server can be used.

## Test

```bash
npm test
```

The tests are regression checks for the repository's current formulas and expected behavior. Passing them does **not** verify tax-law correctness or the configuration values.

## Project structure

```text
index.html                    Application markup and controls
css/style.css                 Responsive, theme, print, focus, and motion styles
js/tax-config.js             Central calculation configuration and model metadata
js/calculations.js           DOM-independent calculation and comparison logic
js/main.js                   Form state, validation, rendering, printing, and copying
js/history.js                Local calculation-history storage
js/theme.js                  Local theme-preference storage
js/ui-config.js              UI labels and quick-scenario definitions
js/utils.js                  Parsing, rounding, and currency helpers
test/calculations.test.js    Node.js calculation regression tests
docs/                        Tax verification, manual QA, and release checklists
```

## Privacy and local data

The application is static and has no backend in this repository. Calculation history and theme preference are written to the current browser's `localStorage`; calculation inputs are not sent by the application code to a server. There is no implemented clear-history control, so users who want to remove stored history must clear the relevant browser storage.

## Documentation

- [`PLAN.md`](PLAN.md) contains verified scope, remaining required work, recommended improvements, optional future ideas, and completion criteria.
- [`CHANGELOG.md`](CHANGELOG.md) records completed notable changes from the point this canonical changelog was introduced.
- [`docs/tax-verification-checklist.md`](docs/tax-verification-checklist.md) is the official-source verification workflow for configuration values.
- [`docs/manual-qa.md`](docs/manual-qa.md) and [`docs/release-checklist.md`](docs/release-checklist.md) are operational checklists; their unchecked items are not evidence of completed verification.
