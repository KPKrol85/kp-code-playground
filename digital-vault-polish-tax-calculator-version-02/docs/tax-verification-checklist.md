# Tax Constants Verification Checklist

This checklist is the release-safety workflow for tax constants and tax-model assumptions used by **Kalkulator podatkowy PL**. The source of truth for app values is `js/tax-config.js`; this document must be updated whenever any constant, assumption, limitation, or tax year metadata changes.

> **Important:** This calculator is an estimation tool only. It does not provide legal, tax, accounting, or financial advice. Passing regression tests proves that current formulas did not change unexpectedly; it does not prove that constants are officially correct.

## Verification status legend

- **Not checked** — no review has started.
- **Requires official-source verification** — value is present in the app and must be checked against an authoritative official source before release.
- **Verified** — value was checked against an authoritative official source, with source URL, date, and notes recorded.
- **Needs update** — app value differs from the checked official value or the source indicates a newer rule set.
- **Simplified model assumption** — product/model choice that may be informed by rules but does not map to one single official value.

## Authoritative source policy

Use official sources only when marking a value as **Verified**, preferably:

- Polish Ministry of Finance or `podatki.gov.pl`.
- ZUS official pages.
- Official legal acts, including ISAP or other government publication portals.
- Other official Polish government portals where the relevant rule is published.

Do not mark a row as **Verified** based on blogs, payroll calculators, accounting firm summaries, forums, AI output, or undocumented memory.

## Release-blocking note

Public/product-grade release is blocked until all of the following are complete:

1. All critical tax constants in `TAX_CONFIG` are verified against official sources or explicitly classified as simplified model assumptions.
2. `TAX_CONFIG.metadata.lastReviewed`, `TAX_CONFIG.metadata.verificationStatus`, and `TAX_CONFIG.metadata.sourceStatus` are updated to reflect the completed review.
3. The assumptions panel in the app reflects the current verification status without implying legal, tax, accounting, or financial advice.
4. `README.md` documents the current verification status and links to this checklist.
5. Regression tests pass after any tax-data or documentation update.

## Current app metadata

| Config path | App value | Expected official value | Official source name | Official source URL | Verification status | Last checked | Notes |
|---|---:|---|---|---|---|---|---|
| `metadata.taxYear` | `2026` | Tax year/rule set selected for release | Official sources matching the target tax year | TBD | Requires official-source verification | Not checked | Confirm that every value below is valid for this target year before release. |
| `metadata.lastReviewed` | `wymaga weryfikacji źródłowej` | Review date after official verification | Internal verification record plus official sources | This checklist | Requires official-source verification | Not checked | Must be replaced with a concrete date only after verification is complete. |
| `metadata.verificationStatus` | `wymaga weryfikacji w oficjalnych źródłach` | Honest release verification status | Internal verification record plus official sources | This checklist | Requires official-source verification | Not checked | Current wording correctly indicates unverified tax constants. |
| `metadata.sourceStatus` | `Stałe podatkowe i składkowe są wartościami roboczymi...` | Honest source status | Internal verification record plus official sources | This checklist | Requires official-source verification | Not checked | Current wording correctly avoids claiming official verification. |

## A. Values requiring official-source verification

### PIT scale, rates, reductions, and annualization

