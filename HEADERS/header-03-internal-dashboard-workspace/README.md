# Internal Dashboard Workspace Header

A premium standalone dashboard header package for internal products, admin panels, SaaS workspaces, and operations-heavy interfaces where users need orientation, speed, and dependable interaction patterns during long sessions.

## Component concept

This package focuses on a sticky workspace header rather than a public-facing marketing navbar. The experience is built to communicate context quickly through breadcrumbs, a compact command/search trigger, system health visibility, notifications, and a profile menu without overwhelming the screen.

## Workspace-oriented header architecture

The header is organized into three primary zones:

- **Left zone:** semantic breadcrumb navigation, current workspace context, and a copyable record ID token.
- **Center zone:** a compact command/search trigger with a visible keyboard shortcut hint that opens a lightweight command panel.
- **Right zone:** system status, theme control, notifications, and the user profile area.

A secondary metadata row adds workspace-specific operational details and a quick action. The component also supports a condensed mode that hides lower-priority metadata when the workspace has less usable room.

## Breadcrumb and command trigger logic

- Breadcrumbs use semantic `nav` and ordered-list structure with linked intermediate items and a non-linked current page item.
- The trailing record ID can be copied with a dedicated button and announces feedback through a polite live region.
- The command/search trigger opens with click or `Ctrl/Cmd + K`, focuses the search input, and filters a small set of mocked recent destinations client-side.

## Notification and profile behaviors

- The notifications button exposes a dropdown panel with realistic info, warning, success, and system event items.
- A “Mark all as read” action clears unread styling and updates the badge state.
- A small mocked notification can appear after focus returns to the page to demonstrate live operational updates.
- The profile area includes avatar initials, role labeling, and a menu with account, settings, theme, shortcuts, and separated sign-out actions.

## Accessibility decisions

- Includes a keyboard-accessible skip link.
- Uses native buttons for all interactive controls.
- Applies `aria-expanded`, `aria-controls`, menu labeling, breadcrumb labeling, and a polite live region for meaningful feedback.
- Supports keyboard shortcuts, Escape-to-close behavior, outside-click dismissal, and visible `:focus-visible` styling.
- Respects `prefers-reduced-motion: reduce` by removing transition and animation effects.

## Adaptive workspace behavior

The component simulates workspace-aware density management instead of relying only on basic viewport breakpoints. JavaScript toggles a condensed state when available workspace room becomes tighter, hiding lower-priority metadata and secondary text while preserving the most important controls.

## Responsive strategy

- Designed for laptop and desktop-first internal tooling layouts.
- Reflows header zones into a vertical stack on narrower widths.
- Reduces secondary text and metadata on compact tablet and small-screen layouts.
- Keeps popovers and the command panel readable with width constraints and stable positioning.

## Customization guidance

- Update the breadcrumb labels, record token, status copy, and menu items in `index.html` to match your product vocabulary.
- Adjust theme tokens, surface contrast, spacing, and panel sizes in `style.css` to align with another internal brand system.
- Replace mocked command results and notifications in `script.js` with your own frontend-only demo data or integrate the structure into a larger application shell.

## File structure

```text
header-03-internal-dashboard-workspace/
├── index.html
├── style.css
├── script.js
└── README.md
```
