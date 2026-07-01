# Kalkulator podatkowy PL — Improvements Plan

## 1. Executive Summary

Kalkulator podatkowy PL is a lightweight, static, vanilla JavaScript calculator for estimating Polish gross/net salary outcomes, employer cost, and cross-contract comparisons. The current implementation already has a clear split between layout (`index.html`), styling (`css/style.css`), central tax constants (`js/tax-config.js`), calculation logic (`js/calculations.js`), formatting helpers (`js/utils.js`), and UI orchestration (`js/main.js`).

The product is useful as a KP_Code Digital Vault tool because it solves a practical, high-intent decision problem: quickly comparing take-home pay across employment, civil-law contracts, and B2B cooperation models. It is not yet product-grade for a financial/tax calculator, mainly because calculation assumptions are simplified, tax-rule metadata and official verification workflow are not visible enough, and there are no automated regression tests for calculation behavior.

The recommended direction is to preserve the static architecture and transparent calculation model while improving trust, correctness checks, accessibility, UX clarity, and documentation. Future work should focus first on making assumptions explicit and testable, not on adding complex features or frameworks.

## 2. Current Project Map

### Application structure

- `README.md` documents the project purpose, main features, file structure, central tax configuration rule, and disclaimer/limitations.
- `index.html` contains the full static application layout: hero, disclaimer, theme switcher, calculator form, results section, comparison table, and calculation history.
- `css/style.css` defines a premium mobile-first visual layer using custom properties, semantic color tokens, BEM-like class names, card layouts, responsive grid behavior, focus styles, and reduced-motion handling.
- `js/tax-config.js` centralizes tax thresholds, contribution rates, B2B ZUS presets, B2B health rates, lump-sum defaults, and a disclaimer note.
- `js/calculations.js` contains all gross/net calculation functions, reverse net-to-gross search, employer cost calculation, comparison generation, and monthly/yearly result shaping.
- `js/utils.js` contains currency formatting, rounding, numeric parsing, and safe non-negative clamping.
- `js/main.js` handles DOM wiring, form collection, theme persistence, quick scenarios, result rendering, comparison rendering, warnings, validation, local history, and initialization.
- No `package.json`, automated test setup, build pipeline, or linting configuration is currently present.

### Calculation engine

- Gross-to-net is implemented through a dispatch map in `grossToNet()`, covering employment, mandate, specific work, B2B scale, B2B linear, and B2B lump sum.
- Net-to-gross is implemented through iterative binary search in `netToGross()`, with configurable maximum iterations and precision.
- Monthly/yearly input handling is present in the UI flow: yearly input is divided by 12 before calculation, and rendered values are expanded back into monthly/yearly views through `byPeriod()`.
- Employment contract calculations include employee pension, disability, sickness, health contribution, deductible costs, PIT scale tax, optional PIT-2, optional under-26 tax relief, and optional employee PPK.
- Employer cost is calculated only for employment and includes employer pension, disability, accident, labor fund, and FGŚP contribution rates.
- Mandate contract calculations include pension, disability, sickness, health, 20% deductible costs, PIT scale tax, PIT-2, and under-26 relief.
- Specific work contract calculations include 20% or 50% deductible costs and PIT scale tax, without social or health contributions.
- B2B scale, linear, and lump-sum calculations use simplified ZUS presets or custom values, simplified health contributions, and simplified PIT models.
- The comparison feature recalculates all supported contract types for the same monthly amount or target net amount, depending on selected direction.
- Rounding is applied in helper functions and period shaping, but many intermediate calculations remain unrounded until rendering.

### UI and UX

- The form supports amount, calculation direction, monthly/yearly period, contract type, additional options, deductible cost type, B2B ZUS type, custom B2B ZUS values, and quick scenarios.
- Results render as cards with monthly values and corresponding yearly values.
- Comparison renders as a horizontally scrollable table with contract type, gross, net, and effective burden.
- Warnings render dynamically for B2B and under-26 selections and always append the central disclaimer from `TAX_CONFIG.notes.disclaimer`.
- Validation prevents non-positive or invalid amounts and clears results/comparison when the amount is invalid.
- Calculation history is persisted in `localStorage`, limited to eight entries, and can reload amount and contract type.
- Light, dark, and system theme choices are available and persisted in `localStorage`.
- Empty history state is present; empty result state before interaction is not prominent because the app runs an initial calculation with an empty amount and shows validation text.
- Mobile behavior is supported through a single-column layout by default, responsive cards, and horizontal table overflow.

