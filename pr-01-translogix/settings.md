# settings.md

## package.json scripts

Źródło: `package.json` w katalogu projektu (`pr-01-translogix/package.json`).

### 1) `css:min`
- **Command:** `postcss assets/css/style.css -o assets/css/style.min.css`
- **Co robi:** uruchamia PostCSS (z `cssnano` zdefiniowanym w `postcss.config.js`) i generuje zminifikowany plik produkcyjny `assets/css/style.min.css`.
- **Kiedy używać:** przed uruchomieniem strony lokalnie w trybie zbliżonym do produkcyjnego oraz przed deployem.

### 2) `css:watch`
- **Command:** `postcss assets/css/style.css -o assets/css/style.min.css --watch`
- **Co robi:** obserwuje zmiany w `assets/css/style.css` i automatycznie przebudowuje `style.min.css` po każdej modyfikacji.
- **Kiedy używać:** podczas pracy nad warstwą stylów (iteracyjny workflow front-end).

### 3) `build`
- **Command:** `npm run css:min`
- **Co robi:** alias procesu build dla tej wersji projektu; aktualnie obejmuje tylko minifikację CSS.
- **Kiedy używać:** jako standardowy krok build przed publikacją/deployem.

## Uwagi operacyjne
- HTML-e w projekcie odwołują się do `assets/css/style.min.css`; bez wykonania `css:min`/`build` strona może renderować się bez stylów.
- W aktualnym `package.json` **nie wykryto** skryptów typu `start`, `dev`, `test`, `lint`.
