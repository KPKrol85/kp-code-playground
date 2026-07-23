# Calculation audit matrix

**Status as of 2026-07-23: `CURRENT BEHAVIOR DOCUMENTED`; every substantive tax rule and every configured 2026 value is `UNVERIFIED`.** This is an implementation inventory, not evidence of legal correctness. `js/tax-config.js` itself says its values need official-source verification.

## Scope, terminology, and audit statuses

- **`CURRENT BEHAVIOR DOCUMENTED`** — code path inspected and described below.
- **`UNVERIFIED`** — implementation exists, but no repository evidence establishes the substantive tax rule/value as correct.
- **`SOURCE REQUIRED`** — an official record is needed in [`tax-source-register.md`](tax-source-register.md) before the rule can be relied on.
- **`REFERENCE CASE REQUIRED`** — a source-confirmed expected-result case is needed; current regression outputs are not reference cases.
- **`NOT SUPPORTED`** — not represented by the current model.

All amounts are JavaScript `Number` values in PLN. “Gross” also labels B2B revenue in the generic result object/UI; this is presentation terminology, not a legal classification.

## Shared processing and precision

| Area | Current behavior | Status / unresolved question |
|---|---|---|
| Configuration | Constants, contract values, model metadata, and option applicability come from `js/tax-config.js`. | `CURRENT BEHAVIOR DOCUMENTED`; every substantive value `UNVERIFIED` / `SOURCE REQUIRED`. |
| Non-negative bases | `safeMax` clamps selected taxable bases and displayed burden/deductions to zero. It does not validate arbitrary negative direct function calls. | `CURRENT BEHAVIOR DOCUMENTED`; legal treatment `REFERENCE CASE REQUIRED`. |
| Internal rounding | Contract functions retain floating-point intermediate values; they do **not** round contributions, KUP, bases, PIT, health, or net per step. `round2` is used only by `netToGross`, `byPeriod`, and selected display calculations. | `CURRENT BEHAVIOR DOCUMENTED`; statutory rounding `SOURCE REQUIRED`. |
| Grosz/display | `round2(value)` uses `Math.round((value + Number.EPSILON) * 100) / 100`. Currency uses `Intl.NumberFormat('pl-PL', maximumFractionDigits: 2)`. Displayed total deductions are separately calculated as rounded/display-period gross minus net, so component display sums are not guaranteed to equal that total. | `CURRENT BEHAVIOR DOCUMENTED`; reconciliation rule `REFERENCE CASE REQUIRED`. |
| Annual mode | `main.js` divides annual input by 12, applies the monthly calculation, then `byPeriod(..., 'monthly')` rounds monthly fields to 2 decimals and multiplies each rounded field by 12 for annual display. `byPeriod(result, 'yearly')` instead divides first, but the UI calls the monthly branch. | `CURRENT BEHAVIOR DOCUMENTED`; annual payroll/settlement treatment `NOT SUPPORTED` and `SOURCE REQUIRED`. |
| Reverse search | `netToGross` starts `[0, targetNet * 2.5 + 1000]`, evaluates `grossToNet(mid)`, stops if absolute net error is at most `0.05`, otherwise moves a binary-search bound, runs at most 80 iterations, and returns `round2(best)`. It does not return convergence metadata or verify the post-rounding residual. | `CURRENT BEHAVIOR DOCUMENTED`; correctness at discontinuities/limits `REFERENCE CASE REQUIRED`. |

## Supported calculation paths

All rows below are `CURRENT BEHAVIOR DOCUMENTED`, `UNVERIFIED`, `SOURCE REQUIRED`, and `REFERENCE CASE REQUIRED` unless a cell says `NOT SUPPORTED`. `G→N` means direct `grossToNet`; `N→G` means the shared reverse search followed by that same direct path.

