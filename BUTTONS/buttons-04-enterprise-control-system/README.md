# Enterprise Control System Buttons

A premium standalone buttons package for KP_Code Digital Vault focused on enterprise dashboards, admin panels, SaaS workspaces, fintech tooling, and operational control surfaces where button state clarity needs to feel trustworthy and reusable.

## Component Concept

This package treats buttons as part of a real software workspace rather than a decorative gallery. The section combines a control-toolbar preview, disciplined card-based documentation, and production-oriented states so the system feels ready for dashboards, internal tools, CRM products, and analytics interfaces.

## Included Button Variants

1. Primary action button
2. Secondary action button
3. Tertiary / subtle utility button
4. Outline button
5. Ghost button
6. Destructive / danger button
7. Success / confirm button
8. Warning action button
9. Icon-only utility toggle button
10. Loading / processing button

A segmented control is also included in the toolbar to demonstrate selected-state behavior within the same enterprise design language.

## Accessibility Decisions

- Uses semantic `button` elements throughout for native keyboard and assistive technology support.
- Includes strong `:focus-visible` styling with a dedicated focus ring token.
- Keeps readable text contrast across neutral and semantic states.
- Uses `aria-pressed` for toggle and segmented controls.
- Uses `aria-live` and `role="status"` messaging for state updates.
- Uses `aria-busy` during the loading demo.
- Supports `prefers-reduced-motion: reduce` to minimize non-essential animation.

## State Behavior

- Hover and active feedback use restrained transform, color, and border changes.
- Disabled state is demonstrated on the primary variant.
- Selected state is demonstrated on both the segmented control and icon toggle button.
- Loading state is demonstrated with a spinner, disabled interaction lock, and completion feedback.
- Optional copy-label enhancement updates the status region and writes to the clipboard when supported.

## Token Structure

The stylesheet starts with reusable CSS custom properties for:

- neutral backgrounds and elevated surfaces
- text hierarchy and muted copy
- semantic action colors
- border strengths
- radii
- spacing scale
- typography stacks
- shadows
- interaction timing
- control sizing
- focus ring styling

## Customization Guidance

- Update the root tokens in `style.css` to align the package with your product brand.
- Duplicate or remove button cards in `index.html` as needed while keeping the scoped `enterprise-button--*` modifiers.
- Reuse the toolbar layout for real application headers, bulk actions, filter rows, or settings panels.
- Replace labels and helper messaging in `script.js` with domain-specific workflow terminology.
- For denser products, reduce `--ecs-control-height`, card padding, and grid gaps while keeping the same semantic state patterns.
