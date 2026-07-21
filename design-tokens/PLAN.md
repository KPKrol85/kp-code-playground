# CSS Design Token Systems Plan

## Project status

This is an educational, standalone CSS token-library and browser catalogue. It contains 200 selectable visual systems intended as starting points for frontend interfaces, rather than a published package or a shared design-system foundation. The verified implementation is limited to CSS custom-property files, a browser catalogue, and a Node.js generator. It has no package manifest, automated test suite, schema validation, platform exports, or documented accessibility verification. The generator currently does not reproduce the tracked `index.html` exactly, so the source-to-output relationship needs reconciliation before it can be treated as a reliable release workflow.

## Current verified scope

- [x] A Node.js source file, `scripts/build-tokens.js`, defines 200 named systems and writes one `tokens/tokens-xx.css` file for each system.
- [x] Each generated token file declares 55 `--dt-*` CSS custom properties and includes demonstration styles using BEM-style `dt-` classes.
- [x] The CSS token categories include color roles, font families, type sizes, line heights, letter spacing, spacing, radius, shadows, container widths, and transition values.
- [x] Generated token files use the same `--dt-*` namespace and their local references resolve within each file.
- [x] `assets/vault-data.js` provides browser-consumable catalogue data and CSS strings for the copy action.
- [x] `index.html`, `assets/vault.css`, and `assets/vault.js` provide filtering, sorting, CSS copying, component previews, and a light/dark preference for the catalogue interface.
- [x] `guide.html` documents selection, copying, importing, and the preview classes for users of the catalogue.
- [ ] Primitive, semantic, and component token layers are not separately represented in the generated token files; color properties mix foundation and role-like names.
- [ ] The light/dark toggle applies to the catalogue interface only; no per-token-system theme override architecture is verified.
- [ ] No JSON, JavaScript module, native-platform, package-publishing, or external design-tool export is present.
- [ ] No automated tests, token schema, or documented validation command is present.
- [ ] WCAG conformance, contrast results, reduced-motion alternatives, and assistive-technology behaviour have not been verified.

## Design-token principles

- [x] Keep `scripts/build-tokens.js` as the authoritative definition for generated token systems until the architecture is deliberately changed.
- [x] Treat `tokens/`, `assets/vault-data.js`, and generated portions of `README.md` as generated outputs; do not edit them manually when regenerating from the current workflow.
- [ ] Define a documented separation between primitive values, semantic roles, and component-level aliases; do not place component-specific values in the primitive layer.
- [ ] Use consistent, predictable names with category, property, variant, and state segments; avoid unexplained duplicates and ambiguous abbreviations.
- [ ] Keep token changes traceable and reviewable, and evaluate backward compatibility before renaming or removing public `--dt-*` properties.
- [ ] Use accessible interaction defaults, predictable theme overrides, and explicit fallback behaviour where token references can be absent.

## Roadmap phases

### Phase 1 — Required: source and token architecture

- [ ] Reconcile `index.html` with the generator so a clean generation produces every committed generated output without unexpected differences.
- [ ] Document the complete source-to-output map, including the purpose of the catalogue metadata, CSS files, embedded copy payloads, and preview styles.
- [ ] Separate primitive palette values, semantic UI roles, and optional component aliases; define inheritance and fallback rules.
- [ ] Audit the 200 systems for duplicated, overlapping, conflicting, or undocumented values, removing magic values only where the intended visual output is preserved.
- [ ] Decide whether preview BEM classes remain bundled with consumable token files or move to clearly separate demonstration assets.

### Phase 2 — Required: naming, color, and themes

- [ ] Publish naming rules for categories, properties, variants, states, and any replacement or deprecated names; prevent namespace collisions.
- [ ] Review color palettes and semantic foreground/background, border, action, success, warning, error, information, disabled, hover, active, selected, and focus roles.
- [ ] Establish and document a per-system theme strategy. If light/dark themes are supported, map semantic roles rather than duplicating complete token sets and test missing-token fallbacks.
- [ ] Identify text/control pairings that require contrast verification; do not claim WCAG compliance until measurements and review criteria are recorded.

### Phase 3 — Recommended: scale quality and accessibility

- [ ] Review font-family fallbacks, size, weight, line-height, and letter-spacing relationships; remove unused or duplicated typography values where safe.
- [ ] Review spacing, container, and layout scales; add reusable sizing, grid, gap, breakpoint, or touch-target tokens only when they have a real use case.
- [ ] Review border widths/styles, radius intent, shadows, and elevation roles. Ensure boundaries do not rely on shadows alone without an accessible alternative.
- [ ] Review motion durations and easing, distinguish functional from decorative transitions, and define reduced-motion alternatives without using long motion for essential feedback.
- [ ] Verify visible focus treatment and state differentiation that does not rely solely on color; record all remaining unverified combinations.

### Phase 4 — Required: build validation and testing

- [ ] Add a deterministic generation check that fails when committed generated files differ from a clean build.
- [ ] Add schema validation for required fields, duplicate system IDs/files/names, invalid values or units, undefined aliases, and circular references where aliases are introduced.
- [ ] Add automated checks for token-file completeness, generated CSS references, catalogue-data completeness, and theme mappings when themes exist.
- [ ] Add regression tests for corrected token defects and verify the documented build and validation commands in a clean environment.
- [ ] Document which generated files must be committed and which build artefacts should be ignored.

### Phase 5 — Recommended: documentation and governance

- [ ] Update user-facing documentation to explain the hierarchy, naming rules, source versus generated files, consumption examples, theme use, and contribution workflow.
- [ ] Keep implementation status in project documentation, future work in `PLAN.md`, and completed changes in `CHANGELOG.md`.
- [ ] Define how contributors propose, reuse, alias, add, deprecate, and remove tokens, including review rules and migration guidance for breaking public-token changes.
- [ ] Keep the library understandable by adding categories only when they are supported by a concrete use case.

## Release readiness

Before a release or distribution decision, complete these required checks:

- [ ] A clean build reproduces all committed generated outputs, including `index.html`.
- [ ] All public token references resolve and any supported theme contains complete mappings.
- [ ] Validation and regression-test commands pass in a clean environment.
- [ ] No unexpected generated-file differences remain.
- [ ] Documentation accurately describes the source workflow, supported outputs, and intended consumption method.
- [ ] Breaking changes, removals, and deprecations are documented with supported migration guidance.
- [ ] Accessibility-related token combinations and motion behaviour have been reviewed and any unverified cases are clearly labelled.

## Optional future development

The following ideas are not current commitments:

- [ ] Add additional theme modes, such as high-contrast mappings, after a semantic theme architecture and validation exist.
- [ ] Add JSON, JavaScript module, or platform-specific exports after the source model supports them.
- [ ] Evaluate Style Dictionary, Figma integration, package publishing, automated visual documentation, or a token playground only when they serve a defined consumer workflow.
- [ ] Consider component-library integration, migration utilities, and automated accessibility reporting after the core validation and governance work is complete.

## Definition of done

- [ ] The token architecture, source-to-output relationship, and naming rules are documented and consistently implemented.
- [ ] Generated outputs are deterministic, all token references resolve, and required themes have complete mappings.
- [ ] Build, validation, and regression-test commands pass in a clean environment.
- [ ] Accessibility-related color, focus, state, and motion decisions are reviewed and documented without unsupported compliance claims.
- [ ] Documentation matches the repository, and public breaking changes, deprecations, and migrations are recorded where applicable.
- [ ] The project is ready for its documented consumption method.
