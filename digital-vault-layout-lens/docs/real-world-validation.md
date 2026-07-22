# Phase 2 real-world validation record

## Scope and execution integrity

**Date:** 2026-07-22. **Environment:** Linux 6.12.13 x86_64, Node.js 20.20.2. This was a controlled, local validation run: all six samples below are newly created project fixtures, contain invented content, and have no external fetch, tracking, or proprietary source material. The production `analyzeHtmlSource` and `analyzeCssSource` paths were used. HTML used the repository's existing Node parser adapter because this environment has no native `DOMParser`; CSS used its normal parser.

`npm run test:analyzer` passed **47** tests, failed **0**, and skipped **1** native-`DOMParser` test. The representative samples are asserted in `tests/analyzerFixtures.test.mjs`, including exact expected check IDs, source/confidence/evidence contracts, stable IDs, and the correction regression. This is executed analyzer validation, not a browser claim.

## Sample inventory

| Sample | Purpose and realistic patterns | Expected result |
| --- | --- | --- |
| `landing-page.html` | Structured marketing landing page: header/footer navigation, landmarks, heading hierarchy, named CTA, informative image. | No findings. |
| `dashboard.html` | Dashboard layout: named navigation, sections, button, alert aside, chart image with empty alt and surrounding text. | One ambiguous image-review prompt. |
| `form-content.html` | Signup form: correct `for`/`id`, invalid standalone label, unnamed control, heading jump, useful/decorative images, clear button, weak-but-nonempty link. | Four deterministic structural findings; weak link wording remains manual-only. |
| `landing-page.css` | Responsive landing styles: custom properties, flex, auto-fit grid, fluid image, media query. | No findings. |
| `dashboard.css` | Dashboard grid, fixed toast with responsive override, and intentionally non-wrapping scroll container. | Fixed-width review prompts; no nowrap-without-strategy finding after correction. |
| `risk-patterns.css` | Desktop-constrained shell, hidden overflow, rigid grid, nowrap text, fixed modal, repeated literals. | Static responsive and token-review prompts. |

## Expected versus actual analyzer results

`Correct` means the finding matched the fixture's declared condition; it does not mean that a human has confirmed a WCAG failure. Sources were **Automated HTML check** or **Automated CSS check** for every row.

| Sample | Expected / actual check IDs | Correct, FP, FN | Confidence and evidence review | Disposition |
| --- | --- | --- | --- | --- |
| Landing HTML | `[]` / `[]` | 0 / 0 / 0 | No evidence needed. The absence of simple static warnings is appropriate, not a compliance result. | Informational baseline. |
| Dashboard HTML | `images-suspicious-empty-alt` / same | 1 / 0 / 0 | **Medium** is appropriate: `<img class="chart" src="orders-chart.svg" alt="">` names a likely informative asset but nearby prose may convey the data. Evidence is useful and requires human review. | Automated review prompt. |
| Form HTML | `headings-skipped-level`, `labels-invalid-for`, `controls-unlabeled`, `links-placeholder-href` / same | 4 / 0 / 1 | **High** evidence is concise and actionable for the skipped `<h3>`, standalone `<label>`, and `<input id="promo">`; placeholder-link evidence is also clear. **FN:** “Learn more” has an accessible but weak context-free name; this analyzer intentionally does not judge wording/context. | Structural items automated; link-purpose quality manual-only. |
| Landing CSS | `[]` / `[]` | 0 / 0 / 0 | No static risk signal was present. | Informational baseline. |
| Dashboard CSS | `large-fixed-widths`, `positioned-fixed-width` / same | 2 / 0 / 0 after correction | Both have **Medium** confidence and declaration evidence such as `.toast { width: 420px; }`. Evidence does not show the responsive override, so it remains a review prompt rather than a confirmed defect. | Automated review prompts. |
| Risk CSS | `repeated-literal-values`, `large-fixed-widths`, `overflow-x-hidden`, `nowrap-without-overflow-strategy`, `rigid-grid-tracks`, `positioned-fixed-width` / same | 6 / 0 / 0 | **Low** repeated-literal evidence is correctly framed as a token opportunity. The other **Medium** findings cite the relevant declaration(s) and are useful starting points, but viewport outcome needs manual review. | Automated evidence; manual viewport confirmation. |

## False-positive, false-negative, confidence, and evidence review

### Confirmed false positive and correction

Before this run, a same-rule `overflow-x: auto` plus `white-space: nowrap` pattern was reported as **Nowrap text without overflow strategy**. The dashboard sample models an intentionally horizontally scrollable table region; its explicit overflow strategy contradicted that finding. This was a confirmed, narrow false positive.

The CSS condition now suppresses only that check when the **same CSS rule** contains `overflow`/`overflow-x: auto|scroll`, `overflow-wrap`, or `text-overflow`. It does not suppress other responsive findings, does not infer rendered success, and does not alter severity, stable IDs, manual scoring, persistence, or reporting. The dashboard regression test proves this narrow case while retaining the fixed-width findings.

### Known false negative retained as a boundary

The form fixture's `Learn more` link is detectable as nonempty but may be unclear out of context. Determining contextual link quality would require surrounding-content interpretation and is not made an automated conclusion here. It remains a manual audit concern; no speculative heuristic was added.

### Confidence and evidence conclusions

- High confidence remained reasonable for directly inspectable markup associations and heading sequence, while still not representing certainty or manual confirmation.
- Medium confidence remained reasonable for suspicious empty image alternatives and static layout-risk declarations.
- Low confidence remained appropriate for repeated literals, which may be deliberate, and is explicitly informational.
- Evidence was useful for each positive finding: it contained the affected element/declaration or count and a location where available. CSS evidence cannot show cascade, computed layout, or viewport behavior; dashboard toast evidence exposed that limitation and supports keeping it a manual review prompt.

## Prioritized corrections based on this run

| Priority | Observed problem and evidence | Affected area | Narrow correction | Regression risk | Verification |
| --- | --- | --- | --- | --- | --- |
| Medium | Confirmed FP: same-rule scrollable nowrap content in `dashboard.css` was described as having no overflow strategy. | CSS analyzer `nowrap-without-overflow-strategy`. | Recognize same-rule `overflow`/`overflow-x: auto|scroll` as an explicit strategy. | Could hide a warning where scrolling is itself unsuitable; other static reflow checks remain. | Representative regression plus focused analyzer suite. |
| Low | Fixed-toast evidence does not expose a responsive override in the same stylesheet. | CSS evidence presentation. | No change now: a cascade-aware evidence redesign is not justified by one controlled sample. | Misleadingly broad evidence work. | Revisit only after browser viewport evidence or repeated reports. |
| Low | Weak nonempty link name was not found. | Manual audit / analyzer boundary. | No change: keep contextual naming manual-only. | A heuristic would create false positives and weaken deterministic scope. | Include in future consented sessions and browser review. |

## Boundary checks and remaining work

The executed fixture suite rechecked deterministic IDs and deterministic results across whitespace/comments; analyzer findings stayed separate from manual scores and manual-audit exports. No analyzer input/findings were added to browser-local saved projects. No remote service, live-page fetch, account, analytics, or AI-generated conclusion was added.

**Not run / blocked:** native browser `DOMParser` execution, rendered responsive review, preview, report download/print, IndexedDB workflows, and assistive technology checks require a launchable browser. Follow `docs/release-readiness-browser-qa.md`: serve with `python3 -m http.server 4173 --directory .`, run the native analyzer harness, then inspect the local samples at relevant widths. Consented usability sessions were not conducted; the ready-to-run plan is in `docs/consented-usability-session-plan.md`.
