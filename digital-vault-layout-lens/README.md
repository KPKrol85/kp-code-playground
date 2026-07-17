# KP_Code Layout Lens

KP_Code Layout Lens is a static frontend/UI audit product in the KP_Code Digital Vault ecosystem. It provides a landing/dashboard interface and a manual checklist for reviewing UI quality by category.

## Current version scope

The current version is deliberately local-first and product-focused:

- Polished static landing/dashboard interface.
- Manual audit checklist grouped by frontend quality category.
- 32 beginner-friendly audit rules stored as reusable JavaScript data with versioned rule schema metadata.
- Component presets for common UI and page types.
- Rule packs that narrow the active checklist scope for focused manual audits.
- Severity profiles for Baseline, Production, Premium, and Accessibility-first audit weighting.
- Weighted scoring based on rule severity and manual status.
- Category score breakdowns and deterministic recommendations.
- Browser-only local audit draft persistence for selected preset, selected rule pack, selected severity profile, rule statuses, and reviewer notes.
- Explicit saved audit projects stored locally in IndexedDB on the current browser/device; projects include durable project metadata and can be listed, opened, updated, duplicated, versioned, restored, and deleted.
- Local JSON audit import/export for manual audit state.
- Local Markdown report download generated from the current manual audit state.
- Optional session-only report cover metadata for project name, owner, project type, target URL, reviewer, and review date.
- Deterministic executive summaries generated from the current manual audit state without AI or external services.
- Accessible report summaries for screen-reader users generated from the same normalized report model as the visual report outputs.
- Five report templates: Internal QA, Freelancer / Client Delivery, Agency Review, SaaS Team, and Design System Team.
- Browser print-optimized report view for cover metadata, executive summaries, manual scores, findings, notes, and recommendations.
- Native browser print workflow: use **Print or save as PDF** to open the browser print dialog, then print or choose **Save as PDF** in the browser.
- Manual light/dark theme toggle with persisted preference and system-theme fallback.

This release does **not** include a PDF dependency, direct PDF generator, automatic PDF file creation, backend services, login, accounts, cloud upload, cloud sync, collaboration, AI calls, automatic website analysis from the target URL, browser extension logic, SaaS features, cross-device backup, API storage, or backend storage. Analyzer and preview data remain separate from manual report generation.

For the consolidated implementation roadmap, see [`plan.md`](plan.md).

## How the manual checklist works

1. `assets/js/auditRules.js` defines versioned rule schema metadata plus rule data with `id`, `category`, `title`, `description`, and `severity`.
2. `assets/js/componentPresets.js` defines manual audit presets for common page and component types.
3. `assets/js/rulePacks.js` defines reusable rule groups for focused page-type and UI-pattern audits.
4. `assets/js/severityProfiles.js` defines Baseline, Production, Premium, and Accessibility-first profiles that change audit strictness by weighting active rules without changing manual answers. Accessibility-first is an accessibility-focused weighting mode, not WCAG certification or a complete compliance audit.
5. `assets/js/ruleDataValidator.js` validates rule schema metadata, rules, categories, severity profiles, rule packs, presets, and recommendation output before app data is rendered, scored, recommended, or restored from local storage.
6. `assets/js/scoringEngine.js` calculates the weighted overall score and category scores.
7. `assets/js/recommendations.js` generates deterministic recommendations from rules marked as needing work.
8. `assets/js/storageAdapter.js` is the application-facing persistence boundary for browser-only drafts and saved projects, delegating local draft behavior to `assets/js/auditStorage.js` and IndexedDB behavior to `assets/js/savedProjectsDb.js` while returning controlled storage results.
9. `assets/js/auditStorage.js` and `assets/js/auditMigrations.js` handle browser-only local draft audit state, keep the current audit storage schema version in one place, migrate supported legacy drafts sequentially, reject malformed or future drafts safely, and preserve only supported manual audit fields.
10. `assets/js/savedProjectModel.js`, `assets/js/savedProjectMigrations.js`, and `assets/js/savedProjectsDb.js` provide named saved audit projects in browser-local IndexedDB. Each record uses `id`, `schemaVersion`, `name`, `createdAt`, `updatedAt`, normalized `metadata` (`owner`, `projectType`, `targetUrl`, `reviewDate`), and a manual `auditState` snapshot whose `selectedPresetId` is the canonical audit preset; analyzer, preview, report metadata, report-template state, filters, generated reports, computed scores, and recommendations are excluded.
11. `assets/js/reportTemplates.js` centralizes the five presentation templates and their labels, descriptions, and section order.
12. `assets/js/reportAdapter.js` is the shared reporting entry point that consumes current manual audit state and returns one immutable normalized report model. `assets/js/reportData.js`, `assets/js/markdownReport.js`, `assets/js/reportRenderer.js`, and `assets/js/printReport.js` build deterministic report facts, serialize Markdown, render the on-screen/print report view, and request the browser-native print dialog without adding a PDF library or including analyzer/preview state. Report metadata remains report-workflow session state and is not included in manual audit JSON export/import or browser audit persistence.
13. `assets/js/app.js` renders presets, category sections, rule cards, scores, recommendations, report actions, theme state, and status changes.

Each rule can be marked as:

- `Not checked`
- `Pass`
- `Needs work`
- `Not applicable`

## Saved projects and local drafts

The automatic local draft and saved projects are separate browser-local features:

