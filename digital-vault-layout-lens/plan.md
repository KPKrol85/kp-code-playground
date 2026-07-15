# KP_Code Layout Lens Implementation Plan

## Project status

KP_Code Layout Lens is a frontend-only KP_Code Digital Vault product for structured UI quality audits. The current app is a polished static audit workspace built with semantic HTML, CSS, and vanilla JavaScript. It supports manual checklist review, component presets, deterministic weighted scoring, category breakdowns, recommendations generated from checklist findings, manual theme control, and browser-only local audit persistence.

This file is the single source of truth for future implementation work. Older planning, improvements, and change-log notes have been consolidated into this roadmap.

## Completed foundation

- [x] Built a landing/dashboard-style interface for the Layout Lens product workspace.
- [x] Added a manual audit checklist grouped by frontend quality category.
- [x] Added 32 reusable audit rules covering layout, responsive behavior, accessibility basics, forms, navigation, visual consistency, content clarity, and performance hygiene.
- [x] Added component presets for landing pages, dashboards, forms/signup flows, pricing pages, content pages, ecommerce/product cards, navigation headers, and data table/list views.
- [x] Added weighted scoring based on rule severity and manual rule status.
- [x] Added category score breakdowns for checked manual rules.
- [x] Added deterministic recommendations when manual checklist items are marked as needing work.
- [x] Added browser-only local audit persistence for selected preset and rule statuses.
- [x] Added reset behavior for clearing the local audit draft.
- [x] Added manual light/dark theme control with persisted preference and system-theme fallback.
- [x] Improved semantic structure, keyboard-friendly controls, visible focus states, responsive behavior, and reduced-motion handling.
- [x] Escaped generated JavaScript template content before injecting rule, preset, category, and recommendation HTML.
- [x] Documented the product direction and future roadmap in this consolidated plan.

## Current product baseline

The current app is a static, local-first manual audit tool. Users choose a UI preset, review each checklist rule manually, set statuses, and use the resulting score, category breakdown, and recommendations as a lightweight audit summary. The app intentionally does not scan source code, parse pasted HTML/CSS, generate reports, call AI services, use a backend, support accounts, or provide SaaS/browser-extension workflows yet.

- [x] Verified that the current implementation matches the documented product baseline.

## Needs verification before marking complete

- [x] Add a repeatable QA command or package script if the project later introduces tooling beyond direct browser usage.
  - Verification note (2026-07-15): project-local test tooling now exists through the dependency-free Node.js test runner. `npm test` runs the scoring and issue ID checks added for Phase 2 and passed locally.
- [ ] Re-check screenshots manually when a browser automation runtime is available.
  - Verification note (2026-07-10): no usable browser runtime, browser preview, or browser automation command was available in the environment (`google-chrome`, `google-chrome-stable`, `chromium`, `chromium-browser`, `firefox`, and `playwright` were not found), so screenshot verification remains pending; source-level review only was possible.

## Next implementation queue

### Phase 2 — Rule engine and templates

- [x] Add rule packs for marketing pages, dashboards, forms, ecommerce, content sites, navigation, tables, modals, and drawers.
- [x] Add severity profiles such as baseline, production, premium, and accessibility-first.
- [x] Add rule data validation for ids, categories, severity, weights, recommendation metadata, and duplicate references.
  - Verification note (2026-07-14): added `assets/js/ruleDataValidator.js` and verified the current complete dataset passes. Inline Node module checks also confirmed detection of a duplicate rule ID, unknown rule reference, unsupported category/severity, invalid profile weight, malformed generated recommendation metadata via malformed rule text, and duplicate references inside rule packs and presets.
- [x] Add versioned rule schema metadata so future audit states can migrate safely.
  - Verification note (2026-07-14): added `RULE_SCHEMA_VERSION` and `auditRuleSchemaMetadata`, validated the metadata with the rule data validator, and persisted `ruleSchemaVersion` in browser audit drafts so incompatible saved rule data is detected before restore.
- [x] Add conditional applicability logic for rules that only apply to certain presets or UI patterns.
  - Verification note (2026-07-14): added deterministic optional rule applicability metadata for presets, rule packs, and supported UI patterns; active scoring, category progress, recommendations, and rendering now consume only automatically applicable rules while preserving saved manual statuses, including user-selected not-applicable. Node module checks verified universal, preset-specific, and pattern-specific applicability, scoring/category exclusion, preset switching restoration, reset/localStorage compatibility, and validation rejection for invalid applicability references.
