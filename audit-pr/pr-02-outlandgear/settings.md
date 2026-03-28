# npm scripts reference

## Detected `package.json`
`package.json` detected in project root.

## Scripts

### `build:css`
- **Command:** `postcss css/main.css -o css/main.min.css`
- **What it does:** Processes the CSS entry file and writes a minified/bundled output to `css/main.min.css` (using PostCSS toolchain configured in the project).
- **When to use:** Before production deployment or whenever CSS sources change and you need refreshed minified CSS.

### `build:js`
- **Command:** `esbuild js/app.js --bundle --minify --outfile=js/app.min.js`
- **What it does:** Bundles JS from the main entry module and outputs minified build artifact `js/app.min.js`.
- **When to use:** Before production deployment or whenever JS modules change.

### `build`
- **Command:** `npm run build:css && npm run build:js`
- **What it does:** Runs full front-end build sequence (CSS then JS).
- **When to use:** Standard one-command build for release candidates and deploy artifacts.

### `watch:css`
- **Command:** `postcss css/main.css -o css/main.min.css --watch`
- **What it does:** Watches CSS sources and continuously rebuilds `css/main.min.css` on file changes.
- **When to use:** During local styling work.

### `watch:js`
- **Command:** `esbuild js/app.js --bundle --minify --outfile=js/app.min.js --watch`
- **What it does:** Watches JS modules and continuously rebuilds `js/app.min.js` on file changes.
- **When to use:** During local JavaScript development.
