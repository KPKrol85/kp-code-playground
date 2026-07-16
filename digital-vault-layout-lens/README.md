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
- Browser-only local audit persistence for selected preset, selected rule pack, selected severity profile, rule statuses, and reviewer notes.
- Local JSON audit import/export for manual audit state.
- Local Markdown report download generated from the current manual audit state.
- Browser print-optimized report view for manual scores, findings, notes, and recommendations.
- Manual light/dark theme toggle with persisted preference and system-theme fallback.

This release does **not** include PDF export, report templates, saved projects, backend services, login, cloud upload, AI calls, browser extension logic, SaaS features, or database storage. Analyzer and preview data remain separate from manual report generation.

For the consolidated implementation roadmap, see [`plan.md`](plan.md).

## How the manual checklist works

1. `assets/js/auditRules.js` defines versioned rule schema metadata plus rule data with `id`, `category`, `title`, `description`, and `severity`.
2. `assets/js/componentPresets.js` defines manual audit presets for common page and component types.
3. `assets/js/rulePacks.js` defines reusable rule groups for focused page-type and UI-pattern audits.
4. `assets/js/severityProfiles.js` defines Baseline, Production, Premium, and Accessibility-first profiles that change audit strictness by weighting active rules without changing manual answers. Accessibility-first is an accessibility-focused weighting mode, not WCAG certification or a complete compliance audit.
5. `assets/js/ruleDataValidator.js` validates rule schema metadata, rules, categories, severity profiles, rule packs, presets, and recommendation output before app data is rendered, scored, recommended, or restored from local storage.
6. `assets/js/scoringEngine.js` calculates the weighted overall score and category scores.
7. `assets/js/recommendations.js` generates deterministic recommendations from rules marked as needing work.
8. `assets/js/auditStorage.js` handles browser-only local audit state and stores the active rule schema version with each draft so incompatible future rule data can be migrated or rejected safely.
9. `assets/js/reportData.js`, `assets/js/markdownReport.js`, and `assets/js/reportRenderer.js` build deterministic manual report content, serialize Markdown, and render the print report view without including analyzer or preview state.
10. `assets/js/app.js` renders presets, category sections, rule cards, scores, recommendations, report actions, theme state, and status changes.

Each rule can be marked as:

- `Not checked`
- `Pass`
- `Needs work`
- `Not applicable`

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
        ├── reportData.js
        ├── markdownReport.js
        ├── reportRenderer.js
        ├── ruleDataValidator.js
        ├── rulePacks.js
        ├── scoringEngine.js
        └── severityProfiles.js
```

## Run locally

Open `index.html` in a browser or serve the folder with any static file server.