- [x] Add clearer scoring explanations for pass, needs-work, not-applicable, and not-checked states.
  - Verification note (2026-07-14): added concise score-panel guidance matching the scoring engine: pass earns weighted points, needs-work contributes possible points without earned points, not-applicable is checked but excluded from possible points, and not-checked is unreviewed and not scored.
- [x] Add category progress indicators showing reviewed rules versus total applicable rules.
  - Verification note (2026-07-14): added per-category reviewed/applicable progress using active rules and current statuses; pass and needs-work count as reviewed, not-applicable is excluded from applicable totals, and not-checked remains applicable but unreviewed.
- [x] Add filters for status, severity, category, and preset relevance.
  - Verification note (2026-07-14): added browser-session checklist filters for status, severity, category, and applicability-based preset relevance with an accessible clear action and empty state. Source checks verified the app and storage modules parse successfully; storage assertions confirmed filters remain UI-only and do not change saved audit answers.
- [x] Add reviewer notes per rule while keeping notes local and optional.
  - Verification note (2026-07-14): added optional per-rule browser-local notes keyed by stable rule ID, persisted them in audit storage schema v2 while accepting legacy schema v1 states, normalized malformed note data safely, escaped note rendering, and verified reset/local clear removes notes with the rest of the audit draft.
- [x] Add JSON export/import for current audit state before introducing any report or database feature.
  - Verification note (2026-07-14): added browser-local JSON export/import for the current audit state with schema/product metadata, readable deterministic formatting, file-size/type guards, confirmation before replacement, strict import validation for schema versions, rule schema compatibility, preset/pack/profile/status/note references, and legacy persisted state support. Node checks verified valid export JSON round-trips with statuses and notes, preset/pack/profile restoration data, malformed JSON rejection, unrelated JSON rejection, unsupported future schema rejection, unknown ID/invalid status rejection, and legacy schema v1 import compatibility.
- [x] Add deterministic issue IDs for findings so reports and future comparisons can reference stable issues.
  - Verification note (2026-07-15): generated manual findings now expose stable `issueId` values in the documented `manual:<rule-id>` format. IDs are derived only from the finding source and stable rule ID, remain unchanged across reload/export/import, rule ordering, display text, notes, and scoring recalculation, and validation rejects malformed or duplicate generated issue IDs.
- [x] Add lightweight tests for scoring edge cases when the project introduces test tooling.
  - Verification note (2026-07-15): added dependency-free `node:test` coverage for no reviewed applicable rules, all passing rules, needs-work scoring, not-checked progress handling, not-applicable exclusion, mixed severity/profile weights, zero possible points, category scoring, conditional applicability, deterministic scoring across rule order, unknown status normalization, stable issue IDs, and duplicate issue ID rejection. `npm test` passed with 13 tests.

### Phase 3 — HTML/CSS input analyzer

- [x] Add an HTML textarea input for static markup analysis.
- [x] Add a CSS textarea input for static style analysis.
  - Verification note (2026-07-15): added a clearly labeled local-only analyzer input section with HTML and CSS textareas, programmatically connected helper text, stable data hooks, responsive/focus styling, and plain-text state handling that does not parse, inject, save, upload, preview, or execute pasted code.
- [x] Add optional local file input only if it remains browser-only and does not upload user code.
  - Verification note (2026-07-15): added a browser-only local source loader for `.html`, `.htm`, and `.css` files with extension routing into the existing HTML/CSS textareas, a 256 KB size limit, empty/unsupported/oversized/unreadable safeguards, accessible status messaging, and plain-text handling through `File.text()` only. Imported content is not uploaded, transmitted, injected into the DOM, executed, previewed, stored in localStorage, or included in the audit-state schema. `npm test` passed locally.
- [x] Add DOMParser-based checks for headings, landmarks, labels, buttons, links, and images.
  - Verification note (2026-07-15): added a detached `DOMParser` HTML analyzer for the current HTML textarea with focused deterministic checks for heading structure, landmarks, labels, buttons, links, and images. Findings use normalized `html-analyzer:<check-id>` issue IDs and remain isolated from manual checklist statuses, scoring, recommendations, local persistence, and JSON import/export. Analyzer output is rendered with text nodes rather than HTML injection. `npm test` passed locally.
