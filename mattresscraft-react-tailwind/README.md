# MattressCraft React Tailwind

`mattresscraft-react-tailwind` is a standalone React + Vite + Tailwind CSS learning project for a fictional premium mattress manufacturer called SleepForge.

The site demonstrates a complete one-page business website with product sections, manufacturing messaging, reusable UI components, responsive layouts, accessible interactions, and a simple React-powered mattress finder.

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript
- No TypeScript
- No backend
- No routing
- No external UI libraries

## Install Dependencies

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview a production build:

```bash
npm run preview
```

## Main React Components

- `Header.jsx` - sticky navigation with accessible mobile menu state
- `Hero.jsx` - premium headline, CTA group, and product visual card
- `StatsBar.jsx` - business proof points
- `ProductCategories.jsx` - category cards generated with `.map()`
- `FeaturedProducts.jsx` - product grid using `ProductCard`
- `ManufacturingSection.jsx` - in-house production advantage
- `MattressFinder.jsx` - state-driven recommendation panel
- `Benefits.jsx` - reusable benefits grid
- `Testimonials.jsx` - customer proof cards
- `FAQ.jsx` - accessible accordion with `aria-expanded`
- `Footer.jsx` - navigation, product links, contact, and legal placeholders
- `Button.jsx` - reusable CTA component
- `SectionHeader.jsx` - reusable section heading pattern
- `ThemeToggle.jsx` - light/dark mode toggle with inline SVG sun and moon icons

Reusable content arrays live in `src/data/siteData.js`.

## Tailwind Setup

Tailwind is configured in `tailwind.config.js` with custom brand colors:

- warm cream backgrounds
- deep charcoal text
- muted green `forge` accents
- clay support colors
- premium soft shadows
- display and sans font stacks

Global Tailwind layers live in `src/index.css`, including:

- Tailwind directives
- `.section-shell` layout helper
- `.eyebrow` text helper
- smooth scroll
- reduced-motion handling

## Key Learning Points

- Component composition in `App.jsx`
- Passing props to reusable components
- Rendering repeated content with `.map()`
- Managing React state for mobile navigation
- Managing React state for FAQ accordion
- Managing React state and `localStorage` for light/dark theme preference
- Managing React state and derived recommendations in `MattressFinder`
- Building responsive layouts with Tailwind grid and flex utilities
- Creating reusable visual patterns without a UI library

## Accessibility Notes

The project includes:

- semantic HTML sections and headings
- one clear `h1`
- keyboard-friendly links and buttons
- visible focus rings
- accessible theme toggle with `aria-pressed`
- `aria-expanded` and `aria-controls` for the mobile menu
- `aria-expanded` and `aria-controls` for FAQ items
- `aria-pressed` for finder option buttons
- sufficient contrast-oriented color choices
- reduced-motion support

## Suggested Next Improvements

- Add form validation for a consultation request form
- Add product filtering by size and firmness
- Add image assets or generated product photography
- Add unit tests for recommendation logic
- Add a simple cart mockup without checkout logic
- Split larger visual sections into smaller internal components
