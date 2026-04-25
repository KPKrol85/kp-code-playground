# Simple Premium Landing Starter Pack

Profesjonalny zestaw 4 statycznych szablonów landing page, przygotowany jako szybki punkt startowy dla stron usługowych, ofertowych i produktowych.

## Co zawiera pakiet

- 4 kompletne warianty landing page (Base, Business, Creative, Professional)
- spójny układ sekcji i architektura plików
- lokalne pliki HTML, CSS i JavaScript bez zależności zewnętrznych
- gotowe treści po polsku, które można łatwo podmienić pod własną markę

## Warianty

### 1) Base
Neutralny, elastyczny szablon startowy do uniwersalnych zastosowań.

### 2) Business
Wariant nastawiony na wiarygodność, usługi i komunikację biznesową.

### 3) Creative
Nowocześniejszy, bardziej ekspresyjny styl dla twórców i małych studiów.

### 4) Professional
Spokojny, premium układ skoncentrowany na ekspertyzie i jakości.

## Rekomendowane zastosowania

- **Base:** szybkie MVP landing page, ogólne strony ofertowe, małe kampanie CTA.
- **Business:** firmy usługowe, konsultanci, agencje, lokalne biznesy.
- **Creative:** portfolio ofertowe, launch produktu cyfrowego, studio kreatywne.
- **Professional:** eksperci B2B, marki osobiste premium, usługi wysokiej wartości.

## Stack techniczny

- HTML5
- CSS (mobile-first, design tokens, BEM)
- Vanilla JavaScript (progresywne ulepszenia)
- Brak frameworków i brak zewnętrznych zależności

## Jak uruchomić lokalnie

### Opcja 1: bez serwera
1. Otwórz wybrany plik `index.html` bezpośrednio w przeglądarce, np.:
   - `simple-premium-landing-starter-pack/base/index.html`

### Opcja 2: prosty serwer lokalny (opcjonalnie)
1. Wejdź do katalogu projektu.
2. Uruchom prosty serwer statyczny (np. `python -m http.server`).
3. Otwórz odpowiedni adres i wybrany wariant.

## Jak dostosować szablon

- **Treści:** edytuj nagłówki, leady, CTA, ceny i FAQ w `index.html`.
- **Kolory i styl:** zmień tokeny CSS w sekcji `:root` w `css/style.css`.
- **Rytm i spacing:** dostosuj zmienne odstępów (`--space-*`) i kontenery.
- **Sekcje:** dodawaj/usuwaj bloki `section` bez naruszania semantyki.
- **Linki CTA:** podmień odnośniki `href` pod właściwe ścieżki kontaktowe.

## Notatki jakościowe

- **Dostępność:** skip link, semantyczne landmarki, widoczne focus states, obsługa klawiatury.
- **SEO basics:** unikalne `<title>`, meta description, logiczna hierarchia nagłówków.
- **Wydajność:** zero zewnętrznych requestów, brak obrazów i bibliotek.
- **Responsywność:** układ mobile-first z grid/flex i breakpointami.
- **Reduced motion:** wsparcie `prefers-reduced-motion` w CSS i lekkie interakcje.

## Wdrożenie

- Pakiet nadaje się do hostingu statycznego (np. Netlify, GitHub Pages, Cloudflare Pages).
- Możesz opublikować cały pakiet lub tylko jeden wybrany folder wariantu.
- Każdy wariant działa samodzielnie jako niezależny landing page.

## Licencja / użycie

Szablony możesz swobodnie dostosować do własnych projektów komercyjnych i prywatnych. Przed dalszą dystrybucją dostosuj zasady do swojej polityki produktu.

---

KP_Code Digital Vault — praktyczne zasoby cyfrowe dla lepszych stron internetowych.
