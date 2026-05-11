# KP_Code Digital Vault - CSS Design Token Systems

Ten folder produktu zawiera 20 gotowych do skopiowania systemów tokenów CSS dla projektów developerskich.
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
