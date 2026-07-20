# Browser extension and live-page inspection feasibility

**Status:** planning only — no extension, manifest, content script, live-page capture, browser permission, backend, or remote inspection is implemented.

## Evidence and decision context

Layout Lens currently provides local static HTML/CSS analysis, isolated preview inspection, deterministic manual scoring, and local manual-audit reports. HTML and CSS findings have controlled sources, confidence, structured capped evidence, WCAG metadata where applicable, and stable issue IDs. The manual report adapter intentionally consumes manual audit state only; analyzer and preview state are excluded. Saved projects are local IndexedDB records and drafts are localStorage records; neither is a capture store.

These are validated code and Node-test capabilities, not proof that the analyzer is reliable on live web pages. In particular, HTML fixtures use an injected Node parser adapter. The real `DOMParser` test is skipped because this runtime lacks `DOMParser`; no Chrome/Chromium/Firefox/Playwright browser runtime or browser smoke test is available. Existing tests show deterministic contracts and CSS fixture coverage, but they do not establish measured false-positive/false-negative rates, representative-page performance, user demand beyond pasted snippets, or browser-runtime compatibility.

## Extension entry criteria

Extension implementation must not start until all of the following are evidenced and recorded:

| Criterion | Current status | Required evidence before implementation |
| --- | --- | --- |
| Static analyzer usefulness | Partially satisfied | User validation showing HTML/CSS findings and evidence lead to useful action, not only passing fixtures. |
| Deterministic findings and stable issue IDs | Satisfied for tested static fixtures | Repeated browser-runtime and real-page fixture runs with identical normalized snapshots producing stable IDs. |
| Reliable snippets and locations | Partially satisfied | Browser-derived evidence locations must be stable, redacted, capped, and reviewed against live DOM changes. |
| Useful report output | Partially satisfied | Validate a report path for normalized inspection findings without altering the manual-only report contract. |
| Acceptable false positives/negatives | Not yet tested | Documented labeled corpus, review process, thresholds, and results by rule. |
| Browser-runtime analyzer verification | Blocked | Execute HTML fixtures through a real browser `DOMParser` and complete browser smoke tests. |
| Value beyond pasted snippets | Not yet tested | Limited user research demonstrating that explicit current-page/region inspection solves a problem static paste does not. |

## Scope options and first candidate

| Approach | Benefits | Limits / recommendation |
| --- | --- | --- |
| Analyze active page | Lowest-friction entry for a user-requested audit | Broad and noisy; defer until snapshot rules are proven. |
| Analyze selected DOM element | Small data scope and clear evidence target | Selection UX and parent context need design; viable later. |
| Inspect a user-selected region/component | Limits data and supports focused review | **First candidate after the trust gate.** An explicit picker/region minimizes permission, performance, privacy, and evidence ambiguity. |
| Serialize DOM plus selected computed styles | Enables browser-specific layout signals | Must redact and bound data; serialized markup is not a faithful application-state capture. |
| Run deterministic checks in a content script | Keeps raw page data local | Must call only adapter/engine code; browser APIs never enter domain modules. |
| Send normalized evidence to Layout Lens workspace | Reuses finding presentation and future report integration | Only explicit local transfer; no automatic saved-project mutation. |
| Generate reports from normalized findings | Provides handoff value | Needs an intentionally designed report adapter; do not change the existing manual report adapter implicitly. |

## Proposed architecture

```
manifest + permission UI
  -> service worker (user-command routing only)
  -> content script / explicit region picker
  -> page-inspection adapter (redaction, bounds, snapshot normalization)
  -> normalized inspection snapshot
  -> deterministic analyzer engines and browser-specific adapters
  -> finding/evidence normalization + current issue-ID model
  -> local workspace UI -> future inspection-report adapter -> local output
```

