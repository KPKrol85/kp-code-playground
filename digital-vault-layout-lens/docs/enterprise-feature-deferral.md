# Enterprise feature deferral decision

## Decision and scope

Billing, multi-tenant permissions, and enterprise workflows are intentionally deferred while Layout Lens validates its local-first core. No payment provider or pricing model is selected. No organizations, workspaces, accounts, authentication, authorization, cloud storage, synchronization, or enterprise platform is implemented.

**Billing deferred:** subscriptions, invoices, tiers, trials, metering, checkout, customer portals, taxes, coupons, and entitlements. Billing follows demonstrated repeated value: real audits, project reopening, audit history improvement passes, report generation, validated cloud/team demand, and willingness to pay—not feature interest alone.

**Multi-tenancy deferred:** organizations/workspaces, tenant isolation, roles, custom permissions, sharing/invitations, cross-organization access, tenant-scoped storage, and permission audit logs. Prerequisites are validated team usage, ownership rules, authentication and authorization designs, data classification, isolation threat model, deletion/export policy, shared-project conflicts, and security review.

**Enterprise workflows deferred:** SSO/SAML/SCIM, provisioning, advanced logging, compliance dashboards, approvals, retention/legal holds, residency/private cloud, SLAs, white-labeling, contracts, advanced integrations, and organization policy enforcement. Premature work would materially expand security/privacy obligations, operational and infrastructure cost, support burden, testing, and legal/compliance scope.

## Validation gate

The repository currently demonstrates only **repository capability**: local manual audits, local saved projects/history, reports, and local JSON export. It makes no claim of local usability observation, repeated user behavior, customer request, commercial demand, or enterprise requirement.

Before reconsidering: observe repeated completed audits and saved/reopened projects (**repeated user behavior**); observe history used for improvement passes and reports generated/shared (**repeated user behavior**); prove useful machine-readable output (**local usability observation/repeated behavior**); receive cross-device, shared ownership, centralized-library, issue-tracker, or CI requests (**explicit customer request**); understand remote-storage privacy expectations and local-storage limitations (**local usability observation**); validate paid capabilities and willingness to pay independently (**validated commercial demand**); and document identity, isolation, security, compliance, and procurement needs (**enterprise requirement**).

Recommended sequence: (1) validate local audits, (2) validate analyzers in a real browser, (3) validate reports/JSON, (4) observe saved-project reuse, (5) validate cross-device/collaboration demand, (6) run the smallest justified account/cloud experiment, (7) validate small-team workflows, (8) consider billing after willingness to pay, (9) consider tenancy after real organization use, and (10) consider enterprise only after security, operational, and commercial justification.

This decision protects current audit drafts, IndexedDB projects, history, report metadata/output, analyzer findings, and rule state from speculative tenant, organization, subscription, entitlement, ownership, sync, or enterprise-flag fields. Reconsider only when the gate evidence is recorded and a dedicated roadmap decision approves the smallest required layer.
