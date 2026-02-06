# Audit fixes

## CSP + JSON-LD (P0-3)
- Zaktualizowano CSP: dodano `frame-src` dla Google Maps (www.google.com oraz maps.google.com) bez użycia `unsafe-inline` w `script-src`.
- Wybrano strategię A dla JSON-LD: dane przeniesiono do plików `assets/seo/*.json` i wstrzykiwane są do `<head>` po starcie JS (progressive enhancement). To pozwala utrzymać CSP bez `unsafe-inline`, ale oznacza, że structured data pojawia się po uruchomieniu JS.
