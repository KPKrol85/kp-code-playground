# Newsletter Footer (Premium CTA-First)

A reusable, standalone **Newsletter Footer** component for **KP_Code Digital Vault** landing pages and campaign pages. The newsletter signup panel is intentionally the dominant element so the footer acts as a high-conversion waitlist CTA while still keeping brand, navigation, and legal links clean and secondary.

## File structure

- `index.html` — standalone component preview with semantic footer markup.
- `style.css` — scoped premium visual system, layout, responsive behavior, and interaction states.
- `script.js` — isolated form validation, accessible feedback messaging, and current year injection.
- `README.md` — component documentation and customization guidance.

## When to use this component

Use this footer at the end of:

- Product launch landing pages
- Waitlist pages
- Lead magnet pages
- Campaign microsites
- Marketing pages that need list growth without heavy link density

It is best when the primary business goal is collecting emails for new digital products and release updates.

## Form validation behavior

- Submission is handled client-side with JavaScript and does **not** reload the page.
- Empty email submissions are blocked.
- Invalid email formats are blocked via a lightweight regex guard.
- Valid submissions show a success message and reset the form for the next entry.
- The script is intentionally minimal so a real API call can be added later in the submit handler.

## Accessibility behavior

- Uses semantic `<footer>`, `<section>`, `<form>`, `<label>`, and `<nav>` elements.
- Native email input and submit button provide keyboard and assistive-tech compatibility.
- Validation and success messaging are announced through a live region (`role="status"` + `aria-live="polite"`).
- Invalid input is marked with `aria-invalid="true"`.
- Clear `:focus-visible` styles are included for inputs, buttons, and links.
- Motion effects are reduced when users prefer reduced motion (`prefers-reduced-motion`).

## Responsive behavior

- **Mobile-first:** stacked CTA copy, form, and trust notes.
- **Tablet:** CTA copy and form card can sit side-by-side.
- **Desktop:** premium CTA panel remains dominant above a compact lower footer row.
- Layout uses flexible wrapping and spacing to avoid horizontal overflow.

## Customization points

You can safely customize:

- CTA headline and value copy in `index.html`
- Trust-note text (`No spam`, `Practical materials only`, `Unsubscribe anytime`)
- Brand label and copyright text
- Footer navigation and legal links
- Theme tokens in `:root` custom properties (`style.css`)
- Submit button label and email placeholder
- Submission handler in `script.js` for future backend integration (fetch/XHR)

## Backend integration notes

To integrate with a real newsletter service later:

1. Replace the success branch inside the submit listener with an async API call.
2. Keep the current feedback helper to show loading/success/error states.
3. Preserve `preventDefault()` to avoid page reload in embedded use-cases.
4. Add server-side validation and anti-abuse controls in the backend.
