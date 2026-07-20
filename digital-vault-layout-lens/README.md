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
- Session-only manual AI handoff workflow for copying deterministic evidence to an external AI model and importing a validated AI-assisted summary.
- Native browser print workflow: use **Print or save as PDF** to open the browser print dialog, then print or choose **Save as PDF** in the browser.
- Manual light/dark theme toggle with persisted preference and system-theme fallback.

This release does **not** include a PDF dependency, direct PDF generator, automatic PDF file creation, backend services, login, accounts, cloud upload, cloud sync, collaboration, automatic AI calls, automatic website analysis from the target URL, browser extension logic, SaaS features, cross-device backup, API storage, or backend storage. Analyzer and preview data remain separate from manual report generation. The AI-assisted workflow is manual only: Layout Lens prepares copyable evidence and validates pasted JSON, but it never contacts, uploads to, authenticates with, or selects an AI provider.

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

## Manual AI handoff workflow

The **AI-assisted review summary** section is a local-first handoff tool, not direct AI integration. Layout Lens does not include an API key, provider SDK, backend endpoint, authentication flow, automatic model call, retry queue, or upload feature. Every action requires explicit user interaction:

1. Choose a session-only review preset. The safe default is **Senior frontend reviewer**; other options are **Accessibility reviewer**, **Product polish reviewer**, and **Design-system reviewer**.
2. Review the privacy controls. Conservative defaults include deterministic manual/analyzer findings, WCAG mappings, and deterministic recommendations while excluding reviewer notes, analyzer snippets, project metadata, report metadata, target URLs, and raw source code.
3. Select **Review AI data** to display the selected preset, included and excluded evidence categories, finding/note/snippet counts, sensitive-data exclusions, and a readable preview of the exact request package.
4. Select **Prepare AI review** to build one active session-only evidence snapshot from the reviewed deterministic Layout Lens data and bind it to the selected preset. A local centralized policy prevents rapid repeated preparation/copying and shows session-only prepared/copied counts.
5. Confirm **I reviewed the data above and choose to copy it for an external AI service.** This approval is unchecked by default, applies only to the currently prepared request, resets after evidence/preset/privacy changes, and is not persisted.
6. Select **Copy AI request** only if you choose to place that displayed package on the system clipboard and send it to an external AI model outside Layout Lens.
7. Paste the model's structured JSON response into Layout Lens.
8. Select **Import AI summary** to validate the response against the request ID, preset ID, and evidence IDs in the prepared snapshot.
9. Use **Clear AI summary** to remove the session-only request and imported summary.

The request view reports deterministic package size as character count, evidence count, and included snippet count. These are local measurements, not token estimates. Layout Lens does **not** know or calculate provider price, token usage, network latency, or external model execution time; copying is only a clipboard action, not an AI API call. The local usage policy and counters are session-only, excluded from drafts, projects, exports, and reports, and are designed for a future direct adapter without enabling one today.

Review presets change only the requested perspective, terminology, focus, and output emphasis. They do not change deterministic evidence, manual scores, analyzer findings, severity, confidence, issue IDs, WCAG mappings, recommendations, or evidence eligibility. The four presets are: **Senior frontend reviewer** for implementation quality, maintainability, responsive behavior, accessibility basics, frontend risk, and practical prioritization; **Accessibility reviewer** for existing accessibility-related findings, analyzer evidence, WCAG mappings, keyboard, semantics, labels, headings, landmarks, and reflow risks without conformance or certification claims; **Product polish reviewer** for visual consistency, content clarity, interaction quality, responsive polish, usability friction, and high-impact refinement opportunities; and **Design-system reviewer** for consistency, reusable patterns, token opportunities, component behavior, shared UI rules, and maintainability across repeated interfaces.

The evidence package may include only these deterministic facts: weighted score values, reviewed/applicable counts, selected preset, selected rule pack, selected severity profile, category score facts, manual Needs work findings, useful manual Pass findings for strengths, stable manual issue IDs, rule title/category/severity, reviewer notes only when explicitly enabled, existing deterministic recommendations, and HTML/CSS analyzer findings with their stable issue IDs, title, category, severity, source, analyzer confidence, deterministic message, occurrence count, location metadata, optional capped evidence snippet only when explicitly enabled, and WCAG mapping already attached by the deterministic analyzer.

