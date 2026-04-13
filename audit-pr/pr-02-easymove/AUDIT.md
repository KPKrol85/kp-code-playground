# Easy Move — audyt techniczny repozytorium

## 1. Krótka ocena całościowa
Projekt to przejrzysty, wielostronicowy statyczny front-end ze spójną strukturą semantyczną, reużywalnymi modułami JS i zdefiniowanym pipeline’em builda. Główne ryzyka dotyczą obecnie głównie spójności strategii URL przy wdrożeniu (czyste URL-e w plikach SEO vs artefakty wyjściowe `.html`).

## 2. Mocne strony
- Istnieje czytelny i deterministyczny pipeline builda: minifikacja CSS, minifikacja JS, rozwiązywanie include’ów partiali oraz kopiowanie assetów/plików statycznych (`scripts/build.mjs:30-61`).
- Bazowe metadane SEO są obecne na wszystkich kluczowych stronach (title, description, canonical, OG, Twitter) (przykład: `index.html:6-19`, `kontakt.html:6-19`, `uslugi.html:6-19`).
- Podstawy dostępności obejmują skip link oraz widoczne style fokusu klawiatury (`index.html:56`, `css/base.css:59-78`).
- Nawigacja i menu mobilne zawierają jawne aktualizacje stanu ARIA oraz obsługę Escape/focus-trap dla klawiatury (`js/modules/menu.js:31-111`).
- Preferencje dotyczące ruchu (motion) są respektowane w CSS i JS (`css/base.css:102-105`, `css/components.css:227-231`, `js/modules/reveal.js:5-10`).
- Pola formularza zawierają etykiety, stan wymagania i docelowe miejsca na błędy per pole (`kontakt.html:155-227`).

## 3. P0 — Ryzyka krytyczne
nie wykryto.

## 4. P1 — Ważne problemy warte naprawy w następnej kolejności
1. **✅ [RESOLVED] Formularz nie symuluje już sukcesu bez transportu**  
   - Status: wdrożono uczciwy flow submit: walidacja klienta + stan „wysyłanie” + sukces tylko po `response.ok` z realnego endpointu; przy braku endpointu formularz pokazuje jawny błąd konfiguracji i nie zgłasza sukcesu (`js/modules/form.js`, `kontakt.html`).

2. **✅ [RESOLVED] Strategia URL jest spójna z artefaktami builda i SEO**  
   - Status: projekt przyjął jawną strategię URL opartą o pliki `.html` (poza `/` dla strony głównej).  
   - Dowód: canonical + `og:url` i `WebPage.url` wskazują na realne ścieżki `.html` (`kontakt.html`, `uslugi.html`, `o-nas.html`, `faq.html`, `cennik.html`, `przeprowadzki-firm.html`, `cookies.html`, `polityka-prywatnosci.html`).  
   - Dowód: `sitemap.xml` wskazuje te same URL-e `.html` dla podstron (`sitemap.xml:7-23`).  
   - Dowód: README dokumentuje przyjętą strategię deploymentową i jej wpływ na metadane SEO (`README.md`, sekcje „Build produkcyjny” / „Production Build”).

3. **✅ [RESOLVED] Treść zgody linkuje polityki bezpośrednio w kontekście formularza**  
   - Status: checkbox zgody nadal jest poprawnie powiązany z etykietą, a w samej treści zgody dodano bezpośrednie linki do `Polityki prywatności` i `Polityki cookies` (`kontakt.html`).  
   - Dowód: linki są klikalne i dostępne z klawiatury dokładnie w punkcie podejmowania decyzji; zachowano też czytelność wizualną przez drobne style dla sekcji zgody (`css/components.css`).

## 5. P2 — Drobne usprawnienia
1. **`og:image` jest obecne, ale nie wykryto `og:image:alt`**  
   - Dowód: tag OG image występuje (`index.html:15`, analogicznie na innych stronach), ale w audytowanych plikach HTML nie wykryto tagu `og:image:alt`.

2. **Google Fonts ładowane przez CSS `@import` w głównym arkuszu wejściowym**  
   - Dowód: `@import url('https://fonts.googleapis.com/...')` w `css/main.css:1`.  
   - Wpływ: działa poprawnie, ale zwykle jest wolniejsze niż `<link rel="preconnect">` + `<link rel="stylesheet">` w `<head>` dokumentu.

3. **Zgodności kontrastu nie można potwierdzić bez analizy stylów obliczonych**  
   - Dowód: istnieją tokeny kolorów i zmienne motywu, ale ten statyczny audyt nie uruchamiał obliczeń kontrastu na wyrenderowanym widoku (`css/tokens.css`, `css/components.css`).

## 6. Dodatkowe ulepszenia jakości
- Strategia URL/deploy została ujednolicona do ścieżek `.html`; przy ewentualnym przyszłym przejściu na clean URLs należy dodać rewrite po stronie hostingu oraz zaktualizować canonical/OG/JSON-LD/sitemap w jednym kroku.
- Jeśli backend formularza celowo nie wchodzi w zakres tego repo, pokazać jasny disclaimer o braku wysyłki w UI albo podpiąć lekki endpoint (serverless/email API).
- Dodać `og:image:alt` konsekwentnie dla lepszej jakości metadanych dostępności w social media.
- Rozważyć dodanie `manifest.webmanifest` tylko wtedy, gdy instalowalność PWA jest realnym celem projektu (obecnie nie wykryto w projekcie).
- Opcjonalnie dodać mikrocopy `noscript` dla ulepszeń zależnych od JS (animacja menu/reveal/toggle motywu), przy zachowaniu obecnie dostępnej podstawowej nawigacji i treści.

## 7. Ocena seniorska (1–10)
**7.6 / 10**  
Mocne fundamenty front-endowe, czysta modularność i dobry baseline dostępności są obecne. Wynik jest obniżony przez luki w gotowości produkcyjnej związane z niezawodnością pozyskiwania leadów oraz spójnością URL/wdrożenia.
