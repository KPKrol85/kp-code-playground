# Digital Vault Polish Tax Calculator — Development Plan

_Last roadmap refresh: 2026-06-29_

## 1. Product Overview

`digital-vault-polish-tax-calculator-version-01` is a static vanilla frontend tool in the KP_Code Digital Vault ecosystem. It estimates Polish gross-to-net and net-to-gross values, contributions, PIT, employer cost, and a comparison of common cooperation models: employment contract, mandate contract, specific work contract, and selected B2B variants.

The product should remain a fast, transparent decision-support calculator rather than tax/legal/accounting advice. Its biggest value is helping users understand tradeoffs and ask better questions before negotiating a contract or consulting an accountant.

## 2. Current Implementation Status

### Core calculator flows

- **Implemented:** gross-to-net calculations for all supported contract types.
- **Implemented:** net-to-gross reverse calculation via binary search over the gross-to-net functions.
- **Implemented:** monthly and yearly input modes. Yearly mode currently divides the entered value by 12, runs the monthly model, and annualizes displayed results.
- **Implemented:** quick amount buttons for common monthly values.
- **Implemented:** reset flow clears the query string and restores the empty state.
- **Needs verification:** official tax correctness for all rates, formulas, thresholds, and relief interactions.

### Contract types

- **Implemented:** `employment` / umowa o pracę.
- **Implemented:** `mandate` / umowa zlecenie.
- **Implemented:** `specificWork` / umowa o dzieło.
- **Implemented:** `b2bScale` / B2B skala podatkowa.
- **Implemented:** `b2bLinear` / B2B podatek liniowy.
- **Implemented:** `b2bLumpSum` / B2B ryczałt.
- **Partially implemented:** mandate sickness contribution exists in calculation code, but there is no UI control; the visible assumption says mandate uses no voluntary sickness contribution.

### B2B options

- **Implemented:** B2B options section appears only for B2B contract types.
- **Implemented:** VAT payer checkbox is present and explicitly labeled as informational; it does not affect calculations.
- **Implemented:** ZUS type selector supports full, preferential, starter, and custom values.
- **Implemented:** custom B2B social and health contribution inputs.
- **Partially implemented:** B2B ryczałt has a config object with IT and general rates, but the calculator always uses the IT 12% rate and has no rate selector.
- **Not implemented:** B2B expenses, accounting costs, VAT settlement logic, health contribution deductibility/caps, paid leave/sick leave modeling, invoice net/gross distinction.

### Result and comparison UI

- **Implemented:** primary cards for net, gross, effective burden, and employer cost when applicable.
- **Implemented:** detailed rows for social contributions, health contribution, PIT, PPK, and total deductions.
- **Implemented:** comparison table for all supported contract types.
- **Implemented:** comparison ranking changes by direction: highest net for gross-to-net and lowest required gross/revenue for net-to-gross.
- **Implemented:** visual relationship bars in the comparison table.
- **Implemented:** empty comparison state before a valid amount is entered.
- **Partially implemented:** employer cost is shown as one value for employment, but there is no employer-cost component breakdown.
- **Not implemented:** side-by-side saved scenario comparison, visual threshold indicator, result definition glossary, effective tax/burden explanation cards.

### Trust and assumptions

- **Implemented:** hero and footer disclose simplified model limitations.
- **Implemented:** `TAX_CONFIG` includes `year`, `rulesVersion`, `lastReviewed`, assumptions, and disclaimer notes.
- **Implemented:** assumptions panel renders near results and includes active option notes plus configured assumptions.
- **Implemented:** contextual warning switches to an accounting-check message for B2B, under-26, 50% KUP, or custom ZUS.
- **Needs verification:** `lastReviewed` reflects an internal implementation pass, not an audited official-source tax review.

### Accessibility

- **Implemented:** semantic form structure with `fieldset`/`legend`, labels, headings, table caption, and `aria-live` result/warning areas.
- **Implemented:** amount input is associated with helper/error text and toggles `aria-invalid`.
- **Implemented:** helper text is connected to advanced options via `aria-describedby`.
- **Implemented:** theme controls use `aria-pressed`.
- **Implemented:** visible focus styling exists for theme buttons, segmented controls, form controls, quick values, buttons, and selected table rows.
- **Implemented:** reduced-motion media query exists.
- **Needs QA:** keyboard-only walkthrough, screen-reader smoke testing, color contrast review, mobile table/card readability.

