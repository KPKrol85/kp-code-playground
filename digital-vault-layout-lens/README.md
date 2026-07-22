# KP_Code Layout Lens

KP_Code Layout Lens is a local-first, browser-only workspace for structured frontend and UI quality audits. It combines a human-reviewed checklist with optional static HTML/CSS analysis and a safe local preview so reviewers can document findings, prioritize work, and produce repeatable audit reports without sending project data to a service.

## What it does

### Manual audit workflow

1. Choose a component or page preset, an optional focused rule pack, and a severity profile.
2. Review the applicable checklist rules and mark each **Not checked**, **Pass**, **Needs work**, or **Not applicable**. Add optional local reviewer notes.
3. Use the deterministic weighted score, category progress, stable manual issue IDs, and recommendations to prioritize the work.
4. Filter the checklist, export/import the manual audit JSON, or save an explicitly named local project.
5. Generate a Markdown report, open the print report and use the browser's **Print / Save as PDF** dialog, or download a machine-readable manual-audit JSON report.

The built-in rule data includes reusable presets, rule packs, severity profiles, applicability metadata, WCAG mappings where applicable, and deterministic recommendations. A severity profile changes weighting only; it never changes the reviewer’s answers. Accessibility-first weighting is not a WCAG certification or a complete compliance audit.

### Static source analysis and preview

Paste HTML or CSS, or load a local `.html`, `.htm`, or `.css` file (up to 256 KB), then run the browser-local analyzers. HTML checks cover headings, landmarks, labels, buttons, links, and images. CSS checks conservatively flag repeated literals, fixed-width and responsive risks, and overflow patterns. Analyzer findings include deterministic IDs, source, confidence, evidence, location/occurrence information where available, and relevant WCAG metadata.

Analyzer findings are not manual checklist findings: they do not change manual answers, weighted scores, recommendations, saved audit state, or manual-only reports.

Refresh the isolated local preview to review pasted HTML/CSS at Mobile (390px), Tablet (768px), Desktop (1180px), or a custom width. Preview tools include one-at-a-time spacing, layout, heading, focusable-element, and overflow overlays; a keyboard audit; session-only annotations; and a breakpoint comparison checklist for manual screenshots. Preview state is intentionally separate from scoring, rules, reports, and saved projects. Safe rendering, iframe isolation, and reduced-motion behavior are preserved.

### Reports and saved work

Layout Lens generates deterministic Markdown, on-screen/print, and schema-versioned machine-readable reports from the same normalized **manual** audit report model. Five report templates are available: Internal QA, Freelancer / Client Delivery, Agency Review, SaaS Team, and Design System Team. Browser printing is the supported PDF path; the application does not bundle a PDF generator.

An automatic local draft supports working-session recovery. Explicitly named saved projects use IndexedDB on the current browser/device and support metadata, opening, updating, duplication, audit-history snapshots, restoration, and improvement passes. The app migrates supported older local records conservatively and shows loading, empty, error/retry, and success states. Saved projects retain only supported manual audit data; scores and recommendations are recalculated after restoration.

## Manual AI handoff — strict limits

The AI-assisted review feature is a **manual, session-only handoff**, not an AI integration. Layout Lens can prepare a review package from selected deterministic evidence, show its included/excluded data, require explicit approval, copy it to the clipboard, and validate a pasted structured response from an external model.

- It makes no AI/API/network call, has no provider SDK, API key, backend, authentication, upload, retry queue, token estimate, price, latency, or model-selection feature.
- Conservative privacy controls exclude raw HTML/CSS, preview content, saved-project/report metadata, target URLs, browser/storage data, and other sensitive context by default. Notes and evidence snippets require explicit inclusion.
- Imported content is labeled **AI-generated**, **External AI response**, and **Human review required**. It must cite evidence from the prepared request; Layout Lens validates structure and references, not the truth or quality of prose.
- AI content is non-authoritative, session-only, excluded from drafts, saved projects, exports, and reports, and never changes deterministic scores, findings, recommendations, manual statuses, analyzer findings, severity, confidence, or WCAG mappings.

## Privacy, persistence, and product boundaries

All current product behavior runs in the browser. There is no backend, cloud upload, cloud synchronization, account, billing, collaboration, organization workspace, telemetry, or remote project storage. Pasted source is not automatically uploaded or persisted; the local preview and analyzers are opt-in browser actions. Downloads occur only when the reviewer selects them.

The current product does **not** include a browser extension, live-page inspection, automated screenshot capture, direct PDF generation, CI execution or enforcement, issue-tracker/design-system integrations, SaaS dashboard, team rules, enterprise workflows, or WCAG certification. These topics are documented as feasibility or deferral decisions only; see [`docs/browser-extension-feasibility.md`](docs/browser-extension-feasibility.md), [`docs/integration-feasibility.md`](docs/integration-feasibility.md), [`docs/saas-dashboard-feasibility.md`](docs/saas-dashboard-feasibility.md), and [`docs/enterprise-feature-deferral.md`](docs/enterprise-feature-deferral.md).

## Browser/runtime limitations

Node tests cover deterministic domain behavior, but they do not replace real-browser verification. The HTML fixture suite uses a Node parser adapter where `DOMParser` is unavailable; real-browser `DOMParser` fixture execution remains outstanding. Preview isolation, overlays, keyboard audit, IndexedDB persistence, downloads, printing/PDF output, manual screenshot capture, and assistive-technology behavior also require manual browser verification. See [`PLAN.md`](PLAN.md) for the current verification and follow-up roadmap.

## Project structure

```text
.
├── index.html                 # Browser application shell
├── assets/
│   ├── css/styles.css          # Responsive, accessible application styles
│   └── js/                     # Audit, analyzers, preview, reporting, storage, and AI-handoff modules
├── docs/                       # Focused feasibility and schema documents
├── test/                       # Core Node test suites
├── tests/                      # Feature tests and HTML/CSS fixtures
├── README.md                   # User-facing product documentation
├── PLAN.md                     # Active, forward-looking implementation plan
├── CHANGELOG.md                # Implemented-product history
└── package.json                # Dependency-free test scripts
```

## Run locally

Serve this directory with any static web server, then open `index.html` in a modern browser. No build step or runtime dependency is required.

```bash
cd digital-vault-layout-lens
npm test
npm run test:analyzer
```

- `npm test` runs the complete dependency-free Node test suite.
- `npm run test:analyzer` runs the focused HTML/CSS analyzer fixtures, including project-owned representative validation samples and correction regressions. In a Node-only runtime, the real-`DOMParser` test is expected to be skipped.

## Documentation

- [`PLAN.md`](PLAN.md) — current verification work and the next small set of roadmap items.
- [`CHANGELOG.md`](CHANGELOG.md) — concise history of completed implementation stages.
- [`docs/machine-readable-report-schema.md`](docs/machine-readable-report-schema.md) — the local manual-audit JSON report schema and boundaries.
- [`docs/extension-workflow-model.md`](docs/extension-workflow-model.md) — a platform-neutral future compatibility contract, not an extension implementation.
- [`docs/real-world-validation.md`](docs/real-world-validation.md) — executed representative analyzer validation, its evidence review, and browser limitations.
- [`docs/consented-usability-session-plan.md`](docs/consented-usability-session-plan.md) — prepared consented-session procedure and evidence template; no sessions are claimed.
