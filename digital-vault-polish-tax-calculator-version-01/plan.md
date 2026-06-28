# Digital Vault Polish Tax Calculator — Audit and Development Plan

## 1. Current Status

`digital-vault-polish-tax-calculator-version-01` is a static, vanilla frontend calculator for estimating Polish earnings, taxes, social contributions, health contributions, employer cost, and cooperation model comparisons. The current implementation is already more than a prototype: it has a clear landing section, a calculator form, result cards, a comparison table, dark/light/system theme support, URL state restoration, contextual warnings, and separated JavaScript modules for configuration, calculations, utilities, and UI orchestration.

The product direction is appropriate for the KP_Code Digital Vault ecosystem: fast, focused, informative, and useful as a practical decision-support tool. The next development stage should not be a rewrite. It should be a staged product hardening process focused on calculation transparency, correctness validation, trust signals, accessibility, mobile polish, and maintainable expansion.

Important tax/legal note: the calculator currently presents a 2026-oriented simplified model. Before production positioning, the project needs visible tax-rule version metadata, explicit assumptions, source/update notes, QA examples, and a clear disclaimer that results are estimates and not tax, legal, accounting, or financial advice.

## 2. Existing Features

### Core calculator flows

- Gross-to-net calculation.
- Net-to-gross calculation using an iterative binary-search approach.
- Monthly and yearly input modes.
- Contract type selection:
  - employment contract / `umowa o pracę`,
  - mandate contract / `umowa zlecenie`,
  - specific work contract / `umowa o dzieło`,
  - B2B progressive scale,
  - B2B linear tax,
  - B2B lump sum.
- Quick amount buttons for common values.
- Reset flow that clears query parameters and restores the empty state.

### Options currently exposed

- Under-26 relief toggle.
- PPK participation toggle.
- PIT-2 monthly reduction toggle.
- Deductible cost option: standard, elevated, or 50%.
- B2B-specific option section displayed only for B2B contract types.
- VAT payer toggle in the B2B section.
- ZUS type selection: full, preferential, starter, or custom values.
- Custom B2B social and health contribution inputs.

### Result and comparison output

- Primary summary cards for gross, net, and employer cost when available.
- Detailed deduction list for social contributions, health contribution, PIT, PPK, and total deductions.
- Contextual note explaining period conversion.
- Contract comparison table ranking cooperation types by highest net result for gross-to-net mode or lowest gross amount for net-to-gross mode.
- Visual relationship bars in the comparison table.
- URL synchronization for shareable/restorable state, including amount, direction, period, contract type, common options, and custom ZUS values.

### UI and brand direction

- Professional hero section with Digital Vault framing.
- Step-based layout: input, results, comparison.
- Modern panel/card visual system.
- Design-token CSS variables for colors, shadows, typography scale, radius, and theme behavior.
- Light, dark, and system theme support with persisted preference.
- Responsive CSS with mobile table transformation.

## 3. Technical Audit

### Architecture

The project uses a clean static structure:

- `index.html` contains the semantic shell, form controls, result containers, and theme bootstrap script.
- `css/style.css` contains all styling, design tokens, responsive rules, and theme variants.
- `js/tax-config.js` centralizes tax parameters, contribution rates, ZUS presets, and disclaimer copy.
- `js/calculations.js` contains calculation functions for each contract type plus comparison generation.
- `js/utils.js` contains formatting, parsing, rounding, and period conversion helpers.
- `js/main.js` handles DOM references, theme controls, form state, validation, rendering, query synchronization, and event listeners.

This separation is worth preserving. It is simple, framework-free, understandable, and aligned with a lightweight Digital Vault tool.

### Strengths worth preserving

- Vanilla ES modules keep the app dependency-light and easy to host.
- Tax constants are not hardcoded throughout the UI; most important numbers live in `tax-config.js`.
- Calculation functions are exported, which makes future unit testing realistic.
- `netToGross` is implemented generically on top of `grossToNet`, reducing duplicated reverse-calculation logic.
- The theme bootstrap script runs before CSS loads, reducing flash-of-wrong-theme risk.
- Query-string state makes calculations restorable and shareable without backend infrastructure.
- B2B conditional UI avoids overwhelming non-B2B users.
- The UI already uses many semantic elements such as `form`, `fieldset`, `legend`, `section`, `table`, and labeled inputs.

### Technical gaps and risks

