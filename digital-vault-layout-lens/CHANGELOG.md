# Changelog

All notable changes to KP_Code Layout Lens are documented in this file.

## [Unreleased]

- Fixed machine-readable manual reports so valid fractional weighted score points from severity/category profiles pass schema validation.
- Added six project-owned representative HTML/CSS validation fixtures and a recorded Phase 2 analyzer review covering expected/actual findings, confidence, evidence usefulness, false positives, and retained manual-only limits.
- Fixed a confirmed CSS analyzer false positive: same-rule explicitly scrollable `white-space: nowrap` content is no longer described as lacking an overflow strategy; retained other responsive review prompts and added regression coverage.
- Added a consented usability-session plan and de-identified evidence template; no participant sessions are claimed.

## [2026-07-20] — Roadmap completion and documentation standardization

### Added
- Added this concise product-change history and replaced the completed historical roadmap with a forward-looking [`PLAN.md`](PLAN.md).

### Changed
- Standardized the root documentation set as `README.md`, `PLAN.md`, and `CHANGELOG.md`.

### Documented
- Reconciled the user-facing documentation with the implemented local-first audit workspace, its strict data boundaries, and the deferred extension, integration, SaaS, and enterprise paths.

## Earlier implementation milestones

### Foundation and manual audit workspace
- Delivered the semantic, responsive browser workspace for manual frontend/UI audits, with category checklist review, presets, local draft recovery, theme preference, and accessibility-minded interaction.

### 2026-07-14 to 2026-07-15 — Rule engine and audit configuration
- Added validated versioned rules, component presets, focused rule packs, severity profiles, applicability, filters, local notes, import/export, deterministic issue IDs, weighted scoring, category progress, and deterministic recommendations.
- Kept manual answers and scoring as the authoritative audit record.

### 2026-07-15 — HTML/CSS analyzers
- Added local HTML and CSS analyzers, local-file input, stable analyzer IDs, evidence, source/confidence labels, occurrence/location metadata, relevant WCAG mappings, and deterministic fixture coverage.
- Preserved analyzer separation from manual scoring, audit persistence, exports, and manual reports.

### 2026-07-15 — Preview and visual inspection
- Added a sanitized isolated local preview with viewport controls, overlays, keyboard audit, annotations, breakpoint comparison checklist, preview-state isolation, and reduced-motion support.
- Kept pasted source and preview-only state local and outside scoring/report data.

### 2026-07-16 — Reports
- Added deterministic Markdown, on-screen, print, and browser-PDF workflows; five report templates; cover metadata; executive and screen-reader summaries; and a shared immutable manual report adapter.

### 2026-07-17 — Browser-local saved projects
- Added IndexedDB saved projects with normalized metadata, explicit create/open/update/delete flows, immutable audit history, restoration, improvement passes, duplication, conservative migrations, storage adapters, and clear UI states.
- Retained localStorage draft recovery as a separate working-session feature; no remote persistence was introduced.

### 2026-07-17 to 2026-07-20 — Manual AI-assisted review handoff
- Added evidence-bound review presets, prompt/request construction, response validation, privacy controls, clear AI labels, stale-state handling, and session-only usage safeguards.
- Kept AI content manual, external, unverified, non-authoritative, and separate from deterministic findings, scores, persistence, exports, and reports; no AI service call was added.

### 2026-07-20 — Machine-readable output and deferred product paths
- Added a local schema-versioned, machine-readable manual-audit report download while keeping it separate from analyzer findings, AI content, CI execution, uploads, and enforcement.
- Recorded feasibility and deferral decisions for browser extensions/live-page inspection, organization rules, integrations/CI, SaaS, billing, and enterprise capabilities. No backend, extension, remote integration, account, collaboration, billing, or enterprise workflow was implemented.
