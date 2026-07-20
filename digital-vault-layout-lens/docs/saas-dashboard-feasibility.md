# SaaS dashboard product-validation plan

**Decision:** SaaS implementation is not justified now. Layout Lens has local-first capabilities, but the repository contains no product research or usage evidence that validates accounts, cloud sync, teams, or remote storage.

## Accurate local baseline

Saved projects are browser-local IndexedDB records with metadata, explicit create/open/update/delete flows, audit-version history, restoration and improvement passes, duplication, conservative schema migrations, and a storage adapter. The automatic working draft is separate localStorage recovery. The UI supplies loading, empty, error/retry, and success states. Project records intentionally exclude analyzer/preview/report artifacts and recompute manual scores/findings on restore. These browser/device-local features are useful foundations to test; they do not prove demand for cloud accounts, cross-device access, shared ownership, or remote persistence.

## Validation gate before backend work

| Evidence type | Required signal | Current status |
| --- | --- | --- |
| Assumption | People may value a shared dashboard. | Unvalidated assumption. |
| Measurable local use | In controlled testing, users create and reopen multiple projects, use versions for before/after reviews, duplicate projects for recurring client/product work, and generate reports repeatedly. | No evidence recorded. |
| Explicit request | Users report browser/device-local limits and request cross-device access, shared ownership, collaboration, reviewer assignment, project status, shared reports, or team/organization visibility. | No evidence recorded. |
| Sufficient evidence | Repeated real-world local-project/report value **plus** a documented, privacy-informed request pattern that cannot be solved by local export/import. | Not met. |

First validate through structured usability sessions: ask participants to create, reopen, version, duplicate, and report on real audits; record consented observations and feedback questions; and test whether a local export/import workflow meets cross-device needs. Optional future instrumentation may be a user-visible local counter/statistics panel or an anonymized summary exported only by an explicit user action. Do not add it now: no hidden analytics, telemetry, pixels, fingerprinting, SDKs, background uploads, or remote transmission are warranted. Any future local metric must stay out of scores, reports, audit JSON, saved-project content, and remote transfer.

## Deliberately small post-validation experiment

Only after the gate, test the smallest authenticated project-list service needed for proven cross-device/shared-project demand: cloud-backed normalized manual audit state, project metadata, immutable audit versions, explicit project ownership, simple status/reviewer assignment, and report access. Defer billing, multi-tenant permission matrices, SSO, advanced administration, CI automation, broad analytics, white-labeling, and enterprise compliance workflows.

## Future architecture options

| Option | Source of truth / offline behavior | Key implications |
| --- | --- | --- |
| Local-first with optional sync | Local record first; offline works; sync is opt-in. | Requires conflicts, migrations, ownership and history merge policy; lowest disruption but synchronization is hard. |
| API-backed dashboard | Remote canonical record; offline is limited unless added later. | Clear sharing/report links, but immediately requires authentication, authorization, deletion/export, operations, and privacy controls. |
| Hybrid cache + remote canonical | Server canonical, local cache supports offline edits. | Most complex: conflict resolution, cache migration, queue/retry correctness, history integrity, and sensitive-data leakage risk. |
| Extension with future account | Account service is canonical for explicitly shared records. | Adds permission/collection and account risks; it must not precede either extension or SaaS validation. |
| Separate dashboard consuming normalized records | Clear import/contract boundary; ownership depends on chosen store. | Can limit dashboard scope, but still needs identity, authorization, migration, sharing, and operational support. |

Choose only the smallest option demonstrated by validation. If cross-device access alone is proven, start with an explicit cloud copy of normalized manual records rather than synchronization queues or team administration. If shared ownership is not proven, do not add it. Every remote option needs a source-of-truth decision, conflict and offline-edit policy, schema migration plan, audit-history immutability rules, report-sharing authorization, account security, and operational ownership before implementation.

## Data classification and consent

Potentially eligible remote data, only after an explicit product/privacy decision, is normalized manual audit state, project metadata, saved audit versions, generated report references, reviewer assignment, and project status. Keep excluded by default: raw pasted HTML/CSS, full DOM snapshots, source files, preview iframe content, passwords/form values, tokens, browser storage, private URLs, AI request packages, and imported AI summaries. Any exception requires separate explicit consent, clear retention/deletion/export policy, and a threat review.

## Risk register

| Risk | Required response before implementation |
| --- | --- |
| Privacy/data ownership and accidental sensitive-code upload | Data classification, explicit consent, minimization, retention, deletion, and export design. |
| Account security; authentication/authorization | Threat model, secure identity/session design, project ownership and access review. |
| Multi-device conflicts and offline edits | Deterministic conflict policy, user-visible resolution, and migration-tested sync semantics. |
| Schema migration and audit-history integrity | Versioned migrations, immutable history policy, backups, and recovery behavior. |
| Vendor/infrastructure cost and support burden | Cost model, incident/support ownership, service limits, and deletion/export operations. |
| Synchronization complexity and premature expansion | Validate smallest use case first; avoid queues, collaboration, and enterprise features without evidence. |

## Recommendation and deferred work

Keep browser-local projects as the product architecture. First obtain consented local-use evidence and explicit privacy-aware requests. The smallest future SaaS experiment is an intentionally limited authenticated project list with explicit cloud copies of normalized manual projects, only if cross-device access is validated. Backend, accounts, cloud sync, collaboration, teams, billing, enterprise administration, and telemetry remain intentionally deferred.