| Config path | App value | Expected official value | Official source name | Official source URL | Verification status | Last checked | Notes |
|---|---:|---|---|---|---|---|---|
| `constants.annualTaxFreeAmount` | `30000` | TBD | Ministry of Finance / podatki.gov.pl / official legal act | TBD | Requires official-source verification | Not checked | Verify tax-free amount for the configured tax year. |
| `constants.taxReductionMonthly` | `300` | TBD | Ministry of Finance / podatki.gov.pl / official legal act | TBD | Requires official-source verification | Not checked | App applies this as monthly PIT-2 reduction and multiplies by 12 in `calculateScaleTax`. |
| `constants.firstThreshold` | `120000` | TBD | Ministry of Finance / podatki.gov.pl / official legal act | TBD | Requires official-source verification | Not checked | Verify first PIT threshold and how it interacts with tax-free amount. |
| `constants.scaleRate1` | `0.12` | TBD | Ministry of Finance / podatki.gov.pl / official legal act | TBD | Requires official-source verification | Not checked | Verify first PIT scale rate. |
| `constants.scaleRate2` | `0.32` | TBD | Ministry of Finance / podatki.gov.pl / official legal act | TBD | Requires official-source verification | Not checked | Verify second PIT scale rate. |
| `constants.linearRate` | `0.19` | TBD | Ministry of Finance / podatki.gov.pl / official legal act | TBD | Requires official-source verification | Not checked | Verify B2B linear PIT rate and limitations. |
| `constants.lumpSumDefaultRate` | `0.12` | TBD | Ministry of Finance / podatki.gov.pl / official legal act | TBD | Requires official-source verification | Not checked | Confirm whether this duplicate default should stay aligned with `b2b.lumpSumRates.default`. |
| `constants.annualizationFactor` | `12` | N/A | N/A | N/A | Simplified model assumption | 2026-06-29 | Product assumption for monthly/yearly conversion, not a tax constant to verify as one official value. |

### Employment contract employee contribution rates and KUP

| Config path | App value | Expected official value | Official source name | Official source URL | Verification status | Last checked | Notes |
|---|---:|---|---|---|---|---|---|
| `employment.employeeContributions.pension` | `0.0976` | TBD | ZUS official pages / official legal act | TBD | Requires official-source verification | Not checked | Employee pension contribution rate. |
| `employment.employeeContributions.disability` | `0.015` | TBD | ZUS official pages / official legal act | TBD | Requires official-source verification | Not checked | Employee disability contribution rate. |
| `employment.employeeContributions.sickness` | `0.0245` | TBD | ZUS official pages / official legal act | TBD | Requires official-source verification | Not checked | Employee sickness contribution rate. |
| `employment.employeeContributions.health` | `0.09` | TBD | NFZ/ZUS/official legal act or government tax portal | TBD | Requires official-source verification | Not checked | Health contribution rate applied to gross minus employee social contributions. |
| `employment.deductibleCosts.standard` | `250` | TBD | Ministry of Finance / podatki.gov.pl / official legal act | TBD | Requires official-source verification | Not checked | Standard monthly employment deductible cost. |
| `employment.deductibleCosts.increased` | `300` | TBD | Ministry of Finance / podatki.gov.pl / official legal act | TBD | Requires official-source verification | Not checked | Increased monthly employment deductible cost. |
| `employment.ppkEmployeeRate` | `0.02` | TBD | PPK official government portal / official legal act | TBD | Requires official-source verification | Not checked | Employee PPK rate used only when the app option is selected. |

### Employer contribution rates and employer cost

| Config path | App value | Expected official value | Official source name | Official source URL | Verification status | Last checked | Notes |
|---|---:|---|---|---|---|---|---|
| `employment.employerContributions.pension` | `0.0976` | TBD | ZUS official pages / official legal act | TBD | Requires official-source verification | Not checked | Employer pension contribution rate. |
| `employment.employerContributions.disability` | `0.065` | TBD | ZUS official pages / official legal act | TBD | Requires official-source verification | Not checked | Employer disability contribution rate. |
| `employment.employerContributions.accident` | `0.0167` | TBD | ZUS official pages / official legal act | TBD | Requires official-source verification | Not checked | Accident contribution can vary; document whether this is a default assumption. |
| `employment.employerContributions.laborFund` | `0.0245` | TBD | ZUS official pages / official legal act | TBD | Requires official-source verification | Not checked | Labor Fund contribution rate. |
| `employment.employerContributions.fgsp` | `0.001` | TBD | ZUS official pages / official legal act | TBD | Requires official-source verification | Not checked | FGŚP contribution rate. |

### Mandate and specific-work contract values

