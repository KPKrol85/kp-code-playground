# Release Readiness Checklist

Use this checklist for every candidate release of **Kalkulator podatkowy PL**.

Reviewer:  
Date:  
Version / commit:  
Release decision: `ready` / `blocked`  
Notes:  

## Tax verification and model transparency

- [ ] Tax constants in `js/tax-config.js` are verified against official sources or explicitly marked as simplified model assumptions.
- [ ] `docs/tax-verification-checklist.md` has been reviewed and updated for this release.
- [ ] `TAX_CONFIG.metadata.taxYear`, `lastReviewed`, `verificationStatus`, and `sourceStatus` honestly reflect the current verification state.
- [ ] Tax-rule metadata is visible in the UI.
- [ ] Assumptions and limitations are visible near results or in the assumptions panel.
- [ ] Disclaimer is visible, honest, and does not imply legal, tax, accounting, or financial advice.
- [ ] Under-26 and PIT-2 limitations are documented.
- [ ] Option applicability has been verified for all contract/cooperation types.
- [ ] Comparison assumptions have been verified and remain visible.
- [ ] No tax values are duplicated outside `js/tax-config.js` unless they are labels, regression expectations, or non-calculation examples.

## Calculation and test readiness

- [ ] Automated tests pass with `npm test`.
- [ ] Net-to-gross tolerance is documented and tested.
- [ ] All six contract/cooperation types are covered by automated tests or manual QA.
- [ ] Monthly/yearly handling has been checked.
- [ ] B2B simplifications are documented.
- [ ] VAT behavior is documented as informational if it remains non-calculation behavior.
- [ ] Employment employer-cost interpretation has been checked.
- [ ] Regression expectations have been reviewed if formulas or constants changed.

## Manual QA and accessibility

- [ ] `docs/manual-qa.md` has been completed or updated for this release.
- [ ] Mobile layout checked at narrow and medium widths.
- [ ] Comparison table overflow checked on mobile.
- [ ] Keyboard-only flow checked.
- [ ] Screen-reader semantics checked: labels, fieldsets, validation message, live regions, table caption/header scopes, hidden/disabled fields.
- [ ] Reduced-motion behavior checked.
- [ ] Light, dark, and system theme checked.
- [ ] Calculation history checked, including save/restore/local-only persistence and current limit behavior.
- [ ] Browser console is clean during normal use.

## Documentation and release assets

- [ ] README is updated with run instructions, test command, architecture, feature matrix, assumptions, limitations, documentation map, and safe release note.
- [ ] `docs/tax-verification-checklist.md` links or references remain accurate.
- [ ] `docs/manual-qa.md` reflects actual implemented behavior and does not describe future features as present.
- [ ] `docs/release-checklist.md` reflects current release gates.
- [ ] Screenshots are updated if the repo uses screenshots for this app.
- [ ] App copy and docs do not describe the calculator as legal, tax, accounting, or financial advice.

## Release decision

- [ ] Ready — all release-blocking checks passed and notes are recorded.
- [ ] Blocked — at least one release-blocking check failed or remains incomplete.

Decision notes:

```text

```
