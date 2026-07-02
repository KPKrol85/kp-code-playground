# KP_Code Microinteractions Lab

Standalone Digital Vault product demo: polished, Polish-first library of frontend microinteractions built with HTML, CSS and vanilla JavaScript.

## Features

- Dynamic catalogue of 30+ interaction patterns.
- Search plus category, complexity and motion filters.
- Live preview for the selected interaction.
- Copy-ready HTML, CSS and optional JS snippets.
- Light/dark theme toggle with `localStorage` persistence.
- Accessible structure with skip link, landmarks, visible focus states and aria-live feedback.
- Mobile-first responsive layout with 480px, 760px and 1024px breakpoints.
- Reduced motion support through `prefers-reduced-motion`.

## File structure

```text
digital-vault-microinteractions-lab/
├── index.html
├── README.md
├── plan.md
├── improvements.md
└── assets/
    ├── css/
    │   └── main.css
    └── js/
        └── main.js
```

## How to run

Open `index.html` directly in a browser. No build step, backend, framework or dependency installation is required.

## Interaction data model and taxonomy

The catalogue in `assets/js/main.js` is the single source of truth for cards, filters, live preview metadata and copy-ready snippets. Every interaction object must include the same required fields:

| Field | Meaning |
| --- | --- |
| `id` | Stable, unique kebab-case identifier used for selection and duplicate checks. |
| `name` | Human-readable interaction name shown in cards and preview. |
| `category` | Programmatic category key from the allowed taxonomy below. |
| `complexity` | Implementation difficulty key from the allowed taxonomy below. |
| `motion` | Motion intensity key from the allowed taxonomy below. |
| `featured` | Boolean flag for promoted patterns. |
| `description` | Concise Polish educational summary of the interaction. |
| `bestFor` | Polish guidance describing the product situation where the pattern fits best. |
| `accessibility` | Practical accessibility and reduced-motion note; this is guidance, not a WCAG certification. |
| `previewType` | Safe renderer key mapped to the controlled preview architecture. |
| `html` | Required copy-ready HTML snippet. |
| `css` | Required copy-ready CSS snippet. |
| `js` | Required string field for optional JavaScript; use an empty string when JS is not needed. |

Allowed `category` values:

- `feedback`
- `navigation`
- `forms`
- `buttons`
- `cards`
- `loading`
- `onboarding`
- `dashboard`
- `ecommerce`
- `empty-states`

Allowed `complexity` values:

- `basic`
- `intermediate`
- `advanced`

Allowed `motion` values:

- `none`
- `subtle`
- `medium`
- `expressive`

Allowed `previewType` values:

- `accordion`
- `button-glow`
- `button-loading`
- `button-magnetic`
- `button-press`
- `card`
- `dot`
- `empty`
- `field`
- `meter`
- `progress`
- `row`
- `skeleton`
- `status`
- `tabs`
- `toast`
- `tooltip`

Filters should be generated from the taxonomy and interaction cards should display Polish labels mapped from these programmatic keys. When adding a pattern, keep the card metadata, preview metadata and snippet tabs connected to the same interaction object so the product does not drift between browsing, previewing and copying.

## Quality checklist

- Semantic HTML and Polish educational content.
- BEM-style class naming.
- Design tokens for colors, spacing, radii, shadows, typography and transitions.
- Keyboard-friendly filters, buttons, tabs and preview actions.
- Clipboard fallback for non-secure contexts.
- No external UI libraries.

## Future roadmap

- Downloadable snippet packs for product teams.
- Framework versions for React and Vue.
- Figma token export.
- More dashboard, checkout and onboarding patterns.
- Accessibility audit mode with WCAG-oriented checks.