| Config path | App value | Expected official value | Official source name | Official source URL | Verification status | Last checked | Notes |
|---|---:|---|---|---|---|---|---|
| `mandate.socialRates.pension` | `0.0976` | TBD | ZUS official pages / official legal act | TBD | Requires official-source verification | Not checked | Mandate pension contribution rate used by the simplified model. |
| `mandate.socialRates.disability` | `0.015` | TBD | ZUS official pages / official legal act | TBD | Requires official-source verification | Not checked | Mandate disability contribution rate used by the simplified model. |
| `mandate.socialRates.sickness` | `0.0245` | TBD | ZUS official pages / official legal act | TBD | Requires official-source verification | Not checked | App treats sickness contribution as included in mandate calculations. Verify applicability assumptions. |
| `mandate.socialRates.health` | `0.09` | TBD | NFZ/ZUS/official legal act or government tax portal | TBD | Requires official-source verification | Not checked | Health contribution rate for mandate calculations. |
| `mandate.deductibleCostsRate` | `0.2` | TBD | Ministry of Finance / podatki.gov.pl / official legal act | TBD | Requires official-source verification | Not checked | App applies 20% KUP after social contributions. |
| `specificWork.deductibleCostsRate.standard` | `0.2` | TBD | Ministry of Finance / podatki.gov.pl / official legal act | TBD | Requires official-source verification | Not checked | Standard KUP rate for specific-work contract model. |
| `specificWork.deductibleCostsRate.fiftyPercent` | `0.5` | TBD | Ministry of Finance / podatki.gov.pl / official legal act | TBD | Requires official-source verification | Not checked | 50% KUP option can depend on copyright and limits; verify and document limitations. |

### B2B ZUS presets, health assumptions, and lump-sum rates

| Config path | App value | Expected official value | Official source name | Official source URL | Verification status | Last checked | Notes |
|---|---:|---|---|---|---|---|---|
| `b2b.zus.full.social` | `1600` | TBD | ZUS official pages / official legal act | TBD | Requires official-source verification | Not checked | Monthly preset for full social ZUS; may be a rounded product preset rather than exact official amount. |
| `b2b.zus.full.healthBase` | `5200` | TBD | ZUS official pages / Ministry of Finance / official legal act | TBD | Requires official-source verification | Not checked | Health base used by simplified model. Verify whether this is an official value or model preset. |
| `b2b.zus.preferential.social` | `450` | TBD | ZUS official pages / official legal act | TBD | Requires official-source verification | Not checked | Monthly preferential social ZUS preset. |
| `b2b.zus.preferential.healthBase` | `3000` | TBD | ZUS official pages / Ministry of Finance / official legal act | TBD | Requires official-source verification | Not checked | Preferential health base used by simplified model. |
| `b2b.zus.starter.social` | `0` | TBD | ZUS official pages / official legal act | TBD | Requires official-source verification | Not checked | Starter social ZUS preset. Verify conditions and duration. |
| `b2b.zus.starter.healthBase` | `2600` | TBD | ZUS official pages / Ministry of Finance / official legal act | TBD | Requires official-source verification | Not checked | Starter health base used by simplified model. |
| `b2b.healthRates.scale` | `0.09` | TBD | ZUS official pages / Ministry of Finance / official legal act | TBD | Requires official-source verification | Not checked | Simplified scale-tax health rate applied to configured health base. |
| `b2b.healthRates.linear` | `0.049` | TBD | ZUS official pages / Ministry of Finance / official legal act | TBD | Requires official-source verification | Not checked | Simplified linear-tax health rate applied to configured health base. |
| `b2b.healthRates.lumpSum` | `0.09` | TBD | ZUS official pages / Ministry of Finance / official legal act | TBD | Requires official-source verification | Not checked | Simplified lump-sum health rate applied to configured health base. |
| `b2b.lumpSumRates.it` | `0.12` | TBD | Ministry of Finance / podatki.gov.pl / official legal act | TBD | Requires official-source verification | Not checked | IT-labelled lump-sum rate exists in config but current calculation uses `default`. |
| `b2b.lumpSumRates.default` | `0.12` | TBD | Ministry of Finance / podatki.gov.pl / official legal act | TBD | Requires official-source verification | Not checked | Current B2B lump-sum calculation uses this value for all lump-sum cases. |

### Central disclaimer text