The package excludes raw pasted HTML, raw pasted CSS, complete source files, preview iframe content, preview annotations, viewport comparison notes, report cover metadata, generated reports, saved-project metadata/history, duplicate-project lineage, localStorage or IndexedDB internals, filters, hidden UI state, browser/device details, target URLs, and unsupported speculative context.

Every imported factual AI claim must use the structured claim shape with `text` and one or more known `evidenceIds`, including the overall summary, strengths, priorities, and cautions. Responses are rejected when evidence references are missing, duplicated within a claim, unknown to the prepared package, tied to another request ID, tied to another preset ID, or outside the supported schema. Claims may optionally include controlled AI-reported confidence values of `high`, `medium`, or `low`; unsupported confidence values are rejected, and missing confidence is rendered as `Not provided`. AI-reported confidence is the external model's own assessment, not Layout Lens or analyzer confidence, and it never affects scoring, severity, sorting, findings, or recommendations. Analyzer confidence remains labeled separately as `Analyzer confidence` on cited evidence sources.

Imported AI content is rendered in a separate **AI-assisted summary** area with persistent labels such as `AI-generated`, `External AI response`, and `Human review required`. Layout Lens validates response structure and evidence references but does not verify the truth or quality of AI prose; deterministic scoring and findings remain the source of record. Evidence references display stable evidence IDs, readable labels, source labels (`Manual review evidence`, `HTML analyzer evidence`, `CSS analyzer evidence`, or `Category audit fact`), deterministic severity when available, analyzer confidence when available, and existing WCAG mappings. It is AI-generated and must be reviewed by a person. It is never treated as a deterministic finding, never changes scores, never creates recommendations, never modifies manual statuses or analyzer results, is not included in reports, is not exported in audit JSON, and is not saved to localStorage drafts or IndexedDB projects. If the review preset, manual audit evidence, analyzer results, saved project, import state, reset state, or evidence snapshot changes after preparation, the request/summary is marked stale and a new explicit preparation is required.

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
- The saved-project list renders one workflow state at a time: a text loading state while IndexedDB records are retrieved, an empty state when no named projects exist, an error state with a Retry saved projects action when local project storage cannot be accessed, or the populated project list. These states use the existing polite status region and avoid hiding the current working audit or automatic draft.
- Successful create, update, open, duplicate, delete, audit-version, historical-restore, and improvement-pass actions announce concise completion messages without modal success interruptions. Failed operations announce focused failure messages and do not silently reset the current audit or project association.



Storage schema migrations are lazy and conservative. Layout Lens validates a local draft or saved project when it is loaded or opened, migrates supported older audit/project shapes through each known intermediate schema, deep-copies historical audit snapshots, and excludes unsupported analyzer, preview, report, filter, score, finding, and recommendation data. Future schema versions or unrecoverable malformed records are rejected with understandable status text; corrupt saved project records are not automatically deleted and valid projects can still be listed. The IndexedDB database version is separate from saved-project record schema versions and is not bumped for record-only migrations.

Saved project metadata is separate from session-only report cover metadata. It is not copied into report metadata, generated reports, manual audit JSON export/import, automatic localStorage drafts, analyzer input/findings, preview state/annotations, viewport comparison state, checklist filters, computed scores, or recommendations. Target URLs are preserved as browser-local text only and are not fetched, scanned, uploaded, or remotely validated. Saved projects never leave the browser and do not use accounts, backend services, cloud sync, collaboration, API storage, or cross-device backup.

Backend and API work is intentionally deferred as a product and architecture boundary, not missing implementation. IndexedDB is the authoritative durable storage for named saved projects today, and localStorage remains the automatic working-draft recovery mechanism. Remote services, accounts, authentication, collaboration, cloud or cross-device sync, team dashboards, API clients, and synchronization queues should only be considered after real demand validates at least one of those capabilities: collaboration, cross-device/cloud synchronization, user accounts, or shared team dashboards.

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
        ├── aiEvidenceAdapter.js
        ├── aiReviewRequest.js
        ├── aiSummaryValidator.js
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