| Engagement / direction | Constants and functions | Current order and intermediate values | Options / deductions / contributions | Annualization and simplifications |
|---|---|---|---|---|
| Employment contract — `G→N`, `N→G` | `employment.employeeContributions` (pension, disability, sickness, health), `employment.deductibleCosts`, `ppkEmployeeRate`; `calculateEmploymentContract`, `calculateScaleTax`, `calculateEmployerCost` (display only), `grossToNet`. | `pension=gross×rate`; disability and sickness likewise; `socialTotal=sum`; `health=(gross-socialTotal)×health rate`; `kup` is selected value or standard fallback; `taxBaseMonthly=max(0,gross-socialTotal-kup)`; annual scale PIT / 12; optional PPK; `net=gross-socialTotal-health-pit-ppk`. Employer cost is `gross + gross×sum(employer rates)`. | PIT-2, under-26, standard/increased KUP, employee PPK. Employer PPK, individual eligibility, annual ZUS caps and other payroll cases are `NOT SUPPORTED`. | Shared ×12 behavior. No month-by-month thresholds, annual settlement, or individual circumstances. |
| Mandate contract — `G→N`, `N→G` | `mandate.socialRates`, `mandate.deductibleCostsRate`; `calculateMandateContract`, `calculateScaleTax`. | Social components; `social=sum`; `health=(gross-social)×health rate`; `kup=(gross-social)×20%`; `base=max(0,gross-social-kup)`; annual scale PIT / 12; net subtracts social, health, PIT. | PIT-2 and under-26 switches. UI KUP choice is ignored; PPK and B2B ZUS are `NOT SUPPORTED`. Applicability/insurance conditions are not modelled. | Shared ×12 behavior; eligibility, exemptions, and irregular/cumulative income are `NOT SUPPORTED`. |
| Specific-work contract — `G→N`, `N→G` | `specificWork.deductibleCostsRate.standard/fiftyPercent`; `calculateSpecificWorkContract`, `calculateScaleTax`. | `kup=gross×selected rate`; `base=max(0,gross-kup)`; annual scale PIT / 12; `net=gross-pit`; returned social/health fields are zero. | PIT-2, under-26, standard or 50% KUP. Social/health, 50%-KUP qualifications/limits, and other cases are `NOT SUPPORTED`. | Shared ×12 behavior. |
| B2B tax scale — `G→N`, `N→G` | `b2b.zus.*`, `healthRates.scale`; `resolveZus`, `calculateB2BScale`, `calculateScaleTax`. | Resolve preset, or custom social/health; `social`; preset `health=healthBase×rate`, custom health direct; `baseAnnual=max(0,(gross-social)×12)`; scale PIT / 12; net subtracts social, health, PIT. | PIT-2 affects this model; under-26 and KUP are ignored; preset ZUS full/preferential/starter or custom social/health; VAT is informational only. Business expenses, full health rules/annual settlement and VAT cash flow are `NOT SUPPORTED`. | Shared ×12 behavior. |
| B2B flat/linear — `G→N`, `N→G` | `b2b.zus.*`, `healthRates.linear`, `constants.linearRate`; `resolveZus`, `calculateB2BLinear`. | Resolve ZUS; health as above; `base=max(0,gross-social)`; `pit=base×linearRate`; net subtracts social, health, PIT. | ZUS variants/custom values; PIT-2, under-26, KUP ignored; VAT informational. Expense deductions and health/PIT nuances are `NOT SUPPORTED`. | Shared ×12 display only; direct PIT itself is monthly. |
| B2B lump-sum — `G→N`, `N→G` | `b2b.zus.*`, `healthRates.lumpSum`, `lumpSumRates.default`; `resolveZus`, `calculateB2BLumpSum`. | Resolve ZUS; health as above; `pit=gross×default lump-sum rate`; net subtracts social, health, PIT. | ZUS variants/custom values; PIT-2, under-26, KUP ignored; VAT informational. Rate classification, revenue bands, deductions, and eligibility are `NOT SUPPORTED`; config `it` rate is unused by calculation. | Shared ×12 display only; no annual bands/settlement. |
| Comparison — `G→N`, `N→G` | `generateComparison`, all six functions above. | Runs every contract with the same amount/options. `N→G` searches each row independently, then recalculates. `burden=max(0,(1-net/gross)×100)`. | UI disables/ignores inapplicable options according to `OPTION_APPLICABILITY`; direct API callers can still supply values. Cross-model comparison is not equivalence evidence. | Uses monthlyized input from `main.js`; same simplifications as each row. |

## Tax-scale subpath and options

`calculateScaleTax(taxBaseAnnual, pit2, under26)` is used by employment, mandate, specific work, and B2B scale. Under-26 immediately returns zero PIT. Otherwise it subtracts `annualTaxFreeAmount` (clamped at zero), taxes the first band up to `firstThreshold - annualTaxFreeAmount` at `scaleRate1`, remaining base at `scaleRate2`, subtracts `taxReductionMonthly × 12` when PIT-2 is true, then clamps tax to zero. This is `CURRENT BEHAVIOR DOCUMENTED`; relief eligibility, limits, thresholds, deduction order, PIT-2 applicability, and rounding are all `UNVERIFIED`, `SOURCE REQUIRED`, and `REFERENCE CASE REQUIRED`.

## Rounding and verified-future work

**Current behavior:** calculations use unrounded binary floating-point intermediates; `netToGross` rounds only its returned gross; `byPeriod` rounds all result fields to grosz before annual multiplication; result cards/currency formatting show at most two decimals. The comparison table formats raw gross/net to two decimals and rounds burden separately. There is no internal-versus-displayed-total assertion.

**Intended future verified behavior:** define order-specific rounding, taxable-base precision, annualization, display reconciliation, and solver acceptance criteria only after official sources and specialist review establish them.

**Unresolved:** all configured constants; applicability/limits of under-26, PIT-2, KUP and PPK; all ZUS/health/flat/lump-sum treatment; annual thresholds; discontinuities in reverse search; and reference results for every supported path.