### Accessibility

- Main sections use headings and `aria-labelledby`.
- Direction and additional options use `fieldset` and `legend`.
- Inputs and selects have visible labels.
- Validation and result/warning areas use live regions.
- Focus-visible styles are defined for inputs, selects, buttons, and history buttons.
- Reduced motion is respected through `prefers-reduced-motion`.
- Theme buttons use `aria-pressed` via JavaScript and are grouped with an accessible label.
- The comparison table has a basic header row, but could benefit from a caption, scoped headers, and clearer assumptions text.
- Custom ZUS fields are visually hidden with CSS when not applicable, but no explicit `hidden`, `aria-hidden`, or disabled state is currently managed.
- Some options remain visible even when not applicable to the selected contract type, which can create cognitive and accessibility confusion.

### Documentation

- README is concise and useful, but it is not yet complete enough for a financial estimator.
- It documents limitations and central tax config, but does not provide local run instructions, official-source verification process, tax-rule version date, manual QA checklist, examples, known simplifications, or release checklist.
- There are no separate assumption notes, audit logs, changelog, or test documentation files.

### Testing

- No automated tests are present.
- Calculation functions are relatively testable because they are exported as ES modules and separated from UI code.
- There is no documented manual smoke-test matrix for supported contract types, period handling, reverse calculations, B2B ZUS modes, under-26, PIT-2, 50% KUP, or invalid inputs.
- There is no snapshot/golden-file set for expected calculation outputs.

### Product trust/disclaimer state

- A visible hero disclaimer states that results are approximate and not legal, tax, or accounting advice.
- README repeats the disclaimer and warns that individual cases require accountant verification.
- `TAX_CONFIG.notes.disclaimer` centralizes a short warning used in UI output.
- Tax constants are centralized, but there is no visible tax year, source list, last reviewed date, reviewer note, official-source checklist, or assumption panel.
- The B2B model is especially simplified and should be labeled more explicitly before the calculator is presented as product-grade.

## 3. Strengths to Preserve

- Static vanilla frontend architecture with no build step, no framework dependency, and lightweight deployment potential.
- Clear file separation between structure, styles, tax configuration, calculations, utilities, and UI behavior.
- Tax rates, thresholds, B2B presets, and notes are centralized in `js/tax-config.js` rather than scattered throughout UI files.
- Multiple supported contract/cooperation models are already covered: employment, mandate, specific work, B2B scale, B2B linear, and B2B lump sum.
- Reverse net-to-gross calculation exists and uses a simple deterministic iterative method.
- Results include both monthly and yearly views.
- Employment employer-cost calculation is already implemented.
- Comparison table across all contract types is already available.
- Visible disclaimer exists in the hero and warning output.
- Mobile-first responsive CSS, theme support, focus styles, and reduced-motion support are already present.
- Quick scenarios and local calculation history add product value without requiring a backend.

## 4. Main Risks and Gaps

- Tax constants and contribution assumptions require official verification before public or portfolio-grade release.
- The model is intentionally simplified but the UI does not expose enough assumptions near the results.
- No tax-rule metadata exists: no tax year, source URLs, last-reviewed date, or update owner.
- No automated regression tests exist for high-risk calculation logic.
- Net-to-gross is approximate and should be documented with tolerance and edge-case behavior.
- Monthly/yearly handling is simple and may not represent all annual tax threshold interactions accurately for irregular income.
- Under-26 relief is modeled broadly and may be misleading for some contract types or income limits.
- B2B calculations are highly simplified: no business expenses, VAT cash-flow explanation, health contribution nuances, lump-sum revenue bands/categories, or ZUS annual limits.
- Some options are globally visible even when irrelevant to the selected contract type, which can confuse users and distort comparison assumptions.
- The comparison table can be misleading without visible shared assumptions and applicability notes.
- Accessibility is good for a static MVP but needs a full pass for table semantics, hidden/disabled fields, validation messaging, and keyboard-only flows.
- README is too short for a tax/finance estimator and lacks run instructions, QA process, test strategy, and limitation matrix.

