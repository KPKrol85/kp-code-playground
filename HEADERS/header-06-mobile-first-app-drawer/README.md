# Header 06 — Mobile-First App Drawer

A standalone premium mobile-first header package for KP_Code Digital Vault. The component pairs an ultra-compact translucent trigger header with a tactile side drawer that behaves more like a native app surface than a traditional website navigation bar.

## Files

- `index.html` — semantic mobile-first header shell, accessible drawer structure, overlay, and realistic demo content for a premium community/product platform.
- `style.css` — component-scoped visual system, translucent compact header styling, drawer depth treatment, active navigation pills, responsive layout rules, and reduced-motion support.
- `script.js` — modular drawer open/close logic, body scroll locking, focus trap behavior, Escape and overlay dismissal, focus restoration, light theme preview toggle, and optional guarded haptic/swipe enhancements.

## Component concept

The package is intentionally split into two coordinated surfaces:

1. **Trigger header** — compact, thumb-friendly, sticky, and visually quiet.
2. **Navigation drawer** — the primary information and interaction container with profile context, large icon-led navigation, and footer utilities.

This makes the component a strong fit for app-like member areas, communities, digital vaults, creator platforms, or lightweight SaaS shells where navigation should stay accessible without crowding the top bar.

## Architecture

### Trigger header

- Includes a skip link for keyboard users.
- Keeps the brand area visible while preserving a compact app-like height.
- Uses a native button for the hamburger trigger.
- Includes an optional secondary utility action for search-like behavior.
- Applies blur and translucency without sacrificing contrast.

### Drawer panel

- Uses a dialog-style `aside` with clear labeling.
- Starts with a profile/welcome block for quick orientation.
- Uses large touch-friendly navigation rows with icon containers and descriptive subtitles.
- Includes a footer area for theme preview, utility links, and sign-out.
- Adds a backdrop overlay so the drawer feels modal and contained.

## Motion and interaction behavior

- The hamburger icon morphs into a close state using controlled transforms.
- Drawer reveal uses a spring-like easing curve that settles quickly.
- Overlay opacity and panel transitions are reduced automatically when `prefers-reduced-motion: reduce` is active.
- A guarded `navigator.vibrate()` call is used for optional haptic feedback on supported devices.
- A lightweight swipe-to-close gesture is included only for active drawer sessions and can be removed without affecting the core logic.

## Accessibility decisions

- Uses semantic landmarks and native interactive elements.
- Applies `aria-expanded`, `aria-controls`, and clear accessible labels to the drawer trigger.
- Treats the drawer as a modal interaction surface with `role="dialog"`, `aria-modal="true"`, and `aria-hidden` state updates.
- Includes backdrop dismissal, Escape-key closing, keyboard focus trapping, and focus restoration back to the trigger after close.
- Temporarily makes the main content unavailable to assistive technology while the drawer is active by combining `inert` and `aria-hidden` on the main region.
- Keeps strong visible `:focus-visible` states against dark translucent surfaces.
- Provides an `aria-live` region for announcing open/close and theme-preview state changes.

## Focus trap and scroll lock logic

When the drawer opens:

- body scrolling is locked with a `drawer-open` class
- the main content is marked inert
- the first focusable element inside the drawer receives focus
- Tab and Shift+Tab are constrained within the drawer

When the drawer closes:

- scroll locking is removed
- inert/hidden state on the main region is cleared
- overlay interactivity is disabled again
- focus returns to the last active trigger element

## Responsive behavior

- Mobile is the default experience and primary design target.
- The header remains compact at all sizes.
- On tablet and desktop, the same drawer pattern is preserved with a more controlled width.
- Content panels expand into a more spacious two-column preview layout while retaining the same interaction language.

## Customization guidance

- Replace the demo brand, member name, and navigation labels in `index.html` with your product terminology.
- Adjust color variables at the top of `style.css` to shift the component toward a lighter or more branded palette.
- Remove the theme preview section if your product doesn’t need it; the drawer layout remains stable without it.
- Disable the swipe gesture by removing the touch listeners in `script.js` if your target environment does not benefit from it.
- Reassign the active navigation class `.app-drawer__nav-link--active` to reflect the current route in production.