- [x] Add deterministic CSS checks for repeated literal values, fixed widths, missing responsive patterns, and overflow risks.
  - Verification note (2026-07-15): added a dependency-free, browser-local CSS text analyzer that strips comments, parses declarations without injecting styles, and runs conservative checks for repeated literal values (4+ useful normalized declarations), large fixed width/min-width risks (360px/320px thresholds outside responsive contexts), substantial stylesheets without @media/@container adaptation (20+ declarations with desktop-constrained layout signals), and deterministic overflow risks (`overflow-x: hidden`, nowrap text without overflow strategy, rigid wide grid tracks, and positioned fixed-width elements). Findings use stable `css-analyzer:<check-id>` issue IDs, structured metadata, safe text rendering, separate CSS result UI, and remain isolated from manual scoring. `npm test` passed locally.
- [x] Add WCAG mapping fields to relevant rules and automated findings.
  - Verification note (2026-07-15): added optional structured WCAG metadata as `wcag: [{ criterion, level, title }]` for defensible manual rules, HTML analyzer findings, and WCAG-related CSS reflow risk findings. Validation now rejects malformed criterion formats, unsupported levels, empty titles, and duplicate criterion references while allowing unmapped rules/findings. Static CSS messages distinguish deterministic code findings and possible WCAG-related reflow risks from confirmed WCAG failures; repeated literal maintainability findings intentionally have no WCAG mapping. `node --check assets/js/app.js`, `node --check assets/js/cssAnalyzer.js`, and `npm test` passed locally.
- [x] Add evidence snippets to every automated finding.
  - Verification note (2026-07-15): added structured browser-local `evidence` objects for every automated HTML and CSS finding with normalized plain-text snippets, optional locations, occurrence counts, and capped lengths. HTML evidence uses focused element outer markup or document-level summaries; CSS evidence uses focused declarations, repeated-value summaries, or responsive-risk summaries. Evidence is rendered through `textContent`, is not executed, injected, uploaded, saved to manual audit-state export, or included in scoring. `npm test`, `node --check assets/js/app.js`, `node --check assets/js/htmlAnalyzer.js`, `node --check assets/js/cssAnalyzer.js`, and `node --check assets/js/findingMetadata.js` passed.
- [x] Add confidence/source labels that distinguish manual findings from automated analyzer findings.
  - Verification note (2026-07-15): added controlled source values `manual-review`, `html-analyzer`, and `css-analyzer` with user-facing labels, plus a controlled confidence scale of `high`, `medium`, and `low` that describes static detection certainty rather than severity or WCAG conformance. Validation rejects unsupported source/confidence values and malformed automated evidence while allowing manual findings without code evidence. UI metadata keeps source, confidence, severity, WCAG mapping, issue ID, and evidence separate; automated findings remain outside manual weighted scoring, filters, notes, persistence, reset, and JSON audit-state import/export. `npm test`, `node --check assets/js/app.js`, `node --check assets/js/htmlAnalyzer.js`, `node --check assets/js/cssAnalyzer.js`, and `node --check assets/js/findingMetadata.js` passed.
- [x] Keep analyzer output compatible with the existing rule/result model.
  - Verification note (2026-07-15): automated HTML findings now expose stable issue ID, rule/check ID, title, category, severity, message, source, affected element count, and lightweight location metadata without merging into manual scoring or report generation.
- [ ] Add analyzer fixture tests before relying on automated findings for reports.
  - Verification note (2026-07-15): added fixture directories under `tests/fixtures/html` and `tests/fixtures/css` plus `npm run test:analyzer` coverage for semantic-valid, empty, missing/duplicate/skipped/empty headings, missing/duplicate/unnamed landmarks, form labels, buttons, links, images, malformed HTML recovery, valid CSS, repeated literals above/below threshold, tokenized values, fixed-width/reflow risks, safe overflow/media/container usage, substantial CSS without responsive patterns, malformed CSS, metadata completeness, evidence occurrence counts, deterministic issue IDs, WCAG mapping expectations, audit-storage separation, and manual-scoring separation. The fixture suite passes in Node with parser-adapter coverage, but real DOMParser execution is skipped because this runtime has no `DOMParser`, no browser binary is installed, and npm registry policy returned 403 when attempting to add a lightweight DOM dependency (`linkedom`); keep this roadmap item open until a real browser-style DOMParser path can run.

### Phase 4 — Live preview and visual overlays