* **Reuse directly:** `htmlAnalyzer.js`, `cssAnalyzer.js` where normalized static source is appropriate; `issueIds.js`; `findingMetadata.js`; WCAG metadata; rule data; deterministic scoring engine; report renderers/templates once a separate, validated inspection-report adapter exists; and local storage primitives for explicit user saves only.
* **Add adapters, not browser coupling:** a snapshot schema, DOM/selected-style collector, sensitive-data redactor, stable node-location builder, and browser finding normalizer belong at the page-inspection boundary. Browser-specific observations (computed styles, geometry, viewport) need dedicated deterministic adapters rather than being forced into the static CSS parser.
* **Keep isolated:** manifest, permissions, service worker lifecycle, content-script messaging, picker UI, extension storage, and browser API calls. They must not enter scoring, rules, analyzer engines, issue ID generation, evidence-domain validation, report-domain modules, or saved-project schemas.
* Findings should retain the current required source/confidence/evidence/issue-ID shape. A future controlled source such as `live-page-inspector` may be introduced only with a verified implementation and validation/test updates; it is deliberately **not** added to production validation now.

## Platform, permission, and privacy boundaries

Start with Chromium Manifest V3 and review Firefox WebExtensions compatibility before any multi-browser claim. Use an explicit toolbar/menu command with `activeTab`, plus narrowly requested optional host permissions only when a user chooses a persistent site-specific workflow. **Do not request broad default access to all websites (`<all_urls>`) when `activeTab` or optional host permissions are sufficient.**

The design must account for MV3 service-worker suspension, content-script isolated worlds, extension CSP (no remote executable code), Firefox lifecycle/API differences, extension-local storage quotas, private/incognito opt-in behavior, restricted browser pages, inaccessible cross-origin frames, open versus closed shadow DOM, and dynamically rendered DOM. Cross-origin frames and closed roots remain unavailable/explicitly reported, not bypassed. Re-snapshot after an explicit user action rather than silently observing dynamic changes.

Inspection is explicit and local by default: no hidden background scanning, browsing-history collection, automatic page upload, remote calls, remote execution, API keys, backend dependency, or automatic clipboard writes. Exclude password controls, payment fields, private form values, cookies, local/session storage, tokens, network traffic, downloaded resources, canvas contents, browser-internal pages, full application state, arbitrary script execution, cross-origin iframe contents, and closed shadow roots. Redact sensitive attributes/text and cap source/DOM evidence before any local transfer. Clipboard use, if ever offered, must be a separate user action with a visible preview.

Reports and the existing manual AI handoff remain opt-in and local. Inspection evidence must be excluded from an AI request unless a future reviewed privacy control explicitly selects redacted, capped evidence; no page content is uploaded by Layout Lens. Do not silently modify saved projects; only an explicit user save can persist a deliberately designed normalized snapshot or report artifact.

## Static-analyzer trust gate for live-page implementation

All gate rows must be satisfied before implementing live-page inspection. Current status is deliberately conservative.

| Gate condition | Status | Current evidence / gap |
| --- | --- | --- |
| HTML fixtures execute via real browser `DOMParser` | **Blocked** | Node fixture path injects a test parser; real-DOMParser test is skipped and no usable browser runtime is available. |
| CSS fixture coverage passes | **Satisfied** | Fixture suite covers valid, malformed, responsive, fixed-width, overflow, literals, and token cases. |
| Deterministic issue IDs | **Satisfied for fixtures** | ID and repeated-input tests pass for static analyzers. |
| Complete source/confidence/evidence metadata | **Satisfied for automated static findings** | Metadata validator and fixture contract tests require it. |
| Manual scoring separation | **Satisfied for static findings** | Tests verify analyzers do not enter score/export; manual report remains manual-only. |
| False-positive review | **Not yet tested** | No labeled real-page corpus or acceptance thresholds. |
| Unsupported cases documented | **Satisfied in this plan** | Limitations below and privacy exclusions define the initial boundary. |
| Browser smoke testing | **Blocked** | No browser executable/automation command is configured or available. |
| Malformed input safe handling | **Satisfied for static fixtures** | Empty HTML and malformed CSS/HTML recovery tests pass. |
| Representative-size performance | **Not yet tested** | No timing budget or representative live-page corpus. |

