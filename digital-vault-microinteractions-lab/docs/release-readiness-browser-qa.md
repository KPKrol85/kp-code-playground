# Release-readiness browser QA checklist

## Scope and recording rules

This is the repeatable manual browser checklist for the first Phase 1 roadmap item. It documents checks to perform; it does **not** record completed browser QA. Start every row at **Not run**, replace that status only after executing the stated steps, and attach the browser/version, operating system, date, and a screenshot or console capture in **Evidence / notes**.

Run the application by opening `index.html` with JavaScript enabled. Keep DevTools Console open and preserve the log while executing the functional checks. This static app has no configured browser-support matrix, so this checklist deliberately does not prescribe one.

### Reference data used by this checklist

The catalogue has 32 interactions. The initial selection is **Magnetic CTA Button**. The filter controls expose the following values:

- **Kategoria:** Wszystkie, Feedback (8), Nawigacja (4), Formularze (4), Przyciski (5), Karty (4), Ładowanie (2), Onboarding (0), Dashboard (3), E-commerce (0), Empty states (2).
- **Złożoność:** Wszystkie, Podstawowy (16), Średni (14), Zaawansowany (2).
- **Poziom ruchu:** Wszystkie, Bez ruchu (5), Subtelny (18), Średni (9), Ekspresyjny (0).

The counts in parentheses are expected result counts when that value is used by itself with an empty search and the other selects at **Wszystkie**. A zero is a valid no-results case for the current taxonomy option; it is not a test failure.

### Result-status key

Use one of: **Not run** (default), **Pass**, **Fail**, or **Blocked**. Every row has a status and evidence field so results can be recorded without changing the test wording.

## Functional browser checks

