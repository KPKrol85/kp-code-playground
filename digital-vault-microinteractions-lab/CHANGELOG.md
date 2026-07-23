# Changelog

All notable, repository-supported changes to this project are documented in this file.

This changelog follows the structure of [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Entries are added when implementation or documentation evidence is available; this repository does not establish released version numbers or release dates for this project.

## [Unreleased]

### Added

- A static, data-driven catalogue of frontend microinteractions with searchable and combinable category, complexity, and motion filters.
- Controlled live-preview renderers with a fallback for an unrecognized preview type.
- Copy-ready HTML, CSS, and optional JavaScript snippets generated from the interaction data.
- Light/dark theme controls, responsive layouts, and reduced-motion styling.
- Accessibility-oriented interface features and per-pattern guidance, including a startup validation layer for interaction metadata and motion guidance.
- A dependency-free `node scripts/validate-catalogue.js` check that reuses startup validation against the catalogue data and fails on reported metadata warnings.

### Documentation

- Canonicalized project documentation as `README.md`, `PLAN.md`, and `CHANGELOG.md`.
- Consolidated the former planning and improvement notes into the current plan without carrying forward unsupported completion dates or unverified future work.
- Added a repeatable, not-yet-run browser QA checklist grounded in the current catalogue, controls, filter values, preview behavior, copy feedback, and console checks.
- Added contributor workflow and taxonomy guidance, an evidence-based `main.js` maintainability decision, and a release-decision checklist that keeps manual browser and accessibility review explicitly unrun.
