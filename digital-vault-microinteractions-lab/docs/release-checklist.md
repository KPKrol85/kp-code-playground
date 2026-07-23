# Release-readiness checklist

This checklist prepares a release decision; it is not evidence that browser, accessibility, or manual QA work has been performed. Record a date, reviewer, environment, and link/capture for each completed item. Use **Not run**, **Pass**, **Fail**, or **Blocked** until a decision is made.

## Targets and evidence

- [ ] Decide the browser and operating-system support targets, then verify the lab in each target. The project currently has no approved support matrix.
- [ ] Decide a local-preview approach and document it only after it has been exercised in the approved targets. Opening `index.html` is a contributor instruction, not release-readiness evidence.
- [ ] Attach manual QA evidence for the functional scenarios in [`release-readiness-browser-qa.md`](release-readiness-browser-qa.md), including any failures and their resolution.
- [ ] Record a keyboard-only review of the skip link, theme toggle, filters, cards, preview controls, code tabs, and copy controls.
- [ ] Record a reduced-motion review of focus, selection, loading, status, and representative medium-motion previews.
- [ ] Record contrast and focus-visibility findings in both light and dark themes; do not claim conformance without an appropriate audit.
- [ ] Complete a Polish content and language review of labels, descriptions, snippets, accessibility notes, toast feedback, and empty states.
- [ ] Verify Clipboard API success, selection-based fallback, and failure guidance in the approved browser targets.
- [ ] Preserve a clean-console capture after the agreed manual QA sweep; investigate unexpected errors, warnings, and rejected promises.

## Delivery decision

- [ ] Run `node scripts/validate-catalogue.js` and retain its output with release evidence.
- [ ] Synchronize `README.md`, `PLAN.md`, `CHANGELOG.md`, contributor guidance, and browser-QA records with verified scope and outcomes.
- [ ] Decide and record the packaging status: continue as a static demo, or approve a separately scoped packaging effort. Do not describe this lab as a production component package unless that decision and work exist.