| ID | Setup / precondition | Exact manual steps | Expected result | Result status | Evidence / notes |
| --- | --- | --- | --- | --- | --- |
| F-01 Initial render and console | Start from a fresh page load with JavaScript enabled; clear Console. | 1. Load `index.html`. 2. Wait until the catalogue replaces “Ładowanie biblioteki…”. 3. Inspect the Console without interacting. | The result text says `Znaleziono 32 interakcje z 32.`; 32 cards are present; **Magnetic CTA Button** is selected; its preview and HTML snippet are shown. No unexpected Console errors or warnings appear. | Not run |  |
| F-02 Search matching | Fresh loaded state: all selects are **Wszystkie**, search empty. | 1. Enter `magnetic` in **Szukaj interakcji**. 2. Observe the results. 3. Replace it with `przyciski`. 4. Replace it with `nieistniejacy-qa-2026`. | `magnetic` finds **Magnetic CTA Button**; `przyciski` finds the five button-category interactions because search includes the Polish category label; the final phrase produces the textual no-results state and `Brak wyników dla wybranych filtrów.` | Not run |  |
| F-03 Category filter, each value | Fresh loaded state; search empty; complexity and motion are **Wszystkie**. | In **Kategoria**, select each option in this order: Feedback, Nawigacja, Formularze, Przyciski, Karty, Ładowanie, Onboarding, Dashboard, E-commerce, Empty states, then Wszystkie. | Result counts follow the reference-data order: 8, 4, 4, 5, 4, 2, 0, 3, 0, 2, then 32. Each nonzero result shows only cards whose category badge matches the selected label; zero values show the empty state. | Not run |  |
| F-04 Complexity filter, each value | Fresh loaded state; search empty; category and motion are **Wszystkie**. | In **Złożoność**, select Podstawowy, Średni, Zaawansowany, then Wszystkie. | Result counts are 16, 14, 2, then 32. Each visible card has the selected complexity badge. | Not run |  |
| F-05 Motion filter, each value | Fresh loaded state; search empty; category and complexity are **Wszystkie**. | In **Poziom ruchu**, select Bez ruchu, Subtelny, Średni, Ekspresyjny, then Wszystkie. | Result counts are 5, 18, 9, 0, then 32. Each nonzero result has the selected motion badge; **Ekspresyjny** correctly shows the empty state. | Not run |  |
| F-06 Representative combined filters | Fresh loaded state; search empty. Reset between scenarios with **Reset filtrów**. | 1. Select Feedback + Średni + Subtelny. 2. Reset. 3. Select Formularze + Podstawowy + Bez ruchu. 4. Reset. 5. Enter `skeleton`, select Ładowanie + Podstawowy + Średni. | Scenario 1 returns 4; scenario 2 returns 1 (**Inline Form Error**); scenario 3 returns 2. All cards meet every active criterion, and the current selected card is the first matching result if the former selection is excluded. | Not run |  |
| F-07 All applicable filters active | Fresh loaded state; search empty. | 1. Enter `ripple`. 2. Select Przyciski, Zaawansowany, and Średni. | Search plus all three filters returns exactly 1 card, **Ripple Feedback Button**. Its card becomes selected, preview updates to that interaction, and the code panel displays its active-tab snippet. | Not run |  |
| F-08 Reset paths | Begin with a nonempty filtered state, such as F-07. | 1. Click **Reset filtrów**. 2. Recreate a zero-result state by entering `nieistniejacy-qa-2026`. 3. Click the empty-state **Wyczyść filtry** button. | Each reset clears search and restores all selects to **Wszystkie**, 32 cards, and no empty state. The selected interaction remains the currently selected valid item or is reconciled to a visible result; no stale no-result preview remains. | Not run |  |
| F-09 Selected-card changes | Fresh loaded state; Console remains visible. | 1. Click the selectable content area of **Soft Glow Button**. 2. Click **Toast Feedback**. | The selected card receives the selected treatment and `Wybrany wzorzec`; its select button has `aria-pressed="true"`; the previous card is unselected. Preview name, description, metadata, best-use and accessibility text update to the selected interaction. A `Podgląd został zaktualizowany.` success toast appears. No unexpected Console error occurs. | Not run |  |
| F-10 No-results preview and code | Fresh loaded state. | 1. Enter `nieistniejacy-qa-2026`. 2. Inspect the grid area, preview, code output, and **Kopiuj aktywny**. 3. Click **Kopiuj aktywny**. | The grid is hidden and the textual empty state is visible. Preview says `Brak wzorca do podglądu` and explains there is no preview; code output says `// Brak snippetu: aktualne filtry nie zwracają żadnego wzorca.` Clicking copy shows `Brak wzorca do skopiowania. Wyczyść filtry lub wybierz wynik.` | Not run |  |
| F-11 Preview controls | Fresh loaded state, then select **Tabs Indicator**. | 1. In the large preview, click **Code**, then **Audit**. 2. Select **Accordion Reveal** and use its summary to close and reopen it. 3. Select **Tooltip Hint** and hover it, then focus it. | Preview tabs update their `aria-selected` state so only the clicked tab is `true`. The accordion opens and closes with its content available when open. Tooltip Hint exposes its text hint on hover/focus. These controls affect the preview only; selecting a new card replaces the preview. | Not run |  |
| F-12 Code tabs | Fresh loaded state with **Magnetic CTA Button** selected. | 1. Click HTML, CSS, then JS in the snippet tablist. 2. Select **Inline Form Error**. 3. Click JS. | The clicked code tab is visually active and has `aria-selected="true"`; code output changes to the selected interaction’s matching snippet. For **Inline Form Error**, JS displays `// Ten wzorzec nie wymaga dodatkowego JavaScriptu.` | Not run |  |
| F-13 Clipboard API copy success | Use a secure context where `navigator.clipboard` is available and permitted; select **Magnetic CTA Button**; provide an external plain-text destination for paste verification. | 1. Click **Kopiuj aktywny** on HTML. 2. Paste into the destination. 3. Click CSS, then **Kopiuj aktywny**, and paste again. 4. Click the card-level **Kopiuj HTML** and paste again. | Each destination contains the matching displayed snippet. Each successful action shows `Skopiowano HTML dla: Magnetic CTA Button.` or `Skopiowano CSS dla: Magnetic CTA Button.` as applicable. | Not run |  |
| F-14 Copy failure and fallback guidance | Use the Clipboard-failure preparation below; do not treat this setup as executed until its method is documented in Evidence / notes. | 1. Select any interaction with HTML. 2. Trigger a copy attempt while the configured API/fallback failure is active. 3. Repeat with **Kopiuj aktywny** and a card-level copy button. | Each failed attempt shows `Nie udało się skopiować. Zaznacz kod ręcznie.` The visible code remains available for manual selection. If Clipboard API is unavailable but `document.execCommand('copy')` succeeds, the operation instead follows the normal success message; record which path occurred. | Not run |  |
| F-15 Final unexpected-console-error sweep | Complete F-02 through F-14 in one browser session; preserve Console output. | 1. Clear Console before the sweep. 2. Exercise search, all select controls, reset buttons, card selection, preview controls, code tabs, and each copy path that can be set up. 3. Inspect Console after the final action. | No unexpected uncaught exceptions, rejected-promise errors, or other application errors are present. Record any warning/error verbatim with its triggering action; do not mark Pass if one is unexplained. | Not run |  |

