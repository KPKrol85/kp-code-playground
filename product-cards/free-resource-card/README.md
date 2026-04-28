# Free Resource Card

## Role in KP_Code Digital Vault
The **Free Resource Card** is a lightweight product-card component for presenting no-cost digital resources in the KP_Code Digital Vault. It is designed for lead magnets and starter assets where trust, clarity, and quick value communication matter most.

## Included files
- `index.html` – standalone preview page with four resource card demos
- `style.css` – scoped styling, local design tokens, responsive behavior, dark mode, and reduced-motion support
- `script.js` – progressive enhancement for selected/download-ready state and live status updates
- `README.md` – usage and customization guidance

## Recommended use cases
- Free checklist
- Mini template
- Starter guide
- Lead magnet
- Entry product
- Trust-building catalog item

## Component content model
Each card includes:
- Badge text (default: **Free resource**)
- Resource title
- Benefit-focused description
- Format label (e.g., Checklist, Template, PDF, HTML + MD)
- Setup/read/audit time
- Primary CTA (default label: **Download free**)
- Trust microcopy (e.g., No account required, Starter-friendly, Instant access)
- Small check/progress visual cue (decorative, CSS-based)

## Customization options
You can customize:
- Badge text (`.free-resource__badge`)
- Resource title (`.free-resource__title`)
- Benefit description (`.free-resource__description`)
- Format label and time metadata (`.free-resource__meta-item`)
- CTA label (`.free-resource__cta`)
- Trust microcopy (`.free-resource__microcopy`)
- Icon/check visual style (`.free-resource__icon`)
- Local tokens in `:root` for color, spacing, typography, radius, shadows, and transitions

## Accessibility and UX notes
- Semantic structure uses `section` and `article` with clear heading levels.
- CTA is a native button with visible `:focus-visible` treatment.
- Decorative icon is marked `aria-hidden="true"`.
- Live status uses a single `aria-live="polite"` region for progressive enhancement.
- State changes are communicated with text and structure, not color only.

## Responsive and theming behavior
- Mobile-first single-column layout on small screens
- Two-column grid on medium screens
- Four-column grid on large screens
- Dark mode support via `prefers-color-scheme: dark`
- Reduced motion support via `prefers-reduced-motion: reduce`

## Progressive enhancement behavior
Without JavaScript, cards remain fully readable and actionable as static free-resource cards.

With JavaScript enabled, clicking **Download free**:
- marks the selected card as download-ready
- temporarily changes the clicked CTA label to **Ready to download**
- updates the polite live region with the selected resource name

No backend behavior or real download flow is simulated.
