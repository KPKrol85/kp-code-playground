# Audit fixes

## CSP + JSON-LD (P0-3)
- Zaktualizowano CSP: dodano `frame-src` dla Google Maps (www.google.com oraz maps.google.com) bez użycia `unsafe-inline` w `script-src`.
- Wybrano strategię A dla JSON-LD: dane przeniesiono do plików `assets/seo/*.json` i wstrzykiwane są do `<head>` po starcie JS (progressive enhancement). To pozwala utrzymać CSP bez `unsafe-inline`, ale oznacza, że structured data pojawia się po uruchomieniu JS.

## SEO alignment (P0-4)
- Ustalono domenę źródłową: `https://tourism-project-01.netlify.app`.
- Usunięto z sitemap.xml wpisy dla `offline.html` (strona nieindeksowalna) oraz `legal.html` (brak pliku), zastępując je istniejącymi stronami: `cookies.html`, `polityka-prywatnosci.html`, `regulamin.html`.

## JSON-LD consistency (P1-4)
- Ujednolicono JSON-LD w całym serwisie, usuwając placeholdery i wyrównując strukturę.
- Wprowadzono realne dane kontaktowe i adresowe jako jedno źródło prawdy dla structured data.
