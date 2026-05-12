# Header Calm Wellness

A premium, soft, mobile-first header component for wellness brands and calm digital products in the KP_Code Digital Vault series.

## Intended use cases
- Wellness studios and yoga/spa websites
- Meditation, sleep, and mindful habit apps
- Nutrition coaching and calm lifestyle brands
- Premium wellbeing-focused landing pages

## File list
- `index.html` — standalone demo with header, mobile calm panel, and contextual content
- `style.css` — design tokens, component styles, responsive layout, themes, and motion handling
- `script.js` — mobile menu logic, theme persistence, accessibility state management, and scroll behavior
- `README.md` — implementation and integration notes

## Key features
- Organic LumaCare brand mark with professional wellness identity
- Desktop navigation with active state (`aria-current="page"`) that uses shape + marker, not color alone
- Calm Day/Night theme switch with localStorage persistence (`header-calm-wellness-theme`)
- Soft sticky header with refined scrolled state
- Mobile slow-morph hamburger control (rounded lines, gentle transition)
- Rounded mobile wellness panel with note, navigation, routine card, CTA, and footer copy
- Optional subtle overlay + outside-click + Escape close interactions
- Fully standalone: no dependencies, no build step

## Accessibility notes
- Includes a visible skip link for keyboard users
- Uses semantic `header`, `nav`, `main`, and descriptive labels
- Mobile menu button uses `aria-controls` and `aria-expanded`
- Hidden mobile panel content is removed from tab order while closed
- Escape key closes panel and restores focus to menu trigger
- Focus-visible styles are high-clarity in both themes
- Reduced motion is respected with `prefers-reduced-motion`

## Customization notes
- Edit theme tokens in `:root` and `html[data-theme="dark"]`
- Adjust responsive behavior at `56.25rem` breakpoint
- Update nav labels, CTA copy, and panel note directly in `index.html`
- Tune motion pacing in menu line transitions and panel open animation

## Digital Vault integration notes
- Component is package-scoped and ready for drop-in use in the `digital-vault-components/headers/` library
- Naming follows reusable BEM-style structure for maintainability
- JS is wrapped in an IIFE to avoid global namespace pollution
- Can be duplicated as a template for future calm/premium header variants while preserving distinct visual language
