# KP_Code Algorithms Academy

KP_Code Algorithms Academy is a static educational platform product for the KP_Code Digital Academy / Digital Vault ecosystem. The first version focuses on a polished dashboard and one complete lesson: **Binary Search / Wyszukiwanie binarne**.

## Structure

```text
index.html
lessons/binary-search.html
assets/css/main.css
assets/js/main.js
plan.md
README.md
```

## Architecture notes

- HTML, CSS, and vanilla JavaScript only.
- No frameworks, no external UI libraries, and no build step.
- `assets/css/main.css` contains design tokens, base styles, reusable components, responsive layout, and lesson-specific patterns.
- `assets/js/main.js` provides progressive enhancements: mobile navigation, theme toggle, and active table-of-contents highlighting.
- New lessons should be added as standalone files in `lessons/` and linked from the dashboard and roadmap.

## Accessibility and responsiveness

The interface uses semantic landmarks, accessible buttons, visible focus states, skip links, responsive layouts, `prefers-color-scheme`, and `prefers-reduced-motion`. CSS is mobile-first with breakpoints around 480px, 760px, and 1024px.

## Local usage

Open `index.html` directly in a browser, or serve the folder with any simple static server.
