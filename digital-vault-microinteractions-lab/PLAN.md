# Product Plan — KP_Code Microinteractions Lab

## Status and direction

KP_Code Microinteractions Lab is a static, Polish-first Digital Vault demo for browsing frontend microinteractions, inspecting controlled previews, and copying framework-free snippets. The current baseline is data-driven and runs directly in a browser without a build step, backend, or dependency installation.

The next development priority is not catalogue expansion. It is to make the existing experience repeatable to verify, maintainable as the catalogue changes, and ready for a deliberate release decision. Optional product packaging ideas remain separate from required quality work.

## Verified baseline

- [x] The page has a semantic application shell with a skip link, header, main content, navigation, footer, and a live toast region.
- [x] The catalogue is generated from a single JavaScript interaction data set and currently contains 32 patterns.
- [x] Search and category, complexity, and motion filters can be combined; the interface includes result feedback, reset controls, and a textual empty state.
- [x] Interaction metadata uses defined taxonomy values, required fields, startup validation, and Polish labels for filters and cards.
- [x] Selecting a card updates the preview and code panel from the selected interaction; previews are rendered through a controlled renderer map with a safe fallback.
- [x] Every normalized interaction exposes HTML, CSS, and string JavaScript snippet fields, and the interface supports tabbed viewing and copy actions.
- [x] The theme toggle updates the document theme and persists a manually selected preference in `localStorage`.
- [x] CSS includes light/dark theme variables, responsive breakpoints, visible focus treatment, and global reduced-motion overrides.
- [x] Every interaction has an accessibility note, and validation checks reduced-motion guidance for medium and expressive motion levels.

## Phase 1 — Required quality verification

These are verification and documentation gaps; they are not claims that the existing implementation is broken.

- [x] Create a repeatable manual QA checklist covering initial render, search, all filter combinations, reset paths, selected-card changes, no-result state, preview updates, code tabs, copy success/failure feedback, and console errors.
- [ ] Manually test keyboard-only navigation for the skip link, theme toggle, filters, cards, preview controls, tabs, and copy controls.
- [ ] Manually inspect the current layouts at narrow, medium, and wide viewport widths, including the documented 480px, 760px, and 1024px breakpoints.
- [ ] Manually test a reduced-motion browser preference and verify that important focus, selected, loading, and status information remains understandable without animation.
- [ ] Verify theme contrast and focus visibility in both themes; record findings only after a real review.
- [ ] Verify Clipboard API failure and fallback behavior in the browser environments intended for support, including the visible fallback guidance.

Verification note (2026-07-23): added `docs/release-readiness-browser-qa.md`, a repeatable, not-yet-run browser QA checklist grounded in the current 32-item catalogue, controls, filter taxonomy, copy feedback, and console checks.

## Phase 2 — Required maintainability guardrails

- [x] Decide whether to add a lightweight, dependency-free automated check for the interaction data (unique IDs, required fields, taxonomy, snippets, and motion guidance) rather than relying only on startup console warnings.
  - Verification note (2026-07-23): added `scripts/validate-catalogue.js`, which evaluates the real catalogue data and reuses the browser startup validator without external dependencies.
- [x] Document a contributor workflow for adding or changing a pattern: metadata, preview renderer, snippets, accessibility note, reduced-motion behavior, and manual checks.
  - Verification note (2026-07-23): added `docs/contributing-microinteractions.md` with instructions grounded in the data, renderer map, generated snippets, and existing browser QA checklist.
- [x] Review `assets/js/main.js` as the catalogue grows and separate responsibilities only when the single-file implementation becomes difficult to maintain; preserve the static, dependency-free architecture unless a deliberate product decision changes it.
  - Verification note (2026-07-23): documented the evidence-based decision not to split the still-cohesive 32-item static implementation, plus concrete extraction triggers, in `docs/contributing-microinteractions.md`.
- [x] Define concise taxonomy guidance for complexity and motion levels so new entries are categorized consistently.
  - Verification note (2026-07-23): documented all supported categories and practical complexity and motion criteria with current catalogue examples in `docs/contributing-microinteractions.md`.
- [x] Establish a release checklist with verified browser support targets, QA evidence, accessibility review scope, content review, and an explicit decision about the demo's packaging status.
  - Verification note (2026-07-23): added `docs/release-checklist.md`; all manual/browser items remain explicitly unrun pending recorded evidence.

## Phase 3 — Required documentation upkeep

- [ ] Keep `README.md`, `PLAN.md`, and `CHANGELOG.md` synchronized when verified behavior or project scope changes.
- [ ] Add browser-support and local-preview notes only after they have been decided and verified.
- [ ] Record completed work in `CHANGELOG.md` with evidence; do not add dates, version numbers, or test results that were not established.
- [ ] Keep accessibility language practical and pattern-specific; do not claim WCAG conformance without a separate formal audit.

## Optional future enhancements

The following are opportunities, not committed requirements:

- [ ] Add more patterns for dashboards, checkout, and onboarding after the existing catalogue has passed the quality checks above.
- [ ] Add exportable or downloadable snippet packs, potentially grouped by product context.
- [ ] Add React and Vue adaptations while preserving the vanilla source examples.
- [ ] Explore a design-token/Figma export workflow.
- [ ] Explore a dedicated accessibility review or audit mode with clearly defined scope and evidence requirements.
- [ ] Explore favorites or import/export of saved snippets, subject to a deliberate decision about local storage and data handling.

## Scope boundaries

- The current product is a learning/demo tool, not a production component package.
- Snippets are copy-ready educational examples, not guarantees of production fitness in every host application.
- A global reduced-motion rule and per-pattern guidance do not replace testing a pattern in its final product context.
- Future export, framework, audit, and packaging ideas remain optional until explicitly planned and implemented.
