# tabs-01 - Advanced Tabs Component

A reusable, mobile-first advanced tabs component built with semantic HTML, BEM CSS, and vanilla JavaScript.

## Files

- `tabs.html` - Component markup with accessible ARIA tabs structure.
- `tabs.css` - Mobile-first styling with responsive enhancements and active indicator polish.
- `tabs.js` - Tab interactions, keyboard navigation, ARIA updates, and indicator movement.

## Features

- Strict BEM naming (`tabs__...`).
- Accessible tabs pattern using:
  - `role="tablist"`
  - `role="tab"`
  - `role="tabpanel"`
  - `aria-selected`
  - `aria-controls`
  - `aria-labelledby`
- Keyboard support:
  - `ArrowLeft`
  - `ArrowRight`
  - `Home`
  - `End`
- Horizontal scrollable tabs on small screens.
- Animated active tab indicator.
- Clean, production-ready, copy-friendly structure.

## Usage

1. Copy all four files into your project.
2. Include `tabs.css` in your page.
3. Include `tabs.js` before closing `</body>`.
4. Reuse the same structure for additional tab instances (IDs must remain unique per instance).
