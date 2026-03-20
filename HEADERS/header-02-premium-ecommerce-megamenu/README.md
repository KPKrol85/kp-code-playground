# Premium E-commerce Megamenu Header

A standalone premium commerce header package for the KP_Code Digital Vault. The component is built as a reusable three-layer navigation system for a high-consideration interiors and luxury home retail brand. It prioritizes trust messaging, dense-yet-readable commerce controls, structured discovery, and polished overlay behaviors without relying on any framework or external dependency.

## Files

- `index.html` — semantic three-layer header markup, accessible controls, premium demo content, mega menu structure, search panel states, mini-cart states, and a compact mobile navigation pattern.
- `style.css` — standalone design tokens, premium e-commerce styling, layered header layout, sticky compact behavior, mega menu surfaces, responsive adaptations, focus-visible states, and reduced-motion handling.
- `script.js` — modular interaction logic for search suggestions, recent-search empty state, keyboard navigation, hover-intent mega menu behavior, cart quick-view states, badge polish, mobile navigation, and sticky scroll progress updates.

## Component concept

The package models a conversion-aware retail header for Atelier Maison, a premium interiors brand. The experience is intentionally structured rather than flashy:

- a slim top utility bar reinforces trust, support, language/currency context, and service messaging
- a larger main commerce row keeps the logo, search, account, wishlist, and cart visible
- a dedicated category row supports intentional exploration through a serious mega menu surface

The resulting header is suitable for future productization as a reusable commerce navigation asset instead of a one-off mockup.

## Three-layer architecture

### 1. Top utility bar

The top layer contains service reassurance, language/currency context, concierge contact information, and order tracking. It is designed to communicate reliability and premium service expectations quickly.

### 2. Main commerce layer

The central layer contains the highest-priority shopping controls:

- premium brand lockup
- large central search field
- account entry
- wishlist action with count badge
- cart action with quick-view panel and item count

This layer remains visible in compact sticky mode after scroll.

### 3. Category exploration layer

The bottom layer contains high-level retail departments and a primary mega menu trigger. It is visually separated from the main bar so shoppers can understand navigation hierarchy at a glance.

## Mega menu logic

The Living Room trigger demonstrates the reusable mega menu pattern.

It includes:

- grouped multi-column links for seating, tables/storage, and décor accents
- a featured content strip with collection-style editorial cards
- a dedicated promotional campaign block with supporting products and prices
- hover-intent opening on desktop
- click opening for reliability
- Escape support and outside-click dismissal
- keyboard-friendly trigger semantics using `aria-expanded` and `aria-controls`

The goal is to feel like a genuine premium commerce navigation surface, not a basic dropdown.

## Search behavior

The search experience uses progressive enhancement and mocked data.

### Empty/focus state

When the user focuses the search field before typing, the panel reveals:

- recent searches
- recently viewed products

### Suggestion state

After the user types at least two characters, the component switches to product suggestions with:

- believable premium product names
- categories and finish/material descriptors
- keyboard navigation with Arrow Up / Arrow Down
- Enter to choose an active suggestion
- Escape or outside click to dismiss

## Mini-cart behavior

The cart quick-view demonstrates both polished states expected from a reusable commerce header package:

- a populated mini-cart with premium items, prices, and fulfillment notes
- a switchable empty cart state for presentation and testing
- subtotal messaging and checkout CTA
- outside click and Escape dismissal
- subtle badge emphasis when the panel is opened

## Accessibility decisions

- Includes a skip link for keyboard users.
- Uses semantic HTML and native interactive elements such as `<button>`, `<nav>`, `<form>`, and `<details>`.
- Applies visible custom `:focus-visible` treatment across header controls.
- Uses `aria-expanded`, `aria-controls`, `aria-autocomplete`, and listbox/option roles where appropriate.
- Supports Escape to close active overlays.
- Supports keyboard navigation within search suggestions.
- Preserves understandable baseline structure even if JavaScript is unavailable.
- Respects `prefers-reduced-motion: reduce`.

## Responsive strategy

The component is responsive across desktop, tablet, and mobile.

- Desktop shows the full three-layer system with hover-intent mega menu behavior.
- Tablet compresses spacing while preserving search, account, wishlist, and cart access.
- Mobile replaces the category row with an explicit navigation toggle and stacked disclosure-based navigation.
- Search and mini-cart panels move into fixed overlay surfaces on smaller viewports so they remain usable rather than becoming cramped dropdowns.

## Sticky behavior

The header includes premium sticky-scroll logic:

- At the top of the page, all three header layers are visible.
- After scrolling, the top utility bar and category row collapse away.
- The main commerce layer remains visible in a compact sticky state.
- A discreet scroll-progress indicator sits at the top edge without competing with shopping controls.

## Customization guidance

To adapt this package for another commerce brand:

- replace the Atelier Maison brand copy and service messaging in `index.html`
- swap demo categories and featured cards to match a different retail vertical
- update pricing, product names, and promotional copy for the target catalog
- retune color, radius, and shadow tokens near the top of `style.css`
- extend the `searchDataset` array in `script.js` to model different suggestion types
- wire the cart and search flows into production APIs if turning the component into an app-integrated header