| Config path | App value | Expected official value | Official source name | Official source URL | Verification status | Last checked | Notes |
|---|---|---|---|---|---|---|---|
| `metadata.disclaimer` | Polish no-advice disclaimer | N/A | N/A | N/A | Simplified model assumption | 2026-06-29 | Product safety copy; review with legal/tax professionals before public release. |
| `notes.disclaimer` | Polish short result disclaimer | N/A | N/A | N/A | Simplified model assumption | 2026-06-29 | UI warning copy; not an official tax value. |

## B. Simplified model assumptions and non-official values

These rows describe product assumptions or calculation simplifications. They should be reviewed for clarity and safety, but they should not be marked as official tax constants.

| Area | Current app behavior/value | Verification status | Last checked | Notes |
|---|---|---|---|---|
| Monthly/yearly conversion | Monthly amounts are annualized with `constants.annualizationFactor` (`12`); yearly input is divided by 12 before calculation. | Simplified model assumption | 2026-06-29 | Does not model irregular income, cumulative payroll behavior, or month-by-month threshold crossing. |
| PIT-2 handling | `calculateScaleTax` subtracts `taxReductionMonthly * 12` when `pit2` is enabled. | Simplified model assumption | 2026-06-29 | Verify legal applicability separately; current implementation is a simplified switch. |
| Under-26 relief | `calculateScaleTax` returns zero PIT when `under26` is true. | Simplified model assumption | 2026-06-29 | App warning says relief has an annual limit and depends on contract type; exact eligibility/limits are not modeled. |
| PPK | Employment net subtracts `grossMonthly * employment.ppkEmployeeRate` only when selected. | Simplified model assumption | 2026-06-29 | Employer PPK is not modeled as a separate employer cost item in current config. |
| B2B ZUS presets | `full`, `preferential`, and `starter` presets are flat monthly social values plus health bases. | Simplified model assumption | 2026-06-29 | Presets may not reflect exact statutory amounts, eligibility, limits, or annual changes until officially verified. |
| B2B custom ZUS | User-provided custom social and health values override preset social/health calculation. | Simplified model assumption | 2026-06-29 | User input is not official verification. |
| B2B health contribution | Health contribution is computed as `healthBase * healthRate` for presets. | Simplified model assumption | 2026-06-29 | Does not model all health-contribution bases, minimums, annual settlement, revenue bands, or deductibility nuances. |
| B2B expenses | Business expenses are not included. | Simplified model assumption | 2026-06-29 | README and metadata limitations should continue to warn about this. |
| VAT | `vatPayer` exists in collected options, but VAT is not included in calculation formulas. | Simplified model assumption | 2026-06-29 | Keep warnings clear if VAT-related UI remains present. |
| Lump-sum categories | Current lump-sum calculation uses one default rate for all cases. | Simplified model assumption | 2026-06-29 | Does not classify PKD/services or revenue bands. |
| Net-to-gross search | Binary search uses 80 max iterations and `0.05` precision. | Simplified model assumption | 2026-06-29 | Algorithmic tolerance, not an official tax value. |
| Comparison table | All contract types are recalculated using the same input/options. | Simplified model assumption | 2026-06-29 | Useful for orientation but may compare options that are not legally/economically equivalent. |
| Local history and theme | Browser-only UI features. | Simplified model assumption | 2026-06-29 | Not tax-rule values. |

## Verification workflow for future updates

1. Open `js/tax-config.js` and identify every changed value or assumption.
2. Find the relevant official source for the configured tax year.
3. Record the official value, source name, URL, verification status, reviewer/date, and notes in this checklist.
4. Update `TAX_CONFIG.metadata.lastReviewed`, `TAX_CONFIG.metadata.verificationStatus`, and `TAX_CONFIG.metadata.sourceStatus` only when the status is honestly supported by the checklist.
5. Update README if the verification status, tax year, or model limitations changed.
6. Run regression tests with `npm test` and record the result in the release notes.
7. Perform a browser smoke test to confirm the app still loads and the assumptions panel does not overstate correctness.

## Current conclusion

As of 2026-06-29, no tax constants in this checklist are marked as officially verified. The checklist is implemented as an audit workflow and release gate; official-source verification remains required before product-grade/public release.