- There is no automated test suite for calculations, URL state restoration, validation, or rendering.
- Calculation assumptions are not yet displayed in a structured, source-like way for each contract type.
- `vatPayer` is collected and restored but does not appear to affect calculations. This is acceptable only if clearly labeled as informational, otherwise it creates a trust risk.
- The same option object is passed into all comparison calculations, which may produce misleading comparisons because some options are contract-specific. For example, B2B ZUS options apply to B2B, but employment-specific PIT/PPK/deductible-cost options may need different applicability rules.
- The `sickness` option is referenced in mandate-contract calculations, but there is no visible UI control for it. This makes mandate sickness contribution behavior unclear.
- B2B calculations do not include business costs/expenses, VAT treatment, mixed expense deductibility, health contribution deductibility/caps, or other real-world tax-planning details.
- Annual calculations are currently derived by converting user input to a monthly amount and applying a simplified monthly model. This is useful for quick estimates, but it should be disclosed as a model choice because true annual payroll/tax calculations can differ.
- There is no build, lint, test, or formatting workflow documented in the project.
- `main.js` mixes theme management, state parsing, validation, DOM rendering, and URL syncing. It is acceptable at the current size, but future features should be extracted into smaller modules before the file becomes difficult to maintain.

## 4. UX/UI Audit

### Current UX direction

The current user journey is strong:

1. User reads a concise product promise and simplified-model notice.
2. User enters an amount.
3. User selects direction, period, contract type, and options.
4. Results update live after input/change.
5. User sees a selected-contract result and a broader contract comparison.

The layout communicates a professional calculator product rather than a throwaway demo. The visual language is clean, modern, and suitable for a financial tool.

### UX strengths

- Step labels make the flow easy to follow.
- Quick amount buttons reduce friction.
- Result cards prioritize the most important numbers.
- Contract comparison is a high-value differentiator because users often want to understand employment vs B2B tradeoffs.
- Contextual warnings appear near the calculator form.
- Dark/light/system theme control is a polished touch.
- Query-state support enables sharing/reopening a calculation.

### UX improvement opportunities

- Add a simple/advanced mode split. The current form exposes several advanced concepts immediately; a simple mode could ask only for amount, direction, period, and contract type.
- Add explanatory tooltips or helper text for PIT-2, under-26 relief, PPK, deductible costs, ZUS type, health contribution, and employer cost.
- Add a structured assumptions panel near results so users know exactly which tax year, rates, thresholds, and simplifications were used.
- Improve result hierarchy with clearer labels such as `Take-home pay`, `Your gross`, `Employer total cost`, and `Total public-law deductions`.
- Add a tax-threshold progress indicator for annual taxable base, especially for progressive scale calculations.
- Add side-by-side scenario comparison for two or three saved variants.
- Add a print/download summary action after calculation.
- Consider a sticky mobile result summary after the user enters a valid amount.
- Clarify whether yearly mode means annualized input under a simplified monthly model or a true annual tax calculation.
- Add empty-state guidance in the comparison table, not only in the results panel.

## 5. Calculation Logic Audit

### Current calculation model

The calculator currently uses simplified formulas for:

- progressive PIT thresholds,
- tax-free amount relief,
- PIT-2 monthly relief,
- employee social contributions,
- employee health contribution,
- PPK employee and employer rates,
- employer-side employment costs,
- mandate and specific-work deductible cost options,
- under-26 relief for selected contracts,
- B2B scale, linear, and lump-sum variants,
- B2B ZUS presets and custom contribution overrides.

### Calculation strengths

- The logic is concentrated in a dedicated calculation module.
- Contract-specific functions make the model readable and extendable.
- Rounding is centralized through utility helpers.
- Net-to-gross is calculated consistently by reusing gross-to-net functions.
- Configurable rates make future tax-year updates easier than if all values were embedded in UI code.

### Calculation concerns to address before production

#### P0 / correctness-sensitive

- Validate every configured 2026 rate and threshold against authoritative sources before product release. If any values are provisional, estimated, or simplified, mark them explicitly.
- Add golden test cases for each contract type and direction. Without tests, future changes can silently break financial results.
- Resolve the PIT model discrepancy: `calculateAnnualScaleTax` subtracts tax-free relief, while `calculateMonthlyPit` applies progressive tax divided by 12 and optionally PIT-2 relief. The intended behavior should be verified and documented for each contract type.
- Review under-26 relief handling. Current implementation subtracts exempt revenue from annual tax base, but professional-grade handling should account for eligibility, contract applicability, annual limit, and interaction with costs/contributions.

#### P1 / production-readiness

