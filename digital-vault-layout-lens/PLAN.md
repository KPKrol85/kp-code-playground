# KP_Code Layout Lens — Implementation Plan

## Project status

KP_Code Layout Lens has completed its local-first browser audit baseline: manual deterministic audits, static HTML/CSS analysis, isolated preview inspection, report generation, browser-local saved projects, and a strictly manual AI handoff. This plan contains only the next validation and product-direction work.

## Current product baseline

- Deterministic manual checklist scoring, recommendations, stable IDs, presets, rule packs, severity profiles, filters, notes, and local import/export.
- HTML/CSS analyzers with evidence, source/confidence labels, and relevant WCAG metadata; analyzers remain outside manual scoring and manual-only reports.
- Isolated local preview with viewport review, overlays, keyboard audit, annotations, comparison checklist, and reduced-motion support.
- Markdown, print/browser-PDF, and machine-readable manual report outputs; IndexedDB saved projects with local audit history and migrations.
- Session-only, privacy-controlled manual AI handoff with cited-evidence validation and no direct AI or network integration.

## Verification still required

- Real-browser `DOMParser` execution of the HTML analyzer fixtures is still outstanding because the Node suite uses an injected parser adapter when browser `DOMParser` is unavailable.
- Manual browser verification is still required for preview isolation/overlays/keyboard audit, downloads, printing, IndexedDB behavior, screenshot checklist use, and assistive-technology interaction.

## Next implementation roadmap

### Phase 1 — Verification and release readiness

- [ ] Run the HTML analyzer fixture suite in a real browser runtime and record the result.
- [ ] Perform a documented manual browser QA pass for preview, overlays, keyboard audit, viewport comparison, downloads, print/PDF, and IndexedDB project workflows.
- [ ] Conduct keyboard and screen-reader checks for the primary audit, report, saved-project, and AI-handoff flows.
- [ ] Validate the Markdown, print, and machine-readable report outputs with representative saved-project audit examples.

### Phase 2 — Real-world validation

- [ ] Run representative audits on real-world HTML/CSS samples and review analyzer false positives, false negatives, confidence labels, and evidence usefulness.
- [ ] Conduct consented usability sessions to validate the manual audit, report, and browser-local saved-project workflow.
- [ ] Use the results to prioritize narrowly scoped rule, analyzer, report, or workflow corrections without weakening deterministic/manual boundaries.

### Phase 3 — Future product expansion

- [ ] Reassess live-page or browser-extension proof-of-concept work only after every documented analyzer trust gate and real-world validation condition passes.
- [ ] Reassess remote storage, collaboration, integrations, CI, SaaS, billing, or enterprise work only after validated user demand and focused privacy/security/product decisions.

## Product rules and constraints

- Deterministic results are authoritative. AI content is separate, unverified, session-only, and non-authoritative; manual scoring remains separate from analyzer findings.
- Keep preview and any future extension-specific state separate from scoring and rule data. Keep saved projects browser-local unless validated demand justifies a different product decision.
- Do not add backend, cloud sync, accounts, billing, collaboration, CI enforcement, SaaS, enterprise, live-page, or extension functionality before their documented validation gates.
- Do not upload or automatically include privacy-sensitive source data. Preserve local-first behavior, safe rendering, accessibility, responsive design, and reduced-motion support.
- Consult focused feasibility documents in [`docs/`](docs/) before revisiting deferred product paths.

## Rules for future Codex tasks

- Inspect the current repository before making changes and treat `PLAN.md` as the roadmap source of truth.
- Complete only the requested roadmap item or explicitly requested group; keep unrelated, partial, blocked, and future items unchanged.
- Mark a checkbox complete only after implementation and successful verification. Add a concise dated verification note beneath it that states what changed and which QA commands ran.
- Update `README.md` for user-facing behavior changes and `CHANGELOG.md` for meaningful completed product changes.
- Preserve the architectural, privacy, accessibility, deterministic-result, and local-first boundaries above.