## Future local live-page data pipeline

1. The user explicitly starts inspection and chooses the page or region scope.
2. The extension/page adapter reads only permitted DOM and style data.
3. It excludes sensitive and unsupported data before serialization.
4. It creates a bounded normalized inspection snapshot with explicit viewport and capture facts.
5. Existing static engines and dedicated browser adapters process that snapshot deterministically.
6. A normalizer emits source, confidence, capped evidence, stable location, and stable issue ID metadata.
7. Findings remain separate from manual audit answers and weighted scoring unless a future, separately designed rule mapping is accepted.
8. Reports consume only validated normalized findings through a dedicated adapter.

Initially permitted observations: semantic DOM structure; headings; landmarks; labels; buttons; links; images; focusable elements; layout dimensions; overflow; selected computed-style properties; and responsive viewport facts. Computed-style observations are observations, not confirmed design intent or WCAG conformance claims.

Initially unsupported/limited: passwords/private values, canvas pixels, closed shadow roots, cross-origin frame content, browser internal pages, downloaded resources, cookies, localStorage/sessionStorage, network traffic, authentication tokens, arbitrary JavaScript, and complete application-state extraction.

Live inspection must never change manual answers or scores automatically, create AI/speculative findings, fetch/upload content, execute pasted/page-provided scripts, weaken preview sandboxing, silently modify projects, or claim WCAG conformance.

## Risk register

| Risk | Mitigation / open question |
| --- | --- |
| Computed styles misrepresent intent | Label as observation; use conservative rule wording and human review. |
| Dynamic DOM changes | Timestamp/bound snapshots; explicit re-run; test stability policy. |
| Large/complex pages and performance | Region-first scope, caps, cancellation, and measurable budgets before rollout. |
| Framework markup, shadow DOM, pseudo-elements | Fixture corpus; open-root-only policy; document coverage gaps. |
| Cross-origin frames | Exclude and report limitation; never attempt bypass. |
| Permission trust/store review | Minimum permissions, transparent disclosure, no remote code, review privacy copy. |
| Evidence and ID instability | Deterministic snapshot ordering and location strategy; repeated-inspection tests. |
| Browser differences | Chromium prototype first, then Firefox compatibility and real-page regression fixtures. |

## Staged implementation path (after the gate)

1. Architecture/permission prototype with no capture and minimum `activeTab` model.
2. Explicit current-tab or region DOM snapshot proof of concept.
3. Deterministic normalized inspection adapter with redaction and caps.
4. Finding/evidence/issue-ID compatibility verification.
5. Local inspection-report adapter integration.
6. Privacy, permission, CSP, and store-review assessment.
7. Chromium MV3 prototype.
8. Firefox compatibility review.
9. Real-page and dynamic-page fixture testing plus performance thresholds.
10. Limited user validation before any broader product work.

SaaS, accounts, cloud sync, billing, collaboration, backend storage, and remote services are explicitly out of scope for every stage.

## Decision record

**Recommendation: defer extension and live-page implementation.** The current code validates a promising local static-analyzer and deterministic-domain foundation, but browser-runtime HTML verification and browser smoke testing are blocked, and real-page quality, performance, and user-value evidence are missing. At most, consider a dependency-free architecture/permission prototype after the full trust gate passes; it must not capture pages or request broad host access.

Validated current capabilities are local static analysis, deterministic metadata/IDs in fixtures, isolated preview inspection, manual-only scoring/reporting, local persistence, and explicit manual AI handoff. The future architecture above is feasible but unimplemented. Unresolved risks include live-DOM fidelity, dynamic content, browser permissions, privacy, performance, and stable evidence/IDs. Browser runtime verification remains a manual blocker.
