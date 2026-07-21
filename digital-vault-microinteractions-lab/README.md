# KP_Code Microinteractions Lab

KP_Code Microinteractions Lab is a standalone Digital Vault demonstration of frontend microinteraction patterns. It is a Polish-first, browser-based catalogue for exploring a pattern, reading its intended use and accessibility guidance, viewing a controlled live preview, and copying HTML, CSS, or (when needed) JavaScript snippets.

The project is intentionally small and local-first: it is plain HTML, CSS, and vanilla JavaScript, with no build step, package manager, framework, backend, or external UI library.

## Current scope

The current implementation includes:

- A data-driven catalogue of 32 interaction patterns with search and combined category, complexity, and motion filters.
- Taxonomy-backed filter options and Polish display labels.
- Selectable cards, an accessible no-results state, and result-count feedback.
- A controlled `previewType`-to-renderer map for live previews; snippet strings are displayed and copied, not executed as arbitrary code.
- HTML, CSS, and optional JavaScript snippet tabs, plus per-snippet copy actions.
- Clipboard copying with a legacy selection fallback and visible live-region feedback.
- A light/dark theme toggle that uses `localStorage` when a preference is changed and otherwise starts from the system color-scheme preference.
- Semantic landmarks, a skip link, labelled controls, native buttons, visible focus styling, and status messaging.
- Responsive layouts at 480px, 760px, and 1024px minimum-width breakpoints.
- Global `prefers-reduced-motion` rules that shorten or remove animations and transforms while retaining focus and selected-state feedback.

The lab provides practical implementation guidance; it is **not** a WCAG conformance claim or a substitute for a product-specific accessibility audit.

## Run locally

Open `index.html` in a modern browser. No installation or build command is required.

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

## Development status and limitations

This is a static demonstration rather than a packaged component library. The repository does not currently include an automated test suite, a formal manual QA checklist, downloadable snippet packs, framework-specific exports, Figma token export, or an accessibility audit mode. The visual roadmap section in `index.html` describes possible directions and should not be read as an implementation commitment.

## Documentation

- [`PLAN.md`](PLAN.md) records the verified baseline, required follow-up work, and clearly separated optional enhancements.
- [`CHANGELOG.md`](CHANGELOG.md) records changes supported by repository evidence and provides the format for future maintenance.
