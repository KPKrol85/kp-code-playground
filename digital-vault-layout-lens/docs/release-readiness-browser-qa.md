# Release-readiness browser QA record

## Run context and integrity statement

- **QA date:** 2026-07-22.
- **Operating system:** Linux 6.12.13 x86_64 GNU/Linux.
- **Browser:** `BLOCKED` — no Chromium, Chrome, Firefox, or other launchable browser executable was present in this Codex environment.
- **Application launch method:** Not run. The intended launch is `python3 -m http.server 4173 --directory .` from the repository root, then opening `http://127.0.0.1:4173/index.html` in a local modern browser.
- **Tested revision:** `4225ed1ecf8ec7d5b89b2e718e96834b0efdbb86` (`4225ed1`) before this documentation/harness change.
- **Scope result:** No visual or browser-native interaction was performed. Every result below is `NOT RUN` or `BLOCKED`; Node tests and source inspection are not substituted for browser QA.

## Native HTML analyzer fixture harness

A dependency-free browser harness was prepared at [`browser-harness/html-analyzer-fixtures.html`](browser-harness/html-analyzer-fixtures.html). It imports the production analyzer and runs the six HTML fixture scenarios plus native-parser availability, determinism, and stable-ID checks (nine checks total). Each analyzer call intentionally omits the optional `parser` argument; the harness separately calls `parseHtmlToDetachedDocument`, which resolves `window.DOMParser` in the browser.

**Prepared manual execution steps**

1. From the project root, run `python3 -m http.server 4173 --directory .`.
2. In a current desktop browser, open `http://127.0.0.1:4173/docs/browser-harness/html-analyzer-fixtures.html`.
3. Record the displayed user agent, the `Native window.DOMParser: available` confirmation, and the pass/fail/skip totals.
4. Save a screenshot or the rendered result text in the release evidence. A passing run should show **9 passed, 0 failed, 0 skipped**; any difference is a fixture difference/failure and must be recorded before changing the roadmap.

| Check | Expected result | Actual result | Status | Evidence / observation |
| --- | --- | --- | --- | --- |
| Native `window.DOMParser` HTML fixture suite | Production analyzer runs without an injected parser; native parser is available; 9 passed, 0 failed, 0 skipped. | Not executed. | `BLOCKED` | No launchable browser was installed. An attempted transient Playwright install (`npx --yes playwright@1.55.0 install chromium`) was rejected by the npm registry with HTTP 403, so no browser was downloaded or launched. |

**Fixture differences or failures:** None observed, because no browser run occurred. **Final result:** `BLOCKED`; this is distinct from the Node parser-adapter result and is not verification.

## Manual QA matrix

Use the same served application and a representative manual audit with at least one **Needs work** answer, a note, report metadata, and the following preview source before recording actual browser results:

```html
<main><h1>Preview QA</h1><a href="#details">Details</a><button type="button">Continue</button><img src="https://example.invalid/image.png" onerror="alert('blocked')" alt="Example image"><script>window.__shouldNotRun = true</script><div style="width: 900px">Overflow sample</div></main>
```

```css
main { padding: 24px; } @media (max-width: 600px) { main { padding: 12px; } }
```

