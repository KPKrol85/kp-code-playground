# KP_Code Layout Lens

KP_Code Layout Lens is a static frontend/UI audit product in the KP_Code Digital Vault ecosystem. It provides a landing/dashboard interface and a manual checklist for reviewing UI quality by category.

## Current version scope

The current version is deliberately local-first and product-focused:

- Polished static landing/dashboard interface.
- Manual audit checklist grouped by frontend quality category.
- 32 beginner-friendly audit rules stored as reusable JavaScript data.
- Component presets for common UI and page types.
- Weighted scoring based on rule severity and manual status.
- Category score breakdowns and deterministic recommendations.
- Browser-only local audit persistence for selected preset and rule statuses.
- Manual light/dark theme toggle with persisted preference and system-theme fallback.

This release does **not** include exports, analyzer logic, backend services, login, file upload, AI calls, report generation, browser extension logic, SaaS features, or database storage.

For the consolidated implementation roadmap, see [`plan.md`](plan.md).

## How the manual checklist works

1. `assets/js/auditRules.js` defines rule data with `id`, `category`, `title`, `description`, and `severity`.
2. `assets/js/componentPresets.js` defines manual audit presets for common page and component types.
3. `assets/js/scoringEngine.js` calculates the weighted overall score and category scores.
4. `assets/js/recommendations.js` generates deterministic recommendations from rules marked as needing work.
5. `assets/js/auditStorage.js` handles browser-only local audit state.
6. `assets/js/app.js` renders presets, category sections, rule cards, scores, recommendations, theme state, and status changes.

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
        └── scoringEngine.js
```

## Run locally

Open `index.html` in a browser or serve the folder with any static file server.
