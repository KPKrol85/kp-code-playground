# header-05

A standalone **Creative Split / Showcase** header component designed for premium, expressive brand experiences (creative studios, luxury campaigns, and portfolio-led websites).

## Files

- `header.html` — semantic header markup with split desktop composition and mobile panel navigation.
- `header.css` — mobile-first BEM styling, theme variables, interactions, and 900px breakpoint behavior.
- `header.js` — component-scoped menu + theme interactions, accessibility state syncing, and responsive state reset.

## Included Features

- Asymmetrical split composition on desktop (left nav / central showcase / right nav + action cluster).
- Mobile-first layout with hamburger menu and dedicated mobile nav panel.
- Integrated light/dark theme toggle with persisted preference via `localStorage`.
- Refined hover/focus states with restrained motion.
- Reduced motion support using `prefers-reduced-motion`.
- Strict BEM class naming scoped to `header-05`.

## Accessibility Notes

- Uses semantic `<header>` and `<nav>` landmarks.
- Mobile menu trigger uses `aria-expanded` + `aria-controls`.
- Mobile panel is hidden using the `hidden` attribute when collapsed.
- Keyboard accessible controls (`button` for toggles; visible `:focus-visible` styles).
- Escape key closes the mobile menu.
- Click-outside behavior closes the menu on small screens.

## Responsive Behavior

- **Mobile-first default (<900px):**
  - Compact topbar with brand, theme toggle, and menu toggle.
  - Editorial-style showcase block visible below topbar.
  - Menu items and actions exposed in a collapsible mobile panel.
- **Desktop (>=900px):**
  - Mobile menu UI is hidden.
  - Split/asymmetrical row with left nav, central showcase, right nav, and actions.
  - JS resets mobile menu state when crossing into desktop view.

## Integration Guidance

1. Copy the `header-05` folder into your project.
2. Include `header.css` in your page.
3. Place `header.html` markup where the header should render.
4. Load `header.js` after the markup (or with `defer`) so it can initialize the component.

Example include order:

```html
<link rel="stylesheet" href="header.css" />
<!-- header.html content -->
<script src="header.js" defer></script>
```

## Customization Notes

- **Branding area:** edit `.header-05__brand-name`, `.header-05__brand-tag`, and mark initials.
- **Navigation structure:** swap links in desktop and mobile lists to match IA.
- **Showcase center block:** update campaign label/title/copy to highlight current feature.
- **Actions:** tailor `.header-05__action-link` buttons to your conversion goals.
- **Theme behavior:** adjust CSS token values for palette tuning; JS already persists user preference under `header-05-theme`.

