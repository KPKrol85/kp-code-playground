# Trans Logix Build Pipeline

## Source entrypoints (authoring files)
- CSS entry: `assets/css/style.css` (modular `@import` source file)
- JS entry: `assets/js/main.js` (ES module entrypoint referenced by HTML)

These files remain source-of-truth and are never overwritten by build scripts.

## Build outputs
- CSS output: `assets/css/style.min.css`
- JS output: `assets/js/main.min.js`
- Production package: `dist/`

## Scripts
- `npm run build:css`
  - Minifies `assets/css/style.css` into `assets/css/style.min.css`.
- `npm run build:js`
  - Produces `assets/js/main.min.js` from `assets/js/main.js`.
- `npm run build:assets`
  - Runs both CSS and JS builds.
- `npm run build:dist`
  - Rebuilds minified CSS/JS, then creates a full `dist/` package.
  - Copies project files and assets into `dist/`.
  - Rewrites only `dist/*.html` references from source entries to minified outputs.
  - Rewrites only `dist/sw.js` precache entry for JS to `/assets/js/main.min.js`.
- `npm run build`
  - Alias for `npm run build:dist`.

## Safety improvements
- Removed the old source-overwrite behavior where CSS deployment copied build output over `assets/css/style.css`.
- Build artifacts are now always emitted to dedicated files or `dist/`.
- Source authoring files remain untouched across repeatable build runs.

## Modified files
- `package.json`
- `scripts/build-js.js`
- `scripts/build-dist.js`
