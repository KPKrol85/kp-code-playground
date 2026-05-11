# KP_Code Digital Vault - CSS Design Token Systems

Ten folder produktu zawiera 40 gotowych do skopiowania systemów tokenów CSS dla projektów developerskich.
Każdy plik jest samodzielny i zawiera namespacowane CSS custom properties oraz warstwę podglądu komponentów w strukturze BEM.

## Dostępne zestawy tokenów

- `tokens-01.css` - Minimal Neutral (Serwisy redakcyjne, centra dokumentacji i portfolio osobiste)
- `tokens-02.css` - Modern SaaS (Dashboardy, onboarding i produkty subskrypcyjne)
- `tokens-03.css` - Premium Luxury (Landing page premium, butiki i produkty z dostępem na zaproszenie)
- `tokens-04.css` - Soft Friendly (Produkty społecznościowe, aplikacje wellness i lekkie narzędzia konsumenckie)
- `tokens-05.css` - High Contrast (Narzędzia publiczne, panele administracyjne i interfejsy wymagające wysokiej czytelności)
- `tokens-06.css` - Fintech Ledger (Dashboardy bankowe, narzędzia księgowe i produkty inwestycyjne)
- `tokens-07.css` - Health Care (Portale pacjenta, narzędzia kliniczne i produkty do monitorowania zdrowia)
- `tokens-08.css` - Developer Console (Produkty API, CLI, logi i dokumentacja techniczna)
- `tokens-09.css` - Creator Studio (Narzędzia medialne, dashboardy twórców i kreatory kampanii)
- `tokens-10.css` - Marketplace Commerce (Sklepy cyfrowe, katalogi produktów i procesy checkout)
- `tokens-11.css` - Education Platform (Platformy kursowe, dashboardy nauki i bazy wiedzy)
- `tokens-12.css` - Cyber Security (Dashboardy bezpieczeństwa, konsole SOC i narzędzia zarządzania ryzykiem)
- `tokens-13.css` - Data Analytics (Narzędzia BI, dashboardy raportowe i przestrzenie badawcze)
- `tokens-14.css` - Climate Tech (Dashboardy ESG, produkty energetyczne i raporty klimatyczne)
- `tokens-15.css` - Legal Enterprise (Legal SaaS, portale compliance i usługi profesjonalne)
- `tokens-16.css` - AI Workspace (Asystenci AI, narzędzia promptów i przestrzenie automatyzacji)
- `tokens-17.css` - Real Estate (Platformy nieruchomości, narzędzia rezerwacji i strony ofert premium)
- `tokens-18.css` - Gaming Interface (Launchery gier, profile graczy i dashboardy eventów)
- `tokens-19.css` - Nonprofit Civic (Strony nonprofit, programy publiczne i ścieżki darowizn)
- `tokens-20.css` - Productivity OS (Managery zadań, przestrzenie pracy i narzędzia operacyjne)
- `tokens-21.css` - Documentation Pro (Portale wiedzy, bazy pomocy i dokumentacja produktów B2B)
- `tokens-22.css` - SaaS Control (Panele kontroli, settings pages i narzędzia administracyjne SaaS)
- `tokens-23.css` - Luxury Editorial (Magazyny premium, lookbooki i strony marek osobistych)
- `tokens-24.css` - Community Care (Aplikacje społecznościowe, profile użytkowników i lekkie feedy)
- `tokens-25.css` - Accessible Utility (Formularze publiczne, procesy wniosków i narzędzia samoobsługowe)
- `tokens-26.css` - Finance Operations (Backoffice finansowy, rozliczenia, faktury i widoki statusów płatności)
- `tokens-27.css` - Clinic Portal (Panele placówek medycznych, grafiki wizyt i karty pacjenta)
- `tokens-28.css` - API Reference (Dokumentacja API, przykłady kodu i eksploratory endpointów)
- `tokens-29.css` - Campaign Builder (Kreatory kampanii, kalendarze contentu i panele publikacji)
- `tokens-30.css` - Checkout Flow (Koszyki, płatności, formularze dostawy i potwierdzenia zamówień)
- `tokens-31.css` - Learning Academy (Akademie online, ścieżki nauki i strony modułów kursowych)
- `tokens-32.css` - Threat Monitor (Monitoring zagrożeń, widoki incydentów i listy alertów operacyjnych)
- `tokens-33.css` - Insights Hub (Centra insightów, dashboardy zespołowe i widoki KPI dla zarządu)
- `tokens-34.css` - Energy Grid (Panele energii, mapy zużycia, raporty produkcji i prognozy zasobów)
- `tokens-35.css` - Compliance Desk (Centra compliance, listy audytowe i workflow zatwierdzania dokumentów)
- `tokens-36.css` - Prompt Studio (Edytory promptów, biblioteki automatyzacji i testy wariantów AI)
- `tokens-37.css` - Property CRM (CRM agentów, pipeline sprzedaży, kontakty klientów i statusy ofert)
- `tokens-38.css` - Esports Arena (Turnieje, rankingi, profile drużyn i strony wydarzeń esportowych)
- `tokens-39.css` - Donation Platform (Platformy darowizn, kampanie społeczne i strony zbiórek)
- `tokens-40.css` - Focus Planner (Planery dnia, focus time, widoki priorytetów i lekkie narzędzia pracy)

## Struktura tokenów

Każdy plik `tokens-xx.css` zawiera:

1. Prymitywy kolorów pod `--dt-color-*`
2. Tokeny typografii pod `--dt-font-*`, `--dt-text-*` i `--dt-leading-*`
3. Tokeny odstępów od `--dt-space-1` do `--dt-space-8`
4. Tokeny zaokrągleń, cieni, układu i ruchu
5. Profesjonalne klasy demo w BEM:
   - `.dt-preview`
   - `.dt-preview__title`
   - `.dt-button`
   - `.dt-button--primary`
   - `.dt-card`
   - `.dt-metric`
   - `.dt-scale__swatch`

## Użycie

Zaimportuj jeden plik tokenów przed stylami komponentów:

```html
<link rel="stylesheet" href="./design-tokens/tokens-02.css" />
<link rel="stylesheet" href="./styles/components.css" />
```

Możesz też skopiować CSS bezpośrednio z panelu w `index.html`.
Panel ma przełącznik `Light` / `Dark`, który zapisuje wybór użytkownika w `localStorage`.

## Rekomendowany workflow

1. Wybierz zestaw tokenów dopasowany do kategorii produktu.
2. Mapuj komponenty aplikacji na zmienne `--dt-*`.
3. Traktuj klasy BEM z podglądu jako wskazówkę do projektowania API komponentów.
4. Zmieniaj pliki tokenów, gdy potrzebujesz innego kierunku wizualnego.

## Utrzymanie

Źródłem prawdy jest `scripts/build-tokens.js`.
Po edycji danych tokenów uruchom generator:

```bash
node scripts/build-tokens.js
```