- Document exact assumptions for each contract type directly in the UI.
- Add a tax-year selector or at minimum a visible `Tax rules version: 2026` metadata block.
- Add a calculation QA checklist with expected examples and tolerances.
- Make option applicability explicit. Options that do not apply to a selected contract should be hidden, disabled, or explained.
- Decide whether `vatPayer` should be removed, labeled as future/informational, or wired into a future VAT/cost module.
- Add business expense inputs for B2B before positioning B2B results as practical profitability estimates.
- Add support for choosing lump-sum rate instead of always using a hardcoded IT rate.

#### P2 / advanced usefulness

- Add annual income planner with threshold progress and expected PIT movement during the year.
- Add employer total cost breakdown card for employment contracts.
- Add health contribution visibility by calculation basis.
- Add B2B costs/expenses, revenue, VAT, and post-cost taxable base sections.
- Add effective tax rate and effective total burden with clear definitions.
- Add monthly vs yearly result toggle inside results, even when input mode differs.

## 6. Accessibility Audit

### Current accessibility positives

- The page uses a semantic heading hierarchy and landmark-like structure.
- The calculator uses a real `form` element.
- Radio groups are wrapped in `fieldset` and `legend`.
- Inputs and selects have visible labels.
- Theme buttons expose `aria-pressed` and descriptive labels.
- Results and warning areas use `aria-live` so updates can be announced.
- The amount input has an associated error message element.
- Responsive design preserves mobile access to table values via `data-label` cells.

### Accessibility issues and improvements

#### P0 / serious accessibility

- Link the amount input to its error message with `aria-describedby="amount-error"` and set `aria-invalid` when validation fails.
- Ensure keyboard focus is visible and consistent across all interactive elements, including quick amount buttons and checkbox cards.
- Ensure hidden conditional sections do not leave disabled/irrelevant controls in the focus or announcement flow.

#### P1 / production-readiness

- Add helper text for advanced options and connect it with `aria-describedby` where appropriate.
- Announce major result changes in a concise way; avoid overly verbose repeated screen-reader announcements on every keystroke.
- Review color contrast in both light and dark themes, especially muted text, warning panels, selected segmented controls, and table bars.
- Add accessible names or captions for the comparison table. A `<caption>` could summarize what the table compares.
- Consider a non-table card comparison view for small screens if the current responsive table becomes too dense.
- Add `autocomplete` and input hints where helpful.

#### P2 / polish

- Add skip link to the calculator/results area if this tool becomes embedded in a larger Digital Vault page.
- Respect reduced-motion preferences for all animated theme and hover behavior.
- Add manual accessibility QA checklist using keyboard-only navigation and screen-reader smoke testing.

## 7. Performance and Maintainability Notes

### Performance

The current app should be fast because it is static, has no framework runtime, uses a single local variable font, and performs lightweight calculations. Performance risks are currently low.

Recommended future checks:

- Keep JavaScript small and avoid introducing a framework unless a later product requirement truly needs it.
- Avoid heavy charting libraries for simple visualizations; use CSS bars or lightweight inline SVG.
- Add lazy/non-blocking behavior only if future assets grow.
- Consider debouncing live calculation if future logic becomes significantly heavier.
- Keep font loading optimized and verify no layout shift from font swap.

### Maintainability

- Keep `tax-config.js` as the source of truth for configurable rates.
- Split future rendering helpers out of `main.js` before adding export/print/scenario features.
- Add tests before refactoring formulas.
- Introduce clear naming for model concepts: `revenue`, `gross`, `taxBase`, `contributionBase`, `net`, `employerCost`, and `takeHome`.
- Use small pure helpers for tax-year calculations to avoid business logic hidden in DOM code.
- Preserve BEM-like class naming and token-based CSS.
- Add comments only where tax formula assumptions are not obvious; avoid over-commenting simple UI code.

## 8. Product Opportunities

### Professional calculator patterns to adopt

Without copying another product's branding or design, the project can borrow common professional calculator patterns:

- prominent take-home summary,
- monthly and yearly result tabs,
- contribution breakdown cards,
- employer cost section,
- assumptions and tax-year metadata,
- visible legal/tax disclaimer,
- comparison mode for employment vs B2B,
- scenario saving and side-by-side comparison,
- downloadable PDF/print summary,
- permalink/shareable URL,
- clear validation and inline helper text,
- dedicated simple and advanced modes,
- educational explanations beside complex tax terms.

### High-value feature ideas