| Area / test steps | Expected result | Actual result | Status | Evidence / observation |
| --- | --- | --- | --- | --- |
| **Preview:** paste the representative HTML/CSS and select **Refresh preview**. | Preview refreshes from the current source. | Not executed. | `NOT RUN` | Requires a browser. |
| **Preview safety/isolation:** inspect the preview after refresh; try the inline script/event handler; inspect iframe sandbox and external image behavior. | Source is sanitized, iframe remains isolated, script and handler do not execute, and unsafe external reference is neutralized/blocked as applicable. | Not executed. | `NOT RUN` | Requires browser DevTools/visible behavior. |
| **Preview separation:** record a manual score and save a project; refresh preview and change viewport/overlay; compare score and saved-project data. | Preview state does not change manual scoring or saved-project state. | Not executed. | `NOT RUN` | Requires browser persistence and interaction. |
| **Overlays:** refresh preview, activate each of **Spacing**, **Layout boxes**, **Headings**, **Focusable elements**, and **Overflow** separately, then select **Off**. Repeat at 390, 768, and 1180 px. | Exactly one intended overlay is active; matching control state/status is announced; overlays do not change audit data; controls remain usable at supported widths. | Not executed. | `NOT RUN` | Record one observation for every overlay and width. |
| **Keyboard audit:** with focusable preview content, select **Start**, **Next**, **Previous**, **Restart from first**, and **End**; traverse with keyboard and inspect status/details. | Ordered focus traversal, status announcements, and safe preview messaging work; no unexpected focus escape or broken control occurs. | Not executed. | `NOT RUN` | Use actual Tab/Shift+Tab as well as controls. |
| **Viewport comparison:** select Mobile (390px), Tablet (768px), Desktop (1180px), then custom widths at the documented lower/upper valid limits and one invalid value; complete the comparison checklist and capture screenshots manually. | Presets select the stated widths; valid custom widths work and invalid limits are rejected; responsive controls/checklist work. Screenshots are manual only—no automated capture is claimed. | Not executed. | `NOT RUN` | Save manual screenshot evidence if run. |
| **Downloads:** after changing current manual audit state, use manual audit JSON export, Markdown report, machine-readable JSON report, and any other release-readiness download shown by the UI. Open each downloaded file. | Every download is user-triggered, has a sensible filename and non-empty content matching the current manual state; analyzer and AI content are excluded where required. | Not executed. | `NOT RUN` | Browser download shelf/filesystem and file contents must be inspected. |
| **Print / browser PDF:** open **Print or save as PDF**, inspect representative report content/layout in browser print preview, and select/complete Save as PDF where supported. | Print report opens, content is visible and layout usable; browser print preview is accessible; PDF is only claimed if created/inspected. No bundled PDF generator is implied. | Not executed. | `NOT RUN` | Native print/PDF dialog unavailable in this environment. |
| **IndexedDB—create/list/open/update/refresh:** enter metadata, save as new, verify list/open, change audit/metadata, save changes, refresh, and reopen. | Loading, empty, and success states are accurate; project, metadata, score, and recalculated recommendations restore correctly after refresh. | Not executed. | `NOT RUN` | Requires real IndexedDB-backed browser profile. |
| **IndexedDB—history/improvement/duplicate/delete:** save an audit-history snapshot/version, start an improvement pass, duplicate, verify independent records, and delete. | Snapshots remain immutable; improvement pass behavior is correct; duplicate is independent; deletion updates list/empty state. | Not executed. | `NOT RUN` | Record IDs/names and before/after observations. |
| **IndexedDB—migration/error/retry/draft separation:** load a supported older fixture/record if available; safely trigger storage error/retry where possible; compare explicit project with automatic localStorage draft. | Supported migration preserves supported fields; error/retry is truthful; project storage stays distinct from draft. | Not executed. | `NOT RUN` | Do not corrupt production browser data; use a disposable profile. |

## Defects and changes

- **Discovered defects:** None. Browser behavior was not exercised, so no defect inference is made.
- **Fixes made during this task:** No product behavior change. Added only the native-browser fixture harness and this evidence record.

## Remaining manual follow-up

1. Run the native fixture harness in a launchable, current browser using the exact steps above, and record browser name/version plus displayed totals.
2. Execute every `NOT RUN` matrix row in a disposable browser profile, recording actual observations and artifacts (screenshots, downloaded files, and a PDF only if actually produced).
3. For IndexedDB migration/error testing, use a supported legacy record and a safe/disposable profile; record the exact fixture and recovery result.
4. Mark either `PLAN.md` item complete only after the corresponding real-browser result is successful; leave it unchecked for failures, blocks, or incomplete coverage.
