# Future extension workflow model

**Status:** a reusable, DOM-free domain contract is implemented; no browser extension runtime, page collection, permission, manifest, messaging, or live-page inspection exists.

## Reuse boundary

The reusable core is the existing versioned rule data and `ruleDataValidator.js`; category/severity profile metadata; `htmlAnalyzer.js` and `cssAnalyzer.js`; `issueIds.js`; `findingMetadata.js`; WCAG mappings; and the manual report model/presentation modules. These modules contain no browser extension imports. `assets/js/inspectionSnapshot.js` is a small pure boundary that validates an already-sanitized inspection snapshot and adapts only its HTML/CSS strings to the unchanged static analyzers.

A future platform layer—not the core—would own the manifest, permissions, active-tab access, content scripts, DOM/style collection, redaction, node-location construction, messaging, extension storage, and popup/side-panel UI. It must collect only after an explicit user request and pass a plain data snapshot to this core boundary. It must not copy rules, analyzer checks, finding schemas, issue-ID logic, or report logic.

## Normalized inspection snapshot contract

`normalizeInspectionSnapshot` accepts a plain object with this exact schema:

| Field | Meaning |
| --- | --- |
| `schemaVersion` | Currently `1`. |
| `inspectionId` | Caller-provided stable identifier (letters, numbers, hyphens). |
| `scope` | Explicit `{ kind: 'page' | 'selected-region', label? }`; no selector or DOM handle is accepted. |
| `html` | Already-sanitized serialized HTML. |
| `css` | Optional already-sanitized CSS string. |
| `computedStyleFacts` | Optional bounded `{ name, value }` observations. |
| `viewport` | Optional width, height, and device-pixel-ratio facts. |
| `semanticMetadata`, `layoutMetadata` | Optional bounded `{ name, value }` facts. |
| `collectedAt` | Collection timestamp. |
| `limitations` | Required human-readable exclusions/coverage limitations. |

The normalizer makes a deeply frozen copy, does not mutate input, applies source/fact bounds, and rejects unknown fields. It rejects sensitive or unsupported field names and therefore does not accept passwords, payment values, private form contents, cookies, authentication tokens, browser history, localStorage/sessionStorage, arbitrary JavaScript state, network traffic, uploads, or frame data. The contract is intentionally DOM-free and browser-API-free; redaction must happen before it is called. Cross-origin frames and other unsupported content belong in `limitations`, never in the snapshot.

## Analyzer, finding, and report compatibility

`createStaticAnalyzerInput` maps only snapshot `html` and optional `css` to the existing static analyzer input. `analyzeInspectionSnapshot` invokes the unchanged engines (and can receive a parser adapter in non-browser tests). It does **not** interpret computed styles, geometry, or metadata as static CSS; a future deterministic fact-to-finding adapter is required for those live observations. That adapter must normalize evidence/location and use stable IDs, but a `live-page-inspector` source is reserved design only and is not currently permitted by production finding validation.

Static analyzer findings preserve their current `html-analyzer` or `css-analyzer` source, confidence, capped evidence/location, WCAG mappings where present, and deterministic IDs. They remain separate from manual answers and weighted scoring.

`adaptManualAuditReport` remains manual-only and does not receive snapshots or analyzer findings. A future opt-in inspection report must use a separate adapter/extended normalized report contract that labels each source (manual, HTML analyzer, CSS analyzer, and a future verified live source), shows confidence and evidence labels, preserves IDs, and never changes manual scores or describes automated findings as manual results. It must not claim WCAG certification or production readiness.

## Verification and current limitation

`tests/extensionWorkflowModel.test.mjs` verifies immutable deterministic normalization, sensitive/unsupported-field rejection, static analyzer compatibility, stable automated IDs/evidence, and manual-report separation. The tests exercise a supplied parser adapter because this environment still lacks a real browser `DOMParser`; browser smoke tests remain blocked as recorded in [browser-extension-feasibility.md](browser-extension-feasibility.md).

There are no browser API imports, remote calls, hidden uploads, storage writes, scoring changes, report-output changes, or production live-page source values in this boundary.
