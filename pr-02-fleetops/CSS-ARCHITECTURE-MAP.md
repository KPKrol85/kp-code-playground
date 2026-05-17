# FleetOps CSS Architecture Map

## Status

The staged CSS architecture migration has been implemented.

Development now loads a readable CSS entrypoint:

```html
<link rel="stylesheet" href="/styles/main.css" />
```

Production builds generate a single minified CSS bundle:

```text
dist/styles/main.min.css
```

The legacy top-level CSS files and legacy `.min.css` files in `styles/` have been removed from the active source workflow.

## Current Source Structure

```text
styles/
├── main.css
└── src/
    ├── 00-settings.css
    ├── 01-base.css
    ├── 02-layout.css
    ├── 03-components.css
    ├── 04-data.css
    ├── 05-landing.css
    └── 06-app.css
```

`styles/main.css` imports the modular source files in cascade order:

```css
@import url("./src/00-settings.css");
@import url("./src/01-base.css");
@import url("./src/02-layout.css");
@import url("./src/03-components.css");
@import url("./src/04-data.css");
@import url("./src/05-landing.css");
@import url("./src/06-app.css");
```

## File Responsibilities

### `styles/src/00-settings.css`

- Design tokens.
- Theme variables.
- Local `@font-face` definition.
- Font-size tokens from `--fs-01` to `--fs-08`.
- Font-weight tokens: `--fw-regular`, `--fw-medium`, `--fw-semibold`, `--fw-bold`.
- Line-height tokens: `--lh-tight`, `--lh-snug`, `--lh-normal`, `--lh-relaxed`.
- Rem-based spacing tokens from `--space-0` to `--space-8`.

### `styles/src/01-base.css`

- Reset and document defaults.
- Base typography.
- Links, media defaults, form element defaults.
- Focus baseline and accessibility primitives.

### `styles/src/02-layout.css`

- App root baseline.
- No-JS fallback styles.
- Containers, sections, grids, flex helpers.
- Overflow helpers and shared layout utilities.

### `styles/src/03-components.css`

- Shared UI primitives.
- Logo component styles.
- Buttons, form controls, tags, badges, cards.
- Modal, dropdown, toast, accordion and shared navigation primitives.

### `styles/src/04-data.css`

- Tables and responsive table behavior.
- Filters, chips, status badges.
- KPI/feed/card-list patterns.
- Skeleton states and progress bars.

### `styles/src/05-landing.css`

- Landing shell and public navigation.
- Hero section and hero image presentation.
- Public sections, pricing, FAQ, footer.
- Marketing pages and landing-specific responsive rules.

### `styles/src/06-app.css`

- Authenticated/demo app shell.
- Sidebar, app topbar, drawer and dashboard layout.
- App panels, dashboard views, settings, compact mode.
- Empty states and app-specific responsive overrides.

## Production Build Behavior

`build-dist.js` reads the source files in this order:

1. `styles/src/00-settings.css`
2. `styles/src/01-base.css`
3. `styles/src/02-layout.css`
4. `styles/src/03-components.css`
5. `styles/src/04-data.css`
6. `styles/src/05-landing.css`
7. `styles/src/06-app.css`

The build concatenates and minifies them through PostCSS/cssnano into:

```text
dist/styles/main.min.css
```

Generated `dist/index.html` and `dist/404.html` load:

```html
<link rel="stylesheet" href="/styles/main.min.css" />
```

## Token System

Typography and spacing tokens are defined in `styles/src/00-settings.css`.

Font-size scale:

```text
--fs-01: 0.75rem
--fs-02: 0.875rem
--fs-03: 1rem
--fs-04: 1.125rem
--fs-05: 1.25rem
--fs-06: 1.5rem
--fs-07: 2rem
--fs-08: 2.5rem
```

Font-weight tokens:

```text
--fw-regular: 400
--fw-medium: 500
--fw-semibold: 600
--fw-bold: 700
```

Line-height tokens:

```text
--lh-tight: 1.1
--lh-snug: 1.25
--lh-normal: 1.5
--lh-relaxed: 1.65
```

Spacing tokens:

```text
--space-0: 0.25rem
--space-1: 0.375rem
--space-2: 0.625rem
--space-3: 1rem
--space-4: 1.375rem
--space-5: 2rem
--space-6: 3rem
--space-7: 4rem
--space-8: 5rem
```

Safe source CSS usages of `font-size`, `font-weight`, and `line-height` have been refactored to token references. Intentional special values remain in place where token replacement would alter component alignment or responsive hierarchy.

## Maintenance Notes

- Edit readable CSS only under `styles/src/`.
- Keep `styles/main.css` as the development entrypoint.
- Do not manually edit `dist/styles/main.min.css`.
- Keep token additions in `styles/src/00-settings.css`.
- App-specific overrides must remain after shared components and data rules.
- If a new CSS module is added, update both `styles/main.css` and the ordered `cssSources` list in `build-dist.js`.
- `dist/` is generated output and can be recreated with `npm run build`.
