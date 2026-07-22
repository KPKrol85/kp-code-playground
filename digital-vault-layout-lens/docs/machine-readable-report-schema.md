# Machine-readable manual audit report schema

## Purpose and status

`manual-audit-json` schema **1** is a dependency-free JSON export for local download. It is a future-compatible artifact for comparison, baselines, issue handoff, quality-profile evaluation, informational CI summaries, and potential pull-request annotations. It is **not** a CI runner: it does not upload, contact a repository, annotate a pull request, choose an exit code, or fail a build.

The DOM-free serializer consumes the immutable normalized manual report model (`reportAdapter.js`). It does not scrape HTML. The current export is deliberately manual-report-only: automated analyzer findings are excluded rather than being silently merged with manual findings or the weighted score. Future inclusion requires a separately validated, source-aware adapter and deterministic browser-runtime execution where required.

## Shape, fields, and ordering

Top-level fields are exactly `metadata`, `audit`, `scores`, `categories`, `findings`, `recommendations`, and `summary`; unknown fields are rejected by the validator. `metadata` has `productId` (`kp-code-digital-vault-layout-lens`), integer `schemaVersion` (currently `1`), `format` (`manual-audit-json`), ISO `generatedAt`, rule/audit-storage schema versions, and selected template `{id,name}`. `generatedAt` is volatile; every other field is stable for equivalent normalized input.

`audit` contains selected `{id,name}` preset, rule pack, severity profile, plus optional non-empty normalized report-cover `context`. It has no project record, account, organization, or storage identifiers. `scores` contains nullable `weightedScore`, `scoreAvailable`, score points/totals, reviewed/applicable totals, and nullable completion percentage. `categories` uses unique `categoryId` records with score availability and progress totals, sorted by ID. `findings` contains only manual Needs work items: stable `issueId`, rule ID, plain-text title/description/category, `low|medium|high` severity, and optional normalized reviewer note; it is sorted by issue ID. `recommendations` are existing deterministic recommendations sorted by issue ID. `summary` contains count facts, controlled severity counts, and ordered category strengths/priorities.

Empty optional context and reviewer notes are omitted. Strings are NUL-free, whitespace-normalized plain text (notes retain bounded line breaks). Rule and progress counts are non-negative integers; weighted `earnedPoints` and `possiblePoints` are non-negative numbers because selected severity/category profiles can apply fractional multipliers; percentages are null or 0–100. Identifiers are unique in each relevant array. The serializer creates fresh frozen data and never serializes mutable application state.

Example (abridged):

```json
{"metadata":{"productId":"kp-code-digital-vault-layout-lens","schemaVersion":1,"format":"manual-audit-json","generatedAt":"2026-01-01T00:00:00.000Z","ruleSchemaVersion":2,"auditStorageSchemaVersion":2,"template":{"id":"internal-qa","name":"Internal QA"}},"audit":{"preset":{"id":"landing-page","name":"Landing page"},"rulePack":{"id":"all-rules","name":"All rules"},"severityProfile":{"id":"baseline","name":"Baseline"}},"scores":{"weightedScore":60,"scoreAvailable":true,"earnedPoints":3,"possiblePoints":5,"totalRules":2,"checkedRules":2,"passedRules":1,"needsWorkRules":1,"notApplicableRules":0,"notCheckedRules":0,"reviewedRules":2,"applicableRules":2,"completionPercent":100},"categories":[],"findings":[],"recommendations":[],"summary":{"needsWorkFindings":1,"passingRules":1,"severityCounts":{"low":0,"medium":1,"high":0},"strengths":[],"priorities":[]}}
```

## Privacy and compatibility

The export excludes AI-generated summaries, strengths, priorities, cautions, confidence, request packages, prompts, responses, usage/copy state; raw HTML/CSS; analyzer output; preview/annotation/viewport/filter state; storage internals; saved-project history; browser fingerprints; credentials; cookies; and hidden state. Report cover fields are included only when the existing report privacy normalization permits and the user entered them.

Schema versions are independent of audit storage, saved-project, rule, IndexedDB, and Markdown formats. A compatible change must preserve existing meanings; a breaking change increments `schemaVersion` and is rejected by older validators. Future CI may upload this file as an artifact, summarize it informationally, compare stable payloads, detect regressions, annotate reviews, or evaluate quality profiles. Any enforcement threshold, blocking exit code, provider adapter, and analyzer inclusion requires a separate explicit roadmap decision. AI content can never be enforcement input, and browser-dependent analyzers still require real browser-runtime validation.
