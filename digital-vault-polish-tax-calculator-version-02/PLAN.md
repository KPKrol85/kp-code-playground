# Polish Tax Calculator Development Plan

## Project status

The repository contains a static, vanilla JavaScript calculator that estimates gross-to-net and approximate net-to-gross outcomes for six selected Polish employment and B2B models. It is a working calculator and portfolio-style implementation with regression tests, not a release candidate for tax-critical or public production use. The most important limitation is that the configured tax and contribution values are explicitly marked as requiring official-source verification; the model is also intentionally simplified, especially for annual handling and B2B.

## Current verified scope

- [x] Static HTML/CSS/ES-module application with no backend or build pipeline.
- [x] Six calculation models: employment, mandate, specific work, B2B scale, B2B linear, and B2B lump sum.
- [x] Gross-to-net calculations and iterative, approximate net-to-gross calculations.
- [x] Monthly input and simplified yearly input/output handling based on annualization by 12.
- [x] Results, an employment-only employer-cost estimate, and a comparison table.
- [x] Model-specific option applicability, deductible-cost choices, B2B ZUS presets/custom values, quick scenarios, and an informational VAT-payer control.
- [x] Local history (maximum eight entries), local theme preference, print and copy actions after valid calculations.
- [x] Responsive styling, theme controls, focus-visible styles, reduced-motion rules, skip link, labels/fieldsets, live regions, table caption, and scoped headers.
- [x] Node.js regression tests and documented tax-verification, manual-QA, and release checklists.
- [ ] Official verification of the configured tax year/rule set and calculation constants.
- [ ] Completed manual browser, accessibility, and release verification evidence.

## Development principles

- Keep calculation behavior deterministic and keep formulas separate from DOM rendering where practical.
- Keep tax configuration values, assumptions, limitations, metadata, and option applicability centralized in `js/tax-config.js`; do not duplicate calculation values without a justified non-calculation purpose.
- Make every documented tax-rule claim traceable to repository evidence and, before release, to recorded official sources.
- Preserve accessibility, responsive behavior, local-only processing, and clear disclaimer language.
- Document unsupported cases, simplifications, rounding, and calculation assumptions plainly; do not imply professional advice or legal compliance.

## Roadmap phases

### 1. Calculation correctness — required

- [ ] Verify every configured formula and constant against the intended Polish ruleset using the official-source checklist.
- [ ] Confirm whether the configured `2026` metadata is the actual supported ruleset; otherwise update or remove the claim only after evidence is recorded.
- [ ] Review thresholds, allowances, deductions, contribution values, B2B presets, health calculations, and lump-sum treatment.
- [ ] Verify calculation order and dependencies for every contract model and option combination.
- [ ] Define and document rounding, decimal precision, solver tolerance, and display-formatting rules.
- [ ] Test threshold transitions, zero, negative, empty, malformed, and unusually large inputs.
- [ ] Confirm displayed totals and annualized values match internal calculations.
- [ ] Identify calculations that still need tax-expert or manual verification.

### 2. Input validation and error handling — required

- [x] Reject non-positive calculation amounts and clear result/comparison output for invalid calculations.
- [ ] Define acceptable upper ranges and numeric-format behavior for every numeric input.
- [ ] Add or verify field-level errors for invalid custom B2B contribution values and unsupported combinations.
- [ ] Confirm valid user input is preserved after validation errors and controls cannot produce misleading partial results.

### 3. User interface and interaction quality — recommended

- [x] Provide result context, warnings, empty-state messaging, selected-row highlighting, print/copy controls, responsive cards, and table overflow handling.
- [ ] Review primary-total hierarchy, labels, units, assumptions, recalculation, and reset/clear behavior with representative users.
- [ ] Test mobile, tablet, and desktop layouts and ensure empty, error, and completed states remain clear.
- [ ] Review keyboard interaction and focus movement after dynamic updates.

### 4. Accessibility — required before public release

