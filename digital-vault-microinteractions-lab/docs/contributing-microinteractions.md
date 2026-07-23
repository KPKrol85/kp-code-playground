# Contributing microinteractions

This lab is a static, dependency-free catalogue. The interaction records in `assets/js/main.js` are the source of truth for cards, filters, the selected preview, and the displayed snippets. Make changes in that file rather than adding a separate data source.

## Add or change a pattern

1. Add or update one object in `interactions`. Use a unique, lowercase, hyphen-separated `id` (for example, `card-lift`). The ID is used to create the snippet's `mi-<id>` class prefix, so do not reuse it.
2. Supply every required field: `id`, `name`, `category`, `complexity`, `motion`, `featured`, `description`, `bestFor`, `accessibility`, and `previewType`. `html`, `css`, and `js` are also required strings; startup normalization generates their current copy-ready values from the interaction's ID, name, and preview type. `js` may be `""` when the example needs no JavaScript.
3. Choose only values declared in `interactionTaxonomy` in `assets/js/main.js`. Do not add a value to a record without adding its labelled taxonomy entry and considering the corresponding filter option.
4. Choose a registered `previewType`. The `previewRenderers` map in the same file must contain a renderer for it. If a new preview type is needed, add its taxonomy label, renderer function, map entry, preview label, and snippet markup/CSS support together. Unknown types intentionally show a safe fallback, but are rejected by validation.
5. Keep the generated snippets standalone and educational: use semantic markup, scoped `mi-*` classes, no application-shell dependency, no external URL/CDN, no `<script>`, and no `eval`. The catalogue validation enforces the latter three restrictions.
6. Write a specific Polish `accessibility` note. Describe the relevant semantic control, keyboard or focus behavior, and non-color status information where applicable; avoid generic statements.
7. For `medium` or `expressive` motion, state the reduced-motion alternative in the note (for example, remove movement and preserve a static border, shadow, opacity, or text status). Generated CSS includes a `prefers-reduced-motion` override; verify that the pattern's meaning does not depend on the motion.

## Taxonomy guide

### Categories

Use the currently supported categories only: `feedback`, `navigation`, `forms`, `buttons`, `cards`, `loading`, `onboarding`, `dashboard`, `ecommerce`, and `empty-states`. Select the user's primary task, not a visual treatment: **Toast Feedback** belongs to `feedback`, **Tabs Indicator** to `navigation`, **Inline Form Error** to `forms`, and **Skeleton Profile Card** to `loading`. Some supported filters currently have no records (`onboarding`, `ecommerce`); they remain valid choices when a genuinely matching pattern is added.

### Complexity

- `basic`: a self-contained semantic element with no custom behavior or only a simple state, such as **Soft Glow Button** or **Lift Card**.
- `intermediate`: requires coordinated state, semantics, or feedback beyond the base element, such as **Magnetic CTA Button** or an expandable card.
- `advanced`: requires more careful interaction design or motion/state handling, such as **Ripple Feedback Button** or **Tilt Product Card**. This is not a measure of visual decoration.

### Motion

- `none`: no meaningful animated movement is needed; state remains clear statically.
- `subtle`: small, nonessential feedback such as a hover shadow or short transition; **Soft Glow Button** is the current model.
- `medium`: visible motion that needs an explicit reduced-motion alternative, such as **Magnetic CTA Button** or loading feedback.
- `expressive`: prominent or decorative motion that needs the same explicit alternative. It is a supported value even though the current catalogue has no expressive records.

## Verify and document the change

1. Run `node scripts/validate-catalogue.js`. It evaluates the actual `interactions` data and invokes the same validation function used at browser startup; it must report no warnings.
2. Open `index.html` with JavaScript enabled and manually verify the changed card, its selected preview, all three code tabs, and the copy action. For a new category, complexity, or motion value, also verify filtering. Follow the relevant rows in [`release-readiness-browser-qa.md`](release-readiness-browser-qa.md); do not mark them complete without real evidence. This is a contributor check instruction, not a verified local-preview or browser-support claim.
3. Update `README.md` if the user-visible scope or contributor/release workflow changed, `PLAN.md` only for fulfilled roadmap work, and `CHANGELOG.md` for meaningful implemented changes. Keep the release checklist and QA evidence synchronized when preparing a release.

## `main.js` maintainability decision

The current single-file structure is still reasonable for 32 static records: the data, normalization/validation, renderer map, DOM rendering, and small UI state are tightly coupled and have no imports or build step. Splitting it now would either duplicate the browser data path or add module/loading complexity without isolating a demonstrated maintenance problem.

Reconsider a small, static extraction when one of these concrete signals appears: catalogue data becomes difficult to review alongside UI code; preview renderers require independent changes frequently; validation needs to be consumed by more than this browser entry point and the Node check; or a second page needs the same catalogue data. Preserve the dependency-free architecture unless a deliberate product decision changes that boundary.
