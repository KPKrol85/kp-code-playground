# Easy Move — audyt techniczny repozytorium

## 1. Krótka ocena całościowa
Projekt to przejrzysty, wielostronicowy statyczny front-end ze spójną strukturą semantyczną, reużywalnymi modułami JS i zdefiniowanym pipeline’em builda. Główne ryzyka dotyczą spójności strategii URL przy wdrożeniu (czyste URL-e w plikach SEO vs artefakty wyjściowe `.html`) oraz formularza kontaktowego, który obecnie symuluje udane wysłanie bez jakiejkolwiek trwałości danych lub transportu.

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
1. **Sukces formularza kontaktowego działa wyłącznie po stronie klienta (brak transportu/trwałości danych)**  
   - Dowód: handler submit zawsze wykonuje `preventDefault()`, waliduje, potem robi `form.reset()` i wyświetla komunikat sukcesu; brak `fetch`, brak XHR, brak celu action, brak integracji backendowej (`js/modules/form.js:50-127`, `kontakt.html:155`).  
   - Dlaczego to ważne: w produkcyjnym formularzu leadowym użytkownik może otrzymać potwierdzenie sukcesu, mimo że zapytanie faktycznie nigdzie nie trafiło.

2. **Niedopasowanie strategii URL między URL-ami SEO/deklaratywnymi a plikami wyjściowymi builda**  
   - Dowód: canonical/og/sitemap używają czystych URL-i, np. `/kontakt`, `/uslugi` (`kontakt.html:8,13`; `sitemap.xml:7-23`), podczas gdy build kopiuje strony źródłowe do `dist` jako pliki `.html` (`scripts/build.mjs:38-48`).  
   - Dodatkowo nie wykryto w projekcie: `_redirects`, konfiguracji rewrite ani reguł hostingu, które gwarantują routing bez rozszerzeń.  
   - Dlaczego to ważne: bez rewrite’ów po stronie hosta URL-e z canonical/og/sitemap mogą nie wskazywać istniejących stron, osłabiając spójność SEO i niezawodność crawlowania.

3. **Treść zgody odwołuje się do polityk, ale nie linkuje ich bezpośrednio w kontekście formularza**  
   - Dowód: etykieta zgody mówi, że użytkownik akceptuje politykę prywatności/cookies, ale nie zawiera anchorów (`kontakt.html:221-224`). Linki istnieją w innym miejscu (footer), lecz nie w samej treści zgody (`partials/footer.html:57`).  
   - Dlaczego to ważne: wymagania prawne/compliance i użyteczność są lepiej spełnione, gdy wskazane polityki są dostępne bezpośrednio w momencie podejmowania decyzji.

## 5. P2 — Drobne usprawnienia
1. **`og:image` jest obecne, ale nie wykryto `og:image:alt`**  
   - Dowód: tag OG image występuje (`index.html:15`, analogicznie na innych stronach), ale w audytowanych plikach HTML nie wykryto tagu `og:image:alt`.

2. **Google Fonts ładowane przez CSS `@import` w głównym arkuszu wejściowym**  
   - Dowód: `@import url('https://fonts.googleapis.com/...')` w `css/main.css:1`.  
   - Wpływ: działa poprawnie, ale zwykle jest wolniejsze niż `<link rel="preconnect">` + `<link rel="stylesheet">` w `<head>` dokumentu.

3. **Zgodności kontrastu nie można potwierdzić bez analizy stylów obliczonych**  
   - Dowód: istnieją tokeny kolorów i zmienne motywu, ale ten statyczny audyt nie uruchamiał obliczeń kontrastu na wyrenderowanym widoku (`css/tokens.css`, `css/components.css`).

## 6. Dodatkowe ulepszenia jakości
- Dodać jawną dokumentację wdrożenia/hostingu (lub pliki konfiguracyjne), która definiuje zachowanie routingu bez rozszerzeń, i dopasować linki źródłowe/canonical/sitemap do tej strategii.
- Jeśli backend formularza celowo nie wchodzi w zakres tego repo, pokazać jasny disclaimer o braku wysyłki w UI albo podpiąć lekki endpoint (serverless/email API).
- Dodać `og:image:alt` konsekwentnie dla lepszej jakości metadanych dostępności w social media.
- Rozważyć dodanie `manifest.webmanifest` tylko wtedy, gdy instalowalność PWA jest realnym celem projektu (obecnie nie wykryto w projekcie).
- Opcjonalnie dodać mikrocopy `noscript` dla ulepszeń zależnych od JS (animacja menu/reveal/toggle motywu), przy zachowaniu obecnie dostępnej podstawowej nawigacji i treści.

## 7. Ocena seniorska (1–10)
**7.6 / 10**  
Mocne fundamenty front-endowe, czysta modularność i dobry baseline dostępności są obecne. Wynik jest obniżony przez luki w gotowości produkcyjnej związane z niezawodnością pozyskiwania leadów oraz spójnością URL/wdrożenia.
