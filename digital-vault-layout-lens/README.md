# KP_Code Layout Lens

KP_Code Layout Lens is a static frontend/UI audit product in the KP_Code Digital Vault ecosystem. It currently provides a landing/dashboard interface and a manual checklist for reviewing UI quality by category.

## Current version scope

Version 1 is deliberately small and product-focused:

- Polished static landing/dashboard interface.
- Manual audit checklist grouped by frontend quality category.
- 32 beginner-friendly audit rules stored as reusable JavaScript data.
- In-memory status updates for each rule.
- Simple dashboard counts for total rules, checked rules, needs-work items, and not-applicable items.
- Light/dark theme toggle persisted separately as a UI preference.

This release does **not** include weighted scoring, category scores, recommendations, audit persistence, exports, analyzer logic, backend services, login, file upload, AI calls, report generation, browser extension logic, or database storage.

## How the manual checklist works

1. `assets/js/auditRules.js` defines rule data with `id`, `category`, `title`, `description`, and `severity`.
2. `assets/js/app.js` renders category sections and rule cards, listens for status changes, and updates simple counts.
3. Statuses are stored in memory only. Refreshing the page resets the checklist.

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
├── improvements.md
└── assets/
    ├── css/
    │   └── styles.css
    └── js/
        ├── app.js
        └── auditRules.js
```

## Run locally

Open `index.html` in a browser or serve the folder with any static file server.