- **Simple salary calculator mode:** amount, direction, period, contract type, calculate.
- **Advanced tax breakdown mode:** exposes PIT, ZUS, health, KUP, PPK, reliefs, and assumptions.
- **Contract type comparison:** already exists; improve with applicability notes and clearer ranking criteria.
- **Employment vs B2B profitability calculator:** include business expenses, VAT assumptions, accounting costs, paid leave, sick leave, and invoice net/gross concepts.
- **Annual income planner:** show annual threshold progress, monthly tax base, and warning when crossing 120,000 PLN taxable threshold.
- **Tax-year selector:** start with `2026` only, then support historical configurations once reliable data is added.
- **Result export:** print-friendly summary and future PDF/share option.
- **Saved presets:** localStorage scenarios such as `Full-time employment`, `B2B linear with full ZUS`, or user-created presets.
- **Localization-ready copy:** centralize UI strings if Polish/English versions or other Digital Vault embedding contexts become likely.
- **QA accuracy panel:** internal or visible page with sample calculations and last-reviewed date.

## 9. Recommended Feature Roadmap

### Stage 1 — Trust and correctness foundation

Goal: make the current calculator safe to improve and more transparent.

- Add calculation unit tests for all exported calculation functions.
- Create a small test fixture file with representative inputs and expected outputs.
- Add visible tax-rule version metadata and last-reviewed date.
- Add an assumptions/disclaimer panel near results.
- Audit 2026 rates and mark any simplified or unverified values.
- Fix accessibility linkage for validation errors.
- Clarify unused or currently informational options such as VAT payer.

### Stage 2 — UX clarity and option applicability

Goal: reduce confusion and make results easier to trust.

- Add simple/advanced mode.
- Hide or disable options that do not apply to the selected contract type.
- Add helper text/tooltips for PIT-2, PPK, KUP, under-26 relief, and ZUS types.
- Add a comparison-table caption and improved empty state.
- Add clearer result labels and definitions.
- Improve mobile result cards and comparison readability.
- Add a threshold progress indicator for progressive tax scenarios.

### Stage 3 — Product-grade comparison tools

Goal: turn the calculator into a decision-support product.

- Add side-by-side scenario comparison.
- Add B2B expense inputs and accounting-cost input.
- Add lump-sum tax rate selection.
- Add employer cost breakdown.
- Add monthly/yearly result toggle independent of input period.
- Add print-friendly summary and browser print button.
- Add shareable URL improvements with compact parameter names or encoded state.

### Stage 4 — Digital Vault product expansion

Goal: create premium utility and ecosystem value.

- Add saved presets in localStorage.
- Add historical tax-year selector with separate config objects.
- Add guided wizard for `employment vs B2B` decisions.
- Add downloadable branded report.
- Add checklist for assumptions users should confirm with an accountant.
- Add optional lead-generation or newsletter CTA after useful non-intrusive results.
- Add content modules explaining Polish tax concepts in plain language.

## 10. Priority Plan

### P0: Critical correctness, broken flows, serious accessibility

- Verify and document all tax parameters before production use.
- Add automated calculation regression tests.
- Add visible tax-year/version metadata and stronger assumptions/disclaimer language.
- Fix amount validation accessibility with `aria-describedby` and `aria-invalid`.
- Review PIT/tax-free/PIT-2 logic for consistency and document the intended model.
- Resolve option ambiguity for `vatPayer` and mandate sickness contribution.

### P1: Important before production-quality positioning

- Add assumptions panel for selected contract and active options.
- Add helper text for tax concepts.
- Improve option applicability by contract type.
- Add comparison table caption and better mobile comparison guidance.
- Add calculation QA checklist in documentation.
- Add print styles and a print summary button.
- Add employer cost breakdown.

### P2: Useful polish and professional feature additions

- Add simple/advanced mode.
- Add threshold progress indicator.
- Add monthly/yearly result toggle.
- Add lump-sum rate selector.
- Add B2B expense and accounting-cost inputs.
- Add scenario comparison.
- Add saved presets.
- Add localized copy structure if needed.

### P3: Future premium/product ideas

- Historical tax-year selector with verified datasets.
- Branded downloadable report.
- Guided employment-vs-B2B decision wizard.
- Educational tax glossary and explainers.
- Digital Vault integration with other calculators and saved user workspace.
- Premium scenario library for freelancers, employees, contractors, and founders.

## 11. Future Monetization / Digital Vault Product Potential

