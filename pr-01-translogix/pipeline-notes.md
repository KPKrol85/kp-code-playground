# Pipeline Notes

## Detected entrypoints
- CSS: `assets/css/style.css`
- JS: `assets/js/main.js`

## Final npm scripts
- `check:budget`: `node -e "console.log('budget check placeholder');"`
- `build:css`: `postcss assets/css/style.css -o css/style.min.css && node scripts/verify-css-build.mjs`
- `build:js`: `esbuild assets/js/main.js --bundle --minify --target=es2018 --outfile=js/script.min.js && node scripts/verify-js-build.mjs`
- `build`: `npm run build:css && npm run build:js`
- `watch:css`: `postcss assets/css/style.css -o css/style.min.css --watch`
- `watch:js`: `esbuild assets/js/main.js --bundle --minify --target=es2018 --outfile=js/script.min.js --watch`

## Files modified
- `package.json`
- `pipeline-notes.md`
- `scripts/verify-css-build.mjs`
- `scripts/verify-js-build.mjs`
- `css/style.min.css`
