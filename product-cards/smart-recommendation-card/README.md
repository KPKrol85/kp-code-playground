# Smart Recommendation Card

Smart Recommendation Card is a premium, standalone product-discovery component for **KP_Code Digital Vault**. It guides users toward a relevant product based on their current goal, helping reduce catalog decision fatigue in onboarding and recommendation contexts.

## Included files

- `index.html` – standalone preview page with compact and wide recommendation card variants.
- `style.css` – scoped component styling, design tokens, responsive layouts, and interaction states.
- `script.js` – progressive enhancement for independent per-card goal selection and recommendation updates.
- `README.md` – implementation notes, use cases, and customization guidance.

## Recommended use cases

- Onboarding recommendation section
- Catalog guidance card
- “Not sure what to choose?” section
- Homepage product advisor block
- Product discovery helper in content hubs

## Component highlights

Each card includes:

- Goal selector chips (native buttons)
- Active goal label
- Recommended product name
- Product metadata (type/status)
- Short rationale block
- Exactly 3 reasons why the recommendation fits
- Primary action: **Use this product**
- Secondary action: **See alternatives**
- Polite live status update for screen readers

The package contains two visual/layout variants built from one shared system:

- Compact vertical recommendation card
- Wider advisory recommendation card for onboarding/homepage placement

## Customization options

You can safely customize:

- Goal chips (labels and count)
- Recommendation data mapping in `script.js`
- Product name
- Product metadata
- Rationale text
- 3 reasons per goal
- Primary CTA label and destination
- Alternatives link destination
- Compact and wide layout presentation details

## Accessibility and UX behavior

- Semantic structure with `section`, `article`, `header`, `ul`, and `li`
- Keyboard-accessible goal chips using native `button`
- Selected chip state with `aria-pressed`
- `aria-live="polite"` feedback for recommendation updates
- Clear focus states via `:focus-visible` and card-level `:focus-within`
- Selected state is not indicated by color alone
- Default recommendation content is present in HTML for no-JS support

## Responsive, theme, and motion support

- Mobile-first layout with wrapping goal chips and clear tap targets
- Two-column demo layout on medium screens when space allows
- Wide advisory card split layout on larger screens
- Light theme default with dark mode via `prefers-color-scheme`
- Reduced motion handling via `prefers-reduced-motion`
- Stable content updates without layout jumps or fixed-height clipping

## Progressive enhancement and production note

This component uses simple local recommendation mapping in vanilla JavaScript to simulate guided choice behavior in the UI. In production, real personalization logic, analytics, product availability, and account-aware recommendation engines must be connected to backend/platform services.
