# Future Improvement Plan

## P1: Important next improvements
- Add a manual light/dark theme toggle while preserving `prefers-color-scheme` as the default.
- Add an export action for Markdown audit reports so users can save and share audit output.
- Add basic empty/error states for localStorage failures or unavailable browser storage.
- Add a small QA checklist for keyboard navigation, reduced motion, light mode, dark mode, and mobile overflow.
- Introduce automated accessibility checks with a lightweight browser-based test workflow when the project gains package scripts.

## P2: Quality improvements
- Add a print-friendly report layout for recommendations and category scores.
- Add rule filters for status, severity, and category.
- Add a progress indicator that shows reviewed rules versus total applicable rules.
- Add a clearer status legend explaining pass, warning, fail, and N/A scoring impact.
- Add more component presets for navigation bars, modals, tables, drawers, landing pages, and ecommerce sections.
- Add a small visual regression checklist using fixed viewport screenshots.

## P3: Optional future enhancements
- Allow users to paste HTML/CSS snippets for deterministic static analysis.
- Add visual overlay concepts for spacing, alignment, focus order, and overflow risk.
- Add saved audit projects with browser-local persistence before introducing any backend.
- Add shareable JSON import/export for audit state.
- Add AI-assisted review only after deterministic evidence capture and user-controlled report generation exist.

## Future feature ideas
- Rule-template editor for custom team standards.
- Severity profiles for startup MVP, production SaaS, enterprise, and accessibility-first reviews.
- Audit comparison view for before/after improvement passes.
- Component-specific recommendation packs.
- Report cover page with product metadata and reviewer notes.

## Future UI/UX ideas
- Add compact and comfortable density modes for the checklist.
- Improve category score visualization with accessible labels and richer summaries.
- Add persistent in-page table of contents for large rule sets.
- Add keyboard shortcuts for advancing through rule statuses.
- Add a first-run onboarding panel explaining the audit workflow.

## Technical debt to watch
- Keep generated HTML templates small; if rendering grows, split render helpers by component.
- Avoid adding global CSS utilities unless they solve repeated real needs.
- Keep class names component-scoped and avoid returning to broad element selectors.
- Monitor CSS feature support if the target browser matrix expands beyond modern evergreen browsers.
- Keep audit scoring deterministic and covered by tests before introducing richer status models.

## Testing/QA ideas
- Add unit tests for scoring edge cases, including all N/A statuses and missing statuses.
- Add DOM smoke tests for rendering presets, updating statuses, and resetting audits.
- Add accessibility smoke tests for labels, headings, focus order, and color contrast.
- Add viewport checks at 320px, 480px, 760px, 1024px, and desktop widths.
- Add reduced-motion verification for hover and transition-heavy states.