- [ ] Add a local preview iframe for pasted HTML/CSS snippets.
- [ ] Add viewport controls for mobile, tablet, desktop, and custom widths.
- [ ] Add overlay modes for spacing, layout boxes, headings, focusable elements, and overflow.
- [ ] Add keyboard-only audit mode for moving through detected focusable elements.
- [ ] Add manual annotation support for reviewer notes on preview evidence.
- [ ] Add viewport comparison snapshots or a manual screenshot checklist for fixed breakpoints.
- [ ] Keep preview isolation separate from scoring and rule data.
- [ ] Respect reduced-motion preferences in preview controls and overlays.

### Phase 5 — Exportable reports

- [ ] Add Markdown report generation from audit state.
- [ ] Add a print-optimized report view for category scores, findings, notes, and recommendations.
- [ ] Add a browser print-based PDF workflow before adding any PDF dependency.
- [ ] Add report templates for internal QA, freelancer/client delivery, agency review, SaaS teams, and design system teams.
- [ ] Add report cover metadata such as project name, owner, project type, target URL, reviewer, and review date.
- [ ] Add executive summary sections based on deterministic audit state.
- [ ] Add screen-reader-oriented report summaries.
- [ ] Add a report adapter that consumes audit state without coupling report generation to DOM rendering.

### Phase 6 — Saved projects and local database/backend

- [ ] Add saved audit projects using IndexedDB as the first durable local database.
- [ ] Add project metadata such as owner, project type, target URL, review date, and audit preset.
- [ ] Add audit version history for before/after improvement passes.
- [ ] Add duplicate audit/project flows for repeated reviews.
- [ ] Add schema migrations for stored project and audit data.
- [ ] Add a storage adapter around localStorage/IndexedDB before expanding persistence logic.
- [ ] Add empty, error, and completed states for saved projects.
- [ ] Defer backend/API work until collaboration, sync, accounts, or team dashboards are validated.

### Phase 7 — AI-assisted senior frontend review

- [ ] Add AI-assisted summaries based only on deterministic manual and analyzer evidence.
- [ ] Add review-tone presets such as senior frontend reviewer, accessibility reviewer, product polish reviewer, and design-system reviewer.
- [ ] Add prompt templates that require evidence references for every AI claim.
- [ ] Add privacy controls before sending pasted code, snippets, reports, or project data to any model.
- [ ] Add clear labeling for AI-generated content, confidence, and evidence sources.
- [ ] Add cost/latency controls before enabling repeated AI calls.
- [ ] Do not allow AI to replace deterministic scoring or create unverified findings.

### Phase 8 — SaaS/browser extension path

- [ ] Add a browser extension feasibility plan after analyzer and report value are validated.
- [ ] Explore live-page inspection only after static snippet analysis is trustworthy.
- [ ] Reuse the validated rule, analyzer, and report model for extension workflows.
- [ ] Explore a SaaS dashboard only after saved local projects prove useful.
- [ ] Define organization rule libraries and quality profiles before team rollout.
- [ ] Explore issue tracker, design-system, and CI integrations after report output is stable.
- [ ] Add machine-readable report output for future CI use.
- [ ] Defer billing, multi-tenant permissions, and enterprise workflows until the core product workflow is validated.

## Product rules and constraints

- Do not build backend services, accounts, billing, cloud sync, SaaS dashboards, or team permissions until local-first saved projects and reports justify them.
- Do not build AI workflows until deterministic findings, evidence capture, privacy controls, and report generation are available.
- Do not build browser-extension capture until static analyzer quality and preview/report workflows are validated.
- Do not add heavy dependencies for PDF, parsing, testing, or build tooling unless the roadmap phase clearly requires them.
- Do not represent planned analyzer, export, backend, AI, or extension capabilities as available product features.
- Keep manual audit data, scoring logic, storage, rendering, analyzer logic, and report generation separated.
- Preserve accessibility, responsive layout, reduced-motion support, semantic HTML, and safe browser-only behavior.
- Prefer deterministic, explainable audit results over speculative automation.

## Rules for future Codex tasks

- Codex should inspect the existing project before making changes.
- Each task should focus on one roadmap item unless explicitly instructed otherwise.
- Codex should mark as done only the roadmap points actually completed and verified in the project.
- Codex should not mark unrelated, partially complete, or future points as done.
- Codex should avoid backend, AI, export, analyzer, browser-extension, or SaaS work until the roadmap phase requires it.
- Codex should keep HTML, CSS, and vanilla JavaScript architecture clean and separated.
- Codex should preserve accessibility, responsive layout, reduced-motion support, and safe local-only behavior.
- Codex should update this plan when roadmap work is completed, deferred, or intentionally changed.
- Codex should keep README user-facing and keep this file as the implementation roadmap source of truth.
