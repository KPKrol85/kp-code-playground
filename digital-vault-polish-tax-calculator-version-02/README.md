# KP_Code Digital Vault — Polish Tax Calculator

A static **KP_Code Digital Vault product prototype** with a locally running, browser-based model for estimating gross-to-net and approximate net-to-gross outcomes across selected Polish engagement types. It is an unverified calculation model, not an authoritative, professionally verified, or production-ready tax calculator.

> **Important limitation:** Results are estimates produced by the currently implemented model. The constants and formulas labelled **2026** have not completed an official-source accuracy audit. Results are not tax, legal, accounting, employment, or financial advice. Unsupported circumstances and simplifications can change the result; verify important calculations using current official information or a qualified specialist.

## Implemented prototype scope

- Six calculation models: employment, mandate, specific work, B2B tax scale, B2B flat tax, and B2B lump sum.
- Direct gross-to-net estimates plus an approximate iterative net-to-gross search.
- Monthly mode and simplified yearly mode: yearly input is divided by 12, calculated as a monthly amount, and displayed again as annualized values.
- Results, an employment-only employer-cost estimate, and a comparison table.
- Model-specific controls for PIT-2, under-26, employee PPK, KUP, B2B ZUS presets/custom inputs, and an informational VAT-payer setting.
- Local calculation history (up to eight entries), local theme preference, print/copy actions, and a dependency-free Node.js current-behavior regression harness.

The metadata names 2026 as the intended ruleset, but this is **not** evidence that the model is correct for 2026. See the audit documents before relying on, changing, or presenting any calculation claim.

## Known limitations

- This is a simplified local model; it does not perform a complete annual settlement, month-by-month threshold progression, or individual case assessment.
- The binary net-to-gross search is approximate and its rounding/convergence behavior has not been source-confirmed.
- B2B does not model business expenses, accounting cost, paid leave, sick leave, insurance, VAT cash flow, annual ZUS limits, complete health-contribution rules, or complete lump-sum activity classification.
- The VAT-payer control does not change net results. Employer cost is shown only for employment and is not a comparable cost model for other forms.
- Eligibility, limits, calculation order, and rounding for PIT-2, under-26 relief, KUP, PPK, and contribution variants still require official-source or specialist verification.

## Privacy and storage behavior (repository inspection)

The repository is a static application: the inspected application code contains no `fetch`, `XMLHttpRequest`, analytics, beacon, account, backend, form submission endpoint, or external asset URL. This supports a **local-by-default implementation claim**, but it is not a blanket privacy guarantee for the browser, hosting environment, extensions, copied text, or printed output.

- **Calculation history:** `js/history.js` writes up to eight history entries to browser `localStorage` under `tax-calculator-history-v2`. Each entry includes timestamp, contract type, input amount, and calculated net amount; therefore financial values **are persisted locally** after a successful submitted calculation. There is no in-app clear-history control.
- **Theme preference:** `js/theme.js` writes only the selected theme (`light`, `dark`, or `system`) to `localStorage` under `tax-calculator-theme-v1`.
- **URL state:** the inspected code does not put calculation state in URLs or read it from URLs.
- **Temporary state:** form controls and `lastCalculation` in `js/main.js` retain values in the active page session only unless history is written.
- **User-initiated outputs:** printing uses the browser print dialog; copying writes the generated summary to the clipboard when available (with a DOM copy fallback). These actions can expose values outside the page according to browser/OS behavior.

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

These are current-behavior regression checks, not source-confirmed accuracy tests. Passing them does **not** verify tax-law correctness, configuration values, or legal applicability.

## Documentation

- [`PLAN.md`](PLAN.md) — roadmap, completed safety preparation, and work that remains blocked on verification.
- [`docs/calculation-audit-matrix.md`](docs/calculation-audit-matrix.md) — actual calculation paths, options, annualization, rounding, reverse search, and unresolved audit status.
- [`docs/tax-source-register.md`](docs/tax-source-register.md) — required official-source evidence format and outstanding source records.
- [`docs/calculation-tests.md`](docs/calculation-tests.md) — distinction between current-behavior regressions and future source-confirmed accuracy tests.
- [`docs/tax-verification-checklist.md`](docs/tax-verification-checklist.md) — configuration-focused official-source verification workflow.
- [`docs/manual-qa.md`](docs/manual-qa.md) and [`docs/release-checklist.md`](docs/release-checklist.md) — operational checks that remain separate from tax accuracy evidence.

## Architecture

```text
index.html                    Static interface and visible limitations
js/tax-config.js             Central configuration, assumptions, and option applicability
js/calculations.js           DOM-independent calculation and comparison logic
js/utils.js                  Parsing, rounding, and currency formatting helpers
js/main.js                   Form state, validation, rendering, printing, copying, annual UI flow
js/history.js                Browser-local calculation-history storage
js/theme.js                  Browser-local theme-preference storage
test/calculations.test.js    Current-behavior regression harness
docs/                        Audit, source-register, QA, and release documentation
```
