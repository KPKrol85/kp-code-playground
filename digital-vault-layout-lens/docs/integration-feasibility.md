# Future integration feasibility

**Decision:** integrations are deferred feasibility work. They may consume immutable normalized data only after explicit adapters and stability gates; no provider connection, SDK, network request, OAuth/API key, webhook, authentication, CI configuration, or synchronization queue exists.

## Shared provider-neutral boundary

Future flow: **(1)** deterministic audit domain data (rules, manual state, analyzers) → **(2)** normalized report/integration model → **(3)** privacy and field-selection policy → **(4)** provider-neutral handoff contract → **(5)** provider-specific adapter → **(6)** authentication/transport → **(7)** visible success/error state. Adapters must not read the application DOM or mutable app state, or import/mutate scoring, rules, analyzers, issue IDs, or report internals.

Current reusable inputs are `auditRules.js`, applicability/validator modules, severity profiles/packs, deterministic `issueIds.js`, `findingMetadata.js`, analyzer evidence, saved-project version metadata, and the manual normalized report adapter/Markdown/print renderers. Future work needs a separately versioned integration model, privacy selector, handoff validator, provider adapters, and transport/auth layer.

## Issue-tracker handoff

A future provider-neutral, versioned handoff may contain only: external handoff ID/idempotency key; audit project and audit-version references; stable Layout Lens issue ID; title; deterministic description; category; severity; source; confidence when applicable; WCAG mapping when available; bounded evidence summary; explicitly included reviewer note; target URL only with explicit consent; report reference; suggested priority; and created timestamp. It must reject unknown/sensitive fields and never include raw HTML/CSS by default, complete source files, passwords/form values, browser storage, tokens, hidden-page data, unrestricted snippets, or AI claims represented as facts.

Use a persisted future mapping of `(project version, Layout Lens issue ID, handoff destination)` to external ID and an idempotency key to prevent duplicates. User confirmation and privacy preview precede every create/update. Define stale-version behavior (usually create/update only from the selected immutable audit version), close/reopen mapping, retry/error visibility, rate-limit policy, least permission scopes, secret storage, and update-versus-create policy before transport. GitHub Issues, Jira, and Linear are examples only; no provider is selected.

## Design-system use cases

A future adapter could map rule IDs to stable component IDs, tokens, variants, or component documentation; link findings to approved remediation guidance; identify repeated findings across shared components; and generate governed packs from versioned design-system standards. Keep design intent distinct from verified implementation behavior. Prerequisites are a source owned by the organization, stable component identifiers, declared mapping rules, remediation review, and drift detection. Risks include design/code drift, renamed tokens, competing sources of truth, provider-specific metadata, inaccessible private files, stale IDs, and private-project upload. No connection to Figma, Storybook, repositories, or design APIs exists.

## CI after machine output

The separate roadmap item **“Add machine-readable report output for future CI use” remains unchecked and is a hard prerequisite.** CI additionally needs a stable versioned machine schema, deterministic execution, reproducible representative fixtures, real-browser verification where required, exit-code/threshold/profile policy, baseline and changed-scope semantics, false-positive handling, secure repository-code handling, artifact retention, and readable human reports. Possible future modes are informational output, warning-only check, deterministic required gate, baseline regression, scheduled job, and pull-request annotation. Start informational and non-blocking. CI must never fail for AI prose or unverified findings.

## Stability gates (current assessment)

| Gate | Status | Evidence / gap |
| --- | --- | --- |
| Report stability | **Partially satisfied** | Shared manual normalized report, Markdown and print outputs, deterministic manual IDs, and local privacy boundaries exist; report model is not an explicitly versioned integration contract, long/empty behavior is test-covered but real browser report verification is blocked. |
| Issue tracker | **Not yet started** | No handoff schema, consent UI, duplicate map, permission review, or retry design implementation. |
| Design system | **Not yet started** | No stable external component IDs, owned source, mapping, drift policy, or remediation validation. |
| CI | **Blocked** | Machine-readable output is not implemented; browser-runtime verification remains unavailable. Deterministic fixture tests exist, but CI policy/gate/baseline are not designed. |

Before an issue tracker: version the handoff schema, complete privacy review, duplicate prevention, explicit confirmation, permission review, and failure/retry design. Before a design system: establish IDs, ownership, mapping, drift response, and approved remediation. Before CI: complete the machine-output item, version it, verify deterministic fixtures, review false positives, prohibit AI enforcement, and document thresholds. Report gate also requires consistent Markdown/print output, complete ID/evidence/confidence metadata, verified long/empty states, documented privacy, and real-browser manual verification.

## Decision record

Keep integrations unimplemented. First stabilize and version an immutable normalized report/integration contract, manually verify browser behavior when a browser runtime is available, and validate user value. Prefer explicit user-approved exports/handoffs and non-blocking CI information before provider transport or merge enforcement.
