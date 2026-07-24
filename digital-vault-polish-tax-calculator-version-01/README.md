# Digital Vault Polish Tax Calculator

A static, browser-based calculator for indicative Polish remuneration and tax burdens. The application accepts a gross amount or a target net amount, calculates simplified results, and compares the available engagement types. It is a working prototype/portfolio project, not a product intended for real tax decisions.

## Current Version Scope

The code contains a model identified as `PL-2026-simplified-v1` and tax year `2026`. The configuration does not include official sources or an audit of the rules; therefore, the year label describes the data stored in the project, **not** confirmed compliance with current law.

The current version can:

- calculate a simplified gross → net conversion and estimate a net → gross amount;
- select a monthly or annual period; annual mode divides the input by 12, applies the monthly model, and annualizes the result;
- select an employment contract (`umowa o pracę`), mandate contract (`umowa zlecenie`), contract for specific work (`umowa o dzieło`), B2B under the tax scale, B2B with a flat tax, or B2B lump-sum taxation (`ryczałt`);
- use the under-26 option, PPK, PIT-2, and deductible costs (KUP) when the interface permits them for the selected contract type;
- select a ZUS preset for B2B or enter custom social and health contributions;
- display net pay, gross pay, deductions, employer cost where the model calculates it, deduction details, and a comparison table;
- restore part of the calculation state from URL parameters, print a correctly calculated summary, and save only the theme preference in `localStorage`.

## Limitations and Assumptions

- The model is simplified. Its rates, thresholds, limits, calculation order, and rounding have not been verified against official sources in this repository.
- B2B does not model business expenses, VAT, accounting, leave, sickness benefits, or private insurance. The VAT payer switch is informational only and does not affect the result.
- B2B lump-sum taxation always uses the 12% IT rate stored in the configuration; the interface does not provide a rate selection.
- The mandate contract form does not offer voluntary sickness insurance. Custom B2B contributions are accepted as positive monthly amounts.
- The result is not tax, legal, accounting, or financial advice. Before using a result for a real decision, verify the current rules using official sources or consult a professional.

## Technology and Setup

This project is a static HTML, CSS, and JavaScript application using ES modules. It has no npm dependencies or build script. The locally installed Inter font is located in `assets/fonts/`.

An HTTP server is required because the application uses ES modules. From the project directory, for example:

```bash
npx serve .
```

Then open the address provided by the server. Any other local static server pointing to this directory can also be used.

## Tests

A lightweight Node.js harness checks the current behavior of the calculation functions: smoke cases for six contract types, selected regression values, reverse-search tolerance, and comparison size.

```bash
npm run test:calculations
npm run test:ui
```

`test:ui` is a dependency-free Node.js DOM shim and static accessibility check. It covers core form submission, validation, stale-result clearing, directions, reset, URL restoration, result updates, and basic structural/accessibility regressions. It is not a browser or assistive-technology audit. Neither test validates tax rules against official examples.

## Project Structure

```text
.
├── index.html                    # form, results, and comparison table
├── css/style.css                 # themes, responsive layout, and print styles
├── js/
│   ├── tax-config.js             # data and assumptions for the simplified model
│   ├── calculations.js           # calculation and comparison functions
│   ├── main.js                   # form handling, rendering, and URL state
│   └── utils.js                  # formatting, parsing, and period conversion
├── scripts/test-calculations.js  # dependency-free Node.js harness
├── assets/fonts/InterVariable.woff2
├── PLAN.md                       # verified roadmap for further work
└── CHANGELOG.md                  # documented changes and repository history
```

## Privacy, Accessibility, and Responsiveness

Calculations are performed in the browser by the application's local code. The code contains no network integration or mechanism for saving calculation data; `localStorage` stores only the selected theme. The interface includes form labels, `fieldset`/`legend` groups, `aria-live` regions, an amount error message, visible focus styles, a reduced-motion preference, and responsive table presentation. These foundations do not replace a full accessibility audit.

## Project Documentation

- [PLAN.md](PLAN.md) contains the verified status, required work, recommendations, and optional development directions.
- [CHANGELOG.md](CHANGELOG.md) records documented changes only; it does not contain planned features.
