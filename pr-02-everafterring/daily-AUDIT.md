# EverAfter Ring — Audyt dzienny

## 1. Krótka ocena ogólna

EverAfter Ring to czysty, statyczny, wielostronicowy front-end ze spójną organizacją źródeł, semantyczną strukturą stron, dostępnymi podstawami nawigacji, lokalnymi fontami i obrazami oraz świadomie zaprojektowanym pipeline'em builda, który osadza współdzielone partiale w produkcyjnym HTML. Główne obecne ryzyko produkcyjne wykryte w źródłach dotyczy informacji o przetwarzaniu danych przy formularzu kontaktowym.

W repozytorium nie wykryto service workera, manifestu aplikacji webowej, ujawnionych sekretów, znaczników TODO/FIXME ani instrukcji debugujących `console.log` poza ignorowanymi katalogami builda i zależności.

## 2. Mocne strony

- Semantyczne szkielety stron są spójne w głównych stronach źródłowych i stronie potwierdzenia formularza: każda strona ma link pomijający, `main id="main"`, jeden `h1` oraz hosty współdzielonego nagłówka i stopki (`index.html:33-36`, ten sam wzorzec widoczny w `oferta.html`, `uslugi.html`, `realizacje.html`, `o-nas.html`, `kontakt.html` i `dziekujemy.html`).
- Hierarchia nagłówków w audytowanych źródłach jest uporządkowana: każda strona ma jeden `h1`, po którym występują sekcyjne `h2` oraz zagnieżdżone treści `h3` tam, gdzie jest to potrzebne.
- Partial nawigacji używa prawdziwych przycisków dla kontrolek interaktywnych, atrybutów `aria-expanded`, `aria-controls`, `aria-label` oraz jawnie opisanego landmarku `nav` (`partials/header.html:5`, `partials/header.html:13`, `partials/header.html:22`).
- Obsługa klawiatury obejmuje Escape, obsługę klawiszy w dropdownie, powrót fokusu, zamykanie po kliknięciu poza elementem oraz responsywny stan menu (`js/modules/nav.js:65`, `js/modules/nav.js:82`, `js/modules/nav.js:118`, `js/modules/nav.js:127`, `js/modules/nav.js:154`).
- Obsługa ograniczenia ruchu istnieje zarówno w CSS, jak i w JS: globalne przejścia i animacje są skracane przy `prefers-reduced-motion`, płynne przewijanie jest wyłączane, a animacja obrazu hero zależna od kursora jest bramkowana przez `matchMedia` (`css/base.css:92`, `css/base.css:94`, `css/base.css:100-102`, `js/modules/hero.js:14`, `js/modules/hero.js:80-83`).
- Podstawy metadanych są mocne: główne strony oraz strona potwierdzenia formularza mają tytuł, opis, adres kanoniczny oraz dwa bloki JSON-LD; `robots.txt` wskazuje na `sitemap.xml`, a mapa strony obejmuje sześć głównych stron (`robots.txt:1-3`, `sitemap.xml:4-19`).
- Podstawy obsługi obrazów są dobrze zaadresowane: audytowane elementy `<img>` mają jawne `width`, `height` i niepuste `alt`; obrazy portfolio poniżej pierwszego widoku używają `loading="lazy"` (`index.html:54`, `index.html:218`, `realizacje.html:59`).
- Pipeline builda jest jawny i odpowiedni dla tego typu projektu: CSS jest bundlowany i minifikowany, JS jest bundlowany i minifikowany, hosty partiali są zastępowane w produkcyjnym HTML, a robots/sitemap/assets są kopiowane (`scripts/build.mjs:55`, `scripts/build.mjs:66`, `scripts/build.mjs:110-122`, `scripts/build.mjs:126-134`).

## 3. P0 — Krytyczne ryzyka

nie wykryto.

## 4. P1 — Ważne problemy do naprawy w następnej kolejności

- Rzeczywisty defekt / luka zgodności treści: formularz kontaktowy informuje, że wysłanie potwierdza zapoznanie się z informacją o przetwarzaniu danych, ale w projekcie nie wykryto strony prywatności/RODO/GDPR/polityki ani podlinkowanej informacji. Dowód: formularz zbiera imię i nazwisko, email, telefon, datę wydarzenia, miasto/region, budżet, pakiet, liczbę gości i wiadomość (`kontakt.html:64-122`), a jedyna informacja jest niepodlinkowanym tekstem (`kontakt.html:125`).

## 5. P2 — Drobne usprawnienia

- Porządkowanie: `trapFocus` jest eksportowane z `js/utils.js` i importowane przez `js/modules/nav.js`, ale nie wykryto żadnego wywołania. Nie jest to defekt runtime, lecz martwy/nieużywany kod widoczny w źródłach (`js/utils.js:9`, `js/modules/nav.js:1`).
- Ryzyko utrzymaniowe builda: `package.json` używa `"latest"` dla `esbuild` i `lightningcss` (`package.json:14-15`). Lockfile pomaga przy obecnych instalacjach, ale przypięcie jawnych zakresów wersji w `package.json` uczyniłoby przyszłe odświeżenia zależności bardziej świadomymi.

## 6. Dodatkowe ulepszenia jakościowe

- Opcjonalne ulepszenie metadanych: w projekcie nie wykryto tagów Open Graph ani Twitter Card. Obecne podstawy SEO są obecne, więc jest to usprawnienie podglądów udostępniania, a nie aktualny defekt.
- Opcjonalne ulepszenie progressive enhancement: źródłowy HTML polega na JS/fetch dla nagłówka i stopki podczas lokalnego podglądu źródeł (`index.html:34`, `index.html:265`, `js/modules/partials.js:44`). Jest to świadoma decyzja implementacyjna udokumentowana przez skrypt builda, który osadza partiale dla produkcji (`scripts/build.mjs:110-122`), więc nie jest klasyfikowana jako defekt.
- Opcjonalne usprawnienie wydajności: warto rozważyć preload głównego obrazu hero lub krytycznych lokalnych fontów, jeżeli realne testy wydajności pokażą presję na LCP. Aktualne źródła już używają lokalnych fontów WOFF2 i jawnych wymiarów obrazów.

## 7. Ocena seniorska (1–10)

8/10. Projekt jest strukturalnie solidny jak na statyczny front-end: obecne są semantyczny HTML, wzorce dostępnej nawigacji, obsługa ograniczenia ruchu, podstawowe metadane, lokalne assety i czytelny build produkcyjny. Ocenę obniża głównie brak podlinkowanej informacji o przetwarzaniu danych przy formularzu kontaktowym, ponieważ ma to znaczenie na produkcyjnej stronie służącej pozyskiwaniu leadów.
