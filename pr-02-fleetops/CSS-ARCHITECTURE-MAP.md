# FleetOps CSS Architecture Map

## Purpose

This document maps the current FleetOps CSS architecture before any major refactor. It documents the existing source files, detected responsibilities, current structure issues, and a practical target structure for the next implementation step.

No CSS rules have been moved as part of this mapping.

## Current CSS Loading

`index.html` currently loads generated minified CSS directly from `styles/`:

```html
<link rel="stylesheet" href="/styles/base.min.css" />
<link rel="stylesheet" href="/styles/components.min.css" />
<link rel="stylesheet" href="/styles/landing.min.css" />
<link rel="stylesheet" href="/styles/app.min.css" />
```

Current load order:

1. `base.min.css`
2. `components.min.css`
3. `landing.min.css`
4. `app.min.css`

This order matters because later files override earlier shared rules in scoped contexts, especially landing and app-specific overrides.

## Current CSS Files

### `styles/base.css`

Current role:

- Design tokens and theme variables:
  - `:root`
  - `[data-theme="light"]`
  - colors, shadows, radii, spacing, typography tokens
- Font definition:
  - local Inter WOFF2 via `@font-face`
- Global reset and document defaults:
  - `box-sizing`
  - selection
  - `html`, `body`
  - links and images
- Base form element reset and global focus outline
- App root baseline:
  - `body > #app`
  - no-JS fallback styles
- Accessibility primitives:
  - `.skip-link`
- Layout utilities:
  - `.container`
  - `.section`
  - `.grid`
  - `.flex`
  - `.flex-between`
  - `.muted`
- Typography defaults:
  - headings
  - paragraphs
- Generic primitives:
  - `.tag`
  - `.badge`
  - `.small`
  - `hr`
  - `.card`
- Overflow helpers:
  - `.table-responsive`
  - `.table-wrap`
  - `.scroll-x`
- Broad responsive rules for `.section` and `.container`

Assessment:

`base.css` is mostly doing the correct foundational work. It currently also contains small UI primitives (`.tag`, `.badge`, `.card`) and the no-JS fallback, which is acceptable for the current project but would be cleaner as a separate primitive/utilities layer in a future structure.

### `styles/components.css`

Current role:

- Shared brand/UI components:
  - `.logo`
  - theme-swapped logo icon helpers
- Buttons:
  - `.button`
  - `.button.primary`
  - `.button.secondary`
  - `.button.ghost`
  - theme toggle button selectors
- Forms:
  - `.input`
  - `select`
  - `textarea`
  - `.label`
  - `.form-control`
  - `.form-hint`
  - `.form-error`
- Navigation primitives:
  - `.navbar`
  - `.nav-links`
- Landing-style cards:
  - `.hero-card`
  - `.feature-grid`
  - `.feature-card`
  - shared hover/focus treatment for `.feature-card`, `.feature-group`, `.price-card`, `.marketing-card`, `.stat-card`
- Interactive components:
  - `.accordion`
  - `.modal`
  - `.dropdown`
  - `.toast`
- Data UI:
  - `.table`
  - status badges
  - `.table-filter`
  - `.chip`
  - `.kpi-grid`
  - `.feed`
  - `.alert`
  - `.card-list`
  - skeleton loading states

Assessment:

`components.css` currently acts as a broad shared UI layer. It contains true shared components, but also includes some domain/page-specific groups such as dashboard KPI/feed/alerts and landing card hover behavior. This makes it useful today but too broad for long-term maintainability.

### `styles/landing.css`

Current role:

- Landing page shell:
  - `.landing`
  - sticky landing navbar
  - landing mobile nav drawer and backdrop
  - `:root.is-nav-open` scroll lock
- Landing hero:
  - `.section.hero`
  - hero typography
  - hero CTA
  - hero visual/image swap
  - `heroFade`
- Landing sections:
  - how-it-works
  - pricing
  - testimonials
  - FAQ
- Footer:
  - `.footer`
  - footer grid
  - footer brand
  - footer lists
  - footer contact
  - footer social links
  - footer bottom
- Marketing pages:
  - `.page-hero`
  - `.page-hero__mark`
  - `.section-tight`
  - `.marketing-hero`
  - `.stat-grid`
  - `.stat-card`
  - `.marketing-grid`
  - `.contact-grid`
  - `.marketing-card`
  - `.feature-group`
  - `.form-card`
  - `.card-soft`
  - `.contact-address`
  - `.list-check`
  - `.cta-panel`
  - `heroMarkIn`
