# KP_Code Layout Lens Future Improvements

## UI/UX

- Add audit progress indicators by category.
- Add compact and detailed checklist views.
- Add reviewer notes per rule.
- Add empty, loading, and completed states for future saved projects.
- Add report preview mode with print-friendly styling.
- Add keyboard shortcuts for fast status changes.

## Audit engine

- Add versioned rule schema validation.
- Support rule packs by product type and maturity level.
- Add conditional applicability logic.
- Add scoring profiles for baseline, production, premium, and accessibility-first audits.
- Add deterministic issue IDs for report tracking.
- Add import/export for audit state JSON.

## Accessibility

- Add automated checks for heading order, labels, landmarks, button names, and image alternatives.
- Add contrast checking once computed styles or manual color input is available.
- Add keyboard-only audit mode.
- Add screen-reader-oriented report summaries.
- Add WCAG mapping fields to relevant rules.

## Analyzer features

- Add pasted HTML and CSS analysis.
- Add static detection for fixed widths, overflow risk, missing semantic elements, and repeated CSS literals.
- Add iframe preview for local snippets.
- Add visual overlays for spacing, boxes, focusable elements, headings, and overflow.
- Add viewport comparison snapshots.
- Add evidence capture for every automated finding.

## AI features

- Add AI summaries only after deterministic findings and evidence are available.
- Add review-tone presets such as senior frontend reviewer, accessibility reviewer, and product polish reviewer.
- Add prompt templates that require evidence references.
- Add privacy controls before sending user code to any model.
- Add confidence and source labeling for AI-assisted recommendations.

## Product/business direction

- Package audit outputs as client-ready quality reports.
- Create templates for freelancers, agencies, SaaS teams, and design system teams.
- Explore a paid premium report workflow after export quality is validated.
- Explore team dashboards only after saved projects prove useful.
- Consider browser extension distribution once live-page inspection is validated.

## Technical architecture

- Add lightweight unit tests for the audit engine when a test runner is introduced.
- Add a storage adapter around `localStorage` before adding IndexedDB.
- Add schema migrations before saved project history grows.
- Add a report adapter that consumes audit state without touching DOM rendering.
- Keep analyzer modules independent from UI components.
- Avoid backend infrastructure until collaboration, sync, or account needs are validated.
