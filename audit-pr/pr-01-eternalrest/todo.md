# Prioritized TODO (Next 20 Improvements)

1. Add `package.json` with explicit scripts (`dev`, `build`, `preview`, `lint`, `format`, `test`).
2. Add a lockfile (`package-lock.json` or `pnpm-lock.yaml`) and commit it for reproducible installs.
3. Create a minimal app shell (`index.html` + `src/main.*`) to make the project runnable.
4. Define and create a canonical folder structure (`src/components`, `src/styles`, `src/assets`, `src/utils`).
5. Add a `README.md` documenting project purpose, setup, scripts, and architecture decisions.
6. Introduce ESLint with a baseline ruleset and fail-on-error in CI.
7. Introduce Prettier and align formatting rules with ESLint integration.
8. Add EditorConfig to enforce consistent indentation, line endings, and charset.
9. Add Stylelint (if CSS/Sass is used) with a simple, enforceable rule profile.
10. Create design tokens (color, spacing, radius, typography scale, z-index) in a single source file.
11. Establish semantic layout scaffolding (`header`, `nav`, `main`, `footer`) in the base template.
12. Add a responsive breakpoint strategy and document it in code comments or README.
13. Build a base stylesheet with reset/normalize, typography defaults, and focus-visible styles.
14. Add accessibility baseline checks (axe/Lighthouse) and define minimum acceptance criteria.
15. Set up a component pattern for repeatable UI blocks (naming, file structure, props/state contract).
16. Add lightweight unit tests for core utilities/interactions and enforce a test command in CI.
17. Add a smoke-level end-to-end test for initial render and primary navigation path.
18. Configure static asset handling (images/fonts/icons) with size-conscious defaults.
19. Add basic performance budgets (bundle size warning thresholds, image optimization expectations).
20. Create a release checklist (a11y, responsive checks, lint/test pass, metadata, and browser sanity checks).
