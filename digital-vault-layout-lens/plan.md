# KP_Code Layout Lens Development Plan

This plan describes how KP_Code Layout Lens should evolve from a static manual audit app into a serious KP_Code Digital Vault developer product. Each phase should ship as a useful product increment, not as speculative infrastructure.

## Phase 1: Static manual audit app

### Objective
Create a polished, trustworthy UI audit workspace that proves the product workflow and establishes clean frontend architecture.

### Features
- [x] Landing/dashboard-style interface.
- [x] Manual audit checklist grouped by category.
- [x] Component type presets.
- [x] Weighted scoring engine.
- [x] Category scores and recommendations.
- Local audit persistence.
- Roadmap and improvement documentation.

### Technical notes
- Use HTML, CSS, and vanilla JavaScript only.
- Keep rule data, scoring logic, demo presets, and DOM rendering in separate files.
- Use semantic HTML, accessible controls, visible focus styles, and responsive layouts.

### Risks
- Manual input can feel subjective without strong rule descriptions.
- Too many rules can make v1 feel heavy.
- Over-polishing visual design could delay future analyzer work.

### What should not be built yet
- Backend, accounts, uploads, AI, report export, browser extension, or database.

## Phase 2: Richer rule engine and templates

### Objective
Make audits more repeatable across project types, teams, and quality bars.

### Features
- Rule packs for marketing pages, dashboards, forms, ecommerce, and content sites.
- Severity profiles such as baseline, production, premium, and accessibility-first.
- Rule prerequisites and conditional applicability.
- Better recommendation grouping and prioritization.
- Import/export of JSON audit states.

### Technical notes
- Introduce versioned rule schemas.
- Add validation for rule data integrity.
- Keep the engine deterministic and testable before adding external intelligence.

### Risks
- Rule schema complexity could outgrow the simple UI.
- Teams may disagree on severity defaults.
- Conditional rules can become difficult to explain.

### What should not be built yet
- Real DOM parsing, visual overlays, AI-generated findings, or multi-user saved workspaces.

## Phase 3: HTML/CSS input analyzer

### Objective
Let users paste or import static HTML/CSS snippets and receive deterministic automated findings.

### Features
- HTML textarea or file input for static markup.
- CSS textarea or file input for styles.
- Basic parsing for headings, landmarks, labels, buttons, links, images, and CSS declarations.
- Automated checks for semantic structure, missing labels, repeated literal values, fixed widths, and overflow risk indicators.
- Evidence snippets attached to findings.

### Technical notes
- Use browser-native parsing where possible, such as `DOMParser` for HTML.
- Keep analyzer output compatible with the existing rule/result model.
- Separate analyzer adapters from manual rules.

### Risks
- Static parsing cannot fully understand runtime state, framework output, or computed styles.
- False positives can reduce trust.
- File handling must stay safe and local unless a backend is intentionally introduced.

### What should not be built yet
- Server-side crawling, remote URL scanning, login-protected analysis, or AI review.

## Phase 4: Live preview and visual overlays

### Objective
Help reviewers inspect UI evidence visually, not only through checklist status.

### Features
- Local preview sandbox for pasted HTML/CSS.
- Viewport controls for mobile, tablet, and desktop.
- Overlay modes for spacing, layout boxes, headings, focusable elements, and overflow.
- Manual annotation support for reviewer notes.

### Technical notes
- Use an isolated iframe for preview content.
- Keep overlay calculations separate from audit scoring.
- Respect reduced-motion and avoid injecting unsafe scripts.

### Risks
- Preview isolation and CSS scoping can be tricky.
- Overlay visuals can become noisy.
- Complex app UIs may not render accurately from partial snippets.

### What should not be built yet
- Browser extension capture, remote page crawling, authenticated SaaS features, or AI auto-fixes.

## Phase 5: Exportable PDF/Markdown reports

### Objective
Turn audits into client-ready and team-ready deliverables.

### Features
- Markdown report generation.
- Print-optimized report view.
- Optional PDF export through browser print flow first.
- Executive summary, category breakdown, issue list, recommendations, and evidence sections.
- Report templates for internal QA and client delivery.

### Technical notes
- Start with deterministic HTML/Markdown output.
- Keep report data derived from the same audit state model.
- Avoid heavy PDF dependencies until the report format stabilizes.

### Risks
- Report polish can consume time before analysis depth is strong.
- PDF rendering differences across browsers can create support issues.
- Stakeholders may expect collaborative comments or sign-off workflows too early.

### What should not be built yet
- Cloud report hosting, payment flows, team permissions, or AI-written executive summaries.

## Phase 6: Saved projects and local database/backend

### Objective
Support durable audit history, project organization, and repeatable workflows.

### Features
- Saved audit projects.
- Local project database using IndexedDB as a first step.
- Optional backend/API only when collaboration, sync, or accounts become necessary.
- Audit version history and duplicated audits.
- Basic project metadata such as owner, project type, target URL, and review date.

### Technical notes
- Start local-first to avoid premature infrastructure.
- Define migration strategy for audit schemas.
- Keep persistence behind a small storage interface.

### Risks
- Data migration can become painful if schemas are not versioned.
- Backend introduction can distract from product quality.
- User expectations increase once accounts and saved data exist.

### What should not be built yet
- Multi-tenant SaaS, billing, enterprise permissions, or real-time collaboration unless validated.

## Phase 7: AI-assisted senior frontend review

### Objective
Add AI as a reviewer assistant that explains findings, prioritizes fixes, and helps teams improve faster while remaining grounded in deterministic evidence.

### Features
- AI-generated audit summaries based on captured findings.
- Suggested issue prioritization and remediation plans.
- Prompt templates for senior frontend review styles.
- Optional code explanation for pasted snippets.
- Guardrails requiring evidence references for AI claims.

### Technical notes
- AI should consume structured audit evidence, not replace deterministic checks.
- Keep prompts versioned and test outputs against known fixtures.
- Provide clear labeling for AI-generated content.

### Risks
- Ungrounded AI claims can reduce trust.
- Privacy concerns arise when users submit proprietary UI code.
- Costs and latency must be controlled.

### What should not be built yet
- Autonomous code modification, production deployment bots, or unreviewed AI scoring.

## Phase 8: SaaS/browser extension path

### Objective
Choose the right distribution model once the core audit workflow, analyzer quality, and reporting value are validated.

### Features
- Browser extension for inspecting live pages.
- SaaS dashboard for saved projects, reports, and team review history.
- Shared rule libraries and organization quality profiles.
- Integrations with design systems, issue trackers, and CI checks.

### Technical notes
- Browser extension should reuse the rule/analyzer/report model where possible.
- SaaS architecture should separate tenant data, billing, and audit processing cleanly.
- CI integration should output machine-readable reports.

### Risks
- Extension permissions and store review can slow delivery.
- SaaS operations require security, privacy, support, and compliance investment.
- Building both extension and SaaS too early can split focus.

### What should not be built yet
- Anything that cannot reuse the validated core audit model or lacks a clear user workflow.
