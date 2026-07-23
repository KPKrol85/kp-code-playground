# Consented usability-session plan — Phase 2

## Status and safeguards

This is a **prepared plan, not session evidence**. No participant has been recruited, consented, observed, or recorded in this environment. Run sessions only after voluntary informed consent. Use the local fixtures in `tests/fixtures/validation/` and invented audit metadata; never use personal, client, confidential, production, pasted source, or saved browser data.

Tell each participant: Layout Lens is browser-local; the facilitator will not collect project content, pasted HTML/CSS, browser storage, or account data. Record only consented task observations and de-identified notes. Participation is optional, can stop at any time without explanation, and has no effect on access to the product.

## Participants and format

- **Profile:** 5–7 people across frontend developers, designers/content practitioners, and QA/accessibility reviewers; include at least two who have not used Layout Lens. Recruit assistive-technology and keyboard users where feasible; do not represent this as accessibility conformance testing.
- **Length:** 45–60 minutes: 5-minute consent/context, 35–45 minutes task observation, 5–10 minutes questions.
- **Setup:** current desktop browser in a disposable profile, local static server, keyboard and a pointing device. Offer a participant's own assistive technology, breaks, zoom, reduced motion, extra time, and an accessible communication method.
- **Moderator stance:** do not teach the intended workflow before a task; use neutral prompts (“What are you looking for?”), avoid correcting errors, and distinguish observed behavior from participant opinion. Stop if sensitive material is entered.

## Task scenarios and success criteria

Use a safe, prefilled manual audit with one **Needs work** rule and a short invented note where a task needs existing state.

| Scenario | Participant task | Success criteria | Friction indicators |
| --- | --- | --- | --- |
| Manual audit | Select a relevant preset/rule pack, filter to an accessibility rule, set a status, and add a reviewer note. | Participant can explain that answers are human-reviewed and find/filter/update a rule without moderator navigation. | Confuses analyzer results with manual score; loses rule/filter state; cannot find notes. |
| Report and Markdown | Generate the appropriate report template, inspect its manual-only scope, download Markdown, and identify the print/Save as PDF route. | Selects an output intentionally and recognizes that analyzer/AI content is not manual confirmation. | Expects automatic PDF, cannot locate download, believes static findings changed score. |
| Saved projects | Create an explicitly named project, reopen it, update it, inspect history, and duplicate/version it if controls are present. | Understands named project vs automatic draft; restores expected manual state; duplicate is recognized as separate. | Surprise at browser-local storage, unclear update/duplicate meaning, lost-state fear, destructive-action confusion. |
| Privacy and local storage | Explain where the project is stored and what is not retained; optionally inspect the AI-handoff screen if present. | States that storage is browser-local and analyzer source/AI content are not silently saved; AI handoff is manual/external/session-only. | Assumes cloud sync, account, upload, or that pasted source enters saved project. |

## Moderator procedure

1. Read the consent and privacy statement; obtain and log an explicit yes/no without identity details in the observation sheet.
2. Confirm the disposable profile and safe sample are loaded. Invite think-aloud, but do not require it.
3. Present scenarios one at a time. Read only the task text. Use scripted neutral recovery prompts after 60 seconds.
4. Record completion, time band, errors, quotes/paraphrases, observed accessibility barriers, and whether help was requested. Do not capture content from other tabs, browser history, or storage.
5. Ask post-session questions, thank the participant, offer deletion of their de-identified session note where applicable, and document any withdrawal.

## Post-session questions

1. What did you think was included in the manual score and report?
2. What did you think happened to a named project, the automatic draft, and pasted source?
3. Which wording, evidence, confidence label, or action felt unclear?
4. What would make you hesitate before downloading, printing, updating, duplicating, or deleting?
5. Were keyboard, zoom, motion, labels, focus, timing, or assistive-technology interactions difficult?

## De-identified evidence template

| Session code / consent | Profile and access needs volunteered | Scenario | Complete / help / incomplete | Time band | Observation or paraphrase | Severity candidate | Follow-up artifact |
| --- | --- | --- | --- | --- | --- | --- | --- |
| P-01 / yes | e.g., frontend developer; keyboard user | Saved projects |  | under 2m / 2–5m / over 5m |  |  | screenshot only with consent; otherwise none |

Keep consent records separately from the de-identified table. Do not include names, email addresses, client names, URLs, raw source, browser-storage dumps, or screen/video recordings without explicit separate consent.

## Prioritization after actual sessions

Only prioritize observed, consented evidence. Classify **Critical** when correct use is prevented or results are materially misleading; **High** for repeated core-flow failure, inaccessible interaction, or repeated analyzer misunderstanding; **Medium** for meaningful friction or unclear evidence; **Low** for minor wording/presentation/convenience. For every candidate, record participant count (without identity), scenario, observation, affected area, narrow proposed correction, regression risk, and a verification task. Do not mark the Phase 2 usability roadmap item complete until actual sessions and this evidence table are recorded.
