# TODO — Next 20 Improvements (Prioritized)

1. Create a minimal source scaffold (`src/`, `public/`, `styles/`, `assets/`) to establish a clear working structure.
2. Add a package manifest (`package.json`) with explicit scripts for `dev`, `build`, and `preview`.
3. Introduce ESLint and Prettier with shared config files and a single style baseline.
4. Add an `.editorconfig` to enforce consistent line endings, indentation, and charset.
5. Create a basic semantic HTML app shell with `header`, `main`, `nav`, and `footer` landmarks.
6. Implement a base global stylesheet with reset/normalize strategy and typography defaults.
7. Define core design tokens (colors, spacing, typography, radius) in one centralized file.
8. Establish a component naming convention (e.g., BEM or utility-first + documented rules).
9. Add a responsive breakpoint strategy and document mobile-first layout rules.
10. Build one reusable UI component pattern (button, card, form field) as a style reference.
11. Add accessibility baseline rules: visible focus states, label/input pairing, and skip-link support.
12. Include an accessibility linting step (e.g., eslint-plugin-jsx-a11y equivalent for chosen stack).
13. Create a lightweight JS module entrypoint with clear separation of DOM, state, and API concerns.
14. Add centralized error handling utilities for user-facing messages and debug logging.
15. Add environment configuration (`.env.example`) for runtime variables and deployment clarity.
16. Set up basic unit testing (at least one test each for utility logic and DOM behavior).
17. Add a CI workflow to run format, lint, and tests on every pull request.
18. Replace or archive `audyt.md` by consolidating on one canonical audit document language and format.
19. Add a `README.md` in this folder describing setup, scripts, structure, and quality standards.
20. Define milestone-based delivery checkpoints (foundation, first UI slice, quality hardening) with acceptance criteria.
