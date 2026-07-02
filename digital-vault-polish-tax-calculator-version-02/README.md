# Kalkulator podatkowy PL

Statyczny kalkulator wynagrodzeń dla projektu **KP_Code Digital Vault**. Aplikacja pomaga orientacyjnie porównać wyniki brutto/netto, koszt pracodawcy oraz wybrane formy zatrudnienia i współpracy w Polsce.

> **Status bezpieczeństwa:** kalkulator jest narzędziem szacunkowym. Stałe podatkowe i składkowe w `js/tax-config.js` wymagają oficjalnej weryfikacji przed traktowaniem projektu jako gotowego do publicznego lub produkcyjnego wydania. Wyniki nie stanowią porady prawnej, podatkowej, księgowej ani finansowej.

## Project overview

Celem projektu jest utrzymanie lekkiej, audytowalnej aplikacji bez frameworka i bez backendu. Najważniejsza zasada utrzymaniowa: obliczenia mają pozostać możliwe do prześledzenia w kodzie, a wszystkie stawki, progi, założenia i metadane podatkowe mają być scentralizowane.

Aplikacja działa w przeglądarce jako statyczny HTML/CSS/JavaScript. Dane kalkulacji nie są wysyłane na serwer; historia i preferencja motywu są przechowywane lokalnie w `localStorage`.

## What the calculator does

- Liczy **brutto → netto** dla obsługiwanych typów umów/współpracy.
- Szuka przybliżonej kwoty **netto → brutto** metodą iteracyjną.
- Pokazuje wartości miesięczne i roczne w uproszczonym modelu x12.
- Pokazuje składniki wyniku, w tym obciążenia i — dla umowy o pracę — szacunkowy koszt pracodawcy.
- Porównuje sześć typów umów/współpracy w tabeli porównawczej.
- Renderuje panel założeń, ograniczeń, metadanych modelu i statusu weryfikacji.
- Obsługuje szybkie scenariusze, drukowanie/kopiowanie podsumowania, historię lokalną oraz motyw light/dark/system.
- Udostępnia regresyjne testy obliczeń uruchamiane w Node.js.

## What it intentionally does not do

- Nie udziela porad prawnych, podatkowych, księgowych ani finansowych.
- Nie potwierdza kwalifikacji prawnej wybranej formy współpracy.
- Nie zastępuje oficjalnej weryfikacji stawek, limitów, progów i zasad ZUS/PIT/VAT.
- Nie modeluje pełnych rozliczeń rocznych, nieregularnych dochodów ani miesiąc-po-miesiącu przekraczania progów.
- Nie obejmuje indywidualnych ulg, odliczeń, limitów i wyjątków poza opcjami faktycznie wdrożonymi w formularzu.
- Nie modeluje kosztów działalności, kosztów księgowości, płatnego urlopu, chorobowego, ubezpieczeń ani pełnej klasyfikacji ryczałtu dla B2B.
- Nie uwzględnia przepływów VAT w wyniku netto; status VAT jest obecnie informacyjny.
- Nie ma backendu, kont użytkowników, analityki, bazy danych, frameworka ani build pipeline.

## Static architecture / file structure

| File | Responsibility |
|---|---|
| `index.html` | Statyczny układ aplikacji, semantyczne sekcje, formularz, wyniki, tabela porównania, historia. |
| `css/style.css` | Style aplikacji, responsywność, motywy, focus states, reduced motion i reguły druku. |
| `js/tax-config.js` | **Centralne źródło prawdy** dla stawek, progów, założeń, ograniczeń, metadanych i statusu weryfikacji modelu. |
| `js/calculations.js` | Logika obliczeń, net-to-gross, koszt pracodawcy, porównanie typów i kształtowanie okresów; moduł bez zależności od DOM. |
| `js/utils.js` | Formatowanie walut, parsowanie liczb i pomocnicze funkcje numeryczne. |
| `js/ui-config.js` | Etykiety UI, nazwy typów, etykiety okresów/kierunków i szybkie scenariusze; bez formuł podatkowych. |
| `js/theme.js` | Motyw light/dark/system i zapis preferencji w `localStorage`. |
| `js/history.js` | Lokalna historia kalkulacji w `localStorage`, limitowana do 8 wpisów. |
| `js/main.js` | Orkiestracja UI: stan formularza, zdarzenia, walidacja, render wyników, ostrzeżeń, historii, druku i kopiowania. |
| `test/calculations.test.js` | Regresyjne testy obecnego uproszczonego modelu obliczeń. |
| `docs/tax-verification-checklist.md` | Oficjalno-źródłowy workflow weryfikacji stałych i założeń podatkowych. |
| `docs/manual-qa.md` | Manualna lista kontroli dla przeglądarki, dostępności, historii, motywów i scenariuszy. |
| `docs/release-checklist.md` | Release-readiness checklist i decyzja wydania. |

## Local run instructions

Aplikacja nie wymaga instalacji zależności do samego uruchomienia w przeglądarce. Ze względu na moduły ES (`type="module"`) najbezpieczniej uruchomić lokalny serwer statyczny z katalogu projektu:

```bash
cd digital-vault-polish-tax-calculator-version-02
python3 -m http.server 8000
```

Następnie otwórz:

```text
http://localhost:8000/
```

