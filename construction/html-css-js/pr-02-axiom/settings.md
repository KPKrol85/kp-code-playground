# Ustawienia skryptów npm (`package.json`)

Poniżej opis wszystkich skryptów dostępnych w projekcie.

## `img:build`
- **Command:** `node tools/images/build-images.mjs`
- **What it does:** Buduje zoptymalizowane warianty obrazów (m.in. formaty nowoczesne i warianty responsywne) na podstawie źródeł.
- **When to use:** Po dodaniu/zmianie assetów graficznych.

## `img:clean`
- **Command:** `node tools/images/build-images.mjs --clean`
- **What it does:** Czyści wygenerowane obrazy wyjściowe tworzone przez pipeline obrazów.
- **When to use:** Przed pełnym rebuildem obrazów lub przy porządkowaniu artefaktów.

## `build:css`
- **Command:** `node tools/css/build-css.mjs`
- **What it does:** Buduje finalny CSS do katalogu `dist/` na bazie modularnych plików źródłowych.
- **When to use:** Po zmianach w `css/`.

## `min:css`
- **Command:** `npm run build:css`
- **What it does:** Alias do `build:css`.
- **When to use:** Gdy workflow/CI używa nazwy `min:css`.

## `build:js`
- **Command:** `node tools/js/build-js.mjs`
- **What it does:** Buduje finalny bundle JS do `dist/` z modułów źródłowych.
- **When to use:** Po zmianach w `js/`.

## `build:sw`
- **Command:** `node tools/sw/build-sw.mjs`
- **What it does:** Generuje/aktualizuje `sw.js` z rewizją i listą cache’owanych zasobów.
- **When to use:** Po zmianach wpływających na cache offline/PWA.

## `build`
- **Command:** `npm run build:head && npm run build:css && npm run build:js && npm run build:sw`
- **What it does:** Uruchamia pełny pipeline build (head/meta + CSS + JS + service worker).
- **When to use:** Przed wdrożeniem i przed pełną lokalną walidacją.

## `serve`
- **Command:** `http-server -c-1 -p 8080`
- **What it does:** Uruchamia lokalny serwer statyczny na porcie 8080 z wyłączonym cache.
- **When to use:** Do ręcznych testów strony lokalnie.

## `qa:lighthouse`
- **Command:** `mkdir -p reports/lighthouse && lhci collect --url=http://localhost:8080/ --url=http://localhost:8080/services/budowa-domow.html --url=http://localhost:8080/legal/regulamin.html --outputDir=reports/lighthouse`
- **What it does:** Zbiera raporty Lighthouse CI dla kluczowych stron.
- **When to use:** Audyt performance/SEO/a11y przed wydaniem.

## `qa:a11y`
- **Command:** `mkdir -p reports/pa11y && pa11y http://localhost:8080/ --reporter json --output reports/pa11y/index.json && pa11y http://localhost:8080/services/budowa-domow.html --reporter json --output reports/pa11y/budowa-domow.json && pa11y http://localhost:8080/legal/regulamin.html --reporter json --output reports/pa11y/regulamin.json`
- **What it does:** Wykonuje automatyczne testy dostępności (Pa11y) i zapisuje wyniki do JSON.
- **When to use:** Po zmianach w UI/HTML/CSS/komponentach interaktywnych.

## `qa`
- **Command:** `npm run qa:lighthouse && npm run qa:a11y`
- **What it does:** Uruchamia pełny zestaw QA: Lighthouse + Pa11y.
- **When to use:** Jako finalny check jakości przed release.

## `build:head`
- **Command:** `node tools/html/build-head.mjs`
- **What it does:** Aktualizuje sekcje `<head>` w stronach na bazie szablonu/metadanych.
- **When to use:** Po zmianach SEO/meta/canonical/OG/Twitter.

## `qa:links`
- **Command:** `node ../../../scripts/check-links-local.mjs --root "construction/html-css-js/pr-02-axiom"`
- **What it does:** Sprawdza lokalne linki i anchory w projekcie.
- **When to use:** Po zmianach w linkowaniu, strukturze podstron i assetach.
