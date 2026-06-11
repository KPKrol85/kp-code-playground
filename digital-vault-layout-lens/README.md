# KP_Code Layout Lens

KP_Code Layout Lens is a static frontend/UI audit product in the KP_Code Digital Vault ecosystem. It starts as a manual, rule-based audit generator and is intentionally structured so it can later grow into a static analyzer, live preview inspector, report generator, saved project tool, and AI-assisted senior frontend reviewer.

## Current version scope

Version 1 is deliberately small and product-focused:

- Polished static landing/dashboard interface.
- Manual audit workflow for common frontend component types.
- Structured audit rules stored as reusable JavaScript data.
- Weighted scoring engine separated from DOM rendering.
- Live score, category score, and recommendation updates.
- Local demo presets for common UI review scenarios.
- `localStorage` persistence for the active audit state.

This release does **not** include backend services, login, file upload, real DOM parsing, AI calls, report generation, browser extension logic, or database storage.

## How the audit system works

1. `assets/js/auditRules.js` defines rule data with category, severity, weight, recommendation, and future automation hints.
2. `assets/js/demoData.js` defines component presets such as SaaS dashboard, pricing section, card grid, hero section, and form section.
3. `assets/js/auditEngine.js` converts rule statuses into a weighted score from 0 to 100.
4. `assets/js/app.js` renders the UI, listens for user changes, updates state, persists to `localStorage`, and displays recommendations.

Each rule can be marked as:

- `pass` — full rule weight is earned.
- `warning` — partial rule weight is earned.
- `fail` — no rule weight is earned.
- `not applicable` — the rule is excluded from the score denominator.

The engine also calculates category scores, pass/warning/fail counts, and a quality label:

- Needs work
- Improving
- Solid
- Production-ready with minor polish
- Premium-ready

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
        ├── auditEngine.js
        ├── auditRules.js
        └── demoData.js
```

## How to run

Open `index.html` directly in a modern browser, or serve the folder with any static file server. Because the JavaScript uses ES modules, a local server is recommended for consistent browser behavior:

```bash
cd digital-vault-layout-lens
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Technical principles

- Use semantic HTML and accessible form controls.
- Keep data, scoring logic, and DOM rendering separated.
- Use mobile-first CSS with custom properties and reusable design tokens.
- Preserve visible focus states and reduced-motion support.
- Avoid frameworks, build tools, external API calls, and minified output.
- Keep the first version understandable enough for future contributors.

## Future development direction

The foundation is built for phased growth:

- Add richer rules, templates, and severity models.
- Accept pasted HTML/CSS for static analysis.
- Add live preview overlays for spacing, focus, and overflow checks.
- Generate Markdown/PDF audit reports.
- Persist saved projects locally or through a backend later.
- Introduce AI-assisted review only after deterministic evidence capture exists.
