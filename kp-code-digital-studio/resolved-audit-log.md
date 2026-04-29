# Resolved Audit Log

This file tracks audit findings that were confirmed as resolved and removed from the active `daily-AUDIT.md` queue.

## 2026-04-29

### Source preview service worker registration

- **Previous severity:** P1
- **Source:** `daily-AUDIT.md` from 2026-04-21
- **Status:** resolved
- **Issue:** `preview:source` could serve the raw root `service-worker.js` template containing `__CACHE_NAME__` and `__SHELL_ASSETS__`, while the front-end runtime attempted service worker registration in source preview.
- **Risk:** local source preview could produce a service worker registration error and differ from the built `dist/` behavior.
- **Resolution evidence:** `scripts/preview-source.mjs` injects `<meta name="kp-code-runtime" content="source-preview" />` into assembled HTML, and `js/modules/service-worker.js` skips service worker registration when that marker is present.
- **Current state:** source preview no longer registers the unprocessed service worker template; the generated worker remains a build-time artifact created by `scripts/build-utils.mjs`.
