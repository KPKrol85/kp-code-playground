# Digital Vault Polish Tax Calculator — Development Plan

## Project Status

The project is a static, working calculator/prototype portfolio project built with HTML, CSS, and JavaScript. It supports six engagement types and gross → net and net → gross directions, but it is not a release candidate for a verified tax calculator. The key limitation is that the data and formulas labelled as the 2026 model have no official sources or documented accuracy audit in the repository.

## Verified Current Scope

- [x] Static application based on ES modules, with no build process and no npm dependencies.
- [x] Amount input, validation for empty, non-positive, and very large values, and a message at the field.
- [x] Gross → net and net → gross modes; the latter uses binary search over the gross → net function result.
- [x] Monthly model and annual input/output based on dividing and multiplying by 12.
- [x] Calculations for employment, mandate, specific-work, and B2B contracts: tax scale, flat tax, and lump-sum taxation.
- [x] Form options for the under-26 relief, PPK, PIT-2, deductible costs (KUP), and B2B ZUS (including custom values); some options are disabled depending on the contract type.
- [x] Results with contribution, PIT, PPK, deduction, and—only for employment—employer-cost entries, plus a ranking of six engagement types.
- [x] URL parameters for calculation state, summary printing, and a theme preference in `localStorage`.
- [x] Light, dark, and system themes; responsive layout; focus styles; `aria-live`; semantic form groups; and a reduced-motion rule.
- [x] Dependency-free Node.js harness for calculation logic.
- [ ] The accuracy of values and formulas, and their compliance with actual Polish rules, has not been verified in the repository.
- [x] DOM/UI tests cover the current core calculation form behaviors in a dependency-free Node.js harness.
- [x] Automated static accessibility checks cover the current HTML structure and key ARIA relationships.
- [ ] There are no saved calculation scenarios.

Verification note: `npm run test:calculations` verifies current-behavior characterization snapshots for all six calculation paths in both directions, applicable options, period transformations, finite/large/invalid inputs, repeated calculation stability, and displayed cent precision. It freezes the present implementation only; it does not verify tax accuracy or compliance. `npm run test:ui` verifies core UI state transitions with a small DOM shim and checks the static document for labels, group names, error associations, live regions, native keyboard-operable controls, duplicate IDs, ARIA references, and baseline document structure. It does not replace browser, keyboard-only, screen-reader, contrast, or responsive testing. Calculation accuracy and compliance remain unverified.

## Development Principles

- [ ] Do not present results as tax, legal, accounting, or financial advice.
- [ ] Change data and formulas only after verification using reliable sources and after adding appropriate tests.
- [ ] Keep rule data separate from calculation functions and interface rendering; retain the current boundaries of `tax-config.js`, `calculations.js`, `utils.js`, and `main.js`.
- [ ] Document simplifications, sources, review date, rounding rules, and unsupported cases.
- [ ] Protect privacy: do not transmit or save users' financial data by default.

## Required Work Before Positioning as a Reliable Calculator

### 1. Calculation Accuracy

- [ ] Verify every constant and formula in `js/tax-config.js` and `js/calculations.js` against the intended set of Polish rules.
- [ ] Document the supported year/rules, sources, review date, and all deliberate simplifications.
- [ ] Verify thresholds, reliefs, contributions, deductible costs (KUP), minimum values, limits, and calculation dependencies without introducing unconfirmed data.
- [ ] Establish the calculation order and rounding rules to grosz, and confirm that displayed totals agree with internal values.
- [ ] Check the employment, mandate, specific-work, and every B2B path, including the reverse net → gross search.
- [ ] Explain or change the annual model, which currently annualizes the monthly model.

### 2. Validation and Error Handling

- [ ] Test zero, negative, empty, incorrectly formatted, and unusually large values.
- [ ] Verify ranges and formatting for custom B2B contributions and the behavior of options unsupported by a given contract.
- [ ] Provide understandable errors at the field and preserve entered values after an error.
- [ ] Ensure stale results are not visible after an invalid calculation.

### 3. Tests and Verification

- [ ] Add source-confirmed or specialist-verified reference cases for all calculation paths.
- [ ] Add tests for thresholds, boundary values, rounding, reliefs, PPK, PIT-2, KUP, ZUS types, and the annual model.
- [x] Keep current-behavior characterization tests separate from future substantive-accuracy tests.
- [ ] Add regressions for every corrected calculation defect.
- [x] Add tests for form interactions, URL restoration, reset, and result formatting with a lightweight dependency-free DOM harness.

### 4. Accessibility and Interaction Quality

- [x] Add automated static checks for accessible labels, group names, error associations, live regions, keyboard-operable native controls, duplicate IDs, ARIA references, and required document structure.
- [ ] Complete a keyboard-only walkthrough and review focus order, reset behavior, and recalculation.
- [ ] Perform a screen-reader smoke test of labels, descriptions, errors, result updates, assumptions, and the comparison table.
- [ ] Check contrast in both themes and whether the summary remains understandable without visual formatting.
- [ ] Check the readability of the form, results, and comparison on representative mobile and desktop viewports.
- [ ] Clarify names, units, and explanations for gross pay, net pay, deductions, PIT, contributions, and employer cost.

### 5. Privacy, Documentation, and Release Readiness

- [ ] Before release, confirm that financial data remains local, and recheck for external services and unintended persistent storage.
- [ ] Maintain visible model limitations and disclaimers in the interface and documentation.
- [ ] Verify startup using the documented HTTP server, asset paths, printing, metadata, and behavior in supported browsers.
- [ ] Remove console errors and warnings found during normal use.
- [ ] Confirm that the README, plan, and changelog match the released code.

## Recommended Improvements After the Fundamentals Are Verified

- [ ] Break down employer-cost details into components if they are correctly defined for the model.
- [ ] Add explanations/a glossary and a clearer explanation of the relationships in the ranking.
- [ ] Consider an accessible comparison presentation at small widths without losing table context.
- [ ] Decide the fate of the informational VAT switch: explicitly keep it as a no-op, remove it, or model it only within a verified scope.
- [ ] Consider lump-sum-rate selection only with a documented scope and tests; the code currently uses one IT rate.
- [ ] When expanding the UI, split `main.js` into smaller modules while retaining the existing state and URL flow.

## Optional Future Development

- [ ] Verified configurations for additional tax years.
- [ ] Comparison of saved scenarios locally in the browser, with clear information about data storage.
- [ ] Export or print of a user-friendly summary after calculation verification.
- [ ] Multilingual support, backend integrations, or automatic data updates—only after defining privacy, sources, and data responsibility.

## Completion Criteria for the Required Work

- [ ] All supported calculation paths have documented rules and verified reference cases.
- [ ] Boundary cases, reverse search, and rounding are covered by tests.
- [ ] There are no known critical calculation defects, and limitations and unsupported cases are described.
- [ ] Accessibility, responsiveness, printing, and baseline browser reviews have been completed and recorded.
- [ ] The project starts with the command described in the README, and the documentation matches the code.

## Migration of Previous Notes

The previous plan file was replaced with this document after distinguishing features visible in the code from unverified claims. No separate file containing an improvement list existed in the project directory, so there was no additional list to migrate. Useful open topics from the previous plan were consolidated above as required, recommended, or optional tasks.
