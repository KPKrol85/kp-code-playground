# Official tax-source register

This register is the evidence record for the unverified calculation model. It does **not** establish a rule merely by naming an institution. Do not enter guessed URLs, inferred publication dates, unofficial summaries, or undocumented values.

**Current status (2026-07-23): `SOURCE REQUIRED`.** No identifiable official source record is present in this repository, so no substantive rule is verified here.

## Required record format

| Field | Record value |
|---|---|
| Rule or constant | Exact rule/config path and any model assumption being reviewed. |
| Supported tax year | The intended year (currently metadata says 2026) or `TBD`. |
| Official institution | Issuer, e.g. Ministry of Finance, ZUS, official legislation publisher, or official PPK institution. |
| Official source title | Exact title as published by the institution. |
| Source location | Official URL, official journal/act citation, or stable government document identifier. Never guess. |
| Publication/effective date | Date from the source, or `TBD`. |
| Repository review date | Date an identified source was checked against code. |
| Affected calculation paths | Named functions/contracts/UI paths. |
| Implementation location | File and config/function path. |
| Verification status | `UNVERIFIED`, `SOURCE REQUIRED`, `REFERENCE CASE REQUIRED`, or a later evidence-backed status. |
| Reviewer notes | Scope, exceptions, extracted value, rounding instructions, and follow-up/reference-case needs. |

## Required source records

| Rule group | Supported tax year | Official institution/source required | Affected paths | Implementation location | Status |
|---|---|---|---|---|---|
| PIT scale, allowance, thresholds, PIT-2, under-26, KUP | 2026 (claimed metadata; not confirmed) | Polish Ministry of Finance or `podatki.gov.pl`; official legislation | Employment, mandate, specific work, B2B scale | `TAX_CONFIG.constants`; employment/mandate/specificWork config; `calculateScaleTax` | `SOURCE REQUIRED` |
| Employee/employer and mandate social/health contributions | 2026 | ZUS; official legislation; appropriate official public institution for health rules | Employment, mandate, employer cost | contribution config; employment/mandate functions; `calculateEmployerCost` | `SOURCE REQUIRED` |
| PPK employee rate and scope | 2026 | Official PPK information or official legislation | Employment | `employment.ppkEmployeeRate`; employment function | `SOURCE REQUIRED` |
| B2B ZUS preset amounts, eligibility, health bases/rates | 2026 | ZUS; Ministry of Finance/`podatki.gov.pl`; official legislation as applicable | B2B scale, linear, lump sum | `b2b.zus`, `b2b.healthRates`, `resolveZus` | `SOURCE REQUIRED` |
| B2B linear and lump-sum rules/rates/classification | 2026 | Ministry of Finance or `podatki.gov.pl`; official legislation | B2B linear, lump sum | `linearRate`, `lumpSumRates`; B2B functions | `SOURCE REQUIRED` |
| Annualization, rounding, displayed-total reconciliation | 2026 / model behavior | Official sources and/or qualified specialist where rules apply; product decision for display-only behavior | All paths and reverse search | `calculations.js`, `utils.js`, `main.js` | `SOURCE REQUIRED` / `REFERENCE CASE REQUIRED` |

## Recording procedure

1. Add one completed record per rule/value family only after locating the actual official source.
2. Compare its effective date and scope with the intended 2026 configuration and record exceptions.
3. Update the implementation only in a separately reviewed calculation-change task when evidence requires it.
4. Add source-confirmed expected-result tests only after the source record covers the rule and rounding assumptions.
5. Do not change `TAX_CONFIG.metadata` to imply verification until this register contains sufficient, reviewable evidence.
