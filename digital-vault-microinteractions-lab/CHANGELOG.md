# Changelog

All notable, repository-supported changes to this project are documented in this file.

This changelog follows the structure of [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Entries are added when implementation or documentation evidence is available; this repository does not establish released version numbers or release dates for this project.

## [Unreleased]

### Added

- A static, data-driven catalogue of frontend microinteractions with searchable and combinable category, complexity, and motion filters.
- Controlled live-preview renderers with a fallback for an unrecognized preview type.
- Copy-ready HTML, CSS, and optional JavaScript snippets generated from the interaction data.
- Light/dark theme controls, responsive layouts, and reduced-motion styling.
- Interface features and per-pattern accessibility guidance, including semantic landmarks, labelled native controls, visible focus styling, status messaging, reduced-motion rules, and a startup validation layer for interaction metadata and motion guidance. These features are not a formal accessibility audit or completed browser-wide verification.
- A dependency-free `node scripts/validate-catalogue.js` check that reuses startup validation against the catalogue data and fails on reported metadata warnings.

### Documentation (2026-07-23)

- Canonicalized project documentation as `README.md`, `PLAN.md`, and `CHANGELOG.md`.
- Consolidated the former planning and improvement notes into the current plan without carrying forward unsupported completion dates or unverified future work.
- Added a repeatable, not-yet-run browser QA checklist grounded in the current 32-pattern catalogue, controls, filter values, preview behavior, copy feedback, and console checks.
- Added the dependency-free catalogue-validation command, contributor workflow, and complexity, motion, and category taxonomy guidance for maintaining interaction records.
- Documented the evidence-based decision to keep the cohesive 32-record `assets/js/main.js` implementation together, with concrete future extraction triggers.
- Added a release-decision checklist that keeps browser targets, local-preview guidance, manual browser QA, keyboard, reduced-motion, contrast, Clipboard, and assistive-technology-related review explicitly unrun pending evidence.
- Synchronized the README, roadmap, changelog, contributor guidance, release checklist, browser-QA checklist, and user-facing accessibility wording with the implemented scope and outstanding manual verification work.
