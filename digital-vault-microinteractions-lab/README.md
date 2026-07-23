# KP_Code Microinteractions Lab

KP_Code Microinteractions Lab is a standalone Digital Vault demonstration of frontend microinteraction patterns. It is a Polish-first, browser-based catalogue for exploring a pattern, reading its intended use and accessibility guidance, viewing a controlled live preview, and copying HTML, CSS, or (when needed) JavaScript snippets.

The project is intentionally small and local-first: it is plain HTML, CSS, and vanilla JavaScript, with no build step, package manager, framework, backend, or external UI library.

## Current scope

The current implementation includes:

- A data-driven catalogue of 32 interaction patterns with search and combined category, complexity, and motion filters.
- Taxonomy-backed filter options and Polish display labels.
- Selectable cards, a textual no-results state, and result-count feedback.
- A controlled `previewType`-to-renderer map for live previews; snippet strings are displayed and copied, not executed as arbitrary code.
- HTML, CSS, and optional JavaScript snippet tabs, plus per-snippet copy actions.
- Clipboard copying with a legacy selection fallback and visible live-region feedback.
- A light/dark theme toggle that uses `localStorage` when a preference is changed and otherwise starts from the system color-scheme preference.
- Semantic landmarks, a skip link, labelled controls, native buttons, visible focus styling, and status messaging.
- Responsive layouts at 480px, 760px, and 1024px minimum-width breakpoints.
- Global `prefers-reduced-motion` rules that shorten or remove animations and transforms while retaining focus and selected-state feedback.

The lab includes practical accessibility guidance and implementation features such as visible focus styling, labelled native controls, status messaging, and reduced-motion rules. It is prepared for further manual keyboard, contrast, reduced-motion, Clipboard, and assistive-technology verification; it is **not** a WCAG conformance claim, formal accessibility audit, or substitute for product-specific review.

## Run locally

For local development, open `index.html` with JavaScript enabled. No installation or build command is required. This is a development instruction, not a verified local-preview or browser-support guarantee: the project has no approved browser-support matrix, and browser targets and release-preview notes remain pending manual release-readiness work.

JavaScript is required for catalogue rendering, filtering, live previews, code tabs, copying, and theme switching. With JavaScript disabled, the page shows a notice instead of those interactive features.

## Technology

- HTML5
- CSS with custom properties, media queries, and `prefers-reduced-motion`
- Vanilla JavaScript (ES2015+ browser APIs)
- Browser `localStorage` and Clipboard API, with a selection-based copy fallback

## Project structure

```text
digital-vault-microinteractions-lab/
├── index.html              # Page structure and static educational/demo sections
├── README.md               # Project overview and operating notes
├── PLAN.md                 # Verified status and forward-looking roadmap
├── CHANGELOG.md            # Evidence-based record of maintained changes
├── docs/
│   ├── contributing-microinteractions.md # Catalogue workflow, taxonomy, and maintainability decision
│   ├── release-checklist.md         # Release-decision checklist (not QA evidence)
│   └── release-readiness-browser-qa.md # Repeatable manual browser QA checklist
├── scripts/
│   └── validate-catalogue.js         # Dependency-free catalogue validation command
└── assets/
    ├── css/
    │   └── main.css        # Tokens, themes, components, responsiveness, motion rules
    └── js/
        └── main.js         # Catalogue data, validation, rendering, state, previews, copying
```

## Maintaining the catalogue

`assets/js/main.js` is the source of truth for interaction metadata, cards, filters, previews, and snippet content. Each interaction is normalized and validated at startup and must provide:

`id`, `name`, `category`, `complexity`, `motion`, `featured`, `description`, `bestFor`, `accessibility`, `previewType`, `html`, `css`, and `js`.

- Use the taxonomy values defined in the same file for `category`, `complexity`, `motion`, and `previewType`.
- Keep `id` values unique and use a controlled `previewType`; unknown preview types receive a safe fallback preview.
- Provide non-empty HTML and CSS strings. `js` must be a string and may be empty when no script is necessary.
- Keep snippets self-contained: use semantic markup, scoped `mi-*` classes, no app-shell dependencies, no external CDN/link dependencies, and no `<script>` or `eval` content.
- Include an interaction-specific Polish accessibility note. Patterns marked with medium or expressive motion need a clear reduced-motion alternative.

Follow the full [contributor workflow](docs/contributing-microinteractions.md) when changing a pattern: update its metadata, controlled preview renderer and snippets together, provide pattern-specific accessibility and reduced-motion guidance, run the dependency-free validator, then complete the relevant manual checks only with real browser evidence. The current 32-record implementation remains intentionally cohesive in `assets/js/main.js`; the contributor guide documents the evidence-based decision and concrete triggers for reconsidering a split.

## Development status and limitations

This is a static demonstration rather than a packaged component library. The repository does not currently include an automated test suite, downloadable snippet packs, framework-specific exports, Figma token export, or an accessibility audit mode. The visual roadmap section in `index.html` describes possible directions and should not be read as an implementation commitment.

The repeatable functional browser checklist exists, but the remaining Phase 1 keyboard-only, viewport, reduced-motion, theme-contrast/focus, Clipboard-path, and assistive-technology-related manual checks have not yet been run. Browser support targets, verified local-preview notes, and release status must not be inferred from this documentation.

## Documentation

- [`PLAN.md`](PLAN.md) records the verified baseline, required follow-up work, and clearly separated optional enhancements.
- [`CHANGELOG.md`](CHANGELOG.md) records changes supported by repository evidence and provides the format for future maintenance.
- [`docs/contributing-microinteractions.md`](docs/contributing-microinteractions.md) explains the required record metadata, taxonomy, preview registration, snippets, accessibility, reduced-motion behavior, verification, and the evidence-based `main.js` maintainability decision.
- [`docs/release-checklist.md`](docs/release-checklist.md) prepares the browser-target, QA, accessibility, Clipboard, documentation, and packaging decisions required before a release.
- [`docs/release-readiness-browser-qa.md`](docs/release-readiness-browser-qa.md) provides the repeatable, not-yet-run browser QA checklist for the first Phase 1 verification item.

## Catalogue validation

Run `node scripts/validate-catalogue.js` to validate the current catalogue without installing dependencies. It reuses the startup validation logic and reports unique IDs, required fields, taxonomy values, snippet strings, accessibility notes, and reduced-motion guidance violations as a non-zero exit.