- Landing/marketing responsive rules

Assessment:

`landing.css` is the main page-specific stylesheet for public and marketing views. Most of its rules are appropriately scoped under `.landing`. It also contains some shared or cross-context responsive table rules near the bottom, which are not landing-specific.

### `styles/app.css`

Current role:

- Authenticated/demo app shell:
  - `.app-shell`
  - `.sidebar`
  - `.topbar`
  - `.app-topbar`
  - drawer/backdrop behavior
  - `.app-main`
  - `.app-content`
- App modules and panels:
  - `.panel`
  - `.module-header`
  - module spacing
- Dashboard/app content:
  - `.activity-row`
  - `.alerts`
  - `.alert`
  - `.alert.is-muted`
  - `.alert-content`
- App table row behavior:
  - `.order-row`
- App-specific focus/hover states:
  - sidebar links
  - order row cells
  - app panel focus-within
  - app form/table focus-visible
- Toolbars:
  - `.toolbar`
- Settings:
  - `.settings-grid`
  - `.setting-card`
- Compact mode:
  - `body[data-compact="true"]`
- App responsive layout:
  - desktop-to-mobile app shell behavior
  - sidebar drawer behavior
  - topbar wrapping rules
- Empty state:
  - `.empty-state`
  - `.empty-state__card`
  - `.empty-state__title`
- Utility components used by app views:
  - `.label-pill`
  - `.progress-bar`
  - `.form-inline`

Assessment:

`app.css` is mostly app-specific and appropriately scoped. Some rules overlap conceptually with `components.css`, especially `.alert`, `.card-list`, empty states, progress bars, and form utilities. There are also commented-out historical blocks that should be cleaned during migration.

## Current Generated Files

Generated minified CSS files are currently stored next to source files in `styles/`:

- `styles/base.min.css`
- `styles/components.min.css`
- `styles/landing.min.css`
- `styles/app.min.css`

Current issue:

Source and generated assets are mixed in one folder. This is workable for a small static project, but it makes source review noisier and increases the chance of editing generated files by mistake.

Long-term goal:

Keep readable source CSS under a source folder and output production-ready minified CSS into `dist/`.

## Detected Misplaced Or Duplicated Rule Groups

### Shared primitives mixed into `base.css`

Detected:

- `.tag`
- `.badge`
- `.card`

Notes:

These are reusable UI primitives rather than pure base/reset rules. They can remain temporarily, but in a cleaner structure they belong in a primitives/components layer.

### Dashboard/app component rules inside `components.css`

Detected:

- `.kpi-grid`
- `.feed`
- `.alert`
- `.card-list`

Notes:

These are used in app/dashboard views and overlap with app-specific rules in `app.css`. A future pass should decide whether they are shared layout primitives or app-only components.

### `.alert` split between `components.css` and `app.css`

Detected:

- `components.css` defines a generic `.alert` row-style layout.
- `app.css` overrides `.alert` into a column layout and adds `.alert.is-muted`.

Risk:

The same class name has different responsibility depending on load order and app context. Because `app.css` loads last, app rules currently win. This is behaviorally stable today but not ideal for maintainability.

Preferred direction:

Use one source of truth for app alerts, likely under an app/dashboard stylesheet or an app-scoped selector such as `.app-shell .alert`.

### Navigation responsibilities split across `components.css`, `landing.css`, and `app.css`

Detected:

- `components.css` defines generic `.navbar` and `.nav-links`.
- `landing.css` defines `.landing .navbar`, landing drawer, nav toggle, backdrop, and mobile behavior.
- `app.css` defines app shell sidebar, app topbar, drawer, and extra `.app-shell .navbar` responsive rules.

Notes:

The split is understandable because landing and app navigation differ. The target structure should keep shared nav primitives separate from landing/app-specific shells.

### Table responsive rules duplicated or misplaced

Detected:

- `base.css` defines `.table-responsive`, `.table-wrap`, `.scroll-x`.
- `landing.css` adds mobile `.table-responsive .table` behavior near the marketing responsive section.
- `components.css` defines `.table`.

Notes:

Responsive table behavior is a shared data-display concern, not landing-specific. It should move into a table component file in a future step.

### Landing card states split across `components.css` and `landing.css`

Detected:

