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

## Needs verification before marking complete

- [ ] Add a repeatable QA command or package script if the project later introduces tooling beyond direct browser usage.
- [ ] Re-check screenshots manually when a browser automation runtime is available.

## Next implementation queue

### Phase 2 — Rule engine and templates

- [ ] Add rule packs for marketing pages, dashboards, forms, ecommerce, content sites, navigation, tables, modals, and drawers.
- [ ] Add severity profiles such as baseline, production, premium, and accessibility-first.
- [ ] Add rule data validation for ids, categories, severity, weights, recommendation metadata, and duplicate references.
- [ ] Add versioned rule schema metadata so future audit states can migrate safely.
- [ ] Add conditional applicability logic for rules that only apply to certain presets or UI patterns.
- [ ] Add clearer scoring explanations for pass, needs-work, not-applicable, and not-checked states.
- [ ] Add category progress indicators showing reviewed rules versus total applicable rules.
- [ ] Add filters for status, severity, category, and preset relevance.
- [ ] Add reviewer notes per rule while keeping notes local and optional.
- [ ] Add JSON export/import for current audit state before introducing any report or database feature.
- [ ] Add deterministic issue IDs for findings so reports and future comparisons can reference stable issues.
- [ ] Add lightweight tests for scoring edge cases when the project introduces test tooling.

### Phase 3 — HTML/CSS input analyzer

- [ ] Add an HTML textarea input for static markup analysis.
- [ ] Add a CSS textarea input for static style analysis.
- [ ] Add optional local file input only if it remains browser-only and does not upload user code.
- [ ] Add DOMParser-based checks for headings, landmarks, labels, buttons, links, and images.
- [ ] Add deterministic CSS checks for repeated literal values, fixed widths, missing responsive patterns, and overflow risks.
- [ ] Add WCAG mapping fields to relevant rules and automated findings.
- [ ] Add evidence snippets to every automated finding.
- [ ] Add confidence/source labels that distinguish manual findings from automated analyzer findings.
- [ ] Keep analyzer output compatible with the existing rule/result model.
- [ ] Add analyzer fixture tests before relying on automated findings for reports.

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
