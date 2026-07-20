# Future organization rule libraries and quality profiles

**Status:** architecture and governance plan only. The active product is still the built-in, versioned manual rule data, component presets, rule packs, and severity profiles. No organization account, shared library, permission model, remote configuration, or team rollout exists.

## Reuse, not a second engine

A future organization library must be a validated input to the existing rule architecture, not a parallel rule engine. It reuses stable rule IDs; `RULE_SCHEMA_VERSION` and schema metadata; the existing category and severity vocabularies; WCAG mappings; applicability (`presets`, `packs`, and `patterns`); component presets; rule packs; deterministic recommendations; issue-ID generation; and `ruleDataValidator.js`-style strict validation. Manual findings retain `manual:<rule-id>` IDs; profiles can select, weight, or require rules but cannot rewrite IDs, answers, analyzer findings, or recommendations.

### Explicit hierarchy and composition

1. **Built-in Layout Lens library** — immutable shipped definitions and metadata.
2. **Organization library** — a separately versioned set of additional rules and explicit composition directives.
3. **Team/product rule pack** — a named, validated selection of rule IDs from declared libraries.
4. **Project audit preset** — the existing local project selection of preset, pack, severity profile, and manual state, extended in the future only by pinned library/profile references.

Composition produces a new immutable resolved view in deterministic order (library order, then declared rule order); it never mutates `auditRules.js` at runtime. An organization may add a new namespaced stable rule ID or reference a built-in rule by ID. It may disable an organization-approved rule only through an explicit composition record with a reason and versioned scope; it cannot silently remove a built-in definition. Weight changes belong in a profile override keyed by rule ID, leaving the original rule and its severity unchanged. Unknown IDs, duplicate rule IDs across the resolved set, duplicate pack references, or unknown applicability/preset/pattern references reject the configuration.

A deprecated rule stays resolvable for historical views, carries a replacement ID only when the replacement is present and valid, and is excluded from *new* packs only by explicit policy. Retirement removes it from new selections but not archived library versions. Replacement is never an in-place ID reuse: publish the new rule, validate it, mark the old one deprecated with a change note, and migrate only an explicitly chosen future audit configuration. Replacement chains and library inheritance must be acyclic.

## Governed library record

A future package should contain a `libraryId`, immutable semantic `libraryVersion`, supported `schemaVersion`, declared parent library/version references, rules, packs, and a deterministic order. Each rule needs product-facing metadata: stable `id`, schema version, title, description, category, severity, rationale, applicability, evidence expectations, defensible WCAG mapping (or none), deterministic recommendation metadata, lifecycle status (`draft`, `active`, `deprecated`, `retired`), replacement rule ID where applicable, and change note.

Administrative metadata is deliberately separate: library maintainer/owner, created/updated timestamps, review/approval record, release channel, and future role concepts. This is documentation for governance, not an account, role, or permission-enforcement design.

### Validation and migration gate

Future import must reject unsupported fields and future schema versions. It must require unique library/rule/pack IDs, supported schema versions, known categories/severities, valid WCAG shape, valid applicability references, known replacement/deprecation references, no circular parent/replacement inheritance, no duplicate references, and deterministic ordering. Older supported versions migrate stepwise into a new immutable object with a recorded migration note; malformed or unrecoverable input is rejected, never guessed. No executable expressions, functions, URLs with automatic fetches, or arbitrary code are valid configuration.

Every audit snapshot and report must pin the resolved library IDs/versions, quality-profile ID/version, rule schema version, pack/preset/profile IDs, and resolution timestamp or content fingerprint. Saved historical audits must render/evaluate from their pinned resolved snapshot or archived library package. They must not silently recalculate against a later library or profile; a user can explicitly start a new audit/version using the newer selection.

## Quality profiles

These concepts remain distinct:

| Concept | Purpose |
| --- | --- |
| Rule definition | One validated manual check and its deterministic metadata. |
| Rule library | Versioned collection of rules and reusable governed packs. |
| Rule pack | A focused selection of rules. |
| Severity profile | Existing weighting mode; does not alter answers. |
| Organization quality profile | Versioned policy that composes libraries/packs and evaluation requirements. |
| Project audit preset | Local audit selection/context, not organization governance. |

A future quality profile references exact libraries and packs, and may declare severity weighting or a reference to an existing severity profile, required categories, applicability settings, minimum review coverage, target score, deterministic blocking-rule criteria, report-template preference, documentation link, owner, status, and change note. It must not become an oversized replacement for rules or audit state.

Evaluation is deterministic and explainable: it reports selected library/version and profile/version, applicable-rule count, reviewed coverage, weighted score, unmet required rules, blocking **deterministic** findings, and `incomplete`, `passed`, or `needs-work`. It preserves manual statuses verbatim; analyzer findings remain labeled and separate from manual scoring. AI prose cannot be a finding, criterion, blocker, or quality result. A target score is advisory until a separately designed, verified release-gate policy exists; no production pass/fail gate is implemented.

## Governance before rollout

Resolve ownership, qualified accessibility/security review, change approvers, review evidence, profile release/version policy, deprecation communication, documented exceptions and expiry, profile-selection guidance, conflict resolution, and archival/reproducibility before any team rollout. Recommended sequence: (1) local experimental library, (2) versioned internal library, (3) small-team pilot, (4) false-positive/feedback review, (5) governance approval, then (6) wider organization rollout. Team rollout is not implemented.

## Future distribution options

| Option | Benefit | Risk / required validation |
| --- | --- | --- |
| Local JSON import/export | Local-first and reviewable. | Strict schema validation, size limits, provenance display, explicit import. |
| Repository-managed files | Code review and version history. | Pin revisions, validate in review/CI later, avoid project-data leakage. |
| Organization API | Central distribution. | Authentication, authorization, availability, privacy, signatures, and migration ownership; deferred. |
| Signed packages | Strong provenance. | Key rotation, signature verification, revocation, offline behavior. |
| Dashboard-managed library | Discoverability/workflow. | Accounts, permissions, audit logs, backend operations; deferred. |

Current work remains local-first: no importing UI, downloads, synchronization, or remote distribution was added.