- The existing local draft remains a working-session recovery mechanism and updates as the manual audit changes.
- **Save as new project** creates an explicitly named IndexedDB project snapshot on the current browser/device with entered owner, project type, target URL, and review date metadata.
- **Open project** restores saved project metadata into the project-details form and restores only the supported manual audit state: selected preset, rule pack, severity profile, rule statuses, reviewer notes, and compatible audit/rule schema metadata. Scores, category progress, findings, and recommendations are recalculated after restore.
- **Save project changes** updates the currently opened project audit state and project metadata only when the user chooses that action; editing metadata does not silently write to IndexedDB.
- **Save audit version** creates an explicit immutable audit-history snapshot with a stable version ID, label, timestamp, optional review date, and the supported manual audit state only. Versions are never created automatically during field edits or normal project saves.
- **Audit history** lists saved versions newest first and offers **Restore version** to copy a historical audit into the current workspace; restoration recalculates scores, category progress, findings, and recommendations through the existing engines and does not overwrite IndexedDB until Save project changes or Save audit version is chosen.
- **Start new improvement pass** deep-copies a selected historical version into the workspace for repeated before/after review without mutating the original version or silently persisting later edits.
- **Duplicate project** creates an independent project with a new project ID, new timestamps, copied normalized metadata, and a deep copy of the current manual audit state under a generated copy name. Duplicate projects start with the copied current audit as their new baseline and do not inherit the original project history.
- **Delete project** removes a saved project after confirmation without deleting the current local draft; deleting the opened project clears the project association while leaving the working audit understandable and available to save as new.
- **New audit** resets the current working audit, clears the current project association and project metadata form, and resets the local draft without deleting saved projects.



Storage schema migrations are lazy and conservative. Layout Lens validates a local draft or saved project when it is loaded or opened, migrates supported older audit/project shapes through each known intermediate schema, deep-copies historical audit snapshots, and excludes unsupported analyzer, preview, report, filter, score, finding, and recommendation data. Future schema versions or unrecoverable malformed records are rejected with understandable status text; corrupt saved project records are not automatically deleted and valid projects can still be listed. The IndexedDB database version is separate from saved-project record schema versions and is not bumped for record-only migrations.

Saved project metadata is separate from session-only report cover metadata. It is not copied into report metadata, generated reports, manual audit JSON export/import, automatic localStorage drafts, analyzer input/findings, preview state/annotations, viewport comparison state, checklist filters, computed scores, or recommendations. Target URLs are preserved as browser-local text only and are not fetched, scanned, uploaded, or remotely validated. Saved projects never leave the browser and do not use accounts, backend services, cloud sync, collaboration, API storage, or cross-device backup.

## Report templates and browser printing

Report templates are presentation settings only. They all consume the same normalized manual audit report data and do not change scores, summary facts, findings, issue IDs, reviewer notes, cover metadata values, or deterministic recommendations. Available templates are:

- **Internal QA** — concise operational QA status, category progress, technical findings, notes, and next-pass recommendations.
- **Freelancer / Client Delivery** — client-friendly quality score, important findings, completed review scope, and suggested next actions.
- **Agency Review** — professional scope, category breakdown, prioritized findings, stable issue IDs, notes, and handoff recommendations.
- **SaaS Team** — product UI quality with accessibility, responsive behavior, consistency findings, task-trackable issue IDs, and implementation recommendations.
- **Design System Team** — visual consistency, reusable UI patterns, component-related findings, accessibility, layout, responsive behavior, and shared system recommendations.

The selected template affects both the on-screen/print report view and the Markdown report. The report output includes the selected template name. Optional report cover metadata supports project name, owner, project type, target URL, reviewer, and review date; empty fields are omitted from generated reports. The target URL is preserved as text in the report workflow and is not fetched, scanned, or validated remotely.

Executive summaries and screen-reader-oriented report summaries are generated from the current deterministic manual audit state: weighted score, reviewed/applicable counts, category scores, Needs work findings, severity counts, reviewer-note presence, metadata when provided, and existing deterministic recommendations. The accessible summary is rendered as semantic report content in the on-screen/print report view and appears as a concise textual summary in Markdown. All report outputs use the same normalized report model from the shared adapter, remain browser-local, do not use AI, randomness, external services, analyzer findings, preview annotations, or speculative claims, and do not claim WCAG certification or production readiness.

Layout Lens uses the browser-native print dialog for printing. Select **Print or save as PDF** to render the current report template, open the native print dialog with `window.print()`, and then choose either a printer or **Save as PDF** if your browser offers that destination. Layout Lens does not include a PDF dependency, canvas-based PDF workflow, server-side generator, or direct PDF file generator.

## Folder structure

```text
digital-vault-layout-lens/
├── index.html
├── README.md
├── plan.md
└── assets/
    ├── css/
    │   └── styles.css
    └── js/
        ├── app.js
        ├── auditRules.js
        ├── auditStorage.js
        ├── componentPresets.js
        ├── recommendations.js
        ├── savedProjectModel.js
        ├── savedProjectsDb.js
        ├── reportAdapter.js
        ├── reportData.js
        ├── markdownReport.js
        ├── printReport.js
        ├── reportRenderer.js
        ├── reportTemplates.js
        ├── ruleDataValidator.js
        ├── rulePacks.js
        ├── scoringEngine.js
        └── severityProfiles.js
```

## Run locally

Open `index.html` in a browser or serve the folder with any static file server.