This project has strong Digital Vault potential because users repeatedly need salary, contract, and B2B comparison tools when negotiating compensation, changing jobs, freelancing, or planning yearly income.

Possible product positioning:

- Free core calculator with transparent assumptions.
- Premium scenario comparison and saved presets.
- B2B profitability report with expenses, VAT assumptions, and accounting-cost modeling.
- Downloadable branded PDF for negotiation planning.
- Educational bundle explaining Polish tax and employment models.
- Integration with other Digital Vault tools such as invoice calculators, freelance pricing tools, mortgage affordability calculators, and cost-of-living planners.

Monetization should not compromise trust. Any premium features should keep disclaimers visible and avoid implying guaranteed tax outcomes.

## 12. Risks and Important Notes

- Tax law, ZUS rates, health contribution rules, reliefs, and limits can change. The calculator must show when rules were last reviewed.
- A simplified monthly model may differ from payroll systems and year-end tax settlement.
- B2B results can be materially wrong if business expenses, VAT, accounting costs, insurance, paid leave, and health contribution deductibility are ignored.
- Contract-specific options can mislead if they are shown globally without applicability notes.
- Financial calculators need strong accessibility because forms and tables are frequent sources of screen-reader and keyboard-navigation issues.
- The project should avoid legal/tax certainty claims and should continue to present results as estimates.
- New features should be added incrementally; do not introduce a framework unless the static vanilla approach becomes a proven blocker.

## 13. Suggested Next Codex Tasks

1. Add a visible tax-rule metadata and assumptions panel using the existing `TAX_CONFIG` values.
2. Add `aria-describedby` and `aria-invalid` behavior for amount validation.
3. Create a small vanilla JavaScript calculation test harness for exported calculation functions.
4. Add contract-option applicability rules so irrelevant controls are hidden, disabled, or explained.
5. Add helper text/tooltips for PIT-2, PPK, KUP, under-26 relief, ZUS type, and B2B health contribution.
6. Add a comparison table caption and improve the comparison empty state.
7. Add print-friendly CSS and a `Print summary` button after valid results.
8. Add a lump-sum rate selector for B2B ryczałt instead of using only the hardcoded IT rate.
9. Add a B2B expenses section with a clearly simplified model and explicit assumptions.
10. Add a progressive-tax threshold progress indicator for scale-tax scenarios.
11. Add simple/advanced mode while preserving the current advanced controls.
12. Add localStorage saved scenarios for up to three named calculation presets.

## Recommended Next Codex Prompts

1. **Accessibility validation pass:** "In `digital-vault-polish-tax-calculator-version-01`, update only the amount input validation so it uses `aria-describedby`, toggles `aria-invalid`, and keeps the current visual design unchanged."
2. **Assumptions panel:** "Add a compact assumptions panel near the results that reads from `js/tax-config.js`, shows tax year, key rates, simplification notes, and the existing disclaimer without changing calculation formulas."
3. **Calculation tests:** "Create a lightweight test script for `js/calculations.js` using Node ES modules with representative gross-to-net and net-to-gross cases for each contract type. Do not add external dependencies."
4. **Option applicability:** "Refine the form so options that do not apply to the selected contract type are disabled or annotated, especially VAT payer, PPK, PIT-2, deductible costs, and B2B ZUS options. Preserve existing calculations."
5. **Helper text:** "Add concise helper text for PIT-2, PPK, KUP, under-26 relief, ZUS type, and custom ZUS fields, using accessible descriptions connected to the relevant controls."
6. **Comparison accessibility:** "Improve the comparison table accessibility by adding a caption, better empty state copy, and clearer mobile labels while preserving the existing table layout."
7. **Print summary:** "Add print-friendly CSS and a print summary button that appears after valid results, without generating PDFs or adding dependencies."
8. **Lump-sum selector:** "Add a B2B ryczałt rate selector powered by `TAX_CONFIG.b2bLumpSumRates`, wire it into calculations, and keep existing IT rate as the default."
9. **Threshold indicator:** "Add a small progressive-tax threshold progress indicator for employment and B2B scale results, based on the current calculated annual base assumptions."
10. **Simple/advanced mode:** "Add a simple/advanced mode toggle that hides advanced options by default while preserving current state, URL sync, and all existing controls."
11. **B2B expenses MVP:** "Add a clearly labeled simplified B2B expense input that reduces B2B taxable base, includes an assumptions warning, and updates tests."
12. **Saved presets:** "Add localStorage saved calculation presets with save/load/delete for up to three scenarios, keeping URL sharing behavior intact."
