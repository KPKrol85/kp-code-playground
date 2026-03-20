# System Status Controls Buttons

A standalone premium button package for KP_Code Digital Vault focused on product-grade actions where clarity, safety, state meaning, and operational confidence matter more than decoration.

## Design Concept

This pack is structured like a real dashboard control layer instead of a button gallery. It combines a preview filter bar, a live status rail, semantic grouping, and realistic action pairings so the component feels suitable for SaaS settings, billing operations, moderation tools, account management, and internal admin systems.

## Included Variants

- Primary action
- Neutral secondary action
- Success / confirm action
- Publish action
- Warning action
- Quiet warning / hold action
- Danger / destructive action
- Reject / decline action
- Pending / in-progress action
- Retry / recovery action
- Ghost utility action
- Icon utility button
- Toggle / state switch button
- Blocked / unavailable button
- Split-priority decision row

## Semantic Status and Action Logic

- **Primary** is reserved for the main progression step in a workflow.
- **Secondary** supports adjacent tasks without competing with the primary path.
- **Success / publish** signals confident forward movement such as approval or release.
- **Warning** draws attention to cautionary or review-based operations.
- **Danger / reject** makes destructive or negative outcomes feel intentionally serious.
- **Blocked** communicates unavailability with copy, pattern, and disabled behavior rather than color alone.
- **Pending / retry** shows recovery and async workflows common in production interfaces.
- **Toggle and icon controls** demonstrate smaller system controls that still keep strong contrast and focus states.

## Accessibility Decisions

- Uses native `button` elements throughout.
- Provides strong visible `:focus-visible` treatment.
- Keeps labels readable across semantic variants and state changes.
- Uses `aria-pressed` for toggles and segmented preview controls.
- Uses `role="status"` and `aria-live="polite"` for realistic state updates.
- Avoids color-only communication by pairing labels, hierarchy, surface treatment, and helper text.
- Supports reduced motion via `prefers-reduced-motion`.

## Interaction Behavior

- Hover and active states are restrained and utility-driven.
- The preview filter switches between safe, critical, and full system views.
- The loading button simulates a believable verification cycle.
- The maintenance toggle updates state copy to demonstrate a real product control.
- The pin icon demonstrates compact utility state without relying on hover alone.

## Responsive Behavior

- The layout collapses from a two-column control console into a single-column stack on smaller screens.
- Button groups wrap naturally at tablet widths and stack fully on mobile.
- Icon controls expand to full width on narrow screens to preserve tap usability.
- Semantic grouping and action hierarchy remain readable even in compact layouts.

## Customization Guidance

- Update the scoped CSS custom properties in `style.css` to adapt brand colors, spacing, radius, and elevation.
- Replace the product scenario copy in `index.html` with domain-specific language for your own dashboards or settings flows.
- Add or remove cards while keeping the `ssc-` scoped naming pattern.
- Reuse the live status rail and decision-row pattern for moderation, billing, or security actions where paired outcomes matter.