### Print/export

- **Implemented:** print summary button appears after valid results and calls `window.print()`.
- **Implemented:** print CSS hides the form and non-essential controls while keeping results, comparison, and assumptions printable.
- **Not implemented:** PDF generation, branded downloadable report, export/share file.

### Saved scenarios

- **Not implemented:** no scenario save/load/delete UI and no localStorage scenario persistence.
- **Implemented only for theme:** localStorage stores the theme preference.

### Tests

- **Implemented:** dependency-free Node calculation test harness via `npm run test:calculations`.
- **Implemented:** smoke tests for all contract types, representative regression checks, net-to-gross tolerance checks, and comparison shape checks.
- **Partially implemented:** tests assert current behavior, but expected values are not yet validated against official-source examples.
- **Not implemented:** DOM/UI tests, URL restore tests, print tests, accessibility automated tests, mobile visual regression tests.

### Documentation

- **Implemented:** README explains purpose, local run command, test command, major features, and disclaimer.
- **Implemented:** this plan is the living roadmap and audit record.
- **Needs ongoing updates:** README should stay user-facing and concise; this file should preserve detailed audit/roadmap knowledge.

## 3. Architecture Map

- `index.html` — semantic shell, hero, calculator form, results section, assumptions panel mount, comparison table, footer, and theme bootstrap script. Keep markup accessible and avoid adding framework-specific structure.
- `css/style.css` — all design tokens, layout, components, responsive behavior, focus states, assumptions panel styles, comparison table styles, reduced motion, and print styles. Future extraction is optional; do not split unless CSS becomes materially hard to maintain.
- `js/tax-config.js` — central tax-rate/configuration source, B2B ZUS presets, assumptions, version metadata, and disclaimer copy. This should remain the first place future Codex sessions inspect before touching formulas.
- `js/calculations.js` — pure calculation functions for contract types, employer cost, reverse net-to-gross search, and comparison generation. Formula changes require tests and official-source verification.
- `js/utils.js` — money formatting, parsing, rounding, positive clamping, and monthly/yearly conversion helpers.
- `js/main.js` — DOM references, theme management, form state, validation, conditional fields, rendering, URL synchronization, and print action. It is acceptable now, but future large UI features should be extracted to smaller modules before this file becomes too dense.
- `scripts/test-calculations.js` — lightweight calculation regression harness using Node ES modules and no external dependencies.
- `package.json` — declares ESM mode and `test:calculations` script.
- `README.md` — concise user/developer entry point.
- `assets/fonts/InterVariable.woff2` — local font asset.

Stable boundaries to preserve: configuration in `tax-config.js`, formulas in `calculations.js`, generic helpers in `utils.js`, and DOM/UI orchestration in `main.js`. Any refactor must preserve current URL state behavior and tests.

## 4. Completed Work Log

### 2026-06-29 — Project mapping and roadmap refresh

- Completed repository mapping across README, plan, HTML, CSS, JS modules, package script, and tests.
- Reclassified outdated roadmap items that are now implemented.
- Preserved calculation-risk notes and added clearer next-task priorities.

### 2026-06-29 — Trust, assumptions, accessibility, print, and test foundation visible in code

- Added visible tax-rule metadata fields in `TAX_CONFIG`: `year`, `rulesVersion`, and `lastReviewed`.
- Added assumptions/disclaimer data in `TAX_CONFIG` and rendered an assumptions panel in the results area.
- Added helper text for key options and connected controls through `aria-describedby`.
- Added `aria-invalid` behavior for the amount input.
- Added comparison table caption and clearer empty comparison state.
- Added print summary button and print CSS foundation.
- Added dependency-free calculation regression tests and `npm run test:calculations`.

### Earlier completed baseline

- Static vanilla ES module architecture.
- Light/dark/system theme support with persisted preference.
- Gross-to-net and net-to-gross flows.
- Monthly/yearly input modes.
- URL query restoration and synchronization.
- Contract comparison table for six cooperation models.
- B2B ZUS presets and custom ZUS inputs.