- `components.css` defines `.feature-card`, `.feature-group`, `.price-card`, `.marketing-card`, `.stat-card` hover/focus/motion behavior.
- `landing.css` defines `.step`, `.testimonial`, `.price-card`, `.marketing-card`, `.stat-card`, and marketing section layout.

Notes:

Some shared card state rules are useful, but landing-specific card groups should be closer to landing/marketing CSS or moved into a dedicated card primitive with clear ownership.

### Utility components inside `app.css`

Detected:

- `.label-pill`
- `.progress-bar`
- `.form-inline`

Notes:

These are small reusable utilities/components and may not need to live inside app-specific CSS if reused elsewhere.

### Commented-out/dead CSS blocks

Detected:

- `styles/app.css` contains an old commented `.panel` / `.module-header` block.
- `styles/app.css` contains a commented reports spacing block.
- `styles/base.css` contains a `UI LOCK` comment inside the light theme token block.

Notes:

These are not runtime defects, but they should be removed during cleanup to keep source files authoritative.

## Proposed Target Source Structure

Recommended next source structure, keeping the project static and avoiding over-splitting:

```text
styles/
├── src/
│   ├── 00-settings.css       # design tokens, themes, font-face
│   ├── 01-base.css           # reset, document defaults, typography, media defaults
│   ├── 02-layout.css         # container, section, grid/flex helpers, app root/no-JS fallback
│   ├── 03-components.css     # shared UI: buttons, forms, badges, cards, modal, dropdown, toast, accordion
│   ├── 04-data.css           # tables, table responsive behavior, filters, chips, skeleton, progress
│   ├── 05-landing.css        # landing shell, hero, sections, footer, marketing pages
│   └── 06-app.css            # app shell, dashboard/app views, settings, compact mode
└── *.css / *.min.css         # current files remain until migration is complete
```

Why this structure:

- Keeps the number of files manageable.
- Separates design foundation from reusable components.
- Moves data-display patterns out of landing/app files.
- Keeps page-level CSS (`landing`, `app`) clear and scoped.
- Allows a later build step to concatenate/minify into `dist/`.

## Suggested Migration Order For The Next Step

1. Create `styles/src/` with the target source files, but do not change `index.html` yet.
2. Move token and theme blocks from `base.css` into `00-settings.css`.
3. Move reset, document defaults, typography, links/images, form element reset, and accessibility baseline into `01-base.css`.
4. Move layout utilities, app root, no-JS fallback, `.container`, `.section`, `.grid`, `.flex`, `.flex-between`, and overflow helpers into `02-layout.css`.
5. Move reusable UI primitives and components into `03-components.css`:
   - buttons
   - inputs/forms
   - logo
   - tags/badges/cards
   - modal
   - dropdown
   - toast
   - accordion
6. Move data-display patterns into `04-data.css`:
   - tables
   - responsive tables
   - filters/chips
   - skeleton
   - progress bar
   - KPI/feed/card-list only if treated as reusable data components
7. Move landing-specific rules into `05-landing.css`.
8. Move app-specific rules into `06-app.css`.
9. Remove obsolete commented CSS blocks during the same migration, not before.
10. After source migration is verified, update the minification pipeline in a separate step.

## Notes For Later `dist/` Handling

Do not create `dist/` in this mapping step.

Recommended later direction:

```text
dist/
└── css/
    ├── base.min.css
    ├── components.min.css
    ├── landing.min.css
    └── app.min.css
```

or, after the source split:

```text
dist/
└── css/
    └── fleetops.min.css
```

Decision point for later:

- Multiple output files preserve the current load model and make incremental migration safer.
- A single bundled CSS file simplifies production loading but requires a more intentional build pipeline and careful order control.

Recommended next production-safe approach:

Keep multiple generated CSS outputs first, then consider a single bundle only after the source structure is stable.

## Migration Guardrails

- Do not edit `.min.css` manually.
- Keep `index.html` load order unchanged until the new source and build output are verified.
- Preserve selector behavior before renaming classes.
- Avoid class renames during the first migration pass.
- Move rules by responsibility first; reduce duplication after visual verification.
- Keep app-specific overrides loaded after shared components.
- Treat `landing.css` and `app.css` as page/domain layers, not shared component buckets.

## Next Prompt Recommendation

Suggested next implementation task:

Create `styles/src/` and migrate the current source CSS into the proposed files without changing runtime CSS loading yet. After that, compare the migrated source with the current source for coverage before updating build scripts or generated output paths.
