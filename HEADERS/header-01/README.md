# header-01 (Minimal Editorial)

`header-01` is a standalone premium editorial header component built for brand, studio, portfolio, boutique, and travel websites. It is intentionally light, refined, and typography-led, with subtle interactivity and calm spacing.

## File structure

- `header.html` — semantic component markup.
- `header.css` — mobile-first BEM styles and theme-ready visual system.
- `header.js` — scoped behavior for mobile menu, theme toggle, and sticky scroll state.

## Included features

- Semantic, accessible header with primary navigation.
- Mobile hamburger navigation with ARIA state syncing.
- Sticky header treatment with restrained blur/border/shadow refinement on scroll.
- Light/dark theme toggle with persisted preference via `localStorage`.
- Premium editorial interactions (subtle line reveal, tonal hover, thin controls).
- Mobile-first layout with a single transition breakpoint at `900px`.
- Reduced motion support via `prefers-reduced-motion`.

## Accessibility notes

- Uses semantic landmarks (`<header>`, `<nav>`, lists, links, buttons).
- Mobile menu trigger uses `aria-expanded` and `aria-controls`.
- Theme toggle uses `aria-pressed` and dynamic `aria-label` updates.
- Escape key closes the mobile menu and returns focus to the trigger.
- Click-outside behavior closes the mobile panel when open.
- All interactive elements provide explicit `:focus-visible` styling.

## Breakpoint behavior

- **Below `900px`**
  - Compact header with brand, menu toggle, and right-side actions.
  - Mobile panel is hidden by default and shown when the toggle opens it.

- **At/above `900px`**
  - Menu toggle is removed from layout.
  - Primary navigation appears inline and centered.
  - Mobile panel is force-hidden.
  - If viewport crosses into desktop while mobile menu is open, JS resets it safely.

## Integration guidance

1. Place `header.html` into your page body where the header should render.
2. Load `header.css` in your document `<head>`.
3. Load `header.js` near the end of `<body>` (or with `defer`) so markup exists before initialization.
4. Ensure the header root keeps `data-header-01` so script scoping works.

Example include pattern:

```html
<link rel="stylesheet" href="HEADERS/header-01/header.css" />

<!-- header markup -->

<script src="HEADERS/header-01/header.js" defer></script>
```

## Customization notes

- **Branding**
  - Replace `Atelier North` and `AN` in `header.html` with your brand identity.

- **Navigation**
  - Edit desktop and mobile link labels/URLs in `header.html`.
  - Keep structure intact for accessibility and predictable styling.

- **Color and tone**
  - Adjust component design tokens in `.header-01` and `.header-01[data-header-01-theme="dark"]` inside `header.css`.
  - Recommended edits: `--header-01-bg`, `--header-01-text`, `--header-01-border`, and `--header-01-shadow`.

- **Theme logic**
  - Preference is stored under `header-01-theme`.
  - If your project has a global theming system, replace localStorage logic in `header.js` with app-level theme sync while preserving ARIA updates.

- **Sticky behavior intensity**
  - Tune `.header-01--scrolled` to increase/decrease blur, border contrast, or shadow depth.

## Reusability contract

- Class names follow strict `header-01` BEM convention to avoid collisions.
- JavaScript is component-scoped via `data-header-01` and related data attributes.
- No external libraries or build tools are required.