## 5. Current Risk Register

| Risk | Severity | Current status | Recommended next action |
| --- | --- | --- | --- |
| Simplified tax model can differ from payroll/accounting systems. | P0 | Clearly disclosed, but not official-source verified. | Verify formulas and keep limitations visible in UI/README. |
| Tax-law/rate freshness risk for 2026 constants. | P0 | Config has metadata, but no cited official-source audit. | Audit `tax-config.js` against authoritative sources and record source/date notes. |
| Monthly vs annual simplification risk. | P1 | Yearly mode is annualized monthly model. | Add stronger UI explanation and golden yearly edge-case tests. |
| B2B assumptions risk. | P0 | B2B ignores expenses, VAT effects, accounting costs, leave, insurance, and many real-world choices. | Keep B2B caveats prominent; add expense module only with explicit simplified assumptions. |
| VAT treatment limitations. | P1 | Checkbox is informational and documented as no-op. | Decide whether to keep as informational, remove, or implement a proper VAT module later. |
| Health contribution and deductibility limitations. | P0 | Simplified health calculations; no detailed deductibility/cap handling. | Verify against official rules and add tests for B2B health scenarios. |
| Under-26 relief limitations. | P1 | Implemented simplistically for selected contracts. | Verify eligibility, annual limit, and interaction with costs/contributions. |
| Net-to-gross approximation limitations. | P1 | Binary search with tolerance; covered by smoke tests. | Add edge-case regression cases and document tolerance. |
| Option applicability confusion. | P1 | Some controls are disabled by contract type; assumptions panel explains selected effects. | Continue tightening disabled/hidden states and explanatory copy. |
| Accessibility/table complexity. | P1 | Many foundations implemented; no formal QA yet. | Run keyboard, screen-reader, mobile table, and contrast checks. |
| No backend/persistence. | P2 | Static-only; URL sharing exists; saved scenarios do not. | Keep static by default; add localStorage scenarios only if needed. |

## 6. Calculation Accuracy Plan

Before any public production-quality positioning, complete a focused correctness program:

1. **Official-source verification**
   - Verify every value in `tax-config.js`: PIT thresholds, tax-free amount, PIT rates, under-26 limit, employee social rates, health rates/minimums, employer rates, PPK defaults, deductible costs, and B2B ZUS presets.
   - Add comments or documentation metadata for source names and review dates.
   - Clearly mark anything provisional, simplified, or intentionally omitted.

2. **Tax-rule metadata**
   - Extend config metadata with `sourceReviewedBy`, `sourceUrls` or source labels, and `modelLimitations` if future docs need stronger traceability.
   - Keep `rulesVersion` stable and increment when formula assumptions change.

3. **Golden test cases**
   - Add official-source or accountant-verified expected examples for each contract type.
   - Keep tolerance-based assertions because payroll rounding can vary by system.
   - Separate “current behavior regression” tests from “verified accuracy” tests.

4. **Required edge cases**
   - Zero/empty amount validation.
   - Very low amount.
   - High amount crossing the 120,000 PLN threshold.
   - Under-26 relief enabled and disabled.
   - PPK enabled and disabled.
   - PIT-2 enabled and disabled.
   - B2B full/preferential/starter/custom ZUS.
   - B2B ryczałt different rates after a rate selector exists.
   - B2B expenses after an expenses module exists.
   - Yearly input conversion.
   - Net-to-gross reverse search for all contract types.

5. **Do not overclaim**
   - Until this plan is complete, language must remain “estimate”, “simplified model”, and “not tax/legal/accounting/financial advice”.

## 7. UX/UI Roadmap

### Already implemented

- Professional Digital Vault hero and calculator flow.
- Step-based layout: data, results, comparison.
- Quick amount buttons.
- Light/dark/system theme.
- Result summary cards and deduction details.
- Comparison ranking table with relationship bars.
- Assumptions panel.
- Print summary button.
- Contextual warning/disclaimer.

### Next practical improvements