Alternatywnie można użyć dowolnego prostego serwera statycznego. Nie dodawaj frameworka ani build pipeline tylko po to, aby uruchomić aplikację.

## Testing command

Projekt używa wbudowanego runnera Node.js. Istniejący skrypt z `package.json` to:

```bash
npm test
```

Zakres testów obejmuje reprezentatywne regresje dla sześciu typów umów/współpracy, net-to-gross z tolerancją, koszt pracodawcy, miesięczne/roczne kształtowanie wyników, porównanie oraz wybrane opcje formularza. Przejście testów oznacza, że obecne uproszczone formuły nie zmieniły się przypadkowo; nie oznacza oficjalnej poprawności podatkowej.

## Feature matrix

| Typ | Brutto → netto | Netto → brutto | PIT-2 | Under-26 | KUP | ZUS / B2B | Employer cost | Notes |
|---|---:|---:|---:|---:|---|---|---:|---|
| Employment contract / UoP | Yes | Approximate | Yes | Simplified | Standard/increased | Employee + employer contributions from config | Yes | PPK worker contribution option is available. |
| Mandate contract / zlecenie | Yes | Approximate | Yes | Simplified | Fixed 20% in model | Simplified mandate social/health rates | No | Some global options are ignored when not applicable. |
| Specific work contract / dzieło | Yes | Approximate | Yes | Simplified in current model | 20% or 50% | No social/health in model | No | 50% KUP depends on real-world eligibility not verified by the app. |
| B2B scale | Yes | Approximate | Simplified | Ignored | Business expenses not modeled | Preset or custom ZUS | No | PIT scale model with simplified health/ZUS assumptions. |
| B2B linear | Yes | Approximate | Ignored | Ignored | Business expenses not modeled | Preset or custom ZUS | No | Linear PIT model; VAT flag remains informational. |
| B2B lump sum | Yes | Approximate | Ignored | Ignored | Not applicable | Preset or custom ZUS | No | Uses configured default lump-sum rate; no PKD/service classification. |

## Calculation model notes

- Input is normalized to a monthly amount for calculation. Yearly input is divided by 12 before calculation and displayed back as monthly/yearly values.
- Net-to-gross uses binary search in `js/calculations.js` with default max iterations and precision defined by the function signature; it is approximate, not an exact solver.
- Comparison recalculates all supported types for the same amount, direction and shared form settings. Options that do not apply to a given model may be disabled, ignored or informational according to `OPTION_APPLICABILITY`.
- Employer cost is directly modeled for employment contract only. Other contract and B2B rows do not have an equivalent full employer-cost model.
- Print/copy summaries are generated only after a valid calculation and include assumptions, limitations and disclaimer context.

## Tax-rule metadata and assumptions

`js/tax-config.js` contains:

- `metadata.taxYear`
- `metadata.lastReviewed`
- `metadata.verificationStatus`
- `metadata.sourceStatus`
- model assumptions and limitations
- disclaimer text
- rates, thresholds, contribution rates, B2B presets and lump-sum defaults
- option applicability rules

Current metadata targets tax year `2026`, but the app explicitly marks constants as requiring official-source verification. Update metadata only when the verification checklist supports the new status.

## Central tax config rule

Tax rates, thresholds, contribution values, assumptions, notes and metadata **must live in `js/tax-config.js`**. Do not duplicate tax values in README, UI code, tests or docs unless the value is a non-calculation label, a regression expectation, or an explicitly documented example. If a value changes, update the central config first, then update tests and docs that intentionally reference the changed behavior.

## Limitations and examples

- **Simplified B2B model:** no business expenses, accounting costs, paid leave, sick leave, insurance, VAT cash flow, full health-contribution rules, annual ZUS limits or full lump-sum classification.
- **No individual reliefs beyond implemented options:** the app does not model spouse filing, children relief, donations, IP Box, relocation relief or other individual cases unless explicitly implemented.
- **Simplified monthly/yearly handling:** yearly input is simplified to monthly x12; irregular revenue and cumulative payroll effects are outside scope.
- **Approximate net-to-gross search:** reverse calculation returns a close estimate within algorithmic tolerance, not a guaranteed exact gross amount.
- **VAT informational behavior:** the B2B VAT checkbox documents status only and does not change net result in the current app.
- **Official verification status:** constants and contribution assumptions are not marked as officially verified; see `docs/tax-verification-checklist.md` before release.

## Documentation map

- `README.md` — operating manual: architecture, run/test commands, feature matrix, assumptions, limitations and release gates.
- `docs/tax-verification-checklist.md` — official-source audit checklist for constants, assumptions and metadata.
- `docs/manual-qa.md` — manual browser QA checklist covering contracts, directions, periods, invalid inputs, accessibility, mobile, theme and history.
- `docs/release-checklist.md` — release-readiness checklist with reviewer fields and ready/blocked decision.

## Safe release note

Block release if any of the following is true:

- Tax constants or tax-rule metadata are not verified or honestly labeled.
- `npm test` fails.
- Assumptions, limitations or disclaimer are missing from the UI or README.
- Manual QA, keyboard flow, screen-reader semantics, mobile layout or reduced-motion checks are incomplete.
- Tax values are duplicated outside `js/tax-config.js` without a clear non-calculation reason.
- The app is described as legal, tax, accounting or financial advice.
