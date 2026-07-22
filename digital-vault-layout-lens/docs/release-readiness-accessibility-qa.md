# Release-readiness accessibility interaction QA

## Run context and integrity statement

- **Verification date:** 2026-07-22.
- **Operating system:** Linux 6.12.13 x86_64 GNU/Linux.
- **Browser:** `BLOCKED` — `chromium`, `chromium-browser`, `google-chrome`, `google-chrome-stable`, and `firefox` were not installed or launchable in this Codex environment.
- **Screen reader:** None available; no screen-reader version or spoken output is claimed.
- **Application launch method:** Not run. For a manual run: `python3 -m http.server 4173 --directory .`, then open `http://127.0.0.1:4173/index.html` in a current desktop browser using a disposable profile.
- **Tested revision:** `4b91cb4` before the focused machine-readable report fix in this change.
- **Integrity boundary:** No real browser interaction was possible. Source, accessibility-tree, and automated test results are supporting evidence only; they are not represented as keyboard or screen-reader verification.

## Keyboard verification matrix

| Flow and exact keyboard steps | Expected result | Actual result | Status | Evidence / observation |
| --- | --- | --- | --- | --- |
| **Primary audit:** load the app; use `Tab`/`Shift+Tab` from the skip link through preset, rule-pack, severity-profile, filter, checklist status controls, notes, recommendations, reset/import and error controls. Use `Enter`/`Space` to activate buttons and status controls; use arrow keys where the rendered control pattern requires them. Repeat at supported responsive widths. | Logical forward/reverse order, visible focus, understandable state, no trap or unexpected focus loss; controls activate without a pointer. | Not executed. | `BLOCKED` | Requires a launchable browser. |
| **Report:** navigate by keyboard to template selection and Markdown, print, and machine-readable actions; activate each; enter and leave report view; inspect headings, summary, lists, tables, status/error messages, and focus. | Actions are keyboard accessible; report reading order and manual-only boundary are understandable; focus is predictable. | Not executed. | `BLOCKED` | Requires a launchable browser and native download/print surfaces. |
| **Saved projects:** keyboard-only save-as-new, list/open, update, duplicate, delete confirmation (`Escape` included), restore, history, improvement pass, empty/loading/success, and safely testable error/retry states. Confirm dialog containment and focus restoration. | Distinguishable project controls, clearly destructive delete, correct dialog focus/restoration, and no focus loss after restore or draft recovery. | Not executed. | `BLOCKED` | Requires browser IndexedDB and a disposable profile. |
| **Manual AI handoff:** use keyboard for preset/evidence/privacy controls, opt-in notes/snippets, request preview/approval/copy, response paste/validation/stale-response/error and imported labeling. | Manual/external/no-network status and privacy defaults are understandable; AI content stays session-only and cannot alter manual results. | Not executed. | `BLOCKED` | Requires a launchable browser and clipboard interaction. |

## Screen-reader verification matrix

| Flow and exact assistive-technology steps | Expected result | Actual result | Status | Evidence / observation |
| --- | --- | --- | --- | --- |
| **Primary audit:** with NVDA, JAWS, VoiceOver, Narrator, or another identified real screen reader running, read title/landmarks/headings; operate every audit control above and listen for labels, states, rule/note association, score/progress updates, validation/import errors, and focus changes. | Spoken output gives a coherent manual-audit structure and current control state without unexpected focus movement. | Not executed. | `BLOCKED` | No screen reader or browser is available. |
| **Report:** operate template/export/print controls and read report heading hierarchy, screen-reader summary, findings, notes, recommendations, manual-only boundary, messages, and focus transitions. | Spoken output identifies the selected template and deterministic manual facts; analyzer and AI content are not presented as authoritative audit data. | Not executed. | `BLOCKED` | No screen reader or browser is available. |
| **Saved projects:** operate all saved-project actions, dialogs, history, improvement pass, empty/loading/success/error/retry and restore states while listening for row names, destructive intent, announcements, and restored focus. | Saved projects are distinguishable and state changes are announced without conflating drafts with explicit projects. | Not executed. | `BLOCKED` | No screen reader or browser is available. |
| **Manual AI handoff:** operate the privacy, approval, copy, paste, validation, stale-response, error, and imported-result sequence while listening for safety and non-authoritative/session-only labeling. | Spoken output makes manual/external/no-network behavior and default exclusions clear. | Not executed. | `BLOCKED` | No screen reader or browser is available. |

## Supporting deterministic evidence (not a substitute)

`npm test` passed **152**, failed **0**, skipped **1**; `npm run test:analyzer` passed **40**, failed **0**, skipped **1**. The skipped test is the Node-only real-`DOMParser` browser path. These results include report screen-reader-summary and saved-project UI-state model tests, but do **not** establish real assistive-technology behavior.

## Defects and fixes

- **Accessibility defects discovered:** None; interactive behavior was not exercised, so no inference is made.
- **Accessibility fixes made:** None.

## Remaining manual verification

1. In a current desktop browser, perform each keyboard row above with only `Tab`, `Shift+Tab`, `Enter`, `Space`, arrows where applicable, and `Escape`; record browser version, width, observed focus order, and any trap/restoration result.
2. Repeat each screen-reader row with an identified real screen reader and record the reader/version plus the actual spoken labels, states, announcements, and defects.
3. Keep the Phase 1 keyboard/screen-reader checkbox unchecked until those runs pass and no blocking defect remains.