- [x] Implement baseline semantic sections, labels, fieldsets, live regions, focus indicators, reduced-motion rules, a skip link, table caption, and header scopes.
- [ ] Complete keyboard-only and screen-reader testing, including result updates, errors, disabled controls, and dynamic option-help wording.
- [ ] Review heading hierarchy, color contrast, and whether summaries remain understandable without visual styling.
- [ ] Record completed accessibility checks in the manual QA checklist.

### 5. Testing and verification — required

- [x] Maintain Node.js regression coverage for all six models, reverse-calculation tolerance, employer cost, annualization, selected options, custom ZUS, and zero handling.
- [ ] Add boundary, threshold, rounding, missing-input, formatting/localization, and option-combination tests.
- [ ] Add regression tests whenever a verified calculation defect is corrected.
- [ ] Run and record manual UI, browser-console, print/copy, storage, theme, and responsive checks.
- [ ] Confirm the README commands work in the intended development environment.

### 6. Architecture and maintainability — recommended

- [x] Keep calculations in a DOM-independent module and keep tax configuration separate from presentation.
- [ ] Review module boundaries, naming, state flow, storage handling, and potential duplicated or obsolete code/assets.
- [ ] Avoid magic numbers and duplicate formulas; prepare configuration boundaries for verified future rulesets only when needed.
- [ ] Add lightweight formatting or linting only if it improves maintenance without imposing an unnecessary toolchain.

### 7. Privacy, security, and legal clarity — required before public release

- [x] Use browser-local storage for theme preference and calculation history; no backend is implemented.
- [ ] Verify runtime network behavior and third-party assets before release.
- [ ] Document storage clearing behavior or implement a clear-history control with appropriate confirmation and tests.
- [ ] Ensure entered values are not exposed through URLs, logs, analytics, error messages, or future integrations without explicit intent.
- [ ] Keep the informational disclaimer visible and document when official guidance or professional advice is needed.

### 8. Performance and technical quality — recommended

- [ ] Review unnecessary dependencies, duplicated assets, loading behavior, console warnings, and production asset paths.
- [ ] Test representative viewport sizes and supported browsers.
- [ ] Verify the static-server workflow and any eventual deployment configuration.

## Release readiness — required

- [ ] Officially verify or honestly re-scope all configured tax claims.
- [ ] Complete the tax-verification, manual-QA, and release checklists with review evidence.
- [ ] Verify installation/run, test, and static-preview commands; there is currently no build command.
- [ ] Confirm metadata, title, asset paths, browser support, privacy behavior, and disclaimer visibility.
- [ ] Confirm critical calculation paths, boundaries, rounding, accessibility, and responsive behavior are tested.
- [ ] Confirm README, PLAN, CHANGELOG, UI text, and configuration do not make unverified tax or release claims.

## Optional future development

- [ ] Support additional verified tax years or rulesets through separately verified configuration.
- [ ] Add comparison modes only after their assumptions can be explained consistently.
- [ ] Add user-controlled saved scenarios, printable/exportable summaries, or multilingual UI.
- [ ] Consider verified B2B expense inputs, rate classification, or VAT cash-flow presentation only with explicit scope and tests.
- [ ] Consider backend services, accounts, or external integrations only after a privacy and security design review.

## Definition of done

The calculator is ready for its intended public or portfolio release only when:

- [ ] Every supported calculation path and configuration claim is verified for the stated ruleset or clearly removed/re-scoped.
- [ ] Critical boundaries, thresholds, invalid inputs, option combinations, and rounding behavior are tested.
- [ ] Documentation and UI match the source code, and unsupported cases and limitations are visible.
- [ ] Accessibility and responsive behavior have been manually reviewed and recorded.
- [ ] Local-data behavior and any external-resource behavior have been reviewed.
- [ ] All documented commands work, no known critical calculation defects remain, and the release checklist has a recorded ready decision.
