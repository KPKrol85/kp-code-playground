# Report-output validation record

## Run context and integrity statement

- **Verification date:** 2026-07-22.
- **Environment:** Linux 6.12.13 x86_64 GNU/Linux; Node.js 20.20.2.
- **Browser / print environment:** `BLOCKED` — no launchable Chromium, Chrome, or Firefox executable was present. No browser download, print preview, native print dialog, Save as PDF action, or PDF file was produced.
- **Application launch method:** Browser path not run. Intended manual path is `python3 -m http.server 4173 --directory .` and `http://127.0.0.1:4173/index.html`.
- **Tested revision:** `4b91cb4` before the focused report-validation fix in this change.
- **Comparison source:** Production saved-project creation/normalization followed by the normalized deterministic manual report model. Node-created output files in `/tmp/layout-lens-report-validation` were parsed/inspected as supporting serialization evidence only; they are **not** claimed to be browser downloads.

## Representative saved-project inputs and expected normalized facts

The disposable examples contain invented `example.test` metadata only. Each was created with the production saved-project model and restored through production normalization before building the report model. The mixed example was migrated from a supported older record and duplicated before normalization; stale derived values were not supplied or trusted.

| Example | Saved-project scenario and template coverage | Expected authoritative facts |
| --- | --- | --- |
| **Mostly passing** | Complete metadata; Marketing pages / Landing page / Baseline. Internal QA primary output; Freelancer / Client Delivery alternate template output inspected. | 24 Pass, 1 Needs work, 0 N/A, 0 Not checked; **95%**; issue `manual:layout-overflow`; 1 multiline reviewer note; 1 recommendation. Metadata: Example Studio, Marketing site, `https://example.test/launch`, 2026-07-22. |
| **Remediation** | Complete metadata; Dashboards / Dashboard / Production. Agency Review primary output; SaaS Team alternate template output inspected. | 19 Pass, 5 Needs work, 0 N/A, 0 Not checked; **73%**; issues `manual:layout-hierarchy`, `manual:responsive-mobile-layout`, `manual:accessibility-keyboard`, `manual:accessibility-contrast`, `manual:nav-current-location`; 5 notes and 5 recommendations. Meaningful category differences include Responsive behavior 52%, Accessibility basics 50%, Navigation and interaction 67%, and several 100% categories. |
| **Mixed restored copy** | Supported older saved record migrated, restored, then duplicated; Forms / Form / signup flow / Accessibility-first. Design System Team output inspected. Optional owner and target URL intentionally omitted. | 8 Pass, 5 Needs work, 4 N/A, 3 Not checked; **56%**; issues `manual:responsive-mobile-layout`, `manual:accessibility-keyboard`, `manual:accessibility-contrast`, `manual:forms-states`, `manual:content-headings`; 1 multiline note and 5 recommendations. Category scores: Layout 100%, Responsive 0%, Accessibility 33%, Forms 73%, Navigation 100%, Visual 100%, Content 50%. |

All five supported templates were exercised across these model/serialization outputs: Internal QA, Freelancer / Client Delivery, Agency Review, SaaS Team, and Design System Team. Template changes were checked to affect presentation labels/order, not manual facts.

## Deterministic serialization and schema checks

| Check | Expected result | Actual result | Status | Evidence / observation |
| --- | --- | --- | --- | --- |
| Saved-project restoration/migration recomputes report facts | Current report derives score/categories/findings/recommendations from restored manual state. | Mixed restored-copy scenario normalized successfully; reported facts above were recomputed. | `PASS` | Production saved-project model and report model were used in the Node run. |
| Markdown final file inspection | A readable, coherent Markdown file contains expected metadata (or omissions), summaries, counts, category results, IDs, notes, recommendations, and template labels; analyzer/preview/history/AI data excluded. | Three generated `.md` files were read from `/tmp`: 3,860, 7,422, and 6,997 bytes; facts matched the table. | `PASS` | Supporting final-file serialization check, not a browser-download check. |
| Machine-readable final file inspection and schema validation | Explicit JSON parses; schema 1 and documented required/optional fields/types are valid; stable ordering/manual-only exclusions hold. | Three generated `.json` files parsed successfully (5,436, 9,433, 8,849 bytes), each schema version 1. Fractional Production-profile points initially failed validation; fixed and re-run successfully. | `PASS` | Schema checked with `validateMachineReadableReport`; no analyzer, HTML/CSS, preview, storage, history, or AI fields were included. |
| Browser-triggered Markdown and JSON downloads | User-triggered actions create sensible filenames and files can be inspected. | Not executed. | `BLOCKED` | No browser download surface. |
| Print report / browser print preview / PDF | Report opens from saved project, has usable layout and print-only behavior; preview opens; PDF is saved and inspected where supported. | Not executed; no preview, dialog, or PDF exists. | `BLOCKED` | No browser/native print surface. The application is not claimed to bundle a PDF generator. |

## Cross-format consistency

| Project example | Markdown | Print/PDF | Machine-readable | Cross-format consistency | Final status |
| --- | --- | --- | --- | --- | --- |
| Mostly passing | `PASS` supporting file inspection | `BLOCKED` | `PASS` supporting file/schema inspection | `BLOCKED` — print not observed | `BLOCKED` |
| Remediation | `PASS` supporting file inspection | `BLOCKED` | `PASS` supporting file/schema inspection | `BLOCKED` — print not observed | `BLOCKED` |
| Mixed restored copy | `PASS` supporting file inspection | `BLOCKED` | `PASS` supporting file/schema inspection | `BLOCKED` — print not observed | `BLOCKED` |

## Defect found and focused correction

- **Reproduction:** A saved-project report using the Production severity profile generated fractional weighted `earnedPoints`/`possiblePoints`. The serializer preserved valid decimals, but the machine-readable validator incorrectly required integers and rejected its own output.
- **Correction:** Kept status/progress fields as integer counts and validated weighted points as non-negative numbers. The schema wording now describes this profile-supported fractional-point contract.
- **After correction:** The remediation saved-project JSON generated, parsed, and schema-validated successfully; the focused test has 4 passing tests.

## Remaining manual verification

1. Launch the app in a current browser, create the three disposable saved projects above, and trigger Markdown and JSON downloads. Record filenames and inspect the downloaded files against the normalized facts above.
2. For each example, open **Print or save as PDF**, inspect print preview for section order, long notes, breaks/overlap, and print-only controls; select **Save as PDF**, save it, and inspect the actual PDF when supported.
3. Repeat cross-format comparisons for metadata/omissions, totals, scores, categories, issue IDs, notes, recommendations, and template wording. Keep the Phase 1 report-output checkbox unchecked until every browser-native step passes.
