1. Zastąpić ładowanie fontów przez `@import` w `css/main.css` linkami `<link rel="preconnect">` + `<link rel="stylesheet">` w `<head>`, aby skrócić blokowanie renderowania.
2. Usunąć powtarzające się style inline (`style="margin-top: ..."`, `style="display: flex; gap: ..."`) z plików HTML i przenieść je do klas pomocniczych w CSS.
3. Zamienić teksty „Polityka prywatności” i „Cookies” w stopce ze `<span>` na realne linki do stron prawnych.
4. Zmienić ikony social media w stopce z nieklikalnych `<span>` na dostępne linki `<a>` z czytelnymi etykietami (`aria-label`).
5. Dodać `aria-current="page"` dla aktywnej pozycji nawigacji i ujednolicić oznaczenie aktywnej sekcji „Usługi” między desktopem i mobile.
6. Uzupełnić komponent tabs o pełne powiązania ARIA (`id` na tabach + `aria-labelledby` na panelach) i przełączać także atrybut `hidden`, nie tylko klasy CSS.
7. Przenieść podstawowe atrybuty dostępności akordeonu (`id`, `aria-controls`, `aria-labelledby`, `hidden`) do HTML, aby semantyka działała także przy wyłączonym JS.
8. W formularzu kontaktowym po nieudanej walidacji przenosić fokus do pierwszego błędnego pola i dodać w podsumowaniu błędów linki prowadzące do konkretnych pól.
9. Zastąpić „symulowaną” wysyłkę formularza (sam `preventDefault`) realnym przepływem submit (`action`/`method` + backend/API) albo dodać wyraźny fallback bez JS.
10. Ograniczyć duplikację kodu między stronami (powtarzany header/footer i bloki SEO JSON-LD) przez wspólne partiale w procesie builda.
