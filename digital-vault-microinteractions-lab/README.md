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

Live previews use a controlled `previewType` → renderer-function map in `assets/js/main.js`. Snippet strings are shown for copying in the code panel, but they are not executed as arbitrary JavaScript; the selected interaction object remains the single source for card state, preview metadata and snippet content.



## Accessibility and reduced-motion guidance

This lab provides practical accessibility guidance for microinteractions, not WCAG certification or a formal compliance claim. A separate manual audit is required before any copied pattern is described as WCAG-compliant in a production product.

- Every interaction in `assets/js/main.js` needs a Polish `accessibility` note that is specific to the pattern, including the relevant keyboard, ARIA, contrast, announcement or motion concern.
- Motion-heavy patterns (`medium` or `expressive`) need an explicit reduced-motion strategy: remove looping motion, replace transform-heavy movement with static state, shorten transitions, or preserve the final state without animation.
- Keyboard support is expected for filters, cards, tabs, accordions, preview controls and code-copy actions. Hover-only behavior needs an equivalent `:focus-visible` state.
- Focus indicators must remain visible in light and dark themes and must not be removed by `prefers-reduced-motion` rules.
- Toasts, save states and copy feedback should use visible text plus a polite `aria-live`/`role="status"` pattern when the status is dynamic.
- Forms should keep real labels, connect validation/help text with `aria-describedby` where applicable and never communicate valid/error states by color alone.
- Dashboard/status patterns need text labels and sufficient contrast; dots, pulses, badges and progress bars are supporting visuals only.
- Snippets copied from the lab should preserve semantic HTML, focus states, status text and reduced-motion behavior instead of copying only the visual effect.

### Category-level checklist

| Category | Practical accessibility expectation | Reduced-motion expectation |
| --- | --- | --- |
| Buttons and CTAs | Native `<button>`/link semantics, clear label, visible focus and keyboard activation. | Replace magnetic, press or ripple movement with static shadow, outline or contrast change. |
| Feedback/toasts/status | Visible status text, `aria-live`/`role="status"` for dynamic feedback and no color-only meaning. | Remove slide, pulse or looping effects while keeping the status visible. |
| Loading/progress | Textual loading/progress state and reserved layout; decorative skeletons should not be the only announcement. | Disable shimmer/spinner loops and show a static placeholder or final value. |
| Forms | Persistent labels, help/error text connected to fields and validation that is readable without color. | Avoid shaking/moving labels; update text and border/static state immediately. |
| Navigation/tabs/accordions | Expected tab/accordion semantics, `aria-selected`/`aria-expanded` where relevant and predictable focus order. | Remove sliding indicators or height animations, preserving selected/open state. |
| Cards/dashboard/empty states | Content remains visible without hover; interactive cards need focusable controls and text labels. | Remove reveal/tilt/lift transforms while keeping outline, shadow, border or text state. |

## Snippet quality rules

Snippets are educational, copy-ready examples for plain HTML/CSS/JS projects, not full production component libraries. Keep them aligned with the live preview selected in the catalogue.

- Every interaction must expose `html`, `css` and `js` fields in `assets/js/main.js`; `html` and `css` must be non-empty strings, and `js` must be a string (`""` when JavaScript is not needed).
- Use BEM-like snippet classes with a stable block name derived from the pattern, e.g. `mi-button-magnetic` and elements like `mi-button-magnetic__spinner`.
- HTML should prefer semantic elements, native controls, useful text labels and ARIA only when it adds clarity; avoid inline styles, app-only wrappers, unavailable assets and external dependencies.
- CSS should stay scoped to snippet classes, use custom properties with fallbacks where practical, avoid broad global selectors and include `prefers-reduced-motion` handling whenever motion or animation is present.
- JavaScript is optional and should stay small, local and defensive: query local selectors, guard empty NodeLists/elements, avoid hidden app state, avoid dependencies, never use `eval`, and never inject arbitrary script strings.
- Snippets must not depend on the Digital Vault app shell, hidden globals, frameworks, CDNs, build tools or backend services unless a future note explicitly documents that dependency.
- Snippets should match the core live-preview behavior: loading buttons show a loading affordance, tabs include tab-like markup and optional local JS, accordions use accordion markup, toasts use status messaging, and static patterns keep `js: ""`.
- Accessibility expectations are practical guidance: visible focus, semantic controls, text equivalents for visual states and no claim of WCAG certification without a separate manual audit.

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