## 5. 10-Point Improvement Plan

### Improvement 1 — Add tax-rule metadata and visible assumptions panel

Priority: P0

Goal: Make the calculator’s legal/tax context transparent by showing which tax assumptions and simplifications are being used.

Why it matters: Users need to know that the calculator is an estimate, which tax year or rule set it targets, when constants were reviewed, and which cases are intentionally simplified. This is the highest trust improvement because calculation tools can easily be misread as advice.

Recommended implementation:

- Extend `js/tax-config.js` with metadata fields such as `taxYear`, `lastReviewed`, `sourceStatus`, `assumptions`, and `limitations`.
- Add a visible assumptions/disclaimer section in `index.html`, preferably near results or below the form.
- Render or reference the central assumptions from `js/main.js` without duplicating tax text across files.
- Keep copy concise but explicit: approximate results, simplified B2B, under-26 limits, annual/monthly simplification, no individual reliefs.

Expected files:

- `js/tax-config.js`
- `index.html`
- `js/main.js`
- `css/style.css`
- `README.md`

Acceptance criteria:

- The UI displays tax-rule year or metadata and last-reviewed status.
- The UI includes a visible assumptions/limitations panel before or near results.
- Disclaimer text remains visible and does not imply legal, tax, accounting, or financial advice.
- Tax assumptions are not hardcoded in `main.js` or `index.html` when they belong in `tax-config.js`.
- Existing calculations and result rendering remain unchanged.

Risks / notes:

- Do not overstate official correctness unless constants have been verified separately.
- Use neutral language such as “estimated,” “simplified,” and “requires verification.”

Implementation status: Implemented

Completed on: 2026-06-29

Files changed: `js/tax-config.js`, `index.html`, `js/main.js`, `css/style.css`, `README.md`, `improvements-plsn.md`

Notes: Added central tax-rule metadata and a visible assumptions panel rendered from `TAX_CONFIG`. README now documents the model year, simplified assumptions, verification status, disclaimer, and update location. Tax constants were not officially verified in this task and still require official-source verification. Future related tasks, especially official-source verification and calculation regression tests, remain in the roadmap.

### Improvement 2 — Create calculation regression tests

Priority: P0

Goal: Add automated tests for calculation outputs, reverse calculation behavior, comparison generation, and period shaping.

Why it matters: Salary/tax calculators are correctness-sensitive. Even small formula changes can silently break trust. The current calculation modules are already separated enough to test without a browser.

Recommended implementation:

- Add a minimal test setup that can run ES modules in Node, preferably with the built-in Node test runner if compatible.
- Create deterministic test cases for each contract type at representative income levels.
- Include tests for gross-to-net, net-to-gross tolerance, employment employer cost, monthly/yearly shaping, invalid or zero-like behavior, custom ZUS, under-26, PIT-2, and 50% KUP.
- Keep expected outputs in tests or a small fixture file with clear comments that values reflect the current simplified model, not official advice.

Expected files:

- `package.json` if a test script is introduced
- `test/calculations.test.js` or similar
- `js/calculations.js` only if small export/testability adjustments are unavoidable
- `README.md`

Acceptance criteria:

- A single documented command runs all calculation tests.
- Tests cover all six contract types.
- Tests include at least one net-to-gross round-trip assertion with tolerance.
- Tests fail if key tax constants or formulas change unexpectedly.
- No browser or backend is required to run calculation tests.

Risks / notes:

- Do not change formulas while adding tests unless a separate correction task explicitly asks for it.
- Expected values should be labeled as regression values for the current simplified implementation.

Implementation status: Implemented

Completed on: 2026-06-29

Files changed: `package.json`, `test/calculations.test.js`, `README.md`, `improvements-plsn.md`

Notes: Added lightweight Node.js calculation regression tests for the current simplified formulas. Tests cover all six contract/cooperation types, net-to-gross round-trip tolerance, employment employer cost, period shaping, comparison generation, and selected option smoke cases. Tax constants still require official-source verification. Calculation formulas, constants, UI behavior, and comparison logic were not changed.