- Clarify yearly mode near the period selector.
- Add stronger definitions for gross, net, employer cost, effective burden, PIT, and health contribution.
- Add employer cost component breakdown for employment.
- Improve mobile comparison readability, potentially with a card view below a breakpoint.
- Add side-by-side comparison for two or three scenarios, preferably after calculation tests are expanded.
- Add a visible threshold indicator for progressive-tax scenarios.
- Add an explicit B2B ryczałt rate selector.

### Later premium/product improvements

- Guided employment vs B2B wizard.
- Glossary/explainer modules for Polish tax terms.
- Visual burden/effective-tax-rate cards.
- Downloadable branded summary/report.
- Digital Vault cross-links to related tools.
- Saved preset templates for common user profiles.

## 8. Accessibility Roadmap

### Implemented foundation

- Amount validation helper/error association and `aria-invalid` state.
- Helper text associations for advanced controls.
- Keyboard focus styles for key interactive elements.
- `fieldset`/`legend` groupings.
- Comparison table caption.
- Reduced-motion CSS.
- Print mode.
- `aria-live` for warnings/results.

### Needs QA / follow-up

- Full keyboard-only navigation pass from theme controls through print button.
- Screen-reader smoke test for form labels, dynamic results, assumptions panel, and comparison table.
- Verify disabled options are understandable and not confusing to assistive technology users.
- Contrast audit in light and dark themes.
- Mobile table/card readability review.
- Confirm print output preserves meaningful order and does not hide required disclaimers.

### Future checklist for screen-reader smoke test

- Initial page title and H1 are announced correctly.
- Amount input announces label, helper, validation error, and invalid state.
- Contract type and advanced options have understandable labels/descriptions.
- Results update is not overly verbose on every keystroke.
- Comparison table caption and row/column context are understandable.
- Print button is discoverable after calculation.

## 9. Testing and QA Plan

### Existing automated tests

Run:

```bash
npm run test:calculations
```

Current coverage includes:

- smoke tests for all six contract types,
- representative regression values for selected gross-to-net cases,
- net-to-gross tolerance checks,
- comparison array shape checks.

### Next automated test tasks

- Add official-source/accountant-verified golden tests.
- Add tests for under-26, PPK, PIT-2, yearly conversion, and high-threshold scenarios.
- Add B2B ZUS variant tests for full, preferential, starter, and custom.
- Add future ryczałt-rate and B2B-expense tests when those features exist.
- Consider lightweight browser tests for URL restore and visible DOM states if a test runner is introduced.

### Manual QA checklist

- Gross-to-net and net-to-gross for every contract type.
- Monthly and yearly modes.
- URL restore for amount, direction, period, contract type, common options, ZUS type, and custom ZUS.
- Reset clears URL and UI.
- Print summary after valid result.
- Keyboard-only navigation.
- Mobile viewport checks for calculator, results, assumptions, and comparison.
- Light/dark/system theme behavior and persistence.
- No console errors during normal use.

## 10. Documentation Plan

### README status

README is intentionally concise and user-facing. It should cover:

- project purpose,
- local run instructions,
- available calculator features,
- simplified model assumptions,
- tax/legal/accounting disclaimer,
- URL sharing,
- print summary,
- test command,
- key limitations.

Current README has the essentials and should be kept lightweight. When formulas or features change, update README only enough that users are not misled.

### Planning documentation status

This `plan.md` is the detailed living roadmap. It should be updated after each meaningful implementation pass, especially when a planned item becomes implemented or a risk is resolved.

## 11. Next Codex Tasks

### P0 tasks

1. **Verify tax constants and assumptions**
   - Goal: validate `tax-config.js` and formula assumptions against authoritative sources.
   - Expected files: `js/tax-config.js`, `README.md`, `plan.md`, possibly a new `docs/tax-sources.md`.
   - Constraints: do not change formulas unless a verified discrepancy is found and tests are updated.

2. **Expand calculation regression tests**
   - Goal: cover edge cases and options beyond current smoke tests.
   - Expected files: `scripts/test-calculations.js`, optionally `scripts/fixtures/*.js`.
   - Constraints: no external dependencies unless explicitly justified.

3. **Accessibility QA and fixes**
   - Goal: perform keyboard/screen-reader-oriented review and fix discovered issues.
   - Expected files: `index.html`, `css/style.css`, `js/main.js`, possibly `plan.md`.
   - Constraints: preserve current design and calculations.

