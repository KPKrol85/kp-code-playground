# Search-Centric Docs Wiki Header

A premium standalone documentation header package for KP_Code Digital Vault designed for technical docs, design systems, internal wikis, developer portals, and changelog-heavy product surfaces where search should outrank traditional navigation.

## Component Concept

This package frames the header as a documentation tool rather than a marketing navbar. The brand block and version controls stay compact, the dominant central interaction is a command-palette-style search surface, and secondary links remain intentionally minimal so the fastest path is always retrieval.

## Search-First Architecture

- The central search control is the highest-contrast and largest interactive surface in the header.
- Search opens a command-palette-style overlay with quick actions, recent items, and believable mocked documentation results.
- Secondary utilities such as GitHub, Changelog, and Community remain visually restrained.
- Progressive enhancement keeps the baseline shell understandable even before JavaScript-driven overlay behavior runs.

## Keyboard Shortcut Behavior

- `Ctrl + K` (or `Cmd + K` on macOS) opens the search overlay.
- `/` opens search when focus is not already inside an input or textarea.
- `Escape` closes the search overlay and the version menu.
- `Arrow Up` and `Arrow Down` move through mocked results.
- `Enter` activates the currently highlighted result when the search input is focused.
- Focus is returned to the previously active control when the overlay closes.

## Version Switcher Logic

- The header includes a realistic version badge (`v2.4.1`) and a release-channel switcher.
- Choosing another version updates the trigger label and badge.
- The menu uses `aria-expanded`, `aria-haspopup`, and listbox-style option semantics for clearer assistive interpretation.
- A transient status message confirms version changes without disrupting the reading flow.

## Reading Progress Logic

- A thin progress bar is integrated into the bottom edge of the sticky header.
- JavaScript calculates progress from `window.scrollY` against total scrollable page height.
- The indicator stays visually discreet so it supports reading instead of competing with the search interaction.

## Accessibility Decisions

- Includes a keyboard-accessible skip link.
- Uses semantic landmarks: `header`, `nav`, `main`, `section`, `article`, `aside`, and a proper search `form` with `role="search"`.
- Uses native interactive elements for search, version switching, theme toggling, and utility actions.
- Applies strong custom `:focus-visible` styling tuned for dense technical interfaces.
- Uses a modal dialog pattern for the search overlay with immediate focus placement and Escape-to-close support.
- Provides `aria-live` status feedback for copy actions, version changes, and theme changes.
- Respects `prefers-reduced-motion: reduce` to minimize non-essential transitions.

## Responsive Strategy

- Desktop uses a three-zone header layout: brand/version, search, and utilities.
- Tablet collapses the header into stacked rows while preserving the dominant search control.
- Mobile keeps the search trigger prominent and reflows shortcut badges and utility controls into compact rows.
- The article layout also collapses its sticky table of contents into a single-column reading flow on narrower screens.

## Customization Guidance

- Update the CSS custom properties near the top of `style.css` to align colors, radii, shadows, and spacing with a product brand.
- Replace the mocked search results in `index.html` with product-specific doc labels, APIs, runbooks, or changelog entries.
- Extend `script.js` with live filtering or backend search integration later without changing the structural semantics.
- Swap utility links and version channels to match your own documentation lifecycle.
- Reuse the status toast pattern for actions like “Copied code sample”, “Link copied”, or “Switched to beta docs”.