### Improvement 3 — Add official-source verification checklist for tax constants

Priority: P0

Goal: Create a repeatable verification workflow for all tax constants and assumptions.

Why it matters: The app centralizes tax values, but there is no audit trail proving where constants came from or when they were checked. This is a major release-readiness gap for any public financial estimator.

Recommended implementation:

- Add a checklist document or README section mapping each constant group to an official source to verify.
- Include fields for source name, source URL, checked value, app value, reviewer/date, and notes.
- Cover PIT thresholds/rates, tax-free amount, PIT-2 reduction, employee/employer ZUS rates, KUP values, B2B ZUS presets, health rates, and lump-sum defaults.
- Add a “do not release if unchecked” note to the release checklist.

Expected files:

- `README.md` or `docs/tax-verification-checklist.md`
- `js/tax-config.js` if metadata fields are added
- `improvements-plsn.md` can remain the roadmap only; the checklist should be a future implementation artifact

Acceptance criteria:

- Every value in `TAX_CONFIG` has a named verification row or category.
- The checklist separates official values from simplified product assumptions.
- The app clearly states when values are unverified or need review.
- Future tax updates can be performed by editing `js/tax-config.js` and updating the checklist.

Risks / notes:

- Avoid relying on unofficial summaries as primary sources for release verification.
- This should not introduce paid APIs or runtime dependencies.

Implementation status: Implemented

Completed on: 2026-06-29

Files changed: `docs/tax-verification-checklist.md`, `README.md`, `improvements-plsn.md`

Notes: Added an official-source verification checklist that maps all major `TAX_CONFIG` constant groups, separates official-source values from simplified model assumptions, and documents release-blocking verification requirements. Tax constants remain marked as requiring official-source verification unless they are model assumptions; no formulas or constants were changed.

### Improvement 4 — Complete accessibility validation pass

Priority: P1

Goal: Improve keyboard, screen-reader, and validation accessibility without changing the core visual identity.

Why it matters: The calculator handles forms, dynamic results, warnings, tables, hidden fields, and theme controls. These areas need robust semantics so the app is usable beyond mouse/visual interaction.

Recommended implementation:

- Add a table caption and scoped table headers to the comparison table.
- Ensure custom ZUS fields are disabled and/or hidden semantically when not applicable.
- Add `aria-describedby` connections for amount validation, assumptions, and high-risk options.
- Verify focus order across theme buttons, form controls, submit, results, table, and history.
- Consider adding a skip link if the page grows.
- Ensure dynamic warnings are announced without being overly noisy.

Expected files:

- `index.html`
- `js/main.js`
- `css/style.css`

Acceptance criteria:

- Full keyboard flow works without traps.
- Hidden custom ZUS fields are not announced or submitted when inactive unless intentionally supported.
- Comparison table has a useful caption and header scopes.
- Validation message is programmatically associated with the amount input or form.
- Theme buttons expose correct pressed state.
- Reduced-motion behavior remains intact.

Risks / notes:

- Do not remove existing visible labels or fieldsets.
- Accessibility changes should not alter calculation behavior.

Implementation status: Implemented

Completed on: 2026-06-30

Files changed: `index.html`, `js/main.js`, `css/style.css`, `improvements-plsn.md`

Notes: Completed the accessibility validation pass by adding a skip link, comparison table caption and scoped headers, amount validation/help associations, concise helper text for high-risk options, semantic inactive states for hidden custom ZUS fields, clearer theme button pressed/selected labels, and calmer polite live-region behavior for validation, warnings, and results. Calculation formulas, tax constants, comparison calculations, and calculation outputs were not changed.

### Improvement 5 — Add option applicability rules by contract type

Priority: P1

Goal: Prevent irrelevant options from appearing active for contract types where they do not apply, and explain comparison assumptions clearly.

Why it matters: The current form shows options such as PIT-2, PPK, VAT payer, deductible costs, and B2B ZUS globally. Some are irrelevant or partially relevant depending on contract type, which can confuse users and make comparisons seem more precise than they are.

Recommended implementation:

- Define an applicability map in `js/tax-config.js` or a clearly named UI config object.
- In `js/main.js`, disable or visually de-emphasize non-applicable fields for the selected contract type.
- Add short helper text explaining why an option is disabled or ignored.
- Ensure comparison generation either uses documented shared assumptions or displays a note that not every option applies equally to every model.

Expected files:

- `js/tax-config.js` or `js/main.js`
- `index.html`
- `css/style.css`
- `README.md`

Acceptance criteria:

- B2B-only settings are disabled/hidden for non-B2B contracts.
- PPK is clearly employment-only.
- 50% KUP is clearly applicable where supported by the simplified model.
- VAT payer is either implemented as an assumption or clearly marked as not affecting net result.
- Comparison output includes a concise assumptions note.

Risks / notes:

- Do not silently change calculation inputs in a way that surprises users.
- Keep the first pass simple; dynamic help text is enough before adding advanced option logic.

Implementation status: Implemented

Completed on: 2026-06-30

Files changed: `js/tax-config.js`, `index.html`, `js/main.js`, `css/style.css`, `README.md`, `improvements-plsn.md`

Notes: Added a central option applicability map and connected the form to contract-specific active, ignored, informational, and not-applicable states. B2B-only ZUS/VAT controls, custom ZUS fields, PPK, PIT-2, under-26 relief, and KUP modes now expose clearer disabled or helper states according to the current simplified model. Added a comparison assumptions note near the table. Calculation formulas, `TAX_CONFIG` constants, and regression outputs were not changed.

### Improvement 6 — Clarify and extend B2B model assumptions

Priority: P1

Goal: Make B2B outputs more transparent and prepare a safe path for future expenses and lump-sum improvements.

Why it matters: B2B outcomes depend on many variables: business expenses, VAT, ZUS status, health contribution bases, lump-sum categories, revenue thresholds, and deductibility rules. The current model is useful but simplified.

Recommended implementation:

- Add explicit B2B assumption notes in `TAX_CONFIG` and UI assumptions panel.
- Explain that VAT payer currently does not change take-home results unless a future task implements VAT cash-flow display.
- Add a future-ready configuration structure for B2B expense assumptions, but do not implement expenses until a dedicated task.
- Later MVP: allow monthly business expenses for scale/linear calculations and show how they affect taxable base.
- Later MVP: expose lump-sum rate selection with safe defaults and clear industry/category descriptions.

Expected files:

- `js/tax-config.js`
- `index.html`
- `js/main.js`
- `css/style.css`
- `README.md`

Acceptance criteria:

- Current B2B simplifications are visible before users rely on results.
- VAT checkbox behavior is documented or the option is deferred/disabled until meaningful.
- No B2B feature claims exceed implemented formulas.
- Future expense/lump-sum work has clear boundaries and test requirements.

Risks / notes:

- Do not add complex B2B formulas without official verification and tests.
- Avoid presenting lump-sum default rate as universal.

Implementation status: Implemented

Completed on: 2026-07-01

Files changed: `js/tax-config.js`, `index.html`, `js/main.js`, `css/style.css`, `README.md`, `docs/tax-verification-checklist.md`, `improvements-plsn.md`

Notes: Added explicit B2B model assumptions, clarified VAT as informational in the current model, documented missing B2B expenses/VAT/accounting-cost logic, and added future-safe boundaries for later B2B expense and lump-sum improvements. Calculation formulas and tax constants were not changed.

### Improvement 7 — Polish result and comparison UX with clearer context

Priority: P2

Goal: Make results easier to interpret and reduce the chance that comparison numbers are misunderstood.

Why it matters: The app already renders useful cards and a comparison table, but users need context: selected period, selected contract, assumptions used, employer cost availability, and comparison basis.

Recommended implementation:

- Add a small summary line above results showing input amount, direction, period, selected contract, and key options.
- Add empty states for results and comparison before a valid calculation.
- In result cards, group related values or order them by importance: gross, net, effective burden, PIT, ZUS/social, health, employer cost.
- In comparison, highlight the selected contract row.
- Add a note that employer cost is shown for employment only unless future models define equivalent cost.

Expected files:

- `index.html`
- `js/main.js`
- `css/style.css`

Acceptance criteria:

- Users can tell exactly what input and assumptions produced the displayed result.
- Selected contract is visually distinguishable in comparison.
- Empty/invalid states are calm and informative.
- Employer cost is not shown as zero in a way that suggests non-employment employer costs were calculated.
- No formula changes are introduced in this UX pass.

Risks / notes:

- Keep cards readable on mobile.
- Do not overload the UI with long tax explanations; link to or collapse assumptions when necessary.

### Improvement 8 — Add print-friendly and shareable summary

Priority: P2

Goal: Allow users to save or share a transparent calculation summary without adding backend storage.

Why it matters: A salary/tax comparison is often used in negotiation, planning, or discussion. A print-friendly view and optional URL-state sharing improve product usefulness while preserving static deployment.

Recommended implementation:

- Add print CSS that formats hero, assumptions, selected inputs, results, and comparison cleanly.
- Add a print button that calls `window.print()`.
- Consider URL query parameters for amount, direction, period, contract type, and safe options in a later iteration.
- Ensure shared URL state, if added, never stores sensitive personal data beyond user-entered calculator values.

Expected files:

- `index.html`
- `css/style.css`
- `js/main.js`
- `README.md`

Acceptance criteria:

- Printed output includes disclaimer and assumptions.
- Printed output excludes unnecessary interactive controls where appropriate.
- Print layout is readable on A4/mobile print previews.
- URL-state behavior, if implemented later, is documented and tested.
- No backend or account system is introduced.

Risks / notes:

- URL sharing should not happen automatically without clear user intent.
- Print/share must include limitations so screenshots are not detached from disclaimers.

### Improvement 9 — Strengthen code maintainability and module boundaries

Priority: P2

Goal: Keep the static app easy to evolve as features, tests, and trust metadata grow.

Why it matters: `main.js` currently owns many responsibilities: theme, scenarios, validation, rendering, warnings, history, form state, and calculation orchestration. It is still manageable, but future features could make it difficult to maintain.

Recommended implementation:

- After tests exist, split `main.js` only where it clearly reduces responsibility: theme handling, history handling, rendering, and form state can become small modules.
- Move labels, contract display names, scenario presets, and option applicability into a central UI/config object if they grow.
- Keep formulas in `js/calculations.js` and constants/assumptions in `js/tax-config.js`.
- Avoid framework migration unless the product scope changes substantially.
- Add lightweight linting/formatting only if it does not create a heavy toolchain.

Expected files:

- `js/main.js`
- possible future files such as `js/rendering.js`, `js/history.js`, `js/theme.js`, or `js/ui-config.js`
- `README.md`
- `package.json` only if tooling is introduced

Acceptance criteria:

- Calculation logic remains free of DOM dependencies.
- Tax values remain centralized in `js/tax-config.js`.
- UI modules have clear responsibilities and no circular dependencies.
- Existing behavior is covered by smoke/regression checks before module splitting.
- Static deployment remains simple.

Risks / notes:

- Do not refactor before adding tests unless the change is very small.
- Avoid premature abstraction; this is a small static product.

### Improvement 10 — Expand documentation and release-readiness workflow

Priority: P2

Goal: Turn the README and supporting docs into a practical operating manual for future maintainers and Codex sessions.

Why it matters: A financial estimator needs clear setup, assumptions, QA, verification, limitation, and release documentation. This prevents future changes from weakening trust.

Recommended implementation:

- Update README with local run instructions, browser support assumptions, feature matrix, limitations, tax-rule metadata, and testing commands once tests exist.
- Add a manual QA checklist covering all contract types, both directions, both periods, invalid inputs, B2B custom ZUS, quick scenarios, theme switching, history, mobile, keyboard, and console errors.
- Add release-readiness checklist with tax verification status, assumption visibility, tests, accessibility, README, and screenshots if relevant.
- Document what the calculator intentionally does not do.

Expected files:

- `README.md`
- optional `docs/manual-qa.md`
- optional `docs/release-checklist.md`

Acceptance criteria:

- A new maintainer can run, test, audit, and release the static app from documentation alone.
- Limitations are specific, not generic.
- Documentation references central tax config as the only source for rates/thresholds.
- The README does not claim production-grade readiness until verification and tests exist.

Risks / notes:

- Documentation must stay synchronized with actual behavior.
- Avoid adding future features to README as if they already exist.

## 6. Suggested Implementation Order

### Stage 1 — Trust and correctness foundation

Relevant improvements:

- Improvement 1 — Add tax-rule metadata and visible assumptions panel
- Improvement 2 — Create calculation regression tests
- Improvement 3 — Add official-source verification checklist for tax constants

Goal: Make the current app auditable and safer before expanding features.

### Stage 2 — UX and accessibility polish

Relevant improvements:

- Improvement 4 — Complete accessibility validation pass
- Improvement 5 — Add option applicability rules by contract type
- Improvement 7 — Polish result and comparison UX with clearer context

Goal: Reduce user confusion and improve usability without changing formulas.

### Stage 3 — Product-grade comparison tools

Relevant improvements:

- Improvement 6 — Clarify and extend B2B model assumptions
- Improvement 8 — Add print-friendly and shareable summary
- Improvement 9 — Strengthen code maintainability and module boundaries

Goal: Make the calculator more useful for real comparison workflows while keeping it static and transparent.

### Stage 4 — Digital Vault expansion

Relevant improvements:

- Improvement 10 — Expand documentation and release-readiness workflow
- Revisit Improvement 6 for more advanced B2B expenses/lump-sum variants only after verification and tests exist.

Goal: Prepare the tool for portfolio-grade presentation and future KP_Code Digital Vault packaging.

## 7. Recommended Next Codex Prompts

1. **Add assumptions panel and tax-rule metadata**  
   Add central tax-rule metadata and assumptions to `js/tax-config.js`, render a visible assumptions panel in the UI, and update README without changing formulas.

2. **Create calculation regression tests**  
   Add a lightweight automated test setup for `js/calculations.js` covering all contract types, period shaping, employer cost, and net-to-gross tolerance without changing current formulas.

3. **Create official tax constants verification checklist**  
   Add a documentation checklist that maps every `TAX_CONFIG` constant group to official-source verification fields and release-blocking status.

4. **Improve accessibility and option applicability**  
   Add table caption/header scopes, semantic hidden/disabled behavior for custom ZUS fields, validation descriptions, and contract-specific option states without changing calculation formulas.

5. **Polish results and comparison context**  
   Add a calculation summary line, selected comparison row highlight, clearer empty states, and comparison assumptions note while preserving the current static architecture.

## 8. Release Readiness Checklist

- [ ] Tax constants verified against official sources.
- [ ] Tax-rule metadata visible in the UI: tax year/rule set, last reviewed date, and verification status.
- [ ] Assumptions and limitations visible near results and documented in README.
- [ ] Disclaimer visible in the hero, result context, and print/share output if added.
- [ ] Automated calculation regression tests added and passing.
- [ ] Net-to-gross approximation tolerance documented and tested.
- [ ] All six contract types covered by tests or documented manual QA.
- [ ] Monthly and yearly handling verified with representative examples.
- [ ] B2B simplifications documented, especially expenses, VAT, ZUS, health contribution, and lump-sum assumptions.
- [ ] Under-26 and PIT-2 limitations documented.
- [ ] Option applicability verified by contract type.
- [ ] Comparison section includes assumptions and does not imply perfect equivalence across contract models.
- [ ] Mobile layout checked on narrow and medium viewports.
- [ ] Keyboard-only flow checked.
- [ ] Screen-reader semantics checked for form groups, validation, dynamic results, and table.
- [ ] Reduced-motion behavior checked.
- [ ] Dark/light/system theme behavior checked.
- [ ] Calculation history checked for local-only persistence and expected restoration behavior.
- [ ] URL state checked if implemented.
- [ ] Print/share output checked if implemented.
- [ ] Browser console has no errors during normal use.
- [ ] README includes local run instructions, feature matrix, limitations, tests, and release process.
- [ ] No tax values are duplicated outside `js/tax-config.js` unless they are labels or non-calculation examples.
- [ ] The app is not described as legal, tax, accounting, or financial advice.