4. **Clarify misleading option behavior**
   - Goal: ensure VAT, PIT-2, PPK, KUP, and mandate sickness behavior cannot be misunderstood.
   - Expected files: `index.html`, `js/main.js`, `js/tax-config.js`, `README.md`.
   - Constraints: avoid formula changes unless scoped and tested.

### P1 tasks

1. **Improve scenario comparison**
   - Goal: compare two or three named states side by side.
   - Expected files: `index.html`, `css/style.css`, `js/main.js`, tests if logic is extracted.
   - Constraints: preserve URL sharing; do not introduce backend persistence.

2. **Improve B2B assumptions/expenses**
   - Goal: add explicit simplified monthly expenses/accounting costs for B2B.
   - Expected files: `index.html`, `js/calculations.js`, `js/main.js`, `js/tax-config.js`, `scripts/test-calculations.js`, `README.md`.
   - Constraints: keep caveats prominent; do not imply full VAT/accounting accuracy.

3. **Improve mobile comparison**
   - Goal: make comparison easier to scan on narrow screens.
   - Expected files: `css/style.css`, maybe `index.html`/`js/main.js`.
   - Constraints: preserve accessible table semantics or provide an equally accessible alternative.

4. **Improve README completeness**
   - Goal: keep README aligned with latest implemented features and limitations.
   - Expected files: `README.md`.
   - Constraints: concise, user-facing, no legal/tax certainty claims.

### P2 tasks

1. **Guided wizard** — help users choose employment vs B2B inputs step by step. Expected files: HTML/CSS/JS UI files. Constraint: keep advanced form accessible.
2. **Glossary/educational explanations** — explain PIT, ZUS, KUP, PPK, health contribution, employer cost. Expected files: `index.html`, `css/style.css`, maybe copy config. Constraint: concise and non-advisory.
3. **Digital Vault integration** — add links/embedding affordances for related tools. Expected files: `index.html`, `README.md`. Constraint: no heavy dependencies.
4. **Saved preset templates** — localStorage presets for common profiles. Expected files: `js/main.js`, `index.html`, `css/style.css`. Constraint: handle storage failures gracefully.

### P3 tasks

1. **Historical tax-year selector** — support verified configurations by year. Constraint: only after source-backed datasets exist.
2. **Branded downloadable report** — print/PDF-style negotiation report. Constraint: do not add large PDF dependencies without product need.
3. **Premium scenario library** — curated freelancer/employee/founder scenarios. Constraint: preserve trust and disclaimers.

## 12. Release Readiness Checklist

- [ ] Tax data verified against authoritative sources.
- [ ] Formula assumptions documented and visible.
- [ ] Disclaimers visible in UI and README.
- [ ] Calculation regression tests expanded and passing.
- [ ] Edge cases tested: low/high amounts, threshold crossing, reliefs, PPK, PIT-2, B2B ZUS variants.
- [ ] Keyboard-only QA completed.
- [ ] Screen-reader smoke test completed.
- [ ] Mobile QA completed.
- [ ] Print QA completed.
- [ ] Dark/light/system theme QA completed.
- [ ] URL restore works for supported state.
- [ ] Reset behavior works and clears URL.
- [ ] No console errors in normal use.
- [ ] README updated.
- [ ] Limitations documented without overpromising accuracy.

## 13. Monetization / Digital Vault Potential

This tool has strong Digital Vault potential because salary, contract, and B2B comparisons are recurring user needs during job changes, contract negotiations, freelancing decisions, and yearly planning.

Possible model:

- Free core calculator with transparent assumptions.
- Premium saved comparisons and scenario history.
- B2B profitability report with expenses, VAT assumptions, accounting-cost modeling, and accountant-check prompts.
- Downloadable branded summary for negotiation planning.
- Educational bundle explaining Polish employment/tax concepts in plain language.
- Integration with other Digital Vault tools such as invoice calculators, freelance pricing calculators, mortgage affordability tools, and cost-of-living planners.

Trust is the main product asset. Monetization must not hide limitations, imply guaranteed outcomes, or replace professional tax/accounting/legal advice.