## Remaining Phase 1 manual-check preparation — NOT RUN

The following preparations are intentionally separated from the functional checklist. They define future manual review work and must remain **Not run** until someone completes a real browser review and attaches evidence.

### Keyboard-only navigation preparation — NOT RUN

| ID | Setup / precondition | Exact manual steps | Expected result | Result status | Evidence / notes |
| --- | --- | --- | --- | --- | --- |
| K-01 Keyboard route | A real browser; mouse/touchpad unused after loading; Console open. | 1. Reload. 2. Use Tab/Shift+Tab, Enter, and Space only. 3. Exercise the skip link, theme toggle, search and three selects, reset button, a card select button, preview controls, HTML/CSS/JS tabs, and copy controls. | A future reviewer can record logical focus order, activation behavior, and any focus loss. The scope is limited to these existing controls. | Not run |  |

### Viewport review preparation — NOT RUN

| ID | Setup / precondition | Exact manual steps | Expected result | Result status | Evidence / notes |
| --- | --- | --- | --- | --- | --- |
| V-01 Narrow viewport | Browser responsive-design mode available. | Set viewport width to **480px**; load the page; inspect header, filters, cards, preview/code layout, tabs, empty state, and toast. | Future review captures layout, clipping, overflow, and control usability at the documented 480px breakpoint. | Not run |  |
| V-02 Medium viewport | Browser responsive-design mode available. | Set viewport width to **760px**; repeat V-01 inspection. | Future review captures the same evidence at the documented 760px breakpoint. | Not run |  |
| V-03 Wide viewport | Browser responsive-design mode available. | Set viewport width to **1024px**; repeat V-01 inspection. | Future review captures the same evidence at the documented 1024px breakpoint. | Not run |  |

### Reduced-motion preparation — NOT RUN

| ID | Setup / precondition | Exact manual steps | Expected result | Result status | Evidence / notes |
| --- | --- | --- | --- | --- | --- |
| M-01 Reduced motion | Browser/OS can emulate or enable `prefers-reduced-motion: reduce`. | Enable reduced motion; reload; inspect focus, selected-card feedback, loading/skeleton, status, and representative medium-motion previews such as Magnetic CTA Button and Skeleton Profile Card. | Future review records whether essential state information remains understandable without relying on animation. | Not run |  |

### Contrast and focus visibility in both themes preparation — NOT RUN

| ID | Setup / precondition | Exact manual steps | Expected result | Result status | Evidence / notes |
| --- | --- | --- | --- | --- | --- |
| A-01 Light theme | Use a real browser and a chosen contrast-review method; select the light theme. | Review text, badges, controls, selected cards, error/success toast, and keyboard focus indicators in light theme. | Future review records measured/observed contrast and focus findings; this document makes no conformance claim. | Not run |  |
| A-02 Dark theme | Use the same method; toggle to dark theme. | Repeat A-01 in dark theme. | Future review records measured/observed contrast and focus findings in dark theme. | Not run |  |

### Clipboard API failure and fallback preparation — NOT RUN

| ID | Setup / precondition | Exact manual steps | Expected result | Result status | Evidence / notes |
| --- | --- | --- | --- | --- | --- |
| C-01 Clipboard paths | Choose and document a browser-supported way to test: (a) Clipboard API permitted, (b) Clipboard API absent/unavailable with legacy selection copy available, and (c) both paths failing. Do not alter product code to simulate these paths. | For each available environment, select an interaction, use **Kopiuj aktywny**, paste into a plain-text destination, and capture the toast plus Console output. | Future review distinguishes successful Clipboard API copy, successful selection-based fallback, and the manual-selection guidance shown when copying fails. | Not run |  |
